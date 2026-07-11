import { Seal } from "./Seal";
import { BRAND, HERO, LINKS } from "@/data/site";

export default function Hero() {
  return (
    <header className="hero" id="top" data-sec="top">
      <div className="shell">
        <p className="eyebrow">
          {BRAND.est}
          <span className="live"><i />4 SYSTEMS RUNNING</span>
        </p>

        <h1>
          <span className="ln"><span style={{ "--i": 0 } as React.CSSProperties}>AI that does the work,</span></span>
          <span className="ln"><span style={{ "--i": 1 } as React.CSSProperties}><em>not the talking.</em></span></span>
        </h1>

        <p className="sub">
          {HERO.sub.split("—")[0]}—<b>{HERO.sub.split("—")[1]}</b> {BRAND.positioning}
        </p>

        <div className="row">
          <a className="btn" data-mag href={LINKS.intro} target="_blank" rel="noopener">Book an intro →</a>
          <a className="btn ghost" data-mag href="#work">See four live systems</a>
        </div>

        {/* The name is the value prop. Spell it out. */}
        <div className="triple">
          {HERO.triple.map((t) => (
            <div key={t.letter}>
              <p className="l"><Seal size={13} /> {t.letter}</p>
              <h3>{t.title}</h3>
              <p>{t.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mq" aria-hidden>
        <div>
          {[0, 1].map((dup) =>
            HERO.ticker.map(([label, val]) => (
              <b key={`${dup}-${label}`}>{label} {val && <em>{val}</em>}</b>
            ))
          )}
        </div>
      </div>
    </header>
  );
}
