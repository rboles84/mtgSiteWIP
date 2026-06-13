# VM-241 - Yore Identity And Metaphysics Docs

ID: VM-241
Title: Yore Identity And Metaphysics Docs
Status: done
Reservation State: Complete
Type: Documentation / Identity Architecture
Area: Four-Color, Yore, Architecture
Priority: high
Created: 2026-05-31

## Summary

Created the docs-only Yore identity and metaphysics architecture from the approved VM-240 source packet, with user-added VM-241 source-material files treated as supplemental shaping/support only.

## Future Scope

- Create `docs/architecture/colors/yore/identity.md` and `metaphysics.md`.
- Base both documents on the approved Yore packet and bounded manual-fill decisions only.
- Preserve Yore as non-live during this docs pass.
- Stop before docs parity, raw packets, review, runtime, generated artifacts, or tests.

## Execution Notes

- The user clarified that additional `docs/research/yore/source-material/` docs were intentionally added for VM-241 authoring.
- Those supplemental docs may shape wording and support already-bounded claims, but the VM-240 evidence ledger remains the claim-bearing floor.
- Do not edit, rename, move, normalize, or stage the existing `docs/research/yore/` packet in this pass.

## Scope Completed

- Created `docs/architecture/colors/yore/identity.md`.
- Created `docs/architecture/colors/yore/metaphysics.md`.
- Preserved `YORE` as non-live and `WUBR` plus the other 23 same-color permutations as metadata/query-only.
- Kept Yore-Tiller Nephilim as a historical/card anchor, not a faction, institution, civilization, doctrine, or placement authority.
- Kept Breya/Invent Superiority as Commander support-only texture, not lore proof, legality proof, or runtime authorization.
- Treated the user-added `docs/research/yore/source-material/` files as VM-241 supplemental shaping/support only.
- Left VM-242 parity fill, VM-243 raw packet, VM-244 review gate, and VM-245 runtime promotion untouched.

## Explicit Non-Goals

- Do not author raw JSON, builder mappings, generated files, or runtime support.
- Do not treat Nephilim as institutions or faction authorities.
- Do not bundle later Yore lane work into VM-241.

## Dependencies

- Depends on VM-240 completion.

## Acceptance Criteria

- [x] A future execution pass creates Yore identity and metaphysics docs only.
- [x] The docs stay evidence-bound to the approved Yore packet.
- [x] No raw packet, review gate, or runtime promotion work is bundled into VM-241.

## Files Changed

- `docs/architecture/colors/yore/identity.md`
- `docs/architecture/colors/yore/metaphysics.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-241-yore-identity-and-metaphysics-docs.md`

## Tests Run

- Re-ran AGENTS pre-flight review against `docs/handoffs/HANDOFF_INDEX.md`, relevant Yore handoffs, `docs/kanban/board.md`, the VM-241 card, VM-240 packet docs, canon four-color references, Commander JSONL row, and user-added Yore source-material files.
- Verified `docs/architecture/colors/yore/` did not exist before VM-241 and contains exactly `identity.md` and `metaphysics.md` after authoring.
- Verified `data/raw-factions/yore/` was not created.
- Verified all `YORE-EVID-###` and referenced non-ambiguous `YORE-MF-###` anchors in the architecture docs resolve against `docs/research/yore/yore-evidence-ledger.md`.
- Compared pre/post SHA-256 hashes for the existing `docs/research/yore/` packet and user-added source-material files; hashes remained unchanged.
- Ran scoped scans for official-name/faction overclaims; matches are negative guardrail statements only.
- Ran scoped scans for raw/runtime/generated/promotion language; matches are boundary statements only.
- Ran scoped trailing-whitespace and ASCII scans for the new architecture docs and VM-241 Kanban file.
- Ran scoped `git diff --check` on `docs/kanban/board.md`.

Not run:

- `npm test`
- `npm run test:parser`
- Runtime/build suites, because VM-241 was documentation-only and touched no runtime, generated, schema, raw JSON, or app files.

## Not Touched

- `docs/research/yore/`
- `docs/research/4 color/`
- `docs/research/canon/**`
- `data/raw-factions/yore/`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `research/build-faction-artifacts.mjs`
- `supabase/functions/guild-recruiter/faction-context.ts`
- Runtime files
- Generated artifacts
- Home preview membership
- Maze files
- Route CSS/JS
- Schemas
- Glint, Dune, Ink, and Witch files
- `assets/img/identity-hero/colorless.webp`

## Follow-Up Recommendations

- Start VM-242 only after accepting VM-241; VM-242 should add parity fill, adjacent separators, and non-runtime search planning.
- Reconcile the VM-240 manual-fill topic-number drift around adjacent separators vs. Commander exact-data notes before VM-242 or VM-243 relies on those IDs.
- Keep the user-added Yore source-material supplemental until a future source/audit card explicitly promotes any individual claim into evidence.
