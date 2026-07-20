import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// Point d'atterrissage du lien magique envoyé par e-mail (magic link).
// Échange le code contre une session, puis redirige vers l'espace membres.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/espace-membres"

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/espace-membres/connexion?error=auth`)
}
