import { Nav } from "@/components/site/Nav"
import { HeroBoundary } from "@/components/site/HeroBoundary"
import { TransformationStory } from "@/components/site/TransformationStory"
import { SignatureScene } from "@/components/site/SignatureScene"
import { ProtectionSystems } from "@/components/site/ProtectionSystems"
import { ProofOfPermanence } from "@/components/site/ProofOfPermanence"
import { ProtectionProcess } from "@/components/site/ProtectionProcess"
import { SecureCTA } from "@/components/site/SecureCTA"
import { Footer } from "@/components/site/Footer"
import { useLenis } from "@/hooks/useLenis"

export default function HomePage() {
  useLenis()

  return (
    <main className="relative bg-background text-foreground">
      <Nav />
      <HeroBoundary />
      <TransformationStory />
      <SignatureScene />
      <ProtectionSystems />
      <ProofOfPermanence />
      <ProtectionProcess />
      <SecureCTA />
      <Footer />
    </main>
  )
}