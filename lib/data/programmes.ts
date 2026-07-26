import type { Programme } from "@/lib/types"

export const programmes: Programme[] = [
  {
    id: "prog-1",
    slug: "territoire-avenir-energie-1",
    title: "Territoire Avenir Énergie",
    edition: 1,
    status: "completed",
    description:
      "Première édition du programme : neuf ETI industrielles de Nouvelle-Aquitaine ont signé avec le producteur VALECO le premier contrat PPA multi-acheteurs de ce type en France, à l'issue d'un appel à projets porté par la Région Nouvelle-Aquitaine et le Club des ETI de Nouvelle-Aquitaine.",
    targetVolumeGWh: "25 GWh / an contractualisés",
    expectedPpaSignature: "23 juin 2025",
    geography: "Nouvelle-Aquitaine (centrale photovoltaïque à Durance, Lot-et-Garonne)",
    sector: "9 ETI industrielles multi-sectorielles",
    ppaDurationYears: 15,
    priceModel: "Prix fixe sur 15 ans (pay-as-produced)",
    amoPartnerIds: ["greenbirdie", "region-nouvelle-aquitaine", "club-eti-na", "llc-avocats"],
    highlights: [
      "Premier contrat PPA multi-acheteurs signé avec des ETI en France, avec 9 entreprises signataires",
      "Centrale photovoltaïque de 23,4 MWc (37 968 panneaux) à Durance, en Lot-et-Garonne, aujourd'hui en production",
      "Volume contractualisé de 25 GWh par an, soit environ un quart de la consommation électrique totale des 9 signataires (107 GWh/an)",
      "Contrat PPA de 15 ans avec VALECO, livraison démarrée en janvier 2026, garanti par la Garantie Électricité Renouvelable de Bpifrance",
    ],
  },
  {
    id: "prog-2",
    slug: "territoire-avenir-energie-2",
    title: "Territoire Avenir Énergie",
    edition: 2,
    status: "open",
    description:
      "Deuxième édition du programme : un collectif d'entreprises du Pays Basque et de Nouvelle-Aquitaine se regroupe pour sélectionner, via un appel d'offres, un producteur d'électricité renouvelable et conclure un contrat d'achat direct d'énergie (PPA) multi-acheteurs.",
    targetVolumeGWh: "10 à 13 GWh / an",
    launchDate: "29 juin 2026",
    offerDeadline: "10 août 2026",
    expectedPpaSignature: "1er trimestre 2027",
    geography: "France métropolitaine — priorité à la Nouvelle-Aquitaine",
    sector: "ETI et entreprises industrielles multi-sectorielles",
    ppaDurationYears: 15,
    priceModel: "Prix fixe sur 15 ans (pay-as-produced), variantes indexées possibles",
    amoPartnerIds: ["greenbirdie", "club-eti-na", "pays-basque-industries", "mutandis-avocat"],
    highlights: [
      "Appel d'offres producteurs en cours — clôture des offres le 10 août 2026",
      "Volume cible de 10 à 13 GWh par an mutualisé entre les membres du collectif",
      "Contrat d'achat direct d'énergie (PPA) à prix fixe sur 15 ans",
      "Mécanisme de solidarité entre les membres en cas de défaillance de l'un d'eux",
    ],
  },
  {
    id: "prog-3",
    slug: "territoire-avenir-energie-3",
    title: "Territoire Avenir Énergie",
    edition: 3,
    status: "draft",
    description:
      "Une troisième édition est à l'étude pour élargir le programme à de nouveaux territoires et de nouveaux secteurs, sur le même principe d'achat groupé et de PPA multi-acheteurs. Le calendrier et le périmètre précis seront communiqués aux entreprises intéressées dès leur consolidation.",
    targetVolumeGWh: "En cours de consolidation",
    launchDate: "Prévisionnel : 2027",
    geography: "Nouvelle-Aquitaine et territoires limitrophes (périmètre à confirmer)",
    sector: "Ouverture envisagée à d'autres filières industrielles",
    ppaDurationYears: 15,
    priceModel: "Structure indicative reprenant les principes de l'édition 2",
    amoPartnerIds: ["greenbirdie", "club-eti-na", "pays-basque-industries", "mutandis-avocat"],
    highlights: [
      "Programme en phase de constitution du collectif",
      "Les entreprises intéressées peuvent d'ores et déjà manifester leur intérêt",
      "Retour d'expérience de l'édition 2 intégré à la structuration",
    ],
  },
]

export function getProgrammeBySlug(slug: string): Programme | undefined {
  return programmes.find((p) => p.slug === slug)
}
