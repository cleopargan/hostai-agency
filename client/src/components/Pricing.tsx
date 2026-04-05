/* ============================================================
   PRICING — Obsidian & Gold Luxury v3
   Premium pricing cards, gold featured card, refined layout
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    tagline: "Perfect for B&Bs and small cafes",
    setup: 997,
    monthly: 249,
    featured: false,
    features: [
      "Custom AI trained on your property",
      "Website installation (any platform)",
      "Up to 500 conversations/month",
      "FAQ & booking link handling",
      "Email support",
      "Monthly performance report",
      "7-day setup guarantee",
    ],
    cta: "Get Started",
  },
  {
    name: "Professional",
    tagline: "For boutique hotels & multi-location properties",
    setup: 1497,
    monthly: 349,
    featured: true,
    features: [
      "Everything in Starter",
      "Unlimited conversations",
      "Multi-language support (up to 3 languages)",
      "WhatsApp & Instagram integration",
      "Priority support (4-hour response)",
      "Monthly strategy call",
      "Quarterly AI retraining",
      "Custom bot personality & tone",
    ],
    cta: "Get Started",
  },
];

const addons = [
  { name: "WhatsApp Integration", price: "$249 one-time" },
  { name: "Instagram DM Automation", price: "$249 one-time" },
  { name: "One-Page Website Build", price: "$399 one-time" },
  { name: "Additional Language", price: "$99/month" },
];

export default function Pricing() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="pricing" ref={ref} className="py-24 md:py-32 relative" style={{ background: "#080810" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.18), transparent)" }} />

      {/* Ambient glow */}
      <div className="absolute pointer-events-none" style={{
        top: "30%", left: "50%", transform: "translateX(-50%)",
        width: "700px", height: "400px",
        background: "radial-gradient(ellipse, rgba(201,168,76,0.03) 0%, transparent 65%)",
        filter: "blur(80px)"
      }} />

      <div className="container relative z-10">

        {/* Header */}
        <div className={`max-w-2xl mx-auto text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="gold-line" />
            <span className="section-label">Pricing</span>
            <div className="gold-line" style={{ background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2rem, 3.5vw, 3rem)",
            fontWeight: 600,
            lineHeight: 1.1,
            color: "#F5F0E8",
            marginBottom: "1.25rem"
          }}>
            Simple, <em className="gold-text">Transparent</em> Pricing
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", lineHeight: 1.75, color: "rgba(245,240,232,0.42)" }}>
            One setup fee. One monthly retainer. No hidden costs, no long-term contracts.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto mb-14">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                transitionDelay: `${i * 150}ms`,
                background: plan.featured
                  ? "linear-gradient(160deg, rgba(28,22,10,0.98) 0%, rgba(20,16,6,0.98) 100%)"
                  : "rgba(12,11,22,0.95)",
                border: plan.featured
                  ? "1px solid rgba(201,168,76,0.4)"
                  : "1px solid rgba(255,255,255,0.065)",
                borderRadius: "2px",
                padding: "2.25rem",
                boxShadow: plan.featured
                  ? "0 32px 80px rgba(201,168,76,0.1), 0 0 0 1px rgba(201,168,76,0.06)"
                  : "0 16px 50px rgba(0,0,0,0.3)"
              }}
            >
              {/* Most popular badge */}
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="flex items-center gap-1.5 px-4 py-1.5" style={{
                    background: "linear-gradient(135deg, #B8922E, #E8C96A)",
                    color: "#0A0806",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    borderRadius: "2px",
                    whiteSpace: "nowrap"
                  }}>
                    <Sparkles size={10} /> Most Popular
                  </span>
                </div>
              )}

              {/* Plan name */}
              <div className="mb-6">
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: "#F5F0E8",
                  marginBottom: "0.375rem"
                }}>
                  {plan.name}
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "rgba(245,240,232,0.4)" }}>
                  {plan.tagline}
                </p>
              </div>

              {/* Pricing */}
              <div className="mb-7 pb-7" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="flex items-baseline gap-1.5 mb-1.5">
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "2.5rem",
                    fontWeight: 600,
                    color: plan.featured ? "#C9A84C" : "#F5F0E8",
                    lineHeight: 1
                  }}>
                    ${plan.setup.toLocaleString()}
                  </span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "rgba(245,240,232,0.32)" }}>
                    one-time setup
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: plan.featured ? "#C9A84C" : "#F5F0E8"
                  }}>
                    ${plan.monthly}
                  </span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "rgba(245,240,232,0.32)" }}>
                    /month retainer
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5" style={{
                      background: plan.featured ? "rgba(201,168,76,0.12)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${plan.featured ? "rgba(201,168,76,0.25)" : "rgba(255,255,255,0.06)"}`,
                      borderRadius: "2px"
                    }}>
                      <Check size={9} style={{ color: plan.featured ? "#C9A84C" : "rgba(245,240,232,0.45)" }} />
                    </div>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "rgba(245,240,232,0.6)", lineHeight: 1.5 }}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a href="#contact" className={plan.featured ? "btn-gold" : "btn-ghost-gold"} style={{ display: "block", textAlign: "center" }}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className={`max-w-3xl mx-auto mb-12 transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,240,232,0.28)", textAlign: "center", marginBottom: "1.25rem" }}>
            Optional Add-Ons
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {addons.map((a) => (
              <div key={a.name} className="flex items-center justify-between px-5 py-3.5" style={{
                background: "rgba(12,11,22,0.8)",
                border: "1px solid rgba(255,255,255,0.055)",
                borderRadius: "2px"
              }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "rgba(245,240,232,0.55)" }}>{a.name}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", fontWeight: 600, color: "#C9A84C" }}>{a.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee */}
        <div className={`text-center transition-all duration-700 delay-600 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="inline-flex items-center gap-3 px-7 py-3.5" style={{
            background: "rgba(201,168,76,0.04)",
            border: "1px solid rgba(201,168,76,0.14)",
            borderRadius: "2px"
          }}>
            <span style={{ fontSize: "1.1rem" }}>🛡️</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "rgba(245,240,232,0.5)" }}>
              <strong style={{ color: "#C9A84C" }}>30-day money-back guarantee.</strong> If your AI isn't live in 7 days, you pay nothing.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
