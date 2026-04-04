/* Design: Midnight Gold — two-column FAQ with category tags, smooth accordion, and CTA nudge */
import { useEffect, useRef, useState } from "react";
import { Plus, Minus, MessageCircle } from "lucide-react";

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
  "Getting Started": { bg: "rgba(72,187,120,0.1)", color: "#48BB78" },
  "Technical": { bg: "rgba(99,179,237,0.1)", color: "#63B3ED" },
  "Quality": { bg: "rgba(201,168,76,0.1)", color: "#C9A84C" },
  "Billing": { bg: "rgba(159,122,234,0.1)", color: "#9F7AEA" },
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
    <section id="faq" ref={ref} className="py-24 md:py-32 relative" style={{ background: "#0A0A0F" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.18), transparent)" }} />

      <div className="container">
        <div className={`text-center mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="section-label block mb-4">FAQ</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5" style={{ fontFamily: "'Playfair Display', serif", color: "#F0EDE6" }}>
            Questions? We Have <span className="gold-text italic">Answers.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {faqs.map((faq, i) => {
            const tc = tagColors[faq.tag] || { bg: "rgba(201,168,76,0.1)", color: "#C9A84C" };
            return (
              <div
                key={i}
                className={`rounded-xl overflow-hidden transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{
                  transitionDelay: `${i * 50}ms`,
                  background: open === i ? "rgba(201,168,76,0.04)" : "#16161F",
                  border: `1px solid ${open === i ? "rgba(201,168,76,0.28)" : "rgba(255,255,255,0.06)"}`,
                }}
              >
                <button
                  className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <div className="flex flex-col gap-2 flex-1">
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold self-start" style={{ background: tc.bg, color: tc.color, fontFamily: "'DM Sans', sans-serif" }}>
                      {faq.tag}
                    </span>
                    <span className="text-sm font-semibold leading-snug" style={{ color: "#F0EDE6", fontFamily: "'DM Sans', sans-serif" }}>{faq.q}</span>
                  </div>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ background: open === i ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.05)", border: `1px solid ${open === i ? "rgba(201,168,76,0.3)" : "rgba(255,255,255,0.06)"}` }}>
                    {open === i ? <Minus size={12} style={{ color: "#C9A84C" }} /> : <Plus size={12} style={{ color: "rgba(240,237,230,0.4)" }} />}
                  </div>
                </button>
                {open === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(240,237,230,0.52)", fontFamily: "'DM Sans', sans-serif" }}>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions nudge */}
        <div className={`mt-12 text-center transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl" style={{ background: "#16161F", border: "1px solid rgba(255,255,255,0.06)" }}>
            <MessageCircle size={18} style={{ color: "#C9A84C" }} />
            <span className="text-sm" style={{ color: "rgba(240,237,230,0.5)", fontFamily: "'DM Sans', sans-serif" }}>
              Still have a question?{" "}
              <a href="mailto:hello@hostai.co" className="font-semibold hover:underline" style={{ color: "#C9A84C" }}>Email us at hello@hostai.co</a>
              {" "}— we reply within 24 hours.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
