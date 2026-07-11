"use client";

import { useRef } from "react";
import { CaseStage } from "../CaseStage";
import { useScene, setVar, seg } from "@/lib/useScene";
import { CASES } from "@/data/site";

const C = CASES.cashflow;

/**
 * BEAT SHEET — 340vh runway
 *  0.00–0.22  registration marks travel in and lock
 *  0.14–0.32  invoice 1 arrives from Gmail       (seg)
 *  0.30–0.48  invoice 2 arrives from WhatsApp
 *  0.46–0.64  invoice 3 arrives from Drive
 *  throughout total counts up; meter reads READING n/3
 */
export default function Cashflow() {
  const rows = useRef<(HTMLDivElement | null)[]>([]);
  const sum = useRef<HTMLElement>(null);
  const meter = useRef<HTMLSpanElement>(null);

  const ref = useScene((p, el) => {
    setVar(el, "--p", p);
    setVar(el, "--o", 1 - seg(p, 0, 0.22));

    let total = 0;
    let read = 0;

    C.invoices.forEach((inv, i) => {
      const o = seg(p, 0.14 + i * 0.16, 0.32 + i * 0.16);
      setVar(rows.current[i], "--o", o);
      total += inv.amount * o;
      if (o > 0.98) read++;
    });

    if (sum.current) sum.current.textContent = "₪" + Math.round(total).toLocaleString("en-US");
    if (meter.current) meter.current.textContent = `READING ${read}/3`;
  });

  return (
    <CaseStage
      ref={ref}
      height="340vh"
      num={C.num}
      title={C.title}
      body={C.body}
      badge={C.badge as [string, string]}
      windowTitle={C.window}
      status={C.status}
      meterRef={meter}
      meterInitial="READING 0/3"
    >
      <div className="scan" />
      <div className="inv">
        <div className="hd">
          <span>SUPPLIER</span>
          <span>AMOUNT</span>
        </div>
        {C.invoices.map((inv, i) => (
          <div key={inv.name} className="irow" ref={(el) => { rows.current[i] = el; }}>
            <span className="src">{inv.src}</span>
            <span className="nm he">{inv.name}</span>
            <span className="amt">₪{inv.amount.toLocaleString("en-US")}</span>
            <span className="tick">✓</span>
          </div>
        ))}
      </div>
      <div className="total">
        <span>Due this month</span>
        <strong ref={sum}>₪0</strong>
      </div>
    </CaseStage>
  );
}
