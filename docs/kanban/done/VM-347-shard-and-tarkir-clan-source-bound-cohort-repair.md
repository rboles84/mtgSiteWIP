# VM-347 - Shard And Tarkir Clan Source-Bound Cohort Repair

## Status

Done

## Summary

Repair all five Alara shards and all five Tarkir clans in one source-bound pass, focused on source-role readiness, placement discrimination, Crucible resolution where locally supported, and dossier/Commander completeness where already backed by local sources.

Targets: `BANT`, `ESPER`, `GRIXIS`, `JUND`, `NAYA`, `ABZAN`, `TEMUR`, `SULTAI`, `MARDU`, `JESKAI`.

## Pre-Flight Requirements

- Re-read `AGENTS.md`, board/index state, `VM-300`, `VM-325`, `VM-343` through `VM-346`, `VM-314` through `VM-323`, and `VM-299` before edits.
- Inspect applicable local canon research under:
  - `docs/research/canon/canon-inventory-four-color-reference-audit.md`
  - `docs/research/canon/mark_rosewater_official_three_color/`
  - `docs/research/canon/misc/`
  - `docs/research/canon/source-material/`
- Use canon research only if the specific shard/clan claim is already locally captured and can be tied back into the approved source/evidence ledger or readiness matrix.
- Do not promote broad canon notes into placement/discriminator/Crucible claims unless the relevant raw source row or claim ledger supports the target identity and claim.

## Guardrails

- Use existing local sources only. No web/source intake.
- Generated/runtime surfaces are comparison targets only, never evidence.
- Do not hand-edit generated artifacts.
- Fail closed aggressively: unsupported discriminators, collisions, Commander links, enrichment fields, or Crucible pairs must be skipped and recorded in the readiness matrix.
- Placement discriminator, collision, and Crucible additions must be backed by local `claim-bearing` or placement-relevant `shaping-only` rows.
- `support-only` Commander/deck/operator sources are not valid placement evidence.
- Commander/deck/operator material may be used only as support texture for deck/research/Commander surfaces, not as lore/canon proof or placement evidence.
- Preserve unrelated dirty worktree changes. Do not stage or commit files.
- Do not execute `VM-236` Sultai runtime-copy polish inside this card.
- No route, schema, public key, Home preview, Maze route, color-code alias, or new identity changes.
- Source role vocabulary remains `claim-bearing`, `support-only`, `shaping-only`, `discovery-only`. Do not introduce any new `source_role` value.

## Scope

- Add missing `source_role` values for `BANT`, `ESPER`, and `GRIXIS`.
- Normalize nonstandard Jeskai/Mardu roles:
  - `runtime-lifecycle-only` -> `shaping-only`
  - `manual-fill` -> `support-only`
  - `excluded-from-raw-claims` -> `discovery-only`
- Add `docs/reference/shard-clan-source-readiness-matrix.md` with source-role coverage, unsupported candidates, Commander/deck support, and follow-up source-intake needs.
- Add discriminator/collision repairs only where local `claim-bearing` or placement-relevant `shaping-only` source rows support them. Candidate repair targets: `ESPER`, `GRIXIS`, `NAYA`, `ABZAN`, `TEMUR`, `SULTAI`.
- Do not modify discriminator/collision content for non-candidate identities unless validation proves the existing content is source-unsafe or broken.
- Add Crucible pairs in `research/build-faction-artifacts.mjs` only for supported close-call distinctions backed by local `claim-bearing` or placement-relevant `shaping-only` rows. Candidate pairs are not mandatory.
- Generalize raw-profile enrichment beyond Lorehold only if target-safe. Prefer cohort-scoped behavior; if unrelated generated drift is broad or source-unsafe, stop and record a follow-up card.
- Fill Mardu/Jeskai deck/research links and Commander Compass only from existing support-only Commander/operator sources.

## Candidate Crucible Pairs

- Shards: `BANT/ESPER`, `ESPER/GRIXIS`, `GRIXIS/JUND`, `JUND/NAYA`, `NAYA/BANT`
- Clans: `ABZAN/MARDU`, `ABZAN/SULTAI`, `TEMUR/SULTAI`, `TEMUR/MARDU`, `JESKAI/MARDU`, `JESKAI/SULTAI`, `JESKAI/TEMUR`

## Diff Discipline

- Before builders: capture `git status --short`, preserve dirty worktree state, and snapshot/hash target generated sections.
- After builders: inspect generated drift, confirm target changes are source-backed, document any unrelated mechanical drift, and do not hand-edit generated files to repair output.

## Acceptance Checks

- JSON parse all raw JSON files for the 10 target identities.
- Probe all source rows for missing/nonstandard `source_role`.
- Probe every new discriminator, collision, and Crucible for valid claim/source backing.
- Run:
  - `node --check research/build-faction-artifacts.mjs`
  - `npm.cmd run build:factions`
  - `npm.cmd run build:factions -- --context-targets=BANT,ESPER,GRIXIS,JUND,NAYA,ABZAN,TEMUR,SULTAI,MARDU,JESKAI`
  - `npm.cmd run validate:source-generated -- --targets=BANT,ESPER,GRIXIS,JUND,NAYA,ABZAN,TEMUR,SULTAI,MARDU,JESKAI`
  - `npm.cmd run test:source-generated`
  - `npm.cmd run test:placement`
  - `npm.cmd test`
  - `npm.cmd run test:parser`
  - `node research/archscry-dossier-followup-tests.js`
  - `node research/maze-search-tests.js`

## Closeout Requirements

The handoff must include source-role normalization summary, readiness matrix location, unsupported pairs, discriminator/collision changes, Crucible pairs added or skipped, enrichment behavior changed or deferred, Commander/deck/Compass changes or deferrals, generated drift summary, exact validation results, and follow-up cards needed.

## Closeout Summary

Closed on 2026-06-12. Source roles were normalized for Bant, Esper, Grixis, Mardu, and Jeskai; source-backed discriminator/collision repairs were added for the thin shard/clan lanes; all 12 candidate Crucible pairs were added after local backing checks; raw-profile enrichment was cohort-scoped for shards/clans; Mardu and Jeskai received support-only Commander Compass surfaces. See `docs/reference/shard-clan-source-readiness-matrix.md` and the VM-347 handoff for validation and drift details.
