import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactCTA from "@/components/ContactCTA";

export default function GoogleAdsForHotels() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen" style={{ background: "#0A0A0F", color: "#F5F0E8" }}>
      <Navbar />
      <div style={{ paddingTop: "8rem", paddingBottom: "4rem", maxWidth: "760px", margin: "0 auto", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(245,240,232,0.45)", textDecoration: "none", marginBottom: "2rem", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif" }}>
          <ArrowLeft size={14} /> Back to Blog
        </Link>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.5rem" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "#C9A84C", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Google Ads</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "rgba(245,240,232,0.35)" }}>April 2026 · 7 min read</span>
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "3rem", fontWeight: 600, marginBottom: "1.5rem", lineHeight: 1.1 }}>
          How Google Ads Can Help Hotels Reduce OTA Dependency
        </h1>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", lineHeight: 1.9, color: "rgba(245,240,232,0.8)" }}>
          <p style={{ marginBottom: "1.5rem" }}>Most hotel Google Ads campaigns fail. They target broad, competitive keywords like "hotels in Paris" where Booking.com and Expedia spend millions of dollars per month. The hotel runs out of budget in two days, gets a handful of clicks, and concludes that Google Ads does not work for hotels. This conclusion is wrong. The campaign was wrong.</p>
          <p style={{ marginBottom: "1.5rem" }}>Google Ads absolutely works for hotels — when done correctly. The key is understanding that hotels should not compete with OTAs on OTA keywords. Hotels should compete on keywords that OTAs cannot own: your hotel's name, your specific type of hotel, and your specific location.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>Why Generic Hotel Google Ads Fail</h2>
          <p style={{ marginBottom: "1.5rem" }}>The problem with generic hotel Google Ads campaigns is that they target keywords where OTAs have an insurmountable competitive advantage. Booking.com's Google Ads budget is estimated at over $1 billion per year. Expedia's is similar. No boutique hotel can compete for the keyword "hotels in Barcelona" against that kind of spending.</p>
          <p style={{ marginBottom: "1.5rem" }}>Generic campaigns also target the wrong intent. A traveler searching "hotels in Barcelona" is in the early research phase — they are not ready to book your specific hotel. They are comparing options. OTAs are better at the comparison phase. Hotels should focus on the decision phase, when a traveler has already decided they want a hotel like yours and is looking for the best way to book it.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>The Hotel-Specific Google Ads Approach</h2>
          <p style={{ marginBottom: "1.5rem" }}>NightDesk's Google Ads approach for hotels focuses on three keyword categories that OTAs cannot dominate.</p>
          <p style={{ marginBottom: "1.5rem" }}><strong style={{ color: "#F5F0E8" }}>Brand keywords:</strong> Searches for your hotel's name specifically. These are travelers who already know about your hotel and are looking for the best way to book. If you are not bidding on your own brand keywords, OTAs are — and they are capturing guests who were already looking for you specifically.</p>
          <p style={{ marginBottom: "1.5rem" }}><strong style={{ color: "#F5F0E8" }}>Specific type keywords:</strong> Searches like "boutique hotel with rooftop pool Barcelona" or "family-friendly bed and breakfast near Sagrada Familia." These are travelers who know exactly what they want and are looking for a hotel that matches. The specificity means lower competition and higher conversion rates.</p>
          <p style={{ marginBottom: "1.5rem" }}><strong style={{ color: "#F5F0E8" }}>Competitor targeting:</strong> Showing your hotel's ads to travelers who are searching for similar hotels in your area. If a traveler is looking at a competitor, showing them your hotel as an alternative can capture bookings that would otherwise go to a competitor or an OTA.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>Remarketing: The Most Underused Hotel Google Ads Strategy</h2>
          <p style={{ marginBottom: "1.5rem" }}>Remarketing campaigns target travelers who have already visited your website but did not book. These are your warmest potential customers — they were interested enough to visit your site, but something stopped them from booking. Remarketing shows them your hotel's ads as they browse other websites, reminding them of your property and giving them another opportunity to book directly.</p>
          <p style={{ marginBottom: "1.5rem" }}>Remarketing campaigns typically have much lower cost per click than search campaigns and much higher conversion rates, because they are targeting people who already know your hotel. For boutique hotels with limited Google Ads budgets, remarketing is often the highest-ROI campaign type.</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem", marginTop: "2.5rem" }}>The Economics of Hotel Google Ads</h2>
          <p style={{ marginBottom: "1.5rem" }}>NightDesk recommends a minimum ad spend budget of $500/month for hotel Google Ads. With NightDesk's management fee of $1,000/month, the total investment is $1,500/month. For a hotel with an average room rate of $150 and a 2-night average stay, this investment needs to generate just 5 additional direct bookings per month to break even. Most NightDesk clients see significantly more than that within the first 90 days.</p>
          <p style={{ marginBottom: "1.5rem" }}>The key metric is not cost per click — it is cost per direct booking. A click that costs $2 but converts to a $300 direct booking is a much better investment than a click that costs $0.50 but never converts. NightDesk optimizes for cost per direct booking, not cost per click.</p>
          <div style={{ marginTop: "3rem", padding: "2rem", background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "12px", textAlign: "center" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.75rem", fontWeight: 600, marginBottom: "1rem" }}>Get a Google Ads Audit for Your Hotel</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "rgba(245,240,232,0.7)", marginBottom: "1.5rem" }}>Book a free 30-minute call to see exactly what a hotel-specific Google Ads strategy would look like for your property.</p>
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
