# 2026-06-09 16:42 - Codex - VM-306 UR/RG Mechanics Source-First Repair

## Agent Name

Codex

## Task Requested

Implement VM-306: repair empty generated mechanics fields for `UR` Izzet League and `RG` Gruul Clans from approved local raw/source backing, avoid web search, avoid generated-file hand authoring, accept only deterministic UR/RG generated mechanics drift, preserve unrelated worktree drift, and document the pass.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-09-1404-codex-vm305-supabase-context-isolation.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-300-source-generated-guardrails.md`
- `docs/kanban/done/VM-301-yore-source-first-authoring-pass.md`
- `docs/kanban/done/VM-302-dune-source-first-authoring-pass.md`
- `docs/kanban/done/VM-303-glint-source-first-authoring-pass.md`
- `docs/kanban/done/VM-304-ink-source-first-authoring-pass.md`
- `docs/kanban/done/VM-305-supabase-context-isolation.md`
- `docs/kanban/done/VM-043-izzet-base-draft-formalization.md`
- `docs/kanban/done/VM-039-gruul-strong-support-upgrade.md`
- `docs/kanban/done/VM-040-gruul-metaphysics-formalization-upgrade.md`
- `docs/handoffs/2026-05-18-0753-codex-vm043-izzet-base-draft-formalization.md`
- `docs/handoffs/2026-05-18-0140-codex-vm039-gruul-base-support-assessment.md`
- `docs/handoffs/2026-05-18-0151-codex-vm040-gruul-metaphysics-formalization.md`
- `research/build-faction-artifacts.mjs`
- `data/raw-factions/izzet_league/izzet_league.profile.json`
- `data/raw-factions/izzet_league/izzet_league.claims.json`
- `data/raw-factions/izzet_league/izzet_league.sources.json`
- `data/raw-factions/izzet_league/izzet_league.changelog.json`
- `data/raw-factions/gruul_clans/gruul_clans.profile.json`
- `data/raw-factions/gruul_clans/gruul_clans.claims.json`
- `data/raw-factions/gruul_clans/gruul_clans.sources.json`
- `data/raw-factions/gruul_clans/gruul_clans.changelog.json`
- `data/placement-model.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

## Files Changed

- `data/raw-factions/izzet_league/izzet_league.profile.json`
- `data/raw-factions/izzet_league/izzet_league.changelog.json`
- `data/raw-factions/gruul_clans/gruul_clans.profile.json`
- `data/raw-factions/gruul_clans/gruul_clans.changelog.json`
- `data/placement-model.json`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-306-ur-rg-mechanics-source-first-repair.md`
- `docs/handoffs/2026-06-09-1642-codex-vm306-ur-rg-mechanics-source-first.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Recorded baseline generated empty paths:
  - `data/placement-model.json::factions.UR.identity.mechanics = ""`
  - `data/placement-model.json::factions.RG.identity.mechanics = ""`
- Wrapped Izzet's existing raw `mechanics` array into a builder-readable object with `summary`, `source_bound_texture`, `supporting_claim_ids`, `supporting_sources`, `not_promoted_terms`, and preserved `entries`.
- Wrapped Gruul's existing raw `mechanics` array into the same builder-readable object shape.
- Added changelog entries for both raw factions documenting the source-first mechanics summary repair.
- Regenerated faction artifacts with `npm.cmd run build:factions`.
- Accepted only these generated placement paths:
  - `data/placement-model.json::factions.UR.identity.mechanics`
  - `data/placement-model.json::factions.RG.identity.mechanics`
- Restored broad Supabase context drift from the VM-306 pre-build snapshot, then ran `npm.cmd run build:factions -- --context-targets=UR,RG`.
- Verified final Supabase context content matched the pre-VM-306 snapshot, so no VM-306 context entry changes were accepted.
- Moved VM-306 to Done and updated the Kanban board.

## Why It Changed

`research/build-faction-artifacts.mjs` reads generated mechanics from `profile.mechanics.summary` or `profile.profile.mechanics_and_play_pattern`. UR and RG raw profiles already had source-backed mechanics entries, but they were stored as bare arrays, so the generated placement model emitted empty mechanics prose.

## Evidence And Source Backing Used

- Izzet claim IDs: `claim_izzet_league_0046`, `claim_izzet_league_0047`, `claim_izzet_league_0048`, `claim_izzet_league_0049`, `claim_izzet_league_0050`, `claim_izzet_league_0051`, `claim_izzet_league_0052`, `claim_izzet_league_0065`, `claim_izzet_league_0076`, `claim_izzet_league_0078`, `claim_izzet_league_0083`, `claim_izzet_league_0090`, `claim_izzet_league_0092`, `claim_izzet_league_0093`, `claim_izzet_league_0094`, `claim_izzet_league_0097`.
- Izzet sources/references: `src_izzet_league_0004`, `src_izzet_league_0005`, `src_izzet_league_0006`, `src_izzet_league_0008`, `src_izzet_league_0009`, `src_izzet_league_0014`, `VM-043`.
- Gruul claim IDs: `claim_gruul_clans_mechanic_0040`, `claim_gruul_clans_philosophy_0041`, `claim_gruul_clans_mechanic_0042`, `claim_gruul_clans_mechanic_0043`, `claim_gruul_clans_mechanic_0044`, `claim_gruul_clans_placement_0001`, `claim_gruul_clans_placement_0002`.
- Gruul sources/references: `src_gruul_clans_0004`, `src_gruul_clans_0005`, `src_gruul_clans_0006`, `src_gruul_clans_0007`, `VM-039`, `VM-040`.

## Decisions Made

- Kept VM-306 combined because both UR and RG had approved local backing and the same builder-readable summary gap.
- Did not promote Izzet `ward`; it remains excluded from the mechanics summary because it was not in the raw mechanics entry set.
- Did not promote Gruul `bloodthirst`, `surveil`, or `adapt`; those remain unpromoted search/support metadata for this pass.
- Did not add new raw claims or sources.
- Did not change source-generated validator policy.
- Did not accept any VM-306 Supabase context content diff; targeted context mode was run to prove safe reconciliation behavior.

## Risks / Uncertainties

- `npm.cmd run test:placement` still fails only on the known unrelated Temur color-order assertion:

```text
 'Temur Frontier commanders with exactly green-blue-red identity'
- 'Temur Frontier commanders with exactly blue-red-green identity'
```

- `npm.cmd run test:source-generated` still reports existing Jeskai/Mardu model-owned inhibitor warnings from VM-300.
- `bloodthirst` appears in Gruul search/canon support material but was not promoted because the current raw mechanics entries only source-back riot and bloodrush.
- The worktree remains broadly dirty from unrelated prior work; VM-306 did not stage, revert, normalize, or clean unrelated files.

## Tests Run

- Pass: initial `git status --short` review
- Pass: `node --check research\build-faction-artifacts.mjs`
- Pass: `npm.cmd run test:faction-context-isolation`
- Pass: pre-edit JSON parse checks
- Pass: baseline generated mechanics probe, confirming `factions.UR.identity.mechanics` and `factions.RG.identity.mechanics` were empty
- Pass: post-edit raw JSON parse checks
- Pass: `npm.cmd run build:factions`
- Pass: generated snapshot comparison showing only `factions.UR.identity.mechanics` and `factions.RG.identity.mechanics` changed in `data/placement-model.json`
- Pass: generated snapshot comparison showing no accepted drift in `data/placement-model.schema.json`, `data/factions.json`, or `data/archscry-flavor-snippets.json`
- Pass: `npm.cmd run build:factions -- --context-targets=UR,RG`
- Pass: final context isolation verification; no final content drift versus pre-VM-306 context snapshot
- Pass: final JSON parse checks
- Pass: final mechanics probe, confirming both generated mechanics fields are non-empty
- Pass: `npm.cmd run validate:source-generated -- --targets=YORE,DUNE,GLINT,INK`
- Pass with known warnings: `npm.cmd run test:source-generated`
- Pass: `node research\archscry-dossier-followup-tests.js`
- Pass: `node research\maze-search-tests.js`
- Known unrelated fail: `npm.cmd run test:placement`
- Pass with LF/CRLF warnings only: scoped `git diff --check`
- Pass: focused trailing-whitespace scan over touched files

## Not Touched

- No web search.
- No route edits.
- No Maze behavior edits.
- No flavor snippet authoring.
- No public display data edits.
- No deck-link edits.
- No placement axes, discriminator fields, good/poor fit indicators, inhibitor traps, claim counts, schema shape, or validator policy changes.
- No raw claims or source IDs added.
- No generated placement hand edits as source.
- No unrelated generated drift accepted.

## Follow-Up Recommendations

- Next recommended source-first target: `LOREHOLD` mechanics/signal-balance repair.
- If the team wants Gruul `bloodthirst` promoted into raw mechanics, create a separate evidence-promotion card that adds raw claim/source backing rather than slipping it into generated copy.
- Keep using the VM-305 snapshot-and-targeted-context pattern for future source-first passes.

## Next Suggested Agent

JSON Cartographer for `LOREHOLD` source-first mechanics/signal-balance repair.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-306-ur-rg-mechanics-source-first-repair.md`
- `docs/kanban/done/VM-305-supabase-context-isolation.md`
- `docs/kanban/done/VM-300-source-generated-guardrails.md`
- `docs/handoffs/2026-06-09-1404-codex-vm305-supabase-context-isolation.md`
