/* Design: Warm Operator — sticky nav with warm cream bg, espresso text, terracotta CTA */
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Results", href: "#results" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-b border-[#EDE8E0]"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#C2622D] flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 14L7 10M7 10L9 12L13 7M7 10L5 8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="13" cy="5" r="2" fill="white"/>
              </svg>
            </div>
            <span
              className="text-[#1C1008] font-bold text-xl tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              HostAI
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-medium text-[#1C1008]/70 hover:text-[#C2622D] transition-colors duration-200"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              className="btn-primary text-sm py-2.5 px-5"
            >
              Book a Free Demo
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-[#1C1008]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-t border-[#EDE8E0] px-4 py-6 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-base font-medium text-[#1C1008]/80 hover:text-[#C2622D] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary text-sm mt-2 justify-center">
            Book a Free Demo
          </a>
        </div>
      )}
    </header>
  );
}
