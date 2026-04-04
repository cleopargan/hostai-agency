/* Design: Midnight Gold — hexagonal bg, animated gold stat counters, testimonial cards */
import { useEffect, useRef, useState } from "react";
import { Quote, Star } from "lucide-react";

const STATS_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663082783554/QDcYwAv8SHis62JyYiBJro/stats-bg-ijZiFmkdvtYsz944f3mMpV.webp";

const stats = [
  { value: 94, suffix: "%", label: "Guest Satisfaction Rate", desc: "Guests rate AI responses as helpful or very helpful" },
  { value: 24, suffix: "/7", label: "Always Available", desc: "Zero downtime — your AI never calls in sick" },
  { value: 3, suffix: "×", label: "More Inquiries Captured", desc: "Properties see 3× more captured leads after HostAI" },
  { value: 20, suffix: "+", label: "Staff Hours Saved/Month", desc: "Per property — time your team uses for real hospitality" },
];

const testimonials = [
  {
    quote: "We were losing 3–4 bookings a week just because nobody was online after 9 PM. HostAI fixed that in one week.",
    name: "Maria S.", role: "Owner, Boutique Hotel", location: "Lisbon, Portugal", initials: "MS",
  },
  {
    quote: "My front desk staff used to spend 2 hours a day answering the same questions. Now they focus on actually welcoming guests.",
    name: "James K.", role: "General Manager", location: "Edinburgh, Scotland", initials: "JK",
  },
  {
    quote: "I was skeptical about AI, but the setup was so easy and the bot sounds exactly like our brand. Guests absolutely love it.",
    name: "Priya N.", role: "Owner, Boutique Cafe", location: "Melbourne, Australia", initials: "PN",
  },
];

function useCountUp(target: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (1800 / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target]);
  return count;
}

function StatCard({ stat, active }: { stat: typeof stats[0]; active: boolean }) {
  const count = useCountUp(stat.value, active);
  return (
    <div className="text-center p-6 md:p-8">
      <div className="stat-number mb-2">{count}{stat.suffix}</div>
      <div className="text-sm font-semibold mb-1.5" style={{ color: "#F0EDE6", fontFamily: "'DM Sans', sans-serif" }}>{stat.label}</div>
      <div className="text-xs leading-relaxed" style={{ color: "rgba(240,237,230,0.38)", fontFamily: "'DM Sans', sans-serif" }}>{stat.desc}</div>
    </div>
  );
}

export default function Results() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="results" ref={ref} className="relative overflow-hidden">
      {/* Stats with bg */}
      <div className="relative py-24 md:py-28">
        <div className="absolute inset-0">
          <img src={STATS_BG} alt="" className="w-full h-full object-cover" style={{ opacity: 0.55 }} />
          <div className="absolute inset-0" style={{ background: "rgba(10,10,15,0.78)" }} />
        </div>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)" }} />

        <div className="container relative z-10">
          <div className={`text-center mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="section-label block mb-4">Real Results</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#F0EDE6" }}>
              Numbers That <span className="gold-text italic">Speak for Themselves</span>
            </h2>
          </div>

          <div className={`grid grid-cols-2 lg:grid-cols-4 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ background: "rgba(14,14,22,0.85)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "20px", backdropFilter: "blur(20px)" }}>
            {stats.map((s, i) => (
              <div key={s.label} style={{ borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <StatCard stat={s} active={visible} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 md:py-28" style={{ background: "#0D0D14" }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent)" }} />
        <div className="container">
          <div className={`text-center mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="section-label block mb-4">What Owners Say</span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#F0EDE6" }}>
              From Overwhelmed to <span className="gold-text italic">In Control</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={t.name} className={`gradient-border p-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${300 + i * 120}ms` }}>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} size={13} fill="#C9A84C" color="#C9A84C" />)}
                </div>
                <Quote size={22} style={{ color: "rgba(201,168,76,0.25)" }} className="mb-3" />
                <p className="text-base leading-relaxed mb-6 italic" style={{ color: "rgba(240,237,230,0.72)", fontFamily: "'Playfair Display', serif" }}>
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: "linear-gradient(135deg, #C9A84C, #E8C96A)", color: "#0A0A0F", fontFamily: "'DM Sans', sans-serif" }}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: "#F0EDE6", fontFamily: "'DM Sans', sans-serif" }}>{t.name}</div>
                    <div className="text-xs" style={{ color: "rgba(240,237,230,0.38)", fontFamily: "'DM Sans', sans-serif" }}>{t.role} · {t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
