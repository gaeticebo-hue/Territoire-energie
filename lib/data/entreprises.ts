import type { Company } from "@/lib/types"

// Données de démonstration pour l'espace membres. En production, ces
// enregistrements seront gérés via Supabase (table `companies`).

export const companies: Company[] = [
  {
    id: "company-demo",
    name: "Entreprise Démonstration SAS",
    type: "consumer",
    sector: "Industrie agroalimentaire",
    annualConsumptionMWh: 3200,
    region: "Nouvelle-Aquitaine",
  },
]

export function getCompanyById(id: string): Company | undefined {
  return companies.find((c) => c.id === id)
}
