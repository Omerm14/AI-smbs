# AAA GEO citation tracking (Ticket 19)

**Purpose:** the only real GEO KPI — is AAA actually being cited when someone asks ChatGPT, Perplexity, Google AI Overviews, or Claude one of its target questions? This is a manual, periodic check, run by Omer (I can't operate consumer AI products interactively from this environment, and scraping them against their terms is explicitly out of scope for this ticket).

## How to run a check (~15 minutes)

1. Open a **fresh/incognito session** in each of: ChatGPT, Perplexity, Google (search the query and check the AI Overview box if one appears), Claude.
2. Paste each query below **exactly as written**, one at a time, no follow-up prompting.
3. For each answer, record in the log table:
   - **Cited?** — did AAA/aaa-tech.com show up anywhere in the answer or sources, even unlinked?
   - **Linked?** — was there an actual clickable link to aaa-tech.com?
   - **Source credited** — whose content did the engine actually pull from instead (if not AAA)? This tells you who to catch up to.
4. Do all 4 engines for all queries in one sitting so the snapshot is comparable — engines change week to week.
5. Save the filled-in table as `geo-citation-log/<YYYY-MM-DD>.md` (create the folder on first run) so there's a real history, same pattern as `scripts/health-check-history/`.

Run this on the same cadence as the health-check script (`scripts/seo-geo-health-check.py`) so technical health and actual citation results move together.

## Fixed query set (from `content-map.md`'s first cluster — keep this list stable so results are comparable over time)

| # | Query (Hebrew) | Target page |
|---|---|---|
| 1 | תוכנה לקריאת חשבוניות אוטומטית עסק קטן | `/work/cashflow` |
| 2 | איך לנהל הזמנות במאפייה תוכנה | `/work/floory` |
| 3 | הזמנות וואטסאפ למאפייה איך להפוך לרשימת ייצור | `/work/floory` |
| 4 | ניסינו כלים דיגיטליים לעסק והם לא נתפסו | `/faq`, `/blog/why-digital-tools-dont-stick` |
| 5 | האם התוכנה נשארת שלי אחרי שסוכן AI נבנה | `/faq` |
| 6 | כמה זמן לוקח להקים סוכן וואטסאפ | `/faq` |
| 7 | מה ההבדל בין אוטומציה לסוכן AI | `/faq`, `/blog/automation-vs-ai-agent` |
| 8 | עוזר AI קולי ניהול ידע עסק סטודיו | `/work/jarvis` |
| 9 | סימוני אזהרה תו אדום איך נקבעים אוטומטית | `/work/food-labels` |
| 10 | איך לעקוב אחרי חשבוניות ספקים מפוזרות | `/work/cashflow`, `/blog/automatic-invoice-reading` |

## Baseline (2026-07-16)

Not yet run — this requires the manual interactive step above, which I can't perform. First entry should be logged as `geo-citation-log/2026-07-16.md` (or whenever Omer actually runs it) using the template below, and every later run diffs against the most recent prior file.

## Log table template

```markdown
# GEO citation check — <date>

| Query # | Engine | Cited? | Linked? | Source engine credited instead | Notes |
|---|---|---|---|---|---|
| 1 | ChatGPT | | | | |
| 1 | Perplexity | | | | |
| 1 | Google AI Overview | | | | |
| 1 | Claude | | | | |
| 2 | ... | | | | |
```

(Repeat the 4-engine block for each of the 10 queries — 40 rows per full run.)

## What "movement" looks like

Per the plan's acceptance criteria, the first re-measurement just needs to show *some* delta vs. baseline — even "still zero everywhere" is a valid, useful data point that establishes the trend line. Don't wait for a real citation to start logging.
