# CLAUDE.md — Triple A site

Read this before touching anything.

## What this is

The Triple A marketing site. A scroll-driven story: the four case studies **run**
as you scroll them. That's the entire concept. The site doesn't claim the systems
work — it demonstrates them.

## Non-negotiables

**Brand (STD-001).**
- Ratio holds: ~70% Paper, ~22% Forest/Ink, ~8% Grad Deep. Don't drift.
- **Grad Deep** (`--grad`) is reserved for: the seal, primary CTAs, the progress rail,
  the method-card rules. It is never a section background. Never add a fourth hue.
- Three type roles, no defaults: **Space Grotesk** display, **IBM Plex Mono** for every
  label/index/spec/status readout, **Varela Round** for Hebrew.
- Hebrew appears **inside the product screens only** (invoice names, the WhatsApp thread,
  the nutrition panel). That's deliberate — the English site tells you we build for Israeli
  businesses; the Hebrew in the UI proves it. Don't "fix" it to English.
- Write `Triple A` in running text. `AAA` as shorthand. Never `3A`.

**Motion.**
- One motion idea per beat. When in doubt, remove one.
- **Never call `setState` in a scroll handler.** Write to refs and CSS custom properties.
  React re-rendering at 60fps is what makes scroll sites feel cheap. See `lib/useScene.ts`.
- The registration frame (`.reg`) means "this system is certified." Don't reuse it as
  decoration on non-case sections.
- Everything must resolve to a readable end state under `prefers-reduced-motion` and on
  mobile. Motion is a bonus, never the delivery mechanism.

**Content.**
- All copy lives in `data/site.ts`. Motion code never contains a sentence.

## How the scroll engine works

One equation, everywhere:

```
p = clamp(-rect.top / (rect.height - innerHeight), 0, 1)
```

`useScene(cb)` hands you that `p` (via GSAP ScrollTrigger's `onUpdate`) plus the section
element. You set CSS vars on the element; they **inherit** down to `.reg`, `.meter`,
`.device` and `.scan`. One write per frame.

`seg(p, a, b)` slices that progress into beats. Beat 2 of 5 → `seg(p, 0.2, 0.4)`.

Lenis is bound to GSAP's ticker in `components/SmoothScroll.tsx` so both share one RAF
loop. Two loops = jitter. Don't add a second `requestAnimationFrame` scroll loop.

## Adding a new case study

1. Write the **beat sheet first**, as a comment at the top of the component. Look at
   `components/cases/Agent.tsx` — the beats are listed before any code.
2. Copy goes in `data/site.ts` under `CASES`.
3. Component: `useScene` → `setVar` calls → wrap in `<CaseStage>`.
4. Runway: 340vh ≈ 2.4 viewport-heights of animation. More beats = more runway.
5. Add it to `components/Work.tsx`.

## Working agreement

- **One beat per task.** Don't build a whole section in one shot.
- After each beat, screenshot and look at it before moving on.
- If a change makes the page busier without making the story clearer, revert it.

## TODO

- [ ] Swap the placeholder `<symbol id="mark">` in `components/Seal.tsx` for the real
      brand SVG (100-unit square, corners 12 units in, A spans the middle third).
- [ ] `/he` — Hebrew RTL twin. Note: `.reg` corner transforms and `.log` are direction-
      sensitive; use logical properties, not `left`/`right`.
- [ ] OG image, favicon (the Grad Deep seal), sitemap.
- [ ] Optional Tier-2: one WebGL moment on the hero headline. One. Not a takeover.
