"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/**
 * seg(p, a, b) — the workhorse.
 * Remaps a slice of a section's 0→1 progress onto its own 0→1.
 * Beat 2 of a 5-beat section: seg(p, 0.2, 0.4).
 */
export const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

/**
 * useScene — binds a section element to its own scroll progress.
 *
 * onProgress fires inside ScrollTrigger's onUpdate (already rAF-throttled).
 * NEVER call setState in there. Write to refs / CSS vars only —
 * re-rendering React at 60fps is what makes scroll sites feel cheap.
 */
export function useScene(onProgress: (p: number, el: HTMLDivElement) => void) {
  const ref = useRef<HTMLDivElement>(null);
  const cb = useRef(onProgress);
  cb.current = onProgress;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // reduced motion: jump to the end state, no scrubbing
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cb.current(1, el);
      return;
    }

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => cb.current(self.progress, el),
    });

    cb.current(0, el);
    return () => st.kill();
  }, []);

  return ref;
}

/** Set a CSS custom property without touching React state. */
export const setVar = (el: Element | null, name: string, v: number | string) =>
  (el as HTMLElement | null)?.style.setProperty(
    name,
    typeof v === "number" ? v.toFixed(4) : v
  );
