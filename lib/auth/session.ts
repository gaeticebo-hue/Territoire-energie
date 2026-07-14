import { demoUser } from "@/lib/data/utilisateurs"
import { getCompanyById } from "@/lib/data/entreprises"
import type { UserProfile, Company } from "@/lib/types"

// ATTENTION : ceci n'est PAS un mécanisme d'authentification. L'espace
// membres est actuellement une démonstration de l'interface, non protégée
// par une vérification d'identité réelle. Elle renvoie systématiquement le
// même profil de démonstration.
//
// Avant mise en production, remplacer cette fonction par une lecture de
// session Supabase (voir lib/supabase/client.ts) côté serveur, et rediriger
// vers /espace-membres/connexion si aucune session valide n'est trouvée.

export type Session = {
  user: UserProfile
  company: Company | undefined
}

export function getDemoSession(): Session {
  return {
    user: demoUser,
    company: getCompanyById(demoUser.companyId),
  }
}
