import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function ThankYou() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen" style={{ background: "#0A0A0F", color: "#F5F0E8", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "8rem 1.5rem 4rem" }}>
        <div style={{ maxWidth: "560px", textAlign: "center" }}>
          <CheckCircle size={48} color="#C9A84C" style={{ margin: "0 auto 1.5rem" }} />
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "3rem", fontWeight: 600, marginBottom: "1rem", lineHeight: 1.1 }}>
            Thank You
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "rgba(245,240,232,0.7)", marginBottom: "2.5rem", lineHeight: 1.7 }}>
            We've received your message and will be in touch within 24 hours. In the meantime, you can book a call directly using the link below.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://calendly.com/hello-nightdesk/30min" target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ padding: "0.75rem 1.75rem", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              Book Demo Call <ArrowRight size={14} />
            </a>
            <Link href="/" style={{ padding: "0.75rem 1.75rem", fontSize: "0.85rem", border: "1px solid rgba(245,240,232,0.2)", borderRadius: "6px", color: "rgba(245,240,232,0.8)", textDecoration: "none", display: "inline-flex", alignItems: "center", fontFamily: "'DM Sans', sans-serif" }}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
