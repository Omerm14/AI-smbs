"use client";

import { useEffect, useRef } from "react";
import { WHO, LINKS } from "@/data/site";

/** The career log draws its own timeline as it enters view. */
export default function Who() {
  const log = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const frame = () => {
      ticking = false;
      const el = log.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const lp = Math.min(1, Math.max(0, (innerHeight * 0.75 - r.top) / (r.height * 0.85)));
      el.style.setProperty("--lp", lp.toFixed(3));
      const entries = el.querySelectorAll(".e");
      entries.forEach((e, i) => e.classList.toggle("on", lp > (i + 0.4) / entries.length));
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
    addEventListener("scroll", onScroll, { passive: true });
    frame();
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="sec" id="about" data-sec="about">
      <div className="shell">
        <p className="tag rv">03 / WHO</p>
        <div className="about-grid">
          <div>
            <h2 className="rv" style={{ "--d": ".06s" } as React.CSSProperties}>
              {WHO.heading[0]}<br />{WHO.heading[1]}<br /><em>{WHO.heading[2]}</em>
            </h2>
            <p className="sub rv" style={{ "--d": ".12s" } as React.CSSProperties}>{WHO.body1}</p>
            <p className="sub rv" style={{ "--d": ".16s" } as React.CSSProperties}>
              <b>We don&apos;t sell slide decks.</b> {WHO.body2.split(". ")[1]}
            </p>
            <p style={{ marginTop: 28 }} className="rv">
              <a href={LINKS.linkedin} target="_blank" rel="noopener" className="btn ghost" data-mag>
                Full profile on LinkedIn →
              </a>
            </p>
          </div>

          <div className="log" ref={log}>
            <p className="tag" style={{ marginBottom: 4 }}>career.log</p>
            {WHO.log.map(([k, role, note]) => (
              <div className="e" key={k}>
                <h5>{k}</h5>
                <p>{role} <em>· {note}</em></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
