/* Design: Warm Operator — terracotta bg CTA section + espresso footer */
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", property: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12 text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-[#4A6741]/20 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="#4A6741">
            <path d="M16 3C8.82 3 3 8.82 3 16s5.82 13 13 13 13-5.82 13-13S23.18 3 16 3zm-2 18l-5-5 1.41-1.41L14 18.17l7.59-7.59L23 12l-9 9z"/>
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-[#1C1008]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Thank you!
        </h3>
        <p className="text-[#1C1008]/60 text-sm max-w-xs" style={{ fontFamily: "'Sora', sans-serif" }}>
          We'll be in touch within 24 hours to schedule your free demo.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-[#1C1008]/60 uppercase tracking-wider mb-1.5 block" style={{ fontFamily: "'Sora', sans-serif" }}>
            Your Name
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Maria Santos"
            className="w-full px-4 py-3 rounded-lg border border-[#EDE8E0] bg-[#FAF7F2] text-[#1C1008] text-sm focus:outline-none focus:ring-2 focus:ring-[#C2622D]/30 focus:border-[#C2622D] transition-all"
            style={{ fontFamily: "'Sora', sans-serif" }}
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-[#1C1008]/60 uppercase tracking-wider mb-1.5 block" style={{ fontFamily: "'Sora', sans-serif" }}>
            Email Address
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="maria@yourhotel.com"
            className="w-full px-4 py-3 rounded-lg border border-[#EDE8E0] bg-[#FAF7F2] text-[#1C1008] text-sm focus:outline-none focus:ring-2 focus:ring-[#C2622D]/30 focus:border-[#C2622D] transition-all"
            style={{ fontFamily: "'Sora', sans-serif" }}
          />
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold text-[#1C1008]/60 uppercase tracking-wider mb-1.5 block" style={{ fontFamily: "'Sora', sans-serif" }}>
          Property Name & Type
        </label>
        <input
          type="text"
          value={form.property}
          onChange={(e) => setForm({ ...form, property: e.target.value })}
          placeholder="e.g. The Alcove Boutique Hotel, Lisbon"
          className="w-full px-4 py-3 rounded-lg border border-[#EDE8E0] bg-[#FAF7F2] text-[#1C1008] text-sm focus:outline-none focus:ring-2 focus:ring-[#C2622D]/30 focus:border-[#C2622D] transition-all"
          style={{ fontFamily: "'Sora', sans-serif" }}
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-[#1C1008]/60 uppercase tracking-wider mb-1.5 block" style={{ fontFamily: "'Sora', sans-serif" }}>
          What's your biggest challenge right now?
        </label>
        <textarea
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="e.g. Staff spending too much time on repetitive questions, missing after-hours bookings..."
          className="w-full px-4 py-3 rounded-lg border border-[#EDE8E0] bg-[#FAF7F2] text-[#1C1008] text-sm focus:outline-none focus:ring-2 focus:ring-[#C2622D]/30 focus:border-[#C2622D] transition-all resize-none"
          style={{ fontFamily: "'Sora', sans-serif" }}
        />
      </div>
      <button type="submit" className="btn-primary justify-center mt-2">
        Book My Free Demo
        <ArrowRight size={16} />
      </button>
      <p className="text-xs text-center text-[#1C1008]/40" style={{ fontFamily: "'Sora', sans-serif" }}>
        No commitment required. We'll show you a live demo built for your property.
      </p>
    </form>
  );
}

export default function ContactCTA() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* CTA Section */}
      <section id="contact" className="bg-[#FAF7F2] py-24 lg:py-32" ref={ref}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div
              className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <span className="section-label">Get Started</span>
              <h2
                className="display-heading text-4xl md:text-5xl mt-4 leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Ready to give your guests a{" "}
                <span className="italic text-[#C2622D]">24/7 AI receptionist?</span>
              </h2>
              <p className="text-[#1C1008]/60 mt-5 text-base leading-relaxed" style={{ fontFamily: "'Sora', sans-serif" }}>
                Book a free 20-minute demo call. We'll show you a live AI chatbot built specifically for your type of property — no commitment, no sales pressure.
              </p>

              <div className="mt-8 flex flex-col gap-4">
                {[
                  { icon: Mail, label: "hello@hostai.co" },
                  { icon: Phone, label: "+1 (555) 000-0000" },
                  { icon: MapPin, label: "Serving clients worldwide" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#C2622D]/10 flex items-center justify-center">
                      <Icon size={16} className="text-[#C2622D]" />
                    </div>
                    <span className="text-sm text-[#1C1008]/70" style={{ fontFamily: "'Sora', sans-serif" }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Trust badges */}
              <div className="mt-10 flex flex-wrap gap-3">
                {["7-Day Setup Guarantee", "30-Day Money Back", "No Tech Skills Needed"].map((b) => (
                  <span
                    key={b}
                    className="text-xs font-medium px-3 py-1.5 rounded-full border border-[#4A6741]/30 text-[#4A6741] bg-[#4A6741]/5"
                    style={{ fontFamily: "'Sora', sans-serif" }}
                  >
                    ✓ {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div
              className={`warm-card p-8 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <h3
                className="text-xl font-semibold text-[#1C1008] mb-6"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                Book your free demo
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1C1008] py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#C2622D] flex items-center justify-center">
                <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
                  <path d="M3 14L7 10M7 10L9 12L13 7M7 10L5 8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="13" cy="5" r="2" fill="white"/>
                </svg>
              </div>
              <span
                className="text-[#FAF7F2] font-bold text-lg"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                HostAI
              </span>
            </div>

            <p className="text-[#FAF7F2]/30 text-xs text-center" style={{ fontFamily: "'Sora', sans-serif" }}>
              © {new Date().getFullYear()} HostAI. AI Receptionists for Boutique Hospitality.
            </p>

            <div className="flex gap-5">
              {["Privacy Policy", "Terms", "Contact"].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="text-xs text-[#FAF7F2]/40 hover:text-[#FAF7F2]/70 transition-colors"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
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
