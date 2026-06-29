# 2026-06-27 23:21 - Codex - VM-423 Feedback Composer

## Agent Name

Codex

## Task Requested

Implement VM-423 Feedback Composer + Static Email Processor after confirming the VM number, preserving existing Archscry `.vm-utility` auth/session controls, adding a shared topbar-right Feedback popup, routing v1 live send through Web3Forms only when configured, keeping copy fallback always available, adding no Supabase feedback write path, and updating Kanban, Privacy, manual QA, and handoff docs.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- Recent VM-422 and VM-424 handoffs under `docs/handoffs/`
- `docs/kanban/board.md`
- `docs/kanban/blocked/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/kanban/done/VM-424-homepage-first-visit-positioning.md`
- `assets/js/vm-topbar.js`
- `assets/css/topbar.css`
- `index.html`
- `archscry/index.html`
- `maze/index.html`
- `apocrypha/index.html`
- `strategium/index.html`
- `privacy/index.html`
- `terms/index.html`
- `library/index.html`
- `docs/reference/manual-test-cases.md`
- `package.json`

## Files Changed

- `assets/js/vm-feedback.js`
- `assets/js/vm-topbar.js`
- `assets/css/topbar.css`
- `index.html`
- `archscry/index.html`
- `maze/index.html`
- `apocrypha/index.html`
- `strategium/index.html`
- `privacy/index.html`
- `terms/index.html`
- `library/index.html`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-423-feedback-composer-static-email-processor.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-27-2321-codex-vm423-feedback-composer.md`
- Removed `docs/kanban/in-progress/VM-423-feedback-composer-static-email-processor.md` by moving the card to Done.

## What Changed

- Added a shared feedback helper that injects a `Feedback` button into `.vm-utility` before the existing menu trigger without replacing or reordering Archscry auth/session controls.
- Added a modal with page context, optional reply email, required feedback textarea, Copy, optional Send, focus trap, Escape close, outside-click close, and focus return.
- Post-review simplification removed the Preview step, reduced visible context to Page and Timestamp, kept rich context invisible in the copied/submitted payload, and clarified optional email as reply-only.
- Captured page label, path, hash, visible section/id/link, simplified browser/device, viewport, timestamp, feedback text, and optional reply email.
- Added copy-to-clipboard with selectable plain-text fallback when Clipboard API access is unavailable or denied.
- Added optional Web3Forms JSON submit path with controlled `subject`/`from_name`, no recipient email in client payload, blank-key Send hiding, cooldown, in-flight state, timeout, provider error handling, and hCaptcha render/reset hooks when configured.
- Replaced the existing topbar menu clone clear from `innerHTML = ""` to DOM node removal.
- Added shared topbar/modal styles and mobile `90dvh` scrolling behavior.
- Added `vm-feedback.js` before `vm-topbar.js` on Home, Archscry, Maze, Apocrypha, Strategium, Privacy, Terms, and Library alias.
- Added the shared topbar shell to the Library alias route.
- Updated Privacy copy and VM-423 manual QA.
- Moved the VM-423 Kanban card to Done and indexed this handoff.

## Why It Changed

The feature gives end users a low-friction way to report page-specific feedback with enough page and section context for the owner to act on it, while keeping v1 static-site friendly. Web3Forms avoids adding a Vox Mana feedback database write surface; copy fallback keeps the feature useful even before the provider key is configured or when the provider fails.

## Decisions Made

- Selected `VM-423` after the collision scan confirmed `VM-422` is occupied and `VM-424` had reserved/skipped VM-423 for this feedback work.
- Kept the Web3Forms access key blank by default and treated it as a public client identifier.
- Did not add Supabase feedback schema, RLS, migrations, client writes, or SQL paths.
- Used DOM text/value rendering only for user-controlled content and provider/status messages.
- Preserved Archscry `.vm-utility` controls by inserting Feedback before the menu trigger only.
- Kept outbound payload fields plain text/provider-safe and avoided HTML or rendered Markdown submissions.
- Added explicit hCaptcha support hooks but did not show captcha UI unless live send and site key are configured.

## Risks / Uncertainties

- Live Web3Forms send was not exercised because the repo intentionally has no access key. After provider setup, manually test successful delivery, rate limiting, provider errors, malformed responses, network failure, and hCaptcha rendering.
- The Library alias still redirects to Apocrypha; the topbar/feedback shell exists for direct shell rendering, but ordinary users will usually land on Apocrypha quickly.
- `npm.cmd test` writes the live Gate bias report as part of its normal behavior; those audit files were already dirty before VM-423.
- The worktree contained unrelated VM-420/421/422/424 dirty files before this task and still does.

## Tests Run

- PASS `node --check assets/js/vm-topbar.js`
- PASS `node --check assets/js/vm-feedback.js`
- PASS `npm.cmd run lint:html`
- PASS `npm.cmd run lint:js`
- PASS `npm.cmd test`
- PASS `npm.cmd run test:frontend-smoke`
- PASS `rg "innerHTML" assets/js/vm-feedback.js assets/js/vm-topbar.js` returned no matches.
- PASS scoped no-Supabase-feedback write-surface scan returned no matches.
- PASS scoped `git diff --check` for VM-423 touched files, with Git line-ending warnings only.

## Not Touched

- VM-422 SQL, deck-link service, Community Deck Ledger, live RLS harness, or blocked status.
- Supabase schema, migrations, RLS, or feedback storage.
- Placement/source/generated JSON.
- Maze parser/search/stash behavior.
- Archscry scoring or placement result generation.
- Home VM-424 content except shared feedback script loading.
- Unrelated VM-420/421 dirty docs, unrelated docs/research deletions, and other pre-existing dirty files.

## Follow-Up Recommendations

- Web3Forms provider routing and the public access key were completed in the 2026-06-28 VM-423 UX/live-routing pass; see `docs/handoffs/2026-06-28-0930-codex-vm423-feedback-ux-simplification.md`.
- If hCaptcha is enabled in Web3Forms, load the hCaptcha script and provide `hcaptchaEnabled: true` plus `hcaptchaSiteKey`, then manually verify the dynamic modal render path.
- Run a manual browser pass for keyboard focus, mobile scrolling, clipboard denial, and live provider failures whenever hCaptcha or provider settings change.

## Next Suggested Agent

Test Strategist for live-provider QA after Web3Forms access key and hCaptcha settings are configured. Otherwise no immediate follow-up agent is required.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-423-feedback-composer-static-email-processor.md`
- `docs/reference/manual-test-cases.md`
- `privacy/index.html`
- `VM-422` Account Deck Links And Community Deck Ledger
- `VM-424` Homepage First-Visit Positioning
- `docs/handoffs/2026-06-28-0930-codex-vm423-feedback-ux-simplification.md`
- External vault `10-learnings/feedback-composer-email-routing-lessons.md`
