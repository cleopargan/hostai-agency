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

## Oil Machine Architecture
- [x] 5 service pages (services/*.md) — SEO, Ads, Direct Booking AI, Digital Concierge, CEO Command Center
- [x] index.md home page overview
- [x] ai-instructions.txt and .well-known/ai-plugin.json for AI agent discovery (Perplexity, Manus)
- [x] master_seo_automation_engine.py — full Python SEO automation engine
- [x] performance_optimization_engine.py — full Python performance monitoring engine
- [x] MarketingLanding page assembled and routed to / (replaces old Home as default)
- [x] AI Receptionist page at /ai-receptionist with live embedded Gemini demo
- [x] .env.example added (documents all required environment variables)
- [ ] Deployment — platform TBD (Railway removed)

## Pages & Legal
- [x] Terms of Service page at /terms (12 sections, legally complete)
- [x] Footer "Terms of Service" link wired to /terms route
- [x] Blog index upgraded to Oil Machine design (MarketingNavbar, luxury dark layout)
- [x] Hotel AI Config panel at /hotel-config (train AI on hotel details, mailto send to team)

## AI Concierge Bot (Live LLM)
- [x] Design system prompt and hotel knowledge base structure
- [x] Build backend tRPC streaming endpoint for AI concierge (invokeLLM)
- [x] Upgrade FloatingChat widget to call live AI backend with streaming
- [x] Test full conversation flow end-to-end (6/6 tests passing)
- [x] Embedded live chat demo on /ai-receptionist page
- [x] Hotel configuration panel at /hotel-config for per-hotel AI training

## Pabbly Connect
- [x] PABBLY_WEBHOOK_URL secret configured
- [x] Outbound webhook fires on every leads.submit mutation
- [ ] User: reconfigure Pabbly workflow to use Webhook trigger instead of Google Sheets lookup

## Remaining (Future Enhancements)
- [ ] DB-backed hotel config (persist /hotel-config settings to MySQL, read dynamically in AI prompt)
- [ ] Monthly SEO blog post automation
- [ ] Weekly hotel industry pain-point briefing
