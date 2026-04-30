import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactCTA from "@/components/ContactCTA";

export default function Pricing() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const plans = [
    {
      name: "AI Receptionist",
      price: "From $600",
      period: "/month",
      desc: "For hotels that want to stop losing bookings to unanswered questions.",
      features: ["Custom AI trained on your hotel", "24/7 availability", "10+ languages", "Human escalation pathway", "Weekly conversation reports", "Month-to-month"],
      cta: "Get Started",
      highlight: false,
    },
    {
      name: "NightDesk Complete",
      price: "From $2,000",
      period: "/month",
      desc: "All three services combined. The fastest path to direct booking growth.",
      features: ["AI Receptionist (all features)", "Google Ads Management", "Direct Booking Optimization", "Weekly strategy calls", "Priority support (2-hr response)", "Advanced analytics + reports", "Competitor monitoring", "Month-to-month"],
      cta: "Get Complete",
      highlight: true,
    },
    {
      name: "Google Ads",
      price: "From $1,000",
      period: "/month",
      desc: "Hotel-specific Google Ads campaigns that drive direct booking traffic.",
      features: ["Hotel keyword research", "Ad copy writing + testing", "Bid management", "Remarketing campaigns", "Competitor targeting", "Monthly performance reports", "Month-to-month"],
      cta: "Get Started",
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#0A0A0F", color: "#F5F0E8" }}>
      <Navbar />
      <div style={{ paddingTop: "8rem", paddingBottom: "4rem", maxWidth: "1000px", margin: "0 auto", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "3.5rem", fontWeight: 600, marginBottom: "1rem", lineHeight: 1.1 }}>
            Simple, Transparent Pricing
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.1rem", color: "rgba(245,240,232,0.6)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
            Month-to-month. No long-term contracts. 30-day satisfaction guarantee on all plans.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
          {plans.map((plan, i) => (
            <div key={i} style={{ background: plan.highlight ? "rgba(201,168,76,0.06)" : "rgba(255,255,255,0.02)", border: plan.highlight ? "1px solid rgba(201,168,76,0.3)" : "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "2rem", display: "flex", flexDirection: "column" }}>
              {plan.highlight && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "#C9A84C", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Most Popular</div>}
              <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.5rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "0.5rem" }}>{plan.name}</h2>
              <div style={{ marginBottom: "0.75rem" }}>
                <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2.5rem", fontWeight: 600, color: plan.highlight ? "#C9A84C" : "#F5F0E8" }}>{plan.price}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "rgba(245,240,232,0.5)" }}>{plan.period}</span>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "rgba(245,240,232,0.6)", lineHeight: 1.6, marginBottom: "1.5rem" }}>{plan.desc}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem 0", flex: 1 }}>
                {plan.features.map((f, j) => (
                  <li key={j} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "rgba(245,240,232,0.8)", marginBottom: "0.5rem" }}>
                    <Check size={13} color="#C9A84C" style={{ flexShrink: 0 }} /> {f}
                  </li>
                ))}
              </ul>
              <a href="https://calendly.com/hello-nightdesk/30min" target="_blank" rel="noopener noreferrer" className={plan.highlight ? "btn-gold" : ""} style={plan.highlight ? { padding: "0.75rem 1.5rem", fontSize: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" } : { padding: "0.75rem 1.5rem", fontSize: "0.85rem", border: "1px solid rgba(245,240,232,0.2)", borderRadius: "6px", color: "rgba(245,240,232,0.8)", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", fontFamily: "'DM Sans', sans-serif" }}>
                {plan.cta} <ArrowRight size={13} />
              </a>
            </div>
          ))}
        </div>

        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "1.5rem", marginBottom: "2rem" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "rgba(245,240,232,0.6)", margin: 0, lineHeight: 1.7 }}>
            <strong style={{ color: "#F5F0E8" }}>Note on pricing:</strong> All prices shown are starting prices for hotels with 10–30 rooms. Pricing scales with hotel size: 30–80 rooms and 80–150 rooms tiers are available. Google Ads management fee does not include ad spend budget (minimum $500/month recommended). All plans include setup at no additional cost. Contact us for a custom quote.
          </p>
        </div>
      </div>
      <ContactCTA />
    </div>
  );
}
