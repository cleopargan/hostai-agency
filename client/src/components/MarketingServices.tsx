import { useEffect, useRef, useState } from "react";
import { Search, Target, Globe, FileText, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Search,
    tag: "Paid Search",
    title: "Google Ads",
    description: "Capture travelers actively searching for hotels in your area. We set up and manage search, display, and Google Hotel Ads campaigns — optimized for direct bookings.",
    bullets: ["Search & Display campaigns", "Google Hotel Ads integration", "Conversion tracking setup", "Weekly bid optimization"],
    color: "#4A90E2",
    bg: "rgba(74,144,226,0.06)",
    border: "rgba(74,144,226,0.15)",
    accentBorder: "rgba(74,144,226,0.6)",
    anchor: "#google-ads",
  },
  {
    icon: Target,
    tag: "Social Ads",
    title: "Facebook & Instagram Ads",
    description: "Re-engage past website visitors and reach new audiences who match your ideal guests. Retargeting, lookalike audiences, and video creative — all managed for you.",
    bullets: ["Pixel setup & retargeting", "Lookalike audience targeting", "Carousel & video ads", "Meta Advantage+ campaigns"],
    color: "#7B5EA7",
    bg: "rgba(123,94,167,0.06)",
    border: "rgba(123,94,167,0.15)",
    accentBorder: "rgba(123,94,167,0.6)",
    anchor: "#facebook-ads",
  },
  {
    icon: Globe,
    tag: "Microsoft Ads",
    title: "Bing Ads",
    description: "Underpriced, overlooked, and profitable. Bing audiences skew older, wealthier, and are often ready to book. Lower CPCs mean your budget goes further.",
    bullets: ["Microsoft Advertising campaigns", "Import & optimize from Google", "LinkedIn profile targeting", "Older, higher-income audience"],
    color: "#00B4D8",
    bg: "rgba(0,180,216,0.06)",
    border: "rgba(0,180,216,0.15)",
    accentBorder: "rgba(0,180,216,0.6)",
    anchor: "#bing-ads",
  },
  {
    icon: FileText,
    tag: "Organic Search",
    title: "SEO Landing Pages",
    description: "Rank for high-intent local searches like 'boutique hotel in [city]' or 'hotel near [landmark]'. We build, optimize, and maintain location pages that convert.",
    bullets: ["Keyword-specific landing pages", "Local SEO & Google My Business", "Schema markup & technical SEO", "Monthly content updates"],
    color: "#6EE7B7",
    bg: "rgba(110,231,183,0.06)",
    border: "rgba(110,231,183,0.15)",
    accentBorder: "rgba(110,231,183,0.6)",
    anchor: "#seo-pages",
  },
];

export default function MarketingServices() {
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
    <section id="features" ref={ref} style={{ background: "#080810", padding: "6rem 0 7rem" }}>
      <div className="absolute left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.12), transparent)" }} />

      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="section-label" style={{ display: "inline-flex", marginBottom: "1.25rem" }}>
            Our Services
          </span>

          <h2
            className={`display-heading transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              color: "#F5F0E8",
              marginBottom: "1rem",
            }}
          >
            Four Channels.{" "}
            <em style={{
              fontStyle: "italic",
              background: "linear-gradient(90deg, #BFA06A, #E8C96A, #C9A84C)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Maximum ROI.
            </em>
          </h2>

          <p
            className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{
              transitionDelay: "150ms",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "rgba(245,240,232,0.42)",
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            We manage every paid and organic channel that drives direct hotel bookings —
            so you can focus on running your property.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{
                  transitionDelay: `${150 + i * 100}ms`,
                  padding: "2rem",
                  background: s.bg,
                  border: `1px solid ${s.border}`,
                  position: "relative",
                  overflow: "hidden",
                  cursor: "default",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = s.accentBorder;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px rgba(0,0,0,0.3), inset 0 0 40px ${s.bg}`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = s.border;
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {/* Top accent line */}
                <div style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: "2px",
                  background: `linear-gradient(90deg, ${s.color}, transparent)`,
                  opacity: 0.6,
                }} />

                {/* Icon + Tag */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                  <div style={{
                    width: "2.75rem",
                    height: "2.75rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `rgba(${s.color === "#4A90E2" ? "74,144,226" : s.color === "#7B5EA7" ? "123,94,167" : s.color === "#00B4D8" ? "0,180,216" : "110,231,183"},0.1)`,
                    border: `1px solid ${s.border}`,
                  }}>
                    <Icon size={16} style={{ color: s.color }} />
                  </div>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: s.color,
                    padding: "0.25rem 0.625rem",
                    background: `rgba(${s.color === "#4A90E2" ? "74,144,226" : s.color === "#7B5EA7" ? "123,94,167" : s.color === "#00B4D8" ? "0,180,216" : "110,231,183"},0.08)`,
                    border: `1px solid ${s.border}`,
                  }}>
                    {s.tag}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "1.75rem",
                  fontWeight: 600,
                  color: "#F5F0E8",
                  marginBottom: "0.75rem",
                  lineHeight: 1.15,
                }}>
                  {s.title}
                </h3>

                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.88rem",
                  lineHeight: 1.75,
                  color: "rgba(245,240,232,0.48)",
                  marginBottom: "1.25rem",
                }}>
                  {s.description}
                </p>

                {/* Bullets */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" }}>
                  {s.bullets.map(b => (
                    <div key={b} style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                      <div style={{
                        width: "4px", height: "4px",
                        background: s.color,
                        flexShrink: 0,
                      }} />
                      <span style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.8rem",
                        color: "rgba(245,240,232,0.55)",
                      }}>
                        {b}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href="#how-it-works"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: s.color,
                    textDecoration: "none",
                    transition: "gap 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.gap = "0.625rem"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.gap = "0.375rem"}
                >
                  Learn More <ArrowRight size={11} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
