/* ============================================================
   TRUST STRIP — Obsidian & Gold Luxury v3
   Refined trust badges, platform compatibility, gold dividers
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { Shield, Award, Globe } from "lucide-react";

const trustItems = [
  { icon: Shield, label: "30-Day Money-Back Guarantee" },
  { icon: Award, label: "Built by Hospitality Insiders" },
  { icon: Globe, label: "Serving Properties in 12+ Countries" },
];

const platforms = [
  { name: "WordPress" },
  { name: "Wix" },
  { name: "Squarespace" },
  { name: "Webflow" },
  { name: "WhatsApp" },
  { name: "Instagram" },
  { name: "Booking.com" },
];

export default function TrustStrip({ id = "trust" }: { id?: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id={id} ref={ref} className="relative py-14" style={{ background: "#0C0B18" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.18), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.12), transparent)" }} />

      <div className="container relative z-10">

        {/* Trust badges */}
        <div className={`flex flex-wrap justify-center gap-5 mb-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {trustItems.map((item, i) => (
            <div
              key={item.label}
              className="flex items-center gap-2.5 px-5 py-2.5"
              style={{
                background: "rgba(201,168,76,0.04)",
                border: "1px solid rgba(201,168,76,0.14)",
                borderRadius: "2px",
                transitionDelay: `${i * 80}ms`
              }}
            >
              <item.icon size={13} style={{ color: "#C9A84C", flexShrink: 0 }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", fontWeight: 500, color: "rgba(245,240,232,0.6)", letterSpacing: "0.02em" }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8 max-w-sm mx-auto">
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,240,232,0.2)" }}>
            Compatible With
          </span>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
        </div>

        {/* Platform pills */}
        <div className={`flex flex-wrap justify-center items-center gap-2.5 transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {platforms.map((p, i) => (
            <div
              key={p.name}
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "2px",
                padding: "0.4rem 0.875rem",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 500,
                color: "rgba(245,240,232,0.38)",
                letterSpacing: "0.04em",
                transitionDelay: `${400 + i * 50}ms`
              }}
            >
              {p.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
