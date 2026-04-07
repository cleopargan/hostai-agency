/* ============================================================
   FEATURES — Elite Luxury v4
   - New dark texture background (v3)
   - Refined feature cards with colored accent tags
   - Premium hover states with colored borders
   - Asymmetric large feature card at top
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { Globe, MessageSquare, TrendingUp, HeadphonesIcon, BarChart3, Smartphone } from "lucide-react";

const TEXTURE_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663082783554/QDcYwAv8SHis62JyYiBJro/features-texture-v3-EFNm8aFiK7Li4RzrYmukPR.webp";
const TEXTURE_BG_FALLBACK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663082783554/QDcYwAv8SHis62JyYiBJro/features-bg-v2_39cadb71.jpg";

const features = [
  {
    icon: MessageSquare,
    title: "Speaks Your Brand's Voice",
    desc: "Your AI is trained exclusively on your property's information — your tone, your policies, your personality. Guests will think it's your best staff member.",
    tag: "100% Custom",
    accent: "#C9A84C",
    large: true,
  },
  {
    icon: Globe,
    title: "Works on Any Platform",
    desc: "WordPress, Wix, Squarespace, Webflow, or custom HTML — installed in under 30 minutes. No developer needed.",
    tag: "Any Website",
    accent: "#7EC8E3",
  },
  {
    icon: TrendingUp,
    title: "Captures Leads Automatically",
    desc: "When a guest shows booking intent, the AI collects their name, email, and dates — and sends them directly to your inbox.",
    tag: "Auto Lead Capture",
    accent: "#6EE7B7",
  },
  {
    icon: HeadphonesIcon,
    title: "Handles Escalations Gracefully",
    desc: "When a question is too complex, the AI smoothly hands off to you via email or WhatsApp — guests always feel taken care of.",
    tag: "Smart Handoff",
    accent: "#FCA5A5",
  },
  {
    icon: BarChart3,
    title: "Monthly Performance Reports",
    desc: "Every month: top questions asked, leads captured, conversations handled. Full transparency on what your AI is doing.",
    tag: "Full Transparency",
    accent: "#C4B5FD",
  },
  {
    icon: Smartphone,
    title: "WhatsApp & Instagram Ready",
    desc: "Extend your AI to WhatsApp Business and Instagram DMs — where 60% of modern hospitality inquiries happen.",
    tag: "Multi-Channel",
    accent: "#F9A8D4",
  },
];

export default function Features() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.06 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="features" ref={ref} className="py-24 md:py-36 relative overflow-hidden" style={{ background: "#0A0914" }}>

      {/* Texture background */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={TEXTURE_BG}
          alt=""
          className="w-full h-full object-cover"
          onError={e => { (e.target as HTMLImageElement).src = TEXTURE_BG_FALLBACK; }}
          style={{ opacity: 0.3, filter: "saturate(0.6)" }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(10,9,20,0.6)" }} />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.1), transparent)" }} />

      <div className="container relative z-10">

        {/* Header */}
        <div
          className={`max-w-2xl mx-auto text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2))", maxWidth: "80px" }} />
            <span className="section-label">Why HostAI</span>
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
            Everything You Need,{" "}
            <em style={{
              fontStyle: "italic",
              background: "linear-gradient(90deg, #BFA06A, #E8C96A, #C9A84C)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Nothing You Don't</em>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1rem",
            lineHeight: 1.8,
            color: "rgba(245,240,232,0.4)",
          }}>
            Built specifically for boutique hospitality — not adapted from a generic chatbot tool.
          </p>
        </div>

        {/* Feature grid — first card is large */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`relative p-7 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                transitionDelay: `${180 + i * 80}ms`,
                background: hovered === i
                  ? "rgba(16,15,28,0.99)"
                  : "rgba(12,11,22,0.82)",
                border: `1px solid ${hovered === i ? `${f.accent}28` : "rgba(255,255,255,0.055)"}`,
                backdropFilter: "blur(16px)",
                transform: hovered === i ? "translateY(-4px)" : "translateY(0)",
                boxShadow: hovered === i
                  ? `0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px ${f.accent}12`
                  : "none",
                cursor: "default",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Top accent line on hover */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "1px",
                background: hovered === i ? `linear-gradient(90deg, ${f.accent}, transparent)` : "transparent",
                transition: "background 0.3s ease",
              }} />

              {/* Icon */}
              <div style={{
                width: "2.75rem",
                height: "2.75rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: `${f.accent}10`,
                border: `1px solid ${f.accent}22`,
                marginBottom: "1.25rem",
              }}>
                <f.icon size={18} style={{ color: f.accent }} />
              </div>

              {/* Tag */}
              <span style={{
                display: "inline-block",
                padding: "0.2rem 0.625rem",
                background: `${f.accent}0d`,
                border: `1px solid ${f.accent}20`,
                color: f.accent,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "0.875rem",
              }}>
                {f.tag}
              </span>

              <h3 style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#F5F0E8",
                marginBottom: "0.625rem",
                lineHeight: 1.4,
              }}>
                {f.title}
              </h3>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.8rem",
                lineHeight: 1.78,
                color: "rgba(245,240,232,0.38)",
              }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
