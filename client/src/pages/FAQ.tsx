import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Plus, Minus } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactCTA from "@/components/ContactCTA";

const faqs = [
  { q: "What is NightDesk?", a: "NightDesk is a hotel technology agency that helps boutique hotels and independent properties get more direct bookings using AI receptionists, Google Ads management, and direct booking optimization. Founded in 2026, NightDesk serves hotels with 10 to 150 rooms worldwide. The core mission is to help independent hotels compete with large chains and OTA platforms by giving them the same technology and marketing power at a fraction of the cost." },
  { q: "What is an AI receptionist for hotels?", a: "An AI receptionist for hotels is a custom chatbot trained on your specific hotel's information — room types, policies, check-in procedures, local recommendations, cancellation terms, and more. It answers guest questions instantly, 24 hours a day, 7 days a week, in 10+ languages. Unlike generic chatbots, NightDesk's AI receptionist is trained specifically on your property, so it gives accurate, helpful answers rather than generic responses." },
  { q: "How does NightDesk help hotels increase direct bookings?", a: "NightDesk increases direct bookings through three mechanisms. First, the AI receptionist answers guest questions instantly at any hour, removing the friction that causes guests to go to OTAs instead. Second, Google Ads campaigns drive guests who are actively searching for hotels like yours directly to your website. Third, direct booking optimization makes the booking process on your website faster, simpler, and more trustworthy than any OTA." },
  { q: "What hotels is NightDesk best for?", a: "NightDesk is best for boutique hotels with 10 to 150 rooms, bed and breakfasts, independent hotels, and small hotel chains. Specifically, NightDesk delivers the strongest results for hotels that currently send 25% or more of their bookings through OTAs like Booking.com or Expedia, have an average room rate of $80 or higher, and want to build a sustainable direct booking channel without hiring additional marketing staff." },
  { q: "How much does NightDesk cost?", a: "The AI Receptionist service starts at $600/month for hotels with 10–30 rooms, $800/month for 30–80 rooms, and $1,000/month for 80–150 rooms. Google Ads Management starts at $1,000/month (ad spend budget is separate). Direct Booking Optimization starts at $500/month. The NightDesk Complete bundle starts at $2,000/month — saving up to $800/month versus purchasing services individually." },
  { q: "How long does it take to set up NightDesk?", a: "The standard setup time is 2 to 3 weeks. Week 1 is data collection. Week 2 is build and testing. Week 3 is launch and initial optimization. For the Complete package, Google Ads campaigns typically go live in week 2 while the AI receptionist is being finalized." },
  { q: "Can NightDesk answer in multiple languages?", a: "Yes. NightDesk's AI receptionist supports 10+ languages including English, French, Spanish, German, Italian, Portuguese, Dutch, Arabic, Japanese, and Chinese. The AI detects the guest's language automatically and responds in kind." },
  { q: "How is NightDesk different from other hotel chatbots?", a: "Most hotel chatbots are generic tools that give generic answers. NightDesk's AI receptionist is trained specifically on your hotel's information. It also integrates with the broader NightDesk strategy: the AI is designed to capture booking intent and redirect guests toward direct booking. Additionally, NightDesk is a full-service agency, not just a software tool." },
  { q: "What happens if the AI gives wrong information?", a: "NightDesk's AI is trained on information you provide and verify, so accuracy is high from the start. If a guest asks something outside the AI's knowledge, it escalates to a human rather than guessing. You receive weekly reports showing all conversations, including any questions the AI could not answer, so the knowledge base can be continuously improved." },
  { q: "Does NightDesk integrate with hotel booking systems?", a: "NightDesk's AI receptionist works with any hotel website, regardless of your booking engine or property management system. The chatbot is embedded via a simple JavaScript snippet. NightDesk does not require you to change your existing booking engine or PMS." },
  { q: "Can NightDesk replace hotel front desk staff?", a: "No, and NightDesk is not designed to. The AI receptionist handles the high volume of repetitive, informational questions that guests ask before booking. It frees your front desk staff to focus on in-person guest experience and complex requests." },
  { q: "Do I need to change my existing website?", a: "No. NightDesk installs the AI receptionist on your existing website with a simple embed code. Your website design, booking engine, and content remain exactly as they are." },
  { q: "What if I already use Booking.com — can I still use NightDesk?", a: "Yes, absolutely. NightDesk is designed for hotels that currently use OTAs and want to reduce their dependency over time. Most NightDesk clients continue using Booking.com and Expedia while simultaneously building their direct booking channel." },
  { q: "How do you measure success?", a: "NightDesk tracks: the percentage of guest inquiries answered by the AI (target: 80%+), the number of direct bookings per month, the direct booking conversion rate on your website, Google Ads click-through rate and cost per booking, and the total OTA commission saved." },
  { q: "What is included in the weekly report?", a: "The weekly report includes: total conversations handled by the AI receptionist, top questions asked by guests, questions the AI could not answer, Google Ads impressions and clicks if applicable, and any notable trends or recommendations." },
  { q: "Can I cancel anytime?", a: "Yes. NightDesk operates on a month-to-month basis with no long-term contracts. You can cancel with 30 days' notice at any time. There are no cancellation fees or penalties." },
  { q: "Do you work with hotel chains or only independent hotels?", a: "NightDesk primarily serves independent hotels, boutique properties, and small chains with up to 10 properties. NightDesk's sweet spot is the independent hotel owner or GM who wants enterprise-level AI and marketing capabilities without the enterprise price tag." },
  { q: "What happens after I contact you?", a: "After you submit the contact form or book a demo call, NightDesk responds within 24 hours to schedule a 30-minute discovery call. Within 48 hours of the discovery call, you receive a free hotel audit report showing exactly how much revenue you are losing to OTAs." },
  { q: "How is NightDesk different from hiring a marketing agency?", a: "Most marketing agencies are generalists. NightDesk works exclusively with hotels and specifically focuses on the OTA dependency problem. This specialization means NightDesk understands hotel revenue management, OTA dynamics, and guest booking behavior at a level that generalist agencies cannot match." },
  { q: "Do you offer a free trial?", a: "NightDesk does not offer a free trial, but does offer a 30-day satisfaction guarantee. If you are not satisfied with the results after 30 days, NightDesk will refund your first month's fee." },
  { q: "What countries do you operate in?", a: "NightDesk operates worldwide. The AI receptionist supports 10+ languages, and Google Ads campaigns can be run in any country where Google Ads is available. All work is done remotely." },
  { q: "What is your response time for support?", a: "Standard clients receive a response within 24 business hours. Complete package clients receive priority support with a 2-hour response time during business hours." },
  { q: "Is my hotel data secure?", a: "Yes. NightDesk is GDPR compliant and follows industry-standard data security practices. Guest conversation data is stored securely and never shared with third parties. NightDesk uses SSL encryption for all data transmission." },
  { q: "Can the chatbot handle complaints?", a: "The AI receptionist is trained to handle common complaints professionally and escalate serious issues to a human team member. For complaints about room conditions, billing disputes, or other sensitive matters, the AI acknowledges the concern and immediately connects the guest with a human staff member." },
];

function AccordionItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: "1rem" }}>
        <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.15rem", fontWeight: 600, color: "#F5F0E8", lineHeight: 1.4 }}>{question}</span>
        {open ? <Minus size={16} color="#C9A84C" style={{ flexShrink: 0 }} /> : <Plus size={16} color="#C9A84C" style={{ flexShrink: 0 }} />}
      </button>
      {open && <div style={{ paddingBottom: "1.25rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", lineHeight: 1.8, color: "rgba(245,240,232,0.75)" }}>{answer}</div>}
    </div>
  );
}

export default function FAQ() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen" style={{ background: "#0A0A0F", color: "#F5F0E8" }}>
      <Navbar />
      <div style={{ paddingTop: "8rem", paddingBottom: "4rem", maxWidth: "800px", margin: "0 auto", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(245,240,232,0.45)", textDecoration: "none", marginBottom: "2rem", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif" }}>
          <ArrowLeft size={14} /> Back to Home
        </Link>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "3.5rem", fontWeight: 600, marginBottom: "1rem", lineHeight: 1.1 }}>Frequently Asked Questions</h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.1rem", color: "rgba(245,240,232,0.6)", marginBottom: "3rem", lineHeight: 1.7 }}>
          Everything hotel owners ask before working with NightDesk. Can't find your answer?{" "}
          <a href="mailto:hello@nightdesk.agency" style={{ color: "#C9A84C" }}>Email us directly</a>.
        </p>
        <div>{faqs.map((faq, i) => <AccordionItem key={i} question={faq.q} answer={faq.a} index={i} />)}</div>
        <div style={{ marginTop: "3rem", padding: "2rem", background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "12px", textAlign: "center" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.75rem", fontWeight: 600, marginBottom: "1rem" }}>Still Have Questions?</h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "rgba(245,240,232,0.7)", marginBottom: "1.5rem" }}>Book a free 30-minute call and we'll answer everything specific to your hotel.</p>
          <a href="https://calendly.com/hello-nightdesk/30min" target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ padding: "0.75rem 1.75rem", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            Book Free Demo Call <ArrowRight size={14} />
          </a>
        </div>
      </div>
      <ContactCTA />
    </div>
  );
}
