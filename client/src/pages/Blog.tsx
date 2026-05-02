import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, Clock, Tag } from "lucide-react";
import MarketingNavbar from "@/components/MarketingNavbar";

const posts = [
  {
    slug: "/blog/why-hotels-lose-bookings-to-otas",
    category: "Hotel Revenue",
    categoryColor: "#C9A84C",
    title: "Why Boutique Hotels Lose 63% of Bookings to OTAs (And How to Fix It)",
    excerpt: "Hotels lose the majority of their bookings to OTAs not because OTAs are better, but because hotels cannot answer guest questions at 2 AM. Here is how to fix it.",
    date: "April 2026",
    readTime: "7 min read",
  },
  {
    slug: "/blog/what-is-ai-receptionist-for-hotels",
    category: "AI Technology",
    categoryColor: "#6EE7B7",
    title: "What is an AI Receptionist for Hotels? Complete Guide 2026",
    excerpt: "A complete guide to hotel AI receptionists: what they are, how they work, what they can answer, and how they drive direct bookings.",
    date: "April 2026",
    readTime: "8 min read",
  },
  {
    slug: "/blog/google-ads-for-hotels",
    category: "Google Ads",
    categoryColor: "#4A90E2",
    title: "How Google Ads Can Help Hotels Reduce OTA Dependency",
    excerpt: "Most hotel Google Ads campaigns fail because they target the wrong keywords. Here is the hotel-specific approach that actually works.",
    date: "April 2026",
    readTime: "7 min read",
  },
  {
    slug: "/blog/true-cost-of-booking-com-commission",
    category: "Revenue Management",
    categoryColor: "#7B5EA7",
    title: "The True Cost of Booking.com Commission: A Hotel Owner's Guide",
    excerpt: "The commission itself is only part of the cost. Here is a complete breakdown of what Booking.com dependency actually costs your hotel.",
    date: "April 2026",
    readTime: "6 min read",
  },
  {
    slug: "/blog/direct-booking-vs-ota",
    category: "Strategy",
    categoryColor: "#00B4D8",
    title: "Direct Booking vs OTA: Which is Better for Boutique Hotels?",
    excerpt: "The honest answer: both. But with a deliberate plan to shift the balance toward direct bookings over time. Here is how to think about it.",
    date: "April 2026",
    readTime: "7 min read",
  },
];

export default function Blog() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen" style={{ background: "#080810", color: "#F5F0E8" }}>
      <MarketingNavbar />

      {/* Header */}
      <section style={{
        paddingTop: "9rem", paddingBottom: "5rem",
        background: "#080810", position: "relative", overflow: "hidden",
      }}>
        <div className="absolute pointer-events-none" style={{ top: "0%", left: "50%", transform: "translateX(-50%)", width: "800px", height: "400px", background: "radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 60%)", filter: "blur(80px)" }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.18), transparent)" }} />

        <div className="container relative z-10">
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(245,240,232,0.35)", textDecoration: "none", marginBottom: "2rem", fontSize: "0.75rem", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.06em" }}>
            ← Back to Home
          </Link>
          <span className="section-label" style={{ display: "inline-flex", marginBottom: "1.25rem" }}>Blog</span>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(2.5rem, 5vw, 3.75rem)", fontWeight: 600,
            lineHeight: 1.06, letterSpacing: "-0.02em", color: "#F5F0E8",
            marginBottom: "1.25rem", maxWidth: "700px",
          }}>
            Hotel Revenue &{" "}
            <em style={{ fontStyle: "italic", background: "linear-gradient(90deg, #BFA06A, #E8C96A, #C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Direct Booking Intelligence
            </em>
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "rgba(245,240,232,0.45)", maxWidth: "560px", lineHeight: 1.75 }}>
            Insights on hotel AI, direct booking strategy, OTA management, and Google Ads — written for boutique hotel and resort operators.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section style={{ background: "#06060e", padding: "4rem 0 7rem", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="container" style={{ maxWidth: "860px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {posts.map((post, i) => (
              <Link key={i} href={post.slug} style={{ textDecoration: "none", display: "block" }}>
                <div
                  style={{
                    padding: "2rem", background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    position: "relative", overflow: "hidden",
                    transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.25)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 60px rgba(0,0,0,0.3)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "3px", background: `linear-gradient(180deg, ${post.categoryColor}, transparent)`, opacity: 0.6 }} />

                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.875rem", marginBottom: "1rem", paddingLeft: "0.75rem" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: post.categoryColor }}>
                      <Tag size={9} /> {post.category}
                    </span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "rgba(245,240,232,0.28)" }}>
                      <Clock size={10} /> {post.date} · {post.readTime}
                    </span>
                  </div>

                  <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.3rem, 2.5vw, 1.6rem)", fontWeight: 600, color: "#F5F0E8", marginBottom: "0.75rem", lineHeight: 1.2, paddingLeft: "0.75rem" }}>
                    {post.title}
                  </h2>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "rgba(245,240,232,0.48)", lineHeight: 1.72, marginBottom: "1.25rem", paddingLeft: "0.75rem" }}>
                    {post.excerpt}
                  </p>
                  <div style={{ paddingLeft: "0.75rem", display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: post.categoryColor }}>
                    Read Article <ArrowRight size={11} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div style={{ marginTop: "4rem", padding: "2rem", background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.14)", textAlign: "center" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.75rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "0.75rem" }}>
              Want These Insights For Your Hotel?
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "rgba(245,240,232,0.42)", marginBottom: "1.5rem", lineHeight: 1.7 }}>
              Book a free 30-minute audit. We'll apply these strategies to your specific property and market.
            </p>
            <a href="https://calendly.com/hello-nightdesk/30min" target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ padding: "0.75rem 1.75rem", fontSize: "0.8rem" }}>
              Book Free Hotel Audit <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
