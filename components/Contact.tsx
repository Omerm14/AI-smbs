import { Seal } from "./Seal";
import { BRAND, CONTACT, LINKS } from "@/data/site";

export default function Contact() {
  return (
    <>
      <section className="contact" id="contact" data-sec="contact">
        <div className="shell">
          <Seal size={64} />
          <p className="tag rv">06 / LET&apos;S BUILD</p>
          <h2 className="rv" style={{ "--d": ".06s" } as React.CSSProperties}>
            {CONTACT.heading[0]}<em>{CONTACT.heading[1]}</em>
          </h2>
          <p className="sub rv" style={{ "--d": ".12s" } as React.CSSProperties}>{CONTACT.sub}</p>

          <div className="row rv" style={{ "--d": ".18s" } as React.CSSProperties}>
            <a className="btn" data-mag href={LINKS.intro} target="_blank" rel="noopener">Book an intro →</a>
            <a className="btn ghost" data-mag href={LINKS.whatsapp} target="_blank" rel="noopener">Message on WhatsApp</a>
          </div>

          <p className="mail rv" style={{ "--d": ".24s" } as React.CSSProperties}>
            <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a> — {CONTACT.mail}
          </p>
        </div>
      </section>

      <footer>
        <div className="shell">
          <span>TRIPLE A — {BRAND.descriptor.toUpperCase()}</span>
          <a href="/he">עברית</a>
          <a href="/privacypolicy">PRIVACY</a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener">LINKEDIN</a>
          <span className="r">© 2026 · {BRAND.std} · TEL AVIV</span>
        </div>
      </footer>
    </>
  );
}
