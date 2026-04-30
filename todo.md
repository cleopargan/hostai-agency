# NightDesk Website — Project TODO

## Initial Build
- [x] NightDesk marketing site (Navbar, Hero, TrustStrip, Problem, HowItWorks, Features, Results, Pricing, FAQ, ContactCTA, FloatingChat)
- [x] Obsidian & Gold luxury design system
- [x] Responsive layout (mobile + desktop)

## Calendly Integration
- [x] Wire Calendly link (https://calendly.com/hello-nightdesk/30min) to all CTA buttons (Navbar, Hero, Results, Pricing, ContactCTA)

## SEO Fixes
- [x] Meta description shortened to 143 characters (within 50–160 limit)
- [x] Meta keywords reduced to 6 focused terms (within 3–8 range)
- [x] Alt text added to all 3 images missing it (Results, Features, ContactCTA)
- [x] TrustStrip "12+ Countries Served" → "Worldwide Remote Setup"
- [x] Favicon added (luxury gold-on-obsidian N monogram)

## Privacy Policy
- [x] Full Privacy Policy page at /privacy (10 sections, GDPR-aligned)
- [x] Footer Privacy Policy link wired to /privacy route

## Audit Fixes (Critical)
- [x] Counter animation bug fixed in Results.tsx (0% / 0/7 / 0× / 0+ → animated to real values)
- [x] Page title brand inconsistency fixed (HostAI → NightDesk in index.html)
- [x] Marquee repetition reduced from 3 copies to 2 copies in Navbar
- [x] Testimonials: stock photos removed, replaced with gold initial avatars
- [x] ContactCTA: Calendly-first CTA replaces heavy multi-field form as primary path
- [x] Pricing: overage note added for 500 conversation limit ("Additional conversations at $0.10 each")
- [x] FloatingChat: auto-opens after 8 seconds on first visit (sessionStorage flag prevents repeat)

## Database & Backend
- [x] Full-stack upgrade (web-db-user: tRPC + Express + MySQL)
- [x] Database schema: users, demo_requests, chat_sessions, chat_messages, page_views
- [x] tRPC router: leads.submit, leads.list, leads.updateStatus, leads.stats
- [x] tRPC router: chat.syncSession, chat.saveMessage
- [x] tRPC router: analytics.pageView, analytics.stats
- [x] ContactCTA form wired to persist leads to database via tRPC
- [x] Page view analytics tracking on every route change (App.tsx PageViewTracker)
- [x] Admin CRM dashboard at /admin (lead list, status management, stats, notes)
- [x] Owner notification on new demo request submission

## GitHub
- [x] Merge conflict in vite.config.ts resolved (kept publicDir + server config)
- [x] TypeScript 5.9.3 installed and confirmed clean (0 errors)

## Pending
- [ ] Chatbase real bot embed (replace FloatingChat simulation with live Chatbase widget)
- [ ] Terms of Service page (currently links to hello@nightdesk.agency)
- [ ] Blog section for SEO content publishing
- [ ] Monthly SEO blog post scheduled task
- [ ] Weekly hotel industry pain-point briefing scheduled task

## Pabbly Connect Fix (updated)
- [ ] User: paste Pabbly webhook URL into Manus Settings → Secrets as PABBLY_WEBHOOK_URL
- [x] Outbound webhook built in leads.submit — fires to Pabbly on every form submission
- [ ] User: reconfigure Pabbly workflow to use Webhook trigger instead of Google Sheets lookup
