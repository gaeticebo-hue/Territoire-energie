import { DocumentCard } from "@/components/documents/DocumentCard"
import { getSession } from "@/lib/auth/session"
import { getProgrammeIdsForCompany } from "@/lib/data/adhesions"
import { programmes } from "@/lib/data/programmes"
import { getPrivateDocumentsByProgramme } from "@/lib/data/documents"

export default async function EspaceMembresDocumentsPage() {
  const session = await getSession()
  if (!session) return null

  const { company } = session
  const programmeIds = company ? await getProgrammeIdsForCompany(company.id) : []
  const myProgrammes = programmes.filter((p) => programmeIds.includes(p.id))

  const sections = await Promise.all(
    myProgrammes.map(async (programme) => ({
      programme,
      docs: await getPrivateDocumentsByProgramme(programme.id),
    })),
  )

  return (
    <div className="container-site py-10">
      <h1 className="text-2xl font-semibold text-brand-950">Documents réservés</h1>
      <p className="mt-2 max-w-2xl text-sm text-neutral-600">
        Documents accessibles aux entreprises membres du programme, par édition. Les fichiers seront
        hébergés via Supabase Storage en production.
      </p>

      <div className="mt-8 space-y-10">
        {sections.map(({ programme, docs }) => {
          if (docs.length === 0) return null
          return (
            <div key={programme.id}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
                {programme.title} #{programme.edition}
              </h2>
              <div className="mt-4 space-y-3">
                {docs.map((doc) => (
                  <DocumentCard key={doc.id} document={doc} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
