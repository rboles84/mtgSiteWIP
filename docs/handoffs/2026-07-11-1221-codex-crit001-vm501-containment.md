# 2026-07-11 12:21 — Codex — CRIT-001 / VM-501 Containment

## Agent Name

Codex

## Task Requested

Establish CRIT-001 as Vox Mana's first semantic-readiness showstopper, preserve unrelated dirty work, create the shared recovery program, and begin VM-501 without altering faction semantics or runtime calibration.

## Preflight and Collision Result

- Original branch: `main`
- Original SHA: `bbd9702a9aa429aac3c7b139fb01303898ac88d3`
- VM-501 through VM-538 collision scan: no repository, branch, or Git-history collisions found.
- VM-500 remains retired after its rolled-back historical allocation.
- Clean sibling worktree branch: `codex/crit001-semantic-readiness`

## Preserved Dirty-Tree Evidence

Tracked working-file SHA-256:

- `docs/handoffs/HANDOFF_INDEX.md`: `734B8910BB6D3541F23577C813906E51671B54A05EDDC25A3D2089CAEA30BB47`
- `docs/kanban/board.md`: `6D686578CB6838969C92B8A833E20EE1BF07CC37EE58EDA2C426A1781E6214A4`

Untracked SHA-256:

- VM-496 audit: `6A5398755E765C74B393DE3CE3D11C0529AD4C969AEE1D4B208B0F18363046DD`
- VM-496 handoff: `4BE3FAF511BF55BA5D53554188E196C33B24D4029237778BE340931331B2C943`
- VM-496 card: `DD233375DD09189308012A41716E69BA0ED3B0F04DB940BA44B72E1B79738252`
- `docs/strategy/mendscry chat addt.txt`: `B1E8A906254D663588C2B7B5E0C6F52A1503D718952570D04EBACE44C42E15BC`

## Files Reviewed

- `AGENTS.md`
- Board, handoff index, related readiness handoffs and cards
- Source-generated guardrails and readiness matrices
- Prismari and Izzet source, claim, profile, and placement packets
- Faction builder, recruiter context, source-generated validator, and tests
- User-supplied critical-defect verdict and locked recovery plan

## Files Changed

- CRIT-001 incident, contract, learning, ledger, template, and card records
- VM-501 umbrella and VM-502 through VM-538 recovery stubs
- Board, readiness warnings, handoff index, and this handoff

## Decisions

- Freeze semantic-foundation work, not unrelated repository work.
- Structural fingerprinting cannot certify meaning.
- Use one complete recovery card per identity.
- Keep runtime calibration outside CRIT-001.
- Require bounded evidence, stable provenance, immutable candidate SHAs, and independent certification.

## Risks / Uncertainties

- Contract v0 remains provisional until the Prismari/Lorehold/Izzet pilot.
- Existing packet schemas vary and require backward-compatible handling.
- Character and story evidence require careful scope labels before identity-wide generalization.

## Tests Run

- VM-501 through VM-538 repository/branch/history collision scan.
- Original status and working-file hash capture.
- All-37 structural inventory: 37 records written to the authoritative ledger.
- Semantic provenance build: 1,297 stable canonical provenance entries.
- Invalid discovery-chain fixture: structurally valid and correctly rejected semantically.
- Valid bounded-evidence fixture: accepted with preserved provenance.
- `npm.cmd run test:semantic-readiness` — passed.
- `npm.cmd run test:builder` — passed.
- `npm.cmd run test:faction-context-isolation` — passed.
- `npm.cmd run test:source-generated -- --all` — passed for all 37 identities with existing model-owned warnings only.
- `npm.cmd run test:placement` — passed, 37 factions and 37 golden paths.
- `npm.cmd run dossier:audit` — passed.
- `npm.cmd test` — passed after linking the clean worktree to the existing ignored dependencies and Scryfall bulk data.
- Normal faction rebuild left `data/factions.json`, `data/placement-model.json`, `data/placement-model.schema.json`, and Supabase faction context content-identical; the new provenance manifest is the only intended generated addition.
- `git diff --check` — passed.

## Not Touched

- Original dirty main worktree.
- Raw faction packets.
- Generated faction artifacts.
- Supabase behavior.
- Browser questions, scoring, inhibition, and scheduling.
- VM-496 and Mendscry files.

## Next

VM-501 is committed and complete. VM-502 Prismari is the sole active identity recovery; Lorehold is explicitly next.

## Commits

- `9773bf0` — CRIT-001 governance, contract, ledger, cards, warnings, and handoff.
- `7d4f26c` — VM-501 fingerprint, provenance, schema, validator, fixtures, and test integration.

## VM-501 Prerequisite Correction

The first VM-502 independent review requested changes and exposed shared enforcement gaps. A correction branch was created from accepted program base `5165434`, without Prismari candidate data. Contract v1.1 and the narrowly scoped provenance, fixture-chain, identity-scope, forbidden-field, native-ID, and deterministic-ledger guards require a separate non-authoring review before acceptance. Prismari replacement work and Lorehold remain paused.

The prerequisite validation passes: shared semantic tests, rejected-candidate negative regression, public generated parity, all-37 source/generated checks, 37 placement golden paths, recruiter-context isolation, dossier follow-ups, full test suite, 226 parser cases, deterministic ledger regeneration, and diff hygiene. Existing 30 builder-owned source/generated warnings and 113 dossier warnings remain unchanged. Candidate SHA and independent review are pending.
