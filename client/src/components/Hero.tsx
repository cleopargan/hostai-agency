/* Design: Midnight Gold — cinematic full-viewport hero, animated live chat, gold CTAs */
import { useEffect, useState } from "react";
import { ArrowRight, Star, ChevronDown } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663082783554/QDcYwAv8SHis62JyYiBJro/hero-main-Nu7QTaZrK4Z2sdYGQwyjMs.webp";
const PHONE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663082783554/QDcYwAv8SHis62JyYiBJro/phone-chat-WibJqHwgnsRNQZhq7Jykua.webp";

const chatMessages = [
  { from: "guest", text: "Hi! What time is check-in?" },
  { from: "ai", text: "Welcome! Check-in is from 3:00 PM. Early check-in available from 1 PM — shall I arrange that? 🏨" },
  { from: "guest", text: "Yes please! Do you allow pets?" },
  { from: "ai", text: "Absolutely! We're pet-friendly. A $25/night pet fee applies. Your furry friend is welcome! 🐾" },
];

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let idx = 0;
    let cancelled = false;

    const showNext = () => {
      if (cancelled) return;
      if (idx >= chatMessages.length) {
        setTimeout(() => {
          if (!cancelled) { setVisibleMessages(0); idx = 0; setTimeout(showNext, 800); }
        }, 3500);
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
          setTimeout(showNext, 1400);
        }, 1300);
      } else {
        setVisibleMessages(idx + 1);
        idx++;
        setTimeout(showNext, 1000);
      }
    };

    const t = setTimeout(showNext, 1200);
    return () => { cancelled = true; clearTimeout(t); };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#0A0A0F" }}>
      {/* Background */}
      <div className="absolute inset-0">
        <img src={HERO_IMG} alt="Luxury boutique hotel" className="w-full h-full object-cover" style={{ opacity: 0.32 }} loading="eager" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(120deg, rgba(10,10,15,0.97) 0%, rgba(10,10,15,0.65) 55%, rgba(10,10,15,0.88) 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-48" style={{ background: "linear-gradient(to bottom, transparent, #0A0A0F)" }} />
      </div>

      {/* Gold glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="container relative z-10 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — Copy */}
          <div>
            {/* Badge */}
            <div className={`transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-6" style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", color: "#C9A84C", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em" }}>
                <div className="pulse-dot" style={{ width: 6, height: 6 }} />
                BUILT BY HOSPITALITY INSIDERS
              </span>
            </div>

            {/* Headline */}
            <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
              <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold leading-[1.1] mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "#F0EDE6" }}>
                Your Guests Have<br />
                Questions at{" "}
                <span className="gold-text italic">2am.</span>
                <br />
                <span style={{ color: "rgba(240,237,230,0.65)" }}>We Have Answers.</span>
              </h1>
            </div>

            {/* Sub */}
            <div className={`transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: "rgba(240,237,230,0.58)", fontFamily: "'DM Sans', sans-serif", maxWidth: "480px" }}>
                HostAI installs a custom AI concierge on your boutique hotel, B&B, or cafe website in{" "}
                <strong style={{ color: "#C9A84C" }}>7 days</strong> — answering guest questions, reducing staff workload, and capturing bookings 24/7.
              </p>
            </div>

            {/* Stars */}
            <div className={`flex items-center gap-3 mb-8 transition-all duration-700 delay-350 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
              <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} size={13} fill="#C9A84C" color="#C9A84C" />)}</div>
              <span className="text-sm" style={{ color: "rgba(240,237,230,0.45)", fontFamily: "'DM Sans', sans-serif" }}>
                Trusted by hospitality owners in 12+ countries
              </span>
            </div>

            {/* CTAs */}
            <div className={`flex flex-col sm:flex-row gap-3 transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
              <a href="#contact" className="btn-gold px-7 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
                Book Your Free Demo <ArrowRight size={15} />
              </a>
              <a href="#how-it-works" className="btn-ghost-gold px-7 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center">
                See How It Works
              </a>
            </div>

            <p className={`mt-4 text-xs transition-all duration-700 delay-500 ${visible ? "opacity-100" : "opacity-0"}`} style={{ color: "rgba(240,237,230,0.3)", fontFamily: "'DM Sans', sans-serif" }}>
              No tech skills needed · Setup in 7 days · Cancel anytime
            </p>
          </div>

          {/* Right — Phone + Live Chat */}
          <div className={`flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            <div className="relative w-full max-w-[340px]">
              {/* Phone */}
              <div className="float">
                <img src={PHONE_IMG} alt="AI concierge chat interface" className="w-full rounded-2xl" style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(201,168,76,0.12)" }} />
              </div>

              {/* Live chat card */}
              <div className="absolute -bottom-8 -left-8 w-72 rounded-2xl p-4" style={{ background: "rgba(14,14,22,0.97)", border: "1px solid rgba(201,168,76,0.22)", backdropFilter: "blur(20px)", boxShadow: "0 20px 60px rgba(0,0,0,0.55)" }}>
                {/* Header */}
                <div className="flex items-center gap-2.5 mb-3 pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "linear-gradient(135deg, #C9A84C, #E8C96A)", color: "#0A0A0F", fontFamily: "'Playfair Display', serif" }}>H</div>
                  <div>
                    <div className="text-xs font-semibold" style={{ color: "#F0EDE6", fontFamily: "'DM Sans', sans-serif" }}>AI Concierge</div>
                    <div className="flex items-center gap-1">
                      <div className="pulse-dot" style={{ width: 5, height: 5 }} />
                      <span className="text-xs" style={{ color: "rgba(74,222,128,0.85)", fontFamily: "'DM Sans', sans-serif" }}>Online 24/7</span>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex flex-col gap-2 min-h-[110px]">
                  {chatMessages.slice(0, visibleMessages).map((msg, i) => (
                    <div key={i} className={msg.from === "ai" ? "chat-bubble-ai" : "chat-bubble-user"} style={{ animation: "fadeInUp 0.3s ease", fontSize: "0.72rem", padding: "7px 11px" }}>
                      {msg.text}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="chat-bubble-ai flex items-center gap-1" style={{ padding: "9px 13px" }}>
                      <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
                    </div>
                  )}
                </div>
              </div>

              {/* Stat badge */}
              <div className="absolute -top-4 -right-4 px-3 py-2 rounded-xl text-center" style={{ background: "rgba(14,14,22,0.97)", border: "1px solid rgba(201,168,76,0.28)", backdropFilter: "blur(20px)" }}>
                <div className="text-xl font-bold" style={{ color: "#C9A84C", fontFamily: "'Playfair Display', serif" }}>24/7</div>
                <div className="text-xs" style={{ color: "rgba(240,237,230,0.45)", fontFamily: "'DM Sans', sans-serif" }}>Always On</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="flex justify-center mt-20">
          <a href="#problem" className="flex flex-col items-center gap-2 opacity-30 hover:opacity-60 transition-opacity" style={{ color: "#C9A84C" }}>
            <span className="text-xs" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em" }}>SCROLL</span>
            <ChevronDown size={15} className="animate-bounce" />
          </a>
        </div>
      </div>

      <style>{`@keyframes fadeInUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </section>
  );
}
