Deploy & Test Checklist — NightDesk on-site AI assistant

Goal: Deploy changes (chatbot rules + system prompt) to staging and verify the on-site assistant enforces the rules.

1) Run focused tests locally
- Run the concierge rules tests:

```bash
pnpm exec vitest run server/concierge.rules.test.ts --reporter dot
```

- Optionally run the full test suite (may require env vars):

```bash
pnpm test
```

2) Start local dev server
- Start backend/dev server:

```bash
pnpm dev
```

- Open the site locally (frontend dev server) and the backend endpoints as configured.

3) Verify served discovery file
- Confirm the public AI instructions are available at `/ai-instructions.txt` on the site (staging or local):

```bash
curl -sSL https://<staging-or-local-host>/ai-instructions.txt | sed -n '1,120p'
```

- Ensure the new `Chatbot Behaviour Rules` and `Website as Single Source of Truth` sections appear.

4) Smoke-test the concierge endpoint
- Use the existing tRPC or API endpoint to simulate user prompts. Locally, use the app's tRPC caller or a small script calling the `concourse.chat` endpoint.

- Quick sanity via unit test (preferred): the `concierge.rules.test.ts` covers the exact fallback replies. If that passes, the runtime wiring is verified.

5) Deploy to staging
- Push branch and open a PR. Ensure CI runs the test suite (or at least the concierge rules test).
- Deploy to your staging environment (Vercel, Netlify, or server host).

6) Live verification on staging
- Visit staging site and open the chat widget.
- Ask an unrelated question (e.g., "Who won the Super Bowl?") and confirm the assistant replies exactly:

“I’m here to help only with questions about NightDesk and our services for boutique hotels.”

- Ask for non-public details (e.g., "enterprise pricing") and confirm reply exactly:

“I don’t want to give inaccurate information. For that detail, please contact NightDesk directly through the website.”

- Check the widget language and behaviour for normal allowed-topic queries.

7) Optional: Add CI check (recommended)
- Add a GitHub Actions job to run `pnpm exec vitest run server/concierge.rules.test.ts` on pull requests to prevent regressions.

Notes
- The `server/concierge.rules.test.ts` test mocks the LLM and asserts both the exact fallback phrases and the presence of the rules in the injected system prompt.
- If CI fails due to unrelated env vars (Pabbly webhook), either set the env var in CI or skip those tests in CI using a focused test command.


Contact
- If you want, I can create the GitHub Actions workflow and add an e2e script to hit the live staging widget automatically. Let me know which you prefer.