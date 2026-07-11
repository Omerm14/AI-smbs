"use client";

import { useRef } from "react";
import { CaseStage } from "../CaseStage";
import { useScene, setVar, seg } from "@/lib/useScene";
import { CASES } from "@/data/site";

const C = CASES.jarvis;
const BARS = 40;

/**
 * BEAT SHEET — 340vh runway
 *  0.10–0.32  waveform listens, the question surfaces
 *  0.36–0.74  waveform settles as the answer retrieves
 *  0.42–0.86  three sources cite themselves in
 *  0.78–0.94  the deal engine lands on a $140K match
 */
export default function Jarvis() {
  const bars = useRef<(HTMLElement | null)[]>([]);
  const q = useRef<HTMLParagraphElement>(null);
  const srcs = useRef<(HTMLDivElement | null)[]>([]);
  const deal = useRef<HTMLDivElement>(null);
  const dealVal = useRef<HTMLElement>(null);
  const meter = useRef<HTMLSpanElement>(null);

  const ref = useScene((p, el) => {
    setVar(el, "--p", p);
    setVar(el, "--o", 1 - seg(p, 0, 0.22));

    const listen = seg(p, 0.1, 0.32);
    const answer = seg(p, 0.36, 0.74);

    bars.current.forEach((b, i) => {
      // procedural waveform: a sine envelope so the middle is loudest
      const base = Math.abs(Math.sin(i * 0.6 + p * 14)) * Math.sin((i / BARS) * Math.PI);
      const h = 6 + base * 54 * Math.max(listen * (1 - answer * 0.55), 0.06);
      setVar(b, "--h", `${h.toFixed(1)}px`);
    });

    setVar(q.current, "--o", listen);
    C.sources.forEach((_, i) => setVar(srcs.current[i], "--o", seg(p, 0.42 + i * 0.1, 0.56 + i * 0.1)));

    const dv = seg(p, 0.78, 0.94);
    setVar(deal.current, "--d2", dv);
    if (dealVal.current)
      dealVal.current.textContent = "$" + Math.round(C.dealTarget * dv).toLocaleString("en-US");

    if (meter.current)
      meter.current.textContent =
        p < 0.34 ? "LISTENING" : p < 0.74 ? "RETRIEVING · 3 SOURCES" : "DEAL MATCH ✓";
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
      meterInitial="LISTENING"
    >
      <div className="wave">
        {Array.from({ length: BARS }).map((_, i) => (
          <i key={i} ref={(el) => { bars.current[i] = el; }} />
        ))}
      </div>

      <p className="q" ref={q}>{C.question}</p>

      <div className="srcs">
        {C.sources.map(([kind, text], i) => (
          <div key={text} ref={(el) => { srcs.current[i] = el; }}>
            <em>{kind}</em> {text}
          </div>
        ))}
      </div>

      <div className="deal" ref={deal}>
        <span>DEAL ENGINE · MATCH</span>
        <b ref={dealVal}>$0</b>
      </div>
    </CaseStage>
  );
}
