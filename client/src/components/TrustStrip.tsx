/* ============================================================
   TRUST STRIP — Elite Luxury v4
   - Animated logo marquee with platform names
   - Refined trust badges with gold borders
   - Subtle separator lines
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { Shield, Award, Globe, Zap } from "lucide-react";

const trustItems = [
  { icon: Shield, label: "30-Day Money-Back Guarantee" },
  { icon: Award, label: "Built by Hospitality Insiders" },
  { icon: Globe, label: "12+ Countries Served" },
  { icon: Zap, label: "7-Day Setup Guarantee" },
];

const platforms = [
  "WordPress", "Wix", "Squarespace", "Webflow",
  "WhatsApp", "Instagram", "Booking.com", "Airbnb",
  "Shopify", "Custom HTML", "React", "Next.js",
];

export default function TrustStrip({ id = "trust" }: { id?: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id={id} ref={ref} className="relative" style={{ background: "#0C0B18" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.1), transparent)" }} />

      {/* Trust badges row */}
      <div className="container py-10">
        <div
          className={`flex flex-wrap justify-center gap-4 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          {trustItems.map((item, i) => (
            <div
              key={item.label}
              className="flex items-center gap-2.5 px-5 py-2.5"
              style={{
                background: "rgba(201,168,76,0.03)",
                border: "1px solid rgba(201,168,76,0.12)",
                transitionDelay: `${i * 70}ms`,
              }}
            >
              <item.icon size={12} style={{ color: "#C9A84C", flexShrink: 0 }} />
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 500,
                color: "rgba(245,240,232,0.55)",
                letterSpacing: "0.02em",
                whiteSpace: "nowrap",
              }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="container py-6">
          <div className="flex items-center gap-5">
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(245,240,232,0.18)",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}>
              Works on
            </span>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <div className="marquee-track">
                {[...platforms, ...platforms].map((p, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: 500,
                      color: "rgba(245,240,232,0.22)",
                      letterSpacing: "0.06em",
                      paddingRight: "3rem",
                      whiteSpace: "nowrap",
                      transition: "color 0.2s",
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
