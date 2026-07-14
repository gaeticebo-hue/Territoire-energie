import type { Metadata } from "next"
import { PageHeader } from "@/components/layout/PageHeader"
import { ProgrammeCard } from "@/components/programmes/ProgrammeCard"
import { programmes } from "@/lib/data/programmes"

export const metadata: Metadata = {
  title: "Programmes",
  description: "Toutes les éditions du programme Territoire Avenir Énergie, en cours et à venir.",
}

export default function ProgrammesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Programmes"
        title="Les éditions de Territoire Avenir Énergie"
        description="Le programme est conçu pour se décliner en plusieurs éditions, annuelles ou sectorielles, chacune organisant son propre collectif d'entreprises et son propre appel d'offres producteurs."
      />

      <section className="py-16 sm:py-20">
        <div className="container-site">
          <div className="grid gap-6 md:grid-cols-2">
            {programmes.map((programme) => (
              <ProgrammeCard key={programme.id} programme={programme} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
