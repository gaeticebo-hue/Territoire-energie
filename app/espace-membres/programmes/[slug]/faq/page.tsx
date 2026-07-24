import { FaqAccordion } from "@/components/faq/FaqAccordion"
import { getProgrammeBySlug } from "@/lib/data/programmes"
import { getPrivateFaqItemsByProgramme } from "@/lib/data/faq"

type Props = { params: Promise<{ slug: string }> }

export default async function ProgrammeMemberFaqPage({ params }: Props) {
  const { slug } = await params
  const programme = getProgrammeBySlug(slug)
  if (!programme) return null

  const items = await getPrivateFaqItemsByProgramme(programme.id)

  return (
    <div className="max-w-3xl">
      <h2 className="text-xl font-semibold text-brand-950">FAQ privée</h2>
      <p className="mt-2 text-sm text-neutral-600">Questions spécifiques à cette édition du programme.</p>

      <div className="mt-8">
        {items.length > 0 ? (
          <FaqAccordion items={items} />
        ) : (
          <p className="text-sm text-neutral-500">Aucune question privée disponible pour le moment.</p>
        )}
      </div>

      <p className="mt-8 text-xs text-neutral-500">
        Pour les questions générales sur le programme, l&apos;achat groupé ou le PPA, consultez la{" "}
        <a href="/faq" className="font-medium text-brand-700 underline underline-offset-2">
          FAQ publique
        </a>
        .
      </p>
    </div>
  )
}
