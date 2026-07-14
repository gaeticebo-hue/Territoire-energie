// Relation many-to-many entre entreprises et programmes : une entreprise
// peut participer à plusieurs éditions du programme. Modélisée séparément
// plutôt que comme un champ sur `Company`, pour rester fidèle au modèle de
// données transmis (une entreprise n'embarque pas la liste de ses
// programmes ; c'est la relation qui les relie).

export type Membership = {
  companyId: string
  programmeId: string
}

export const memberships: Membership[] = [{ companyId: "company-demo", programmeId: "prog-2" }]

export function getProgrammeIdsForCompany(companyId: string): string[] {
  return memberships.filter((m) => m.companyId === companyId).map((m) => m.programmeId)
}
