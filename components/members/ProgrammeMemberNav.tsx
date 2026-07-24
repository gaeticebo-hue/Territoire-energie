"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { StatusBadge } from "@/components/programmes/StatusBadge"
import type { Programme } from "@/lib/types"

export function ProgrammeMemberNav({ programme }: { programme: Programme }) {
  const pathname = usePathname()
  const base = `/espace-membres/programmes/${programme.slug}`

  const items = [
    { href: base, label: "Vue d'ensemble" },
    { href: `${base}/documents`, label: "Documents" },
    { href: `${base}/calendrier`, label: "Calendrier" },
    { href: `${base}/faq`, label: "FAQ privée" },
  ]

  return (
    <div className="border-b border-neutral-200 bg-white">
      <div className="container-site pt-5">
        <Link href="/espace-membres" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-brand-800">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2 4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Tous mes programmes
        </Link>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 pb-4">
          <h1 className="text-xl font-semibold text-brand-950">
            {programme.title} #{programme.edition}
          </h1>
          <StatusBadge status={programme.status} />
        </div>
      </div>

      <div className="container-site flex gap-1 overflow-x-auto">
        {items.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap border-b-2 px-3 py-3 text-sm font-medium transition-colors ${
                active
                  ? "border-brand-700 text-brand-800"
                  : "border-transparent text-neutral-500 hover:text-brand-800"
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
