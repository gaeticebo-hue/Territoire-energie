import type { CalendarStep } from "@/lib/types"

export const calendarSteps: CalendarStep[] = [
  {
    id: "cal-1-1",
    programmeId: "prog-1",
    label: "Lancement du dispositif régional PPA",
    date: "2021",
    status: "done",
    description: "La Région Nouvelle-Aquitaine et le Club des ETI de Nouvelle-Aquitaine lancent un dispositif dédié pour faciliter l'accès des ETI aux contrats d'achat direct d'électricité renouvelable.",
  },
  {
    id: "cal-1-2",
    programmeId: "prog-1",
    label: "Premiers PPA mono-acheteur",
    date: "2022",
    status: "done",
    description: "Signature de deux premiers PPA mono-acheteur, préfigurant le dispositif multi-acheteurs.",
  },
  {
    id: "cal-1-3",
    programmeId: "prog-1",
    label: "Signature du PPA multi-acheteurs avec VALECO",
    date: "23 juin 2025",
    status: "done",
    description: "Neuf ETI de Nouvelle-Aquitaine signent avec VALECO le premier contrat PPA multi-acheteurs de ce type en France, pour une durée de 15 ans, avec le soutien de la Garantie Électricité Renouvelable de Bpifrance.",
  },
  {
    id: "cal-1-4",
    programmeId: "prog-1",
    label: "Mise en service et démarrage de la livraison",
    date: "Janvier 2026",
    status: "done",
    description: "La centrale photovoltaïque de Durance (Lot-et-Garonne) entre en production et la livraison d'électricité aux 9 entreprises signataires démarre.",
  },
  {
    id: "cal-2-1",
    programmeId: "prog-2",
    label: "Lancement de la consultation producteurs",
    date: "29 juin 2026",
    status: "done",
    description: "Ouverture officielle de l'appel d'offres auprès des producteurs d'électricité renouvelable.",
  },
  {
    id: "cal-2-2",
    programmeId: "prog-2",
    label: "Questions / réponses avec les producteurs",
    date: "Juillet 2026",
    status: "current",
    description: "Période d'échanges entre l'AMO et les producteurs candidats sur le règlement de consultation et le Term Sheet.",
  },
  {
    id: "cal-2-3",
    programmeId: "prog-2",
    label: "Date limite de remise des offres",
    date: "10 août 2026",
    status: "upcoming",
    description: "Clôture du dépôt des offres par les producteurs candidats.",
  },
  {
    id: "cal-2-4",
    programmeId: "prog-2",
    label: "Invitation à négociation exclusive",
    date: "Septembre 2026",
    status: "upcoming",
    description: "Sélection du candidat le mieux noté et ouverture d'une phase de négociation exclusive.",
  },
  {
    id: "cal-2-5",
    programmeId: "prog-2",
    label: "Conclusion du Term Sheet",
    date: "Novembre 2026",
    status: "upcoming",
    description: "Signature des conditions indérogeables du contrat par le producteur et les membres du collectif.",
  },
  {
    id: "cal-2-6",
    programmeId: "prog-2",
    label: "Conclusion du PPA",
    date: "1er trimestre 2027",
    status: "upcoming",
    description: "Signature du contrat d'achat direct d'énergie individuel entre chaque entreprise et le producteur.",
  },
]

export function getCalendarStepsByProgramme(programmeId: string): CalendarStep[] {
  return calendarSteps
    .filter((s) => s.programmeId === programmeId)
    .sort((a, b) => a.id.localeCompare(b.id))
}
