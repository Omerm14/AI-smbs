"use client";

import { useRef } from "react";
import { CaseStage } from "../CaseStage";
import { useScene, setVar, seg } from "@/lib/useScene";
import { CASES } from "@/data/site";

const C = CASES.label;

/**
 * BEAT SHEET — 360vh runway
 *  0.14–0.70  four nutrition values count up, staggered
 *  0.60–0.72  allergen declaration
 *  0.76–0.90  the red-label stamp lands (the punchline — give it room)
 */
export default function Label() {
  const rows = useRef<(HTMLDivElement | null)[]>([]);
  const vals = useRef<(HTMLElement | null)[]>([]);
  const allerg = useRef<HTMLParagraphElement>(null);
  const stamp = useRef<HTMLDivElement>(null);
  const meter = useRef<HTMLSpanElement>(null);

  const ref = useScene((p, el) => {
    setVar(el, "--p", p);
    setVar(el, "--o", 1 - seg(p, 0, 0.22));

    C.rows.forEach((r, i) => {
      const o = seg(p, 0.14 + i * 0.1, 0.3 + i * 0.1);
      setVar(rows.current[i], "--o", o);
      const v = vals.current[i];
      if (v) v.textContent = (r.value * o).toFixed(r.dec);
    });

    setVar(allerg.current, "--a", seg(p, 0.6, 0.72));
    setVar(stamp.current, "--s", seg(p, 0.76, 0.9));

    if (meter.current)
      meter.current.textContent =
        p < 0.58 ? "CALCULATING" : p < 0.74 ? "ALLERGENS ✓" : "RED LABEL · SODIUM";
  });

  return (
    <CaseStage
      ref={ref}
      height="360vh"
      num={C.num}
      title={C.title}
      body={C.body}
      badge={C.badge as [string, string]}
      windowTitle={C.window}
      status={C.status}
      meterRef={meter}
      meterInitial="CALCULATING"
    >
      <div className="lt">ערכים תזונתיים · PER 100 G</div>
      {C.rows.map((r, i) => (
        <div key={r.he} className="lr" ref={(el) => { rows.current[i] = el; }}>
          <span className="he">{r.he}</span>
          <b ref={(el) => { vals.current[i] = el; }}>0</b>
        </div>
      ))}
      <p className="alrg he" ref={allerg}>{C.allergens}</p>
      <div className="stamp" ref={stamp}>{C.warning}</div>
    </CaseStage>
  );
}
