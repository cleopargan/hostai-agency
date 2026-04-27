import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Mail, Clock, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Contact() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", hotel: "", rooms: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen" style={{ background: "#0A0A0F", color: "#F5F0E8" }}>
      <Navbar />
      <div style={{ paddingTop: "8rem", paddingBottom: "4rem", maxWidth: "800px", margin: "0 auto", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(245,240,232,0.45)", textDecoration: "none", marginBottom: "2rem", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif" }}>
          <ArrowLeft size={14} /> Back to Home
        </Link>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "3rem", fontWeight: 600, marginBottom: "1rem", lineHeight: 1.1 }}>
          Contact NightDesk
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.1rem", color: "rgba(245,240,232,0.6)", marginBottom: "3rem", lineHeight: 1.7 }}>
          Get in touch for a free hotel audit or to book a demo call. We respond within 24 hours.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "3rem" }}>
          {[
            { icon: Mail, label: "Email", value: "hello@nightdesk.agency" },
            { icon: Clock, label: "Response Time", value: "Within 24 hours" },
            { icon: Globe, label: "Service Area", value: "Worldwide" },
          ].map((item, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", padding: "1.25rem", textAlign: "center" }}>
              <item.icon size={18} color="#C9A84C" style={{ margin: "0 auto 0.5rem" }} />
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "rgba(245,240,232,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.25rem" }}>{item.label}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#F5F0E8" }}>{item.value}</div>
            </div>
          ))}
        </div>

        {submitted ? (
          <div style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "12px", padding: "3rem", textAlign: "center" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2rem", fontWeight: 600, marginBottom: "1rem" }}>Message Received</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "rgba(245,240,232,0.7)", marginBottom: "1.5rem" }}>We'll be in touch within 24 hours. In the meantime, you can book a call directly:</p>
            <a href="https://calendly.com/hello-nightdesk/30min" target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ padding: "0.75rem 1.75rem", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              Book Demo Call Now <ArrowRight size={14} />
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1.25rem" }}>
            {[
              { key: "name", label: "Your Name", type: "text", placeholder: "Jane Smith" },
              { key: "email", label: "Email Address", type: "email", placeholder: "jane@yourhotel.com" },
              { key: "hotel", label: "Hotel Name", type: "text", placeholder: "The Grand Boutique Hotel" },
              { key: "rooms", label: "Number of Rooms", type: "text", placeholder: "e.g. 25" },
            ].map((field) => (
              <div key={field.key}>
                <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "rgba(245,240,232,0.6)", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={(form as any)[field.key]}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "0.75rem 1rem", color: "#F5F0E8", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" }}
                />
              </div>
            ))}
            <div>
              <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "rgba(245,240,232,0.6)", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Message</label>
              <textarea
                placeholder="Tell us about your hotel and what you're looking to achieve..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "0.75rem 1rem", color: "#F5F0E8", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", outline: "none", resize: "vertical", boxSizing: "border-box" }}
              />
            </div>
            <button type="submit" className="btn-gold" style={{ padding: "0.85rem 2rem", fontSize: "0.9rem", display: "inline-flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", border: "none", width: "fit-content" }}>
              Send Message <ArrowRight size={14} />
            </button>
          </form>
        )}

        <div style={{ marginTop: "3rem", padding: "1.5rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "rgba(245,240,232,0.6)", margin: 0, lineHeight: 1.7 }}>
            Prefer to book a call directly? Use our{" "}
            <a href="https://calendly.com/hello-nightdesk/30min" target="_blank" rel="noopener noreferrer" style={{ color: "#C9A84C" }}>Calendly link</a>{" "}
            to schedule a free 30-minute discovery call at a time that works for you.
          </p>
        </div>
      </div>
    </div>
  );
}
