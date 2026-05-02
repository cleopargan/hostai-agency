import { useEffect, useRef, useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    tag: "Single Channel",
    price: "$499",
    period: "/month",
    adSpend: "+ $500–$2,000 ad spend",
    description: "Perfect for hotels new to paid advertising who want to start with Google Ads.",
    features: [
      "Google Ads campaign management",
      "Keyword research & strategy",
      "Google Hotel Ads setup",
      "Conversion tracking",
      "Weekly bid optimisation",
      "Monthly performance report",
      "Dedicated account manager",
    ],
    notIncluded: ["Facebook & Instagram Ads", "Bing Ads", "SEO Landing Pages"],
    cta: "Start With Google Ads",
    popular: false,
    color: "#4A90E2",
    border: "rgba(255,255,255,0.08)",
    hoverBorder: "rgba(74,144,226,0.35)",
  },
  {
    name: "Growth",
    tag: "Most Popular",
    price: "$999",
    period: "/month",
    adSpend: "+ $1,500–$5,000 ad spend",
    description: "The complete paid advertising stack. Three channels working together to maximise direct bookings.",
    features: [
      "Google Ads campaign management",
      "Facebook & Instagram Ads",
      "Bing / Microsoft Ads",
      "Cross-channel retargeting",
      "Lookalike audience targeting",
      "Creative copywriting included",
      "Bi-weekly optimisation calls",
      "Priority support",
    ],
    notIncluded: ["SEO Landing Pages"],
    cta: "Start Growing",
    popular: true,
    color: "#C9A84C",
    border: "rgba(201,168,76,0.25)",
    hoverBorder: "rgba(201,168,76,0.55)",
  },
  {
    name: "Elite",
    tag: "Full Stack",
    price: "$1,799",
    period: "/month",
    adSpend: "+ $3,000+ ad spend",
    description: "Paid ads plus an SEO foundation that compounds over time. For operators serious about owning their market.",
    features: [
      "Everything in Growth",
      "5 SEO landing pages/quarter",
      "Google My Business management",
      "Schema markup & technical SEO",
      "Monthly content updates",
      "Competitor ranking reports",
      "Quarterly strategy session",
      "White-glove onboarding",
    ],
    notIncluded: [],
    cta: "Go Elite",
    popular: false,
    color: "#6EE7B7",
    border: "rgba(255,255,255,0.08)",
    hoverBorder: "rgba(110,231,183,0.35)",
  },
];

export default function MarketingPricing() {
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
    <section
      id="pricing"
      ref={ref}
      style={{
        background: "#080810",
        padding: "6rem 0 7rem",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="section-label" style={{ display: "inline-flex", marginBottom: "1.25rem" }}>
            Transparent Pricing
          </span>
          <h2
            className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              color: "#F5F0E8",
              marginBottom: "1rem",
            }}
          >
            No Surprises.{" "}
            <em style={{
              fontStyle: "italic",
              background: "linear-gradient(90deg, #BFA06A, #E8C96A, #C9A84C)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              No Hidden Fees.
            </em>
          </h2>
          <p
            className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{
              transitionDelay: "100ms",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.95rem",
              lineHeight: 1.75,
              color: "rgba(245,240,232,0.38)",
              maxWidth: "540px",
              margin: "0 auto",
            }}
          >
            Management fees only — your ad spend goes directly to the platforms. Cancel anytime with 30 days notice.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{
                transitionDelay: `${150 + i * 100}ms`,
                padding: "2rem",
                background: plan.popular ? "rgba(201,168,76,0.04)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${plan.border}`,
                position: "relative",
                overflow: "hidden",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = plan.hoverBorder;
                (e.currentTarget as HTMLElement).style.boxShadow = "0 24px 80px rgba(0,0,0,0.35)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = plan.border;
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Top accent */}
              <div style={{
                position: "absolute",
                top: 0, left: 0, right: 0,
                height: "2px",
                background: plan.popular
                  ? "linear-gradient(90deg, #C9A84C, #E8C96A, #C9A84C)"
                  : `linear-gradient(90deg, ${plan.color}60, transparent)`,
              }} />

              {/* Popular badge */}
              {plan.popular && (
                <div style={{
                  position: "absolute",
                  top: "1.25rem", right: "1.25rem",
                  padding: "0.25rem 0.7rem",
                  background: "linear-gradient(135deg, #C9A84C, #E8C96A)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.58rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#0C0B18",
                }}>
                  Most Popular
                </div>
              )}

              {/* Tag */}
              <div style={{
                display: "inline-flex",
                marginBottom: "0.875rem",
                padding: "0.22rem 0.625rem",
                background: `rgba(${plan.color === "#C9A84C" ? "201,168,76" : plan.color === "#4A90E2" ? "74,144,226" : "110,231,183"},0.06)`,
                border: `1px solid rgba(${plan.color === "#C9A84C" ? "201,168,76" : plan.color === "#4A90E2" ? "74,144,226" : "110,231,183"},0.16)`,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: plan.color,
              }}>
                {plan.tag}
              </div>

              {/* Plan name */}
              <h3 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.75rem",
                fontWeight: 600,
                color: "#F5F0E8",
                marginBottom: "0.875rem",
              }}>
                {plan.name}
              </h3>

              {/* Price */}
              <div style={{ marginBottom: "0.5rem", display: "flex", alignItems: "flex-end", gap: "0.25rem" }}>
                <span style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "3rem",
                  fontWeight: 600,
                  color: plan.popular ? "#C9A84C" : "#F5F0E8",
                  lineHeight: 1,
                }}>
                  {plan.price}
                </span>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.82rem",
                  color: "rgba(245,240,232,0.35)",
                  marginBottom: "0.25rem",
                }}>
                  {plan.period}
                </span>
              </div>

              {/* Ad spend note */}
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem",
                color: "rgba(245,240,232,0.3)",
                marginBottom: "1.25rem",
                paddingBottom: "1.25rem",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}>
                {plan.adSpend}
              </div>

              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.83rem",
                lineHeight: 1.7,
                color: "rgba(245,240,232,0.45)",
                marginBottom: "1.5rem",
              }}>
                {plan.description}
              </p>

              {/* Included features */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: plan.notIncluded.length > 0 ? "1rem" : "1.75rem" }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                    <CheckCircle2 size={12} style={{ color: "#6EE7B7", flexShrink: 0 }} />
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.8rem",
                      color: "rgba(245,240,232,0.62)",
                    }}>
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              {/* Not included */}
              {plan.notIncluded.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.75rem" }}>
                  {plan.notIncluded.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                      <div style={{
                        width: "12px", height: "12px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        <div style={{ width: "8px", height: "1px", background: "rgba(255,255,255,0.15)" }} />
                      </div>
                      <span style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.78rem",
                        color: "rgba(245,240,232,0.2)",
                      }}>
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA */}
              <a
                href="#contact"
                className={plan.popular ? "btn-gold" : "btn-ghost-gold"}
                style={{ width: "100%", justifyContent: "center", padding: "0.875rem", fontSize: "0.78rem" }}
              >
                {plan.cta} <ArrowRight size={13} />
              </a>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{
            transitionDelay: "500ms",
            marginTop: "2.5rem",
            padding: "1.25rem 1.5rem",
            background: "rgba(255,255,255,0.015)",
            border: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.8rem",
            color: "rgba(245,240,232,0.38)",
            lineHeight: 1.65,
          }}>
            <strong style={{ color: "rgba(245,240,232,0.6)" }}>Not sure which plan is right for you?</strong>{" "}
            Book a free 20-minute strategy call and we'll recommend the right starting point for your property's size and goals.
          </p>
          <a href="#contact" className="btn-ghost" style={{ padding: "0.6rem 1.5rem", fontSize: "0.72rem", whiteSpace: "nowrap" }}>
            Get a Recommendation
          </a>
        </div>
      </div>
    </section>
  );
}
