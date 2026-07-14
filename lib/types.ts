// Modèle de données du programme Territoire Avenir Énergie.
//
// Ces types décrivent la structure cible, y compris pour les données qui
// seront à terme servies par Supabase (voir lib/supabase/client.ts).
// Les données actuelles sont statiques (lib/data/*) et servent de contenu
// de démonstration.

export type ProgrammeStatus = "draft" | "open" | "closed" | "negotiation" | "completed"

export type Programme = {
  id: string
  slug: string
  title: string
  edition: number
  status: ProgrammeStatus
  description: string
  targetVolumeGWh?: string
  launchDate?: string
  offerDeadline?: string
  expectedPpaSignature?: string
  geography?: string
  sector?: string
  /** Champs complémentaires pédagogiques, propres au contenu éditorial du site. */
  ppaDurationYears?: number
  priceModel?: string
  amoPartnerIds?: string[]
  highlights?: string[]
}

export type CompanyType = "consumer" | "producer" | "partner"

export type Company = {
  id: string
  name: string
  type: CompanyType
  sector?: string
  annualConsumptionMWh?: number
  region?: string
}

export type UserRole = "admin" | "member" | "partner" | "producer"

export type UserProfile = {
  id: string
  email: string
  fullName: string
  companyId: string
  role: UserRole
}

export type DocumentVisibility = "public" | "private"

export type DocumentCategory =
  | "reglement"
  | "formulaire"
  | "term-sheet"
  | "support"
  | "compte-rendu"
  | "faq"

export type Document = {
  id: string
  title: string
  programmeId?: string
  visibility: DocumentVisibility
  category: DocumentCategory
  fileUrl: string
  description?: string
  updatedAt?: string
}

export type FaqCategory = "achat-groupe" | "ppa" | "producteurs" | "programme" | "espace-membres"

export type FaqItem = {
  id: string
  category: FaqCategory
  question: string
  answer: string
  programmeId?: string
  visibility: DocumentVisibility
}

export type CalendarStepStatus = "done" | "current" | "upcoming"

export type CalendarStep = {
  id: string
  programmeId: string
  label: string
  date: string
  status: CalendarStepStatus
  description?: string
}

export type ApplicantType = "consumer" | "producer"

export type ApplicationStatus = "new" | "in_review" | "shortlisted" | "accepted" | "rejected"

export type Application = {
  id: string
  type: ApplicantType
  programmeId?: string
  companyName: string
  contactName: string
  email: string
  phone?: string
  sector?: string
  annualConsumptionMWh?: number
  technology?: string
  message?: string
  submittedAt: string
  status: ApplicationStatus
}

export type Partner = {
  id: string
  name: string
  role: string
  description: string
  website?: string
  contactName?: string
  contactEmail?: string
  city?: string
}
