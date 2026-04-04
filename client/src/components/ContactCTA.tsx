/* Design: Midnight Gold — dark gold CTA section with contact form and premium footer */
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

export default function ContactCTA() {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", property: "", message: "" });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <>
      <section id="contact" ref={ref} className="py-24 md:py-32 relative" style={{ background: "#0A0A0F" }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)", filter: "blur(40px)" }} />

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              <span className="section-label block mb-4">Get Started</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "#F0EDE6" }}>
                Ready to Let AI Handle Your <span className="gold-text italic">Guest Communication?</span>
              </h2>
              <p className="text-lg mb-10 leading-relaxed" style={{ color: "rgba(240,237,230,0.5)", fontFamily: "'DM Sans', sans-serif" }}>
                Book a free 15-minute demo call. We'll show you exactly how your AI concierge will look and work on your property's website — no commitment required.
              </p>

              <div className="flex flex-col gap-4 mb-10">
                {[
                  { icon: Mail, text: "hello@hostai.co" },
                  { icon: Phone, text: "+1 (555) 000-0000" },
                  { icon: MapPin, text: "Available worldwide — remote setup" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)" }}>
                      <item.icon size={15} style={{ color: "#C9A84C" }} />
                    </div>
                    <span className="text-sm" style={{ color: "rgba(240,237,230,0.55)", fontFamily: "'DM Sans', sans-serif" }}>{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {["7-Day Setup", "No Tech Skills Needed", "Cancel Anytime", "30-Day Guarantee"].map((b) => (
                  <span key={b} className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.15)", color: "rgba(240,237,230,0.55)", fontFamily: "'DM Sans', sans-serif" }}>
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              <div className="rounded-2xl p-8" style={{ background: "#16161F", border: "1px solid rgba(201,168,76,0.15)", boxShadow: "0 24px 80px rgba(0,0,0,0.4)" }}>
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 text-2xl" style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)" }}>✓</div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: "#F0EDE6", fontFamily: "'Playfair Display', serif" }}>We'll be in touch within 24 hours!</h3>
                    <p className="text-sm" style={{ color: "rgba(240,237,230,0.48)", fontFamily: "'DM Sans', sans-serif" }}>Thank you for your interest. We're looking forward to showing you what HostAI can do for your property.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold mb-6" style={{ color: "#F0EDE6", fontFamily: "'Playfair Display', serif" }}>Book Your Free Demo</h3>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold mb-1.5" style={{ color: "rgba(240,237,230,0.4)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em" }}>YOUR NAME</label>
                          <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Maria Santos" className="form-input w-full" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-1.5" style={{ color: "rgba(240,237,230,0.4)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em" }}>EMAIL ADDRESS</label>
                          <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="maria@yourhotel.com" className="form-input w-full" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: "rgba(240,237,230,0.4)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em" }}>PROPERTY NAME & TYPE</label>
                        <input required value={form.property} onChange={e => setForm(f => ({ ...f, property: e.target.value }))} placeholder="The Grand Boutique Hotel — 20 rooms" className="form-input w-full" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: "rgba(240,237,230,0.4)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em" }}>BIGGEST CHALLENGE (OPTIONAL)</label>
                        <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="e.g. We miss too many inquiries after hours..." rows={3} className="form-input w-full resize-none" />
                      </div>
                      <button type="submit" className="btn-gold w-full py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 mt-2">
                        Book Free Demo Call <ArrowRight size={15} />
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

      <footer style={{ background: "#070709", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "#F0EDE6" }}>
                Host<span style={{ color: "#C9A84C" }}>AI</span>
              </div>
              <p className="text-xs" style={{ color: "rgba(240,237,230,0.28)", fontFamily: "'DM Sans', sans-serif" }}>AI Concierges for Boutique Hospitality</p>
            </div>
            <div className="flex flex-wrap gap-6 justify-center">
              {[["#problem", "The Problem"], ["#how-it-works", "How It Works"], ["#results", "Results"], ["#pricing", "Pricing"], ["#faq", "FAQ"], ["#contact", "Contact"]].map(([href, label]) => (
                <a key={href} href={href} className="text-xs hover:opacity-70 transition-opacity" style={{ color: "rgba(240,237,230,0.35)", fontFamily: "'DM Sans', sans-serif" }}>{label}</a>
              ))}
            </div>
            <p className="text-xs" style={{ color: "rgba(240,237,230,0.2)", fontFamily: "'DM Sans', sans-serif" }}>© {new Date().getFullYear()} HostAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
