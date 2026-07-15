import { useEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "How quickly will I see results from Google and Bing Ads?",
    a: "Typically within 2–4 weeks you'll see the first direct bookings. Paid search is intent-based, so results usually appear faster than social media campaigns. Most clients see meaningful ROI within the first 30–60 days.",
  },
  {
    q: "What ad spend budget do I need alongside the management fee?",
    a: "We recommend a minimum of $500/month for Google and Bing campaigns, $1,500–$2,000/month for multi-channel growth, and $3,000+ for the full stack including SEO and AI conversion. Your ad spend goes directly to the platforms — we don't take a percentage of it.",
  },
  {
    q: "Do you also offer SEO, AI conversion, and concierge automation?",
    a: "Yes. Our most common setup pairs paid search with SEO, direct booking AI, and digital concierge automation so the full guest journey is covered — from first click to post-stay review generation.",
  },
  {
    q: "How long does it take to launch SEO pages and content?",
    a: "We usually begin with the first batch of pages within 2–3 weeks of onboarding. Technical SEO improvements start showing effect in 6–12 weeks, while new landing pages often begin ranking meaningfully by months 3–5.",
  },
  {
    q: "Do you guarantee results?",
    a: "We guarantee measurable improvement in campaign performance within 30 days — or your first month management fee is free. We cannot guarantee a specific ROAS or booking volume because that depends on your property, rates, and market conditions.",
  },
  {
    q: "Can I run ads if my website is on Wix, Squarespace, or WordPress?",
    a: "Yes. We work across any website platform. We just need the ability to add tracking and conversion tools to your site, and we can usually do that through your existing setup or tag manager.",
  },
  {
    q: "Is there a long-term contract?",
    a: "No. All plans are month-to-month with 30 days notice to cancel. We prefer to earn your business through performance rather than locking you into a rigid contract.",
  },
  {
    q: "Can I combine digital marketing with the NightDesk AI concierge?",
    a: "Absolutely — and we recommend it. Paid search and SEO bring visitors in; the AI concierge and guest automation convert and retain them more effectively by answering questions, prompting upsells, and reducing friction.",
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
