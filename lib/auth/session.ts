import { createClient } from "@/lib/supabase/server"
import type { Company, UserProfile } from "@/lib/types"

export type Session = {
  user: UserProfile
  company: Company | undefined
}

// Lecture de la session réelle (Supabase Auth) côté serveur. Retourne null
// si personne n'est connecté — le middleware (voir middleware.ts) redirige
// déjà vers /espace-membres/connexion dans ce cas, cette fonction ne
// devrait donc renvoyer null que dans des cas limites (session expirée
// entre le middleware et le rendu de la page, par exemple).
export async function getSession(): Promise<Session | null> {
  const supabase = await createClient()

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser()

  if (!authUser) return null

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", authUser.id).single()

  if (!profile) return null

  const user: UserProfile = {
    id: profile.id,
    email: profile.email,
    fullName: profile.full_name ?? profile.email,
    companyId: profile.company_id ?? "",
    role: profile.role,
  }

  let company: Company | undefined
  if (profile.company_id) {
    const { data: companyRow } = await supabase
      .from("companies")
      .select("*")
      .eq("id", profile.company_id)
      .single()

    if (companyRow) {
      company = {
        id: companyRow.id,
        name: companyRow.name,
        type: companyRow.type,
        sector: companyRow.sector ?? undefined,
        annualConsumptionMWh: companyRow.annual_consumption_mwh ?? undefined,
        region: companyRow.region ?? undefined,
      }
    }
  }

  return { user, company }
}
