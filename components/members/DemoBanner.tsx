export function DemoBanner() {
  return (
    <div className="bg-amber-50 text-amber-900">
      <div className="container-site flex flex-wrap items-center gap-2 py-2.5 text-xs sm:text-sm">
        <span className="font-semibold">Version de démonstration.</span>
        <span>
          L&apos;authentification Supabase n&apos;est pas encore activée : cet espace présente
          l&apos;interface avec des données fictives, sans protection d&apos;accès réelle.
        </span>
      </div>
    </div>
  )
}
