import { NextResponse } from "next/server"
import type { ApplicantType } from "@/lib/types"

// Point d'entrée provisoire pour les candidatures (entreprises et
// producteurs). Aucune donnée n'est persistée à ce stade : la requête est
// validée puis acquittée, ce qui documente le contrat d'API attendu par le
// front-end sans introduire de logique CRM.
//
// Brancher une persistance réelle (table `applications` Supabase, envoi
// d'e-mail de notification à l'AMO, etc.) reviendra à remplacer le corps de
// cette fonction, sans changer les formulaires qui l'appellent.

type ApplicationPayload = {
  type: ApplicantType
  companyName: string
  contactName: string
  email: string
  phone?: string
  programmeId?: string
  sector?: string
  annualConsumptionMWh?: number
  technology?: string
  message?: string
}

function isValidPayload(data: unknown): data is ApplicationPayload {
  if (!data || typeof data !== "object") return false
  const d = data as Record<string, unknown>
  return (
    (d.type === "consumer" || d.type === "producer") &&
    typeof d.companyName === "string" &&
    d.companyName.trim().length > 1 &&
    typeof d.contactName === "string" &&
    d.contactName.trim().length > 1 &&
    typeof d.email === "string" &&
    /\S+@\S+\.\S+/.test(d.email)
  )
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 })
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { error: "Champs requis manquants ou invalides (type, companyName, contactName, email)." },
      { status: 400 },
    )
  }

  // TODO (Supabase) : insérer dans la table `applications` et notifier l'AMO.
  return NextResponse.json({
    ok: true,
    message: "Candidature enregistrée. Vous serez recontacté par l'équipe de coordination du programme.",
  })
}
