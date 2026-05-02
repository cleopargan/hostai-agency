import { useEffect, useRef, useState } from "react";
import { Search, Target, Globe, FileText, CheckCircle2 } from "lucide-react";

const channels = [
  {
    id: "google-ads",
    tab: "Google Ads",
    icon: Search,
    color: "#4A90E2",
    bg: "rgba(74,144,226,0.06)",
    border: "rgba(74,144,226,0.18)",
    headline: "Capture Guests Who Are Ready to Book",
    subheadline: "Show up at the exact moment a traveler searches for a hotel in your city — before they hit Booking.com.",
    metric: { value: "3.8×", label: "Average ROAS", note: "For boutique hotel clients" },
    features: [
      { title: "Search Campaigns", desc: "Bidding on high-intent keywords like 'hotel in [city]', 'boutique hotel near [landmark]', and 'best hotel [neighborhood]'." },
      { title: "Google Hotel Ads", desc: "Your property listed directly in Google's hotel carousel with live rates and availability — the most visible placement." },
      { title: "Display & Retargeting", desc: "Re-engage visitors who browsed your site but didn't book. Bring them back with tailored display ads across millions of websites." },
      { title: "Performance Max", desc: "AI-powered campaigns that span Search, Display, YouTube, and Maps — maximising reach across Google's entire network." },
    ],
    proof: "One boutique hotel in Lisbon went from $0 to $18,400/month in direct revenue within 90 days of launching Google Ads with us.",
  },
  {
    id: "facebook-ads",
    tab: "Facebook Ads",
    icon: Target,
    color: "#7B5EA7",
    bg: "rgba(123,94,167,0.06)",
    border: "rgba(123,94,167,0.18)",
    headline: "Re-Engage Past Visitors & Find New Guests",
    subheadline: "Facebook and Instagram's targeting lets you reach people who already know your hotel — and find thousands more just like them.",
    metric: { value: "−42%", label: "Cost Per Booking", note: "vs. OTA commission average" },
    features: [
      { title: "Pixel Setup & Events", desc: "We install and configure the Meta Pixel on your site so you can track every visitor, booking page view, and completed reservation." },
      { title: "Website Retargeting", desc: "Serve ads to people who visited your site in the last 30, 60, or 90 days — reminding them why your property stood out." },
      { title: "Lookalike Audiences", desc: "Upload your past guest list and Meta finds millions of people with the same travel habits, demographics, and interests." },
      { title: "Video & Carousel Ads", desc: "Showcase your rooms, amenities, and local experiences with stunning video content and multi-image carousel formats." },
    ],
    proof: "A family-run resort in Tuscany cut their Booking.com dependency by 60% after 4 months of Facebook retargeting campaigns.",
  },
  {
    id: "bing-ads",
    tab: "Bing Ads",
    icon: Globe,
    color: "#00B4D8",
    bg: "rgba(0,180,216,0.06)",
    border: "rgba(0,180,216,0.18)",
    headline: "Underpriced Traffic. Premium Guests.",
    subheadline: "Most hotels ignore Bing. That means lower competition, lower CPCs, and more budget left over to scale what's working.",
    metric: { value: "−38%", label: "Lower CPC vs Google", note: "Same keywords, same intent" },
    features: [
      { title: "Microsoft Advertising Setup", desc: "We create and manage your campaigns directly in Microsoft Advertising — or seamlessly import and adapt from your Google Ads." },
      { title: "LinkedIn Profile Targeting", desc: "Unique to Bing: target users based on their LinkedIn job title, industry, and seniority. Perfect for corporate travel and events." },
      { title: "Older, Wealthier Demographics", desc: "Bing users skew 35–65, with higher household incomes. That's exactly the demographic that books boutique hotels over hostels." },
      { title: "Bing Shopping & Maps", desc: "List your property in Bing's travel results and local map pack — placements your competitors almost certainly aren't bidding on." },
    ],
    proof: "Adding Bing to an existing Google Ads campaign increased total bookings by 22% with only 15% additional ad spend.",
  },
  {
    id: "seo-pages",
    tab: "SEO Pages",
    icon: FileText,
    color: "#6EE7B7",
    bg: "rgba(110,231,183,0.06)",
    border: "rgba(110,231,183,0.18)",
    headline: "Rank for 'Hotel Near [Your City]' — Organically",
    subheadline: "Paid ads stop when your budget does. SEO landing pages compound over time and deliver free bookings for years.",
    metric: { value: "+180%", label: "Organic Traffic", note: "Avg. growth at 6 months" },
    features: [
      { title: "Location-Specific Pages", desc: "We build dedicated pages for every valuable keyword — 'hotel in [neighbourhood]', 'hotel near [airport]', 'pet-friendly hotel [city]'." },
      { title: "Google My Business", desc: "Full GMB optimisation including photos, posts, review responses, and Q&A — the most impactful local SEO signal." },
      { title: "Schema Markup", desc: "Structured data that helps Google understand your property — enabling rich snippets with star ratings and price ranges in search results." },
      { title: "Technical SEO Audit", desc: "Page speed, Core Web Vitals, mobile usability, and internal linking — every technical factor that affects how Google ranks your site." },
    ],
    proof: "A 12-room guesthouse in Edinburgh now receives 1,400+ organic visits per month from SEO pages we built 8 months ago. Zero ad spend.",
  },
];

export default function MarketingChannels() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const channel = channels[active];
  const Icon = channel.icon;

  return (
    <section
      id="how-it-works"
      ref={ref}
      style={{
        background: "linear-gradient(180deg, #080810 0%, #06060e 100%)",
        padding: "6rem 0 7rem",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span className="section-label" style={{ display: "inline-flex", marginBottom: "1.25rem" }}>
            Channel Deep Dive
          </span>
          <h2
            className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(1.9rem, 3.5vw, 2.75rem)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              color: "#F5F0E8",
            }}
          >
            How We Drive{" "}
            <em style={{
              fontStyle: "italic",
              background: "linear-gradient(90deg, #BFA06A, #E8C96A, #C9A84C)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Direct Bookings
            </em>
          </h2>
        </div>

        {/* Tab buttons */}
        <div
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{
            transitionDelay: "100ms",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginBottom: "2.5rem",
            justifyContent: "center",
          }}
        >
          {channels.map((c, i) => {
            const TabIcon = c.icon;
            const isActive = i === active;
            return (
              <button
                key={c.id}
                onClick={() => setActive(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.625rem 1.25rem",
                  background: isActive ? c.bg : "transparent",
                  border: `1px solid ${isActive ? c.color : "rgba(255,255,255,0.08)"}`,
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: "0.06em",
                  color: isActive ? c.color : "rgba(245,240,232,0.45)",
                  boxShadow: isActive ? `0 0 20px ${c.bg}` : "none",
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.7)";
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.45)";
                  }
                }}
              >
                <TabIcon size={13} />
                {c.tab}
              </button>
            );
          })}
        </div>

        {/* Content panel */}
        <div
          key={active}
          style={{
            animation: "fadeInUp 0.4s ease forwards",
            display: "grid",
            gap: "2rem",
            alignItems: "start",
          }}
          className="lg:grid-cols-5"
        >
          {/* Left — Details (3 cols) */}
          <div
            style={{
              padding: "2rem",
              background: channel.bg,
              border: `1px solid ${channel.border}`,
              gridColumn: "span 3",
              position: "relative",
              overflow: "hidden",
            }}
            className="lg:col-span-3"
          >
            <div style={{
              position: "absolute",
              top: 0, left: 0, right: 0,
              height: "2px",
              background: `linear-gradient(90deg, ${channel.color}, transparent)`,
            }} />

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{
                width: "2.5rem", height: "2.5rem",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: `${channel.bg}`,
                border: `1px solid ${channel.border}`,
              }}>
                <Icon size={16} style={{ color: channel.color }} />
              </div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.65rem",
                fontWeight: 600,
                color: "#F5F0E8",
                lineHeight: 1.1,
              }}>
                {channel.headline}
              </h3>
            </div>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.92rem",
              lineHeight: 1.75,
              color: "rgba(245,240,232,0.5)",
              marginBottom: "2rem",
            }}>
              {channel.subheadline}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {channel.features.map((f, i) => (
                <div
                  key={f.title}
                  style={{
                    display: "flex",
                    gap: "1rem",
                    paddingBottom: i < channel.features.length - 1 ? "1.25rem" : 0,
                    borderBottom: i < channel.features.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  }}
                >
                  <div style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: "1px",
                  }}>
                    <CheckCircle2 size={14} style={{ color: channel.color }} />
                  </div>
                  <div>
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: "#F5F0E8",
                      marginBottom: "0.25rem",
                    }}>
                      {f.title}
                    </div>
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.8rem",
                      lineHeight: 1.65,
                      color: "rgba(245,240,232,0.42)",
                    }}>
                      {f.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Metric + Proof (2 cols) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }} className="lg:col-span-2">

            {/* Big metric */}
            <div style={{
              padding: "2rem",
              background: "rgba(201,168,76,0.04)",
              border: "1px solid rgba(201,168,76,0.14)",
              textAlign: "center",
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2.75rem, 5vw, 4rem)",
                fontWeight: 600,
                background: "linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1,
                marginBottom: "0.5rem",
              }}>
                {channel.metric.value}
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "rgba(245,240,232,0.7)",
                marginBottom: "0.3rem",
              }}>
                {channel.metric.label}
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.68rem",
                color: "rgba(245,240,232,0.3)",
                letterSpacing: "0.04em",
              }}>
                {channel.metric.note}
              </div>
            </div>

            {/* Proof quote */}
            <div style={{
              padding: "1.5rem",
              background: "rgba(255,255,255,0.015)",
              border: "1px solid rgba(255,255,255,0.06)",
              position: "relative",
            }}>
              <div style={{
                position: "absolute",
                top: "1rem", left: "1.25rem",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "3rem",
                lineHeight: 1,
                color: "rgba(201,168,76,0.2)",
                userSelect: "none",
              }}>
                "
              </div>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.82rem",
                lineHeight: 1.75,
                color: "rgba(245,240,232,0.45)",
                fontStyle: "italic",
                paddingTop: "1.25rem",
              }}>
                {channel.proof}
              </p>
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="btn-gold"
              style={{
                padding: "0.875rem 1.5rem",
                fontSize: "0.75rem",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              Get {channel.tab} Audit →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
