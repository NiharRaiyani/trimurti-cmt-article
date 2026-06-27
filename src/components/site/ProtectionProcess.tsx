import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContourBackdrop } from "./ContourBackdrop";


const steps = [
  { n: "01", title: "Site Visit", body: "We map your plot, take measurements and understand access." },
  { n: "02", title: "Design & Plan", body: "Panel layout, post spacing and corner detailing on blueprint." },
  { n: "03", title: "Manufacturing", body: "RCC panels and posts cast at our Dadri facility, cured to spec." },
  { n: "04", title: "Installation", body: "Foundation, posts, panels — installed and sealed on site." },
];

const splitWords = (text: string) =>
  text.split(" ").map((w, i) => (
    <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
      <span className="proc-word inline-block will-change-transform">{w}</span>
    </span>
  ));

export function ProtectionProcess() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP — unchanged behaviour
      mm.add("(min-width: 768px)", () => {
        const path = root.current!.querySelector<SVGPathElement>(".proc-line");
        if (path) {
          const len = path.getTotalLength();
          path.style.strokeDasharray = `${len}`;
          path.style.strokeDashoffset = `${len}`;
          gsap.to(path, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 60%", scrub: true },
          });
        }
        gsap.from(".proc-step", {
          opacity: 0,
          y: 30,
          stagger: 0.15,
          duration: 0.9,
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
      });

      // MOBILE — unique scroll-trigger choreography
      mm.add("(max-width: 767px)", () => {
        // Vertical line draw scrub
        const vpath = root.current!.querySelector<SVGPathElement>(".proc-vline");
        if (vpath) {
          const len = vpath.getTotalLength();
          vpath.style.strokeDasharray = `${len}`;
          vpath.style.strokeDashoffset = `${len}`;
          gsap.to(vpath, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 75%",
              end: "bottom 80%",
              scrub: true,
            },
          });
        }

        const steps = gsap.utils.toArray<HTMLElement>(".proc-step");
        steps.forEach((step) => {
          const marker = step.querySelector(".proc-marker");
          const num = step.querySelector(".proc-num");
          const words = step.querySelectorAll(".proc-word");
          const body = step.querySelector(".proc-body");
          const dash = step.querySelector(".proc-dash");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: step,
              start: "top 82%",
              end: "top 45%",
              toggleActions: "play none none reverse",
            },
          });

          tl.from(marker, {
            scale: 0,
            rotate: -90,
            transformOrigin: "center",
            duration: 0.55,
            ease: "back.out(2)",
          })
            .from(num, { opacity: 0, x: -12, duration: 0.4 }, "-=0.3")
            .from(
              dash,
              { scaleX: 0, transformOrigin: "left center", duration: 0.5, ease: "power3.out" },
              "-=0.25"
            )
            .from(
              words,
              {
                yPercent: 110,
                rotate: 4,
                stagger: 0.06,
                duration: 0.6,
                ease: "power3.out",
              },
              "-=0.35"
            )
            .from(body, { opacity: 0, y: 16, duration: 0.5, ease: "power2.out" }, "-=0.25");
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={root} className="relative bg-background py-24 md:py-32 overflow-hidden">
      <ContourBackdrop variant="deep" particles={12} />
      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <p className="eyebrow"><span className="text-highlight">05 /</span> The Protection Process</p>
        <h2 className="h-display mt-4 text-[36px] md:text-[68px] max-w-3xl">
          From site visit to <br className="hidden md:block"/>permanent <span className="text-highlight">protection.</span>
        </h2>

        <div className="mt-16 md:mt-24 relative">
          {/* SVG line (desktop) */}
          <svg className="hidden md:block absolute left-0 right-0 top-12 h-12 w-full pointer-events-none" viewBox="0 0 1200 40" preserveAspectRatio="none">
            <path className="proc-line" d="M 40 20 L 1160 20" fill="none" stroke="var(--color-highlight)" strokeWidth="1.5" strokeDasharray="6 6" />
          </svg>

          {/* Vertical SVG line (mobile only) */}
          <svg
            className="md:hidden absolute left-4 top-2 bottom-2 w-3 h-[calc(100%-1rem)] pointer-events-none"
            viewBox="0 0 6 1000"
            preserveAspectRatio="none"
          >
            <path
              className="proc-vline"
              d="M 3 0 L 3 1000"
              fill="none"
              stroke="var(--color-highlight)"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 pl-10 md:pl-0">
            {steps.map((s) => (
              <div key={s.n} className="proc-step relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="proc-marker relative h-8 w-8 border border-highlight">
                    <div className="absolute inset-1 bg-highlight" />
                  </div>
                  <div className="proc-num font-mono text-highlight text-[12px] tracking-[0.3em]">{s.n}</div>
                  <div className="proc-dash md:hidden h-px flex-1 bg-highlight/40" />
                </div>
                <h3 className="h-display text-[28px] md:text-[36px] leading-[1.05]">
                  <span className="md:hidden">{splitWords(s.title)}</span>
                  <span className="hidden md:inline">{s.title}</span>
                </h3>
                <p className="proc-body mt-3 text-sm text-muted-foreground max-w-xs">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}