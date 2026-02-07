import { CtaSection } from "@/components/landing/cta-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { Footer } from "@/components/landing/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { LandingNavbar } from "@/components/landing/navbar";
import { StatsSection } from "@/components/landing/stats-section";

export default function Page() {
  return (
    <main className="min-h-dvh">
      <LandingNavbar />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
