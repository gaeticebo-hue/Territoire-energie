"use client"

import { useState, type FormEvent } from "react"
import { Field, inputClass } from "@/components/ui/Field"
import { Button } from "@/components/ui/Button"

type Status = "idle" | "submitting" | "success" | "error"

const technologies = [
  "Solaire photovoltaïque",
  "Éolien",
  "Hydroélectricité",
  "Autre / mixte",
]

export function CandidatureProducteurForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("submitting")
    setErrorMessage(null)

    const form = event.currentTarget
    const data = new FormData(form)
    const payload = {
      type: "producer" as const,
      programmeId: "prog-2",
      companyName: String(data.get("companyName") ?? ""),
      contactName: String(data.get("contactName") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? "") || undefined,
      technology: String(data.get("technology") ?? "") || undefined,
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
        <h3 className="text-base font-semibold">Intérêt enregistré</h3>
        <p className="mt-2 text-sm leading-relaxed">
          Merci. L&apos;AMO du programme vous recontactera pour vous transmettre le règlement de
          consultation et le Term Sheet, sous réserve d&apos;acceptation des obligations de
          confidentialité applicables à l&apos;appel d&apos;offres.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Raison sociale du candidat" htmlFor="companyName" required>
          <input id="companyName" name="companyName" required className={inputClass} placeholder="Nom du producteur / société de projet" />
        </Field>
        <Field label="Technologie envisagée" htmlFor="technology">
          <select id="technology" name="technology" className={inputClass}>
            <option value="">Sélectionner</option>
            {technologies.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Nom et prénom du contact" htmlFor="contactName" required>
          <input id="contactName" name="contactName" required className={inputClass} />
        </Field>
        <Field label="E-mail professionnel" htmlFor="email" required>
          <input id="email" name="email" type="email" required className={inputClass} placeholder="vous@producteur.fr" />
        </Field>
      </div>

      <Field label="Téléphone" htmlFor="phone">
        <input id="phone" name="phone" type="tel" className={inputClass} />
      </Field>

      <Field
        label="Présentation du projet (facultatif)"
        htmlFor="message"
        hint="Localisation envisagée, puissance, maturité du projet, calendrier prévisionnel de mise en service."
      >
        <textarea id="message" name="message" rows={4} className={inputClass} />
      </Field>

      {status === "error" && errorMessage && (
        <p className="rounded-md bg-red-50 px-3.5 py-2.5 text-sm text-red-700">{errorMessage}</p>
      )}

      <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? "Envoi en cours..." : "Manifester mon intérêt"}
      </Button>

      <p className="text-xs text-neutral-500">
        Cette manifestation d&apos;intérêt ne constitue pas une offre au sens du règlement de
        consultation. Le règlement, le Term Sheet et le formulaire de réponse officiel vous seront
        transmis directement par l&apos;AMO.
      </p>
    </form>
  )
}
