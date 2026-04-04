/* Design: Midnight Gold — transparent nav transitions to dark glass on scroll, premium logo icon */
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const LOGO_ICON = "https://d2xsxph8kpxj0f.cloudfront.net/310519663082783554/QDcYwAv8SHis62JyYiBJro/logo-icon-DhGVZGxUWwJnv5mPBaqd3u.webp";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
      {/* Top announcement bar */}
      <div className="fixed top-0 left-0 right-0 z-50 text-center py-2 text-xs font-medium" style={{ background: "linear-gradient(90deg, #C9A84C, #E8C96A, #C9A84C)", color: "#0A0A0F", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em" }}>
        🎉 Limited Offer: Free WhatsApp Integration with every Professional plan this month
      </div>

      <nav
        className="fixed left-0 right-0 z-50 transition-all duration-500"
        style={{
          top: "32px",
          background: scrolled ? "rgba(10,10,15,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.12)" : "none",
        }}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <img
              src={LOGO_ICON}
              alt="HostAI Logo"
              className="w-9 h-9 rounded-lg transition-transform duration-300 group-hover:scale-105"
              style={{ objectFit: "cover" }}
            />
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif", color: "#F0EDE6" }}>
                Host<span style={{ color: "#C9A84C" }}>AI</span>
              </span>
              <span className="text-xs" style={{ color: "rgba(201,168,76,0.6)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em" }}>
                AI Concierge
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium transition-colors duration-200 relative group"
                style={{ color: "rgba(240,237,230,0.6)", fontFamily: "'DM Sans', sans-serif" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F0EDE6")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(240,237,230,0.6)")}
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300" style={{ background: "#C9A84C" }} />
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="pulse-dot" />
              <span className="text-xs" style={{ color: "rgba(240,237,230,0.45)", fontFamily: "'DM Sans', sans-serif" }}>
                Live demo active
              </span>
            </div>
            <a href="#contact" className="btn-gold px-5 py-2.5 rounded-lg text-sm">
              Book Free Demo
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ color: "#C9A84C", background: menuOpen ? "rgba(201,168,76,0.08)" : "transparent" }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: menuOpen ? "400px" : "0",
            background: "rgba(10,10,15,0.98)",
            borderTop: menuOpen ? "1px solid rgba(201,168,76,0.12)" : "none",
          }}
        >
          <div className="px-6 py-5 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium py-3 px-3 rounded-lg transition-colors duration-200"
                style={{ color: "rgba(240,237,230,0.8)", fontFamily: "'DM Sans', sans-serif" }}
                onClick={() => setMenuOpen(false)}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.06)"; (e.currentTarget as HTMLElement).style.color = "#C9A84C"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(240,237,230,0.8)"; }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-gold px-5 py-3 rounded-lg text-sm text-center mt-3"
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
