"use client"

import { useState, type FormEvent } from "react"
import { Field, inputClass } from "@/components/ui/Field"
import { Button } from "@/components/ui/Button"

type Status = "idle" | "submitting" | "success" | "error"

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("submitting")
    setErrorMessage(null)

    const form = event.currentTarget
    const data = new FormData(form)
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
    }

    try {
      const res = await fetch("/api/contact", {
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
        <h3 className="text-base font-semibold">Message envoyé</h3>
        <p className="mt-2 text-sm leading-relaxed">Merci, nous revenons vers vous rapidement.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Nom et prénom" htmlFor="name" required>
          <input id="name" name="name" required className={inputClass} />
        </Field>
        <Field label="E-mail" htmlFor="email" required>
          <input id="email" name="email" type="email" required className={inputClass} />
        </Field>
      </div>

      <Field label="Sujet" htmlFor="subject">
        <select id="subject" name="subject" className={inputClass} defaultValue="">
          <option value="">Sélectionner</option>
          <option value="entreprise">Je suis une entreprise intéressée</option>
          <option value="producteur">Je suis un producteur ENR</option>
          <option value="partenaire">Je suis un partenaire institutionnel</option>
          <option value="presse">Presse / média</option>
          <option value="autre">Autre demande</option>
        </select>
      </Field>

      <Field label="Message" htmlFor="message" required>
        <textarea id="message" name="message" rows={5} required className={inputClass} />
      </Field>

      {status === "error" && errorMessage && (
        <p className="rounded-md bg-red-50 px-3.5 py-2.5 text-sm text-red-700">{errorMessage}</p>
      )}

      <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? "Envoi en cours..." : "Envoyer le message"}
      </Button>
    </form>
  )
}
