/* Design: Warm Operator — cream bg, two-card pricing layout, terracotta highlight on recommended */
import { useEffect, useRef, useState } from "react";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$997",
    period: "one-time setup",
    monthly: "+ $249/month",
    monthlyLabel: "maintenance & support",
    desc: "Perfect for independent boutique hotels and cafes getting started with AI automation.",
    features: [
      "Custom AI chatbot built for your property",
      "WordPress website integration",
      "FAQ training (up to 50 questions)",
      "Booking link integration",
      "7-day setup guarantee",
      "Monthly performance report",
      "Email support",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Professional",
    price: "$1,497",
    period: "one-time setup",
    monthly: "+ $349/month",
    monthlyLabel: "maintenance & support",
    desc: "For properties that want advanced automation, multi-language support, and priority service.",
    features: [
      "Everything in Starter, plus:",
      "Multi-language support (up to 3 languages)",
      "Advanced booking flow automation",
      "Lead capture & CRM integration",
      "Upsell prompts (room upgrades, extras)",
      "Priority 24-hour support",
      "Monthly strategy call",
      "Quarterly bot retraining",
    ],
    cta: "Book a Demo",
    highlight: true,
  },
];

export default function Pricing() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="pricing" className="bg-[#FAF7F2] py-24 lg:py-32" ref={ref}>
      <div className="container">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <span className="section-label">Pricing</span>
          <h2
            className="display-heading text-4xl md:text-5xl mt-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Less than the cost of{" "}
            <span className="italic text-[#C2622D]">one extra shift</span>
          </h2>
          <p className="text-[#1C1008]/60 mt-4 max-w-xl mx-auto text-base" style={{ fontFamily: "'Sora', sans-serif" }}>
            A part-time receptionist costs $1,200–$2,000/month. Your AI works 24/7 for a fraction of that — and never calls in sick.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 transition-all duration-700 ${
                plan.highlight
                  ? "bg-[#1C1008] text-[#FAF7F2] shadow-2xl scale-[1.02]"
                  : "warm-card"
              } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#C2622D] text-white text-xs font-bold px-4 py-1.5 rounded-full" style={{ fontFamily: "'Sora', sans-serif" }}>
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`text-lg font-semibold mb-1 ${plan.highlight ? "text-[#FAF7F2]" : "text-[#1C1008]"}`}
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  {plan.name}
                </h3>
                <p className={`text-sm leading-relaxed ${plan.highlight ? "text-[#FAF7F2]/60" : "text-[#1C1008]/55"}`} style={{ fontFamily: "'Sora', sans-serif" }}>
                  {plan.desc}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span
                    className={`text-5xl font-bold ${plan.highlight ? "text-[#C2622D]" : "text-[#1C1008]"}`}
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {plan.price}
                  </span>
                  <span className={`text-sm ${plan.highlight ? "text-[#FAF7F2]/50" : "text-[#1C1008]/40"}`} style={{ fontFamily: "'Sora', sans-serif" }}>
                    {plan.period}
                  </span>
                </div>
                <p className={`text-sm mt-1 font-medium ${plan.highlight ? "text-[#FAF7F2]/70" : "text-[#1C1008]/60"}`} style={{ fontFamily: "'Sora', sans-serif" }}>
                  {plan.monthly} <span className="font-normal">{plan.monthlyLabel}</span>
                </p>
              </div>

              <div className="divider-warm mb-6" style={{ background: plan.highlight ? "rgba(255,255,255,0.1)" : undefined }}></div>

              <ul className="flex flex-col gap-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check
                      size={15}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: plan.highlight ? "#C2622D" : "#4A6741" }}
                    />
                    <span
                      className={`text-sm ${f.startsWith("Everything") ? "font-semibold" : ""} ${plan.highlight ? "text-[#FAF7F2]/80" : "text-[#1C1008]/70"}`}
                      style={{ fontFamily: "'Sora', sans-serif" }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  plan.highlight
                    ? "bg-[#C2622D] text-white hover:bg-[#a8521f]"
                    : "bg-[#1C1008] text-[#FAF7F2] hover:bg-[#2d1a0e]"
                }`}
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                {plan.cta}
                <ArrowRight size={15} />
              </a>
            </div>
          ))}
        </div>

        {/* Guarantee */}
        <div
          className={`mt-12 text-center transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="inline-flex items-center gap-2.5 bg-[#4A6741]/10 border border-[#4A6741]/20 rounded-full px-5 py-2.5">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="#4A6741">
              <path d="M8 1L2 4v4c0 3.31 2.56 6.41 6 7 3.44-.59 6-3.69 6-7V4L8 1zm-1 9.41L4.59 8 5.66 6.93 7 8.25l3.34-3.34 1.07 1.08L7 10.41z"/>
            </svg>
            <span className="text-sm text-[#4A6741] font-medium" style={{ fontFamily: "'Sora', sans-serif" }}>
              30-day satisfaction guarantee — if you're not happy, we'll refund your setup fee in full.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
