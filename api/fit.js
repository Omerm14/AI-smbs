// Backs the "what would we build for you" tool on the homepage (see the
// `ask()` function in en/index.html / he/index.html). Takes a business
// description, returns the JSON shape the client renders.

const MODEL = 'claude-haiku-4-5';
const MAX_TOKENS = 500;
const MAX_BUSINESS_LEN = 60;

// Per-IP and global sliding-window limits. This is in-memory, so it resets
// on cold start and is only shared within one warm serverless instance —
// good enough as a first line of defense against casual abuse, not a
// substitute for the hard cost ceiling from MAX_TOKENS + these caps.
const RATE_LIMIT_PER_IP = 8;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const GLOBAL_RATE_LIMIT = 60;

const ipHits = new Map();
let globalHits = [];

function pruneOld(arr, now) {
  while (arr.length && now - arr[0] > RATE_LIMIT_WINDOW_MS) arr.shift();
  return arr;
}

function isRateLimited(ip) {
  const now = Date.now();
  globalHits = pruneOld(globalHits, now);
  if (globalHits.length >= GLOBAL_RATE_LIMIT) return true;

  const hits = pruneOld(ipHits.get(ip) || [], now);
  if (hits.length >= RATE_LIMIT_PER_IP) {
    ipHits.set(ip, hits);
    return true;
  }
  hits.push(now);
  globalHits.push(now);
  ipHits.set(ip, hits);
  return false;
}

// Hard site-wide daily spend cap, on top of the per-IP/global request-rate
// limits above. Same in-memory caveat as those: shared only within one warm
// serverless instance, resets on cold start. It's the last line of defense
// against a bot/scraper swarm running up the Anthropic bill, not a precise
// accounting system.
const DAILY_BUDGET_USD = 5;
// Claude Haiku 4.5 pricing, per million tokens.
const PRICE_PER_M_INPUT_USD = 1;
const PRICE_PER_M_OUTPUT_USD = 5;
// Worst-case cost of a single call: system prompt + schema + business name
// on the input side, MAX_TOKENS on the output side. Reserved against the
// budget *before* calling Anthropic, so a burst can't slip past the check
// while requests are in flight; refunded/adjusted once the real usage
// numbers come back.
const WORST_CASE_INPUT_TOKENS = 600;
const RESERVE_USD =
  (WORST_CASE_INPUT_TOKENS / 1e6) * PRICE_PER_M_INPUT_USD +
  (MAX_TOKENS / 1e6) * PRICE_PER_M_OUTPUT_USD;

let budgetDay = null;
let budgetSpentUsd = 0;

function todayUTC() {
  return new Date().toISOString().slice(0, 10);
}

function resetBudgetIfNewDay() {
  const day = todayUTC();
  if (day !== budgetDay) {
    budgetDay = day;
    budgetSpentUsd = 0;
  }
}

function reserveBudget() {
  resetBudgetIfNewDay();
  if (budgetSpentUsd + RESERVE_USD > DAILY_BUDGET_USD) return false;
  budgetSpentUsd += RESERVE_USD;
  return true;
}

function reconcileBudget(actualUsd) {
  resetBudgetIfNewDay();
  budgetSpentUsd = Math.max(0, budgetSpentUsd + actualUsd - RESERVE_USD);
}

function actualCostUsd(usage) {
  if (!usage) return 0;
  return (
    ((usage.input_tokens || 0) / 1e6) * PRICE_PER_M_INPUT_USD +
    ((usage.output_tokens || 0) / 1e6) * PRICE_PER_M_OUTPUT_USD
  );
}

function getClientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (fwd) return fwd.split(',')[0].trim();
  return req.socket && req.socket.remoteAddress || 'unknown';
}

const SCHEMA = {
  type: 'object',
  properties: {
    p: { type: 'string' },
    p2: { type: 'string' },
    s: { type: 'array', items: { type: 'string' } },
    b: { type: 'array', items: { type: 'string' } },
    a: { type: 'array', items: { type: 'string' } },
  },
  required: ['p', 'p2', 's', 'b', 'a'],
  additionalProperties: false,
};

const SYSTEM = `You write short marketing copy for a website tool that shows a visitor "what we'd build for your business" after they type in what kind of business they run.

Reply with JSON only, matching this shape:
- p: one sentence describing the visitor's likely day-to-day pain point (the manual, repetitive work).
- p2: a second sentence, a related everyday annoyance, in the same voice.
- s: [feature name, one-line description] for a "01 - SOFTWARE" idea: a small custom system built just for their business.
- b: [feature name, one-line description] for a "02 - AUTOMATION" idea: connecting their existing tools so something currently manual happens by itself.
- a: [feature name, one-line description] for a "03 - AGENT" idea: an AI agent handling a specific repeated task or conversation.

Match the visitor's own language (write in Hebrew if they wrote in Hebrew, English if English, etc). Keep every string short, concrete, and specific to the business they named - no generic filler, no mention of AI/automation buzzwords in the copy itself. Plain sentences only, no markdown.`;

function isValidShape(j) {
  return j && typeof j.p === 'string' && typeof j.p2 === 'string' &&
    Array.isArray(j.s) && j.s.length === 2 && j.s.every((x) => typeof x === 'string') &&
    Array.isArray(j.b) && j.b.length === 2 && j.b.every((x) => typeof x === 'string') &&
    Array.isArray(j.a) && j.a.length === 2 && j.a.every((x) => typeof x === 'string');
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    res.status(429).json({ error: 'rate limited' });
    return;
  }

  const business = typeof req.body === 'object' && req.body && typeof req.body.business === 'string'
    ? req.body.business.trim().slice(0, MAX_BUSINESS_LEN)
    : '';
  if (!business) {
    res.status(400).json({ error: 'missing business' });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'not configured' });
    return;
  }

  if (!reserveBudget()) {
    res.status(503).json({ error: 'daily budget exceeded' });
    return;
  }

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: SYSTEM,
        output_config: { format: { type: 'json_schema', schema: SCHEMA } },
        messages: [{ role: 'user', content: `Business: ${business}` }],
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!upstream.ok) {
      reconcileBudget(0); // refund the reservation — no cost was incurred
      res.status(502).json({ error: 'upstream error' });
      return;
    }

    const data = await upstream.json();
    reconcileBudget(actualCostUsd(data.usage));

    const textBlock = Array.isArray(data.content) && data.content.find((b) => b.type === 'text');
    if (!textBlock) {
      res.status(502).json({ error: 'no output' });
      return;
    }

    let parsed;
    try {
      parsed = JSON.parse(textBlock.text);
    } catch (e) {
      res.status(502).json({ error: 'bad json' });
      return;
    }

    if (!isValidShape(parsed)) {
      res.status(502).json({ error: 'bad shape' });
      return;
    }

    res.status(200).json(parsed);
  } catch (err) {
    reconcileBudget(0); // refund — the request never completed
    res.status(502).json({ error: 'request failed' });
  }
};
