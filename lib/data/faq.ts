import { createClient } from "@/lib/supabase/server"
import type { FaqItem } from "@/lib/types"
import type { Database } from "@/lib/supabase/types"

type FaqRow = Database["public"]["Tables"]["faq_items"]["Row"]

function mapFaq(row: FaqRow): FaqItem {
  return {
    id: row.id,
    category: row.category,
    question: row.question,
    answer: row.answer,
    programmeId: row.programme_id ?? undefined,
    visibility: row.visibility,
  }
}

export async function getPublicFaqItems(): Promise<FaqItem[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("faq_items")
    .select("*")
    .eq("visibility", "public")
    .order("sort_order", { ascending: true })
  return (data ?? []).map(mapFaq)
}

// Le RLS restreint déjà les lignes privées aux membres de l'entreprise
// concernée (voir policy faq_select_private_members).
export async function getPrivateFaqItemsByProgramme(programmeId: string): Promise<FaqItem[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("faq_items")
    .select("*")
    .eq("visibility", "private")
    .eq("programme_id", programmeId)
    .order("sort_order", { ascending: true })
  return (data ?? []).map(mapFaq)
}
