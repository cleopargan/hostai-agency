import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  MessageSquare, Clock, Globe, Shield, Zap, TrendingUp,
  ArrowRight, CheckCircle2, Star, ChevronDown, Loader2, Send,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import MarketingNavbar from "@/components/MarketingNavbar";
import FloatingChat from "@/components/FloatingChat";

// ── Data ────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: Clock, color: "#C9A84C",
    bg: "rgba(201,168,76,0.08)", border: "rgba(201,168,76,0.18)",
    title: "24/7 Availability",
    desc: "Answers guest questions at any hour — including 2 AM when OTAs win most bookings. Never sleeps, never misses a lead.",
  },
  {
    icon: Globe, color: "#4A90E2",
    bg: "rgba(74,144,226,0.08)", border: "rgba(74,144,226,0.18)",
    title: "10+ Languages",
    desc: "Automatically detects the guest's language and responds in kind. French, Arabic, Spanish, German — no extra cost.",
  },
  {
    icon: MessageSquare, color: "#7B5EA7",
    bg: "rgba(123,94,167,0.08)", border: "rgba(123,94,167,0.18)",
    title: "Hotel-Specific Training",
    desc: "Trained on your exact rooms, policies, and local area. Not generic hotel info — your hotel's actual answers.",
  },
  {
    icon: Shield, color: "#6EE7B7",
    bg: "rgba(110,231,183,0.08)", border: "rgba(110,231,183,0.18)",
    title: "Safe Escalation",
    desc: "Knows when to hand off to a human. Never guesses on sensitive questions like special needs or complaints.",
  },
  {
    icon: Zap, color: "#00B4D8",
    bg: "rgba(0,180,216,0.08)", border: "rgba(0,180,216,0.18)",
    title: "Instant Responses",
    desc: "Replies in under 2 seconds, every time. No hold music, no wait — the way modern guests expect.",
  },
  {
    icon: TrendingUp, color: "#C9A84C",
    bg: "rgba(201,168,76,0.08)", border: "rgba(201,168,76,0.18)",
    title: "Booking Conversion",
    desc: "Pushes guests toward your direct booking link at the right moment — not toward Booking.com.",
  },
];

const steps = [
  {
    number: "01", duration: "Week 1",
    title: "We Train It On Your Hotel",
    desc: "We gather your room types, policies, F&B details, local area info, pricing, and FAQs. Everything a guest might ask — we feed it into the AI.",
  },
  {
    number: "02", duration: "Week 2",
    title: "We Build & Test It",
    desc: "Your custom AI is trained, tested with 100+ real guest question scenarios, and refined until it answers accurately and naturally.",
  },
  {
    number: "03", duration: "Week 3",
    title: "We Launch It Live",
    desc: "A small snippet goes on your website — that's it. The AI goes live, we monitor the first conversations, and optimise weekly.",
  },
];

const pricingTiers = [
  {
    size: "Small", rooms: "10–30 rooms", price: "$600",
    color: "#4A90E2", border: "rgba(74,144,226,0.2)", hoverBorder: "rgba(74,144,226,0.45)",
    features: [
      "AI trained on your hotel", "24/7 guest chat on your website",
      "10+ language support", "Monthly knowledge base updates",
      "Weekly conversation review", "Human escalation built-in",
    ],
  },
  {
    size: "Mid", rooms: "30–80 rooms", price: "$800", popular: true,
    color: "#C9A84C", border: "rgba(201,168,76,0.25)", hoverBorder: "rgba(201,168,76,0.55)",
    features: [
      "Everything in Small", "WhatsApp integration",
      "Pre-arrival message automation", "Review request sequences",
      "Bi-weekly optimisation calls", "Priority support",
    ],
  },
  {
    size: "Large", rooms: "80–150 rooms", price: "$1,000",
    color: "#6EE7B7", border: "rgba(110,231,183,0.2)", hoverBorder: "rgba(110,231,183,0.45)",
    features: [
      "Everything in Mid", "Multi-property support",
      "Custom API integrations", "Full Digital Concierge suite",
      "Dedicated account manager", "Monthly strategy report",
    ],
  },
];

const stats = [
  { value: "80%", label: "Fewer Unanswered Inquiries", sub: "within first 60 days" },
  { value: "3–5×", label: "More Direct Bookings", sub: "per month vs. before" },
  { value: "2s", label: "Average Response Time", sub: "any hour, any language" },
  { value: "94%", label: "Guest Satisfaction", sub: "with AI responses" },
];

const HOTEL = {
  hotelName: "The Grand Maison", hotelCity: "Paris",
  checkInTime: "3:00 PM", checkOutTime: "11:00 AM",
  currency: "€", startingRate: "185",
};

const QUICK_REPLIES = ["Check-in time?", "Is parking free?", "Breakfast included?", "Pet policy?"];

// ── Embedded Chat ────────────────────────────────────────────────────────────

interface Msg { from: "guest" | "bot"; text: string; }

function EmbeddedChat() {
  const [messages, setMessages] = useState<Msg[]>([{
    from: "bot",
    text: "Welcome to The Grand Maison! I'm your AI concierge — here 24/7 to help. Ask me anything about your stay. 🏨",
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);
  const mutation = trpc.concierge.chat.useMutation();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    setInput("");
    setShowQuick(false);
    setLoading(true);
    const updated: Msg[] = [...messages, { from: "guest", text: msg }];
    setMessages(updated);
    const history = updated.slice(1).map(m => ({
      role: m.from === "guest" ? ("user" as const) : ("assistant" as const),
      content: m.text,
    }));
    try {
      const res = await mutation.mutateAsync({ messages: history, ...HOTEL });
      setMessages(prev => [...prev, { from: "bot", text: res.reply }]);
    } catch {
      setMessages(prev => [...prev, { from: "bot", text: "Brief interruption — please try again. 🙏" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{
        padding: "1rem", height: "320px", overflowY: "auto",
        display: "flex", flexDirection: "column", gap: "0.625rem",
        scrollbarWidth: "thin", scrollbarColor: "rgba(201,168,76,0.15) transparent",
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{ alignSelf: m.from === "bot" ? "flex-start" : "flex-end", maxWidth: "85%" }}>
            <div style={{
              padding: "0.625rem 0.875rem",
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", lineHeight: 1.6,
              background: m.from === "bot" ? "rgba(255,255,255,0.04)" : "linear-gradient(135deg, #C9A84C, #E8C96A)",
              color: m.from === "bot" ? "rgba(245,240,232,0.72)" : "#0A0806",
              border: m.from === "bot" ? "1px solid rgba(255,255,255,0.06)" : "none",
              fontWeight: m.from === "guest" ? 500 : 400,
              whiteSpace: "pre-wrap",
            }}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ alignSelf: "flex-start" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              padding: "0.625rem 0.875rem",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <Loader2 size={11} style={{ color: "rgba(201,168,76,0.6)", animation: "spin 1s linear infinite" }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "rgba(245,240,232,0.35)" }}>
                Responding…
              </span>
            </div>
          </div>
        )}
        {showQuick && messages.length === 1 && !loading && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.25rem" }}>
            {QUICK_REPLIES.map(q => (
              <button key={q} onClick={() => send(q)} style={{
                padding: "0.3rem 0.65rem",
                background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.2)",
                color: "rgba(201,168,76,0.8)", fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem", cursor: "pointer",
              }}>
                {q}
              </button>
            ))}
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div style={{
        padding: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.05)",
        display: "flex", gap: "0.5rem", alignItems: "center",
        background: "rgba(255,255,255,0.01)",
      }}>
        <input
          type="text" value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !loading && send()}
          placeholder="Ask about rooms, check-in, breakfast…"
          disabled={loading}
          style={{
            flex: 1, background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            padding: "0.625rem 0.875rem", color: "#F5F0E8",
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", outline: "none",
            opacity: loading ? 0.5 : 1,
          }}
        />
        <button
          onClick={() => send()}
          disabled={loading || !input.trim()}
          style={{
            width: "2.5rem", height: "2.5rem", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: loading || !input.trim() ? "rgba(201,168,76,0.2)" : "linear-gradient(135deg, #C9A84C, #E8C96A)",
            border: "none", cursor: loading || !input.trim() ? "not-allowed" : "pointer",
          }}
        >
          {loading
            ? <Loader2 size={13} style={{ color: "#0A0806", animation: "spin 1s linear infinite" }} />
            : <Send size={13} style={{ color: "#0A0806" }} />}
        </button>
      </div>

      <div style={{
        padding: "0.5rem 0.75rem", borderTop: "1px solid rgba(255,255,255,0.03)",
        textAlign: "center", background: "rgba(255,255,255,0.01)",
      }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "rgba(245,240,232,0.18)", letterSpacing: "0.06em" }}>
          Powered by <strong style={{ color: "rgba(201,168,76,0.35)" }}>NightDesk AI</strong> · Live model
        </span>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function AiReceptionist() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#080810", color: "#F5F0E8" }}>
      <MarketingNavbar />

      {/* Hero */}
      <section style={{ background: "#080810", minHeight: "90vh", paddingTop: "9rem", paddingBottom: "5rem", position: "relative", overflow: "hidden" }}>
        <div className="absolute pointer-events-none" style={{ top: "10%", left: "-5%", width: "700px", height: "700px", background: "radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 60%)", filter: "blur(80px)" }} />
        <div className="absolute pointer-events-none" style={{ top: "30%", right: "0%", width: "500px", height: "500px", background: "radial-gradient(ellipse, rgba(110,231,183,0.05) 0%, transparent 60%)", filter: "blur(80px)" }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.18), transparent)" }} />

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left */}
            <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(245,240,232,0.35)", textDecoration: "none", marginBottom: "2rem", fontSize: "0.75rem", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.06em" }}>
                ← Back to Home
              </Link>

              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.75rem", padding: "0.35rem 0.9rem", background: "rgba(110,231,183,0.06)", border: "1px solid rgba(110,231,183,0.18)" }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4ade80", display: "block" }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(110,231,183,0.8)" }}>
                  Live AI — Demo on the Right
                </span>
              </div>

              <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.6rem, 5vw, 4rem)", fontWeight: 600, lineHeight: 1.06, letterSpacing: "-0.02em", color: "#F5F0E8", marginBottom: "1.5rem" }}>
                Your Hotel's{" "}
                <em style={{ fontStyle: "italic", background: "linear-gradient(90deg, #BFA06A, #E8C96A, #C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  AI Receptionist.
                </em>
                <br />On. All Night.
              </h1>

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", lineHeight: 1.78, color: "rgba(245,240,232,0.52)", marginBottom: "0.875rem", maxWidth: "520px" }}>
                A custom AI chatbot trained on your exact hotel — answering guest questions 24/7 in 10+ languages, converting inquiries into{" "}
                <strong style={{ color: "rgba(245,240,232,0.75)" }}>direct bookings</strong>.
              </p>

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", lineHeight: 1.65, color: "rgba(245,240,232,0.36)", marginBottom: "2.5rem", maxWidth: "480px" }}>
                The biggest reason guests book via OTAs is unanswered questions. We eliminate that gap — every inquiry, every hour.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginBottom: "2.5rem" }}>
                {[{ value: "80%", label: "Fewer missed inquiries" }, { value: "24/7", label: "Always online" }, { value: "10+", label: "Languages" }].map(s => (
                  <div key={s.label}>
                    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.75rem", fontWeight: 600, background: "linear-gradient(135deg, #C9A84C, #E8C96A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "rgba(245,240,232,0.38)", marginTop: "2px" }}>{s.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem" }}>
                <a href="#pricing" className="btn-gold" style={{ padding: "0.875rem 2rem", fontSize: "0.8rem" }}>
                  See Pricing <ArrowRight size={14} />
                </a>
                <a href="https://calendly.com/hello-nightdesk/30min" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ padding: "0.875rem 1.75rem", fontSize: "0.8rem" }}>
                  Book a Demo
                </a>
              </div>

              <p style={{ marginTop: "1.25rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "rgba(245,240,232,0.22)", letterSpacing: "0.04em" }}>
                From $600/month · Setup included · Cancel anytime
              </p>
            </div>

            {/* Right — Live demo */}
            <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`} style={{ transitionDelay: "200ms" }}>
              <div style={{ padding: "0.75rem 1.25rem", background: "rgba(10,9,20,0.95)", border: "1px solid rgba(201,168,76,0.18)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(201,168,76,0.65)" }}>
                  Live Demo — Chat with our AI Receptionist
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", display: "block" }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "rgba(74,222,128,0.7)" }}>Live AI</span>
                </div>
              </div>
              <div style={{ background: "rgba(8,8,16,0.99)", border: "1px solid rgba(201,168,76,0.14)", borderTop: "none", boxShadow: "0 40px 100px rgba(0,0,0,0.6)" }}>
                <EmbeddedChat />
              </div>
              <p style={{ marginTop: "0.875rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "rgba(245,240,232,0.22)", textAlign: "center" }}>
                This is the actual AI — not a simulation. Ask anything about the hotel.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2" style={{ transform: "translateX(-50%)", animation: "float 3s ease-in-out infinite" }}>
          <ChevronDown size={18} style={{ color: "rgba(201,168,76,0.4)" }} />
        </div>
      </section>

      {/* Features */}
      <section style={{ background: "#06060e", padding: "6rem 0 7rem", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span className="section-label" style={{ display: "inline-flex", marginBottom: "1.25rem" }}>Capabilities</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.015em", color: "#F5F0E8" }}>
              Everything a Front Desk Does.{" "}
              <em style={{ fontStyle: "italic", background: "linear-gradient(90deg, #BFA06A, #E8C96A, #C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>At 3 AM.</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(f => {
              const Icon = f.icon;
              return (
                <div key={f.title} style={{ padding: "1.75rem", background: f.bg, border: `1px solid ${f.border}`, position: "relative", overflow: "hidden", transition: "border-color 0.3s ease, box-shadow 0.3s ease" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = f.color; (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 60px rgba(0,0,0,0.3)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = f.border; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${f.color}, transparent)`, opacity: 0.6 }} />
                  <div style={{ width: "2.75rem", height: "2.75rem", display: "flex", alignItems: "center", justifyContent: "center", background: f.bg, border: `1px solid ${f.border}`, marginBottom: "1.25rem" }}>
                    <Icon size={16} style={{ color: f.color }} />
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.35rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "0.625rem", lineHeight: 1.2 }}>{f.title}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", lineHeight: 1.7, color: "rgba(245,240,232,0.48)" }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ background: "#080810", padding: "6rem 0 7rem", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span className="section-label" style={{ display: "inline-flex", marginBottom: "1.25rem" }}>Setup Process</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.015em", color: "#F5F0E8" }}>
              Live in <em style={{ fontStyle: "italic", background: "linear-gradient(90deg, #BFA06A, #E8C96A, #C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>3 Weeks.</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map(step => (
              <div key={step.number} style={{ padding: "2rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", position: "relative" }}>
                <div style={{ position: "absolute", top: "0.75rem", right: "1rem", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "4rem", fontWeight: 700, lineHeight: 1, color: "rgba(255,255,255,0.03)", userSelect: "none" }}>{step.number}</div>
                <div style={{ display: "inline-flex", marginBottom: "1rem", padding: "0.2rem 0.625rem", background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.12)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(201,168,76,0.6)" }}>{step.duration}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.4rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "0.75rem", lineHeight: 1.2 }}>{step.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", lineHeight: 1.72, color: "rgba(245,240,232,0.42)" }}>{step.desc}</p>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, rgba(201,168,76,0.4), transparent)" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "#06060e", padding: "5rem 0", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "1px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.05)" }}>
            {stats.map(s => (
              <div key={s.label} style={{ padding: "2rem 1.75rem", background: "#06060e", textAlign: "center" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 600, color: "#C9A84C", lineHeight: 1, marginBottom: "0.5rem" }}>{s.value}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "0.3rem" }}>{s.label}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "rgba(245,240,232,0.3)" }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ background: "#080810", padding: "6rem 0 7rem", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span className="section-label" style={{ display: "inline-flex", marginBottom: "1.25rem" }}>Pricing</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.015em", color: "#F5F0E8", marginBottom: "1rem" }}>
              Simple Pricing.{" "}
              <em style={{ fontStyle: "italic", background: "linear-gradient(90deg, #BFA06A, #E8C96A, #C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>No Surprises.</em>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: "rgba(245,240,232,0.38)", maxWidth: "500px", margin: "0 auto" }}>
              Priced by property size. Setup included. Month-to-month — no lock-in contracts.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {pricingTiers.map(plan => (
              <div key={plan.size} style={{ padding: "2rem", background: plan.popular ? "rgba(201,168,76,0.04)" : "rgba(255,255,255,0.02)", border: `1px solid ${plan.border}`, position: "relative", overflow: "hidden", transition: "border-color 0.3s ease, box-shadow 0.3s ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = plan.hoverBorder; (e.currentTarget as HTMLElement).style.boxShadow = "0 24px 80px rgba(0,0,0,0.35)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = plan.border; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: plan.popular ? "linear-gradient(90deg, #C9A84C, #E8C96A, #C9A84C)" : `linear-gradient(90deg, ${plan.color}60, transparent)` }} />
                {plan.popular && <div style={{ position: "absolute", top: "1.25rem", right: "1.25rem", padding: "0.25rem 0.7rem", background: "linear-gradient(135deg, #C9A84C, #E8C96A)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#0C0B18" }}>Most Popular</div>}
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: plan.color, marginBottom: "0.5rem" }}>{plan.rooms}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.75rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "0.875rem" }}>{plan.size}</h3>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "0.25rem", marginBottom: "1.5rem" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "3rem", fontWeight: 600, color: plan.popular ? "#C9A84C" : "#F5F0E8", lineHeight: 1 }}>{plan.price}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "rgba(245,240,232,0.35)", marginBottom: "0.25rem" }}>/month</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.75rem" }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                      <CheckCircle2 size={12} style={{ color: "#6EE7B7", flexShrink: 0 }} />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "rgba(245,240,232,0.62)" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <a href="https://calendly.com/hello-nightdesk/30min" target="_blank" rel="noopener noreferrer" className={plan.popular ? "btn-gold" : "btn-ghost-gold"} style={{ width: "100%", justifyContent: "center", padding: "0.875rem", fontSize: "0.78rem" }}>
                  Get a Demo <ArrowRight size={13} />
                </a>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "2.5rem", padding: "1.25rem 1.5rem", background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              {["Setup included", "No long-term contract", "30-day satisfaction guarantee", "Cancel anytime"].map(b => (
                <span key={b} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "rgba(245,240,232,0.42)", display: "flex", alignItems: "center", gap: "0.375rem" }}>
                  <Star size={10} style={{ color: "#C9A84C" }} /> {b}
                </span>
              ))}
            </div>
            <a href="https://calendly.com/hello-nightdesk/30min" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ padding: "0.6rem 1.5rem", fontSize: "0.72rem", whiteSpace: "nowrap" }}>Book Free Demo Call</a>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section style={{ background: "#06060e", padding: "5rem 0", borderTop: "1px solid rgba(255,255,255,0.04)", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "640px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 600, lineHeight: 1.1, color: "#F5F0E8", marginBottom: "1.25rem" }}>
            Ready to Stop Losing Bookings to{" "}
            <em style={{ fontStyle: "italic", background: "linear-gradient(90deg, #BFA06A, #E8C96A, #C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Silence?</em>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", lineHeight: 1.78, color: "rgba(245,240,232,0.42)", marginBottom: "2.5rem" }}>
            Book a free 30-minute demo. We'll show you the AI live on a hotel like yours and give you a custom quote — no commitment required.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
            <a href="https://calendly.com/hello-nightdesk/30min" target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ padding: "1rem 2.25rem", fontSize: "0.85rem" }}>
              Book Free Demo <ArrowRight size={14} />
            </a>
            <a href="mailto:hello@nightdesk.agency" className="btn-ghost" style={{ padding: "1rem 1.75rem", fontSize: "0.85rem" }}>Email Us</a>
          </div>
          <p style={{ marginTop: "1.25rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "rgba(245,240,232,0.2)" }}>
            Setup included · No lock-in contract · Live in 3 weeks
          </p>
        </div>
      </section>

      <FloatingChat />
    </div>
  );
}
