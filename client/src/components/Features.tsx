/* Design: Midnight Gold — feature strip with icon cards and gold accents */
import { useEffect, useRef, useState } from "react";
import { Globe, MessageCircle, TrendingUp, Shield, Clock, Smartphone } from "lucide-react";

const features = [
  { icon: Globe, title: "Any Website Platform", desc: "WordPress, Wix, Squarespace, Webflow, or custom HTML — we install on all of them in under 30 minutes." },
  { icon: MessageCircle, title: "Speaks Your Brand's Voice", desc: "Trained on your property's personality. Warm, professional, or playful — you decide the tone." },
  { icon: TrendingUp, title: "Captures Leads Automatically", desc: "When guests are ready to book, the AI guides them to your booking page and captures their contact details." },
  { icon: Shield, title: "Handles Escalations Gracefully", desc: "Questions the AI can't answer are escalated to you with a notification — nothing falls through the cracks." },
  { icon: Clock, title: "Monthly Reports Included", desc: "Every month you receive a clear report: conversations handled, leads captured, and staff hours saved." },
  { icon: Smartphone, title: "WhatsApp & Instagram Ready", desc: "Extend your AI to WhatsApp Business and Instagram DMs as optional add-ons for full coverage." },
];

export default function Features() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 md:py-28 relative" style={{ background: "#0D0D14" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.18), transparent)" }} />

      <div className="container">
        <div className={`text-center mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="section-label block mb-4">Why HostAI</span>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#F0EDE6" }}>
            Everything Your Property Needs, <span className="gold-text italic">Nothing It Doesn't</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`card-dark p-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)" }}>
                <f.icon size={18} style={{ color: "#C9A84C" }} />
              </div>
              <h3 className="text-base font-semibold mb-2" style={{ color: "#F0EDE6", fontFamily: "'DM Sans', sans-serif" }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(240,237,230,0.45)", fontFamily: "'DM Sans', sans-serif" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
