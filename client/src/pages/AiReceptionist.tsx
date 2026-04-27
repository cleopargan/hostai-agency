import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, MessageSquare, Globe, Clock, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactCTA from "@/components/ContactCTA";

export default function AiReceptionist() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const features = [
    { icon: Clock, title: "24/7 Availability", desc: "Answers guest questions at any hour, including 2 AM when OTAs win most bookings." },
    { icon: Globe, title: "10+ Languages", desc: "Automatically detects and responds in the guest's language. No extra cost." },
    { icon: MessageSquare, title: "Hotel-Specific Training", desc: "Trained on your exact rooms, policies, and local area — not generic hotel info." },
    { icon: Shield, title: "Human Escalation", desc: "Knows when to hand off to a human. Never guesses on sensitive questions." },
  ];
  return (
    <div className="min-h-screen" style={{ background: "#0A0A0F", color: "#F5F0E8" }}>
      <Navbar />
      <div style={{ paddingTop: "8rem", paddingBottom: "4rem", maxWidth: "800px", margin: "0 auto", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(245,240,232,0.45)", textDecoration: "none", marginBottom: "2rem", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif" }}>
          <ArrowLeft size={14} /> Back to Home
        </Link>
        <div style={{ marginBottom: "1rem" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#C9A84C", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Service</span>
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "3.5rem", fontWeight: 600, marginBottom: "1rem", lineHeight: 1.1 }}>
          AI Receptionist for Hotels
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.1rem", color: "rgba(245,240,232,0.6)", marginBottom: "3rem", lineHeight: 1.7 }}>
          A custom AI chatbot trained on your hotel, answering guest questions 24/7 in 10+ languages. From $600/month.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "3rem" }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", padding: "1.25rem" }}>
              <f.icon size={20} color="#C9A84C" style={{ marginBottom: "0.75rem" }} />
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "0.4rem" }}>{}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "rgba(245,240,232,0.6)", lineHeight: 1.6 }}>{}</div>
            </div>
          ))}
        </div>

        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", lineHeight: 1.9, color: "rgba(245,240,232,0.8)" }}>
          
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>What is NightDesk's AI Receptionist?</h2>
          <p style={{ marginBottom: "1.5rem" }}>NightDesk's AI Receptionist is a custom chatbot trained on your hotel's specific information and embedded on your website. It answers guest questions instantly, 24 hours a day, 7 days a week, in 10+ languages. Unlike generic chatbots, it knows your exact room types, your specific policies, your local area, and your pricing — so it gives accurate, helpful answers that convert inquiries into direct bookings.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>What It Does</h2>
          <p style={{ marginBottom: "1.5rem" }}>The AI Receptionist handles the most common pre-booking questions: room availability, pricing, policies, check-in times, parking, breakfast, local recommendations, and more. It detects the guest's language automatically and responds in kind. When a question falls outside its knowledge, it escalates to a human staff member rather than guessing. Every conversation is logged and reviewed weekly so the knowledge base improves continuously.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>How It Reduces OTA Dependency</h2>
          <p style={{ marginBottom: "1.5rem" }}>The single biggest reason guests book through OTAs instead of directly is unanswered questions. When a potential guest visits your website at 2 AM and cannot get an answer to a simple question, they go to Booking.com — where all the information is already listed. The AI Receptionist eliminates this gap entirely. Hotels using NightDesk's AI Receptionist see an 80% reduction in unanswered guest inquiries and 3–5 additional direct bookings per month within the first 60 days.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>Pricing</h2>
          <p style={{ marginBottom: "1.5rem" }}>The AI Receptionist service is priced based on hotel size: $600/month for hotels with 10–30 rooms, $800/month for 30–80 rooms, and $1,000/month for 80–150 rooms. Setup is included. Month-to-month, no long-term contract. 30-day satisfaction guarantee.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>Setup Timeline</h2>
          <p style={{ marginBottom: "1.5rem" }}>Setup takes 2–3 weeks. Week 1: NightDesk collects all hotel information. Week 2: The AI is trained and tested. Week 3: Launch and initial optimization. After launch, the AI improves continuously based on real guest conversations.</p>
          <div style={{ marginTop: "3rem", padding: "2rem", background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "12px", textAlign: "center" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.75rem", fontWeight: 600, marginBottom: "1rem" }}>Get Your AI Receptionist</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "rgba(245,240,232,0.7)", marginBottom: "1.5rem" }}>Book a free 30-minute call to see a live demo and get a custom quote for your hotel.</p>
            <a href="https://calendly.com/hello-nightdesk/30min" target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ padding: "0.75rem 1.75rem", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              Get Free Hotel Audit <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
      <ContactCTA />
    </div>
  );
}
