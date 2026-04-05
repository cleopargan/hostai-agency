/* ============================================================
   FLOATING CHAT — Obsidian & Gold Luxury v3
   Premium chat widget with dark glass UI and gold accents
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { MessageSquare, X, ArrowRight } from "lucide-react";

const demoReplies: Record<string, string> = {
  "check-in": "Check-in is at 3:00 PM. Early check-in from 12 PM is available for $25. Would you like me to arrange that? 🏨",
  "checkout": "Check-out is at 11:00 AM. Late check-out until 2 PM can be arranged for $20. Shall I add it to your reservation?",
  "parking": "Yes! We offer complimentary on-site parking for all guests. The car park entrance is on the north side of the building. 🚗",
  "breakfast": "Breakfast is served daily from 7:00–10:30 AM in our garden restaurant. It's included in Deluxe and Suite packages. ☕",
  "wifi": "Complimentary high-speed WiFi is available throughout the property. The network name and password will be provided at check-in.",
  "pool": "Our rooftop pool is open daily from 8 AM to 9 PM. Towels are provided. No reservations required. 🏊",
  "pets": "We're a pet-friendly property! Dogs up to 25kg are welcome with a $30/night pet fee. Please let us know in advance. 🐾",
};

function getBotReply(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, reply] of Object.entries(demoReplies)) {
    if (lower.includes(key)) return reply;
  }
  if (lower.includes("book") || lower.includes("reserv")) {
    return "I'd love to help with your booking! You can reserve directly at our website or I can connect you with our team. What dates are you looking at? 📅";
  }
  if (lower.includes("price") || lower.includes("cost") || lower.includes("rate")) {
    return "Our rates start from $189/night for a Standard Room. Rates vary by season and room type. Would you like me to check availability for specific dates?";
  }
  return "Great question! Let me connect you with our team who can give you the most accurate answer. Could you leave your email and we'll get back to you within the hour? 📧";
}

interface Message { from: "guest" | "bot"; text: string; }

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Welcome! I'm your AI concierge. Ask me about check-in, parking, breakfast, WiFi, or anything about the property. 🏨" }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { from: "guest", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: "bot", text: getBotReply(text) }]);
    }, 900 + Math.random() * 400);
  };

  return (
    <>
      {open && (
        <div
          className="fixed bottom-20 right-4 md:right-6 z-50 w-80 md:w-[360px] overflow-hidden"
          style={{
            background: "rgba(10,9,18,0.99)",
            border: "1px solid rgba(201,168,76,0.22)",
            borderRadius: "2px",
            boxShadow: "0 32px 80px rgba(0,0,0,0.75), 0 0 0 1px rgba(201,168,76,0.06)",
            backdropFilter: "blur(24px)",
            animation: "slideUp 0.25s ease"
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3" style={{ background: "rgba(255,255,255,0.025)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{
                background: "linear-gradient(135deg, #B8922E, #E8C96A)",
                borderRadius: "2px",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1rem",
                fontWeight: 600,
                color: "#0A0806"
              }}>H</div>
              <div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", fontWeight: 600, color: "#F5F0E8" }}>
                  HostAI Concierge
                </p>
                <div className="flex items-center gap-1.5">
                  <div className="pulse-dot" style={{ width: 5, height: 5 }} />
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "rgba(74,222,128,0.8)" }}>Online 24/7</p>
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ color: "rgba(245,240,232,0.35)", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.7)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.35)"}>
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="px-4 py-4 h-64 overflow-y-auto flex flex-col gap-2.5" style={{ background: "rgba(6,5,14,0.95)" }}>
            {messages.map((msg, i) => (
              <div key={i} className={msg.from === "bot" ? "chat-bubble-ai" : "chat-bubble-user"}
                style={{ animation: "fadeInUp 0.25s ease" }}>
                {msg.text}
              </div>
            ))}
            {typing && (
              <div className="chat-bubble-ai flex items-center gap-1.5">
                <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 flex gap-2" style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about check-in, parking…"
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "2px",
                padding: "0.5rem 0.75rem",
                color: "#F5F0E8",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.78rem",
                outline: "none",
                transition: "border-color 0.2s"
              }}
              onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.35)"}
              onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"}
            />
            <button onClick={send} className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{
              background: "linear-gradient(135deg, #C9A84C, #E8C96A)",
              borderRadius: "2px",
              transition: "opacity 0.2s"
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.85"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}>
              <ArrowRight size={13} style={{ color: "#0A0806" }} />
            </button>
          </div>

          <div className="px-4 py-2" style={{ background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.03)" }}>
            <p style={{ textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem", color: "rgba(245,240,232,0.18)", letterSpacing: "0.08em" }}>
              Powered by HostAI · Live Demo
            </p>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 md:right-6 z-50 w-14 h-14 flex items-center justify-center transition-all duration-300"
        style={{
          background: open ? "rgba(10,9,18,0.99)" : "linear-gradient(135deg, #B8922E, #E8C96A)",
          border: open ? "1px solid rgba(201,168,76,0.3)" : "none",
          borderRadius: "2px",
          boxShadow: open ? "0 8px 30px rgba(0,0,0,0.4)" : "0 8px 30px rgba(201,168,76,0.35)",
          transform: "scale(1)",
          transition: "all 0.3s ease"
        }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "scale(1.06)"}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
      >
        {open
          ? <X size={20} style={{ color: "#C9A84C" }} />
          : <MessageSquare size={20} style={{ color: "#0A0806" }} />
        }
        {!open && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center" style={{ background: "#4ADE80", borderColor: "#080810" }}>
            <span className="w-1 h-1 rounded-full bg-white" />
          </span>
        )}
      </button>

      <style>{`
        @keyframes slideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </>
  );
}
