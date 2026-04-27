import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
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
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Demo requests — submitted via the Calendly CTA or email fallback form.
 * Every lead that expresses interest in a demo is stored here.
 */
export const demoRequests = mysqlTable("demo_requests", {
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
  status: mysqlEnum("status", ["new", "contacted", "demo_booked", "proposal_sent", "closed_won", "closed_lost"])
    .default("new")
    .notNull(),
  /** Internal notes added by the owner */
  notes: text("notes"),
  /** IP address for deduplication */
  ipAddress: varchar("ipAddress", { length: 45 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DemoRequest = typeof demoRequests.$inferSelect;
export type InsertDemoRequest = typeof demoRequests.$inferInsert;

/**
 * Chat sessions — each time a visitor opens the FloatingChat widget.
 */
export const chatSessions = mysqlTable("chat_sessions", {
  id: int("id").autoincrement().primaryKey(),
  sessionToken: varchar("sessionToken", { length: 128 }).notNull().unique(),
  visitorEmail: varchar("visitorEmail", { length: 320 }),
  visitorName: varchar("visitorName", { length: 255 }),
  messageCount: int("messageCount").default(0).notNull(),
  askedAboutPricing: boolean("askedAboutPricing").default(false).notNull(),
  askedAboutDemo: boolean("askedAboutDemo").default(false).notNull(),
  ipAddress: varchar("ipAddress", { length: 45 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ChatSession = typeof chatSessions.$inferSelect;
export type InsertChatSession = typeof chatSessions.$inferInsert;

/**
 * Individual chat messages within a session.
 */
export const chatMessages = mysqlTable("chat_messages", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: int("sessionId").notNull(),
  sender: mysqlEnum("sender", ["guest", "bot"]).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;

/**
 * Page analytics — simple visitor tracking without third-party scripts.
 */
export const pageViews = mysqlTable("page_views", {
  id: int("id").autoincrement().primaryKey(),
  path: varchar("path", { length: 512 }).notNull(),
  referrer: varchar("referrer", { length: 512 }),
  userAgent: varchar("userAgent", { length: 512 }),
  ipAddress: varchar("ipAddress", { length: 45 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PageView = typeof pageViews.$inferSelect;