import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactCTA from "@/components/ContactCTA";

export default function WhatIsAiReceptionistForHotels() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen" style={{ background: "#0A0A0F", color: "#F5F0E8" }}>
      <Navbar />
      <div style={{ paddingTop: "8rem", paddingBottom: "4rem", maxWidth: "760px", margin: "0 auto", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(245,240,232,0.45)", textDecoration: "none", marginBottom: "2rem", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif" }}>
          <ArrowLeft size={14} /> Back to Blog
        </Link>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.5rem" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "#C9A84C", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>AI Technology</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "rgba(245,240,232,0.35)" }}>April 2026 · 8 min read</span>
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "3rem", fontWeight: 600, marginBottom: "1.5rem", lineHeight: 1.1 }}>
          What is an AI Receptionist for Hotels? Complete Guide 2026
        </h1>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", lineHeight: 1.9, color: "rgba(245,240,232,0.8)" }}>
          <p style={{ marginBottom: "1.5rem" }}>An AI receptionist for hotels is a chatbot powered by a large language model (LLM) that is trained on your specific hotel's information and embedded on your website. Unlike generic chatbots that give scripted, predetermined responses, a hotel AI receptionist understands natural language, knows your specific property, and can answer the full range of questions that potential guests ask before booking.</p>
          <p style={{ marginBottom: "1.5rem" }}>The concept is simple: instead of a guest having to wait for a human to answer their question, the AI answers it instantly — at any hour, in any language, with accurate information about your specific hotel. This eliminates the most common reason guests book through OTAs instead of directly.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>How a Hotel AI Receptionist Works</h2>
          <p style={{ marginBottom: "1.5rem" }}>A hotel AI receptionist works in three stages. First, it is trained on your hotel's information: room types and descriptions, pricing and availability policies, check-in and check-out procedures, breakfast and dining options, parking and transportation, local area recommendations, cancellation and refund policies, and any other information that guests commonly ask about.</p>
          <p style={{ marginBottom: "1.5rem" }}>Second, it is embedded on your hotel website as a chat widget. When a guest visits your website and has a question, they click the chat widget and type their question in natural language — exactly as they would text a friend.</p>
          <p style={{ marginBottom: "1.5rem" }}>Third, the AI processes the question, retrieves the relevant information from its training data, and responds in natural language. The response is accurate (because it is based on your hotel's actual information), immediate (because AI does not sleep), and in the guest's language (because modern LLMs are multilingual).</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>What Questions Can a Hotel AI Receptionist Answer?</h2>
          <p style={{ marginBottom: "1.5rem" }}>A well-trained hotel AI receptionist can answer virtually any pre-booking question. Common categories include room and availability questions ("Do you have a room with a sea view?"), policy questions ("What is your cancellation policy?"), facilities questions ("Do you have a gym?"), local area questions ("How far are you from the airport?"), and booking questions ("Is the price on your website the same as on Booking.com?").</p>
          <p style={{ marginBottom: "1.5rem" }}>The AI also handles follow-up questions naturally. If a guest asks "Do you have parking?" and the AI says yes, the guest can immediately ask "How much does it cost?" and "Do I need to reserve in advance?" — and the AI handles the full conversation thread, not just isolated questions.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>What a Hotel AI Receptionist Cannot Do</h2>
          <p style={{ marginBottom: "1.5rem" }}>A hotel AI receptionist is not a replacement for all human interaction. It cannot process payments, make reservations in your booking system, or handle complex complaints that require human judgment and empathy. When a question falls outside its knowledge base or requires human intervention, a well-designed AI receptionist escalates to a human staff member rather than guessing.</p>
          <p style={{ marginBottom: "1.5rem" }}>This escalation pathway is critical. The worst outcome is an AI that gives wrong information confidently. A good hotel AI receptionist knows the limits of its knowledge and is transparent about them.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>Multi-Language Support</h2>
          <p style={{ marginBottom: "1.5rem" }}>One of the most powerful features of a modern hotel AI receptionist is automatic multi-language support. NightDesk's AI Receptionist detects the language the guest is writing in and responds in the same language — English, French, Spanish, German, Italian, Portuguese, Dutch, Arabic, Japanese, Chinese, and more. This is particularly valuable for hotels in tourist destinations that receive guests from multiple countries.</p>
          <p style={{ marginBottom: "1.5rem" }}>Previously, providing multi-language support required hiring multilingual staff or using translation services. With an AI receptionist, every hotel can provide instant, accurate responses in 10+ languages at no additional cost.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>How NightDesk's AI Receptionist is Different</h2>
          <p style={{ marginBottom: "1.5rem" }}>NightDesk's AI Receptionist is powered by Claude AI (Anthropic), one of the most capable and safe large language models available. It is trained specifically on your hotel's information — not generic hotel data — which means it gives accurate, specific answers rather than generic responses.</p>
          <p style={{ marginBottom: "1.5rem" }}>More importantly, NightDesk is a full-service agency, not just software. NightDesk handles the entire setup process: collecting your hotel's information, training the AI, testing it, embedding it on your website, and optimizing it based on real guest conversations. You do not need any technical expertise. NightDesk does it for you.</p>
          <p style={{ marginBottom: "1.5rem" }}>NightDesk's AI Receptionist starts at $600/month for hotels with 10–30 rooms. Setup takes 2–3 weeks. Month-to-month, no long-term contract. 30-day satisfaction guarantee.</p>
          <div style={{ marginTop: "3rem", padding: "2rem", background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "12px", textAlign: "center" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.75rem", fontWeight: 600, marginBottom: "1rem" }}>See the AI Receptionist in Action</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "rgba(245,240,232,0.7)", marginBottom: "1.5rem" }}>Book a free 30-minute demo call to see NightDesk's AI Receptionist live and get a custom quote for your hotel.</p>
            <a href="https://calendly.com/hello-nightdesk/30min" target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ padding: "0.75rem 1.75rem", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              Book Free Demo Call <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
      <ContactCTA />
    </div>
  );
}
