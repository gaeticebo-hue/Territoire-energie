import { Button } from "@/components/ui/Button"

const audiences = [
  {
    title: "Entreprises consommatrices",
    description:
      "ETI et industriels souhaitant sécuriser une part de leur approvisionnement en électricité renouvelable, à prix fixe et long terme.",
    cta: { href: "/candidater", label: "Déposer ma candidature" },
  },
  {
    title: "Producteurs ENR",
    description:
      "Producteurs solaires, éoliens ou d'autres filières renouvelables souhaitant répondre à l'appel d'offres et sécuriser un débouché commercial de long terme.",
    cta: { href: "/producteurs", label: "Découvrir l'appel d'offres" },
  },
  {
    title: "Entreprises déjà membres",
    description:
      "Accédez à vos documents réservés, au calendrier détaillé et à l'avancement du programme depuis votre espace membres.",
    cta: { href: "/espace-membres", label: "Accéder à l'espace membres" },
  },
]

export function AudiencesBand() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-3">
          {audiences.map((audience) => (
            <div key={audience.title} className="flex flex-col rounded-xl border border-neutral-200 bg-white p-7">
              <h3 className="text-lg font-semibold text-brand-950">{audience.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">{audience.description}</p>
              <Button href={audience.cta.href} variant="ghost" size="sm" className="mt-6 self-start !px-0">
                {audience.cta.label} →
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
