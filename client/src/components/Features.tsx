/* Design: Warm Operator — cream bg, icon feature grid, 3-col layout */
import { useEffect, useRef, useState } from "react";
import { Clock, DollarSign, Globe, Shield, Zap, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "24/7 Availability",
    desc: "Your AI never sleeps, takes breaks, or calls in sick. It handles guest inquiries at 3 AM just as well as at 3 PM.",
    color: "#C2622D",
  },
  {
    icon: DollarSign,
    title: "Fraction of the Cost",
    desc: "A full-time receptionist costs $2,500+/month. Your AI starts at $249/month — and handles 10x the volume.",
    color: "#4A6741",
  },
  {
    icon: Globe,
    title: "Multi-Language Ready",
    desc: "Serve international guests in their own language. Our Professional plan supports up to 3 languages out of the box.",
    color: "#C2622D",
  },
  {
    icon: Shield,
    title: "Built by Hospitality Insiders",
    desc: "Our team has worked in hotels, airlines, and cafes. We know the exact questions guests ask — and how to answer them.",
    color: "#4A6741",
  },
  {
    icon: Zap,
    title: "Instant Responses",
    desc: "Guests get answers in under 2 seconds. No hold music, no wait times, no frustration. Just instant, accurate information.",
    color: "#C2622D",
  },
  {
    icon: TrendingUp,
    title: "Proven ROI",
    desc: "Our clients report capturing 3–6 additional bookings per month that would have been lost to unanswered after-hours inquiries.",
    color: "#4A6741",
  },
];

export default function Features() {
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
    <section className="bg-[#FAF7F2] py-24 lg:py-28 border-t border-[#EDE8E0]" ref={ref}>
      <div className="container">
        <div
          className={`text-center mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <span className="section-label">Why HostAI</span>
          <h2
            className="display-heading text-4xl md:text-5xl mt-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Everything your guests need,{" "}
            <span className="italic text-[#C2622D]">nothing you don't</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className={`warm-card p-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${f.color}12` }}
                >
                  <Icon size={20} style={{ color: f.color }} />
                </div>
                <h3
                  className="text-base font-semibold text-[#1C1008] mb-2"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm text-[#1C1008]/60 leading-relaxed" style={{ fontFamily: "'Sora', sans-serif" }}>
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
