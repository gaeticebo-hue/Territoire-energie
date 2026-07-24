import { DocumentCard } from "@/components/documents/DocumentCard"
import { getProgrammeBySlug } from "@/lib/data/programmes"
import { getPrivateDocumentsByProgramme } from "@/lib/data/documents"

type Props = { params: Promise<{ slug: string }> }

export default async function ProgrammeMemberDocumentsPage({ params }: Props) {
  const { slug } = await params
  const programme = getProgrammeBySlug(slug)
  if (!programme) return null

  const docs = await getPrivateDocumentsByProgramme(programme.id)

  return (
    <div>
      <h2 className="text-xl font-semibold text-brand-950">Documents réservés</h2>
      <p className="mt-2 max-w-2xl text-sm text-neutral-600">
        Documents accessibles aux entreprises membres de cette édition. Les fichiers seront hébergés via
        Supabase Storage en production.
      </p>

      <div className="mt-6 space-y-3">
        {docs.length > 0 ? (
          docs.map((doc) => <DocumentCard key={doc.id} document={doc} />)
        ) : (
          <p className="text-sm text-neutral-500">Aucun document disponible pour le moment.</p>
        )}
      </div>
    </div>
  )
}
