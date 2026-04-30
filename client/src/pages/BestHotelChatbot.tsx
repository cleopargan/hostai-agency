import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactCTA from "@/components/ContactCTA";

export default function BestHotelChatbot() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen" style={{ background: "#0A0A0F", color: "#F5F0E8" }}>
      <Navbar />
      <div style={{ paddingTop: "8rem", paddingBottom: "4rem", maxWidth: "800px", margin: "0 auto", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(245,240,232,0.45)", textDecoration: "none", marginBottom: "2rem", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif" }}>
          <ArrowLeft size={14} /> Back to Home
        </Link>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "3rem", fontWeight: 600, marginBottom: "1rem", lineHeight: 1.1 }}>
          Best Hotel Chatbot 2026: Complete Comparison
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.1rem", color: "rgba(245,240,232,0.6)", marginBottom: "3rem", lineHeight: 1.7 }}>
          The definitive guide to hotel chatbots in 2026 — what to look for, what to avoid, and which solution is best for boutique hotels.
        </p>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", lineHeight: 1.9, color: "rgba(245,240,232,0.8)" }}>
          
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>What Makes a Hotel Chatbot Good?</h2>
          <p style={{ marginBottom: "1.5rem" }}>A good hotel chatbot must meet five criteria. First, it must be trained on hotel-specific information — not generic responses. Second, it must support multiple languages automatically. Third, it must know when to escalate to a human rather than guessing. Fourth, it must be designed to drive direct bookings, not just answer questions. Fifth, it must be easy to maintain and improve over time based on real guest conversations.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>The Problem with Most Hotel Chatbots</h2>
          <p style={{ marginBottom: "1.5rem" }}>Most hotel chatbots fail on at least one of these criteria. Generic chatbots fail on the first criterion — they are not trained on hotel-specific information. Script-based chatbots fail on the third criterion — they give predetermined responses rather than understanding natural language. Software-only tools fail on the fifth criterion — they require the hotel to manage training and optimization without expert support.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>NightDesk's AI Receptionist</h2>
          <p style={{ marginBottom: "1.5rem" }}>NightDesk's AI Receptionist meets all five criteria. It is trained on your hotel's specific information. It supports 10+ languages automatically. It has a built-in human escalation pathway. It is designed to capture booking intent and drive direct bookings. And NightDesk manages training and optimization as part of the service — the hotel owner does not need to be a technical expert.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>How NightDesk Compares to Other Hotel Chatbots</h2>
          <p style={{ marginBottom: "1.5rem" }}>Compared to generic chatbot platforms (Intercom, Tidio), NightDesk offers hotel-specific training and hotel-specific expertise. Compared to hotel chatbot software (Asksuite, Quicktext), NightDesk offers full-service management rather than a DIY tool. Compared to custom-built chatbots, NightDesk offers faster setup (2–3 weeks vs. months), lower cost, and ongoing optimization included in the price.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>Pricing and Getting Started</h2>
          <p style={{ marginBottom: "1.5rem" }}>NightDesk's AI Receptionist starts at $600/month for hotels with 10–30 rooms. Setup takes 2–3 weeks. Month-to-month, no long-term contract. 30-day satisfaction guarantee. Book a free 30-minute demo call to see the AI in action and get a custom quote for your hotel.</p>
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
