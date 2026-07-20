import Link from "next/link"
import { Card } from "@/components/ui/Card"
import { StatusBadge } from "@/components/programmes/StatusBadge"
import { ProgrammeProgress } from "@/components/members/ProgrammeProgress"
import { getSession } from "@/lib/auth/session"
import { getProgrammeIdsForCompany } from "@/lib/data/adhesions"
import { programmes } from "@/lib/data/programmes"
import { getCalendarStepsByProgramme } from "@/lib/data/calendrier"
import { getPrivateDocumentsByProgramme } from "@/lib/data/documents"
import { getPrivateFaqItemsByProgramme } from "@/lib/data/faq"

export default async function EspaceMembresDashboard() {
  const session = await getSession()
  if (!session) return null // le middleware redirige déjà vers /espace-membres/connexion

  const { user, company } = session
  const programmeIds = company ? await getProgrammeIdsForCompany(company.id) : []
  const myProgrammes = programmes.filter((p) => programmeIds.includes(p.id))

  return (
    <div className="container-site py-10">
      <div>
        <p className="text-sm text-neutral-500">Bonjour {user.fullName.split(" ")[0]},</p>
        <h1 className="mt-1 text-2xl font-semibold text-brand-950">
          Tableau de bord — {company?.name ?? "votre entreprise"}
        </h1>
      </div>

      {!company && (
        <Card className="mt-8 bg-amber-50">
          <p className="text-sm leading-relaxed text-amber-900">
            Votre compte n&apos;est pas encore rattaché à une entreprise membre. L&apos;équipe de
            coordination du programme doit valider votre rattachement — contactez GREENBIRDIE si cela
            prend plus de quelques jours.
          </p>
        </Card>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {await Promise.all(
          myProgrammes.map(async (programme) => {
            const [steps, privateDocs, privateFaq] = await Promise.all([
              Promise.resolve(getCalendarStepsByProgramme(programme.id)),
              getPrivateDocumentsByProgramme(programme.id),
              getPrivateFaqItemsByProgramme(programme.id),
            ])

            return (
              <Card key={programme.id} className="lg:col-span-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      Édition {programme.edition}
                    </p>
                    <h2 className="mt-1 text-lg font-semibold text-brand-950">
                      {programme.title} #{programme.edition}
                    </h2>
                  </div>
                  <StatusBadge status={programme.status} />
                </div>

                <div className="mt-6">
                  <ProgrammeProgress steps={steps} />
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4 border-t border-neutral-100 pt-5 text-sm">
                  <Link href="/espace-membres/documents" className="rounded-lg border border-neutral-200 p-3 text-center hover:border-brand-300 hover:bg-brand-50">
                    <span className="block text-lg font-semibold text-brand-900">{privateDocs.length}</span>
                    <span className="text-xs text-neutral-500">Documents</span>
                  </Link>
                  <Link href="/espace-membres/calendrier" className="rounded-lg border border-neutral-200 p-3 text-center hover:border-brand-300 hover:bg-brand-50">
                    <span className="block text-lg font-semibold text-brand-900">{steps.length}</span>
                    <span className="text-xs text-neutral-500">Étapes calendrier</span>
                  </Link>
                  <Link href="/espace-membres/faq" className="rounded-lg border border-neutral-200 p-3 text-center hover:border-brand-300 hover:bg-brand-50">
                    <span className="block text-lg font-semibold text-brand-900">{privateFaq.length}</span>
                    <span className="text-xs text-neutral-500">Questions privées</span>
                  </Link>
                </div>
              </Card>
            )
          }),
        )}

        <Card className="bg-brand-50">
          <h2 className="text-base font-semibold text-brand-950">Votre profil</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-neutral-500">Nom</dt>
              <dd className="font-medium text-brand-900">{user.fullName}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-neutral-500">E-mail</dt>
              <dd className="font-medium text-brand-900">{user.email}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-neutral-500">Rôle</dt>
              <dd className="font-medium text-brand-900 capitalize">{user.role}</dd>
            </div>
            {company && (
              <>
                <div className="flex justify-between gap-4">
                  <dt className="text-neutral-500">Entreprise</dt>
                  <dd className="font-medium text-brand-900">{company.name}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-neutral-500">Secteur</dt>
                  <dd className="font-medium text-brand-900">{company.sector}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-neutral-500">Consommation annuelle</dt>
                  <dd className="font-medium text-brand-900">{company.annualConsumptionMWh} MWh</dd>
                </div>
              </>
            )}
          </dl>
        </Card>
      </div>

      {company && myProgrammes.length === 0 && (
        <Card className="mt-8">
          <p className="text-sm text-neutral-600">
            Votre entreprise n&apos;est pour l&apos;instant rattachée à aucune édition du programme.
          </p>
        </Card>
      )}
    </div>
  )
}
