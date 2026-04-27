import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactCTA from "@/components/ContactCTA";

export default function WhyHotelsLoseBookingsToOtas() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen" style={{ background: "#0A0A0F", color: "#F5F0E8" }}>
      <Navbar />
      <div style={{ paddingTop: "8rem", paddingBottom: "4rem", maxWidth: "760px", margin: "0 auto", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(245,240,232,0.45)", textDecoration: "none", marginBottom: "2rem", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif" }}>
          <ArrowLeft size={14} /> Back to Blog
        </Link>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.5rem" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "#C9A84C", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Hotel Revenue</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "rgba(245,240,232,0.35)" }}>April 2026 · 7 min read</span>
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "3rem", fontWeight: 600, marginBottom: "1.5rem", lineHeight: 1.1 }}>
          Why Boutique Hotels Lose 63% of Bookings to OTAs (And How to Fix It)
        </h1>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", lineHeight: 1.9, color: "rgba(245,240,232,0.8)" }}>
          <p style={{ marginBottom: "1.5rem" }}>If you own or manage a boutique hotel, you already know the number. Somewhere between 50% and 75% of your bookings come through Booking.com, Expedia, or another OTA — and each one costs you 15 to 22% of the booking value in commission. For a 30-room hotel with an average room rate of $150 and 65% occupancy, that is over $80,000 per year going to platforms that did not build your hotel, do not know your guests, and will happily list your competitors right next to you.</p>
          <p style={{ marginBottom: "1.5rem" }}>The frustrating part is that most of those guests would have been happy to book directly. They were already on your website. They were interested in your property. Something stopped them — and that something is almost always the same thing.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>The 2 AM Problem</h2>
          <p style={{ marginBottom: "1.5rem" }}>Here is the scenario that plays out thousands of times every night across the hotel industry. A traveler is planning a trip. They find your hotel through a Google search or a social media post. They visit your website. They are genuinely interested — they like the photos, they like the location, they like the vibe. But they have a question. Maybe it is about parking. Maybe it is about whether the breakfast is included. Maybe it is about whether the room they are looking at has a view.</p>
          <p style={{ marginBottom: "1.5rem" }}>It is 2 AM. Nobody is answering your phone. Your contact form will get a reply tomorrow morning, maybe. So the traveler does what travelers do: they go to Booking.com, where all the information is already listed, the reviews are there, the booking is instant, and the questions are answered. You just paid 18% commission on a guest who was already on your website.</p>
          <p style={{ marginBottom: "1.5rem" }}>This is not a hypothetical. Research consistently shows that the most common reason hotel website visitors abandon without booking is unanswered questions. Not price. Not trust. Questions. The guest wanted information that was not immediately available, and they went somewhere that had it.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>Why OTAs Win on Information</h2>
          <p style={{ marginBottom: "1.5rem" }}>OTAs have invested billions of dollars in making it easy for travelers to find the information they need. Booking.com has standardized hotel information across thousands of properties. Expedia has a review system that answers common questions through social proof. They have FAQ sections, photo galleries organized by room type, and instant booking confirmation.</p>
          <p style={{ marginBottom: "1.5rem" }}>Your hotel website, no matter how beautiful, cannot match this information density — at least not without a significant investment in content. And even if your website has all the information, it is static. It cannot answer a question that is specific to a particular guest's situation. "Do you have a room that can fit a crib for our toddler?" is not answered by your standard room description.</p>
          <p style={{ marginBottom: "1.5rem" }}>This is the information gap that OTAs exploit. They are not winning because they are better than your hotel. They are winning because they are better at answering questions at 2 AM.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>The Three Root Causes of OTA Dependency</h2>
          <p style={{ marginBottom: "1.5rem" }}>After working with boutique hotels, NightDesk has identified three root causes of OTA dependency. They are related, but distinct — and each requires a different solution.</p>
          <p style={{ marginBottom: "1.5rem" }}><strong style={{ color: "#F5F0E8" }}>Root Cause 1: Unanswered inquiries.</strong> Guests visit your website, have questions, do not get answers, and book through OTAs instead. The solution is an AI receptionist that answers questions instantly, 24/7.</p>
          <p style={{ marginBottom: "1.5rem" }}><strong style={{ color: "#F5F0E8" }}>Root Cause 2: Invisible direct booking channel.</strong> Guests search for hotels like yours on Google and find OTA listings, not your website. The solution is hotel-specific Google Ads that make your direct booking channel visible to travelers with booking intent.</p>
          <p style={{ marginBottom: "1.5rem" }}><strong style={{ color: "#F5F0E8" }}>Root Cause 3: Friction in the direct booking flow.</strong> Guests who do visit your website find the booking process slower, more complicated, or less trustworthy than OTAs. The solution is direct booking optimization that makes your booking flow as seamless as any OTA.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>The Economics of Fixing It</h2>
          <p style={{ marginBottom: "1.5rem" }}>Let us do the math for a typical boutique hotel. 30 rooms, $150 average rate, 65% occupancy. Monthly revenue: approximately $87,750. OTA mix: 60%. Monthly OTA revenue: $52,650. Average OTA commission: 18%. Monthly commission cost: $9,477.</p>
          <p style={{ marginBottom: "1.5rem" }}>If NightDesk's three services shift 20% of OTA bookings to direct — a conservative estimate based on typical results — the monthly commission saving is $1,895. NightDesk Complete costs $2,000–$2,500/month. The investment pays for itself when the direct booking shift reaches approximately 25%, and every percentage point beyond that is pure profit.</p>
          <p style={{ marginBottom: "1.5rem" }}>More importantly, direct bookings compound. Each direct booking is a guest whose contact information you own, who you can market to for future stays, and who is more likely to return directly. OTA bookings do not compound — each one is a transaction that benefits the OTA as much as it benefits you.</p>
          <div style={{ marginTop: "3rem", padding: "2rem", background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "12px", textAlign: "center" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.75rem", fontWeight: 600, marginBottom: "1rem" }}>Get Your Free Hotel Audit</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "rgba(245,240,232,0.7)", marginBottom: "1.5rem" }}>See exactly how much you're paying in OTA commissions and how much NightDesk could recover.</p>
            <a href="https://calendly.com/hello-nightdesk/30min" target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ padding: "0.75rem 1.75rem", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              Book Free 30-Min Call <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
      <ContactCTA />
    </div>
  );
}
