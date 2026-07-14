import type { Metadata } from "next"
import Link from "next/link"
import { PageHeader } from "@/components/layout/PageHeader"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"

export const metadata: Metadata = {
  title: "Le programme",
  description:
    "Comprendre le programme Territoire Avenir Énergie : achat groupé, PPA multi-acheteurs, couverture des prix et décarbonation.",
}

const benefits = [
  {
    title: "Décarboner sans réinvestir",
    description:
      "Consommez une électricité d'origine renouvelable garantie, sans investissement dans des actifs de production propres à votre entreprise.",
  },
  {
    title: "Sécuriser un prix sur 15 ans",
    description:
      "Un prix fixe négocié collectivement vous protège des variations du marché de gros et facilite vos prévisions budgétaires de long terme.",
  },
  {
    title: "Accéder à un contrat habituellement réservé aux grands comptes",
    description:
      "La mutualisation des volumes du collectif permet d'atteindre la taille critique nécessaire pour intéresser un producteur à un contrat direct.",
  },
  {
    title: "Mutualiser les coûts de structuration",
    description:
      "L'accompagnement juridique et technique (Mutandis Avocat, GREENBIRDIE) est mutualisé entre les membres du collectif plutôt que supporté individuellement.",
  },
]

const mechanics = [
  {
    title: "Un contrat d'achat direct d'énergie (PPA)",
    description:
      "Chaque entreprise conclut un contrat individuel avec le producteur sélectionné, en dehors des mécanismes classiques de fourniture, pour un volume et un prix déterminés à l'avance.",
  },
  {
    title: "Des conditions harmonisées, négociées une seule fois",
    description:
      "L'AMO négocie de manière centralisée le Term Sheet puis le PPA pour l'ensemble du collectif. Chaque entreprise bénéficie ainsi des mêmes conditions cadres, avec des adaptations strictement nécessaires à sa situation propre.",
  },
  {
    title: "Une répartition au prorata des besoins",
    description:
      "La production de la centrale est répartie entre les membres selon un coefficient de répartition, librement déterminé entre eux et révisable, notamment lors de l'arrivée d'un nouveau membre.",
  },
  {
    title: "Un mécanisme de solidarité encadré",
    description:
      "En cas de défaillance d'un membre, les autres reprennent temporairement les volumes libérés, dans la limite d'un taux de défaut maximal fixé au contrat — ce qui sécurise le producteur sans faire peser un risque illimité sur le collectif.",
  },
]

export default function LeProgrammePage() {
  return (
    <>
      <PageHeader
        eyebrow="Le programme"
        title="Territoire Avenir Énergie, une réponse collective aux enjeux énergétiques des entreprises"
        description="Un programme porté par des acteurs du Pays Basque et de Nouvelle-Aquitaine pour permettre aux entreprises industrielles de décarboner leur consommation d'électricité et de sécuriser leur approvisionnement à long terme."
      />

      <section className="py-20 sm:py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="Contexte"
            title="Pourquoi ce programme existe"
            description="Les entreprises industrielles font face à deux enjeux simultanés : décarboner leurs consommations d'énergie, et se prémunir contre la volatilité des prix de l'électricité. Individuellement, peu d'entre elles disposent du volume de consommation nécessaire pour négocier un contrat d'achat direct avec un producteur d'énergie renouvelable."
          />
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
            Pays Basque Industries et le Club des ETI de Nouvelle-Aquitaine se sont associés à GREENBIRDIE
            et à Mutandis Avocat pour organiser cette mutualisation : constituer un collectif
            d&apos;entreprises, sélectionner un producteur via un appel d&apos;offres structuré, et
            négocier collectivement un contrat d&apos;achat direct d&apos;énergie (PPA) multi-acheteurs.
          </p>
        </div>
      </section>

      <section className="bg-neutral-50 py-20 sm:py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="Fonctionnement"
            title="La mécanique du PPA multi-acheteurs"
            description="Le Term Sheet du programme fixe un socle de règles communes, appliquées de manière harmonisée à chaque entreprise membre du collectif."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {mechanics.map((item) => (
              <Card key={item.title}>
                <h3 className="text-base font-semibold text-brand-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.description}</p>
              </Card>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-sm text-neutral-500">
            Retrouvez le détail des mécanismes contractuels (durée, conditions suspensives, facturation,
            résiliation) dans notre <Link href="/faq" className="font-medium text-brand-700 underline underline-offset-2">FAQ pédagogique</Link>.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="Bénéfices"
            title="Ce que le programme apporte concrètement aux entreprises membres"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex gap-4">
                <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-energy-50 text-energy-700">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <h3 className="text-base font-semibold text-brand-950">{benefit.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-brand-900 py-16">
        <div className="container-site flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-semibold text-white sm:text-2xl">
              Votre entreprise correspond à ce profil ?
            </h2>
            <p className="mt-2 max-w-xl text-neutral-300">
              Découvrez les éditions du programme et déposez votre candidature pour rejoindre le collectif.
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <Button href="/programmes" variant="outline-inverse">
              Voir les éditions
            </Button>
            <Button href="/candidater" variant="secondary">
              Candidater
            </Button>
          </div>
        </div>
      </section>

      <p className="container-site py-8 text-xs text-neutral-500">
        Les informations de cette page sont fournies à titre pédagogique et indicatif. Seuls les documents
        contractuels (règlement de consultation, Term Sheet, PPA, accord-cadre du collectif) font foi
        entre les parties.
      </p>
    </>
  )
}
