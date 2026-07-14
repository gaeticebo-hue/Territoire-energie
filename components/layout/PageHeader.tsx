import type { ReactNode } from "react"

type Props = {
  eyebrow?: string
  title: string
  description?: string
  children?: ReactNode
}

export function PageHeader({ eyebrow, title, description, children }: Props) {
  return (
    <section className="border-b border-neutral-200 bg-brand-950">
      <div className="container-site py-16 sm:py-20">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-wide text-energy-400">{eyebrow}</p>
        )}
        <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-300">{description}</p>
        )}
        {children}
      </div>
    </section>
  )
}
