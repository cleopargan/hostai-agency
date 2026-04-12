/* ============================================================
   PRIVACY POLICY PAGE — NightDesk
   Design System: Obsidian & Gold — Cormorant Garamond + DM Sans
   Dark background (#0A0A0F), gold accents (#C9A84C)
   ============================================================ */
import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

const LAST_UPDATED = "April 12, 2026";
const COMPANY = "Cleopargan LLC";
const BRAND = "NightDesk";
const DOMAIN = "nightdesk.agency";
const EMAIL = "hello@nightdesk.agency";

interface SectionProps {
  number: string;
  title: string;
  children: React.ReactNode;
}

function Section({ number, title, children }: SectionProps) {
  return (
    <div style={{ marginBottom: "3rem" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "1.25rem" }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "0.85rem",
          fontWeight: 600,
          color: "#C9A84C",
          letterSpacing: "0.12em",
          flexShrink: 0,
        }}>
          {number}
        </span>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "1.5rem",
          fontWeight: 600,
          color: "#F5F0E8",
          lineHeight: 1.2,
          margin: 0,
        }}>
          {title}
        </h2>
      </div>
      <div style={{
        paddingLeft: "2.5rem",
        borderLeft: "1px solid rgba(201,168,76,0.12)",
      }}>
        {children}
      </div>
    </div>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "0.92rem",
      lineHeight: 1.8,
      color: "rgba(245,240,232,0.62)",
      marginBottom: "1rem",
      margin: "0 0 1rem 0",
    }}>
      {children}
    </p>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: "0 0 1rem 0", padding: 0, listStyle: "none" }}>
      {items.map((item, i) => (
        <li key={i} style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "0.75rem",
          marginBottom: "0.5rem",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.92rem",
          lineHeight: 1.7,
          color: "rgba(245,240,232,0.62)",
        }}>
          <span style={{ color: "#C9A84C", flexShrink: 0, marginTop: "0.35rem", fontSize: "0.5rem" }}>◆</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = `Privacy Policy — ${BRAND}`;
  }, []);

  return (
    <div style={{ background: "#0A0A0F", minHeight: "100vh" }}>

      {/* Top gradient line */}
      <div style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
        opacity: 0.3,
      }} />

      {/* Header */}
      <div style={{
        background: "linear-gradient(180deg, #0C0B18 0%, #0A0A0F 100%)",
        borderBottom: "1px solid rgba(201,168,76,0.1)",
        padding: "2rem 0 3rem",
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1.5rem" }}>

          {/* Back link */}
          <Link href="/">
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.78rem",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(245,240,232,0.35)",
              cursor: "pointer",
              marginBottom: "2.5rem",
              transition: "color 0.2s",
              textDecoration: "none",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#C9A84C"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.35)"}
            >
              <ArrowLeft size={13} />
              Back to NightDesk
            </span>
          </Link>

          {/* Brand mark */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <div style={{
              width: "2rem",
              height: "2rem",
              background: "rgba(201,168,76,0.08)",
              border: "1px solid rgba(201,168,76,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", color: "#C9A84C", fontWeight: 700 }}>N</span>
            </div>
            <span style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "rgba(245,240,232,0.5)",
              letterSpacing: "0.06em",
            }}>
              NightDesk
            </span>
          </div>

          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(201,168,76,0.06)",
            border: "1px solid rgba(201,168,76,0.18)",
            padding: "0.35rem 0.85rem",
            marginBottom: "1.25rem",
          }}>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#C9A84C",
            }}>
              Legal Document
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
            fontWeight: 600,
            color: "#F5F0E8",
            lineHeight: 1.1,
            margin: "0 0 1rem 0",
          }}>
            Privacy Policy
          </h1>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.85rem",
            color: "rgba(245,240,232,0.35)",
            margin: 0,
          }}>
            Last updated: {LAST_UPDATED} &nbsp;·&nbsp; Operated by {COMPANY}
          </p>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "4rem 1.5rem 6rem" }}>

        {/* Intro */}
        <div style={{
          background: "rgba(201,168,76,0.04)",
          border: "1px solid rgba(201,168,76,0.12)",
          padding: "1.5rem 2rem",
          marginBottom: "3.5rem",
        }}>
          <Para>
            This Privacy Policy describes how <strong style={{ color: "#F5F0E8" }}>{BRAND}</strong>, operated by{" "}
            <strong style={{ color: "#F5F0E8" }}>{COMPANY}</strong> ("we," "us," or "our"), collects, uses, and
            protects the personal information you provide when you visit{" "}
            <strong style={{ color: "#F5F0E8" }}>{DOMAIN}</strong> or contact us through our website. By using our
            website, you agree to the practices described in this policy.
          </Para>
          <Para>
            We take your privacy seriously. We do not sell, rent, or trade your personal information to any third
            party. Period.
          </Para>
        </div>

        <Section number="01" title="Information We Collect">
          <Para>
            We collect only the information you voluntarily provide to us through our contact and demo booking form.
            This may include:
          </Para>
          <BulletList items={[
            "Your full name",
            "Your email address",
            "Your property name and approximate size (number of rooms)",
            "Your property type (boutique hotel, B&B, café, resort, or other)",
            "Any message or description of your business challenge you choose to share",
          ]} />
          <Para>
            We do not collect payment information directly. All payment processing is handled by{" "}
            <strong style={{ color: "#F5F0E8" }}>Stripe, Inc.</strong>, a PCI-DSS compliant payment processor.
            We never see or store your card details.
          </Para>
        </Section>

        <Section number="02" title="How We Use Your Information">
          <Para>
            The information you provide is used solely for the following purposes:
          </Para>
          <BulletList items={[
            "To respond to your inquiry or demo booking request",
            "To schedule and conduct a free 30-minute demo call via Calendly",
            "To send you a proposal or onboarding materials if you choose to become a client",
            "To send occasional service-related communications (e.g., setup updates, invoices)",
            "To improve our website and service offering based on aggregated, anonymised feedback",
          ]} />
          <Para>
            We will never use your information for unsolicited marketing without your explicit consent, and we will
            never share it with third parties for their own marketing purposes.
          </Para>
        </Section>

        <Section number="03" title="Cookies and Analytics">
          <Para>
            Our website uses minimal, privacy-respecting analytics to understand aggregate visitor behaviour (e.g.,
            page views, session duration). We use <strong style={{ color: "#F5F0E8" }}>Umami Analytics</strong>, a
            GDPR-compliant, cookie-free analytics tool that does not track individuals, does not use cookies, and
            does not share data with third parties.
          </Para>
          <Para>
            We do not use Google Analytics, Facebook Pixel, or any other third-party advertising or tracking
            technology on this website.
          </Para>
        </Section>

        <Section number="04" title="Third-Party Services">
          <Para>
            To operate our service, we use the following trusted third-party platforms. Each has its own privacy
            policy governing how they handle data:
          </Para>
          <BulletList items={[
            "Web3Forms (contact form processing) — web3forms.com",
            "Calendly (demo call scheduling) — calendly.com",
            "Stripe (payment processing) — stripe.com",
            "Chatbase (AI chatbot infrastructure) — chatbase.co",
            "Zoho Mail (business email) — zoho.com",
          ]} />
          <Para>
            When you interact with these services (e.g., booking a call via Calendly or making a payment via
            Stripe), their respective privacy policies apply to the data you provide on their platforms.
          </Para>
        </Section>

        <Section number="05" title="Data Retention">
          <Para>
            We retain your contact information for as long as necessary to fulfil the purpose for which it was
            collected — typically for the duration of any active client relationship, plus a reasonable period
            thereafter for accounting and legal compliance purposes (generally no longer than 3 years).
          </Para>
          <Para>
            If you request deletion of your data, we will remove it from our active records within 30 days, subject
            to any legal obligations to retain certain records.
          </Para>
        </Section>

        <Section number="06" title="Your Rights">
          <Para>
            Depending on your jurisdiction, you may have the following rights regarding your personal data:
          </Para>
          <BulletList items={[
            "The right to access the personal data we hold about you",
            "The right to correct inaccurate or incomplete data",
            "The right to request deletion of your data (right to be forgotten)",
            "The right to object to or restrict certain processing of your data",
            "The right to data portability (receive your data in a structured, machine-readable format)",
            "The right to withdraw consent at any time, where processing is based on consent",
          ]} />
          <Para>
            To exercise any of these rights, please contact us at{" "}
            <a href={`mailto:${EMAIL}`} style={{ color: "#C9A84C", textDecoration: "none" }}>{EMAIL}</a>. We will
            respond within 30 days.
          </Para>
        </Section>

        <Section number="07" title="Data Security">
          <Para>
            We implement reasonable technical and organisational measures to protect your personal information
            against unauthorised access, alteration, disclosure, or destruction. Our website is served over HTTPS
            (TLS encryption). Access to any stored contact data is restricted to authorised personnel only.
          </Para>
          <Para>
            No method of transmission over the internet is 100% secure. While we strive to protect your data, we
            cannot guarantee absolute security.
          </Para>
        </Section>

        <Section number="08" title="Children's Privacy">
          <Para>
            Our services are directed exclusively at business owners and hospitality professionals. We do not
            knowingly collect personal information from individuals under the age of 18. If you believe a minor has
            submitted information to us, please contact us and we will delete it promptly.
          </Para>
        </Section>

        <Section number="09" title="Changes to This Policy">
          <Para>
            We may update this Privacy Policy from time to time to reflect changes in our practices or applicable
            law. When we do, we will update the "Last updated" date at the top of this page. We encourage you to
            review this policy periodically. Continued use of our website after any changes constitutes your
            acceptance of the updated policy.
          </Para>
        </Section>

        <Section number="10" title="Contact Us">
          <Para>
            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices,
            please contact us:
          </Para>
          <div style={{
            background: "rgba(201,168,76,0.04)",
            border: "1px solid rgba(201,168,76,0.12)",
            padding: "1.5rem 2rem",
            marginTop: "0.5rem",
          }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "1.2rem",
              fontWeight: 600,
              color: "#F5F0E8",
              margin: "0 0 0.5rem 0",
            }}>
              NightDesk — operated by Cleopargan LLC
            </p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.88rem",
              color: "rgba(245,240,232,0.5)",
              margin: "0 0 0.25rem 0",
            }}>
              United States of America
            </p>
            <a
              href={`mailto:${EMAIL}`}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.92rem",
                color: "#C9A84C",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              {EMAIL}
            </a>
          </div>
        </Section>

        {/* Back to home */}
        <div style={{ textAlign: "center", paddingTop: "2rem", borderTop: "1px solid rgba(201,168,76,0.08)" }}>
          <Link href="/">
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(245,240,232,0.35)",
              cursor: "pointer",
              transition: "color 0.2s",
              textDecoration: "none",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#C9A84C"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.35)"}
            >
              <ArrowLeft size={13} />
              Return to NightDesk
            </span>
          </Link>
        </div>

      </div>

      {/* Bottom gradient line */}
      <div style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
        opacity: 0.15,
      }} />
    </div>
  );
}
