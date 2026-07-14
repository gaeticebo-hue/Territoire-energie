"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const items = [
  { href: "/espace-membres", label: "Tableau de bord" },
  { href: "/espace-membres/documents", label: "Documents" },
  { href: "/espace-membres/calendrier", label: "Calendrier" },
  { href: "/espace-membres/faq", label: "FAQ privée" },
]

export function MemberNav() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-neutral-200 bg-white" aria-label="Navigation espace membres">
      <div className="container-site flex gap-1 overflow-x-auto">
        {items.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap border-b-2 px-3 py-3.5 text-sm font-medium transition-colors ${
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
    </nav>
  )
}
