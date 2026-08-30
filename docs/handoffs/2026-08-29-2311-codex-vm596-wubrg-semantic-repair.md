# VM-596 WUBRG Semantic Repair — Owner Review Handoff

Agent name: Codex

Task requested: Reconcile the completed internal WUBRG audit with the owner-supplied external evidence audit, repair provenance and public Five-Color semantics through the real source-to-render path, regenerate owned artifacts, validate desktop/mobile output and representative neighbors, and stop before commit or push at Owner Review.

Status: Owner Review Ready — uncommitted candidate

Related Kanban card: `docs/kanban/in-progress/VM-596-wubrg-semantic-repair.md`

## Files Reviewed

- Repo governance: `AGENTS.md`, RobDev/RobQA skills and frozen passes, token/reasoning policy, CRIT-001 drift-control template, current Kanban board, handoff index, VM-538 recovery/certification records, and recent VM-538/VM-551/VM-595 handoffs.
- Owner inputs: the operative pasted implementation request and `WUBRG External Evidence Audit.md`.
- WUBRG authority: raw claims, sources, profile, Placement packet, semantic fixtures/provenance, identity layer, generated faction/placement/context artifacts, dossier source/catalog/schema, Archscry presentation/foundation/runtime composers, and focused/broad tests.

## Files Changed

- Governance/research: VM-596 card, drift-control record, WUBRG research README, preserved external audit, board, handoff index, and this handoff.
- Authored semantic sources: `data/raw-factions/wubrg/wubrg.profile.json`, `data/identity-layers.json`, and `data/dossier/identity-dossier-content.source.json`.
- Producers/contracts: `scripts/build/build-faction-artifacts.mjs`, new dossier catalog builder, `docs/reference/data-contracts.md`, and package scripts.
- Runtime presentation: WUBRG entries and public label composition in Archscry presentation, dossier foundation/reading, runtime data/state, and removal of two WUBRG semantic substitutions from render utilities.
- Generated artifacts: dossier catalog, faction display data, placement display projection, Supabase faction context, and semantic-readiness provenance. The placement schema was rebuilt but is content-unchanged.
- Tests: focused WUBRG semantic repair coverage plus corrected WUBRG expectations in existing dossier integrity, followup, and live UI replay scripts.

## What Changed

- Established the public floor: Five-Color means White, Blue, Black, Red, and Green are available; the commander, tribe, mechanic, theme, toolbox, or payoff determines why they are together.
- Made philosophy, role, opponent reading, emotional pressure, lore role, and table experience explicitly conditional rather than identity-wide doctrine.
- Preserved integration, coalition, synthesis, and Full-Spectrum Integrator as optional Vox Mana interpretation/archetype material.
- Classified mechanics as direct/defining, direct/strong, strongly associated, compatible/nonexclusive, situational, infrastructure, and supportive/not defining; explicitly separated fixing from ramp.
- Replaced circular WUBRG dossier locators into generated `data/factions.json` with raw-profile semantic-model locators.
- Added a deterministic 37-record source-to-catalog producer with copy-hash, approval, WUBRG provenance, optionality, and relationship-class checks.
- Corrected the faction builder's WUBRG merge boundary so canonical identity-layer display fields replace stale generated display content.
- Changed the public Archscry hero label to `Five-Color` while retaining `WUBRG` as the technical key/code.

## Why It Changed

The prior source-to-render path treated one Vox Mana integrator synthesis as the universal Five-Color identity, blurred mechanic relationship strengths, used a generated artifact as supposed upstream evidence, and contained renderer substitutions that removed qualification. The repair keeps useful deckbuilding guidance while preventing product copy from claiming a single philosophy or play pattern for every Five-Color deck.

## Decisions Made

- The owner-supplied external audit is retained as research history and shaping context only. Its evidence ledger has no primary-source URLs or locators, so it cannot promote new claims.
- The eight certified WUBRG claim statements and all Placement behavior remain frozen.
- `Full-Spectrum Integrator` remains visible as one of exactly four exploration directions, explicitly marked as an optional Vox Mana archetype.
- The public label is `Five-Color`; `WUBRG` remains available as technical/internal metadata.
- This is an uncommitted post-certification remediation candidate, not a new CRIT-001 certification state.

## RobDevPass Transfer Packet

- Product outcome: a useful Five-Color dossier that communicates all-five access, contextual purpose, optional interpretive archetypes, and qualified mechanics.
- Owning authority: certified raw claims plus the WUBRG raw profile/identity-layer presentation inputs and approved dossier source; producers project those sources into runtime catalogs.
- Changed behavior: WUBRG-only public semantics, label composition, dossier provenance, source-to-catalog production, and WUBRG display merge ownership.
- Protected behavior: all non-WUBRG identities; eight certified WUBRG claims; Placement/scoring/questions/calibration/candidate formation; routing/aliases/preview order/scores; Card Signals/precons/recommendations; telemetry/persistence; VM-595 files.
- Consumers: Home preview copy, generated faction and placement display text, Archscry hero, Start Here, Test the Fit, What to Look For, How This Plays, summaries, and review replays.
- Risks: raw-profile changes invalidate byte identity with the prior certified tree; future certification requires a separately authorized exact-SHA workflow. Shared VM-551 broad scripts contain inherited stale source-pattern assertions.
- Non-goals: no new external claims, Placement change, all-37 prose cleanup, generic dossier redesign, commit, push, deployment, or owner acceptance.

## RobQA Readiness

- Risk class: QA-3 protected semantic/presentation repair.
- Changed behavior verified: Five-Color public label/anchor; conditional six-field dossier; raw-source What to Look For; optional Integrator; seven mechanic relationship classes; exactly four exploration directions; no semantic renderer strengthening.
- Protected contracts verified: raw claims and Placement files have no diff; WUBRG colors, secondary colors, core code, routing, aliases, placement eligibility, preview eligibility/order/scores are byte-equivalent by field; adaptive Placement still passes all 37 golden paths.
- Deterministic tests: all focused/source-generated/semantic-readiness/placement/lint checks listed below pass.
- Rendered self-QA: 1440×1000 and 390×844 WUBRG views show the intended hero, Start Here, Test the Fit, and How This Plays content without overflow or console errors; White, Azorius, Jund, and Colorless desktop neighbors remain visually coherent with zero console errors.
- Owner review remains: judge whether the copy is useful and appropriately contextual, whether Integrator optionality is visible enough, whether the mechanic taxonomy reads naturally, and whether the four exploration directions are the desired balance.

## Tests Run

- PASS `npm.cmd run build:identity-dossier-content`
- PASS `npm.cmd run build:factions`
- PASS `npm.cmd run test:wubrg-semantic-repair`
- PASS `npm.cmd run test:identity-dossier-content`
- PASS `npm.cmd run test:source-generated`
- PASS `npm.cmd run test:semantic-readiness`
- PASS `npm.cmd run test:placement` — 37 factions / 37 golden paths
- PASS `npm.cmd run lint:js`
- PASS `node scripts/vm551-all-37-live-ui-replay.mjs --viewport=desktop --identity=WUBRG --engine-only`
- PASS `node scripts/vm551-all-37-live-ui-replay.mjs --viewport=mobile --identity=WUBRG --engine-only`
- PASS rendered in-app browser QA: WUBRG desktop/mobile and White/Azorius/Jund/Colorless desktop neighbors, zero console errors
- PASS `git diff --check`
- PASS protected-file and protected-field comparisons
- INHERITED broad-suite stops: `scripts/vm551-dossier-content-integrity-tests.mjs` stops at the unrelated missing `educationalTermAllocation.has(help.recordId)` source pattern; `tests/archscry/archscry-dossier-followup-tests.js` stops at the unrelated missing complete-atlas source pattern. Both patterns are absent at `HEAD` and current; their WUBRG-specific expectations were updated, and VM-596 focused coverage passes.

## Risks / Uncertainties

- The prior exact WUBRG certification remains the last certified state; this working tree has no candidate commit or exact-SHA review because the owner explicitly prohibited commit/push.
- The external evidence audit's conclusions are useful, but its blank Source column prevents promotion into the governed source ledger without underlying primary-source locators.
- The current working tree also contains unrelated VM-595 Owner Review work. Shared `package.json`, board, and handoff-index edits are additive; VM-595 content was preserved.

## Not Touched

- Raw WUBRG claim statements, raw Placement, semantic fixture, Gate/Hall/Crucible questions, scoring, calibration, candidate formation, color/route/alias/preview contracts, Card Signals, precon facts/order, Scryfall evidence, telemetry, persistence, deployment, branches, commits, and remote state.
- All unrelated VM-595 research outputs and every non-WUBRG identity's authored semantics.

## Follow-Up Recommendations

1. Owner reviews the five judgment points listed in the VM-596 card/handoff.
2. If accepted, authorize a separate exact-SHA review/certification/integration workflow appropriate to the post-CRIT raw-profile change.
3. Address the inherited VM-551 broad source-pattern test drift as a separate scoped maintenance task; do not fold it into WUBRG semantic acceptance.

Next suggested agent: Owner review first; after acceptance, a fresh independent RobQA/certification agent on an exact candidate SHA.
