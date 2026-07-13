# VM-504 Silverquill Semantic Recovery

## Gate 1 Semantic Audit ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â Contract v1.1

Status: Gate 1 complete; Silverquill remains uncertified.
Branch: `codex/vm-504-silverquill-semantic-recovery`
Starting SHA / current HEAD during audit: `3baa8307cf1d6b23aab1564b866e6580e500cf66`
Program base: `3baa8307cf1d6b23aab1564b866e6580e500cf66`
Contract: `v1.1`
Audit date: 2026-07-12

## Executive Summary

Silverquill shares the thin Strixhaven packet pattern found in Prismari and Quandrix: 18 claim records, three claim-bearing official sources, ten discovery-only story-corpus records, two support-only product/card records, and four raw discriminator questions. The packet has a real official-source identity floor, but it is not semantically ready under CRIT-001 Contract v1.1.

Primary issue: structurally valid references promote discovery/search records into authoritative profile, placement, and generated-provenance chains. This is the same structural-versus-semantic defect CRIT-001 was designed to catch.

Primary disposition: `Claim-extraction pass required`.

Gate 2 evidence confirmation is required before canonical remediation. Gate 1 did not prove that broad new source discovery is required; existing official sources, local Silverquill architecture notes, and already-listed story/archive records appear likely sufficient for a bounded Gate 2 plan, but that must be confirmed before Gate 3.

## Worktree Preservation Statement

- CRIT worktree branch verified as `codex/vm-504-silverquill-semantic-recovery`.
- CRIT worktree began at `3baa8307cf1d6b23aab1564b866e6580e500cf66` with no uncommitted Silverquill work.
- Original dirty main worktree `C:\dev\mtgSiteWIP` was checked read-only and remains unchanged.
- No Silverquill canonical raw data, generated artifacts, runtime files, Hall/Crucible content, scoring, inhibition, confidence, scheduling, tie-ordering, or global recruiter behavior was modified.

## Scope and Non-Goals

Gate 1 was read-only semantic audit plus workflow documentation. It did not remediate Silverquill, rebuild generated outputs, create a candidate recovery commit, certify Silverquill, or start another identity.

Local research boundary was honored. `docs/research/canon/strixhaven-college-reference-audit.md` and `docs/research/canon/ten-guild-reference-audit.md` were used as discovery/audit guides only. No online lookup was performed.

## Preflight Context

Recent related work: VM-502 Prismari, VM-506 Lorehold, and VM-503 Quandrix are certified `semantically_ready` under Contract v1.1. VM-504 Silverquill was branch setup only before this audit.

Known risks: Silverquill has the same suspicious Strixhaven packet shape as Prismari and Quandrix. Discovery-only story rows may be counted as semantic evidence. Support-only Commander/product/card rows may be present in authoritative chains. Generated provenance can preserve invalid evidence chains unless canonical references are repaired.

Relevant decisions: Contract v1.1 requires explicit semantic roles, bounded evidence for remediated substantive claims, evidence mappings for recruiter guidance, and generated provenance coverage. Runtime calibration, Hall/Crucible behavior, scoring, inhibition, confidence, scheduling, and live recruiter outcomes remain out of CRIT-001 identity certification scope.

Do not touch during VM-504 Gate 1: Silverquill canonical raw data, generated artifacts, certified Prismari/Lorehold/Quandrix packets, runtime/global recruiter behavior, or the original dirty main worktree.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-504-silverquill-semantic-recovery.md`
- `docs/incidents/CRIT-001-faction-semantic-readiness-integrity.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/reference/strixhaven-college-source-readiness-matrix.md`
- `docs/research/canon/strixhaven-college-reference-audit.md`
- `docs/research/canon/ten-guild-reference-audit.md`
- `docs/handoffs/2026-05-18-1150-codex-vm053-silverquill-identity-support-cleanup.md`
- `docs/handoffs/2026-05-18-1205-codex-vm061-silverquill-metaphysics.md`
- `docs/architecture/colors/silverquill/identity.md`
- `docs/architecture/colors/silverquill/metaphysics.md`
- `data/raw-factions/silverquill/silverquill.claims.json`
- `data/raw-factions/silverquill/silverquill.sources.json`
- `data/raw-factions/silverquill/silverquill.profile.json`
- `data/raw-factions/silverquill/silverquill.placement.json`
- `data/raw-factions/silverquill/silverquill.changelog.json`
- `data/factions.json`
- `data/placement-model.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `data/semantic-readiness-provenance.json`

## Git and History Notes

Relevant Silverquill raw-packet history: `f6a1dd4` introduced the raw/generated packet with adaptive runtime, `18f5112` was a batch foundation update, and `8cf7702` / `9322e58` published source-bound cleanup bundles. The changelog confirms initial official-source claims, a corpus-search upgrade, and a later VM-378 support-only richness pass.

This is materially similar to Prismari and Quandrix rather than a mature Lorehold-style source extraction.

## Claim-Role Audit

Silverquill has 18 claim records. None currently carry certifying `semantic_role`, so the validator treats them as not certification-ready.

| Role | Count | Audit confidence | Notes |
| --- | ---: | --- | --- |
| `substantive_claim` | 6 | High | `silverquill_claim_001` through `silverquill_claim_006` assert official/source-backed identity, magic, personality, theme, academics, and placement interpretation. They still need explicit semantic roles and bounded evidence locations before certification. |
| `discovery_record` | 10 | High | `silverquill_claim_0007` through `silverquill_claim_0016` are `story_corpus_evidence` rows that record search-query matches, not extracted story facts. |
| `support_record` | 2 | High | `silverquill_claim_0017` and `silverquill_claim_0018` are product/navigation/card-data support rows. |
| `unclassified` | 0 proposed / 6 validator-current | High | Current validator reports the first six claims as unclassified because the canonical file lacks `semantic_role`. |

Evidence: direct official-source claims appear in `silverquill.claims.json` at lines 9, 22, 34, 46, 58, and 70. Story-corpus discovery rows begin at line 83 and continue through `silverquill_claim_0016`. Product/card support rows appear at lines 213 and 225.

## Discovery-Record Audit

Discovery/search records are used as semantic proof and are blockers.

| File | JSON pointer | Statement / consumer | Cited claim(s) | Problem | Severity |
| --- | --- | --- | --- | --- | --- |
| `silverquill.profile.json` | `/core_identity` | Core identity, philosophy, central tension | `silverquill_claim_0007`-`0014` | Discovery rows only record story search matches; they do not prove identity/tension prose. | BLOCKER |
| same | `/site_surface` | Public tagline | `silverquill_claim_0007`-`0010` | Discovery rows cannot prove public display language. | HIGH |
| same | `/structure` | Official guide structure/magic summary | `silverquill_claim_0007`-`0010` | Existing substantive claims `001`, `002`, `004`, `005` are better support candidates. | BLOCKER |
| same | `/great_tension` | Uplift vs personal dominance | `silverquill_claim_0007`-`0011` | Discovery rows cannot prove tension. | BLOCKER |
| same | `/mechanics` | Word-magic, leadership, morale, criticism, WB pressure | `silverquill_claim_0007`-`0010` | Discovery rows cannot prove mechanics meaning. | HIGH |
| `silverquill.placement.json` | `/placement_summary` | Placement summary and calibrated read | `silverquill_claim_0007`-`0014` plus `evidence_claim_ids` `001`-`006` | Mixed chain includes invalid discovery evidence. | BLOCKER |
| same | `/placement_axes/0` | Language Power vs Vague Intention axis | `silverquill_claim_0007`-`0014` | Search-match rows are promoted into placement axis evidence. | BLOCKER |
| same | `/moral_and_psychological_profile` | Faction-specific behavioral scoring | `silverquill_claim_0007`-`0011` | Search-match rows cannot prove behavioral model. | BLOCKER |
| same | `/core_values/0`-`/core_values/9` | Corpus-derived values such as names/keywords | `silverquill_claim_0007`-`0009` | Search hits are treated as core placement values. | BLOCKER |
| same | `/behavioral_signals/0` | Story-context behavioral signal | `silverquill_claim_0007`-`0012` | Search hits are treated as behavioral evidence. | BLOCKER |
| same | `/inhibitor_traits/0` | Generic color-pair overfit inhibitor | `silverquill_claim_0007`-`0010` | Useful concept, invalid evidence chain. | HIGH |

The discovery records are not harmless bibliography leads because they flow into profile, placement, and generated provenance.

## Potential Role-Invalid Support-Link Audit

The structural audit reported 28 potential role-invalid support links. Gate 1 classification:

| Category | Audit result | Notes |
| --- | --- | --- |
| Profile discovery-backed identity/tension/mechanics | Real blockers | `/core_identity`, `/site_surface`, `/structure`, `/great_tension`, `/mechanics` must move to substantive support or explicit metadata. |
| Placement discovery-backed semantic chains | Real blockers | `/placement_summary`, `/placement_axes/0`, `/moral_and_psychological_profile`, `/core_values/*`, `/behavioral_signals/0`, `/inhibitor_traits/0` must be repaired. |
| `key_figures/1` and `key_figures/2` support rows | Suspected blocker/high | Killian and Scriv are product/decklist support as currently cited. Keep only as auxiliary product/navigation unless Gate 2 finds substantive character evidence. |
| `canonical_flavor_text/*` support rows | Likely false positive after proper auxiliary marking | These can remain if explicitly isolated as card/flavor support and not identity proof. |
| `commander_compass/native_fit_commanders/*/source_basis` support rows | Likely false positive after proper auxiliary marking | These can remain as product/navigation support with explicit boundary. |
| `commander_compass/identity_basis/supporting_claim_ids` includes support records | Suspected blocker/high | The identity-basis chain includes `silverquill_claim_0017` and `0018`; if the prose is authoritative, support records must be moved to auxiliary fields. |

## Profile Entailment Audit

| Section | Result | Reason |
| --- | --- | --- |
| `profile` | PASS WITH BLOCKING ROLE/LINKAGE LIMITATION | The prose is broadly supported by first-six claims, but validator cannot certify until semantic roles are assigned. |
| `core_identity` | FAIL | Uses discovery rows for identity/tension proof. |
| `site_surface` | FAIL | Tagline uses discovery rows. |
| `structure` | FAIL | Official guide summary cites discovery rows instead of substantive official-source claims. |
| `great_tension` | FAIL | Uplift/dominance tension is plausible from local architecture and official framing, but current evidence chain is discovery-only. |
| `key_figures` | PASS WITH BLOCKING LIMITATION | Rinald has substantive official-source support; Killian and Scriv are product support only unless Gate 2 finds substantive character evidence. |
| `canonical_flavor_text` | PASS WITH NON-BLOCKING LIMITATION | Acceptable only as auxiliary card/flavor support; not identity proof. |
| `mechanics` | FAIL | Mechanics summary cites discovery rows. |
| `commander_compass` | PASS WITH BLOCKING LIMITATION | Product/navigation framing is explicit, but identity-basis support chain includes support records. |
| `search_and_filter_metadata`, `data_quality`, `research_limitations` | PASS WITH NON-BLOCKING LIMITATION | Acceptable metadata containers if not used as semantic proof. |

## Placement Entailment Audit

| Section | Result | Reason |
| --- | --- | --- |
| `ideal_fit_indicators` | PASS WITH BLOCKING ROLE/LINKAGE LIMITATION | Uses first-six claims; needs explicit semantic roles/bounded evidence. |
| `poor_fit_indicators` | PASS WITH BLOCKING ROLE/LINKAGE LIMITATION | Same. |
| `discriminator_questions` | PASS WITH BLOCKING ROLE/LINKAGE LIMITATION | Four questions cite `001`-`003`; wording is generally supported, but claim roles/evidence localization are missing. |
| `chatbot_guidance` | FAIL | Match/mismatch/uncertainty arrays lack evidence mappings. |
| `placement_summary` | FAIL | Includes discovery-backed `claim_ids` even though `evidence_claim_ids` point to first-six claims. |
| `placement_axes/0` | FAIL | Corpus-search rows are treated as axis evidence. |
| `moral_and_psychological_profile` | FAIL | Discovery rows cannot support behavioral scoring model. |
| `core_values/0`-`core_values/9` | FAIL | Search keywords and names are treated as core values. |
| `behavioral_signals/0` | FAIL | Story search hits are treated as behavioral signal proof. |
| `inhibitor_traits/0` | HIGH | Color-pair overfit guardrail is useful, but its evidence chain is discovery-backed. |
| `collision_guidance` | PASS WITH BLOCKING ROLE/LINKAGE LIMITATION | Orzhov, Dimir, and Prismari boundaries use first-six claims and look directionally plausible; Gate 2 must confirm whether Dimir and Prismari boundaries are sufficiently bounded. |

Unsupported or overbroad wording risks: generated/public recruiter copy says Silverquill is ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“the most visible people in every roomÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â and ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“the most visible person in the room.ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â This may be valid Vox Mana synthesis, but the current raw evidence chain must explicitly support or narrow it before certification. ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“Performance and reputationÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â is plausible, but Gate 2 should ensure reputation/status is supported by claims and not just architecture prose.

## Required Contract v1.1 Dimensions

| Dimension | Result | Evidence / limitation |
| --- | --- | --- |
| Core identity | PASS WITH BLOCKING ROLE/LINKAGE LIMITATION | First-six official claims support identity; canonical chains currently cite discovery rows. |
| Internal tension | UNRESOLVED / HIGH | Uplift vs dominance is present in profile/architecture, but Gate 2 must confirm direct bounded evidence. |
| Motivation | PASS WITH LIMITATION | Rhetorical precision/influence is present; needs evidence mapping. |
| Preferred method | PASS WITH LIMITATION | Word magic, spoken/written/signed word, ink/light support method; needs bounded locations. |
| Mature expression | UNRESOLVED | ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“Inspire/uplift/leadershipÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â is present but should be extracted into substantive claims. |
| Unhealthy expression | UNRESOLVED | ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“Wound/domination/intimidationÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â is present but needs bounded support. |
| Failure or pressure behavior | FAIL | Current packet lacks explicit grounded pressure/failure behavior beyond generic mismatch/guardrails. |
| Positive inclusion evidence | PASS WITH LIMITATION | Existing ideal-fit indicators and first-six claims provide a basis. |
| Negative exclusion evidence | PASS WITH LIMITATION | Poor-fit and collision guidance exists, but mapping is incomplete. |
| Ambiguous/uncertainty evidence | FAIL | Uncertainty questions exist but lack evidence mapping and fixture-ready support. |
| Required-neighbor boundaries | PASS WITH LIMITATION | Orzhov, Dimir, Prismari boundaries exist; Gate 2 must confirm bounded neighbor set and evidence. |
| Source-to-runtime traceability | FAIL | Generated provenance carries discovery/support chains; recruiter guidance lacks evidence mapping. |

## Required-Neighbor Audit

Bounded required-neighbor set proposed for Gate 2 confirmation:

| Neighbor | Why required | Current coverage | Gate 1 result |
| --- | --- | --- | --- |
| `WB` / Orzhov | Same color pair and explicit collision guidance; local canon audit names Silverquill-Orzhov as the college/guild twin. | Existing collision guidance separates sentence/rhetorical force from ledger/debt/obligation. | Required; likely strong but needs bounded evidence and neutral wording. |
| `HOUSE_DIMIR` | Current collision guidance; overlap around language, manipulation, secrecy/information. | Existing guidance separates remembered public phrase from hidden hand. | Required; needs evidence confirmation because Dimir is not same-color but is an existing canonical collision. |
| `PRISMARI` | Existing paired collision; overlap around performance, public expression, and moving a room. | Existing guidance separates word magic/rhetoric from art/performance/elemental spectacle. | Required; must avoid unsupported stereotypes and align with certified Prismari recovery. |
| `WU` / Azorius | Local Silverquill architecture flags structured language vs law/procedure as a guardrail. | Present only as architecture/generated ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“not to be confusedÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â language, not raw collision guidance. | Gate 2 should decide whether to include as required neighbor or non-blocking guardrail. |
| `SELESNYA` | Local architecture mentions selfless belonging as suppressor. | Present in calibration suppressors only. | Candidate optional; do not force unless Gate 2 finds actual placement ambiguity. |
| `BOROS` | Local architecture explicitly says Boros is cautionary thin evidence. | Not enough direct Silverquill anchor. | Out of required set for now unless Gate 2 finds stronger evidence. |

## Generated Propagation Audit

Generated consumers preserve the current canonical Silverquill meaning but also preserve its invalid evidence chains.

Observed generated state:

- `data/placement-model.json` contains Silverquill identity/philosophy/core_tension/mechanics, discriminator questions, fit indicators, inhibitors, and neighbor guidance generated from the current raw packet.
- `supabase/functions/guild-recruiter/faction-context.ts` contains Silverquill public/recruiter prose, discriminator questions, and evidence IDs.
- `data/semantic-readiness-provenance.json` has 46 Silverquill entries. Multiple entries cite `silverquill_claim_0007` and other discovery rows as evidence for generated semantic consumers.

Findings:

- Missing consumers: none obvious at Gate 1.
- Stale/unsupported generated language: likely present where public/recruiter copy intensifies ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“visible,ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“status,ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“personal power,ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â and ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“performanceÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â framing beyond currently bounded claims. Gate 2 should trace this to raw/profile/identity-layer sources before Gate 4.
- Internal claim IDs leak into recruiter prose: not observed as visible prose leakage; IDs appear in internal evidence arrays, which is expected.
- Provenance points to non-substantive/unclassified records: yes, discovery/support chains appear in provenance and block certification.
- Content hash/pointer issues: not audited as stale because Gate 1 does not rebuild; Gate 4 must validate after remediation.

## Maturity / Thin-Packet Test

Conclusion: `Thin-packet pattern confirmed; claim extraction and conceptual expansion required.`

Evidence:

- 18 total claim records.
- 6 likely substantive records, 10 discovery/search records, 2 support records.
- `npm.cmd run audit:semantic-readiness -- --targets=SILVERQUILL` reports `low-volume-pattern`, `mixed-role-pattern`, `discovery-heavy-pattern`, and `support-heavy-pattern`.
- Claim-bearing source rate is 3/15 = 0.20.
- Current semantic-readiness validator reports missing semantic roles, missing recruiter mappings, authoritative references without substantive claims, and missing identity semantic fixtures.
- Local Silverquill architecture/metaphysics files are stronger than the raw packet, but they are Vox Mana synthesis/internal architecture. Gate 2 can use them as extraction guides, not automatic proof.

This does not prove Silverquill needs complete reconstruction. It does prove Silverquill cannot be certified with light role/provenance cleanup alone.

## Findings by Severity

### BLOCKER

1. All 18 claims lack certifying `semantic_role`.
2. Discovery/search records support authoritative profile chains.
3. Discovery/search records support authoritative placement chains, including placement summary, axis, core values, behavioral signal, and inhibitor.
4. Recruiter match/mismatch/uncertainty guidance lacks evidence mapping.
5. Generated provenance carries discovery-backed semantic chains.
6. Silverquill lacks semantic fixtures required by Contract v1.1.

### HIGH

1. Support/product records appear in identity-basis or quasi-authoritative chains and need auxiliary isolation.
2. Internal tension, mature expression, unhealthy expression, and failure/pressure behavior require bounded evidence confirmation or new extraction from existing sources.
3. Required-neighbor set and evidence mapping need explicit bounded selection.
4. Generated/public recruiter copy may contain over-strong visibility/status/performance language until traced to source-backed claims.

### MEDIUM

1. Existing discriminator questions appear directionally supported but need bounded claim/evidence mapping.
2. Dimir and Prismari neighbor boundaries need neutral, source-backed wording review.
3. Local architecture docs contain useful project synthesis but cannot substitute for canonical raw claims.

### LOW

1. Card/flavor and Commander deck support can remain useful if explicitly auxiliary.
2. Historical corpus rows can remain discovery metadata if kept out of semantic proof chains.

### NON-BLOCKING OBSERVATION

1. Silverquill has richer local architecture documents than its raw packet reflects. Gate 2 may be efficient because extraction targets are already well mapped.
2. The local canon audit says Silverquill and Quandrix full narrative taxonomies were extracted and read on 2026-06-10, but those taxonomies are project synthesis unless corroborated by underlying sources.

## Primary Disposition

`Claim-extraction pass required`

Why not merely `Claim-role classification required`? Role classification alone would still leave discovery/search rows as the current support for profile, placement, core values, behavioral signals, and generated provenance. Silverquill needs bounded substantive claims extracted or mapped from existing official/local sources to replace those chains.

Why not `Complete packet reconstruction required`? The first six claims and local Silverquill architecture provide a real foundation. Gate 1 did not prove that the packet must be rebuilt from scratch.

## Minimal Bounded Repair List

### Required for certification

1. Add `semantic_role` to all 18 claims.
2. Preserve `silverquill_claim_0007`-`0016` as discovery records unless Gate 2 extracts new substantive claims from the underlying story sources.
3. Preserve `silverquill_claim_0017` and `0018` as support records.
4. Add bounded evidence locations for all remediated substantive claims.
5. Extract or confirm substantive claims for internal tension, mature expression, unhealthy expression, pressure/failure behavior, mechanics, and required-neighbor boundaries using already-listed sources first.
6. Remove discovery rows from authoritative profile chains.
7. Remove discovery rows from authoritative placement chains.
8. Repair or replace search-term-backed core values and behavioral/inhibitor signals.
9. Add `evidence_claim_ids` mappings to recruiter match, mismatch, and uncertainty guidance.
10. Isolate support/product/card records into explicit auxiliary support containers only.
11. Define bounded required neighbors and evidence mappings, expected at least `WB`/Orzhov, `HOUSE_DIMIR`, and `PRISMARI`, with `WU`/Azorius considered in Gate 2.
12. Ensure generated provenance after Gate 4 contains no discovery/support records as semantic proof.
13. Add Silverquill semantic fixtures.

### Optional / non-blocking

1. Promote story-corpus discovery rows into substantive story claims only where bounded source reading supports a certification blocker.
2. Preserve local architecture/metaphysics as project synthesis notes; do not over-import it into canonical claims without source support.
3. Consider whether Azorius/Selesnya remain non-blocking guardrails rather than required neighbors.

### Out of scope for CRIT-001

1. Hall/Crucible scheduling or wording changes.
2. Scoring, confidence, inhibition, tie-ordering, or adaptive scheduling changes.
3. Live recruiter model behavior.
4. Exhaustive Silverquill lore enrichment.
5. Broad online research absent a Gate 2 blocker.

## Gate 2 Recommendation

Gate 2 evidence confirmation is required.

Gate 2 should not perform broad online research. It should:

1. Map all 18 claims to proposed roles.
2. Confirm which existing official-source claims can support current profile/placement statements.
3. Identify exact replacement claims needed for discovery-backed profile and placement chains.
4. Decide whether existing official sources and local source captures are sufficient to extract mature/unhealthy/failure-pressure dimensions.
5. Confirm the bounded required-neighbor set.
6. Produce an exact Gate 3 remediation checklist.

Targeted source discovery should be requested only if Gate 2 proves a certification blocker cannot be supported from already-listed sources or local repo source captures.

## Validation Commands Run

- `git status --short --branch`
- `git -C C:\dev\mtgSiteWIP-crit001 merge-base --is-ancestor 3baa8307cf1d6b23aab1564b866e6580e500cf66 HEAD`
- `git -C C:\dev\mtgSiteWIP status --short --branch`
- `npm.cmd run audit:semantic-readiness -- --targets=SILVERQUILL`
- `node research/validate-semantic-readiness.mjs --targets=SILVERQUILL` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â expected failure for Gate 1; failures documented above.`r`n- `git diff --check` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â passed after documentation updates.

`build:factions`, source/generated validation, full test suite, parser tests, and generated rebuilds were intentionally deferred because Gate 1 is read-only and generated artifacts must not be modified.

## Final Gate 1 Status

- Silverquill remains uncertified.
- Gate 1 audit is complete.
- Gate 2 evidence confirmation is required.
- No canonical Silverquill files were changed.
- No generated files were changed.
- Prismari, Lorehold, and Quandrix remain certified.
- No other identity was started.
- Original dirty main worktree remains untouched.

## Gate 2 Evidence Confirmation

Status: Gate 2 complete; Silverquill remains uncertified.
Branch / HEAD during Gate 2: `codex/vm-504-silverquill-semantic-recovery` at `3baa8307cf1d6b23aab1564b866e6580e500cf66`.
Scope: documentation-only evidence confirmation. No canonical Silverquill raw data, generated artifacts, runtime files, or certified identities were modified.

### Gate 2 Conclusion

Gate 2 confirms that Silverquill needs a bounded claim-extraction and evidence-chain repair pass, but it does not require broad source discovery right now.

Existing records are sufficient to define the Gate 3 remediation plan:

- the first six Silverquill claims can become substantive after semantic-role assignment and bounded evidence localization;
- `silverquill_claim_0007` through `silverquill_claim_0016` must remain discovery records unless Gate 3 explicitly reads and extracts bounded story claims from those already-listed story/archive sources;
- `silverquill_claim_0017` and `silverquill_claim_0018` must remain support records and be isolated as auxiliary product/card support;
- profile, placement, recruiter guidance, and provenance chains currently backed by discovery records can be repaired from existing first-six claims plus a small number of new substantive claims extracted from already-listed official sources and local project-architecture guidance.

Targeted source discovery is not required at this stage. Gate 3 may need targeted source localization/access for already-listed official source pages if the exact passages are not cached locally; that is not a new discovery program.

### Claim-Role Mapping Summary

| Claim ID | Current type | Proposed semantic role | Reason | Needs bounded evidence localization? | May support profile / placement / guidance / provenance? |
| --- | --- | --- | --- | --- | --- |
| `silverquill_claim_001` | `identity` | `substantive_claim` | Official-source identity claim: Silverquill is WB College of Eloquence. | Yes | Yes: core identity, profile overview, placement summary, questions, Orzhov/Dimir/Prismari boundary floor. |
| `silverquill_claim_002` | `magic` | `substantive_claim` | Official 2021 guide claim: word magic, spoken-word battle poetry, written magical manifestations. | Yes | Yes: method, mechanics, q1/q2, match guidance, Prismari boundary. |
| `silverquill_claim_003` | `personality` | `substantive_claim` | Official 2021 guide claim: stylish, intimidating, driven, competitive, natural leaders. | Yes | Yes: leadership, pressure, reputation/status only if bounded carefully. |
| `silverquill_claim_004` | `theme` | `substantive_claim` | Official 2026 guide claim: spoken, written, signed word; ink/light manifestation. | Yes | Yes: method, structure, public copy, Prismari boundary. |
| `silverquill_claim_005` | `academics` | `substantive_claim` | Official 2026 guide claim: study areas. | Yes | Yes: institutional/academic role; Azorius/Dimir guardrail if used carefully. |
| `silverquill_claim_006` | `placement` | `substantive_claim` | Project placement synthesis from official identity/mechanics; useful if labeled interpretive. | Yes | Yes: placement summary, positive/negative guidance, calibration, neighbor ambiguity. |
| `silverquill_claim_0007` | `story_corpus_evidence` | `discovery_record` | Search-match row only; does not extract story facts. | No unless promoted through new claim | No semantic support; metadata only. |
| `silverquill_claim_0008` | `story_corpus_evidence` | `discovery_record` | Search-match row only. | No unless promoted through new claim | No semantic support; metadata only. |
| `silverquill_claim_0009` | `story_corpus_evidence` | `discovery_record` | Search-match row only. | No unless promoted through new claim | No semantic support; metadata only. |
| `silverquill_claim_0010` | `story_corpus_evidence` | `discovery_record` | Search-match row only. | No unless promoted through new claim | No semantic support; metadata only. |
| `silverquill_claim_0011` | `story_corpus_evidence` | `discovery_record` | Search-match row only. | No unless promoted through new claim | No semantic support; metadata only. |
| `silverquill_claim_0012` | `story_corpus_evidence` | `discovery_record` | Search-match row only. | No unless promoted through new claim | No semantic support; metadata only. |
| `silverquill_claim_0013` | `story_corpus_evidence` | `discovery_record` | Search-match row only. | No unless promoted through new claim | No semantic support; metadata only. |
| `silverquill_claim_0014` | `story_corpus_evidence` | `discovery_record` | Search-match row only. | No unless promoted through new claim | No semantic support; metadata only. |
| `silverquill_claim_0015` | `story_corpus_evidence` | `discovery_record` | Search-match row only. | No unless promoted through new claim | No semantic support; metadata only. |
| `silverquill_claim_0016` | `story_corpus_evidence` | `discovery_record` | Search-match row only. | No unless promoted through new claim | No semantic support; metadata only. |
| `silverquill_claim_0017` | `commander_product_support` | `support_record` | Official product/decklist row; explicitly not lore, popularity, metagame, legality, or canon identity proof. | No; support locator optional if retained auxiliary | Auxiliary product/navigation support only. |
| `silverquill_claim_0018` | `card_flavor_anchor_support` | `support_record` | Local Scryfall card-data row; verifies card anchors, not identity proof. | No; support locator optional if retained auxiliary | Auxiliary card/flavor support only. |

### Proposed Claim-Extraction Plan

Gate 3 should add only the smallest set of new substantive claims needed to replace invalid discovery/support chains and satisfy Contract v1.1 dimensions.

| Proposed claim purpose | Existing source to read first | Bounded locator to use if available | Supports required dimension | Supports statements / consumers | Scope | Required? |
| --- | --- | --- | --- | --- | --- | --- |
| Language as action: Silverquill words can inspire, expose, command, wound, defend, and transform identity. | `src_wotc_planeswalkers_guide_strixhaven_2021`; confirm against `src_wotc_planeswalkers_guide_secrets_strixhaven_2026` if needed | Official 2021 guide, Silverquill section / College of Eloquence description | Core identity, motivation, mature/unhealthy expression | `profile.philosophy`, `core_identity.philosophy`, `site_surface.tagline`, q1, match/mismatch guidance | Identity-wide, bounded interpretation | Required |
| Internal tension: eloquence used to uplift/support versus dominate/intimidate/advance status. | 2021 guide Silverquill section; local `docs/architecture/colors/silverquill/*` as extraction guide only | Official Silverquill section around Radiance/Shadow or dean framing if present; otherwise keep as project synthesis from claims 002/003/006 | Internal tension, mature expression, unhealthy expression | `profile.core_tension`, `great_tension`, q2, uncertainty guidance | Identity-wide; may need explicit project-synthesis label | Required |
| Spoken/written/signed word and ink/light manifestations are the preferred magical method. | `src_wotc_planeswalkers_guide_secrets_strixhaven_2026`; `src_wotc_planeswalkers_guide_strixhaven_2021` | 2026 Silverquill section; 2021 Silverquill word-magic paragraph | Preferred method, mechanics | `structure`, `mechanics`, core values, public/recruiter copy | Identity-wide | Required |
| Academic/institutional role: Silverquill studies language-adjacent social/institutional disciplines without becoming Azorius law or Dimir espionage. | `src_wotc_planeswalkers_guide_secrets_strixhaven_2026` | 2026 Silverquill study-area list | Academic/institutional role, neighbor guardrails | `profile.profile.social_or_institutional_role`, `claim_005`, possible Azorius/Dimir guardrails | Identity-wide | Required if academic role retained |
| Public influence/reputation/status as placement interpretation, not official psychology. | Existing claims 002, 003, 004, 006; local architecture as synthesis guide | Source locators for claims 002/003/004 plus project-synthesis note | Motivation, positive evidence, negative evidence | placement summary, good fit, calibration, public/recruiter copy | Project synthesis bounded by official claims | Required |
| Failure/pressure behavior: Silverquill weakens when language is vague, denies language power, or avoids visibility/influence. | Existing claims 001-006 plus placement synthesis | Gate 3 can bind to existing/source-backed claim set and mark as Vox Mana placement inference | Failure/pressure behavior, negative evidence | poor-fit indicators, mismatch guidance, fixtures | Project synthesis | Required |
| Orzhov boundary: Silverquill uses visible language/rhetoric; Orzhov centers debt/contract/obligation. | Silverquill claims 001-006; `docs/research/canon/ten-guild-reference-audit.md` as guide; Orzhov canonical packet if needed in Gate 3 | Silverquill official sections plus Orzhov existing canonical claims/sources; no broad comparison | Required-neighbor boundary | Orzhov collision guidance, exclusion fixture | Cross-identity boundary, project synthesis | Required |
| Dimir boundary: public/remembered language versus secrecy/information asymmetry. | Silverquill claims 001-006; House Dimir canonical packet if needed | Silverquill official sections plus Dimir existing canonical claims/sources | Required-neighbor boundary | Dimir collision guidance, exclusion fixture | Cross-identity boundary | Required because current collision exists |
| Prismari boundary: word/rhetoric/signing/ink-light language versus artistic/elemental medium. | Silverquill claims 002/003/004/006; certified Prismari recovery claims as comparison | Silverquill 2021/2026 sections plus Prismari certified claims | Required-neighbor boundary | Prismari collision guidance, exclusion fixture | Cross-identity boundary | Required |
| Support-only Commander/product boundary for Killian/Scriv and Silverquill Influence. | `src_wotc_secrets_strixhaven_commander_decklists_20260401`; `docs/research/VM-378-379-380_source-intake.md` | Secrets of Strixhaven Commander decklist, Silverquill Influence section | Source-to-runtime traceability; auxiliary support | Commander Compass, key figures product rows | Product support only | Required if surfaces retained |

### Discovery-Record Replacement Plan

| Current chain | Discovery evidence currently used | Can existing claims support it? | Gate 3 plan |
| --- | --- | --- | --- |
| `profile.core_identity.summary` | `silverquill_claim_0007`-`0014` | Yes: `001`, plus profile top-level already cites first-six claims | Replace with `001`; preserve wording. |
| `profile.core_identity.philosophy` and `site_surface.tagline` | `0007`-`0014` / `0007`-`0010` | Partly: `002`, `004`, `006`; needs new language-as-action claim | Preserve if new claim confirms the exact verbs; otherwise narrow to ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œwords, eloquence, and word magic as influence.ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â |
| `profile.core_identity.central_tension` / `great_tension` | `0007`-`0011` | Partly: `003`, `006`; needs new internal-tension claim | Preserve or narrow to ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œuplift/leadership versus intimidation/competition/status pressureÃƒÂ¢Ã¢â€šÂ¬Ã‚Â depending on source locator. |
| `profile.structure.summary` | `0007`-`0010` | Yes: `001`, `002`, `004`, `005` | Replace with substantive claims; preserve. |
| `profile.mechanics.summary` | `0007`-`0010` | Partly: `002`, `003`, `004`, `006`; needs mechanics/project-synthesis claim for morale/criticism/WB pressure | Preserve word-magic/leadership; narrow ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œmorale, criticism, black-white pressureÃƒÂ¢Ã¢â€šÂ¬Ã‚Â if not directly supported. |
| `placement.placement_summary.claim_ids` | `0007`-`0014` | Yes/partly: `001`-`006` plus new public-influence and failure-pressure claims | Replace discovery `claim_ids` with substantive/evidence IDs; preserve summary after narrowing ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œcorpus evidenceÃƒÂ¢Ã¢â€šÂ¬Ã‚Â language. |
| `placement.placement_axes/0` | `0007`-`0014` | Partly: `001`-`006`; current rationale is search-corpus-specific and should be rewritten | Replace search-corpus axis with source-backed ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œlanguage as power vs vague/unshaped communicationÃƒÂ¢Ã¢â€šÂ¬Ã‚Â axis. |
| `placement.moral_and_psychological_profile` | `0007`-`0011` | Yes as project synthesis from `001`-`006`, but wording needs evidence mapping | Preserve as placement heuristic if marked and supported by substantive claims. |
| `placement.core_values/0`-`9` | `0007`-`0009` | Some values are supportable (`Silverquill`, `ink magic`, `eloquence`) from `001`/`002`/`004`; others are character/name discovery only | Replace keyword/search core values with source-backed conceptual values; remove or move character/search tokens to metadata unless new claims support them. |
| `placement.behavioral_signals/0` | `0007`-`0012` | No as written; it says story-context evidence and names stories | Replace with source-backed behavioral signal about deliberate words, public influence, or rhetorical pressure; keep story rows discovery-only. |
| `placement.inhibitor_traits/0` | `0007`-`0010` | Yes as project guardrail from `001`-`006` | Preserve concept but replace evidence chain with substantive claims. |
| Generated provenance entries with `0007`-`0016` | Discovery rows | Yes after raw chains are repaired | Gate 4 rebuild should remove discovery rows from generated semantic provenance. |

No current semantic chain should continue using `silverquill_claim_0007`-`0016` as proof. If Gate 3 extracts story-specific claims, those should be new substantive claims with bounded locations, not promoted search rows.

### Support-Record Isolation Plan

| Support record | Current use | Gate 2 disposition | Gate 3 plan |
| --- | --- | --- | --- |
| `silverquill_claim_0017` | `key_figures/1`, `key_figures/2`, Commander Compass native-fit commander source basis, Commander Compass identity basis | Product support for Silverquill Influence, Killian, and Scriv only | Keep as `support_record`; move out of authoritative `identity_basis.supporting_claim_ids` into explicit `support_claim_ids` / `auxiliary_support` fields; keep native-fit commander rows support-only. |
| `silverquill_claim_0018` | `canonical_flavor_text/*`, Commander Compass identity basis | Card-data/flavor anchor support only | Keep as `support_record`; keep canonical flavor text auxiliary; remove from identity-basis proof chain or move to explicit auxiliary support. |

Killian and Scriv should not become key identity figures unless Gate 3 adds separate substantive, bounded character evidence. Current product/decklist support proves product placement, not lore role or faction philosophy.

### Profile Support Plan

| Profile section | Existing support | Missing support | Gate 3 disposition |
| --- | --- | --- | --- |
| Core identity | `001`, `002`, `004`, `005`, `006` | Bounded evidence locations; current chain uses discovery rows | Preserve and cite substantive claims. |
| Philosophy | `002`, `004`, `006` plus project synthesis | Exact support for verbs ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œinspire, expose, command, wound, defend, transform identityÃƒÂ¢Ã¢â€šÂ¬Ã‚Â | Preserve if bounded official source supports the verbs; otherwise narrow. |
| Internal tension | `003`, `006`, local architecture | Direct bounded claim for uplift/service versus dominance/self-advancement | Preserve if extracted; otherwise narrow and label project synthesis. |
| Academic/institutional role | `001`, `005` | Bounded 2026 study-area locator | Preserve. |
| Key figures | Rinald: `001`-`004`; Killian/Scriv: `0017` product support only | Lore role for Killian/Scriv, Shadrix/deans if retained | Keep Rinald as source-backed guide speaker; keep Killian/Scriv auxiliary product support only unless new claims are added. Do not add Shadrix/deans unless sourced. |
| Locations | None in current profile | No current location section | Do not add locations in Gate 3 unless needed; non-blocking. |
| Mechanics | `002`, `003`, `004`, `006`; Commander guidance as project support | Mechanics-specific claim for Inklings, morale, criticism, pressure if retained | Preserve/narrow to word magic, leadership, ink/light, rhetoric; mark Commander/product details auxiliary. |
| Mature expression | `003`, `006`; possible language-as-action claim | Explicit mature/uplift/leadership claim | Add bounded substantive claim or project-synthesis placement claim. |
| Unhealthy expression | `003`, `006`; possible language-as-action claim | Explicit intimidation/dominance/wounding claim | Add bounded substantive claim or project-synthesis placement claim. |
| Placement-facing summary | `001`-`006` | Replace discovery links and add evidence mapping | Preserve after evidence-chain repair. |

### Placement Support Plan

| Placement section | Existing support | Missing support | Gate 3 disposition |
| --- | --- | --- | --- |
| Placement summary | `001`-`006` in `evidence_claim_ids`; invalid discovery `claim_ids` | Remove discovery support; bounded evidence | Preserve/narrow. |
| Core values | Current values are search terms and names from discovery rows | Source-backed conceptual values | Replace with concepts such as College of Eloquence, word magic, spoken/written/signed word, leadership/competition, rhetorical precision, academic language disciplines; remove search/name tokens unless separately supported. |
| Behavioral signals | Some strings are plausible; object row is discovery-backed | Bounded evidence for ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œlanguage changes situation,ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œimage as leverage,ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â etc. | Replace object row; preserve simple strings only if supported or convert to structured evidence-backed entries. |
| Positive guidance | Existing ideal/good-fit items | Evidence mappings and possible narrowing of ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œperformance and reputationÃƒÂ¢Ã¢â€šÂ¬Ã‚Â | Preserve with mappings to `001`-`006` plus new public-influence claim. |
| Negative guidance | Existing poor-fit and mismatch items | Evidence mappings | Preserve as project placement inference from substantive claims. |
| Uncertainty guidance | Existing q1/q2 questions | Evidence mappings; q2 needs internal tension claim | Preserve if internal-tension claim added; otherwise narrow q2. |
| Raw discriminator questions | Four existing questions | Evidence locations and mappings; no new broad questions needed yet | Preserve with possible wording/evidence refinement; do not alter Hall/Crucible. |
| Neighbor guidance | Orzhov, Dimir, Prismari existing | Bounded required-neighbor evidence and neutral language | Preserve/narrow; add claim mappings. |
| Recruiter-facing guidance | Existing strings | `evidence_claim_ids` for each item | Add mapping records in Gate 3. |

### Recruiter Guidance Evidence Mapping Plan

| Guidance item | Proposed support | Gap / Gate 3 action |
| --- | --- | --- |
| Match: ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œuses words deliberatelyÃƒÂ¢Ã¢â€šÂ¬Ã‚Â | `001`, `002`, `004`, proposed language-as-action claim | Add evidence mapping; preserve. |
| Match: ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œunderstands performance and reputationÃƒÂ¢Ã¢â€šÂ¬Ã‚Â | `003`, `006`, proposed public-influence/status claim | Narrow to ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œpublic influence/reputationÃƒÂ¢Ã¢â€šÂ¬Ã‚Â if ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œperformanceÃƒÂ¢Ã¢â€šÂ¬Ã‚Â is not bounded. |
| Match: ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œcan inspire or cut through pretense with precisionÃƒÂ¢Ã¢â€šÂ¬Ã‚Â | `002`, `003`, `006`, proposed mature/unhealthy expression claim | Add claim or narrow if ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œpretenseÃƒÂ¢Ã¢â€šÂ¬Ã‚Â unsupported. |
| Mismatch: ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œcommunicates vaguely by preferenceÃƒÂ¢Ã¢â€šÂ¬Ã‚Â | `002`, `004`, `006`, proposed failure-pressure claim | Add mapping as negative project inference. |
| Mismatch: ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œdenies that language has powerÃƒÂ¢Ã¢â€šÂ¬Ã‚Â | `002`, `004`, proposed language-as-action claim | Add mapping. |
| Mismatch: ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œavoids visibility even when influence is neededÃƒÂ¢Ã¢â€šÂ¬Ã‚Â | `003`, `006`, proposed public-influence/status claim | Preserve only if visibility/status is bounded; otherwise narrow. |
| Uncertainty: ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œTell me about a time one sentence changed the room.ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â | `002`, `004`, `006`, proposed language-as-action claim | Add mapping; fits general inclusion discriminator. |
| Uncertainty: ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œIs influence more dangerous when it flatters or when it wounds?ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â | `003`, `006`, proposed internal-tension/mature-unhealthy claim | Add mapping only after tension claim; otherwise rewrite/narrow in Gate 3. |

### Provenance Repair Plan

Gate 4 should rebuild provenance after Gate 3. Gate 3 must ensure the canonical chains are ready first.

| Provenance category | Current invalid evidence | Replacement plan | New source discovery? |
| --- | --- | --- | --- |
| Placement core values | Discovery rows `0007`-`0009` | Replace canonical core values with substantive claim chains | No |
| Placement axis and behavioral signal | Discovery rows `0007`-`0014` | Replace axis/behavior signal content and evidence chains | No |
| Profile identity/tension/structure/mechanics | Discovery rows `0007`-`0014` | Replace with `001`-`006` plus new extracted claims | No broad discovery; source localization may be needed |
| Commander/key figure support | Support rows `0017`/`0018` in authoritative chains | Move to explicit auxiliary support; keep out of semantic provenance | No |
| Recruiter guidance | Missing evidence mapping | Add evidence mappings to current/proposed substantive claims | No |
| Fixtures | Missing | Add fixture file in Gate 4 after canonical remediation | No |

### Required-Neighbor Evidence Plan

Gate 2 selects this bounded required-neighbor set for Gate 3:

1. `WB` / `ORZHOV_SYNDICATE`
2. `HOUSE_DIMIR`
3. `PRISMARI`
4. `WU` / `AZORIUS_SENATE` as a bounded guardrail if retained in generated/public not-to-be-confused-with copy or calibration suppressors

Do not add Selesnya or Boros as required neighbors in Gate 3 unless a later validation failure proves a real ambiguity. They can remain non-blocking guardrails.

| Neighbor | Why required | Positive Silverquill evidence | Negative/exclusion evidence | Ambiguous/uncertainty evidence | Existing claims | Proposed new claims / gaps |
| --- | --- | --- | --- | --- | --- | --- |
| `WB` / Orzhov | Same color pair; current collision guidance; local canon audit names Silverquill-Orzhov as college/guild twin. | Silverquill: Eloquence, word magic, spoken/written/signed word, leadership/competition, language changing power relationships. | Orzhov centers debt, obligation, contracts, tithe, afterlife, institutional ledger logic from existing Orzhov packet / ten-guild audit. | Ambiguous WB power/influence without language/status/rhetorical signal. | `001`-`006`; Orzhov canonical claims if used in Gate 3 | Add boundary claim: visible language/rhetoric versus obligation/debt. No new discovery expected. |
| `HOUSE_DIMIR` | Existing collision guidance; overlap around manipulation, language, information, and influence. | Silverquill is visible/public/remembered language and reputation pressure if bounded. | Dimir centers secrecy, anonymity, hidden information, information asymmetry. | Ambiguous persuasion/manipulation where visibility is unclear. | `001`-`006`; Dimir canonical claims if used | Add/narrow boundary claim: public rhetorical force versus hidden information. No new discovery expected. |
| `PRISMARI` | Existing college collision and certified Prismari recovery; overlap around performance, public expression, and moving an audience/room. | Silverquill uses words, rhetoric, signed/spoken/written language, ink/light word magic. | Prismari uses artistic/elemental media and expression; avoid caricaturing Prismari as mere spectacle. | Ambiguous public performance where both language and artistic medium matter. | Silverquill `002`,`003`,`004`,`006`; certified Prismari claims | Add/narrow boundary claim using neutral source-backed purpose/method distinction. No new discovery expected. |
| `WU` / Azorius | Generated/public and local architecture mention structured language versus law/procedure; calibration suppresses law procedure. | Silverquill makes language public/social force, reputation, critique, persuasion. | Azorius centers law, procedure, institutional rule enforcement. | Ambiguous formal language, debate, policy, or legalistic speech. | `005`,`006`; Azorius canonical claims if used | Include only if Gate 3 touches public not-to-be-confused copy or calibration suppressors. No new discovery expected. |

### Gate 3 Remediation Checklist

#### Required for certification

1. Add `semantic_role` to all 18 Silverquill claims:
   - `001`-`006`: `substantive_claim`
   - `0007`-`0016`: `discovery_record`
   - `0017`-`0018`: `support_record`
2. Add bounded evidence locations to `001`-`006` and every new/remediated substantive claim.
3. Add the minimal new substantive claims identified in Gate 2:
   - language as action;
   - uplift/service versus dominance/status-pressure tension;
   - spoken/written/signed word and ink/light method if not sufficiently covered by `002`/`004` alone;
   - public influence/reputation/status as bounded placement synthesis;
   - failure/pressure behavior as bounded placement synthesis;
   - Orzhov, Dimir, Prismari, and conditional Azorius neighbor boundaries;
   - support-only Commander/product boundary if needed to preserve Compass/key-figure surfaces.
4. Remove discovery records from profile semantic proof chains:
   - `/core_identity`
   - `/site_surface`
   - `/structure`
   - `/great_tension`
   - `/mechanics`
5. Remove discovery records from placement semantic proof chains:
   - `/placement_summary`
   - `/placement_axes/0`
   - `/moral_and_psychological_profile`
   - `/core_values/*`
   - `/behavioral_signals/0`
   - `/inhibitor_traits/0`
6. Replace search-term-backed `core_values` with source-backed conceptual values, or remove entries that are merely search/name tokens.
7. Replace the discovery-backed behavioral signal with a source-backed signal about deliberate words, public influence, rhetorical pressure, or word magic.
8. Add evidence mappings to recruiter-facing match, mismatch, and uncertainty guidance.
9. Isolate `0017` and `0018` as auxiliary support only:
   - remove from authoritative identity-basis proof chains;
   - keep native commander/product/card support only where explicitly marked auxiliary/support-only.
10. Confirm whether Killian/Scriv remain product-navigation key figures only; do not promote them to lore/identity proof without new bounded character claims.
11. Define `required_neighbors` / evidence mappings for Orzhov, Dimir, Prismari, and conditional Azorius if retained.
12. Review and narrow generated/public-source copy in canonical or identity-layer source if unsupported:
   - ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œmost visible people/person in the roomÃƒÂ¢Ã¢â€šÂ¬Ã‚Â;
   - ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œpersonal powerÃƒÂ¢Ã¢â€šÂ¬Ã‚Â;
   - ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œperformance and reputationÃƒÂ¢Ã¢â€šÂ¬Ã‚Â;
   - any Prismari comparison that reduces Prismari to spectacle.
13. Update Silverquill changelog/readiness evidence to describe the canonical remediation.
14. Update the VM-504 report/card with Gate 3 status.
15. Do not rebuild generated artifacts in Gate 3.

#### Optional / non-blocking

1. Extract story-specific claims from discovery rows only if they directly resolve a certification blocker.
2. Add Shadrix/dean/founder details only if bounded official/local source evidence is available and needed; otherwise defer.
3. Keep Selesnya/Boros as non-blocking guardrails unless a real placement ambiguity appears.
4. Preserve Commander/product richness as auxiliary UX support without promoting it into identity proof.

#### Out of scope for CRIT-001

1. Hall/Crucible authoring or scheduling.
2. Scoring, confidence, inhibition, tie ordering, or adaptive placement tuning.
3. Live recruiter calibration.
4. Exhaustive story/lore enrichment.
5. Broad web discovery.
6. Reworking certified Prismari, Lorehold, or Quandrix.

### Targeted Source Discovery Decision

No targeted source discovery is required right now.

Gate 3 should use already-listed sources and local records first. If exact bounded locators for the official 2021/2026 Silverquill passages are not locally available, Gate 3 may need targeted source access/localization for those already-listed official URLs. That should be documented as source localization, not a new discovery expansion.

### Gate 2 Validation Notes

Commands run or used during Gate 2:

- `git status --short --branch`
- `git -C C:\dev\mtgSiteWIP-crit001 merge-base --is-ancestor 3baa8307cf1d6b23aab1564b866e6580e500cf66 HEAD`
- `git -C C:\dev\mtgSiteWIP status --short --branch`
- Read-only inspection of Silverquill raw profile, placement, claims, sources, generated consumers, provenance, identity-layer display source, local canon audit files, source-intake docs, and Commander guidance.

Build, generation, source/generated validation, semantic-readiness validation, and runtime tests were intentionally not run during Gate 2 because this task is evidence confirmation only and generated artifacts must not be modified.

### Final Gate 2 Status

- Gate 2 evidence confirmation is complete.
- Silverquill remains uncertified.
- Gate 3 canonical remediation is required next.
- No targeted source discovery is required right now.
- No canonical Silverquill files were changed.
- No generated files were changed.
- Prismari, Lorehold, and Quandrix remain certified.
- No other identity was started.
- Original dirty main worktree remains untouched.

## Gate 3 Canonical Remediation

Gate 3 canonical remediation is complete. This phase modified only Silverquill canonical raw data and VM-504 workflow documentation. It did not rebuild generated artifacts, create semantic fixtures, create a recovery candidate, certify Silverquill, or start another identity.

### Canonical Files Changed

- `data/raw-factions/silverquill/silverquill.claims.json`
- `data/raw-factions/silverquill/silverquill.profile.json`
- `data/raw-factions/silverquill/silverquill.placement.json`
- `data/raw-factions/silverquill/silverquill.changelog.json`

No generated files were changed in Gate 3.

### Blocker-by-Blocker Remediation

| Gate 1 / Gate 2 blocker | Gate 3 remediation | Gate 4 status |
| --- | --- | --- |
| All 18 original claims lacked certifying `semantic_role`. | Added roles to all original claims: 6 substantive, 10 discovery, 2 support. Added 8 new bounded substantive placement/neighbor claims. | Gate 4 must validate generated propagation. |
| Discovery/search records supported profile semantic chains. | Replaced discovery rows in `core_identity`, `site_surface`, `structure`, `great_tension`, and `mechanics` with source-backed substantive claims. Kept discovery rows only in `data_quality/corpus_upgrade` with `evidence_use: discovery_metadata`. | Provenance is stale until Gate 4 rebuild. |
| Discovery/search records supported placement semantic chains. | Replaced discovery-backed placement summary, axis, moral/psych profile, core values, behavioral signal, and inhibitor evidence with substantive claims. | Provenance is stale until Gate 4 rebuild. |
| Recruiter match/mismatch/uncertainty guidance lacked evidence mapping. | Added `semantic_guidance_evidence` entries for all match, mismatch, and uncertainty strings. | Generated recruiter context and provenance must be rebuilt in Gate 4. |
| Support/product records touched identity-basis or key-figure chains. | Removed support records from authoritative identity-basis support, retained them only as `auxiliary_support_claim_ids` / `auxiliary_support_source_ids` in Commander Compass, left product-only key figures without semantic `claim_ids`, and marked card flavor/Commander source-basis containers as auxiliary support where allowed. | Gate 4 must confirm no support records become semantic proof in generated provenance. |
| Required-neighbor coverage needed bounded selection and mapping. | Selected `WB`, `HOUSE_DIMIR`, and `PRISMARI` as required neighbors; added `required_neighbor_evidence` mappings and neutralized boundary language to avoid overstating debt, secrecy, status, domination, or Prismari spectacle. Kept `WU` as a non-blocking guardrail only. | Gate 4 fixtures must include one exclusion fixture per required neighbor plus nearest-collision ambiguity. |

### Claims Classified by Semantic Role

| Role | Count | Claim IDs |
| --- | ---: | --- |
| `substantive_claim` | 14 | `silverquill_claim_001`-`006`, `silverquill_claim_0019`-`0026` |
| `discovery_record` | 10 | `silverquill_claim_0007`-`0016` |
| `support_record` | 2 | `silverquill_claim_0017`, `silverquill_claim_0018` |
| `unclassified` | 0 | None |

### Discovery Records Retained

Discovery records `silverquill_claim_0007` through `silverquill_claim_0016` remain in the packet as story-corpus search/discovery metadata only. They are no longer used as profile or placement semantic proof chains.

### Support Records Retained

Support records `silverquill_claim_0017` and `silverquill_claim_0018` remain as Commander/product/card support only. They were isolated from authoritative identity-basis and key-figure semantic proof chains.

### New Substantive Claims Added

- `silverquill_claim_0019` â€” language as action.
- `silverquill_claim_0020` â€” uplift/service versus intimidation/status-pressure tension.
- `silverquill_claim_0021` â€” mature precise-language/leadership expression.
- `silverquill_claim_0022` â€” failure/pressure mismatch behavior.
- `silverquill_claim_0023` â€” Orzhov/WB boundary.
- `silverquill_claim_0024` â€” House Dimir boundary.
- `silverquill_claim_0025` â€” Prismari boundary.
- `silverquill_claim_0026` â€” non-required Azorius/WU procedure-only guardrail.

All new substantive claims use already-listed official Silverquill sources and bounded evidence localization. No new source discovery was performed.

### Profile / Placement Evidence-Chain Repairs

Profile repairs removed discovery records from `core_identity`, `site_surface`, `structure`, `great_tension`, and `mechanics`. Placement repairs removed discovery records from `placement_summary`, `placement_axes/0`, `moral_and_psychological_profile`, `core_values/*`, `behavioral_signals/0`, and `inhibitor_traits/0`.

### Recruiter Guidance Evidence Mappings

Added `semantic_guidance_evidence` for:

- `/chatbot_guidance/how_to_recognize_match/0`-`2`
- `/chatbot_guidance/how_to_recognize_mismatch/0`-`2`
- `/chatbot_guidance/questions_to_ask_when_uncertain/0`-`1`

These mappings bind existing recruiter-facing strings to substantive Silverquill claims without changing global recruiter behavior.

### Required-Neighbor Mappings

Required neighbors selected for Silverquill Gate 3:

1. `WB` / Orzhov â€” same-color and existing collision boundary.
2. `HOUSE_DIMIR` â€” existing collision boundary around public rhetoric versus hidden information.
3. `PRISMARI` â€” existing college collision around language/rhetoric versus artistic or elemental medium.

`WU` / Azorius remains a non-blocking guardrail because Gate 3 did not identify a certification need to promote it to the required-neighbor set.

### Items Deferred to Gate 4

- Rebuild generated faction artifacts.
- Regenerate `data/semantic-readiness-provenance.json`.
- Add Silverquill semantic fixtures.
- Validate generated consumer completeness and stale content hashes.
- Verify no discovery or support records are used as semantic proof in generated provenance.
- Inspect generated/public Silverquill copy for over-strong visibility/status/performance language.
- Run source/generated validation and regression tests.

### Remaining Known Limitations

- `node research/validate-semantic-readiness.mjs --targets=SILVERQUILL` currently fails only on expected Gate 4 items: stale/missing generated provenance and missing semantic fixtures.
- Generated artifacts remain intentionally stale until Gate 4.
- Silverquill remains uncertified.

### Gate 3 Validation Notes

Commands run during Gate 3:

- `git status --short --branch`
- JSON parse checks for changed Silverquill canonical files.
- `npm.cmd run audit:semantic-readiness -- --targets=SILVERQUILL`
- `node research/validate-semantic-readiness.mjs --targets=SILVERQUILL` â€” expected Gate 4 failures only: stale/missing generated provenance and missing semantic fixtures.
- `git diff --check` â€” passed.
- Generated-file diff check for `data/factions.json`, `data/placement-model.json`, `supabase/functions/guild-recruiter/faction-context.ts`, and `data/semantic-readiness-provenance.json` â€” no diff.

Gate 3 structural audit result: 26 total claims, 14 substantive, 10 discovery, 2 support, 0 unclassified, no missing references, and no potential role-invalid support links.

### Final Gate 3 Status

- Gate 3 canonical remediation is complete.
- Silverquill remains uncertified.
- Gate 4 generation, provenance rebuild, semantic fixtures, and validation are required next.
- No targeted source discovery was required.
- No generated files were changed.
- Prismari, Lorehold, and Quandrix remain certified.
- No other identity was started.
- Original dirty main worktree remains untouched.
## Gate 4 Generation and Validation

Gate 4 rebuilt generated artifacts, regenerated semantic provenance, added Silverquill semantic fixtures, and ran the requested focused validation suite. Automated validation passed, but Gate 4 is not ready for Gate 5 candidate creation because generated Silverquill placement/recruiter consumers still expose two stale raw-sourced strings that require a separately authorized bounded canonical wording correction before candidate review.

### Gate 4 Files Changed

Generated/display/provenance files changed during Gate 4:

- `data/factions.json`
- `data/identity-layers.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `research/fixtures/semantic-readiness/silverquill.semantic-fixtures.json`

Gate 4 did not intentionally modify Silverquill raw canonical files. The raw Silverquill files remain changed from Gate 3 canonical remediation only.

### Generated Display and Provenance Results

- Public Silverquill display copy in `data/factions.json` was narrowed to source-backed language-as-action, leadership, rhetoric, word-magic, and required-neighbor boundary wording.
- `data/identity-layers.json` received a Silverquill-scoped display-source correction so the generated `data/factions.json#/identity_layers/expressions/SILVERQUILL` copy no longer preserves the old Radiance/Shadow tension language.
- Commander/product/card rows remain auxiliary support only.
- Generated provenance contains 60 Silverquill entries.
- No discovery or support records are used as semantic proof in Silverquill provenance.
- Non-substantive records appear only as `auxiliary_support` or `discovery_metadata`.
- Internal claim IDs were not observed leaking into user-facing recruiter prose.

### Silverquill Semantic Fixtures

Added `research/fixtures/semantic-readiness/silverquill.semantic-fixtures.json` with:

- `core_inclusion`
- `mature_or_pressure_behavior`
- `required_neighbor_exclusion` for `WB`
- `required_neighbor_exclusion` for `HOUSE_DIMIR`
- `required_neighbor_exclusion` for `PRISMARI`
- `nearest_collision_ambiguity` for `PRISMARI`
- `provenance` fixture for `/chatbot_guidance/how_to_recognize_match/0`

### Remaining Gate 4 Blocker

The generated Silverquill placement model still contains two stale strings sourced from `data/raw-factions/silverquill/silverquill.placement.json`:

| Generated consumer | Source canonical pointer | Stale wording | Why blocked |
| --- | --- | --- | --- |
| `data/placement-model.json#/factions/SILVERQUILL/discriminator_questions/1/purpose` | `/discriminator_questions/1/purpose` | `Separates Radiance and Shadow readings.` | Gate 3 did not create substantive evidence for formal Radiance/Shadow readings; current bounded evidence supports uplift/leadership versus pressure/intimidation/status-pressure instead. |
| `data/placement-model.json#/factions/SILVERQUILL/chatbot_guidance/how_to_recognize_match/1` and recruiter context equivalent | `/chatbot_guidance/how_to_recognize_match/1` | `understands performance and reputation` | Current bounded evidence supports language, rhetoric, word magic, leadership, public influence, and status-pressure awareness, but this short phrase is under-mapped and risks overbroad performance/reputation classification. |

Gate 4 anti-drift rules prohibit silently editing canonical Silverquill data. These should be handled by a bounded Gate 4 blocker-resolution or Gate 3 correction instruction before Gate 5 candidate creation.

### Generated-Diff Isolation

Manual isolation check compared the current worktree to `HEAD` while excluding `SILVERQUILL` sections from generated files. Results:

- `data/factions.json`: Silverquill-scoped only after excluding `factions.SILVERQUILL` and `identity_layers.expressions.SILVERQUILL`.
- `data/placement-model.json`: Silverquill-scoped only.
- `data/semantic-readiness-provenance.json`: Silverquill-scoped only.
- `data/identity-layers.json`: Silverquill-scoped only.
- `supabase/functions/guild-recruiter/faction-context.ts`: changed because Silverquill generated context changed.

Candidate-scope warning: `data/identity-layers.json` is a Silverquill display-source correction required to remove stale generated display copy, but the existing candidate-scope validator does not allow that path by default. A later candidate review may need an explicit VM-504 display-source exception or a bounded cleanup path, similar to the prior Quandrix display-source exception.

### Gate 4 Validation Results

Commands run:

- `npm.cmd run build:factions` Ã¢â‚¬â€ passed.
- `node research/validate-semantic-readiness.mjs --targets=SILVERQUILL` Ã¢â‚¬â€ passed after fixture schema/claim-ID correction.
- `npm.cmd run validate:source-generated -- --targets=SILVERQUILL` Ã¢â‚¬â€ passed with one known builder-owned inhibitor warning.
- `npm.cmd run test:semantic-readiness` Ã¢â‚¬â€ passed.
- `npm.cmd run test:placement` Ã¢â‚¬â€ passed, 37 factions / 37 golden paths.
- `npm.cmd run test:faction-context-isolation` Ã¢â‚¬â€ passed.
- `node research/archscry-dossier-followup-tests.js` Ã¢â‚¬â€ passed.
- `npm.cmd run dossier:audit` Ã¢â‚¬â€ passed with known `113` warnings and `0` failures.

Deferred until Gate 5 or later authorization:

- Full `npm.cmd test`.
- `npm.cmd run test:parser`.
- Candidate-boundary scope validation, because no candidate commit exists yet.

### Known Warnings

- Source/generated validation retains the known builder-owned Silverquill inhibitor warning:
  - `inhibitor_traps[model_owned]`: `Language pacifism; refuses to use words as force, influence, correction, praise, pressure, or social power.`
- Dossier audit remains unchanged at `113` warnings and `0` failures.
- Gate 4 discovered a candidate-scope policy concern around the Silverquill-scoped `data/identity-layers.json` display-source correction.

### Final Gate 4 Status

- Gate 4 generation/provenance/fixture validation is mechanically complete.
- Silverquill is not ready for Gate 5 candidate creation until the two stale raw-sourced generated strings are corrected or explicitly accepted by independent review.
- Silverquill remains uncertified.
- Prismari, Lorehold, and Quandrix remain certified.
- No other identity was started.
- Original dirty main worktree remains untouched.

## Gate 4 Bounded Wording Blocker Resolution

The two raw-sourced generated wording blockers identified during Gate 4 were corrected in `data/raw-factions/silverquill/silverquill.placement.json`, then generated artifacts and semantic provenance were rebuilt.

### Canonical Wording Corrections

| Field | Old wording | New wording | Evidence boundary |
| --- | --- | --- | --- |
| `discriminator_questions/silverquill_q2/purpose` | `Separates Radiance and Shadow readings.` | `Tests whether public language is being used to uplift, pressure, persuade, or dominate through rhetoric and social force.` | Uses recovered Silverquill evidence for language as action, leadership/uplift versus intimidation/competition/status pressure, and rhetorical/social force. |
| `chatbot_guidance/how_to_recognize_match/1` | `understands performance and reputation` | `uses public language, praise, critique, or performance to shape how people are seen or treated` | Uses recovered evidence for public language, praise/critique, rhetoric, leadership, and social treatment without unsupported reputation/control/leverage claims. |
| `ideal_fit_indicators/1/indicator` | `understands performance and reputation` | `uses public language, praise, critique, or performance to shape how people are seen or treated` | Same phrase occurred in an ideal-fit indicator; replaced so the stale string is absent from canonical and generated consumers. |

No Hall, Crucible, scoring, confidence, inhibition, scheduling, tie-ordering, global recruiter, schema, validator, builder, or VM-501 files were changed.

### Verification

Search confirmed the old strings are absent from canonical and generated Silverquill consumers:

- `Separates Radiance and Shadow readings.`
- `understands performance and reputation`

Search confirmed the replacement wording is present in:

- `data/raw-factions/silverquill/silverquill.placement.json`
- `data/placement-model.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

### Validation After Resolution

Commands run:

- `npm.cmd run build:factions` Ã¢â‚¬â€ passed.
- `node research/validate-semantic-readiness.mjs --targets=SILVERQUILL` Ã¢â‚¬â€ passed.
- `npm.cmd run validate:source-generated -- --targets=SILVERQUILL` Ã¢â‚¬â€ passed with the known builder-owned inhibitor warning.
- `npm.cmd run test:semantic-readiness` Ã¢â‚¬â€ passed.
- `npm.cmd run test:placement` Ã¢â‚¬â€ passed, 37 factions / 37 golden paths.
- `npm.cmd run test:faction-context-isolation` Ã¢â‚¬â€ passed.
- `node research/archscry-dossier-followup-tests.js` Ã¢â‚¬â€ passed.
- `npm.cmd run dossier:audit` Ã¢â‚¬â€ passed with known `113` warnings and `0` failures.
- Manual generated-diff isolation check Ã¢â‚¬â€ Silverquill-scoped for `data/factions.json`, `data/placement-model.json`, `data/semantic-readiness-provenance.json`, and `data/identity-layers.json` after excluding Silverquill sections.
- `git diff --check` Ã¢â‚¬â€ passed with line-ending warnings only.

### Remaining Generated-Diff Concern

`data/identity-layers.json` remains a Silverquill-scoped display-source correction from Gate 4. It is necessary to prevent stale Silverquill public display copy from regenerating, but the default candidate-scope validator may require an explicit VM-504 display-source exception during Gate 5 review.

### Final Blocker-Resolution Status

- The two stale wording blockers are resolved.
- Gate 4 validation is complete.
- Silverquill is ready for Gate 5 candidate creation when authorized.
- Silverquill remains uncertified.
- Prismari, Lorehold, and Quandrix remain certified.
- No other identity was started.
- Original dirty main worktree remains untouched.

## Gate 5 Pre-Candidate Scope-Policy Cleanup

Pre-candidate scope verification correctly stopped before candidate creation because frozen confidence/calibration fields changed. This cleanup restored the frozen fields while preserving the substantive Silverquill semantic remediation.

### Frozen Fields Restored

Restored these forbidden-field deltas in `data/raw-factions/silverquill/silverquill.placement.json`:

| Path | Resolution |
| --- | --- |
| `/core_values/7/confidence` | Restored as `Medium` on a substantive Silverquill core-value row for public language shaping social treatment. |
| `/core_values/8/confidence` | Restored as `Medium` on a substantive Silverquill core-value row for praise, critique, and rhetorical pressure. |
| `/core_values/9/confidence` | Restored as `Medium` on a substantive Silverquill core-value row for the procedure-only guardrail. |
| `/placement_summary/calibrated_false_positive_guardrail` | Restored exactly to `Do not award for generic manipulation or black-white identity without visible language/status signals.` |
| `/placement_summary/calibrated_primary_read` | Restored exactly to `Requires language as power, reputation, public influence, precision of speech, or verbal pressure.` |

The restored core-value rows use substantive claims only and do not reintroduce discovery/search records as semantic proof.

### Scope Verification

- Actual forbidden-field comparison against `HEAD` now returns no confidence/calibration/runtime field changes.
- Temporary candidate-scope guard snapshot reports only:
  - `identity candidate modified non-identity path data/identity-layers.json`
  - `unrelated or global data/factions.json content changed`
- Manual isolation confirms both remaining findings are the documented Silverquill-scoped display-source exception: excluding `SILVERQUILL` and `identity_layers.expressions.SILVERQUILL`, generated/display/provenance files match the accepted base.
- No non-Silverquill raw packet changed.
- No builder, schema, validator, Contract v1.1, Hall, Crucible, scoring, inhibition, confidence behavior, scheduling, tie-ordering, or global recruiter file changed.

### Validation After Scope Cleanup

Commands run:

- `npm.cmd run build:factions` Ã¢â‚¬â€ passed.
- `node research/validate-semantic-readiness.mjs --targets=SILVERQUILL` Ã¢â‚¬â€ passed.
- `npm.cmd run validate:source-generated -- --targets=SILVERQUILL` Ã¢â‚¬â€ passed with the known builder-owned inhibitor warning.
- `npm.cmd run test:semantic-readiness` Ã¢â‚¬â€ passed.
- `npm.cmd run test:placement` Ã¢â‚¬â€ passed, 37 factions / 37 golden paths.
- `npm.cmd run test:faction-context-isolation` Ã¢â‚¬â€ passed.
- `node research/archscry-dossier-followup-tests.js` Ã¢â‚¬â€ passed.
- `npm.cmd run dossier:audit` Ã¢â‚¬â€ passed with known `113` warnings and `0` failures.
- Candidate-scope guard against temporary snapshot Ã¢â‚¬â€ only documented Silverquill display-source exception findings remain.
- Manual generated-diff isolation check Ã¢â‚¬â€ Silverquill-scoped.
- `git diff --check` Ã¢â‚¬â€ passed with line-ending warnings only.

### Final Scope-Policy Cleanup Status

- Confidence-field deltas are gone.
- Calibrated placement-summary deltas are gone.
- The earlier wording blockers remain resolved.
- Known builder-owned Silverquill inhibitor warning remains unchanged.
- Dossier audit remains `113` warnings and `0` failures.
- Silverquill remains uncertified.
- Silverquill is ready for Gate 5 candidate creation when authorized, with the documented Silverquill-scoped display-source exception.
- Prismari, Lorehold, and Quandrix remain certified.
- No other identity was started.
- Original dirty main worktree remains untouched.

## Gate 5 Candidate Creation

Status: replacement candidate preparation after review-requested hygiene correction; Silverquill remains uncertified pending independent Gate 5 review. Superseded rejected candidate: `078310b428d66e3f1423fb897d919040542a4593`.

Candidate parent SHA: `3baa8307cf1d6b23aab1564b866e6580e500cf66`
Replacement candidate recovery SHA: `b9cd9e914c280e9c40c7a977b8f7c07204614d3e`

Candidate content:

- Gate 3 canonical remediation.
- Gate 4 generated artifacts and provenance.
- Gate 4 bounded wording-blocker resolution.
- Scope-policy cleanup restoring frozen confidence/calibration fields.
- Silverquill semantic fixtures.
- VM-504 report, card, board, ledger, handoff, and index records required to document Gate 1 through Gate 4 and candidate readiness.

Validation summary:

-
pm.cmd run build:factions â€” passed.
-
ode research/validate-semantic-readiness.mjs --targets=SILVERQUILL â€” passed.
-
pm.cmd run validate:source-generated -- --targets=SILVERQUILL â€” passed with known builder-owned Silverquill inhibitor warning unchanged.
-
pm.cmd run test:semantic-readiness â€” passed.
-
pm.cmd run test:placement â€” passed.
-
pm.cmd run test:faction-context-isolation â€” passed.
-
ode research/archscry-dossier-followup-tests.js â€” passed.
-
pm.cmd run dossier:audit â€” 113 warnings / 0 failures.
- git diff --check â€” passed.
- Candidate-scope guard â€” no confidence/calibration findings; only documented Silverquill display-source exception remains for data/identity-layers.json and generated data/factions.json identity-layer content.

Known warnings / exceptions:

- Existing builder-owned Silverquill inhibitor warning remains unchanged.
- Dossier audit remains 113 warnings / 0 failures.
- Documented display-source exception is Silverquill-scoped, required to resolve stale generated/public Silverquill copy, and did not change builder code or other identity semantics.

Final Gate 5 candidate state:

- Silverquill is uncertified.
- Prismari, Lorehold, and Quandrix remain certified.
- No other identity was started.
- No certification commit exists.


## Gate 5 Replacement Candidate Hygiene Correction

Independent review requested changes for rejected candidate `078310b428d66e3f1423fb897d919040542a4593` due to CRIT ledger BOM bytes and literal workflow placeholders. The replacement candidate keeps the approved Silverquill semantic/generated/fixture work intact while correcting candidate hygiene.

Replacement candidate parent/review base: `3baa8307cf1d6b23aab1564b866e6580e500cf66`
Superseded rejected candidate: `078310b428d66e3f1423fb897d919040542a4593`
Replacement candidate SHA: `b9cd9e914c280e9c40c7a977b8f7c07204614d3e`.

Corrections included in the replacement candidate:

- Removed UTF-8 BOM from `docs/incidents/CRIT-001-identity-recovery-ledger.json`.
- Replaced literal shell-variable placeholders in VM-504 candidate-facing documentation with concrete known values or explicit pending workflow-record language.
- Preserved the documented Silverquill display-source exception for `data/identity-layers.json` and generated `data/factions.json` identity-layer content.
- Preserved Silverquill semantics, generated artifacts, provenance, fixtures, scope-policy cleanup, and validation history.


## Gate 5 Replacement Candidate Record

Replacement candidate parent/review base: `3baa8307cf1d6b23aab1564b866e6580e500cf66`
Replacement candidate recovery SHA: `b9cd9e914c280e9c40c7a977b8f7c07204614d3e`
Superseded rejected candidate: `078310b428d66e3f1423fb897d919040542a4593`
Safety ref: `backup/vm-504-rejected-silverquill-candidate-078310b`

Silverquill remains uncertified pending independent Gate 5 review. No certification commit exists.

Workflow-record scope: docs/card/report/ledger/board/handoff index only. No Silverquill canonical data, generated artifacts, fixtures, contract files, shared tooling, or other identity data changed in this workflow-record step.
