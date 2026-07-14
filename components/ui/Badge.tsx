import type { ReactNode } from "react"

type Tone = "brand" | "energy" | "neutral" | "warning"

const toneClasses: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200",
  energy: "bg-energy-50 text-energy-700 ring-1 ring-inset ring-energy-200",
  neutral: "bg-neutral-100 text-neutral-700 ring-1 ring-inset ring-neutral-200",
  warning: "bg-amber-50 text-amber-800 ring-1 ring-inset ring-amber-200",
}

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${toneClasses[tone]}`}
    >
      {children}
    </span>
  )
}
