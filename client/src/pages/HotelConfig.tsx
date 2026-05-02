import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Save, CheckCircle2, Settings, MessageSquare, Clock, DollarSign, Info } from "lucide-react";
import MarketingNavbar from "@/components/MarketingNavbar";

interface HotelConfig {
  hotelName: string;
  hotelCity: string;
  checkInTime: string;
  checkOutTime: string;
  currency: string;
  startingRate: string;
  petPolicy: string;
  parking: string;
  breakfast: string;
  wifi: string;
  pool: string;
  restaurant: string;
  cancellationPolicy: string;
  extraNotes: string;
}

const STORAGE_KEY = "nd_hotel_config";

const defaults: HotelConfig = {
  hotelName: "",
  hotelCity: "",
  checkInTime: "3:00 PM",
  checkOutTime: "11:00 AM",
  currency: "€",
  startingRate: "",
  petPolicy: "Pets welcome (under 25kg), €30/night fee, advance notice required",
  parking: "Complimentary private parking on-site",
  breakfast: "Daily 7:00–10:30 AM, included in Deluxe and Suite packages",
  wifi: "Complimentary high-speed throughout the property",
  pool: "Rooftop pool open 8 AM–9 PM daily",
  restaurant: "Open for dinner 6–10 PM, reservations recommended on weekends",
  cancellationPolicy: "Free up to 48 hours before arrival; first night charged after that",
  extraNotes: "",
};

const Field = ({
  label, hint, value, onChange, type = "text", placeholder,
}: {
  label: string; hint?: string; value: string;
  onChange: (v: string) => void; type?: string; placeholder?: string;
}) => (
  <div style={{ marginBottom: "1.25rem" }}>
    <label style={{
      display: "block", fontFamily: "'DM Sans', sans-serif",
      fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em",
      textTransform: "uppercase", color: "rgba(245,240,232,0.4)",
      marginBottom: "0.5rem",
    }}>
      {label}
    </label>
    {hint && (
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "rgba(245,240,232,0.25)", marginBottom: "0.4rem" }}>
        {hint}
      </p>
    )}
    {type === "textarea" ? (
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        style={{
          width: "100%", background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)", padding: "0.75rem 1rem",
          color: "#F5F0E8", fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem",
          outline: "none", resize: "vertical", boxSizing: "border-box",
          transition: "border-color 0.2s",
        }}
        onFocus={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.35)")}
        onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%", background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)", padding: "0.75rem 1rem",
          color: "#F5F0E8", fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem",
          outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
        }}
        onFocus={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.35)")}
        onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
      />
    )}
  </div>
);

const SectionHeader = ({ icon: Icon, title, color }: { icon: React.ElementType; title: string; color: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
    <div style={{ width: "2.25rem", height: "2.25rem", display: "flex", alignItems: "center", justifyContent: "center", background: `rgba(${color},0.08)`, border: `1px solid rgba(${color},0.18)`, flexShrink: 0 }}>
      <Icon size={14} style={{ color: `rgb(${color})` }} />
    </div>
    <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.35rem", fontWeight: 600, color: "#F5F0E8" }}>{title}</h3>
  </div>
);

export default function HotelConfig() {
  const [config, setConfig] = useState<HotelConfig>(defaults);
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setConfig(JSON.parse(stored));
    } catch {
      // use defaults
    }
  }, []);

  const update = (key: keyof HotelConfig) => (val: string) => {
    setConfig(prev => ({ ...prev, [key]: val }));
    setDirty(true);
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    setSaved(true);
    setDirty(false);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen" style={{ background: "#080810", color: "#F5F0E8" }}>
      <MarketingNavbar />

      <div style={{ paddingTop: "9rem", paddingBottom: "6rem", maxWidth: "820px", margin: "0 auto", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>

        <Link href="/ai-receptionist" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(245,240,232,0.35)", textDecoration: "none", marginBottom: "2rem", fontSize: "0.75rem", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.06em" }}>
          ← Back to AI Receptionist
        </Link>

        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <span className="section-label" style={{ display: "inline-flex", marginBottom: "1.25rem" }}>AI Concierge Setup</span>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.2rem, 4vw, 3rem)", fontWeight: 600, lineHeight: 1.08, letterSpacing: "-0.015em", color: "#F5F0E8", marginBottom: "1rem" }}>
            Hotel{" "}
            <em style={{ fontStyle: "italic", background: "linear-gradient(90deg, #BFA06A, #E8C96A, #C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Configuration
            </em>
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: "rgba(245,240,232,0.42)", maxWidth: "580px" }}>
            This information trains your AI Receptionist. The more detail you provide, the more accurate and helpful the AI's responses will be to your guests.
          </p>
        </div>

        {/* Info banner */}
        <div style={{ display: "flex", gap: "0.875rem", padding: "1rem 1.25rem", background: "rgba(74,144,226,0.06)", border: "1px solid rgba(74,144,226,0.18)", marginBottom: "2.5rem" }}>
          <Info size={15} style={{ color: "#4A90E2", flexShrink: 0, marginTop: "2px" }} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", lineHeight: 1.65, color: "rgba(245,240,232,0.52)" }}>
            Changes saved here are applied to your AI Receptionist within 24 hours. For urgent updates, email <a href="mailto:hello@nightdesk.agency" style={{ color: "#C9A84C", textDecoration: "none" }}>hello@nightdesk.agency</a>.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

          {/* Basic Info */}
          <div style={{ padding: "2rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <SectionHeader icon={Settings} title="Basic Information" color="201,168,76" />
            <div className="grid sm:grid-cols-2 gap-x-6">
              <Field label="Hotel Name *" placeholder="The Grand Maison" value={config.hotelName} onChange={update("hotelName")} />
              <Field label="City / Location *" placeholder="Paris, France" value={config.hotelCity} onChange={update("hotelCity")} />
              <Field label="Starting Room Rate" placeholder="185" value={config.startingRate} onChange={update("startingRate")} hint="Nightly rate from (number only)" />
              <Field label="Currency Symbol" placeholder="€" value={config.currency} onChange={update("currency")} />
              <Field label="Check-In Time" placeholder="3:00 PM" value={config.checkInTime} onChange={update("checkInTime")} />
              <Field label="Check-Out Time" placeholder="11:00 AM" value={config.checkOutTime} onChange={update("checkOutTime")} />
            </div>
          </div>

          {/* Policies */}
          <div style={{ padding: "2rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <SectionHeader icon={Clock} title="Policies & Amenities" color="110,231,183" />
            <Field label="Cancellation Policy" value={config.cancellationPolicy} onChange={update("cancellationPolicy")} hint="Guests ask about this constantly — be specific" placeholder="Free up to 48 hours before arrival..." />
            <Field label="Pet Policy" value={config.petPolicy} onChange={update("petPolicy")} placeholder="Pets welcome under 25kg, €30/night fee..." />
            <Field label="Parking" value={config.parking} onChange={update("parking")} placeholder="Complimentary private parking on-site" />
            <Field label="Breakfast" value={config.breakfast} onChange={update("breakfast")} placeholder="Daily 7–10:30 AM, included in Deluxe packages..." />
            <Field label="WiFi" value={config.wifi} onChange={update("wifi")} placeholder="Complimentary high-speed throughout property" />
          </div>

          {/* Facilities */}
          <div style={{ padding: "2rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <SectionHeader icon={MessageSquare} title="Facilities" color="123,94,167" />
            <Field label="Pool / Spa" value={config.pool} onChange={update("pool")} placeholder="Rooftop pool open 8 AM–9 PM daily" />
            <Field label="Restaurant / Bar" value={config.restaurant} onChange={update("restaurant")} placeholder="Open for dinner 6–10 PM, reservations recommended..." />
          </div>

          {/* Extra Notes */}
          <div style={{ padding: "2rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <SectionHeader icon={DollarSign} title="Additional Notes for AI" color="201,168,76" />
            <Field
              label="Extra context"
              type="textarea"
              value={config.extraNotes}
              onChange={update("extraNotes")}
              hint="Unique selling points, nearby landmarks, special packages, anything the AI should know"
              placeholder="e.g. We are 5 minutes walk from the Eiffel Tower. Our rooftop bar has panoramic city views. We offer a honeymoon package with champagne and rose petals..."
            />
          </div>

          {/* Save */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", justifyContent: "flex-end" }}>
            {saved && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "#6EE7B7" }}>
                <CheckCircle2 size={14} /> Saved
              </div>
            )}
            <button
              onClick={handleSave}
              disabled={!dirty && !saved}
              className="btn-gold"
              style={{ padding: "0.875rem 2rem", fontSize: "0.8rem", opacity: !dirty ? 0.6 : 1, cursor: !dirty ? "default" : "pointer" }}
            >
              <Save size={14} /> Save Configuration
            </button>
          </div>

          {/* Send to team */}
          <div style={{ padding: "1.5rem", background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.12)", textAlign: "center" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "rgba(245,240,232,0.5)", marginBottom: "1rem", lineHeight: 1.65 }}>
              Once you've filled in your details, send this configuration to the NightDesk team to update your live AI Receptionist.
            </p>
            <a
              href={`mailto:hello@nightdesk.agency?subject=Hotel Config Update — ${config.hotelName || "My Hotel"}&body=${encodeURIComponent(`Hotel Configuration Update\n\nHotel Name: ${config.hotelName}\nCity: ${config.hotelCity}\nCheck-in: ${config.checkInTime}\nCheck-out: ${config.checkOutTime}\nStarting Rate: ${config.currency}${config.startingRate}/night\nCancellation: ${config.cancellationPolicy}\nPet Policy: ${config.petPolicy}\nParking: ${config.parking}\nBreakfast: ${config.breakfast}\nWiFi: ${config.wifi}\nPool/Spa: ${config.pool}\nRestaurant: ${config.restaurant}\nExtra Notes: ${config.extraNotes}`)}`}
              className="btn-gold"
              style={{ padding: "0.75rem 1.75rem", fontSize: "0.78rem", display: "inline-flex" }}
            >
              Send to NightDesk Team
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
