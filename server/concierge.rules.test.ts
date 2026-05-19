import { describe, expect, it, vi } from "vitest";

// Capture the params passed to invokeLLM and return controlled replies
let capturedParams: any = null;
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn().mockImplementation(async (params: any) => {
    capturedParams = params;
    const last = params.messages[params.messages.length - 1];
    const userText = typeof last === "string" ? last : last.content || "";

    let reply = "I may not have a prepared reply.";
    if (/super bowl|who won/i.test(userText)) {
      reply = "I’m here to help only with questions about NightDesk and our services for boutique hotels.";
    } else if (/pricing|enterprise|details not on the website|not available/i.test(userText)) {
      reply = "I don’t want to give inaccurate information. For that detail, please contact NightDesk directly through the website.";
    }

    return {
      id: "test-id",
      created: Date.now(),
      model: "test-model",
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: reply },
          finish_reason: "stop",
        },
      ],
    };
  }),
}));

import { appRouter } from "./routers";

function createPublicContext() {
  return {
    user: null,
    req: { protocol: "https", headers: {}, socket: { remoteAddress: "127.0.0.1" } },
    res: { clearCookie: vi.fn() },
  } as any;
}

describe("concierge.chat rules enforcement (integration)", () => {
  it("returns the exact out-of-scope fallback reply for unrelated questions", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.concierge.chat({
      messages: [{ role: "user", content: "Who won the Super Bowl?" }],
      isSiteChat: true,
    });

    expect(result).toHaveProperty("reply");
    expect(result.reply).toBe(
      "I’m here to help only with questions about NightDesk and our services for boutique hotels."
    );

    // Ensure the system prompt injected the website-assistant identity/rules
    expect(capturedParams).toBeTruthy();
    const systemMsg = capturedParams.messages[0]?.content as string;
    expect(systemMsg).toContain("NightDesk");
    expect(systemMsg).toContain("AI website assistant");
    expect(systemMsg).toContain("help only with questions about NightDesk");
  });

  it("returns the exact unknown-info fallback reply when detail is not on the website", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.concierge.chat({
      messages: [{ role: "user", content: "Can you share your enterprise pricing and SLAs?" }],
      isSiteChat: true,
    });

    expect(result).toHaveProperty("reply");
    expect(result.reply).toBe(
      "I don’t want to give inaccurate information. For that detail, please contact NightDesk directly through the website."
    );

    // Ensure the system prompt includes the website-as-source-of-truth guidance
    expect(capturedParams).toBeTruthy();
    const systemMsg = capturedParams.messages[0]?.content as string;
    expect(systemMsg).toContain("single source of truth");
    expect(systemMsg).toContain("contact NightDesk directly through the website");
  });
});
