/**
 * ALL COPY LIVES HERE.
 * Motion code never contains a sentence. Content edits happen in this file only.
 */

export const BRAND = {
  name: "Triple A",
  shorthand: "AAA", // never "3A"
  descriptor: "AI Agents Agency",
  tagline: "AI that does the work, not the talking.",
  positioning:
    "Precise systems, quietly built — for businesses that were never made for this.",
  est: "AI AGENTS AGENCY · EST. 2026 · TEL AVIV",
  std: "STD-001",
};

export const LINKS = {
  intro: "https://calendar.app.google/a1bvMsk7oMrTWYzQ9",
  whatsapp: "https://wa.me/972505646450",
  email: "omermoran14@gmail.com",
  linkedin: "https://www.linkedin.com/in/omer-moran-8aa07616b",
};

export const HERO = {
  sub: "Agents we've built are already answering customers, taking orders and filing paperwork — at real businesses, right now.",
  triple: [
    {
      letter: "A — ARTIFICIAL INTELLIGENCE",
      title: "The engine.",
      body: "Real, applied AI — agents and tools that do actual work, not demos.",
    },
    {
      letter: "A — AGENTS",
      title: "The form it takes.",
      body: "Systems that act on your behalf and quietly handle the busywork.",
    },
    {
      letter: "A — AGENCY",
      title: "The relationship.",
      body: "People who build it, set it up, and stay accountable for it.",
    },
  ],
  ticker: [
    ["CASHFLOW", "LIVE"],
    ["WHATSAPP AGENT", "24/7"],
    ["URBAN BAKERY", "13/13"],
    ["JARVIS", "$100K+"],
    ["STD-001 · TRIPLEA.CO", ""],
  ] as [string, string][],
};

export const FIT = [
  {
    k: "Restaurant / café",
    t: "match.engine — food",
    pain: [
      "The phone rings mid-service and nobody is free to answer",
      "Orders scatter across WhatsApp, phone and Instagram",
      "Supplier invoices pile up until month end",
    ],
    sys: [
      "A WhatsApp agent that answers, books tables, and hands over to a human when it should",
      "Order capture from every channel, in one place",
      "Cashflow — invoices read, cashflow board maintained",
    ],
    proof:
      "Running today at Urban Bakery — 13/13 products compliant, agent live 24/7.",
  },
  {
    k: "Bakery / food retail",
    t: "match.engine — retail",
    pain: [
      "Compliance and food labels eat whole days",
      "Wholesale orders arrive on WhatsApp and get lost",
      "No real picture of cost against sales",
    ],
    sys: [
      "A food-label engine to Ministry of Health spec, red label included",
      "A wholesale ordering portal for business customers",
      "Cashflow — every invoice read and classified automatically",
    ],
    proof: "Floory + the labelling engine — built, live, in daily use.",
  },
  {
    k: "Professional services",
    t: "match.engine — services",
    pain: [
      "Leads wait hours for a reply and go cold",
      "Every quote gets written from scratch",
      "Critical knowledge lives in one person's head",
    ],
    sys: [
      "A first-response agent that qualifies and books meetings",
      "A quote generator built on your existing templates",
      "An internal knowledge assistant with cited sources",
    ],
    proof: '"Jarvis" — a voice knowledge assistant over years of a studio\'s IP.',
  },
  {
    k: "Studio / creative",
    t: "match.engine — creative",
    pain: [
      "Proposals and decks eat working days",
      "The project archive is unreachable exactly when you need it",
      "Big opportunities surface too late",
    ],
    sys: [
      "A voice assistant over the entire archive",
      "A deal engine for luxury and hospitality",
      "Deck and profile automation",
    ],
    proof: "A deal engine that flags opportunities from $100K and up.",
  },
];

export const CASES = {
  cashflow: {
    num: "CASE 01 — B2B SAAS · FINTECH",
    title: "Cashflow — invoices read themselves. Money stays in view.",
    body: "A full Hebrew SaaS product that reads every supplier invoice out of Gmail, Drive and WhatsApp the moment it lands — before any money moves — and pulls it all into one cashflow board.",
    badge: ["LIVE", "Our own product, in production"],
    window: "cashflow — invoices · march",
    status: "SYNCED",
    // Hebrew supplier names run in Varela Round — the product is Hebrew, so the demo is too.
    invoices: [
      { src: "GMAIL", name: "תנובה שיווק", amount: 4830 },
      { src: "WHATSAPP", name: "אריזות הצפון", amount: 1215 },
      { src: "DRIVE", name: "קמח השחר", amount: 7940 },
    ],
  },
  agent: {
    num: "CASE 02 — AI AGENT · CUSTOMER SERVICE",
    title: "A WhatsApp agent that answers in seconds. In Hebrew. At 23:47.",
    body: "An AI agent that lives in the business's WhatsApp: it knows the menu, the prices and the policy, holds a natural conversation, and knows exactly when to stop and hand over to a human.",
    badge: ["24/7", "Instant replies, no one on shift"],
    window: "agent — your business",
    status: "ONLINE",
    thread: [
      { from: "them", text: "היי, אפשר שולחן ל-4 מחר ב-20:00? ויש תפריט ללא גלוטן?", time: "21:47" },
      { from: "me", text: "בטח! יש תפריט מלא ללא גלוטן. שריינתי לך ל-4 מחר ב-20:00 ✓ נתראה!", time: "21:47 ✓✓" },
      { from: "them", text: "מושלם, תודה!", time: "21:48" },
    ] as { from: "them" | "me"; text: string; time: string }[],
  },
  label: {
    num: "CASE 03 — FOOD OPS · COMPLIANCE",
    title: "Urban Bakery — Ministry of Health compliant, with no tech person on staff.",
    body: "End-to-end food labelling: a nutrition engine that only computes from cited sources, allergen declarations, and red-label warnings — for every product. Adding a new product takes minutes.",
    badge: ["13/13", "products fully compliant"],
    window: "label.engine — sourdough",
    status: "MOH-SPEC",
    rows: [
      { he: "אנרגיה (קק״ל)", value: 247, dec: 0 },
      { he: "חלבונים (ג׳)", value: 8.4, dec: 1 },
      { he: "פחמימות (ג׳)", value: 46.2, dec: 1 },
      { he: "נתרן (מ״ג)", value: 512, dec: 0 },
    ],
    allergens: "אלרגנים: גלוטן, שומשום",
    warning: "● RED LABEL · SODIUM",
  },
  jarvis: {
    num: "CASE 04 — AI KNOWLEDGE · SALES ENGINE",
    title: '"Jarvis" — every year of studio knowledge, answering one question.',
    body: "A voice AI assistant sitting on years of knowledge and IP: ask out loud, get an answer with the sources behind it. Alongside it, a deal engine scanning luxury and hospitality for the big opportunities.",
    badge: ["$100K+", "the opportunity floor it hunts for"],
    window: "jarvis — studio brain",
    status: "VOICE",
    question: '🎙 "What was the spec on the Milano installation?"',
    sources: [
      ["DOC", "Technical spec — Milano Installation v3"],
      ["EMAIL", "Supplier confirmation — LED grid, 2023"],
      ["DECK", "Client deck — Living Legends"],
    ] as [string, string][],
    dealTarget: 140000,
  },
};

export const WHO = {
  heading: ["One person builds it.", "One person owns it.", "No excuses."],
  body1:
    "From analyst and product manager in Unit 8200, through data products at ZoomInfo and small-business tools at Connecteam — to Cashflow, a live SaaS product of our own. A startup was founded along the way, so we know your side of it: every shekel is counted, and there's no time for experiments.",
  body2:
    "We don't sell slide decks. We scope, build, deploy — and stay until the system works and gives you your time back.",
  log: [
    ["UNIT-8200", "Analyst & senior product manager", "still in active reserve duty"],
    ["FOUNDER", "Co-founder of a startup", "from zero, with all the scars"],
    ["ZOOMINFO", "Data product manager", "public company, millions of users"],
    ["CONNECTEAM", "Product manager", "tools for small business — today's audience"],
    ["NOW", "Triple A — AI agents agency", "all of it, pointed at your business"],
  ] as [string, string, string][],
};

export const METHOD = [
  {
    n: "STEP 01",
    title: "Intro call",
    body: "30 minutes, free. You explain how the business runs; we find where the hours burn. If there's nothing worth building for you, we'll say so on that call.",
  },
  {
    n: "STEP 02",
    title: "Fixed-price proposal",
    body: "Within days: what gets built, what it saves, what it costs, when it ships. Price fixed up front — no mid-project surprises, no mandatory retainer.",
  },
  {
    n: "STEP 03",
    title: "The system goes live",
    body: "We build, deploy and support. Your team keeps working in WhatsApp and email as usual — the system adapts to them, not the other way round.",
  },
];

export const FAQ: [string, string][] = [
  [
    "What does it cost?",
    "Every project gets a fixed-price proposal after the intro call, based on what actually needs building. The principle is simple: the system has to pay for itself in hours saved — and if it won't, we'll tell you up front that it isn't worth building.",
  ],
  [
    "How long until we see a result?",
    "The first system goes live in weeks, not months. We start at the most painful point in the business so the value lands fast — and only then expand.",
  ],
  [
    "We're not technical. Is that a problem?",
    'The opposite — that\'s exactly why we exist. Your team keeps working in WhatsApp, email and Excel. We handle the technical side, and any training is short and practical. Nobody has to learn "a new system".',
  ],
  [
    "We tried digital tools before and they never stuck.",
    "Off-the-shelf tools ask the business to adapt to them, which is why they get abandoned. We work the other way round: understand how your business already runs, then build a system that fits onto existing habits. When nothing has to change, there's nothing to abandon.",
  ],
  [
    "What happens after it goes live?",
    "We don't disappear at handover. There's a support period, we watch that the system behaves, and we tune it against what actually happens in the field. A good AI system gets more accurate over time — that's part of the job.",
  ],
];

export const CONTACT = {
  heading: ["Let's build ", "your machine."],
  sub: "30 minutes, free. We'll talk through your business and tell you honestly what's worth building and what isn't. If there's no fit, you'll at least leave with a clear direction.",
  mail: "answered personally, usually within hours.",
};
