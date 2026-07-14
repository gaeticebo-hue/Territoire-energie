import Link from "next/link"
import { Card } from "@/components/ui/Card"
import { StatusBadge } from "@/components/programmes/StatusBadge"
import { ProgrammeProgress } from "@/components/members/ProgrammeProgress"
import { getDemoSession } from "@/lib/auth/session"
import { getProgrammeIdsForCompany } from "@/lib/data/adhesions"
import { programmes } from "@/lib/data/programmes"
import { getCalendarStepsByProgramme } from "@/lib/data/calendrier"
import { getPrivateDocumentsByProgramme } from "@/lib/data/documents"
import { faqItems } from "@/lib/data/faq"

export default function EspaceMembresDashboard() {
  const { user, company } = getDemoSession()
  const programmeIds = company ? getProgrammeIdsForCompany(company.id) : []
  const myProgrammes = programmes.filter((p) => programmeIds.includes(p.id))

  return (
    <div className="container-site py-10">
      <div>
        <p className="text-sm text-neutral-500">Bonjour {user.fullName.split(" ")[0]},</p>
        <h1 className="mt-1 text-2xl font-semibold text-brand-950">
          Tableau de bord — {company?.name ?? "votre entreprise"}
        </h1>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {myProgrammes.map((programme) => {
          const steps = getCalendarStepsByProgramme(programme.id)
          const privateDocs = getPrivateDocumentsByProgramme(programme.id)
          const privateFaq = faqItems.filter((f) => f.visibility === "private" && f.programmeId === programme.id)

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
        })}

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

      {myProgrammes.length === 0 && (
        <Card className="mt-8">
          <p className="text-sm text-neutral-600">
            Aucun programme associé à ce profil de démonstration pour le moment.
          </p>
        </Card>
      )}
    </div>
  )
}
