import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactCTA from "@/components/ContactCTA";

export default function About() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen" style={{ background: "#0A0A0F", color: "#F5F0E8" }}>
      <Navbar />
      <div style={{ paddingTop: "8rem", paddingBottom: "4rem", maxWidth: "800px", margin: "0 auto", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(245,240,232,0.45)", textDecoration: "none", marginBottom: "2rem", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif" }}>
          <ArrowLeft size={14} /> Back to Home
        </Link>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "3rem", fontWeight: 600, marginBottom: "1rem", lineHeight: 1.1 }}>
          About NightDesk
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.1rem", color: "rgba(245,240,232,0.6)", marginBottom: "3rem", lineHeight: 1.7 }}>
          NightDesk is a hotel AI agency founded in 2026 to help boutique hotels and independent properties reduce OTA dependency and build sustainable direct booking channels.
        </p>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", lineHeight: 1.9, color: "rgba(245,240,232,0.8)" }}>
          
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>Our Mission</h2>
          <p style={{ marginBottom: "1.5rem" }}>NightDesk's mission is to give independent hotels the same technology and marketing capabilities that large hotel chains have — at a price that makes sense for a 30-room boutique property. We believe that independent hotels offer something that chains cannot: authenticity, character, and a genuine connection to their location. Our job is to make sure those hotels are financially sustainable so they can keep doing what they do best.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>The Problem We Solve</h2>
          <p style={{ marginBottom: "1.5rem" }}>Independent hotels lose 15–22% of their revenue to OTA commissions every month. For many boutique properties, this is the difference between profitability and breaking even. The root cause is simple: hotels cannot answer guest questions at 2 AM, so guests book through OTAs instead. NightDesk solves this with AI technology, hotel-specific Google Ads, and direct booking optimization — all managed by our team, with no technical expertise required from the hotel.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>How We Work</h2>
          <p style={{ marginBottom: "1.5rem" }}>NightDesk works exclusively with hotels. We do not serve restaurants, retail businesses, or other industries. This focus means our team understands hotel revenue management, OTA dynamics, and guest booking behavior at a depth that generalist agencies cannot match. Every service we offer is designed specifically for the hotel industry.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>Our Technology</h2>
          <p style={{ marginBottom: "1.5rem" }}>NightDesk's AI Receptionist is powered by Claude AI (Anthropic), one of the most capable and safe large language models available. Our Google Ads campaigns are managed by specialists with deep hotel industry experience. Our direct booking optimization methodology is based on conversion rate optimization best practices applied specifically to hotel booking flows.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>Get in Touch</h2>
          <p style={{ marginBottom: "1.5rem" }}>NightDesk serves hotels worldwide. All services are delivered remotely — we do not need to visit your property. To get started, book a free 30-minute discovery call or submit the contact form. We respond within 24 hours and provide a free hotel audit within 48 hours of our first call.</p>
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
