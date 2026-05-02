import { useEffect, useRef, useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from "recharts";

const data = [
  { month: "Jan", direct: 22, ota: 78 },
  { month: "Feb", direct: 25, ota: 75 },
  { month: "Mar", direct: 28, ota: 72 },
  { month: "Apr", direct: 34, ota: 66 },
  { month: "May", direct: 42, ota: 58 },
  { month: "Jun", direct: 50, ota: 50 },
  { month: "Jul", direct: 56, ota: 44 },
  { month: "Aug", direct: 62, ota: 38 },
  { month: "Sep", direct: 66, ota: 34 },
  { month: "Oct", direct: 70, ota: 30 },
  { month: "Nov", direct: 73, ota: 27 },
  { month: "Dec", direct: 76, ota: 24 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "rgba(10,9,20,0.97)", border: "1px solid rgba(201,168,76,0.2)", padding: "0.875rem 1rem", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,240,232,0.35)", marginBottom: "0.5rem" }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ display: "flex", justifyContent: "space-between", gap: "1.5rem", fontSize: "0.82rem", color: "rgba(245,240,232,0.7)", marginBottom: "0.25rem" }}>
          <span style={{ color: p.name === "direct" ? "#C9A84C" : "#f87171" }}>
            {p.name === "direct" ? "Direct" : "OTA"}
          </span>
          <strong style={{ color: p.name === "direct" ? "#C9A84C" : "#f87171" }}>{p.value}%</strong>
        </div>
      ))}
    </div>
  );
};

export default function MarketingRevenueChart() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{ background: "linear-gradient(180deg, #080810 0%, #06060e 100%)", padding: "6rem 0 7rem", borderTop: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="container">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 items-end" style={{ marginBottom: "3rem" }}>
          <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span className="section-label" style={{ display: "inline-flex", marginBottom: "1.25rem" }}>Direct Booking Growth</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.015em", color: "#F5F0E8" }}>
              The Shift from OTA{" "}
              <em style={{ fontStyle: "italic", background: "linear-gradient(90deg, #BFA06A, #E8C96A, #C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Dependency
              </em>
            </h2>
          </div>
          <div
            className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "100ms" }}
          >
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", lineHeight: 1.75, color: "rgba(245,240,232,0.42)" }}>
              This is the typical booking channel split across NightDesk clients over 12 months. Direct bookings cross the OTA line by month 6 and keep climbing.
            </p>
            {/* Legend */}
            <div style={{ display: "flex", gap: "1.5rem", marginTop: "1.25rem" }}>
              {[
                { color: "#C9A84C", label: "Direct Bookings" },
                { color: "#f87171", label: "OTA Bookings" },
              ].map(l => (
                <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ width: "24px", height: "2px", background: l.color }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "rgba(245,240,232,0.45)" }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chart */}
        <div
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "200ms", padding: "1.75rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", position: "relative" }}
        >
          {/* Start / End callouts */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
            <div>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "rgba(245,240,232,0.25)", letterSpacing: "0.06em" }}>START</span>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.1rem", fontWeight: 600, color: "rgba(248,113,113,0.6)" }}>22% Direct</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "rgba(245,240,232,0.25)", letterSpacing: "0.06em" }}>MONTH 12</span>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.1rem", fontWeight: 600, color: "#C9A84C" }}>76% Direct</div>
            </div>
          </div>

          <div style={{ height: "320px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradDirect" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#C9A84C" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradOTA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f87171" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="1 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "rgba(245,240,232,0.3)", fontFamily: "'DM Sans', sans-serif", fontSize: 11 }}
                  axisLine={false} tickLine={false}
                />
                <YAxis
                  tick={{ fill: "rgba(245,240,232,0.3)", fontFamily: "'DM Sans', sans-serif", fontSize: 11 }}
                  axisLine={false} tickLine={false}
                  tickFormatter={v => `${v}%`}
                  domain={[0, 100]}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                <ReferenceLine
                  x="Jun"
                  stroke="rgba(201,168,76,0.25)"
                  strokeDasharray="4 4"
                  label={{ value: "Crossover", fill: "rgba(201,168,76,0.5)", fontSize: 11, fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                />
                <Area
                  type="monotone" dataKey="direct"
                  stroke="#C9A84C" strokeWidth={2}
                  fill="url(#gradDirect)"
                  isAnimationActive={visible}
                  animationDuration={1800} animationBegin={0}
                />
                <Area
                  type="monotone" dataKey="ota"
                  stroke="rgba(248,113,113,0.7)" strokeWidth={1.5}
                  fill="url(#gradOTA)"
                  isAnimationActive={visible}
                  animationDuration={1800} animationBegin={300}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
