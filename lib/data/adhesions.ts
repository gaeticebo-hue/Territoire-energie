import { createClient } from "@/lib/supabase/server"

// Relation many-to-many entre entreprises et programmes (table `memberships`
// dans Supabase, voir supabase/migrations/0001_init.sql). Une entreprise
// peut participer à plusieurs éditions du programme.

export async function getProgrammeIdsForCompany(companyId: string): Promise<string[]> {
  const supabase = await createClient()
  const { data } = await supabase.from("memberships").select("programme_id").eq("company_id", companyId)
  return (data ?? []).map((m) => m.programme_id)
}
