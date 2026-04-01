/* Design: Warm Operator — warm gray bg, accordion FAQ, clean typography */
import { useState, useEffect, useRef } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Do I need any technical knowledge to get started?",
    a: "None at all. We handle everything — from building the chatbot to installing it on your website. You simply fill out a form telling us about your property, and we take care of the rest. If you don't have a website yet, we can build one for you.",
  },
  {
    q: "How long does setup take?",
    a: "We guarantee your AI receptionist will be live within 7 business days of receiving your property information. Most setups are completed in 3–5 days.",
  },
  {
    q: "What if the AI doesn't know the answer to a guest's question?",
    a: "The AI is trained to gracefully hand off questions it can't answer. It will collect the guest's contact details and notify you, so you can follow up personally. This ensures no guest ever feels ignored.",
  },
  {
    q: "Can the AI actually take bookings?",
    a: "Yes. The AI can be integrated with your existing booking system (Booking.com, Airbnb, direct booking links, etc.) to guide guests directly to your reservation page. For properties using direct booking, we can set up a full booking flow.",
  },
  {
    q: "What happens if I want to update the bot's information?",
    a: "Your monthly maintenance retainer covers all updates. Simply email us with any changes — new menu items, updated policies, seasonal offers — and we'll update the bot within 48 hours.",
  },
  {
    q: "Is this only for hotels, or can cafes and restaurants use it too?",
    a: "Both. We serve boutique hotels, independent cafes, restaurants, and small resort properties. The AI is customized for your specific type of business.",
  },
  {
    q: "What if I'm not satisfied with the result?",
    a: "We offer a 30-day satisfaction guarantee. If you're not happy with the AI's performance within the first 30 days, we'll refund your setup fee in full — no questions asked.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
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
    <section id="faq" className="bg-[#EDE8E0] py-24 lg:py-32" ref={ref}>
      <div className="container">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
          {/* Left label */}
          <div
            className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <span className="section-label">FAQ</span>
            <h2
              className="display-heading text-4xl md:text-5xl mt-4 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Common questions,{" "}
              <span className="italic text-[#C2622D]">honest answers</span>
            </h2>
            <p className="text-[#1C1008]/55 mt-4 text-sm leading-relaxed" style={{ fontFamily: "'Sora', sans-serif" }}>
              Still have a question? Email us at{" "}
              <a href="mailto:hello@hostai.co" className="text-[#C2622D] hover:underline">
                hello@hostai.co
              </a>
            </p>
          </div>

          {/* Accordion */}
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`bg-white rounded-xl overflow-hidden border border-[#EDE8E0] transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span
                    className="text-[#1C1008] font-medium text-sm leading-snug"
                    style={{ fontFamily: "'Sora', sans-serif" }}
                  >
                    {faq.q}
                  </span>
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#EDE8E0] flex items-center justify-center">
                    {open === i
                      ? <Minus size={12} className="text-[#C2622D]" />
                      : <Plus size={12} className="text-[#1C1008]/60" />
                    }
                  </span>
                </button>
                {open === i && (
                  <div className="px-6 pb-5">
                    <div className="h-px bg-[#EDE8E0] mb-4"></div>
                    <p className="text-sm text-[#1C1008]/65 leading-relaxed" style={{ fontFamily: "'Sora', sans-serif" }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
