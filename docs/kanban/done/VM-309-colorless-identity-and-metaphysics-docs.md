# VM-309 - Colorless Identity And Metaphysics Docs

ID: VM-309
Title: Colorless Identity And Metaphysics Docs
Status: done
Type: Documentation / Identity Architecture
Area: Colorless, Architecture
Priority: high
Created: 2026-06-09
Completed: 2026-06-09

## Summary

Create the docs-only Colorless identity and metaphysics architecture from the approved VM-308 source packet while preserving branch separation, evidence/manual-fill boundaries, and the stop gate before parity, raw-faction, review, runtime, generated, schema, route, Maze, Home, Supabase, builder, image, and canon-relocation work.

## Scope Completed

- Created `docs/architecture/colors/colorless/identity.md`.
- Created `docs/architecture/colors/colorless/metaphysics.md`.
- Based both documents on the VM-308 Colorless evidence ledger and manual-fill rows.
- Preserved Colorless as architecture-only and non-live during this docs pass.
- Preserved artifact/function, Eldrazi/void, Wastes/desolation, and Ugin/Karn/transcendence as separate branches.
- Stopped before VM-310 parity fill, raw packets, review gates, runtime promotion, generated artifacts, schemas, route work, Maze, Home, Supabase, builders, images, and canon relocation.

## Explicit Non-Goals

- Do not create or edit `data/raw-factions/colorless/`.
- Do not edit `docs/architecture/colorless/**`.
- Do not edit `docs/research/canon/colorless/**` or normalize its current deletion/relocation state.
- Do not treat `assets/img/identity-hero/colorless.webp` as evidence, source material, or cleanup scope.
- Do not author generated artifacts, runtime support, route aliases, schemas, builders, Maze, Home, Supabase, or public dossier copy.
- Do not create new `COLORLESS-EVID-###` or `COLORLESS-MF-###` IDs.
- Do not extrapolate Commander claims beyond `Eldrazi Unbound`.

## Dependencies

- Depends on VM-308 completion.

## Acceptance Criteria

- [x] `docs/architecture/colors/colorless/` contains exactly `identity.md` and `metaphysics.md`.
- [x] The docs cite only existing VM-308 `COLORLESS-EVID-###` and `COLORLESS-MF-###` IDs.
- [x] The docs include Evidence Boundary sections that state VM-309 is architecture synthesis over VM-308 evidence, not new source intake.
- [x] VM-035 language is not copied wholesale; carried-forward concepts are mapped to VM-308 evidence or labeled as Vox Mana synthesis.
- [x] Generic mana, colorless mana, artifacts, and Colorless identity remain distinct.
- [x] Artifact/function, Eldrazi/void, Wastes/desolation, and Ugin/Karn/transcendence remain distinct.
- [x] Commander support is bounded to `Eldrazi Unbound` unless future evidence is added.
- [x] No raw, runtime, generated, schema, route, Maze, Home, Supabase, builder, image, or canon-relocation files changed.

## Files Changed

- `docs/architecture/colors/colorless/identity.md`
- `docs/architecture/colors/colorless/metaphysics.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-309-colorless-identity-and-metaphysics-docs.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-09-2136-codex-vm309-colorless-identity-metaphysics.md`

## Tests Run

- Re-ran AGENTS pre-flight review against the handoff index, relevant Colorless handoffs, the Kanban board, VM-308, VM-035, and current-standard Ink/Witch architecture examples.
- Verified `docs/architecture/colors/colorless/` did not exist before VM-309 and contains exactly `identity.md` and `metaphysics.md` after the pass.
- Verified `data/raw-factions/colorless/` does not exist and was not created.
- Verified scoped git status for `docs/architecture/colors/colorless/`, `docs/architecture/colorless/`, `docs/research/canon/colorless/`, `assets/img/identity-hero/colorless.webp`, and `data/raw-factions/colorless/`.
- Validated all cited `COLORLESS-EVID-###` and `COLORLESS-MF-###` references in the new docs against `docs/research/colorless/colorless-evidence-ledger.md`.
- Ran scoped overclaim scans for positive sixth-color framing, generic/colorless conflation, artifact/Colorless collapse, Eldrazi/Phyrexia collapse, Commander overreach, new source/evidence/manual-fill IDs, and accidental operational leakage.
- Ran scoped ASCII and trailing-whitespace scans on the new Colorless docs.
- Skipped `npm.cmd test`, `npm.cmd run test:parser`, and `npm.cmd run test:placement` because VM-309 touched only architecture docs and bookkeeping.

## Not Touched

- `docs/architecture/colorless/**`
- `docs/research/colorless/**`
- `docs/research/canon/colorless/**`
- `data/raw-factions/colorless/`
- `assets/img/identity-hero/colorless.webp`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `research/build-faction-artifacts.mjs`
- `supabase/functions/guild-recruiter/faction-context.ts`
- Generated artifacts, schemas, Maze files, Home files, route CSS/JS, runtime code

## Follow-Up Recommendations

- Start VM-310 as a separate prompt only after accepting VM-309.
- VM-310 should own parity fill: comparator identities, false-positive risks, docs-only operator separators, and same-concept no-conflation guidance.
- VM-311 should create a non-live raw packet only after VM-309/VM-310 review and only from approved evidence rows.
- Add a future relocation review if the team wants to stage or normalize the old `docs/research/canon/colorless/**` deletes.
- Record validator path drift separately before treating `research/validate-colorless-markdown.mjs` as authoritative for the current-standard path.

## Next Suggested Agent

Documentation Steward for VM-310 Colorless docs parity fill.
