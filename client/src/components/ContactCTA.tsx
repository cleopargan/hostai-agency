/* ============================================================
   CONTACT CTA + FOOTER — Obsidian & Gold Luxury v3
   Premium booking form, refined footer, gold accents
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Mail, MapPin, Calendar, CheckCircle2 } from "lucide-react";

const benefits = [
  "See your AI concierge live in 15 minutes",
  "Get a custom demo trained on your property",
  "No commitment — cancel anytime",
  "Setup guaranteed in 7 days or it's free",
];

export default function ContactCTA() {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", property: "", type: "", message: "" });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  return (
    <>
      {/* ── Contact Section ── */}
      <section id="contact" ref={ref} className="py-24 md:py-32 relative overflow-hidden" style={{ background: "#080810" }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.22), transparent)" }} />

        {/* Ambient glow */}
        <div className="absolute pointer-events-none" style={{
          top: "40%", left: "50%", transform: "translateX(-50%)",
          width: "800px", height: "500px",
          background: "radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 65%)",
          filter: "blur(80px)"
        }} />

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* ── Left — Copy ── */}
            <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="gold-line" />
                <span className="section-label">Get Started</span>
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
                Ready to Let AI Handle Your{" "}
                <em className="gold-text">Guest Communication?</em>
              </h2>

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", lineHeight: 1.75, color: "rgba(245,240,232,0.45)", marginBottom: "2.5rem" }}>
                Book a free 15-minute demo call. We'll show you exactly how your AI concierge will look and work on your property's website — no commitment required.
              </p>

              {/* Benefits */}
              <div className="flex flex-col gap-3 mb-10">
                {benefits.map((b) => (
                  <div key={b} className="flex items-center gap-3">
                    <div className="w-4 h-4 flex items-center justify-center flex-shrink-0" style={{
                      background: "rgba(110,231,183,0.1)",
                      border: "1px solid rgba(110,231,183,0.25)",
                      borderRadius: "2px"
                    }}>
                      <CheckCircle2 size={10} style={{ color: "#6EE7B7" }} />
                    </div>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "rgba(245,240,232,0.6)" }}>
                      {b}
                    </span>
                  </div>
                ))}
              </div>

              {/* Contact details */}
              <div className="flex flex-col gap-3 mb-10">
                {[
                  { icon: Mail, text: "hello@hostai.co", href: "mailto:hello@hostai.co" },
                  { icon: Calendar, text: "Book a call at calendly.com/hostai", href: "#" },
                  { icon: MapPin, text: "Available worldwide — remote setup" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{
                      background: "rgba(201,168,76,0.06)",
                      border: "1px solid rgba(201,168,76,0.14)",
                      borderRadius: "2px"
                    }}>
                      <item.icon size={13} style={{ color: "#C9A84C" }} />
                    </div>
                    {(item as any).href ? (
                      <a href={(item as any).href} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.83rem", color: "rgba(245,240,232,0.55)", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#C9A84C"}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.55)"}>
                        {item.text}
                      </a>
                    ) : (
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.83rem", color: "rgba(245,240,232,0.45)" }}>{item.text}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Trust tags */}
              <div className="flex flex-wrap gap-2">
                {["7-Day Setup", "No Tech Skills Needed", "Cancel Anytime", "30-Day Guarantee"].map((b) => (
                  <span key={b} style={{
                    padding: "0.3rem 0.75rem",
                    background: "rgba(201,168,76,0.04)",
                    border: "1px solid rgba(201,168,76,0.13)",
                    borderRadius: "2px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 500,
                    color: "rgba(245,240,232,0.45)"
                  }}>
                    ✓ {b}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Right — Form ── */}
            <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              <div style={{
                background: "rgba(12,11,22,0.98)",
                border: "1px solid rgba(201,168,76,0.18)",
                borderRadius: "2px",
                padding: "2.25rem",
                boxShadow: "0 32px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(201,168,76,0.04)"
              }}>
                {submitted ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6" style={{
                      background: "rgba(110,231,183,0.08)",
                      border: "1px solid rgba(110,231,183,0.25)",
                      borderRadius: "2px"
                    }}>
                      <CheckCircle2 size={28} style={{ color: "#6EE7B7" }} />
                    </div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.75rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "0.75rem" }}>
                      You're on the list!
                    </h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "rgba(245,240,232,0.5)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                      We'll reach out within <strong style={{ color: "#C9A84C" }}>24 hours</strong> to schedule your free demo. Check your inbox — including spam, just in case.
                    </p>
                    <div style={{
                      padding: "0.875rem 1.25rem",
                      background: "rgba(201,168,76,0.04)",
                      border: "1px solid rgba(201,168,76,0.12)",
                      borderRadius: "2px",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.8rem",
                      color: "rgba(245,240,232,0.45)"
                    }}>
                      While you wait — try the live demo chatbot in the bottom-right corner of this page 👇
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-7 pb-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <Calendar size={16} style={{ color: "#C9A84C" }} />
                      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.35rem", fontWeight: 600, color: "#F5F0E8" }}>
                        Book Your Free Demo
                      </h3>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,240,232,0.32)", marginBottom: "0.5rem" }}>
                            Your Name *
                          </label>
                          <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Maria Santos" className="form-input" />
                        </div>
                        <div>
                          <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,240,232,0.32)", marginBottom: "0.5rem" }}>
                            Email Address *
                          </label>
                          <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="maria@yourhotel.com" className="form-input" />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,240,232,0.32)", marginBottom: "0.5rem" }}>
                          Property Name & Size *
                        </label>
                        <input required value={form.property} onChange={e => setForm(f => ({ ...f, property: e.target.value }))} placeholder="The Grand Boutique Hotel — 20 rooms" className="form-input" />
                      </div>

                      <div>
                        <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,240,232,0.32)", marginBottom: "0.5rem" }}>
                          Property Type
                        </label>
                        <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className="form-input" style={{ appearance: "none" }}>
                          <option value="" style={{ background: "#0C0B18" }}>Select your property type…</option>
                          <option value="hotel" style={{ background: "#0C0B18" }}>Boutique Hotel</option>
                          <option value="bnb" style={{ background: "#0C0B18" }}>B&B / Guesthouse</option>
                          <option value="cafe" style={{ background: "#0C0B18" }}>Cafe / Restaurant</option>
                          <option value="resort" style={{ background: "#0C0B18" }}>Resort / Villa</option>
                          <option value="other" style={{ background: "#0C0B18" }}>Other Hospitality</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,240,232,0.32)", marginBottom: "0.5rem" }}>
                          Biggest Challenge (Optional)
                        </label>
                        <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="e.g. We miss too many inquiries after hours…" rows={3} className="form-input" style={{ resize: "none" }} />
                      </div>

                      <button type="submit" disabled={loading} className="btn-gold" style={{ width: "100%", padding: "1rem", marginTop: "0.5rem", opacity: loading ? 0.8 : 1 }}>
                        {loading ? (
                          <><span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" /> Sending…</>
                        ) : (
                          <>Book Free Demo Call <ArrowRight size={14} /></>
                        )}
                      </button>

                      <p style={{ textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "rgba(245,240,232,0.2)", letterSpacing: "0.04em" }}>
                        No spam. No commitment. Just a 15-minute call.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: "#050509", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="container py-14">
          <div className="grid md:grid-cols-3 gap-10 mb-10">

            {/* Brand */}
            <div>
              <div className="mb-4">
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 600, color: "#F5F0E8" }}>
                  Host<span style={{ color: "#C9A84C" }}>AI</span>
                </span>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(201,168,76,0.4)", marginTop: "2px" }}>
                  AI Concierge
                </div>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", lineHeight: 1.75, color: "rgba(245,240,232,0.28)" }}>
                AI concierges for boutique hotels, B&Bs, and cafes. Built by hospitality insiders who understand your world.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,240,232,0.22)", marginBottom: "1.25rem" }}>
                Navigation
              </h4>
              <div className="flex flex-col gap-2.5">
                {[["#problem", "The Problem"], ["#how-it-works", "How It Works"], ["#results", "Results"], ["#pricing", "Pricing"], ["#faq", "FAQ"], ["#contact", "Contact"]].map(([href, label]) => (
                  <a key={href} href={href} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "rgba(245,240,232,0.35)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.7)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.35)"}>
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,240,232,0.22)", marginBottom: "1.25rem" }}>
                Contact
              </h4>
              <div className="flex flex-col gap-3">
                <a href="mailto:hello@hostai.co" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "rgba(245,240,232,0.38)", textDecoration: "none" }}>
                  hello@hostai.co
                </a>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "rgba(245,240,232,0.3)" }}>
                  Available worldwide — remote setup
                </span>
                <a href="#contact" className="btn-gold" style={{ padding: "0.625rem 1.25rem", fontSize: "0.72rem", marginTop: "0.5rem", display: "inline-flex" }}>
                  Book Free Demo
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "rgba(245,240,232,0.2)" }}>
              © 2026 HostAI. All rights reserved.
            </span>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service"].map((l) => (
                <a key={l} href="#" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "rgba(245,240,232,0.2)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.5)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.2)"}>
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
