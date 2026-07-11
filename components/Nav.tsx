"use client";

import { useEffect, useRef } from "react";
import { Seal } from "./Seal";
import { BRAND, LINKS } from "@/data/site";

const SECTIONS = [
  ["top", "00 / OPEN"],
  ["fit", "01 / FIT"],
  ["work", "02 / WORK"],
  ["about", "03 / WHO"],
  ["method", "04 / METHOD"],
  ["contact", "05 / BUILD"],
];

/** Top bar (hides on scroll-down) + the left index rail + the global progress rail. */
export default function Nav() {
  const nav = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastY = scrollY, ticking = false;

    const frame = () => {
      ticking = false;
      const y = scrollY;
      const doc = document.documentElement;
      const gp = Math.min(1, Math.max(0, y / (doc.scrollHeight - innerHeight)));
      rail.current?.style.setProperty("--gp", gp.toFixed(4));

      if (y > lastY && y > 240) nav.current?.classList.add("hide");
      else nav.current?.classList.remove("hide");
      lastY = y;

      // which section owns the viewport middle
      let active: string | null = null;
      document.querySelectorAll<HTMLElement>("[data-sec]").forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top < innerHeight * 0.5 && r.bottom > innerHeight * 0.5) active = s.dataset.sec!;
      });
      document.querySelectorAll<HTMLElement>(".case").forEach((c) => {
        const r = c.getBoundingClientRect();
        if (r.top < innerHeight * 0.5 && r.bottom > innerHeight * 0.5) active = "work";
      });
      document.querySelectorAll<HTMLElement>("#index b").forEach((b) =>
        b.classList.toggle("on", b.dataset.s === active)
      );
    };

    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
    addEventListener("scroll", onScroll, { passive: true });
    frame();
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div id="rail" ref={rail}><i /></div>

      <nav id="nav" ref={nav}>
        <a href="#top" className="brand"><Seal size={22} color="var(--forest)" /> {BRAND.name}</a>
        <div className="links">
          <a href="#fit">FIT</a>
          <a href="#work">WORK</a>
          <a href="#method">METHOD</a>
          <a href="#about">WHO</a>
          <a href="#faq">FAQ</a>
        </div>
        <a className="cta" data-mag href={LINKS.intro} target="_blank" rel="noopener">Book an intro →</a>
      </nav>

      <aside id="index">
        {SECTIONS.map(([id, label]) => (
          <b key={id} data-s={id}><i />{label}</b>
        ))}
      </aside>
    </>
  );
}
