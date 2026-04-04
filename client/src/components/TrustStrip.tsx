/* Design: Midnight Gold — trust strip with hotel exterior image, logos, and social proof */
import { useEffect, useRef, useState } from "react";
import { Shield, Award, Globe } from "lucide-react";

const TRUST_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663082783554/QDcYwAv8SHis62JyYiBJro/trust-bg-TSwt7jk7HUnWtkGQ58xTPS.webp";

const trustItems = [
  { icon: Shield, label: "30-Day Money-Back Guarantee" },
  { icon: Award, label: "Built by Hospitality Insiders" },
  { icon: Globe, label: "Serving Properties in 12+ Countries" },
];

const platforms = [
  { name: "WordPress", icon: "🔷" },
  { name: "Wix", icon: "⬛" },
  { name: "Squarespace", icon: "◼" },
  { name: "WhatsApp", icon: "💬" },
  { name: "Instagram", icon: "📸" },
  { name: "Booking.com", icon: "🔵" },
];

export default function TrustStrip() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden py-16" style={{ background: "#0D0D14" }}>
      {/* Subtle hotel exterior background */}
      <div className="absolute inset-0">
        <img src={TRUST_BG} alt="" className="w-full h-full object-cover" style={{ opacity: 0.07 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, #0D0D14 0%, transparent 30%, transparent 70%, #0D0D14 100%)" }} />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent)" }} />

      <div className="container relative z-10">
        {/* Trust badges */}
        <div className={`flex flex-wrap justify-center gap-6 mb-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {trustItems.map((item, i) => (
            <div key={item.label} className="flex items-center gap-2.5 px-4 py-2.5 rounded-full" style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.15)", transitionDelay: `${i * 100}ms` }}>
              <item.icon size={14} style={{ color: "#C9A84C" }} />
              <span className="text-sm font-medium" style={{ color: "rgba(240,237,230,0.65)", fontFamily: "'DM Sans', sans-serif" }}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Platform compatibility */}
        <div className={`transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <p className="text-center text-xs mb-5" style={{ color: "rgba(240,237,230,0.3)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Works on every platform your property uses
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3">
            {platforms.map((p, i) => (
              <div key={p.name} className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:border-opacity-40" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", transitionDelay: `${400 + i * 60}ms` }}>
                <span style={{ fontSize: "1rem" }}>{p.icon}</span>
                <span className="text-sm font-medium" style={{ color: "rgba(240,237,230,0.45)", fontFamily: "'DM Sans', sans-serif" }}>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
