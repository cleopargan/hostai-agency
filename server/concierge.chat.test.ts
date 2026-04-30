import { describe, expect, it, vi } from "vitest";

// Mock the LLM so the test doesn't make real API calls
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn().mockResolvedValue({
    id: "test-id",
    created: Date.now(),
    model: "gemini-2.5-flash",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: "Check-in is at 3:00 PM. Early check-in from 12 PM is available for €25. Would you like me to arrange that? 🏨",
        },
        finish_reason: "stop",
      },
    ],
  }),
}));

import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
      socket: { remoteAddress: "127.0.0.1" },
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("concierge.chat", () => {
  it("returns an AI reply for a guest question", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.concierge.chat({
      messages: [{ role: "user", content: "What time is check-in?" }],
      hotelName: "The Grand Maison",
      hotelCity: "Paris",
      checkInTime: "3:00 PM",
      checkOutTime: "11:00 AM",
      currency: "€",
      startingRate: "185",
    });

    expect(result).toHaveProperty("reply");
    expect(typeof result.reply).toBe("string");
    expect(result.reply.length).toBeGreaterThan(10);
  });

  it("accepts a multi-turn conversation history", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.concierge.chat({
      messages: [
        { role: "user", content: "Is breakfast included?" },
        { role: "assistant", content: "Yes, breakfast is included in Deluxe packages." },
        { role: "user", content: "What time does it start?" },
      ],
      hotelName: "The Grand Maison",
      hotelCity: "Paris",
    });

    expect(result).toHaveProperty("reply");
    expect(typeof result.reply).toBe("string");
  });

  it("rejects empty message arrays", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.concierge.chat({ messages: [] })
    ).rejects.toThrow();
  });
});
