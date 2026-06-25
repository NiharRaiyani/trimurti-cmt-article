"use client";

import { useEffect } from "react"
import Lenis from "lenis"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { gsap } from "gsap"

gsap.registerPlugin(ScrollTrigger)

export function useLenis() {
  useEffect(() => {
    if (typeof window === "undefined") return

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      lerp: 0.1,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    lenis.on("scroll", ScrollTrigger.update)

    return () => {
      lenis.destroy()
    }
  }, [])
}