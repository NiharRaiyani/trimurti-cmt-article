"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emptyLand from "@/assets/hero-empty-land.jpg";
import wallImg from "@/assets/wall-cinematic.jpg";
import { ContourBackdrop } from "./ContourBackdrop";
import { useMagnetic } from "@/hooks/useMagnetic";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export function HeroBoundary() {
  const root = useRef<HTMLDivElement>(null);
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.25);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      // Survey-point assembly: letters drop in from above their final position
      const splitLetters = (sel: string) => {
        root.current!.querySelectorAll<HTMLElement>(sel).forEach((word) => {
          const text = word.textContent || "";
          word.textContent = "";
          text.split("").forEach((ch) => {
            const s = document.createElement("span");
            s.textContent = ch;
            s.className = "inline-block hero-letter";
            s.style.willChange = "transform, opacity";
            if (ch === " ") s.style.width = "0.3em";
            word.appendChild(s);
          });
        });
      };
      splitLetters(".hero-word");

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-coord", { opacity: 0, y: 8, duration: 0.9, stagger: 0.08 })
        .from(".hero-dot", { scale: 0, opacity: 0, duration: 0.5, stagger: 0.08 }, "<")
        .from(".hero-eyebrow", { opacity: 0, y: 12, duration: 0.7 }, "-=0.6")
        .from(
          ".hero-letter",
          {
            y: -40,
            opacity: 0,
            rotate: () => gsap.utils.random(-12, 12),
            duration: 0.9,
            ease: "power3.out",
            stagger: { each: 0.012, from: "random" },
          },
          "-=0.4",
        )
        .from(".hero-sub", { opacity: 0, y: 14, duration: 0.7 }, "-=0.5")
        .from(".hero-cta", { opacity: 0, y: 14, duration: 0.7, stagger: 0.1 }, "-=0.5");

      // Boundary path draw — chartreuse highlight
      const path = root.current!.querySelector<SVGPathElement>(".hero-line");
      if (path) {
        const len = path.getTotalLength();
        path.style.strokeDasharray = `${len}`;
        path.style.strokeDashoffset = `${len}`;
        gsap.to(path, { strokeDashoffset: 0, duration: 2.4, delay: 0.4, ease: "power2.out" });
      }

      // Scroll-driven wall reveal + parallax
      gsap.fromTo(".hero-wall", { opacity: 0, scale: 1.1 }, {
        opacity: 0.45, scale: 1, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-empty", {
        opacity: 0.12, scale: 1.05,
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-content", {
        y: -80, opacity: 0.3,
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });

      // Cursor-reactive survey overlay (desktop only)
      if (!window.matchMedia("(pointer: coarse)").matches) {
        const overlay = root.current!.querySelector<HTMLElement>(".hero-cursor");
        const handler = (e: MouseEvent) => {
          const rect = root.current!.getBoundingClientRect();
          gsap.to(overlay, {
            x: e.clientX - rect.left, y: e.clientY - rect.top,
            duration: 0.9, ease: "power3.out",
          });
        };
        root.current!.addEventListener("mousemove", handler);
        return () => root.current?.removeEventListener("mousemove", handler);
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="top"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-background noise"
    >
      <Image src={emptyLand} alt="" className="hero-empty absolute inset-0 h-full w-full object-cover opacity-30" />
      <Image src={wallImg} alt="" className="hero-wall absolute inset-0 h-full w-full object-cover opacity-0" />

      {/* Atmospheric gradient + contour + grid */}
      <ContourBackdrop variant="dawn" particles={18} />

      {/* Cursor-following survey reticle (desktop) */}
      <div className="hero-cursor pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 hidden md:block">
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 border border-highlight/40 rounded-full animate-glow" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-highlight/30" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-highlight/30" />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />

      {/* Coordinates */}
      <div className="hero-coord absolute top-24 right-5 md:top-28 md:right-10 text-right font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
        <div>28.5937° N</div>
        <div>77.4481° E</div>
        <div className="mt-3 text-highlight">PLOT AREA</div>
        <div>2,150 SQ.M</div>
      </div>
      <div className="hero-coord absolute bottom-6 left-5 md:bottom-10 md:left-10 font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="h-px w-8 bg-highlight/70" />
          Scroll to mark your land
        </div>
      </div>

      {/* SVG survey boundary */}
      <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <path className="hero-line" d="M 120 640 L 260 560 L 480 600 L 780 520 L 1060 580 L 1080 640"
          fill="none" stroke="var(--color-highlight)" strokeWidth="1.5" />
        <circle className="hero-dot animate-pulse-dot" cx="260" cy="560" r="4" fill="var(--color-highlight)" />
        <circle className="hero-dot" cx="480" cy="600" r="3" fill="var(--color-highlight)" />
        <circle className="hero-dot" cx="780" cy="520" r="3" fill="var(--color-highlight)" />
        <circle className="hero-dot" cx="1060" cy="580" r="3" fill="var(--color-highlight)" />
      </svg>

      {/* Content */}
      <div className="hero-content relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-24 md:px-10 md:pb-32">
        {/* <p className="hero-eyebrow eyebrow mb-5 md:mb-8">
          <span className="text-highlight">●</span> Dadri · Greater Noida · UP
        </p> */}
        <h1 className="h-display text-foreground text-[44px] sm:text-[64px] md:text-[112px] lg:text-[140px]">
          <span className="block overflow-hidden"><span className="hero-word inline-block">Everything</span></span>
          <span className="block overflow-hidden"><span className="hero-word inline-block">begins with</span></span>
          <span className="block overflow-hidden">
            <span className="hero-word inline-block">a&nbsp;</span>
            <span className="hero-word inline-block text-highlight">boundary.</span>
          </span>
        </h1>
        <p className="hero-sub mt-6 max-w-md text-sm md:text-base text-foreground/75">
          From empty land to permanent protection. RCC precast walls, security cabins
          and ready-made structures — manufactured in Dadri, installed across North India.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a ref={ctaRef} href="https://wa.me/91973226674"
            className="hero-cta btn-magnetic group inline-flex items-center gap-3 bg-highlight text-background px-6 py-4 font-mono   text-[11px] tracking-[0.22em] uppercase">
            Protect My Plot
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}