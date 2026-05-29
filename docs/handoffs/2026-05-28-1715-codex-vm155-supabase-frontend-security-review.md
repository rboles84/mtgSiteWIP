# 2026-05-28 17:15 - Codex - VM-155 Supabase Frontend Security Review

## Agent name

Codex

## Task requested

Implement the approved targeted Supabase frontend security review as a code-only, non-mutating documentation task: inspect the checked-in browser Supabase surface and archived `guild-recruiter` Edge Function, produce a line-anchored findings report, update the Kanban/docs trail, and avoid any runtime code or product-behavior changes.

## Files reviewed

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
- `archscry/index.html`
- `maze/index.html`
- `assets/js/shared.js`
- `assets/js/index.js`
- `assets/js/site-flags.js`
- `research/research-init.js`
- `supabase/functions/guild-recruiter/index.ts`

## Files changed

- `docs/architecture/supabase-frontend-security-review.md`
- `docs/reference/README.md`
- `docs/reference/spec-index.md`
- `docs/kanban/done/VM-155-targeted-supabase-frontend-security-review.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-28-1715-codex-vm155-supabase-frontend-security-review.md`

## What changed

- Added `docs/architecture/supabase-frontend-security-review.md` as the main deliverable for the code-only review.
- Wrote a findings table that separates:
  - expected public browser surface
  - backend-policy-dependent risk
  - one confirmed code-level issue
  - repo-only validation gaps
- Recorded that the checked-in Supabase key strongly appears to be an anon/browser key from naming, browser usage, and decoded payload contents, while explicitly avoiding claims about live project-side key validity.
- Confirmed `assets/js/index.js` stays limited to save/resume and archived interview flows, with no hidden admin behavior found in the reviewed call sites.
- Confirmed `research/research-init.js` is Maze UI/search code only and does not act as a Supabase config source in the current tree.
- Flagged the `guild-recruiter` rate-limit weakness where caller-controlled `session_id` outranks IP in the throttle key.
- Flagged the missing checked-in `docs/supabase-profile-update.sql` reference as a schema/policy traceability gap rather than proof that RLS is absent.
- Added minimal docs-index links so the new review can be found from the technical atlas.
- Added a done card, board entry, handoff index entry, and this handoff file.

## Why it changed

The user asked for the previously planned targeted Supabase security review to be fully implemented as a repository artifact. Vox Mana already had related Supabase dependency and hardening history, but it lacked one focused document that distinguishes public-by-design frontend exposure from risks that depend on backend RLS and live Edge Function deployment settings.

## Decisions made

- Kept the task documentation-only and did not edit any runtime code, feature flags, auth flow, or Edge Function logic.
- Did not rotate, redact, move, or otherwise alter the checked-in browser key because this review was meant to evaluate it, not "fix" it blindly.
- Treated feature flags as UI reachability controls, not security boundaries.
- Treated the missing SQL file as a traceability/documentation failure, not proof that the live project lacks RLS.
- Promoted the caller-controlled `session_id` throttle-key precedence to a confirmed code-level issue because the weakness is visible directly in checked-in server code.

## Risks / uncertainties

- Repo evidence is still insufficient to confirm live `profiles` RLS policies or the deployed `guild-recruiter` auth configuration.
- The checked-in browser key strongly resembles an anon key, but live key role validity still requires Supabase project-side verification.
- The worktree already contained unrelated modified and untracked files before this review began; this handoff only covers the VM-155 docs/card/index updates listed above.

## Tests run

- Static Supabase surface search across route, frontend, docs, and Edge Function files.
  - Result: confirmed reviewed frontend Supabase usage is limited to `assets/js/shared.js`, `assets/js/index.js`, `profiles` helpers, and `guild-recruiter`.
- Static review of `research/research-init.js`.
  - Result: no Supabase config, keys, direct client calls, or privileged endpoints found.
- Checked-in file scan for `docs/supabase-profile-update.sql`, migrations, and Supabase config artifacts.
  - Result: no tracked SQL/policy source file or Supabase migration/config directory found in the current tree.
- Offline decode of the checked-in JWT payload from `assets/js/shared.js`.
  - Result: payload contains `iss: "supabase"` and `role: "anon"`, which supports anon/browser-key classification without proving live project configuration.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
  - Result: pass; Git reported existing LF-to-CRLF working-copy normalization warnings only.

## Not touched

- `assets/js/shared.js`
- `assets/js/index.js`
- `assets/js/site-flags.js`
- `research/research-init.js`
- `supabase/functions/guild-recruiter/index.ts`
- Route HTML/CSS/JS behavior
- Placement logic, generated artifacts, Maze query behavior, and UI styling
- Any Supabase project-side settings, live policies, or deployed function configuration

## Follow-up recommendations

- Verify live `profiles` RLS policies in Supabase and restore a checked-in canonical SQL/policy artifact.
- If the archived interview path is ever re-enabled, revisit `guild-recruiter` auth assumptions and harden the rate-limit key selection.
- Keep future Supabase behavior additions explicit in the route ownership and technical docs so security scope remains easy to audit.

## Next suggested agent

Security reviewer or Supabase/backend steward for live project validation of RLS and Edge Function deployment settings.

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-155-targeted-supabase-frontend-security-review.md`
- `docs/architecture/supabase-frontend-security-review.md`
- `docs/kanban/done/VM-106-frontend-hardening-phase-1-security-accessibility.md`
- `docs/kanban/done/VM-146-cdn-font-dependency-review.md`
- User-approved targeted Supabase frontend security review plan in this Codex thread
