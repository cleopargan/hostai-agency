import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Calendar, Clock, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactCTA from "@/components/ContactCTA";

export default function Demo() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen" style={{ background: "#0A0A0F", color: "#F5F0E8" }}>
      <Navbar />
      <div style={{ paddingTop: "8rem", paddingBottom: "4rem", maxWidth: "800px", margin: "0 auto", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(245,240,232,0.45)", textDecoration: "none", marginBottom: "2rem", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif" }}>
          <ArrowLeft size={14} /> Back to Home
        </Link>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "3rem", fontWeight: 600, marginBottom: "1rem", lineHeight: 1.1 }}>
          Book a Free Demo Call
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.1rem", color: "rgba(245,240,232,0.6)", marginBottom: "3rem", lineHeight: 1.7 }}>
          30 minutes. No sales pressure. See exactly how NightDesk would work for your hotel.
        </p>

        <div style={{ display: "grid", gap: "1rem", marginBottom: "3rem" }}>
          {[
            { icon: Clock, title: "30 Minutes", desc: "A focused call covering your hotel's current situation and what NightDesk would do specifically for you." },
            { icon: CheckCircle, title: "Free Hotel Audit", desc: "We'll calculate exactly how much you're paying in OTA commissions and how much you could recover." },
            { icon: Calendar, title: "No Obligation", desc: "No sales pressure, no commitment required. Just useful information about your hotel's direct booking opportunity." },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "1rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", padding: "1.25rem", alignItems: "flex-start" }}>
              <item.icon size={20} color="#C9A84C" style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.1rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "0.25rem" }}>{item.title}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "rgba(245,240,232,0.6)", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", padding: "3rem 2rem", background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "12px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2rem", fontWeight: 600, marginBottom: "1rem" }}>Ready to Book Your Call?</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "rgba(245,240,232,0.7)", marginBottom: "2rem" }}>Choose a time that works for you. Available Monday–Friday, 9 AM–6 PM (CET).</p>
          <a href="https://calendly.com/hello-nightdesk/30min" target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ padding: "1rem 2.5rem", fontSize: "1rem", display: "inline-flex", alignItems: "center", gap: "0.75rem" }}>
            Book on Calendly <ArrowRight size={16} />
          </a>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "rgba(245,240,232,0.4)", marginTop: "1.5rem" }}>
            Prefer email? <a href="mailto:hello@nightdesk.agency" style={{ color: "#C9A84C" }}>hello@nightdesk.agency</a>
          </p>
        </div>
      </div>
      <ContactCTA />
    </div>
  );
}
