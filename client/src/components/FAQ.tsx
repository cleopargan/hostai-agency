/* ============================================================
   FAQ — Elite Luxury v4
   - Premium accordion with gold expand/collapse
   - Two-column layout with refined category tags
   - Subtle hover states and smooth transitions
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { Plus, Minus, Mail } from "lucide-react";

const faqs = [
  { q: "Do I need any technical knowledge to get started?", a: "None at all. You fill in a simple onboarding form about your property — your FAQs, policies, booking links. We handle everything else: building, training, and installing the AI. Most clients spend less than 20 minutes on setup.", tag: "Getting Started", tagColor: "#6EE7B7" },
  { q: "How long does it take to go live?", a: "Our 7-day setup guarantee means your AI concierge will be live on your website within one week of signing. In most cases, we deliver in 3–5 days.", tag: "Getting Started", tagColor: "#6EE7B7" },
  { q: "What website platforms do you support?", a: "We support all major platforms: WordPress, Wix, Squarespace, Webflow, and custom-coded HTML sites. If you don't have a website, we can build a professional one-page site for you as an add-on.", tag: "Technical", tagColor: "#7EC8E3" },
  { q: "What if a guest asks something the AI doesn't know?", a: "The AI is trained to gracefully escalate questions it can't answer — it will offer to take the guest's contact details and let them know a team member will follow up. You'll receive a notification so nothing falls through the cracks.", tag: "Technical", tagColor: "#7EC8E3" },
  { q: "Will the bot sound like a robot?", a: "No. We spend time understanding your property's personality and tone — whether that's warm and family-friendly, or sleek and professional. The AI is trained to sound like a knowledgeable, friendly member of your team.", tag: "Quality", tagColor: "#C9A84C" },
  { q: "What languages does it support?", a: "The Starter plan supports one language (your choice). The Professional plan supports up to 3 languages. Additional languages are available as add-ons at $99/month each.", tag: "Quality", tagColor: "#C9A84C" },
  { q: "Can I cancel at any time?", a: "Yes. There are no long-term contracts. The monthly retainer is month-to-month and you can cancel with 30 days' notice. We're confident you'll stay because the results speak for themselves.", tag: "Billing", tagColor: "#C4B5FD" },
  { q: "What's included in the monthly retainer?", a: "Your retainer covers: AI hosting and uptime, monthly retraining when your information changes, a monthly performance report, and email support. Professional plan clients also get a monthly strategy call.", tag: "Billing", tagColor: "#C4B5FD" },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
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
    <section id="faq" ref={ref} className="py-24 md:py-36 relative" style={{ background: "#0C0B18" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent)" }} />

      <div className="container">

        {/* Header */}
        <div
          className={`max-w-2xl mx-auto text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2))", maxWidth: "80px" }} />
            <span className="section-label">FAQ</span>
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
            Questions?{" "}
            <em style={{
              fontStyle: "italic",
              background: "linear-gradient(90deg, #BFA06A, #E8C96A, #C9A84C)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Answered.</em>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1rem",
            lineHeight: 1.8,
            color: "rgba(245,240,232,0.38)",
          }}>
            Everything you need to know before getting started.
          </p>
        </div>

        {/* FAQ accordion — two columns */}
        <div className="grid lg:grid-cols-2 gap-3 max-w-5xl mx-auto">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`overflow-hidden transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{
                  transitionDelay: `${i * 50}ms`,
                  background: isOpen ? "rgba(201,168,76,0.03)" : "rgba(12,11,22,0.9)",
                  border: `1px solid ${isOpen ? "rgba(201,168,76,0.22)" : "rgba(255,255,255,0.055)"}`,
                  transition: "all 0.3s ease",
                }}
              >
                <button
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "1rem",
                    padding: "1.25rem",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
                    <span style={{
                      display: "inline-block",
                      alignSelf: "flex-start",
                      padding: "0.15rem 0.5rem",
                      background: `${faq.tagColor}12`,
                      color: faq.tagColor,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.58rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}>
                      {faq.tag}
                    </span>
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: isOpen ? "#F5F0E8" : "rgba(245,240,232,0.72)",
                      lineHeight: 1.45,
                      transition: "color 0.2s ease",
                    }}>
                      {faq.q}
                    </span>
                  </div>
                  <div style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: "0.125rem",
                    background: isOpen ? "rgba(201,168,76,0.1)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${isOpen ? "rgba(201,168,76,0.25)" : "rgba(255,255,255,0.06)"}`,
                    transition: "all 0.2s ease",
                  }}>
                    {isOpen
                      ? <Minus size={10} style={{ color: "#C9A84C" }} />
                      : <Plus size={10} style={{ color: "rgba(245,240,232,0.35)" }} />
                    }
                  </div>
                </button>

                <div style={{
                  maxHeight: isOpen ? "300px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.35s ease",
                }}>
                  <div style={{ padding: "0 1.25rem 1.25rem" }}>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.83rem",
                      lineHeight: 1.78,
                      color: "rgba(245,240,232,0.48)",
                    }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div
          className={`mt-14 text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "500ms" }}
        >
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "1rem 1.75rem",
            background: "rgba(12,11,22,0.9)",
            border: "1px solid rgba(255,255,255,0.055)",
          }}>
            <Mail size={14} style={{ color: "#C9A84C", flexShrink: 0 }} />
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.82rem",
              color: "rgba(245,240,232,0.42)",
            }}>
              Still have a question?{" "}
              <a
                href="mailto:hello@hostai.co"
                style={{ color: "#C9A84C", fontWeight: 600, textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.textDecoration = "underline"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.textDecoration = "none"}
              >
                Email us at hello@hostai.co
              </a>
              {" "}— we reply within 24 hours.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
