import { notFound } from "next/navigation"
import { Card } from "@/components/ui/Card"
import { ProgrammeMemberNav } from "@/components/members/ProgrammeMemberNav"
import { getSession } from "@/lib/auth/session"
import { getProgrammeIdsForCompany } from "@/lib/data/adhesions"
import { getProgrammeBySlug } from "@/lib/data/programmes"

type Props = {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export default async function ProgrammeMemberLayout({ children, params }: Props) {
  const { slug } = await params
  const programme = getProgrammeBySlug(slug)
  if (!programme) notFound()

  const session = await getSession()
  if (!session) return null // le middleware redirige déjà vers /espace-membres/connexion

  const { company } = session
  const programmeIds = company ? await getProgrammeIdsForCompany(company.id) : []
  const isMember = programmeIds.includes(programme.id)

  if (!isMember) {
    return (
      <div className="container-site py-10">
        <Card className="bg-amber-50">
          <p className="text-sm leading-relaxed text-amber-900">
            Votre entreprise n&apos;est pas rattachée à cette édition du programme, ou votre compte
            n&apos;est pas encore associé à une entreprise membre. Contactez GREENBIRDIE si vous pensez
            qu&apos;il s&apos;agit d&apos;une erreur.
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <ProgrammeMemberNav programme={programme} />
      <div className="container-site py-10">{children}</div>
    </div>
  )
}
