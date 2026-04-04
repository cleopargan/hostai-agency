/* Design: Midnight Gold — transparent nav transitions to dark glass on scroll, gold accents */
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

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
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(10,10,15,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.12)" : "none",
      }}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
            style={{
              background: "linear-gradient(135deg, #C9A84C, #E8C96A)",
              color: "#0A0A0F",
              fontFamily: "'Playfair Display', serif",
              fontSize: "1rem",
            }}
          >
            H
          </div>
          <span
            className="text-lg font-semibold tracking-tight"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "#F0EDE6" }}
          >
            Host<span style={{ color: "#C9A84C" }}>AI</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover-underline text-sm font-medium transition-colors duration-200"
              style={{ color: "rgba(240,237,230,0.6)", fontFamily: "'DM Sans', sans-serif" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F0EDE6")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(240,237,230,0.6)")}
            >
              {l.label}
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
          <a
            href="#contact"
            className="btn-gold px-5 py-2.5 rounded-lg text-sm"
          >
            Book Free Demo
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ color: "#C9A84C" }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 py-5 flex flex-col gap-4"
          style={{
            background: "rgba(10,10,15,0.98)",
            borderTop: "1px solid rgba(201,168,76,0.12)",
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium py-2"
              style={{ color: "rgba(240,237,230,0.8)", fontFamily: "'DM Sans', sans-serif" }}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-gold px-5 py-3 rounded-lg text-sm text-center mt-2"
            onClick={() => setMenuOpen(false)}
          >
            Book Free Demo
          </a>
        </div>
      )}
    </nav>
  );
}
