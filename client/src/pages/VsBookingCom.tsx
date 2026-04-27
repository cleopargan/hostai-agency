import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactCTA from "@/components/ContactCTA";

export default function VsBookingCom() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen" style={{ background: "#0A0A0F", color: "#F5F0E8" }}>
      <Navbar />
      <div style={{ paddingTop: "8rem", paddingBottom: "4rem", maxWidth: "800px", margin: "0 auto", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(245,240,232,0.45)", textDecoration: "none", marginBottom: "2rem", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif" }}>
          <ArrowLeft size={14} /> Back to Home
        </Link>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "3rem", fontWeight: 600, marginBottom: "1rem", lineHeight: 1.1 }}>
          NightDesk vs Booking.com: Which is Better for Hotels?
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.1rem", color: "rgba(245,240,232,0.6)", marginBottom: "3rem", lineHeight: 1.7 }}>
          A direct comparison of NightDesk and Booking.com — what each does, what each costs, and when to use each.
        </p>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", lineHeight: 1.9, color: "rgba(245,240,232,0.8)" }}>
          
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>What Booking.com Does</h2>
          <p style={{ marginBottom: "1.5rem" }}>Booking.com is an Online Travel Agency (OTA) that lists hotels on its platform and charges a commission of 15–25% on every booking made through the platform. Booking.com provides hotels with access to a massive global audience of travelers and handles the booking transaction, payment processing, and guest communication. Hotels pay nothing upfront — they pay only when a booking is made, as a percentage of the booking value.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>What NightDesk Does</h2>
          <p style={{ marginBottom: "1.5rem" }}>NightDesk is a hotel technology agency that helps boutique hotels get more direct bookings — bookings made directly through the hotel's own website, without paying any OTA commission. NightDesk does this through three services: an AI receptionist that answers guest questions 24/7, Google Ads campaigns that drive direct booking traffic, and direct booking optimization that converts website visitors into bookings.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>The Key Difference</h2>
          <p style={{ marginBottom: "1.5rem" }}>Booking.com and NightDesk are not direct competitors — they serve different functions. Booking.com is a distribution channel that sends guests to your hotel in exchange for a commission. NightDesk is a service that helps you capture more of those guests directly, before they book through Booking.com. The goal is not to replace Booking.com entirely, but to reduce your dependency on it over time.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>Cost Comparison</h2>
          <p style={{ marginBottom: "1.5rem" }}>Booking.com charges 15–25% commission on every booking. For a hotel with $50,000/month in OTA revenue, that is $7,500 to $12,500/month in commissions. NightDesk Complete costs $2,000–$2,500/month. If NightDesk shifts even 20% of OTA bookings to direct, the savings in commissions ($1,500–$2,500/month) cover the NightDesk cost — and every additional percentage point recovered is pure profit.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>When to Use Each</h2>
          <p style={{ marginBottom: "1.5rem" }}>Use Booking.com for global distribution, last-minute inventory, and discovery by travelers who do not yet know your hotel. Use NightDesk to capture direct bookings from guests who are already interested in your property, reduce your commission costs over time, and build a direct relationship with your guests that OTAs cannot provide.</p>
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
