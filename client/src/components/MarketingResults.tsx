import { useEffect, useRef, useState } from "react";
import { TrendingUp, DollarSign, Users, Star } from "lucide-react";

const RESULTS_BG = "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80";

const bigStats = [
  { icon: TrendingUp, value: "3.2×", label: "Average ROAS", sub: "Return on ad spend across all channels", color: "#C9A84C" },
  { icon: DollarSign, value: "−40%", label: "OTA Fees Saved", sub: "Avg. reduction in commission within 6 months", color: "#6EE7B7" },
  { icon: Users, value: "+67%", label: "Direct Bookings", sub: "Increase vs. before working with us", color: "#7B5EA7" },
  { icon: Star, value: "40+", label: "Hotels Managed", sub: "Boutique properties, B&Bs, and resorts worldwide", color: "#4A90E2" },
];

const testimonials = [
  {
    quote: "We were paying Booking.com 18% commission on every reservation. NightDesk's Google Ads campaigns now drive 60% of our bookings directly. The math was obvious once we saw the numbers.",
    name: "Isabella M.",
    role: "Owner, Boutique Hotel",
    location: "Porto, Portugal",
    result: "62% direct booking rate",
    resultColor: "#6EE7B7",
  },
  {
    quote: "We'd tried running Facebook ads ourselves and wasted £2,000 with nothing to show for it. In the first month with NightDesk we got 11 direct bookings. The targeting and creative were completely different.",
    name: "James R.",
    role: "General Manager",
    location: "Edinburgh, Scotland",
    result: "11 bookings in month 1",
    resultColor: "#C9A84C",
  },
  {
    quote: "The SEO landing pages surprised me most. I didn't expect organic results so quickly. By month 4 we were ranking on page 1 for three high-value keywords. That's revenue we didn't have to pay for.",
    name: "Francesca D.",
    role: "Property Director",
    location: "Tuscany, Italy",
    result: "Page 1 rankings in 4 months",
    resultColor: "#4A90E2",
  },
];

export default function MarketingResults() {
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
    <section id="results" ref={ref} className="relative overflow-hidden" style={{ background: "#080810", padding: "6rem 0 7rem" }}>

      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={RESULTS_BG}
          alt="Hotel lobby atmosphere"
          className="w-full h-full object-cover"
          style={{ opacity: 0.1 }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #080810 0%, rgba(8,8,16,0.7) 50%, #080810 100%)" }} />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.14), transparent)" }} />

      {/* Ambient glow */}
      <div className="absolute pointer-events-none" style={{
        top: "30%", left: "50%",
        transform: "translateX(-50%)",
        width: "900px", height: "500px",
        background: "radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 65%)",
        filter: "blur(80px)",
      }} />

      <div className="container relative z-10">

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="section-label" style={{ display: "inline-flex", marginBottom: "1.25rem" }}>
            Real Results
          </span>
          <h2
            className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
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
            What Hotel Operators Say{" "}
            <em style={{
              fontStyle: "italic",
              background: "linear-gradient(90deg, #BFA06A, #E8C96A, #C9A84C)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              After 6 Months
            </em>
          </h2>
          <p
            className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{
              transitionDelay: "100ms",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.95rem",
              lineHeight: 1.75,
              color: "rgba(245,240,232,0.38)",
              maxWidth: "520px",
              margin: "0 auto",
            }}
          >
            Across all our hotel clients, the pattern is consistent: fewer OTA fees, more direct revenue, more control.
          </p>
        </div>

        {/* Big stats row */}
        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-4 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{
            transitionDelay: "150ms",
            gap: "1px",
            background: "rgba(255,255,255,0.05)",
            marginBottom: "4rem",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {bigStats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                style={{
                  padding: "2rem 1.75rem",
                  background: "#080810",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(10,9,20,1)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "#080810";
                }}
              >
                <div style={{
                  width: "2.25rem", height: "2.25rem",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 1rem",
                  background: `rgba(255,255,255,0.03)`,
                  border: `1px solid rgba(255,255,255,0.06)`,
                }}>
                  <Icon size={14} style={{ color: s.color }} />
                </div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(2rem, 4vw, 2.75rem)",
                  fontWeight: 600,
                  color: s.color,
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "#F5F0E8",
                  marginBottom: "0.4rem",
                }}>
                  {s.label}
                </div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.68rem",
                  color: "rgba(245,240,232,0.28)",
                  lineHeight: 1.5,
                }}>
                  {s.sub}
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonials */}
        <div
          className={`grid md:grid-cols-3 gap-5 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "250ms" }}
        >
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              style={{
                padding: "1.75rem",
                background: "rgba(255,255,255,0.015)",
                border: "1px solid rgba(255,255,255,0.06)",
                position: "relative",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.18)";
                (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.02)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.015)";
              }}
            >
              {/* Stars */}
              <div style={{ display: "flex", gap: "2px", marginBottom: "1rem" }}>
                {[1,2,3,4,5].map(s => (
                  <svg key={s} width="11" height="11" viewBox="0 0 14 14" fill="#C9A84C" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.44L7 8.885l-3.09 1.625.59-3.44L2 4.635l3.455-.505z"/>
                  </svg>
                ))}
              </div>

              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.84rem",
                lineHeight: 1.78,
                color: "rgba(245,240,232,0.52)",
                fontStyle: "italic",
                marginBottom: "1.5rem",
              }}>
                "{t.quote}"
              </p>

              {/* Result badge */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                padding: "0.3rem 0.75rem",
                background: `rgba(${t.resultColor === "#6EE7B7" ? "110,231,183" : t.resultColor === "#C9A84C" ? "201,168,76" : "74,144,226"},0.06)`,
                border: `1px solid rgba(${t.resultColor === "#6EE7B7" ? "110,231,183" : t.resultColor === "#C9A84C" ? "201,168,76" : "74,144,226"},0.18)`,
                marginBottom: "1.25rem",
              }}>
                <TrendingUp size={10} style={{ color: t.resultColor }} />
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  color: t.resultColor,
                }}>
                  {t.result}
                </span>
              </div>

              {/* Attribution */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1rem" }}>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "rgba(245,240,232,0.65)",
                  marginBottom: "0.2rem",
                }}>
                  {t.name}
                </div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.68rem",
                  color: "rgba(245,240,232,0.3)",
                }}>
                  {t.role} · {t.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
