"use client"

import { usePathname } from "next/navigation"
import { MemberNav } from "@/components/members/MemberNav"

export default function EspaceMembresLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/espace-membres/connexion"

  return (
    <div>
      {!isLoginPage && <MemberNav />}
      <div className="bg-neutral-50">{children}</div>
    </div>
  )
}
