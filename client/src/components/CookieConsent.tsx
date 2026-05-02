import { useEffect, useState } from "react";
import { Link } from "wouter";
import { X, Cookie, ChevronDown, ChevronUp } from "lucide-react";

const STORAGE_KEY = "nd_cookie_consent";

interface ConsentState {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  decided: boolean;
}

function getStored(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveConsent(analytics: boolean, marketing: boolean) {
  const state: ConsentState = { necessary: true, analytics, marketing, decided: true };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  return state;
}

export function useConsent() {
  const stored = getStored();
  return {
    analytics: stored?.analytics ?? false,
    marketing: stored?.marketing ?? false,
    decided: stored?.decided ?? false,
  };
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    const stored = getStored();
    if (!stored?.decided) {
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const acceptAll = () => {
    saveConsent(true, true);
    setVisible(false);
  };

  const rejectNonEssential = () => {
    saveConsent(false, false);
    setVisible(false);
  };

  const savePreferences = () => {
    saveConsent(analytics, marketing);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0, left: 0, right: 0,
        zIndex: 9999,
        background: "rgba(10,9,20,0.99)",
        borderTop: "1px solid rgba(201,168,76,0.2)",
        boxShadow: "0 -20px 60px rgba(0,0,0,0.6)",
        backdropFilter: "blur(24px)",
      }}
    >
      {/* Top accent line */}
      <div style={{ height: "2px", background: "linear-gradient(90deg, #C9A84C, #E8C96A, #C9A84C)" }} />

      <div className="container" style={{ padding: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", justifyContent: "space-between", flexWrap: "wrap" }}>

          {/* Left — text */}
          <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", flex: 1, minWidth: "280px" }}>
            <Cookie size={18} style={{ color: "#C9A84C", flexShrink: 0, marginTop: "2px" }} />
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "rgba(245,240,232,0.72)", lineHeight: 1.65, margin: 0 }}>
                We use cookies to improve your experience and analyse site traffic. By clicking <strong style={{ color: "#F5F0E8" }}>Accept All</strong>, you consent to our use of cookies.{" "}
                <Link href="/privacy" style={{ color: "#C9A84C", textDecoration: "none" }}>Privacy Policy</Link>
                {" · "}
                <Link href="/terms" style={{ color: "#C9A84C", textDecoration: "none" }}>Terms</Link>
              </p>
              {/* Manage link */}
              <button
                onClick={() => setExpanded(!expanded)}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", marginTop: "0.5rem", background: "none", border: "none", cursor: "pointer", color: "rgba(245,240,232,0.35)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", padding: 0 }}
              >
                {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                {expanded ? "Hide preferences" : "Manage preferences"}
              </button>
            </div>
          </div>

          {/* Right — buttons */}
          <div style={{ display: "flex", gap: "0.625rem", flexShrink: 0, alignItems: "center", flexWrap: "wrap" }}>
            <button
              onClick={rejectNonEssential}
              style={{
                padding: "0.625rem 1.25rem",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(245,240,232,0.55)",
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem",
                cursor: "pointer",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)"; (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.85)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.55)"; }}
            >
              Reject Non-Essential
            </button>
            <button
              onClick={acceptAll}
              className="btn-gold"
              style={{ padding: "0.625rem 1.5rem", fontSize: "0.78rem" }}
            >
              Accept All
            </button>
            <button
              onClick={() => setVisible(false)}
              aria-label="Dismiss"
              style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(245,240,232,0.25)", padding: "0.25rem", display: "flex" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.6)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.25)"}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Expanded preferences */}
        {expanded && (
          <div style={{ marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="grid md:grid-cols-3 gap-4" style={{ marginBottom: "1.25rem" }}>
              {[
                {
                  id: "necessary",
                  label: "Necessary",
                  desc: "Required for the site to function. Cannot be disabled.",
                  checked: true,
                  locked: true,
                  color: "#6EE7B7",
                },
                {
                  id: "analytics",
                  label: "Analytics",
                  desc: "Help us understand how visitors use the site (page views, session data).",
                  checked: analytics,
                  locked: false,
                  color: "#4A90E2",
                  onChange: () => setAnalytics(!analytics),
                },
                {
                  id: "marketing",
                  label: "Marketing",
                  desc: "Used to show relevant ads and track campaign performance.",
                  checked: marketing,
                  locked: false,
                  color: "#C9A84C",
                  onChange: () => setMarketing(!marketing),
                },
              ].map(pref => (
                <div key={pref.id} style={{ padding: "1rem 1.25rem", background: "rgba(255,255,255,0.02)", border: `1px solid ${pref.checked ? `rgba(${pref.color === "#6EE7B7" ? "110,231,183" : pref.color === "#4A90E2" ? "74,144,226" : "201,168,76"},0.2)` : "rgba(255,255,255,0.06)"}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", fontWeight: 600, color: pref.checked ? "#F5F0E8" : "rgba(245,240,232,0.45)" }}>
                      {pref.label}
                    </span>
                    <div
                      onClick={pref.locked ? undefined : pref.onChange}
                      style={{
                        width: "36px", height: "20px",
                        background: pref.checked ? pref.color : "rgba(255,255,255,0.1)",
                        borderRadius: "10px",
                        position: "relative",
                        cursor: pref.locked ? "not-allowed" : "pointer",
                        transition: "background 0.2s",
                        opacity: pref.locked ? 0.6 : 1,
                        flexShrink: 0,
                      }}
                    >
                      <div style={{
                        position: "absolute", top: "2px",
                        left: pref.checked ? "18px" : "2px",
                        width: "16px", height: "16px",
                        background: "#F5F0E8",
                        borderRadius: "50%",
                        transition: "left 0.2s",
                      }} />
                    </div>
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "rgba(245,240,232,0.38)", lineHeight: 1.5, margin: 0 }}>{pref.desc}</p>
                </div>
              ))}
            </div>
            <button
              onClick={savePreferences}
              style={{ padding: "0.625rem 1.5rem", background: "transparent", border: "1px solid rgba(201,168,76,0.3)", color: "#C9A84C", fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", cursor: "pointer", transition: "border-color 0.2s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.6)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.3)"}
            >
              Save My Preferences
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
