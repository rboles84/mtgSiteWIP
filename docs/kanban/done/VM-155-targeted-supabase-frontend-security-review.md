# VM-155 - Targeted Supabase Frontend Security Review

ID: VM-155
Title: Targeted Supabase Frontend Security Review
Status: done
Type: Security / Documentation / Review
Area: Supabase, Archscry, Maze, Edge Function
Priority: high
Created: 2026-05-28
Completed: 2026-05-28

## Summary

Review the checked-in Supabase frontend and archived `guild-recruiter` Edge Function surface without mutating runtime code, confirm what is public by design, isolate backend-policy-dependent risks, and record any confirmed code-level security issues with line-anchored evidence.

## Source

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-27-2208-codex-vm146-cdn-font-review.md`
- `docs/handoffs/2026-05-22-2146-codex-vm106-frontend-hardening-phase-1-security-accessibility.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-106-frontend-hardening-phase-1-security-accessibility.md`
- `docs/kanban/done/VM-146-cdn-font-dependency-review.md`
- `docs/reference/README.md`
- `docs/reference/spec-index.md`
- `docs/reference/manual-test-cases.md`
- `docs/reference/move-into-repo.md`
- `docs/reference/method-reference.md`
- `docs/architecture/project-atlas.md`
- `docs/architecture/data-flow-map.md`
- `assets/js/shared.js`
- `assets/js/index.js`
- `assets/js/site-flags.js`
- `research/research-init.js`
- `archscry/index.html`
- `maze/index.html`
- `supabase/functions/guild-recruiter/index.ts`

## Acceptance Criteria

- Review `assets/js/shared.js`, `assets/js/index.js`, `research/research-init.js`, and `supabase/functions/guild-recruiter/index.ts` without changing runtime behavior.
- Deliver a findings table that distinguishes expected public surface from backend-policy-dependent risk, confirmed code-level issues, and repo-only validation gaps.
- Do not rotate keys, change feature flags, refactor auth/session flow, or edit the Edge Function.
- Flag the missing checked-in Supabase SQL/policy source as a traceability blocker if it remains absent.

## Non-Goals

- Do not change frontend or Edge Function code.
- Do not rotate, redact, or move the checked-in browser key.
- Do not assume live Supabase RLS or Edge Function deployment settings from repo code alone.
- Do not redesign route behavior, UI styling, placement logic, or Maze query behavior.

## Implementation Summary

- Added `docs/architecture/supabase-frontend-security-review.md` with a scoped, code-only Supabase security review.
- Recorded a line-anchored findings table covering:
  - browser-visible Supabase bootstrap surfaces
  - browser key classification limits
  - `profiles` table access patterns
  - `index.js` call-site scope
  - `research/research-init.js` non-Supabase scope
  - `guild-recruiter` request gate posture
  - a confirmed code-level throttle weakness
  - the missing checked-in SQL/policy traceability gap
  - server-side Anthropic secret handling
- Confirmed no reviewed file exposed a Supabase service-role key, DB password, JWT signing secret, or third-party API secret in checked-in code.
- Linked the new review from the docs indexes.
- Added this done card, updated the board, and recorded the handoff trail.

## Key Findings

- The checked-in Supabase key strongly appears to be an anon/browser key based on naming, browser usage, and decoded payload contents, but live role validity still requires project-side verification.
- `assets/js/index.js` currently limits Supabase-adjacent behavior to save/resume and archived interview flows; no hidden admin behavior was found there.
- `research/research-init.js` does not contain Supabase config or direct Supabase calls.
- `guild-recruiter` has one confirmed code-level weakness: its throttle key trusts caller-provided `session_id` before IP, which weakens the intended rate limit.
- The biggest repo-only blocker is missing checked-in Supabase schema/policy traceability, not direct proof that RLS is absent.

## Files Changed

- `docs/architecture/supabase-frontend-security-review.md`
- `docs/reference/README.md`
- `docs/reference/spec-index.md`
- `docs/kanban/done/VM-155-targeted-supabase-frontend-security-review.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-28-1715-codex-vm155-supabase-frontend-security-review.md`

## Verification

- Static Supabase surface search across route, frontend, docs, and Edge Function files
  - Result: confirmed reviewed frontend Supabase usage is limited to `assets/js/shared.js`, `assets/js/index.js`, the `profiles` table helpers, and the `guild-recruiter` Edge Function.
- Static review of `research/research-init.js`
  - Result: no Supabase config, keys, direct client calls, or privileged endpoints found.
- Checked-in file scan for `docs/supabase-profile-update.sql`, migrations, and Supabase config artifacts
  - Result: no tracked SQL/policy source file or Supabase migration/config directory was found in the current tree.
- Offline decode of the checked-in JWT payload from `assets/js/shared.js`
  - Result: payload contains `iss: "supabase"` and `role: "anon"`, which supports anon/browser-key classification without proving live project configuration.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
  - Result: pass; Git reported existing LF-to-CRLF working-copy normalization warnings only.

## Human Review

Yes - security interpretation and live-policy follow-up need human judgment.
