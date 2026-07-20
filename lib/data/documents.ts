import { createClient } from "@/lib/supabase/server"
import type { Document } from "@/lib/types"
import type { Database } from "@/lib/supabase/types"

type DocumentRow = Database["public"]["Tables"]["documents"]["Row"]

function mapDocument(row: DocumentRow): Document {
  return {
    id: row.id,
    title: row.title,
    programmeId: row.programme_id ?? undefined,
    visibility: row.visibility,
    category: row.category,
    fileUrl: row.file_url,
    description: row.description ?? undefined,
    updatedAt: row.updated_at ?? undefined,
  }
}

export async function getPublicDocuments(): Promise<Document[]> {
  const supabase = await createClient()
  const { data } = await supabase.from("documents").select("*").eq("visibility", "public")
  return (data ?? []).map(mapDocument)
}

// Le RLS restreint déjà les lignes privées aux membres de l'entreprise
// concernée (voir policy documents_select_private_members) : cette
// fonction ne renvoie donc que ce que l'utilisateur connecté est autorisé
// à voir, même si on ne filtre ici que par programme.
export async function getPrivateDocumentsByProgramme(programmeId: string): Promise<Document[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("documents")
    .select("*")
    .eq("visibility", "private")
    .eq("programme_id", programmeId)
  return (data ?? []).map(mapDocument)
}
