import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import type { ApplicantType } from "@/lib/types"

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

  const supabase = await createClient()
  const { error } = await supabase.from("applications").insert({
    type: body.type,
    programme_id: body.programmeId,
    company_name: body.companyName,
    contact_name: body.contactName,
    email: body.email,
    phone: body.phone,
    sector: body.sector,
    annual_consumption_mwh: body.annualConsumptionMWh,
    technology: body.technology,
    message: body.message,
  })

  if (error) {
    return NextResponse.json({ error: "Impossible d'enregistrer la candidature pour le moment." }, { status: 500 })
  }

  return NextResponse.json({
    ok: true,
    message: "Candidature enregistrée. Vous serez recontacté par l'équipe de coordination du programme.",
  })
}
