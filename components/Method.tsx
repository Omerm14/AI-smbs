"use client";

import { useEffect, useRef } from "react";
import { METHOD } from "@/data/site";

/** Each step's Grad Deep top-rule fills as the card enters view. */
export default function Method() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const frame = () => {
      ticking = false;
      wrap.current?.querySelectorAll<HTMLElement>(".step").forEach((s) => {
        const r = s.getBoundingClientRect();
        const sp = Math.min(1, Math.max(0, (innerHeight * 0.85 - r.top) / (r.height * 0.7)));
        s.style.setProperty("--sp", sp.toFixed(3));
      });
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
    addEventListener("scroll", onScroll, { passive: true });
    frame();
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="sec" id="method" data-sec="method">
      <div className="shell">
        <p className="tag rv">04 / METHOD</p>
        <h2 className="rv" style={{ "--d": ".06s" } as React.CSSProperties}>
          From a call to a live system.<br /><em>In weeks.</em>
        </h2>
        <div className="steps" ref={wrap}>
          {METHOD.map((s, i) => (
            <div className="step rv" key={s.n} style={{ "--d": `${0.06 + i * 0.08}s` } as React.CSSProperties}>
              <p className="n">{s.n}</p>
              <h4>{s.title}</h4>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
