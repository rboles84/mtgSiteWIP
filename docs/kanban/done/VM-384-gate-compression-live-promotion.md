# VM-384 - Gate Compression Live Promotion

ID: VM-384
Title: Gate Compression Live Promotion
Status: done
Type: Placement builder/runtime promotion
Area: Archscry / Gate / Adaptive Placement
Priority: high
Created: 2026-06-14

## Summary

Promote the compressed four-question WUBRG-first Gate from accepted preview to the default Archscry quick-reading Gate through the builder, not through runtime override. Preserve `Gate -> Hall -> Crucible`, keep Hall/Crucible faction-specific, and keep `data/placement-model.json` as generated output only.

## Scope

- Define a builder-owned Gate compression source file under `data/placement/`.
- Generate the live Gate from that source through `research/build-faction-artifacts.mjs`.
- Retire the VM-383 runtime preview override and stale preview references.
- Regenerate placement artifacts only through the builder.
- Add hard live Gate skew/special-channel validation with stable reports.
- Verify the local default Archscry route opens compact Gate I without a preview flag.

## Out Of Scope

- No Home route, alias, public schema/API, lore/source claims, commander facts, or hand edits to generated JSON.
- No Hall/Crucible redesign.
- No staging or commit unless explicitly instructed.

## Acceptance Criteria

- [x] `VM-384` is confirmed unused before card creation.
- [x] Builder-owned source exists at `data/placement/gate-compression.source.json`.
- [x] Source contains Gate copy, `color_loadings`, neutral/special-channel markers, and metadata only.
- [x] Source does not contain generated `likelihoods`, generated `suppresses`, generated score evidence, preview-transform fields, or runtime override fields.
- [x] Generated placement model has exactly four Gate questions with four to five answers each.
- [x] Default Archscry no longer uses the old 19-answer Gate I.
- [x] VM-383 preview runtime override is retired.
- [x] `COLORLESS` requires `outside_wubrg`; `WUBRG` requires integration/evenness.
- [x] Live Gate bias report writes `.md` and `.json` before threshold failures.
- [x] Gate-only skew caps are enforced as hard test failures.
- [x] Same-color duplicate groups remain distinct and Hall/Crucible-resolved.
- [x] Builder regeneration does not introduce unrelated generated diffs outside expected placement artifacts.

## Validation Checklist

- [x] `npm.cmd run build:factions`
- [x] `npm.cmd run test:gate-live-bias`
- [x] `npm.cmd run test:placement`
- [x] `npm.cmd run test:gate-compression`
- [x] `npm.cmd test`
- [x] `npm.cmd run test:parser`
- [x] Local browser check of default `archscry/`

## Completion Notes

- Live Gate bias report passed with 625 paths, 29 distinct rank-one winners, max rank-one faction `B` at 94 paths, `WU` at 10 paths, and no `COLORLESS`/`WUBRG` leakage.
- Local browser check on `http://127.0.0.1:4173/archscry/` confirmed the default quick reading opens compact Gate I with five answers and no preview flag.
- No unrelated generated diffs remained after filtering VM-384 placement metadata out of generated Supabase context.
