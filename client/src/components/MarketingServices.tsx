import { useEffect, useRef, useState } from "react";
import { Search, Globe, Sparkles, MessageCircle, BarChart2, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Search,
    tag: "Demand Capture",
    title: "Google & Bing Ads",
    description: "Capture high-intent travellers at the exact moment they search for a hotel in your market. We manage paid search across Google and Bing to drive more direct bookings with lower wasted spend.",
    bullets: ["Google Ads & Bing campaigns", "Hotel Ads & property promotion", "Keyword strategy & bid control", "Weekly optimisation & reporting"],
    color: "#4A90E2",
    bg: "rgba(74,144,226,0.06)",
    border: "rgba(74,144,226,0.15)",
    accentBorder: "rgba(74,144,226,0.6)",
    anchor: "#google-bing-ads",
  },
  {
    icon: Globe,
    tag: "Organic Search",
    title: "SEO & Global Search",
    description: "Build an evergreen search foundation that compounds over time. We create location pages, strengthen technical SEO, and manage your visibility across Google My Business and local search.",
    bullets: ["Location-specific landing pages", "Schema markup & technical SEO", "Google My Business management", "Quarterly content and ranking reviews"],
    color: "#6EE7B7",
    bg: "rgba(110,231,183,0.06)",
    border: "rgba(110,231,183,0.15)",
    accentBorder: "rgba(110,231,183,0.6)",
    anchor: "#seo-global-search",
  },
  {
    icon: Sparkles,
    tag: "Conversion Layer",
    title: "Direct Booking AI",
    description: "Turn more of your paid and organic traffic into direct bookings with AI-powered conversion tools that engage visitors before they leave for an OTA.",
    bullets: ["AI chat assistant on-site", "Rate comparison & booking nudges", "Exit-intent recovery flows", "Conversion reporting & testing"],
    color: "#7B5EA7",
    bg: "rgba(123,94,167,0.06)",
    border: "rgba(123,94,167,0.15)",
    accentBorder: "rgba(123,94,167,0.6)",
    anchor: "#direct-booking-ai",
  },
  {
    icon: MessageCircle,
    tag: "Guest Experience",
    title: "Digital Concierge",
    description: "Automate the guest journey from booking confirmation to post-stay review generation so you increase ADR, capture more 5-star reviews, and drive repeat stays.",
    bullets: ["Pre-arrival & in-stay messaging", "Upsell automations", "Review collection & follow-up", "WhatsApp, SMS & email workflows"],
    color: "#00B4D8",
    bg: "rgba(0,180,216,0.06)",
    border: "rgba(0,180,216,0.15)",
    accentBorder: "rgba(0,180,216,0.6)",
    anchor: "#digital-concierge",
  },
  {
    icon: BarChart2,
    tag: "Executive Visibility",
    title: "CEO Command Center",
    description: "Give owners a single live view of marketing performance, direct booking economics, SEO progress, and guest revenue signals — without chasing spreadsheets.",
    bullets: ["Unified reporting dashboard", "SEO, ads & booking metrics in one view", "Direct-vs-OTA revenue insights", "Weekly and monthly growth reviews"],
    color: "#C9A84C",
    bg: "rgba(201,168,76,0.06)",
    border: "rgba(201,168,76,0.18)",
    accentBorder: "rgba(201,168,76,0.6)",
    anchor: "#ceo-command-center",
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
            Five Growth Engines.{" "}
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
            We build and manage the full hotel growth engine — from SEO and paid search to AI conversion, guest communications, and executive reporting.
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
