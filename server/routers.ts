import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import {
  createDemoRequest,
  getAllDemoRequests,
  updateDemoRequestStatus,
  getDemoRequestStats,
  upsertChatSession,
  saveChatMessage,
  recordPageView,
  getPageViewStats,
  createBlogPost,
  getBlogPost,
  getAllBlogPosts,
  publishBlogPost,
  deleteBlogPost,
} from "./db";
import { notifyOwner } from "./_core/notification";
import { ENV } from "./_core/env";
import { invokeLLM, Message } from "./_core/llm";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  /**
   * Leads — demo requests submitted via the contact form or Calendly click tracking
   */
  leads: router({
    /** Submit a new demo request (email fallback form) */
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1).max(255),
          email: z.string().email().max(320),
          source: z.enum(["calendly_click", "email_form", "chat_widget"]),
          propertyName: z.string().max(255).optional(),
          propertyType: z.enum(["hotel", "bnb", "cafe", "resort", "other"]).optional(),
          message: z.string().max(2000).optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const ipAddress =
          (ctx.req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
          ctx.req.socket?.remoteAddress ||
          undefined;

        await createDemoRequest({
          name: input.name,
          email: input.email,
          source: input.source,
          propertyName: input.propertyName,
          propertyType: input.propertyType,
          message: input.message,
          ipAddress,
        });

        // Notify the owner of a new lead
        await notifyOwner({
          title: `New Demo Request — ${input.name}`,
          content: `**${input.name}** (${input.email}) submitted a demo request via ${input.source}.\n\nProperty: ${input.propertyName || "Not specified"}\nMessage: ${input.message || "None"}`,
        }).catch(() => {}); // Non-blocking

        // Fire outbound webhook to Pabbly Connect
        // This replaces the broken Google Sheets lookup step in the Pabbly workflow.
        // Pabbly receives the full lead payload instantly when a form is submitted.
        if (ENV.pabblyWebhookUrl) {
          fetch(ENV.pabblyWebhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: input.name,
              email: input.email,
              source: input.source,
              property_name: input.propertyName ?? "",
              property_type: input.propertyType ?? "",
              message: input.message ?? "",
              submitted_at: new Date().toISOString(),
              ip_address: ipAddress ?? "",
            }),
          }).catch((err) => {
            console.warn("[Pabbly] Webhook delivery failed (non-blocking):", err?.message);
          });
        }

        return { success: true };
      }),

    /** Admin only — list all leads */
    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
      }
      return getAllDemoRequests();
    }),

    /** Admin only — update lead status */
    updateStatus: protectedProcedure
      .input(
        z.object({
          id: z.number().int().positive(),
          status: z.enum([
            "new",
            "contacted",
            "demo_booked",
            "proposal_sent",
            "closed_won",
            "closed_lost",
          ]),
          notes: z.string().max(5000).optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
        }
        await updateDemoRequestStatus(input.id, input.status, input.notes);
        return { success: true };
      }),

    /** Admin only — get CRM stats */
    stats: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
      }
      return getDemoRequestStats();
    }),
  }),

  /**
   * Chat — track FloatingChat widget sessions and messages
   */
  chat: router({
    /** Upsert a chat session (called when widget opens or message count changes) */
    syncSession: publicProcedure
      .input(
        z.object({
          sessionToken: z.string().min(1).max(128),
          visitorEmail: z.string().email().max(320).optional(),
          visitorName: z.string().max(255).optional(),
          messageCount: z.number().int().min(0),
          askedAboutPricing: z.boolean(),
          askedAboutDemo: z.boolean(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const ipAddress =
          (ctx.req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
          ctx.req.socket?.remoteAddress ||
          undefined;

        await upsertChatSession({
          sessionToken: input.sessionToken,
          visitorEmail: input.visitorEmail,
          visitorName: input.visitorName,
          messageCount: input.messageCount,
          askedAboutPricing: input.askedAboutPricing,
          askedAboutDemo: input.askedAboutDemo,
          ipAddress,
        });
        return { success: true };
      }),

    /** Save an individual chat message */
    saveMessage: publicProcedure
      .input(
        z.object({
          sessionId: z.number().int().positive(),
          sender: z.enum(["guest", "bot"]),
          message: z.string().min(1).max(10000),
        })
      )
      .mutation(async ({ input }) => {
        await saveChatMessage({
          sessionId: input.sessionId,
          sender: input.sender,
          message: input.message,
        });
        return { success: true };
      }),
  }),

  /**
   * Analytics — lightweight page view tracking
   */
  analytics: router({
    /** Record a page view (called on route change) */
    pageView: publicProcedure
      .input(
        z.object({
          path: z.string().max(512),
          referrer: z.string().max(512).optional(),
          userAgent: z.string().max(512).optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const ipAddress =
          (ctx.req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
          ctx.req.socket?.remoteAddress ||
          undefined;

        await recordPageView({
          path: input.path,
          referrer: input.referrer,
          userAgent: input.userAgent,
          ipAddress,
        });
        return { success: true };
      }),

    /** Admin only — get page view stats */
    stats: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
      }
      return getPageViewStats();
    }),
  }),
  /**
   * AI Concierge — powered by built-in LLM with luxury hotel persona
   */
  concierge: router({
    /**
     * chat — accepts conversation history and returns an AI response.
     * The hotel context (name, policies, FAQs) is injected as a system prompt.
     * hotelContext is passed from the frontend so each hotel can customise their bot.
     */
    chat: publicProcedure
      .input(
        z.object({
          messages: z.array(
            z.object({
              role: z.enum(["user", "assistant"]),
              content: z.string().max(4000),
            })
          ).min(1).max(50),
          hotelName: z.string().max(100).optional(),
          hotelCity: z.string().max(100).optional(),
          checkInTime: z.string().max(20).optional(),
          checkOutTime: z.string().max(20).optional(),
          currency: z.string().max(5).optional(),
          startingRate: z.string().max(20).optional(),
        })
      )
      .mutation(async ({ input }) => {
        const hotelName = input.hotelName || "The Grand Boutique";
        const hotelCity = input.hotelCity || "your city";
        const checkIn = input.checkInTime || "3:00 PM";
        const checkOut = input.checkOutTime || "11:00 AM";
        const currency = input.currency || "€";
        const rate = input.startingRate || "145";

        const systemPrompt = `You are an elite AI concierge for ${hotelName}, a luxury boutique hotel in ${hotelCity}. Your name is "NightDesk Concierge".

Your role is to provide warm, professional, and highly personalised guest service — 24 hours a day, 7 days a week. You represent the pinnacle of hospitality.

## Your Personality
- Warm, elegant, and genuinely helpful — like a world-class front desk manager
- Concise but thorough — never give one-word answers, but never ramble
- Proactive — always offer the next logical step or suggestion
- Use light, tasteful hospitality language ("Certainly", "Of course", "I'd be delighted to")
- Never say you are an AI unless directly asked. If asked, say: "I'm the NightDesk AI Concierge — here to make your stay exceptional."

## Hotel Information for ${hotelName}
- Location: ${hotelCity}
- Check-in: ${checkIn} | Check-out: ${checkOut}
- Rates from: ${currency}${rate}/night
- Languages: English, French, Arabic (respond in the guest's language)
- Pet policy: Pets welcome (under 25kg), ${currency}30/night fee, advance notice required
- Parking: Complimentary private parking on-site
- Breakfast: Daily 7:00–10:30 AM, included in Deluxe and Suite packages
- WiFi: Complimentary high-speed throughout the property
- Pool: Rooftop pool open 8 AM–9 PM daily
- Restaurant: Open for dinner 6–10 PM, reservations recommended on weekends
- Cancellation: Free up to 48 hours before arrival; first night charged after that

## What You Can Help With
- Room availability and booking inquiries
- Check-in / check-out procedures and times
- Amenities, facilities, and services
- Local recommendations (restaurants, attractions, transport)
- Special requests (early check-in, late check-out, room upgrades, celebrations)
- Dining reservations and room service
- Transportation and airport transfers
- Billing and payment questions
- Complaints and service recovery (handle with empathy, escalate to human staff when needed)

## Escalation Rule
If a guest has a complaint, medical issue, or request you cannot resolve, say: "I'm connecting you with our team right away — they will reach you within 5 minutes. Is there anything else I can note for them?"

## Response Format
- Keep responses under 120 words unless the guest asks for detailed information
- Use line breaks for readability when listing multiple items
- End with a helpful follow-up question or offer when appropriate
- Never use markdown headers or bullet points — write in natural, flowing prose
- Emoji are acceptable sparingly (🏨 ☕ 🚗 📅) to add warmth`;

        const llmMessages: Message[] = [
          { role: "system", content: systemPrompt },
          ...input.messages.map((m) => ({
            role: m.role as "user" | "assistant",
            content: m.content,
          })),
        ];

        const result = await invokeLLM({
          messages: llmMessages,
          maxTokens: 300,
        });

        const reply = result.choices[0]?.message?.content;
        if (typeof reply !== "string" || !reply.trim()) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "No response from AI" });
        }

        return { reply: reply.trim() };
      }),
  }),

  /**
   * Blog — AI-generated interactive articles stored in MySQL
   */
  blog: router({
    /** Generate a new interactive blog article using Gemini */
    generate: publicProcedure
      .input(z.object({
        topic: z.string().min(1).max(300),
        category: z.string().max(100).optional(),
      }))
      .mutation(async ({ input }) => {
        const slug = input.topic
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .slice(0, 80) + "-" + Date.now().toString(36);

        const systemPrompt = `You are a senior content strategist for NightDesk.agency, a hotel digital marketing agency. You write SEO blog articles that feel written by a real hotel industry expert — not an AI. Your tone is warm, direct, and objective. You back every claim with real data and statistics. You use vivid analogies from hotel operations that operators will immediately recognise.

CRITICAL REQUIREMENTS for every article:
1. Sound human and conversational — use "you", "your hotel", "I've seen this pattern". No corporate jargon.
2. Every section must include at least ONE of: a real statistic, a data comparison, a chart spec, or a callout insight.
3. Write for boutique hotel owners and GMs who are busy and skeptical — respect their intelligence.
4. Include specific numbers wherever possible (percentages, dollar amounts, timeframes).
5. Each article must include at least 2 data visualisation specs (chart or stat block).

OUTPUT FORMAT — you must return valid JSON only, no markdown wrapper:

{
  "title": "Full SEO-optimised title with keyword",
  "category": "Hotel Revenue | Google Ads | SEO | AI Technology | Strategy",
  "excerpt": "One compelling sentence (under 160 chars) that makes a hotel GM want to read this",
  "readTime": "X min read",
  "sections": [
    { "type": "intro", "content": "2-3 sentences. Start with a sharp observation or surprising fact. Make it feel like the start of a conversation, not an essay." },
    { "type": "h2", "content": "First subheading — should create curiosity" },
    { "type": "p", "content": "Paragraph text. Write like you're explaining to a smart friend who runs a hotel." },
    { "type": "stat", "stats": [
      { "value": "73%", "label": "of hotel website visitors leave without booking", "color": "#f87171" },
      { "value": "18%", "label": "average OTA commission rate", "color": "#C9A84C" }
    ]},
    { "type": "callout", "content": "Key insight or contrarian take the reader didn't expect. Should make them nod or lean in.", "variant": "gold" },
    { "type": "chart", "chartType": "bar", "title": "Chart title", "description": "One sentence explaining what this shows", "data": [
      { "label": "Category A", "value": 73, "color": "#f87171" },
      { "label": "Category B", "value": 27, "color": "#C9A84C" }
    ]},
    { "type": "h2", "content": "Second subheading" },
    { "type": "p", "content": "..." },
    { "type": "list", "ordered": false, "items": ["Item with specific detail", "Item with number or stat"] },
    { "type": "callout", "content": "...", "variant": "info" },
    { "type": "h2", "content": "Third subheading" },
    { "type": "p", "content": "..." },
    { "type": "cta", "text": "Get a free hotel marketing audit from NightDesk →", "link": "/#contact" }
  ]
}

Section types available: intro, h2, p, stat, callout, chart, list, cta
Callout variants: gold, info, warning
Chart types: bar, area, comparison

Write 1,000–1,400 word equivalent content spread across sections. Make it genuinely useful — hotel operators should feel smarter after reading it.`;

        const llmMessages: Message[] = [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Write an interactive SEO blog article about: ${input.topic}\n\nReturn only the JSON object, no markdown, no explanation.` },
        ];

        const result = await invokeLLM({ messages: llmMessages, maxTokens: 4000 });
        const raw = result.choices[0]?.message?.content;
        if (typeof raw !== "string" || !raw.trim()) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "AI generation failed" });
        }

        // Strip markdown code fences if present
        const jsonStr = raw.trim().replace(/^```json\s*/i, "").replace(/\s*```$/i, "").trim();
        let parsed: any;
        try {
          parsed = JSON.parse(jsonStr);
        } catch {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "AI returned invalid JSON" });
        }

        await createBlogPost({
          slug,
          title: parsed.title ?? input.topic,
          category: parsed.category ?? input.category ?? "Hotel Marketing",
          excerpt: parsed.excerpt ?? "",
          content: JSON.stringify(parsed.sections ?? []),
          readTime: parsed.readTime ?? "7 min read",
          status: "draft",
        });

        return { slug, title: parsed.title };
      }),

    /** List all blog posts */
    list: publicProcedure
      .input(z.object({ status: z.enum(["draft", "published", "all"]).default("published") }))
      .query(async ({ input }) => {
        if (input.status === "all") return getAllBlogPosts();
        return getAllBlogPosts(input.status);
      }),

    /** Get single post by slug */
    get: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => getBlogPost(input.slug)),

    /** Publish a draft */
    publish: publicProcedure
      .input(z.object({ id: z.number().int().positive() }))
      .mutation(async ({ input }) => { await publishBlogPost(input.id); return { success: true }; }),

    /** Delete a post */
    delete: publicProcedure
      .input(z.object({ id: z.number().int().positive() }))
      .mutation(async ({ input }) => { await deleteBlogPost(input.id); return { success: true }; }),
  }),

  /**
   * Social — generate LinkedIn, Instagram, Facebook posts
   */
  social: router({
    generate: publicProcedure
      .input(z.object({ topic: z.string().min(1).max(300) }))
      .mutation(async ({ input }) => {
        const prompt = `You are a social media manager for NightDesk.agency, a hotel digital marketing agency. Write 3 social media posts about: "${input.topic}"

Sound like a real person who works in hotel marketing — confident, helpful, occasionally uses humour. Never use corporate jargon. Use specific numbers and facts.

Return valid JSON only:
{
  "linkedin": "Professional post, 120-160 words. Opens with a sharp observation or stat. Ends with a question to drive comments. No hashtags.",
  "instagram": "Punchy caption, 60-80 words. First line is a hook that stops the scroll. Include line breaks for readability. End with 5 relevant hashtags on the last line.",
  "facebook": "Conversational post, 80-100 words. Includes one practical tip. Friendly tone. Ends with a soft CTA."
}`;
        const result = await invokeLLM({ messages: [{ role: "user", content: prompt }], maxTokens: 1200 });
        const raw = result.choices[0]?.message?.content ?? "";
        const jsonStr = raw.trim().replace(/^```json\s*/i, "").replace(/\s*```$/i, "").trim();
        try { return JSON.parse(jsonStr); } catch {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "AI returned invalid JSON" });
        }
      }),
  }),

  /**
   * Email — generate newsletter + Google Ads copy
   */
  email: router({
    generate: publicProcedure
      .input(z.object({ topic: z.string().min(1).max(300) }))
      .mutation(async ({ input }) => {
        const prompt = `You are an email marketer and Google Ads specialist for NightDesk.agency. Write a newsletter and ad copy about: "${input.topic}"

Write like a knowledgeable friend, not a marketer. Be direct. Use real numbers. Make the reader feel smarter.

Return valid JSON only:
{
  "subject": "Email subject line, under 50 characters, curiosity-driven",
  "preview": "Preview text, under 90 characters",
  "intro": "2 sentences. Hook immediately — start with a surprising stat or bold claim.",
  "body": "200-250 words. One insight or tip explained properly. Include a specific example or number in every paragraph.",
  "caseStudy": "One sentence: 'One of our hotel clients did X and got Y result within Z timeframe.'",
  "ctaText": "Button text, under 6 words",
  "headlines": ["Headline 1 (max 30 chars)", "Headline 2 (max 30 chars)", "Headline 3 (max 30 chars)"],
  "descriptions": ["Description 1 (max 90 chars)", "Description 2 (max 90 chars)"],
  "adCta": "Call to action phrase, max 15 chars"
}`;
        const result = await invokeLLM({ messages: [{ role: "user", content: prompt }], maxTokens: 1200 });
        const raw = result.choices[0]?.message?.content ?? "";
        const jsonStr = raw.trim().replace(/^```json\s*/i, "").replace(/\s*```$/i, "").trim();
        try { return JSON.parse(jsonStr); } catch {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "AI returned invalid JSON" });
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
