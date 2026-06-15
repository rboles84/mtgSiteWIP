# 2026-06-14 18:32 - Codex - VM-394 Pre-Push Exposure And Gitignore Audit

## Agent Name

Codex

## Task Requested

Audit `.gitignore` and the repo contents before push so the release bundle does not expose secrets, credentials, local machine state, generated artifacts, or accidental prototype/runtime surfaces.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-393-final-release-hygiene-main-promotion-readiness.md`
- `.gitignore`
- `assets/js/shared.js`
- `supabase/functions/guild-recruiter/index.ts`
- `docs/architecture/supabase-frontend-security-review.md`
- `docs/audits/2026-06-12-vm365-full-test-sweep.html`
- `docs/audits/lighthouse-home.html`
- `docs/audits/lighthouse-newindex2.html`
- `docs/research/vox-mana-decomposition-in-screen.html`
- `docs/research/vox-mana-decomposition-insight.html`

## Files Changed

- `.gitignore`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-394-pre-push-exposure-and-gitignore-audit.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-14-1832-codex-vm394-pre-push-exposure-gitignore-audit.md`

## What Changed

- Expanded `.gitignore` to exclude local Claude state, local Codex runtime state, environment files, private key material, platform clutter, and Supabase CLI/runtime state.
- Created and closed VM-394 with the scan evidence, remaining exposure classes, and pre-push verdict.
- Updated the Kanban board and handoff index.

## Why It Changed

The release train was nearing push/main promotion, and the user requested a dedicated pass over ignore rules and repository exposure before publishing. The audit needed to separate true credential leakage from public-by-design runtime config, local-path privacy leakage, and archive/IP exposure.

## Decisions Made

- No runtime, placement, Maze, generated-data, visual-baseline, source-lore, or Commander-fact changes were made.
- No stage, commit, push, tag, merge, baseline refresh, or main promotion was performed.
- The existing Supabase browser URL and anon key in `assets/js/shared.js` were not removed during VM-394 because prior VM-155 review classified them as expected public browser config. They remain a release gate requiring live RLS and Edge Function policy acceptance.
- Historical local paths and tracked research archives were documented rather than broadly scrubbed, because that would be a large docs/archive policy change outside a narrow `.gitignore` hardening pass.

## Risks / Uncertainties

- `assets/js/shared.js` publicly exposes the intended Supabase browser URL and JWT-shaped anon key. This is not a service-role secret based on repo evidence, but safety depends on live RLS, table policy, and Edge Function deployment settings.
- Tracked files contain 593 local-path matches and 104 localhost/local URL matches, mostly in historical docs, architecture docs, and audit reports.
- `docs/audits/2026-06-12-vm365-full-test-sweep.html` contains 41 local path references; `docs/audits/lighthouse-newindex2.html` contains 1; `docs/audits/lighthouse-home.html` contains 0.
- `.gitignore` ignores new `docs/research/canon/` and `docs/research/ui_research/` files, but already tracked files in those folders will still push. Current tracked archive footprint includes `docs/research/canon` (245 files, 59,332,201 bytes), `docs/research/mono_upgrade` (24 files, 52,554,441 bytes), and `docs/research/ui_research` (40 files, 5,813,378 bytes).
- `git check-ignore -v` reported the existing local warning about inaccessible `C:\Users\obake/.config/git/ignore`; repo-local ignore checks still returned the expected matches.

## Tests Run

- `git status --short --ignored`
- `git ls-files -o --exclude-standard`
- `git ls-files -i -o --exclude-standard`
- `git grep` keyword and high-risk token scans across tracked files
- `git ls-files` filename scan for `.env`, private key, and local agent-state patterns
- `git check-ignore -v .claude/settings.local.json .env .env.local test.pem id_rsa .codex/sessions/x supabase/.temp/x data/scryfall/raw/oracle-cards.json docs/research/ui_research/prototype.html`
- `Select-String` scan of the two decomposition prototypes for local paths, localhost/file URLs, Supabase/Anthropic references, and obvious secret keywords

## Not Touched

- Runtime code, except for reviewing `assets/js/shared.js`
- Placement model behavior
- Maze behavior
- Generated data
- Visual baselines
- Source lore or Commander facts
- Branch merge/promotion state

## Follow-Up Recommendations

- Before a public push, explicitly accept or scrub the tracked local-path references in docs/audit reports.
- Before a public push, decide whether tracked `docs/research/` archives and large PDFs/RTFs should be part of the public repository, moved to a private archive, or scrubbed from the publish branch.
- Before exposing the live Supabase project publicly, verify RLS, profile table policy, and `guild-recruiter` Edge Function auth settings in the deployed project.
- If zero privacy exposure is required, create a dedicated docs/archive scrub card rather than folding that broad change into release staging.

## Next Suggested Agent

Release Manager / Security Reviewer

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-394-pre-push-exposure-and-gitignore-audit.md`
- `docs/architecture/supabase-frontend-security-review.md`
- `docs/kanban/done/VM-393-final-release-hygiene-main-promotion-readiness.md`
