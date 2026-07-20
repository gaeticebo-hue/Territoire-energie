"use client"

import { useState, type FormEvent } from "react"
import { Field, inputClass } from "@/components/ui/Field"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { createClient } from "@/lib/supabase/client"

type Status = "idle" | "submitting" | "sent" | "error"

export default function ConnexionPage() {
  const [status, setStatus] = useState<Status>("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("submitting")
    setErrorMessage(null)

    const email = String(new FormData(event.currentTarget).get("email") ?? "")
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setStatus("error")
      setErrorMessage(error.message)
      return
    }

    setStatus("sent")
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6 py-16">
      <Card className="w-full max-w-md">
        <h1 className="text-xl font-semibold text-brand-950">Connexion à l&apos;espace membres</h1>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          Saisissez l&apos;e-mail associé à votre entreprise membre : vous recevrez un lien de connexion
          sécurisé, sans mot de passe à retenir.
        </p>

        {status === "sent" ? (
          <div className="mt-6 rounded-lg border border-energy-200 bg-energy-50 p-4 text-sm leading-relaxed text-energy-900">
            E-mail envoyé. Cliquez sur le lien reçu pour accéder à votre tableau de bord — il vous
            connectera directement depuis cet appareil.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <Field label="E-mail professionnel" htmlFor="email" required>
              <input id="email" name="email" type="email" required className={inputClass} placeholder="vous@entreprise.fr" />
            </Field>

            {status === "error" && errorMessage && (
              <p className="rounded-md bg-red-50 px-3.5 py-2.5 text-sm text-red-700">{errorMessage}</p>
            )}

            <Button type="submit" disabled={status === "submitting"} className="w-full">
              {status === "submitting" ? "Envoi en cours..." : "Recevoir mon lien de connexion"}
            </Button>
          </form>
        )}

        <p className="mt-6 text-xs text-neutral-500">
          Votre accès est activé par l&apos;équipe de coordination du programme une fois votre entreprise
          intégrée au collectif. Sans candidature validée au préalable, la connexion créera un compte
          sans accès aux données d&apos;une entreprise tant qu&apos;un administrateur ne vous aura pas
          rattaché.
        </p>
      </Card>
    </div>
  )
}
