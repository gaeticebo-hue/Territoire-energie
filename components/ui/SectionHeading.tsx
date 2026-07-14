type Props = {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
}

export function SectionHeading({ eyebrow, title, description, align = "left" }: Props) {
  const alignClasses = align === "center" ? "text-center mx-auto" : "text-left"

  return (
    <div className={`max-w-2xl ${alignClasses}`}>
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-energy-600">{eyebrow}</p>
      )}
      <h2 className="text-2xl font-semibold tracking-tight text-brand-950 sm:text-3xl">{title}</h2>
      {description && <p className="mt-3 text-base leading-relaxed text-neutral-600">{description}</p>}
    </div>
  )
}
