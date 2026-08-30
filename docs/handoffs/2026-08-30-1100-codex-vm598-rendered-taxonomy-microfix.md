# VM-598 Final Owner Review Micro-Fix — Rendered Taxonomy

## Agent name

Codex

## Task requested

Remove the unapproved fourth Lorehold primary lane from actual rendered Start Here composition, protect the accepted taxonomy against source-to-render drift, and stop at Owner Review.

## Files reviewed

- VM-598 card and both recent VM-598 handoffs
- `assets/js/archscry/dossier/reading.js`, foundation guidance, Lorehold dossier source/catalog, faction projection, runtime Start Here renderer, existing Lorehold/Temur tests, and VM-551 replay path

## Files changed

- `assets/js/archscry/dossier/reading.js`
- `tests/archscry/lorehold-semantic-repair-tests.js`
- `docs/kanban/in-progress/VM-598-lorehold-semantic-integrity-repair.md`
- this handoff and `docs/handoffs/HANDOFF_INDEX.md`

## Root cause and exact fix

`buildCommanderStartingLane` selected curated `starterDirections`, then unconditionally appended legacy faction archetypes and clipped the result to four. Lorehold's legacy `Spirit Tribal` archetype therefore survived as a fourth rendered primary direction.

The composer now uses only curated `starterDirections` when they exist. It still uses tag/archetype fallback composition for identities without curated directions. No renderer hiding, Lorehold-only exception, precon relationship, or semantic architecture change was made.

## Rendered proof

The owner-facing Start Here composer now emits:

`Explore Spirit Witnesses / Graveyard-Leaves, Relic Reconstruction, History & Spells.`

What to Look For uses the same three titles. `Spirit Tribal`, `Boros Artifacts`, and generic `Graveyard` are absent from the primary set.

## Regression protection

The focused Lorehold regression now builds the real Start Here commander-lane composition, parses its `Possible directions` output, compares its set to the accepted three-lane contract and What to Look For, and rejects the three prohibited generic lanes. Native precon ordering assertions remain unchanged.

## RobDev compact packet

- Authority/producer: owner-locked VM-598 taxonomy; `COMMANDER_FACTION_GUIDANCE` is the curated direction owner; `buildCommanderStartingLane` is the actual Start Here composer.
- Changed behavior: curated directions are no longer mixed with legacy archetypes in rendered Start Here.
- Protected behavior: fallback composition for identities without curated directions; Native/Exact/Stretch logic; all Lorehold semantics; shared VM-595 P3 wording; placement/routing/evidence.
- Non-goals: research, architecture revision, shared precon copy, renderer hiding, commits, and pushes.

## RobQA readiness

- QA-1 visible composition correction with QA-2-like composer coverage.
- PASS: `node --check assets/js/archscry/dossier/reading.js`; `node tests/archscry/lorehold-semantic-repair-tests.js`; `npm.cmd run test:identity-dossier-content`; `node scripts/validate/validate-source-generated-guardrails.mjs --targets=LOREHOLD` (one inherited model-owned inhibitor warning); desktop/mobile engine-only LOREHOLD replay; scoped Lorehold language check; `git diff --check`.
- Not rerun: precon regression, because this micro-fix does not touch precon inputs, catalog, relationships, or the recommender.
- Full browser replay remains outside this correction and retains its previously recorded shared blockers; no attempt was made to compensate for them.

## Pending SIRF enhancement register

Recorded only: **Accepted-decision-to-render contract drift.** An approved semantic taxonomy may exist in cards, handoffs, source, and catalogs while a downstream composer renders a non-approved lane. Future RobQA should compare accepted taxonomy/recommendation contracts directly with actual rendered sets.

## Risks / uncertainties

The fix intentionally affects every identity with curated `starterDirections`, preventing those curated taxonomies from being contaminated by legacy archetypes. Identities without curated directions retain the prior fallback. Shared precon process language remains deferred to VM-595/SIRF ownership.

## Not touched

Native/Exact/Stretch logic; precon source/catalog; shared precon composer; Lorehold claim/placement architecture; runtime renderer; generated data; commits; remote state.

## Next suggested agent

Owner reviewer.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/VM-598-lorehold-semantic-integrity-repair.md`
- `docs/handoffs/2026-08-30-1040-codex-vm598-owner-review-repair.md`
