"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const links = [
  { label: "Story", href: "#story" },
  { label: "Systems", href: "#systems" },
  { label: "Proof", href: "#proof" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-md bg-background/70 border-b border-border" : ""
        }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 md:px-10 md:py-5">
        <a href="#top" className="flex items-center gap-2.5">
          {/* <span className="inline-block h-7 w-7 border border-foreground/60 relative">
            <span className="absolute inset-1 bg-highlight" />
          </span> */}
          <div className="flex items-center gap-2.5">
            <Image
              src="/TCA.png"
              alt="Trimurti Cement Article"
              width={50}
              height={50}
              className="object-contain"
            /> 
            <span className="font-mono text-[11px] leading-tight tracking-[0.18em] uppercase">
              Trimurti
              <br />
              <span className="text-muted-foreground">Cement Article</span>
            </span>
            </div>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="https://wa.me/919723226674"
          className="hidden md:inline-flex items-center gap-2 border border-foreground/30 hover:border-highlight hover:text-highlight px-4 py-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors"
        >
          Protect My Plot →
        </a>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
        >
          <span className={`block h-px w-6 bg-foreground transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`block h-px w-6 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block h-px w-6 bg-foreground transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="flex flex-col px-5 py-6 gap-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-2xl uppercase tracking-tight"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://wa.me/919723226674"
              className="mt-2 inline-flex w-fit items-center gap-2 bg-highlight text-background px-5 py-3 font-mono text-[11px] tracking-[0.22em] uppercase"
            >
              Protect My Plot →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}