/* ============================================================
   ADMIN DASHBOARD — NightDesk CRM
   Owner-only lead management and analytics view
   ============================================================ */
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { useState } from "react";
import { getLoginUrl } from "@/const";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  new: { label: "New", color: "#C9A84C" },
  contacted: { label: "Contacted", color: "#60a5fa" },
  demo_booked: { label: "Demo Booked", color: "#34d399" },
  proposal_sent: { label: "Proposal Sent", color: "#a78bfa" },
  closed_won: { label: "Closed Won", color: "#4ade80" },
  closed_lost: { label: "Closed Lost", color: "#f87171" },
};

const SOURCE_LABELS: Record<string, string> = {
  calendly_click: "Calendly",
  email_form: "Email Form",
  chat_widget: "Chat Widget",
};

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [saving, setSaving] = useState(false);

  const { data: leads, refetch } = trpc.leads.list.useQuery(undefined, {
    enabled: !!user && user.role === "admin",
  });
  const { data: stats } = trpc.leads.stats.useQuery(undefined, {
    enabled: !!user && user.role === "admin",
  });
  const { data: pvStats } = trpc.analytics.stats.useQuery(undefined, {
    enabled: !!user && user.role === "admin",
  });
  const updateStatus = trpc.leads.updateStatus.useMutation();

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#080810", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "rgba(245,240,232,0.4)", fontFamily: "'DM Sans', sans-serif" }}>Loading…</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ minHeight: "100vh", background: "#080810", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1.5rem" }}>
        <p style={{ color: "rgba(245,240,232,0.5)", fontFamily: "'DM Sans', sans-serif" }}>Admin access required. Please sign in.</p>
        <a href={getLoginUrl()} style={{ padding: "0.75rem 2rem", background: "linear-gradient(135deg, #C9A84C, #E8C96A)", color: "#0A0806", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.85rem", textDecoration: "none" }}>
          Sign In
        </a>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div style={{ minHeight: "100vh", background: "#080810", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#f87171", fontFamily: "'DM Sans', sans-serif" }}>Access denied. Admin only.</p>
      </div>
    );
  }

  const handleSave = async () => {
    if (!selectedId || !newStatus) return;
    setSaving(true);
    await updateStatus.mutateAsync({
      id: selectedId,
      status: newStatus as "new" | "contacted" | "demo_booked" | "proposal_sent" | "closed_won" | "closed_lost",
      notes: notes || undefined,
    });
    await refetch();
    setSaving(false);
    setSelectedId(null);
    setNewStatus("");
    setNotes("");
  };

  const selectedLead = leads?.find((l) => l.id === selectedId);

  return (
    <div style={{ minHeight: "100vh", background: "#080810", padding: "2rem" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div>
          <a href="/" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.5rem", fontWeight: 600, color: "#F5F0E8", textDecoration: "none" }}>
            Night<span style={{ color: "#C9A84C" }}>Desk</span>
          </a>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(201,168,76,0.4)", marginTop: "2px" }}>
            Admin CRM Dashboard
          </div>
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "rgba(245,240,232,0.35)" }}>
          Signed in as <strong style={{ color: "rgba(245,240,232,0.6)" }}>{user.name || user.email}</strong>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
        {[
          { label: "Total Leads", value: stats?.total ?? 0, color: "#C9A84C" },
          { label: "New", value: stats?.new ?? 0, color: "#C9A84C" },
          { label: "Contacted", value: stats?.contacted ?? 0, color: "#60a5fa" },
          { label: "Demo Booked", value: stats?.demo_booked ?? 0, color: "#34d399" },
          { label: "Closed Won", value: stats?.closed_won ?? 0, color: "#4ade80" },
          { label: "Page Views", value: pvStats?.total ?? 0, color: "rgba(245,240,232,0.4)" },
        ].map((s) => (
          <div key={s.label} style={{ background: "rgba(12,11,22,0.95)", border: "1px solid rgba(255,255,255,0.06)", padding: "1.25rem 1.5rem" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2rem", fontWeight: 700, color: s.color, lineHeight: 1 }}>
              {s.value}
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "rgba(245,240,232,0.35)", marginTop: "0.375rem" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Leads table */}
      <div style={{ background: "rgba(12,11,22,0.95)", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
        <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.25rem", fontWeight: 600, color: "#F5F0E8", margin: 0 }}>
            Demo Requests
          </h2>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "rgba(245,240,232,0.3)" }}>
            {leads?.length ?? 0} total
          </span>
        </div>

        {!leads || leads.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "rgba(245,240,232,0.25)" }}>
            No leads yet. Share your website to start collecting demo requests.
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  {["Name", "Email", "Property", "Source", "Status", "Date", "Action"].map((h) => (
                    <th key={h} style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,240,232,0.25)" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, i) => (
                  <tr key={lead.id} style={{ borderBottom: i < leads.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none", background: selectedId === lead.id ? "rgba(201,168,76,0.04)" : "transparent" }}>
                    <td style={{ padding: "0.875rem 1rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "#F5F0E8" }}>{lead.name}</td>
                    <td style={{ padding: "0.875rem 1rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "rgba(245,240,232,0.55)" }}>
                      <a href={`mailto:${lead.email}`} style={{ color: "#C9A84C", textDecoration: "none" }}>{lead.email}</a>
                    </td>
                    <td style={{ padding: "0.875rem 1rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "rgba(245,240,232,0.45)" }}>{lead.propertyName || "—"}</td>
                    <td style={{ padding: "0.875rem 1rem" }}>
                      <span style={{ padding: "0.2rem 0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", color: "rgba(245,240,232,0.45)" }}>
                        {SOURCE_LABELS[lead.source] || lead.source}
                      </span>
                    </td>
                    <td style={{ padding: "0.875rem 1rem" }}>
                      <span style={{ padding: "0.2rem 0.6rem", background: "rgba(255,255,255,0.04)", border: `1px solid ${STATUS_LABELS[lead.status]?.color || "#C9A84C"}33`, fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", color: STATUS_LABELS[lead.status]?.color || "#C9A84C" }}>
                        {STATUS_LABELS[lead.status]?.label || lead.status}
                      </span>
                    </td>
                    <td style={{ padding: "0.875rem 1rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "rgba(245,240,232,0.3)" }}>
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "0.875rem 1rem" }}>
                      <button
                        onClick={() => {
                          setSelectedId(lead.id);
                          setNewStatus(lead.status);
                          setNotes(lead.notes || "");
                        }}
                        style={{ padding: "0.3rem 0.75rem", background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", color: "#C9A84C", cursor: "pointer" }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit panel */}
      {selectedId && selectedLead && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "1rem" }}>
          <div style={{ background: "#0C0B18", border: "1px solid rgba(201,168,76,0.2)", padding: "2rem", width: "100%", maxWidth: "480px", boxShadow: "0 40px 100px rgba(0,0,0,0.8)" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.4rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "0.25rem" }}>
              Update Lead
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "rgba(245,240,232,0.4)", marginBottom: "1.75rem" }}>
              {selectedLead.name} · {selectedLead.email}
            </p>

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)", marginBottom: "0.5rem" }}>
                Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", padding: "0.625rem 0.875rem", color: "#F5F0E8", fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", appearance: "none" }}
              >
                {Object.entries(STATUS_LABELS).map(([val, { label }]) => (
                  <option key={val} value={val} style={{ background: "#0C0B18" }}>{label}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)", marginBottom: "0.5rem" }}>
                Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder="Add internal notes about this lead…"
                style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", padding: "0.625rem 0.875rem", color: "#F5F0E8", fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", resize: "none", boxSizing: "border-box" }}
              />
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{ flex: 1, padding: "0.75rem", background: "linear-gradient(135deg, #C9A84C, #E8C96A)", color: "#0A0806", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.8rem", border: "none", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}
              >
                {saving ? "Saving…" : "Save Changes"}
              </button>
              <button
                onClick={() => { setSelectedId(null); setNewStatus(""); setNotes(""); }}
                style={{ padding: "0.75rem 1.25rem", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(245,240,232,0.45)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", cursor: "pointer" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
