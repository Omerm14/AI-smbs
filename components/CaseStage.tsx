"use client";

import { forwardRef, ReactNode } from "react";
import { Seal } from "./Seal";

/**
 * CaseStage — the scaffold every case study shares.
 *
 * The outer .case div is the ScrollTrigger trigger AND the CSS-var host:
 * --p (0→1 progress) and --o (registration offset) are set on it once per frame
 * and inherit down to .reg, .meter, .device and .scan. One write, no thrash.
 *
 * height controls the runway. 340vh ≈ 2.4 viewport-heights of animation.
 */
export type CaseStageProps = {
  height: string;
  num: string;
  title: string;
  body: string;
  badge: [string, string];
  windowTitle: string;
  status: string;
  meterRef: React.RefObject<HTMLSpanElement | null>;
  meterInitial: string;
  children: ReactNode;
};

export const CaseStage = forwardRef<HTMLDivElement, CaseStageProps>(function CaseStage(
  { height, num, title, body, badge, windowTitle, status, meterRef, meterInitial, children },
  ref
) {
  return (
    <div className="case" ref={ref} style={{ height }}>
      <div className="case-stage">
        <div className="case-inner">
          <div className="case-copy">
            <p className="num">{num}</p>
            <h3>{title}</h3>
            <p>{body}</p>
            <div className="badge">
              <b>{badge[0]}</b> {badge[1]}
            </div>
            <div className="meter">
              <i />
              <span ref={meterRef}>{meterInitial}</span>
            </div>
          </div>

          {/* ---- the registration frame: the signature ---- */}
          <div className="reg">
            <span className="c tl" />
            <span className="c tr" />
            <span className="c bl" />
            <span className="c br" />
            <span className="lock">REGISTERED</span>

            <div className="device">
              <div className="top">
                <Seal size={13} />
                <span>{windowTitle}</span>
                <span className="live">
                  <i />
                  {status}
                </span>
              </div>
              <div className="screen">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
