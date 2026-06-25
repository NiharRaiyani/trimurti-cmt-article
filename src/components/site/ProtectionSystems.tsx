"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import wallImg from "@/assets/wall-cinematic.jpg";
import cabin from "@/assets/cabin.jpg";
import room from "@/assets/room.jpg";
import fence from "@/assets/fence.jpg";
import panels from "@/assets/panels.jpg";

const systems = [
  { n: "01", verb: "Protect the", noun: "Boundary", product: "Compound Walls", img: wallImg, h: "Up to 12 ft tall, single-pour RCC panels with H-section posts." },
  { n: "02", verb: "Protect the", noun: "Entrance", product: "Security Cabins", img: cabin, h: "Modular precast cabins, wired and ready in 48 hours on site." },
  { n: "03", verb: "Protect the", noun: "Workforce", product: "Precast Rooms", img: room, h: "Ready-made rooms for site office, storage and labour quarters." },
  { n: "04", verb: "Protect the", noun: "Perimeter", product: "Fencing Systems", img: fence, h: "Concrete-post fencing with mesh or barbed crown options." },
  { n: "05", verb: "Protect the", noun: "Future", product: "Ready-Made Structures", img: panels, h: "Custom precast modules manufactured at our Dadri facility." },
];

function splitChars(text: string) {
  return text.split("").map((ch, i) => (
    <span key={i} className="char inline-block overflow-hidden align-bottom" style={{ lineHeight: 0.95 }}>
      <span className="char-inner inline-block will-change-transform" style={{ lineHeight: 0.95 }}>
        {ch === " " ? "\u00A0" : ch}
      </span>
    </span>
  ));
}

function splitWords(text: string) {
  return text.split(/(\s+)/).map((part, i) =>
    /\s+/.test(part) ? (
      <span key={i}>{part}</span>
    ) : (
      <span key={i} className="word inline-block overflow-hidden align-bottom">
        <span className="word-inner inline-block will-change-transform">{part}</span>
      </span>
    )
  );
}

export function ProtectionSystems() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const mm = gsap.matchMedia();

    mm.add("(max-width: 1023px)", () => {
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".sys-mobile-card");
        cards.forEach((card) => {
          const img = card.querySelector<HTMLElement>(".sys-img");
          const veil = card.querySelector<HTMLElement>(".sys-veil");
          const num = card.querySelector<HTMLElement>(".sys-num");
          const verb = card.querySelectorAll<HTMLElement>(".sys-verb .word-inner");
          const nounChars = card.querySelectorAll<HTMLElement>(".sys-noun .char-inner");
          const line = card.querySelector<HTMLElement>(".sys-line");
          const product = card.querySelector<HTMLElement>(".sys-product");
          const desc = card.querySelectorAll<HTMLElement>(".sys-desc .word-inner");
          const badge = card.querySelector<HTMLElement>(".sys-badge");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });

          tl.fromTo(
            veil,
            { scaleY: 1, transformOrigin: "top center" },
            { scaleY: 0, duration: 1.0, ease: "expo.inOut" }
          )
            .fromTo(
              img,
              { scale: 1.35, filter: "brightness(0.55) saturate(0.7)" },
              { scale: 1.02, filter: "brightness(1) saturate(1)", duration: 1.3, ease: "expo.out" },
              "<"
            )
            .from(
              num,
              { y: 30, opacity: 0, duration: 0.6, ease: "power3.out" },
              "-=0.8"
            )
            .from(
              badge,
              { x: 20, opacity: 0, duration: 0.5, ease: "power3.out" },
              "<"
            )
            .from(
              verb,
              { yPercent: 110, opacity: 0, stagger: 0.04, duration: 0.5, ease: "expo.out" },
              "-=0.4"
            )
            .from(
              nounChars,
              { yPercent: 110, opacity: 0, rotate: 6, stagger: 0.035, duration: 0.7, ease: "expo.out" },
              "-=0.3"
            )
            .from(
              line,
              { scaleX: 0, transformOrigin: "left center", duration: 0.6, ease: "power2.out" },
              "-=0.4"
            )
            .from(
              product,
              { y: 14, opacity: 0, duration: 0.5, ease: "power2.out" },
              "-=0.3"
            )
            .from(
              desc,
              { yPercent: 110, opacity: 0, stagger: 0.015, duration: 0.5, ease: "power3.out" },
              "-=0.25"
            );

          // Parallax on image while in view
          gsap.to(img, {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      }, root);
      return () => ctx.revert();
    });

    mm.add("(min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        const track = root.current!.querySelector<HTMLElement>(".sys-track")!;
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth + 40),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            pin: true,
            scrub: 1,
            end: () => "+=" + (track.scrollWidth - window.innerWidth),
          },
        });
      }, root);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      id="systems"
      ref={root}
      className="relative bg-background overflow-hidden lg:h-[100svh]"
    >
      <div className="lg:h-full lg:flex lg:items-center">
        <div className="sys-track flex flex-col lg:flex-row gap-5 px-5 md:px-10 lg:px-0 lg:pl-10 pt-20 pb-20 lg:py-0 lg:w-max lg:items-center">
          {/* Intro slide — desktop */}
          <div className="hidden lg:flex shrink-0 w-[42vw] xl:w-[36vw] h-[72svh] flex-col justify-between pr-10">
            <p className="eyebrow">
              <span className="text-highlight">03 /</span> Protection Systems
            </p>
            <div>
              <h2 className="h-display text-[56px] xl:text-[72px]">
                Five systems.<br /><span className="text-highlight">Five layers</span> of protection.
              </h2>
              <div className="mt-6 h-px w-16 bg-highlight" />
              <p className="mt-6 max-w-md text-sm text-muted-foreground">
                Scroll horizontally — each system locks a different edge of your property into place.
              </p>
            </div>
          </div>

          {/* Mobile heading */}
          <div className="lg:hidden w-full px-1 mb-2">
            <p className="eyebrow">
              <span className="text-highlight">03 /</span> Protection Systems
            </p>
            <h2 className="h-display mt-3 text-[36px] md:text-[56px]">
              Five systems.<br /><span className="text-highlight">Five layers</span> of protection.
            </h2>
          </div>

          {systems.map((s) => (
            <article
              key={s.n}
              className="sys-mobile-card group relative w-full lg:w-[30vw] xl:w-[26vw] h-[68svh] min-h-[540px] max-h-[680px] lg:h-[72svh] lg:min-h-0 lg:max-h-none shrink-0 overflow-hidden border border-border bg-card"
            >
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={s.img}
                  alt={s.product}
                  className="sys-img absolute inset-0 h-[115%] w-full object-cover will-change-transform"
                  loading="lazy"
                />
              </div>
              {/* Veil that wipes away (mobile-only effect, harmless on desktop) */}
              <div className="sys-veil absolute inset-0 bg-background lg:hidden z-20" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute inset-0 bg-survey-fine opacity-15 pointer-events-none" />

              <div className="absolute inset-x-0 top-0 flex justify-between p-5 md:p-7 z-10">
                <span className="sys-num font-mono text-highlight text-[12px] tracking-[0.3em]">{s.n}</span>
                <span className="sys-badge font-mono text-muted-foreground text-[10px] tracking-[0.22em] uppercase">System</span>
              </div>

              {/* Large outline noun in the back (mobile only) */}
              <div
                className="absolute top-14 right-3 lg:hidden font-mono text-[96px] leading-none tracking-tighter pointer-events-none select-none z-[5]"
                style={{
                  WebkitTextStroke: "1px hsl(var(--highlight) / 0.25)",
                  color: "transparent",
                }}
              >
                {s.n}
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 md:p-7 z-10">
                <div className="sys-verb font-mono text-[10px] tracking-[0.28em] uppercase text-highlight">
                  {splitWords(s.verb)}
                </div>
                <h3 className="sys-noun h-display text-[36px] md:text-[44px] mt-1 leading-[0.95]">
                  {splitChars(s.noun)}
                </h3>
                <div className="sys-line mt-3 h-px w-12 bg-highlight" />
                <div className="sys-product mt-3 text-sm text-foreground/80">{s.product}</div>
                <p className="sys-desc mt-2 text-sm text-muted-foreground max-w-sm leading-relaxed">
                  {splitWords(s.h)}
                </p>
              </div>
            </article>
          ))}
          <div className="hidden lg:block w-10 shrink-0" />
        </div>
      </div>
    </section>
  );
}