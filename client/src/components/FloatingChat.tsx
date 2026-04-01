/* Design: Warm Operator — floating chatbot widget in bottom-right corner */
import { useState } from "react";
import { MessageSquare, X, ArrowRight } from "lucide-react";

const demoReplies: Record<string, string> = {
  "check-in": "Check-in is at 3:00 PM. Early check-in from 12 PM is available for $25. Would you like me to arrange that?",
  "checkout": "Check-out is at 11:00 AM. Late check-out until 2 PM can be arranged for $20. Shall I add it to your reservation?",
  "parking": "Yes! We offer complimentary on-site parking for all guests. The car park entrance is on the north side of the building.",
  "breakfast": "Breakfast is served daily from 7:00–10:30 AM in our garden restaurant. It's included in our Deluxe and Suite packages.",
  "wifi": "Complimentary high-speed WiFi is available throughout the property. The network name and password will be provided at check-in.",
  "pool": "Our rooftop pool is open daily from 8 AM to 9 PM. Towels are provided. Reservations are not required.",
  "pets": "We're a pet-friendly property! Dogs up to 25kg are welcome with a $30/night pet fee. Please let us know in advance.",
};

function getBotReply(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, reply] of Object.entries(demoReplies)) {
    if (lower.includes(key)) return reply;
  }
  if (lower.includes("book") || lower.includes("reserv")) {
    return "I'd love to help with your booking! You can reserve directly at our website or I can connect you with our reservations team. What dates are you looking at?";
  }
  if (lower.includes("price") || lower.includes("cost") || lower.includes("rate")) {
    return "Our rates start from $189/night for a Standard Room. Rates vary by season and room type. Would you like me to check availability for specific dates?";
  }
  return "Great question! Let me connect you with our team who can give you the most accurate answer. Could you leave your email and we'll get back to you within the hour?";
}

interface Message {
  from: "guest" | "bot";
  text: string;
}

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Welcome to The Alcove! I'm your AI concierge. How can I help you today? Try asking about check-in, parking, breakfast, or WiFi." }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

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
      {/* Chat window */}
      {open && (
        <div className="fixed bottom-20 right-4 md:right-6 z-50 w-80 md:w-96 shadow-2xl rounded-2xl overflow-hidden border border-[#EDE8E0] animate-fade-in-up">
          {/* Header */}
          <div className="bg-[#1C1008] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#C2622D] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1C4.13 1 1 4.13 1 8s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zm0 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 10c-1.75 0-3.29-.9-4.2-2.26.02-1.39 2.8-2.16 4.2-2.16 1.4 0 4.18.77 4.2 2.16C11.29 12.1 9.75 13 8 13z" fill="white"/>
                </svg>
              </div>
              <div>
                <p className="text-white text-sm font-semibold" style={{ fontFamily: "'Sora', sans-serif" }}>The Alcove AI</p>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4A6741]"></span>
                  <p className="text-white/50 text-xs" style={{ fontFamily: "'Sora', sans-serif" }}>Online 24/7</p>
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="bg-[#FAF7F2] px-4 py-4 h-72 overflow-y-auto flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "guest" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed chat-bubble-in ${
                    msg.from === "guest"
                      ? "bg-[#C2622D] text-white rounded-br-sm"
                      : "bg-white text-[#1C1008] rounded-bl-sm shadow-sm border border-[#EDE8E0]"
                  }`}
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm border border-[#EDE8E0] flex gap-1.5 items-center">
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-[#1C1008]/40 inline-block"></span>
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-[#1C1008]/40 inline-block"></span>
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-[#1C1008]/40 inline-block"></span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="bg-white border-t border-[#EDE8E0] px-3 py-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about check-in, parking…"
              className="flex-1 bg-[#FAF7F2] rounded-full px-4 py-2 text-xs text-[#1C1008] focus:outline-none focus:ring-2 focus:ring-[#C2622D]/30 border border-[#EDE8E0]"
              style={{ fontFamily: "'Sora', sans-serif" }}
            />
            <button
              onClick={send}
              className="w-8 h-8 rounded-full bg-[#C2622D] flex items-center justify-center hover:bg-[#a8521f] transition-colors flex-shrink-0"
            >
              <ArrowRight size={14} className="text-white" />
            </button>
          </div>

          <div className="bg-white px-4 py-2 border-t border-[#EDE8E0]">
            <p className="text-center text-[9px] text-[#1C1008]/30" style={{ fontFamily: "'Sora', sans-serif" }}>
              Powered by HostAI — This is a live demo
            </p>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-4 right-4 md:right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          open ? "bg-[#1C1008]" : "bg-[#C2622D]"
        } hover:scale-105`}
      >
        {open
          ? <X size={22} className="text-white" />
          : <MessageSquare size={22} className="text-white" />
        }
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#4A6741] border-2 border-white flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
          </span>
        )}
      </button>
    </>
  );
}
