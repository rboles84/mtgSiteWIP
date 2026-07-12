# VM-506 — Lorehold Gate 1 Semantic Audit

Identity: LOREHOLD
Contract: CRIT-001 Semantic Readiness Contract v1.1
Branch audited: `codex/vm-506-lorehold-semantic-recovery`
Starting SHA audited: `51667c7d91e8530a4cd508c891179893a44a14a2`
Gate: Gate 1 audit only
Certification state: not certified

## Executive Summary

Lorehold's mature-packet reputation mostly survives as a conceptual/content judgment, but it does not survive Contract v1.1 as a certifiable packet yet.

The packet is structurally and conceptually much richer than Prismari's pre-recovery packet: 97 claim records, 20 sources, 13 claim-bearing sources, 7 discriminator questions, and extensive profile/placement coverage. The audit did not find evidence that Lorehold requires complete reconstruction or broad lore enrichment.

However, Lorehold is still blocked from semantic certification for Contract v1.1 reasons:

- All 97 claims remain legacy `unclassified`; certified packets cannot use unclassified claims to satisfy readiness.
- Six discovery/search-corpus records are cited by authoritative profile, placement, core-value, behavioral-signal, and provenance chains.
- Two Commander deck/product-support records appear in an authoritative mechanics chain and need support-role handling or substantive replacement.
- Canonical recruiter guidance lacks evidence mapping for match, mismatch, and uncertainty guidance.
- Generated provenance preserves the same invalid discovery-backed chains, so the problem reaches generated consumers even though no runtime behavior was changed during this audit.

Primary disposition: **Claim-role classification required**.

Gate 2 evidence completion: **not required as a broad source hunt**. Existing Lorehold sources and claims appear sufficient for bounded remediation, but Gate 2 should remain available only if a specific statement cannot be supported after role classification and source-linkage cleanup.

## Worktree Preservation Statement

Initial CRIT worktree status:

```text
## codex/vm-506-lorehold-semantic-recovery
```

Original dirty main worktree status observed from `C:\dev\mtgSiteWIP`:

```text
## main...origin/main
 M docs/handoffs/HANDOFF_INDEX.md
 M docs/kanban/board.md
?? docs/audits/2026-07-10-vox-mana-self-snapshot.md
?? docs/handoffs/2026-07-10-0042-codex-vm496-vox-mana-self-snapshot.md
?? docs/kanban/done/VM-496-vox-mana-self-snapshot-2026-07-10.md
?? "docs/strategy/mendscry chat addt.txt"
```

No canonical Lorehold data, generated artifacts, runtime files, scoring, inhibition, Hall, Crucible, scheduler, or global recruiter behavior were modified.

## Scope and Non-Goals

This audit inspected Lorehold under Contract v1.1 and stopped at Gate 1. It did not:

- remediate Lorehold;
- assign canonical semantic roles;
- rebuild generated artifacts;
- certify Lorehold;
- start Lorehold Gate 2 evidence work;
- start Izzet, Quandrix, Silverquill, Witherbloom, or any other identity;
- tune runtime scoring, confidence, inhibition, scheduling, Hall, Crucible, or recruiter behavior;
- perform broad external lore enrichment.

## Files and Records Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- recent CRIT-001 handoffs, especially VM-501/VM-502 records
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-506-lorehold-semantic-recovery.md`
- `docs/incidents/CRIT-001-faction-semantic-readiness-integrity.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/reference/strixhaven-college-source-readiness-matrix.md`
- `data/raw-factions/lorehold/lorehold.claims.json`
- `data/raw-factions/lorehold/lorehold.sources.json`
- `data/raw-factions/lorehold/lorehold.profile.json`
- `data/raw-factions/lorehold/lorehold.placement.json`
- `data/raw-factions/lorehold/lorehold.changelog.json`
- `data/factions.json`
- `data/placement-model.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `data/semantic-readiness-provenance.json`
- relevant Git history for Lorehold packet creation and enrichment

## Historical Context

| Commit | Date | Change | Audit Significance |
|---|---:|---|---|
| `f6a1dd4` | 2026-05-12 | Added adaptive placement runtime, generated faction model, raw faction provenance, and Lorehold raw packet files. | Lorehold entered as part of the original adaptive/runtime raw-packet foundation. |
| `18f5112` | 2026-05-14 | Completed batch 1 foundation; Lorehold profile received large expansion. | Lorehold received a significant enrichment pass before CRIT-001. |
| `8cf7702` | 2026-06-12 | Published verified source-bound cleanup bundle; modified Lorehold changelog, placement, profile, sources, and Strixhaven readiness matrix. | Lorehold received later source-bound cleanup and readiness documentation. |
| `9322e58` | 2026-06-13 | Updated Strixhaven readiness matrix. | Readiness language was refined before Contract v1.1 existed. |
| `9773bf0` | 2026-07-11 | Established CRIT-001 semantic recovery governance. | Legacy ready states became non-certifying until audited under the new contract. |

Interpretation: Lorehold has evidence of multiple enrichment/cleanup passes and is not a thin cohort packet in the Prismari sense. Its remaining defects are contract-readiness and provenance defects, not an obvious lack of available material.

## Claim-Role Audit

Structural audit facts:

- Total claim records: 97
- Explicit `semantic_role` counts:
  - `substantive_claim`: 0
  - `discovery_record`: 6
  - `support_record`: 0
  - `unclassified`: 91
- Source count: 20
- Claim-bearing sources: 13
- Discovery-only sources: 7
- Claim-bearing source rate: 65%

Gate 1 audit classification estimate, not written to canonical data:

| Role | Count | Audit confidence | Notes |
|---|---:|---|---|
| `substantive_claim` | 88 | High | Most core, philosophy, mechanic, structure, figure, location, timeline, and placement-support claims appear capable of supporting identity meaning once roles and bounded evidence are added. |
| `discovery_record` | 7 | High | `claim_lorehold_unknown_0001` and `lorehold_claim_0022` through `lorehold_claim_0027` identify missing/possible corpus material or search evidence rather than extracting substantive meaning. |
| `support_record` | 2 | Medium-high | `claim_lorehold_mechanic_0013` and `claim_lorehold_mechanic_0014` describe Commander deck/product support and Spirit-token deck usage. They can support product/mechanics context but not independently prove Lorehold identity meaning. |
| `unclassified` | 0 after audit estimate | Medium | This is an audit estimate only. Canonical data still has 91 unclassified legacy claims and must be remediated before certification. |

Claim-type distribution:

| Claim Type | Count | Gate 1 Role Assessment |
|---|---:|---|
| `core_identity` | 5 | Substantive. |
| `philosophy` | 10 | Substantive; several are interpretive and need bounded evidence/interpretation labels. |
| `mechanic` | 19 | Mostly substantive when tied to Lorehold's history/Spirit/artifact play pattern; two records are support/product records. |
| `flavor_text` | 1 | Likely substantive if bounded to source/card text. |
| `structure` | 7 | Substantive when used for college/dean/institution identity. |
| `key_figure` | 23 | Substantive when treated as character or corroborating evidence, not faction-wide proof by itself. |
| `location` | 11 | Substantive when locations express Lorehold's archive/ruin/history model. |
| `timeline` | 6 | Substantive when timeline contributes to identity or institutional role. |
| `placement_support` | 9 | Substantive but needs especially careful interpretation/evidence localization. |
| `story_corpus_evidence` | 6 | Discovery records, not substantive proof. |

Findings:

- BLOCKER: All 97 claims require explicit semantic-role classification before Lorehold can be certified.
- MEDIUM: Interpretive placement-support and philosophy claims should use bounded evidence localization and interpretation levels during remediation.
- NON-BLOCKING OBSERVATION: Lorehold's timeline, character, mechanic, institution, and location records are not mere inventory by topic. Many appear meaningful for identity modeling when properly role-classified and localized.

## Discovery-Record Audit

Discovery-like records:

- `claim_lorehold_unknown_0001`: states a complete current official Lorehold faculty list after Secrets of Strixhaven was not located.
- `lorehold_claim_0022` through `lorehold_claim_0027`: story-corpus/search evidence records tied to discovery-only sources.

Discovery records are being used as semantic proof in the following authoritative chains:

| File | JSON Pointer | Statement/Area | Cited Records | Problem | Severity |
|---|---|---|---|---|---|
| `data/raw-factions/lorehold/lorehold.profile.json` | `/core_identity/claim_ids` | Core identity support chain | `lorehold_claim_0022`-`0027` | Search/corpus discovery records are mixed into authoritative core identity support. | BLOCKER |
| `data/raw-factions/lorehold/lorehold.profile.json` | `/data_quality/corpus_upgrade/claim_ids` | Corpus upgrade metadata | `lorehold_claim_0022`-`0027` | Likely acceptable if retained strictly as data-quality metadata; not a semantic blocker by itself. | NON-BLOCKING OBSERVATION |
| `data/raw-factions/lorehold/lorehold.placement.json` | `/placement_summary/claim_ids` | Placement summary support chain | `lorehold_claim_0022`-`0027` | Discovery records support authoritative placement summary. | BLOCKER |
| `data/raw-factions/lorehold/lorehold.placement.json` | `/core_values/8` through `/core_values/17` | Corpus search terms presented as core values | `lorehold_claim_0022`-`0024` | Search-term evidence is modeled inside placement core values. | BLOCKER |
| `data/raw-factions/lorehold/lorehold.placement.json` | `/behavioral_signals/9/claim_ids` | Behavioral signal support chain | `lorehold_claim_0022`-`0027` | Discovery records support placement behavior. | BLOCKER |
| `data/semantic-readiness-provenance.json` | 14 Lorehold provenance entries | Generated provenance | same discovery records | Generated consumers preserve discovery-backed evidence chains. | BLOCKER |

Conclusion: the six story-corpus discovery records are not harmless bibliography leads in their current usage. They are harmless only where used as explicit data-quality/corpus metadata; they are blockers where used to prove profile, placement, core-value, behavioral, or generated-provenance meaning.

## Potential Role-Invalid Support-Link Audit

The structural fingerprint reported 14 `potential_role_invalid_support_links`:

1. `data/raw-factions/lorehold/lorehold.profile.json#/core_identity`
2. `data/raw-factions/lorehold/lorehold.profile.json#/data_quality/corpus_upgrade`
3. `data/raw-factions/lorehold/lorehold.placement.json#/placement_summary`
4. `data/raw-factions/lorehold/lorehold.placement.json#/core_values/8`
5. `data/raw-factions/lorehold/lorehold.placement.json#/core_values/9`
6. `data/raw-factions/lorehold/lorehold.placement.json#/core_values/10`
7. `data/raw-factions/lorehold/lorehold.placement.json#/core_values/11`
8. `data/raw-factions/lorehold/lorehold.placement.json#/core_values/12`
9. `data/raw-factions/lorehold/lorehold.placement.json#/core_values/13`
10. `data/raw-factions/lorehold/lorehold.placement.json#/core_values/14`
11. `data/raw-factions/lorehold/lorehold.placement.json#/core_values/15`
12. `data/raw-factions/lorehold/lorehold.placement.json#/core_values/16`
13. `data/raw-factions/lorehold/lorehold.placement.json#/core_values/17`
14. `data/raw-factions/lorehold/lorehold.placement.json#/behavioral_signals/9`

Classification:

| Structural Finding | Gate 1 Determination | Severity |
|---|---|---|
| `/profile/core_identity` | Actual semantic-readiness failure. | BLOCKER |
| `/profile/data_quality/corpus_upgrade` | Likely false positive if kept as explicit metadata and not used as semantic proof. | NON-BLOCKING OBSERVATION |
| `/placement/placement_summary` | Actual semantic-readiness failure. | BLOCKER |
| `/placement/core_values/8`-`/17` | Actual semantic-readiness failure. | BLOCKER |
| `/placement/behavioral_signals/9` | Actual semantic-readiness failure. | BLOCKER |

Additional support-role issue not included in the 14 structural links:

| File | JSON Pointer | Cited Records | Problem | Severity |
|---|---|---|---|---|
| `data/raw-factions/lorehold/lorehold.profile.json` | `/mechanics/entries/5/claim_ids` | `claim_lorehold_mechanic_0013`, `claim_lorehold_mechanic_0014` | Product/deck support records are used in an authoritative mechanics entry. They may be useful as support metadata but should not independently prove identity meaning. | HIGH |

## Profile Entailment Audit

| Profile Section | Gate 1 Status | Evidence Notes |
|---|---|---|
| Core identity | FAIL | Conceptually strong, but authoritative support chain cites six discovery records. |
| Philosophy | PASS WITH NON-BLOCKING LIMITATION | Existing claims appear to support Lorehold as active, evidence-centered, and historically engaged; interpretation and evidence localization still need Contract v1.1 cleanup. |
| Internal tension | PASS WITH NON-BLOCKING LIMITATION | Order/chaos and preservation/action tensions are well represented in claims and placement questions; role classification and bounded evidence remain required. |
| Historical role | PASS WITH NON-BLOCKING LIMITATION | Timeline/location/figure claims provide meaningful history and institutional context; character/story generalizations need labeling during remediation. |
| Institutional role | PASS WITH NON-BLOCKING LIMITATION | College/dean/structure claims support institutional identity; not certification-ready until roles and evidence localization are added. |
| Key figures | PASS WITH NON-BLOCKING LIMITATION | Rich figure coverage; must avoid treating one character as definitive faction identity without corroboration. |
| Locations | PASS WITH NON-BLOCKING LIMITATION | Locations support Lorehold's archive/ruin/material-history model. |
| Mechanics | FAIL | Mostly meaningful, but one mechanics entry uses support/product records as authoritative evidence. |
| Mature expression | PASS WITH NON-BLOCKING LIMITATION | Evidence integrity, stewardship, and responsible action are present, pending role/provenance cleanup. |
| Unhealthy expression | PASS WITH NON-BLOCKING LIMITATION | Existing guidance supports false-positive guardrails around generic duty, treasure-taking, status use, and disposable evidence; evidence mapping still incomplete. |
| Placement-facing summary | FAIL | Placement summary uses discovery records and all claim roles remain unclassified. |

## Placement Entailment Audit

Positive finding: all 7 Lorehold raw discriminator questions cite claims that are audit-estimated as substantive. The questions cover material evidence, ruins, artifacts, spirits, record protection, order/chaos tension, and differences from Prismari/Quandrix/Silverquill/Boros/Orzhov/Gruul/Azorius/Witherbloom.

Blocking findings:

- `placement_summary` cites six discovery records.
- `core_values/8` through `core_values/17` are search/corpus entries presented in placement core values.
- `behavioral_signals/9` cites six discovery records.
- `chatbot_guidance/how_to_recognize_match` has 8 items and no canonical evidence mapping.
- `chatbot_guidance/how_to_recognize_mismatch` has 4 items and no canonical evidence mapping.
- `chatbot_guidance/questions_to_ask_when_uncertain` has 6 items and no canonical evidence mapping.
- all referenced claims are still unclassified in canonical data.

No Gate 1 evidence showed unsupported beauty/utility-style binaries comparable to the rejected Prismari q1 defect. The current placement language is generally grounded in Lorehold's material-history distinction, but it is not yet certifiable because the proof chains and guidance mappings are incomplete.

## Contract v1.1 Required Dimensions

| Dimension | Status | Rationale |
|---|---|---|
| Core identity | FAIL | The conceptual model is strong, but canonical core identity cites discovery records. |
| Internal tension | PASS WITH NON-BLOCKING LIMITATION | Order/chaos, preservation/action, and rules/discovery tensions are represented; remediation must preserve integrated rather than binary framing. |
| Motivation | PASS WITH NON-BLOCKING LIMITATION | History, evidence, relics, spirits, field investigation, and learning from the past are well represented. |
| Preferred method | PASS WITH NON-BLOCKING LIMITATION | Material evidence, ruins, artifacts, records, and spirits are repeatedly represented. |
| Mature expression | PASS WITH NON-BLOCKING LIMITATION | Evidence integrity, stewardship, and responsible action are present, pending role/provenance cleanup. |
| Unhealthy expression | PASS WITH NON-BLOCKING LIMITATION | False-positive and mismatch guidance covers disposable evidence, status/power use, and shallow treasure-hunting; needs evidence mapping. |
| Failure or pressure behavior | PASS WITH NON-BLOCKING LIMITATION | Placement questions test contradiction, dangerous ruins, and blocked discovery; exact guidance support needs mapping. |
| Positive inclusion evidence | FAIL | Conceptually present, but chatbot guidance lacks evidence mapping and all claims are unclassified. |
| Negative exclusion evidence | FAIL | Conceptually present, but mismatch guidance lacks evidence mapping and all claims are unclassified. |
| Ambiguous or uncertainty evidence | FAIL | Uncertainty prompts exist but lack evidence mapping. |
| Required-neighbor boundaries | PASS WITH NON-BLOCKING LIMITATION | Several neighbor distinctions exist, especially Quandrix; boundary set needs explicit certification selection and mapping. |
| Source-to-runtime traceability | FAIL | Generated provenance includes discovery-backed chains, and guidance mappings are incomplete. |

## Required-Neighbor Audit

Gate 1 proposed bounded required-neighbor set:

- Boros / `WR`: same color identity; action, duty, martial courage, and white-red false positives.
- Quandrix: current collision guidance and direct material-history versus abstract-model distinction.
- Prismari: same Strixhaven setting and red creative overlap; current discriminator questions explicitly compare it.
- Silverquill: same Strixhaven setting and rhetoric/status/expression overlap; current discriminator questions explicitly compare it.
- Orzhov / `WB`: history, inheritance, spirits, institutions, and private leverage/acquisition overlap.
- Azorius / `WU`: rules, precedent, authority, and institutional order overlap.
- Gruul / `RG`: ruins, old places, relics, and action outside institutions overlap.
- Witherbloom: same Strixhaven setting and field/witness/natural material overlap; current discriminator questions explicitly compare it.

This is not a 37-by-37 comparison. It is a bounded set derived from same-color alternatives, current comparison guidance, existing collision guidance, and canonical discriminator references.

| Neighbor | Inclusion Evidence | Exclusion Evidence | Uncertainty Handling | Traceability Status |
|---|---|---|---|---|
| Boros / `WR` | Strong; Lorehold requires history/evidence language beyond generic duty/courage. | Present in guidance. | Present in questions. | Needs claim roles and guidance evidence mapping. |
| Quandrix | Strong; direct collision guidance exists with material record versus abstract proof/model. | Present. | Present. | Collision guidance has `evidence_claim_ids`; claims need roles/evidence localization. |
| Prismari | Moderate; questions compare history/evidence with expression/spectacle. | Present. | Present. | Needs explicit evidence mapping and careful neutral wording in remediation. |
| Silverquill | Moderate; questions compare records/evidence with rhetoric/speech/status. | Present. | Present. | Needs mapping and source-backed boundary language. |
| Orzhov / `WB` | Moderate; artifact ownership/private leverage appears in questions/guidance. | Present. | Partial. | Needs evidence mapping and avoidance of unsupported overreach. |
| Azorius / `WU` | Moderate; rule/precedent distinctions appear. | Present. | Partial. | Needs evidence mapping. |
| Gruul / `RG` | Partial; ruin/artifact fieldwork overlap appears. | Present. | Partial. | Needs evidence mapping. |
| Witherbloom | Partial; witness/material field evidence overlap appears. | Present. | Partial. | Needs evidence mapping. |

Conclusion: neighbor coverage is not absent, but it is not certification-ready.

## Generated Propagation Audit

Generated consumers inspected:

- `data/factions.json`
- `data/placement-model.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `data/semantic-readiness-provenance.json`

Findings:

- Lorehold exists in generated faction output, placement model output, recruiter context, and provenance manifest.
- The provenance manifest contains 117 Lorehold entries.
- 14 Lorehold provenance entries include discovery evidence from the same invalid profile/placement chains identified by the structural audit.
- Generated consumers appear to include the expected consumer paths for Lorehold provenance (`data/factions.json`, `data/placement-model.json`, and `supabase/functions/guild-recruiter/faction-context.ts`).
- No confirmed public recruiter prose leak of internal claim IDs was found in this Gate 1 scan; the recruiter context does include internal `evidence_claim_ids` as metadata.
- No generated rebuild was run and no generated file was modified.

Generated propagation status: FAIL until canonical discovery/support misuse and guidance mapping are corrected and regenerated under Gate 4.

## Maturity Reputation Test

Verdict: **Partially; structurally rich but needs targeted semantic remediation.**

Evidence:

- Lorehold is not a thin or obviously under-extracted packet. It has 97 claims, 20 sources, 13 claim-bearing sources, 7 discriminator questions, and extensive profile/placement coverage.
- The content covers core identity, internal tension, motivation, method, mature expression, unhealthy expression, pressure behavior, and multiple neighbor distinctions.
- The structural fingerprint is `high-volume-pattern` and `mixed-role-pattern`, not `low-volume-pattern`.
- The main defects are Contract v1.1 proof-chain defects: unclassified claims, discovery records used as authoritative support, support records used in mechanics, and missing recruiter guidance evidence mapping.

Lorehold therefore should not be treated as already semantically ready, but it also does not appear to need complete packet reconstruction.

## Findings by Severity

### BLOCKER

1. All 97 claims lack explicit `semantic_role` certification metadata.
2. Discovery records support authoritative profile core identity.
3. Discovery records support authoritative placement summary.
4. Search/corpus discovery records are modeled as placement core values at `/core_values/8` through `/core_values/17`.
5. Discovery records support placement behavioral signal `/behavioral_signals/9`.
6. Canonical recruiter match, mismatch, and uncertainty guidance lacks evidence mapping.
7. Generated provenance preserves 14 discovery-backed evidence chains.

### HIGH

1. Product/deck support records `claim_lorehold_mechanic_0013` and `claim_lorehold_mechanic_0014` are used in an authoritative mechanics entry and need role/source-bound treatment.
2. Existing required-neighbor coverage is conceptually present but needs explicit required-neighbor selection and traceable evidence mapping.

### MEDIUM

1. Interpretive philosophy and placement-support claims need bounded evidence localization and interpretation levels.
2. Character-specific evidence must be labeled as character evidence and generalized only with corroboration or explicit inference.
3. Repository archive sources should be treated as local access/provenance support unless paired with official source authority.

### LOW

1. Some legacy readiness language still describes Lorehold as ready from older matrices; CRIT-001 already warns that legacy readiness is not certification.
2. Data-quality corpus-upgrade references are structurally flagged but can remain if clearly non-authoritative metadata.

### NON-BLOCKING OBSERVATION

1. Lorehold's higher claim volume is not itself proof of readiness, but the packet's conceptual spread is meaningfully stronger than a thin packet.
2. The existing discriminator questions appear mostly source-aligned at Gate 1; no immediate unsupported binary comparable to Prismari's rejected q1 was identified.

## Primary Disposition

**Claim-role classification required.**

This is the narrowest accurate disposition. Lorehold also needs source-linkage/provenance cleanup, but the first blocker is that the packet cannot be certified while 91 records remain unclassified and all currently useful substantive claims lack explicit semantic roles.

## Minimal Bounded Repair List

### Required for Certification

1. Assign canonical `semantic_role` to all Lorehold claims.
2. Add bounded evidence localization and interpretation levels for new/remediated substantive claims where existing evidence fields are insufficient.
3. Reclassify `claim_lorehold_unknown_0001` and `lorehold_claim_0022` through `lorehold_claim_0027` as discovery records or otherwise remove them from semantic proof chains.
4. Remove discovery records from authoritative `core_identity`, `placement_summary`, placement `core_values`, and `behavioral_signals` chains; either replace with substantive claims or move the discovery material into metadata-only fields.
5. Resolve support-role use of `claim_lorehold_mechanic_0013` and `claim_lorehold_mechanic_0014` in the profile mechanics entry.
6. Add evidence mapping for canonical recruiter match, mismatch, and uncertainty guidance.
7. Select and record the bounded `required_neighbors` set for Lorehold.
8. Ensure each required-neighbor boundary has positive, negative, and uncertainty support from substantive claims.
9. Regenerate generated artifacts and provenance under Gate 4 after canonical remediation.
10. Verify generated consumers no longer include discovery-backed semantic proof chains.

### Optional / Non-Blocking

1. Improve wording around data-quality/corpus-upgrade metadata so structural audits do not confuse it with semantic proof.
2. Tighten character-evidence notes to make direct fact versus project synthesis easier for reviewers.
3. Preserve useful timeline/location/mechanic richness without padding or broad lore expansion.

### Out of Scope for CRIT-001

1. Runtime scoring or confidence calibration.
2. Hall/Crucible scheduling or content changes.
3. Lateral inhibition changes.
4. Global recruiter prompt changes.
5. Exhaustive Strixhaven lore enrichment.
6. New non-Lorehold identity work.

## Gate 2 Recommendation

Gate 2 broad evidence completion is **not required before remediation**.

Recommended sequence:

1. Proceed to bounded Gate 3 planning only after owner approval.
2. Use existing canonical Lorehold sources first.
3. Invoke Gate 2 only for a specific unresolved blocker if an authoritative statement cannot be supported after claim-role classification and source-linkage cleanup.

## Gate 2 Evidence Confirmation

Gate 2 stayed bounded to the exact Gate 1 blockers. It confirms that Lorehold does not currently need broad source discovery before remediation. The next step is canonical repair, not more research, unless a specific statement fails during Gate 3 evidence localization.

### Claim-role mapping summary

| Proposed Role | Count | Gate 3 Meaning |
|---|---:|---|
| `substantive_claim` | 88 | May support profile, placement, guidance, and provenance after explicit role assignment and bounded evidence localization. |
| `discovery_record` | 7 | Must remain metadata/unknown/search-lead evidence only; cannot support authoritative semantic statements. |
| `support_record` | 2 | May support auxiliary product/deck details only; should not independently prove Lorehold identity meaning. |
| `unclassified` | 0 proposed / 91 current canonical | Gate 3 must remove the canonical legacy-unclassified state. |

Audit-only proposed role map for all 97 claims:

| Claim ID | Type | Proposed role | Reason | Add bounded evidence? | May support |
|---|---|---|---|---|---|
| `claim_lorehold_core_0001` | core_identity | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_core_0002` | core_identity | substantive_claim | source-supported identity evidence | Yes | profile, guidance/provenance if mapped |
| `claim_lorehold_core_0003` | core_identity | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_core_0004` | core_identity | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_core_0005` | philosophy | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_core_0006` | philosophy | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_core_0007` | mechanic | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_core_0008` | mechanic | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_core_0009` | philosophy | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_core_0010` | flavor_text | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_structure_0001` | structure | substantive_claim | source-supported identity evidence | Yes | profile, guidance/provenance if mapped |
| `claim_lorehold_structure_0002` | structure | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_structure_0003` | key_figure | substantive_claim | rules/mechanics fact with identity relevance when bounded | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_structure_0004` | key_figure | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_structure_0005` | key_figure | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_structure_0006` | structure | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_dichotomy_0001` | philosophy | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_dichotomy_0002` | philosophy | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_dichotomy_0003` | philosophy | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_dichotomy_0004` | philosophy | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_dichotomy_0005` | philosophy | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_dichotomy_0006` | philosophy | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_location_0001` | location | substantive_claim | source-supported identity evidence | Yes | profile, guidance/provenance if mapped |
| `claim_lorehold_location_0002` | location | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_location_0003` | location | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_location_0004` | location | substantive_claim | source-supported identity evidence | Yes | profile, guidance/provenance if mapped |
| `claim_lorehold_location_0005` | location | substantive_claim | source-supported identity evidence | Yes | profile, guidance/provenance if mapped |
| `claim_lorehold_location_0006` | location | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_location_0007` | location | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_mechanic_0001` | mechanic | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_mechanic_0002` | mechanic | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_mechanic_0003` | mechanic | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_mechanic_0004` | mechanic | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_mechanic_0005` | mechanic | substantive_claim | rules/mechanics fact with identity relevance when bounded | Yes | profile, guidance/provenance if mapped |
| `claim_lorehold_mechanic_0006` | mechanic | substantive_claim | rules/mechanics fact with identity relevance when bounded | Yes | profile, guidance/provenance if mapped |
| `claim_lorehold_mechanic_0007` | mechanic | substantive_claim | rules/mechanics fact with identity relevance when bounded | Yes | profile, guidance/provenance if mapped |
| `claim_lorehold_mechanic_0008` | mechanic | substantive_claim | rules/mechanics fact with identity relevance when bounded | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_mechanic_0009` | mechanic | substantive_claim | rules/mechanics fact with identity relevance when bounded | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_mechanic_0010` | mechanic | substantive_claim | rules/mechanics fact with identity relevance when bounded | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_mechanic_0011` | mechanic | substantive_claim | rules/mechanics fact with identity relevance when bounded | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_mechanic_0012` | mechanic | substantive_claim | rules/mechanics fact with identity relevance when bounded | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_mechanic_0013` | mechanic | support_record | official product/deck metadata; auxiliary support only | Only if retained as auxiliary product detail | profile, placement, metadata only |
| `claim_lorehold_mechanic_0014` | mechanic | support_record | official product/deck metadata; auxiliary support only | Only if retained as auxiliary product detail | profile, placement, metadata only |
| `claim_lorehold_figure_0001` | key_figure | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_figure_0002` | key_figure | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_figure_0003` | philosophy | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_figure_0004` | key_figure | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_figure_0005` | key_figure | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_figure_0006` | key_figure | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_figure_0007` | key_figure | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_figure_0008` | key_figure | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_figure_0009` | key_figure | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_figure_0010` | key_figure | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_figure_0011` | key_figure | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_figure_0012` | key_figure | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_timeline_0001` | timeline | substantive_claim | source-supported identity evidence | Yes | profile, guidance/provenance if mapped |
| `claim_lorehold_timeline_0002` | timeline | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_timeline_0003` | timeline | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_timeline_0004` | timeline | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_timeline_0005` | timeline | substantive_claim | source-supported identity evidence | Yes | profile, guidance/provenance if mapped |
| `claim_lorehold_timeline_0006` | timeline | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_placement_0001` | placement_support | substantive_claim | interpretive placement claim grounded by other Lorehold evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_placement_0002` | placement_support | substantive_claim | interpretive placement claim grounded by other Lorehold evidence | Yes | placement, guidance/provenance if mapped |
| `claim_lorehold_placement_0003` | placement_support | substantive_claim | interpretive placement claim grounded by other Lorehold evidence | Yes | placement, guidance/provenance if mapped |
| `claim_lorehold_placement_0004` | placement_support | substantive_claim | interpretive placement claim grounded by other Lorehold evidence | Yes | placement, guidance/provenance if mapped |
| `claim_lorehold_placement_0005` | placement_support | substantive_claim | interpretive placement claim grounded by other Lorehold evidence | Yes | placement, guidance/provenance if mapped |
| `claim_lorehold_placement_0006` | placement_support | substantive_claim | interpretive placement claim grounded by other Lorehold evidence | Yes | placement, guidance/provenance if mapped |
| `claim_lorehold_placement_0007` | placement_support | substantive_claim | interpretive placement claim grounded by other Lorehold evidence | Yes | placement, guidance/provenance if mapped |
| `claim_lorehold_unknown_0001` | structure | discovery_record | records an unresolved source gap/unknown | No; keep as discovery metadata only | profile, metadata only |
| `claim_lorehold_core_0011` | core_identity | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_structure_0007` | structure | substantive_claim | story/archive event can support bounded character/location/mechanic evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_structure_0008` | structure | substantive_claim | story/archive event can support bounded character/location/mechanic evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_structure_0009` | structure | substantive_claim | story/archive event can support bounded character/location/mechanic evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_location_0008` | location | substantive_claim | story/archive event can support bounded character/location/mechanic evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_location_0009` | location | substantive_claim | story/archive event can support bounded character/location/mechanic evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_location_0010` | location | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_location_0011` | location | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_mechanic_0015` | mechanic | substantive_claim | story/archive event can support bounded character/location/mechanic evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_mechanic_0016` | mechanic | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_mechanic_0017` | mechanic | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_figure_0013` | key_figure | substantive_claim | story/archive event can support bounded character/location/mechanic evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_figure_0014` | key_figure | substantive_claim | story/archive event can support bounded character/location/mechanic evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_figure_0015` | key_figure | substantive_claim | story/archive event can support bounded character/location/mechanic evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_figure_0016` | key_figure | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_figure_0017` | key_figure | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_figure_0018` | key_figure | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_figure_0019` | key_figure | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_figure_0020` | key_figure | substantive_claim | story/archive event can support bounded character/location/mechanic evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_figure_0021` | key_figure | substantive_claim | source-supported identity evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_placement_0008` | placement_support | substantive_claim | interpretive placement claim grounded by other Lorehold evidence | Yes | profile, placement, guidance/provenance if mapped |
| `claim_lorehold_placement_0009` | placement_support | substantive_claim | interpretive placement claim grounded by other Lorehold evidence | Yes | profile, placement, guidance/provenance if mapped |
| `lorehold_claim_0022` | story_corpus_evidence | discovery_record | records search/corpus relevance, not extracted meaning | No; keep as discovery metadata only | metadata only |
| `lorehold_claim_0023` | story_corpus_evidence | discovery_record | records search/corpus relevance, not extracted meaning | No; keep as discovery metadata only | metadata only |
| `lorehold_claim_0024` | story_corpus_evidence | discovery_record | records search/corpus relevance, not extracted meaning | No; keep as discovery metadata only | metadata only |
| `lorehold_claim_0025` | story_corpus_evidence | discovery_record | records search/corpus relevance, not extracted meaning | No; keep as discovery metadata only | metadata only |
| `lorehold_claim_0026` | story_corpus_evidence | discovery_record | records search/corpus relevance, not extracted meaning | No; keep as discovery metadata only | metadata only |
| `lorehold_claim_0027` | story_corpus_evidence | discovery_record | records search/corpus relevance, not extracted meaning | No; keep as discovery metadata only | metadata only |

### Discovery-record replacement plan

| Chain | Current invalid evidence | Gate 3 replacement evidence | Preserve / narrow / remove | Targeted discovery needed? |
|---|---|---|---|---|
| `lorehold.profile.json#/core_identity` summary | `lorehold_claim_0022`-`0027` | Use existing substantive claims already listed under `confirmed_claim_ids` and `interpretive_claim_ids`: `claim_lorehold_core_0001`-`0009`, `claim_lorehold_dichotomy_0001`, `claim_lorehold_dichotomy_0006`, `claim_lorehold_core_0011`, `claim_lorehold_location_0010`, `claim_lorehold_mechanic_0016`, `claim_lorehold_placement_0001`, `0002`, `0008`, `0009`. | Preserve summary; remove discovery `claim_ids` as semantic support or move them to metadata-only data quality. | No. |
| `lorehold.placement.json#/placement_summary` | `lorehold_claim_0022`-`0027` mixed with substantive claims | Existing substantive claims in the same array are enough: `claim_lorehold_core_0004`, `0005`, `0006`, `0007`, `0009`, `claim_lorehold_dichotomy_0001`, `claim_lorehold_core_0011`, `claim_lorehold_mechanic_0016`, `claim_lorehold_placement_0001`-`0004`, `0008`, `0009`, plus identity claims `core_0001`-`0003` where needed. | Preserve summary; remove discovery IDs. | No. |
| `lorehold.placement.json#/behavioral_signals/9` | `lorehold_claim_0022`-`0027` | Replace corpus-search specificity with substantive behavior evidence: `claim_lorehold_core_0005`, `0006`, `0009`, `0011`, `claim_lorehold_location_0009`, `0010`, `claim_lorehold_mechanic_0016`, `claim_lorehold_placement_0001`, `0002`, `0009`. | Narrow from "corpus-backed specificity" to "history/evidence/fieldwork specificity," or remove if redundant. | No. |
| `lorehold.profile.json#/data_quality/corpus_upgrade` | `lorehold_claim_0022`-`0027` | No replacement needed if retained as explicit data-quality metadata. | Preserve only as metadata; must not count toward semantic readiness. | No. |

### Placement core-values repair plan

| Core value pointer | Current value | Invalid evidence | Valid replacement evidence | Gate 3 action |
|---|---|---|---|---|
| `/core_values/8` | Lorehold | `lorehold_claim_0022`-`0024` | `claim_lorehold_core_0001`, `claim_lorehold_core_0004` | Remove as a search term or narrow to "archaeomancy / Lorehold identity." |
| `/core_values/9` | spirit | `lorehold_claim_0022`-`0024` | `claim_lorehold_core_0007`, `claim_lorehold_mechanic_0001`, `0002`, `0016` | Preserve but narrow to historical spirits / spirit primary sources. |
| `/core_values/10` | archaeology | `lorehold_claim_0022`-`0024` | `claim_lorehold_core_0004`, `0006`, `claim_lorehold_structure_0006` | Preserve/narrow to archaeomancy and archaeological artifacts. |
| `/core_values/11` | history | `lorehold_claim_0022`-`0024` | `claim_lorehold_core_0005`, `0009`, `claim_lorehold_placement_0001` | Preserve/narrow to active historical inquiry. |
| `/core_values/12` | ruins | `lorehold_claim_0022`-`0024` | `claim_lorehold_core_0011`, `claim_lorehold_location_0001`, `0006`, `0010` | Preserve/narrow to dangerous field sites and ruin study. |
| `/core_values/13` | scroll | `lorehold_claim_0022`-`0024` | `claim_lorehold_core_0008`, `claim_lorehold_location_0008` | Narrow to records, scrolls, and ancient tomes; remove if too narrow/redundant. |
| `/core_values/14` | learn | `lorehold_claim_0022`-`0024` | `claim_lorehold_figure_0003`, `claim_lorehold_placement_0001` | Remove as generic search/mechanic term or narrow to learning from the past. |
| `/core_values/15` | Quintorius | `lorehold_claim_0022`-`0024` | `claim_lorehold_figure_0005`, `0006`, `0007`, `claim_lorehold_timeline_0006`, `claim_lorehold_figure_0021` | Remove from core values; keep as key-figure evidence only. |
| `/core_values/16` | relic | `lorehold_claim_0022`-`0024` | `claim_lorehold_core_0011`, `claim_lorehold_location_0009`, `claim_lorehold_placement_0009`, `claim_lorehold_figure_0018` | Preserve/narrow to relic stewardship and evidence. |
| `/core_values/17` | artifact | `lorehold_claim_0022`-`0024` | `claim_lorehold_core_0006`, `claim_lorehold_core_0011`, `claim_lorehold_placement_0009`, `claim_lorehold_figure_0018` | Preserve/narrow to archaeological artifacts as evidence/history. |

### Recruiter guidance evidence mapping plan

Gate 3 can add `evidence_claim_ids` directly from existing claims for the following guidance items. No new source discovery is indicated.

| Guidance group | Guidance item | Existing supporting claims | Evidence gap? |
|---|---|---|---|
| match | Interest in history, archaeology, ruins, artifacts, spirits, monuments, and direct evidence. | `claim_lorehold_core_0004`, `0005`, `0006`, `0007`, `0011`, `claim_lorehold_location_0001`, `0003`, `0006`, `claim_lorehold_mechanic_0016` | No. |
| match | Preservation plus action rather than only archive work or only adventure. | `claim_lorehold_placement_0002`, `claim_lorehold_dichotomy_0002`, `0004`, `claim_lorehold_core_0011`, `claim_lorehold_location_0009` | No. |
| match | Respectful rule-bending in pursuit of truth. | `claim_lorehold_placement_0008`, `claim_lorehold_structure_0005`, `claim_lorehold_dichotomy_0002`, `0004` | No; ensure ?respectful? remains an interpretation label. |
| match | The past as useful for present responsibility, not nostalgia. | `claim_lorehold_placement_0001`, `claim_lorehold_figure_0003`, `claim_lorehold_placement_0007` | No. |
| match | Grief-to-preservation answers. | `claim_lorehold_timeline_0005`, `claim_lorehold_figure_0009`, `claim_lorehold_placement_0006` | No; keep bounded to loss/preservation, not all grief. |
| match | Provenance, context, and preservation before removing/displaying a relic. | `claim_lorehold_placement_0009`, `claim_lorehold_location_0009`, `claim_lorehold_core_0006`, `0011`, `claim_lorehold_figure_0018` | No. |
| match | Records, ruins, spirits, fossils, and field observations as evidence pattern. | `claim_lorehold_location_0008`, `claim_lorehold_location_0006`, `claim_lorehold_mechanic_0016`, `claim_lorehold_figure_0020`, `claim_lorehold_core_0011`, `claim_lorehold_location_0010` | No. |
| match | Rules-with-conscience stronger than blind obedience/recklessness. | `claim_lorehold_placement_0008`, `claim_lorehold_dichotomy_0004`, `0005`, `claim_lorehold_structure_0005` | No. |
| mismatch | Little interest in history, old objects, records, or field investigation. | `claim_lorehold_core_0005`, `0006`, `0011`, `claim_lorehold_placement_0003` | No. |
| mismatch | Evidence disposable if it conflicts with identity, status, or power. | `claim_lorehold_placement_0004`, `claim_lorehold_placement_0007`, `claim_lorehold_dichotomy_0004` | No; status/power language should stay interpretive. |
| mismatch | Novelty without roots or tradition without inquiry. | `claim_lorehold_placement_0001`, `0002`, `claim_lorehold_dichotomy_0001`, `claim_lorehold_core_0009` | No. |
| mismatch | Artifacts/sites/ruins as loot, trophies, status objects, or aesthetics without context/preservation/provenance/safety. | `claim_lorehold_placement_0009`, `claim_lorehold_placement_0003`, `claim_lorehold_core_0011`, `claim_lorehold_location_0009`, `claim_lorehold_mechanic_0017` | No; ?status objects? should be tied to placement interpretation. |
| uncertainty | Artifact itself, story it proves, system behind it, or audience reaction. | `claim_lorehold_core_0006`, `claim_lorehold_core_0008`, `claim_lorehold_placement_0009`, `claim_lorehold_placement_0004` | No for Lorehold side; neighbor options rely on comparison context. |
| uncertainty | Protect difficult historical truth or simplify it. | `claim_lorehold_placement_0004`, `claim_lorehold_dichotomy_0004` | No. |
| uncertainty | Recover the past, explain the present, inspire an audience, or reshape life. | `claim_lorehold_core_0006`, `0011`, `claim_lorehold_placement_0001`, `claim_lorehold_figure_0003` | No for Lorehold side. |
| uncertainty | Break a rule for evidence, justice, expression, survival, or advantage. | `claim_lorehold_placement_0008`, `claim_lorehold_dichotomy_0002`, `0004`, `claim_lorehold_structure_0005` | No. |
| uncertainty | Artifact as object, evidence, symbol, spell component, or performance prop. | `claim_lorehold_placement_0009`, `claim_lorehold_core_0006`, `0011`, `claim_lorehold_figure_0018` | No for Lorehold side. |
| uncertainty | Rule protects a site but blocks urgent truth. | `claim_lorehold_placement_0008`, `claim_lorehold_dichotomy_0004`, `claim_lorehold_core_0011`, `claim_lorehold_location_0009` | No. |

### Provenance repair plan

| Provenance chain | Invalid evidence | Replacement / Gate 3 action | Repair without new discovery? |
|---|---|---|---|
| `lorehold.profile.json#/core_identity` | `lorehold_claim_0022`-`0027` | Rebuild provenance from substantive `confirmed_claim_ids` and `interpretive_claim_ids` listed on the profile core identity. | Yes. |
| `lorehold.profile.json#/data_quality/corpus_upgrade` | `lorehold_claim_0022`-`0027` | Keep as metadata provenance only, or exclude from semantic-readiness provenance if the builder treats it as semantic. | Yes. |
| `lorehold.placement.json#/placement_summary` | `lorehold_claim_0022`-`0027` | Rebuild from existing substantive placement/core/dichotomy claims already present in the summary. | Yes. |
| `lorehold.placement.json#/behavioral_signals/9` | `lorehold_claim_0022`-`0027` | Narrow or replace the signal and cite substantive claims for history/evidence/fieldwork specificity. | Yes. |
| `lorehold.placement.json#/core_values/8` | `lorehold_claim_0022`-`0024` | Apply the core-values repair row above; then regenerate provenance with substantive evidence or remove the semantic chain. | Yes. |
| `lorehold.placement.json#/core_values/9` | `lorehold_claim_0022`-`0024` | Apply the core-values repair row above; then regenerate provenance with substantive evidence or remove the semantic chain. | Yes. |
| `lorehold.placement.json#/core_values/10` | `lorehold_claim_0022`-`0024` | Apply the core-values repair row above; then regenerate provenance with substantive evidence or remove the semantic chain. | Yes. |
| `lorehold.placement.json#/core_values/11` | `lorehold_claim_0022`-`0024` | Apply the core-values repair row above; then regenerate provenance with substantive evidence or remove the semantic chain. | Yes. |
| `lorehold.placement.json#/core_values/12` | `lorehold_claim_0022`-`0024` | Apply the core-values repair row above; then regenerate provenance with substantive evidence or remove the semantic chain. | Yes. |
| `lorehold.placement.json#/core_values/13` | `lorehold_claim_0022`-`0024` | Apply the core-values repair row above; then regenerate provenance with substantive evidence or remove the semantic chain. | Yes. |
| `lorehold.placement.json#/core_values/14` | `lorehold_claim_0022`-`0024` | Apply the core-values repair row above; then regenerate provenance with substantive evidence or remove the semantic chain. | Yes. |
| `lorehold.placement.json#/core_values/15` | `lorehold_claim_0022`-`0024` | Apply the core-values repair row above; then regenerate provenance with substantive evidence or remove the semantic chain. | Yes. |
| `lorehold.placement.json#/core_values/16` | `lorehold_claim_0022`-`0024` | Apply the core-values repair row above; then regenerate provenance with substantive evidence or remove the semantic chain. | Yes. |
| `lorehold.placement.json#/core_values/17` | `lorehold_claim_0022`-`0024` | Apply the core-values repair row above; then regenerate provenance with substantive evidence or remove the semantic chain. | Yes. |

### Mechanics support-record repair plan

| Record | Current issue | Gate 3 decision | Replacement evidence |
|---|---|---|---|
| `claim_lorehold_mechanic_0013` | Official product/decklist metadata is used inside an authoritative mechanics proof chain. | Reclassify as `support_record`; retain only as auxiliary product/deck detail. | Use `claim_lorehold_core_0007`, `claim_lorehold_mechanic_0001`, `0002`, `0009`, `0010` for substantive Spirit mechanics/lore. |
| `claim_lorehold_mechanic_0014` | Spirit-token deck support is used as if it proves faction identity meaning. | Reclassify as `support_record`; split product detail from substantive Spirit identity. | Use `claim_lorehold_mechanic_0009`, `0010`, plus `claim_lorehold_core_0007` and `claim_lorehold_mechanic_0001` for substantive meaning. |

### Required-neighbor evidence plan

| Required neighbor | Why required | Positive Lorehold evidence | Negative/exclusion evidence | Ambiguous/uncertainty evidence | Exact gap? |
|---|---|---|---|---|---|
| Boros / `WR` | Same color pair; generic duty/courage/action can false-positive as Lorehold. | `claim_lorehold_core_0005`, `0006`, `0011`, `claim_lorehold_placement_0002` | `claim_lorehold_placement_0003`; calibration guardrail against generic duty/courage. | Rule/action questions supported by `claim_lorehold_placement_0008`, `claim_lorehold_dichotomy_0002`, `0004`. | No new source gap. |
| Quandrix | Existing collision guidance; material record/history versus abstract proof/model. | `claim_lorehold_core_0004`, `0006`, `0008`, `0011`, `claim_lorehold_placement_0009` | Collision suppresses model/proof-first answers before material evidence. | Questions 1, 3, 6, 7 already compare material evidence with theory/model. | No new source gap. |
| Prismari | Same Strixhaven setting and red creative/spectacle overlap. | `claim_lorehold_core_0006`, `claim_lorehold_core_0011`, `claim_lorehold_placement_0009` | `claim_lorehold_placement_0003` and questions contrasting evidence/context with spectacle/audience reaction. | Questions 1, 4, 6 and uncertainty prompts cover expression/spectacle alternatives. | No new source gap; keep wording neutral. |
| Silverquill | Same Strixhaven setting; rhetoric/status/speech can overlap with records, precedent, and social proof. | `claim_lorehold_dichotomy_0004`, `claim_lorehold_placement_0004`, `claim_lorehold_location_0008` | `claim_lorehold_placement_0004` supports rejecting/manipulating evidence as mismatch. | Questions 1, 3, 5, 7 distinguish powerful speech/status from evidence. | No new source gap; avoid unsupported Silverquill claims. |
| Orzhov / `WB` | Institution, spirits, inheritance, artifacts, and private leverage/acquisition overlap. | `claim_lorehold_placement_0009`, `claim_lorehold_core_0011`, `claim_lorehold_location_0009` | `claim_lorehold_placement_0003`, `0007`, `0009` distinguish history/evidence from loot/status/private leverage. | Question 6 and mismatch item 4 cover ownership/acquisition ambiguity. | No new source gap; keep private-leverage language interpretive. |
| Azorius / `WU` | Rules, precedent, institutional order, and authority overlap. | `claim_lorehold_dichotomy_0004`, `0005`, `claim_lorehold_placement_0008` | `claim_lorehold_dichotomy_0002`, `claim_lorehold_structure_0005` support discovery/rule-bending contrast. | Questions 2 and 7 distinguish precedent/order from evidence-led action. | No new source gap. |
| Gruul / `RG` | Ruins, field danger, old places, and action outside institutions can overlap. | `claim_lorehold_core_0011`, `claim_lorehold_location_0001`, `0006`, `0009` | `claim_lorehold_placement_0009` and preservation/context evidence distinguish from smash-and-take ruin interaction. | Question 6 covers dangerous ruins/artifact cache ambiguity. | No new source gap. |
| Witherbloom | Same setting; fieldwork, living/natural material, death, and witness evidence can overlap. | `claim_lorehold_mechanic_0016`, `claim_lorehold_location_0010`, `claim_lorehold_core_0011` | Lorehold evidence centers history/primary sources rather than life/death biology; use existing field/evidence claims only. | Questions 4 and 7 cover forgotten war, spirits, fossil layer, and witness ambiguity. | No new source gap for Lorehold side. |

### Exact Gate 3 remediation checklist

1. Add explicit `semantic_role` to all 97 Lorehold claims using the audit-only mapping above.
2. Add bounded `evidence_locations` or equivalent locators for all new/remediated substantive claims that lack enough localization for independent review.
3. Mark `claim_lorehold_unknown_0001` and `lorehold_claim_0022`-`0027` as discovery records and keep them out of authoritative semantic proof chains.
4. Mark `claim_lorehold_mechanic_0013` and `claim_lorehold_mechanic_0014` as support records and move/narrow them to auxiliary product detail.
5. Remove discovery claims from `profile.core_identity.claim_ids`; rely on existing substantive confirmed/interpretive claims instead.
6. Remove discovery claims from `placement_summary.claim_ids`; rely on existing substantive claims already listed there.
7. Repair or remove placement `core_values/8` through `/17` using the core-values table above.
8. Replace or remove `behavioral_signals/9` so it no longer treats corpus search matches as semantic behavior.
9. Add `evidence_claim_ids` to recruiter match, mismatch, and uncertainty guidance using the mapping table above.
10. Record Lorehold `required_neighbors` as the bounded set above, with traceable evidence for each boundary.
11. After canonical remediation only, rebuild generated artifacts and provenance in Gate 4.
12. Verify generated provenance no longer includes discovery/support records as semantic evidence.
13. Confirm no lateral inhibition, Hall, Crucible, scoring, confidence, scheduling, tie-ordering, or global recruiter behavior changed.

### Targeted source discovery decision

Targeted source discovery is **not required now**. Gate 2 found existing substantive Lorehold claims for every Gate 1 blocker. If Gate 3 cannot localize a specific interpretive claim to bounded evidence, pause that exact claim and request targeted evidence completion rather than broad lore enrichment.

## Gate 3 Canonical Remediation

Gate 3 applied the bounded canonical remediation authorized after Gate 2. Generated artifacts were intentionally not rebuilt; all generated/provenance synchronization is deferred to Gate 4.

### Canonical files changed

- `data/raw-factions/lorehold/lorehold.claims.json`
- `data/raw-factions/lorehold/lorehold.profile.json`
- `data/raw-factions/lorehold/lorehold.placement.json`
- `data/raw-factions/lorehold/lorehold.changelog.json`

No Lorehold sources file change was required. No generated files were modified.

### Blocker-by-blocker remediation

| Gate 1 / Gate 2 blocker | Gate 3 remediation |
|---|---|
| All 97 Lorehold claims lacked certifying `semantic_role`. | Added `semantic_role` to all 97 claim records. |
| Substantive claims needed bounded evidence localization. | Added `evidence_locations` to substantive and support records with source, locator type, bounded paraphrase, evidence scope, and interpretation level. |
| Discovery/search-corpus records supported authoritative profile core identity. | Replaced `profile.core_identity.claim_ids` with existing substantive confirmed and interpretive claims; retained discovery records only as metadata elsewhere. |
| Discovery/search-corpus records supported placement summary. | Removed discovery records from `placement_summary.claim_ids`; aligned `placement_summary.evidence_claim_ids` to substantive claims only. |
| Placement `core_values/8` through `/17` were search-term values backed by discovery evidence. | Replaced the search-term values with narrowed source-backed values: archaeomancy identity, historical spirits, archaeological fieldwork, active historical inquiry, dangerous ruins, records/tomes, relic stewardship, and learning from the past. |
| `behavioral_signals/9` treated corpus search matches as semantic behavior. | Replaced it with a substantive Lorehold-specific history/evidence/fieldwork signal. |
| Recruiter-facing match, mismatch, and uncertainty guidance lacked evidence mapping. | Added `semantic_guidance_evidence` entries for all 8 match items, 4 mismatch items, and 6 uncertainty questions with content hashes and supporting claim IDs. |
| Two product/deck records were used in an authoritative mechanics chain. | Reclassified `claim_lorehold_mechanic_0013` and `claim_lorehold_mechanic_0014` as `support_record`; split them into `support_claim_ids` on the mechanics entry and left substantive Spirit meaning supported by substantive mechanics claims. |
| Data-quality corpus references could be treated as semantic proof because they used `claim_ids`. | Moved corpus-upgrade references from `claim_ids` to `discovery_claim_ids` and added a semantic-readiness note that they are metadata only. |
| Required-neighbor coverage needed bounded selection and traceability. | Added `semantic_readiness.required_neighbors` and `required_neighbor_guidance` with Lorehold-side positive, exclusion, and ambiguity evidence. |

### Claims classified by semantic role

| Semantic role | Count |
|---|---:|
| `substantive_claim` | 88 |
| `discovery_record` | 7 |
| `support_record` | 2 |
| `unclassified` | 0 |

Discovery records retained:

- `claim_lorehold_unknown_0001`
- `lorehold_claim_0022`
- `lorehold_claim_0023`
- `lorehold_claim_0024`
- `lorehold_claim_0025`
- `lorehold_claim_0026`
- `lorehold_claim_0027`

Support records retained:

- `claim_lorehold_mechanic_0013`
- `claim_lorehold_mechanic_0014`

### Profile and placement evidence-chain repairs

- `profile.core_identity.claim_ids` now uses substantive confirmed and interpretive claims rather than discovery records.
- `profile.data_quality.corpus_upgrade` retains story-corpus records as `discovery_claim_ids` metadata only.
- `profile.mechanics.entries[5]` now separates substantive Spirit mechanics claims from auxiliary product/deck support claims.
- `placement_summary.claim_ids` and `placement_summary.evidence_claim_ids` now use substantive claims only.
- Placement core values no longer use `lorehold_claim_0022` through `lorehold_claim_0024` as semantic evidence.
- `behavioral_signals/9` no longer relies on story-corpus search records.

### Recruiter guidance evidence mappings

Gate 3 added 18 `semantic_guidance_evidence` entries:

- 8 for `chatbot_guidance/how_to_recognize_match`
- 4 for `chatbot_guidance/how_to_recognize_mismatch`
- 6 for `chatbot_guidance/questions_to_ask_when_uncertain`

Each entry records the canonical pointer, content hash, and supporting substantive claim IDs. These mappings are canonical only until Gate 4 rebuilds generated provenance.

### Required-neighbor mappings

Lorehold's bounded required-neighbor set is:

- `WR` — Boros / red-white action false positives
- `QUANDRIX` — material record/history versus abstract proof/model
- `PRISMARI` — Strixhaven red creative/spectacle overlap
- `SILVERQUILL` — rhetoric/status/speech overlap
- `WB` — Orzhov / white-black institution, spirits, inheritance, acquisition, and leverage overlap
- `WU` — Azorius / white-blue rules, precedent, institutional order, and authority overlap
- `RG` — Gruul / red-green ruins, field danger, and action outside institutions overlap
- `WITHERBLOOM` — Strixhaven fieldwork, death, natural material, and witness-evidence overlap

Each neighbor has Lorehold-side positive, exclusion, and ambiguity evidence recorded in `required_neighbor_guidance`.

### Items handed to Gate 4 from Gate 3

- Rebuild generated artifacts.
- Regenerate `data/semantic-readiness-provenance.json`.
- Refresh generated recruiter context.
- Run source/generated validation.
- Run candidate-scope checks and generated-diff isolation.
- Add or validate semantic fixtures if required by the Gate 4 workflow.
- Resolve expected stale generated provenance/content-hash validator failures caused by Gate 3 canonical changes.

### Remaining known limitations

- Lorehold is still uncertified.
- Generated files and semantic fixtures have been rebuilt/added by Gate 4, but they have not yet been committed as an immutable Gate 5 recovery candidate.
- Candidate-scope validation remains deferred until there is an exact candidate SHA to validate.
- Adjacent identities are not certified except Prismari, so Lorehold neighbor guidance should remain Lorehold-side and neutral until the neighboring packets receive their own CRIT-001 recovery.

## Gate 4 Generation and Validation

Gate 4 rebuilt generated artifacts from the Gate 3 canonical Lorehold remediation, regenerated semantic-readiness provenance, added Lorehold semantic fixtures, and ran the bounded Gate 4 validation suite. No Gate 5 candidate or certification commit was created.

### Gate 4 files changed

Generated files changed by the faction build:

- `data/factions.json`
- `data/placement-model.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `data/semantic-readiness-provenance.json`

Fixture file added:

- `research/fixtures/semantic-readiness/lorehold.semantic-fixtures.json`

Workflow/report files updated:

- `docs/incidents/recoveries/VM-506-lorehold-semantic-recovery.md`
- `docs/kanban/in-progress/VM-506-lorehold-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-12-1211-codex-vm506-lorehold-gate4-validation.md`

Gate 4 did not modify canonical Lorehold raw files after the Gate 3 handoff. The current worktree still contains the Gate 3 canonical raw-data changes, which remain intentionally uncommitted until Gate 5 candidate creation.

### Lorehold semantic fixtures

Added Contract v1.1 semantic fixtures for:

- Core inclusion.
- Mature / pressure behavior.
- Required-neighbor exclusion for `WR`, `QUANDRIX`, `PRISMARI`, `SILVERQUILL`, `WB`, `WU`, `RG`, and `WITHERBLOOM`.
- Nearest-collision ambiguity.
- Provenance chain preservation.

All fixture evidence uses substantive Lorehold claims and source IDs; no fixture requires browser ranking, recruiter output, score gaps, Hall/Crucible reachability, or live LLM execution.

### Generated propagation checks

- Lorehold is present in `data/factions.json`.
- Lorehold is present in `data/placement-model.json`.
- Lorehold recruiter context regenerated from canonical placement/profile data.
- `data/semantic-readiness-provenance.json` contains 150 Lorehold provenance entries.
- Provenance contains entries for Lorehold discriminator questions and `chatbot_guidance/how_to_recognize_match/0`.
- No Lorehold provenance entry uses a discovery or support record as semantic proof.
- A recruiter-context search found Lorehold claim IDs only in `evidence_claim_ids` metadata arrays, not in user-facing recruiter prose.

### Generated-diff isolation

Hash comparison of generated data with Lorehold omitted found no non-Lorehold semantic changes:

| Generated file | Result excluding Lorehold |
|---|---|
| `data/factions.json` | Unchanged |
| `data/placement-model.json` | Unchanged |
| `data/semantic-readiness-provenance.json` | Unchanged |

`data/factions.json`, `data/placement-model.json`, and `supabase/functions/guild-recruiter/faction-context.ts` appear in `git status` after the build; `git diff --name-status` reports content changes only for `data/semantic-readiness-provenance.json` among those generated consumers, with line-ending warnings for the generated JSON/TS files. They are still treated as generated files touched by Gate 4 and should remain in the Gate 5 candidate diff review.

### Gate 4 validation results

| Command | Result |
|---|---|
| `npm.cmd run build:factions` | Passed after rerun with sandbox escalation for generated-file writes. |
| `node research/validate-semantic-readiness.mjs --targets=LOREHOLD` | Passed. |
| `npm.cmd run validate:source-generated -- --targets=LOREHOLD` | Passed with 1 known builder-owned inhibitor warning and 0 failures. |
| `npm.cmd run test:semantic-readiness` | Passed. |
| `npm.cmd run test:placement` | Passed: 37 factions, 37 golden paths. |
| `npm.cmd run test:faction-context-isolation` | Passed. |
| `npm.cmd run dossier:audit` | Passed after rerun with sandbox escalation for ignored artifact write; 113 warnings, 0 failures. |
| JSON parse check for changed generated/fixture JSON files | Passed. |
| `git diff --check` | Passed with line-ending warnings only. |

Known warnings:

- Source/generated validation still reports the existing builder-owned Lorehold inhibitor warning for `Presentism; dismisses old evidence, elders, artifacts, and tradition as irrelevant dead weight.` This was not changed by Gate 4.
- Dossier audit still reports 113 warnings and 0 failures. Gate 4 did not attempt dossier-warning remediation.

Deferred to Gate 5:

- Candidate recovery commit.
- Candidate-scope validation against the exact candidate SHA.
- Full `npm.cmd test`, if required by candidate-stage convention.
- `npm.cmd run test:parser`, if required by candidate-stage convention.
- Independent Gate 5 review and certification.

### Gate 4 status

Lorehold is ready for Gate 5 candidate creation and exact-SHA review, subject to owner authorization. Lorehold remains uncertified.

## Validation Commands Run

```powershell
git status --short --branch
node -e "for (const f of ['data/raw-factions/lorehold/lorehold.claims.json','data/raw-factions/lorehold/lorehold.profile.json','data/raw-factions/lorehold/lorehold.placement.json','data/raw-factions/lorehold/lorehold.changelog.json']) JSON.parse(require('fs').readFileSync(f,'utf8')); console.log('json ok')"
npm.cmd run audit:semantic-readiness -- --targets=LOREHOLD
node research/validate-semantic-readiness.mjs --targets=LOREHOLD
git log --date=short --pretty=format:"%h %ad %s" -- data/raw-factions/lorehold/lorehold.claims.json data/raw-factions/lorehold/lorehold.sources.json data/raw-factions/lorehold/lorehold.profile.json data/raw-factions/lorehold/lorehold.placement.json docs/reference/strixhaven-college-source-readiness-matrix.md
git diff --check
```

Results:

- `git status --short --branch`: current branch remains `codex/vm-506-lorehold-semantic-recovery`; only Lorehold canonical raw files and VM-506 workflow/report docs are changed.
- JSON parse check: passed for changed Lorehold canonical files.
- `npm.cmd run audit:semantic-readiness -- --targets=LOREHOLD`: passed; read-only; reports 88 substantive claims, 7 discovery records, 2 support records, 0 unclassified claims, no missing references, and no potential role-invalid support links.
- `node research/validate-semantic-readiness.mjs --targets=LOREHOLD`: exits 1 as expected before Gate 4; remaining findings are stale/missing generated provenance and missing identity semantic fixtures.
- Git history inspection completed.
- `git diff --check`: passed.

Deferred:

- No generated rebuild, full test suite, parser test, or source/generated validation was run because this was Gate 3 canonical remediation only and generated files must remain untouched until Gate 4.

## Final Status

Lorehold is active under VM-506 and remains uncertified.

Recommended next owner decision: authorize Gate 5 candidate creation and exact-SHA independent review if the current Gate 4 output is accepted.

Prismari remains certified under CRIT-001 Contract v1.1. No other identity was started.
