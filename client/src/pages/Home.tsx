/* Design: Warm Operator — assembles all sections in order */
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
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
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />
      <Hero />
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
