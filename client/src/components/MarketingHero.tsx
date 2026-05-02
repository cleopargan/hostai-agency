import { useEffect, useState } from "react";
import { ArrowRight, TrendingUp, Target, Search, BarChart2, ChevronDown } from "lucide-react";

const HERO_BG = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1400&q=80";

const stats = [
  { value: "3.2×", label: "Average ROAS", sub: "return on ad spend" },
  { value: "−34%", label: "Cost Per Booking", sub: "vs. OTA commissions" },
  { value: "+67%", label: "Direct Bookings", sub: "within 6 months" },
  { value: "7 Days", label: "Campaign Launch", sub: "from audit to live" },
];

const dashMetrics = [
  { icon: Search, label: "Google Ads ROAS", value: "3.8×", delta: "+0.4", color: "#4A90E2", bg: "rgba(74,144,226,0.08)", border: "rgba(74,144,226,0.2)" },
  { icon: Target, label: "Facebook CPB", value: "$38", delta: "−$12", color: "#7B5EA7", bg: "rgba(123,94,167,0.08)", border: "rgba(123,94,167,0.2)" },
  { icon: BarChart2, label: "Bing CPC", value: "$0.62", delta: "−41%", color: "#00B4D8", bg: "rgba(0,180,216,0.08)", border: "rgba(0,180,216,0.2)" },
  { icon: TrendingUp, label: "SEO Sessions", value: "2,847", delta: "+23%", color: "#6EE7B7", bg: "rgba(110,231,183,0.08)", border: "rgba(110,231,183,0.2)" },
];

export default function MarketingHero() {
  const [visible, setVisible] = useState(false);
  const [animIndex, setAnimIndex] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimIndex(i => (i + 1) % dashMetrics.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#080810", minHeight: "100vh", paddingTop: "9rem", paddingBottom: "5rem" }}
    >
      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={HERO_BG}
          alt="Luxury hotel exterior — NightDesk hotel digital marketing"
          className="w-full h-full object-cover"
          style={{ opacity: 0.15 }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(8,8,16,0.95) 0%, rgba(8,8,16,0.75) 60%, rgba(8,8,16,0.9) 100%)" }} />
      </div>

      {/* Ambient glows */}
      <div className="absolute pointer-events-none" style={{
        top: "15%", left: "-5%",
        width: "700px", height: "700px",
        background: "radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 60%)",
        filter: "blur(80px)",
      }} />
      <div className="absolute pointer-events-none" style={{
        top: "30%", right: "5%",
        width: "500px", height: "500px",
        background: "radial-gradient(ellipse, rgba(74,144,226,0.06) 0%, transparent 60%)",
        filter: "blur(80px)",
      }} />

      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.18), transparent)" }} />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — Copy */}
          <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1.75rem",
              padding: "0.35rem 0.9rem",
              background: "rgba(201,168,76,0.06)",
              border: "1px solid rgba(201,168,76,0.18)",
            }}>
              <span style={{
                width: "5px", height: "5px",
                borderRadius: "50%",
                background: "#C9A84C",
                display: "block",
                animation: "pulse-ring 2s ease-in-out infinite",
              }} />
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.62rem",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(201,168,76,0.8)",
              }}>
                Hotel Digital Marketing Agency
              </span>
            </div>

            <h1 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2.6rem, 5.5vw, 4.25rem)",
              fontWeight: 600,
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              color: "#F5F0E8",
              marginBottom: "1.5rem",
            }}>
              Fill More Rooms.{" "}
              <em style={{
                fontStyle: "italic",
                background: "linear-gradient(90deg, #BFA06A, #E8C96A, #C9A84C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>Every Night.</em>
            </h1>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1.05rem",
              lineHeight: 1.78,
              color: "rgba(245,240,232,0.52)",
              marginBottom: "0.875rem",
              maxWidth: "520px",
            }}>
              Google Ads, Facebook Ads, Bing Ads, and high-converting SEO landing pages —
              fully managed for hotel operators who want more{" "}
              <strong style={{ color: "rgba(245,240,232,0.75)", fontWeight: 600 }}>direct bookings</strong>{" "}
              and fewer OTA commissions.
            </p>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.88rem",
              lineHeight: 1.65,
              color: "rgba(245,240,232,0.36)",
              marginBottom: "2.5rem",
              maxWidth: "480px",
            }}>
              Built specifically for boutique hotels, independent properties, and resort operators.
              No long-term contracts. No fluff. Just guests walking through your door.
            </p>

            {/* Social proof row */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "2.25rem",
            }}>
              <div style={{ display: "flex" }}>
                {[1,2,3,4,5].map(s => (
                  <svg key={s} width="13" height="13" viewBox="0 0 14 14" fill="#C9A84C" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.44L7 8.885l-3.09 1.625.59-3.44L2 4.635l3.455-.505z"/>
                  </svg>
                ))}
              </div>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "rgba(245,240,232,0.4)" }}>
                Trusted by <strong style={{ color: "rgba(245,240,232,0.65)" }}>40+ hotel operators</strong> worldwide
              </span>
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem", marginBottom: "2rem" }}>
              <a href="#contact" className="btn-gold" style={{ padding: "0.875rem 2rem", fontSize: "0.8rem" }}>
                Get Free Marketing Audit <ArrowRight size={14} />
              </a>
              <a href="#features" className="btn-ghost" style={{ padding: "0.875rem 1.75rem", fontSize: "0.8rem" }}>
                See Our Services
              </a>
            </div>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.7rem",
              color: "rgba(245,240,232,0.22)",
              letterSpacing: "0.04em",
            }}>
              Free audit · No commitment · Results in 30 days or we work for free
            </p>
          </div>

          {/* Right — Campaign dashboard mockup */}
          <div
            className={`transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <div style={{
              background: "rgba(10,9,20,0.98)",
              border: "1px solid rgba(201,168,76,0.18)",
              boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.04)",
              overflow: "hidden",
            }}>
              {/* Dashboard header */}
              <div style={{
                padding: "1rem 1.25rem",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                background: "rgba(201,168,76,0.03)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                  <div style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: "#4ade80",
                    animation: "pulse-ring 2s ease-in-out infinite",
                  }} />
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(201,168,76,0.7)",
                  }}>
                    Live Campaign Dashboard
                  </span>
                </div>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.62rem",
                  color: "rgba(245,240,232,0.22)",
                }}>
                  This month
                </span>
              </div>

              {/* Metric cards */}
              <div style={{ padding: "1.25rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {dashMetrics.map((m, i) => {
                  const Icon = m.icon;
                  const isActive = i === animIndex;
                  return (
                    <div
                      key={m.label}
                      style={{
                        padding: "1rem",
                        background: isActive ? m.bg : "rgba(255,255,255,0.02)",
                        border: `1px solid ${isActive ? m.border : "rgba(255,255,255,0.05)"}`,
                        transition: "all 0.5s ease",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {isActive && (
                        <div style={{
                          position: "absolute",
                          top: 0, left: 0, right: 0,
                          height: "2px",
                          background: `linear-gradient(90deg, transparent, ${m.color}, transparent)`,
                        }} />
                      )}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.625rem" }}>
                        <Icon size={13} style={{ color: isActive ? m.color : "rgba(245,240,232,0.25)" }} />
                        <span style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.62rem",
                          fontWeight: 600,
                          color: isActive ? "#6EE7B7" : "rgba(110,231,183,0.35)",
                          background: isActive ? "rgba(110,231,183,0.08)" : "transparent",
                          border: isActive ? "1px solid rgba(110,231,183,0.18)" : "1px solid transparent",
                          padding: "0.1rem 0.4rem",
                        }}>
                          {m.delta}
                        </span>
                      </div>
                      <div style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "1.75rem",
                        fontWeight: 600,
                        color: isActive ? "#F5F0E8" : "rgba(245,240,232,0.45)",
                        lineHeight: 1,
                        marginBottom: "0.3rem",
                        transition: "color 0.5s ease",
                      }}>
                        {m.value}
                      </div>
                      <div style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.65rem",
                        color: "rgba(245,240,232,0.3)",
                        letterSpacing: "0.04em",
                      }}>
                        {m.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mini chart area */}
              <div style={{
                margin: "0 1.25rem",
                padding: "1rem",
                background: "rgba(255,255,255,0.015)",
                border: "1px solid rgba(255,255,255,0.04)",
                marginBottom: "1.25rem",
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.875rem",
                }}>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.65rem",
                    color: "rgba(245,240,232,0.35)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}>
                    Direct bookings this month
                  </span>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "#C9A84C",
                  }}>
                    47 bookings
                  </span>
                </div>
                {/* Sparkline bars */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "40px" }}>
                  {[28, 35, 42, 31, 55, 48, 38, 62, 71, 58, 66, 75, 82, 79].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: `${h}%`,
                        background: i === 13
                          ? "linear-gradient(180deg, #E8C96A, #C9A84C)"
                          : "rgba(201,168,76,0.18)",
                        transition: "height 0.5s ease",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Footer bar */}
              <div style={{
                padding: "0.875rem 1.25rem",
                borderTop: "1px solid rgba(255,255,255,0.04)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.65rem",
                  color: "rgba(245,240,232,0.22)",
                }}>
                  OTA commission saved: <strong style={{ color: "#6EE7B7" }}>$3,840</strong> this month
                </span>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  padding: "0.25rem 0.625rem",
                  background: "rgba(201,168,76,0.06)",
                  border: "1px solid rgba(201,168,76,0.14)",
                }}>
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4ade80", display: "block" }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "rgba(245,240,232,0.4)", letterSpacing: "0.06em" }}>
                    All systems live
                  </span>
                </div>
              </div>
            </div>

            {/* Floating trust badge */}
            <div
              className="hidden lg:flex"
              style={{
                marginTop: "1rem",
                padding: "0.75rem 1.25rem",
                background: "rgba(10,9,20,0.9)",
                border: "1px solid rgba(201,168,76,0.12)",
                alignItems: "center",
                gap: "1rem",
                animation: "float 6s ease-in-out infinite",
              }}
            >
              <div style={{
                width: "2rem", height: "2rem",
                background: "rgba(110,231,183,0.08)",
                border: "1px solid rgba(110,231,183,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M13 3L6 10 3 7" stroke="#6EE7B7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "2px" }}>
                  Results in 30 days
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", color: "rgba(245,240,232,0.35)" }}>
                  Or your first month is free
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{
            transitionDelay: "400ms",
            marginTop: "4.5rem",
            paddingTop: "2.5rem",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.5rem",
          }}
          className={`grid sm:grid-cols-4 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              style={{
                textAlign: "center",
                padding: "1.25rem",
                borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}
            >
              <div style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontWeight: 600,
                background: "linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1,
                marginBottom: "0.375rem",
              }}>
                {s.value}
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "rgba(245,240,232,0.65)", marginBottom: "0.2rem" }}>
                {s.label}
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", color: "rgba(245,240,232,0.28)", letterSpacing: "0.04em" }}>
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2" style={{ transform: "translateX(-50%)", animation: "float 3s ease-in-out infinite" }}>
        <ChevronDown size={18} style={{ color: "rgba(201,168,76,0.4)" }} />
      </div>
    </section>
  );
}
