import type { Metadata } from "next"
import Image from "next/image"
import { PageHeader } from "@/components/layout/PageHeader"
import { Card } from "@/components/ui/Card"
import { partners } from "@/lib/data/partenaires"

export const metadata: Metadata = {
  title: "Partenaires",
  description: "Les partenaires coordinateurs du programme Territoire Avenir Énergie : GREENBIRDIE, Club des ETI de Nouvelle-Aquitaine, Pays Basque Industries et Mutandis Avocat.",
}

export default function PartenairesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Partenaires"
        title="Un programme porté collectivement"
        description="Territoire Avenir Énergie est coordonné par un assistant à maîtrise d'ouvrage (AMO) réunissant quatre organisations complémentaires, au service du collectif d'entreprises."
      />

      <section className="py-16 sm:py-20">
        <div className="container-site grid gap-6 sm:grid-cols-2">
          {partners.map((partner) => (
            <Card key={partner.id} className="flex flex-col">
              {partner.logoUrl && (
                <Image
                  src={partner.logoUrl}
                  alt={partner.name}
                  width={160}
                  height={48}
                  className="mb-4 h-10 w-auto object-contain object-left"
                />
              )}
              <p className="text-xs font-semibold uppercase tracking-wide text-energy-600">{partner.role}</p>
              <h2 className="mt-2 text-lg font-semibold text-brand-950">{partner.name}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">{partner.description}</p>

              <dl className="mt-5 space-y-1.5 border-t border-neutral-100 pt-4 text-sm">
                {partner.contactName && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-neutral-500">Contact</dt>
                    <dd className="text-right font-medium text-brand-900">{partner.contactName}</dd>
                  </div>
                )}
                {partner.city && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-neutral-500">Ville</dt>
                    <dd className="text-right font-medium text-brand-900">{partner.city}</dd>
                  </div>
                )}
              </dl>

              {partner.website && (
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700"
                >
                  Site internet
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 9 9 5M5.5 5H9v3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              )}
            </Card>
          ))}
        </div>

        <Card className="mt-8 bg-neutral-50">
          <p className="text-sm leading-relaxed text-neutral-600">
            L&apos;AMO est l&apos;interlocuteur exclusif entre le collectif d&apos;entreprises et les
            producteurs candidats. GREENBIRDIE centralise les échanges relatifs à la consultation et à la
            coordination générale du programme — voir la page{" "}
            <a href="/contact" className="font-medium text-brand-700 underline underline-offset-2">
              Contact
            </a>
            .
          </p>
        </Card>
      </section>
    </>
  )
}
