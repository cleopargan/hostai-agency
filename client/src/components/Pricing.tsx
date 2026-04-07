/* ============================================================
   PRICING — Elite Luxury v4
   - Premium pricing cards with gold featured card
   - Refined add-ons section
   - Guarantee banner with shield icon
   - Subtle ambient glow effects
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { Check, Sparkles, Shield } from "lucide-react";

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
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="pricing" ref={ref} className="py-24 md:py-36 relative" style={{ background: "#080810" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.18), transparent)" }} />

      {/* Ambient glow */}
      <div className="absolute pointer-events-none" style={{
        top: "30%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "700px",
        height: "400px",
        background: "radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 65%)",
        filter: "blur(80px)",
      }} />

      <div className="container relative z-10">

        {/* Header */}
        <div
          className={`max-w-2xl mx-auto text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2))", maxWidth: "80px" }} />
            <span className="section-label">Pricing</span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(201,168,76,0.2), transparent)", maxWidth: "80px" }} />
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(2.2rem, 4vw, 3.25rem)",
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: "-0.015em",
            color: "#F5F0E8",
            marginBottom: "1.25rem",
          }}>
            Simple,{" "}
            <em style={{
              fontStyle: "italic",
              background: "linear-gradient(90deg, #BFA06A, #E8C96A, #C9A84C)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Transparent</em>{" "}
            Pricing
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1rem",
            lineHeight: 1.8,
            color: "rgba(245,240,232,0.4)",
          }}>
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
                  ? "linear-gradient(160deg, rgba(28,22,10,0.99) 0%, rgba(20,16,6,0.99) 100%)"
                  : "rgba(12,11,22,0.95)",
                border: plan.featured
                  ? "1px solid rgba(201,168,76,0.38)"
                  : "1px solid rgba(255,255,255,0.065)",
                padding: "2.25rem",
                boxShadow: plan.featured
                  ? "0 40px 100px rgba(201,168,76,0.1), 0 0 0 1px rgba(201,168,76,0.06)"
                  : "0 16px 50px rgba(0,0,0,0.3)",
              }}
            >
              {/* Most popular badge */}
              {plan.featured && (
                <div style={{ position: "absolute", top: "-1rem", left: "50%", transform: "translateX(-50%)" }}>
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    padding: "0.375rem 1rem",
                    background: "linear-gradient(135deg, #B8922E, #E8C96A)",
                    color: "#0A0806",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}>
                    <Sparkles size={9} /> Most Popular
                  </span>
                </div>
              )}

              {/* Plan name */}
              <div style={{ marginBottom: "1.5rem" }}>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "1.6rem",
                  fontWeight: 600,
                  color: "#F5F0E8",
                  marginBottom: "0.375rem",
                  lineHeight: 1.1,
                }}>
                  {plan.name}
                </h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8rem",
                  color: "rgba(245,240,232,0.38)",
                }}>
                  {plan.tagline}
                </p>
              </div>

              {/* Pricing */}
              <div style={{ marginBottom: "1.75rem", paddingBottom: "1.75rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "2.75rem",
                    fontWeight: 700,
                    lineHeight: 1,
                    color: plan.featured ? "#C9A84C" : "#F5F0E8",
                  }}>
                    ${plan.setup.toLocaleString()}
                  </span>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.75rem",
                    color: "rgba(245,240,232,0.3)",
                  }}>
                    one-time setup
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: plan.featured ? "#C9A84C" : "#F5F0E8",
                  }}>
                    ${plan.monthly}
                  </span>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.75rem",
                    color: "rgba(245,240,232,0.3)",
                  }}>
                    /month retainer
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
                    <div style={{
                      width: "1rem",
                      height: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "0.125rem",
                      background: plan.featured ? "rgba(201,168,76,0.1)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${plan.featured ? "rgba(201,168,76,0.22)" : "rgba(255,255,255,0.06)"}`,
                    }}>
                      <Check size={8} style={{ color: plan.featured ? "#C9A84C" : "rgba(245,240,232,0.4)" }} />
                    </div>
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.82rem",
                      color: "rgba(245,240,232,0.58)",
                      lineHeight: 1.5,
                    }}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                className={plan.featured ? "btn-gold" : "btn-ghost-gold"}
                style={{ display: "block", textAlign: "center" }}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div
          className={`max-w-3xl mx-auto mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "500ms" }}
        >
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(245,240,232,0.25)",
            textAlign: "center",
            marginBottom: "1.25rem",
          }}>
            Optional Add-Ons
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {addons.map((a) => (
              <div
                key={a.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.875rem 1.25rem",
                  background: "rgba(12,11,22,0.8)",
                  border: "1px solid rgba(255,255,255,0.055)",
                }}
              >
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.82rem",
                  color: "rgba(245,240,232,0.52)",
                }}>
                  {a.name}
                </span>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "#C9A84C",
                }}>
                  {a.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee */}
        <div
          className={`text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "600ms" }}
        >
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.875rem",
            padding: "1rem 1.75rem",
            background: "rgba(201,168,76,0.04)",
            border: "1px solid rgba(201,168,76,0.14)",
          }}>
            <Shield size={16} style={{ color: "#C9A84C", flexShrink: 0 }} />
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.82rem",
              color: "rgba(245,240,232,0.48)",
            }}>
              <strong style={{ color: "#C9A84C" }}>30-day money-back guarantee.</strong>{" "}
              If your AI isn't live in 7 days, you pay nothing.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
