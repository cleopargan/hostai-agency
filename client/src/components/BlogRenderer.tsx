import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

// ── Section types ────────────────────────────────────────────────────────────

type StatItem = { value: string; label: string; color?: string };
type ChartDatum = { label: string; value: number; color?: string };

type Section =
  | { type: "intro"; content: string }
  | { type: "h2"; content: string }
  | { type: "p"; content: string }
  | { type: "stat"; stats: StatItem[] }
  | { type: "callout"; content: string; variant?: "gold" | "info" | "warning" }
  | { type: "chart"; chartType?: string; title: string; description?: string; data: ChartDatum[] }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "cta"; text: string; link?: string };

// ── Sub-renderers ────────────────────────────────────────────────────────────

function StatBlock({ stats }: { stats: StatItem[] }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${Math.min(stats.length, 3)}, 1fr)`,
      gap: "1px",
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.05)",
      margin: "2rem 0",
    }}>
      {stats.map((s, i) => (
        <div key={i} style={{ padding: "1.75rem", background: "#080810", textAlign: "center" }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 600,
            color: s.color ?? "#C9A84C", lineHeight: 1, marginBottom: "0.5rem",
          }}>
            {s.value}
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "rgba(245,240,232,0.5)", lineHeight: 1.5 }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function CalloutBlock({ content, variant = "gold" }: { content: string; variant?: string }) {
  const styles = {
    gold: { bg: "rgba(201,168,76,0.06)", border: "rgba(201,168,76,0.25)", accent: "#C9A84C", left: "#C9A84C" },
    info: { bg: "rgba(74,144,226,0.06)", border: "rgba(74,144,226,0.25)", accent: "#4A90E2", left: "#4A90E2" },
    warning: { bg: "rgba(248,113,113,0.06)", border: "rgba(248,113,113,0.2)", accent: "#f87171", left: "#f87171" },
  };
  const s = styles[variant as keyof typeof styles] ?? styles.gold;
  return (
    <div style={{
      margin: "2rem 0",
      padding: "1.25rem 1.5rem",
      background: s.bg,
      border: `1px solid ${s.border}`,
      borderLeft: `3px solid ${s.left}`,
      position: "relative",
    }}>
      <p style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: "1.15rem", lineHeight: 1.65,
        color: "rgba(245,240,232,0.85)", fontStyle: "italic", margin: 0,
      }}>
        {content}
      </p>
    </div>
  );
}

function ChartBlock({ title, description, data }: { title: string; description?: string; data: ChartDatum[] }) {
  return (
    <div style={{
      margin: "2rem 0",
      padding: "1.75rem",
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
    }}>
      <div style={{ marginBottom: "1.25rem" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.15rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "0.25rem" }}>{title}</div>
        {description && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "rgba(245,240,232,0.38)" }}>{description}</div>}
      </div>
      <div style={{ height: "220px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="1 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis dataKey="label" tick={{ fill: "rgba(245,240,232,0.35)", fontFamily: "'DM Sans', sans-serif", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip
              contentStyle={{ background: "rgba(10,9,20,0.97)", border: "1px solid rgba(201,168,76,0.2)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem" }}
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
            />
            <Bar dataKey="value" radius={[1, 1, 0, 0]}>
              {data.map((d, i) => <Cell key={i} fill={d.color ?? "#C9A84C"} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── Main renderer ────────────────────────────────────────────────────────────

export default function BlogRenderer({ sections }: { sections: Section[] }) {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", lineHeight: 1.85, color: "rgba(245,240,232,0.78)" }}>
      {sections.map((section, i) => {
        switch (section.type) {
          case "intro":
            return (
              <p key={i} style={{ fontSize: "1.1rem", lineHeight: 1.85, color: "rgba(245,240,232,0.82)", marginBottom: "1.75rem", fontStyle: "italic", borderLeft: "3px solid rgba(201,168,76,0.4)", paddingLeft: "1.25rem" }}>
                {section.content}
              </p>
            );
          case "h2":
            return (
              <h2 key={i} style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, color: "#F5F0E8", marginTop: "2.5rem", marginBottom: "1rem", lineHeight: 1.2 }}>
                {section.content}
              </h2>
            );
          case "p":
            return <p key={i} style={{ marginBottom: "1.25rem" }}>{section.content}</p>;
          case "stat":
            return <StatBlock key={i} stats={section.stats} />;
          case "callout":
            return <CalloutBlock key={i} content={section.content} variant={section.variant} />;
          case "chart":
            return <ChartBlock key={i} title={section.title} description={section.description} data={section.data} />;
          case "list":
            const Tag = section.ordered ? "ol" : "ul";
            return (
              <Tag key={i} style={{ paddingLeft: "1.5rem", marginBottom: "1.25rem" }}>
                {section.items.map((item, j) => (
                  <li key={j} style={{ marginBottom: "0.5rem" }}>{item}</li>
                ))}
              </Tag>
            );
          case "cta":
            return (
              <div key={i} style={{ margin: "2.5rem 0", padding: "1.75rem", background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.18)", textAlign: "center" }}>
                <a href={section.link ?? "#contact"} className="btn-gold" style={{ padding: "0.875rem 2rem", fontSize: "0.85rem", display: "inline-flex" }}>
                  {section.text}
                </a>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
