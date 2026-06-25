import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import Image from "next/image";
import emptyLand from "@/assets/hero-empty-land.jpg";
import wallImg from "@/assets/wall-cinematic.jpg";
import aerial from "@/assets/aerial-protected.jpg";
import boundary from "@/assets/boundary.jpg";

const chapters = [
  {
    n: "01",
    title: "Uncertainty",
    body: "An empty plot is vulnerable to disputes, encroachment and the slow erosion of ownership.",
    img: emptyLand,
  },
  {
    n: "02",
    title: "Boundary",
    body: "A line is drawn. Survey markers go down. Ownership takes a physical form.",
    img: boundary,
  },
  {
    n: "03",
    title: "Protection",
    body: "Precast wall segments rise. Each panel locks the perimeter into place.",
    img: wallImg,
  },
  {
    n: "04",
    title: "Confidence",
    body: "Your land. Your future. Permanent. Documented. Defended.",
    img: aerial,
  },
];

// Split a string into <span class="word"><span class="word-inner">w</span></span>
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

export function TransformationStory() {
  const root = useRef<HTMLDivElement>(null);
  const mobileRoot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      if (!root.current) return;
      const ctx = gsap.context(() => {
        const panels = gsap.utils.toArray<HTMLElement>(".story-panel");
        const tween = gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            pin: true,
            scrub: 1,
            end: () => "+=" + (root.current!.offsetWidth * (panels.length - 1)),
          },
        });
        panels.forEach((p) => {
          gsap.from(p.querySelectorAll(".reveal"), {
            opacity: 0,
            y: 30,
            stagger: 0.08,
            duration: 0.8,
            scrollTrigger: {
              trigger: p,
              containerAnimation: tween,
              start: "left center",
            },
          });
        });
      }, root);
      return () => ctx.revert();
    });

    // MOBILE: cinematic per-card scroll animations
    mm.add("(max-width: 767px)", () => {
      if (!mobileRoot.current) return;
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".story-mcard");
        cards.forEach((card) => {
          const img = card.querySelector<HTMLElement>(".story-mimg");
          const overlay = card.querySelector<HTMLElement>(".story-moverlay");
          const num = card.querySelector<HTMLElement>(".story-mnum");
          const title = card.querySelector<HTMLElement>(".story-mtitle");
          const titleInners = card.querySelectorAll<HTMLElement>(".story-mtitle .word-inner");
          const bodyInners = card.querySelectorAll<HTMLElement>(".story-mbody .word-inner");
          const line = card.querySelector<HTMLElement>(".story-mline");
          const chip = card.querySelector<HTMLElement>(".story-mchip");

          // Entrance — clip-path image reveal + word rise
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          });
          tl.fromTo(
            img,
            { clipPath: "inset(50% 0% 50% 0%)", scale: 1.25 },
            { clipPath: "inset(0% 0% 0% 0%)", scale: 1.05, duration: 1.1, ease: "expo.out" }
          )
            .fromTo(
              overlay,
              { opacity: 0 },
              { opacity: 1, duration: 0.6, ease: "power2.out" },
              "-=0.7"
            )
            .from(
              chip,
              { x: -20, opacity: 0, duration: 0.5, ease: "power3.out" },
              "-=0.5"
            )
            .from(
              num,
              { y: 60, opacity: 0, duration: 0.7, ease: "expo.out" },
              "-=0.4"
            )
            .from(
              titleInners,
              { yPercent: 110, opacity: 0, stagger: 0.06, duration: 0.7, ease: "expo.out" },
              "-=0.5"
            )
            .from(
              line,
              { scaleX: 0, transformOrigin: "left center", duration: 0.5, ease: "power2.out" },
              "-=0.3"
            )
            .from(
              bodyInners,
              { yPercent: 110, opacity: 0, stagger: 0.015, duration: 0.5, ease: "power3.out" },
              "-=0.3"
            );

          // Parallax scrub — image drifts, title rises slowly while card is in view
          gsap.to(img, {
            yPercent: -12,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
          gsap.to(title, {
            yPercent: -18,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      }, mobileRoot);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="story" className="relative bg-background">
      <div className="mx-auto max-w-[1600px] px-5 pt-24 pb-10 md:px-10 md:pt-32">
        <p className="eyebrow"><span className="text-highlight">02 /</span> The Transformation Story</p>
        <h2 className="h-display mt-4 text-[36px] md:text-[68px] max-w-3xl">
          From uncertainty <br className="hidden md:block" />to <span className="text-highlight">ownership.</span>
        </h2>
      </div>

      {/* Desktop: pinned horizontal */}
      <div ref={root} className="hidden md:block overflow-hidden">
        <div className="flex w-[400vw] h-[100svh]">
          {chapters.map((c) => (
            <div key={c.n} className="story-panel relative w-screen h-full shrink-0">
              <Image src={c.img} alt={c.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/30 to-transparent" />
              <div className="absolute inset-0 bg-survey-fine opacity-30" />
              <div className="relative z-10 flex h-full flex-col justify-end p-10 md:p-16 max-w-2xl">
                <div className="reveal font-mono text-highlight text-[12px] tracking-[0.3em]">CHAPTER {c.n}</div>
                <h3 className="reveal h-display text-foreground text-[80px] md:text-[140px] mt-3">{c.title}</h3>
                <p className="reveal mt-6 max-w-md text-muted-foreground text-base">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: cinematic stacked cards with bespoke scroll choreography */}
      <div ref={mobileRoot} className="md:hidden">
        {chapters.map((c) => (
          <article
            key={c.n}
            className="story-mcard relative h-[88svh] w-full overflow-hidden border-t border-border/40"
          >
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={c.img}
                alt={c.title}
                className="story-mimg absolute inset-0 h-[115%] w-full object-cover will-change-transform"
                loading="lazy"
              />
            </div>
            <div className="story-moverlay absolute inset-0 bg-gradient-to-t from-background via-background/55 to-transparent" />
            <div className="absolute inset-0 bg-survey-fine opacity-20 pointer-events-none" />

            {/* top chip */}
            <div className="story-mchip absolute top-5 left-5 flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-highlight">
              <span className="inline-block h-px w-6 bg-highlight" />
              Chapter {c.n}
            </div>

            {/* big outline number */}
            <div
              className="story-mnum absolute top-16 right-4 font-mono text-[140px] leading-none tracking-tighter pointer-events-none select-none"
              style={{
                WebkitTextStroke: "1px hsl(var(--highlight) / 0.35)",
                color: "transparent",
              }}
            >
              {c.n}
            </div>

            <div className="relative z-10 flex h-full flex-col justify-end p-6 pb-10">
              <h3 className="story-mtitle h-display text-[56px] leading-[0.95] will-change-transform">
                {splitWords(c.title)}
              </h3>
              <div className="story-mline mt-4 h-px w-16 bg-highlight" />
              <p className="story-mbody mt-4 text-sm text-foreground/85 max-w-sm leading-relaxed">
                {splitWords(c.body)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}