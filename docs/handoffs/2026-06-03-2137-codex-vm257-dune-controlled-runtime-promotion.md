# Agent Handoff

- Agent name: Codex
- Task requested: Implement VM-257 Dune controlled runtime promotion so exactly one live key, `DUNE`, becomes active through the existing four-color identity registry and generated surfaces while preserving metadata-only `BRGW`, keeping raw Dune JSON byte-stable, adding no route-specific files, leaving Home preview unchanged, and keeping Dune outside the current identity-hero rollout.

## Pre-Flight Summary

Recent related work:

- VM-252 normalized the Dune source packet and evidence ledger.
- VM-253 created docs-only Dune identity and metaphysics architecture.
- VM-254 expanded Dune docs parity with separators, overlaps, false-positive boundaries, and descriptive placement guidance.
- VM-255 created the five-file non-live Dune raw packet.
- VM-256 reviewed that packet, recorded `review-approved-for-future-promotion-planning`, and approved technical aggregate `core_color: "BRGW"` for VM-257 only.
- VM-245 Yore and VM-251 Glint provided the direct four-color live-promotion precedent.

Current known risks:

- Four-color canon remains thin, so support-texture overreach is still a live-copy risk.
- `Aggression` alias leakage remains the primary naming hazard because paired-name precedent exists in live surfaces.
- `BRGW`, `WBRG`, and all same-color permutations must remain technical/query-only despite live promotion.
- The Dune packet still carries unresolved `DUNE-MF-011` / `DUNE-MF-012` research drift outside VM-257 scope.
- The shared worktree remains broadly dirty with unrelated runtime, docs, assets, generated files, and additional lane work.
- A route-specific `/dune/` surface was not pre-approved by VM-256 and required a hard stop if safe generic dossier-route precedent could not be proven.

Relevant decisions already made:

- Promote exactly one live/public key: `DUNE`.
- Keep `Aggression` paired-framing support text only, never a public alias, route, placement key, preview key, or expression key.
- Keep `BRGW` technical-only as the approved aggregate `core_color`.
- Keep Dune outside Home preview.
- Keep Dune outside the current identity-hero rollout.
- Do not mutate `data/raw-factions/dune/*.json`, `docs/research/dune/**`, or `docs/architecture/colors/dune/**`.
- Do not add route-specific files if generic dossier-route precedent cannot be safely proven.

Files recently changed:

- `data/raw-factions/dune/dune.sources.json`
- `data/raw-factions/dune/dune.claims.json`
- `data/raw-factions/dune/dune.profile.json`
- `data/raw-factions/dune/dune.placement.json`
- `data/raw-factions/dune/dune.changelog.json`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- Broad unrelated dirty runtime, docs, asset, research, and generated files elsewhere in the worktree

What should not be touched:

- `data/raw-factions/dune/**`
- `docs/research/dune/**`
- `docs/architecture/colors/dune/**`
- Home preview membership logic
- identity-hero assets or Dune hero mapping
- route-specific Dune files
- schema files
- Maze files
- unrelated Glint, Yore, Ink, Witch, or other dirty worktree changes

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-2343-codex-vm240-269-four-color-lane-reservation-only.md`
- `docs/handoffs/2026-06-03-0655-codex-vm252-dune-source-packet.md`
- `docs/handoffs/2026-06-03-0736-codex-vm253-dune-identity-metaphysics.md`
- `docs/handoffs/2026-06-03-1226-codex-vm254-dune-docs-parity-fill.md`
- `docs/handoffs/2026-06-03-1700-codex-vm255-dune-non-live-raw-packet.md`
- `docs/handoffs/2026-06-03-1920-codex-vm256-dune-review-gate.md`
- `docs/handoffs/2026-06-02-2211-codex-vm245-yore-controlled-runtime-promotion.md`
- `docs/handoffs/2026-06-03-1240-codex-vm251-glint-controlled-runtime-promotion.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-257-dune-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-256-dune-review-gate.md`
- `docs/architecture/route-ownership-matrix.md`
- `data/identity-layers.json`
- `data/raw-factions/dune/dune.sources.json`
- `data/raw-factions/dune/dune.claims.json`
- `data/raw-factions/dune/dune.profile.json`
- `data/raw-factions/dune/dune.placement.json`
- `data/raw-factions/dune/dune.changelog.json`
- `research/build-faction-artifacts.mjs`
- `research/build-archscry-flavor-snippets.mjs`
- `assets/js/commander-dossier.js`
- `assets/js/archscry-presentation.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `data/factions.json`
- `data/placement-model.json`
- `data/archscry-flavor-snippets.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/research/dune/dune-brood-research-packet.html`

## Files Changed

- `data/identity-layers.json`
- `research/build-faction-artifacts.mjs`
- `assets/js/commander-dossier.js`
- `assets/js/archscry-presentation.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `data/factions.json`
- `data/placement-model.json`
- `data/archscry-flavor-snippets.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/kanban/done/VM-257-dune-controlled-runtime-promotion.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-03-2137-codex-vm257-dune-controlled-runtime-promotion.md`

## What Changed

- Added a live `DUNE` expression to `data/identity-layers.json` with four-color runtime metadata, technical aggregate `core_color: "BRGW"`, `aliases: ["DUNE"]`, `routing.label: "Dune"`, `routing.color_identity: "BRGW"`, `routing.suppress_directory_links: true`, and `preview_eligible: false`.
- Used the same paired-name live-field precedent as Yore and Glint, so the live expression name is `Dune / Aggression` while still keeping `Aggression` non-public everywhere else.
- Extended `research/build-faction-artifacts.mjs` so `dune -> DUNE` becomes a live generated faction and placement record on the same four-color path as Yore and Glint.
- Added Dune live placement copy, lateral inhibition targets, gate answers, and hall questions in the builder.
- Fixed a builder fallback so newly promoted four-color keys can inherit identity-layer display copy into generated placement/faction surfaces without blank summaries or stale raw-review taglines.
- Added Dune live Commander/dossier guardrails in `assets/js/commander-dossier.js`.
- Fixed Archidekt deck-search color routing so Dune preserves technical `BRGW` metadata instead of falling back to generic `WBRG` ordering.
- Added Dune presentation-layer copy in `assets/js/archscry-presentation.js`.
- Expanded focused runtime coverage in `assets/js/quick-reading-tests.js` and `research/archscry-dossier-followup-tests.js` for:
  - live `DUNE` registry presence
  - `BRGW` permutation suppression
  - Home preview exclusion
  - no Commander directory links
  - no identity-hero rollout
  - generated faction / placement / flavor / Supabase presence
- Rebuilt approved generated outputs only through:
  - `npm.cmd run build:factions`
  - `node research\build-archscry-flavor-snippets.mjs`
- Moved VM-257 from Backlog to Done, updated the board, and updated the handoff index.

## Why It Changed

VM-256 approved Dune for future live-promotion planning only. VM-257 needed to turn that planning approval into one live/runtime key, `DUNE`, without promoting `Aggression`, `BRGW`, `WBRG`, or any same-color permutation into public naming or route space, while keeping raw/docs surfaces immutable and preserving the four-color runtime boundaries established by Yore and Glint.

## Decisions Made

- Promoted exactly one live/public key: `DUNE`.
- Kept `Aggression` as paired-framing support text only, not a public alias.
- Kept `BRGW` as technical aggregate metadata only.
- Used paired-name precedent in `data/identity-layers.json` because Yore and Glint already use the same live field family.
- Used `routing.label: "Dune"` because the same directory-suppressed human-readable label field already exists for Yore and Glint.
- Kept `routing.color_identity: "BRGW"` only as technical metadata, not a public route or alias.
- Added no route-specific Dune files and did not approve a dedicated `/dune/` route in this pass.
- Kept Dune outside Home preview.
- Kept Dune outside the identity-hero rollout.
- Left all five Dune raw JSON files byte-stable.

## Baseline And Delta

- Before promotion: identity 32, factions 32, placement 32, Archscry flavor snippets 32, Home preview 20.
- After promotion: identity 33, factions 33, placement 33, Archscry flavor snippets 33, Home preview 20.
- Supabase generated context gained exactly one new live key: `DUNE`.

## Raw Hash Confirmation

The five Dune raw JSON files remained byte-stable and matched the VM-256 approved hashes:

- `dune.changelog.json`: `1706F08BF84B97DF22CEF16E5A9AEF92C2B4705DF86D40AF117FD4C806B84D1B`
- `dune.claims.json`: `496A4F15AD0CDB5818F989053A431C6A30F6404DEA8A953B833E0EB0E2600D13`
- `dune.placement.json`: `55D829041F6A8895F1DE1E41CDEFF34D861C322A82F413D3D9FD5C9E257D8BF3`
- `dune.profile.json`: `F941A22FAF218871645FF87DBF272C2739C5568449070D8D8D532C9D8B76865E`
- `dune.sources.json`: `F1466612A762BC19A4BFD35F29BDBCE4883DB6CC6A52CA1FEAAF39457E5B4853`

The preserved discovery HTML draft also remained unchanged:

- `docs/research/dune/dune-brood-research-packet.html`: `0B6608291A864EC0A2DCEC8B82BB13FCF4B3863D0716847312DC6C985E36B8F7`

## Risks / Uncertainties

- The worktree remains broadly dirty with unrelated files and promotions.
- The shared suite still reports one unrelated adaptive-placement regression: `Golden path for QUANDRIX should win QUANDRIX, got U`.
- A targeted trace showed the failing QUANDRIX golden path does not ask the new Dune gate or hall questions, so the failure was recorded as shared/unrelated rather than a Dune-specific promotion blocker.
- Generic dossier-route precedent was not independently proven strongly enough to approve a dedicated `/dune/` route, so VM-257 left route-specific files untouched.
- Future QA should still manually inspect Dune dossier presentation and deck-search behavior in-browser.

## Tests Run

- `node --check research\build-faction-artifacts.mjs`
- `node --check assets\js\commander-dossier.js`
- `node --check assets\js\archscry-presentation.js`
- `node --check assets\js\quick-reading-tests.js`
- `node --check research\archscry-dossier-followup-tests.js`
- `npm.cmd run build:factions`
- `node research\build-archscry-flavor-snippets.mjs`
- `npm.cmd run test:presentation-snapshots`
- `node research\archscry-dossier-followup-tests.js`
- `npm.cmd run audit:factions`
- `npm.cmd run test:placement` failed on unrelated QUANDRIX golden-path assertion
- `npm.cmd test` failed on the same unrelated QUANDRIX golden-path assertion
- Focused raw-hash, count-delta, preview, alias, permutation, no-route, no-hero, and generated-surface scans

## Not Touched

- `data/raw-factions/dune/**`
- `docs/research/dune/**`
- `docs/architecture/colors/dune/**`
- `research/build-archscry-flavor-snippets.mjs` content
- Home preview membership logic
- identity-hero assets or Dune hero mapping
- route-specific Dune files
- Maze files
- schema files
- unrelated Yore, Glint, Ink, Witch, and other dirty worktree surfaces

## Follow-Up Recommendations

- Run manual Archscry UI QA for the live Dune dossier, starting-lane copy, and deck-search links to confirm the technical `BRGW` metadata stays invisible to visitors.
- Treat the QUANDRIX golden-path failure as a separate shared placement/debug task rather than widening VM-257.
- If a future Dune route is desired, plan it as a dedicated follow-up only after proving safe generic dossier-route precedent.

## Next Suggested Agent

- Test Strategist or Documentation Steward for live Dune manual QA and any bounded follow-up documentation around the shared QUANDRIX test failure.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-257-dune-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-256-dune-review-gate.md`
- `docs/handoffs/2026-06-03-1920-codex-vm256-dune-review-gate.md`
- `docs/handoffs/2026-06-03-1240-codex-vm251-glint-controlled-runtime-promotion.md`
- `docs/handoffs/2026-06-02-2211-codex-vm245-yore-controlled-runtime-promotion.md`
- `docs/architecture/route-ownership-matrix.md`
