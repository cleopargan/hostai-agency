import { useEffect } from "react";
import { Link } from "wouter";
import MarketingNavbar from "@/components/MarketingNavbar";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: "2.5rem" }}>
    <h2 style={{
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: "1.65rem", fontWeight: 600, color: "#F5F0E8",
      marginBottom: "1rem", marginTop: "2.5rem",
    }}>
      {title}
    </h2>
    <div style={{
      fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem",
      lineHeight: 1.85, color: "rgba(245,240,232,0.72)",
    }}>
      {children}
    </div>
  </div>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ marginBottom: "1rem" }}>{children}</p>
);

const Li = ({ children }: { children: React.ReactNode }) => (
  <li style={{ marginBottom: "0.5rem", paddingLeft: "0.25rem" }}>{children}</li>
);

export default function TermsOfService() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen" style={{ background: "#080810", color: "#F5F0E8" }}>
      <MarketingNavbar />

      <div style={{
        paddingTop: "9rem", paddingBottom: "6rem",
        maxWidth: "780px", margin: "0 auto",
        paddingLeft: "1.5rem", paddingRight: "1.5rem",
      }}>
        <Link href="/" style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          color: "rgba(245,240,232,0.35)", textDecoration: "none",
          marginBottom: "2.5rem", fontSize: "0.78rem",
          fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.06em",
        }}>
          ← Back to Home
        </Link>

        {/* Header */}
        <div style={{
          padding: "1rem 1.5rem", marginBottom: "3rem",
          background: "rgba(201,168,76,0.04)",
          border: "1px solid rgba(201,168,76,0.12)",
        }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem",
            fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
            color: "rgba(201,168,76,0.6)",
          }}>
            Legal
          </span>
        </div>

        <h1 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 600,
          lineHeight: 1.06, letterSpacing: "-0.015em",
          color: "#F5F0E8", marginBottom: "1rem",
        }}>
          Terms of Service
        </h1>

        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem",
          color: "rgba(245,240,232,0.35)", marginBottom: "3rem",
        }}>
          Last updated: 1 May 2026 · Operated by Cleopargan LLC ("NightDesk.agency")
        </p>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "2.5rem" }}>

          <Section title="1. Agreement to Terms">
            <P>By accessing or using NightDesk.agency services — including our website, marketing management services, AI receptionist products, and related software — you agree to be bound by these Terms of Service. If you do not agree, do not use our services.</P>
            <P>These Terms constitute a legally binding agreement between you (the "Client") and Cleopargan LLC, operating as NightDesk.agency ("NightDesk", "we", "us", "our").</P>
          </Section>

          <Section title="2. Services">
            <P>NightDesk.agency provides digital marketing and technology services to hotel operators, including but not limited to:</P>
            <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
              <Li>Paid search campaign management (Google Ads, Microsoft Advertising)</Li>
              <Li>Social media advertising (Facebook and Instagram Ads)</Li>
              <Li>Search engine optimisation (SEO) and landing page creation</Li>
              <Li>AI-powered chatbot and receptionist services</Li>
              <Li>Guest communication automation (Digital Concierge)</Li>
              <Li>Performance reporting and analytics dashboards (CEO Command Center)</Li>
            </ul>
            <P>Service scope, deliverables, and pricing are defined in the individual Service Agreement or proposal agreed between NightDesk and the Client prior to commencement.</P>
          </Section>

          <Section title="3. Payments and Billing">
            <P><strong style={{ color: "#F5F0E8" }}>Management fees</strong> are invoiced monthly in advance. Payment is due within 7 days of the invoice date.</P>
            <P><strong style={{ color: "#F5F0E8" }}>Ad spend</strong> (Google Ads, Facebook Ads, Bing Ads budgets) is paid directly by the Client to the respective advertising platforms. NightDesk does not handle or mark up ad spend.</P>
            <P><strong style={{ color: "#F5F0E8" }}>Late payments</strong> may result in campaign pausing after 14 days of non-payment. NightDesk reserves the right to charge interest at 1.5% per month on overdue balances.</P>
            <P>All fees are quoted in USD unless otherwise stated. Clients outside the United States are responsible for any applicable taxes, duties, or currency conversion costs.</P>
          </Section>

          <Section title="4. Cancellation and Refunds">
            <P>Services are provided on a month-to-month basis. Either party may cancel with <strong style={{ color: "#F5F0E8" }}>30 days written notice</strong> via email to hello@nightdesk.agency.</P>
            <P><strong style={{ color: "#F5F0E8" }}>30-Day Results Guarantee:</strong> If NightDesk fails to deliver measurable improvements to your campaign performance within the first 30 days of active management, your first month's management fee will be refunded in full. This guarantee applies to new clients only and excludes ad spend.</P>
            <P>No refunds are issued for partial months. Upon cancellation, all campaign assets, reports, and data created by NightDesk remain the property of the Client and will be transferred within 7 business days of the termination date.</P>
          </Section>

          <Section title="5. AI Chatbot and Receptionist Services">
            <P>NightDesk's AI Receptionist and AI Concierge products are powered by large language model (LLM) technology. By using these services, you acknowledge and agree that:</P>
            <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
              <Li>AI responses are generated automatically and may occasionally be inaccurate, incomplete, or inappropriate. NightDesk is not liable for any booking loss or guest dissatisfaction arising from AI-generated responses.</Li>
              <Li>You are responsible for providing accurate hotel information for AI training. Inaccurate input data will result in inaccurate AI output.</Li>
              <Li>Guest conversations with the AI Receptionist may be stored and reviewed by NightDesk for quality assurance and model improvement purposes, in accordance with our Privacy Policy.</Li>
              <Li>The AI is not a substitute for human staff for emergency situations, medical assistance, or safety-critical matters.</Li>
            </ul>
            <P>NightDesk will use commercially reasonable efforts to ensure AI response accuracy and will update the knowledge base monthly or upon request from the Client.</P>
          </Section>

          <Section title="6. Client Responsibilities">
            <P>To enable NightDesk to deliver services effectively, the Client agrees to:</P>
            <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
              <Li>Provide timely access to advertising accounts, website analytics, and booking engine data as required.</Li>
              <Li>Maintain sufficient ad spend budget as agreed in the Service Agreement.</Li>
              <Li>Respond to NightDesk communications within 3 business days.</Li>
              <Li>Ensure their website and booking engine are functional and compliant with applicable laws.</Li>
              <Li>Not interfere with campaigns managed by NightDesk without prior written agreement.</Li>
            </ul>
          </Section>

          <Section title="7. Intellectual Property">
            <P><strong style={{ color: "#F5F0E8" }}>Client-owned assets:</strong> All ad creative, landing page content, and campaign data created specifically for the Client's hotel belong to the Client upon payment in full.</P>
            <P><strong style={{ color: "#F5F0E8" }}>NightDesk-owned assets:</strong> Proprietary tools, systems, methodologies, and templates developed by NightDesk remain the exclusive property of NightDesk. These may not be copied, resold, or used outside the scope of the Client's service engagement.</P>
            <P>The Client grants NightDesk permission to use campaign performance data (in aggregate and anonymised form) for internal benchmarking and case study purposes, unless the Client opts out in writing.</P>
          </Section>

          <Section title="8. Confidentiality">
            <P>Both parties agree to keep confidential any non-public information shared during the engagement (including pricing, strategy, performance data, and business plans) and not to disclose it to third parties without prior written consent.</P>
            <P>This obligation survives termination of the service agreement for a period of 2 years.</P>
          </Section>

          <Section title="9. Limitation of Liability">
            <P>NightDesk's total liability for any claim arising from these Terms or the services provided shall not exceed the total fees paid by the Client in the 3 months preceding the claim.</P>
            <P>NightDesk is not liable for: indirect, incidental, or consequential damages; loss of revenue or bookings attributable to market conditions, OTA algorithm changes, platform policy changes, or third-party service outages (including Google, Meta, or Microsoft advertising platforms); or any damages resulting from the Client's failure to maintain adequate ad spend or comply with these Terms.</P>
          </Section>

          <Section title="10. Governing Law and Disputes">
            <P>These Terms are governed by the laws of the State of Delaware, United States, without regard to conflict of law principles.</P>
            <P>Any disputes shall first be attempted to be resolved through good-faith negotiation. If unresolved within 30 days, disputes shall be submitted to binding arbitration in accordance with the American Arbitration Association rules.</P>
          </Section>

          <Section title="11. Changes to These Terms">
            <P>NightDesk reserves the right to update these Terms at any time. Clients will be notified of material changes by email at least 14 days before they take effect. Continued use of services after the effective date constitutes acceptance of the updated Terms.</P>
          </Section>

          <Section title="12. Contact">
            <P>Questions about these Terms? Contact us:</P>
            <ul style={{ paddingLeft: "1.5rem", listStyle: "none" }}>
              <Li><strong style={{ color: "#F5F0E8" }}>Email:</strong> <a href="mailto:hello@nightdesk.agency" style={{ color: "#C9A84C", textDecoration: "none" }}>hello@nightdesk.agency</a></Li>
              <Li><strong style={{ color: "#F5F0E8" }}>Company:</strong> Cleopargan LLC, operating as NightDesk.agency</Li>
            </ul>
          </Section>

        </div>

        {/* Footer nav */}
        <div style={{
          marginTop: "4rem", paddingTop: "2rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex", gap: "2rem", flexWrap: "wrap",
        }}>
          <Link href="/privacy" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "rgba(245,240,232,0.35)", textDecoration: "none" }}>
            Privacy Policy
          </Link>
          <Link href="/" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "rgba(245,240,232,0.35)", textDecoration: "none" }}>
            Back to Home
          </Link>
          <a href="mailto:hello@nightdesk.agency" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "rgba(245,240,232,0.35)", textDecoration: "none" }}>
            hello@nightdesk.agency
          </a>
        </div>
      </div>
    </div>
  );
}
