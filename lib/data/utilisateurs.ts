import type { UserProfile } from "@/lib/types"

// Utilisateur de démonstration pour l'espace membres (voir lib/auth/session.ts).
// En production, ces enregistrements seront gérés via Supabase Auth + table `profiles`.

export const demoUser: UserProfile = {
  id: "user-demo",
  email: "contact@entreprise-demo.fr",
  fullName: "Jeanne Dupont",
  companyId: "company-demo",
  role: "member",
}
