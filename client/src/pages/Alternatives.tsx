import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactCTA from "@/components/ContactCTA";

export default function Alternatives() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen" style={{ background: "#0A0A0F", color: "#F5F0E8" }}>
      <Navbar />
      <div style={{ paddingTop: "8rem", paddingBottom: "4rem", maxWidth: "800px", margin: "0 auto", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(245,240,232,0.45)", textDecoration: "none", marginBottom: "2rem", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif" }}>
          <ArrowLeft size={14} /> Back to Home
        </Link>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "3rem", fontWeight: 600, marginBottom: "1rem", lineHeight: 1.1 }}>
          NightDesk Alternatives: Hotel AI and Direct Booking Tools
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.1rem", color: "rgba(245,240,232,0.6)", marginBottom: "3rem", lineHeight: 1.7 }}>
          An honest comparison of NightDesk and alternative tools for hotel AI receptionists and direct booking optimization.
        </p>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", lineHeight: 1.9, color: "rgba(245,240,232,0.8)" }}>
          
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>Why Hotels Look for Alternatives</h2>
          <p style={{ marginBottom: "1.5rem" }}>Hotel owners looking for AI receptionists and direct booking tools have several options. This page provides an honest comparison of NightDesk and the main alternatives, so you can make an informed decision about what is right for your property.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>Generic Chatbot Platforms (Intercom, Drift, Tidio)</h2>
          <p style={{ marginBottom: "1.5rem" }}>Generic chatbot platforms like Intercom, Drift, and Tidio can be configured for hotel use, but they are not designed for hotels. They require significant setup time, do not understand hotel-specific concepts out of the box, and do not integrate with hotel revenue strategy. They are cheaper than NightDesk but require more internal expertise to manage and typically deliver lower results for hotel-specific use cases.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>Hotel-Specific Chatbot Software (Asksuite, Quicktext)</h2>
          <p style={{ marginBottom: "1.5rem" }}>Hotel-specific chatbot software like Asksuite and Quicktext are designed for hotels and offer more relevant features than generic platforms. However, they are software tools, not full-service agencies — the hotel is responsible for setup, training, and ongoing management. They also typically do not include Google Ads management or direct booking optimization, so they address only one of the three root causes of OTA dependency.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>Full-Service Hotel Marketing Agencies</h2>
          <p style={{ marginBottom: "1.5rem" }}>Traditional hotel marketing agencies can manage Google Ads and website optimization, but most are generalists who work across many industries. They typically do not offer AI receptionist technology, and their hotel-specific expertise varies widely. NightDesk's advantage is the combination of AI technology and hotel-specific marketing expertise in one integrated service.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>Why NightDesk is Different</h2>
          <p style={{ marginBottom: "1.5rem" }}>NightDesk is the only service that combines a hotel-specific AI receptionist, hotel-specific Google Ads management, and direct booking optimization into one integrated package. It is a full-service agency, not just software — NightDesk handles setup, training, and ongoing management. And it is exclusively focused on hotels, which means the team understands hotel revenue management, OTA dynamics, and guest booking behavior at a depth that generalist tools and agencies cannot match.</p>
          <div style={{ marginTop: "3rem", padding: "2rem", background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "12px", textAlign: "center" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.75rem", fontWeight: 600, marginBottom: "1rem" }}>Get a Free Hotel Audit</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "rgba(245,240,232,0.7)", marginBottom: "1.5rem" }}>See exactly how much revenue you could recover from OTAs. Free, no obligation.</p>
            <a href="https://calendly.com/hello-nightdesk/30min" target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ padding: "0.75rem 1.75rem", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              Book Free 30-Min Call <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
      <ContactCTA />
    </div>
  );
}
