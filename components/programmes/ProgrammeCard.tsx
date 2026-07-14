import Link from "next/link"
import type { Programme } from "@/lib/types"
import { StatusBadge } from "./StatusBadge"

export function ProgrammeCard({ programme }: { programme: Programme }) {
  return (
    <Link
      href={`/programmes/${programme.slug}`}
      className="group flex flex-col rounded-xl border border-neutral-200 bg-white p-7 transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Édition {programme.edition}
          </p>
          <h3 className="mt-1 text-xl font-semibold text-brand-950 group-hover:text-brand-700">
            {programme.title} #{programme.edition}
          </h3>
        </div>
        <StatusBadge status={programme.status} />
      </div>

      <p className="mt-4 text-sm leading-relaxed text-neutral-600">{programme.description}</p>

      <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-neutral-100 pt-5 text-sm">
        {programme.targetVolumeGWh && (
          <div>
            <dt className="text-neutral-500">Volume visé</dt>
            <dd className="mt-0.5 font-medium text-brand-900">{programme.targetVolumeGWh}</dd>
          </div>
        )}
        {programme.geography && (
          <div>
            <dt className="text-neutral-500">Territoire</dt>
            <dd className="mt-0.5 font-medium text-brand-900">{programme.geography}</dd>
          </div>
        )}
      </dl>

      <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-energy-700">
        Voir le détail
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-0.5">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  )
}
