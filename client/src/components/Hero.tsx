/* Design: Warm Operator — asymmetric split hero, dark text on cream left, full-bleed image right */
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663082783554/QDcYwAv8SHis62JyYiBJro/hero-hotel-lobby-8fbbN5x4e8J5GdWkQMTWYz.webp";

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const benefits = [
    "No technical skills required",
    "Setup in under 7 days",
    "Works 24/7 — even when you're asleep",
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#FAF7F2]" ref={ref}>
      {/* Left content column */}
      <div className="relative z-10 w-full lg:w-[52%] px-6 md:px-12 lg:px-16 xl:px-20 pt-28 pb-20 lg:pt-32 lg:pb-24">
        
        {/* Label */}
        <div
          className={`transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <span className="section-label flex items-center gap-2">
            <span className="inline-block w-6 h-px bg-[#C2622D]"></span>
            AI-Powered Hospitality Automation
          </span>
        </div>

        {/* Headline */}
        <div
          className={`mt-5 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <h1
            className="display-heading text-5xl md:text-6xl xl:text-7xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Your Hotel's{" "}
            <span className="italic text-[#C2622D]">AI Receptionist</span>
            <br />
            Works While You Sleep
          </h1>
        </div>

        {/* Sub-headline */}
        <div
          className={`mt-6 transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <p
            className="text-lg text-[#1C1008]/65 leading-relaxed max-w-lg"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            We build and install AI chatbots for boutique hotels and cafes that answer guest questions, capture bookings, and handle customer service — 24 hours a day, for less than the cost of one shift.
          </p>
        </div>

        {/* Benefits list */}
        <div
          className={`mt-8 flex flex-col gap-3 transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          {benefits.map((b) => (
            <div key={b} className="flex items-center gap-2.5">
              <CheckCircle size={16} className="text-[#4A6741] flex-shrink-0" />
              <span className="text-sm text-[#1C1008]/75" style={{ fontFamily: "'Sora', sans-serif" }}>
                {b}
              </span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div
          className={`mt-10 flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <a href="#contact" className="btn-primary">
            Book a Free Demo
            <ArrowRight size={16} />
          </a>
          <a href="#how-it-works" className="btn-outline">
            See How It Works
          </a>
        </div>

        {/* Social proof strip */}
        <div
          className={`mt-12 pt-8 border-t border-[#EDE8E0] transition-all duration-700 delay-600 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <p className="text-xs text-[#1C1008]/40 uppercase tracking-widest mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
            Trusted by hospitality businesses
          </p>
          <div className="flex items-center gap-6 flex-wrap">
            {[
              { stat: "24/7", label: "Always On" },
              { stat: "< 7 days", label: "Setup Time" },
              { stat: "80%+", label: "Profit Margin" },
              { stat: "$249/mo", label: "Starting From" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col">
                <span
                  className="text-2xl font-bold text-[#C2622D]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {item.stat}
                </span>
                <span className="text-xs text-[#1C1008]/50" style={{ fontFamily: "'Sora', sans-serif" }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right image panel */}
      <div
        className={`hidden lg:block absolute right-0 top-0 bottom-0 w-[50%] transition-all duration-1000 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
      >
        <div className="relative h-full">
          <img
            src={HERO_IMG}
            alt="Boutique hotel lobby with AI chatbot on reception desk"
            className="w-full h-full object-cover"
          />
          {/* Gradient fade on left edge */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#FAF7F2] to-transparent"></div>
          {/* Overlay for depth */}
          <div className="absolute inset-0 bg-[#1C1008]/10"></div>

          {/* Floating stat card */}
          <div
            className={`absolute bottom-12 left-8 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-[#EDE8E0] transition-all duration-700 delay-800 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#4A6741]/10 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" fill="#4A6741"/>
                  <path d="M10.5 6H9v5l4.25 2.55.75-1.23-3.5-2.07V6z" fill="#4A6741"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-[#1C1008]/50 font-medium" style={{ fontFamily: "'Sora', sans-serif" }}>
                  Staff hours saved/month
                </p>
                <p
                  className="text-xl font-bold text-[#1C1008]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  20+ Hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
