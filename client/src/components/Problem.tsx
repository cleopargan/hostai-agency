/* ============================================================
   PROBLEM — Obsidian & Gold Luxury v3
   Asymmetric layout, concierge desk image, refined pain cards
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { PhoneOff, Clock, TrendingDown, AlertCircle } from "lucide-react";

const DESK_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663082783554/QDcYwAv8SHis62JyYiBJro/concierge-desk-v2_90b37309.jpg";

const pains = [
  { icon: PhoneOff, title: "Missed Inquiries After Hours", desc: "60% of hotel booking inquiries happen outside business hours. Every unanswered message is a lost guest." },
  { icon: Clock, title: "Staff Overwhelmed by Repetition", desc: "Your team answers the same 20 questions every single day — check-in times, parking, breakfast, pet policy." },
  { icon: TrendingDown, title: "Guests Book Elsewhere", desc: "When guests don't get instant answers, they don't wait. They open a competitor's site and book there." },
  { icon: AlertCircle, title: "No Budget for 24/7 Staff", desc: "Hiring a night receptionist costs $2,000–$4,000/month. Most boutique properties simply can't afford it." },
];

export default function Problem() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="problem" ref={ref} className="py-24 md:py-32 relative overflow-hidden" style={{ background: "#0C0B18" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent)" }} />

      {/* Subtle ambient glow */}
      <div className="absolute pointer-events-none" style={{
        top: "30%", right: "-10%",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(201,168,76,0.025) 0%, transparent 65%)",
        filter: "blur(80px)"
      }} />

      <div className="container">

        {/* ── Section header ── */}
        <div className={`max-w-2xl mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="gold-line" />
            <span className="section-label">The Problem</span>
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
            Running a Boutique Property Is{" "}
            <em className="gold-text">Exhausting.</em>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", lineHeight: 1.75, color: "rgba(245,240,232,0.45)", maxWidth: "480px" }}>
            You're managing operations, guests, staff, and marketing — all at once. Guest communication is breaking you.
          </p>
        </div>

        {/* ── Asymmetric layout: image left, pain cards right ── */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">

          {/* Image column */}
          <div className={`lg:col-span-2 transition-all duration-1000 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <div className="relative">
              <img
                src={DESK_IMG}
                alt="Hotel concierge desk with AI assistant"
                className="w-full"
                style={{
                  borderRadius: "2px",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.08)",
                  objectFit: "cover",
                  aspectRatio: "4/3"
                }}
              />
              {/* Overlay quote */}
              <div className="absolute bottom-0 left-0 right-0 p-5" style={{
                background: "linear-gradient(to top, rgba(8,8,16,0.95) 0%, transparent 100%)"
              }}>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.05rem",
                  fontStyle: "italic",
                  color: "rgba(245,240,232,0.7)",
                  lineHeight: 1.5
                }}>
                  "There is a better way — and it costs less than a part-time employee."
                </p>
              </div>
            </div>
          </div>

          {/* Pain cards column */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            {pains.map((p, i) => (
              <div
                key={p.title}
                className={`card-luxury p-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${300 + i * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 flex items-center justify-center flex-shrink-0" style={{
                    background: "rgba(201,168,76,0.07)",
                    border: "1px solid rgba(201,168,76,0.15)",
                    borderRadius: "2px"
                  }}>
                    <p.icon size={16} style={{ color: "#C9A84C" }} />
                  </div>
                  <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", fontWeight: 600, color: "#F5F0E8", lineHeight: 1.3 }}>
                    {p.title}
                  </h3>
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", lineHeight: 1.7, color: "rgba(245,240,232,0.4)" }}>
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
