# VM-268 Witch Review Gate Handoff

## Agent Name

Codex

## Task Requested

Implement VM-268 only as a review gate for the VM-267 Witch raw packet. Re-run AGENTS.md pre-flight, review the raw packet without editing it, preserve before/after SHA-256 hash stability, record the verdict `review-approved-for-future-promotion-planning` if the gate passes, move VM-268 to Done, and keep VM-269 optional and blocked unless this approval remains unambiguous.

## Pre-Flight Summary

- Recent related work: VM-264 created the approved Witch source packet, VM-265 created Witch identity/metaphysics docs, VM-266 filled Witch parity docs, and VM-267 created the non-live Witch raw packet.
- Current known risks: the worktree is broadly dirty; `data/raw-factions/witch/` is untracked; Witch support rows include `WUBG` support-source order while Vox Mana metadata uses `GWUB`; `Growth`, Atraxa, and `Breed Lethality` can over-expand into naming or lore proof if not bounded.
- Relevant decisions already made: `WITCH` is the reserved future expression label, `GWUB` is canonical metadata/query-only, `WUBG` appears only when echoing support-source order, `Growth` is support/display texture only, and Witch-Maw is a bounded card-history anchor.
- Files recently changed: Witch packet/docs/raw work from VM-264 through VM-267; board/index updates; recent unrelated dossier work around VM-290 through VM-292; existing four-color runtime hardening from VM-280, VM-281, VM-283, VM-285, and VM-286.
- What should not be touched: raw Witch JSON bytes, Witch research docs, Witch architecture docs, generated outputs, schemas, builders, runtime, Maze files, route CSS/JS, Home preview, Supabase, VM-269 implementation surfaces, and unrelated dirty worktree files.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-04-2144-codex-vm267-witch-non-live-raw-packet.md`
- `docs/handoffs/2026-06-04-0815-codex-vm262-ink-review-gate.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-264-witch-source-packet-and-evidence-ledger.md`
- `docs/kanban/done/VM-265-witch-identity-and-metaphysics-docs.md`
- `docs/kanban/done/VM-266-witch-docs-parity-fill.md`
- `docs/kanban/done/VM-267-witch-non-live-raw-packet.md`
- `docs/kanban/backlog/VM-268-witch-review-gate.md`
- `docs/kanban/backlog/VM-269-witch-controlled-runtime-promotion.md`
- `data/raw-factions/witch/witch.sources.json`
- `data/raw-factions/witch/witch.claims.json`
- `data/raw-factions/witch/witch.profile.json`
- `data/raw-factions/witch/witch.placement.json`
- `data/raw-factions/witch/witch.changelog.json`
- `docs/research/witch/witch-evidence-ledger.md`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `data/archscry-flavor-snippets.json`
- `assets/js/quick-reading-tests.js`

## Files Changed

- `docs/kanban/board.md`
- `docs/kanban/done/VM-268-witch-review-gate.md`
- `docs/kanban/backlog/VM-268-witch-review-gate.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-04-2235-codex-vm268-witch-review-gate.md`

## What Changed

- Moved VM-268 from Backlog to Done through the file-based Kanban flow.
- Recorded the review verdict as `review-approved-for-future-promotion-planning`.
- Added before/after raw JSON SHA-256 hash tables proving byte stability.
- Recorded future VM-269 policy only in bookkeeping and handoff surfaces: VM-269 remains optional, and if executed its selected rollout mode is live-with-Maze.
- Updated the handoff index with the VM-268 completion record.

## Why It Changed

VM-268 exists to approve the VM-267 non-live Witch raw packet for future promotion planning only. The review gate needs a durable verdict, hash evidence, and explicit stop gates before any optional VM-269 runtime work can be considered.

## Review Result

Verdict: `review-approved-for-future-promotion-planning`

The review passed for future VM-269 planning only. `WITCH` remains non-live, non-generated, unrouted, unpreviewed, unplaced, and not integrated.

## Before / After Raw JSON Hashes

| File | Before SHA-256 | After SHA-256 |
|---|---|---|
| `witch.changelog.json` | `BC2B203865D7F56B1BE860C1EAEC212560DBA5B453AF6920CB7902E2E01D9D85` | `BC2B203865D7F56B1BE860C1EAEC212560DBA5B453AF6920CB7902E2E01D9D85` |
| `witch.claims.json` | `6A6E4AB280DB775862FF00E8E2F4C680F4EAF7E6329423CCB5A144F1E2214D2E` | `6A6E4AB280DB775862FF00E8E2F4C680F4EAF7E6329423CCB5A144F1E2214D2E` |
| `witch.placement.json` | `BFAD914A9A47B7B9C46A5E75E462D7D54B3D1A8B5D360B7AA76686021B6E5084` | `BFAD914A9A47B7B9C46A5E75E462D7D54B3D1A8B5D360B7AA76686021B6E5084` |
| `witch.profile.json` | `534719C82ABC79BD3A8B6788D31AE8F5A0174A5B96871C791D5CD9F073DAD1FA` | `534719C82ABC79BD3A8B6788D31AE8F5A0174A5B96871C791D5CD9F073DAD1FA` |
| `witch.sources.json` | `C6BF2968B1B8F87C537326D1B9FD963B42596FC4E11D4A8FF741030E8DC22FC7` | `C6BF2968B1B8F87C537326D1B9FD963B42596FC4E11D4A8FF741030E8DC22FC7` |

## Validation Results

- Passed exact file-set check for the five Witch raw JSON files.
- Passed JSON parse for all five files.
- Passed exact five-claim check with contiguous IDs `witch_claim_0001` through `witch_claim_0005`.
- Passed evidence allowlist check for `WITCH-EVID-001`, `WITCH-EVID-002`, `WITCH-EVID-003`, `WITCH-EVID-004`, `WITCH-EVID-005`, `WITCH-EVID-007`, and `WITCH-EVID-010`.
- Passed evidence resolver against `docs/research/witch/witch-evidence-ledger.md`.
- Passed source-role resolver: every raw-claim `source_id` maps to `source_role: claim-bearing`.
- Passed quarantine check: the three preserved Witch draft records use `quarantine_id`, preserve VM-264 hashes, and have no `source_id`.
- Passed non-live boundary checks: `placement_axes: []`, `placement_eligible: false`, `preview_eligible: false`, `live_pilot: false`, and `review_gated: true`.
- Passed 48-term same-color permutation metadata/query-only check in profile and placement surfaces.
- Passed leakage scan for exact live/generated availability across targeted data surfaces.

## Decisions Made

- Approved VM-267 Witch raw packet for future VM-269 promotion planning only.
- Kept raw Witch JSON unstaged, unformatted, unrepaired, and byte-stable.
- Treated the existing `assets/js/quick-reading-tests.js` `WITCH` hit as a non-live sentinel because it asserts `WITCH` must not be generated into live factions, placement model, identity layers, or Home preview.
- Recorded `GWUB` only as a future technical aggregate/query value where required.
- Kept `WUBG` as support-source order only and `Growth` as support/display-only.
- Kept VM-269 optional and blocked unless this VM-268 verdict remains unambiguous and raw hashes remain stable.

## Risks / Uncertainties

- `data/raw-factions/witch/` remains untracked, so future agents should preserve the exact hashes above until the raw folder is intentionally staged by a scoped Git flow.
- The worktree is dirty and contains unrelated VM-292 and prior work; VM-268 intentionally avoided unrelated cleanup.
- VM-269 will need a fresh live/generated baseline and must not infer live availability from this review.

## Tests Run

- AGENTS.md pre-flight review.
- Kanban and handoff status checks for VM-264 through VM-269.
- Exact raw file-set check.
- JSON parse for all five Witch raw files.
- Before and after SHA-256 hash comparison for all five Witch raw files.
- Claim count, contiguous claim ID, evidence allowlist, and evidence resolver validation.
- Source-role validation for raw-claim `source_id`s.
- Quarantine validator for preserved draft records.
- Non-live flag validator.
- 48-term same-color permutation metadata/query-only validator.
- Targeted live/generated leakage scan for exact `WITCH`, `GWUB`, `WUBG`, `/witch/`, `/gwub/`, and `/wubg/`.
- Wider public-surface sentinel scan for exact `WITCH`, `GWUB`, `WUBG`, and route forms.
- Overclaim scan for official-name, official-faction, institution, lore-proof, legality-proof, EDHREC, ranking, cEDH, Phyrexia-only, discovery-draft proof, route, Home preview, Maze, Supabase, and generated leakage.
- Scoped trailing-whitespace scan and scoped `git diff --check` for VM-268 bookkeeping.

`npm test` and `npm run test:parser` were skipped because VM-268 did not touch runtime, builders, generated output, or shared structured-data contracts.

## Not Touched

- `data/raw-factions/witch/*.json`
- `docs/research/witch/**`
- `docs/architecture/colors/witch/**`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `research/build-faction-artifacts.mjs`
- Generated artifacts
- Schemas
- Maze files
- Route CSS/JS
- Home preview
- Supabase files
- Runtime code
- VM-269 implementation surfaces

## Follow-Up Recommendations

- If VM-269 is executed, start with a fresh AGENTS.md pre-flight and verify the VM-268 verdict string plus the raw hashes in this handoff before any live-with-Maze work.
- If any Witch raw hash drifts before VM-269, stop and route through a scoped repair/re-review task rather than promoting.
- Keep public labels centered on `Witch`; keep `GWUB` technical-only and `WUBG` support-source-order-only.

## Next Suggested Agent

Planning Architect for VM-269 live-with-Maze execution planning, if the user chooses to proceed. JSON Cartographer plus Test Strategist should review the live/generated baseline before implementation.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-268-witch-review-gate.md`
- `docs/kanban/done/VM-267-witch-non-live-raw-packet.md`
- `docs/handoffs/2026-06-04-2144-codex-vm267-witch-non-live-raw-packet.md`
- `data/raw-factions/witch/`
