/* Design: Midnight Gold — full page assembly with TrustStrip */
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Results from "@/components/Results";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import ContactCTA from "@/components/ContactCTA";
import FloatingChat from "@/components/FloatingChat";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#0A0A0F" }}>
      <Navbar />
      <Hero />
      <TrustStrip />
      <Problem />
      <HowItWorks />
      <Features />
      <Results />
      <Pricing />
      <FAQ />
      <ContactCTA />
      <FloatingChat />
    </div>
  );
}
