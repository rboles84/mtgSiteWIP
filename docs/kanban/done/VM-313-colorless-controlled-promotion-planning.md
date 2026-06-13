# VM-313 - Colorless Controlled Promotion Planning

ID: VM-313
Title: Colorless Controlled Promotion Planning
Status: done
Reservation State: Complete
Type: Planning / Runtime Architecture Contract
Area: Colorless, Raw Factions, Identity Layers, Builder, Placement
Priority: high
Created: 2026-06-10
Completed: 2026-06-10

## Summary

VM-313 converts VM-321's `review-approved-for-future-promotion-planning` verdict into a controlled promotion contract for a later implementation card. It does not promote `COLORLESS`.

Verdict: `promotion-contract-ready-for-implementation-card`.

Recommended next implementation card: VM-324, or the next available ID if VM-324 becomes occupied before execution. VM-323 is complete and must not be reused.

## Pre-Flight Summary

Recent related work:
- VM-308 created the Colorless source packet and evidence ledger.
- VM-309 and VM-310 created and filled current-standard Colorless architecture docs.
- VM-311 created the non-live raw Colorless packet.
- VM-312 blocked review approval because unapproved runtime/test leakage existed.
- VM-320 removed the runtime/test leakage while preserving generic colorless utility handling.
- VM-321 re-ran the review gate and approved Colorless only for future promotion planning.
- VM-322 and VM-323 completed source-first display enrichment work after the Colorless review gate.

Current known risks:
- The broader worktree remains dirty with unrelated runtime, generated, raw, docs, and asset changes.
- `assets/img/identity-hero/colorless.webp` is dirty and out of scope.
- `docs/research/canon/colorless/**` still appears deleted in the worktree and must not be normalized by Colorless promotion planning.
- Generated Supabase context currently follows model faction output; future implementation must explicitly decide whether generated Colorless context is an approved controlled placement/recruiter surface.

Relevant decisions already made:
- VM-321 approval permits future promotion planning only, not runtime promotion.
- VM-309/VM-310 architecture docs are shaping context only, not claim-bearing evidence.
- Support-only Commander/comparator/distinction rows cannot independently authorize raw claims or broad Commander viability.
- Generic colorless utility handling is distinct from `COLORLESS` identity promotion.

Files recently changed outside VM-313:
- `assets/js/commander-dossier.js`
- `assets/js/quick-reading-tests.js`
- `data/raw-factions/colorless/*.json`
- `docs/research/colorless/**`
- `docs/architecture/colors/colorless/**`
- `assets/img/identity-hero/colorless.webp`
- `docs/research/canon/colorless/**`
- broad unrelated Kanban/handoff, generated/data, Home, and route files.

What should not be touched:
- Colorless raw JSON
- Runtime JS
- Generated artifacts
- Schemas/builders
- Maze, Home, routes, Supabase
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `research/build-faction-artifacts.mjs`
- `assets/img/identity-hero/colorless.webp`
- `docs/research/canon/colorless/**`

## Current Baseline

Current repo-truth counts from inspection:
- Identity expressions: 35
- Generated factions: 35
- Placement factions: 35
- Flavor snippet entries: 35
- Home preview entries: 20
- `COLORLESS` in identity layers: absent
- `COLORLESS` in generated factions: absent
- `COLORLESS` in placement model: absent
- `COLORLESS` in flavor snippets: absent

The expected future implementation delta is one new controlled identity key, `COLORLESS`, relative to the then-current baseline, with public exposure limited to explicitly approved generated/placement surfaces and no Home preview, route, Maze, hero, or public alias expansion.

## Future Runtime Contract

Future implementation must use:
- One controlled identity key only: `COLORLESS`.
- `kind: "colorless"` and `display.institution_type: "colorless"` because the identity-layer schema and data-contract docs expose the `colorless` enum.
- Proposed `core_color: "C"` as the technical aggregate/non-WUBRG marker, but the implementation must verify every builder/runtime consumer accepts it without treating Colorless as mono-color, five-color, or generic mana.
- `colors: []`.
- `secondary_colors: []`.
- `display_code: "C"`.
- `aliases: ["COLORLESS"]`.
- `placement_eligible: true` only in the future implementation card after the contract checks pass.
- `preview_eligible: false`.

Future implementation must not add:
- lowercase aliases
- display-name aliases
- slug aliases
- public route aliases
- Home preview membership
- Maze routing
- hero lookup or hero asset rollout
- manual Supabase edits
- new lore, Commander facts, or evidence

## Representation Findings

Schema and docs:
- `data/identity-layers.schema.json` includes `colorless` in the institution enum.
- `data/identity-layers.schema.json` treats `core_color` as an unconstrained string.
- `data/identity-layers.schema.json` allows `colors` and `secondary_colors` arrays without a minimum item count.
- `data/placement-model.schema.json` does not block an empty `colors` array.
- `docs/reference/data-contracts.md` lists `colorless` in the institution enum.

Builder/runtime gaps to implement later:
- `research/build-faction-artifacts.mjs` has no `colorless: "COLORLESS"` entry in `RAW_TO_KEY`.
- `research/build-faction-artifacts.mjs` has no `BIOLOGICAL_PRIORS.COLORLESS`.
- `research/build-faction-artifacts.mjs` has no `KNOWN_LATERAL_INHIBITION.COLORLESS`.
- `research/build-faction-artifacts.mjs` has no Colorless live copy override or Colorless-specific placement question support.
- `normalizeColor` does not normalize `"colorless"` to `"C"` in the builder, so VM-324 must either avoid needing that path or extend it safely.
- Frontend generic utility handling already contains `COLORLESS -> C`, `colorless -> C`, `C -> Colorless`, and generic colorless UI labels; those are not promotion authority.

Supabase context:
- `buildFactionContext` emits context from model factions.
- If `COLORLESS` enters the placement model through the future build path, generated Supabase context may also gain `COLORLESS`.
- VM-324 may accept generated Supabase context only as an explicitly approved controlled placement/recruiter output.
- If that generated context would imply unapproved public availability or recruiter routing, VM-324 must stop and require a separate context-isolation plan instead of shipping the promotion.

## Future Implementation Slices

VM-324, or the next available implementation card, should:
- Re-run AGENTS.md pre-flight and current baseline counts.
- Verify raw Colorless hashes match VM-321 before editing.
- Add `COLORLESS` to `data/identity-layers.json` using the future runtime contract above.
- Add `colorless: "COLORLESS"` to `RAW_TO_KEY`.
- Add the minimal required `BIOLOGICAL_PRIORS.COLORLESS` object using source-bound raw Colorless profile/placement language only.
- Add the minimal required `KNOWN_LATERAL_INHIBITION.COLORLESS` list focused on WUBRG, five-color, artifact-only, Eldrazi-only, Wastes-only, Phyrexia-only, and generic-mana false positives.
- Decide whether a live copy override is needed; if used, source it only from approved raw Colorless profile/placement guidance.
- Use existing raw Colorless discriminator questions where possible; do not invent new lore, facts, Commander proof, or evidence.
- Ensure empty `colors: []` and proposed `core_color: "C"` do not create mono-color, five-color, or generic-mana behavior.
- Regenerate through approved build paths only.
- Preserve raw Colorless JSON hashes exactly.
- Assert the approved generated/placement baseline moves from 35 to 36 only where intended, while Home preview count remains unchanged.
- Fail closed if `COLORLESS` appears in public routes, Home preview, Maze routing, hero lookup, public aliases, or unapproved Supabase context.

## Hard Boundaries

- VM-313 itself does not make `COLORLESS` live, generated, routed, public, preview eligible, or placement eligible.
- Do not treat generic mana, colorless mana, artifacts, and Colorless identity as interchangeable.
- Do not use support-only Commander rows as proof of broad Commander viability.
- Do not normalize `docs/research/canon/colorless/**` deletes.
- Do not touch `assets/img/identity-hero/colorless.webp`.
- Do not stage files; leave staging/commit decisions outside VM-313.
- If VM-324 discovers a contract consumer cannot represent `kind: "colorless"`, `colors: []`, or `core_color: "C"` safely, it must stop and open a schema/builder architecture card.

## Raw Hashes

VM-313 verified the five Colorless raw hashes still match VM-321:

| File | SHA-256 |
|---|---|
| `colorless.changelog.json` | `94775FCD67365FD82F77FC52E8F989249B402F839399215602C07BD4F65D6580` |
| `colorless.claims.json` | `492803A912347DCA78F0246AE4594B9E92DDBB14271327D42FB042C514FBA78A` |
| `colorless.placement.json` | `25D373514B7A923E86F554C4E00A8F0BFD3F9B69CCFF9BCB03ADC96B6F39B611` |
| `colorless.profile.json` | `402166523ADA190AF971B4BEBE319DBDABA7721BC59D1521E200E7CAC22E7872` |
| `colorless.sources.json` | `7CD00948F9EA4953988D34DB13DDD2EA7D63FFD0481B72F2BC9D73AAC41BDFB6` |

## Acceptance Criteria

- [x] VM-313 records verdict `promotion-contract-ready-for-implementation-card`.
- [x] VM-313 states it does not promote `COLORLESS`.
- [x] Future key, color marker, preview policy, alias policy, route policy, and source/build path are specified.
- [x] Future delta is one controlled identity key with no Home preview, route, Maze, hero, or public alias expansion.
- [x] Inspected schema/builder/runtime surfaces are listed.
- [x] Dirty drift and do-not-touch paths are listed.
- [x] No raw Colorless JSON, runtime JS, generated artifacts, schemas, builders, routes, Maze, Home, Supabase, image, or canon relocation files are changed.

## Tests Run

- `rg -n "VM-313|colorless-controlled-promotion-planning|Colorless Controlled Promotion Planning" docs/kanban docs/handoffs docs/research docs/architecture data -g "*.md" -g "*.json"`
- `rg -n "VM-324" docs/kanban docs/handoffs docs/research docs/architecture data -g "*.md" -g "*.json"`
- Baseline count script for identity expressions, generated factions, placement factions, Home preview entries, flavor snippet entries, and `COLORLESS` absence.
- `Get-FileHash -Algorithm SHA256 data/raw-factions/colorless/*.json`
- Schema/runtime surface scans for `colorless`, `institutionType`, `core_color`, `colors`, `secondary_colors`, `preview_eligible`, and builder registry hooks.
- Targeted `COLORLESS` absence scan across identity, generated, placement, flavor, builder, Supabase context, and relevant runtime files.
- Scoped ASCII and trailing-whitespace check on VM-313 new docs.
- `git diff --check -- docs/kanban/board.md docs/handoffs/HANDOFF_INDEX.md`
- Scoped `git status --short` for VM-313 bookkeeping and protected Colorless/runtime paths.

Not run:
- Generators
- Formatters
- Builders
- Snapshot updates
- npm-wide suites

## Files Changed

- `docs/kanban/board.md`
- `docs/kanban/done/VM-313-colorless-controlled-promotion-planning.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-10-1640-codex-vm313-colorless-promotion-planning.md`

## Not Touched

- `data/raw-factions/colorless/**`
- `docs/research/colorless/**`
- `docs/architecture/colors/colorless/**`
- `docs/research/canon/colorless/**`
- `assets/img/identity-hero/colorless.webp`
- `assets/js/**`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `data/archscry-flavor-snippets.json`
- `research/build-faction-artifacts.mjs`
- `supabase/functions/guild-recruiter/faction-context.ts`
- Generated artifacts, schemas, Maze files, Home files, route files

## Follow-Up Recommendations

- Execute VM-324, or the next available ID, as the controlled Colorless implementation card.
- Keep VM-324 source-first and fail-closed around Supabase context/public-route leakage.
- Do not add Home preview, routes, Maze routing, hero assets, or aliases without separate approval.
- Preserve raw Colorless hashes before and after any future implementation.

## Next Suggested Agent

Runtime Steward / JSON Cartographer for VM-324 controlled Colorless implementation.
