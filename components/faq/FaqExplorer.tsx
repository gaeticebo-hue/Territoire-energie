"use client"

import { useState } from "react"
import type { FaqCategory, FaqItem } from "@/lib/types"
import { FaqAccordion } from "./FaqAccordion"

const categoryLabels: Record<FaqCategory, string> = {
  "achat-groupe": "Achat groupé",
  ppa: "Le PPA",
  producteurs: "Producteurs ENR",
  programme: "Le programme",
  "espace-membres": "Espace membres",
}

export function FaqExplorer({ items }: { items: FaqItem[] }) {
  const categories = Array.from(new Set(items.map((i) => i.category))) as FaqCategory[]
  const [active, setActive] = useState<FaqCategory | "all">("all")

  const visible = active === "all" ? items : items.filter((i) => i.category === active)

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActive("all")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            active === "all" ? "bg-brand-800 text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
          }`}
        >
          Toutes les questions
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active === cat ? "bg-brand-800 text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      <div className="mt-8">
        <FaqAccordion key={active} items={visible} />
      </div>
    </div>
  )
}
