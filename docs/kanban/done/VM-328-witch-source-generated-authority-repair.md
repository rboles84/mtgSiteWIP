# VM-328 - WITCH Source-Generated Authority Repair

Status: Done
Owner: Codex
Agent role: JSON Cartographer / Test Strategist
Created: 2026-06-10
Completed: 2026-06-10

## Summary

Repair active `WITCH` so VM-300 source/generated validation passes without expanding Witch authority beyond the approved VM-264 through VM-298 evidence floor.

## Pre-Flight Findings

- `VM-328*` was re-confirmed unused before card creation.
- `VM-327` remains reserved by VM-326 wording as the earliest Colorless controlled-promotion lane; this WITCH repair uses VM-328 only.
- Broad dirty worktree drift was already present across runtime, generated data, raw packets, docs, assets, Kanban, and handoff files. Preserve it.
- Baseline `npm.cmd run validate:source-generated -- --targets=WITCH` failed only on WITCH good-fit backing, poor-fit backing, and inhibitor backing.
- `witch.claims.json` and `witch.sources.json` before-repair hashes were captured and must remain unchanged unless a real metadata inconsistency is found.

## Source Authority

- VM-264 evidence ledger is the approved Witch source floor.
- VM-265 and VM-266 architecture/separator guidance may support source-normalized placement wording, but does not create new raw claims.
- VM-298 restored WITCH to exactly five approved raw claims after VM-295 generated-authoring contamination.
- VM-300 and VM-325 require generated output to be a comparison target only, never source truth.

## Trace Table

| Generated failing string | Source basis | Action |
| --- | --- | --- |
| `calculated growth without Red-style impulse` | `WITCH-EVID-003`, `WITCH-EVID-007`; VM-266 missing-Red guidance on calculated expansion and rejection of impulse. | `source-normalization`: add exact string to raw `good_fit_indicators`. |
| `knowledge optimized into long-horizon advantage` | `WITCH-EVID-007`; VM-266 Blue calculation/optimization and protected long-plan guidance. | `source-normalization`: add exact string to raw `good_fit_indicators`. |
| `ambition disciplined into planned inevitability` | `WITCH-EVID-003`, `WITCH-EVID-007`; VM-266 Black ambition plus planned/cultivated inevitability guidance. | `source-normalization`: add exact string to raw `good_fit_indicators`. |
| `generic counters or proliferate shells` | `WITCH-EVID-005`, `WITCH-EVID-007`, `WITCH-MF-012`; VM-266 generic proliferate/counters boundary. | `source-normalization`: add exact string to raw poor-fit and inhibitor backing while preserving distinct raw-only boundaries. |
| `Bant order and growth without Black ambition` | `WITCH-MF-012`; VM-266 Bant-facing boundary. | `source-normalization`: add exact string to raw poor-fit and inhibitor backing. |
| `Esper structure and control without Green cultivation` | `WITCH-MF-012`; VM-266 Esper-facing boundary plus Witch control/sterility risk language. | `source-normalization`: add exact string to raw poor-fit and inhibitor backing. |
| `Yore, Glint, Dune, or Ink three-color-overlap readings treated as Witch proof` | `WITCH-MF-012`; VM-266 Yore/Glint/Dune/Ink separator guidance as architecture-only comparison, not proof. | `source-normalization`: add exact string to raw poor-fit and inhibitor backing. |
| `Treats speed, impulse, spectacle, or emotional release as the center when patient cultivation is asking for protected, calculated growth.` | `WITCH-EVID-003`, `WITCH-EVID-007`; VM-266 Red-absence guidance on speed, impulse, spectacle, emotional release, protected cultivation, and calculated growth. | `backed-repair`: add exact string to raw inhibitor backing. |
| `The user only mentions counters, proliferate, Atraxa, infect, superfriends, or same-color grouping without the full non-Red protected-cultivation worldview.` | `WITCH-EVID-005`, `WITCH-EVID-007`, `WITCH-MF-012`; already source-bounded in raw `chatbot_guidance.avoid_when` but not counted by VM-300 inhibitor backing. | `source-normalization`: mirror exact string into VM-300-counted raw inhibitor backing. |
| `The user treats Growth, Atraxa, Breed Lethality, Witch-Maw, or same-color identity as naming authority.` | `WITCH-EVID-004`, `WITCH-EVID-005`, `WITCH-EVID-010`; already source-bounded in raw `chatbot_guidance.avoid_when` but not counted by VM-300 inhibitor backing. | `source-normalization`: mirror exact string into VM-300-counted raw inhibitor backing. |
| `The user centers impulse, spectacle, haste, emotional release, or living in the moment as the thing that should lead the answer.` | `WITCH-EVID-003`, `WITCH-EVID-007`; already source-bounded in raw `chatbot_guidance.avoid_when` but not counted by VM-300 inhibitor backing. | `source-normalization`: mirror exact string into VM-300-counted raw inhibitor backing. |

## Scope

- Update only source-backed WITCH raw placement/profile/changelog metadata and regenerated WITCH-attributable placement output.
- Keep `claim_count: 5`.
- Add no WITCH evidence IDs or claim IDs.
- Do not edit `witch.claims.json` or `witch.sources.json` unless a real metadata inconsistency is discovered.
- Do not touch WUBRG, Colorless, mono colors, public aliases/routes, Home preview, hero assets, unrelated generated drift, or the known Sultai dossier phrase residual.

## Acceptance Criteria

- [x] `npm.cmd run validate:source-generated -- --targets=WITCH` passes with 0 WITCH warnings.
- [x] `npm.cmd run validate:source-generated -- --targets=YORE,DUNE,GLINT,INK,WITCH` passes.
- [x] `npm.cmd run test:source-generated -- --all` passes with existing model-owned warnings and no WITCH warning.
- [x] `npm.cmd run test:placement`, `npm.cmd test`, `npm.cmd run test:parser`, `node research\archscry-dossier-followup-tests.js`, and `node research\maze-search-tests.js` pass.
- [x] `witch.claims.json` and `witch.sources.json` hashes remain unchanged.

## Implementation Results

- Updated `witch.placement.json` with exact source-backed WITCH good-fit, poor-fit, biological-prior, and avoid/mismatch inhibitor strings counted by VM-300 validation.
- Updated `witch.profile.json` to profile version `0.1.2`, source review date `2026-06-10`, and VM-328 source-authority status while preserving `claim_count: 5`.
- Updated `witch.changelog.json` to repair stale non-live audit summary fields and record the VM-328 live-after-VM-269 authority repair.
- Ran `npm.cmd run build:factions`.
- Accepted only the WITCH object delta in `data/placement-model.json`; schema and Supabase context stayed byte-identical to the pre-build snapshot.

## Tests Run

- Expected baseline fail: `npm.cmd run validate:source-generated -- --targets=WITCH` before edits.
- Pass: raw WITCH JSON parse for placement/profile/changelog.
- Pass: `npm.cmd run build:factions`.
- Pass: `npm.cmd run validate:source-generated -- --targets=WITCH`.
- Pass: `npm.cmd run validate:source-generated -- --targets=YORE,DUNE,GLINT,INK,WITCH`.
- Pass with 26 existing model-owned warnings and no WITCH warning: `npm.cmd run test:source-generated -- --all`.
- Pass: `npm.cmd run test:placement`.
- Pass: `npm.cmd test`.
- Pass: `npm.cmd run test:parser`.
- Pass: `node research\archscry-dossier-followup-tests.js`.
- Pass: `node research\maze-search-tests.js`.

## Not Touched

- `witch.claims.json`
- `witch.sources.json`
- WUBRG
- Colorless
- Mono colors
- Public aliases/routes
- Home preview
- Hero assets
- Sultai dossier residuals
- Unrelated generated, runtime, Supabase, docs, and asset drift
