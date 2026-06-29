# VM-423 - Feedback Composer And Static Email Processor

ID: VM-423
Title: Feedback Composer And Static Email Processor
Status: Done
Type: Frontend / Feedback / Static Email
Area: Shared Topbar, Public Routes, Privacy
Priority: High
Created: 2026-06-28
Completed: 2026-06-28

## Summary

Added a shared feedback popup to the right side of the Vox Mana topbar. V1 keeps the visible form compact, sends through Web3Forms with the configured public access key, and preserves plain-text copy as a fallback.

No Supabase feedback table, migration, RLS policy, client write, or SQL path was added. User input remains untrusted and is rendered through DOM text/value APIs only.

## Pre-Flight Carry-Forward

- `VM-422` is already occupied by Account Deck Links and Community Deck Ledger and is blocked on live Supabase proof.
- `VM-424` intentionally treated `VM-423` as reserved for this feedback composer/static email processor work.
- `VM-112A` and `VM-113` established the shared floating topbar and explicit `index.html` route-link pattern.
- `VM-106` requires text-safe rendering, delegated actions, accessible modal behavior, and focused frontend validation.
- The worktree already contained unrelated VM-420, VM-421, VM-422, and VM-424 dirty files. Those were preserved and not normalized under VM-423.

## What Changed

- Added `assets/js/vm-feedback.js` for feedback button injection, modal creation, page-context capture, validation, direct copy fallback, optional Web3Forms submit, hCaptcha hooks, cooldown, and accessibility behavior.
- Updated `assets/js/vm-topbar.js` to initialize the feedback helper and replaced the existing menu-nav `innerHTML` clear with DOM node removal.
- Added shared feedback button and modal styles to `assets/css/topbar.css`.
- Loaded `vm-feedback.js` before `vm-topbar.js` on Home, Archscry, Maze, Apocrypha, Strategium, Privacy, Terms, and Library alias.
- Added the shared topbar shell to the Library alias so the feedback affordance exists if the redirect shell is viewed directly.
- Updated Privacy copy for feedback text, optional reply email, page/path/hash/visible section, simplified browser/device, viewport, timestamp, Web3Forms delivery to the Vox Mana feedback inbox, hCaptcha when enabled, and provider retention caveats.
- Added VM-423 manual QA coverage to `docs/reference/manual-test-cases.md`.
- Post-review simplification removed the Preview step, reduced visible page context to Page and Timestamp, kept path/hash/section/browser/viewport/ISO timestamp invisible in the copied/submitted payload, and clarified optional email as reply-only.
- Post-review tightening shortened the textarea, compressed modal spacing, added a lightweight CSS glow to the desktop action row, and kept `Send` visible with an unconfigured-state message if the Web3Forms key is blank.
- Follow-up polish replaced the traveling diamond with a low-cost desktop action-row line shimmer inspired by the Home color-axis connector, while preserving a static reduced-motion fallback.
- Live-send wiring added the Web3Forms public access key for the Vox Mana feedback form and switched the provider request body to `FormData`, matching the Web3Forms browser example.
- Owner live QA completed the full delivery chain: Vox Mana feedback modal to Web3Forms to provider-side `feedback@voxmana.io` recipient to Porkbun forwarding to the Gmail `Vox Mana / Feedback` label.
- The final learning was added to the external Vox Mana learnings vault as `10-learnings/feedback-composer-email-routing-lessons.md`.

## Security And Storage Decisions

- Web3Forms `access_key` is treated as a public client identifier, not a secret.
- The default Web3Forms access key is configured for the Vox Mana feedback form, so `Send` attempts live delivery while `Copy` remains available.
- The client payload does not include any recipient email address.
- The Web3Forms form settings, not the browser payload, own the recipient list. The configured provider recipient is `feedback@voxmana.io`.
- Submitted payload fields are plain text or provider-safe structured fields only.
- Optional reply email is trimmed, capped at 254 characters, rejects CR/LF, and is sent only as the provider reply-to/email field when valid.
- hCaptcha UI is shown only when live send is enabled and a site key is configured; the helper explicitly renders or refreshes the widget in the dynamic modal.
- Clipboard denial or unavailable Clipboard API exposes a selectable plain-text fallback block for manual copy.

## Live Routing Learning And Traceability

- The useful storage pattern for v1 is static email routing, not a Vox Mana database: `Vox Mana UI -> Web3Forms -> feedback@voxmana.io -> Porkbun forwarding -> Gmail label`.
- `Copy` is fallback and recovery. `Send` is the intended path now that the Web3Forms key and provider recipient are configured.
- The Gmail filter should be broad enough to catch forwarded domain mail, centered on `to:(feedback@voxmana.io)` rather than only a narrow subject line.
- Provider-side routing must be tested separately from direct domain forwarding: a direct email to `feedback@voxmana.io` proves Porkbun/Gmail, while the Vox Mana UI proves Web3Forms plus the app payload.
- Local testing can produce `localhost` section links in feedback mail. Production testing should confirm the same field uses the deployed `voxmana.io` URL.
- hCaptcha remains a future hardening option; it is intentionally not shown until the Web3Forms dashboard and client config both enable it.

## Acceptance Criteria

- [x] Feedback button appears in the right topbar utility area on every public route and coexists with Archscry auth controls.
- [x] Modal captures page context, optional reply email, and required feedback text.
- [x] Status messages and manual copy fallback use DOM/text APIs only.
- [x] Copy works in supported browsers, with selectable fallback text when Clipboard API is unavailable or denied.
- [x] Configured Web3Forms key enables live send while keeping `Copy` available as fallback.
- [x] Live-send path handles success, `success:false`, `400`, `429`, `500`, malformed JSON, timeout, blocked request, and network failure in code, with copy fallback preserved.
- [x] No Supabase feedback storage or write path is introduced.
- [x] Privacy copy matches the actual fields sent.

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

## Post-Review UX Simplification Tests

- PASS `node --check assets/js/vm-feedback.js`
- PASS `node --check assets/js/vm-topbar.js`
- PASS `npm.cmd run lint:js`
- PASS `npm.cmd run lint:html`
- PASS `npm.cmd run test:frontend-smoke`
- PASS `rg "innerHTML" assets/js/vm-feedback.js assets/js/vm-topbar.js` returned no matches.
- PASS scoped no-Supabase-feedback write-surface scan returned no matches.
- PASS scoped `git diff --check` for VM-423 polish files, with Git line-ending warnings only.

## Post-Review Tightening Tests

- PASS `node --check assets/js/vm-feedback.js`
- PASS `node --check assets/js/vm-topbar.js`
- PASS `npm.cmd run lint:js`
- PASS `npm.cmd run lint:html`
- PASS `npm.cmd run test:frontend-smoke`
- PASS `rg "innerHTML" assets/js/vm-feedback.js assets/js/vm-topbar.js` returned no matches.
- PASS runtime no-Supabase-feedback scan found no storage or SQL path; the only broad `insert` match was DOM `insertBefore` for button placement.
- PASS scoped `git diff --check` for VM-423 tightening files, with Git line-ending warnings only.

## Shimmer Sigil Polish Tests

- PASS `node --check assets/js/vm-feedback.js`
- PASS `node --check assets/js/vm-topbar.js`
- PASS `npm.cmd run lint:js`
- PASS `npm.cmd run lint:html`
- PASS `npm.cmd run test:frontend-smoke`
- PASS `rg "innerHTML" assets/js/vm-feedback.js assets/js/vm-topbar.js` returned no matches.
- PASS scoped `git diff --check` for VM-423 shimmer-sigil files, with Git line-ending warnings only.

## Live Key Wiring Tests

- PASS `node --check assets/js/vm-feedback.js`
- PASS `node --check assets/js/vm-topbar.js`
- PASS `npm.cmd run lint:js`
- PASS `npm.cmd run lint:html`
- PASS `npm.cmd run test:frontend-smoke`
- PASS `rg "innerHTML" assets/js/vm-feedback.js assets/js/vm-topbar.js` returned no matches.
- PASS scoped no-Supabase-feedback write-surface scan returned no runtime storage or SQL path.
- PASS scoped `git diff --check` for VM-423 live-key files, with Git line-ending warnings only.

## Owner Live Routing QA

- PASS Web3Forms dashboard counted feedback submissions from the Vox Mana feedback modal.
- PASS Web3Forms recipient settings were corrected to route to `feedback@voxmana.io`.
- PASS Porkbun email forwarding for `feedback@voxmana.io` delivered to the Gmail account that owns the `Vox Mana / Feedback` label.
- PASS Gmail filter was corrected to match `to:(feedback@voxmana.io)`, so forwarded feedback lands under `Vox Mana / Feedback`.
- PASS Vox Mana UI reported `Feedback sent. Thank you.` and the delivered message included page, path, visible section/link, browser/device, viewport, timestamp, and feedback text.

## Not Run / Deferred

- Provider failure paths remain code-verified rather than exhaustively forced against the live provider. hCaptcha remains disabled until a site key is configured and enabled in the Web3Forms dashboard.
- Production-domain QA should confirm section links use `https://voxmana.io/...` rather than local `localhost` URLs after deployment.

## Not Touched

- VM-422 SQL, deck-link service, Community Deck Ledger, live RLS harness, and blocked status.
- Supabase schema or feedback storage.
- Placement/source/generated JSON.
- Maze parser/search/stash logic.
- Archscry scoring and placement result generation.
- Home VM-424 positioning content except shared feedback script loading.
- Unrelated VM-420/VM-421 dirty-tree files and docs/research deletions.

## Related Work

- `VM-106` - Frontend Hardening Phase 1 Security Accessibility
- `VM-112A` - Floating Topbar Redesign
- `VM-113` - Topbar Sigil, Local Route, and Archscry Quick Flow Repair
- `VM-155` - Targeted Supabase Frontend Security Review
- `VM-422` - Account Deck Links And Community Deck Ledger
- `VM-424` - Homepage First-Visit Positioning
