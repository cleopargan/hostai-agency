/* ============================================================
   PROBLEM — Elite Luxury v4
   - New concierge desk image (v3)
   - Dramatic asymmetric layout
   - Pain cards with refined hover states
   - Large pull quote overlay on image
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { PhoneOff, Clock, TrendingDown, DollarSign } from "lucide-react";

const DESK_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663082783554/QDcYwAv8SHis62JyYiBJro/concierge-desk-v3-EFNm8aFiK7Li4RzrYmukPR.webp";
const DESK_IMG_FALLBACK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663082783554/QDcYwAv8SHis62JyYiBJro/concierge-desk-v2_90b37309.jpg";

const pains = [
  {
    icon: PhoneOff,
    title: "Missed Inquiries After Hours",
    desc: "60% of hotel booking inquiries happen outside business hours. Every unanswered message is a lost guest — and a booking that went to your competitor.",
    stat: "60%",
    statLabel: "of inquiries after hours",
  },
  {
    icon: Clock,
    title: "Staff Overwhelmed by Repetition",
    desc: "Your team answers the same 20 questions every single day — check-in times, parking, breakfast, pet policy. That is 2–3 hours of skilled time wasted daily.",
    stat: "2–3h",
    statLabel: "wasted daily on repeats",
  },
  {
    icon: TrendingDown,
    title: "Guests Book Elsewhere",
    desc: "When guests don't get instant answers, they don't wait. They open a competitor's site and book there. Silence costs you real revenue.",
    stat: "73%",
    statLabel: "leave without booking",
  },
  {
    icon: DollarSign,
    title: "No Budget for 24/7 Staff",
    desc: "Hiring a night receptionist costs $2,000–$4,000/month. Most boutique properties simply cannot afford it — but now they don't have to.",
    stat: "$3k",
    statLabel: "avg. night staff cost/mo",
  },
];

export default function Problem() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
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
    <section id="problem" ref={ref} className="py-24 md:py-36 relative overflow-hidden" style={{ background: "#0C0B18" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent)" }} />

      {/* Ambient glow */}
      <div className="absolute pointer-events-none" style={{
        top: "20%", right: "-5%",
        width: "600px", height: "600px",
        background: "radial-gradient(circle, rgba(201,168,76,0.025) 0%, transparent 65%)",
        filter: "blur(80px)",
      }} />

      <div className="container">

        {/* Section header */}
        <div
          className={`max-w-xl mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <span className="section-label" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>The Problem</span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(2.2rem, 4vw, 3.25rem)",
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: "-0.015em",
            color: "#F5F0E8",
            marginBottom: "1.25rem",
            marginTop: "1rem",
          }}>
            Running a Boutique Property Is{" "}
            <em style={{
              fontStyle: "italic",
              background: "linear-gradient(90deg, #BFA06A, #E8C96A, #C9A84C)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Exhausting.</em>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1rem",
            lineHeight: 1.8,
            color: "rgba(245,240,232,0.42)",
            maxWidth: "440px",
          }}>
            You are managing operations, guests, staff, and marketing — all at once. Guest communication is the one thing breaking you.
          </p>
        </div>

        {/* Asymmetric layout */}
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">

          {/* Image column */}
          <div
            className={`lg:col-span-2 transition-all duration-1000 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            style={{ transitionDelay: "150ms" }}
          >
            <div style={{ position: "relative" }}>
              <img
                src={DESK_IMG}
                alt="Hotel concierge desk"
                onError={e => { (e.target as HTMLImageElement).src = DESK_IMG_FALLBACK; }}
                style={{
                  width: "100%",
                  objectFit: "cover",
                  aspectRatio: "4/5",
                  boxShadow: "0 40px 100px rgba(0,0,0,0.65), 0 0 0 1px rgba(201,168,76,0.08)",
                  display: "block",
                }}
              />
              {/* Gradient overlay */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(8,8,16,0.92) 0%, rgba(8,8,16,0.2) 50%, transparent 100%)",
              }} />
              {/* Pull quote */}
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "1.75rem",
              }}>
                <div style={{
                  width: "2rem",
                  height: "1px",
                  background: "rgba(201,168,76,0.5)",
                  marginBottom: "0.875rem",
                }} />
                <p style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "1.1rem",
                  fontStyle: "italic",
                  fontWeight: 500,
                  color: "rgba(245,240,232,0.75)",
                  lineHeight: 1.55,
                }}>
                  "There is a better way — and it costs less than a part-time employee."
                </p>
              </div>
            </div>
          </div>

          {/* Pain cards */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            {pains.map((p, i) => (
              <div
                key={p.title}
                className={`relative p-6 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{
                  transitionDelay: `${250 + i * 100}ms`,
                  background: hovered === i ? "rgba(16,15,28,0.98)" : "rgba(255,255,255,0.025)",
                  border: hovered === i ? "1px solid rgba(201,168,76,0.2)" : "1px solid rgba(255,255,255,0.055)",
                  transform: hovered === i ? "translateY(-3px)" : "translateY(0)",
                  boxShadow: hovered === i ? "0 16px 48px rgba(0,0,0,0.4)" : "none",
                  cursor: "default",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Top accent line */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  background: hovered === i ? "linear-gradient(90deg, #C9A84C, transparent)" : "transparent",
                  transition: "background 0.3s ease",
                }} />

                {/* Stat */}
                <div style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "rgba(201,168,76,0.35)",
                  lineHeight: 1,
                  marginBottom: "0.25rem",
                }}>
                  {p.stat}
                </div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(201,168,76,0.3)",
                  marginBottom: "1rem",
                }}>
                  {p.statLabel}
                </div>

                {/* Icon + title */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.625rem" }}>
                  <p.icon size={14} style={{ color: "rgba(201,168,76,0.6)", flexShrink: 0 }} />
                  <h3 style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "#F5F0E8",
                    lineHeight: 1.3,
                  }}>
                    {p.title}
                  </h3>
                </div>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8rem",
                  lineHeight: 1.75,
                  color: "rgba(245,240,232,0.38)",
                }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
