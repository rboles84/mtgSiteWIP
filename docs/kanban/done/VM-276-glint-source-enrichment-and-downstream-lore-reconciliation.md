# VM-276 - Glint Source Enrichment And Downstream Lore Reconciliation

ID: VM-276
Title: Glint Source Enrichment And Downstream Lore Reconciliation
Status: done
Type: Research / Raw Data Reconciliation / Live Copy
Area: Four-Color, Glint, Research, Raw Data, Archscry
Priority: high
Created: 2026-06-03
Completed: 2026-06-03

## Summary

Run a source-first Glint reconciliation pass that strengthens the local packet with support-only exact card-data validation, preserves the original five claim-bearing raw claims, reconciles stale pre-live raw/profile/placement wording after VM-251, and rebuilds only the approved generated surfaces.

## Results

- Reviewed `docs/research/glint/addtGlintInfo.txt` before new source work.
- Added local Scryfall card-data support for exact `Glint-Eye Nephilim` and `Yidris, Maelstrom Wielder` facts without promoting that source into raw-claim authority.
- Reconciled the Glint research packet so source roles, evidence rows, and manual-fill items now reflect the new support-only card-data floor and current post-VM-251 state.
- Preserved the existing five raw claims and the claim-bearing authority chain.
- Reconciled stale pre-live Glint raw profile and placement fields to current live-pilot status while keeping `GLINT` as the only live key and `UBRG` plus all permutations metadata/query-only.
- Rebuilt only the approved generated surfaces through the sanctioned builders.

## Protected Surfaces

- Did not change public route ownership surfaces.
- Did not change Home preview membership.
- Did not change `UBRG` aliasing behavior.
- Did not change Glint hero asset behavior.
- Did not change schema shape.
- Did not add new placement axes, score weights, thresholds, routing rules, or new model fields.
- Did not add new raw claims, new live keys, `/glint/` routes, `/ubrg/` routes, or Commander directory unsuppression.

## Source Decisions

- `data/scryfall/raw/oracle-cards.json` is now an explicit Glint support-only source for exact card facts.
- Exact local Glint-Eye and Yidris card facts are approved for bounded profile/docs copy only.
- `GLINT-EVID-011` and `GLINT-EVID-012` are support-only evidence rows, not raw-claim authority.
- `GLINT-MF-001` and `GLINT-MF-002` were narrowed, not fully promoted into claim-bearing proof.
- Commander 2016 `Chaos` article grounding, stronger naming authority, deeper missing-White philosophy support, adjacent separator evidence, and Commander-directory certainty remain deferred.

## Generated / Live Reconciliation

- Ran `npm.cmd run build:factions`.
- Ran `node research\build-archscry-flavor-snippets.mjs`.
- Accepted generated changes only in the approved family:
  - `data/placement-model.json`
  - `data/archscry-flavor-snippets.json`
  - `supabase/functions/guild-recruiter/faction-context.ts`
- `data/placement-model.schema.json` ended with no final content diff.

## Tests Run

- Reviewed `docs/research/glint/addtGlintInfo.txt` before source work.
- JSON parse check for:
  - `data/raw-factions/glint/glint.sources.json`
  - `data/raw-factions/glint/glint.claims.json`
  - `data/raw-factions/glint/glint.profile.json`
  - `data/raw-factions/glint/glint.placement.json`
  - `data/raw-factions/glint/glint.changelog.json`
- Raw claim/source-role validation script: passed with `claim_count = 5` and no authority-chain errors.
- `npm.cmd run build:factions`
- `node research\build-archscry-flavor-snippets.mjs`
- `npm.cmd run test:placement`
- `npm.cmd run test:presentation-snapshots`
- `npm.cmd test`
- `npm.cmd run audit:factions`
- `git diff --check`

## Remaining Gaps

- Stronger direct official Glint-Eye and Yidris article/page capture if later work wants claim-bearing promotion.
- Commander 2016 `Chaos` article capture.
- Stronger four-color naming/context capture.
- Stronger missing-White philosophy support beyond the current bounded frame.
- Stronger source-backed adjacent separator evidence.
- Exact Commander-directory and recommendation certainty.

## Related Handoff

- `docs/handoffs/2026-06-03-2059-codex-vm276-glint-source-enrichment-reconciliation.md`
