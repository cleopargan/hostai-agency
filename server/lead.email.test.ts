import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const ORIGINAL_ENV = { ...process.env };

async function loadEmailModule() {
  vi.resetModules();
  return import("./_core/email");
}

describe("lead email delivery", () => {
  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    process.env = { ...ORIGINAL_ENV };
  });

  it("returns false (never throws) when RESEND_API_KEY is missing", async () => {
    delete process.env.RESEND_API_KEY;
    const { sendLeadNotification } = await loadEmailModule();

    await expect(
      sendLeadNotification({ name: "Maria", email: "maria@hotel.com", source: "email_form" })
    ).resolves.toBe(false);
  });

  it("posts the lead to Resend and sets reply-to to the prospect", async () => {
    process.env.RESEND_API_KEY = "re_test_key";
    process.env.LEAD_NOTIFY_EMAIL = "hello@nightdesk.agency";

    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200, statusText: "OK" });
    vi.stubGlobal("fetch", fetchMock);

    const { sendLeadNotification } = await loadEmailModule();
    const sent = await sendLeadNotification({
      name: "Maria",
      email: "maria@hotel.com",
      source: "email_form",
    });

    expect(sent).toBe(true);
    expect(fetchMock).toHaveBeenCalledOnce();

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");

    const body = JSON.parse(init.body);
    expect(body.to).toEqual(["hello@nightdesk.agency"]);
    expect(body.reply_to).toBe("maria@hotel.com");
    expect(body.subject).toContain("Maria");
  });

  it("returns false when Resend rejects the message", async () => {
    process.env.RESEND_API_KEY = "re_test_key";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 422,
        statusText: "Unprocessable Entity",
        text: async () => "domain not verified",
      })
    );

    const { sendLeadNotification } = await loadEmailModule();
    await expect(
      sendLeadNotification({ name: "Maria", email: "maria@hotel.com", source: "email_form" })
    ).resolves.toBe(false);
  });

  it("escapes HTML in lead fields", async () => {
    process.env.RESEND_API_KEY = "re_test_key";
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200, statusText: "OK" });
    vi.stubGlobal("fetch", fetchMock);

    const { sendLeadNotification } = await loadEmailModule();
    await sendLeadNotification({
      name: "<script>alert(1)</script>",
      email: "x@hotel.com",
      source: "email_form",
    });

    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.html).not.toContain("<script>");
    expect(body.html).toContain("&lt;script&gt;");
  });
});
