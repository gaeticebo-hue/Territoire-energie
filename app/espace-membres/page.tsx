import Link from "next/link"
import { Card } from "@/components/ui/Card"
import { StatusBadge } from "@/components/programmes/StatusBadge"
import { getSession } from "@/lib/auth/session"
import { getProgrammeIdsForCompany } from "@/lib/data/adhesions"
import { programmes } from "@/lib/data/programmes"

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
        <div className="space-y-4 lg:col-span-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
            Vos programmes
          </h2>

          {myProgrammes.map((programme) => (
            <Link
              key={programme.id}
              href={`/espace-membres/programmes/${programme.slug}`}
              className="flex items-center justify-between gap-4 rounded-xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Édition {programme.edition}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-brand-950">
                  {programme.title} #{programme.edition}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={programme.status} />
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-neutral-400">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          ))}

          {company && myProgrammes.length === 0 && (
            <Card>
              <p className="text-sm text-neutral-600">
                Votre entreprise n&apos;est pour l&apos;instant rattachée à aucune édition du programme.
              </p>
            </Card>
          )}
        </div>

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
    </div>
  )
}
