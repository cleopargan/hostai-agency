/* ============================================================
   TRANSACTIONAL EMAIL — Resend
   Talks to the Resend REST API directly via fetch, so no extra
   dependency is added. Every export is non-throwing: it returns
   false and logs when it cannot send, so a mail outage never
   breaks lead capture.
   ============================================================ */
import { ENV } from "./env";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export type LeadEmailInput = {
  name: string;
  email: string;
  source: string;
  propertyName?: string;
  propertyType?: string;
  message?: string;
  ipAddress?: string;
};

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char] ?? char);

type SendArgs = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

async function send({ to, subject, html, text, replyTo }: SendArgs): Promise<boolean> {
  if (!ENV.resendApiKey) {
    console.warn("[Email] RESEND_API_KEY is not set — skipping send to", to);
    return false;
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        authorization: `Bearer ${ENV.resendApiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: ENV.mailFrom,
        to: [to],
        subject,
        html,
        text,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error(
        `[Email] Resend rejected the message (${response.status} ${response.statusText})${
          detail ? `: ${detail}` : ""
        }`
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("[Email] Resend request failed:", error);
    return false;
  }
}

/** Notifies the Night Desk inbox that a new lead came in. */
export async function sendLeadNotification(lead: LeadEmailInput): Promise<boolean> {
  const rows: Array<[string, string]> = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Source", lead.source],
    ["Property", lead.propertyName || "—"],
    ["Property type", lead.propertyType || "—"],
    ["Message", lead.message || "—"],
    ["IP", lead.ipAddress || "—"],
    ["Submitted", new Date().toISOString()],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px">
      <h2 style="margin:0 0 16px;font-size:18px">New demo request — ${escapeHtml(lead.name)}</h2>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:6px 12px 6px 0;color:#666;white-space:nowrap;vertical-align:top">${escapeHtml(label)}</td>
            <td style="padding:6px 0;vertical-align:top">${escapeHtml(value).replace(/\n/g, "<br>")}</td>
          </tr>`
          )
          .join("")}
      </table>
    </div>
  `.trim();

  return send({
    to: ENV.leadNotifyEmail,
    subject: `New demo request — ${lead.name}`,
    html,
    text,
    replyTo: lead.email,
  });
}

/** Sends the prospect a short confirmation so the form feels alive. */
export async function sendLeadAutoReply(lead: LeadEmailInput): Promise<boolean> {
  const firstName = lead.name.split(/\s+/)[0] || lead.name;

  const text = [
    `Hi ${firstName},`,
    "",
    "Thanks for reaching out to Night Desk — your details came through and I'll get back to you within 24 hours.",
    "",
    `If you'd rather not wait, you can grab a time directly here: ${ENV.calendlyUrl}`,
    "",
    "— Reda",
    "Night Desk",
  ].join("\n");

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:520px;font-size:15px;line-height:1.6">
      <p>Hi ${escapeHtml(firstName)},</p>
      <p>Thanks for reaching out to Night Desk — your details came through and I'll get back to you within 24 hours.</p>
      <p>If you'd rather not wait, you can <a href="${escapeHtml(ENV.calendlyUrl)}">grab a time directly here</a>.</p>
      <p>— Reda<br><span style="color:#888">Night Desk</span></p>
    </div>
  `.trim();

  return send({
    to: lead.email,
    subject: "Thanks — I'll be in touch within 24 hours",
    html,
    text,
    replyTo: ENV.leadNotifyEmail,
  });
}
