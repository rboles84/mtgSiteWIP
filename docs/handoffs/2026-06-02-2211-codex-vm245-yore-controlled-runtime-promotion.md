# 2026-06-02 22:11 - Codex - VM-245 Yore Controlled Runtime Promotion

## Agent Name

Codex

## Task Requested

Implement VM-245 as a controlled runtime promotion for exactly one new live key, `YORE`, after VM-244 approval.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-245-yore-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-244-yore-review-gate.md`
- `docs/handoffs/2026-06-02-2049-codex-vm244-yore-review-gate.md`
- `data/raw-factions/yore/`
- `docs/research/yore/`
- `docs/architecture/colors/yore/`

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-02-2049-codex-vm244-yore-review-gate.md`
- `docs/handoffs/2026-06-02-1824-codex-vm245-yore-promotion-stop-gate.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-244-yore-review-gate.md`
- `docs/kanban/backlog/VM-245-yore-controlled-runtime-promotion.md`
- `data/raw-factions/yore/*.json`
- `data/identity-layers.json`
- `research/build-faction-artifacts.mjs`
- `research/build-archscry-flavor-snippets.mjs`
- `assets/js/identity-layers.js`
- `assets/js/index.js`
- `assets/js/commander-dossier.js`
- `assets/js/archscry-presentation.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`

## Files Changed

- `data/identity-layers.json`
- `research/build-faction-artifacts.mjs`
- `research/build-archscry-flavor-snippets.mjs`
- `assets/js/identity-layers.js`
- `assets/js/index.js`
- `assets/js/commander-dossier.js`
- `assets/js/archscry-presentation.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `data/factions.json`
- `data/placement-model.json`
- `data/archscry-flavor-snippets.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-245-yore-controlled-runtime-promotion.md`
- `docs/handoffs/2026-06-02-2211-codex-vm245-yore-controlled-runtime-promotion.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Promoted exactly one live/public key: `YORE`.
- Added `YORE` to the identity layer with `kind: "four_color"`, colors `["W", "U", "B", "R"]`, `core_color: "WUBR"`, `display_code: "YORE"`, canonical-only alias `["YORE"]`, placement eligibility enabled, and preview eligibility disabled.
- Added aggregate-core handling so generated layered identity preserves `core_color: "WUBR"` while pips/rendering derive from the four-color `colors` array and generated `secondary_color` remains `null`.
- Added live-safe Yore placement priors, collision targets, question support, mana-base metadata, and generated public copy.
- Suppressed Yore external Commander directory links to avoid inventing `/wubr/`, `/yore/`, permutation, or color-code route surfaces.
- Rebuilt generated faction, placement, flavor, and Supabase context outputs through approved scripts.
- Extended quick-reading and dossier follow-up tests for Yore live shape, forbidden aliases/keys, Home preview exclusion, aggregate core handling, snippet count, public copy boundaries, and directory-link suppression.
- Moved VM-245 from In Progress to Done and updated the board.

## Why It Changed

VM-244 approved future controlled promotion planning with verdict `review-approved-for-future-promotion-planning`, placement policy `approved_for_controlled_live_promotion_only`, and `core_color: "WUBR"` as a technical aggregate only. VM-245 executed that approval while keeping raw Yore data byte-stable and preserving WUBR/permutations as metadata-query-only.

## VM-244 Approval Details

- Approval file: `docs/kanban/done/VM-244-yore-review-gate.md`
- Approval handoff: `docs/handoffs/2026-06-02-2049-codex-vm244-yore-review-gate.md`
- Verdict string: `review-approved-for-future-promotion-planning`
- Placement policy: `approved_for_controlled_live_promotion_only`
- Core color policy: `technical_aggregate_wubr_only`
- Approved core color value: `WUBR`

## Raw Hash Comparison Result

Result: exact match to VM-244 before/after raw hash table before editing and at closeout.

- `yore.changelog.json`: `7692CB7277ED1FAEEA6DCB7F2133C6D4F075217B45E98953DA7F9C314DCCF205`
- `yore.claims.json`: `CDC433F32D8C737732CF58B97CC0DB55A120BD40E8134FD7D843ECF83F73ABFF`
- `yore.placement.json`: `620A3397A7E9AF645757E9C2794F1C01B415610A923B9C4D97F71624410EC3A4`
- `yore.profile.json`: `5BA00C9A9BE2DC38245ACE721BAA8B6BC4F396DA249683F21AF7F6005E4B924D`
- `yore.sources.json`: `EB9D13C155875322C9BF201E84A67F163D8763582CAF48EE4A646AC4870B5C82`

## Baseline Counts

- Baseline before: identity 30, factions 30, placement 30, Archscry flavor snippets 30, Home preview 20.
- Baseline after: identity 31, factions 31, placement 31, Archscry flavor snippets 31, Home preview 20.

## Generated Files Rebuilt

- `data/factions.json`
- `data/placement-model.json`
- `data/archscry-flavor-snippets.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `data/placement-model.schema.json` was written by `npm.cmd run build:factions` but has no final content diff.

## Route And Core Color Decisions Applied

- `core_color: "WUBR"` is technical aggregate only.
- `WUBR` is not an expression key, faction key, placement key, public alias, route alias, Maze key, Home preview key, fixture key, or human-facing official label.
- Generated Yore layered identity uses `secondary_color: null` to avoid implying an arbitrary single-color center.
- Pips/rendering use `colors: ["W", "U", "B", "R"]`.
- `routing.color_identity: "WUBR"` remains technical/query metadata.
- `routing.label: "Yore"` is the human-facing label.
- External Commander directory links are intentionally suppressed for Yore because no safe approved public directory slug was established.

## Decisions Made

- Used the existing aliases convention but limited Yore to `["YORE"]`.
- Added a targeted flavor-search-term hook so Yore can resolve official card flavor snippets without hand-picking generated output.
- Sanitized Yore live placement output so VM-243 raw review language remains in raw data but does not leak into the promoted live placement model.
- Kept Yore outside the identity-hero image rollout because no `assets/img/identity-hero/yore.webp` asset exists and VM-245 was not an art-asset card.

## Risks / Uncertainties

- This is the first live four-color expression, so future UI surfaces that assume a one-letter `core_color` should continue to be watched.
- Yore has no Commander directory links by design until a separate card approves safe public slugs.
- `data/raw-factions/yore/` remains untracked in the current dirty worktree, but hashes match VM-244 exactly.
- The worktree contains unrelated Glint/Dune/Ink/Witch/Yore docs and other dirty files that were not cleaned or reverted.

## Tests Run

- `npm.cmd run build:factions`
- `node research\build-archscry-flavor-snippets.mjs`
- `npm.cmd run test:placement`
- `npm.cmd run test:presentation-snapshots`
- `npm.cmd test`
- `npm.cmd run audit:factions`
- `node --check research\build-faction-artifacts.mjs`
- `node --check research\build-archscry-flavor-snippets.mjs`
- `node --check assets\js\identity-layers.js`
- `node --check assets\js\index.js`
- `node --check assets\js\commander-dossier.js`
- `node --check assets\js\archscry-presentation.js`
- `node --check assets\js\quick-reading-tests.js`
- `node --check research\archscry-dossier-followup-tests.js`
- Focused baseline-count, raw-hash, forbidden-key, forbidden-alias, Home preview, YORE overclaim, and `git diff --check` scans.

## Not Touched

- `data/raw-factions/yore/**` content
- `docs/research/yore/**`
- `docs/architecture/colors/yore/**`
- Schemas by manual edit
- Home preview membership
- Maze runtime/files
- Route CSS/JS aliases
- Supabase source by hand edit
- Glint, Dune, Ink, Witch docs/materials
- Unrelated dirty worktree files, including existing documentation and image changes

## Follow-Up Recommendations

- If Yore should receive a hero background, create a separate art/asset card for `assets/img/identity-hero/yore.webp` and associated tests.
- If safe public Commander directory slugs are later approved, add them in a separate card with explicit `/wubr/` and `/yore/` route-alias guardrails.
- Continue using Yore as the first-four-color precedent for future Glint/Dune/Ink/Witch promotion planning, especially aggregate `core_color` handling and directory-link suppression.

## Next Suggested Agent

Planning Architect or JSON Cartographer for the next four-color lane review/promotion card.
