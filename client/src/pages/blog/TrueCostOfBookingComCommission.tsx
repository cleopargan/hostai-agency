import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactCTA from "@/components/ContactCTA";

export default function TrueCostOfBookingComCommission() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen" style={{ background: "#0A0A0F", color: "#F5F0E8" }}>
      <Navbar />
      <div style={{ paddingTop: "8rem", paddingBottom: "4rem", maxWidth: "760px", margin: "0 auto", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(245,240,232,0.45)", textDecoration: "none", marginBottom: "2rem", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif" }}>
          <ArrowLeft size={14} /> Back to Blog
        </Link>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.5rem" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "#C9A84C", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Revenue Management</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "rgba(245,240,232,0.35)" }}>April 2026 · 6 min read</span>
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "3rem", fontWeight: 600, marginBottom: "1.5rem", lineHeight: 1.1 }}>
          The True Cost of Booking.com Commission: A Hotel Owner's Guide
        </h1>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", lineHeight: 1.9, color: "rgba(245,240,232,0.8)" }}>
          <p style={{ marginBottom: "1.5rem" }}>Most hotel owners know their Booking.com commission rate. What they often do not calculate is the full cost of that commission — not just the percentage, but the compounding effect on profitability, the lost guest relationships, and the strategic dependency that builds over time.</p>
          <p style={{ marginBottom: "1.5rem" }}>This guide breaks down the true cost of Booking.com commission for a typical boutique hotel, including costs that do not show up on the commission invoice.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>The Headline Number</h2>
          <p style={{ marginBottom: "1.5rem" }}>Booking.com's standard commission rate for independent hotels is 15–25%, with the average around 18%. For a 30-room boutique hotel with an average room rate of $150 and 65% occupancy, the annual revenue is approximately $1,053,000. If 60% of bookings come through Booking.com, the annual Booking.com revenue is $631,800. At 18% commission, the annual commission cost is $113,724.</p>
          <p style={{ marginBottom: "1.5rem" }}>$113,724 per year. That is the headline number. But it is not the full story.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>The Hidden Costs</h2>
          <p style={{ marginBottom: "1.5rem" }}><strong style={{ color: "#F5F0E8" }}>Lost guest relationships.</strong> When a guest books through Booking.com, Booking.com owns the guest relationship. The hotel does not have the guest's email address for marketing purposes. The hotel cannot send pre-arrival upsell offers. The hotel cannot build a loyalty relationship. Each Booking.com booking is a one-time transaction, not the start of a long-term guest relationship. The lifetime value of a direct booking guest is significantly higher than the lifetime value of an OTA booking guest.</p>
          <p style={{ marginBottom: "1.5rem" }}><strong style={{ color: "#F5F0E8" }}>Rate parity obligations.</strong> Booking.com's rate parity clause (in markets where it is still enforced) requires hotels to offer the same or lower rates on Booking.com as on their own website. This prevents hotels from offering direct booking discounts that would incentivize guests to book directly. Even where rate parity is not legally required, many hotels maintain it to avoid losing Booking.com visibility — which means they cannot use pricing as a tool to drive direct bookings.</p>
          <p style={{ marginBottom: "1.5rem" }}><strong style={{ color: "#F5F0E8" }}>Visibility dependency.</strong> The more bookings a hotel gets through Booking.com, the more dependent it becomes on Booking.com's algorithm for visibility. Hotels that reduce their Booking.com bookings often see a drop in Booking.com ranking, which can create a vicious cycle. This dependency makes it difficult for hotels to reduce OTA reliance without a deliberate, systematic strategy.</p>
          <p style={{ marginBottom: "1.5rem" }}><strong style={{ color: "#F5F0E8" }}>Review platform dependency.</strong> Booking.com reviews are a significant source of social proof for many hotels. Hotels that reduce their Booking.com presence may see a reduction in review volume, which can affect their overall online reputation. Building a direct review strategy (Google Reviews, TripAdvisor) is essential for hotels that want to reduce OTA dependency.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>The Right Strategy</h2>
          <p style={{ marginBottom: "1.5rem" }}>The goal is not to eliminate Booking.com — it is to reduce dependency on it over time. Booking.com provides genuine value: global distribution, last-minute inventory management, and discovery by travelers who do not yet know your hotel. The goal is to shift the balance: more direct bookings for guests who are already interested in your property, while maintaining Booking.com for discovery and last-minute inventory.</p>
          <p style={{ marginBottom: "1.5rem" }}>NightDesk's three services — AI Receptionist, Google Ads, and Direct Booking Optimization — are designed to shift this balance systematically. The target is to move from 60% OTA dependency to 40% or lower over 12–18 months, which for the hotel in our example would save $45,000–$75,000 per year in commissions.</p>
          <div style={{ marginTop: "3rem", padding: "2rem", background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "12px", textAlign: "center" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.75rem", fontWeight: 600, marginBottom: "1rem" }}>Calculate Your Commission Cost</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "rgba(245,240,232,0.7)", marginBottom: "1.5rem" }}>Book a free call and NightDesk will calculate your exact commission cost and direct booking opportunity.</p>
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
