import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function MarketingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [barVisible, setBarVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Services", href: "#features" },
    { label: "Channels", href: "#how-it-works" },
    { label: "Results", href: "#results" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  const announcements = [
    "✦  Free Marketing Audit — Book Today",
    "✦  Average 3.2× ROAS for Hotel Clients",
    "✦  No Setup Fee This Month",
    "✦  Google Ads · Facebook Ads · Bing Ads · SEO",
    "✦  7-Day Campaign Launch Guarantee",
    "✦  Now Accepting New Hotel Clients",
  ];

  return (
    <>
      {barVisible && (
        <div
          className="fixed top-0 left-0 right-0 z-50 overflow-hidden"
          style={{
            background: "linear-gradient(90deg, #0C0B18 0%, #1a1628 50%, #0C0B18 100%)",
            borderBottom: "1px solid rgba(201,168,76,0.18)",
            height: "2.25rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", height: "100%", overflow: "hidden" }}>
            <div className="marquee-track" style={{ gap: "3rem" }}>
              {[...Array(3)].flatMap(() => announcements).map((text, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.62rem",
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "rgba(201,168,76,0.75)",
                    whiteSpace: "nowrap",
                    paddingRight: "3rem",
                  }}
                >
                  {text}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={() => setBarVisible(false)}
            aria-label="Dismiss"
            style={{
              position: "absolute",
              right: "0.875rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgba(201,168,76,0.4)",
              padding: "0.25rem",
              lineHeight: 1,
              transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "rgba(201,168,76,0.9)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(201,168,76,0.4)"}
          >
            <X size={11} />
          </button>
        </div>
      )}

      <nav
        className="fixed left-0 right-0 z-50 transition-all duration-500"
        style={{
          top: barVisible ? "2.25rem" : "0",
          background: scrolled
            ? "rgba(6,6,14,0.97)"
            : "linear-gradient(180deg, rgba(6,6,14,0.7) 0%, transparent 100%)",
          backdropFilter: scrolled ? "blur(24px) saturate(160%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.1)" : "1px solid transparent",
          boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.5)" : "none",
        }}
      >
        <div className="container flex items-center justify-between" style={{ height: "4.75rem" }}>

          <a href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
            <div style={{
              width: "2.25rem",
              height: "2.25rem",
              background: "linear-gradient(135deg, #C9A84C 0%, #E8C96A 60%, #BFA06A 100%)",
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 0 16px rgba(201,168,76,0.3)",
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="2.5" fill="#0C0B18"/>
                <path d="M6 1.5V3M6 9V10.5M1.5 6H3M9 6H10.5" stroke="#0C0B18" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.6rem",
                fontWeight: 600,
                letterSpacing: "0.01em",
                color: "#F5F0E8",
                lineHeight: 1,
              }}>
                Night<span style={{ color: "#C9A84C" }}>Desk</span>
              </span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.55rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(201,168,76,0.45)",
                marginTop: "2px",
              }}>
                Hotel Digital Marketing
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center" style={{ gap: "2.25rem" }}>
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative group"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(245,240,232,0.45)",
                  textDecoration: "none",
                  transition: "color 0.25s ease",
                  paddingBottom: "3px",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#F5F0E8"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.45)"}
              >
                {l.label}
                <span
                  className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                  style={{ background: "linear-gradient(90deg, #C9A84C, rgba(201,168,76,0))" }}
                />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center" style={{ gap: "1.25rem" }}>
            <a href="/" style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 500,
              letterSpacing: "0.08em",
              color: "rgba(245,240,232,0.35)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.7)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.35)"}
            >
              AI Concierge →
            </a>
            <a href="#contact" className="btn-gold" style={{ padding: "0.6rem 1.5rem", fontSize: "0.7rem" }}>
              Free Audit
            </a>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              background: menuOpen ? "rgba(201,168,76,0.08)" : "transparent",
              border: "1px solid rgba(201,168,76,0.2)",
              padding: "0.5rem",
              cursor: "pointer",
              color: "#C9A84C",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: menuOpen ? "500px" : "0",
            background: "rgba(6,6,14,0.99)",
            borderTop: menuOpen ? "1px solid rgba(201,168,76,0.1)" : "none",
          }}
        >
          <div style={{ padding: "1.5rem 1.5rem 2rem" }}>
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(245,240,232,0.6)",
                  padding: "0.875rem 0",
                  borderBottom: i < links.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  textDecoration: "none",
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-gold"
              onClick={() => setMenuOpen(false)}
              style={{ marginTop: "1.5rem", width: "100%", justifyContent: "center" }}
            >
              Get Free Audit
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
