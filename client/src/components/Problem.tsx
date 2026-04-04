/* Design: Midnight Gold — dark section with before/after image, pain point cards */
import { useEffect, useRef, useState } from "react";
import { PhoneOff, Clock, TrendingDown, AlertCircle } from "lucide-react";

const BEFORE_AFTER_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663082783554/QDcYwAv8SHis62JyYiBJro/before-after-V8J6FWmnF9gcn9A8z3UoEP.webp";

const pains = [
  { icon: PhoneOff, title: "Missed Inquiries After Hours", desc: "60% of hotel booking inquiries happen outside business hours. Every unanswered message is a lost guest." },
  { icon: Clock, title: "Staff Overwhelmed by Repetition", desc: "Your team answers the same 20 questions every single day — check-in times, parking, breakfast, pet policy." },
  { icon: TrendingDown, title: "Guests Book Elsewhere", desc: "When guests don't get instant answers, they don't wait. They open a competitor's site and book there." },
  { icon: AlertCircle, title: "No Budget for 24/7 Staff", desc: "Hiring a night receptionist costs $2,000–$4,000/month. Most boutique properties simply can't afford it." },
];

export default function Problem() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="problem" ref={ref} className="py-24 md:py-32 relative overflow-hidden" style={{ background: "#0D0D14" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.18), transparent)" }} />

      <div className="container">
        {/* Header */}
        <div className={`text-center mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="section-label block mb-4">The Problem</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5" style={{ fontFamily: "'Playfair Display', serif", color: "#F0EDE6" }}>
            Running a Boutique Property Is{" "}
            <span className="gold-text italic">Exhausting.</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(240,237,230,0.48)", fontFamily: "'DM Sans', sans-serif" }}>
            You're managing operations, guests, staff, and marketing — all at once. Guest communication is breaking you.
          </p>
        </div>

        {/* Before/After image */}
        <div className={`mb-14 rounded-2xl overflow-hidden transition-all duration-1000 delay-200 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          style={{ border: "1px solid rgba(255,255,255,0.05)", boxShadow: "0 24px 80px rgba(0,0,0,0.5)" }}>
          <img src={BEFORE_AFTER_IMG} alt="Before and after HostAI" className="w-full object-cover" style={{ maxHeight: "400px" }} />
        </div>

        {/* Pain cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pains.map((p, i) => (
            <div key={p.title} className={`card-dark p-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${300 + i * 100}ms` }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)" }}>
                <p.icon size={18} style={{ color: "#C9A84C" }} />
              </div>
              <h3 className="text-base font-semibold mb-2" style={{ color: "#F0EDE6", fontFamily: "'DM Sans', sans-serif" }}>{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(240,237,230,0.43)", fontFamily: "'DM Sans', sans-serif" }}>{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Bridge */}
        <div className={`mt-14 text-center transition-all duration-700 delay-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="gold-line mx-auto mb-5" />
          <p className="text-xl font-semibold" style={{ color: "rgba(240,237,230,0.65)", fontFamily: "'Playfair Display', serif" }}>
            There is a better way — and it costs less than a part-time employee.
          </p>
        </div>
      </div>
    </section>
  );
}
