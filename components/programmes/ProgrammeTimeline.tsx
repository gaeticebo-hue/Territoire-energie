import type { CalendarStep } from "@/lib/types"

const statusStyles: Record<CalendarStep["status"], string> = {
  done: "bg-energy-600 border-energy-600",
  current: "bg-white border-energy-600 ring-4 ring-energy-100",
  upcoming: "bg-white border-neutral-300",
}

export function ProgrammeTimeline({ steps }: { steps: CalendarStep[] }) {
  return (
    <ol className="relative space-y-8 border-l border-neutral-200 pl-8">
      {steps.map((step) => (
        <li key={step.id} className="relative">
          <span
            className={`absolute -left-[2.28rem] top-1 h-3.5 w-3.5 rounded-full border-2 ${statusStyles[step.status]}`}
            aria-hidden
          />
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{step.date}</p>
          <h3 className="mt-1 text-base font-semibold text-brand-950">{step.label}</h3>
          {step.description && (
            <p className="mt-1 text-sm leading-relaxed text-neutral-600">{step.description}</p>
          )}
          {step.status === "current" && (
            <span className="mt-2 inline-block rounded-full bg-energy-50 px-2.5 py-0.5 text-xs font-medium text-energy-700">
              Étape en cours
            </span>
          )}
        </li>
      ))}
    </ol>
  )
}
