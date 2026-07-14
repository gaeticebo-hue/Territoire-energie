import type { Document } from "@/lib/types"

// Remarque : les documents contractuels de l'appel d'offres (règlement de
// consultation, Term Sheet, formulaire de réponse) sont soumis à une
// obligation de confidentialité et ne sont transmis qu'aux candidats
// producteurs ayant confirmé leur intérêt, ou aux entreprises membres du
// collectif via l'espace membres. Ils ne sont donc pas hébergés en accès
// public sur ce site. `fileUrl` est un espace réservé en attendant le
// branchement à Supabase Storage.

export const documents: Document[] = [
  {
    id: "doc-reglement-2",
    title: "Règlement de consultation — Appel d'offres producteurs",
    programmeId: "prog-2",
    visibility: "private",
    category: "reglement",
    fileUrl: "#",
    description:
      "Conditions de participation, procédure et critères de sélection de l'appel d'offres producteurs. Transmis sur demande, sous obligation de confidentialité.",
    updatedAt: "2026-06-29",
  },
  {
    id: "doc-termsheet-2",
    title: "Term Sheet — Conditions du PPA multi-acheteurs",
    programmeId: "prog-2",
    visibility: "private",
    category: "term-sheet",
    fileUrl: "#",
    description:
      "Conditions principales du contrat d'achat direct d'énergie (durée, prix, répartition, garanties). Document confidentiel transmis aux candidats retenus.",
    updatedAt: "2026-06-29",
  },
  {
    id: "doc-formulaire-2",
    title: "Formulaire de réponse producteur",
    programmeId: "prog-2",
    visibility: "private",
    category: "formulaire",
    fileUrl: "#",
    description:
      "Trame de réponse technique et économique à compléter par les producteurs candidats.",
    updatedAt: "2026-06-29",
  },
  {
    id: "doc-cr-2-1",
    title: "Compte-rendu — Réunion de lancement du collectif",
    programmeId: "prog-2",
    visibility: "private",
    category: "compte-rendu",
    fileUrl: "#",
    description: "Synthèse de la réunion de lancement à destination des entreprises membres.",
    updatedAt: "2026-06-30",
  },
  {
    id: "doc-support-public-1",
    title: "Présentation du programme Territoire Avenir Énergie",
    visibility: "public",
    category: "support",
    fileUrl: "#",
    description: "Plaquette institutionnelle de présentation du programme (disponible sur demande).",
    updatedAt: "2026-06-29",
  },
]

export function getPublicDocuments(): Document[] {
  return documents.filter((d) => d.visibility === "public")
}

export function getPrivateDocumentsByProgramme(programmeId: string): Document[] {
  return documents.filter((d) => d.visibility === "private" && d.programmeId === programmeId)
}
