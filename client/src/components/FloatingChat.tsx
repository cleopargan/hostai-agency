/* ============================================================
   FLOATING CHAT — NightDesk AI Concierge (Live LLM)
   - Powered by Gemini 2.5 Flash via tRPC concierge.chat
   - Full conversation history sent on each message
   - Luxury dark glass UI with gold accents
   - Auto-opens after 8 seconds on first visit
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { MessageSquare, X, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface Message {
  from: "guest" | "bot";
  text: string;
}

const quickReplies = [
  "Check-in time?",
  "Is parking free?",
  "Breakfast included?",
  "Pet policy?",
];

// Demo hotel context — in production each hotel gets their own config
const DEMO_HOTEL = {
  hotelName: "The Grand Maison",
  hotelCity: "Paris",
  checkInTime: "3:00 PM",
  checkOutTime: "11:00 AM",
  currency: "€",
  startingRate: "185",
};

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: "Welcome to The Grand Maison! I'm your AI concierge — available 24/7 to answer any questions about your stay. How can I assist you today? 🏨",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatMutation = trpc.concierge.chat.useMutation();

  // Auto-open after 8 seconds on first visit (once per session)
  useEffect(() => {
    const alreadyOpened = sessionStorage.getItem("nd_chat_opened");
    if (alreadyOpened) return;
    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem("nd_chat_opened", "1");
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom on new messages or loading state change
  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, isLoading]);

  const send = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || isLoading) return;

    setInput("");
    setShowQuickReplies(false);
    setIsLoading(true);

    // Append guest message immediately for instant feedback
    const updatedMessages: Message[] = [...messages, { from: "guest", text: msg }];
    setMessages(updatedMessages);

    // Build conversation history for the LLM (skip the initial welcome message)
    const conversationHistory = updatedMessages
      .slice(1) // skip the initial bot greeting
      .map((m) => ({
        role: m.from === "guest" ? ("user" as const) : ("assistant" as const),
        content: m.text,
      }));

    try {
      const result = await chatMutation.mutateAsync({
        messages: conversationHistory,
        ...DEMO_HOTEL,
      });
      setMessages((prev) => [...prev, { from: "bot", text: result.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "I apologise — I'm experiencing a brief interruption. Please try again in a moment, or contact our front desk directly. 🙏",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {open && (
        <div
          className="fixed bottom-20 right-4 md:right-6 z-50 w-80 md:w-[360px] overflow-hidden"
          style={{
            background: "rgba(8,8,16,0.99)",
            border: "1px solid rgba(201,168,76,0.2)",
            boxShadow:
              "0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(201,168,76,0.05)",
            backdropFilter: "blur(32px)",
            animation: "chatSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.875rem 1rem",
              background:
                "linear-gradient(135deg, rgba(201,168,76,0.06) 0%, rgba(201,168,76,0.02) 100%)",
              borderBottom: "1px solid rgba(201,168,76,0.1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
              {/* Logo mark */}
              <div
                style={{
                  width: "2.25rem",
                  height: "2.25rem",
                  background: "linear-gradient(135deg, #B8922E, #E8C96A)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 4px 12px rgba(201,168,76,0.2)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#0A0806",
                    lineHeight: 1,
                  }}
                >
                  N
                </span>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#F5F0E8",
                    lineHeight: 1.1,
                  }}
                >
                  The Grand Maison
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    marginTop: "1px",
                  }}
                >
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: "#4ade80",
                      display: "block",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.62rem",
                      color: "rgba(74,222,128,0.75)",
                    }}
                  >
                    AI Concierge · Online 24/7
                  </span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  padding: "0.2rem 0.5rem",
                  background: "rgba(201,168,76,0.06)",
                  border: "1px solid rgba(201,168,76,0.14)",
                }}
              >
                <Sparkles size={8} style={{ color: "#C9A84C" }} />
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.55rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(201,168,76,0.7)",
                  }}
                >
                  Live AI
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
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "rgba(245,240,232,0.7)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "rgba(245,240,232,0.3)")
                }
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              padding: "1rem",
              height: "260px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "0.625rem",
              background: "rgba(6,5,14,0.98)",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(201,168,76,0.15) transparent",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.from === "bot" ? "flex-start" : "flex-end",
                  maxWidth: "85%",
                  animation: "chatFadeUp 0.25s ease",
                }}
              >
                <div
                  style={{
                    padding: "0.625rem 0.875rem",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8rem",
                    lineHeight: 1.6,
                    background:
                      msg.from === "bot"
                        ? "rgba(255,255,255,0.04)"
                        : "linear-gradient(135deg, #C9A84C, #E8C96A)",
                    color: msg.from === "bot" ? "rgba(245,240,232,0.72)" : "#0A0806",
                    border:
                      msg.from === "bot"
                        ? "1px solid rgba(255,255,255,0.06)"
                        : "none",
                    fontWeight: msg.from === "guest" ? 500 : 400,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* AI thinking indicator */}
            {isLoading && (
              <div
                style={{ alignSelf: "flex-start", animation: "chatFadeUp 0.2s ease" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.625rem 0.875rem",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <Loader2
                    size={11}
                    style={{
                      color: "rgba(201,168,76,0.6)",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.72rem",
                      color: "rgba(245,240,232,0.35)",
                    }}
                  >
                    Concierge is responding…
                  </span>
                </div>
              </div>
            )}

            {/* Quick reply chips */}
            {showQuickReplies && messages.length === 1 && !isLoading && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.4rem",
                  marginTop: "0.25rem",
                }}
              >
                {quickReplies.map((qr) => (
                  <button
                    key={qr}
                    onClick={() => send(qr)}
                    style={{
                      padding: "0.3rem 0.65rem",
                      background: "rgba(201,168,76,0.07)",
                      border: "1px solid rgba(201,168,76,0.2)",
                      color: "rgba(201,168,76,0.8)",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.68rem",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      letterSpacing: "0.02em",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "rgba(201,168,76,0.14)";
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(201,168,76,0.4)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "rgba(201,168,76,0.07)";
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(201,168,76,0.2)";
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
          <div
            style={{
              padding: "0.625rem 0.75rem",
              borderTop: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
              background: "rgba(255,255,255,0.01)",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !isLoading && send()}
              placeholder="Ask about check-in, parking, breakfast…"
              disabled={isLoading}
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
                opacity: isLoading ? 0.5 : 1,
              }}
              onFocus={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(201,168,76,0.35)")
              }
              onBlur={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(255,255,255,0.07)")
              }
            />
            <button
              onClick={() => send()}
              disabled={isLoading || !input.trim()}
              style={{
                width: "2.25rem",
                height: "2.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                background:
                  isLoading || !input.trim()
                    ? "rgba(201,168,76,0.25)"
                    : "linear-gradient(135deg, #C9A84C, #E8C96A)",
                border: "none",
                cursor: isLoading || !input.trim() ? "not-allowed" : "pointer",
                transition: "opacity 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!isLoading && input.trim()) {
                  (e.currentTarget as HTMLElement).style.opacity = "0.85";
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              }}
            >
              {isLoading ? (
                <Loader2
                  size={12}
                  style={{
                    color: "#0A0806",
                    animation: "spin 1s linear infinite",
                  }}
                />
              ) : (
                <ArrowRight size={13} style={{ color: "#0A0806" }} />
              )}
            </button>
          </div>

          {/* Footer */}
          <div
            style={{
              padding: "0.5rem 0.75rem",
              background: "rgba(255,255,255,0.01)",
              borderTop: "1px solid rgba(255,255,255,0.03)",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.58rem",
                color: "rgba(245,240,232,0.15)",
                letterSpacing: "0.08em",
              }}
            >
              Powered by{" "}
              <strong style={{ color: "rgba(201,168,76,0.3)" }}>NightDesk AI</strong>{" "}
              · Live demo
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
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.transform = "scale(1.08)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.transform = "scale(1)")
        }
        aria-label={open ? "Close chat" : "Open AI concierge"}
      >
        {open ? (
          <X size={18} style={{ color: "#C9A84C" }} />
        ) : (
          <MessageSquare size={18} style={{ color: "#0A0806" }} />
        )}
        {!open && (
          <span
            style={{
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
            }}
          >
            <span
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "white",
              }}
            />
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
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
