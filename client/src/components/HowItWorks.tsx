/* ============================================================
   HOW IT WORKS — Elite Luxury v4
   - Large numbered steps with gold timeline connector
   - Refined live demo with browser chrome
   - Premium section header with centered eyebrow
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { FileText, Cpu, Globe, BarChart2, ArrowRight } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: FileText,
    title: "We Onboard Your Property",
    desc: "You fill a simple 15-minute form: your FAQs, room types, policies, booking links. No tech skills needed. We handle everything from there.",
    time: "Day 1",
  },
  {
    num: "02",
    icon: Cpu,
    title: "We Build Your AI Concierge",
    desc: "Our team trains a custom AI exclusively on your property's information. Your bot knows your hotel better than any new hire ever could.",
    time: "Days 2–4",
  },
  {
    num: "03",
    icon: Globe,
    title: "We Install It on Your Website",
    desc: "We embed the chatbot on your site in under 30 minutes — WordPress, Wix, Squarespace, or any platform. You never touch a line of code.",
    time: "Day 5–6",
  },
  {
    num: "04",
    icon: BarChart2,
    title: "It Works. You Relax.",
    desc: "Your AI concierge answers guests 24/7. You receive a monthly report showing conversations handled, bookings captured, and hours saved.",
    time: "Day 7+",
  },
];

const demoConversations = [
  [
    { from: "guest", text: "What's your cancellation policy?" },
    { from: "ai", text: "Free cancellation up to 48 hours before check-in. After that, the first night is charged. Shall I send the full policy to your email?" },
  ],
  [
    { from: "guest", text: "Is there parking available?" },
    { from: "ai", text: "Yes — complimentary private parking is available for all guests. The entrance is on Oak Street, just past the main gate." },
  ],
  [
    { from: "guest", text: "Do you serve breakfast?" },
    { from: "ai", text: "Absolutely. Breakfast is served daily from 7–10:30 AM in our garden terrace. Continental and full English options are available." },
  ],
];

export default function HowItWorks() {
  const [visible, setVisible] = useState(false);
  const [demoIdx, setDemoIdx] = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    const convo = demoConversations[demoIdx];
    let idx = 0;
    const showNext = () => {
      if (cancelled) return;
      if (idx >= convo.length) {
        setTimeout(() => {
          if (!cancelled) { setMsgIdx(0); idx = 0; setDemoIdx((d) => (d + 1) % demoConversations.length); }
        }, 3200);
        return;
      }
      const msg = convo[idx];
      if (msg.from === "ai") {
        setIsTyping(true);
        setTimeout(() => {
          if (cancelled) return;
          setIsTyping(false);
          setMsgIdx(idx + 1);
          idx++;
          setTimeout(showNext, 1600);
        }, 1300);
      } else {
        setMsgIdx(idx + 1);
        idx++;
        setTimeout(showNext, 1100);
      }
    };
    setMsgIdx(0);
    const t = setTimeout(showNext, 700);
    return () => { cancelled = true; clearTimeout(t); };
  }, [demoIdx]);

  const currentConvo = demoConversations[demoIdx];

  return (
    <section id="how-it-works" ref={ref} className="py-24 md:py-36 relative" style={{ background: "#080810" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent)" }} />

      <div className="container">

        {/* Header */}
        <div
          className={`max-w-2xl mx-auto text-center mb-20 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2))", maxWidth: "80px" }} />
            <span className="section-label">How It Works</span>
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
            From Zero to{" "}
            <em style={{
              fontStyle: "italic",
              background: "linear-gradient(90deg, #BFA06A, #E8C96A, #C9A84C)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>AI-Powered</em>{" "}
            in 7 Days
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1rem",
            lineHeight: 1.8,
            color: "rgba(245,240,232,0.42)",
          }}>
            We handle everything. You answer a few questions about your property and we do the rest.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">

          {/* Steps */}
          <div>
            {steps.map((s, i) => (
              <div
                key={s.num}
                className={`flex gap-6 transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
                style={{ transitionDelay: `${i * 110}ms` }}
              >
                {/* Timeline */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{
                    width: "2.75rem",
                    height: "2.75rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#C9A84C",
                    border: "1px solid rgba(201,168,76,0.3)",
                    background: "rgba(201,168,76,0.06)",
                    flexShrink: 0,
                  }}>
                    {s.num}
                  </div>
                  {i < steps.length - 1 && (
                    <div style={{
                      width: "1px",
                      flex: 1,
                      minHeight: "3rem",
                      margin: "0.5rem 0",
                      background: "linear-gradient(to bottom, rgba(201,168,76,0.3), rgba(201,168,76,0.04))",
                    }} />
                  )}
                </div>

                {/* Content */}
                <div style={{ paddingBottom: i < steps.length - 1 ? "2rem" : 0 }}>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.6rem",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(201,168,76,0.5)",
                    marginBottom: "0.5rem",
                  }}>
                    {s.time}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.625rem" }}>
                    <s.icon size={13} style={{ color: "rgba(201,168,76,0.6)", flexShrink: 0 }} />
                    <h3 style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "#F5F0E8",
                      lineHeight: 1.3,
                    }}>
                      {s.title}
                    </h3>
                  </div>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.82rem",
                    lineHeight: 1.8,
                    color: "rgba(245,240,232,0.4)",
                  }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Live demo */}
          <div
            className={`transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
            style={{ transitionDelay: "400ms" }}
          >
            <div style={{
              background: "rgba(10,9,20,0.98)",
              border: "1px solid rgba(201,168,76,0.15)",
              overflow: "hidden",
              boxShadow: "0 40px 100px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,168,76,0.05)",
            }}>
              {/* Browser chrome */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1rem",
                background: "rgba(255,255,255,0.025)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}>
                <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#FF5F57" }} />
                <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#FEBC2E" }} />
                <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#28C840" }} />
                <span style={{
                  marginLeft: "0.75rem",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.68rem",
                  color: "rgba(245,240,232,0.22)",
                  letterSpacing: "0.04em",
                }}>
                  Live Demo — AI Concierge
                </span>
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.375rem" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", display: "block", animation: "pulse-ring 2s infinite" }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", color: "rgba(74,222,128,0.65)" }}>Active</span>
                </div>
              </div>

              {/* Topic tabs */}
              <div style={{ padding: "1rem 1.25rem 0", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {["Cancellation", "Parking", "Breakfast"].map((label, i) => (
                  <button
                    key={label}
                    onClick={() => { setDemoIdx(i); setMsgIdx(0); }}
                    style={{
                      padding: "0.3rem 0.875rem",
                      background: demoIdx === i ? "rgba(201,168,76,0.1)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${demoIdx === i ? "rgba(201,168,76,0.3)" : "rgba(255,255,255,0.05)"}`,
                      color: demoIdx === i ? "#C9A84C" : "rgba(245,240,232,0.3)",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.68rem",
                      letterSpacing: "0.06em",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Messages */}
              <div style={{ padding: "1.25rem", minHeight: "200px", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {currentConvo.slice(0, msgIdx).map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: msg.from === "guest" ? "flex-end" : "flex-start",
                      animation: "fadeInUp 0.3s ease",
                    }}
                  >
                    <div style={{
                      maxWidth: "82%",
                      padding: "0.625rem 0.875rem",
                      background: msg.from === "guest" ? "rgba(201,168,76,0.1)" : "rgba(255,255,255,0.05)",
                      border: msg.from === "guest" ? "1px solid rgba(201,168,76,0.18)" : "1px solid rgba(255,255,255,0.07)",
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
                      padding: "0.625rem 0.875rem",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      display: "flex",
                      gap: "4px",
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
              <div style={{ padding: "0 1.25rem 1.25rem" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  padding: "0.625rem 0.875rem",
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.78rem",
                    color: "rgba(245,240,232,0.18)",
                    flex: 1,
                  }}>
                    Ask anything about the property…
                  </span>
                  <div style={{
                    width: "28px",
                    height: "28px",
                    background: "linear-gradient(135deg, #C9A84C, #E8C96A)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <ArrowRight size={11} color="#0A0806" />
                  </div>
                </div>
              </div>
            </div>

            <p style={{
              marginTop: "1rem",
              textAlign: "center",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.75rem",
              color: "rgba(245,240,232,0.25)",
              letterSpacing: "0.02em",
            }}>
              This is exactly what your guests will experience — instantly, 24/7.
            </p>
          </div>
        </div>
      </div>

      <style>{`@keyframes fadeInUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </section>
  );
}
