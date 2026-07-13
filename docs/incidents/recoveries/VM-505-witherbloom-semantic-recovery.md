# VM-505 Witherbloom Semantic Recovery

## Gate 1 Semantic Audit - Contract v1.1

Status: certified semantically_ready under CRIT-001 Contract v1.1.
Branch: `codex/vm-505-witherbloom-semantic-recovery`
Starting SHA / current HEAD during audit: `41d291072340f7ddfe4ffe90f2e57e4f4793142d`
Program base: `41d291072340f7ddfe4ffe90f2e57e4f4793142d`
Contract: `v1.1`
Audit date: 2026-07-12

## Executive Summary

Witherbloom shares the thin Strixhaven packet pattern found in Prismari, Quandrix, and Silverquill. The packet has 18 claim records, 15 sources, three claim-bearing sources, ten discovery-only story-corpus sources, and two support-only product/card sources. The structural audit reports `low-volume-pattern`, `mixed-role-pattern`, `discovery-heavy-pattern`, and `support-heavy-pattern`.

The first six claims provide a real official-source floor: College of Essence Studies, life/death power, brewing with natural components and living essence, black/green life-energy tension, academic study areas, and placement interpretation. But authoritative profile, placement, and generated provenance chains repeatedly cite discovery/search records and support/product records as if they were substantive semantic proof.

Primary disposition: `Claim-extraction pass required`.

Gate 2 evidence confirmation is required before remediation. Gate 1 did not prove a broad source gap. Existing official/local sources appear likely sufficient to plan bounded extraction, but Gate 2 must confirm exactly which new substantive claims are needed and whether any currently unsupported statement should be preserved, narrowed, or removed.

## Worktree Preservation Statement

- CRIT worktree path verified as `C:\dev\mtgSiteWIP-crit001`.
- CRIT worktree branch verified as `codex/vm-505-witherbloom-semantic-recovery`.
- CRIT worktree HEAD verified as `41d291072340f7ddfe4ffe90f2e57e4f4793142d`, descending from the accepted program base.
- Original dirty main worktree `C:\dev\mtgSiteWIP` was checked read-only with a safe-directory override and remains unchanged.
- No Witherbloom canonical raw data, generated artifacts, runtime files, Hall/Crucible content, scoring, inhibition, confidence, scheduling, tie-ordering, or global recruiter behavior was modified.

## Scope and Non-Goals

Gate 1 was read-only semantic audit plus workflow documentation. It did not remediate Witherbloom, rebuild generated outputs, create a candidate recovery commit, certify Witherbloom, or start another identity.

Local research boundary was honored. `docs/research/canon/strixhaven-college-reference-audit.md` and `docs/research/canon/ten-guild-reference-audit.md` were used as discovery/audit guides only. No online lookup was performed.

## Preflight Context

Recent related work: VM-502 Prismari, VM-506 Lorehold, VM-503 Quandrix, and VM-504 Silverquill are certified `semantically_ready` under CRIT-001 Contract v1.1. Witherbloom is the active identity branch and the final Strixhaven college remaining in Wave 1.

Known risks: Witherbloom carries the same suspicious Strixhaven raw-packet shape as Prismari, Quandrix, and Silverquill. Discovery-only story-corpus rows may be counted as semantic evidence, support-only Commander/product/card rows may appear in authoritative chains, and generated provenance can preserve invalid evidence chains until canonical references are repaired.

Relevant decisions: Contract v1.1 requires explicit semantic roles, bounded evidence for remediated substantive claims, evidence mappings for recruiter guidance, and generated provenance coverage. Runtime calibration, Hall/Crucible behavior, scoring, inhibition, confidence, scheduling, and live recruiter outcomes remain outside CRIT-001 identity certification.

Do not touch during VM-505 Gate 1: Witherbloom canonical raw data, generated artifacts, certified Prismari/Lorehold/Quandrix/Silverquill packets, runtime/global recruiter behavior, or the original dirty main worktree.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-505-witherbloom-semantic-recovery.md`
- `docs/incidents/CRIT-001-faction-semantic-readiness-integrity.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/reference/strixhaven-college-source-readiness-matrix.md`
- `docs/research/canon/strixhaven-college-reference-audit.md`
- `docs/research/canon/ten-guild-reference-audit.md`
- `data/raw-factions/witherbloom/witherbloom.claims.json`
- `data/raw-factions/witherbloom/witherbloom.sources.json`
- `data/raw-factions/witherbloom/witherbloom.profile.json`
- `data/raw-factions/witherbloom/witherbloom.placement.json`
- `data/raw-factions/witherbloom/witherbloom.changelog.json`
- `data/factions.json`
- `data/placement-model.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `data/semantic-readiness-provenance.json`

## Git and History Notes

Relevant Witherbloom raw-packet history: `f6a1dd4` introduced the raw/generated packet, `18f5112` was the batch foundation update, `8cf7702` / `9322e58` published source-bound cleanup bundles, and `9773bf0` established CRIT-001 semantic recovery governance.

The Strixhaven readiness matrix still carries legacy ready language for Witherbloom and explicitly warns that ready language is superseded by CRIT-001 semantic certification. The Witherbloom row records 15 source rows, three claim-bearing sources, two support-only rows, and ten discovery-only rows, with future notes for Beledros founder status, dean/founder expansion, story-corpus fieldwork claims, and long flavor text still source-intake-needed (`docs/reference/strixhaven-college-source-readiness-matrix.md:32`).

## Claim-Role Audit

Witherbloom has 18 claim records. None currently carry certifying `semantic_role`, so the validator treats them as not certification-ready.

| Role | Count | Audit confidence | Notes |
| --- | ---: | --- | --- |
| `substantive_claim` | 6 proposed / 0 validator-current | High | `witherbloom_claim_001` through `witherbloom_claim_006` assert official/source-backed identity, magic, life-energy tension, study areas, and placement interpretation. They still need explicit semantic roles and bounded evidence locations before certification (`data/raw-factions/witherbloom/witherbloom.claims.json:9`, `:22`, `:34`, `:46`, `:58`, `:70`). |
| `discovery_record` | 10 | High | `witherbloom_claim_0007` through `witherbloom_claim_0016` are `story_corpus_evidence` rows that record archive/search-query matches, not extracted story facts (`data/raw-factions/witherbloom/witherbloom.claims.json:83`, `:96`, `:109`, `:122`, `:135`, `:148`, `:161`, `:174`, `:187`, `:200`). |
| `support_record` | 2 | High | `witherbloom_claim_0017` and `witherbloom_claim_0018` are Commander product and local card/flavor-anchor support rows (`data/raw-factions/witherbloom/witherbloom.claims.json:213`, `:225`). |
| `unclassified` | 0 proposed / 6 validator-current | High | Current validator reports the first six claims as unclassified because the canonical file lacks `semantic_role`. |

Source-role cross-check: `witherbloom.sources.json` contains three `claim-bearing` sources, ten `discovery-only` sources, and two `support-only` sources (`data/raw-factions/witherbloom/witherbloom.sources.json:10`, `:22`, `:34`, `:46`, `:259`, `:272`).

Character, mechanic, institution, location, and role records: the current packet mostly lacks extracted character/location/institution claims. Story-corpus records mention Dina, Lisette, Valentin, pest, essence, bayou, swamp, growth, and learn, but these are discovery leads only. Mechanic/product support is auxiliary until substantive mechanics claims are extracted.

Too broad or unsupported claims: `witherbloom_claim_006` is an interpretive placement claim. It may remain substantive if bounded as project synthesis with supporting official evidence; Gate 2 should verify its exact evidence chain.

## Discovery-Record Audit

Discovery/search records are used as semantic proof and are blockers.

| File | JSON pointer | Statement / consumer | Cited claim(s) | Problem | Severity |
| --- | --- | --- | --- | --- | --- |
| `witherbloom.profile.json` | `/core_identity` | Core identity, philosophy, central tension | `witherbloom_claim_0007`-`0014` | Discovery rows only record story search matches; they do not prove identity/tension prose (`data/raw-factions/witherbloom/witherbloom.profile.json:43`-`:56`). | BLOCKER |
| same | `/site_surface` | Public tagline | `witherbloom_claim_0007`-`0010` | Discovery rows cannot prove public display language (`data/raw-factions/witherbloom/witherbloom.profile.json:58`-`:67`). | HIGH |
| same | `/structure` | Official guide / fieldwork summary | `witherbloom_claim_0007`-`0010` | Existing substantive claims are better support candidates; search hits are not extracted facts (`data/raw-factions/witherbloom/witherbloom.profile.json:69`-`:76`). | BLOCKER |
| same | `/great_tension` | Nurturing ecosystems vs exploiting life essence | `witherbloom_claim_0007`-`0011` | Tension is plausible from claim `004`, but the current chain is discovery-only (`data/raw-factions/witherbloom/witherbloom.profile.json:78`-`:87`). | BLOCKER |
| same | `/mechanics` | Life gain, pests, sacrifice, healing, harm, biological exchange | `witherbloom_claim_0007`-`0010` | Discovery rows cannot prove mechanics meaning (`data/raw-factions/witherbloom/witherbloom.profile.json:187`-`:194`). | BLOCKER |
| `witherbloom.placement.json` | `/placement_summary` | Placement summary and calibrated read | `witherbloom_claim_0007`-`0014` plus `evidence_claim_ids` `001`-`006` | Mixed chain includes invalid discovery evidence (`data/raw-factions/witherbloom/witherbloom.placement.json:169`-`:192`). | BLOCKER |
| same | `/placement_axes/0` | Essence Craft vs Abstraction axis | `witherbloom_claim_0007`-`0014` | Search-match rows are promoted into placement axis evidence (`data/raw-factions/witherbloom/witherbloom.placement.json:196`-`:215`). | BLOCKER |
| same | `/moral_and_psychological_profile` | Behavioral scoring profile | `witherbloom_claim_0007`-`0011` | Discovery rows cannot prove behavioral model (`data/raw-factions/witherbloom/witherbloom.placement.json:218`-`:226`). | BLOCKER |
| same | `/core_values/0`-`/core_values/9` | Search keyword/name values | `witherbloom_claim_0007`-`0009` | Search hits are treated as core placement values (`data/raw-factions/witherbloom/witherbloom.placement.json:229`-`:328`). | BLOCKER |
| same | `/behavioral_signals/0` | Story-context behavioral signal | `witherbloom_claim_0007`-`0012` | Story search hits are treated as behavioral evidence (`data/raw-factions/witherbloom/witherbloom.placement.json:330`-`:341`). | BLOCKER |
| same | `/inhibitor_traits/0` | Shared-color overfit inhibitor | `witherbloom_claim_0007`-`0010` | Useful concept, invalid evidence chain (`data/raw-factions/witherbloom/witherbloom.placement.json:350`-`:356`). | HIGH |

The discovery records are not harmless bibliography leads because they flow into profile, placement, and generated provenance.

## Support-Record Audit

| File | JSON pointer | Statement / consumer | Cited claim/source | Problem | Severity |
| --- | --- | --- | --- | --- | --- |
| `witherbloom.profile.json` | `/key_figures/1`, `/key_figures/2` | Dina / Gorma key-figure entries | `witherbloom_claim_0017` | Product/decklist support can verify product/navigation presence, not identity-level character meaning (`data/raw-factions/witherbloom/witherbloom.profile.json:113`-`:129`). | HIGH |
| same | `/canonical_flavor_text/0`-`/2` | Selected card flavor anchors | `witherbloom_claim_0018` | Card/flavor anchor support may remain auxiliary, but it cannot act as authoritative semantic proof (`data/raw-factions/witherbloom/witherbloom.profile.json:139`-`:178`). | MEDIUM |
| same | `/commander_compass/identity_basis/supporting_claim_ids` | Identity-basis owned themes and phrases | `witherbloom_claim_0017`, `witherbloom_claim_0018` mixed with substantive claims | Support records are included in an authoritative identity-basis chain and should be moved to auxiliary support fields (`data/raw-factions/witherbloom/witherbloom.profile.json:289`-`:320`). | HIGH |
| same | `/commander_compass/native_fit_commanders/*/source_basis` | Native-fit commander support | `witherbloom_claim_0017` | Likely acceptable only as product/navigation support after explicit auxiliary isolation. | MEDIUM |

## Profile Entailment Audit

| Section | Result | Reason |
| --- | --- | --- |
| `profile` top-level | PASS WITH BLOCKING ROLE/LINKAGE LIMITATION | The top-level first-pass package has an official-source floor, but validator cannot certify until semantic roles and evidence localization exist. |
| `core_identity` | FAIL | Core identity, philosophy, and tension cite only discovery rows. |
| `site_surface` | FAIL | Tagline cites discovery rows. |
| `structure` | FAIL | Official-guide/fieldwork summary cites discovery rows, not substantive official-source claims. |
| `great_tension` | FAIL | Life-energy tension is likely supportable by `witherbloom_claim_004`, but the current chain is discovery-only. |
| `key_figures` | PASS WITH BLOCKING LIMITATION | Beledros appears without direct support in the current first-six claims; Dina/Gorma use product support only. Gate 2 must decide what to preserve, narrow, or leave auxiliary. |
| `locations` | UNRESOLVED | Swamp/bayou/bog/fieldwork language appears, but the current chains rely on discovery rows or first-pass synthesis. |
| `mechanics` | FAIL | Mechanics summary cites discovery rows. |
| `mature expression` | UNRESOLVED | Care/harm, remedies, fieldwork, ecology, and practical magic are present as placement guidance, but need bounded source-backed claims. |
| `unhealthy expression` | UNRESOLVED | Exploiting life energy is likely supported, but needs a bounded substantive chain. |
| `failure or pressure behavior` | FAIL | Current behavioral signal is discovery-backed and not a true pressure/failure model. |
| `placement-facing summary` | FAIL | Placement-facing profile uses discovery-backed chains and incomplete guidance mapping. |

## Placement Entailment Audit

| Section | Result | Reason |
| --- | --- | --- |
| `ideal_fit_indicators` / `good_fit_indicators` | PASS WITH BLOCKING ROLE/LINKAGE LIMITATION | They cite first-six claims, but those claims lack semantic roles and bounded evidence. |
| `poor_fit_indicators` | PASS WITH BLOCKING ROLE/LINKAGE LIMITATION | Same. |
| `discriminator_questions` | PASS WITH BLOCKING ROLE/LINKAGE LIMITATION | Q1/Q2 cite first-three claims and are directionally related, but Gate 2 should confirm whether wording is fully supported. Collision questions use evidence ids but require role/evidence localization. |
| `chatbot_guidance` | FAIL | Match, mismatch, and uncertainty arrays lack `evidence_claim_ids` mapping (`data/raw-factions/witherbloom/witherbloom.placement.json:124`-`:149`). |
| `placement_summary` | FAIL | Includes discovery-backed `claim_ids` even though `evidence_claim_ids` cite the first six claims. |
| `placement_axes/0` | FAIL | Corpus-search evidence drives the axis. |
| `moral_and_psychological_profile` | FAIL | Discovery rows cannot support the behavioral model. |
| `core_values/0`-`/9` | FAIL | Search keywords/names are treated as core values. |
| `behavioral_signals/0` | FAIL | Story search hits are treated as behavior. |
| `inhibitor_traits/0` | HIGH | Overfit guardrail is useful, but its evidence chain is discovery-backed. |
| `collision_guidance` | PASS WITH BLOCKING ROLE/LINKAGE LIMITATION | Selesnya, Simic, and Quandrix boundaries exist and use first-six claims; Gate 2 must confirm the bounded neighbor set, especially missing Golgari/BG. |

Potential unsupported-binary / stereotype risks: Q2 contrasts library/wound/garden/swamp and may be useful, but Gate 2 should verify it does not create an unsupported anti-intellectual binary. The Simic boundary says Simic "optimizes living systems"; this is likely directionally useful but should remain neutral and source-bounded when Simic is eventually recovered.

## Required Contract v1.1 Dimensions

| Dimension | Result | Evidence / limitation |
| --- | --- | --- |
| Core identity | FAIL | Identity prose is supportable in principle by `witherbloom_claim_001`, but canonical core identity currently cites discovery rows. |
| Internal tension | FAIL | `witherbloom_claim_004` likely supports black exploitation vs green growth/blossoming, but profile/placement chains are discovery-backed. |
| Motivation | UNRESOLVED | Essence studies and practical life/death craft imply motivation, but Gate 2 must extract or map it explicitly. |
| Preferred method | PASS WITH BLOCKING LIMITATION | Brewing spells from natural components/living essence and study areas support method, but mechanics/profile chains are invalid. |
| Mature expression | UNRESOLVED | Remedies, healing, fieldwork, ecology, and practical magic need bounded claim support. |
| Unhealthy expression | UNRESOLVED | Exploiting life energy is likely supported, but needs a bounded substantive chain. |
| Failure or pressure behavior | FAIL | Current behavioral signal is discovery-backed and not a true pressure/failure model. |
| Positive inclusion evidence | PASS WITH BLOCKING LIMITATION | Positive indicators and Q1/Q2 can likely be repaired from claims `001`-`006`. |
| Negative exclusion evidence | PASS WITH BLOCKING LIMITATION | Poor-fit indicators and guardrails exist but need evidence mapping and possibly narrowing. |
| Ambiguous or uncertainty evidence | FAIL | Uncertainty questions exist but lack evidence mapping and semantic fixtures. |
| Required-neighbor boundaries | FAIL | Selesnya, Simic, and Quandrix guidance exists; required BG/Golgari boundary is missing from Witherbloom-side required neighbors. |
| Source-to-runtime traceability | FAIL | Validator fails; provenance has 28 Witherbloom rows carrying discovery/support records into generated consumers. |

## Required-Neighbor Audit

Bounded required-neighbor set proposed for Gate 2 confirmation:

| Neighbor | Why required | Current coverage | Gate 1 result |
| --- | --- | --- | --- |
| `BG` / Golgari | Same color pair and explicit Strixhaven/guild twin. Local canon audit names Witherbloom-Golgari as the paired boundary and warns that the guild-twin guardrail is mandatory (`docs/research/canon/strixhaven-college-reference-audit.md:22`, `:66`-`:70`, `:101`-`:102`; `docs/research/canon/ten-guild-reference-audit.md:124`-`:126`). | Missing from Witherbloom collision guidance; Golgari generated context has a Witherbloom contrast, but Witherbloom side lacks reciprocal required-neighbor mapping. | BLOCKER / required Gate 2 plan. |
| `SELESNYA_CONCLAVE` / GW | Existing collision; conceptual overlap around growth, care, harmony, and life/nature. | Present in discriminator question and collision guidance (`data/raw-factions/witherbloom/witherbloom.placement.json:94`-`:106`, `:427`-`:437`). | Required; needs source-bounded mapping. |
| `SIMIC_COMBINE` / GU | Existing collision; conceptual overlap around biology/living systems. | Present in discriminator question and collision guidance (`data/raw-factions/witherbloom/witherbloom.placement.json:109`-`:120`, `:439`-`:449`). | Required; needs neutral, source-bounded wording. |
| `QUANDRIX` / GU college | Existing paired Strixhaven collision; overlap around life systems, fieldwork/embodiment versus abstraction/pattern logic. | Present in collision guidance and Crucible-era readiness notes (`data/raw-factions/witherbloom/witherbloom.placement.json:451`-`:464`; `docs/reference/strixhaven-college-source-readiness-matrix.md:64`). | Required; must align with certified Quandrix. |

Do not perform a 37-by-37 comparison. Other life/death, decay/growth, sacrifice, resource-exchange, survival, biology, or graveyard identities can be recorded only if Gate 2 finds actual ambiguity that affects certification.

## Generated Propagation Audit

Generated consumers preserve the current canonical Witherbloom meaning but also preserve invalid evidence chains.

Observed generated state:

- `data/placement-model.json` contains Witherbloom identity/philosophy/core_tension/mechanics, discriminator questions, fit indicators, inhibitors, and neighbor guidance generated from the current raw packet.
- `supabase/functions/guild-recruiter/faction-context.ts` contains Witherbloom public/recruiter prose and evidence arrays; no visible claim-ID leak was observed in prose during Gate 1.
- `data/semantic-readiness-provenance.json` contains 46 Witherbloom entries. Twenty-eight generated provenance entries cite discovery/support records as evidence for generated semantic consumers.

Invalid provenance categories include placement `/behavioral_signals/0`, `/core_values/0`-`/9`, `/inhibitor_traits/0`, `/moral_and_psychological_profile`, `/placement_axes/0`, `/placement_summary`, plus profile `/core_identity`, `/site_surface`, `/structure`, `/great_tension`, `/mechanics`, `/data_quality/corpus_upgrade`, `/key_figures/1`, `/key_figures/2`, `/canonical_flavor_text/0`-`/2`, and Commander Compass native-fit source-basis entries.

Generated-diff inspection is deferred to Gate 4 because Gate 1 does not rebuild generated artifacts.

## Maturity / Thin-Packet Test

Conclusion: `Thin-packet pattern confirmed; claim extraction and conceptual expansion required.`

Evidence:

- 18 total claim records.
- 6 likely substantive claims, 10 discovery/search records, 2 support records.
- `npm.cmd run audit:semantic-readiness -- --targets=WITHERBLOOM` reports `low-volume-pattern`, `mixed-role-pattern`, `discovery-heavy-pattern`, and `support-heavy-pattern`.
- Claim-bearing source rate is 3/15 = 0.20.
- Current semantic-readiness validator reports missing semantic roles on all 18 claims, missing recruiter mappings, authoritative references without substantive claims, and missing identity semantic fixtures.
- Local Witherbloom canon research is richer than the raw packet, but it is an audit guide; Gate 2 must trace any new claims to underlying official/local source authority rather than treating the audit summary itself as final proof.

This does not prove Witherbloom needs complete reconstruction. It does prove Witherbloom cannot be certified with light role/provenance cleanup alone.

## Findings by Severity

### BLOCKER

- All 18 claims lack certifying `semantic_role`.
- Discovery/search records support authoritative profile chains: `/core_identity`, `/structure`, `/great_tension`, `/mechanics`, and related generated provenance.
- Discovery/search records support authoritative placement chains: `/placement_summary`, `/placement_axes/0`, `/moral_and_psychological_profile`, `/core_values/0`-`/9`, and `/behavioral_signals/0`.
- Recruiter match/mismatch/uncertainty guidance lacks evidence mapping.
- Generated provenance carries 28 discovery/support-backed semantic chains for Witherbloom.
- Required-neighbor coverage is missing a bounded Witherbloom-side BG/Golgari distinction.
- Witherbloom lacks Contract v1.1 semantic fixtures.
- Failure/pressure behavior is not sufficiently grounded.

### HIGH

- Support/product records are used in key-figure and Commander Compass identity-basis chains without sufficient auxiliary isolation.
- `site_surface` and public tagline chain uses discovery rows.
- Inhibitor/guardrail evidence chain is discovery-backed.
- Q2 and some collision wording require Gate 2 confirmation to avoid unsupported binaries or overbroad neighbor stereotypes.

### MEDIUM

- Canonical flavor text rows may be acceptable as auxiliary card support but must not serve as identity proof.
- Placement claim `witherbloom_claim_006` needs bounded project-synthesis evidence localization if retained as substantive.
- Existing Selesnya, Simic, and Quandrix neighbor guidance likely needs traceable mapping and possible narrowing.

### LOW

- Existing legacy readiness language remains in the Strixhaven source-readiness matrix but is already superseded by the CRIT-001 warning.
- Generated public copy should be inspected in Gate 4 for stale display-source preservation after remediation.

### NON-BLOCKING OBSERVATION

- The local canon audit contains a strong Witherbloom/Golgari taxonomy and may guide Gate 2 extraction, but it should not be treated as automatic final proof.
- Broader lore enrichment around Beledros, deans, named students, story episodes, or individual cards should be avoided unless needed for Contract v1.1 blockers.

## Primary Disposition

`Claim-extraction pass required`.

Gate 2 evidence confirmation is required.

No broad source discovery is authorized yet. Gate 2 should first confirm whether existing official sources, already-listed story/archive records, and local canon guides contain enough bounded evidence to:

- classify the first six claims as substantive with localization;
- preserve `0007`-`0016` as discovery-only;
- preserve `0017`-`0018` as support-only;
- add minimal new substantive claims for motivation, mature/unhealthy expression, pressure behavior, mechanics meaning, and BG/Golgari boundary;
- replace discovery-backed profile, placement, guidance, and provenance chains;
- isolate product/card support records as auxiliary only.

## Minimal Bounded Repair List

### Required for certification

1. Add semantic roles to all 18 Witherbloom claims.
2. Add bounded evidence locations to all substantive claims.
3. Preserve `witherbloom_claim_0007`-`0016` as discovery records unless Gate 2 proves a specific extracted fact should become a new separate substantive claim.
4. Preserve `witherbloom_claim_0017` and `witherbloom_claim_0018` as support records and isolate them from authoritative identity proof chains.
5. Add minimal new substantive claims only where Gate 2 confirms existing claims cannot support Contract v1.1 dimensions.
6. Remove discovery records from profile semantic proof chains.
7. Remove discovery records from placement semantic proof chains.
8. Replace search-term-backed core values, behavioral signal, inhibitor trait, placement axis, and generated provenance chains with source-backed substantive claims.
9. Add evidence mappings to recruiter-facing match, mismatch, and uncertainty guidance.
10. Define and map bounded required neighbors: BG/Golgari, Selesnya, Simic, and Quandrix unless Gate 2 proves a smaller set is sufficient.
11. Add Witherbloom semantic fixtures in Gate 4 after canonical remediation.
12. Rebuild generated artifacts and provenance in Gate 4; verify no discovery/support records are used as semantic proof.

### Optional / non-blocking

- Enrich Beledros founder/dean/student details only if required to support a blocker.
- Expand story-specific Dina/Lisette/Valentin evidence only if a profile or placement statement requires it.
- Improve generated public copy readability only if the source chain is already certification-safe.

### Out of scope for CRIT-001

- Hall scheduling, Crucible behavior, scoring, inhibition, confidence, tie ordering, adaptive scheduling, live recruiter calibration, broad lore enrichment, and exhaustive Witherbloom story/card cataloging.

## Gate 2 Recommendation

Proceed to VM-505 Gate 2 bounded evidence confirmation only.

Gate 2 should produce an audit-only role mapping, proposed minimal new substantive claims, discovery-record replacement plan, support-record isolation plan, profile and placement support plans, recruiter guidance evidence mapping, provenance repair plan, required-neighbor evidence plan, exact Gate 3 checklist, and decision on whether targeted source discovery is required.

## Gate 2 Evidence Confirmation

Status: Gate 2 complete; Witherbloom remains uncertified.
Gate 2 date: 2026-07-12.

Gate 2 was audit-only evidence planning. It did not modify Witherbloom canonical raw data, generated artifacts, runtime behavior, Hall/Crucible content, scoring, inhibition, confidence, scheduling, tie ordering, or global recruiter behavior.

### Gate 2 Conclusion

No broad or targeted online source discovery is required right now.

Gate 3 can proceed from:

- current official/source-backed claims `witherbloom_claim_001` through `witherbloom_claim_006`;
- current support-only rows `witherbloom_claim_0017` and `witherbloom_claim_0018`, isolated as auxiliary support only;
- local Witherbloom canon/source notes under `docs/research/canon/strixhaven/witherbloom/`;
- local Golgari canon/source notes under `docs/research/canon/guilds/golgari/` and existing Golgari architecture/raw records for the BG boundary;
- already-known official source entries listed in `docs/research/canon/strixhaven/witherbloom/SOURCES.md`.

If Gate 3 needs exact source localization for already-known official URLs that are not locally cached, stop and request bounded source-localization approval. That is different from broad discovery.

### Claim-Role Mapping Summary

| Claim ID | Current type | Proposed semantic role | Reason | Needs bounded evidence localization? | May support profile / placement / guidance / provenance? |
| --- | --- | --- | --- | --- | --- |
| `witherbloom_claim_001` | `identity` | `substantive_claim` | Official-source identity floor: Witherbloom is the black-green College of Essence Studies. | Yes | Yes: core identity, profile summary, placement summary, core inclusion, neighbor boundaries. |
| `witherbloom_claim_002` | `magic` | `substantive_claim` | Official-source life/death force claim. | Yes | Yes: philosophy, internal tension, life/death exchange, Q1, neighbor boundaries. |
| `witherbloom_claim_003` | `magic` | `substantive_claim` | Official-source natural components/living essence/heal-harm/dead claim. | Yes | Yes: preferred method, mature/unhealthy expression, guidance, mechanics, Q1/Q2. |
| `witherbloom_claim_004` | `dichotomy` | `substantive_claim` | Official-source black/green life-energy split; strongest current internal-tension evidence. | Yes | Yes: internal tension, mature/unhealthy expression, failure/pressure behavior, Q1. |
| `witherbloom_claim_005` | `academics` | `substantive_claim` | Official-source study-area list: alchemy, medicine, biomancy, pathology, toxicology, mortuary science, necromancy. | Yes | Yes: institutional role, preferred method, field/medical/toxicology language. |
| `witherbloom_claim_006` | `placement` | `substantive_claim` with `interpretation_level: project_synthesis` | Supported placement interpretation derived from official claims. Should remain explicit synthesis, not canon. | Yes | Yes: placement summary, guidance, false-positive guardrails, fixtures. |
| `witherbloom_claim_0007` | `story_corpus_evidence` | `discovery_record` | Search/archive relevance only; no extracted story fact. | No, unless a new separate substantive claim is later extracted. | No semantic proof; may remain bibliography/discovery metadata only. |
| `witherbloom_claim_0008` | `story_corpus_evidence` | `discovery_record` | Search/archive relevance only. | No | Discovery metadata only. |
| `witherbloom_claim_0009` | `story_corpus_evidence` | `discovery_record` | Search/archive relevance only. | No | Discovery metadata only. |
| `witherbloom_claim_0010` | `story_corpus_evidence` | `discovery_record` | Search/archive relevance only. | No | Discovery metadata only. |
| `witherbloom_claim_0011` | `story_corpus_evidence` | `discovery_record` | Search/archive relevance only. | No | Discovery metadata only. |
| `witherbloom_claim_0012` | `story_corpus_evidence` | `discovery_record` | Search/archive relevance only. | No | Discovery metadata only. |
| `witherbloom_claim_0013` | `story_corpus_evidence` | `discovery_record` | Search/archive relevance only. | No | Discovery metadata only. |
| `witherbloom_claim_0014` | `story_corpus_evidence` | `discovery_record` | Search/archive relevance only. | No | Discovery metadata only. |
| `witherbloom_claim_0015` | `story_corpus_evidence` | `discovery_record` | Search/archive relevance only. | No | Discovery metadata only. |
| `witherbloom_claim_0016` | `story_corpus_evidence` | `discovery_record` | Search/archive relevance only. | No | Discovery metadata only. |
| `witherbloom_claim_0017` | `commander_product_support` | `support_record` | Official Commander decklist support for product/deck navigation, not identity proof. | No, unless retained in auxiliary support fields. | Auxiliary product/card surfaces only. |
| `witherbloom_claim_0018` | `card_flavor_anchor_support` | `support_record` | Local card-data support for card names/URIs/flavor-anchor summaries, not identity proof. | No, unless retained in auxiliary support fields. | Auxiliary card/flavor support only. |

### Proposed Claim-Extraction Plan

Gate 3 should add only the minimum substantive claims needed to replace invalid discovery/support chains and cover Contract v1.1 dimensions. Suggested claim identifiers below are planning labels, not canonical IDs.

| Proposed claim purpose | Existing source to read first | Bounded locator / guide | Dimension(s) supported | Supports | Scope | Required? |
| --- | --- | --- | --- | --- | --- | --- |
| Witherbloom practical life/death craft: life and death are workable forces expressed through essence studies, natural components, healing, harm, and death-facing magic. | `src_wotc_planeswalkers_guide_strixhaven_2021`; `witherbloom_claim_001`-`003` | 2021 Planeswalker's Guide, Witherbloom section; local source note `docs/research/canon/strixhaven/witherbloom/SOURCES.md:7` | Core identity, philosophy, preferred method | `profile.core_identity`, `site_surface`, `structure`, `placement_summary`, guidance | Identity-wide | Required |
| Internal tension: Witherbloom holds green-aligned nurturing/growth and black-aligned exploitation/extraction in one life-energy dialectic. | `src_wotc_planeswalkers_guide_strixhaven_2021`; `witherbloom_claim_004` | 2021 guide Witherbloom section; local architecture guide `docs/architecture/colors/witherbloom/identity.md:42`-`:46` | Internal tension, mature/unhealthy expression | `great_tension`, Q1, match/mismatch guidance | Identity-wide | Required |
| Academic / field-study method: Witherbloom studies life sciences, medicine, toxins, mortuary practice, necromancy, remedies, poisons, ecology, and the body as practical learning. | `src_wotc_planeswalkers_guide_secrets_strixhaven_2026`; `witherbloom_claim_005`; `witherbloom_claim_006` | 2026 guide Witherbloom study-area section; local architecture guide `docs/architecture/colors/witherbloom/identity.md:50`, `:66` | Motivation, preferred method, institutional role | `structure`, Q2, match guidance, placement summary | Identity-wide / institution-specific | Required |
| Mechanics identity: lifegain/life-loss, Pests, sacrifice, Food/cauldron/brewing, death/lifegain triggers, and life movement are Witherbloom when tied to biological exchange. | Already-known official sources in `docs/research/canon/strixhaven/witherbloom/SOURCES.md:13`-`:25`, `:43`-`:49`; current support rows only auxiliary | Witherbloom source notes for magecraft/life, release notes, decklist token package, 2026 guide; taxonomy guide `docs/research/canon/strixhaven/witherbloom/witherbloom-narrative-taxonomy.md:43`-`:85` | Mechanics, positive inclusion, source-to-runtime traceability | `profile.mechanics`, generated mechanics, fixtures | Mechanics-specific / project synthesis | Required if preserving mechanics summary |
| Mature expression: Witherbloom uses life/death knowledge to heal, nourish, study, cultivate, and survive while acknowledging cost. | Claims `003`, `004`, `005`, `006`; Witherbloom architecture as guide | `docs/architecture/colors/witherbloom/identity.md:33`-`:38`, `:66`-`:74` | Mature expression, positive inclusion | Match guidance, core fixtures, profile summary | Project synthesis from official floor | Required |
| Unhealthy expression: Witherbloom can over-extract life energy or treat bodies/living systems as exploitable material. | `witherbloom_claim_004`; architecture guide | `docs/architecture/colors/witherbloom/identity.md:46`, `:92`-`:118`; `docs/architecture/colors/witherbloom/metaphysics.md:37` | Unhealthy expression, failure/pressure behavior | Mismatch guidance, pressure fixture, Q1 weakening pattern | Project synthesis from official tension | Required |
| Failure/pressure behavior: under pressure, Witherbloom drifts into sterile separation from bodily mess or into generic extraction/consumption without reciprocal life/death exchange. | Claims `003`, `004`, `006`; architecture guide | `docs/architecture/colors/witherbloom/metaphysics.md:82`-`:84`; `docs/architecture/colors/witherbloom/identity.md:92`-`:118` | Failure/pressure behavior, uncertainty evidence | Behavioral signal, inhibitor trait, fixtures | Project synthesis | Required |
| BG/Golgari boundary: Witherbloom centers school-based essence, medicine/toxins, pestcraft, field biology, and life-force exchange; Golgari centers Ravnica civic ecology, rot farms, undercity survival, graveyard recursion, and decay as infrastructure. | Witherbloom claims `001`-`006`; Golgari raw/architecture; local Golgari taxonomy | `docs/architecture/colors/witherbloom/identity.md:129`-`:132`, `:179`-`:183`; `docs/architecture/colors/golgari/identity.md:122`-`:132`; `docs/research/canon/ten-guild-reference-audit.md:124`-`:126` | Required-neighbor boundary, negative exclusion, ambiguous evidence | New BG/Golgari collision guidance, uncertainty fixture | Cross-faction boundary / project synthesis | Required |
| Selesnya boundary: Witherbloom studies life/death cost and exchange; Selesnya centers shared harmony and belonging. | Existing collision guidance; Witherbloom claims `001`-`003`; Selesnya side when needed | `data/raw-factions/witherbloom/witherbloom.placement.json:427`-`:437`; architecture guide `docs/architecture/colors/witherbloom/identity.md:194`-`:198` | Required-neighbor boundary | Existing Selesnya collision, exclusion fixture | Boundary synthesis | Required |
| Simic boundary: Witherbloom works through embodied essence/cost/medicine/toxins; Simic improves/adapts living systems. | Existing collision guidance; Witherbloom claims `001`-`003`; Simic side when needed | `data/raw-factions/witherbloom/witherbloom.placement.json:439`-`:449`; architecture guide `docs/architecture/colors/witherbloom/identity.md:208`-`:212` | Required-neighbor boundary | Existing Simic collision, exclusion fixture | Boundary synthesis | Required |
| Quandrix boundary: Witherbloom works through body, essence, remedies, fieldwork, and life/death exchange; Quandrix centers abstract proof/model/pattern logic. | Existing collision guidance; claims `002`, `003`, `005`, `006`; certified Quandrix packet | `data/raw-factions/witherbloom/witherbloom.placement.json:451`-`:464`; certified Quandrix report/packet | Required-neighbor boundary | Existing Quandrix collision, ambiguous fixture | Boundary synthesis | Required |

Optional only: Beledros founder/dean/story-character claims. Gate 3 should not add them unless a retained profile statement requires them.

### Discovery-Record Replacement Plan

| Current chain | Discovery claims currently used | Replacement support plan | Preserve / narrow / remove? | Targeted discovery required? |
| --- | --- | --- | --- | --- |
| `profile.core_identity` | `0007`-`0014` | Replace with `001`, `002`, `003`, `004`, plus new practical life/death craft and internal-tension claims if added. | Preserve, but replace evidence. | No |
| `profile.site_surface` | `0007`-`0010` | Use `001`, `002`, `003`, and optionally mature/practical craft claim. | Preserve tagline if evidence supports full wording; otherwise narrow. | No |
| `profile.structure` | `0007`-`0010` | Use `001`, `005`, `006`; add academic/field-study claim if preserving swamps/labs/clinics/fieldwork. | Preserve/narrow. | No; may need bounded source localization from 2026 guide. |
| `profile.great_tension` | `0007`-`0011` | Use `004`, plus new internal-tension claim. | Preserve. | No |
| `profile.mechanics` | `0007`-`0010` | Use new mechanics identity claim backed by already-known official mechanics/source notes; current `0017`/`0018` auxiliary only. | Preserve if mechanics claim is added; otherwise narrow to official-source floor. | No broad discovery; source localization may be needed. |
| `profile.data_quality.corpus_upgrade` | `0007`-`0016` | Keep as metadata/discovery only; do not expose as semantic proof. | Preserve as non-authoritative metadata or move out of semantic provenance. | No |
| `placement.placement_summary` | `0007`-`0014` plus `001`-`006` | Remove discovery `claim_ids`; retain `evidence_claim_ids` from `001`-`006` plus proposed claims. | Preserve/narrow. | No |
| `placement.placement_axes/0` | `0007`-`0014` | Replace with `002`, `003`, `005`, `006`, and practical/embodiment claim; remove story-corpus rationale. | Preserve with source-backed rationale. | No |
| `placement.moral_and_psychological_profile` | `0007`-`0011` | Replace with `001`-`006` plus failure/pressure and false-positive synthesis claims. | Preserve/narrow. | No |
| `placement.core_values/0`-`/9` | `0007`-`0009` | Replace keyword/name rows with conceptual values: essence studies, life/death exchange, embodied fieldcraft, care/exploitation tension, practical biological exchange. | Replace; do not keep search terms as core values. | No |
| `placement.behavioral_signals/0` | `0007`-`0012` | Replace story-search signal with behavior supported by substantive claims: studies cost, practical craft, usable vitality/death, field/body learning. | Replace. | No |
| `placement.inhibitor_traits/0` | `0007`-`0010` | Replace evidence with `001`-`006` plus false-positive synthesis claim. | Preserve guardrail with repaired evidence. | No |

### Support-Record Isolation Plan

| Support record | Current use | Gate 3 disposition |
| --- | --- | --- |
| `witherbloom_claim_0017` | Dina/Gorma key-figure entries, Commander Compass identity basis, native-fit commander source basis, deck/product links | Keep as `support_record`; remove from authoritative identity-basis `supporting_claim_ids`; retain only in auxiliary product/navigation fields such as `support_claim_ids`, `product_support_claim_ids`, or existing `source_basis` with `support_only: true`. |
| `witherbloom_claim_0018` | Canonical flavor text rows, Commander Compass identity basis | Keep as `support_record`; isolate card/flavor anchor summaries as auxiliary support; remove from identity-basis support chain. |
| Dina/Gorma key figures | Currently product support, not lore biography | Preserve only if marked product/navigation anchors. If profile needs character meaning, Gate 3 needs a separate substantive character claim from an official/source-read passage; otherwise do not promote. |
| Canonical flavor text rows | Card summaries sourced from local Scryfall | Keep as auxiliary flavor/card support, not identity proof. |

### Profile Support Plan

| Profile section | Existing support | Missing support | Gate 3 plan |
| --- | --- | --- | --- |
| Core identity | `001`-`004` support the meaning, but current canonical chain uses discovery rows. | Explicit roles, localization, and claim mapping. | Preserve; replace discovery chain with substantive claims. |
| Philosophy | `002`, `003`, `004`; may need synthesis claim for "living essences to study, brew, heal with, bargain with, and weaponize." | "Bargain" wording is less directly supported than study/brew/heal/harm/raise/entreat; review for narrowing. | Preserve if supported; otherwise narrow away from unsupported "bargain/weaponize" phrasing. |
| Internal tension | `004` is strong current support. | Need explicit claim/evidence localization and mature/unhealthy framing. | Preserve; cite `004` plus internal-tension synthesis claim. |
| Academic/institutional role | `001`, `005`, `006`. | Swamps/labs/clinics/dangerous fieldwork may need 2026 guide localization or narrowing. | Preserve/narrow using `005`/`006` and field-study source localization. |
| Key figures | Sabain uses official guide; Dina/Gorma use product support. | Dina/Gorma are not identity proof. Beledros/deans not required. | Preserve Sabain with substantive claims; keep Dina/Gorma auxiliary product anchors only. |
| Locations | Current swamps/bayou/bog terms mostly discovery/architecture. | Need exact official/local support if preserved. | Preserve only if `005`/`006` or already-known official source can localize; otherwise narrow to field/study/body language. |
| Mechanics | Current section cites discovery rows. | Need substantive mechanics claim if retaining lifegain/pests/sacrifice/healing/harm/biological exchange. | Preserve after adding mechanics claim from already-known official/source notes; keep product/card rows auxiliary. |
| Mature expression | Implied by healing, medicine, fieldwork, growth/nurture. | Needs explicit synthesis claim. | Add minimal mature-expression claim or encode in guidance with `003`/`004`/`005`/`006`. |
| Unhealthy expression | Implied by exploiting life energy. | Needs explicit synthesis claim and careful wording. | Add minimal unhealthy-expression claim from `004`; avoid overclaiming villainy. |
| Failure/pressure behavior | Not sufficiently grounded. | Needs project-synthesis claim from care/exploitation and false-positive architecture. | Add minimal pressure/failure claim; keep bounded. |
| Placement-facing summary | Current top-level has `001`-`006`; expanded summary has discovery chain. | Need evidence-chain repair and possible narrowing. | Preserve/narrow with substantive claims only. |

### Placement Support Plan

| Placement section | Existing support | Missing support | Gate 3 plan |
| --- | --- | --- | --- |
| Placement summary | `evidence_claim_ids` already include `001`-`006`; `claim_ids` include discovery records. | Remove invalid discovery chain; add proposed claims if preserving full wording. | Preserve/narrow; do not change frozen confidence/calibration fields unless authorized. |
| Core values | Current rows are search terms from discovery records. | Needs conceptual values. | Replace with source-backed conceptual values; preserve confidence fields if scope guard expects them. |
| Behavioral signals | Current first signal is story-search metadata. | Need behavior grounded in life/death exchange, practical craft, embodiment, tension. | Replace with substantive behavior signal(s). |
| Positive guidance | Good-fit indicators cite `001`-`003`; guidance arrays lack evidence mappings. | Need role/localization and evidence mapping. | Preserve/narrow; map to `001`-`006` plus proposed claims. |
| Negative guidance | Poor-fit indicators cite `001`-`003`; guidance arrays lack mapping. | "Pure spectacle over practical survival" may need narrowing. | Preserve/narrow; map to embodiment/false-positive claims. |
| Uncertainty guidance | Q1/Q2 exist but lack guidance evidence arrays. | Q2's "library" contrast needs support/narrowing. | Preserve if supported; otherwise reword in Gate 3 to field/body/source-backed wording. |
| Raw discriminator questions | Q1 likely supported by `002`-`004`; Q2 likely needs `003`/`005`/`006` and an embodied-learning claim. | Evidence mappings and perhaps wording refinement. | Keep as inclusion discriminators; do not turn them into runtime calibration. |
| Neighbor guidance | Selesnya, Simic, Quandrix exist; BG/Golgari missing. | Need BG/Golgari boundary and evidence mapping. | Add bounded required neighbors and evidence mappings. |
| Collision guidance | Existing claims are first-six only. | Need semantic roles/localization and neutral wording review. | Preserve/narrow; add Golgari collision. |
| Recruiter-facing guidance | Arrays lack evidence maps. | Need `evidence_claim_ids` on match/mismatch/uncertainty. | Add mappings in Gate 3. |

### Recruiter Guidance Evidence Mapping Plan

| Guidance item | Proposed evidence support | Gap / Gate 3 action |
| --- | --- | --- |
| Match: "understands care and harm as connected powers" | `witherbloom_claim_003`, `witherbloom_claim_004`, mature/unhealthy synthesis claims | Add evidence mapping; wording supported if healing/harm and exploitation/growth tension remain explicit. |
| Match: "likes fieldwork, remedies, ecology, or the body" | `witherbloom_claim_003`, `witherbloom_claim_005`, `witherbloom_claim_006`, academic/field-study claim | Add evidence mapping; localize "fieldwork/body/ecology" or narrow if unsupported. |
| Match: "is comfortable with life/death exchange" | `witherbloom_claim_002`, `witherbloom_claim_003`, `witherbloom_claim_004` | Add evidence mapping. |
| Mismatch: "wants abstraction without embodiment" | `witherbloom_claim_003`, `witherbloom_claim_005`, `witherbloom_claim_006`, embodiment/false-positive synthesis claim | Add mapping; avoid anti-intellectual stereotype by tying to lack of body/essence/field evidence. |
| Mismatch: "treats death or decay as unmentionable" | `witherbloom_claim_002`, `witherbloom_claim_003`, `witherbloom_claim_004` | Add mapping; "decay" may need boundary claim or narrowing to death/life exchange. |
| Mismatch: "prefers pure spectacle over practical survival" | `witherbloom_claim_003`, `witherbloom_claim_005`, `witherbloom_claim_006`, false-positive synthesis claim | Add mapping; likely narrow to "spectacle without practical life/death craft" if needed. |
| Uncertainty Q1 | `witherbloom_claim_002`, `003`, `004` | Add evidence mapping; preserve if fully supported. |
| Uncertainty Q2 | `witherbloom_claim_003`, `005`, `006`, academic/embodiment claim | Add evidence mapping; consider narrowing "library" contrast if unsupported. |

### Provenance Repair Plan

The 28 invalid generated provenance rows can be repaired without new online discovery if Gate 3 performs the canonical evidence-chain repairs above.

| Affected chain category | Invalid evidence | Replacement plan | New source discovery? |
| --- | --- | --- | --- |
| Profile core identity / site surface / structure / great tension / mechanics | Discovery `0007`-`0014` | Replace with `001`-`006` and proposed practical craft/internal tension/mechanics claims. | No |
| Placement summary / axis / moral profile / core values / behavioral signal / inhibitor | Discovery `0007`-`0014` | Replace search-term/metadata chains with conceptual substantive claims and evidence mappings. | No |
| Key figures and Commander native-fit source basis | Support `0017` | Keep auxiliary product/navigation provenance only; remove from identity proof. | No |
| Canonical flavor text | Support `0018` | Keep auxiliary card/flavor provenance only; do not count as semantic proof. | No |
| Commander Compass identity basis | Support `0017`/`0018` mixed with substantive claims | Split identity-basis substantive claims from support-only product/card fields. | No |
| Generated faction / placement / recruiter consumers | Current generated consumers preserve invalid canonical chains | Gate 4 rebuild must regenerate provenance after Gate 3 and verify every changed semantic consumer appears. | No |

### Required-Neighbor Evidence Plan

| Required neighbor | Why required | Positive Witherbloom evidence | Negative / exclusion evidence | Ambiguous / uncertainty evidence | Existing claims | Proposed new claims / gaps |
| --- | --- | --- | --- | --- | --- | --- |
| `BG` / Golgari | Same-color guild twin; local audits explicitly require college/guild separation. | Essence studies, schoolcraft, living essence, medicine/toxins, field biology, pest/life exchange. | Golgari centers Ravnica civic ecology, undercity, rot farms, graveyard recursion, waste/food/burial infrastructure. | If answer is only "life and death" or black-green recursion, ask whether it is school-based essence craft or civic decay/reclamation. | Witherbloom `001`-`006`; Golgari raw/architecture evidence. | Required new Witherbloom-side boundary claim and collision guidance. |
| `SELESNYA_CONCLAVE` | Existing collision; overlap around life, growth, nature, care. | Life/death cost, practical craft, essence, death as exchange. | Selesnya centers harmony, collective belonging, and shared life. | If answer centers nurturing/growth but not cost/death/exchange, ask Selesnya vs Witherbloom. | `001`-`003`, plus proposed mature/false-positive claims. | Existing guidance likely enough after mapping/narrowing. |
| `SIMIC_COMBINE` | Existing collision; overlap around biology/living systems. | Essence, cost, embodied life/death craft, medicine/toxins. | Simic centers improvement/adaptation/optimization of living systems. | If answer is biological but upgrade/adaptation-oriented, ask Simic vs Witherbloom. | `001`-`003`, `005`, `006`. | Existing guidance likely enough after mapping/narrowing. |
| `QUANDRIX` | Existing Strixhaven paired collision; overlap around living systems and learning. | Body, fieldwork, remedies, life/death exchange. | Quandrix centers proof, model, abstract pattern, mathematical structure. | If answer is between messy biological exchange and abstract equation/pattern, ask Quandrix vs Witherbloom. | `002`, `003`, `005`, `006`; certified Quandrix evidence. | Existing guidance likely enough after mapping/narrowing to certified Quandrix language. |

Non-required for this Gate 3 unless new evidence shows a blocker: Jund, Orzhov, Rakdos, Abzan, Sultai, Green, Black. They can be recorded as non-blocking guardrails if encountered, but adding them to required neighbors would exceed the current bounded scope.

### Exact Gate 3 Remediation Checklist

#### Required for certification

1. Add `semantic_role` to all 18 Witherbloom claims.
2. Mark `witherbloom_claim_001`-`006` as `substantive_claim`.
3. Mark `witherbloom_claim_0007`-`0016` as `discovery_record`.
4. Mark `witherbloom_claim_0017` and `witherbloom_claim_0018` as `support_record`.
5. Add bounded evidence locations to all substantive claims.
6. Add minimal new substantive claims only for:
   - practical life/death craft / essence-study identity;
   - internal tension if claim `004` alone is too narrow for profile/guidance wording;
   - academic/field-study method if preserving swamps/labs/clinics/fieldwork/body language;
   - mechanics identity if preserving lifegain/Pests/sacrifice/healing/harm/biological exchange;
   - mature expression;
   - unhealthy expression;
   - failure/pressure behavior;
   - BG/Golgari boundary;
   - Selesnya, Simic, and Quandrix boundaries only if existing claim chains are insufficient.
7. Remove discovery records from profile semantic proof chains.
8. Remove discovery records from placement semantic proof chains.
9. Replace search-term-backed core values, behavioral signal, inhibitor trait, placement axis, and provenance chains with source-backed substantive claims.
10. Isolate product/card support records from key-figure, Commander Compass identity-basis, canonical flavor, and generated semantic proof chains.
11. Add evidence mappings to recruiter-facing match, mismatch, and uncertainty guidance.
12. Define bounded `required_neighbors`: BG/Golgari, Selesnya, Simic, and Quandrix.
13. Add a Witherbloom-side BG/Golgari boundary using neutral purpose/method distinctions.
14. Review Q1/Q2 and collision wording; preserve only fully supported phrasing and narrow if needed.
15. Update Witherbloom changelog/readiness evidence to describe canonical remediation.
16. Update VM-505 report/card with Gate 3 status only after remediation is complete.

#### Optional / non-blocking

- Add Beledros founder/dean/student/story-specific claims only if a retained statement requires them.
- Add more story-episode detail from `0007`-`0016` only through a later authorized source-reading pass.
- Improve display copy readability only if it is already supported by certified claims.

#### Out of scope for CRIT-001

- Runtime scoring, Hall/Crucible scheduling, inhibition/confidence/tie-ordering, global recruiter prompt behavior, broad story enrichment, exhaustive card cataloging, commander popularity/power/legality claims, and generic Golgari reconstruction.

## Gate 3 Canonical Remediation

Status: complete. Witherbloom remains uncertified. Generated artifacts remain stale until Gate 4.

### Canonical files changed

- `data/raw-factions/witherbloom/witherbloom.claims.json`
- `data/raw-factions/witherbloom/witherbloom.profile.json`
- `data/raw-factions/witherbloom/witherbloom.placement.json`
- `data/raw-factions/witherbloom/witherbloom.changelog.json`

No generated artifacts were rebuilt or edited.

### Blocker-by-blocker remediation

| Gate 1 / Gate 2 blocker | Gate 3 remediation |
| --- | --- |
| All 18 claims lacked certifying `semantic_role`. | Added `semantic_role` to all existing Witherbloom claims. |
| Existing claims lacked bounded evidence localization. | Added bounded `evidence_locations` to all substantive claims. |
| Discovery/search records supported profile and placement chains. | Removed discovery records from authoritative profile, placement summary, placement axis, core-value, behavioral-signal, inhibitor, and guidance chains. |
| Recruiter guidance lacked evidence mappings. | Added `semantic_guidance_evidence` mappings for match, mismatch, and uncertainty guidance. |
| Generated provenance carried discovery/support-backed semantic chains. | Repaired canonical source chains so Gate 4 provenance regeneration can rebuild from substantive evidence only. Generated provenance itself remains stale until Gate 4. |
| BG / Golgari boundary was missing on the Witherbloom side. | Added bounded required-neighbor evidence and a Witherbloom-side Golgari collision boundary. |
| Support/product records appeared in key-figure and Commander Compass identity-basis chains. | Removed support records from authoritative key-figure and Commander Compass identity-basis claim chains; retained them only as auxiliary support. |
| Semantic fixtures were missing. | Deferred to Gate 4, after generated artifacts and provenance are rebuilt. |

### Claims classified by semantic role

| Semantic role | Count | Claim IDs |
| --- | ---: | --- |
| `substantive_claim` | 14 | `witherbloom_claim_001`-`006`, `witherbloom_claim_0019`-`0026` |
| `discovery_record` | 10 | `witherbloom_claim_0007`-`0016` |
| `support_record` | 2 | `witherbloom_claim_0017`, `witherbloom_claim_0018` |
| `unclassified` | 0 | None |

### Discovery records retained

The following records remain discovery-only archive/search metadata and cannot prove authoritative identity or placement statements:

- `witherbloom_claim_0007`
- `witherbloom_claim_0008`
- `witherbloom_claim_0009`
- `witherbloom_claim_0010`
- `witherbloom_claim_0011`
- `witherbloom_claim_0012`
- `witherbloom_claim_0013`
- `witherbloom_claim_0014`
- `witherbloom_claim_0015`
- `witherbloom_claim_0016`

### Support records retained

The following records remain auxiliary product/card support only:

- `witherbloom_claim_0017` - official Witherbloom Pestilence Commander decklist/product navigation support.
- `witherbloom_claim_0018` - local Scryfall card-data and short flavor-anchor support.

Gate 3 removed these support records from authoritative identity-basis chains and preserved them only in auxiliary support fields, native-fit product rows, and card/flavor support rows.

### New substantive claims added

| Claim ID | Purpose | Scope |
| --- | --- | --- |
| `witherbloom_claim_0019` | Practical life/death craft and essence-study identity. | Placement synthesis from official Witherbloom identity and study-area evidence. |
| `witherbloom_claim_0020` | Growth/extraction internal tension. | Bounded inference from official black-green life-energy split. |
| `witherbloom_claim_0021` | Academic / embodied field method. | Bounded inference from official natural-component and study-area evidence. |
| `witherbloom_claim_0022` | Mechanics identity. | Mechanics-facing project synthesis tied to biological exchange and life/death craft. |
| `witherbloom_claim_0023` | Mature expression. | Project synthesis: cost-aware healing, nourishment, study, brewing, cultivation, survival. |
| `witherbloom_claim_0024` | Unhealthy expression. | Project synthesis: over-extraction and treating living systems only as material. |
| `witherbloom_claim_0025` | Failure or pressure behavior. | Project synthesis: over-extraction or loss of embodied exchange under pressure. |
| `witherbloom_claim_0026` | Required-neighbor boundaries. | Witherbloom-side boundary synthesis for BG/Golgari, Selesnya, Simic, and Quandrix. |

No broad or targeted online discovery was performed.

### Profile and placement evidence-chain repairs

- `profile.core_identity`, `site_surface`, `structure`, `great_tension`, and `mechanics` now cite only substantive Witherbloom claims.
- Product/card support rows were removed from key-figure claim chains and Commander Compass identity-basis proof chains.
- `commander_compass.identity_basis` now separates authoritative `supporting_claim_ids` from `auxiliary_support_claim_ids`.
- `placement_summary`, `placement_axes`, `moral_and_psychological_profile`, `core_values`, `behavioral_signals`, `inhibitor_traits`, raw discriminator questions, and collision guidance now use substantive Witherbloom evidence.
- Search-term-backed core values were replaced with source-backed conceptual values.
- The discovery-backed behavioral signal and generic corpus-search placement axis were replaced with source-backed Witherbloom craft/essence evidence.

### Recruiter guidance evidence mappings

Gate 3 added `semantic_guidance_evidence` for:

- `/chatbot_guidance/how_to_recognize_match/0`
- `/chatbot_guidance/how_to_recognize_match/1`
- `/chatbot_guidance/how_to_recognize_match/2`
- `/chatbot_guidance/how_to_recognize_mismatch/0`
- `/chatbot_guidance/how_to_recognize_mismatch/1`
- `/chatbot_guidance/how_to_recognize_mismatch/2`
- `/chatbot_guidance/questions_to_ask_when_uncertain/0`
- `/chatbot_guidance/questions_to_ask_when_uncertain/1`

### Required-neighbor mappings

Gate 3 selected and mapped the bounded required-neighbor set:

| Neighbor | Why required | Witherbloom-side evidence |
| --- | --- | --- |
| `BG` / Golgari | Same-color guild twin and explicit Strixhaven/Golgari boundary requirement. | `witherbloom_claim_001`, `002`, `003`, `0019`, `0026` |
| `SELESNYA_CONCLAVE` | Existing collision and overlap around life, growth, care, and nature. | `witherbloom_claim_002`, `003`, `0023`, `0026` |
| `SIMIC_COMBINE` | Existing collision and overlap around biology and living systems. | `witherbloom_claim_003`, `005`, `0021`, `0026` |
| `QUANDRIX` | Existing Strixhaven natural-system neighbor with body/fieldwork versus abstraction ambiguity. | `witherbloom_claim_002`, `003`, `005`, `006`, `0021`, `0026` |

### Items deferred to Gate 4

- Rebuild generated artifacts from the remediated canonical packet.
- Regenerate `data/semantic-readiness-provenance.json`.
- Add or validate Witherbloom semantic fixtures.
- Run source/generated parity validation.
- Inspect generated public/recruiter copy for stale discovery/support-backed language.
- Run generated-diff isolation and regression tests.

### Remaining known limitations

- Discovery-only story archive rows remain bibliography/search metadata until a separately authorized source-reading pass extracts bounded substantive story claims.
- Product/card rows remain support-only and do not prove character lore, popularity, legality, metagame position, or identity meaning.
- Generated artifacts are stale until Gate 4; Gate 3 intentionally did not rebuild them.

## Validation Commands Run or Intentionally Deferred

Run:

- `git status --short --branch`
- `git rev-parse --show-toplevel`
- `git rev-parse --abbrev-ref HEAD`
- `git rev-parse HEAD`
- `git merge-base --is-ancestor 41d291072340f7ddfe4ffe90f2e57e4f4793142d HEAD`
- `git -c safe.directory=C:/dev/mtgSiteWIP -C C:\dev\mtgSiteWIP status --short --branch`
- `npm.cmd run audit:semantic-readiness -- --targets=WITHERBLOOM`
- `node research/validate-semantic-readiness.mjs --targets=WITHERBLOOM`

Expected Gate 1 validator failure, now addressed in canonical data except for Gate 4 generated/fixture work:

- all 18 original claims lacked `semantic_role`;
- recruiter guidance lacked evidence mappings;
- authoritative profile and placement references had no substantive claim under current role semantics;
- identity semantic fixtures were missing.

Intentionally deferred:

- `npm.cmd run build:factions`
- source/generated parity validation
- generated-diff isolation
- semantic fixture validation
- placement/golden-path regression tests
- dossier audit
- full `npm test`
- parser tests

Those are Gate 4/Gate 5 activities after canonical remediation.

Gate 3 validation result:

- JSON parse checks passed for changed Witherbloom canonical files.
- `npm.cmd run audit:semantic-readiness -- --targets=WITHERBLOOM` passed and reported 26 claims: 14 `substantive_claim`, 10 `discovery_record`, 2 `support_record`, 0 `unclassified`; no missing references; no potential role-invalid support links; no provisional coverage or neighbor risk indicators.
- `node research/validate-semantic-readiness.mjs --targets=WITHERBLOOM` was run as a read-only check and failed only on stale/missing generated provenance plus missing semantic fixtures, which are expected until Gate 4 rebuilds generated artifacts, regenerates provenance, and adds fixtures.
- `git diff --check` passed with LF/CRLF warnings only.
- Generated/provenance files were not changed.
- Prismari, Lorehold, Quandrix, and Silverquill raw packets were not changed.

## Gate 4 Generation and Validation

Gate 4 rebuilt generated artifacts, regenerated semantic provenance, added Witherbloom semantic fixtures, and ran the Gate 4 validation stack. Witherbloom remains uncertified and no candidate commit exists.

### Files changed during Gate 4

Generated/display-source files changed:

- `data/factions.json`
- `data/identity-layers.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

Fixture file added:

- `research/fixtures/semantic-readiness/witherbloom.semantic-fixtures.json`

Gate 4 did not modify Witherbloom raw canonical files beyond the existing Gate 3 changes already present in the worktree. Gate 4 did not modify non-Witherbloom raw packets, Contract v1.1, shared schemas, validators, builder scripts, Hall, Crucible, scoring, confidence, scheduling, tie-ordering, or global recruiter behavior.

### Generated/public copy inspection

Gate 4 found stale public Witherbloom display copy preserved in generated/public surfaces from existing display-source data, not from raw Witherbloom canonical remediation.

Resolved Witherbloom-scoped display-source issues:

- Removed old `where life ends and death begins` / Lisette-Valentin public tension copy from Witherbloom generated/public surfaces.
- Removed unsupported `finds it beautiful`, `bog is beautiful`, `does not study life`, and product-card recommendation copy from the Witherbloom public display block.
- Updated only Witherbloom-scoped `data/identity-layers.json` core-tension copy.
- Left a pre-existing Selesnya public comparison string mentioning Witherbloom as out of scope because it is not Witherbloom generated/public content and was not changed by VM-505.

### Fixture and provenance result

Added Witherbloom Contract v1.1 fixtures:

- Core inclusion fixture.
- Mature/pressure behavior fixture.
- Required-neighbor exclusion fixtures for BG/Golgari, `SELESNYA_CONCLAVE`, `SIMIC_COMBINE`, and `QUANDRIX`.
- Nearest-collision ambiguity fixture for BG/Golgari.
- Provenance fixture for `/chatbot_guidance/how_to_recognize_match/0`.

Semantic readiness validation and `npm.cmd run test:semantic-readiness` both pass after fixture source chains were corrected to match the complete declared claim-source chains.

### Generated-diff isolation

Text diff inspection shows Witherbloom-only semantic generated changes in:

- `data/factions.json`
- `data/placement-model.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `data/identity-layers.json`
- `data/semantic-readiness-provenance.json`

Non-Witherbloom provenance entries compare equal to the accepted base after JSON normalization. Raw packet diff checks show only `data/raw-factions/witherbloom/` changed; Prismari, Lorehold, Quandrix, and Silverquill raw packets did not change.

### Gate 4 validation commands

Passed:

- `npm.cmd run build:factions`
- `node research/validate-semantic-readiness.mjs --targets=WITHERBLOOM`
- `npm.cmd run validate:source-generated -- --targets=WITHERBLOOM`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- `node research/archscry-dossier-followup-tests.js`
- `npm.cmd run dossier:audit`
- `npm.cmd run audit:semantic-readiness -- --targets=WITHERBLOOM`
- `git diff --check`

Known warnings unchanged:

- Source/generated guardrail warning remains builder-owned: `inhibitor_traps[model_owned]` for the model-owned biological prior.
- Dossier audit remains 113 warnings / 0 failures.
- `git diff --check` reports LF/CRLF warnings only.

### Gate 4 blocker / readiness for Gate 5

Witherbloom is not yet ready for Gate 5 candidate creation.

A frozen-field sweep found apparent `lateral_inhibition` path changes at:

- `/collision_guidance/2/lateral_inhibition`
- `/collision_guidance/3/lateral_inhibition`

Inspection shows this is not a behavior change: the existing Quandrix collision retained `lateral_inhibition: false`, but the new BG/Golgari collision was inserted before existing rows, shifting the array index from 2 to 3. Because candidate-scope validation is path-based, this should be handled as a bounded scope-policy/order cleanup before candidate creation. Gate 4 did not silently reorder canonical data.

Recommended next step: authorize a narrow VM-505 scope-policy cleanup that reorders the new BG/Golgari collision guidance to avoid frozen-field path churn, or otherwise documents an explicit reviewer-facing false-positive exception. Do not proceed to Gate 5 until this is resolved.
## Gate 4 Scope-Policy Cleanup

A bounded Gate 4 scope-policy cleanup resolved the apparent `lateral_inhibition` path churn found after mechanical Gate 4 validation.

### Cleanup performed

- Inspected accepted-base `collision_guidance` order:
  - index 0: `collision_witherbloom_vs_selesnya_conclave_placement_ready`
  - index 1: `collision_witherbloom_vs_simic_combine_placement_ready`
  - index 2: `collision_witherbloom_vs_quandrix_placement_ready` with `lateral_inhibition: false`
- Inspected current `collision_guidance` order and confirmed the new BG/Golgari row had been inserted before the pre-existing rows, shifting the Quandrix `lateral_inhibition: false` path from `/collision_guidance/2/lateral_inhibition` to `/collision_guidance/3/lateral_inhibition`.
- Reordered `collision_guidance` so the three pre-existing rows keep their accepted-base indexes and the new BG/Golgari row is appended after them.
- Did not change any `lateral_inhibition` boolean value.
- Did not change confidence values or calibrated placement-summary fields.
- Preserved the required-neighbor set: BG/Golgari, `SELESNYA_CONCLAVE`, `SIMIC_COMBINE`, and `QUANDRIX`.
- Preserved the Witherbloom-side BG/Golgari boundary and evidence mapping.
- Rebuilt generated artifacts and semantic provenance after the cleanup.

### Scope result

Frozen-field sweep result: clean.

- No `lateral_inhibition` behavioral change remains.
- No confidence-field deltas remain.
- No calibrated placement-summary deltas remain.

Working-tree candidate-scope dry-run result: pass with only documented Witherbloom display-source exceptions:

- `data/identity-layers.json`
- generated `data/factions.json` identity-layer content for `WITHERBLOOM`

The exact candidate-scope command that compares two SHAs remains a Gate 5 candidate-boundary check because no recovery candidate commit exists yet.

### Validation after cleanup

Passed:

- `npm.cmd run build:factions`
- `node research/validate-semantic-readiness.mjs --targets=WITHERBLOOM`
- `npm.cmd run validate:source-generated -- --targets=WITHERBLOOM`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- `node research/archscry-dossier-followup-tests.js`
- `npm.cmd run dossier:audit`
- `npm.cmd run audit:semantic-readiness -- --targets=WITHERBLOOM`

Known warnings unchanged:

- Source/generated guardrail warning remains builder-owned: `inhibitor_traps[model_owned]` for the model-owned biological prior.
- Dossier audit remains 113 warnings / 0 failures.

Witherbloom is ready for Gate 5 candidate creation when explicitly authorized. Witherbloom remains uncertified until an immutable recovery candidate is created, independently reviewed, approved by exact SHA, and certified in a separate certification commit.
## Gate 5 Candidate Record

Candidate recovery commit created for independent review. No certification exists.

- Candidate parent SHA: `41d291072340f7ddfe4ffe90f2e57e4f4793142d`
- Candidate recovery SHA: `48d240db3c7001a498a6e5a4602cc8cd54349776`
- Contract version: `v1.1`
- Review result: pending independent review
- Certification state: not certified

### Candidate changed-file list

- `data/factions.json`
- `data/identity-layers.json`
- `data/placement-model.json`
- `data/raw-factions/witherbloom/witherbloom.changelog.json`
- `data/raw-factions/witherbloom/witherbloom.claims.json`
- `data/raw-factions/witherbloom/witherbloom.placement.json`
- `data/raw-factions/witherbloom/witherbloom.profile.json`
- `data/semantic-readiness-provenance.json`
- `docs/handoffs/2026-07-12-2319-codex-vm505-witherbloom-gate1-audit.md`
- `docs/handoffs/2026-07-12-2348-codex-vm505-witherbloom-gate2-evidence.md`
- `docs/handoffs/2026-07-13-0805-codex-vm505-witherbloom-gate3-remediation.md`
- `docs/handoffs/2026-07-13-0844-codex-vm505-witherbloom-gate4-validation.md`
- `docs/handoffs/2026-07-13-1152-codex-vm505-witherbloom-scope-policy-cleanup.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/incidents/recoveries/VM-505-witherbloom-semantic-recovery.md`
- `docs/kanban/backlog/VM-505-witherbloom-semantic-recovery.md` deleted
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-505-witherbloom-semantic-recovery.md`
- `research/fixtures/semantic-readiness/witherbloom.semantic-fixtures.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

### Validation summary

- npm.cmd run build:factions: passed
- node research/validate-semantic-readiness.mjs --targets=WITHERBLOOM: passed
- npm.cmd run validate:source-generated -- --targets=WITHERBLOOM: passed with one unchanged builder-owned inhibitor warning
- npm.cmd run test:semantic-readiness: passed
- npm.cmd run test:placement: passed
- npm.cmd run test:faction-context-isolation: passed
- node research/archscry-dossier-followup-tests.js: passed
- npm.cmd run dossier:audit: 113 warnings / 0 failures
- npm.cmd run audit:semantic-readiness -- --targets=WITHERBLOOM: passed
- git diff --check: passed with LF/CRLF warnings only
- working-tree candidate-scope dry-run: passed with documented Witherbloom display-source exceptions only

### Known warnings

- Source/generated guardrail warning remains builder-owned: inhibitor_traps[model_owned] for the model-owned biological prior.
- Dossier audit remains 113 warnings / 0 failures.
- Candidate-scope dry-run retains documented Witherbloom display-source exceptions: data/identity-layers.json and generated data/factions.json identity-layer content.

### Candidate-scope result

Candidate-scope dry-run passes with only documented Witherbloom display-source exceptions:

- `data/identity-layers.json`
- generated `data/factions.json` identity-layer content for `WITHERBLOOM`

The exact SHA-based candidate-scope guard must be rerun by Gate 5 review against candidate SHA `48d240db3c7001a498a6e5a4602cc8cd54349776`.

## Certification and Program Acceptance

Independent Gate 5 review returned **APPROVE EXACT SHA** for recovery commit `48d240db3c7001a498a6e5a4602cc8cd54349776`. This certification commit does not modify the approved recovery candidate, canonical Witherbloom data, generated artifacts, fixtures, Hall/Crucible content, scoring, inhibition, confidence, scheduling, tie ordering, or global recruiter behavior.

| Field | Value |
|---|---|
| Identity | Witherbloom |
| VM | VM-505 |
| Contract version | `v1.1` |
| Approved recovery SHA | `48d240db3c7001a498a6e5a4602cc8cd54349776` |
| Workflow-record SHA | `a0efe415c8eb38cf041a39f20bc90ca462216593` |
| Independent review result | `APPROVE EXACT SHA` |
| Reviewer reference | Robert / user-supplied independent Gate 5 review in this Codex thread |
| Approval date | 2026-07-13 |
| Final certification state | `semantically_ready` |
| Certification commit | `PENDING_VM505_CERTIFICATION_COMMIT_SHA` |

### Residual non-blocking findings

- LOW: MTG-Stories corpus search evidence remains under `placement_quality.strongest_evidence_areas` in `data/raw-factions/witherbloom/witherbloom.placement.json`. It does not appear in an authoritative proof chain. It should be cleaned later by replacing it with source-backed wording or explicitly labeling corpus material as discovery metadata only. This is readability/source-labeling hygiene only and does not block certification.
- Runtime Hall, Crucible, scoring, inhibition, scheduling, confidence, and live recruiter calibration remain post-CRIT investigations.
- Candidate-scope guard retains documented Witherbloom display-source exceptions for `data/identity-layers.json` and generated `data/factions.json` identity-layer content.

### Known unchanged warnings

- Builder-owned Witherbloom inhibitor warning remains unchanged.
- Dossier audit direct write may require artifact-write permissions; reviewer independently ran the same dossier audit logic in memory and verified 37 primary dossiers, 76 adjacent dossiers, 113 warnings, and 0 failures.

## Final Status

Witherbloom is certified `semantically_ready` under CRIT-001 Contract v1.1. Recovery commit `48d240db3c7001a498a6e5a4602cc8cd54349776` is accepted by exact-SHA independent review; certification commit is recorded as `PENDING_VM505_CERTIFICATION_COMMIT_SHA` in self-referential records and will be reported with its exact SHA after commit creation. Prismari, Lorehold, Quandrix, Silverquill, and Witherbloom are certified. Izzet is the next identity for branch setup only; no Izzet remediation has started.
