import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactCTA from "@/components/ContactCTA";

const posts = [
  {
    slug: "/blog/why-hotels-lose-bookings-to-otas",
    category: "Hotel Revenue",
    title: "Why Boutique Hotels Lose 63% of Bookings to OTAs (And How to Fix It)",
    excerpt: "Hotels lose the majority of their bookings to OTAs not because OTAs are better, but because hotels cannot answer guest questions at 2 AM. Here is how to fix it.",
    date: "April 2026",
    readTime: "7 min read",
  },
  {
    slug: "/blog/what-is-ai-receptionist-for-hotels",
    category: "AI Technology",
    title: "What is an AI Receptionist for Hotels? Complete Guide 2026",
    excerpt: "A complete guide to hotel AI receptionists: what they are, how they work, what they can answer, and how they drive direct bookings.",
    date: "April 2026",
    readTime: "8 min read",
  },
  {
    slug: "/blog/google-ads-for-hotels",
    category: "Google Ads",
    title: "How Google Ads Can Help Hotels Reduce OTA Dependency",
    excerpt: "Most hotel Google Ads campaigns fail because they target the wrong keywords. Here is the hotel-specific approach that actually works.",
    date: "April 2026",
    readTime: "7 min read",
  },
  {
    slug: "/blog/true-cost-of-booking-com-commission",
    category: "Revenue Management",
    title: "The True Cost of Booking.com Commission: A Hotel Owner's Guide",
    excerpt: "The commission itself is only part of the cost. Here is a complete breakdown of what Booking.com dependency actually costs your hotel.",
    date: "April 2026",
    readTime: "6 min read",
  },
  {
    slug: "/blog/direct-booking-vs-ota",
    category: "Strategy",
    title: "Direct Booking vs OTA: Which is Better for Boutique Hotels?",
    excerpt: "The honest answer: both. But with a deliberate plan to shift the balance toward direct bookings over time. Here is how to think about it.",
    date: "April 2026",
    readTime: "7 min read",
  },
];

export default function Blog() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen" style={{ background: "#0A0A0F", color: "#F5F0E8" }}>
      <Navbar />
      <div style={{ paddingTop: "8rem", paddingBottom: "4rem", maxWidth: "800px", margin: "0 auto", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(245,240,232,0.45)", textDecoration: "none", marginBottom: "2rem", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif" }}>
          <ArrowLeft size={14} /> Back to Home
        </Link>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "3.5rem", fontWeight: 600, marginBottom: "1rem", lineHeight: 1.1 }}>
          NightDesk Blog
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.1rem", color: "rgba(245,240,232,0.6)", marginBottom: "3rem", lineHeight: 1.7 }}>
          Insights on hotel AI, direct booking strategy, OTA management, and Google Ads for boutique hotels.
        </p>
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {posts.map((post, i) => (
            <Link key={i} href={post.slug} style={{ textDecoration: "none", display: "block" }}>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "1.75rem", transition: "border-color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
              >
                <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "0.75rem" }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "#C9A84C", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>{post.category}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "rgba(245,240,232,0.35)" }}>{post.date} · {post.readTime}</span>
                </div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.4rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "0.75rem", lineHeight: 1.3 }}>{post.title}</h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "rgba(245,240,232,0.6)", lineHeight: 1.6, marginBottom: "1rem" }}>{post.excerpt}</p>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "#C9A84C", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                  Read Article <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <ContactCTA />
    </div>
  );
}
