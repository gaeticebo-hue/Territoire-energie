import Link from "next/link"
import { partners } from "@/lib/data/partenaires"

export function PartnersBand() {
  return (
    <section className="border-y border-neutral-200 bg-white py-16">
      <div className="container-site">
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Un programme coordonné par
        </p>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {partners.map((partner) => (
            <Link
              key={partner.id}
              href="/partenaires"
              className="flex flex-col items-center justify-center rounded-lg border border-neutral-200 px-4 py-6 text-center transition-colors hover:border-brand-300 hover:bg-brand-50"
            >
              <span className="text-sm font-semibold text-brand-900">{partner.name}</span>
              <span className="mt-1 text-xs text-neutral-500">{partner.role}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
