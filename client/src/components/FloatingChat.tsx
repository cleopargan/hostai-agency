/* ============================================================
   FLOATING CHAT — Elite Luxury v4
   - Premium chat widget with dark glass UI and gold accents
   - Quick reply chips for instant demo interaction
   - Refined header with live indicator and property name
   - Smooth open/close animation
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { MessageSquare, X, ArrowRight, Sparkles } from "lucide-react";

const demoReplies: Record<string, string> = {
  "check-in": "Check-in is at 3:00 PM. Early check-in from 12 PM is available for $25. Would you like me to arrange that? 🏨",
  "checkout": "Check-out is at 11:00 AM. Late check-out until 2 PM can be arranged for $20. Shall I add it to your reservation?",
  "parking": "Yes — complimentary private parking is available for all guests. The entrance is on the north side of the building. 🚗",
  "breakfast": "Breakfast is served daily from 7:00–10:30 AM in our garden restaurant. It's included in Deluxe and Suite packages. ☕",
  "wifi": "Complimentary high-speed WiFi is available throughout the property. The network name and password are provided at check-in.",
  "pool": "Our rooftop pool is open daily from 8 AM to 9 PM. Towels are provided. No reservations required. 🏊",
  "pets": "We're a pet-friendly property! Dogs up to 25kg are welcome with a $30/night pet fee. Please let us know in advance. 🐾",
  "cancel": "Free cancellation is available up to 48 hours before check-in. After that, the first night is non-refundable. Would you like me to send the full policy to your email?",
};

const quickReplies = ["Check-in time?", "Is parking free?", "Breakfast included?", "Pet policy?"];

function getBotReply(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, reply] of Object.entries(demoReplies)) {
    if (lower.includes(key)) return reply;
  }
  if (lower.includes("book") || lower.includes("reserv") || lower.includes("availab")) {
    return "I'd love to help with your booking! We have rooms available from $145/night. What dates are you considering? I can check real-time availability for you. 📅";
  }
  if (lower.includes("price") || lower.includes("cost") || lower.includes("rate")) {
    return "Our rates start from $145/night for a Garden Room and $185/night for a Deluxe Suite — both include breakfast. Would you like me to check availability for specific dates?";
  }
  if (lower.includes("restaurant") || lower.includes("dinner") || lower.includes("lunch")) {
    return "Our garden restaurant is open for dinner from 6–10 PM daily. We recommend reserving a table in advance, especially on weekends. Shall I make a reservation for you?";
  }
  return "Great question! Let me connect you with our team who can give you the most accurate answer. Could you leave your email and we'll get back to you within the hour? 📧";
}

interface Message { from: "guest" | "bot"; text: string; }

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Welcome to The Grand Boutique! I'm your AI concierge — available 24/7 to answer any questions about the property. How can I help you today? 🏨" }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [hasOpened, setHasOpened] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      if (!hasOpened) setHasOpened(true);
    }
  }, [messages, open]);

  const send = (text?: string) => {
    const msg = (text || input).trim();
    if (!msg) return;
    setMessages((m) => [...m, { from: "guest", text: msg }]);
    setInput("");
    setShowQuickReplies(false);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: "bot", text: getBotReply(msg) }]);
    }, 900 + Math.random() * 500);
  };

  return (
    <>
      {open && (
        <div
          className="fixed bottom-20 right-4 md:right-6 z-50 w-80 md:w-[360px] overflow-hidden"
          style={{
            background: "rgba(8,8,16,0.99)",
            border: "1px solid rgba(201,168,76,0.2)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(201,168,76,0.05)",
            backdropFilter: "blur(32px)",
            animation: "chatSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Header */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.875rem 1rem",
            background: "linear-gradient(135deg, rgba(201,168,76,0.06) 0%, rgba(201,168,76,0.02) 100%)",
            borderBottom: "1px solid rgba(201,168,76,0.1)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
              {/* Logo mark */}
              <div style={{
                width: "2.25rem",
                height: "2.25rem",
                background: "linear-gradient(135deg, #B8922E, #E8C96A)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 4px 12px rgba(201,168,76,0.2)",
              }}>
                <span style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#0A0806",
                  lineHeight: 1,
                }}>N</span>
              </div>
              <div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#F5F0E8",
                  lineHeight: 1.1,
                }}>
                  The Grand Boutique
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginTop: "1px" }}>
                  <span style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: "#4ade80",
                    display: "block",
                    animation: "pulse-ring 2s ease-in-out infinite",
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.62rem",
                    color: "rgba(74,222,128,0.75)",
                  }}>
                    AI Concierge · Online 24/7
                  </span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                padding: "0.2rem 0.5rem",
                background: "rgba(201,168,76,0.06)",
                border: "1px solid rgba(201,168,76,0.14)",
              }}>
                <Sparkles size={8} style={{ color: "#C9A84C" }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(201,168,76,0.7)" }}>
                  Live Demo
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(245,240,232,0.3)",
                  padding: "0.125rem",
                  display: "flex",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.7)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.3)"}
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            padding: "1rem",
            height: "260px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "0.625rem",
            background: "rgba(6,5,14,0.98)",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(201,168,76,0.15) transparent",
          }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.from === "bot" ? "flex-start" : "flex-end",
                  maxWidth: "85%",
                  animation: "chatFadeUp 0.25s ease",
                }}
              >
                <div style={{
                  padding: "0.625rem 0.875rem",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8rem",
                  lineHeight: 1.6,
                  background: msg.from === "bot"
                    ? "rgba(255,255,255,0.04)"
                    : "linear-gradient(135deg, #C9A84C, #E8C96A)",
                  color: msg.from === "bot" ? "rgba(245,240,232,0.72)" : "#0A0806",
                  border: msg.from === "bot" ? "1px solid rgba(255,255,255,0.06)" : "none",
                  fontWeight: msg.from === "guest" ? 500 : 400,
                }}>
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div style={{ alignSelf: "flex-start", animation: "chatFadeUp 0.2s ease" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "0.625rem 0.875rem",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}>
                  {[0, 1, 2].map(j => (
                    <div key={j} style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: "rgba(201,168,76,0.5)",
                      animation: `typingBounce 1.2s ease-in-out infinite`,
                      animationDelay: `${j * 0.2}s`,
                    }} />
                  ))}
                </div>
              </div>
            )}

            {/* Quick reply chips */}
            {showQuickReplies && messages.length === 1 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginTop: "0.25rem" }}>
                {quickReplies.map((qr) => (
                  <button
                    key={qr}
                    onClick={() => send(qr)}
                    style={{
                      padding: "0.3rem 0.75rem",
                      background: "rgba(201,168,76,0.05)",
                      border: "1px solid rgba(201,168,76,0.2)",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.72rem",
                      color: "rgba(201,168,76,0.75)",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.1)";
                      (e.currentTarget as HTMLElement).style.color = "#C9A84C";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.05)";
                      (e.currentTarget as HTMLElement).style.color = "rgba(201,168,76,0.75)";
                    }}
                  >
                    {qr}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            display: "flex",
            gap: "0.5rem",
            padding: "0.75rem",
            background: "rgba(255,255,255,0.02)",
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about check-in, parking, breakfast…"
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                padding: "0.5rem 0.75rem",
                color: "#F5F0E8",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.78rem",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.35)"}
              onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"}
            />
            <button
              onClick={() => send()}
              style={{
                width: "2.25rem",
                height: "2.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                background: "linear-gradient(135deg, #C9A84C, #E8C96A)",
                border: "none",
                cursor: "pointer",
                transition: "opacity 0.2s, transform 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.opacity = "0.85";
                (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              }}
            >
              <ArrowRight size={13} style={{ color: "#0A0806" }} />
            </button>
          </div>

          {/* Footer */}
          <div style={{
            padding: "0.5rem 0.75rem",
            background: "rgba(255,255,255,0.01)",
            borderTop: "1px solid rgba(255,255,255,0.03)",
            textAlign: "center",
          }}>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.58rem",
              color: "rgba(245,240,232,0.15)",
              letterSpacing: "0.08em",
            }}>
              Powered by <strong style={{ color: "rgba(201,168,76,0.3)" }}>NightDesk</strong> · This is a live demo
            </span>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "1.25rem",
          right: "1.25rem",
          zIndex: 50,
          width: "3.5rem",
          height: "3.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: open
            ? "rgba(8,8,16,0.99)"
            : "linear-gradient(135deg, #B8922E, #E8C96A)",
          border: open ? "1px solid rgba(201,168,76,0.28)" : "none",
          cursor: "pointer",
          boxShadow: open
            ? "0 8px 30px rgba(0,0,0,0.5)"
            : "0 8px 30px rgba(201,168,76,0.35), 0 2px 8px rgba(201,168,76,0.2)",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: "scale(1)",
        }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "scale(1.08)"}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
        aria-label={open ? "Close chat" : "Open AI concierge demo"}
      >
        {open
          ? <X size={18} style={{ color: "#C9A84C" }} />
          : <MessageSquare size={18} style={{ color: "#0A0806" }} />
        }
        {!open && (
          <span style={{
            position: "absolute",
            top: "-3px",
            right: "-3px",
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            background: "#4ade80",
            border: "2px solid #080810",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "white" }} />
          </span>
        )}
      </button>

      <style>{`
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes chatFadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
