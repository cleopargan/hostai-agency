import { useEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "How quickly will I see results from Google Ads?",
    a: "Typically within 2–4 weeks you'll see the first direct bookings. Google Ads is intent-based — people are actively searching for hotels — so results come faster than social media ads. Most clients see meaningful ROI within the first 30–60 days.",
  },
  {
    q: "What ad spend budget do I need alongside the management fee?",
    a: "We recommend a minimum of $500/month for Google Ads-only campaigns, $1,500–$2,000/month for multi-channel (Google + Facebook + Bing), and $3,000+ for full-stack. Your ad spend goes 100% to the ad platforms — we don't take a percentage of it.",
  },
  {
    q: "How is this different from managing ads myself or using a general agency?",
    a: "We work exclusively with hotels and hospitality operators, which means our keyword lists, audience segments, and campaign structures are built specifically for the hotel booking journey — not generic e-commerce or lead-gen templates. We also integrate with Google Hotel Ads, which most general agencies don't touch.",
  },
  {
    q: "How long does it take to launch SEO landing pages?",
    a: "We build the first batch of pages within 2–3 weeks of sign-up. Technical SEO improvements start showing effect in 6–12 weeks, while new landing pages typically begin ranking meaningfully by month 3–5. SEO is a long-term investment — but once pages rank, bookings are essentially free.",
  },
  {
    q: "Do you guarantee results?",
    a: "We guarantee we'll deliver measurable improvements in campaign performance within 30 days — or your first month management fee is free. We can't guarantee a specific ROAS or booking volume (that depends partly on your property, rates, and local market) but our benchmarks across hotel clients give us strong confidence in typical outcomes.",
  },
  {
    q: "Can I run ads if my website is on Wix, Squarespace, or WordPress?",
    a: "Yes. We work with properties on any website platform. All we need is the ability to add a small tracking pixel to your site (usually done through a simple tag manager). If your booking engine is hosted separately (like Beds24, Cloudbeds, or Little Hotelier) we can track conversions there too.",
  },
  {
    q: "Is there a long-term contract?",
    a: "No. All plans are month-to-month with 30 days notice to cancel. We don't lock clients into long contracts because we'd rather keep your business by delivering results than by locking you in legally.",
  },
  {
    q: "Can I combine digital marketing with the NightDesk AI concierge?",
    a: "Absolutely — and we'd recommend it. Ads drive guests to your website; the AI concierge converts them by answering their questions instantly and reducing booking friction. Clients who use both services typically see a higher conversion rate from ad traffic than industry benchmarks.",
  },
];

export default function MarketingFAQ() {
  const [visible, setVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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
      id="faq"
      ref={ref}
      style={{
        background: "linear-gradient(180deg, #080810 0%, #06060e 100%)",
        padding: "6rem 0 7rem",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="container">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">

          {/* Left — sticky header */}
          <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}>
            <span className="section-label" style={{ display: "inline-flex", marginBottom: "1.25rem" }}>
              FAQ
            </span>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(1.9rem, 3.5vw, 2.75rem)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              color: "#F5F0E8",
              marginBottom: "1.25rem",
            }}>
              Common{" "}
              <em style={{
                fontStyle: "italic",
                background: "linear-gradient(90deg, #BFA06A, #E8C96A, #C9A84C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Questions
              </em>
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.88rem",
              lineHeight: 1.75,
              color: "rgba(245,240,232,0.38)",
              marginBottom: "2rem",
            }}>
              Anything else on your mind? Email us at{" "}
              <a
                href="mailto:hello@nightdesk.agency"
                style={{ color: "#C9A84C", textDecoration: "none" }}
              >
                hello@nightdesk.agency
              </a>
            </p>
            <a href="#contact" className="btn-gold" style={{ padding: "0.75rem 1.5rem", fontSize: "0.75rem" }}>
              Book Free Audit →
            </a>
          </div>

          {/* Right — accordion */}
          <div
            className={`lg:col-span-2 transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}`}
            style={{ transitionDelay: "150ms" }}
          >
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1.5rem",
                      padding: "1.25rem 0",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      lineHeight: 1.5,
                      color: isOpen ? "#F5F0E8" : "rgba(245,240,232,0.62)",
                      transition: "color 0.2s",
                    }}>
                      {faq.q}
                    </span>
                    <div style={{
                      width: "1.5rem",
                      height: "1.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      background: isOpen ? "rgba(201,168,76,0.08)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${isOpen ? "rgba(201,168,76,0.25)" : "rgba(255,255,255,0.08)"}`,
                      transition: "all 0.2s",
                    }}>
                      {isOpen ? (
                        <Minus size={11} style={{ color: "#C9A84C" }} />
                      ) : (
                        <Plus size={11} style={{ color: "rgba(245,240,232,0.4)" }} />
                      )}
                    </div>
                  </button>

                  <div style={{
                    maxHeight: isOpen ? "500px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.85rem",
                      lineHeight: 1.78,
                      color: "rgba(245,240,232,0.45)",
                      paddingBottom: "1.25rem",
                      paddingRight: "2.5rem",
                    }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
