import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactCTA from "@/components/ContactCTA";

export default function DirectBooking() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen" style={{ background: "#0A0A0F", color: "#F5F0E8" }}>
      <Navbar />
      <div style={{ paddingTop: "8rem", paddingBottom: "4rem", maxWidth: "800px", margin: "0 auto", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(245,240,232,0.45)", textDecoration: "none", marginBottom: "2rem", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif" }}>
          <ArrowLeft size={14} /> Back to Home
        </Link>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "3rem", fontWeight: 600, marginBottom: "1rem", lineHeight: 1.1 }}>
          Direct Booking Optimization for Hotels
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.1rem", color: "rgba(245,240,232,0.6)", marginBottom: "3rem", lineHeight: 1.7 }}>
          Convert more website visitors into direct bookings. Reduce OTA commission costs. From $500/month.
        </p>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", lineHeight: 1.9, color: "rgba(245,240,232,0.8)" }}>
          
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>What is Direct Booking Optimization?</h2>
          <p style={{ marginBottom: "1.5rem" }}>Direct booking optimization is the systematic process of improving a hotel's website and booking flow to convert more visitors into direct bookings. It addresses the gap between a guest arriving on your website and actually completing a booking — a gap that costs boutique hotels thousands of dollars in lost revenue every month.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>Why Hotels Lose Bookings Even With Good Traffic</h2>
          <p style={{ marginBottom: "1.5rem" }}>Many hotels invest in driving traffic to their website — through OTA listings, Google Ads, or SEO — but lose a significant percentage of those visitors before they complete a booking. Common reasons include: a booking engine that is slower or more complicated than OTAs, lack of trust signals (no reviews, no security badges), no best rate guarantee, poor mobile experience, and a checkout flow that requires too many steps.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>What NightDesk Does</h2>
          <p style={{ marginBottom: "1.5rem" }}>NightDesk's direct booking optimization service audits your entire booking flow and implements improvements across five areas: booking engine optimization (speed, simplicity, mobile experience), trust signal implementation (reviews, security badges, best rate guarantee), rate parity strategy (ensuring direct rates are competitive), conversion rate optimization (reducing abandonment at each step), and post-booking experience (confirmation emails, pre-arrival communication).</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>Results You Can Expect</h2>
          <p style={{ marginBottom: "1.5rem" }}>Hotels that implement NightDesk's direct booking optimization typically see a 15–25% improvement in direct booking conversion rate within 60 days. For a hotel receiving 500 website visitors per month with a 2% booking conversion rate, improving that rate to 2.5% generates 2.5 additional bookings per month — at zero additional marketing cost.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>Pricing</h2>
          <p style={{ marginBottom: "1.5rem" }}>Direct Booking Optimization starts at $500/month for hotels with 10–30 rooms, $650/month for 30–80 rooms, and $800/month for 80–150 rooms. Month-to-month, no long-term contract. 30-day satisfaction guarantee.</p>
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
