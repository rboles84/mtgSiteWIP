# VM-512 - Gruul Semantic Recovery

## Identity and Contract

- Identity key: `RG`
- Identity name: Gruul Clans / Gruul
- Raw packet directory: `data/raw-factions/gruul_clans/`
- Cohort: guild
- Contract version: CRIT-001 Contract v1.1
- Program base / VM-511 certification base: `a7aabe30cb4e9fe65ab01d15fdd41ac4445b86f8`
- Active branch: `codex/vm-512-gruul-semantic-recovery`
- Starting SHA: `a7aabe30cb4e9fe65ab01d15fdd41ac4445b86f8`
- Operating playbook: `docs/incidents/CRIT-001-operating-playbook.md` v2

## Gate 0 - Campaign Operating Check

- Active worktree confirmed: `C:\dev\mtgSiteWIP-crit001`
- Active branch confirmed: `codex/vm-512-gruul-semantic-recovery`
- Current HEAD at audit start: `a7aabe30cb4e9fe65ab01d15fdd41ac4445b86f8`
- Original-main safety rule applied: `C:\dev\mtgSiteWIP` retained only the known unrelated dirty docs/workflow baseline and had no unexpected raw/generated/data/runtime changes.
- Scope: Gate 1+2 read-only audit and bounded evidence confirmation only.
- Not touched: Gruul raw packet, generated artifacts, semantic fixtures, builders, validators, schemas, contract, runtime, Hall, Crucible, scoring, inhibition, confidence, calibration, scheduling, tie ordering, and global recruiter behavior.

## Gate 1 - Audit

### Executive Summary

Gruul is not certifiable as-is. The packet has substantial listed/local evidence and a detailed pre-CRIT claim inventory, but every current claim lacks a certifying `semantic_role`, every authoritative claim lacks bounded Contract v1.1 evidence locations, profile/placement/recruiter chains do not resolve to substantive claims, collision guidance covers only Rakdos and Golgari, semantic fixtures are missing, and generated provenance contains null canonical IDs.

Primary disposition: **claim-extraction pass required.**

Gate 2 conclusion: existing listed/local evidence is sufficient to authorize a bounded Gate 3 remediation. No broad online source discovery is required before Gate 3. Gate 3 must localize exact evidence against existing official/listed/local sources and must stop if retained high-heat wording, key-figure chains, required-neighbor distinctions, or generated proof chains cannot be source-bounded.

### Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-16-1624-codex-vm511-golgari-certification.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-512-gruul-semantic-recovery.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-faction-semantic-readiness-integrity.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/reference/ravnica-guild-source-readiness-matrix.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `data/raw-factions/gruul_clans/gruul_clans.claims.json`
- `data/raw-factions/gruul_clans/gruul_clans.sources.json`
- `data/raw-factions/gruul_clans/gruul_clans.profile.json`
- `data/raw-factions/gruul_clans/gruul_clans.placement.json`
- `data/raw-factions/gruul_clans/gruul_clans.changelog.json`
- `data/factions.json` RG generated consumer
- `data/placement-model.json` RG generated consumer
- `supabase/functions/guild-recruiter/faction-context.ts` RG generated consumer
- `data/semantic-readiness-provenance.json` RG provenance entries

### Structural Facts

| Item | Result |
|---|---:|
| Claim records | 84 |
| Sources | 21 |
| Claim-bearing sources | 13 |
| Discovery-only sources | 8 |
| Claims with `semantic_role` | 6 discovery records only |
| Claims with certifying `substantive_claim` role | 0 |
| Claims with bounded `evidence_locations` | 0 |
| Raw discriminator questions | 9 |
| Collision guidance rows | 2 |
| RG provenance entries inspected | 117 |
| RG provenance entries with null `canonical_id` | 59 |
| RG provenance entries with null `canonical_content_hash` | 0 |
| Semantic fixtures | Missing |

### Claim-Role Audit

Current Contract v1.1 role status:

| Role | Current count | Gate 3 disposition |
|---|---:|---|
| `substantive_claim` | 0 | Add only where listed/local evidence can support bounded authoritative use. |
| `discovery_record` | 6 | Keep story-corpus search rows as discovery-only metadata/history. |
| `support_record` | 0 | Add only if a row is auxiliary and non-authoritative. |
| `unclassified` | 78 | Eliminate by assigning correct role or demoting/removing from authoritative chains. |

The 78 unclassified claims include many plausible official/source-reviewed atomic claims about Ravnica, Gruul red-green identity, the Rubblebelt, clan structure, Borborygmos, Domri, Ruric Thar, Nikya, riot, bloodrush, anti-civilization motive, lost stewardship, and placement support. Gate 3 must add bounded `evidence_locations` with `evidence_scope` before any of these can certify profile, placement, recruiter, public copy, key figures, or generated consumers.

The story-corpus rows `gruul_clans_claim_0074` through `gruul_clans_claim_0079` are discovery/search records. They must not independently prove profile identity, placement identity, generated key figures, recruiter guidance, semantic readiness, public copy, or provenance chains.

### Discovery and Generated-Chain Audit

| Area | Current issue | Severity |
|---|---|---|
| `gruul_clans.profile.json#/core_identity` | Uses discovery-role rows and unclassified claims; no substantive proof chain. | BLOCKER |
| `gruul_clans.profile.json#/data_quality/corpus_upgrade` | Discovery records appear in tracked canonical surface and must stay non-authoritative. | BLOCKER |
| `gruul_clans.placement.json#/placement_summary` | Uses unclassified and discovery-backed evidence; no substantive proof chain. | BLOCKER |
| `gruul_clans.placement.json#/core_values/8-17`, `/behavioral_signals/7`, `/inhibitor_traits/4`, `/placement_axes/7` | Discovery rows appear in placement-authoritative chains. | BLOCKER |
| `data/factions.json#/factions/RG/raw_enrichment/key_figures` | Generated key figures cite unclassified claims as source-backed evidence; story-specific figures need bounded support or non-authoritative isolation. | BLOCKER |
| `data/factions.json#/factions/RG/raw_enrichment/canonical_flavor_text` | Public flavor summary includes discovery-only source IDs and broad "Break the city..." wording requiring source-bounded narrowing. | HIGH |
| Commander Compass | Auxiliary recommendation `source_basis` mixes product/card support, unclassified lore claims, and discovery claim IDs; must remain non-authoritative. | HIGH |
| `data/semantic-readiness-provenance.json` | 59 RG generated provenance rows have null canonical IDs. | BLOCKER |
| Fixtures | RG semantic fixture file is missing. | BLOCKER |

### Profile and Placement Entailment Audit

| Section | Status | Notes |
|---|---|---|
| Core identity | FAIL | Existing source rows plausibly support RG/Ravnica/Gruul identity, but no substantive roles or locators exist. |
| Lost stewardship / anti-civilization motive | FAIL | Plausible official guide support exists; current proof is unclassified and overheat-prone. |
| Clan structure / Rubblebelt | FAIL | Plausible support exists; must be bounded to source rows and not made generic "barbarian" shorthand. |
| Key figures | FAIL | Borborygmos, Domri, Ruric Thar, Nikya, and story-specific figures need bounded source chains or non-authoritative isolation. |
| Mechanics | FAIL | Riot and bloodrush are source-supported but unclassified; mechanics must not stand in as full identity proof. |
| Mature expression | UNRESOLVED | Needs explicit source-bounded guidance: protective wildness, clan belonging, old ways, territorial/ecological grievance. |
| Unhealthy / pressure expression | UNRESOLVED | Needs explicit guardrails against random rage, generic RG aggression, and pure nihilistic anti-civilization. |
| Placement summary / axes | FAIL | Current placement carries useful tuning, but proof chains are not Contract v1.1-certifying. |
| Recruiter guidance | FAIL | Current guidance lacks evidence mappings and proof-chain traceability. |
| Collision guidance | FAIL | Only Rakdos/Golgari rows exist; required-neighbor set is incomplete. |

### Required-Neighbor Audit

Minimum Gate 3 required-neighbor set:

`GENERIC_RG_OVERFIT`, `R`, `G`, `BR`, `BG`, `WR`, `UR`, `UG`, `WG`, `JUND`, `NAYA`, `TEMUR`.

Additional locally observed ambiguity targets to consider if evidence supports them: `AZORIUS`, `DIMIR`, `ORZHOV`, `LOREHOLD`, `QUANDRIX`, `SIMIC_COMBINE`, `SELESNYA_CONCLAVE`, `BOROS_LEGION`, `CULT_OF_RAKDOS`, and `GOLGARI_SWARM`. Gate 3 should not force all observed names; retain only boundaries needed for current proof-chain and generation stability, and document any removals.

Required distinctions:

- Gruul from generic RG creature/combat aggression.
- Gruul from mono-red generic anger/freedom/chaos.
- Gruul from mono-green generic nature/growth/instinct.
- Gruul from Rakdos spectacle, public transgression, and evil-party styling.
- Gruul from Golgari rot, survival, death-to-life reclamation, and undercity ecology.
- Gruul from Boros disciplined protection and public duty.
- Gruul from Izzet experiment/invention.
- Gruul from Simic adaptation/optimization.
- Gruul from Selesnya harmony/consensus.
- Gruul from Jund predation/appetite hierarchy.
- Gruul from Naya awe/big-creature communal champion framing.
- Gruul from Temur wild endurance/elemental tradition if retained.

### Target-Specific Stale Phrase Risks

Gate 1+2 stale phrase scan terms for Gruul / RG:

`smash`, `rage`, `random rage`, `barbarian`, `mindless destruction`, `destruction`, `chaos`, `anti-civilization`, `civilization`, `instinct`, `freedom`, `clan`, `territory`, `wild`, `wilderness`, `Rubblebelt`, `survival`, `predation`, `aggression`, `stompy`, `crush`, `the wild reclaims all`, `civilization is a cage`, `break the city`.

Observed target-specific risks:

- `data/factions.json#/factions/RG/tagline`: `Civilization is a cage. Nature is freedom.` needs source support or narrowing.
- Generated public copy currently frames Gruul as not interested in compromise and rage/grief beyond reason; retain only if bounded by official/local source evidence.
- `data/factions.json#/factions/RG/raw_enrichment/canonical_flavor_text`: `Break the city so the wild can breathe.` is project synthesis and must be source-bounded or narrowed.
- Commander Compass phrases such as `Crush them!`, `The wild reclaims all`, `destructive growth`, and `smash opponents` must remain auxiliary recommendation texture or be narrowed.
- Current placement text already tries to distinguish protective/ecological anger from generic aggression; Gate 3 must bind that distinction to substantive claims and avoid overstating it as official psychology.

### Findings by Severity

#### BLOCKER

1. All 84 Gruul claims lack a certifying substantive proof model; no claim is currently a substantive claim.
2. The 78 unclassified claims lack Contract v1.1 roles and bounded evidence locations.
3. Discovery/story-corpus records appear in authoritative profile and placement proof chains.
4. Authoritative profile, placement, and recruiter guidance lack substantive proof chains.
5. Generated RG key figures and flavor output present unclassified/discovery-linked material as source-backed evidence.
6. `collision_guidance` is incomplete and lacks the required neighbor set.
7. RG semantic fixtures are missing.
8. RG provenance includes 59 null canonical IDs.

#### HIGH

1. Public/generated copy risks overbroad `rage`, `anti-civilization`, `break the city`, `civilization is a cage`, and generic RG aggression readings.
2. Commander Compass auxiliary source basis risks being read as lore proof unless isolated.
3. Story-specific figures and archive rows require bounded source chains or non-authoritative retention.

#### MEDIUM

1. Existing listed/local evidence appears sufficient for recovery, but exact locators and evidence scopes must be added carefully.
2. Existing calibration and placement text contains useful anti-overfit guidance, but must be rebound without changing frozen scoring/confidence/calibration behavior.
3. Current collision guidance can seed Rakdos/Golgari boundaries but is too narrow.

### Maturity / Packet Test

Choice: **Structurally rich but not semantically certifying.**

Rationale: Gruul has 21 sources, 13 claim-bearing source rows, 84 claim records, and detailed placement material. It fails CRIT-001 Contract v1.1 because the semantic proof layer is not mature: no substantive role assignments, no bounded locators, discovery records in authoritative chains, generated proof-chain contamination, missing fixtures, incomplete collision guidance, and null canonical IDs.

## Gate 2 - Evidence Confirmation

### Evidence Sufficiency Decision

No broad online source discovery is required before Gate 3. Gate 3 should first localize evidence against existing listed/local sources:

- `src_gruul_clans_0001` - official Ravnica plane page.
- `src_gruul_clans_0002` - official Gatecrash-era Planeswalker's Guide.
- `src_gruul_clans_0003` - official Ravnica Allegiance flavor guide.
- `src_gruul_clans_0004` - official Ravnica Allegiance mechanics article.
- `src_gruul_clans_0005` - official Gatecrash mechanics article.
- `src_gruul_clans_0006` - official Dragon's Maze mechanics article.
- `src_gruul_clans_0007` - official release notes support for riot.
- `src_gruul_clans_0008` through `src_gruul_clans_0010` - official story sources for bounded story-era claims.
- `src_gruul_clans_0013` through `src_gruul_clans_0015` - repository archive rows already marked claim-bearing; use only where the source row is sufficiently reviewed and bounded.

Stop before remediation if exact bounded locators for core official source rows are unavailable, if high-heat public wording needs unsupported interpretation, if required-neighbor boundaries cannot be tied to retained substantive claims, or if discovery/story-corpus IDs cannot be isolated from generated proof chains without broader builder/schema changes.

### Claim-Extraction Plan

Gate 3 should:

- Assign correct semantic roles to every Gruul claim.
- Add bounded Contract v1.1 `evidence_locations` with `evidence_scope` and `interpretation_level` for every authoritative/substantive claim.
- Keep story-corpus rows as discovery records unless source-read evidence is localized.
- Rebind profile, placement, public copy, recruiter guidance, and generated key figures to substantive claims only.
- Add required-neighbor collision guidance with explicit `lateral_inhibition: false`.
- Add RG semantic fixtures covering core inclusion, generic RG overfit, high-risk neighbors, stale phrase risks, nearest-collision ambiguity, and provenance.
- Regenerate only CRIT-001-required generated consumers and provenance.

## Stop / Proceed Decision

Proceed to Gate 3 canonical remediation under the current VM-512 Goal authorization. Use only listed/local evidence and stop on any source-boundary, scope, schema, builder, frozen-field, provenance, or generated-spillover blocker.

Do not proceed to independent review, certification, VM-513, or any other identity from this Gate 1+2 deliverable.

## Validation

Commands run:

- `git status --short --branch` - clean at preflight.
- `node research/audit-semantic-readiness.mjs --targets=RG` - passed structurally; reported 84 claims, role counts `0 substantive / 6 discovery / 0 support / 78 unclassified`, 21 sources, 13 claim-bearing sources, 8 discovery-only sources, high-volume/mixed-role/no-substantive-role risk.
- `node research/validate-semantic-readiness.mjs --targets=RG` - failed as expected for Gate 1 blockers: missing semantic roles, missing recruiter evidence mappings, authoritative references without substantive claims, and missing RG fixtures.
- JSON parse checks for Gruul raw files - passed.
- Raw/generated/provenance inspection - passed for read-only inspection; found discovery/unclassified proof-chain contamination, 59 null canonical IDs, 0 null canonical content hashes, incomplete collision guidance, and missing RG fixtures.

`git diff --check` is run after documentation updates.

## Final Gate 1+2 Status

- Gate 1 audit: complete.
- Gate 2 bounded evidence confirmation: complete.
- Primary disposition: **claim-extraction pass required.**
- Gate 3 required: yes, canonical remediation authorized by current VM-512 Goal if local source localization succeeds.
- Broad online source discovery required before Gate 3: no.
- Bounded source localization required in Gate 3: yes.
- Gruul raw/generated files changed: no.
- No candidate commit created.
- No certification created.
- No VM-513 or other identity started.

## Gate 3+4 - Remediation, Generation, and Validation

### Candidate Implementation Summary

Gate 3+4 remediation completed in the VM-512 worktree and was captured in the Gate 5 candidate commit:

- Candidate commit SHA: `73f4f5103b0ce9605260aa6ee6ae44b03ccc4d33`
- Candidate commit subject: `VM-512 remediate Gruul semantic readiness candidate`
- Workflow status after candidate: awaiting independent review.
- Certification status: not certified.
- Review status: no independent review performed by this agent.
- VM-513 status: not started.

### Semantic Role Result

Final Gruul claim counts after remediation:

| Role | Count |
|---|---:|
| `substantive_claim` | 89 |
| `discovery_record` | 6 |
| `support_record` | 1 |
| `unclassified` | 0 |

All substantive Gruul evidence-location entries have Contract v1.1 `evidence_scope`. Evidence locators were normalized to source-ID-bound local records so source IDs and locators remain mechanically consistent.

### Canonical Remediation Notes

- Reclassified Gruul claims under Contract v1.1 and added bounded evidence locations for authoritative substantive claims.
- Kept `gruul_clans_claim_0074` through `gruul_clans_claim_0079` as discovery records only.
- Preserved frozen placement confidence/native-ID surfaces by retaining discovery-corpus placement rows as explicit `discovery_metadata`, with discovery IDs moved out of semantic `claim_ids` into `retained_discovery_claim_ids`.
- Rebound core profile, placement, public copy, generated key figures, recruiter guidance, semantic readiness, and provenance chains to substantive claims only.
- Added required-neighbor collision guidance for `GENERIC_RG_OVERFIT`, `R`, `G`, `BR`, `BG`, `WR`, `UR`, `UG`, `WG`, `JUND`, `NAYA`, and `TEMUR`, with explicit `lateral_inhibition: false` so generated lateral targets did not expand.
- Added RG semantic fixtures covering positive Gruul semantics, generic RG overfit, required-neighbor exclusions, nearest collision ambiguity, stale phrase risk, and provenance.
- Updated `data/identity-layers.json` only as a target-scoped display-source exception needed to remove stale RG public preview copy that the standard generator preserves into `data/factions.json`.

### Generated Outputs

Generated and validated consumers/provenance:

- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

Final RG provenance result: 1666 total provenance entries across the manifest, with RG entries carrying non-null canonical IDs, non-null `sha256:` content hashes, and generated-consumer coverage.

### Stale Phrase Handling

Removed or narrowed stale/generated RG public language:

- Replaced `Civilization is a cage. Nature is freedom.` with `Wild places lost. The clans answer directly.`
- Replaced `Break the city so the wild can breathe.` with `The city took the wild; the clans answer from the rubble.`
- Removed Commander Compass `Stompy` / `Crush` shorthand from authoritative-adjacent generated surfaces.
- Retained terms like `rage`, `survival`, `generic aggression`, and `mindless destruction` only in bounded source-supported descriptions or explicit negative guardrails.

### Candidate-Scope Dry-Run

Command:

`node research/validate-semantic-candidate-scope.mjs --base=ea6e62a0fbe82975b48612ba02b143fad8a0c74b --target=b599d1dc314134f66f8e60ee5216293deb25943e --identity=RG`

Result: reported only documented target-scoped display-source exceptions:

- `identity candidate modified non-identity path data/identity-layers.json`
- `unrelated or global data/factions.json content changed`

No proof-chain contamination, native-ID loss, evidence locator/source mismatch, frozen confidence/scoring/calibration drift, generated lateral-target drift, missing provenance fields, or unrelated generated/provenance identity spillover remained.

### Gate 3+4 Validation

Final validation commands:

- `npm.cmd run build:factions` - passed; regenerated placement, faction context, factions display data, and semantic provenance.
- JSON parse checks for Gruul raw, fixture, generated, and provenance JSON - passed.
- Explicit substantive evidence-location `evidence_scope` check - passed with 0 missing scopes.
- Explicit discovery-ID isolation check - passed; discovery IDs occur only in metadata-only locations.
- Targeted stale public-copy scan for exact high-risk RG phrases - passed.
- `node research/audit-semantic-readiness.mjs --targets=RG` - passed structurally; 96 claims, 89 substantive / 6 discovery / 1 support / 0 unclassified, 147 reference sites, no missing references, no invalid support links.
- `node research/validate-semantic-readiness.mjs --targets=RG` - passed.
- `node research/semantic-candidate-scope-tests.js` - passed.
- `npm.cmd run test:semantic-readiness` - passed; provenance check verified 1666 entries.
- `npm.cmd run test:placement` - passed; 37 factions, 37 golden paths.
- `npm.cmd run test:faction-context-isolation` - passed.
- `npm.cmd run test:source-generated` - passed with existing non-Gruul JESKAI/MARDU model-owned inhibitor warnings.
- `npm.cmd test` - passed.
- `git diff --check` / `git diff --cached --check` - passed with CRLF warnings only, no whitespace errors.

## Gate 5 - Candidate Created

- Candidate commit SHA: `73f4f5103b0ce9605260aa6ee6ae44b03ccc4d33`
- Candidate status: awaiting independent review.
- Independent review: not performed.
- Approval decision: none issued.
- Certification: not performed.
- `semantically_ready`: not set.
- VM-513: not started.
- External Excel tracker: not modified.

## Independent Review - 2026-07-16

- Reviewer: Codex independent review window.
- Review base: `ea6e62a0fbe82975b48612ba02b143fad8a0c74b`
- Exact candidate reviewed: `73f4f5103b0ce9605260aa6ee6ae44b03ccc4d33`
- Workflow-record commit checked: `3aef320949bacec91923b8086048abd283fbecdb`
- Decision: `REQUEST CHANGES`
- Certification: not performed.
- `semantically_ready`: not set.
- VM-513: not started.

### Review Finding

#### MEDIUM - Approval Blocking

The RG provenance fixture does not exactly match the generated provenance entry for `data/raw-factions/gruul_clans/gruul_clans.profile.json#/core_identity`.

Evidence:

- `research/fixtures/semantic-readiness/gruul_clans.semantic-fixtures.json#/fixtures/16/evidence_claim_ids` contains duplicate `claim_gruul_clans_structure_0005` and duplicate `claim_gruul_clans_placement_0072`.
- The generated provenance entry for `data/raw-factions/gruul_clans/gruul_clans.profile.json#/core_identity` deduplicates those IDs, so the fixture claim array has 27 entries while the generated provenance claim array has 25 entries.
- The same duplicate-chain source is present in `data/raw-factions/gruul_clans/gruul_clans.profile.json#/core_identity/claim_ids`, `data/raw-factions/gruul_clans/gruul_clans.profile.json#/site_surface/evidence_claim_ids`, and `data/raw-factions/gruul_clans/gruul_clans.placement.json#/placement_summary/claim_ids`.
- Claim/source sets are substantive-only and complete, but Contract v1.1 requires the provenance fixture to exactly match the generated chain at its canonical locator.

Required remediation:

- Remove duplicate claim IDs from the authoritative raw chains and provenance fixture as appropriate.
- Ensure the provenance fixture `evidence_claim_ids` exactly matches the generated `/core_identity` provenance entry.
- Rebuild and rerun required validation in a replacement candidate sequence.

### Review Validation Summary

- Preflight matched expected worktree, branch, current HEAD, candidate SHA, workflow-record SHA, Gate 1+2 SHA, program base SHA, and ancestry.
- Candidate scope was semantic/generated/fixture only; workflow-record scope was governance only.
- Claim roles checked: 96 total, 89 substantive, 6 discovery, 1 support, 0 unclassified.
- Substantive evidence locations, source IDs, canonical IDs, content hashes, generated consumers, discovery/support isolation, and public/recruiter stale-copy scan passed.
- `node research/audit-semantic-readiness.mjs --targets=RG` passed.
- `node research/validate-semantic-readiness.mjs --targets=RG` passed.
- `node research/semantic-candidate-scope-tests.js` passed.
- `npm.cmd run test:semantic-readiness` passed.
- `npm.cmd run test:placement` passed.
- `npm.cmd run test:faction-context-isolation` passed.
- `npm.cmd run test:source-generated` passed with unchanged non-Gruul JESKAI/MARDU model-owned inhibitor warnings only.
- `npm.cmd test` passed.
- Exact candidate-scope validator reported only the documented RG target-scoped display-source exceptions for `data/identity-layers.json` and embedded RG preview copy in `data/factions.json`.
- `git diff --check` passed.

## Independent Replacement Review - 2026-07-16

- Reviewer: Codex independent replacement review window.
- Rejected original candidate: `73f4f5103b0ce9605260aa6ee6ae44b03ccc4d33`
- Original request-changes review record: `04c0933825c985373336ba9bdbfccbbcf29d8e82`
- Replacement review base: `04c0933825c985373336ba9bdbfccbbcf29d8e82`
- Exact replacement candidate reviewed: `16b58c3f32d92e6406d368169d91b0b6a86f948d`
- Replacement workflow-record commit checked: `3fa4580e874e457c26b11b36705786863934963a`
- Decision: `APPROVE EXACT SHA 16b58c3f32d92e6406d368169d91b0b6a86f948d`
- Certification: not performed.
- `semantically_ready`: not set.
- VM-513: not started.

### Replacement Review Findings

- Blocker findings: none.
- High findings: none.
- Medium findings: none.
- Low findings: none.
- Non-blocking observation: the active worktree had an unrelated side-scan handoff/index baseline during review; it was not treated as candidate content and was not included in the VM-512 review-record commit.

### Replacement Review Evidence

- Reproduced the original rejected-candidate defect: raw `/core_identity`, `/site_surface`, `/placement_summary`, and fixture chains contained duplicate `claim_gruul_clans_structure_0005` and/or `claim_gruul_clans_placement_0072`, while generated `/core_identity` provenance contained 25 unique IDs.
- Verified replacement raw profile `/core_identity`: 25 total, 25 unique, no duplicates.
- Verified replacement raw profile `/site_surface`: 22 total, 22 unique, no duplicates.
- Verified replacement raw placement `/placement_summary`: 37 total, 37 unique, no duplicates.
- Verified generated `/core_identity` provenance: 25 total, 25 unique, no duplicates.
- Verified fixture `gruul_core_identity_provenance`: 25 total, 25 unique, no duplicates.
- Verified generated and fixture `/core_identity` chains have the same canonical locator, same ordered claim-ID array, same count, no missing IDs, and no extra IDs.
- Verified 96 total Gruul claims: 89 substantive, 6 discovery, 1 support, 0 unclassified.
- Verified every substantive claim has bounded evidence locations with `evidence_scope`.
- Verified discovery/support records do not appear in authoritative profile, placement, generated provenance, or fixture proof chains.
- Verified RG provenance count remains 167 with non-null canonical IDs and content hashes.
- Verified public/recruiter high-risk terms remain only as explicit negative guardrails, not as affirmative Gruul identity copy.
- Verified required neighbor boundaries remain present for `GENERIC_RG_OVERFIT`, `R`, `G`, `BR`, `BG`, `WR`, `UR`, `UG`, `WG`, `JUND`, `NAYA`, and `TEMUR`.
- Verified deterministic generation with two `npm.cmd run build:factions` passes and no generated diff.

### Replacement Review Validation

- JSON parse checks for replacement candidate JSON files - passed.
- Duplicate-ID and exact fixture-versus-generated checks - passed.
- Explicit substantive evidence-scope check - passed.
- Discovery/support isolation check - passed.
- Stale public/recruiter-copy scan - passed; risky terms appeared only in negative guardrail context.
- `npm.cmd run build:factions` - passed twice with no generated diff.
- `node research/audit-semantic-readiness.mjs --targets=RG` - passed.
- `node research/validate-semantic-readiness.mjs --targets=RG` - passed.
- `node research/semantic-candidate-scope-tests.js` - passed.
- `npm.cmd run test:semantic-readiness` - passed.
- `npm.cmd run test:placement` - passed.
- `npm.cmd run test:faction-context-isolation` - passed.
- `npm.cmd run test:source-generated` - passed with unchanged non-Gruul JESKAI/MARDU model-owned inhibitor warnings only.
- `npm.cmd test` - passed.
- `git diff --check` - passed with CRLF warnings only.
- `node research/validate-semantic-candidate-scope.mjs --base=04c0933825c985373336ba9bdbfccbbcf29d8e82 --target=16b58c3f32d92e6406d368169d91b0b6a86f948d --identity=RG` - passed.

## Certification and Program Acceptance - 2026-07-16

- Certified identity: Gruul / RG.
- VM: VM-512.
- Contract version: v1.1.
- Approved replacement candidate SHA: `16b58c3f32d92e6406d368169d91b0b6a86f948d`.
- Replacement workflow-record SHA: `3fa4580e874e457c26b11b36705786863934963a`.
- Exact approval review record: `ff973268c211b08c288b401c8f59b58b910c4d51`.
- Independent review decision: `APPROVE EXACT SHA 16b58c3f32d92e6406d368169d91b0b6a86f948d`.
- Rejected original candidate SHA: `73f4f5103b0ce9605260aa6ee6ae44b03ccc4d33`.
- Original request-changes review record: `04c0933825c985373336ba9bdbfccbbcf29d8e82`.
- Remaining findings: none at blocker, high, medium, or low severity.
- Final certification state: `semantically_ready`.
- Certification guard validation: passed before governance edits.
- Certification commit: this VM-512 certification commit; exact SHA reported in final task output.

Program acceptance:

- Approved replacement candidate and replacement workflow record accepted into the CRIT-001 program base.
- VM-512 closed as Done.
- Certified identity count advanced to 11.
- VM-513 Dimir / UB branch setup only; Gate 1+2 pending.
- No Dimir evidence inspection, audit, remediation, candidate, review, or certification work started.
- No semantic candidate, raw, generated, fixture, provenance, recruiter, runtime, source, schema, validator, or test files changed during certification.

## Review Remediation - Replacement Candidate - 2026-07-16

- Rejected original candidate: `73f4f5103b0ce9605260aa6ee6ae44b03ccc4d33`
- Original workflow-record commit: `3aef320949bacec91923b8086048abd283fbecdb`
- Request-changes review record: `04c0933825c985373336ba9bdbfccbbcf29d8e82`
- Review decision remediated: `REQUEST CHANGES`
- Approval-blocking finding: duplicate `claim_gruul_clans_structure_0005` and `claim_gruul_clans_placement_0072` entries made `gruul_core_identity_provenance` diverge from generated `/core_identity` provenance.
- Replacement candidate SHA: `16b58c3f32d92e6406d368169d91b0b6a86f948d`
- Replacement candidate subject: `VM-512 remediate Gruul review findings candidate`
- Status after replacement candidate: awaiting independent review.
- Certification: not performed.
- `semantically_ready`: not set.
- VM-513: not started.

### Replacement Remediation Scope

Changed only:

- `data/raw-factions/gruul_clans/gruul_clans.profile.json`
- `data/raw-factions/gruul_clans/gruul_clans.placement.json`
- `research/fixtures/semantic-readiness/gruul_clans.semantic-fixtures.json`

Removed only duplicate claim-ID occurrences:

- `data/raw-factions/gruul_clans/gruul_clans.profile.json#/core_identity/claim_ids`: removed the later `claim_gruul_clans_structure_0005` and later `claim_gruul_clans_placement_0072`.
- `data/raw-factions/gruul_clans/gruul_clans.profile.json#/site_surface/evidence_claim_ids`: removed the later `claim_gruul_clans_placement_0072`.
- `data/raw-factions/gruul_clans/gruul_clans.placement.json#/placement_summary/claim_ids`: removed the later `claim_gruul_clans_structure_0005` and later `claim_gruul_clans_placement_0072`.
- `research/fixtures/semantic-readiness/gruul_clans.semantic-fixtures.json#/fixtures/gruul_core_identity_provenance/evidence_claim_ids`: removed the later `claim_gruul_clans_structure_0005` and later `claim_gruul_clans_placement_0072`.

No claim text, semantic roles, evidence scopes, source mappings, semantic wording, generated public copy, recruiter copy, neighbor boundaries, scoring, calibration, Hall/Crucible behavior, runtime logic, schemas, validators, or non-Gruul identity files were changed.

### Replacement Exact-Chain Result

- `profile#/core_identity`: 25 total, 25 unique, no duplicates.
- `profile#/site_surface`: 22 total, 22 unique, no duplicates.
- `placement#/placement_summary`: 37 total, 37 unique, no duplicates.
- Generated provenance `data/raw-factions/gruul_clans/gruul_clans.profile.json#/core_identity`: 25 total, 25 unique, no duplicates.
- Fixture `gruul_core_identity_provenance`: 25 total, 25 unique, no duplicates.
- Fixture and generated `/core_identity` claim-ID lists are exactly equal in claim IDs, order, count, canonical locator, and evidence-chain membership.
- Missing IDs: none.
- Extra IDs: none.

### Replacement Validation

- `npm.cmd run build:factions` - passed twice; second run produced no additional diff.
- JSON parse checks for changed JSON files - passed.
- Duplicate-ID checks for `/core_identity`, `/site_surface`, `/placement_summary`, generated RG provenance, and RG fixture chains - passed.
- Exact fixture-versus-generated `/core_identity` comparison - passed.
- Explicit substantive evidence-scope check - passed.
- Discovery-ID isolation check - passed.
- Stale public/recruiter-copy scan - passed; `random rage` and `mindless destruction` remain only as explicit negative guardrail wording.
- `node research/audit-semantic-readiness.mjs --targets=RG` - passed; 96 claims, 89 substantive / 6 discovery / 1 support / 0 unclassified.
- `node research/validate-semantic-readiness.mjs --targets=RG` - passed.
- `node research/semantic-candidate-scope-tests.js` - passed.
- `npm.cmd run test:semantic-readiness` - passed; verified 1666 semantic provenance entries.
- `npm.cmd run test:placement` - passed; 37 factions, 37 golden paths.
- `npm.cmd run test:faction-context-isolation` - passed.
- `npm.cmd run test:source-generated` - passed with unchanged non-Gruul JESKAI/MARDU model-owned inhibitor warnings.
- `npm.cmd test` - passed.
- `git diff --check` / `git diff --cached --check` - passed with CRLF warnings only, no whitespace errors.
- `node research/validate-semantic-candidate-scope.mjs --base=04c0933825c985373336ba9bdbfccbbcf29d8e82 --target=16b58c3f32d92e6406d368169d91b0b6a86f948d --identity=RG` - passed.

## Independent Review - 2026-07-16

- Reviewer: Codex independent review window.
- Review base: `ea6e62a0fbe82975b48612ba02b143fad8a0c74b`
- Exact candidate reviewed: `73f4f5103b0ce9605260aa6ee6ae44b03ccc4d33`
- Workflow-record commit checked: `3aef320949bacec91923b8086048abd283fbecdb`
- Decision: `REQUEST CHANGES`
- Certification: not performed.
- `semantically_ready`: not set.
- VM-513: not started.

### Review Finding

#### MEDIUM - Approval Blocking

The RG provenance fixture does not exactly match the generated provenance entry for `data/raw-factions/gruul_clans/gruul_clans.profile.json#/core_identity`.

Evidence:

- `research/fixtures/semantic-readiness/gruul_clans.semantic-fixtures.json#/fixtures/16/evidence_claim_ids` contains duplicate `claim_gruul_clans_structure_0005` and duplicate `claim_gruul_clans_placement_0072`.
- The generated provenance entry for `data/raw-factions/gruul_clans/gruul_clans.profile.json#/core_identity` deduplicates those IDs, so the fixture claim array has 27 entries while the generated provenance claim array has 25 entries.
- The same duplicate-chain source is present in `data/raw-factions/gruul_clans/gruul_clans.profile.json#/core_identity/claim_ids`, `data/raw-factions/gruul_clans/gruul_clans.profile.json#/site_surface/evidence_claim_ids`, and `data/raw-factions/gruul_clans/gruul_clans.placement.json#/placement_summary/claim_ids`.
- Claim/source sets are substantive-only and complete, but Contract v1.1 requires the provenance fixture to exactly match the generated chain at its canonical locator.

Required remediation:

- Remove duplicate claim IDs from the authoritative raw chains and provenance fixture as appropriate.
- Ensure the provenance fixture `evidence_claim_ids` exactly matches the generated `/core_identity` provenance entry.
- Rebuild and rerun required validation in a replacement candidate sequence.

### Review Validation Summary

- Preflight matched expected worktree, branch, current HEAD, candidate SHA, workflow-record SHA, Gate 1+2 SHA, program base SHA, and ancestry.
- Candidate scope was semantic/generated/fixture only; workflow-record scope was governance only.
- Claim roles checked: 96 total, 89 substantive, 6 discovery, 1 support, 0 unclassified.
- Substantive evidence locations, source IDs, canonical IDs, content hashes, generated consumers, discovery/support isolation, and public/recruiter stale-copy scan passed.
- `node research/audit-semantic-readiness.mjs --targets=RG` passed.
- `node research/validate-semantic-readiness.mjs --targets=RG` passed.
- `node research/semantic-candidate-scope-tests.js` passed.
- `npm.cmd run test:semantic-readiness` passed.
- `npm.cmd run test:placement` passed.
- `npm.cmd run test:faction-context-isolation` passed.
- `npm.cmd run test:source-generated` passed with unchanged non-Gruul JESKAI/MARDU model-owned inhibitor warnings only.
- `npm.cmd test` passed.
- Exact candidate-scope validator reported only the documented RG target-scoped display-source exceptions for `data/identity-layers.json` and embedded RG preview copy in `data/factions.json`.
- `git diff --check` passed.
