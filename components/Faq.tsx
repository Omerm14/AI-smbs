"use client";

import { useState } from "react";
import { FAQ } from "@/data/site";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="sec" id="faq">
      <div className="shell">
        <p className="tag rv">05 / QUESTIONS</p>
        <h2 className="rv" style={{ "--d": ".06s" } as React.CSSProperties}>What people ask us.</h2>

        <div className="faq rv" style={{ "--d": ".12s" } as React.CSSProperties}>
          {FAQ.map(([q, a], i) => (
            <div className={`qa${open === i ? " open" : ""}`} key={q}>
              <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
                {q}
                <span className="pl">+</span>
              </button>
              <div className="a" style={{ maxHeight: open === i ? 400 : 0 }}>
                <p>{a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
