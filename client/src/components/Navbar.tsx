/* ============================================================
   NAVBAR — Obsidian & Gold Luxury v3
   Transparent → dark glass on scroll, refined logo, premium links
   ============================================================ */
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Results", href: "#results" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <>
      {/* ── Announcement bar ── */}
      <div className="fixed top-0 left-0 right-0 z-50 text-center py-2.5 text-xs font-semibold"
        style={{
          background: "linear-gradient(90deg, #8A6520, #C9A84C, #E8C96A, #C9A84C, #8A6520)",
          color: "#0A0806",
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "0.07em"
        }}>
        Limited Offer — Free WhatsApp Integration with every Professional plan this month
      </div>

      {/* ── Main nav ── */}
      <nav
        className="fixed left-0 right-0 z-50 transition-all duration-500"
        style={{
          top: "36px",
          background: scrolled ? "rgba(8,8,16,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(28px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.1)" : "none",
        }}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group" style={{ textDecoration: "none" }}>
            <div className="flex flex-col items-start leading-none">
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.55rem",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "#F5F0E8",
                lineHeight: 1
              }}>
                Host<span style={{ color: "#C9A84C" }}>AI</span>
              </span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.58rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(201,168,76,0.5)",
                marginTop: "1px"
              }}>
                AI Concierge
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-9">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative group"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(245,240,232,0.5)",
                  textDecoration: "none",
                  transition: "color 0.2s ease"
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#F5F0E8"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.5)"}
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                  style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
              </a>
            ))}
          </div>

          {/* CTA area */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="pulse-dot" />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "rgba(245,240,232,0.35)", letterSpacing: "0.04em" }}>
                Live demo active
              </span>
            </div>
            <a href="#contact" className="btn-gold" style={{ padding: "0.625rem 1.375rem", fontSize: "0.72rem" }}>
              Book Free Demo
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 transition-colors duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ color: "#C9A84C", background: menuOpen ? "rgba(201,168,76,0.08)" : "transparent", borderRadius: "2px" }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: menuOpen ? "400px" : "0",
            background: "rgba(8,8,16,0.99)",
            borderTop: menuOpen ? "1px solid rgba(201,168,76,0.1)" : "none",
          }}
        >
          <div className="px-6 py-6 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="py-3 px-3 transition-colors duration-200"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(245,240,232,0.7)",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.04)"
                }}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-gold text-center mt-4"
              onClick={() => setMenuOpen(false)}
            >
              Book Free Demo
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
