/* Design: Warm Operator — dark espresso bg, large serif stats, warm accent numbers */
import { useEffect, useRef, useState } from "react";

const CAFE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663082783554/QDcYwAv8SHis62JyYiBJro/cafe-automation-MaqD9P6MxsEEeS32wj6eQr.webp";

const stats = [
  { value: "142", suffix: "", label: "Avg. conversations handled per month", sub: "per property" },
  { value: "20", suffix: "+", label: "Staff hours saved every month", sub: "per property" },
  { value: "98", suffix: "%", label: "Guest questions answered instantly", sub: "without human intervention" },
  { value: "< 7", suffix: " days", label: "Average setup time", sub: "from contract to live" },
];

const testimonials = [
  {
    quote: "Our AI handles check-in questions, parking, and breakfast inquiries around the clock. Our front desk team now focuses on actually welcoming guests instead of answering the same questions repeatedly.",
    name: "Maria S.",
    role: "Owner, Boutique Hotel — Porto",
    initials: "MS",
  },
  {
    quote: "I was skeptical about AI, but the setup was completely handled for me. Within a week we had a chatbot that knows everything about our cafe — menu, hours, events. Guests love it.",
    name: "James T.",
    role: "Co-owner, Specialty Cafe — London",
    initials: "JT",
  },
  {
    quote: "We used to miss 3–4 booking inquiries every week because they came in after hours. Since installing the AI, we capture every single one. It paid for itself in the first month.",
    name: "Aiko N.",
    role: "General Manager, Boutique Resort — Bali",
    initials: "AN",
  },
];

function useCountUp(target: number, visible: boolean, duration = 1500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target, duration]);
  return count;
}

export default function Results() {
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

  const counts = [
    useCountUp(142, visible),
    useCountUp(20, visible),
    useCountUp(98, visible),
  ];

  return (
    <section id="results" className="bg-[#1C1008] py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #C2622D 0%, transparent 50%), radial-gradient(circle at 80% 20%, #4A6741 0%, transparent 40%)`
        }}
      ></div>

      <div className="container relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <span className="section-label" style={{ color: "#C2622D" }}>Real Results</span>
          <h2
            className="text-4xl md:text-5xl font-bold mt-4 text-[#FAF7F2]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Numbers that speak for themselves
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`text-center p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                className="text-5xl md:text-6xl font-bold text-[#C2622D]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {i < 3 ? counts[i] : "< 7"}{s.suffix}
              </div>
              <p className="text-[#FAF7F2]/70 text-sm mt-2 leading-snug" style={{ fontFamily: "'Sora', sans-serif" }}>
                {s.label}
              </p>
              <p className="text-[#FAF7F2]/30 text-xs mt-1" style={{ fontFamily: "'Sora', sans-serif" }}>
                {s.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${400 + i * 120}ms` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 14 14" fill="#C2622D">
                    <path d="M7 1l1.8 3.6L13 5.4l-3 2.9.7 4.1L7 10.4l-3.7 2 .7-4.1-3-2.9 4.2-.8z"/>
                  </svg>
                ))}
              </div>
              <p
                className="text-[#FAF7F2]/80 text-sm leading-relaxed italic mb-5"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}
              >
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#C2622D]/20 flex items-center justify-center">
                  <span className="text-[#C2622D] text-xs font-bold" style={{ fontFamily: "'Sora', sans-serif" }}>
                    {t.initials}
                  </span>
                </div>
                <div>
                  <p className="text-[#FAF7F2] text-sm font-semibold" style={{ fontFamily: "'Sora', sans-serif" }}>
                    {t.name}
                  </p>
                  <p className="text-[#FAF7F2]/40 text-xs" style={{ fontFamily: "'Sora', sans-serif" }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
