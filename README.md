# Triple A — site

Scroll-driven marketing site. The four case studies **run** as you scroll them.

```bash
npm install
npm run dev
```

## Stack

| | |
|---|---|
| Next.js 15 (App Router) | pages, fonts, metadata |
| Lenis | inertial smooth scroll |
| GSAP ScrollTrigger | per-section scroll progress |
| CSS custom properties | everything the progress drives |

No Tailwind, no UI kit. The design system is `app/globals.css` and it's small on purpose.

## Structure

```
app/
  layout.tsx        fonts (Space Grotesk / Plex Mono / Varela Round), seal defs, Lenis, cursor
  page.tsx          the story order — read the comment at the top
  globals.css       brand tokens + the whole design system
components/
  SmoothScroll.tsx  Lenis bound to the GSAP ticker (one RAF loop)
  Seal.tsx          the registration mark
  CaseStage.tsx     shared pinned scaffold + registration frame
  cases/            Cashflow · Agent · Label · Jarvis — each has its beat sheet in the header
  Nav / Hero / Fit / Who / Method / Faq / Contact
lib/
  useScene.ts       the scroll engine: p, seg(), setVar()
  useReveal.ts      one IntersectionObserver for all .rv elements
data/
  site.ts           ALL COPY. Motion code contains no sentences.
```

## The one equation

```ts
p = clamp(-rect.top / (rect.height - innerHeight), 0, 1)   // 0 → 1 across the section
seg(p, 0.3, 0.5)                                            // slice it into a beat
```

Everything on this site — invoices arriving, the agent typing, nutrition values counting,
the registration marks locking — is that number multiplied by something.

## Rules

See `CLAUDE.md`. Short version: Grad Deep stays rare, one motion idea per beat, never
`setState` in a scroll handler, and everything degrades to a readable static page.
