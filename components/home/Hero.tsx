import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 15% 20%, rgba(63,187,135,0.25) 0%, rgba(63,187,135,0) 60%), radial-gradient(50% 40% at 85% 10%, rgba(77,132,196,0.35) 0%, rgba(77,132,196,0) 60%)",
        }}
      />
      <div className="container-site relative py-24 sm:py-32">
        <div className="max-w-3xl">
          <Badge tone="energy">Programme Pays Basque · Nouvelle-Aquitaine</Badge>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Sécurisez votre électricité renouvelable, ensemble.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-neutral-300">
            Territoire Avenir Énergie réunit des entreprises industrielles autour d&apos;un achat groupé
            d&apos;électricité renouvelable : un contrat d&apos;achat direct d&apos;énergie (PPA) multi-acheteurs, à
            prix fixe et long terme, pour décarboner vos consommations et vous couvrir contre la
            volatilité des prix de marché.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/candidater" size="lg">
              Candidater au programme
            </Button>
            <Button href="/le-programme" variant="outline-inverse" size="lg">
              Comprendre le programme
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
