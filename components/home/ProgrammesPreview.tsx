import { SectionHeading } from "@/components/ui/SectionHeading"
import { ProgrammeCard } from "@/components/programmes/ProgrammeCard"
import { Button } from "@/components/ui/Button"
import { programmes } from "@/lib/data/programmes"

export function ProgrammesPreview() {
  return (
    <section className="bg-neutral-50 py-20 sm:py-28">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Éditions du programme"
            title="Une architecture pensée pour plusieurs éditions"
            description="Territoire Avenir Énergie a vocation à se décliner par édition annuelle ou sectorielle, chacune avec son propre collectif, son propre producteur et son propre calendrier."
          />
          <Button href="/programmes" variant="outline">
            Voir toutes les éditions
          </Button>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {programmes.map((programme) => (
            <ProgrammeCard key={programme.id} programme={programme} />
          ))}
        </div>
      </div>
    </section>
  )
}
