import { Hero } from "@/components/home/Hero"
import { StatsBand } from "@/components/home/StatsBand"
import { HowItWorks } from "@/components/home/HowItWorks"
import { ProgrammesPreview } from "@/components/home/ProgrammesPreview"
import { AudiencesBand } from "@/components/home/AudiencesBand"
import { PartnersBand } from "@/components/home/PartnersBand"
import { CTABand } from "@/components/home/CTABand"

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBand />
      <HowItWorks />
      <ProgrammesPreview />
      <AudiencesBand />
      <PartnersBand />
      <CTABand />
    </>
  )
}
