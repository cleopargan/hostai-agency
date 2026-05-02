import { useEffect, useRef, useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";

const DEFAULTS = { rooms: 40, adr: 180, occupancy: 65, otaPercent: 70 };

function Slider({
  label, value, min, max, step = 1, format, onChange,
}: {
  label: string; value: number; min: number; max: number;
  step?: number; format: (v: number) => string; onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.625rem" }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "rgba(245,240,232,0.45)", letterSpacing: "0.04em" }}>
          {label}
        </span>
        <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.5rem", fontWeight: 600, color: "#C9A84C", lineHeight: 1 }}>
          {format(value)}
        </span>
      </div>
      <div style={{ position: "relative", height: "4px", background: "rgba(255,255,255,0.06)" }}>
        <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #C9A84C, #E8C96A)" }} />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{
            position: "absolute", top: "50%", left: 0, width: "100%",
            transform: "translateY(-50%)", opacity: 0, cursor: "pointer",
            height: "20px", margin: 0,
          }}
        />
        <div style={{
          position: "absolute", top: "50%", left: `${pct}%`,
          transform: "translate(-50%, -50%)",
          width: "14px", height: "14px",
          background: "#0C0B18", border: "2px solid #C9A84C",
          borderRadius: "50%", pointerEvents: "none",
          boxShadow: "0 0 8px rgba(201,168,76,0.4)",
        }} />
      </div>
    </div>
  );
}

export default function MarketingROICalculator() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [rooms, setRooms] = useState(DEFAULTS.rooms);
  const [adr, setAdr] = useState(DEFAULTS.adr);
  const [occupancy, setOccupancy] = useState(DEFAULTS.occupancy);
  const [otaPercent, setOtaPercent] = useState(DEFAULTS.otaPercent);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const monthlyRoomNights = rooms * (occupancy / 100) * 30;
  const monthlyRevenue = monthlyRoomNights * adr;
  const otaRevenue = monthlyRevenue * (otaPercent / 100);
  const commissionRate = 0.17;
  const monthlyCommission = otaRevenue * commissionRate;
  const nightdeskFee = 999;
  const adSpend = Math.min(Math.max(monthlyRevenue * 0.03, 500), 3000);
  const nightdeskTotal = nightdeskFee + adSpend;
  const commissionSaved = otaRevenue * 0.4 * commissionRate;
  const netSaving = commissionSaved - nightdeskFee;
  const roiMultiple = nightdeskTotal > 0 ? (commissionSaved / nightdeskTotal).toFixed(1) : "0";

  const fmt$ = (n: number) => `$${Math.round(n).toLocaleString()}`;

  return (
    <section
      id="roi-calculator"
      ref={ref}
      style={{ background: "#080810", padding: "6rem 0 7rem", borderTop: "1px solid rgba(255,255,255,0.04)", position: "relative", overflow: "hidden" }}
    >
      {/* Ambient glow */}
      <div className="absolute pointer-events-none" style={{ top: "20%", right: "-5%", width: "600px", height: "600px", background: "radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 60%)", filter: "blur(80px)" }} />

      <div className="container relative z-10">
        {/* Header */}
        <div
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <span className="section-label" style={{ display: "inline-flex", marginBottom: "1.25rem" }}>ROI Calculator</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.015em", color: "#F5F0E8", marginBottom: "1rem" }}>
            How Much Are You Paying{" "}
            <em style={{ fontStyle: "italic", background: "linear-gradient(90deg, #BFA06A, #E8C96A, #C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              OTAs Every Month?
            </em>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "rgba(245,240,232,0.38)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.75 }}>
            Adjust the sliders to match your property. See your real OTA commission cost and what NightDesk would save you.
          </p>
        </div>

        {/* Calculator */}
        <div
          className={`grid lg:grid-cols-2 gap-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "150ms" }}
        >
          {/* Sliders */}
          <div style={{ padding: "2.25rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.35rem", fontWeight: 600, color: "#F5F0E8" }}>Your Hotel</h3>
              <button
                onClick={() => { setRooms(DEFAULTS.rooms); setAdr(DEFAULTS.adr); setOccupancy(DEFAULTS.occupancy); setOtaPercent(DEFAULTS.otaPercent); }}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", background: "none", border: "none", cursor: "pointer", color: "rgba(201,168,76,0.45)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.06em" }}
              >
                <RotateCcw size={11} /> Reset
              </button>
            </div>
            <Slider label="Hotel rooms" value={rooms} min={5} max={200} format={v => `${v} rooms`} onChange={setRooms} />
            <Slider label="Average daily rate" value={adr} min={50} max={800} step={10} format={v => `$${v}`} onChange={setAdr} />
            <Slider label="Occupancy rate" value={occupancy} min={20} max={100} format={v => `${v}%`} onChange={setOccupancy} />
            <Slider label="Bookings via OTAs" value={otaPercent} min={10} max={100} format={v => `${v}%`} onChange={setOtaPercent} />
          </div>

          {/* Results */}
          <div style={{ padding: "2.25rem", background: "rgba(10,9,20,0.98)", border: "1px solid rgba(201,168,76,0.18)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, #C9A84C, #E8C96A, #C9A84C)" }} />

            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.35rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "2rem" }}>Monthly Breakdown</h3>

            {/* Metric rows */}
            {[
              { label: "Monthly OTA Commission", value: fmt$(monthlyCommission), color: "#f87171", bg: "rgba(248,113,113,0.06)", border: "rgba(248,113,113,0.15)", note: `at 17% avg rate` },
              { label: "NightDesk Total Cost", value: fmt$(nightdeskTotal), color: "#C9A84C", bg: "rgba(201,168,76,0.06)", border: "rgba(201,168,76,0.15)", note: `management + est. ad spend` },
              { label: "Monthly Net Saving", value: fmt$(Math.max(netSaving, 0)), color: "#6EE7B7", bg: "rgba(110,231,183,0.06)", border: "rgba(110,231,183,0.15)", note: `commission saved vs fee` },
            ].map(m => (
              <div key={m.label} style={{ padding: "1rem 1.25rem", background: m.bg, border: `1px solid ${m.border}`, marginBottom: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "rgba(245,240,232,0.5)" }}>{m.label}</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.75rem", fontWeight: 600, color: m.color, lineHeight: 1 }}>{m.value}</span>
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "rgba(245,240,232,0.22)", marginTop: "0.2rem" }}>{m.note}</div>
              </div>
            ))}

            {/* ROI multiple */}
            <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)", marginBottom: "0.5rem" }}>
                Estimated Return on Investment
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(3rem, 6vw, 4.5rem)", fontWeight: 600, background: "linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>
                {roiMultiple}×
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "rgba(245,240,232,0.3)", marginTop: "0.25rem" }}>return on NightDesk investment</div>
            </div>

            <a href="#contact" className="btn-gold" style={{ display: "flex", justifyContent: "center", marginTop: "1.75rem", padding: "0.875rem", fontSize: "0.8rem" }}>
              Get My Free Audit <ArrowRight size={14} />
            </a>

            <p style={{ textAlign: "center", marginTop: "0.875rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "rgba(245,240,232,0.2)" }}>
              Based on 17% avg OTA commission. Assumes 40% OTA→Direct shift in 6 months. Results vary.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
