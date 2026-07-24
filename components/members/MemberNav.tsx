"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export function MemberNav() {
  const pathname = usePathname()
  const router = useRouter()
  const active = pathname === "/espace-membres"

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/espace-membres/connexion")
    router.refresh()
  }

  return (
    <nav className="border-b border-neutral-200 bg-white" aria-label="Navigation espace membres">
      <div className="container-site flex items-center justify-between gap-1">
        <Link
          href="/espace-membres"
          className={`whitespace-nowrap border-b-2 px-3 py-3.5 text-sm font-medium transition-colors ${
            active ? "border-brand-700 text-brand-800" : "border-transparent text-neutral-500 hover:text-brand-800"
          }`}
        >
          Tableau de bord
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          className="shrink-0 whitespace-nowrap px-3 py-3.5 text-sm font-medium text-neutral-500 hover:text-brand-800"
        >
          Se déconnecter
        </button>
      </div>
    </nav>
  )
}
