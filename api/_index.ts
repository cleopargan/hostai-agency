import "dotenv/config";
import express, { Request, Response } from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../server/routers";
import { createContext } from "../server/_core/context";
import { registerOAuthRoutes } from "../server/_core/oauth";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

registerOAuthRoutes(app);

app.use(
  "/api/trpc",
  createExpressMiddleware({ router: appRouter, createContext })
);

// Debug — visit /api/db-check to see what DATABASE_URL looks like
app.get("/api/db-check", (req: Request, res: Response) => {
  const url = process.env.DATABASE_URL ?? "";
  res.json({
    set: !!url,
    length: url.length,
    preview: url.slice(0, 12) + "...",
    startsWithMysql: url.trimStart().startsWith("mysql://"),
  });
});

// One-time database setup — visit /api/setup once after deployment
app.get("/api/setup", async (_req: Request, res: Response) => {
  let raw = process.env.DATABASE_URL ?? "";
  if (!raw) {
    res.status(500).json({ error: "DATABASE_URL not set" });
    return;
  }
  // Strip wrapping quotes and whitespace that Vercel sometimes injects
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
      ssl: { rejectUnauthorized: false },
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
      )`,
    ];
    for (const sql of tables) {
      await conn.execute(sql);
    }
    await conn.end();
    res.json({ success: true, message: "All 5 tables created successfully." });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: message });
  }
});

export default app;
