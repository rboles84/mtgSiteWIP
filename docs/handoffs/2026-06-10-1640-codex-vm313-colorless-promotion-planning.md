# 2026-06-10 16:40 - Codex - VM-313 Colorless Promotion Planning

## Agent Name

Codex, acting as Planning Architect / Runtime Architect.

## Task Requested

Execute VM-313 as controlled Colorless promotion planning only. Create VM-313 bookkeeping and define a decision-complete future implementation contract without promoting `COLORLESS`, editing runtime/data/generated/schema/builder files, running generators, or staging files.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-321-colorless-review-gate-rerun.md`
- `docs/handoffs/2026-06-10-1510-codex-vm321-colorless-review-gate-rerun.md`
- `docs/kanban/done/VM-320-colorless-runtime-test-leakage-classification-and-repair.md`
- `docs/handoffs/2026-06-10-0932-codex-vm320-colorless-leakage-repair.md`
- `docs/kanban/done/VM-312-colorless-review-gate.md`
- `docs/kanban/in-progress/VM-323-naya-display-enrichment.md`
- `docs/reference/data-contracts.md`
- `data/identity-layers.schema.json`
- `data/placement-model.schema.json`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/archscry-flavor-snippets.json`
- `data/raw-factions/colorless/colorless.sources.json`
- `data/raw-factions/colorless/colorless.claims.json`
- `data/raw-factions/colorless/colorless.profile.json`
- `data/raw-factions/colorless/colorless.placement.json`
- `data/raw-factions/colorless/colorless.changelog.json`
- `research/build-faction-artifacts.mjs`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `assets/js/commander-dossier.js`
- `assets/js/quick-reading-tests.js`
- `assets/js/home.js`
- `assets/js/identity-layers.js`
- `assets/js/maze-handoff.js`
- `maze/index.html`

## Files Changed

- `docs/kanban/board.md`
- `docs/kanban/done/VM-313-colorless-controlled-promotion-planning.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-10-1640-codex-vm313-colorless-promotion-planning.md`

## What Changed

Added VM-313 bookkeeping only:
- Created the VM-313 done card.
- Added VM-313 to the Done section of `docs/kanban/board.md`.
- Added this handoff.
- Added VM-313 to `docs/handoffs/HANDOFF_INDEX.md`.

The card defines the future Colorless implementation contract but does not implement it.

## Why It Changed

VM-321 approved Colorless only for future promotion planning. VM-313 records the runtime/schema/builder contract and fail-closed gates needed before a later implementation card can safely promote `COLORLESS` as a controlled placement identity.

## Decisions Made

- Recorded verdict `promotion-contract-ready-for-implementation-card`.
- Named VM-324 as the recommended future implementation card because VM-323 is now complete and must not be reused.
- Chose one future controlled identity key only: `COLORLESS`.
- Chose `kind: "colorless"` and `display.institution_type: "colorless"` for future implementation because the schema and docs expose that enum.
- Proposed `core_color: "C"` as the technical non-WUBRG marker, with mandatory future consumer verification.
- Required `colors: []`, `secondary_colors: []`, `display_code: "C"`, aliases restricted to `["COLORLESS"]`, `placement_eligible: true` only after future implementation checks pass, and `preview_eligible: false`.
- Blocked lowercase, display-name, route, slug, and user-facing aliases unless separately approved.
- Required future implementation to fail closed if `COLORLESS` appears in public routes, Home preview, Maze routing, hero lookup, public aliases, or unapproved Supabase context.

## Current Baseline

Current repo-truth counts:
- Identity expressions: 35
- Generated factions: 35
- Placement factions: 35
- Flavor snippet entries: 35
- Home preview entries: 20
- `COLORLESS` in identity layers: absent
- `COLORLESS` in generated factions: absent
- `COLORLESS` in placement model: absent
- `COLORLESS` in flavor snippets: absent

## Representation Findings

Schema and docs:
- `data/identity-layers.schema.json` includes `colorless` in the institution enum.
- `data/identity-layers.schema.json` treats `core_color` as an unconstrained string.
- `data/identity-layers.schema.json` allows empty `colors` and `secondary_colors` arrays.
- `data/placement-model.schema.json` does not block empty `colors` arrays.
- `docs/reference/data-contracts.md` lists `colorless` in the institution enum.

Builder/runtime gaps for VM-324:
- No `colorless: "COLORLESS"` in `RAW_TO_KEY`.
- No `BIOLOGICAL_PRIORS.COLORLESS`.
- No `KNOWN_LATERAL_INHIBITION.COLORLESS`.
- No Colorless live copy override or Colorless-specific placement support.
- Builder `normalizeColor` does not normalize `"colorless"` to `"C"`.
- Generic frontend colorless utilities exist but are not promotion authority.

Supabase context:
- `buildFactionContext` emits context for model factions.
- If VM-324 adds `COLORLESS` to the model, generated Supabase context may gain `COLORLESS`.
- VM-324 may accept that only as an explicitly approved controlled placement/recruiter output.
- If that would imply unapproved public availability or recruiter routing, VM-324 must stop and require a separate context-isolation plan.

## Raw Hashes

Verified Colorless raw hashes still match VM-321:

| File | SHA-256 |
|---|---|
| `colorless.changelog.json` | `94775FCD67365FD82F77FC52E8F989249B402F839399215602C07BD4F65D6580` |
| `colorless.claims.json` | `492803A912347DCA78F0246AE4594B9E92DDBB14271327D42FB042C514FBA78A` |
| `colorless.placement.json` | `25D373514B7A923E86F554C4E00A8F0BFD3F9B69CCFF9BCB03ADC96B6F39B611` |
| `colorless.profile.json` | `402166523ADA190AF971B4BEBE319DBDABA7721BC59D1521E200E7CAC22E7872` |
| `colorless.sources.json` | `7CD00948F9EA4953988D34DB13DDD2EA7D63FFD0481B72F2BC9D73AAC41BDFB6` |

## Risks / Uncertainties

- The broader worktree remains very dirty with unrelated runtime, generated, raw, docs, and asset changes.
- VM-324 must be rechecked before use.
- Supabase context semantics remain the largest future ambiguity. If generated context implies unapproved public availability or recruiter routing, VM-324 must stop.
- `core_color: "C"` is proposed but must be verified against every future builder/runtime consumer.
- Colorless placement copy is high risk for generic/colorless, artifact/Colorless, Eldrazi/artifact, Wastes, Phyrexia, and five-color conflation.

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

- Execute VM-324, or the next available ID, as controlled Colorless implementation.
- Recheck VM-324 availability at execution time.
- Preserve raw Colorless JSON hashes exactly.
- Do not add Home preview, routes, Maze routing, hero assets, public aliases, or unmanaged Supabase context.
- Keep generic colorless utility handling separate from `COLORLESS` identity promotion.

## Next Suggested Agent

Runtime Steward / JSON Cartographer for VM-324 controlled Colorless implementation.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-313-colorless-controlled-promotion-planning.md`
- `docs/kanban/done/VM-321-colorless-review-gate-rerun.md`
- `docs/handoffs/2026-06-10-1510-codex-vm321-colorless-review-gate-rerun.md`
- `docs/kanban/done/VM-320-colorless-runtime-test-leakage-classification-and-repair.md`
- `docs/handoffs/2026-06-10-0932-codex-vm320-colorless-leakage-repair.md`
- `docs/kanban/done/VM-312-colorless-review-gate.md`
- `data/raw-factions/colorless/`
