/* ============================================================
   HERO — Obsidian & Gold Luxury v3
   Full-viewport cinematic hero with hotel lobby background,
   animated live chat card, and premium typography
   ============================================================ */
import { useEffect, useState } from "react";
import { ArrowRight, Star, ChevronDown } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663082783554/QDcYwAv8SHis62JyYiBJro/hero-luxury-v2_016a6f73.jpg";
const ROOM_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663082783554/QDcYwAv8SHis62JyYiBJro/hotel-room-v2_651cbdf0.jpg";

const chatMessages = [
  { from: "guest", text: "Hi! What time is check-in?" },
  { from: "ai", text: "Welcome! Check-in is from 3:00 PM. Early check-in from 1 PM is available — shall I arrange that for you? 🏨" },
  { from: "guest", text: "Yes please! Do you allow pets?" },
  { from: "ai", text: "Absolutely! We're pet-friendly. A $25/night pet fee applies. Your companion is most welcome. 🐾" },
];

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let idx = 0;
    let cancelled = false;
    const showNext = () => {
      if (cancelled) return;
      if (idx >= chatMessages.length) {
        setTimeout(() => { if (!cancelled) { setVisibleMessages(0); idx = 0; setTimeout(showNext, 1000); } }, 4000);
        return;
      }
      const msg = chatMessages[idx];
      if (msg.from === "ai") {
        setIsTyping(true);
        setTimeout(() => {
          if (cancelled) return;
          setIsTyping(false);
          setVisibleMessages(idx + 1);
          idx++;
          setTimeout(showNext, 1600);
        }, 1400);
      } else {
        setVisibleMessages(idx + 1);
        idx++;
        setTimeout(showNext, 1100);
      }
    };
    const t = setTimeout(showNext, 1400);
    return () => { cancelled = true; clearTimeout(t); };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#080810" }}>

      {/* ── Background hotel lobby image ── */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Luxury boutique hotel lobby"
          className="w-full h-full object-cover"
          style={{ opacity: 0.38 }}
          loading="eager"
        />
        {/* Cinematic gradient overlay — heavy on left for text legibility */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(105deg, rgba(8,8,16,0.97) 0%, rgba(8,8,16,0.80) 45%, rgba(8,8,16,0.55) 70%, rgba(8,8,16,0.75) 100%)"
        }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-56" style={{ background: "linear-gradient(to bottom, transparent, #080810)" }} />
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-32" style={{ background: "linear-gradient(to bottom, #080810, transparent)" }} />
      </div>

      {/* ── Ambient gold glow ── */}
      <div className="absolute pointer-events-none" style={{
        top: "20%", left: "5%",
        width: "600px", height: "600px",
        background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 65%)",
        filter: "blur(80px)"
      }} />
      <div className="absolute pointer-events-none" style={{
        bottom: "10%", right: "10%",
        width: "400px", height: "400px",
        background: "radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 65%)",
        filter: "blur(60px)"
      }} />

      <div className="container relative z-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── LEFT — Copy ── */}
          <div>
            {/* Eyebrow badge */}
            <div className={`transition-all duration-800 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <div className="inline-flex items-center gap-2.5 mb-8">
                <div className="gold-line" />
                <span className="section-label">Built by Hospitality Insiders</span>
                <div className="gold-line" style={{ background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
              </div>
            </div>

            {/* Main headline */}
            <div className={`transition-all duration-800 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <h1 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
                fontWeight: 600,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "#F5F0E8",
                marginBottom: "1.5rem"
              }}>
                Your Guests Ask<br />
                Questions at{" "}
                <em className="gold-text" style={{ fontStyle: "italic" }}>2am.</em>
                <br />
                <span style={{ color: "rgba(245,240,232,0.55)", fontWeight: 400 }}>
                  We Have Answers.
                </span>
              </h1>
            </div>

            {/* Subheadline */}
            <div className={`transition-all duration-800 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1.05rem",
                lineHeight: 1.75,
                color: "rgba(245,240,232,0.52)",
                maxWidth: "460px",
                marginBottom: "2.5rem"
              }}>
                HostAI installs a custom AI concierge on your boutique hotel, B&B, or cafe website in{" "}
                <strong style={{ color: "rgba(201,168,76,0.9)", fontWeight: 600 }}>7 days</strong> — answering guest questions, reducing staff workload, and capturing bookings 24/7.
              </p>
            </div>

            {/* Social proof strip */}
            <div className={`flex items-center gap-4 mb-10 transition-all duration-800 delay-350 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#C9A84C" color="#C9A84C" />)}
              </div>
              <div style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.12)" }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "rgba(245,240,232,0.38)" }}>
                Trusted by hospitality owners in 12+ countries
              </span>
            </div>

            {/* CTA buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-800 delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
              <a href="#contact" className="btn-gold">
                Book Your Free Demo <ArrowRight size={14} />
              </a>
              <a href="#how-it-works" className="btn-ghost-gold">
                See How It Works
              </a>
            </div>

            <p className={`mt-5 text-xs transition-all duration-800 delay-500 ${visible ? "opacity-100" : "opacity-0"}`}
              style={{ color: "rgba(245,240,232,0.22)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.04em" }}>
              No tech skills required &nbsp;·&nbsp; Setup in 7 days &nbsp;·&nbsp; Cancel anytime
            </p>
          </div>

          {/* ── RIGHT — Room image + Live Chat card ── */}
          <div className={`flex justify-center lg:justify-end transition-all duration-1000 delay-400 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <div className="relative w-full max-w-[380px]">

              {/* Hotel room image */}
              <div className="float relative">
                <img
                  src={ROOM_IMG}
                  alt="Luxury hotel room with AI chat"
                  className="w-full"
                  style={{
                    borderRadius: "2px",
                    boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,168,76,0.1)",
                    objectFit: "cover",
                    aspectRatio: "3/2"
                  }}
                />
                {/* Subtle gold frame overlay */}
                <div className="absolute inset-0" style={{
                  borderRadius: "2px",
                  boxShadow: "inset 0 0 0 1px rgba(201,168,76,0.08)"
                }} />
              </div>

              {/* Live chat card */}
              <div className="absolute -bottom-10 -left-10 w-[280px] rounded-sm p-4" style={{
                background: "rgba(10,9,18,0.97)",
                border: "1px solid rgba(201,168,76,0.2)",
                backdropFilter: "blur(24px)",
                boxShadow: "0 24px 70px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.05)"
              }}>
                {/* Chat header */}
                <div className="flex items-center gap-2.5 mb-3 pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="w-8 h-8 rounded-sm flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #B8922E, #E8C96A)", color: "#0A0806", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}>
                    H
                  </div>
                  <div>
                    <div className="text-xs font-semibold" style={{ color: "#F5F0E8", fontFamily: "'DM Sans', sans-serif" }}>AI Concierge</div>
                    <div className="flex items-center gap-1.5">
                      <div className="pulse-dot" />
                      <span className="text-xs" style={{ color: "rgba(74,222,128,0.8)", fontFamily: "'DM Sans', sans-serif" }}>Online 24/7</span>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex flex-col gap-2 min-h-[100px]">
                  {chatMessages.slice(0, visibleMessages).map((msg, i) => (
                    <div key={i} className={msg.from === "ai" ? "chat-bubble-ai" : "chat-bubble-user"}
                      style={{ animation: "fadeInUp 0.3s ease" }}>
                      {msg.text}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="chat-bubble-ai flex items-center gap-1" style={{ padding: "10px 13px" }}>
                      <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
                    </div>
                  )}
                </div>
              </div>

              {/* Top-right stat badge */}
              <div className="absolute -top-5 -right-5 px-4 py-3 text-center rounded-sm" style={{
                background: "rgba(10,9,18,0.97)",
                border: "1px solid rgba(201,168,76,0.25)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.4)"
              }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 600, color: "#C9A84C", lineHeight: 1 }}>24/7</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "rgba(245,240,232,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "2px" }}>Always On</div>
              </div>

              {/* Bottom-right mini badge */}
              <div className="absolute -bottom-3 -right-3 flex items-center gap-2 px-3 py-2 rounded-sm" style={{
                background: "rgba(10,9,18,0.97)",
                border: "1px solid rgba(201,168,76,0.15)",
                backdropFilter: "blur(20px)"
              }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ADE80", boxShadow: "0 0 8px rgba(74,222,128,0.6)" }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "rgba(245,240,232,0.5)", letterSpacing: "0.08em" }}>LIVE DEMO</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="flex justify-center mt-24">
          <a href="#trust" className="flex flex-col items-center gap-2 group" style={{ color: "rgba(201,168,76,0.4)", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "rgba(201,168,76,0.75)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(201,168,76,0.4)"}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Scroll</span>
            <ChevronDown size={14} className="animate-bounce" />
          </a>
        </div>
      </div>

      <style>{`@keyframes fadeInUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </section>
  );
}
