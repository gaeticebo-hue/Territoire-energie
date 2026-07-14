"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Logo } from "./Logo"
import { Button } from "@/components/ui/Button"

const navItems = [
  { href: "/le-programme", label: "Le programme" },
  { href: "/programmes", label: "Programmes" },
  { href: "/producteurs", label: "Producteurs ENR" },
  { href: "/faq", label: "FAQ" },
  { href: "/ressources", label: "Ressources" },
  { href: "/partenaires", label: "Partenaires" },
]

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="container-site flex h-[4.5rem] items-center justify-between py-3">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "text-brand-800" : "text-neutral-600 hover:text-brand-800"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button href="/contact" variant="ghost" size="sm">
            Contact
          </Button>
          <Button href="/espace-membres" variant="outline" size="sm">
            Espace membres
          </Button>
          <Button href="/candidater" variant="primary" size="sm">
            Candidater
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="inline-flex items-center justify-center rounded-md p-2 text-neutral-700 lg:hidden"
          aria-expanded={open}
          aria-label="Ouvrir le menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-neutral-200 bg-white lg:hidden">
          <nav className="container-site flex flex-col gap-1 py-4" aria-label="Navigation mobile">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-neutral-700 hover:bg-brand-50 hover:text-brand-800"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-neutral-200 pt-4">
              <Button href="/contact" variant="ghost" size="sm" onClick={() => setOpen(false)}>
                Contact
              </Button>
              <Button href="/espace-membres" variant="outline" size="sm" onClick={() => setOpen(false)}>
                Espace membres
              </Button>
              <Button href="/candidater" variant="primary" size="sm" onClick={() => setOpen(false)}>
                Candidater
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
