import Link from "next/link"

export function Button({
  href,
  children,
  className = "",
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 border border-foreground/30 px-5 py-3 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors hover:border-highlight hover:text-highlight ${className}`}
    >
      {children}
    </Link>
  )
}