/* Design: Midnight Gold — dark pricing cards with gold featured card */
import { useEffect, useRef, useState } from "react";
import { Check, Zap } from "lucide-react";

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
    cta: "Most Popular — Get Started",
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
    <section id="pricing" ref={ref} className="py-24 md:py-32 relative" style={{ background: "#0A0A0F" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.18), transparent)" }} />

      <div className="container">
        <div className={`text-center mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="section-label block mb-4">Pricing</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5" style={{ fontFamily: "'Playfair Display', serif", color: "#F0EDE6" }}>
            Simple, <span className="gold-text italic">Transparent</span> Pricing
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(240,237,230,0.48)", fontFamily: "'DM Sans', sans-serif" }}>
            One setup fee. One monthly retainer. No hidden costs, no long-term contracts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-14">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                transitionDelay: `${i * 150}ms`,
                background: plan.featured ? "linear-gradient(145deg, #1A1810, #16140A)" : "#16161F",
                border: plan.featured ? "1px solid rgba(201,168,76,0.45)" : "1px solid rgba(255,255,255,0.07)",
                boxShadow: plan.featured ? "0 24px 80px rgba(201,168,76,0.12)" : "none",
              }}
            >
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold" style={{ background: "linear-gradient(135deg, #C9A84C, #E8C96A)", color: "#0A0A0F", fontFamily: "'DM Sans', sans-serif" }}>
                    <Zap size={11} /> MOST POPULAR
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1" style={{ color: "#F0EDE6", fontFamily: "'Playfair Display', serif" }}>{plan.name}</h3>
                <p className="text-sm" style={{ color: "rgba(240,237,230,0.45)", fontFamily: "'DM Sans', sans-serif" }}>{plan.tagline}</p>
              </div>

              <div className="mb-6 pb-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold" style={{ color: plan.featured ? "#C9A84C" : "#F0EDE6", fontFamily: "'Playfair Display', serif" }}>
                    ${plan.setup.toLocaleString()}
                  </span>
                  <span className="text-sm" style={{ color: "rgba(240,237,230,0.38)", fontFamily: "'DM Sans', sans-serif" }}>one-time setup</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-semibold" style={{ color: plan.featured ? "#C9A84C" : "#F0EDE6", fontFamily: "'DM Sans', sans-serif" }}>
                    ${plan.monthly}
                  </span>
                  <span className="text-sm" style={{ color: "rgba(240,237,230,0.38)", fontFamily: "'DM Sans', sans-serif" }}>/month retainer</span>
                </div>
              </div>

              <ul className="flex flex-col gap-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: plan.featured ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.06)" }}>
                      <Check size={10} style={{ color: plan.featured ? "#C9A84C" : "rgba(240,237,230,0.5)" }} />
                    </div>
                    <span className="text-sm" style={{ color: "rgba(240,237,230,0.65)", fontFamily: "'DM Sans', sans-serif" }}>{f}</span>
                  </li>
                ))}
              </ul>

              <a href="#contact" className={`block text-center py-3.5 rounded-xl text-sm font-bold transition-all duration-200 ${plan.featured ? "btn-gold" : "btn-ghost-gold"}`}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className={`max-w-3xl mx-auto transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <h3 className="text-center text-base font-semibold mb-5" style={{ color: "rgba(240,237,230,0.5)", fontFamily: "'DM Sans', sans-serif" }}>Optional Add-Ons</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {addons.map((a) => (
              <div key={a.name} className="flex items-center justify-between px-5 py-3.5 rounded-xl" style={{ background: "#16161F", border: "1px solid rgba(255,255,255,0.06)" }}>
                <span className="text-sm" style={{ color: "rgba(240,237,230,0.6)", fontFamily: "'DM Sans', sans-serif" }}>{a.name}</span>
                <span className="text-sm font-semibold" style={{ color: "#C9A84C", fontFamily: "'DM Sans', sans-serif" }}>{a.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee */}
        <div className={`mt-12 text-center transition-all duration-700 delay-600 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full" style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.15)" }}>
            <span className="text-lg">🛡️</span>
            <span className="text-sm" style={{ color: "rgba(240,237,230,0.55)", fontFamily: "'DM Sans', sans-serif" }}>
              <strong style={{ color: "#C9A84C" }}>30-day money-back guarantee.</strong> If your AI isn't live in 7 days, you pay nothing.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
