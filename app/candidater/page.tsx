import type { Metadata } from "next"
import { PageHeader } from "@/components/layout/PageHeader"
import { CandidatureEntrepriseForm } from "@/components/forms/CandidatureEntrepriseForm"
import { Card } from "@/components/ui/Card"

export const metadata: Metadata = {
  title: "Candidater",
  description: "Déposez la candidature de votre entreprise pour rejoindre le programme Territoire Avenir Énergie.",
}

const steps = [
  { title: "Dépôt de la candidature", description: "Vous complétez le formulaire ci-dessous avec les informations de base de votre entreprise." },
  { title: "Échange de qualification", description: "L'équipe de coordination revient vers vous pour préciser votre profil de consommation et vos attentes." },
  { title: "Intégration au collectif", description: "Votre entreprise rejoint le collectif de l'édition concernée et accède à l'espace membres." },
  { title: "Négociation puis signature du PPA", description: "Vous suivez, aux côtés des autres membres, la négociation centralisée puis la signature de votre contrat individuel." },
]

export default function CandidaterPage() {
  return (
    <>
      <PageHeader
        eyebrow="Candidater"
        title="Rejoindre le collectif d'entreprises"
        description="Ce formulaire s'adresse aux entreprises consommatrices souhaitant intégrer le programme. Les producteurs d'électricité renouvelable candidatent depuis la page dédiée."
      />

      <section className="py-16 sm:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-xl font-semibold text-brand-950">Comment se déroule la candidature</h2>
            <ol className="mt-6 space-y-6">
              {steps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-800 text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-brand-950">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-600">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <Card className="mt-10 bg-neutral-50">
              <p className="text-sm leading-relaxed text-neutral-600">
                Une question avant de candidater ? Consultez notre{" "}
                <a href="/faq" className="font-medium text-brand-700 underline underline-offset-2">
                  FAQ
                </a>{" "}
                ou{" "}
                <a href="/contact" className="font-medium text-brand-700 underline underline-offset-2">
                  contactez-nous directement
                </a>
                .
              </p>
            </Card>
          </div>

          <Card>
            <CandidatureEntrepriseForm />
          </Card>
        </div>
      </section>
    </>
  )
}
