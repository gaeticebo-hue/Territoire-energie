"use client"

import { useRouter } from "next/navigation"
import { Field, inputClass } from "@/components/ui/Field"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"

export default function ConnexionPage() {
  const router = useRouter()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    router.push("/espace-membres")
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6 py-16">
      <Card className="w-full max-w-md">
        <h1 className="text-xl font-semibold text-brand-950">Connexion à l&apos;espace membres</h1>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          Cette page est une démonstration : le formulaire ci-dessous ne vérifie aucune identité réelle
          et vous conduit directement au tableau de bord de démonstration.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <Field label="E-mail professionnel" htmlFor="email" required>
            <input id="email" name="email" type="email" required className={inputClass} placeholder="vous@entreprise.fr" />
          </Field>
          <Field label="Mot de passe" htmlFor="password" required>
            <input id="password" name="password" type="password" required className={inputClass} />
          </Field>
          <Button type="submit" className="w-full">
            Accéder au tableau de bord
          </Button>
        </form>

        <p className="mt-6 text-xs text-neutral-500">
          En production, cette page sera remplacée par l&apos;authentification Supabase (e-mail /
          mot de passe ou lien magique), avec accès différencié selon le rôle et l&apos;entreprise de
          l&apos;utilisateur.
        </p>
      </Card>
    </div>
  )
}
