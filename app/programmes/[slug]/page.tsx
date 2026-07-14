import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PageHeader } from "@/components/layout/PageHeader"
import { StatusBadge } from "@/components/programmes/StatusBadge"
import { ProgrammeTimeline } from "@/components/programmes/ProgrammeTimeline"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { programmes, getProgrammeBySlug } from "@/lib/data/programmes"
import { getCalendarStepsByProgramme } from "@/lib/data/calendrier"
import { partners } from "@/lib/data/partenaires"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return programmes.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const programme = getProgrammeBySlug(slug)
  if (!programme) return {}
  return {
    title: `${programme.title} #${programme.edition}`,
    description: programme.description,
  }
}

export default async function ProgrammeDetailPage({ params }: Props) {
  const { slug } = await params
  const programme = getProgrammeBySlug(slug)
  if (!programme) notFound()

  const steps = getCalendarStepsByProgramme(programme.id)
  const amoPartners = partners.filter((p) => programme.amoPartnerIds?.includes(p.id))

  const facts: { label: string; value: string }[] = [
    programme.targetVolumeGWh ? { label: "Volume visé", value: programme.targetVolumeGWh } : null,
    programme.geography ? { label: "Territoire", value: programme.geography } : null,
    programme.sector ? { label: "Public visé", value: programme.sector } : null,
    programme.launchDate ? { label: "Lancement", value: programme.launchDate } : null,
    programme.offerDeadline ? { label: "Clôture des offres producteurs", value: programme.offerDeadline } : null,
    programme.expectedPpaSignature
      ? { label: "Signature du PPA envisagée", value: programme.expectedPpaSignature }
      : null,
    programme.ppaDurationYears ? { label: "Durée du PPA", value: `${programme.ppaDurationYears} ans` } : null,
    programme.priceModel ? { label: "Modèle de prix", value: programme.priceModel } : null,
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <>
      <PageHeader eyebrow={`Édition ${programme.edition}`} title={`${programme.title} #${programme.edition}`}>
        <div className="mt-4">
          <StatusBadge status={programme.status} />
        </div>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-300">{programme.description}</p>
      </PageHeader>

      <section className="py-16 sm:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="text-xl font-semibold text-brand-950">Points clés</h2>
            <ul className="mt-5 space-y-3">
              {(programme.highlights ?? []).map((highlight) => (
                <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-neutral-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-energy-500" />
                  {highlight}
                </li>
              ))}
            </ul>

            {steps.length > 0 && (
              <div className="mt-12">
                <h2 className="text-xl font-semibold text-brand-950">Calendrier indicatif</h2>
                <p className="mt-2 text-sm text-neutral-500">
                  Ce calendrier est indicatif et n&apos;engage pas les partenaires du programme.
                </p>
                <div className="mt-8">
                  <ProgrammeTimeline steps={steps} />
                </div>
              </div>
            )}

            {amoPartners.length > 0 && (
              <div className="mt-12">
                <h2 className="text-xl font-semibold text-brand-950">Acteurs coordinateurs</h2>
                <div className="mt-5 flex flex-wrap gap-3">
                  {amoPartners.map((p) => (
                    <span
                      key={p.id}
                      className="rounded-full border border-neutral-200 px-3 py-1.5 text-sm text-neutral-700"
                    >
                      {p.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <h2 className="text-base font-semibold text-brand-950">Chiffres clés</h2>
              <dl className="mt-4 space-y-4">
                {facts.map((fact) => (
                  <div key={fact.label} className="flex justify-between gap-4 border-b border-neutral-100 pb-3 text-sm last:border-0 last:pb-0">
                    <dt className="text-neutral-500">{fact.label}</dt>
                    <dd className="text-right font-medium text-brand-900">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Card>

            <Card className="bg-brand-50">
              <h2 className="text-base font-semibold text-brand-950">Rejoindre cette édition</h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                Entreprises consommatrices comme producteurs peuvent manifester leur intérêt pour cette
                édition du programme.
              </p>
              <div className="mt-5 flex flex-col gap-2.5">
                <Button href="/candidater" className="w-full">
                  Candidater comme entreprise
                </Button>
                <Button href="/producteurs" variant="outline" className="w-full">
                  Candidater comme producteur
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
