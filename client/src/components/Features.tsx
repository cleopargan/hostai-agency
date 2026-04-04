/* Design: Midnight Gold — Why HostAI section with large colored icons, highlight tags, hover effects */
import { useEffect, useRef, useState } from "react";
import { Globe, MessageSquare, TrendingUp, HeadphonesIcon, BarChart3, Smartphone } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Works on Any Platform",
    desc: "WordPress, Wix, Squarespace, Webflow, or custom HTML — we install your AI concierge on any website in under 30 minutes. No developer needed.",
    highlight: "Any website",
    color: "rgba(99,179,237,0.12)",
    border: "rgba(99,179,237,0.2)",
    iconColor: "#63B3ED",
  },
  {
    icon: MessageSquare,
    title: "Speaks Your Brand's Voice",
    desc: "Your AI is trained exclusively on your property's information — your tone, your policies, your personality. Guests will think it's your best staff member.",
    highlight: "100% custom",
    color: "rgba(201,168,76,0.1)",
    border: "rgba(201,168,76,0.2)",
    iconColor: "#C9A84C",
  },
  {
    icon: TrendingUp,
    title: "Captures Leads Automatically",
    desc: "When a guest shows booking intent, the AI collects their name, email, and dates — and sends them directly to your inbox. Never lose a warm lead again.",
    highlight: "Auto lead capture",
    color: "rgba(72,187,120,0.1)",
    border: "rgba(72,187,120,0.2)",
    iconColor: "#48BB78",
  },
  {
    icon: HeadphonesIcon,
    title: "Handles Escalations Gracefully",
    desc: "When a question is too complex, the AI smoothly hands off to you via email or WhatsApp — so guests always feel taken care of, even at 3am.",
    highlight: "Smart handoff",
    color: "rgba(237,137,54,0.1)",
    border: "rgba(237,137,54,0.2)",
    iconColor: "#ED8936",
  },
  {
    icon: BarChart3,
    title: "Monthly Performance Reports",
    desc: "Every month you receive a clear report: top questions asked, leads captured, conversations handled. Know exactly what your AI is doing for your business.",
    highlight: "Full transparency",
    color: "rgba(159,122,234,0.1)",
    border: "rgba(159,122,234,0.2)",
    iconColor: "#9F7AEA",
  },
  {
    icon: Smartphone,
    title: "WhatsApp & Instagram Ready",
    desc: "Extend your AI concierge to WhatsApp Business and Instagram DMs — where 60% of modern hospitality inquiries actually happen.",
    highlight: "Multi-channel",
    color: "rgba(236,72,153,0.1)",
    border: "rgba(236,72,153,0.2)",
    iconColor: "#EC4899",
  },
];

export default function Features() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="features" ref={ref} className="py-24 md:py-32 relative" style={{ background: "#0D0D14" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.18), transparent)" }} />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.025) 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="container relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="section-label block mb-4">Why HostAI</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5" style={{ fontFamily: "'Playfair Display', serif", color: "#F0EDE6" }}>
            Everything You Need,{" "}
            <span className="gold-text italic">Nothing You Don't</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(240,237,230,0.45)", fontFamily: "'DM Sans', sans-serif" }}>
            Built specifically for boutique hospitality — not adapted from a generic chatbot tool.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`relative p-7 rounded-2xl transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                transitionDelay: `${200 + i * 80}ms`,
                background: "#16161F",
                border: "1px solid rgba(255,255,255,0.06)",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.border = `1px solid ${f.border}`;
                el.style.transform = "translateY(-4px)";
                el.style.boxShadow = `0 20px 60px rgba(0,0,0,0.35)`;
                el.style.background = "#1A1A25";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.border = "1px solid rgba(255,255,255,0.06)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
                el.style.background = "#16161F";
              }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: f.color, border: `1px solid ${f.border}` }}>
                <f.icon size={24} style={{ color: f.iconColor }} />
              </div>

              {/* Highlight tag */}
              <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold mb-3" style={{ background: f.color, color: f.iconColor, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em", border: `1px solid ${f.border}` }}>
                {f.highlight}
              </span>

              <h3 className="text-base font-bold mb-2.5" style={{ color: "#F0EDE6", fontFamily: "'DM Sans', sans-serif" }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(240,237,230,0.43)", fontFamily: "'DM Sans', sans-serif" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
