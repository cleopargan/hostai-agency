import { eq, desc, count } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  demoRequests,
  InsertDemoRequest,
  chatSessions,
  InsertChatSession,
  chatMessages,
  InsertChatMessage,
  pageViews,
  blogPosts,
  InsertBlogPost,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
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

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ─── Demo request helpers ─────────────────────────────────────────────────────

export async function createDemoRequest(data: InsertDemoRequest) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(demoRequests).values(data);
}

export async function getAllDemoRequests() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(demoRequests).orderBy(desc(demoRequests.createdAt));
}

export async function updateDemoRequestStatus(
  id: number,
  status: "new" | "contacted" | "demo_booked" | "proposal_sent" | "closed_won" | "closed_lost",
  notes?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const updateData: Record<string, unknown> = { status };
  if (notes !== undefined) updateData.notes = notes;
  await db.update(demoRequests).set(updateData).where(eq(demoRequests.id, id));
}

export async function getDemoRequestStats() {
  const db = await getDb();
  if (!db) return { total: 0, new: 0, contacted: 0, demo_booked: 0, closed_won: 0 };
  const rows = await db.select().from(demoRequests);
  return {
    total: rows.length,
    new: rows.filter((r) => r.status === "new").length,
    contacted: rows.filter((r) => r.status === "contacted").length,
    demo_booked: rows.filter((r) => r.status === "demo_booked").length,
    closed_won: rows.filter((r) => r.status === "closed_won").length,
  };
}

// ─── Chat session helpers ─────────────────────────────────────────────────────

export async function upsertChatSession(data: InsertChatSession) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .insert(chatSessions)
    .values(data)
    .onDuplicateKeyUpdate({
      set: {
        messageCount: data.messageCount,
        askedAboutPricing: data.askedAboutPricing,
        askedAboutDemo: data.askedAboutDemo,
        visitorEmail: data.visitorEmail ?? null,
        visitorName: data.visitorName ?? null,
        updatedAt: new Date(),
      },
    });
}

export async function saveChatMessage(data: InsertChatMessage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(chatMessages).values(data);
}

// ─── Page view helpers ────────────────────────────────────────────────────────

export async function recordPageView(data: {
  path: string;
  referrer?: string;
  userAgent?: string;
  ipAddress?: string;
}) {
  const db = await getDb();
  if (!db) return;
  await db.insert(pageViews).values(data);
}

export async function getPageViewStats() {
  const db = await getDb();
  if (!db) return { total: 0 };
  const result = await db.select({ total: count() }).from(pageViews);
  return { total: result[0]?.total ?? 0 };
}

// ─── Blog post helpers ────────────────────────────────────────────────────────

export async function createBlogPost(data: InsertBlogPost) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(blogPosts).values(data);
}

export async function getBlogPost(slug: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  return result[0] ?? null;
}

export async function getAllBlogPosts(status?: "draft" | "published") {
  const db = await getDb();
  if (!db) return [];
  const query = db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  if (status) return query.where(eq(blogPosts.status, status));
  return query;
}

export async function publishBlogPost(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(blogPosts)
    .set({ status: "published", publishedAt: new Date() })
    .where(eq(blogPosts.id, id));
}

export async function deleteBlogPost(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
}
