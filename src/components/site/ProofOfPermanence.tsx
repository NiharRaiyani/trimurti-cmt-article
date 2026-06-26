"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import  Image, { StaticImageData } from "next/image";
import aerial from "@/assets/aerial-protected.jpg";
import wall from "@/assets/wall-cinematic.jpg";
import boundary from "@/assets/boundary.jpg";
import { ContourBackdrop } from "./ContourBackdrop";

const stats = [
  { v: 500, suf: "+", l: "Plots Protected" },
  { v: 250, suf: "+ KM", l: "Walls Installed" },
  { v: 15, suf: "+ YRS", l: "Field Experience" },
  { v: 100, suf: "%", l: "On-time Delivery" },
];

type Project = {
  id: string;
  place: string;
  title: string;
  days: string;
//   img: string;
  img: StaticImageData | string;
  gallery: (StaticImageData | string)[];
//   gallery: string[];
  summary: string;
};

const projects: Project[] = [
  {
    id: "dadri",
    place: "Dadri, Gautam Buddh Nagar",
    title: "2.4 KM Compound Wall",
    days: "Completed in 12 days",
    img: wall,
    gallery: [wall, aerial, boundary],
    summary: "Heavy-duty perimeter wall securing 18 acres of industrial land with reinforced footings and anti-climb capping.",
  },
  {
    id: "gn-industrial",
    place: "Greater Noida",
    title: "Industrial Plot Protection",
    days: "Completed in 9 days",
    img: aerial,
    gallery: [aerial, wall, boundary],
    summary: "End-to-end boundary, gates and signage handed over in under 10 days — ready for fit-out the next morning.",
  },
  {
    id: "noida-ext",
    place: "Noida Extension",
    title: "Farmhouse Boundary",
    days: "Ready in 7 days",
    img: boundary,
    gallery: [boundary, wall, aerial],
    summary: "Aesthetic stone-finish boundary with internal landscaping protection for a 2-acre weekend estate.",
  },
  {
    id: "yamuna",
    place: "Yamuna Expressway",
    title: "Farmland Demarcation",
    days: "Completed in 5 days",
    img: aerial,
    gallery: [aerial, boundary, wall],
    summary: "Pillar + barbed-wire demarcation across 6 acres, with corner markers registered to the title map.",
  },
  {
    id: "sector-150",
    place: "Sector 150, Noida",
    title: "Residential Plot Wall",
    days: "Completed in 8 days",
    img: wall,
    gallery: [wall, boundary, aerial],
    summary: "Brick + plaster wall with steel gate on a 300 sq.yd plot — designed to deter encroachment.",
  },
  {
    id: "jewar",
    place: "Jewar",
    title: "Airport Corridor Plot",
    days: "Completed in 11 days",
    img: boundary,
    gallery: [boundary, aerial, wall],
    summary: "Long-run boundary with reflective markers along an active corridor — visibility tested at night.",
  },
];

export function ProofOfPermanence() {
  const root = useRef<HTMLDivElement>(null);
  const marqueeWrap = useRef<HTMLDivElement>(null);
  const marqueeTrack = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Project | null>(null);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (!root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Counters (all screens)
      gsap.utils.toArray<HTMLElement>(".count").forEach((el) => {
        const target = Number(el.dataset.v);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => (el.textContent = Math.floor(obj.v).toString()),
        });
      });

      const mm = gsap.matchMedia();

      // ---------- MARQUEE (all screens) ----------
      const track = marqueeTrack.current;
      const wrap = marqueeWrap.current;
      if (track && wrap) {
        requestAnimationFrame(() => {
          const distance = track.scrollWidth / 2;
          if (!distance) return;
          const tween = gsap.to(track, {
            x: -distance,
            duration: Math.max(28, distance / 50),
            ease: "none",
            repeat: -1,
          });
          const pause = () => tween.timeScale(0.15);
          const resume = () => tween.timeScale(1);
          wrap.addEventListener("pointerdown", pause);
          wrap.addEventListener("pointerup", resume);
          wrap.addEventListener("pointerleave", resume);
          wrap.addEventListener("mouseenter", pause);
          wrap.addEventListener("mouseleave", resume);
        });

        gsap.from(".pp-mcard", {
          opacity: 0,
          y: 40,
          scale: 0.94,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".pp-marquee", start: "top 80%" },
        });
      }

      // ---------- MOBILE-only headline reveal ----------
      mm.add("(max-width: 1023px)", () => {
        gsap.from(".proof-word", {
          yPercent: 115,
          rotate: 3,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".proof-head", start: "top 80%" },
        });
        gsap.from(".proof-eyebrow", {
          opacity: 0,
          x: -20,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".proof-head", start: "top 85%" },
        });
        gsap.from(".pp-stat", {
          opacity: 0,
          y: 30,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".pp-stats", start: "top 85%" },
        });
      });

    }, root);
    return () => ctx.revert();
  }, []);

  // Lightbox keyboard nav
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setSlide((s) => (s + 1) % active.gallery.length);
      if (e.key === "ArrowLeft") setSlide((s) => (s - 1 + active.gallery.length) % active.gallery.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  const open = (p: Project) => {
    setSlide(0);
    setActive(p);
  };

  const headline = ["Real", "land.", "Real", "walls.", "Real", "outcomes."];

  return (
    <section id="proof" ref={root} className="relative bg-background py-24 md:py-32 overflow-hidden">
      <ContourBackdrop variant="dawn" grid={false} particles={10} />
      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="proof-head">
          <p className="eyebrow proof-eyebrow"><span className="text-highlight">04 /</span> Proof of Permanence</p>
          <h2 className="h-display mt-4 text-[36px] md:text-[68px] max-w-3xl leading-[1.05]">
            <span className="inline-flex flex-wrap gap-x-3 gap-y-1 overflow-hidden">
              {headline.map((w, i) => (
                <span key={i} className="inline-block overflow-hidden">
                  <span className={`proof-word inline-block ${i >= 4 ? "text-highlight" : ""}`}>{w}</span>
                </span>
              ))}
            </span>
          </h2>

        </div>

        {/* INFINITE MARQUEE (all screens) */}
        <div className="mt-12 md:mt-20 pp-marquee">
          <div
            ref={marqueeWrap}
            className="relative overflow-hidden -mx-5 md:-mx-10 px-5 md:px-10"
            style={{ maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)" }}
          >
            <div ref={marqueeTrack} className="flex gap-4 md:gap-8 w-max will-change-transform">
              {[...projects, ...projects].map((p, i) => (
                <button
                  key={`${p.id}-${i}`}
                  onClick={() => open(p)}
                  className="pp-mcard group relative w-[72vw] max-w-[300px] md:w-[420px] md:max-w-none lg:w-[480px] shrink-0 text-left"
                >
                  <div className="relative aspect-[4/5] md:aspect-[4/3] overflow-hidden border border-border">
                    <Image src={p.img} alt={p.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110 group-active:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-colors duration-500 hidden md:block" />
                    <div className="absolute inset-0 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-highlight border border-highlight px-4 py-2 bg-background/40 backdrop-blur-sm">View Gallery</span>
                    </div>
                    <div className="absolute top-3 left-3 md:hidden font-mono text-[9px] tracking-[0.22em] uppercase text-highlight border border-highlight/60 px-2 py-1 bg-background/40 backdrop-blur-sm">
                      Tap
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="font-mono text-[9px] md:text-[10px] tracking-[0.22em] uppercase text-muted-foreground">{p.place}</div>
                      <h3 className="mt-2 text-lg md:text-2xl font-display leading-tight">{p.title}</h3>
                      <div className="mt-1 font-mono text-[10px] tracking-[0.18em] uppercase text-highlight">{p.days}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <p className="mt-4 md:mt-6 text-center font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
            <span className="md:hidden">← swipe · tap to explore →</span>
            <span className="hidden md:inline">hover to pause · click any project to open the gallery</span>
          </p>
        </div>


        {/* STATS */}
        <div className="pp-stats mt-20 grid grid-cols-2 md:grid-cols-4 border-y border-border">
          {stats.map((s) => (
            <div key={s.l} className="pp-stat p-6 md:p-8 border-r border-border last:border-r-0 [&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-r">
              <div className="flex items-baseline gap-1 h-display text-[44px] md:text-[72px] text-foreground">
                <span className="count" data-v={s.v}>0</span>
                <span className="text-highlight text-[24px] md:text-[36px]">{s.suf}</span>
              </div>
              <div className="mt-2 font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {active && (
        <div
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md animate-fade-in"
          onClick={() => setActive(null)}
        >
          <div className="absolute inset-0 flex flex-col" onClick={(e) => e.stopPropagation()}>
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 md:px-10 py-5 border-b border-border">
              <div>
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-highlight">{active.place}</div>
                <h3 className="mt-1 text-xl md:text-3xl font-display tracking-tight">{active.title}</h3>
              </div>
              <button
                onClick={() => setActive(null)}
                aria-label="Close gallery"
                className="group h-11 w-11 md:h-12 md:w-12 grid place-items-center border border-border hover:border-highlight transition-colors"
              >
                <span className="relative block h-5 w-5">
                  <span className="absolute inset-x-0 top-1/2 h-px bg-foreground rotate-45 group-hover:bg-highlight transition-colors" />
                  <span className="absolute inset-x-0 top-1/2 h-px bg-foreground -rotate-45 group-hover:bg-highlight transition-colors" />
                </span>
              </button>
            </div>

            {/* Main image */}
            <div className="flex-1 relative overflow-hidden flex items-center justify-center px-5 md:px-10 py-6">
              <Image
                key={slide}
                src={active.gallery[slide]}
                alt={`${active.title} ${slide + 1}`}
                className="max-h-full max-w-full object-contain animate-scale-in"
              />
              {active.gallery.length > 1 && (
                <>
                  <button
                    onClick={() => setSlide((s) => (s - 1 + active.gallery.length) % active.gallery.length)}
                    aria-label="Previous"
                    className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 h-12 w-12 grid place-items-center border border-border bg-background/60 backdrop-blur hover:border-highlight hover:text-highlight transition-colors"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => setSlide((s) => (s + 1) % active.gallery.length)}
                    aria-label="Next"
                    className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 h-12 w-12 grid place-items-center border border-border bg-background/60 backdrop-blur hover:border-highlight hover:text-highlight transition-colors"
                  >
                    →
                  </button>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 md:px-10 py-5 border-t border-border flex items-center justify-between gap-6">
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl">{active.summary}</p>
              <div className="flex items-center gap-2 shrink-0">
                {active.gallery.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlide(i)}
                    aria-label={`Slide ${i + 1}`}
                    className={`h-1.5 transition-all ${i === slide ? "w-8 bg-highlight" : "w-4 bg-border hover:bg-muted-foreground"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}