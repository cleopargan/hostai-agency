/* ============================================================
   CONTACT CTA + FOOTER — Elite Luxury v5
   - Calendly-first CTA (primary conversion path)
   - Simplified fallback email form (name + email only)
   - Refined footer with brand, nav, and contact
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Mail, MapPin, Calendar, CheckCircle2, ExternalLink } from "lucide-react";
import { trpc } from "@/lib/trpc";

const CONTACT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663082783554/QDcYwAv8SHis62JyYiBJro/contact-atmosphere-v3-EFNm8aFiK7Li4RzrYmukPR.webp";
const CONTACT_BG_FALLBACK = "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80";

const benefits = [
  "See your AI concierge live in 15 minutes",
  "Custom demo trained on your property",
  "No commitment — cancel anytime",
  "Setup guaranteed in 7 days or it's free",
];

const WEB3FORMS_KEY = "eda10f46-c87b-499a-b2ce-d653ae7ce76e";

export default function ContactCTA() {
  const [visible, setVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "" });
  const submitLead = trpc.leads.submit.useMutation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = {
        access_key: WEB3FORMS_KEY,
        subject: `New Demo Interest from ${form.name} — NightDesk Website`,
        from_name: "NightDesk Website",
        name: form.name,
        email: form.email,
        message: "Requested demo via contact form fallback.",
        botcheck: "",
      };
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        // Also persist to NightDesk database
        submitLead.mutate({
          name: form.name,
          email: form.email,
          source: "email_form",
        });
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please email us at hello@nightdesk.agency");
      }
    } catch {
      setError("Network error. Please email us at hello@nightdesk.agency");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Contact Section */}
      <section id="contact" ref={ref} className="relative overflow-hidden" style={{ background: "#080810" }}>

        {/* Background atmosphere image */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={CONTACT_BG}
            alt="Boutique hotel atmosphere — NightDesk contact section background"
            className="w-full h-full object-cover"
            onError={e => { (e.target as HTMLImageElement).src = CONTACT_BG_FALLBACK; }}
            style={{ opacity: 0.18 }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,8,16,0.6) 0%, rgba(8,8,16,0.85) 100%)" }} />
        </div>

        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.22), transparent)" }} />

        {/* Ambient glow */}
        <div className="absolute pointer-events-none" style={{
          top: "40%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "500px",
          background: "radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 65%)",
          filter: "blur(80px)",
        }} />

        <div className="container relative z-10 py-24 md:py-36">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left — Copy */}
            <div
              className={`transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
            >
              <span className="section-label" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>Get Started</span>

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
                Ready to Let AI Handle Your{" "}
                <em style={{
                  fontStyle: "italic",
                  background: "linear-gradient(90deg, #BFA06A, #E8C96A, #C9A84C)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>Guest Communication?</em>
              </h2>

              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                lineHeight: 1.8,
                color: "rgba(245,240,232,0.42)",
                marginBottom: "2.5rem",
              }}>
                Book a free 15-minute demo call. We'll show you exactly how your AI concierge will look and work on your property's website — no commitment required.
              </p>

              {/* Benefits */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2.5rem" }}>
                {benefits.map((b) => (
                  <div key={b} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{
                      width: "1rem",
                      height: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      background: "rgba(110,231,183,0.08)",
                      border: "1px solid rgba(110,231,183,0.22)",
                    }}>
                      <CheckCircle2 size={9} style={{ color: "#6EE7B7" }} />
                    </div>
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.85rem",
                      color: "rgba(245,240,232,0.58)",
                    }}>
                      {b}
                    </span>
                  </div>
                ))}
              </div>

              {/* Contact details */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  { icon: Mail, text: "hello@nightdesk.agency", href: "mailto:hello@nightdesk.agency" },
                  { icon: MapPin, text: "Available worldwide — remote setup" },
                ].map((item) => (
                  <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{
                      width: "2rem",
                      height: "2rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      background: "rgba(201,168,76,0.06)",
                      border: "1px solid rgba(201,168,76,0.14)",
                    }}>
                      <item.icon size={12} style={{ color: "#C9A84C" }} />
                    </div>
                    {(item as any).href ? (
                      <a
                        href={(item as any).href}
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.83rem",
                          color: "rgba(245,240,232,0.52)",
                          textDecoration: "none",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#C9A84C"}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.52)"}
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.83rem", color: "rgba(245,240,232,0.42)" }}>
                        {item.text}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Calendly CTA (primary) + email fallback */}
            <div
              className={`transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
              style={{ transitionDelay: "200ms" }}
            >
              <div style={{
                background: "rgba(10,9,20,0.98)",
                border: "1px solid rgba(201,168,76,0.18)",
                padding: "2.5rem",
                boxShadow: "0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.04)",
              }}>
                {/* Header */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1.75rem",
                  paddingBottom: "1.25rem",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}>
                  <Calendar size={15} style={{ color: "#C9A84C" }} />
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "1.4rem",
                    fontWeight: 600,
                    color: "#F5F0E8",
                  }}>
                    Book Your Free Demo
                  </h3>
                </div>

                {/* Primary CTA — Calendly */}
                <a
                  href="https://calendly.com/hello-nightdesk/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    padding: "1.1rem",
                    fontSize: "0.88rem",
                    marginBottom: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Calendar size={15} />
                  Choose a Time on Calendly
                  <ExternalLink size={12} style={{ opacity: 0.6 }} />
                </a>

                {/* What to expect */}
                <div style={{
                  padding: "1rem 1.25rem",
                  background: "rgba(201,168,76,0.03)",
                  border: "1px solid rgba(201,168,76,0.1)",
                  marginBottom: "1.75rem",
                }}>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.75rem",
                    color: "rgba(245,240,232,0.38)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}>
                    <strong style={{ color: "rgba(245,240,232,0.55)" }}>What happens on the call:</strong> We build a live demo of your AI concierge in real time, answer your questions, and give you a clear quote. No sales pressure.
                  </p>
                </div>

                {/* Divider */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}>
                  <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.62rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(245,240,232,0.2)",
                  }}>
                    Or leave your email
                  </span>
                  <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
                </div>

                {/* Fallback — email only */}
                {submitted ? (
                  <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                    <div style={{
                      width: "3rem",
                      height: "3rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1rem",
                      background: "rgba(110,231,183,0.08)",
                      border: "1px solid rgba(110,231,183,0.22)",
                    }}>
                      <CheckCircle2 size={22} style={{ color: "#6EE7B7" }} />
                    </div>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.85rem",
                      color: "rgba(245,240,232,0.5)",
                      lineHeight: 1.7,
                    }}>
                      Got it — we'll reach out within <strong style={{ color: "#C9A84C" }}>24 hours</strong> to schedule your demo.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                    {!showForm ? (
                      <button
                        type="button"
                        onClick={() => setShowForm(true)}
                        style={{
                          background: "transparent",
                          border: "1px solid rgba(255,255,255,0.08)",
                          padding: "0.75rem 1rem",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.78rem",
                          color: "rgba(245,240,232,0.35)",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          textAlign: "center",
                          width: "100%",
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.2)";
                          (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.55)";
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                          (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.35)";
                        }}
                      >
                        Prefer email? Leave your details →
                      </button>
                    ) : (
                      <>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div>
                            <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)", marginBottom: "0.4rem" }}>
                              Name *
                            </label>
                            <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" className="form-input" />
                          </div>
                          <div>
                            <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)", marginBottom: "0.4rem" }}>
                              Email *
                            </label>
                            <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@yourhotel.com" className="form-input" />
                          </div>
                        </div>
                        <button
                          type="submit"
                          disabled={loading}
                          style={{
                            background: "rgba(201,168,76,0.08)",
                            border: "1px solid rgba(201,168,76,0.22)",
                            padding: "0.75rem 1rem",
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            color: "#C9A84C",
                            cursor: loading ? "not-allowed" : "pointer",
                            opacity: loading ? 0.7 : 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem",
                            transition: "all 0.2s",
                          }}
                        >
                          {loading ? "Sending…" : (<>Send my details <ArrowRight size={13} /></>)}
                        </button>
                        {error && (
                          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "#f87171", textAlign: "center" }}>
                            {error}
                          </p>
                        )}
                      </>
                    )}
                  </form>
                )}

                <p style={{
                  textAlign: "center",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.65rem",
                  color: "rgba(245,240,232,0.18)",
                  letterSpacing: "0.04em",
                  marginTop: "1.25rem",
                }}>
                  No spam. No commitment. Just a 15-minute call.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#040408", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="container py-16">
          <div className="grid md:grid-cols-4 gap-10 mb-12">

            {/* Brand */}
            <div className="md:col-span-2">
              <div style={{ marginBottom: "1rem" }}>
                <span style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "1.6rem",
                  fontWeight: 600,
                  color: "#F5F0E8",
                  letterSpacing: "-0.01em",
                }}>Night<span style={{ color: "#C9A84C" }}>Desk</span></span>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.55rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(201,168,76,0.35)",
                  marginTop: "2px",
                }}>
                  AI Concierge for Hospitality
                </div>
              </div>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.82rem",
                lineHeight: 1.78,
                color: "rgba(245,240,232,0.25)",
                maxWidth: "300px",
              }}>
                AI concierges for boutique hotels, B&Bs, and cafes. Built by hospitality insiders who understand your world.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.58rem",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(245,240,232,0.2)",
                marginBottom: "1.25rem",
              }}>
                Navigation
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {[["#problem", "The Problem"], ["#how-it-works", "How It Works"], ["#results", "Results"], ["#pricing", "Pricing"], ["#faq", "FAQ"], ["#contact", "Contact"]].map(([href, label]) => (
                  <a
                    key={href}
                    href={href}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.82rem",
                      color: "rgba(245,240,232,0.3)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.65)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.3)"}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.58rem",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(245,240,232,0.2)",
                marginBottom: "1.25rem",
              }}>
                Contact
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <a
                  href="mailto:hello@nightdesk.agency"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.82rem",
                    color: "rgba(245,240,232,0.35)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#C9A84C"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.35)"}
                >
                  hello@nightdesk.agency
                </a>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "rgba(245,240,232,0.25)" }}>
                  Available worldwide
                </span>
                <a
                  href="https://calendly.com/hello-nightdesk/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                  style={{ padding: "0.625rem 1.25rem", fontSize: "0.72rem", marginTop: "0.5rem", display: "inline-flex" }}
                >
                  Book Free Demo
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            paddingTop: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
            className="sm:flex-row sm:items-center sm:justify-between"
          >
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.7rem",
              color: "rgba(245,240,232,0.18)",
            }}>
              © 2026 NightDesk — Operated by Cleopargan LLC. All rights reserved.
            </span>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <a
                href="/privacy"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.7rem",
                  color: "rgba(245,240,232,0.18)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.45)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.18)"}
              >
                Privacy Policy
              </a>
              <a
                href="mailto:hello@nightdesk.agency"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.7rem",
                  color: "rgba(245,240,232,0.18)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.45)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.18)"}
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
