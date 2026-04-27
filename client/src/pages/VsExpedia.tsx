import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactCTA from "@/components/ContactCTA";

export default function VsExpedia() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen" style={{ background: "#0A0A0F", color: "#F5F0E8" }}>
      <Navbar />
      <div style={{ paddingTop: "8rem", paddingBottom: "4rem", maxWidth: "800px", margin: "0 auto", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(245,240,232,0.45)", textDecoration: "none", marginBottom: "2rem", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif" }}>
          <ArrowLeft size={14} /> Back to Home
        </Link>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "3rem", fontWeight: 600, marginBottom: "1rem", lineHeight: 1.1 }}>
          NightDesk vs Expedia: A Hotel Owner's Comparison
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.1rem", color: "rgba(245,240,232,0.6)", marginBottom: "3rem", lineHeight: 1.7 }}>
          Understanding the difference between Expedia's OTA model and NightDesk's direct booking approach.
        </p>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", lineHeight: 1.9, color: "rgba(245,240,232,0.8)" }}>
          
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>What Expedia Does</h2>
          <p style={{ marginBottom: "1.5rem" }}>Expedia is an Online Travel Agency that lists hotels on its platform and charges a commission of 15–25% on every booking. Expedia's platform includes multiple brands including Hotels.com, Vrbo, and Orbitz. Like Booking.com, Expedia provides hotels with access to a large audience of travelers and handles the booking transaction in exchange for a commission on each booking.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>What NightDesk Does</h2>
          <p style={{ marginBottom: "1.5rem" }}>NightDesk is a hotel technology agency that helps boutique hotels and independent properties get more direct bookings — bookings made directly through the hotel's own website, without paying any OTA commission. NightDesk combines AI technology (an AI receptionist) with hotel-specific marketing (Google Ads) and conversion optimization (direct booking optimization) to build a sustainable direct booking channel.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>Commission Comparison</h2>
          <p style={{ marginBottom: "1.5rem" }}>Expedia's commission rates are typically 15–25%, similar to Booking.com. For a boutique hotel with 30 rooms and 60% occupancy at $150/night, the annual Expedia commission cost can exceed $50,000. NightDesk Complete costs $24,000–$30,000/year. If NightDesk shifts 25% of Expedia bookings to direct, the commission savings alone cover the NightDesk cost.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>The Strategic Difference</h2>
          <p style={{ marginBottom: "1.5rem" }}>The fundamental difference between Expedia and NightDesk is ownership. When a guest books through Expedia, Expedia owns the guest relationship. When a guest books directly, the hotel owns the relationship — and can market to that guest for future stays, build loyalty, and generate repeat business without paying commission. Over time, a strong direct booking channel is worth far more than the short-term convenience of OTA distribution.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>The Right Approach</h2>
          <p style={{ marginBottom: "1.5rem" }}>The most successful boutique hotels use both Expedia and NightDesk strategically. Expedia for discovery and last-minute inventory. NightDesk to capture direct bookings from guests who are already interested in the property. This dual approach maximizes occupancy while minimizing commission costs over time.</p>
          <div style={{ marginTop: "3rem", padding: "2rem", background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "12px", textAlign: "center" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.75rem", fontWeight: 600, marginBottom: "1rem" }}>Get a Free Hotel Audit</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "rgba(245,240,232,0.7)", marginBottom: "1.5rem" }}>See exactly how much revenue you could recover from OTAs. Free, no obligation.</p>
            <a href="https://calendly.com/hello-nightdesk/30min" target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ padding: "0.75rem 1.75rem", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              Book Free 30-Min Call <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
      <ContactCTA />
    </div>
  );
}
