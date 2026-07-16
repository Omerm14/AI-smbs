# AAA Entity Consistency — copy for LinkedIn, Crunchbase, directories (Ticket 15)

**Purpose:** generative engines and Google trust an entity more when the same name, description, and details appear consistently across authoritative external profiles. This also feeds the `Organization.sameAs` array already in the site's JSON-LD — right now it only points at Omer's *personal* LinkedIn, since none of these exist yet.

## Canonical facts (use word-for-word everywhere)

- **Name:** AAA — AI Agents Agency
- **One-liner:** AAA builds AI agents that do real work in your business — answering customers, taking orders, reading invoices.
- **Location:** Tel Aviv, Israel
- **Founded:** 2026
- **Founder:** Omer Moran
- **Website:** https://aaa-tech.com
- **Contact:** hi@aaa-tech.com
- **Founder's LinkedIn:** https://www.linkedin.com/in/omer-moran-8aa07616b
- **Live products:** Cashflow (gocashflow.co), Floory (floory.urbanbakery.co)

Do not add anything not already true on the site (no invented funding, team size, client count, etc.) — same "verify us yourself" rule as everywhere else.

---

## 1. LinkedIn Company Page (separate from Omer's personal profile)

Create via Omer's LinkedIn account → **+ Create a Company Page → Small business**.

| Field | Value |
|---|---|
| Page name | AAA — AI Agents Agency |
| LinkedIn URL / vanity name | linkedin.com/company/aaa-ai-agents-agency (or closest available) |
| Website | https://aaa-tech.com |
| Industry | IT Services and IT Consulting |
| Company size | 1-10 employees |
| Company type | Self-employed / Privately held |
| Founded | 2026 |
| Tagline (120 char max) | AI agents that do real work in your business. |
| About (Overview, longer) | AAA builds AI agents that do real work in small and medium businesses: answering customers, taking orders, reading invoices. When a business needs more than one agent, AAA builds the whole system. Every system is already running in a real business, not a demo — see Cashflow (gocashflow.co) and Floory (floory.urbanbakery.co). Founded by Omer Moran (Unit 8200, ZoomInfo, Connecteam). Based in Tel Aviv. |
| Logo/cover | Reuse the site's existing mark (the triangle/A logo from the site header) |

**Action for you:** create the page with the fields above, then have the page follow/reshare Omer's personal profile once live (Ticket 17 territory, not required now).

---

## 2. Crunchbase organization entry

Create via crunchbase.com → **Add a new organization** (free, self-submit).

| Field | Value |
|---|---|
| Organization name | AAA — AI Agents Agency |
| Website | https://aaa-tech.com |
| Short description (~250 char) | AAA builds AI agents that do real work in small and medium businesses — answering customers, taking orders, reading invoices, and building full systems when one agent isn't enough. |
| Founded date | 2026 |
| Headquarters location | Tel Aviv, Israel |
| Founders | Omer Moran |
| Industries / categories | Artificial Intelligence, Business Process Automation (AI), Consulting |
| Company type | Privately held |

---

## 3. Israeli directories (2-3 listings)

Researched live options (checked 2026-07-16), since Hebrew/Israeli directory data isn't something I can verify from memory:

1. **Start-Up Nation Finder** (finder.startupnationcentral.org) — free self-submit/update profile, 13,000+ companies indexed, run by the nonprofit Start-Up Nation Central. Confirmed real and accessible for a small company to list or correct its own profile.
2. **Clutch.co** — not Israel-specific, but a globally recognized B2B service-provider directory that's easy to self-list on and directly relevant for an AI/automation agency; commonly cited by prospective clients researching vendors.
3. A third local option is worth your own judgment call — Dun's 100 (duns100.co.il) is a real Israeli company ranking, but it's an editorial "leading companies" ranking rather than an open self-submit directory, so it's likely not accessible for a single-founder company founded this year. I didn't want to send you chasing a listing that isn't realistically attainable yet — flagging this rather than guessing a fake path in.

**Action for you:** submit/update the AAA profile on Start-Up Nation Finder and Clutch.co with the canonical facts above. If you know of a better-fitting third Israeli directory from being in the local ecosystem, use your own judgment there — I'd rather flag the gap than invent a submission process I haven't verified.

---

## What happens once these are live

Send me the resulting profile URLs (LinkedIn company page, Crunchbase, directory listings) and I'll add them to the `Organization.sameAs` array in the JSON-LD on both `index.html` and `en/index.html` (currently `["https://www.linkedin.com/in/omer-moran-8aa07616b"]` only) — that's the part that actually feeds back into the site's structured data.
