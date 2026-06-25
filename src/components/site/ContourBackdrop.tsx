"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Props {
  variant?: "dawn" | "deep" | "none";
  contour?: boolean;
  grid?: boolean;
  particles?: number;
  className?: string;
}

/**
 * Living, atmospheric background system.
 * Layers: gradient atmosphere → contour lines → survey grid → particle field.
 */
export function ContourBackdrop({
  variant = "dawn",
  contour = true,
  grid = true,
  particles = 14,
  className = "",
}: Props) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".cb-particle", {
        y: "+=20",
        x: "+=10",
        opacity: 0.7,
        duration: () => 6 + Math.random() * 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.4, from: "random" },
      });
      gsap.to(".cb-contour", {
        rotate: 0.5,
        scale: 1.02,
        duration: 18,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const atmosClass =
    variant === "dawn" ? "bg-atmos-dawn" : variant === "deep" ? "bg-atmos-deep" : "";

  return (
    <div
      ref={root}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {variant !== "none" && (
        <div className={`absolute inset-0 ${atmosClass} animate-drift`} />
      )}
      {contour && <div className="cb-contour absolute inset-0 bg-contour opacity-80" />}
      {grid && <div className="absolute inset-0 bg-survey opacity-40" />}
      {particles > 0 && (
        <div className="absolute inset-0">
          {Array.from({ length: particles }).map((_, i) => (
            <span
              key={i}
              className="cb-particle absolute block h-1 w-1 rounded-full bg-foreground/40"
              style={{
                left: `${(i * 53) % 100}%`,
                top: `${(i * 37) % 100}%`,
                opacity: 0.3,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}