# 2026-06-10 22:55 - Codex - VM-328 WITCH Source-Generated Authority Repair

## Agent Name

Codex

## Task Requested

Implement VM-328 to repair active `WITCH` source/generated authority drift so VM-300 validation passes without expanding Witch authority beyond the VM-264 through VM-298 evidence floor.

## Pre-Flight Summary

- Recent related work: VM-264 created the Witch source/evidence floor, VM-267 authored the five-file raw packet, VM-268 approved it for future promotion planning, VM-269 promoted one live `WITCH` key, VM-298 restored Witch to the five-claim source boundary after VM-295 generated-authoring contamination, VM-300 added source/generated guardrails, and VM-325 made generated/runtime output comparison-only.
- Current known risks: the worktree remains broadly dirty with unrelated tracked and untracked runtime, generated, raw, docs, asset, Kanban, and handoff drift. A VM-327 Colorless implementation card/handoff appeared in the worktree during this session and was left untouched.
- Relevant decisions already made: source authority wins over generated output; raw/source packets and approved ledgers are source truth; generated placement, generated Supabase context, and runtime copy are not evidence; `WITCH` remains live/placeable and preview-ineligible; `Growth`, `GWUB`, `WUBG`, and permutations remain bounded.
- Files recently changed by related work: WITCH raw files, four-color raw source-first repairs, generated placement output, source/generated validator docs, Colorless cards/handoffs, and board/index bookkeeping.
- What should not be touched: WUBRG, Colorless, mono colors, public aliases/routes, Home preview, hero assets, Sultai dossier residuals, unrelated generated/context/runtime drift, and WITCH claims/sources.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-264-witch-source-packet-and-evidence-ledger.md`
- `docs/kanban/done/VM-267-witch-non-live-raw-packet.md`
- `docs/kanban/done/VM-268-witch-review-gate.md`
- `docs/kanban/done/VM-269-witch-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-295-witch-placement-data-quality-authoring-pass.md`
- `docs/kanban/done/VM-297-placement-data-source-of-truth-contamination-audit.md`
- `docs/kanban/done/VM-298-witch-public-copy-source-durability-repair.md`
- `docs/kanban/done/VM-300-source-generated-guardrails.md`
- `docs/kanban/done/VM-301-yore-source-first-authoring-pass.md`
- `docs/kanban/done/VM-302-dune-source-first-authoring-pass.md`
- `docs/kanban/done/VM-303-glint-source-first-authoring-pass.md`
- `docs/kanban/done/VM-304-ink-source-first-authoring-pass.md`
- `docs/kanban/done/VM-325-source-bound-gold-standard-rule.md`
- `docs/kanban/done/VM-326-colorless-raw-packet-review-gate.md`
- `docs/research/witch/witch-evidence-ledger.md`
- `docs/architecture/colors/witch/identity.md`
- `docs/architecture/colors/witch/metaphysics.md`
- `data/raw-factions/witch/witch.placement.json`
- `data/raw-factions/witch/witch.profile.json`
- `data/raw-factions/witch/witch.changelog.json`
- `data/raw-factions/witch/witch.claims.json`
- `data/raw-factions/witch/witch.sources.json`
- `data/placement-model.json`
- `research/build-faction-artifacts.mjs`
- `research/validate-source-generated-guardrails.mjs`

## Files Changed

- `data/raw-factions/witch/witch.placement.json`
- `data/raw-factions/witch/witch.profile.json`
- `data/raw-factions/witch/witch.changelog.json`
- `data/placement-model.json`
- `docs/kanban/done/VM-328-witch-source-generated-authority-repair.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-06-10-2255-codex-vm328-witch-authority-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Re-confirmed `VM-328*` was unused before creating the card.
- Created the VM-328 Kanban card with an implementation-local trace table before raw edits.
- Added exact source-backed WITCH generated good-fit strings to raw `good_fit_indicators`.
- Added exact source-backed WITCH generated poor-fit variants while preserving distinct raw-only boundaries such as `Breed Lethality-only identity` and `Nephilim language treated as institutional proof`.
- Added validator-counted raw `inhibitor_traps` for the exact generated biological-prior and avoid/mismatch strings.
- Bumped WITCH raw profile/placement metadata to `0.1.2` and `2026-06-10`.
- Repaired stale WITCH changelog audit fields from non-live/review-gated language to live-after-VM-269 source/generated authority repair.
- Ran `npm.cmd run build:factions`; the post-build placement-model delta from the pre-build snapshot was exactly `WITCH`.

## Why It Changed

VM-300 validation showed active generated WITCH good-fit, poor-fit, and inhibitor language outran raw placement backing. VM-328 source-normalized only the strings traceable to approved WITCH evidence and VM-266 separator guidance so generated output is again subordinate to raw authority.

## Decisions Made

- Used VM-328 because `VM-328*` was unused at card creation time.
- Did not reuse or edit VM-327; a Colorless VM-327 card/handoff appeared later and remained out of scope.
- Treated the generated WITCH strings as acceptable only where traceable to `WITCH-EVID-003`, `WITCH-EVID-005`, `WITCH-EVID-007`, `WITCH-EVID-010`, or VM-266 separator guidance.
- Kept `claim_count: 5`.
- Added no WITCH evidence IDs and no WITCH claim IDs.
- Did not edit `witch.claims.json` or `witch.sources.json`.
- Accepted only WITCH-attributable generated placement output.

## Risks / Uncertainties

- The worktree remains broadly dirty, including unrelated generated/runtime/docs/assets/raw/Kanban/handoff drift.
- `npm.cmd run test:source-generated -- --all` passes but still reports 26 model-owned inhibitor warnings on non-WITCH targets.
- Colorless now appears in generated/source-generated surfaces due to unrelated VM-327 work present in the worktree; VM-328 did not inspect, validate, or modify that lane beyond preserving existing drift.
- `npm test` via the PowerShell `npm.ps1` shim is blocked by local execution policy; `npm.cmd test` is the passing equivalent used for this repo.

## Tests Run

- Expected fail before edits: `npm.cmd run validate:source-generated -- --targets=WITCH`
- Pass: WITCH raw JSON parse for placement/profile/changelog.
- Pass: `npm.cmd run build:factions`
- Pass: `npm.cmd run validate:source-generated -- --targets=WITCH`
- Pass: `npm.cmd run validate:source-generated -- --targets=YORE,DUNE,GLINT,INK,WITCH`
- Pass with 26 existing model-owned warnings and no WITCH warning: `npm.cmd run test:source-generated -- --all`
- Pass: `npm.cmd run test:placement`
- Blocked by local PowerShell execution policy: `npm test`
- Pass: `npm.cmd test`
- Pass: `npm.cmd run test:parser`
- Pass: `node research\archscry-dossier-followup-tests.js`
- Pass: `node research\maze-search-tests.js`
- Pass: final SHA-256 check for `witch.claims.json` and `witch.sources.json`; hashes unchanged:
  - `witch.claims.json`: `6A6E4AB280DB775862FF00E8E2F4C680F4EAF7E6329423CCB5A144F1E2214D2E`
  - `witch.sources.json`: `C6BF2968B1B8F87C537326D1B9FD963B42596FC4E11D4A8FF741030E8DC22FC7`
- Pass: generated placement comparison from pre-build snapshot showed changed key list `["WITCH"]`.

## Not Touched

- `data/raw-factions/witch/witch.claims.json`
- `data/raw-factions/witch/witch.sources.json`
- WUBRG source intake or implementation
- Colorless source/runtime/generated/hero/Home/route work
- Mono color source-authority work
- Public aliases, public routes, Home preview, hero mappings, or user-facing WITCH naming expansion
- Sultai dossier residual
- Unrelated generated, runtime, Supabase, docs, assets, and Kanban/handoff drift

## Follow-Up Recommendations

- Keep WITCH on the VM-328 source-authority floor unless a future source-intake card adds evidence.
- Treat remaining all-target model-owned source-generated warnings as a separate cross-lane hardening topic.
- Do not use this repair as WUBRG precedent until WUBRG has its own source-intake/raw/review path.

## Next Suggested Agent

Planning Architect / JSON Cartographer for any future WUBRG or mono source-authority work, after a source-readiness matrix.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-328-witch-source-generated-authority-repair.md`
- `docs/kanban/done/VM-298-witch-public-copy-source-durability-repair.md`
- `docs/kanban/done/VM-300-source-generated-guardrails.md`
- `docs/kanban/done/VM-325-source-bound-gold-standard-rule.md`
- `docs/research/witch/witch-evidence-ledger.md`
- `docs/architecture/colors/witch/identity.md`
- `docs/architecture/colors/witch/metaphysics.md`
