/* Design: Midnight Gold — premium CTA section with booking form, trust signals, and rich footer */
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Mail, Phone, MapPin, Calendar, CheckCircle2 } from "lucide-react";

const LOGO_ICON = "https://d2xsxph8kpxj0f.cloudfront.net/310519663082783554/QDcYwAv8SHis62JyYiBJro/logo-icon-DhGVZGxUWwJnv5mPBaqd3u.webp";

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
      <section id="contact" ref={ref} className="py-24 md:py-32 relative overflow-hidden" style={{ background: "#0A0A0F" }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)", filter: "blur(50px)" }} />

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left */}
            <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              <span className="section-label block mb-4">Get Started</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "#F0EDE6" }}>
                Ready to Let AI Handle Your{" "}
                <span className="gold-text italic">Guest Communication?</span>
              </h2>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: "rgba(240,237,230,0.5)", fontFamily: "'DM Sans', sans-serif" }}>
                Book a free 15-minute demo call. We'll show you exactly how your AI concierge will look and work on your property's website — no commitment required.
              </p>

              {/* Benefits list */}
              <div className="flex flex-col gap-3 mb-10">
                {benefits.map((b) => (
                  <div key={b} className="flex items-center gap-3">
                    <CheckCircle2 size={16} style={{ color: "#48BB78", flexShrink: 0 }} />
                    <span className="text-sm" style={{ color: "rgba(240,237,230,0.65)", fontFamily: "'DM Sans', sans-serif" }}>{b}</span>
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
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)" }}>
                      <item.icon size={15} style={{ color: "#C9A84C" }} />
                    </div>
                    {(item as any).href ? (
                      <a href={(item as any).href} className="text-sm transition-colors duration-200 hover:opacity-80" style={{ color: "rgba(240,237,230,0.6)", fontFamily: "'DM Sans', sans-serif" }}>{item.text}</a>
                    ) : (
                      <span className="text-sm" style={{ color: "rgba(240,237,230,0.55)", fontFamily: "'DM Sans', sans-serif" }}>{item.text}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2">
                {["7-Day Setup", "No Tech Skills Needed", "Cancel Anytime", "30-Day Guarantee"].map((b) => (
                  <span key={b} className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.15)", color: "rgba(240,237,230,0.55)", fontFamily: "'DM Sans', sans-serif" }}>
                    ✓ {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              <div className="rounded-2xl p-8" style={{ background: "#16161F", border: "1px solid rgba(201,168,76,0.18)", boxShadow: "0 32px 80px rgba(0,0,0,0.45)" }}>
                {submitted ? (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(72,187,120,0.1)", border: "1px solid rgba(72,187,120,0.3)" }}>
                      <CheckCircle2 size={36} style={{ color: "#48BB78" }} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3" style={{ color: "#F0EDE6", fontFamily: "'Playfair Display', serif" }}>
                      You're on the list!
                    </h3>
                    <p className="text-base mb-6" style={{ color: "rgba(240,237,230,0.55)", fontFamily: "'DM Sans', sans-serif" }}>
                      We'll reach out within <strong style={{ color: "#C9A84C" }}>24 hours</strong> to schedule your free demo. Check your inbox — including spam, just in case.
                    </p>
                    <div className="px-4 py-3 rounded-xl text-sm" style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.15)", color: "rgba(240,237,230,0.5)", fontFamily: "'DM Sans', sans-serif" }}>
                      While you wait — try the live demo chatbot in the bottom-right corner of this page 👇
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-6 pb-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <Calendar size={20} style={{ color: "#C9A84C" }} />
                      <h3 className="text-xl font-bold" style={{ color: "#F0EDE6", fontFamily: "'Playfair Display', serif" }}>Book Your Free Demo</h3>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold mb-1.5" style={{ color: "rgba(240,237,230,0.4)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em" }}>YOUR NAME *</label>
                          <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Maria Santos" className="form-input w-full" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-1.5" style={{ color: "rgba(240,237,230,0.4)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em" }}>EMAIL ADDRESS *</label>
                          <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="maria@yourhotel.com" className="form-input w-full" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: "rgba(240,237,230,0.4)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em" }}>PROPERTY NAME & TYPE *</label>
                        <input required value={form.property} onChange={e => setForm(f => ({ ...f, property: e.target.value }))} placeholder="The Grand Boutique Hotel — 20 rooms" className="form-input w-full" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: "rgba(240,237,230,0.4)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em" }}>PROPERTY TYPE</label>
                        <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className="form-input w-full" style={{ appearance: "none" }}>
                          <option value="" style={{ background: "#16161F" }}>Select your property type...</option>
                          <option value="hotel" style={{ background: "#16161F" }}>Boutique Hotel</option>
                          <option value="bnb" style={{ background: "#16161F" }}>B&B / Guesthouse</option>
                          <option value="cafe" style={{ background: "#16161F" }}>Cafe / Restaurant</option>
                          <option value="resort" style={{ background: "#16161F" }}>Resort / Villa</option>
                          <option value="other" style={{ background: "#16161F" }}>Other Hospitality</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: "rgba(240,237,230,0.4)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em" }}>BIGGEST CHALLENGE (OPTIONAL)</label>
                        <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="e.g. We miss too many inquiries after hours..." rows={3} className="form-input w-full resize-none" />
                      </div>
                      <button type="submit" disabled={loading} className="btn-gold w-full py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 mt-2" style={{ opacity: loading ? 0.8 : 1 }}>
                        {loading ? (
                          <><span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" /> Sending...</>
                        ) : (
                          <>Book Free Demo Call <ArrowRight size={15} /></>
                        )}
                      </button>
                      <p className="text-center text-xs" style={{ color: "rgba(240,237,230,0.25)", fontFamily: "'DM Sans', sans-serif" }}>No spam. No commitment. Just a 15-minute call.</p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#070709", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container py-14">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <img src={LOGO_ICON} alt="HostAI" className="w-8 h-8 rounded-lg" />
                <span className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#F0EDE6" }}>
                  Host<span style={{ color: "#C9A84C" }}>AI</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(240,237,230,0.35)", fontFamily: "'DM Sans', sans-serif" }}>
                AI concierges for boutique hotels, B&Bs, and cafes. Built by hospitality insiders who understand your world.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-xs font-bold mb-4" style={{ color: "rgba(240,237,230,0.3)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em", textTransform: "uppercase" }}>Navigation</h4>
              <div className="flex flex-col gap-2.5">
                {[["#problem", "The Problem"], ["#how-it-works", "How It Works"], ["#results", "Results"], ["#pricing", "Pricing"], ["#faq", "FAQ"], ["#contact", "Contact"]].map(([href, label]) => (
                  <a key={href} href={href} className="text-sm transition-opacity hover:opacity-70" style={{ color: "rgba(240,237,230,0.4)", fontFamily: "'DM Sans', sans-serif" }}>{label}</a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-bold mb-4" style={{ color: "rgba(240,237,230,0.3)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em", textTransform: "uppercase" }}>Contact</h4>
              <div className="flex flex-col gap-2.5">
                <a href="mailto:hello@hostai.co" className="text-sm transition-opacity hover:opacity-70" style={{ color: "rgba(240,237,230,0.4)", fontFamily: "'DM Sans', sans-serif" }}>hello@hostai.co</a>
                <span className="text-sm" style={{ color: "rgba(240,237,230,0.4)", fontFamily: "'DM Sans', sans-serif" }}>Available worldwide</span>
                <div className="flex items-center gap-2 mt-2">
                  <div className="pulse-dot" style={{ width: 6, height: 6 }} />
                  <span className="text-xs" style={{ color: "rgba(74,222,128,0.7)", fontFamily: "'DM Sans', sans-serif" }}>Currently accepting new clients</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <p className="text-xs" style={{ color: "rgba(240,237,230,0.2)", fontFamily: "'DM Sans', sans-serif" }}>© {new Date().getFullYear()} HostAI. All rights reserved.</p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service"].map((item) => (
                <a key={item} href="#" className="text-xs transition-opacity hover:opacity-70" style={{ color: "rgba(240,237,230,0.2)", fontFamily: "'DM Sans', sans-serif" }}>{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
