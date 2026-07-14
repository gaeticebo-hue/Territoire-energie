import { Button } from "@/components/ui/Button"

export function CTABand() {
  return (
    <section className="bg-brand-900">
      <div className="container-site flex flex-col items-start gap-6 py-16 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            L&apos;appel d&apos;offres producteurs de l&apos;édition 2 est ouvert.
          </h2>
          <p className="mt-2 max-w-xl text-neutral-300">
            Entreprises intéressées par le collectif ou producteurs souhaitant candidater : les
            prochaines étapes du programme se décident maintenant.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Button href="/candidater" variant="secondary" size="lg">
            Candidater
          </Button>
          <Button href="/contact" variant="outline-inverse" size="lg">
            Nous contacter
          </Button>
        </div>
      </div>
    </section>
  )
}
