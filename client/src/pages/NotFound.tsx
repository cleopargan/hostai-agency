/* ============================================================
   404 NOT FOUND — Elite Luxury v4
   Matches the obsidian & gold design system
   ============================================================ */
import { useLocation } from "wouter";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080810",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "600px",
        height: "400px",
        background: "radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 65%)",
        filter: "blur(80px)",
        pointerEvents: "none",
      }} />

      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        {/* Icon */}
        <div style={{
          width: "5rem",
          height: "5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 2rem",
          background: "rgba(201,168,76,0.06)",
          border: "1px solid rgba(201,168,76,0.18)",
        }}>
          <Compass size={28} style={{ color: "#C9A84C" }} />
        </div>

        {/* 404 */}
        <div style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(5rem, 15vw, 9rem)",
          fontWeight: 700,
          lineHeight: 1,
          background: "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.06))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: "1rem",
          letterSpacing: "-0.04em",
        }}>
          404
        </div>

        {/* Divider */}
        <div style={{
          width: "3rem",
          height: "1px",
          background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
          margin: "0 auto 1.5rem",
        }} />

        {/* Heading */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
          fontWeight: 600,
          color: "#F5F0E8",
          marginBottom: "1rem",
          letterSpacing: "-0.01em",
        }}>
          Page Not Found
        </h1>

        {/* Description */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.9rem",
          lineHeight: 1.8,
          color: "rgba(245,240,232,0.38)",
          maxWidth: "360px",
          margin: "0 auto 2.5rem",
        }}>
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        {/* CTA */}
        <button
          onClick={() => setLocation("/")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.875rem 2.25rem",
            background: "linear-gradient(135deg, #C9A84C 0%, #E8C96A 40%, #C9A84C 70%, #9A7830 100%)",
            backgroundSize: "200% auto",
            color: "#0C0B18",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            border: "none",
            cursor: "pointer",
            transition: "background-position 0.4s ease, transform 0.2s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.backgroundPosition = "right center";
            (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(201,168,76,0.35)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.backgroundPosition = "left center";
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          <ArrowLeft size={14} />
          Return to NightDesk
        </button>
      </div>
    </div>
  );
}
