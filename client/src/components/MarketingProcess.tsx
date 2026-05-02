import { useEffect, useRef, useState } from "react";
import { ClipboardList, Settings, Rocket, BarChart2 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Free Marketing Audit",
    description: "We analyse your current website, ad accounts, competitor landscape, and keyword opportunities. You'll get a clear picture of where revenue is being left on the table — with no obligation to continue.",
    duration: "Week 1",
    color: "#C9A84C",
  },
  {
    number: "02",
    icon: Settings,
    title: "Strategy & Setup",
    description: "We build your campaign architecture — keyword research, audience segments, landing page recommendations, pixel installation, conversion tracking, and creative briefs. Everything is reviewed with you before launch.",
    duration: "Week 1–2",
    color: "#4A90E2",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Launch & Optimise",
    description: "Campaigns go live within 7 days of sign-off. We monitor performance daily in the first two weeks, running A/B tests on ad copy, audiences, and bid strategies to find what converts best for your property.",
    duration: "Week 2–4",
    color: "#7B5EA7",
  },
  {
    number: "04",
    icon: BarChart2,
    title: "Report & Scale",
    description: "Monthly performance reports with clear ROI breakdowns — spend, bookings, cost per booking, and ROAS. We surface what's working, cut what isn't, and scale the campaigns that drive the most direct revenue.",
    duration: "Ongoing",
    color: "#6EE7B7",
  },
];

export default function MarketingProcess() {
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
    <section
      ref={ref}
      style={{
        background: "linear-gradient(180deg, #06060e 0%, #080810 100%)",
        padding: "6rem 0 7rem",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="section-label" style={{ display: "inline-flex", marginBottom: "1.25rem" }}>
            How It Works
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
            From Audit to{" "}
            <em style={{
              fontStyle: "italic",
              background: "linear-gradient(90deg, #BFA06A, #E8C96A, #C9A84C)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Live in 7 Days
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
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            We handle the entire campaign lifecycle — from the first audit to ongoing optimisation and monthly reporting.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{
                  transitionDelay: `${i * 100}ms`,
                  padding: "1.75rem",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  position: "relative",
                  overflow: "hidden",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.2)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 60px rgba(0,0,0,0.25)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {/* Step number — large watermark */}
                <div style={{
                  position: "absolute",
                  top: "0.75rem",
                  right: "1rem",
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "4rem",
                  fontWeight: 700,
                  lineHeight: 1,
                  color: "rgba(255,255,255,0.03)",
                  userSelect: "none",
                }}>
                  {step.number}
                </div>

                {/* Icon */}
                <div style={{
                  width: "2.75rem",
                  height: "2.75rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  marginBottom: "1.25rem",
                }}>
                  <Icon size={16} style={{ color: step.color }} />
                </div>

                {/* Duration badge */}
                <div style={{
                  display: "inline-flex",
                  marginBottom: "0.875rem",
                  padding: "0.2rem 0.625rem",
                  background: "rgba(201,168,76,0.05)",
                  border: "1px solid rgba(201,168,76,0.12)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(201,168,76,0.6)",
                }}>
                  {step.duration}
                </div>

                <h3 style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  color: "#F5F0E8",
                  marginBottom: "0.75rem",
                  lineHeight: 1.2,
                }}>
                  {step.title}
                </h3>

                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8rem",
                  lineHeight: 1.72,
                  color: "rgba(245,240,232,0.42)",
                }}>
                  {step.description}
                </p>

                {/* Bottom accent line */}
                <div style={{
                  position: "absolute",
                  bottom: 0, left: 0, right: 0,
                  height: "2px",
                  background: `linear-gradient(90deg, ${step.color}50, transparent)`,
                  opacity: 0.5,
                }} />
              </div>
            );
          })}
        </div>

        {/* Center CTA */}
        <div
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "500ms", textAlign: "center", marginTop: "3.5rem" }}
        >
          <a href="#contact" className="btn-gold" style={{ padding: "0.875rem 2.25rem", fontSize: "0.8rem" }}>
            Start With a Free Audit →
          </a>
          <p style={{
            marginTop: "1rem",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.7rem",
            color: "rgba(245,240,232,0.2)",
          }}>
            No commitment. No tech skills required. Audit delivered within 48 hours.
          </p>
        </div>
      </div>
    </section>
  );
}
