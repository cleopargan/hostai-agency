/* ============================================================
   FAQ — Obsidian & Gold Luxury v3
   Refined accordion, category tags, premium typography
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { Plus, Minus, Mail } from "lucide-react";

const faqs = [
  { q: "Do I need any technical knowledge to get started?", a: "None at all. You fill in a simple onboarding form about your property — your FAQs, policies, booking links. We handle everything else: building, training, and installing the AI. Most clients spend less than 20 minutes on setup.", tag: "Getting Started" },
  { q: "How long does it take to go live?", a: "Our 7-day setup guarantee means your AI concierge will be live on your website within one week of signing. In most cases, we deliver in 3–5 days.", tag: "Getting Started" },
  { q: "What website platforms do you support?", a: "We support all major platforms: WordPress, Wix, Squarespace, Webflow, and custom-coded HTML sites. If you don't have a website, we can build a professional one-page site for you as an add-on.", tag: "Technical" },
  { q: "What if a guest asks something the AI doesn't know?", a: "The AI is trained to gracefully escalate questions it can't answer — it will offer to take the guest's contact details and let them know a team member will follow up. You'll receive a notification so nothing falls through the cracks.", tag: "Technical" },
  { q: "Will the bot sound like a robot?", a: "No. We spend time understanding your property's personality and tone — whether that's warm and family-friendly, or sleek and professional. The AI is trained to sound like a knowledgeable, friendly member of your team.", tag: "Quality" },
  { q: "What languages does it support?", a: "The Starter plan supports one language (your choice). The Professional plan supports up to 3 languages. Additional languages are available as add-ons at $99/month each.", tag: "Quality" },
  { q: "Can I cancel at any time?", a: "Yes. There are no long-term contracts. The monthly retainer is month-to-month and you can cancel with 30 days' notice. We're confident you'll stay because the results speak for themselves.", tag: "Billing" },
  { q: "What's included in the monthly retainer?", a: "Your retainer covers: AI hosting and uptime, monthly retraining when your information changes, a monthly performance report, and email support. Professional plan clients also get a monthly strategy call.", tag: "Billing" },
];

const tagColors: Record<string, { bg: string; color: string }> = {
  "Getting Started": { bg: "rgba(110,231,183,0.08)", color: "#6EE7B7" },
  "Technical": { bg: "rgba(126,200,227,0.08)", color: "#7EC8E3" },
  "Quality": { bg: "rgba(201,168,76,0.08)", color: "#C9A84C" },
  "Billing": { bg: "rgba(196,181,253,0.08)", color: "#C4B5FD" },
};

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="faq" ref={ref} className="py-24 md:py-32 relative" style={{ background: "#0C0B18" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent)" }} />

      <div className="container">

        {/* Header */}
        <div className={`max-w-2xl mx-auto text-center mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="gold-line" />
            <span className="section-label">FAQ</span>
            <div className="gold-line" style={{ background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2rem, 3.5vw, 3rem)",
            fontWeight: 600,
            lineHeight: 1.1,
            color: "#F5F0E8"
          }}>
            Questions? We Have <em className="gold-text">Answers.</em>
          </h2>
        </div>

        {/* FAQ accordion — two columns */}
        <div className="grid lg:grid-cols-2 gap-3 max-w-5xl mx-auto">
          {faqs.map((faq, i) => {
            const tc = tagColors[faq.tag] || { bg: "rgba(201,168,76,0.08)", color: "#C9A84C" };
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`overflow-hidden transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{
                  transitionDelay: `${i * 50}ms`,
                  background: isOpen ? "rgba(201,168,76,0.03)" : "rgba(12,11,22,0.9)",
                  border: `1px solid ${isOpen ? "rgba(201,168,76,0.25)" : "rgba(255,255,255,0.055)"}`,
                  borderRadius: "2px",
                  transition: "all 0.3s ease"
                }}
              >
                <button
                  className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <div className="flex flex-col gap-2 flex-1">
                    <span style={{
                      display: "inline-block",
                      padding: "0.15rem 0.55rem",
                      borderRadius: "2px",
                      background: tc.bg,
                      color: tc.color,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      alignSelf: "flex-start"
                    }}>
                      {faq.tag}
                    </span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "#F5F0E8", lineHeight: 1.45 }}>
                      {faq.q}
                    </span>
                  </div>
                  <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1" style={{
                    background: isOpen ? "rgba(201,168,76,0.12)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${isOpen ? "rgba(201,168,76,0.28)" : "rgba(255,255,255,0.06)"}`,
                    borderRadius: "2px",
                    transition: "all 0.2s ease"
                  }}>
                    {isOpen
                      ? <Minus size={11} style={{ color: "#C9A84C" }} />
                      : <Plus size={11} style={{ color: "rgba(245,240,232,0.35)" }} />
                    }
                  </div>
                </button>

                <div style={{
                  maxHeight: isOpen ? "300px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.35s ease"
                }}>
                  <div className="px-5 pb-5">
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.83rem", lineHeight: 1.75, color: "rgba(245,240,232,0.5)" }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className={`mt-12 text-center transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="inline-flex items-center gap-3 px-7 py-4" style={{
            background: "rgba(12,11,22,0.9)",
            border: "1px solid rgba(255,255,255,0.055)",
            borderRadius: "2px"
          }}>
            <Mail size={15} style={{ color: "#C9A84C", flexShrink: 0 }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "rgba(245,240,232,0.45)" }}>
              Still have a question?{" "}
              <a href="mailto:hello@hostai.co" style={{ color: "#C9A84C", fontWeight: 600, textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.textDecoration = "underline"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.textDecoration = "none"}>
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
