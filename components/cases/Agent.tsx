"use client";

import { useRef } from "react";
import { CaseStage } from "../CaseStage";
import { useScene, setVar, seg } from "@/lib/useScene";
import { CASES } from "@/data/site";

const C = CASES.agent;

/**
 * BEAT SHEET — 340vh runway
 *  0.12–0.26  customer's question lands
 *  0.32–0.40  typing indicator in  ·  0.48–0.54 out
 *  0.54–0.68  the agent's reply
 *  0.76–0.88  "perfect, thanks"
 *  meter: INCOMING → THINKING… → REPLIED · 4s → RESOLVED ✓
 *
 * The 4-second response time is the claim. Don't state it — let them watch it.
 */
export default function Agent() {
  const bubs = useRef<(HTMLDivElement | null)[]>([]);
  const typing = useRef<HTMLDivElement>(null);
  const meter = useRef<HTMLSpanElement>(null);

  const ref = useScene((p, el) => {
    setVar(el, "--p", p);
    setVar(el, "--o", 1 - seg(p, 0, 0.22));

    setVar(bubs.current[0], "--o", seg(p, 0.12, 0.26));
    setVar(typing.current, "--o", seg(p, 0.32, 0.4) * (1 - seg(p, 0.48, 0.54)));
    setVar(bubs.current[1], "--o", seg(p, 0.54, 0.68));
    setVar(bubs.current[2], "--o", seg(p, 0.76, 0.88));

    if (meter.current)
      meter.current.textContent =
        p < 0.3 ? "INCOMING" : p < 0.52 ? "THINKING…" : p < 0.74 ? "REPLIED · 4s" : "RESOLVED ✓";
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
      meterInitial="IDLE"
    >
      <div className="chat">
        <div className="bub them he" ref={(el) => { bubs.current[0] = el; }}>
          {C.thread[0].text}
          <time>{C.thread[0].time}</time>
        </div>

        <div className="typing" ref={typing}>
          <i /><i /><i />
        </div>

        <div className="bub me he" ref={(el) => { bubs.current[1] = el; }}>
          {C.thread[1].text}
          <time>{C.thread[1].time}</time>
        </div>

        <div className="bub them he" ref={(el) => { bubs.current[2] = el; }}>
          {C.thread[2].text}
          <time>{C.thread[2].time}</time>
        </div>
      </div>
    </CaseStage>
  );
}
