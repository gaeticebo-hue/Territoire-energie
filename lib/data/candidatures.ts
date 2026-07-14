import type { Application } from "@/lib/types"

// Aucune candidature réelle n'est stockée côté client : ce tableau documente
// la forme attendue des enregistrements une fois l'API de candidature
// branchée à une base de données (Supabase). Voir app/api/candidatures/route.ts.

export const applications: Application[] = []
