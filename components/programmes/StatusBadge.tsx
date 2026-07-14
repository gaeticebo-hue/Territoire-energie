import { Badge } from "@/components/ui/Badge"
import type { ProgrammeStatus } from "@/lib/types"

const statusConfig: Record<ProgrammeStatus, { label: string; tone: "brand" | "energy" | "neutral" | "warning" }> = {
  draft: { label: "En préparation", tone: "neutral" },
  open: { label: "Candidatures ouvertes", tone: "energy" },
  closed: { label: "Candidatures closes", tone: "neutral" },
  negotiation: { label: "En négociation", tone: "warning" },
  completed: { label: "PPA conclu", tone: "brand" },
}

export function StatusBadge({ status }: { status: ProgrammeStatus }) {
  const config = statusConfig[status]
  return <Badge tone={config.tone}>{config.label}</Badge>
}
