import { ProgrammeTimeline } from "@/components/programmes/ProgrammeTimeline"
import { getProgrammeBySlug } from "@/lib/data/programmes"
import { getCalendarStepsByProgramme } from "@/lib/data/calendrier"

type Props = { params: Promise<{ slug: string }> }

export default async function ProgrammeMemberCalendrierPage({ params }: Props) {
  const { slug } = await params
  const programme = getProgrammeBySlug(slug)
  if (!programme) return null

  const steps = getCalendarStepsByProgramme(programme.id)

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold text-brand-950">Calendrier</h2>
      <p className="mt-2 text-sm text-neutral-600">Suivi détaillé des étapes de cette édition.</p>

      <div className="mt-8">
        {steps.length > 0 ? (
          <ProgrammeTimeline steps={steps} />
        ) : (
          <p className="text-sm text-neutral-500">Calendrier non encore disponible pour cette édition.</p>
        )}
      </div>
    </div>
  )
}
