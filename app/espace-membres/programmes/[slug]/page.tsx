import Link from "next/link"
import { Card } from "@/components/ui/Card"
import { ProgrammeProgress } from "@/components/members/ProgrammeProgress"
import { getProgrammeBySlug } from "@/lib/data/programmes"
import { getCalendarStepsByProgramme } from "@/lib/data/calendrier"
import { getPrivateDocumentsByProgramme } from "@/lib/data/documents"
import { getPrivateFaqItemsByProgramme } from "@/lib/data/faq"

type Props = { params: Promise<{ slug: string }> }

export default async function ProgrammeMemberOverviewPage({ params }: Props) {
  const { slug } = await params
  const programme = getProgrammeBySlug(slug)
  if (!programme) return null

  const [steps, privateDocs, privateFaq] = await Promise.all([
    Promise.resolve(getCalendarStepsByProgramme(programme.id)),
    getPrivateDocumentsByProgramme(programme.id),
    getPrivateFaqItemsByProgramme(programme.id),
  ])

  const base = `/espace-membres/programmes/${programme.slug}`

  return (
    <div className="space-y-8">
      <Card>
        <h2 className="text-base font-semibold text-brand-950">Avancement</h2>
        <div className="mt-4">
          <ProgrammeProgress steps={steps} />
        </div>
      </Card>

      <div className="grid gap-6 sm:grid-cols-3">
        <Link href={`${base}/documents`} className="rounded-xl border border-neutral-200 bg-white p-5 text-center hover:border-brand-300 hover:bg-brand-50">
          <span className="block text-2xl font-semibold text-brand-900">{privateDocs.length}</span>
          <span className="text-sm text-neutral-500">Documents</span>
        </Link>
        <Link href={`${base}/calendrier`} className="rounded-xl border border-neutral-200 bg-white p-5 text-center hover:border-brand-300 hover:bg-brand-50">
          <span className="block text-2xl font-semibold text-brand-900">{steps.length}</span>
          <span className="text-sm text-neutral-500">Étapes calendrier</span>
        </Link>
        <Link href={`${base}/faq`} className="rounded-xl border border-neutral-200 bg-white p-5 text-center hover:border-brand-300 hover:bg-brand-50">
          <span className="block text-2xl font-semibold text-brand-900">{privateFaq.length}</span>
          <span className="text-sm text-neutral-500">Questions privées</span>
        </Link>
      </div>

      {programme.highlights && programme.highlights.length > 0 && (
        <Card>
          <h2 className="text-base font-semibold text-brand-950">Points clés de cette édition</h2>
          <ul className="mt-4 space-y-2.5">
            {programme.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-neutral-700">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-energy-500" />
                {highlight}
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  )
}
