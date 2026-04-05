/* ============================================================
   RESULTS — Obsidian & Gold Luxury v3
   Animated stat counters, premium testimonial cards, gold accents
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { Quote, Star } from "lucide-react";

const STATS_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663082783554/QDcYwAv8SHis62JyYiBJro/hero-luxury-v2_016a6f73.jpg";
const PHOTO_MARIA = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face";
const PHOTO_JAMES = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face";

const stats = [
  { value: 94, suffix: "%", label: "Guest Satisfaction", desc: "Guests rate AI responses as helpful or very helpful" },
  { value: 24, suffix: "/7", label: "Always Available", desc: "Zero downtime — your AI never calls in sick" },
  { value: 3, suffix: "×", label: "More Leads Captured", desc: "Properties see 3× more captured leads after HostAI" },
  { value: 20, suffix: "+", label: "Staff Hours Saved", desc: "Per property per month — time for real hospitality" },
];

const testimonials = [
  {
    quote: "We were losing 3–4 bookings a week just because nobody was online after 9 PM. HostAI fixed that in one week. The ROI was immediate.",
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
    <div className="text-center p-7 md:p-9 relative group transition-all duration-300" style={{ cursor: "default" }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.025)"}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}>
      <div className="stat-number mb-2">{count}{stat.suffix}</div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "0.5rem" }}>{stat.label}</div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", lineHeight: 1.6, color: "rgba(245,240,232,0.32)" }}>{stat.desc}</div>
    </div>
  );
}

export default function Results() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="results" ref={ref} className="relative overflow-hidden">

      {/* ── Stats section ── */}
      <div className="relative py-24 md:py-28">
        <div className="absolute inset-0">
          <img src={STATS_BG} alt="" className="w-full h-full object-cover" style={{ opacity: 0.5 }} />
          <div className="absolute inset-0" style={{ background: "rgba(8,8,16,0.82)" }} />
        </div>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.22), transparent)" }} />

        <div className="container relative z-10">
          <div className={`text-center mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="gold-line" />
              <span className="section-label">Real Results</span>
              <div className="gold-line" style={{ background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 600,
              lineHeight: 1.1,
              color: "#F5F0E8"
            }}>
              Numbers That <em className="gold-text">Speak for Themselves</em>
            </h2>
          </div>

          <div
            className={`grid grid-cols-2 lg:grid-cols-4 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{
              background: "rgba(10,9,18,0.9)",
              border: "1px solid rgba(201,168,76,0.12)",
              borderRadius: "2px",
              backdropFilter: "blur(24px)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.4)"
            }}
          >
            {stats.map((s, i) => (
              <div key={s.label} style={{ borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <StatCard stat={s} active={visible} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Testimonials section ── */}
      <div className="relative py-24 md:py-28" style={{ background: "#0C0B18" }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.12), transparent)" }} />

        <div className="container relative z-10">
          <div className={`max-w-2xl mx-auto text-center mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="gold-line" />
              <span className="section-label">What Owners Say</span>
              <div className="gold-line" style={{ background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              fontWeight: 600,
              lineHeight: 1.15,
              color: "#F5F0E8",
              marginBottom: "1rem"
            }}>
              From Overwhelmed to <em className="gold-text">In Control</em>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "rgba(245,240,232,0.38)", lineHeight: 1.7 }}>
              Real feedback from boutique property owners across 12 countries
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className={`gradient-border p-7 flex flex-col transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${300 + i * 120}ms` }}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-5">
                  {[...Array(t.stars)].map((_, j) => <Star key={j} size={11} fill="#C9A84C" color="#C9A84C" />)}
                </div>

                {/* Quote mark */}
                <Quote size={20} style={{ color: "rgba(201,168,76,0.2)", marginBottom: "0.875rem" }} />

                {/* Quote text */}
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.05rem",
                  fontStyle: "italic",
                  lineHeight: 1.65,
                  color: "rgba(245,240,232,0.72)",
                  flex: 1,
                  marginBottom: "1.5rem"
                }}>
                  "{t.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                  {t.photo ? (
                    <img
                      src={t.photo}
                      alt={t.name}
                      className="w-10 h-10 object-cover flex-shrink-0"
                      style={{ borderRadius: "2px", border: "1px solid rgba(201,168,76,0.25)" }}
                    />
                  ) : (
                    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{
                      background: "linear-gradient(135deg, #B8922E, #E8C96A)",
                      borderRadius: "2px",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "#0A0806"
                    }}>
                      {(t as any).initials}
                    </div>
                  )}
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", fontWeight: 600, color: "#F5F0E8" }}>{t.name}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "rgba(245,240,232,0.35)" }}>{t.role} · {t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className={`mt-14 text-center transition-all duration-700 delay-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "rgba(245,240,232,0.3)", marginBottom: "1.25rem", letterSpacing: "0.04em" }}>
              Join 50+ boutique properties already using HostAI
            </p>
            <a href="#contact" className="btn-gold">
              Start Your 7-Day Setup
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
