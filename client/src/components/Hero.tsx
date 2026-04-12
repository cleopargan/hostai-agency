/* ============================================================
   HERO — Cinematic Luxury v4
   - New cinematic hotel lobby background (v3 image)
   - Asymmetric split layout: left text, right live chat
   - Staggered entrance animations
   - Floating stat cards with float animation
   - Bottom stats bar
   ============================================================ */
import { useEffect, useState } from "react";
import { ArrowRight, Star, ChevronDown } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663082783554/QDcYwAv8SHis62JyYiBJro/hero-cinematic-v3-EFNm8aFiK7Li4RzrYmukPR.webp";

const chatMessages = [
  { from: "guest", text: "Hi! Do you have rooms available next weekend?" },
  { from: "ai", text: "Good evening! We have our Deluxe Suite (€185/night) and Garden Room (€145/night) available. Both include breakfast. Shall I check exact dates?" },
  { from: "guest", text: "Yes please! Also, is parking included?" },
  { from: "ai", text: "Absolutely — complimentary private parking is included with both rooms. Would you like me to hold a reservation for you?" },
];

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let idx = 0;
    let cancelled = false;
    const showNext = () => {
      if (cancelled) return;
      if (idx >= chatMessages.length) {
        setTimeout(() => {
          if (!cancelled) { setVisibleMessages(0); idx = 0; setTimeout(showNext, 1200); }
        }, 5000);
        return;
      }
      const msg = chatMessages[idx];
      if (msg.from === "ai") {
        setIsTyping(true);
        setTimeout(() => {
          if (cancelled) return;
          setIsTyping(false);
          setVisibleMessages(idx + 1);
          idx++;
          setTimeout(showNext, 1800);
        }, 1500);
      } else {
        setVisibleMessages(idx + 1);
        idx++;
        setTimeout(showNext, idx === 1 ? 1400 : 1000);
      }
    };
    const t = setTimeout(showNext, 1600);
    return () => { cancelled = true; clearTimeout(t); };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#080810" }}>

      {/* ── Cinematic background ── */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Luxury boutique hotel lobby"
          className="w-full h-full object-cover"
          style={{ opacity: 0.28, objectPosition: "center 35%", filter: "saturate(0.9) contrast(1.05)" }}
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(110deg, rgba(8,8,16,0.98) 0%, rgba(8,8,16,0.85) 40%, rgba(8,8,16,0.6) 70%, rgba(8,8,16,0.75) 100%)"
        }} />
        <div className="absolute bottom-0 left-0 right-0 h-64" style={{ background: "linear-gradient(to bottom, transparent, #080810)" }} />
        <div className="absolute top-0 left-0 right-0 h-40" style={{ background: "linear-gradient(to bottom, #080810 0%, transparent 100%)" }} />
      </div>

      {/* ── Ambient glows ── */}
      <div className="absolute pointer-events-none" style={{
        top: "15%", left: "3%",
        width: "700px", height: "700px",
        background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 65%)",
        filter: "blur(80px)",
        animation: "breathe 10s ease-in-out infinite",
      }} />
      <div className="absolute pointer-events-none" style={{
        bottom: "15%", right: "5%",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 65%)",
        filter: "blur(60px)",
      }} />

      <div className="container relative z-10 pt-36 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── LEFT — Copy ── */}
          <div>
            {/* Eyebrow */}
            <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ marginBottom: "1.75rem" }}>
              <span className="section-label">Built by Hospitality Insiders</span>
            </div>

            {/* Headline */}
            <h1
              className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2.75rem, 5.5vw, 4.75rem)",
                fontWeight: 600,
                lineHeight: 1.04,
                letterSpacing: "-0.025em",
                color: "#F5F0E8",
                marginBottom: "1.75rem",
                transitionDelay: "100ms",
              }}
            >
              Your Guests Ask<br />
              Questions at{" "}
              <em style={{
                fontStyle: "italic",
                background: "linear-gradient(90deg, #BFA06A 0%, #E8C96A 35%, #F5D97A 55%, #C9A84C 80%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 6s linear infinite",
              }}>2am.</em>
              <br />
              <span style={{ color: "rgba(245,240,232,0.45)", fontWeight: 400 }}>
                We Have Answers.
              </span>
            </h1>

            {/* Subheadline */}
            <p
              className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1.05rem",
                fontWeight: 300,
                lineHeight: 1.8,
                color: "rgba(245,240,232,0.52)",
                maxWidth: "460px",
                marginBottom: "2.5rem",
                transitionDelay: "200ms",
              }}
            >
              NightDesk installs a custom AI concierge on your boutique hotel or B&B in{" "}
              <strong style={{ color: "rgba(201,168,76,0.9)", fontWeight: 600 }}>7 days</strong> — answering guest questions, reducing staff workload, and capturing bookings around the clock.
            </p>

            {/* Social proof */}
            <div
              className={`flex items-center gap-4 mb-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#C9A84C" color="#C9A84C" />)}
              </div>
              <div style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.12)" }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "rgba(245,240,232,0.35)" }}>
                Built for boutique hotels, B&Bs & independent properties
              </span>
            </div>

            {/* CTAs */}
            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "400ms" }}
            >
              <a href="#contact" className="btn-gold">
                Book Your Free Demo <ArrowRight size={14} />
              </a>
              <a href="#how-it-works" className="btn-ghost">
                See How It Works
              </a>
            </div>

            <p
              className={`mt-5 transition-all duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.72rem",
                color: "rgba(245,240,232,0.2)",
                letterSpacing: "0.05em",
                transitionDelay: "500ms",
              }}
            >
              No tech skills required &nbsp;·&nbsp; 7-day setup &nbsp;·&nbsp; Cancel anytime
            </p>
          </div>

          {/* ── RIGHT — Live chat demo ── */}
          <div
            className={`hidden lg:block transition-all duration-1000 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            style={{ position: "relative", transitionDelay: "400ms" }}
          >
            {/* Floating stat — top left */}
            <div style={{
              position: "absolute",
              top: "-2rem",
              left: "-2.5rem",
              background: "rgba(8,8,16,0.97)",
              border: "1px solid rgba(201,168,76,0.22)",
              padding: "1rem 1.25rem",
              backdropFilter: "blur(16px)",
              zIndex: 10,
              animation: "float 6s ease-in-out infinite",
              boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
            }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 700, color: "#C9A84C", lineHeight: 1 }}>89%</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", color: "rgba(245,240,232,0.35)", letterSpacing: "0.08em", marginTop: "3px", textTransform: "uppercase" }}>Inquiries automated</div>
            </div>

            {/* Floating stat — bottom right */}
            <div style={{
              position: "absolute",
              bottom: "-1.5rem",
              right: "-2rem",
              background: "rgba(8,8,16,0.97)",
              border: "1px solid rgba(201,168,76,0.22)",
              padding: "1rem 1.25rem",
              backdropFilter: "blur(16px)",
              zIndex: 10,
              animation: "float 7s ease-in-out infinite 1.5s",
              boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
            }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 700, color: "#C9A84C", lineHeight: 1 }}>2am</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", color: "rgba(245,240,232,0.35)", letterSpacing: "0.08em", marginTop: "3px", textTransform: "uppercase" }}>Still answering guests</div>
            </div>

            {/* Chat window */}
            <div style={{
              background: "rgba(10,9,20,0.95)",
              border: "1px solid rgba(201,168,76,0.15)",
              backdropFilter: "blur(24px)",
              overflow: "hidden",
              boxShadow: "0 40px 100px rgba(0,0,0,0.65), 0 0 0 1px rgba(201,168,76,0.06)",
            }}>
              {/* Header */}
              <div style={{
                padding: "1.125rem 1.375rem",
                background: "rgba(201,168,76,0.05)",
                borderBottom: "1px solid rgba(201,168,76,0.1)",
                display: "flex",
                alignItems: "center",
                gap: "0.875rem",
              }}>
                <div style={{
                  width: "38px",
                  height: "38px",
                  background: "linear-gradient(135deg, #C9A84C, #E8C96A)",
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 700, color: "#0C0B18" }}>N</span>
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "#F5F0E8" }}>NightDesk Concierge</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", display: "block", animation: "pulse-ring 2s infinite" }} />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "rgba(74,222,128,0.7)" }}>Online · Replies instantly</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div style={{ padding: "1.375rem", minHeight: "290px", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {chatMessages.slice(0, visibleMessages).map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: msg.from === "guest" ? "flex-end" : "flex-start",
                      animation: "fadeInUp 0.35s ease",
                    }}
                  >
                    <div style={{
                      maxWidth: "82%",
                      padding: "0.625rem 0.9rem",
                      background: msg.from === "guest"
                        ? "rgba(201,168,76,0.1)"
                        : "rgba(255,255,255,0.05)",
                      border: msg.from === "guest"
                        ? "1px solid rgba(201,168,76,0.18)"
                        : "1px solid rgba(255,255,255,0.07)",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.8rem",
                      lineHeight: 1.6,
                      color: msg.from === "guest" ? "rgba(245,240,232,0.88)" : "rgba(245,240,232,0.72)",
                    }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div style={{ display: "flex", justifyContent: "flex-start", animation: "fadeInUp 0.3s ease" }}>
                    <div style={{
                      padding: "0.75rem 1rem",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      display: "flex",
                      gap: "5px",
                      alignItems: "center",
                    }}>
                      {[0, 1, 2].map(i => (
                        <span key={i} style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: "#C9A84C",
                          display: "block",
                          animation: "typing-bounce 1.2s ease-in-out infinite",
                          animationDelay: `${i * 0.15}s`,
                        }} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div style={{
                padding: "0.875rem 1.375rem",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                background: "rgba(255,255,255,0.02)",
              }}>
                <div style={{
                  flex: 1,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  color: "rgba(245,240,232,0.18)",
                  padding: "0.5rem 0.75rem",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}>
                  Ask anything about your stay...
                </div>
                <div style={{
                  width: "34px",
                  height: "34px",
                  background: "linear-gradient(135deg, #C9A84C, #E8C96A)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <ArrowRight size={13} color="#0C0B18" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom stats bar ── */}
        <div
          className={`hidden lg:grid transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{
            marginTop: "5rem",
            paddingTop: "2.5rem",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2rem",
            transitionDelay: "600ms",
          }}
        >
          {[
            { number: "89%", label: "Guest inquiries automated" },
            { number: "20+", label: "Staff hours saved monthly" },
            { number: "7 days", label: "Setup guarantee" },
            { number: "24/7", label: "Always-on guest support" },
          ].map((stat, i) => (
            <div key={stat.number} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "2.5rem",
                fontWeight: 700,
                color: "#C9A84C",
                lineHeight: 1,
                marginBottom: "0.5rem",
              }}>
                {stat.number}
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem",
                color: "rgba(245,240,232,0.3)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <div className="flex justify-center mt-16">
          <a
            href="#trust"
            className="flex flex-col items-center gap-2"
            style={{ color: "rgba(201,168,76,0.35)", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "rgba(201,168,76,0.7)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(201,168,76,0.35)"}
          >
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>Scroll</span>
            <ChevronDown size={13} className="animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
