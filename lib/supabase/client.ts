// Emplacement réservé à l'initialisation du client Supabase.
//
// Ce projet ne dépend pas encore de Supabase : aucune authentification ni
// base de données réelle n'est branchée. Ce fichier documente la manière
// dont l'intégration sera réalisée, pour que l'architecture des pages
// (espace membres, documents privés, rôles utilisateurs) n'ait pas à être
// remaniée le jour de la mise en place.
//
// Mise en place prévue :
//   1. `npm install @supabase/supabase-js @supabase/ssr`
//   2. Définir NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY
//      dans .env.local (voir .env.example)
//   3. Remplacer le contenu ci-dessous par un vrai client, typiquement :
//
//      import { createBrowserClient } from "@supabase/ssr"
//
//      export function createClient() {
//        return createBrowserClient(
//          process.env.NEXT_PUBLIC_SUPABASE_URL!,
//          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//        )
//      }
//
//   4. Créer un client serveur équivalent (lib/supabase/server.ts) pour les
//      Server Components et Route Handlers, avec gestion des cookies de
//      session.
//   5. Modeler les tables `programmes`, `companies`, `profiles`, `documents`,
//      `faq_items`, `calendar_steps`, `applications` sur les types définis
//      dans lib/types.ts, avec Row Level Security pour restreindre l'accès
//      aux documents et données privées selon le rôle et l'entreprise de
//      l'utilisateur authentifié.

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}
