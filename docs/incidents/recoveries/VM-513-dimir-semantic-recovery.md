# VM-513 - Dimir Semantic Recovery

Identity: Dimir / UB
Program: CRIT-001 - 37-Identity Semantic Recovery Program
Contract: CRIT-001 Contract v1.1
Branch: `codex/vm-513-dimir-semantic-recovery`
Starting program base: `31f46b8c429ee403797dda1d75db70e4b471b97b`

## Gate 1+2 Read-Only Audit - 2026-07-16

### Scope

This audit inspected Dimir canonical data, generated consumers, recruiter context, provenance, fixture state, and governance records without changing Dimir semantic data or generated artifacts. The active worktree had an allowed unrelated Table Talk baseline:

- Modified `docs/handoffs/HANDOFF_INDEX.md`
- Untracked `docs/handoffs/2026-07-16-2119-codex-table-talk-link-shelf-scan.md`
- Untracked `docs/handoffs/2026-07-16-2128-codex-canon-table-talk-shelf-deep-scan.md`

The original main worktree `C:\dev\mtgSiteWIP` was not touched; its known docs/workflow dirty baseline is allowed for this VM.

### Files Reviewed

- `AGENTS.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/reference/ravnica-guild-source-readiness-matrix.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-513-dimir-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `data/raw-factions/house_dimir/house_dimir.claims.json`
- `data/raw-factions/house_dimir/house_dimir.sources.json`
- `data/raw-factions/house_dimir/house_dimir.profile.json`
- `data/raw-factions/house_dimir/house_dimir.placement.json`
- `data/raw-factions/house_dimir/house_dimir.changelog.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- Recent certified Ravnica precedents for process only: Izzet, Azorius, Boros, Rakdos, Golgari, and Gruul recovery records.

### Authoritative Sources Inspected

The local source inventory contains 14 Dimir sources:

- 3 claim-bearing sources:
  - `src_wotc_flavorful_guide_guilds_ravnica_2018`
  - `src_wotc_guilds_ravnica_mechanics_2018`
  - `src_wotc_guilds_ravnica_prerelease_primer_2018`
- 1 support-only source:
  - `src_wotc_dragons_maze_mechanics_2013`
- 10 discovery-only story corpus records.

Gate 1+2 found sufficient local/listed source authority for bounded Dimir remediation if Gate 3 localizes claims to the listed official sources and isolates discovery-only story records from proof chains.

### Initial Claim Counts

- Total claims: 16
- `substantive_claim`: 0
- `discovery_record`: 10
- `support_record`: 0
- `unclassified`: 6

All 16 Dimir claims lack explicit Contract v1.1 semantic roles in the raw packet. No current Dimir claim has Contract v1.1 substantive evidence locations or `evidence_scope`.

### Gate 1+2 Findings

1. Claim-role remediation is required. Claims `house_dimir_claim_001` through `house_dimir_claim_006` are official-source claims but are still unclassified. Claims `house_dimir_claim_0007` through `house_dimir_claim_0016` are story-corpus search/discovery records and must remain non-authoritative unless separately source-read and promoted in a future intake.
2. Authoritative profile chains rely on non-certifying records. Affected profile locators include `/core_identity`, `/site_surface`, `/structure`, `/great_tension`, `/mechanics`, `/canonical_flavor_text/0`, `/key_figures/1`, `/key_figures/2`, `/key_figures/3`, and `/data_quality/corpus_upgrade`.
3. Authoritative placement chains rely on non-certifying records. Affected placement locators include `/placement_summary`, `/placement_axes/0`, `/moral_and_psychological_profile`, `/core_values/0` through `/core_values/9`, `/behavioral_signals/0`, and `/inhibitor_traits/0`.
4. Generated public and recruiter surfaces still contain stale or overbroad Dimir language, including generic UB control framing, mill/discard/mechanics overfit, broad manipulation language, "intelligence operation" framing, and key figures sourced from discovery-only story records.
5. `source_basis.existing_repo_claim_ids` and related Commander Compass fields carry discovery IDs inside an auxiliary container that says `reviewed_not_canonical_lore` and `do_not_use_as_claim_source`; Gate 3 must clarify or remove the ambiguity without changing schema.
6. Dimir has no semantic-readiness fixture file. Exact fixture/provenance parity cannot pass until fixtures are created from generated truth.
7. Generated UB provenance has 43 entries and 31 null canonical IDs. Content hashes are present. No duplicate claim IDs were found in the current generated UB provenance entries, but many entries are backed by non-certifying raw claims.
8. Current collision guidance covers only Orzhov and Silverquill. Dimir needs a broader bounded neighbor set and explicit generic UB overfit guardrails.

### Exact-Chain Audit

Required Dimir fixture/provenance parity cannot be established because `research/fixtures/semantic-readiness/house_dimir.semantic-fixtures.json` does not exist. The current generated provenance has no duplicate claim IDs in the audited UB entries, but the canonical proof chains are not valid because they depend on unclassified and discovery-only records.

### Stale-Risk Terms Adjudicated

Gate 1+2 found target-specific risk language on public or generated surfaces:

- generic counterspell, removal, card-draw, permission, control, mill, discard, theft, evasion, unblockability, saboteur, rogue, thief, assassin, criminal, manipulation, paranoia, intelligence-operation, shadow-government, mind-control, murder, undercity, ambition, and "information is power" style language.

Gate 3 must preserve only wording that is source-supported and bounded to Dimir. Generic UB deck mechanics, discovery-only story references, or unsupported spy-thriller exaggeration must not prove Dimir identity.

### Required Neighbor Set

Gate 3+4 must build collision guidance for at least:

- `GENERIC_UB_OVERFIT`
- `U`
- `B`
- `WU`
- `UR`
- `BR`
- `BG`
- `WB`
- `UG`
- `SILVERQUILL`
- `ESPER`
- `GRIXIS`
- `SULTAI`

Meaningful discriminators must show why the supported result is Dimir rather than generic UB control, mono-blue information/planning, mono-black ambition/secrecy, Azorius public law/order, Izzet experiment/invention, Rakdos spectacle/criminal indulgence, Golgari undercity survival/rot, Orzhov obligation/debt/institutional exploitation, Simic adaptation/inquiry, Silverquill public rhetoric/reputation, or broader Esper/Grixis/Sultai identities.

### Remediation Decision

Remediation is authorized.

No broad online source discovery is required before Gate 3. Gate 3 must localize claims to existing listed/local sources, demote or isolate discovery-only records, add Contract v1.1 evidence scopes for substantive claims, repair profile and placement proof chains, add missing UB fixtures, rebuild generated consumers, and prove exact fixture/provenance parity.

### Gate 3+4 Constraints

- Do not use discovery/search/story-corpus-only records as authoritative proof for profile identity, placement identity, key figures, recruiter guidance, semantic readiness, public copy, or generated evidence chains.
- Retain native/history IDs only as metadata/history where needed.
- Do not define Dimir by mill, discard, theft, evasion, assassination, generic control, or generic UB card mechanics.
- Do not introduce omniscient shadow-government, mind-control, or unsupported intelligence-agency framing.
- Preserve frozen scoring, confidence, calibration, Hall/Crucible behavior, scheduling, tie-order, and global recruiter behavior.
- Do not change Contract v1.1, schemas, builders, validators, Hall/Crucible, scoring, confidence, calibration, scheduling, tie-order, or global recruiter behavior unless a true blocker is found and reported before change.
- Preserve the allowed Table Talk side-scan baseline and exclude it from every VM-513 commit.

### Gate 1+2 Validation

- `git status --short --branch`: expected VM-513 branch plus allowed Table Talk baseline only.
- Raw Dimir JSON parse checks: passed for claims, sources, profile, placement, and changelog.
- `node research/audit-semantic-readiness.mjs --targets=UB`: completed and reported the structural findings above.
- `node research/validate-semantic-readiness.mjs --targets=UB`: failed as expected for Gate 1+2 blockers, including missing semantic roles, missing recruiter evidence mapping, non-substantive proof chains, and missing fixtures.
- Custom exact-chain/provenance scan: no duplicate current UB generated provenance claim IDs; fixture missing; 31 null UB canonical IDs.

### Gate 1+2 Disposition

Primary disposition: `claim_extraction_pass_required`.

Dimir may proceed to Gate 3+4 remediation under Contract v1.1. Dimir is not certified, not semantically ready, not reviewed, and VM-514 has not started.
