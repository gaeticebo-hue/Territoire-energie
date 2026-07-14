import { ProgrammeTimeline } from "@/components/programmes/ProgrammeTimeline"
import { getDemoSession } from "@/lib/auth/session"
import { getProgrammeIdsForCompany } from "@/lib/data/adhesions"
import { programmes } from "@/lib/data/programmes"
import { getCalendarStepsByProgramme } from "@/lib/data/calendrier"

export default function EspaceMembresCalendrierPage() {
  const { company } = getDemoSession()
  const programmeIds = company ? getProgrammeIdsForCompany(company.id) : []
  const myProgrammes = programmes.filter((p) => programmeIds.includes(p.id))

  return (
    <div className="container-site py-10">
      <h1 className="text-2xl font-semibold text-brand-950">Calendrier du programme</h1>
      <p className="mt-2 max-w-2xl text-sm text-neutral-600">
        Suivi détaillé des étapes, par édition à laquelle votre entreprise participe.
      </p>

      <div className="mt-10 space-y-14">
        {myProgrammes.map((programme) => {
          const steps = getCalendarStepsByProgramme(programme.id)
          return (
            <div key={programme.id} className="max-w-2xl">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
                {programme.title} #{programme.edition}
              </h2>
              <div className="mt-6">
                <ProgrammeTimeline steps={steps} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
