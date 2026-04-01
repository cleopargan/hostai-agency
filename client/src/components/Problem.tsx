/* Design: Warm Operator — warm gray bg, large serif numbers, editorial pain points */
import { useEffect, useRef, useState } from "react";

const ANALYTICS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663082783554/QDcYwAv8SHis62JyYiBJro/hotel-staff-service-Q2pfA4QY7QnzGet4wsVvxZ.webp";

const pains = [
  {
    num: "01",
    title: "Staff are answering the same questions — all day, every day",
    desc: "\"What time is check-in?\" \"Do you have parking?\" \"Is breakfast included?\" Your team spends hours on questions a bot can answer in seconds.",
  },
  {
    num: "02",
    title: "Guests message at midnight. Nobody responds until morning.",
    desc: "Late-night inquiries go unanswered. Potential bookings are lost. Guests book with the competitor who replied first.",
  },
  {
    num: "03",
    title: "Hiring more staff isn't the answer — it's too expensive",
    desc: "A full-time receptionist costs $2,500–$4,000/month. A part-timer still leaves gaps. Your margins can't sustain it.",
  },
];

export default function Problem() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#EDE8E0] py-24 lg:py-32" ref={ref}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <div
            className={`relative transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src={ANALYTICS_IMG}
                alt="Hotel management analytics dashboard"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1008]/30 to-transparent"></div>
            </div>
            {/* Floating quote */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-5 shadow-lg border border-[#EDE8E0] max-w-xs">
              <p
                className="text-sm text-[#1C1008]/70 italic leading-relaxed"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}
              >
                "We were losing 3–4 bookings a week just because nobody was online to answer questions after 9 PM."
              </p>
              <p className="mt-2 text-xs font-semibold text-[#C2622D]" style={{ fontFamily: "'Sora', sans-serif" }}>
                — Boutique Hotel Owner, Lisbon
              </p>
            </div>
          </div>

          {/* Right: Pain points */}
          <div
            className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            <span className="section-label">The Problem</span>
            <h2
              className="display-heading text-4xl md:text-5xl mt-4 mb-12"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Your team is drowning in{" "}
              <span className="italic text-[#C2622D]">repetitive tasks</span>
            </h2>

            <div className="flex flex-col gap-8">
              {pains.map((p, i) => (
                <div
                  key={p.num}
                  className={`flex gap-5 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: `${300 + i * 100}ms` }}
                >
                  <span
                    className="text-4xl font-bold text-[#C2622D]/20 flex-shrink-0 leading-none mt-1"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {p.num}
                  </span>
                  <div>
                    <h3
                      className="text-lg font-semibold text-[#1C1008] mb-1.5"
                      style={{ fontFamily: "'Sora', sans-serif" }}
                    >
                      {p.title}
                    </h3>
                    <p className="text-sm text-[#1C1008]/60 leading-relaxed" style={{ fontFamily: "'Sora', sans-serif" }}>
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
