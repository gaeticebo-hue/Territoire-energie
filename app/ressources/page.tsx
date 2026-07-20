import type { Metadata } from "next"
import { PageHeader } from "@/components/layout/PageHeader"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { DocumentCard } from "@/components/documents/DocumentCard"
import { Card } from "@/components/ui/Card"
import { getPublicDocuments } from "@/lib/data/documents"

export const metadata: Metadata = {
  title: "Ressources",
  description: "Documents et supports publics du programme Territoire Avenir Énergie.",
}

export default async function RessourcesPage() {
  const publicDocuments = await getPublicDocuments()

  return (
    <>
      <PageHeader
        eyebrow="Ressources"
        title="Documents et supports"
        description="Les documents contractuels de l'appel d'offres (règlement de consultation, Term Sheet, formulaire de réponse) sont confidentiels et transmis directement aux entreprises et producteurs engagés dans le processus."
      />

      <section className="py-16 sm:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading eyebrow="Supports publics" title="Documents disponibles" />
            <div className="mt-8 space-y-4">
              {publicDocuments.map((doc) => (
                <DocumentCard key={doc.id} document={doc} onRequest />
              ))}
            </div>

            <Card className="mt-8 bg-neutral-50">
              <h3 className="text-sm font-semibold text-brand-950">Documents réservés</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                Le règlement de consultation, le Term Sheet et les comptes rendus du programme sont
                accessibles aux entreprises membres depuis l&apos;
                <a href="/espace-membres/documents" className="font-medium text-brand-700 underline underline-offset-2">
                  espace membres
                </a>
                , ou transmis aux producteurs candidats sur demande depuis la page{" "}
                <a href="/producteurs" className="font-medium text-brand-700 underline underline-offset-2">
                  Producteurs ENR
                </a>
                .
              </p>
            </Card>
          </div>

          <Card>
            <h3 className="text-base font-semibold text-brand-950">Pour aller plus loin</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href="/le-programme" className="font-medium text-brand-700 underline underline-offset-2">
                  Comprendre le fonctionnement du programme
                </a>
              </li>
              <li>
                <a href="/faq" className="font-medium text-brand-700 underline underline-offset-2">
                  Consulter la FAQ pédagogique
                </a>
              </li>
              <li>
                <a href="/partenaires" className="font-medium text-brand-700 underline underline-offset-2">
                  Découvrir les partenaires du programme
                </a>
              </li>
              <li>
                <a href="/contact" className="font-medium text-brand-700 underline underline-offset-2">
                  Contacter l&apos;équipe de coordination
                </a>
              </li>
            </ul>
          </Card>
        </div>
      </section>
    </>
  )
}
