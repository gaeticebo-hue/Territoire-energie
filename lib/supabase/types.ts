// Types générés à la main à partir de supabase/migrations/0001_init.sql.
// À remplacer par `npx supabase gen types typescript` une fois la CLI
// Supabase configurée avec le projet, pour rester synchronisé avec le
// schéma réel.

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
        Insert: Partial<Database["public"]["Tables"]["companies"]["Row"]> & { name: string; type: string }
        Update: Partial<Database["public"]["Tables"]["companies"]["Row"]>
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
        Insert: Partial<Database["public"]["Tables"]["profiles"]["Row"]> & { id: string; email: string }
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>
      }
      memberships: {
        Row: {
          company_id: string
          programme_id: string
          created_at: string
        }
        Insert: { company_id: string; programme_id: string }
        Update: Partial<Database["public"]["Tables"]["memberships"]["Row"]>
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
        Insert: Partial<Database["public"]["Tables"]["documents"]["Row"]> & {
          title: string
          visibility: string
          category: string
        }
        Update: Partial<Database["public"]["Tables"]["documents"]["Row"]>
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
        Insert: Partial<Database["public"]["Tables"]["faq_items"]["Row"]> & {
          category: string
          question: string
          answer: string
          visibility: string
        }
        Update: Partial<Database["public"]["Tables"]["faq_items"]["Row"]>
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
        Insert: Partial<Database["public"]["Tables"]["applications"]["Row"]> & {
          type: string
          company_name: string
          contact_name: string
          email: string
        }
        Update: Partial<Database["public"]["Tables"]["applications"]["Row"]>
      }
    }
  }
}
