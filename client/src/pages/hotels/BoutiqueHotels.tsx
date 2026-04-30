import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactCTA from "@/components/ContactCTA";

export default function BoutiqueHotels() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen" style={{ background: "#0A0A0F", color: "#F5F0E8" }}>
      <Navbar />
      <div style={{ paddingTop: "8rem", paddingBottom: "4rem", maxWidth: "800px", margin: "0 auto", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(245,240,232,0.45)", textDecoration: "none", marginBottom: "2rem", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif" }}>
          <ArrowLeft size={14} /> Back to Home
        </Link>
        <div style={{ marginBottom: "1rem" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#C9A84C", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Hotel Type</span>
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "3rem", fontWeight: 600, marginBottom: "1rem", lineHeight: 1.1 }}>
          NightDesk for Boutique Hotels
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.1rem", color: "rgba(245,240,232,0.6)", marginBottom: "3rem", lineHeight: 1.7 }}>
          AI receptionist, Google Ads, and direct booking optimization designed specifically for boutique hotels with 10–50 rooms.
        </p>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", lineHeight: 1.9, color: "rgba(245,240,232,0.8)" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>The Boutique Hotels Challenge</h2>
          <p style={{ marginBottom: "1.5rem" }}>Boutique hotels with 10 to 50 rooms face a unique challenge: they have a distinctive product that guests genuinely want, but they lack the marketing budget and technology infrastructure of large chains. As a result, most boutique hotels send 50–75% of their bookings through OTAs like Booking.com and Expedia, paying 15–22% commission on each booking. For a 30-room boutique hotel with an average room rate of $150 and 65% occupancy, this can mean paying over $80,000 per year in OTA commissions.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>How NightDesk Helps</h2>
          <p style={{ marginBottom: "1.5rem" }}>NightDesk is designed specifically for boutique hotels. The AI Receptionist is trained on the specific character and details of your property — not generic hotel information. Google Ads campaigns highlight what makes your boutique hotel unique, targeting travelers who are specifically looking for the experience you offer. Direct Booking Optimization makes your booking process as seamless as any OTA, so guests who discover your property through any channel can book directly with confidence.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>The Three Services</h2>
          <p style={{ marginBottom: "1.5rem" }}>NightDesk offers three services for boutique hotels: the AI Receptionist (from $600/month), Google Ads Management (from $1,000/month), and Direct Booking Optimization (from $500/month). All three can be bundled as NightDesk Complete from $2,000/month. Month-to-month, no long-term contracts.</p>
          <div style={{ marginTop: "3rem", padding: "2rem", background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "12px", textAlign: "center" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.75rem", fontWeight: 600, marginBottom: "1rem" }}>Get a Free Hotel Audit</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "rgba(245,240,232,0.7)", marginBottom: "1.5rem" }}>See exactly how much revenue your boutique hotels could recover from OTAs.</p>
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
