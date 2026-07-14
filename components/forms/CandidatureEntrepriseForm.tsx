"use client"

import { useState, type FormEvent } from "react"
import { Field, inputClass } from "@/components/ui/Field"
import { Button } from "@/components/ui/Button"
import { programmes } from "@/lib/data/programmes"

type Status = "idle" | "submitting" | "success" | "error"

export function CandidatureEntrepriseForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("submitting")
    setErrorMessage(null)

    const form = event.currentTarget
    const data = new FormData(form)
    const payload = {
      type: "consumer" as const,
      companyName: String(data.get("companyName") ?? ""),
      contactName: String(data.get("contactName") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? "") || undefined,
      sector: String(data.get("sector") ?? "") || undefined,
      annualConsumptionMWh: data.get("annualConsumptionMWh")
        ? Number(data.get("annualConsumptionMWh"))
        : undefined,
      programmeId: String(data.get("programmeId") ?? "") || undefined,
      message: String(data.get("message") ?? "") || undefined,
    }

    try {
      const res = await fetch("/api/candidatures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.error ?? "Une erreur est survenue.")
      }
      setStatus("success")
      form.reset()
    } catch (err) {
      setStatus("error")
      setErrorMessage(err instanceof Error ? err.message : "Une erreur est survenue.")
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-energy-200 bg-energy-50 p-6 text-energy-900">
        <h3 className="text-base font-semibold">Candidature envoyée</h3>
        <p className="mt-2 text-sm leading-relaxed">
          Merci pour votre intérêt. L&apos;équipe de coordination du programme reviendra vers vous
          prochainement pour la suite du processus.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Raison sociale" htmlFor="companyName" required>
          <input id="companyName" name="companyName" required className={inputClass} placeholder="Nom de l'entreprise" />
        </Field>
        <Field label="Secteur d'activité" htmlFor="sector">
          <input id="sector" name="sector" className={inputClass} placeholder="Ex. industrie agroalimentaire" />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Nom et prénom du contact" htmlFor="contactName" required>
          <input id="contactName" name="contactName" required className={inputClass} placeholder="Nom du signataire ou référent" />
        </Field>
        <Field label="E-mail professionnel" htmlFor="email" required>
          <input id="email" name="email" type="email" required className={inputClass} placeholder="vous@entreprise.fr" />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Téléphone" htmlFor="phone">
          <input id="phone" name="phone" type="tel" className={inputClass} placeholder="+33 ..." />
        </Field>
        <Field label="Consommation électrique annuelle estimée (MWh)" htmlFor="annualConsumptionMWh">
          <input
            id="annualConsumptionMWh"
            name="annualConsumptionMWh"
            type="number"
            min={0}
            className={inputClass}
            placeholder="Ex. 3200"
          />
        </Field>
      </div>

      <Field label="Édition du programme visée" htmlFor="programmeId">
        <select id="programmeId" name="programmeId" className={inputClass}>
          <option value="">Pas de préférence</option>
          {programmes.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title} #{p.edition}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message (facultatif)" htmlFor="message" hint="Précisez vos sites concernés, votre calendrier ou toute question utile.">
        <textarea id="message" name="message" rows={4} className={inputClass} />
      </Field>

      {status === "error" && errorMessage && (
        <p className="rounded-md bg-red-50 px-3.5 py-2.5 text-sm text-red-700">{errorMessage}</p>
      )}

      <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? "Envoi en cours..." : "Envoyer ma candidature"}
      </Button>

      <p className="text-xs text-neutral-500">
        Les informations transmises sont utilisées exclusivement dans le cadre de l&apos;instruction de
        votre candidature au programme Territoire Avenir Énergie.
      </p>
    </form>
  )
}
