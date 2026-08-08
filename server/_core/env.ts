export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  pabblyWebhookUrl: process.env.PABBLY_WEBHOOK_URL ?? "",

  // ── Transactional email (Resend) ──────────────────────────────────────────
  resendApiKey: process.env.RESEND_API_KEY ?? "",
  /** Verified Resend sender. Must be on a domain verified in Resend. */
  mailFrom: process.env.MAIL_FROM ?? "Night Desk <hello@nightdesk.agency>",
  /** Inbox that receives new-lead notifications. */
  leadNotifyEmail: process.env.LEAD_NOTIFY_EMAIL ?? "hello@nightdesk.agency",
  calendlyUrl: process.env.CALENDLY_URL ?? "https://calendly.com/hello-nightdesk/30min",
};
