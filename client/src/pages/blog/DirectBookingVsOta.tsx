import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactCTA from "@/components/ContactCTA";

export default function DirectBookingVsOta() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen" style={{ background: "#0A0A0F", color: "#F5F0E8" }}>
      <Navbar />
      <div style={{ paddingTop: "8rem", paddingBottom: "4rem", maxWidth: "760px", margin: "0 auto", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(245,240,232,0.45)", textDecoration: "none", marginBottom: "2rem", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif" }}>
          <ArrowLeft size={14} /> Back to Blog
        </Link>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.5rem" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "#C9A84C", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Strategy</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "rgba(245,240,232,0.35)" }}>April 2026 · 7 min read</span>
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "3rem", fontWeight: 600, marginBottom: "1.5rem", lineHeight: 1.1 }}>
          Direct Booking vs OTA: Which is Better for Boutique Hotels?
        </h1>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", lineHeight: 1.9, color: "rgba(245,240,232,0.8)" }}>
          <p style={{ marginBottom: "1.5rem" }}>The honest answer is: both. But with a deliberate plan to shift the balance toward direct bookings over time. This is not a binary choice — it is a strategic question about how to allocate your distribution across channels to maximize long-term profitability.</p>
          <p style={{ marginBottom: "1.5rem" }}>Here is how to think about direct bookings versus OTAs for a boutique hotel.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>What OTAs Do Well</h2>
          <p style={{ marginBottom: "1.5rem" }}>OTAs are genuinely good at certain things, and hotel owners who dismiss them entirely are leaving money on the table. OTAs provide global distribution — access to travelers who would never have found your hotel through any other channel. They handle payment processing, fraud prevention, and customer service for booking-related issues. They provide a trusted booking environment for travelers who are not familiar with your hotel and want the security of a known platform.</p>
          <p style={{ marginBottom: "1.5rem" }}>OTAs are particularly valuable for filling last-minute inventory, reaching international travelers in markets where you have no marketing presence, and providing a discovery channel for travelers who are still in the research phase and comparing multiple hotels.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>What Direct Bookings Do Better</h2>
          <p style={{ marginBottom: "1.5rem" }}>Direct bookings are better in almost every dimension that matters for long-term hotel profitability. The economics are obvious: no commission means 15–22% more revenue per booking. But the strategic advantages go beyond the immediate economics.</p>
          <p style={{ marginBottom: "1.5rem" }}>Direct booking guests are more valuable guests. They chose your hotel specifically, not just because it was the best result on an OTA. They are more likely to engage with pre-arrival upsell offers, more likely to leave reviews, more likely to return for future stays, and more likely to recommend your hotel to others. The lifetime value of a direct booking guest is significantly higher than the lifetime value of an OTA guest.</p>
          <p style={{ marginBottom: "1.5rem" }}>Direct bookings also give you the guest's contact information, which OTA bookings do not. This allows you to build a direct marketing relationship — email newsletters, loyalty programs, special offers for past guests — that compounds over time. A hotel with a strong direct booking channel and a loyal guest database has a sustainable competitive advantage that OTA-dependent hotels do not.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>The Right Balance</h2>
          <p style={{ marginBottom: "1.5rem" }}>The right balance depends on your hotel's specific situation. A hotel that is just opening and has no brand recognition may need to rely heavily on OTAs for the first year to build occupancy and reviews. A hotel with strong brand recognition and a loyal guest base can afford to be more aggressive about driving direct bookings.</p>
          <p style={{ marginBottom: "1.5rem" }}>As a general target, NightDesk recommends that boutique hotels aim for 50% or more of bookings coming directly within 18–24 months. This is achievable for most properties with the right combination of AI receptionist, Google Ads, and direct booking optimization. It is not achievable without a deliberate strategy.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>The Practical Path Forward</h2>
          <p style={{ marginBottom: "1.5rem" }}>The practical path forward is to start capturing direct bookings from guests who are already interested in your property — the guests who visit your website but do not book. These are the easiest direct bookings to capture, because the guest has already decided they are interested in your hotel. The only barrier is answering their questions and making the booking process easy.</p>
          <p style={{ marginBottom: "1.5rem" }}>NightDesk's AI Receptionist addresses the question-answering barrier. NightDesk's Direct Booking Optimization addresses the booking process barrier. Together, they capture the direct booking opportunity that most boutique hotels are currently leaving on the table.</p>
          <div style={{ marginTop: "3rem", padding: "2rem", background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "12px", textAlign: "center" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.75rem", fontWeight: 600, marginBottom: "1rem" }}>Build Your Direct Booking Strategy</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "rgba(245,240,232,0.7)", marginBottom: "1.5rem" }}>Book a free call to discuss your hotel's specific situation and what a realistic direct booking growth plan would look like.</p>
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
