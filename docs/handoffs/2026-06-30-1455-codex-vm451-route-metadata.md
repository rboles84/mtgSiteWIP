# Codex Handoff - VM-451 Route Metadata And Social Preview Pass

## Agent Name

Codex

## Task Requested

Continue the VM-429 Sections 11/12/14 readiness queue by adding route metadata, canonical URLs, Open Graph/Twitter social preview tags, and deterministic validation with product-boundary-safe copy.

## Files Reviewed

- `C:\Users\obake\.codex\attachments\8f9dd8ab-db18-4428-90e7-26d3911a5407\pasted-text-1.txt`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-06-30-1444-codex-vm450-visual-waivers.md`
- `docs/audits/2026-06-29-vox-mana-deep-audit.md`
- `docs/audits/2026-06-29-vox-mana-self-snapshot.md`
- `CNAME`
- Public route heads:
  - `index.html`
  - `archscry/index.html`
  - `maze/index.html`
  - `strategium/index.html`
  - `apocrypha/index.html`
  - `library/index.html`
  - `privacy/index.html`
  - `terms/index.html`
- `package.json`
- `scripts/validate-frontend-html.mjs`
- `scripts/check-copy-boundaries.mjs`
- `assets/img/` share-safe image inventory

## Files Changed

- `index.html`
- `archscry/index.html`
- `maze/index.html`
- `strategium/index.html`
- `apocrypha/index.html`
- `library/index.html`
- `privacy/index.html`
- `terms/index.html`
- `package.json`
- `scripts/check-route-metadata.mjs`
- `docs/qa/vox-mana-test-plan.md`
- `docs/kanban/done/VM-451-route-metadata-social-preview-pass.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-30-1455-codex-vm451-route-metadata.md`

## What Changed

- Added route-specific meta descriptions for Home, Archscry, Maze, Strategium, Apocrypha, Library alias, Privacy, and Terms.
- Added absolute canonical URLs using the custom domain `https://voxmana.io/`.
- Added Open Graph site name, type, title, description, URL, image, and image alt metadata.
- Added Twitter summary-large-image card metadata.
- Kept `/library/` as `noindex` and canonicalized it to `https://voxmana.io/apocrypha/`.
- Replaced the legal route title dash with ASCII hyphenated titles.
- Added `scripts/check-route-metadata.mjs` plus `npm.cmd run test:route-metadata`.
- Updated the QA plan's script table and the VM-451 Kanban trail.

## Why It Changed

VM-428 and VM-429 found that route heads lacked consistent descriptions, canonical URLs, and social-preview metadata. VM-451 makes public sharing and external review clearer while reinforcing the product boundary: identity compass, dossier, source library, Commander learning, and search support rather than deckbuilding, legality checking, recommendation, or official authority.

## Decisions Made

- Used the existing `assets/img/vox-mana-hero-1280w.jpg` as the shared social image to avoid new asset generation or visual scope.
- Used absolute canonical/social URLs because `CNAME` confirms `voxmana.io` as the custom domain.
- Kept metadata route-specific but concise; social copy uses product-boundary wording and avoids anti-fit phrases.
- Added deterministic validation because metadata is now a release-readiness surface.
- Did not alter visible layout, route behavior, local storage, placement logic, Supabase behavior, visual baselines, or generated data.

## Risks / Uncertainties

- Live crawler previews and deployed cache behavior were not verified from the internet.
- A dedicated branded social image could be better later, but the existing hero image is valid and share-safe.
- VM-450 visual waivers remain unresolved for polished-release proof.
- VM-446 live RLS proof remains blocked on credentials.

## Tests Run

- `npm.cmd run test:route-metadata` - passed for 8 public route heads.
- `node --check scripts\check-route-metadata.mjs` - passed.
- `npm.cmd run lint:html` - passed.
- `npm.cmd run test:copy-boundaries` - passed.
- `npm.cmd run test:frontend-smoke` - passed.
- `npm.cmd run lint:js` - passed.
- `Select-String -Path index.html,archscry\index.html,maze\index.html,strategium\index.html,apocrypha\index.html,library\index.html,privacy\index.html,terms\index.html -Pattern "<meta|og:|twitter:|canonical"` - confirmed metadata surface.
- `git diff --check` - passed with LF-to-CRLF warnings only.

## Not Touched

- Runtime layout and user-visible body copy.
- Route navigation behavior.
- Placement/source/generated data.
- Maze search/Reading Finds behavior.
- Supabase/RLS/account behavior.
- Visual baselines.
- Lighthouse.
- Git staging, commit, push, tag, branch, or deployment.

## Follow-Up Recommendations

- Run live social preview checks after deployment, especially if crawler cache behavior matters.
- Consider a future branded OG image if a stronger public demo/case-study package needs it.
- Continue to the public demo and strategic case-study ticket once route metadata is accepted.

## Next Suggested Agent

Product/strategy documentation steward for the public demo and case-study package.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-451-route-metadata-social-preview-pass.md`
- `docs/qa/vox-mana-test-plan.md`
- `docs/audits/2026-06-29-vox-mana-self-snapshot.md`
- `docs/audits/2026-06-29-vox-mana-deep-audit.md`
- `docs/handoffs/2026-06-30-1444-codex-vm450-visual-waivers.md`
