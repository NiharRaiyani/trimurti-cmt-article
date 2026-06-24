export function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">
        <span className="text-highlight">{eyebrow}</span>
      </p>
      <h2 className="h-display mt-4 text-[36px] md:text-[68px]">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
        {description}
      </p>
    </div>
  )
}