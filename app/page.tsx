"use client";

import { useReveal } from "@/lib/useReveal";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Fit from "@/components/Fit";
import Work from "@/components/Work";
import Who from "@/components/Who";
import Method from "@/components/Method";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";

/**
 * PAGE ORDER = THE STORY.
 *   00 open      — the name is the value prop
 *   01 fit       — "is this me?"  (interactive, not scrolled)
 *   02 work      — four systems that RUN as you scroll  ← the whole site earns its keep here
 *   03 who       — one person, accountable
 *   04 method    — how it happens
 *   05 questions — objections, answered
 *   06 build     — the ask
 *
 * Don't add a beat unless it does a job on that list.
 */
export default function Page() {
  useReveal();

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Fit />
        <Work />
        <Who />
        <Method />
        <Faq />
        <Contact />
      </main>
    </>
  );
}
