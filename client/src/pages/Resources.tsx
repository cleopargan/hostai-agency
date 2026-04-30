import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, FileText, BookOpen, BarChart2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactCTA from "@/components/ContactCTA";

export default function Resources() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const resources = [
    {
      icon: FileText,
      category: "Guide",
      title: "The Hotel Direct Booking Playbook",
      desc: "A step-by-step guide to reducing OTA dependency and building a sustainable direct booking channel. Covers AI receptionists, Google Ads, and booking optimization.",
      cta: "Download Free Guide",
    },
    {
      icon: BarChart2,
      category: "Calculator",
      title: "OTA Commission Calculator",
      desc: "Enter your hotel's room count, average rate, occupancy, and OTA mix to see exactly how much you're paying in commissions — and how much NightDesk could recover.",
      cta: "Use Calculator",
    },
    {
      icon: BookOpen,
      category: "Blog",
      title: "Hotel AI and Direct Booking Blog",
      desc: "In-depth articles on hotel technology, OTA strategy, Google Ads for hotels, and AI receptionists. Updated regularly with new research and case studies.",
      cta: "Read Blog",
      href: "/blog",
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#0A0A0F", color: "#F5F0E8" }}>
      <Navbar />
      <div style={{ paddingTop: "8rem", paddingBottom: "4rem", maxWidth: "800px", margin: "0 auto", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(245,240,232,0.45)", textDecoration: "none", marginBottom: "2rem", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif" }}>
          <ArrowLeft size={14} /> Back to Home
        </Link>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "3rem", fontWeight: 600, marginBottom: "1rem", lineHeight: 1.1 }}>Resources for Hotel Owners</h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.1rem", color: "rgba(245,240,232,0.6)", marginBottom: "3rem", lineHeight: 1.7 }}>
          Free guides, tools, and articles to help boutique hotels reduce OTA dependency and grow direct bookings.
        </p>
        <div style={{ display: "grid", gap: "1.5rem", marginBottom: "3rem" }}>
          {resources.map((r, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "1.75rem", display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
              <div style={{ background: "rgba(201,168,76,0.1)", borderRadius: "8px", padding: "0.75rem", flexShrink: 0 }}>
                <r.icon size={20} color="#C9A84C" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "#C9A84C", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem" }}>{r.category}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.25rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "0.5rem" }}>{r.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "rgba(245,240,232,0.6)", lineHeight: 1.6, marginBottom: "1rem" }}>{r.desc}</p>
                {r.href ? (
                  <Link href={r.href} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "#C9A84C", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                    {r.cta} <ArrowRight size={12} />
                  </Link>
                ) : (
                  <a href="https://calendly.com/hello-nightdesk/30min" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "#C9A84C", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                    {r.cta} <ArrowRight size={12} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ContactCTA />
    </div>
  );
}
