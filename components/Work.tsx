import Cashflow from "./cases/Cashflow";
import Agent from "./cases/Agent";
import Label from "./cases/Label";
import Jarvis from "./cases/Jarvis";

export default function Work() {
  return (
    <>
      <section className="sec" id="work" data-sec="work" style={{ paddingBottom: 0 }}>
        <div className="shell">
          <p className="tag rv">02 / WORK</p>
          <h2 className="rv" style={{ "--d": ".06s" } as React.CSSProperties}>
            Four systems.<br /><em>All in production.</em>
          </h2>
          <p className="sub rv" style={{ "--d": ".12s" } as React.CSSProperties}>
            Nothing here is a mockup. Scroll — and watch each one register, then run.
          </p>
        </div>
      </section>

      <Cashflow />
      <Agent />
      <Label />
      <Jarvis />
    </>
  );
}
