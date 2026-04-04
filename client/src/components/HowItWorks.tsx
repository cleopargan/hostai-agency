/* Design: Midnight Gold — numbered step timeline with gold connectors, interactive demo */
import { useEffect, useRef, useState } from "react";
import { FileText, Cpu, Globe, BarChart2 } from "lucide-react";

const steps = [
  { num: "01", icon: FileText, title: "We Onboard Your Property", desc: "You fill a simple form: your FAQs, room types, policies, booking links. Takes 15 minutes. No tech skills needed." },
  { num: "02", icon: Cpu, title: "We Build Your AI Concierge", desc: "Our team trains a custom AI on your property's unique information. Your bot knows your hotel better than any new hire." },
  { num: "03", icon: Globe, title: "We Install It on Your Website", desc: "We embed the chatbot on your site in 30 minutes — WordPress, Wix, Squarespace, or any platform. You don't touch a line of code." },
  { num: "04", icon: BarChart2, title: "It Works. You Relax.", desc: "Your AI concierge answers guests 24/7. You receive a monthly report showing conversations, bookings captured, and hours saved." },
];

const demoConversations = [
  [
    { from: "guest", text: "What's your cancellation policy?" },
    { from: "ai", text: "Free cancellation up to 48 hours before check-in. After that, the first night is charged. Shall I send the full policy to your email? 📧" },
  ],
  [
    { from: "guest", text: "Is there parking available?" },
    { from: "ai", text: "Yes! We have free on-site parking for all guests. The entrance is on Oak Street, just past the main entrance. 🚗" },
  ],
  [
    { from: "guest", text: "Do you serve breakfast?" },
    { from: "ai", text: "Absolutely! Breakfast is served daily from 7–10:30 AM in our garden terrace. Continental and full English options available. ☕" },
  ],
];

export default function HowItWorks() {
  const [visible, setVisible] = useState(false);
  const [demoIdx, setDemoIdx] = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    const convo = demoConversations[demoIdx];
    let idx = 0;
    const showNext = () => {
      if (cancelled) return;
      if (idx >= convo.length) {
        setTimeout(() => { if (!cancelled) { setMsgIdx(0); idx = 0; setDemoIdx((d) => (d + 1) % demoConversations.length); } }, 3000);
        return;
      }
      const msg = convo[idx];
      if (msg.from === "ai") {
        setIsTyping(true);
        setTimeout(() => { if (cancelled) return; setIsTyping(false); setMsgIdx(idx + 1); idx++; setTimeout(showNext, 1500); }, 1200);
      } else {
        setMsgIdx(idx + 1); idx++; setTimeout(showNext, 1000);
      }
    };
    setMsgIdx(0);
    const t = setTimeout(showNext, 600);
    return () => { cancelled = true; clearTimeout(t); };
  }, [demoIdx]);

  const currentConvo = demoConversations[demoIdx];

  return (
    <section id="how-it-works" ref={ref} className="py-24 md:py-32 relative" style={{ background: "#0A0A0F" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.18), transparent)" }} />

      <div className="container">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="section-label block mb-4">How It Works</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5" style={{ fontFamily: "'Playfair Display', serif", color: "#F0EDE6" }}>
            From Zero to <span className="gold-text italic">AI-Powered</span> in 7 Days
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(240,237,230,0.48)", fontFamily: "'DM Sans', sans-serif" }}>
            We handle everything. You just answer a few questions about your property and we do the rest.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Steps */}
          <div className="flex flex-col">
            {steps.map((s, i) => (
              <div key={s.num} className={`flex gap-5 transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`} style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))", border: "1px solid rgba(201,168,76,0.3)" }}>
                    <s.icon size={18} style={{ color: "#C9A84C" }} />
                  </div>
                  {i < steps.length - 1 && <div className="w-px flex-1 my-2" style={{ background: "linear-gradient(to bottom, rgba(201,168,76,0.3), rgba(201,168,76,0.05))", minHeight: "40px" }} />}
                </div>
                <div className="pb-8">
                  <span className="text-xs font-bold block mb-1" style={{ color: "rgba(201,168,76,0.5)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em" }}>STEP {s.num}</span>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "#F0EDE6", fontFamily: "'DM Sans', sans-serif" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(240,237,230,0.48)", fontFamily: "'DM Sans', sans-serif" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Live Demo */}
          <div className={`transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            <div className="rounded-2xl overflow-hidden" style={{ background: "#16161F", border: "1px solid rgba(201,168,76,0.15)", boxShadow: "0 24px 80px rgba(0,0,0,0.4)" }}>
              {/* Chrome */}
              <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#1E1E2A", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#FEBC2E" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
                <span className="ml-3 text-xs" style={{ color: "rgba(240,237,230,0.3)", fontFamily: "'DM Sans', sans-serif" }}>Live Demo — AI Concierge</span>
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="pulse-dot" style={{ width: 6, height: 6 }} />
                  <span className="text-xs" style={{ color: "rgba(74,222,128,0.7)", fontFamily: "'DM Sans', sans-serif" }}>Active</span>
                </div>
              </div>

              <div className="p-5 min-h-[260px] flex flex-col gap-3">
                {/* Topic tabs */}
                <div className="flex gap-2 mb-2 flex-wrap">
                  {demoConversations.map((_, i) => (
                    <button key={i} onClick={() => { setDemoIdx(i); setMsgIdx(0); }}
                      className="px-3 py-1 rounded-full text-xs transition-all duration-200"
                      style={{ background: demoIdx === i ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.04)", border: `1px solid ${demoIdx === i ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.06)"}`, color: demoIdx === i ? "#C9A84C" : "rgba(240,237,230,0.4)", fontFamily: "'DM Sans', sans-serif" }}>
                      {["Cancellation", "Parking", "Breakfast"][i]}
                    </button>
                  ))}
                </div>
                {currentConvo.slice(0, msgIdx).map((msg, i) => (
                  <div key={i} className={msg.from === "ai" ? "chat-bubble-ai" : "chat-bubble-user"} style={{ animation: "fadeInUp 0.3s ease" }}>{msg.text}</div>
                ))}
                {isTyping && <div className="chat-bubble-ai flex items-center gap-1"><div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" /></div>}
              </div>

              <div className="px-5 pb-5">
                <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: "#1E1E2A", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <span className="text-sm flex-1" style={{ color: "rgba(240,237,230,0.22)", fontFamily: "'DM Sans', sans-serif" }}>Ask anything about the property…</span>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #C9A84C, #E8C96A)" }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 6h10M6 1l5 5-5 5" stroke="#0A0A0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-sm" style={{ color: "rgba(240,237,230,0.32)", fontFamily: "'DM Sans', sans-serif" }}>
              This is exactly what your guests will experience — instantly, 24/7.
            </p>
          </div>
        </div>
      </div>
      <style>{`@keyframes fadeInUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </section>
  );
}
