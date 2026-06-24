import { cn } from "@/lib/utils"

export function Container({
  className,
  children,
}: Readonly<{
  className?: string
  children: React.ReactNode
}>) {
  return <div className={cn("mx-auto w-full max-w-[1600px] px-5 md:px-10", className)}>{children}</div>
}