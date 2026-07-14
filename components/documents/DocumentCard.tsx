import type { Document } from "@/lib/types"
import { Badge } from "@/components/ui/Badge"

const categoryLabels: Record<Document["category"], string> = {
  reglement: "Règlement",
  formulaire: "Formulaire",
  "term-sheet": "Term Sheet",
  support: "Support",
  "compte-rendu": "Compte-rendu",
  faq: "FAQ",
}

export function DocumentCard({ document, onRequest }: { document: Document; onRequest?: boolean }) {
  const hasFile = document.fileUrl && document.fileUrl !== "#"

  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-neutral-200 bg-white p-5">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="neutral">{categoryLabels[document.category]}</Badge>
          {document.updatedAt && (
            <span className="text-xs text-neutral-400">Mis à jour le {document.updatedAt}</span>
          )}
        </div>
        <h3 className="mt-2 text-sm font-semibold text-brand-950">{document.title}</h3>
        {document.description && (
          <p className="mt-1 text-sm leading-relaxed text-neutral-600">{document.description}</p>
        )}
      </div>

      {hasFile ? (
        <a
          href={document.fileUrl}
          className="shrink-0 rounded-md border border-neutral-300 px-3 py-1.5 text-xs font-medium text-brand-800 hover:bg-brand-50"
        >
          Télécharger
        </a>
      ) : onRequest ? (
        <a
          href="/contact"
          className="shrink-0 rounded-md border border-neutral-300 px-3 py-1.5 text-xs font-medium text-brand-800 hover:bg-brand-50"
        >
          Sur demande
        </a>
      ) : null}
    </div>
  )
}
