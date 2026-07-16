# AAA Content Map — Hebrew problem-queries & AI-question research (Ticket 12)

**Purpose:** a prioritized map of what AAA's ICP (Israeli SMB owners) actually search for and ask AI, so every future article/page targets real demand instead of guessed keywords.

## Method & honest limitations

This map was built by:
1. Clustering by problem, based on AAA's five live verticals (invoicing, bakery orders, food labeling, WhatsApp customer service, studio knowledge management) plus general "AI agent for my business" intent.
2. **Live SERP spot-checks** via web search for a representative sample per cluster (marked ✅ below) — these are real, current results, not guesses.
3. **What this map does *not* include, and why:**
   - **Search volume / difficulty numbers** — I don't have Semrush, Google Keyword Planner, or GSC query-data access (GSC just went live on the new domain, no meaningful query history yet). These columns are marked `TBD — needs Omer's export`.
   - **"Who the AI engines currently cite"** — the plan calls for manually asking each query in ChatGPT, Perplexity, Claude, and Google AI Overviews and recording who gets cited. I can't operate those consumer products interactively from this environment to observe live citations, so this column is marked `TBD — manual check` throughout. This is exactly the ongoing job Ticket 19 (GEO citation tracking) formalizes — this map gives Ticket 19 its starting query list.
4. Rows marked ✅ have a real, current SERP snapshot (checked 2026-07-16). Rows without ✅ are reasoned candidates from the same clusters, not yet individually SERP-checked — do that before writing against them.

---

## Cluster A — Invoice / cash-flow automation (target: `/work/cashflow`)

| # | Query (Hebrew) | Intent | Current SERP winner | AI citation | Priority |
|---|---|---|---|---|---|
| 1 | תוכנה לקריאת חשבוניות אוטומטית עסק קטן ✅ | commercial | Generic bookkeeping SaaS (iCount, SmartBee, Morning/חשבונית ירוקה, Linet) — none focus on *AI reading invoices from multiple channels* | TBD — manual check | **High** — real content gap, direct case-study match |
| 2 | OCR לחשבוניות בעברית | commercial | Not checked | TBD | Medium |
| 3 | איך לעקוב אחרי חשבוניות ספקים מפוזרות | informational | Not checked | TBD | High |
| 4 | תוכנה שמזהה כפילויות בחשבוניות | informational | Not checked | TBD | Medium |
| 5 | ניהול תזרים מזומנים לעסק קטן בלי אקסל | informational | Not checked | TBD | Medium |

## Cluster B — Bakery / food-business order management (target: `/work/floory`)

| # | Query (Hebrew) | Intent | Current SERP winner | AI citation | Priority |
|---|---|---|---|---|---|
| 6 | איך לנהל הזמנות במאפייה תוכנה ✅ | commercial | Generic order-management systems (Microsoft Dynamics OMS, Pepperi, ClickEat) — **nobody owns "AI + WhatsApp orders → production list" for bakeries specifically** | TBD | **High** — clearest content gap found, direct case-study match |
| 7 | הזמנות וואטסאפ למאפייה איך להפוך לרשימת ייצור | informational | Not checked | TBD | **High** |
| 8 | תוכנה לניהול מלאי ומאפייה | commercial | Not checked | TBD | Medium |
| 9 | לוח ייצור אוטומטי למאפייה | informational | Not checked | TBD | Medium |

## Cluster C — Food-label compliance (target: `/work/food-labels`)

| # | Query (Hebrew) | Intent | Current SERP winner | AI citation | Priority |
|---|---|---|---|---|---|
| 10 | תווית מזון תקנית משרד הבריאות תוכנה ✅ | commercial | **Nutraid dominates directly** — an established nutrition-label SaaS competitor; TEKLYNX also present | TBD | Medium — real competitor, differentiate on "decides warning labels automatically" angle rather than compete head-on |
| 11 | סימוני אזהרה תו אדום איך נקבעים אוטומטית | informational | Not checked | TBD | Medium |
| 12 | הצהרת אלרגנים אוטומטית למוצר מזון | informational | Not checked | TBD | Low |

## Cluster D — WhatsApp AI customer service (target: `/work/whatsapp-agent`)

| # | Query (Hebrew) | Intent | Current SERP winner | AI citation | Priority |
|---|---|---|---|---|---|
| 13 | סוכן AI לוואטסאפ לעסק קטן ✅ | commercial | Crowded: STSICONIC, SEOKRU, automaziot.ai, Focus AI, pakatec.com all have dedicated pages, several with explicit pricing (₪3,500–12,000 setup) | TBD | High intent, **high competition** — needs a genuinely differentiated angle (multi-language reply, &lt;5s, real business proof) rather than a generic "what is a WhatsApp AI agent" post |
| 14 | בוט וואטסאפ שעונה בכל שפה | informational | Not checked | TBD | Medium |
| 15 | איך לענות ללקוחות בוואטסאפ מחוץ לשעות עבודה | informational | Not checked | TBD | Medium |
| 16 | סוכן AI לוואטסאפ מחיר | commercial | Overlaps with #13 — several competitors publish pricing here | TBD | Medium (see pricing tension note below) |

## Cluster E — Studio / creative-business knowledge management (target: `/work/jarvis`)

| # | Query (Hebrew) | Intent | Current SERP winner | AI citation | Priority |
|---|---|---|---|---|---|
| 17 | עוזר AI קולי ניהול ידע עסק סטודיו ✅ | informational | Diffuse — Microsoft Copilot, generic AI-assistant tools (OperAI, AgentsHead); nobody owns "voice AI over years of studio IP" specifically | TBD | Medium — smallest/most niche vertical, but least competitive |
| 18 | איך למצוא הצעת מחיר ישנה בעסק בלי לחפש בתיקיות | informational | Not checked | TBD | Low |
| 19 | מנוע איתור עסקאות תיירות ואירוח | informational | Not checked | TBD | Low |

## Cluster F — General "AI agent for my business" / FAQ-style (target: homepage + `/faq`)

| # | Query (Hebrew) | Intent | Current SERP winner | AI citation | Priority |
|---|---|---|---|---|---|
| 20 | כמה עולה לבנות סוכן AI לעסק ✅ | commercial, high intent | **Very crowded**: DevShift, achiya-automation, stsiconic, doctorai.co.il, whale.co.il, archi-tech.co.il, ildigital.co.il — most publish explicit price ranges (₪3,500–12,000, or ₪200–700/mo SaaS bots) | TBD | High intent — **but see the pricing tension below** |
| 21 | האם התוכנה נשארת שלי אחרי שסוכן AI נבנה | informational | Not checked | TBD | Medium — directly matches an existing FAQ answer |
| 22 | כמה זמן לוקח להקים סוכן וואטסאפ | informational | Overlaps #15 | TBD | Medium — directly matches an existing FAQ answer |
| 23 | מה ההבדל בין אוטומציה לסוכן AI | informational | Not checked | TBD | Medium — directly matches an existing FAQ answer |
| 24 | ניסינו כלים דיגיטליים לעסק והם לא נתפסו ✅ | informational | General small-business-tools content (sponser.co.il, israelhayom, ezcount blog) — nobody frames this as an AI-fit problem specifically | TBD | High — direct match to an existing FAQ answer AND a real content gap |
| 25 | אנחנו לא טכניים איך מתחילים עם AI בעסק | informational | Not checked | TBD | Medium |
| 26 | מה קורה אחרי שסוכן AI עולה לאוויר תמיכה | informational | Not checked | TBD | Low |
| 27 | אוטומציה לעסקים קטנים ובינוניים ישראל | commercial | Not checked | TBD | Medium |

## Cluster G — Competitive / directory queries (feeds Ticket 16, off-page)

| # | Query (Hebrew) | Intent | Current SERP winner | AI citation | Priority |
|---|---|---|---|---|---|
| 28 | סוכנות AI מומלצת ישראל ✅ | navigational/commercial | **Two live listicles found**: indexbusiness.co.il ("7 סוכנויות מומלצות ל-GEO/AIO/AI Search") and he.altdgtl.com ("10 סוכנויות ה-GEO/AI Search המובילות בישראל") — **direct outreach targets for Ticket 16** | N/A (this is about AAA appearing on others' pages) | **High for Ticket 16** — concrete, actionable inclusion targets |
| 29 | בתי תוכנה AI מובילים בישראל | navigational | two-solutions.com currently ranks with a "how to choose an AI dev shop" post | N/A | Medium |
| 30 | סוכן AI או צ׳אטבוט מה ההבדל | informational | doctorai.co.il owns this with a pricing-comparison post (₪99–10,000) | TBD | Medium |

---

## Direct competitors surfaced (not exhaustive, for awareness)

Whale Group, STSICONIC, automaziot.ai, achiya-automation, Focus AI, SEOKRU, DoctorAI, IL Digital, Two-Solutions, Otherwise, archi-tech.co.il — all Israeli AI-agent/automation shops competing for overlapping queries, several already publishing detailed pricing (a space AAA's own FAQ deliberately avoids per the site's pricing policy — see below).

## Strategic flag: the pricing tension

Multiple competitors rank for "how much does an AI agent cost" queries specifically *because* they publish real numbers (₪3,500–12,000 setup, ₪100–300/mo, etc.). AAA's FAQ deliberately withholds a number ("pricing stays off — the answer explains the scoping-call model without a number," per the site's existing decision). This is worth a conscious call, not an oversight:
- **Keep current approach**: AAA competes on differentiation/trust instead of price-anchoring, accepting it won't win the pure "how much does X cost" head-term the way competitors with published numbers do.
- **Alternative**: publish an honest price *range* (as several competitors do) purely for SEO/GEO capture on high-intent commercial queries, while keeping the "real number comes from the scoping call" close.
This is a business decision for Omer, not something to change unilaterally.

## First cluster recommended for Ticket 13 (top priority, ~8–10 candidates)

Picking for a mix of **real content gaps** (clusters A/B/F where competitors don't already own the AI-specific angle) over **crowded commodity queries** (cluster D/general pricing, where competing head-on against a dozen established Israeli AI agencies is a weak place to start):

1. #1 — תוכנה לקריאת חשבוניות אוטומטית עסק קטן *(Cashflow)*
2. #6 — איך לנהל הזמנות במאפייה תוכנה *(Floory)* — clearest gap found
3. #7 — הזמנות וואטסאפ למאפייה → רשימת ייצור *(Floory)*
4. #24 — ניסינו כלים דיגיטליים לעסק והם לא נתפסו *(FAQ/homepage)* — direct gap + matches existing FAQ answer
5. #21 — האם התוכנה נשארת שלי *(FAQ)* — matches existing FAQ answer, low competition
6. #22 — כמה זמן לוקח להקים סוכן וואטסאפ *(FAQ)* — matches existing FAQ answer
7. #23 — מה ההבדל בין אוטומציה לסוכן AI *(FAQ)* — matches existing FAQ answer, genuinely educational, low competition
8. #17 — עוזר AI קולי ניהול ידע בסטודיו *(Jarvis)* — least competitive vertical
9. #11 — סימוני אזהרה תו אדום איך נקבעים אוטומטית *(Food Label Engine)* — differentiate from Nutraid
10. #3 — איך לעקוב אחרי חשבוניות ספקים מפוזרות *(Cashflow)*

## Next steps (Ticket 16 — immediate, no writing required)

Rows #28/#29 are ready-made outreach targets right now: pitch AAA for inclusion in indexbusiness.co.il's and he.altdgtl.com's GEO/AI-agency listicles, using the live case studies and products as proof. This can happen in parallel with content writing.

## What Omer still needs to run before Ticket 13 starts writing

1. Pull these ~30 queries through Google Keyword Planner and/or Semrush for real volume/difficulty numbers (Hebrew volume data is thin, per the original plan — cross-check both).
2. Once GSC has a few weeks of data on `aaa-tech.com`, check Search → Performance for any query impressions already appearing organically — that's free signal on top of this list.
3. Manually run the top 10–15 queries above through ChatGPT, Perplexity, and Google AI Overviews and log who's cited (this populates the "AI citation" column and doubles as Ticket 19's baseline).
