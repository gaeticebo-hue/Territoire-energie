const stats = [
  { value: "10-13 GWh", label: "Volume annuel visé par le collectif (édition 2)" },
  { value: "15 ans", label: "Durée du contrat d'achat direct d'énergie (PPA)" },
  { value: "4", label: "Partenaires coordinateurs du programme" },
  { value: "2", label: "Éditions du programme en cours ou à venir" },
]

export function StatsBand() {
  return (
    <section className="border-y border-neutral-200 bg-neutral-50">
      <div className="container-site grid grid-cols-2 gap-8 py-12 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center sm:text-left">
            <p className="text-2xl font-semibold tracking-tight text-brand-900 sm:text-3xl">{stat.value}</p>
            <p className="mt-1 text-sm text-neutral-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
