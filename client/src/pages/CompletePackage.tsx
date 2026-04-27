import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactCTA from "@/components/ContactCTA";

export default function CompletePackage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen" style={{ background: "#0A0A0F", color: "#F5F0E8" }}>
      <Navbar />
      <div style={{ paddingTop: "8rem", paddingBottom: "4rem", maxWidth: "800px", margin: "0 auto", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(245,240,232,0.45)", textDecoration: "none", marginBottom: "2rem", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif" }}>
          <ArrowLeft size={14} /> Back to Home
        </Link>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "3rem", fontWeight: 600, marginBottom: "1rem", lineHeight: 1.1 }}>
          NightDesk Complete Package
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.1rem", color: "rgba(245,240,232,0.6)", marginBottom: "3rem", lineHeight: 1.7 }}>
          All three NightDesk services combined: AI Receptionist + Google Ads + Direct Booking Optimization. From $2,000/month.
        </p>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", lineHeight: 1.9, color: "rgba(245,240,232,0.8)" }}>
          
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>What's Included in NightDesk Complete</h2>
          <p style={{ marginBottom: "1.5rem" }}>NightDesk Complete bundles all three core services — AI Receptionist, Google Ads Management, and Direct Booking Optimization — into one integrated package. Complete clients also receive weekly strategy calls, priority support with a 2-hour response time, advanced analytics and monthly deep-dive reports, and competitor monitoring.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>Why the Bundle Works Better Than Individual Services</h2>
          <p style={{ marginBottom: "1.5rem" }}>The three NightDesk services are designed to work together as a system. The AI Receptionist captures direct booking intent. Google Ads drives direct booking traffic. Direct Booking Optimization converts that traffic into bookings. When all three work together, the results compound: more traffic, better conversion, and more captured intent all reinforce each other. Hotels on the Complete package consistently outperform hotels using individual services.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>The Savings</h2>
          <p style={{ marginBottom: "1.5rem" }}>NightDesk Complete starts at $2,000/month. Purchasing the three services individually would cost $2,100 to $3,300/month depending on hotel size. The Complete package saves up to $800/month versus individual pricing, while also including premium support and weekly strategy calls that are not available on individual plans.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>Who It's For</h2>
          <p style={{ marginBottom: "1.5rem" }}>NightDesk Complete is designed for hotel owners and GMs who are serious about reducing OTA dependency and building a sustainable direct booking channel. It is the right choice for hotels currently paying more than $3,000/month in OTA commissions, hotels that want to see the fastest possible results, and hotels that want a single point of contact for all their hotel marketing and AI needs.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>Pricing</h2>
          <p style={{ marginBottom: "1.5rem" }}>NightDesk Complete starts at $2,000/month for hotels with 10–30 rooms, $2,250/month for 30–80 rooms, and $2,500/month for 80–150 rooms. Includes all three services plus weekly strategy calls, priority support, advanced analytics, and competitor monitoring. Month-to-month, no long-term contract. 30-day satisfaction guarantee.</p>
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
