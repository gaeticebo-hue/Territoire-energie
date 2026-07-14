import type { Metadata } from "next"
import { PageHeader } from "@/components/layout/PageHeader"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { Card } from "@/components/ui/Card"
import { ProgrammeTimeline } from "@/components/programmes/ProgrammeTimeline"
import { CandidatureProducteurForm } from "@/components/forms/CandidatureProducteurForm"
import { getCalendarStepsByProgramme } from "@/lib/data/calendrier"

export const metadata: Metadata = {
  title: "Producteurs ENR",
  description: "Appel d'offres pour la sélection d'un producteur d'électricité renouvelable dans le cadre du programme Territoire Avenir Énergie.",
}

const eligibility = [
  {
    title: "Lieu d'exploitation",
    description: "Toute la France métropolitaine est éligible. Les projets situés en Nouvelle-Aquitaine bénéficient d'une meilleure notation.",
  },
  {
    title: "Typologie de centrale",
    description: "Toutes les énergies renouvelables permettant de générer de l'électricité sont admises à candidater, sans restriction de filière.",
  },
  {
    title: "Volume recherché",
    description: "Le collectif recherche un approvisionnement compris entre 10 et 13 GWh par an, avec possibilité d'ajustements marginaux en négociation.",
  },
  {
    title: "Mise en service",
    description: "La mise en service de la centrale ne peut excéder le 1er janvier 2029.",
  },
]

const criteria = [
  { label: "Prix (€/MWh, garanties d'origine et de capacité incluses)", weight: "60 %" },
  { label: "Flexibilité (garanties demandées, capacité d'adaptation des volumes)", weight: "25 %" },
  { label: "Impact carbone, social et environnemental", weight: "10 %" },
  { label: "Bénéfice en faveur de la collectivité locale", weight: "5 %" },
]

const process = [
  "Remise des candidatures avant la date limite de l'appel d'offres en cours.",
  "Présélection par l'AMO sur la base des critères de jugement des offres.",
  "Entretien en visioconférence avec les trois candidats les mieux classés.",
  "Remise d'une offre définitive, dans un délai identique pour tous les candidats.",
  "Invitation à négociation exclusive du candidat le mieux noté.",
]

export default function ProducteursPage() {
  const steps = getCalendarStepsByProgramme("prog-2")

  return (
    <>
      <PageHeader
        eyebrow="Producteurs ENR"
        title="Appel d'offres pour la sélection d'un producteur d'électricité renouvelable"
        description="Le programme sélectionne, par appel d'offres, un producteur d'énergie renouvelable pour conclure un contrat d'achat direct d'électricité (PPA) multi-acheteurs avec le collectif d'entreprises."
      />

      <section className="py-16 sm:py-20">
        <div className="container-site">
          <SectionHeading eyebrow="Éligibilité" title="Conditions d'éligibilité du projet" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {eligibility.map((item) => (
              <Card key={item.title}>
                <h3 className="text-base font-semibold text-brand-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-16 sm:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Procédure" title="Déroulé de la consultation" />
            <ol className="mt-8 space-y-4">
              {process.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm text-neutral-700">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-800">
                    {index + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <SectionHeading eyebrow="Critères" title="Critères de jugement des offres" />
            <div className="mt-8 overflow-hidden rounded-xl border border-neutral-200 bg-white">
              {criteria.map((c) => (
                <div key={c.label} className="flex items-center justify-between gap-4 border-b border-neutral-100 px-5 py-4 text-sm last:border-0">
                  <span className="text-neutral-700">{c.label}</span>
                  <span className="shrink-0 font-semibold text-brand-800">{c.weight}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-neutral-500">
              Pondérations indicatives destinées à orienter les candidats ; elles ne lient pas l&apos;AMO
              quant au choix final.
            </p>
          </div>
        </div>
      </section>

      {steps.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="container-site max-w-3xl">
            <SectionHeading eyebrow="Calendrier" title="Calendrier indicatif de l'édition en cours" />
            <div className="mt-10">
              <ProgrammeTimeline steps={steps} />
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-neutral-200 bg-neutral-50 py-16 sm:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="Documents"
              title="Règlement de consultation et Term Sheet"
              description="Ces documents sont soumis à une obligation de confidentialité et transmis uniquement aux producteurs ayant confirmé leur intérêt pour la consultation."
            />
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              Manifestez votre intérêt ci-contre : l&apos;équipe de coordination vous recontactera pour
              vous transmettre le règlement de consultation, le Term Sheet et le formulaire de réponse
              officiel.
            </p>
          </div>

          <Card>
            <CandidatureProducteurForm />
          </Card>
        </div>
      </section>
    </>
  )
}
