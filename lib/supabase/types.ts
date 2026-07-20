// Types générés à la main à partir de supabase/migrations/0001_init.sql.
// À remplacer par `npx supabase gen types typescript` une fois la CLI
// Supabase configurée avec le projet, pour rester synchronisé avec le
// schéma réel.
//
// La forme exacte (Row/Insert/Update/Relationships pour chaque table, et
// Tables/Views/Functions au niveau du schéma) est requise par
// @supabase/postgrest-js pour que l'inférence de types fonctionne : sans
// elle, `.from(...)` retombe silencieusement sur `never`.

export type Database = {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          name: string
          type: "consumer" | "producer" | "partner"
          sector: string | null
          annual_consumption_mwh: number | null
          region: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          type: string
          sector?: string | null
          annual_consumption_mwh?: number | null
          region?: string | null
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["companies"]["Insert"]>
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          company_id: string | null
          role: "admin" | "member" | "partner" | "producer"
          created_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          company_id?: string | null
          role?: string
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>
        Relationships: []
      }
      memberships: {
        Row: {
          company_id: string
          programme_id: string
          created_at: string
        }
        Insert: {
          company_id: string
          programme_id: string
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["memberships"]["Insert"]>
        Relationships: []
      }
      documents: {
        Row: {
          id: string
          title: string
          programme_id: string | null
          visibility: "public" | "private"
          category: "reglement" | "formulaire" | "term-sheet" | "support" | "compte-rendu" | "faq"
          file_url: string
          description: string | null
          updated_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          programme_id?: string | null
          visibility: string
          category: string
          file_url?: string
          description?: string | null
          updated_at?: string | null
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["documents"]["Insert"]>
        Relationships: []
      }
      faq_items: {
        Row: {
          id: string
          category: "achat-groupe" | "ppa" | "producteurs" | "programme" | "espace-membres"
          question: string
          answer: string
          programme_id: string | null
          visibility: "public" | "private"
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          category: string
          question: string
          answer: string
          programme_id?: string | null
          visibility: string
          sort_order?: number
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["faq_items"]["Insert"]>
        Relationships: []
      }
      applications: {
        Row: {
          id: string
          type: "consumer" | "producer"
          programme_id: string | null
          company_name: string
          contact_name: string
          email: string
          phone: string | null
          sector: string | null
          annual_consumption_mwh: number | null
          technology: string | null
          message: string | null
          status: "new" | "in_review" | "shortlisted" | "accepted" | "rejected"
          submitted_at: string
        }
        Insert: {
          id?: string
          type: string
          programme_id?: string | null
          company_name: string
          contact_name: string
          email: string
          phone?: string | null
          sector?: string | null
          annual_consumption_mwh?: number | null
          technology?: string | null
          message?: string | null
          status?: string
          submitted_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["applications"]["Insert"]>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
  }
}
