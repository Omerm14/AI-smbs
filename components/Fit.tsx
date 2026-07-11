"use client";

import { useState } from "react";
import { Seal } from "./Seal";
import { FIT } from "@/data/site";

export default function Fit() {
  const [i, setI] = useState(0);
  const d = FIT[i];

  return (
    <section className="sec" id="fit" data-sec="fit">
      <div className="shell">
        <p className="tag rv">01 / FIT</p>
        <h2 className="rv" style={{ "--d": ".06s" } as React.CSSProperties}>
          What does this give<br />a business like yours?
        </h2>
        <p className="sub rv" style={{ "--d": ".12s" } as React.CSSProperties}>
          Every business burns time in a different place. Pick a field — get the honest answer:
          where it hurts, what we build, and the proof it already works.
        </p>

        <div className="fit-grid">
          <div className="chips rv" style={{ "--d": ".16s" } as React.CSSProperties}>
            {FIT.map((f, j) => (
              <button
                key={f.k}
                type="button"
                className={`chip${j === i ? " on" : ""}`}
                onClick={() => setI(j)}
              >
                {f.k}
              </button>
            ))}
          </div>

          <div className="panel rv" style={{ "--d": ".22s" } as React.CSSProperties}>
            <div className="bar">
              <Seal size={14} color="var(--forest)" />
              <span>{d.t}</span>
              <span className="live">LIVE</span>
            </div>
            <div className="body">
              <div className="swap" key={i}>
                <h4>WHERE IT HURTS</h4>
                <ul>{d.pain.map((x) => <li key={x}>{x}</li>)}</ul>
                <h4>WHAT WE BUILD</h4>
                <ul>{d.sys.map((x) => <li key={x}>{x}</li>)}</ul>
                <h4>THE PROOF</h4>
                <p className="proof">{d.proof}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
