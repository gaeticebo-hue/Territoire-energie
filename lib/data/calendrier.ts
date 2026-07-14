import type { CalendarStep } from "@/lib/types"

export const calendarSteps: CalendarStep[] = [
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
