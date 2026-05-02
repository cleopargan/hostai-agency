// api/_index.ts
import "dotenv/config";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// shared/const.ts
var COOKIE_NAME = "app_session_id";
var ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
var AXIOS_TIMEOUT_MS = 3e4;
var UNAUTHED_ERR_MSG = "Please login (10001)";
var NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";

// server/routers.ts
import { z as z2 } from "zod";

// server/_core/cookies.ts
function isSecureRequest(req) {
  if (req.protocol === "https") return true;
  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;
  const protoList = Array.isArray(forwardedProto) ? forwardedProto : forwardedProto.split(",");
  return protoList.some((proto) => proto.trim().toLowerCase() === "https");
}
function getSessionCookieOptions(req) {
  return {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: isSecureRequest(req)
  };
}

// server/_core/systemRouter.ts
import { z } from "zod";

// server/_core/notification.ts
import { TRPCError } from "@trpc/server";

// server/_core/env.ts
var ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  pabblyWebhookUrl: process.env.PABBLY_WEBHOOK_URL ?? ""
};

// server/_core/notification.ts
var TITLE_MAX_LENGTH = 1200;
var CONTENT_MAX_LENGTH = 2e4;
var trimValue = (value) => value.trim();
var isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;
var buildEndpointUrl = (baseUrl) => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(
    "webdevtoken.v1.WebDevService/SendNotification",
    normalizedBase
  ).toString();
};
var validatePayload = (input) => {
  if (!isNonEmptyString(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required."
    });
  }
  if (!isNonEmptyString(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required."
    });
  }
  const title = trimValue(input.title);
  const content = trimValue(input.content);
  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`
    });
  }
  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`
    });
  }
  return { title, content };
};
async function notifyOwner(payload) {
  const { title, content } = validatePayload(payload);
  if (!ENV.forgeApiUrl) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service URL is not configured."
    });
  }
  if (!ENV.forgeApiKey) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service API key is not configured."
    });
  }
  const endpoint = buildEndpointUrl(ENV.forgeApiUrl);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1"
      },
      body: JSON.stringify({ title, content })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to notify owner (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Notification] Error calling notification service:", error);
    return false;
  }
}

// server/_core/trpc.ts
import { initTRPC, TRPCError as TRPCError2 } from "@trpc/server";
import superjson from "superjson";
var t = initTRPC.context().create({
  transformer: superjson
});
var router = t.router;
var publicProcedure = t.procedure;
var requireUser = t.middleware(async (opts) => {
  const { ctx, next } = opts;
  if (!ctx.user) {
    throw new TRPCError2({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var protectedProcedure = t.procedure.use(requireUser);
var adminProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError2({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user
      }
    });
  })
);

// server/_core/systemRouter.ts
var systemRouter = router({
  health: publicProcedure.input(
    z.object({
      timestamp: z.number().min(0, "timestamp cannot be negative")
    })
  ).query(() => ({
    ok: true
  })),
  notifyOwner: adminProcedure.input(
    z.object({
      title: z.string().min(1, "title is required"),
      content: z.string().min(1, "content is required")
    })
  ).mutation(async ({ input }) => {
    const delivered = await notifyOwner(input);
    return {
      success: delivered
    };
  })
});

// server/routers.ts
import { TRPCError as TRPCError3 } from "@trpc/server";

// server/db.ts
import { eq, desc, count } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";

// drizzle/schema.ts
import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";
var users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull()
});
var demoRequests = mysqlTable("demo_requests", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  /** Source of the lead: 'calendly_click' | 'email_form' | 'chat_widget' */
  source: mysqlEnum("source", ["calendly_click", "email_form", "chat_widget"]).notNull(),
  /** Optional property name provided in the email form */
  propertyName: varchar("propertyName", { length: 255 }),
  /** Optional property type */
  propertyType: mysqlEnum("propertyType", ["hotel", "bnb", "cafe", "resort", "other"]),
  /** Optional message / biggest challenge */
  message: text("message"),
  /** Lead status for CRM tracking */
  status: mysqlEnum("status", ["new", "contacted", "demo_booked", "proposal_sent", "closed_won", "closed_lost"]).default("new").notNull(),
  /** Internal notes added by the owner */
  notes: text("notes"),
  /** IP address for deduplication */
  ipAddress: varchar("ipAddress", { length: 45 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});
var chatSessions = mysqlTable("chat_sessions", {
  id: int("id").autoincrement().primaryKey(),
  sessionToken: varchar("sessionToken", { length: 128 }).notNull().unique(),
  visitorEmail: varchar("visitorEmail", { length: 320 }),
  visitorName: varchar("visitorName", { length: 255 }),
  messageCount: int("messageCount").default(0).notNull(),
  askedAboutPricing: boolean("askedAboutPricing").default(false).notNull(),
  askedAboutDemo: boolean("askedAboutDemo").default(false).notNull(),
  ipAddress: varchar("ipAddress", { length: 45 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});
var chatMessages = mysqlTable("chat_messages", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: int("sessionId").notNull(),
  sender: mysqlEnum("sender", ["guest", "bot"]).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull()
});
var pageViews = mysqlTable("page_views", {
  id: int("id").autoincrement().primaryKey(),
  path: varchar("path", { length: 512 }).notNull(),
  referrer: varchar("referrer", { length: 512 }),
  userAgent: varchar("userAgent", { length: 512 }),
  ipAddress: varchar("ipAddress", { length: 45 }),
  createdAt: timestamp("createdAt").defaultNow().notNull()
});
var blogPosts = mysqlTable("blog_posts", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 500 }).notNull(),
  category: varchar("category", { length: 100 }),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  // JSON string — structured interactive sections
  status: mysqlEnum("status", ["draft", "published"]).default("draft").notNull(),
  readTime: varchar("readTime", { length: 20 }),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});

// server/db.ts
var _db = null;
async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}
async function upsertUser(user) {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }
  try {
    const values = {
      openId: user.openId
    };
    const updateSet = {};
    const textFields = ["name", "email", "loginMethod"];
    const assignNullable = (field) => {
      const value = user[field];
      if (value === void 0) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== void 0) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== void 0) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }
    if (!values.lastSignedIn) {
      values.lastSignedIn = /* @__PURE__ */ new Date();
    }
    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = /* @__PURE__ */ new Date();
    }
    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}
async function getUserByOpenId(openId) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return void 0;
  }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function createDemoRequest(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(demoRequests).values(data);
}
async function getAllDemoRequests() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(demoRequests).orderBy(desc(demoRequests.createdAt));
}
async function updateDemoRequestStatus(id, status, notes) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const updateData = { status };
  if (notes !== void 0) updateData.notes = notes;
  await db.update(demoRequests).set(updateData).where(eq(demoRequests.id, id));
}
async function getDemoRequestStats() {
  const db = await getDb();
  if (!db) return { total: 0, new: 0, contacted: 0, demo_booked: 0, closed_won: 0 };
  const rows = await db.select().from(demoRequests);
  return {
    total: rows.length,
    new: rows.filter((r) => r.status === "new").length,
    contacted: rows.filter((r) => r.status === "contacted").length,
    demo_booked: rows.filter((r) => r.status === "demo_booked").length,
    closed_won: rows.filter((r) => r.status === "closed_won").length
  };
}
async function upsertChatSession(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(chatSessions).values(data).onDuplicateKeyUpdate({
    set: {
      messageCount: data.messageCount,
      askedAboutPricing: data.askedAboutPricing,
      askedAboutDemo: data.askedAboutDemo,
      visitorEmail: data.visitorEmail ?? null,
      visitorName: data.visitorName ?? null,
      updatedAt: /* @__PURE__ */ new Date()
    }
  });
}
async function saveChatMessage(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(chatMessages).values(data);
}
async function recordPageView(data) {
  const db = await getDb();
  if (!db) return;
  await db.insert(pageViews).values(data);
}
async function getPageViewStats() {
  const db = await getDb();
  if (!db) return { total: 0 };
  const result = await db.select({ total: count() }).from(pageViews);
  return { total: result[0]?.total ?? 0 };
}
async function createBlogPost(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(blogPosts).values(data);
}
async function getBlogPost(slug) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  return result[0] ?? null;
}
async function getAllBlogPosts(status) {
  const db = await getDb();
  if (!db) return [];
  const query = db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  if (status) return query.where(eq(blogPosts.status, status));
  return query;
}
async function publishBlogPost(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(blogPosts).set({ status: "published", publishedAt: /* @__PURE__ */ new Date() }).where(eq(blogPosts.id, id));
}
async function deleteBlogPost(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
}

// server/_core/llm.ts
var ensureArray = (value) => Array.isArray(value) ? value : [value];
var normalizeContentPart = (part) => {
  if (typeof part === "string") {
    return { type: "text", text: part };
  }
  if (part.type === "text") {
    return part;
  }
  if (part.type === "image_url") {
    return part;
  }
  if (part.type === "file_url") {
    return part;
  }
  throw new Error("Unsupported message content part");
};
var normalizeMessage = (message) => {
  const { role, name, tool_call_id } = message;
  if (role === "tool" || role === "function") {
    const content = ensureArray(message.content).map((part) => typeof part === "string" ? part : JSON.stringify(part)).join("\n");
    return {
      role,
      name,
      tool_call_id,
      content
    };
  }
  const contentParts = ensureArray(message.content).map(normalizeContentPart);
  if (contentParts.length === 1 && contentParts[0].type === "text") {
    return {
      role,
      name,
      content: contentParts[0].text
    };
  }
  return {
    role,
    name,
    content: contentParts
  };
};
var normalizeToolChoice = (toolChoice, tools) => {
  if (!toolChoice) return void 0;
  if (toolChoice === "none" || toolChoice === "auto") {
    return toolChoice;
  }
  if (toolChoice === "required") {
    if (!tools || tools.length === 0) {
      throw new Error(
        "tool_choice 'required' was provided but no tools were configured"
      );
    }
    if (tools.length > 1) {
      throw new Error(
        "tool_choice 'required' needs a single tool or specify the tool name explicitly"
      );
    }
    return {
      type: "function",
      function: { name: tools[0].function.name }
    };
  }
  if ("name" in toolChoice) {
    return {
      type: "function",
      function: { name: toolChoice.name }
    };
  }
  return toolChoice;
};
var resolveApiUrl = () => ENV.forgeApiUrl && ENV.forgeApiUrl.trim().length > 0 ? `${ENV.forgeApiUrl.replace(/\/$/, "")}/v1/chat/completions` : "https://forge.manus.im/v1/chat/completions";
var assertApiKey = () => {
  if (!ENV.forgeApiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
};
var normalizeResponseFormat = ({
  responseFormat,
  response_format,
  outputSchema,
  output_schema
}) => {
  const explicitFormat = responseFormat || response_format;
  if (explicitFormat) {
    if (explicitFormat.type === "json_schema" && !explicitFormat.json_schema?.schema) {
      throw new Error(
        "responseFormat json_schema requires a defined schema object"
      );
    }
    return explicitFormat;
  }
  const schema = outputSchema || output_schema;
  if (!schema) return void 0;
  if (!schema.name || !schema.schema) {
    throw new Error("outputSchema requires both name and schema");
  }
  return {
    type: "json_schema",
    json_schema: {
      name: schema.name,
      schema: schema.schema,
      ...typeof schema.strict === "boolean" ? { strict: schema.strict } : {}
    }
  };
};
async function invokeLLM(params) {
  assertApiKey();
  const {
    messages,
    tools,
    toolChoice,
    tool_choice,
    outputSchema,
    output_schema,
    responseFormat,
    response_format
  } = params;
  const payload = {
    model: "gemini-2.5-flash",
    messages: messages.map(normalizeMessage)
  };
  if (tools && tools.length > 0) {
    payload.tools = tools;
  }
  const normalizedToolChoice = normalizeToolChoice(
    toolChoice || tool_choice,
    tools
  );
  if (normalizedToolChoice) {
    payload.tool_choice = normalizedToolChoice;
  }
  payload.max_tokens = 32768;
  payload.thinking = {
    "budget_tokens": 128
  };
  const normalizedResponseFormat = normalizeResponseFormat({
    responseFormat,
    response_format,
    outputSchema,
    output_schema
  });
  if (normalizedResponseFormat) {
    payload.response_format = normalizedResponseFormat;
  }
  const response = await fetch(resolveApiUrl(), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${ENV.forgeApiKey}`
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `LLM invoke failed: ${response.status} ${response.statusText} \u2013 ${errorText}`
    );
  }
  return await response.json();
}

// server/routers.ts
var appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true };
    })
  }),
  /**
   * Leads — demo requests submitted via the contact form or Calendly click tracking
   */
  leads: router({
    /** Submit a new demo request (email fallback form) */
    submit: publicProcedure.input(
      z2.object({
        name: z2.string().min(1).max(255),
        email: z2.string().email().max(320),
        source: z2.enum(["calendly_click", "email_form", "chat_widget"]),
        propertyName: z2.string().max(255).optional(),
        propertyType: z2.enum(["hotel", "bnb", "cafe", "resort", "other"]).optional(),
        message: z2.string().max(2e3).optional()
      })
    ).mutation(async ({ input, ctx }) => {
      const ipAddress = ctx.req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || ctx.req.socket?.remoteAddress || void 0;
      await createDemoRequest({
        name: input.name,
        email: input.email,
        source: input.source,
        propertyName: input.propertyName,
        propertyType: input.propertyType,
        message: input.message,
        ipAddress
      });
      await notifyOwner({
        title: `New Demo Request \u2014 ${input.name}`,
        content: `**${input.name}** (${input.email}) submitted a demo request via ${input.source}.

Property: ${input.propertyName || "Not specified"}
Message: ${input.message || "None"}`
      }).catch(() => {
      });
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
            submitted_at: (/* @__PURE__ */ new Date()).toISOString(),
            ip_address: ipAddress ?? ""
          })
        }).catch((err) => {
          console.warn("[Pabbly] Webhook delivery failed (non-blocking):", err?.message);
        });
      }
      return { success: true };
    }),
    /** Admin only — list all leads */
    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError3({ code: "FORBIDDEN", message: "Admin access required" });
      }
      return getAllDemoRequests();
    }),
    /** Admin only — update lead status */
    updateStatus: protectedProcedure.input(
      z2.object({
        id: z2.number().int().positive(),
        status: z2.enum([
          "new",
          "contacted",
          "demo_booked",
          "proposal_sent",
          "closed_won",
          "closed_lost"
        ]),
        notes: z2.string().max(5e3).optional()
      })
    ).mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError3({ code: "FORBIDDEN", message: "Admin access required" });
      }
      await updateDemoRequestStatus(input.id, input.status, input.notes);
      return { success: true };
    }),
    /** Admin only — get CRM stats */
    stats: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError3({ code: "FORBIDDEN", message: "Admin access required" });
      }
      return getDemoRequestStats();
    })
  }),
  /**
   * Chat — track FloatingChat widget sessions and messages
   */
  chat: router({
    /** Upsert a chat session (called when widget opens or message count changes) */
    syncSession: publicProcedure.input(
      z2.object({
        sessionToken: z2.string().min(1).max(128),
        visitorEmail: z2.string().email().max(320).optional(),
        visitorName: z2.string().max(255).optional(),
        messageCount: z2.number().int().min(0),
        askedAboutPricing: z2.boolean(),
        askedAboutDemo: z2.boolean()
      })
    ).mutation(async ({ input, ctx }) => {
      const ipAddress = ctx.req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || ctx.req.socket?.remoteAddress || void 0;
      await upsertChatSession({
        sessionToken: input.sessionToken,
        visitorEmail: input.visitorEmail,
        visitorName: input.visitorName,
        messageCount: input.messageCount,
        askedAboutPricing: input.askedAboutPricing,
        askedAboutDemo: input.askedAboutDemo,
        ipAddress
      });
      return { success: true };
    }),
    /** Save an individual chat message */
    saveMessage: publicProcedure.input(
      z2.object({
        sessionId: z2.number().int().positive(),
        sender: z2.enum(["guest", "bot"]),
        message: z2.string().min(1).max(1e4)
      })
    ).mutation(async ({ input }) => {
      await saveChatMessage({
        sessionId: input.sessionId,
        sender: input.sender,
        message: input.message
      });
      return { success: true };
    })
  }),
  /**
   * Analytics — lightweight page view tracking
   */
  analytics: router({
    /** Record a page view (called on route change) */
    pageView: publicProcedure.input(
      z2.object({
        path: z2.string().max(512),
        referrer: z2.string().max(512).optional(),
        userAgent: z2.string().max(512).optional()
      })
    ).mutation(async ({ input, ctx }) => {
      const ipAddress = ctx.req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || ctx.req.socket?.remoteAddress || void 0;
      await recordPageView({
        path: input.path,
        referrer: input.referrer,
        userAgent: input.userAgent,
        ipAddress
      });
      return { success: true };
    }),
    /** Admin only — get page view stats */
    stats: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError3({ code: "FORBIDDEN", message: "Admin access required" });
      }
      return getPageViewStats();
    })
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
    chat: publicProcedure.input(
      z2.object({
        messages: z2.array(
          z2.object({
            role: z2.enum(["user", "assistant"]),
            content: z2.string().max(4e3)
          })
        ).min(1).max(50),
        hotelName: z2.string().max(100).optional(),
        hotelCity: z2.string().max(100).optional(),
        checkInTime: z2.string().max(20).optional(),
        checkOutTime: z2.string().max(20).optional(),
        currency: z2.string().max(5).optional(),
        startingRate: z2.string().max(20).optional()
      })
    ).mutation(async ({ input }) => {
      const hotelName = input.hotelName || "The Grand Boutique";
      const hotelCity = input.hotelCity || "your city";
      const checkIn = input.checkInTime || "3:00 PM";
      const checkOut = input.checkOutTime || "11:00 AM";
      const currency = input.currency || "\u20AC";
      const rate = input.startingRate || "145";
      const systemPrompt = `You are an elite AI concierge for ${hotelName}, a luxury boutique hotel in ${hotelCity}. Your name is "NightDesk Concierge".

Your role is to provide warm, professional, and highly personalised guest service \u2014 24 hours a day, 7 days a week. You represent the pinnacle of hospitality.

## Your Personality
- Warm, elegant, and genuinely helpful \u2014 like a world-class front desk manager
- Concise but thorough \u2014 never give one-word answers, but never ramble
- Proactive \u2014 always offer the next logical step or suggestion
- Use light, tasteful hospitality language ("Certainly", "Of course", "I'd be delighted to")
- Never say you are an AI unless directly asked. If asked, say: "I'm the NightDesk AI Concierge \u2014 here to make your stay exceptional."

## Hotel Information for ${hotelName}
- Location: ${hotelCity}
- Check-in: ${checkIn} | Check-out: ${checkOut}
- Rates from: ${currency}${rate}/night
- Languages: English, French, Arabic (respond in the guest's language)
- Pet policy: Pets welcome (under 25kg), ${currency}30/night fee, advance notice required
- Parking: Complimentary private parking on-site
- Breakfast: Daily 7:00\u201310:30 AM, included in Deluxe and Suite packages
- WiFi: Complimentary high-speed throughout the property
- Pool: Rooftop pool open 8 AM\u20139 PM daily
- Restaurant: Open for dinner 6\u201310 PM, reservations recommended on weekends
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
If a guest has a complaint, medical issue, or request you cannot resolve, say: "I'm connecting you with our team right away \u2014 they will reach you within 5 minutes. Is there anything else I can note for them?"

## Response Format
- Keep responses under 120 words unless the guest asks for detailed information
- Use line breaks for readability when listing multiple items
- End with a helpful follow-up question or offer when appropriate
- Never use markdown headers or bullet points \u2014 write in natural, flowing prose
- Emoji are acceptable sparingly (\u{1F3E8} \u2615 \u{1F697} \u{1F4C5}) to add warmth`;
      const llmMessages = [
        { role: "system", content: systemPrompt },
        ...input.messages.map((m) => ({
          role: m.role,
          content: m.content
        }))
      ];
      const result = await invokeLLM({
        messages: llmMessages,
        maxTokens: 300
      });
      const reply = result.choices[0]?.message?.content;
      if (typeof reply !== "string" || !reply.trim()) {
        throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR", message: "No response from AI" });
      }
      return { reply: reply.trim() };
    })
  }),
  /**
   * Blog — AI-generated interactive articles stored in MySQL
   */
  blog: router({
    /** Generate a new interactive blog article using Gemini */
    generate: publicProcedure.input(z2.object({
      topic: z2.string().min(1).max(300),
      category: z2.string().max(100).optional()
    })).mutation(async ({ input }) => {
      const slug = input.topic.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").slice(0, 80) + "-" + Date.now().toString(36);
      const systemPrompt = `You are a senior content strategist for NightDesk.agency, a hotel digital marketing agency. You write SEO blog articles that feel written by a real hotel industry expert \u2014 not an AI. Your tone is warm, direct, and objective. You back every claim with real data and statistics. You use vivid analogies from hotel operations that operators will immediately recognise.

CRITICAL REQUIREMENTS for every article:
1. Sound human and conversational \u2014 use "you", "your hotel", "I've seen this pattern". No corporate jargon.
2. Every section must include at least ONE of: a real statistic, a data comparison, a chart spec, or a callout insight.
3. Write for boutique hotel owners and GMs who are busy and skeptical \u2014 respect their intelligence.
4. Include specific numbers wherever possible (percentages, dollar amounts, timeframes).
5. Each article must include at least 2 data visualisation specs (chart or stat block).

OUTPUT FORMAT \u2014 you must return valid JSON only, no markdown wrapper:

{
  "title": "Full SEO-optimised title with keyword",
  "category": "Hotel Revenue | Google Ads | SEO | AI Technology | Strategy",
  "excerpt": "One compelling sentence (under 160 chars) that makes a hotel GM want to read this",
  "readTime": "X min read",
  "sections": [
    { "type": "intro", "content": "2-3 sentences. Start with a sharp observation or surprising fact. Make it feel like the start of a conversation, not an essay." },
    { "type": "h2", "content": "First subheading \u2014 should create curiosity" },
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
    { "type": "cta", "text": "Get a free hotel marketing audit from NightDesk \u2192", "link": "/#contact" }
  ]
}

Section types available: intro, h2, p, stat, callout, chart, list, cta
Callout variants: gold, info, warning
Chart types: bar, area, comparison

Write 1,000\u20131,400 word equivalent content spread across sections. Make it genuinely useful \u2014 hotel operators should feel smarter after reading it.`;
      const llmMessages = [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Write an interactive SEO blog article about: ${input.topic}

Return only the JSON object, no markdown, no explanation.` }
      ];
      const result = await invokeLLM({ messages: llmMessages, maxTokens: 4e3 });
      const raw = result.choices[0]?.message?.content;
      if (typeof raw !== "string" || !raw.trim()) {
        throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR", message: "AI generation failed" });
      }
      const jsonStr = raw.trim().replace(/^```json\s*/i, "").replace(/\s*```$/i, "").trim();
      let parsed;
      try {
        parsed = JSON.parse(jsonStr);
      } catch {
        throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR", message: "AI returned invalid JSON" });
      }
      await createBlogPost({
        slug,
        title: parsed.title ?? input.topic,
        category: parsed.category ?? input.category ?? "Hotel Marketing",
        excerpt: parsed.excerpt ?? "",
        content: JSON.stringify(parsed.sections ?? []),
        readTime: parsed.readTime ?? "7 min read",
        status: "draft"
      });
      return { slug, title: parsed.title };
    }),
    /** List all blog posts */
    list: publicProcedure.input(z2.object({ status: z2.enum(["draft", "published", "all"]).default("published") })).query(async ({ input }) => {
      if (input.status === "all") return getAllBlogPosts();
      return getAllBlogPosts(input.status);
    }),
    /** Get single post by slug */
    get: publicProcedure.input(z2.object({ slug: z2.string() })).query(async ({ input }) => getBlogPost(input.slug)),
    /** Publish a draft */
    publish: publicProcedure.input(z2.object({ id: z2.number().int().positive() })).mutation(async ({ input }) => {
      await publishBlogPost(input.id);
      return { success: true };
    }),
    /** Delete a post */
    delete: publicProcedure.input(z2.object({ id: z2.number().int().positive() })).mutation(async ({ input }) => {
      await deleteBlogPost(input.id);
      return { success: true };
    })
  })
});

// shared/_core/errors.ts
var HttpError = class extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
  statusCode;
};
var ForbiddenError = (msg) => new HttpError(403, msg);

// server/_core/sdk.ts
import axios from "axios";
import { parse as parseCookieHeader } from "cookie";
import { SignJWT, jwtVerify } from "jose";
var isNonEmptyString2 = (value) => typeof value === "string" && value.length > 0;
var EXCHANGE_TOKEN_PATH = `/webdev.v1.WebDevAuthPublicService/ExchangeToken`;
var GET_USER_INFO_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfo`;
var GET_USER_INFO_WITH_JWT_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt`;
var OAuthService = class {
  constructor(client) {
    this.client = client;
    console.log("[OAuth] Initialized with baseURL:", ENV.oAuthServerUrl);
    if (!ENV.oAuthServerUrl) {
      console.error(
        "[OAuth] ERROR: OAUTH_SERVER_URL is not configured! Set OAUTH_SERVER_URL environment variable."
      );
    }
  }
  client;
  decodeState(state) {
    const redirectUri = atob(state);
    return redirectUri;
  }
  async getTokenByCode(code, state) {
    const payload = {
      clientId: ENV.appId,
      grantType: "authorization_code",
      code,
      redirectUri: this.decodeState(state)
    };
    const { data } = await this.client.post(
      EXCHANGE_TOKEN_PATH,
      payload
    );
    return data;
  }
  async getUserInfoByToken(token) {
    const { data } = await this.client.post(
      GET_USER_INFO_PATH,
      {
        accessToken: token.accessToken
      }
    );
    return data;
  }
};
var createOAuthHttpClient = () => axios.create({
  baseURL: ENV.oAuthServerUrl,
  timeout: AXIOS_TIMEOUT_MS
});
var SDKServer = class {
  client;
  oauthService;
  constructor(client = createOAuthHttpClient()) {
    this.client = client;
    this.oauthService = new OAuthService(this.client);
  }
  deriveLoginMethod(platforms, fallback) {
    if (fallback && fallback.length > 0) return fallback;
    if (!Array.isArray(platforms) || platforms.length === 0) return null;
    const set = new Set(
      platforms.filter((p) => typeof p === "string")
    );
    if (set.has("REGISTERED_PLATFORM_EMAIL")) return "email";
    if (set.has("REGISTERED_PLATFORM_GOOGLE")) return "google";
    if (set.has("REGISTERED_PLATFORM_APPLE")) return "apple";
    if (set.has("REGISTERED_PLATFORM_MICROSOFT") || set.has("REGISTERED_PLATFORM_AZURE"))
      return "microsoft";
    if (set.has("REGISTERED_PLATFORM_GITHUB")) return "github";
    const first = Array.from(set)[0];
    return first ? first.toLowerCase() : null;
  }
  /**
   * Exchange OAuth authorization code for access token
   * @example
   * const tokenResponse = await sdk.exchangeCodeForToken(code, state);
   */
  async exchangeCodeForToken(code, state) {
    return this.oauthService.getTokenByCode(code, state);
  }
  /**
   * Get user information using access token
   * @example
   * const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
   */
  async getUserInfo(accessToken) {
    const data = await this.oauthService.getUserInfoByToken({
      accessToken
    });
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  parseCookies(cookieHeader) {
    if (!cookieHeader) {
      return /* @__PURE__ */ new Map();
    }
    const parsed = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed));
  }
  getSessionSecret() {
    const secret = ENV.cookieSecret;
    return new TextEncoder().encode(secret);
  }
  /**
   * Create a session token for a Manus user openId
   * @example
   * const sessionToken = await sdk.createSessionToken(userInfo.openId);
   */
  async createSessionToken(openId, options = {}) {
    return this.signSession(
      {
        openId,
        appId: ENV.appId,
        name: options.name || ""
      },
      options
    );
  }
  async signSession(payload, options = {}) {
    const issuedAt = Date.now();
    const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1e3);
    const secretKey = this.getSessionSecret();
    return new SignJWT({
      openId: payload.openId,
      appId: payload.appId,
      name: payload.name
    }).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setExpirationTime(expirationSeconds).sign(secretKey);
  }
  async verifySession(cookieValue) {
    if (!cookieValue) {
      console.warn("[Auth] Missing session cookie");
      return null;
    }
    try {
      const secretKey = this.getSessionSecret();
      const { payload } = await jwtVerify(cookieValue, secretKey, {
        algorithms: ["HS256"]
      });
      const { openId, appId, name } = payload;
      if (!isNonEmptyString2(openId) || !isNonEmptyString2(appId) || !isNonEmptyString2(name)) {
        console.warn("[Auth] Session payload missing required fields");
        return null;
      }
      return {
        openId,
        appId,
        name
      };
    } catch (error) {
      console.warn("[Auth] Session verification failed", String(error));
      return null;
    }
  }
  async getUserInfoWithJwt(jwtToken) {
    const payload = {
      jwtToken,
      projectId: ENV.appId
    };
    const { data } = await this.client.post(
      GET_USER_INFO_WITH_JWT_PATH,
      payload
    );
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  async authenticateRequest(req) {
    const cookies = this.parseCookies(req.headers.cookie);
    const sessionCookie = cookies.get(COOKIE_NAME);
    const session = await this.verifySession(sessionCookie);
    if (!session) {
      throw ForbiddenError("Invalid session cookie");
    }
    const sessionUserId = session.openId;
    const signedInAt = /* @__PURE__ */ new Date();
    let user = await getUserByOpenId(sessionUserId);
    if (!user) {
      try {
        const userInfo = await this.getUserInfoWithJwt(sessionCookie ?? "");
        await upsertUser({
          openId: userInfo.openId,
          name: userInfo.name || null,
          email: userInfo.email ?? null,
          loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
          lastSignedIn: signedInAt
        });
        user = await getUserByOpenId(userInfo.openId);
      } catch (error) {
        console.error("[Auth] Failed to sync user from OAuth:", error);
        throw ForbiddenError("Failed to sync user info");
      }
    }
    if (!user) {
      throw ForbiddenError("User not found");
    }
    await upsertUser({
      openId: user.openId,
      lastSignedIn: signedInAt
    });
    return user;
  }
};
var sdk = new SDKServer();

// server/_core/context.ts
async function createContext(opts) {
  let user = null;
  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    user = null;
  }
  return {
    req: opts.req,
    res: opts.res,
    user
  };
}

// server/_core/oauth.ts
function getQueryParam(req, key) {
  const value = req.query[key];
  return typeof value === "string" ? value : void 0;
}
function registerOAuthRoutes(app2) {
  app2.get("/api/oauth/callback", async (req, res) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");
    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }
    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
      if (!userInfo.openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }
      await upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: /* @__PURE__ */ new Date()
      });
      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS
      });
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}

// api/_index.ts
var app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
registerOAuthRoutes(app);
app.use(
  "/api/trpc",
  createExpressMiddleware({ router: appRouter, createContext })
);
app.get("/api/db-check", (req, res) => {
  const url = process.env.DATABASE_URL ?? "";
  res.json({
    set: !!url,
    length: url.length,
    preview: url.slice(0, 12) + "...",
    startsWithMysql: url.trimStart().startsWith("mysql://")
  });
});
app.get("/api/setup", async (_req, res) => {
  let raw = process.env.DATABASE_URL ?? "";
  if (!raw) {
    res.status(500).json({ error: "DATABASE_URL not set" });
    return;
  }
  const url = raw.trim().replace(/^["']|["']$/g, "");
  try {
    const mysql = await import("mysql2/promise");
    const parsed = new URL(url);
    const conn = await mysql.createConnection({
      host: parsed.hostname,
      port: parseInt(parsed.port) || 3306,
      user: decodeURIComponent(parsed.username),
      password: decodeURIComponent(parsed.password),
      database: parsed.pathname.replace(/^\//, ""),
      ssl: { rejectUnauthorized: false }
    });
    const tables = [
      `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        openId VARCHAR(64) NOT NULL UNIQUE,
        name TEXT,
        email VARCHAR(320),
        loginMethod VARCHAR(64),
        role ENUM('user','admin') NOT NULL DEFAULT 'user',
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        lastSignedIn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS demo_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(320) NOT NULL,
        source ENUM('calendly_click','email_form','chat_widget') NOT NULL,
        propertyName VARCHAR(255),
        propertyType ENUM('hotel','bnb','cafe','resort','other'),
        message TEXT,
        status ENUM('new','contacted','demo_booked','proposal_sent','closed_won','closed_lost') NOT NULL DEFAULT 'new',
        notes TEXT,
        ipAddress VARCHAR(45),
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS chat_sessions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        sessionToken VARCHAR(128) NOT NULL UNIQUE,
        visitorEmail VARCHAR(320),
        visitorName VARCHAR(255),
        messageCount INT NOT NULL DEFAULT 0,
        askedAboutPricing BOOLEAN NOT NULL DEFAULT FALSE,
        askedAboutDemo BOOLEAN NOT NULL DEFAULT FALSE,
        ipAddress VARCHAR(45),
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS chat_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        sessionId INT NOT NULL,
        sender ENUM('guest','bot') NOT NULL,
        message TEXT NOT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS page_views (
        id INT AUTO_INCREMENT PRIMARY KEY,
        path VARCHAR(512) NOT NULL,
        referrer VARCHAR(512),
        userAgent VARCHAR(512),
        ipAddress VARCHAR(45),
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS blog_posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(255) NOT NULL UNIQUE,
        title VARCHAR(500) NOT NULL,
        category VARCHAR(100),
        excerpt TEXT,
        content LONGTEXT NOT NULL,
        status ENUM('draft','published') NOT NULL DEFAULT 'draft',
        readTime VARCHAR(20),
        publishedAt TIMESTAMP NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`
    ];
    for (const sql of tables) {
      await conn.execute(sql);
    }
    await conn.end();
    res.json({ success: true, message: "All 5 tables created successfully." });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: message });
  }
});
var index_default = app;
export {
  index_default as default
};
