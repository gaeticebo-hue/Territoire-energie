import { FaqAccordion } from "@/components/faq/FaqAccordion"
import { getDemoSession } from "@/lib/auth/session"
import { getProgrammeIdsForCompany } from "@/lib/data/adhesions"
import { faqItems } from "@/lib/data/faq"

export default function EspaceMembresFaqPage() {
  const { company } = getDemoSession()
  const programmeIds = company ? getProgrammeIdsForCompany(company.id) : []

  const privateFaq = faqItems.filter(
    (f) => f.visibility === "private" && f.programmeId && programmeIds.includes(f.programmeId),
  )

  return (
    <div className="container-site py-10">
      <h1 className="text-2xl font-semibold text-brand-950">FAQ privée</h1>
      <p className="mt-2 max-w-2xl text-sm text-neutral-600">
        Questions spécifiques à votre édition du programme, réservées aux entreprises membres.
      </p>

      <div className="mt-8 max-w-3xl">
        {privateFaq.length > 0 ? (
          <FaqAccordion items={privateFaq} />
        ) : (
          <p className="text-sm text-neutral-500">Aucune question privée disponible pour le moment.</p>
        )}
      </div>

      <p className="mt-8 max-w-2xl text-xs text-neutral-500">
        Pour les questions générales sur le programme, l&apos;achat groupé ou le PPA, consultez la{" "}
        <a href="/faq" className="font-medium text-brand-700 underline underline-offset-2">
          FAQ publique
        </a>
        .
      </p>
    </div>
  )
}
