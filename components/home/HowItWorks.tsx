import { SectionHeading } from "@/components/ui/SectionHeading"

const steps = [
  {
    number: "01",
    title: "Un collectif d'entreprises se constitue",
    description:
      "Des ETI et entreprises industrielles du Pays Basque et de Nouvelle-Aquitaine rejoignent le programme et mutualisent leurs besoins en électricité.",
  },
  {
    number: "02",
    title: "Un producteur d'énergie renouvelable est sélectionné",
    description:
      "Un appel d'offres structuré permet de choisir, sur des critères transparents (prix, flexibilité, impact territorial), le producteur qui alimentera le collectif.",
  },
  {
    number: "03",
    title: "Un PPA multi-acheteurs est négocié collectivement",
    description:
      "Les conditions du contrat (prix fixe, durée, garanties) sont négociées une seule fois pour l'ensemble du collectif, puis contractualisées individuellement avec chaque entreprise.",
  },
  {
    number: "04",
    title: "Chaque entreprise sécurise sa fourniture long terme",
    description:
      "Chaque membre consomme sa part de la production, à un prix fixé sur 15 ans, avec une origine renouvelable garantie et un mécanisme de solidarité entre membres.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-site">
        <SectionHeading
          eyebrow="Comment ça marche"
          title="Le principe : mutualiser pour accéder à un contrat de long terme"
          description="La logique d'achat groupé permet à des entreprises qui, individuellement, n'atteindraient pas la taille critique nécessaire, d'accéder ensemble à un contrat d'achat direct d'électricité renouvelable (PPA)."
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="relative rounded-xl border border-neutral-200 bg-white p-6">
              <span className="text-sm font-semibold text-energy-600">{step.number}</span>
              <h3 className="mt-3 text-base font-semibold text-brand-950">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
