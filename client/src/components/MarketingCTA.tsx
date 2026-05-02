import { useEffect, useRef, useState } from "react";
import { ArrowRight, Mail, Calendar, MapPin, CheckCircle2 } from "lucide-react";

const CTA_BG = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80";

const benefits = [
  "Free 20-min strategy call — no sales pressure",
  "Audit of your current ad accounts & SEO",
  "Custom recommendations for your property type",
  "Results benchmarks from similar hotel clients",
];

const WEB3FORMS_KEY = "eda10f46-c87b-499a-b2ce-d653ae7ce76e";

export default function MarketingCTA() {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", property: "", spend: "", challenge: "" });
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
        subject: `New Marketing Audit Request from ${form.name} — ${form.property || "NightDesk Marketing Page"}`,
        from_name: "NightDesk Marketing Page",
        name: form.name,
        email: form.email,
        property: form.property,
        monthly_ad_spend: form.spend,
        primary_challenge: form.challenge || "Not specified.",
        botcheck: "",
      };
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
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
      <section id="contact" ref={ref} className="relative overflow-hidden" style={{ background: "#080810" }}>

        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={CTA_BG}
            alt="Luxury hotel pool at night"
            className="w-full h-full object-cover"
            style={{ opacity: 0.15 }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,8,16,0.65) 0%, rgba(8,8,16,0.88) 100%)" }} />
        </div>

        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.22), transparent)" }} />

        {/* Ambient glow */}
        <div className="absolute pointer-events-none" style={{
          top: "40%", left: "50%",
          transform: "translateX(-50%)",
          width: "800px", height: "500px",
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
                Ready to Fill More Rooms{" "}
                <em style={{
                  fontStyle: "italic",
                  background: "linear-gradient(90deg, #BFA06A, #E8C96A, #C9A84C)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>Directly?</em>
              </h2>

              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                lineHeight: 1.8,
                color: "rgba(245,240,232,0.42)",
                marginBottom: "2.5rem",
              }}>
                Book a free 20-minute marketing audit call. We'll review your current setup, identify where direct bookings are being lost, and give you a clear picture of what's possible — no commitment required.
              </p>

              {/* Benefits */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2.5rem" }}>
                {benefits.map((b) => (
                  <div key={b} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{
                      width: "1rem", height: "1rem",
                      display: "flex", alignItems: "center", justifyContent: "center",
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
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2.5rem" }}>
                {[
                  { icon: Mail, text: "hello@nightdesk.agency", href: "mailto:hello@nightdesk.agency" },
                  { icon: Calendar, text: "Book a free 20-min strategy call", href: "https://calendly.com/hello-nightdesk/30min" },
                  { icon: MapPin, text: "Available worldwide — remote setup" },
                ].map((item) => (
                  <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{
                      width: "2rem", height: "2rem",
                      display: "flex", alignItems: "center", justifyContent: "center",
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

              {/* Trust tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {["Free Audit", "No Lock-in Contract", "30-Day Results Guarantee", "Cancel Anytime"].map((b) => (
                  <span key={b} style={{
                    padding: "0.3rem 0.75rem",
                    background: "rgba(201,168,76,0.04)",
                    border: "1px solid rgba(201,168,76,0.12)",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 500,
                    color: "rgba(245,240,232,0.42)",
                  }}>
                    ✓ {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div
              className={`transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
              style={{ transitionDelay: "200ms" }}
            >
              <div style={{
                background: "rgba(10,9,20,0.98)",
                border: "1px solid rgba(201,168,76,0.18)",
                padding: "2.25rem",
                boxShadow: "0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.04)",
              }}>
                {submitted ? (
                  <div style={{ textAlign: "center", padding: "2.5rem 0" }}>
                    <div style={{
                      width: "4rem", height: "4rem",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 1.5rem",
                      background: "rgba(110,231,183,0.08)",
                      border: "1px solid rgba(110,231,183,0.22)",
                    }}>
                      <CheckCircle2 size={26} style={{ color: "#6EE7B7" }} />
                    </div>
                    <h3 style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "1.75rem",
                      fontWeight: 600,
                      color: "#F5F0E8",
                      marginBottom: "0.75rem",
                    }}>
                      Audit request received!
                    </h3>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.9rem",
                      color: "rgba(245,240,232,0.48)",
                      lineHeight: 1.75,
                      marginBottom: "1.5rem",
                    }}>
                      We'll reach out within{" "}
                      <strong style={{ color: "#C9A84C" }}>24 hours</strong>{" "}
                      to schedule your free marketing audit. Check your inbox — including spam.
                    </p>
                    <div style={{
                      padding: "0.875rem 1.25rem",
                      background: "rgba(201,168,76,0.04)",
                      border: "1px solid rgba(201,168,76,0.12)",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.8rem",
                      color: "rgba(245,240,232,0.42)",
                    }}>
                      Or book a call immediately at{" "}
                      <a href="https://calendly.com/hello-nightdesk/30min" style={{ color: "#C9A84C" }}>
                        calendly.com/hello-nightdesk
                      </a>
                    </div>
                  </div>
                ) : (
                  <>
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
                        Request Your Free Marketing Audit
                      </h3>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)", marginBottom: "0.5rem" }}>
                            Your Name *
                          </label>
                          <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Maria Santos" className="form-input" />
                        </div>
                        <div>
                          <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)", marginBottom: "0.5rem" }}>
                            Email Address *
                          </label>
                          <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="maria@yourhotel.com" className="form-input" />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)", marginBottom: "0.5rem" }}>
                          Property Name *
                        </label>
                        <input required value={form.property} onChange={e => setForm(f => ({ ...f, property: e.target.value }))} placeholder="The Grand Boutique Hotel" className="form-input" />
                      </div>

                      <div>
                        <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)", marginBottom: "0.5rem" }}>
                          Current Monthly Ad Spend
                        </label>
                        <select value={form.spend} onChange={e => setForm(f => ({ ...f, spend: e.target.value }))} className="form-input" style={{ appearance: "none" }}>
                          <option value="" style={{ background: "#0C0B18" }}>Select current spend…</option>
                          <option value="none" style={{ background: "#0C0B18" }}>Not running ads yet</option>
                          <option value="0-500" style={{ background: "#0C0B18" }}>Under $500/month</option>
                          <option value="500-2000" style={{ background: "#0C0B18" }}>$500 – $2,000/month</option>
                          <option value="2000-5000" style={{ background: "#0C0B18" }}>$2,000 – $5,000/month</option>
                          <option value="5000+" style={{ background: "#0C0B18" }}>$5,000+/month</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)", marginBottom: "0.5rem" }}>
                          Biggest Challenge (Optional)
                        </label>
                        <textarea
                          value={form.challenge}
                          onChange={e => setForm(f => ({ ...f, challenge: e.target.value }))}
                          placeholder="e.g. We rely too much on Booking.com and want more direct bookings…"
                          rows={3}
                          className="form-input"
                          style={{ resize: "none" }}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-gold"
                        style={{ width: "100%", padding: "1rem", marginTop: "0.5rem", opacity: loading ? 0.8 : 1 }}
                      >
                        {loading ? (
                          <><span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" /> Sending…</>
                        ) : (
                          <>Request Free Audit <ArrowRight size={14} /></>
                        )}
                      </button>

                      {error && (
                        <p style={{
                          textAlign: "center",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.75rem",
                          color: "#f87171",
                          padding: "0.5rem",
                          background: "rgba(248,113,113,0.06)",
                          border: "1px solid rgba(248,113,113,0.18)",
                        }}>
                          {error}
                        </p>
                      )}
                      <p style={{
                        textAlign: "center",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.7rem",
                        color: "rgba(245,240,232,0.2)",
                        letterSpacing: "0.04em",
                      }}>
                        Free audit · No commitment · Response within 24 hours
                      </p>
                    </form>
                  </>
                )}
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
                  Hotel Digital Marketing
                </div>
              </div>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.82rem",
                lineHeight: 1.78,
                color: "rgba(245,240,232,0.25)",
                maxWidth: "300px",
              }}>
                Google Ads, Facebook Ads, Bing Ads, and SEO landing pages — fully managed for hotel operators who want more direct bookings.
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
                Services
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {[["#features", "All Services"], ["#how-it-works", "Channel Deep Dive"], ["#results", "Results"], ["#pricing", "Pricing"], ["#faq", "FAQ"], ["/", "AI Concierge →"]].map(([href, label]) => (
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
                  Book Free Audit
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              paddingTop: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              borderTop: "1px solid rgba(255,255,255,0.04)",
            }}
            className="sm:flex-row sm:items-center sm:justify-between"
          >
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "rgba(245,240,232,0.18)" }}>
              © 2026 NightDesk — Operated by Cleopargan LLC. All rights reserved.
            </span>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <a
                href="/privacy"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "rgba(245,240,232,0.18)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.45)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.18)"}
              >
                Privacy Policy
              </a>
              <a
                href="mailto:hello@nightdesk.agency"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "rgba(245,240,232,0.18)", textDecoration: "none", transition: "color 0.2s" }}
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
