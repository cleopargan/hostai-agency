/* Design: Warm Operator — cream bg, numbered steps, chatbot demo widget */
import { useEffect, useRef, useState } from "react";
import { MessageSquare, Zap, BarChart3, ArrowRight } from "lucide-react";

const PHONE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663082783554/QDcYwAv8SHis62JyYiBJro/chatbot-demo-mockup-SwVtTuhBgXioizjP338V9d.webp";

const steps = [
  {
    icon: MessageSquare,
    num: "01",
    title: "We learn your property",
    desc: "We gather your FAQs, policies, pricing, and booking links. You fill out a simple form — no tech knowledge required.",
    color: "#C2622D",
  },
  {
    icon: Zap,
    num: "02",
    title: "We build and install your AI",
    desc: "Within 7 days, your custom AI receptionist is live on your website. It's trained on your specific property and speaks in your brand's voice.",
    color: "#4A6741",
  },
  {
    icon: BarChart3,
    num: "03",
    title: "You get a monthly performance report",
    desc: "Every month, you receive a clear report showing conversations handled, leads captured, and staff hours saved. We handle all ongoing maintenance.",
    color: "#C2622D",
  },
];

// Interactive chatbot demo
const chatMessages = [
  { from: "guest", text: "Hi! What time is check-in?", delay: 0 },
  { from: "bot", text: "Welcome to The Alcove! Check-in is at 3:00 PM. Would you like to arrange early check-in? We can often accommodate from 12 PM for a small fee.", delay: 1200 },
  { from: "guest", text: "Yes please! Also, do you allow pets?", delay: 2800 },
  { from: "bot", text: "Great! I've noted your early check-in request. And yes — we're a pet-friendly property! Dogs up to 25kg are welcome. There's a $30/night pet fee. Shall I add this to your reservation?", delay: 4200 },
];

function ChatDemo() {
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (shown >= chatMessages.length) return;
    const msg = chatMessages[shown];
    const timer = setTimeout(() => {
      if (msg.from === "bot") {
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          setShown((s) => s + 1);
        }, 900);
      } else {
        setShown((s) => s + 1);
      }
    }, msg.delay + (shown === 0 ? 600 : 0));
    return () => clearTimeout(timer);
  }, [shown]);

  const displayed = chatMessages.slice(0, shown);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-[#EDE8E0] overflow-hidden w-full max-w-sm mx-auto">
      {/* Chat header */}
      <div className="bg-[#1C1008] px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#C2622D] flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1C4.13 1 1 4.13 1 8s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zm0 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 10c-1.75 0-3.29-.9-4.2-2.26.02-1.39 2.8-2.16 4.2-2.16 1.4 0 4.18.77 4.2 2.16C11.29 12.1 9.75 13 8 13z" fill="white"/>
          </svg>
        </div>
        <div>
          <p className="text-white text-sm font-semibold" style={{ fontFamily: "'Sora', sans-serif" }}>The Alcove AI</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4A6741]"></span>
            <p className="text-white/60 text-xs" style={{ fontFamily: "'Sora', sans-serif" }}>Online 24/7</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="px-4 py-4 min-h-[280px] flex flex-col gap-3 bg-[#FAF7F2]">
        {displayed.map((msg, i) => (
          <div
            key={i}
            className={`flex chat-bubble-in ${msg.from === "guest" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
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

      {/* Input bar */}
      <div className="px-4 py-3 bg-white border-t border-[#EDE8E0] flex items-center gap-2">
        <div className="flex-1 bg-[#FAF7F2] rounded-full px-4 py-2 text-xs text-[#1C1008]/40" style={{ fontFamily: "'Sora', sans-serif" }}>
          Type a message…
        </div>
        <button className="w-8 h-8 rounded-full bg-[#C2622D] flex items-center justify-center">
          <ArrowRight size={14} className="text-white" />
        </button>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="bg-[#FAF7F2] py-24 lg:py-32" ref={ref}>
      <div className="container">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <span className="section-label">How It Works</span>
          <h2
            className="display-heading text-4xl md:text-5xl mt-4 max-w-2xl mx-auto"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            From zero to a fully working{" "}
            <span className="italic text-[#C2622D]">AI receptionist</span>{" "}
            in 7 days
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Steps */}
          <div className="flex flex-col gap-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className={`flex gap-5 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: `${200 + i * 150}ms` }}
                >
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${step.color}15` }}
                    >
                      <Icon size={22} style={{ color: step.color }} />
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-px flex-1 mt-3 bg-[#EDE8E0]"></div>
                    )}
                  </div>
                  <div className="pb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-xs font-bold text-[#C2622D]/50 tracking-widest uppercase"
                        style={{ fontFamily: "'Sora', sans-serif" }}
                      >
                        Step {step.num}
                      </span>
                    </div>
                    <h3
                      className="text-xl font-semibold text-[#1C1008] mb-2"
                      style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600 }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#1C1008]/60 leading-relaxed" style={{ fontFamily: "'Sora', sans-serif" }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live Chat Demo */}
          <div
            className={`transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 bg-[#C2622D] text-white text-xs font-bold px-3 py-1.5 rounded-full z-10" style={{ fontFamily: "'Sora', sans-serif" }}>
                Live Demo ↓
              </div>
              <ChatDemo />
              <p className="text-center text-xs text-[#1C1008]/40 mt-4" style={{ fontFamily: "'Sora', sans-serif" }}>
                This is exactly what your guests will experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
