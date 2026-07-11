"use client";

import { useEffect } from "react";

/** Ink dot + lagging ring. Desktop only — CSS hides it on coarse pointers. */
export default function Cursor() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = document.getElementById("cur");
    const ring = document.getElementById("cur2");
    if (!dot || !ring) return;

    let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my, raf = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
    };
    const loop = () => {
      cx += (mx - cx) * 0.16;
      cy += (my - cy) * 0.16;
      ring.style.transform = `translate(${cx}px, ${cy}px)`;
      raf = requestAnimationFrame(loop);
    };

    const enter = () => ring.classList.add("big");
    const leave = () => ring.classList.remove("big");
    const hot = document.querySelectorAll("a, button");
    hot.forEach((el) => { el.addEventListener("mouseenter", enter); el.addEventListener("mouseleave", leave); });

    // magnetic pull on primary actions
    const mags = document.querySelectorAll<HTMLElement>("[data-mag]");
    const pull = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * 0.2;
      const dy = (e.clientY - (r.top + r.height / 2)) * 0.28;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    const release = (e: MouseEvent) => ((e.currentTarget as HTMLElement).style.transform = "");
    mags.forEach((el) => { el.addEventListener("mousemove", pull); el.addEventListener("mouseleave", release); });

    addEventListener("mousemove", move);
    loop();

    return () => {
      removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      hot.forEach((el) => { el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave); });
      mags.forEach((el) => { el.removeEventListener("mousemove", pull); el.removeEventListener("mouseleave", release); });
    };
  }, []);

  return (
    <>
      <div id="cur" />
      <div id="cur2" />
    </>
  );
}
