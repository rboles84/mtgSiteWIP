# VM-310 - Colorless Docs Parity Fill

ID: VM-310
Title: Colorless Docs Parity Fill
Status: done
Type: Documentation / Parity
Area: Colorless, Architecture
Priority: high
Created: 2026-06-09
Completed: 2026-06-09

## Summary

Fill the Colorless docs parity layer by expanding the current-standard architecture docs with concept-boundary separators, Commander/support anchors, false-positive risks, editorial identity signals, and research/search planning themes while preserving VM-308 as the evidence floor and VM-309 as the core architecture floor.

## Scope Completed

- Updated `docs/architecture/colors/colorless/identity.md` only.
- Updated `docs/architecture/colors/colorless/metaphysics.md` only.
- Added concept-boundary parity instead of a present-color pair matrix.
- Added near-match separators for five-color/WUBRG, mono-color, generic mana costs, colorless mana requirements, Colorless identity, artifacts/colored artifacts, Eldrazi, Wastes, Ugin/Karn, Phyrexia, Devoid, and Commander support.
- Added Commander/support anchors that keep `Eldrazi Unbound` support-only and keep `Eldrazi Incursion` comparator-only.
- Added false-positive risks and docs-only research/search planning themes.
- Preserved Colorless as architecture-only and non-live.

## Explicit Non-Goals

- Do not create new `COLORLESS-EVID-###` or `COLORLESS-MF-###` IDs.
- Do not edit `docs/research/colorless/**`.
- Do not edit `docs/architecture/colorless/**`.
- Do not edit or normalize `docs/research/canon/colorless/**`.
- Do not edit, inspect as evidence, clean up, or relocate `assets/img/identity-hero/colorless.webp`.
- Do not create or edit `data/raw-factions/colorless/`.
- Do not author generated artifacts, runtime support, route aliases, schemas, builders, Maze, Home, Supabase, query-builder rules, scoring logic, placement logic, or public dossier copy.

## Dependencies

- Depends on VM-308 and VM-309 completion.

## Acceptance Criteria

- [x] `docs/architecture/colors/colorless/` contains exactly `identity.md` and `metaphysics.md`.
- [x] `data/raw-factions/colorless/` remains absent.
- [x] The docs cite only existing VM-308 `COLORLESS-EVID-###` and `COLORLESS-MF-###` IDs.
- [x] VM-310 parity prose is labeled architecture guidance and does not authorize raw claims without VM-308 evidence.
- [x] Generic mana costs, colorless mana requirements, Colorless identity, and artifacts remain distinct.
- [x] Colorless is framed as outside/orthogonal, not superior to or complete mastery of WUBRG.
- [x] No raw, runtime, generated, schema, route, Maze, Home, Supabase, builder, image, research, or canon-relocation files changed.

## Files Changed

- `docs/architecture/colors/colorless/identity.md`
- `docs/architecture/colors/colorless/metaphysics.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-310-colorless-docs-parity-fill.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-09-2213-codex-vm310-colorless-docs-parity.md`

## Tests Run

- Re-ran AGENTS pre-flight review against the handoff index, Kanban board, VM-308 and VM-309 cards/handoffs, current Colorless architecture docs, and VM-254/VM-260/VM-266 parity precedents.
- Verified `docs/architecture/colors/colorless/` contains exactly `identity.md` and `metaphysics.md`.
- Verified `data/raw-factions/colorless/` remains absent.
- Verified scoped git status for Colorless architecture, old architecture, Colorless research, old canon path, Colorless hero image, and raw Colorless path.
- Validated all cited `COLORLESS-EVID-###` and `COLORLESS-MF-###` references in the new docs against `docs/research/colorless/colorless-evidence-ledger.md`.
- Ran required-heading scans for VM-310 parity sections.
- Ran scoped scans for new source/evidence/manual-fill IDs.
- Ran scoped overclaim scans for sixth-color framing, generic/colorless conflation, artifact collapse, Eldrazi/Phyrexia collapse, Commander overreach, Wastes overreach, support-only source overreach, and superiority/completion language.
- Ran scoped forbidden-drift scans for raw packet, review gate, runtime promotion, generated artifacts, schemas, route aliases, Maze, Home, Supabase, scores, thresholds, quiz logic, query-builder language, and placement logic.
- Ran scoped ASCII and trailing-whitespace scans on touched VM-310 docs and bookkeeping.
- Ran scoped `git diff --check` on tracked VM-310 bookkeeping files.
- Skipped `npm.cmd test`, `npm.cmd run test:parser`, and `npm.cmd run test:placement` because VM-310 touched only architecture docs and bookkeeping.

## Not Touched

- `docs/research/colorless/**`
- `docs/architecture/colorless/**`
- `docs/research/canon/colorless/**`
- `data/raw-factions/colorless/`
- `assets/img/identity-hero/colorless.webp`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `research/build-faction-artifacts.mjs`
- `research/validate-colorless-markdown.mjs`
- `docs/reference/colorless-identity-metaphysics-markdown-schema.md`
- `supabase/functions/guild-recruiter/faction-context.ts`
- Generated artifacts, schemas, Maze files, Home files, route CSS/JS, runtime code

## Follow-Up Recommendations

- VM-311 should create a non-live Colorless raw packet only after accepting VM-310.
- VM-311 should use VM-308 evidence rows as source authority and treat VM-310 separator prose as architecture guidance only.
- Preserve `Eldrazi Unbound` as support-only unless official Commander product evidence is added.
- Keep the canon relocation/deletion unresolved until a future relocation card proves replacement mapping.
- Keep validator path drift separate; `research/validate-colorless-markdown.mjs` still targets the old VM-035 path.

## Next Suggested Agent

JSON Cartographer for VM-311 Colorless non-live raw packet, with Documentation Steward review before any raw packet closeout.
