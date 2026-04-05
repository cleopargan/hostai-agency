/* ============================================================
   FEATURES — Obsidian & Gold Luxury v3
   Dark texture background, refined feature cards, gold accents
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { Globe, MessageSquare, TrendingUp, HeadphonesIcon, BarChart3, Smartphone } from "lucide-react";

const TEXTURE_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663082783554/QDcYwAv8SHis62JyYiBJro/features-bg-v2_39cadb71.jpg";

const features = [
  {
    icon: Globe,
    title: "Works on Any Platform",
    desc: "WordPress, Wix, Squarespace, Webflow, or custom HTML — we install your AI concierge on any website in under 30 minutes. No developer needed.",
    tag: "Any website",
    accent: "#7EC8E3",
  },
  {
    icon: MessageSquare,
    title: "Speaks Your Brand's Voice",
    desc: "Your AI is trained exclusively on your property's information — your tone, your policies, your personality. Guests will think it's your best staff member.",
    tag: "100% custom",
    accent: "#C9A84C",
  },
  {
    icon: TrendingUp,
    title: "Captures Leads Automatically",
    desc: "When a guest shows booking intent, the AI collects their name, email, and dates — and sends them directly to your inbox. Never lose a warm lead again.",
    tag: "Auto lead capture",
    accent: "#6EE7B7",
  },
  {
    icon: HeadphonesIcon,
    title: "Handles Escalations Gracefully",
    desc: "When a question is too complex, the AI smoothly hands off to you via email or WhatsApp — so guests always feel taken care of, even at 3am.",
    tag: "Smart handoff",
    accent: "#FCA5A5",
  },
  {
    icon: BarChart3,
    title: "Monthly Performance Reports",
    desc: "Every month you receive a clear report: top questions asked, leads captured, conversations handled. Know exactly what your AI is doing for your business.",
    tag: "Full transparency",
    accent: "#C4B5FD",
  },
  {
    icon: Smartphone,
    title: "WhatsApp & Instagram Ready",
    desc: "Extend your AI concierge to WhatsApp Business and Instagram DMs — where 60% of modern hospitality inquiries actually happen.",
    tag: "Multi-channel",
    accent: "#F9A8D4",
  },
];

export default function Features() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="features" ref={ref} className="py-24 md:py-32 relative overflow-hidden" style={{ background: "#0A0914" }}>

      {/* Texture background */}
      <div className="absolute inset-0 pointer-events-none">
        <img src={TEXTURE_BG} alt="" className="w-full h-full object-cover" style={{ opacity: 0.35 }} />
        <div className="absolute inset-0" style={{ background: "rgba(10,9,20,0.55)" }} />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.18), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.1), transparent)" }} />

      <div className="container relative z-10">

        {/* Header */}
        <div className={`max-w-2xl mx-auto text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="gold-line" />
            <span className="section-label">Why HostAI</span>
            <div className="gold-line" style={{ background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2rem, 3.5vw, 3rem)",
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            color: "#F5F0E8",
            marginBottom: "1.25rem"
          }}>
            Everything You Need,{" "}
            <em className="gold-text">Nothing You Don't</em>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", lineHeight: 1.75, color: "rgba(245,240,232,0.42)" }}>
            Built specifically for boutique hospitality — not adapted from a generic chatbot tool.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`relative p-7 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                transitionDelay: `${200 + i * 80}ms`,
                background: hovered === i ? "rgba(16,15,28,0.98)" : "rgba(12,11,22,0.85)",
                border: `1px solid ${hovered === i ? `${f.accent}30` : "rgba(255,255,255,0.055)"}`,
                borderRadius: "2px",
                backdropFilter: "blur(12px)",
                transform: hovered === i ? "translateY(-4px)" : "translateY(0)",
                boxShadow: hovered === i ? `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px ${f.accent}15` : "none",
                cursor: "default",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center mb-5" style={{
                background: `${f.accent}12`,
                border: `1px solid ${f.accent}25`,
                borderRadius: "2px"
              }}>
                <f.icon size={20} style={{ color: f.accent }} />
              </div>

              {/* Tag */}
              <span style={{
                display: "inline-block",
                padding: "0.2rem 0.6rem",
                borderRadius: "2px",
                background: `${f.accent}10`,
                border: `1px solid ${f.accent}22`,
                color: f.accent,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.875rem"
              }}>
                {f.tag}
              </span>

              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "0.625rem", lineHeight: 1.4 }}>
                {f.title}
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", lineHeight: 1.75, color: "rgba(245,240,232,0.4)" }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
