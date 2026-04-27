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
} from "./db";
import { notifyOwner } from "./_core/notification";

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
});

export type AppRouter = typeof appRouter;
