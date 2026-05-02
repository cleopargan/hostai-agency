import MarketingNavbar from "@/components/MarketingNavbar";
import MarketingHero from "@/components/MarketingHero";
import MarketingServices from "@/components/MarketingServices";
import MarketingChannels from "@/components/MarketingChannels";
import MarketingProcess from "@/components/MarketingProcess";
import MarketingResults from "@/components/MarketingResults";
import MarketingPricing from "@/components/MarketingPricing";
import MarketingFAQ from "@/components/MarketingFAQ";
import MarketingCTA from "@/components/MarketingCTA";
import FloatingChat from "@/components/FloatingChat";

export default function MarketingLanding() {
  return (
    <div className="min-h-screen" style={{ background: "#080810" }}>
      <MarketingNavbar />
      <MarketingHero />
      <MarketingServices />
      <MarketingChannels />
      <MarketingProcess />
      <MarketingResults />
      <MarketingPricing />
      <MarketingFAQ />
      <MarketingCTA />
      <FloatingChat />
    </div>
  );
}
