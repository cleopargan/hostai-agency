import { useEffect, useRef, useState } from "react";
import { Search, Globe, Sparkles, MessageCircle, BarChart2, CheckCircle2 } from "lucide-react";

const channels = [
  {
    id: "google-bing-ads",
    tab: "Google & Bing Ads",
    icon: Search,
    color: "#4A90E2",
    bg: "rgba(74,144,226,0.06)",
    border: "rgba(74,144,226,0.18)",
    headline: "Capture High-Intent Demand Before It Reaches an OTA",
    subheadline: "When travellers search for a hotel, they want answers now. We put your property in front of that demand with tightly managed Google and Bing campaigns.",
    metric: { value: "3.8×", label: "Average ROAS", note: "Across hotel clients" },
    features: [
      { title: "Search & Hotel Ads", desc: "We run search, hotel listing, and property promotion campaigns so your direct rate is visible at the exact moment travellers compare options." },
      { title: "Bid & Budget Control", desc: "Our team adjusts bids, budgets, and negative keywords weekly to keep spend efficient and profitable." },
      { title: "Cross-Channel Coverage", desc: "Google and Bing are managed together so you benefit from both high-volume demand and lower-cost inventory." },
    ],
    proof: "One boutique hotel in Lisbon moved from paid traffic with low intent to a direct-booking engine that generated over $18k in monthly revenue in under 90 days.",
  },
  {
    id: "seo-global-search",
    tab: "SEO & Global Search",
    icon: Globe,
    color: "#6EE7B7",
    bg: "rgba(110,231,183,0.06)",
    border: "rgba(110,231,183,0.18)",
    headline: "Build an Evergreen Search Foundation",
    subheadline: "SEO compounds over time. We create location pages, optimise technical signals, and strengthen your local visibility so bookings keep arriving without paying per click.",
    metric: { value: "+180%", label: "Organic Traffic", note: "At 6 months" },
    features: [
      { title: "Location Pages", desc: "We publish keyword-specific pages for your highest-value stay types, destinations, and local attractions." },
      { title: "Google My Business", desc: "We manage your profile, reviews, local posts, and booking assets so your map presence stays active and relevant." },
      { title: "Technical SEO", desc: "Schema, page speed, internal linking, and indexing are all treated as part of the booking engine, not an afterthought." },
    ],
    proof: "A 12-room guesthouse in Edinburgh now receives 1,400+ organic visits per month from pages we built and optimised over time.",
  },
  {
    id: "direct-booking-ai",
    tab: "Direct Booking AI",
    icon: Sparkles,
    color: "#7B5EA7",
    bg: "rgba(123,94,167,0.06)",
    border: "rgba(123,94,167,0.18)",
    headline: "Convert More of Your Traffic Before It Leaves",
    subheadline: "Most hotel sites lose visitors at the last step. Our AI conversion layer engages users in real time, answers objections, and nudges them toward booking directly.",
    metric: { value: "+1.4%", label: "Avg. Conversion Lift", note: "On paid and organic traffic" },
    features: [
      { title: "AI Concierge Chat", desc: "A hotel-trained assistant answers pre-booking questions, recommends rooms, and handles objections while visitors are still on-site." },
      { title: "Rate & Value Messaging", desc: "We surface direct-booking incentives, clearer value, and smarter urgency without relying on fake scarcity." },
      { title: "Recovery Flows", desc: "We deploy exit-intent and abandoned-booking recovery tools so you recover more of the traffic you already paid to acquire." },
    ],
    proof: "Properties using our conversion layer have seen measurable lifts in direct booking rate and lower abandonment at the booking funnel.",
  },
  {
    id: "digital-concierge",
    tab: "Digital Concierge",
    icon: MessageCircle,
    color: "#00B4D8",
    bg: "rgba(0,180,216,0.06)",
    border: "rgba(0,180,216,0.18)",
    headline: "Turn Every Stay Into a Repeat-Stay Opportunity",
    subheadline: "The best booking is the one that comes back. We automate guest communication before arrival, during the stay, and after checkout to increase ADR and reviews.",
    metric: { value: "+$30", label: "Avg. Upsell Value", note: "Per booking" },
    features: [
      { title: "Pre-Arrival Automation", desc: "We send useful reminders, local recommendations, and upgrade offers before guests arrive." },
      { title: "In-Stay Support", desc: "Guests receive timely help, suggestions, and service prompts without needing the front desk to manually respond every time." },
      { title: "Review & Win-Back", desc: "We trigger review requests and returning-guest campaigns so your property keeps growing after checkout." },
    ],
    proof: "Our concierge workflows help hotels improve guest experience, collect more 5-star reviews, and increase repeat direct stays.",
  },
  {
    id: "ceo-command-center",
    tab: "CEO Command Center",
    icon: BarChart2,
    color: "#C9A84C",
    bg: "rgba(201,168,76,0.06)",
    border: "rgba(201,168,76,0.18)",
    headline: "See the Whole Revenue Picture in One Place",
    subheadline: "Owners should not have to stitch together Google Ads reports, SEO data, and OTA numbers. We centralise the data so you can make decisions quickly.",
    metric: { value: "1 View", label: "All Reporting", note: "SEO, ads, bookings, and revenue" },
    features: [
      { title: "Unified Dashboard", desc: "Track performance across paid search, organic search, direct bookings, ADR, and guest engagement from one place." },
      { title: "Direct vs OTA Insights", desc: "We surface the economics that matter most so you can compare acquisition cost and booking value clearly." },
      { title: "Executive Reporting", desc: "Weekly and monthly updates keep owners informed without long, confusing spreadsheets or status meetings." },
    ],
    proof: "Leadership teams tell us the Command Center gives them clarity on what is working, where the gaps are, and where to scale next.",
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
