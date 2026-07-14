import Link from "next/link"
import { Logo } from "./Logo"

const columns = [
  {
    title: "Programme",
    links: [
      { href: "/le-programme", label: "Le programme" },
      { href: "/programmes", label: "Toutes les éditions" },
      { href: "/candidater", label: "Candidater" },
      { href: "/producteurs", label: "Producteurs ENR" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/ressources", label: "Documents & supports" },
      { href: "/partenaires", label: "Partenaires" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Espace membres",
    links: [
      { href: "/espace-membres", label: "Tableau de bord" },
      { href: "/espace-membres/documents", label: "Documents réservés" },
      { href: "/espace-membres/calendrier", label: "Calendrier du programme" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-brand-950 text-neutral-300">
      <div className="container-site grid gap-10 py-14 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Logo variant="light" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-400">
            Territoire Avenir Énergie accompagne les entreprises du Pays Basque et de Nouvelle-Aquitaine
            dans la décarbonation de leur consommation d&apos;électricité, via un achat groupé et un contrat
            d&apos;achat direct d&apos;énergie (PPA) multi-acheteurs.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold text-white">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-neutral-400 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Territoire Avenir Énergie — programme coordonné par GREENBIRDIE, le
            Club des ETI de Nouvelle-Aquitaine, Pays Basque Industries et Mutandis Avocat.
          </p>
          <p>Les documents contractuels du programme font seuls foi entre les parties.</p>
        </div>
      </div>
    </footer>
  )
}
