import type { CalendarStep } from "@/lib/types"

export function ProgrammeProgress({ steps }: { steps: CalendarStep[] }) {
  const total = steps.length
  const done = steps.filter((s) => s.status === "done").length
  const current = steps.find((s) => s.status === "current")
  const percent = total > 0 ? Math.round((done / total) * 100) : 0

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="text-sm font-medium text-neutral-700">Avancement du programme</p>
        <p className="text-sm font-semibold text-brand-800">{percent}%</p>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-neutral-200">
        <div className="h-full rounded-full bg-energy-500 transition-all" style={{ width: `${percent}%` }} />
      </div>
      {current && (
        <p className="mt-2 text-sm text-neutral-600">
          Étape en cours : <span className="font-medium text-brand-900">{current.label}</span>
        </p>
      )}
    </div>
  )
}
