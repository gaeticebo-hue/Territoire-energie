import { NextResponse } from "next/server"

// Point d'entrée provisoire pour le formulaire de contact. Comme pour
// /api/candidatures, aucune donnée n'est persistée : la requête est validée
// et acquittée. Un envoi d'e-mail réel (ou une écriture Supabase) pourra
// remplacer ce corps de fonction sans changer le formulaire appelant.

function isValidPayload(data: unknown): data is { name: string; email: string; message: string } {
  if (!data || typeof data !== "object") return false
  const d = data as Record<string, unknown>
  return (
    typeof d.name === "string" &&
    d.name.trim().length > 1 &&
    typeof d.email === "string" &&
    /\S+@\S+\.\S+/.test(d.email) &&
    typeof d.message === "string" &&
    d.message.trim().length > 1
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
    return NextResponse.json({ error: "Merci de renseigner votre nom, votre e-mail et votre message." }, { status: 400 })
  }

  return NextResponse.json({ ok: true, message: "Message envoyé. Nous revenons vers vous rapidement." })
}
