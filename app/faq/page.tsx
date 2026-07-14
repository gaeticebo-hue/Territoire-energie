import type { Metadata } from "next"
import { PageHeader } from "@/components/layout/PageHeader"
import { FaqExplorer } from "@/components/faq/FaqExplorer"
import { faqItems } from "@/lib/data/faq"

export const metadata: Metadata = {
  title: "FAQ",
  description: "Questions fréquentes sur l'achat groupé d'électricité, le PPA multi-acheteurs et le programme Territoire Avenir Énergie.",
}

const publicFaq = faqItems.filter((f) => f.visibility === "public")

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Questions fréquentes"
        description="Une présentation pédagogique des mécanismes du programme, de l'achat groupé au PPA multi-acheteurs, pour des interlocuteurs non spécialistes."
      />

      <section className="py-16 sm:py-20">
        <div className="container-site max-w-3xl">
          <FaqExplorer items={publicFaq} />

          <p className="mt-10 rounded-lg bg-neutral-50 p-4 text-xs leading-relaxed text-neutral-500">
            Les réponses ci-dessus sont fournies à titre pédagogique et simplifié. Elles ne se substituent
            pas aux documents contractuels du programme (règlement de consultation, Term Sheet, PPA,
            accord-cadre du collectif), qui seuls font foi entre les parties.
          </p>
        </div>
      </section>
    </>
  )
}
