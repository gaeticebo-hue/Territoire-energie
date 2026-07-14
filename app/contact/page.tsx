import type { Metadata } from "next"
import { PageHeader } from "@/components/layout/PageHeader"
import { Card } from "@/components/ui/Card"
import { ContactForm } from "@/components/forms/ContactForm"
import { partners } from "@/lib/data/partenaires"

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez l'équipe de coordination du programme Territoire Avenir Énergie.",
}

const greenbirdie = partners.find((p) => p.id === "greenbirdie")

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Parlons de votre projet"
        description="GREENBIRDIE coordonne les échanges relatifs au programme, en lien avec le Club des ETI de Nouvelle-Aquitaine, Pays Basque Industries et Mutandis Avocat."
      />

      <section className="py-16 sm:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <Card>
              <h2 className="text-base font-semibold text-brand-950">Coordination du programme</h2>
              {greenbirdie && (
                <div className="mt-3 text-sm leading-relaxed text-neutral-600">
                  <p className="font-medium text-brand-900">{greenbirdie.name}</p>
                  <p>{greenbirdie.contactName}</p>
                  <p>{greenbirdie.city}</p>
                  {greenbirdie.contactEmail && (
                    <a href={`mailto:${greenbirdie.contactEmail}`} className="mt-2 inline-block font-medium text-brand-700 underline underline-offset-2">
                      {greenbirdie.contactEmail}
                    </a>
                  )}
                </div>
              )}
            </Card>

            <Card className="bg-neutral-50">
              <h2 className="text-base font-semibold text-brand-950">Vous préférez un autre canal ?</h2>
              <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                <li>
                  Entreprise intéressée par le collectif :{" "}
                  <a href="/candidater" className="font-medium text-brand-700 underline underline-offset-2">
                    déposez votre candidature
                  </a>
                </li>
                <li>
                  Producteur ENR : {" "}
                  <a href="/producteurs" className="font-medium text-brand-700 underline underline-offset-2">
                    consultez l&apos;appel d&apos;offres
                  </a>
                </li>
                <li>
                  Entreprise déjà membre : {" "}
                  <a href="/espace-membres" className="font-medium text-brand-700 underline underline-offset-2">
                    accédez à l&apos;espace membres
                  </a>
                </li>
              </ul>
            </Card>
          </div>

          <Card>
            <ContactForm />
          </Card>
        </div>
      </section>
    </>
  )
}
