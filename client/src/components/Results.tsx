/* ============================================================
   RESULTS — Elite Luxury v4
   - New results background image (v3)
   - Animated stat counters with gold numbers
   - Premium testimonial cards with refined typography
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { Quote, Star } from "lucide-react";

const STATS_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663082783554/QDcYwAv8SHis62JyYiBJro/results-bg-v3-EFNm8aFiK7Li4RzrYmukPR.webp";
const STATS_BG_FALLBACK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663082783554/QDcYwAv8SHis62JyYiBJro/hero-luxury-v2_016a6f73.jpg";

const PHOTO_MARIA = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face";
const PHOTO_JAMES = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face";

const stats = [
  { value: 94, suffix: "%", label: "Guest Satisfaction", desc: "Guests rate AI responses as helpful or very helpful" },
  { value: 24, suffix: "/7", label: "Always Available", desc: "Zero downtime — your AI never calls in sick" },
  { value: 3, suffix: "×", label: "More Leads Captured", desc: "Properties see 3× more captured leads with always-on AI" },
  { value: 20, suffix: "+", label: "Staff Hours Saved", desc: "Per property per month — time for real hospitality" },
];

const testimonials = [
  {
    quote: "We were losing 3–4 bookings a week just because nobody was online after 9 PM. NightDesk fixed that in one week. The ROI was immediate.",
    name: "Maria Santos",
    role: "Owner, Boutique Hotel",
    location: "Lisbon, Portugal",
    photo: PHOTO_MARIA,
    stars: 5,
  },
  {
    quote: "My front desk staff used to spend 2 hours a day answering the same questions. Now they focus on actually welcoming guests. Incredible difference.",
    name: "James Kellerman",
    role: "General Manager",
    location: "Edinburgh, Scotland",
    photo: PHOTO_JAMES,
    stars: 5,
  },
  {
    quote: "I was skeptical about AI, but the setup was so easy and the bot sounds exactly like our brand. Our guests love it — and so do I.",
    name: "Priya Nair",
    role: "Owner, Boutique Cafe",
    location: "Melbourne, Australia",
    photo: null,
    initials: "PN",
    stars: 5,
  },
];

function useCountUp(target: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (1800 / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target]);
  return count;
}

function StatCard({ stat, active }: { stat: typeof stats[0]; active: boolean }) {
  const count = useCountUp(stat.value, active);
  return (
    <div
      className="text-center relative group"
      style={{ padding: "2.25rem 1.5rem", cursor: "default" }}
    >
      {/* Hover overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(255,255,255,0.02)" }} />
      <div style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
        fontWeight: 700,
        lineHeight: 1,
        marginBottom: "0.5rem",
        background: "linear-gradient(135deg, #BFA06A, #E8C96A, #C9A84C)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}>
        {count}{stat.suffix}
      </div>
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.82rem",
        fontWeight: 600,
        color: "#F5F0E8",
        marginBottom: "0.5rem",
      }}>
        {stat.label}
      </div>
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.72rem",
        lineHeight: 1.6,
        color: "rgba(245,240,232,0.3)",
      }}>
        {stat.desc}
      </div>
    </div>
  );
}

export default function Results() {
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
    <section id="results" ref={ref} className="relative overflow-hidden">

      {/* Stats section */}
      <div className="relative py-24 md:py-32">
        <div className="absolute inset-0">
          <img
            src={STATS_BG}
            alt=""
            className="w-full h-full object-cover"
            onError={e => { (e.target as HTMLImageElement).src = STATS_BG_FALLBACK; }}
            style={{ opacity: 0.45 }}
          />
          <div className="absolute inset-0" style={{ background: "rgba(8,8,16,0.84)" }} />
        </div>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.22), transparent)" }} />

        <div className="container relative z-10">
          <div
            className={`text-center mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2))", maxWidth: "80px" }} />
              <span className="section-label">Real Results</span>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(201,168,76,0.2), transparent)", maxWidth: "80px" }} />
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2.2rem, 4vw, 3.25rem)",
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: "-0.015em",
              color: "#F5F0E8",
            }}>
              Numbers That{" "}
              <em style={{
                fontStyle: "italic",
                background: "linear-gradient(90deg, #BFA06A, #E8C96A, #C9A84C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>Speak for Themselves</em>
            </h2>
          </div>

          <div
            className={`grid grid-cols-2 lg:grid-cols-4 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{
              transitionDelay: "200ms",
              background: "rgba(10,9,18,0.92)",
              border: "1px solid rgba(201,168,76,0.12)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.45)",
            }}
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                style={{ borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
              >
                <StatCard stat={s} active={visible} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials section */}
      <div className="relative py-24 md:py-32" style={{ background: "#0C0B18" }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.12), transparent)" }} />

        <div className="container relative z-10">
          <div
            className={`max-w-2xl mx-auto text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2))", maxWidth: "80px" }} />
              <span className="section-label">What Owners Say</span>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(201,168,76,0.2), transparent)", maxWidth: "80px" }} />
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              color: "#F5F0E8",
              marginBottom: "1rem",
            }}>
              From Overwhelmed to{" "}
              <em style={{
                fontStyle: "italic",
                background: "linear-gradient(90deg, #BFA06A, #E8C96A, #C9A84C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>In Control</em>
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.9rem",
              color: "rgba(245,240,232,0.35)",
              lineHeight: 1.75,
            }}>
              Real feedback from boutique property owners who made the switch
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className={`flex flex-col transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{
                  transitionDelay: `${300 + i * 120}ms`,
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.055)",
                  padding: "1.75rem",
                  position: "relative",
                }}
              >
                {/* Top gold accent */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: "1.75rem",
                  width: "2rem",
                  height: "2px",
                  background: "linear-gradient(90deg, #C9A84C, transparent)",
                }} />

                {/* Stars */}
                <div style={{ display: "flex", gap: "2px", marginBottom: "1.25rem" }}>
                  {[...Array(t.stars)].map((_, j) => (
                    <Star key={j} size={11} fill="#C9A84C" color="#C9A84C" />
                  ))}
                </div>

                {/* Large quote mark */}
                <Quote size={22} style={{ color: "rgba(201,168,76,0.18)", marginBottom: "0.875rem" }} />

                {/* Quote text */}
                <p style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "1.05rem",
                  fontStyle: "italic",
                  fontWeight: 500,
                  lineHeight: 1.65,
                  color: "rgba(245,240,232,0.7)",
                  flex: 1,
                  marginBottom: "1.5rem",
                }}>
                  "{t.quote}"
                </p>

                {/* Author */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  paddingTop: "1.25rem",
                  borderTop: "1px solid rgba(255,255,255,0.04)",
                }}>
                  {t.photo ? (
                    <img
                      src={t.photo}
                      alt={t.name}
                      style={{
                        width: "2.5rem",
                        height: "2.5rem",
                        objectFit: "cover",
                        flexShrink: 0,
                        border: "1px solid rgba(201,168,76,0.22)",
                      }}
                    />
                  ) : (
                    <div style={{
                      width: "2.5rem",
                      height: "2.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      background: "linear-gradient(135deg, #B8922E, #E8C96A)",
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "#0A0806",
                    }}>
                      {(t as any).initials}
                    </div>
                  )}
                  <div>
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: "#F5F0E8",
                    }}>
                      {t.name}
                    </div>
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.72rem",
                      color: "rgba(245,240,232,0.32)",
                    }}>
                      {t.role} · {t.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            className={`mt-16 text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "700ms" }}
          >
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.78rem",
              color: "rgba(245,240,232,0.28)",
              marginBottom: "1.5rem",
              letterSpacing: "0.04em",
            }}>
              Join boutique properties already using NightDesk
            </p>
            <a href="https://calendly.com/hello-nightdesk/30min" target="_blank" rel="noopener noreferrer" className="btn-gold">
              Start Your 7-Day Setup
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
