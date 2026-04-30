import { describe, expect, it } from "vitest";

/**
 * Validates that the PABBLY_WEBHOOK_URL secret is set and the endpoint
 * responds to a POST request (Pabbly returns 200 on valid webhook calls).
 */
describe("Pabbly webhook integration", () => {
  it("PABBLY_WEBHOOK_URL env var is set", () => {
    const url = process.env.PABBLY_WEBHOOK_URL;
    expect(url).toBeTruthy();
    expect(url).toContain("pabbly.com");
  });

  it("Pabbly webhook endpoint accepts a POST with lead payload", async () => {
    const url = process.env.PABBLY_WEBHOOK_URL;
    if (!url) {
      throw new Error("PABBLY_WEBHOOK_URL is not set");
    }

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test Lead",
        email: "test@nightdesk.agency",
        source: "email_form",
        property_name: "Test Boutique Hotel",
        property_type: "hotel",
        message: "This is a vitest validation ping — not a real lead.",
        submitted_at: new Date().toISOString(),
        ip_address: "127.0.0.1",
      }),
    });

    // Pabbly returns 200 on successful webhook receipt
    expect(response.status).toBe(200);
  }, 15000); // 15s timeout for network call
});
