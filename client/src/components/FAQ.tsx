/* Design: Midnight Gold — dark accordion FAQ with gold expand indicators */
import { useEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { q: "Do I need any technical knowledge to get started?", a: "None at all. You fill in a simple onboarding form about your property — your FAQs, policies, booking links. We handle everything else: building, training, and installing the AI. Most clients spend less than 20 minutes on setup." },
  { q: "What website platforms do you support?", a: "We support all major platforms: WordPress, Wix, Squarespace, Webflow, and custom-coded HTML sites. If you don't have a website, we can build a professional one-page site for you as an add-on." },
  { q: "How long does it take to go live?", a: "Our 7-day setup guarantee means your AI concierge will be live on your website within one week of signing. In most cases, we deliver in 3–5 days." },
  { q: "What if a guest asks something the AI doesn't know?", a: "The AI is trained to gracefully escalate questions it can't answer — it will offer to take the guest's contact details and let them know a team member will follow up. You'll receive a notification so nothing falls through the cracks." },
  { q: "Can I cancel at any time?", a: "Yes. There are no long-term contracts. The monthly retainer is month-to-month and you can cancel with 30 days' notice. We're confident you'll stay because the results speak for themselves." },
  { q: "Will the bot sound like a robot?", a: "No. We spend time understanding your property's personality and tone — whether that's warm and family-friendly, or sleek and professional. The AI is trained to sound like a knowledgeable, friendly member of your team." },
  { q: "What languages does it support?", a: "The Starter plan supports one language (your choice). The Professional plan supports up to 3 languages. Additional languages are available as add-ons at $99/month each." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="faq" ref={ref} className="py-24 md:py-32 relative" style={{ background: "#0D0D14" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.18), transparent)" }} />

      <div className="container">
        <div className={`text-center mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="section-label block mb-4">FAQ</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5" style={{ fontFamily: "'Playfair Display', serif", color: "#F0EDE6" }}>
            Questions? We Have <span className="gold-text italic">Answers.</span>
          </h2>
          <p className="text-sm" style={{ color: "rgba(240,237,230,0.38)", fontFamily: "'DM Sans', sans-serif" }}>
            Still have a question? Email us at{" "}
            <a href="mailto:hello@hostai.co" className="hover:underline" style={{ color: "#C9A84C" }}>hello@hostai.co</a>
          </p>
        </div>

        <div className="max-w-2xl mx-auto flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-xl overflow-hidden transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${i * 60}ms`, background: open === i ? "rgba(201,168,76,0.04)" : "#16161F", border: `1px solid ${open === i ? "rgba(201,168,76,0.3)" : "rgba(255,255,255,0.06)"}` }}
            >
              <button className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left" onClick={() => setOpen(open === i ? null : i)}>
                <span className="text-base font-semibold" style={{ color: "#F0EDE6", fontFamily: "'DM Sans', sans-serif" }}>{faq.q}</span>
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: open === i ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.05)", border: `1px solid ${open === i ? "rgba(201,168,76,0.3)" : "rgba(255,255,255,0.06)"}` }}>
                  {open === i ? <Minus size={13} style={{ color: "#C9A84C" }} /> : <Plus size={13} style={{ color: "rgba(240,237,230,0.4)" }} />}
                </div>
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(240,237,230,0.55)", fontFamily: "'DM Sans', sans-serif" }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
