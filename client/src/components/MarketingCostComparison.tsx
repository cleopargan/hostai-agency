import { useEffect, useRef, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LabelList, Cell,
} from "recharts";

const costData = [
  { scenario: "Pure OTA", value: 4200, color: "#f87171" },
  { scenario: "DIY Ads", value: 3100, color: "#fb923c" },
  { scenario: "NightDesk", value: 1800, color: "#6EE7B7" },
];

const revenueData = [
  { scenario: "Pure OTA", value: 4800, color: "rgba(248,113,113,0.6)" },
  { scenario: "DIY Ads", value: 7200, color: "rgba(251,146,60,0.7)" },
  { scenario: "NightDesk", value: 14800, color: "#C9A84C" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "rgba(10,9,20,0.97)", border: "1px solid rgba(201,168,76,0.2)", padding: "0.75rem 1rem", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,240,232,0.35)", marginBottom: "0.4rem" }}>{label}</div>
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.35rem", fontWeight: 600, color: "#C9A84C" }}>
        ${payload[0].value.toLocaleString()}
      </div>
    </div>
  );
};

const labelFormatter = (v: number) => `$${(v / 1000).toFixed(1)}k`;

const CustomLabel = ({ x, y, width, value, fill }: any) => (
  <text x={x + width / 2} y={y - 8} textAnchor="middle" fill={fill ?? "rgba(245,240,232,0.45)"} fontSize={11} fontFamily="'DM Sans', sans-serif">
    {labelFormatter(value)}
  </text>
);

function MiniChart({ data, title, subtitle, labelFill }: {
  data: typeof costData; title: string; subtitle: string; labelFill?: string;
}) {
  return (
    <div>
      <div style={{ marginBottom: "1.25rem" }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)", marginBottom: "0.25rem" }}>{subtitle}</div>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.35rem", fontWeight: 600, color: "#F5F0E8" }}>{title}</div>
      </div>
      <div style={{ height: "260px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 28, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="1 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis
              dataKey="scenario"
              tick={({ x, y, payload }) => (
                <text
                  x={x} y={y + 12} textAnchor="middle"
                  fontSize={11} fontFamily="'DM Sans', sans-serif"
                  fill={payload.value === "NightDesk" ? "#C9A84C" : "rgba(245,240,232,0.3)"}
                  fontWeight={payload.value === "NightDesk" ? 600 : 400}
                >
                  {payload.value}
                </text>
              )}
              axisLine={false} tickLine={false}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
            <Bar dataKey="value" radius={[1, 1, 0, 0]}>
              {data.map((entry) => (
                <Cell key={entry.scenario} fill={entry.color} />
              ))}
              <LabelList content={<CustomLabel fill={labelFill} />} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function MarketingCostComparison() {
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
      style={{ background: "#080810", padding: "6rem 0 7rem", borderTop: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="container">
        {/* Header */}
        <div
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <span className="section-label" style={{ display: "inline-flex", marginBottom: "1.25rem" }}>Cost Comparison</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.015em", color: "#F5F0E8", marginBottom: "1rem" }}>
            The Numbers{" "}
            <em style={{ fontStyle: "italic", background: "linear-gradient(90deg, #BFA06A, #E8C96A, #C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Don't Lie.
            </em>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "rgba(245,240,232,0.38)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.75 }}>
            Monthly cost vs direct revenue generated — based on a 50-room hotel at $180 ADR, 65% occupancy.
          </p>
        </div>

        {/* Charts */}
        <div
          className={`grid md:grid-cols-2 gap-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "150ms" }}
        >
          <div style={{ padding: "2rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <MiniChart
              data={costData}
              title="Monthly Cost"
              subtitle="Lower is better"
            />
          </div>
          <div style={{ padding: "2rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <MiniChart
              data={revenueData}
              title="Direct Revenue Generated"
              subtitle="Higher is better"
              labelFill="rgba(245,240,232,0.45)"
            />
          </div>
        </div>

        {/* Summary callout */}
        <div
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "300ms", marginTop: "2.5rem", padding: "2rem 2.5rem", background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.18)", textAlign: "center" }}
        >
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", fontWeight: 600, color: "#F5F0E8", lineHeight: 1.4, marginBottom: "0.75rem" }}>
            "Switching to NightDesk generates{" "}
            <em style={{ color: "#C9A84C" }}>$10,000 more direct revenue</em>{" "}
            while cutting monthly marketing cost by 57%."
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "rgba(245,240,232,0.25)" }}>
            50-room hotel estimate · $180 ADR · 65% occupancy · Results vary by property and market
          </p>
        </div>
      </div>
    </section>
  );
}
