import type { ContactItem, NavLink, ProcessStep, StatItem, SystemCard } from "@/types/site"

export const navLinks: NavLink[] = [
  { label: "Story", href: "#story" },
  { label: "Systems", href: "#systems" },
  { label: "Proof", href: "#proof" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
]

export const systemCards: SystemCard[] = [
  {
    n: "01",
    verb: "Protect the",
    noun: "Boundary",
    product: "Compound Walls",
    img: "/images/boundary.jpg",
    h: "Precast RCC wall systems for secure perimeters.",
  },
  {
    n: "02",
    verb: "Protect the",
    noun: "Entrance",
    product: "Gate Solutions",
    img: "/images/fence.jpg",
    h: "Strong entry points built for durability.",
  },
  {
    n: "03",
    verb: "Protect the",
    noun: "Workforce",
    product: "Security Cabins",
    img: "/images/cabin.jpg",
    h: "Practical on-site structures for protection and control.",
  },
]

export const stats: StatItem[] = [
  { v: 500, suf: "+", l: "Plots Protected" },
  { v: 250, suf: "+ KM", l: "Walls Installed" },
  { v: 15, suf: "+ YRS", l: "Field Experience" },
  { v: 100, suf: "%", l: "On-time Delivery" },
]

export const processSteps: ProcessStep[] = [
  { n: "01", title: "Site Visit", description: "We inspect the site and understand the requirement." },
  { n: "02", title: "Planning", description: "We finalize measurements, layout, and execution plan." },
  { n: "03", title: "Execution", description: "We build and install with quality checks at each step." },
]

export const contactItems: ContactItem[] = [
  { label: "Call", value: "+91 79876 74523", href: "tel:+917987674523" },
  { label: "WhatsApp", value: "Message us", href: "https://wa.me/917987674523" },
  { label: "Email", value: "trimurticementarticle@gmail.com", href: "mailto:trimurticementarticle@gmail.com" },
]