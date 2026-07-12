# VM-503 — Quandrix Semantic Recovery

Identity: QUANDRIX / Quandrix College
Branch: `codex/vm-503-quandrix-semantic-recovery`
Starting SHA audited: `41e27da9b9fe324eec5f63f26e9dd8d08a06edf9`
Gate: Gate 1 audit complete; Gate 2 evidence confirmation complete
Certification state: not certified

## Executive Summary

Quandrix shares the thin Strixhaven packet defect pattern that CRIT-001 exposed. The packet has useful official-source footing for the basic college identity, but it is not semantically ready under Contract v1.1.

Verified structural facts:

- 18 claim records.
- 15 source rows.
- 3 claim-bearing sources.
- 10 discovery-only story-corpus sources.
- 2 support-only product/card-data sources.
- 4 discriminator questions.
- 0 claims with explicit certifying `semantic_role` fields.
- Structural audit classifies the packet as `low-volume-pattern`, `mixed-role-pattern`, `discovery-heavy-pattern`, and `support-heavy-pattern`.

Audit interpretation:

- Six records are likely substantive after review: `quandrix_claim_001` through `quandrix_claim_006`.
- Ten story-corpus records, `quandrix_claim_0007` through `quandrix_claim_0016`, are discovery/search records. They identify matched files and query terms; they do not extract story facts.
- Two records, `quandrix_claim_0017` and `quandrix_claim_0018`, are support-only product/card-data records.
- Authoritative profile, placement, core-value, behavioral-signal, mechanics, and generated-provenance chains currently cite discovery records as semantic proof.
- Commander/product support rows are partly bounded in prose, but they still appear in authoritative identity-basis or key-figure chains without Contract v1.1-safe auxiliary isolation.
- The existing six likely substantive claims are enough to preserve the central Quandrix seed — green-blue numeromancy, mathematical pattern, fractals/symmetry, and found-versus-made math tension — but they are not enough to certify the full packet, generated public prose, recruiter guidance, required dimensions, and neighbor boundaries without a bounded claim-extraction pass.

Primary disposition: **Claim-extraction pass required.**

Gate 2 evidence completion is required, but should be bounded. The likely next step is not broad new source discovery; it is evidence confirmation and claim extraction from already-listed official sources, plus careful review of already-listed discovery sources only where Gate 1 blockers require story/character/mechanics evidence.

## Worktree Preservation Statement

Gate 1 began on branch `codex/vm-503-quandrix-semantic-recovery` at `41e27da9b9fe324eec5f63f26e9dd8d08a06edf9`. The CRIT worktree was clean before audit documentation. The original dirty `main` worktree at `C:\dev\mtgSiteWIP` was inspected read-only and remains unchanged with the pre-existing VM-496/shared dirty files.

No Quandrix canonical raw data, generated files, Hall/Crucible content, scoring, inhibition, confidence, scheduling, tie ordering, or global recruiter behavior was modified.

## Scope and Non-Goals

In scope:

- Read-only Contract v1.1 audit of Quandrix canonical, generated, provenance, recruiter, readiness, and history surfaces.
- Gate 1 disposition and bounded blocker list.
- VM-503 report/card/handoff workflow documentation.

Out of scope:

- Canonical remediation.
- Generated rebuild.
- Semantic fixture creation.
- Runtime calibration.
- Hall/Crucible/scoring/inhibition changes.
- Broad lore enrichment.
- Starting Silverquill, Witherbloom, Izzet, or any other identity.

## Files and Records Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-12-1307-codex-vm506-lorehold-certification.md`
- `docs/handoffs/2026-07-12-1102-codex-vm502-prismari-certification.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-503-quandrix-semantic-recovery.md`
- `docs/incidents/CRIT-001-faction-semantic-readiness-integrity.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/reference/strixhaven-college-source-readiness-matrix.md`
- `data/raw-factions/quandrix/quandrix.claims.json`
- `data/raw-factions/quandrix/quandrix.sources.json`
- `data/raw-factions/quandrix/quandrix.profile.json`
- `data/raw-factions/quandrix/quandrix.placement.json`
- `data/raw-factions/quandrix/quandrix.changelog.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- relevant Git history for Quandrix raw packet and Strixhaven readiness files

## Historical Context

| Commit | Date | Change | Gate 1 interpretation |
|---|---|---|---|
| `f6a1dd4` | 2026-05-12 | Added adaptive runtime, generated faction model/schema, raw faction provenance, and Supabase recruiter context. | Quandrix entered during the original adaptive/raw-packet wave. |
| `18f5112` | 2026-05-14 | Completed batch 1 foundation. | Early foundation existed before CRIT-001 semantic-role requirements. |
| `8cf7702` | 2026-06-12 | Published verified source-bound cleanup bundle. | Strixhaven source roles and paired collisions were improved under legacy readiness. |
| `9322e58` | 2026-06-13 | Published source-bound cleanup bundle. | VM-378-style support-only richness was added for non-Lorehold colleges, including Quandrix product/card support. |
| `9773bf0` | 2026-07-11 | Established CRIT-001 semantic recovery governance. | Legacy ready states became non-certifying until audited under the new contract. |
| `41e27da` | 2026-07-12 | Accepted Lorehold certification and activated Quandrix. | Current Gate 1 base. |

The changelog records that the first-pass Quandrix package added exactly six claims and that a later corpus upgrade added ten story-corpus search records. It also records manual review required for direct story citations and deeper character-specific claims. That history aligns with the current defect: useful source discovery was preserved, but much of it was not converted into substantive claims.

## Claim-Role Audit

Canonical explicit state: all 18 claims lack certifying `semantic_role` fields, so Contract v1.1 validation fails before any packet can be certified.

Audit-only proposed role classification:

| Role | Count | Audit confidence | Notes |
|---|---:|---|---|
| `substantive_claim` | 6 | High | `quandrix_claim_001` through `quandrix_claim_006` are likely substantive: identity, magic/patterns, philosophy, mascot/fractals, study areas, and placement interpretation. They still need explicit roles and bounded evidence localization before certification. |
| `discovery_record` | 10 | High | `quandrix_claim_0007` through `quandrix_claim_0016` record MTG-Stories archive matches and search terms. They are discovery leads, not extracted story facts. |
| `support_record` | 2 | High | `quandrix_claim_0017` and `quandrix_claim_0018` are product/card-data support. They can support product/navigation/card anchors but cannot prove identity meaning. |
| `unclassified` | 0 audit estimate / 18 canonical blockers | High | Audit can classify every record conceptually, but canonical data still lacks explicit `semantic_role`; all 18 must be remediated before certification. |

Claim quality notes:

- `quandrix_claim_001` is basic identity and is useful but too narrow to support philosophy or behavior alone.
- `quandrix_claim_002` and `quandrix_claim_003` are the strongest core claims: mathematician-mages, patterns/fractals/symmetries, fundamental forces, and found-versus-made mathematics.
- `quandrix_claim_004` supports fractal mascot material, but does not by itself support broader mechanics or personality claims.
- `quandrix_claim_005` supports academic domains from the 2026 guide, including geometry, statistics, biology, physics, architecture, logic, and theoretical metaphysics.
- `quandrix_claim_006` is explicitly a Vox Mana placement interpretation. It can support placement language if bounded as interpretation, but it cannot replace direct evidence for mature/unhealthy behavior, failure pressure, or character examples.
- Discovery records are repetitive by design: each records a source match and query terms rather than extracted source meaning.
- Support records are properly cautious in their own notes, but downstream uses are not consistently isolated as auxiliary.

Does Quandrix share Prismari's thin 18-claim pattern? **Yes.** It has the same broad shape: six likely substantive records, ten discovery/search records, and two support-only records. This is not proof that the concept is wrong; it is proof that current evidence modeling is thin and discovery-heavy.

## Discovery-Record Audit

Discovery/search records are being used as semantic proof.

Actual blockers:

- `profile.core_identity.claim_ids` points only to discovery records `quandrix_claim_0007` through `quandrix_claim_0014`.
- `profile.site_surface.claim_ids`, `profile.structure.claim_ids`, `profile.great_tension.claim_ids`, and `profile.mechanics.claim_ids` all cite discovery records.
- `placement.placement_summary.claim_ids` cites discovery records, even though it also has a separate `evidence_claim_ids` array with the six likely substantive claims.
- `placement.placement_axes/0`, `moral_and_psychological_profile`, `core_values/0` through `/9`, `behavioral_signals/0`, and `inhibitor_traits/0` cite discovery records.
- Generated provenance preserves the same discovery-backed chains for `QUANDRIX`, including `/core_values/*`, `/behavioral_signals/0`, `/profile/core_identity`, `/profile/site_surface`, `/profile/structure`, `/profile/great_tension`, and `/profile/mechanics`.

The discovery records are useful bibliography/research leads. They are blockers only because authoritative fields consume them as if they were substantive evidence.

## Potential Role-Invalid Support-Link Audit

| File | JSON pointer | Statement / consumer | Cited claim/source | Problem | Severity |
|---|---|---|---|---|---|
| `data/raw-factions/quandrix/quandrix.profile.json` | `/core_identity` | Core identity summary/philosophy/tension | `quandrix_claim_0007`-`0014` | Discovery records are used as core identity proof. | BLOCKER |
| same | `/site_surface` | Tagline/display summary | `quandrix_claim_0007`-`0010` | Discovery records support player-facing identity text. | BLOCKER |
| same | `/structure` | College of Numeromancy study structure | `quandrix_claim_0007`-`0010` | Discovery records support institutional/structure prose already better supported by official claims. | BLOCKER |
| same | `/great_tension` | Found-versus-made math tension | `quandrix_claim_0007`-`0011` | Discovery records support the central philosophical tension. | BLOCKER |
| same | `/mechanics` | Mana/counters/fractals/scaling/doubling/play pattern | `quandrix_claim_0007`-`0010` | Search-term records do not prove mechanics/play pattern. | BLOCKER |
| same | `/key_figures/1`, `/key_figures/2` | Zimone / Primo product anchors | `quandrix_claim_0017` | Support-only product row sits inside key-figure chain; must be explicitly auxiliary or moved. | HIGH |
| same | `/canonical_flavor_text/0`-`/2` | Card flavor anchors | `quandrix_claim_0018` | Likely acceptable as auxiliary card support only, but must be explicitly non-semantic under Contract v1.1. | MEDIUM |
| same | `/commander_compass/identity_basis/supporting_claim_ids` | Owned themes and identity-basis support | `quandrix_claim_0017`, `quandrix_claim_0018` plus substantive claims | Support rows appear in an identity-basis chain; product/card support should be split or isolated. | BLOCKER |
| same | `/commander_compass/native_fit_commanders/*/source_basis` | Product commander source basis | `quandrix_claim_0017` | The local prose says support-only; may be a structural false positive if marked auxiliary during remediation. | MEDIUM |
| `data/raw-factions/quandrix/quandrix.placement.json` | `/placement_summary` | Placement summary | discovery `claim_ids`; substantive `evidence_claim_ids` | Mixed chain; discovery records must be removed or explicitly made discovery metadata. | BLOCKER |
| same | `/placement_axes/0` | Pattern Proof vs Intuition | `quandrix_claim_0007`-`0014` | Axis rationale is corpus-search text, not extracted meaning. | BLOCKER |
| same | `/moral_and_psychological_profile` | Behavioral scoring summary | `quandrix_claim_0007`-`0011` | Discovery records do not support psychology/behavior. | BLOCKER |
| same | `/core_values/0`-`/9` | Values are literal search terms: Quandrix, Kianne, Imbraham, Zimone, Nev, fractal, patterns, theory, learn | `quandrix_claim_0007`-`0009` | Search-term list is modeled as core values. | BLOCKER |
| same | `/behavioral_signals/0` | Story-context evidence signal | `quandrix_claim_0007`-`0012` | Search matches are presented as behavioral evidence. | BLOCKER |
| same | `/inhibitor_traits/0` | Generic color-pair overfit | `quandrix_claim_0007`-`0010` | Useful guardrail, but current proof chain is discovery-only. | BLOCKER |

False-positive notes:

- Some support-only Commander/card surfaces are conceptually valid as auxiliary product/navigation support. They are not false positives until remediated because the current structure does not consistently carry Contract v1.1 `auxiliary_support` semantics.
- `profile.data_quality.corpus_upgrade` is non-authoritative metadata in spirit; if made explicit as discovery metadata, it can likely remain without blocking certification.

## Profile Entailment Audit

| Section | Status | Rationale |
|---|---|---|
| `profile` | PASS WITH NON-BLOCKING LIMITATION | The top-level profile cites the six likely substantive records and is directionally supported, but claims need explicit roles and bounded evidence localization. |
| `core_identity` | FAIL | Correct-sounding summary/tension, but claim chain points only to discovery records. |
| `site_surface` | FAIL | Player-facing tagline is supported by discovery records instead of substantive claims. |
| `structure` | FAIL | Official-guide structure exists in claims, but this field cites discovery records. |
| `great_tension` | FAIL | Found-versus-made math tension is supported by `quandrix_claim_003`, but current field cites discovery records. |
| `historical_timeline` | PASS WITH NON-BLOCKING LIMITATION | Empty/limited; no Gate 1 blocker unless later required by remediation. |
| `key_figures` | PASS WITH NON-BLOCKING LIMITATION / HIGH | Imbraham is supported by official-guide claims; Zimone/Primo are product/navigation anchors and need auxiliary isolation. |
| `locations` | UNRESOLVED | No robust location modeling found beyond campus/card anchors. Not automatically required, but if generated public text uses location concepts they need proof. |
| `mechanics` | FAIL | Mechanic/play-pattern summary cites discovery records; current claims do not fully support mana/counters/scaling/doubling. |
| Mature expression | UNRESOLVED | Hinted by proof, precision, pattern recognition; not sufficiently extracted as behavior. |
| Unhealthy expression | UNRESOLVED | Negative guidance exists, but evidence basis is interpretive and thin. |
| Placement-facing summary | FAIL | Several profile placement surfaces rely on discovery records or support rows. |

## Placement Entailment Audit

| Surface | Status | Rationale |
|---|---|---|
| Positive guidance / ideal fit | PASS WITH NON-BLOCKING LIMITATION | Pattern recognition, proof, abstraction, and beauty in explanatory systems are directionally supported by claims 001-003/006; needs role/evidence mapping. |
| Negative guidance / poor fit | PASS WITH NON-BLOCKING LIMITATION | Anti-abstraction and dismissing evidence are plausible inversions, but should be grounded as placement interpretation. |
| Raw discriminator questions | PASS WITH NON-BLOCKING LIMITATION | `quandrix_q1`, `quandrix_q2`, Simic collision, and Izzet collision use likely substantive claims; support/weakening patterns are generic and should be tightened later. |
| Recruiter guidance | FAIL | `how_to_recognize_match`, `how_to_recognize_mismatch`, and uncertainty questions lack evidence mappings. |
| Placement summary | FAIL | Has a valid `evidence_claim_ids` chain, but also retains discovery-backed `claim_ids`. |
| Placement axes | FAIL | Uses corpus/search-match rationale as if it were extracted placement evidence. |
| Core values | FAIL | Literal search terms are modeled as core values. |
| Behavioral signals | FAIL | Corpus file names and search terms are treated as behavior. |
| Inhibitor traits | FAIL | Guardrail is conceptually useful but evidence chain is discovery-only. |
| Neighbor/collision guidance | PASS WITH NON-BLOCKING LIMITATION | Simic, Izzet, Prismari, Lorehold, and Witherbloom boundaries exist and mostly cite likely substantive claims; several need wording review and claim expansion. |

Unsupported or risky wording:

- `/collision_guidance/2` asks, “When a pattern is correct but lifeless...” This phrase was already identified during Prismari certification as frozen Quandrix-origin wording. It is not supported enough as a canonical claim about Quandrix or Prismari and should be reviewed during Quandrix remediation.
- Generated recruiter/faction prose uses “Esix” and “still trying to explain Esix” even though no current Quandrix raw claim names Esix. This is a generated/source-to-runtime traceability risk.

## Required Contract v1.1 Dimensions

| Dimension | Status | Rationale |
|---|---|---|
| Core identity | PASS WITH NON-BLOCKING LIMITATION | Supported by six likely substantive official-source claims, but canonical role/evidence fields are missing and several duplicate profile fields cite discovery records. |
| Internal tension | PASS WITH NON-BLOCKING LIMITATION | Found-versus-made mathematics is present and strong, but current authoritative field cites discovery records. |
| Motivation | UNRESOLVED | Implied by knowledge/pattern/proof; not extracted enough as motivation. |
| Preferred method | PASS WITH NON-BLOCKING LIMITATION | Pattern, proof, abstraction, model logic, and precision are present; needs bounded evidence and clearer behavior mapping. |
| Mature expression | UNRESOLVED | Not sufficiently modeled beyond proof/precision. |
| Unhealthy expression | UNRESOLVED | Anti-fit language exists but is mostly interpretive and thin. |
| Failure or pressure behavior | FAIL | No clear grounded claims for how Quandrix responds under failure, uncertainty, criticism, or pressure. |
| Positive inclusion evidence | PASS WITH NON-BLOCKING LIMITATION | Exists, mostly through claims 001-003/006, but needs explicit mappings. |
| Negative exclusion evidence | PASS WITH NON-BLOCKING LIMITATION | Exists as interpretive anti-fit guidance, but evidence chain must be clarified. |
| Ambiguous or uncertainty evidence | FAIL | Two uncertainty prompts exist but lack evidence mappings and do not cover all key neighbors. |
| Required-neighbor boundaries | PASS WITH NON-BLOCKING LIMITATION | Boundaries exist for Simic, Izzet, Prismari, Lorehold, and Witherbloom; they need traceable mapping and wording review. |
| Source-to-runtime traceability | FAIL | Discovery-backed and support-backed chains propagate into generated provenance; generated public/recruiter prose includes unsupported or untraced language. |

## Required-Neighbor Audit

Bounded required-neighbor set for Quandrix:

- `UG` / Simic Combine: same green-blue color identity and biological/system overlap.
- `UR` / Izzet League: abstract/intellectual experimentation and model/prototype collision.
- `PRISMARI`: same Strixhaven cohort; pattern/beauty/expression/proof collision; existing paired collision.
- `LOREHOLD`: same Strixhaven cohort; theory/proof versus material history/evidence; existing paired collision and Lorehold certified neighbor.
- `WITHERBLOOM`: same Strixhaven cohort and living-systems overlap; existing paired collision.
- `WU` / Azorius Senate: proof/model/order/procedure overlap appears in generated/routing context, but current canonical Quandrix guidance does not directly cover it; treat as optional unless Gate 2 finds active ambiguity.

| Neighbor | Required? | Positive Quandrix evidence | Exclusion / boundary evidence | Ambiguity handling | Gate 1 status |
|---|---|---|---|---|---|
| `UG` Simic | Yes | Claims 001-003 support abstract pattern/proof. | `collision_quandrix_vs_simic_combine_placement_ready` separates abstract model from organism adaptation. | Existing question `q_quandrix_9801`. | Needs role/evidence mapping; likely sufficient after remediation. |
| `UR` Izzet | Yes | Claims 001-003 support proof/model orientation. | Existing collision separates model/proof from prototype/explosion. | Existing question `q_quandrix_9802`. | Needs role/evidence mapping; Izzet not certified yet. |
| `PRISMARI` | Yes | Claims 002/003/005/006 support proof/model/study distinction. | Existing collision separates model/proof from expressive art. | Existing collision question, but “correct but lifeless” wording needs review. | HIGH wording/evidence concern. |
| `LOREHOLD` | Yes | Claims 002/003/005/006 support abstract/theoretical side. | Existing collision separates model/theory from records/relics/material history. | Existing collision question. | Lorehold side certified; Quandrix side needs remediation. |
| `WITHERBLOOM` | Yes | Claims 002/003/005/006 support abstract living-systems study. | Existing collision separates equation from embodied life/death essence. | Existing collision question. | Needs mapping; Witherbloom not certified yet. |
| `WU` Azorius | Conditional | Proof/order overlap possible. | No direct Quandrix canonical boundary found. | None. | Optional; record as non-blocking unless Gate 2 finds recurrent ambiguity. |

Do not perform a 37-by-37 comparison.

## Generated Propagation Audit

Generated consumers inspected:

- `data/factions.json`
- `data/placement-model.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `data/semantic-readiness-provenance.json`

Findings:

- Generated placement model preserves Quandrix identity, discriminator questions, collision guidance, and lateral inhibition targets.
- Recruiter context exposes Quandrix public prose, affinity, discriminator questions, good/poor fit indicators, and generated guidance.
- Provenance contains 48 Quandrix entries.
- Provenance entries for `/core_values/0` through `/core_values/9`, `/behavioral_signals/0`, `/core_identity`, `/site_surface`, `/structure`, `/great_tension`, and `/mechanics` point to discovery records.
- `data/factions.json` and recruiter context contain richer legacy/generated prose such as “Math is magic,” Esix-related language, and named Commander/gameplay archetype language that is not fully traceable to current six substantive claims.
- Internal claim IDs do appear in generated JSON/provenance and in internal context structures where expected. Gate 1 did not find evidence that they are leaking as user-facing recruiter prose, but public generated faction data includes support chains and should be reviewed after canonical remediation.

Generated propagation status: **FAIL for certification** because generated provenance carries discovery-backed semantic chains and generated public/recruiter content contains unsupported or insufficiently traced language.

## Maturity / Thin-Packet Test

Verdict: **Thin-packet pattern confirmed; claim extraction and conceptual expansion required.**

Why:

- Quandrix has the same 18-claim / 15-source / 3-claim-bearing / 10-discovery / 2-support structure as the other thin non-Lorehold colleges.
- The six likely substantive claims capture a viable conceptual seed but not a certifiable identity packet.
- Discovery/search records are promoted into authoritative profile and placement proof chains.
- Support-only product/card data appears in identity-basis or key-figure chains without enough auxiliary isolation.
- Required Contract v1.1 dimensions such as mature expression, unhealthy expression, failure/pressure behavior, and uncertainty handling are not sufficiently extracted.
- Generated surfaces are more vivid than the current claim model can prove.

This does not mean Quandrix is wrong. It means current Quandrix is under-extracted and under-modeled relative to the CRIT-001 readiness contract.

## Findings by Severity

### BLOCKER

1. All 18 claims lack explicit certifying `semantic_role`.
2. Discovery/search records support authoritative profile chains: `/core_identity`, `/site_surface`, `/structure`, `/great_tension`, and `/mechanics`.
3. Placement fields use discovery/search records as semantic proof: `/placement_summary`, `/placement_axes/0`, `/moral_and_psychological_profile`, `/core_values/0`-`/9`, `/behavioral_signals/0`, and `/inhibitor_traits/0`.
4. Literal story-corpus search terms are modeled as placement core values.
5. Recruiter match/mismatch/uncertainty guidance lacks evidence mappings.
6. Support-only records appear in authoritative identity-basis/key-figure chains without Contract v1.1 auxiliary isolation.
7. Generated provenance preserves discovery-backed semantic chains.
8. Required semantic fixtures are missing.
9. Failure/pressure behavior and uncertainty handling are not sufficiently grounded.

### HIGH

1. Existing six substantive-seeming claims are too few to certify all generated/prose surfaces.
2. `collision_quandrix_vs_prismari_placement_ready` contains “correct but lifeless” wording that needs evidence review.
3. Generated public/recruiter content includes unsupported or insufficiently traced Esix/archetype/decree prose.
4. Required-neighbor mappings need explicit evidence and neutral wording.

### MEDIUM

1. Imbraham is source-backed as an official guide speaker, but the packet does not provide enough character-specific evidence beyond that anchor.
2. Card flavor anchors are probably safe as auxiliary support, but need explicit auxiliary provenance boundaries.
3. Mechanics/play-pattern language may be valid product/gameplay texture but needs substantive mechanics claims or narrowing.

### LOW

1. Legacy readiness matrix says “Ready after VM-346,” but CRIT-001 warning already supersedes legacy ready language.
2. Structural fingerprint reports no missing references; that is useful but not semantic readiness.

### NON-BLOCKING OBSERVATION

1. The existing official guide/product sources probably can support a better Quandrix packet without broad external discovery.
2. The 2026 guide source is already present and likely useful for study-area/method distinctions.
3. Story-corpus discovery rows may become useful after source reading, but they should not be treated as claims until extracted.

## Primary Disposition

**Claim-extraction pass required.**

This is the narrowest accurate disposition. Quandrix does not appear to require complete reconstruction from scratch, but it cannot be certified through light role/provenance cleanup alone. It needs a bounded extraction/modeling pass that converts existing official and already-identified sources into substantive claims covering the Contract v1.1 blockers.

## Minimal Bounded Repair List

### Required for certification

1. Add explicit `semantic_role` to all 18 claims.
2. Preserve `quandrix_claim_0007` through `quandrix_claim_0016` as discovery records unless source reading extracts new substantive claims.
3. Preserve `quandrix_claim_0017` and `quandrix_claim_0018` as support records and isolate them in auxiliary product/card support fields.
4. Add bounded evidence localization to all remediated substantive claims.
5. Extract or add substantive claims for:
   - core identity;
   - internal tension;
   - motivation and preferred method;
   - mature expression;
   - unhealthy expression;
   - failure/pressure behavior;
   - mechanics/play-pattern if retained;
   - required-neighbor boundaries.
6. Remove discovery records from authoritative profile and placement proof chains.
7. Replace search-term core values with source-backed conceptual values or remove them.
8. Repair placement axes, moral/psychological profile, behavioral signals, and inhibitor traits so they cite substantive claims only.
9. Add evidence mappings to recruiter-facing match, mismatch, and uncertainty guidance.
10. Review and repair the Prismari boundary wording, especially “correct but lifeless.”
11. Ensure support/product Commander Compass and card-flavor content is auxiliary and cannot prove identity meaning.
12. Rebuild generated artifacts and provenance in Gate 4 only after Gate 3 canonical remediation.
13. Add required semantic fixtures after remediation.

### Optional / non-blocking

1. Promote story-corpus sources into substantive story/character claims only if Gate 2 confirms they directly resolve a readiness blocker.
2. Add richer character treatment for Imbraham, Kianne, Zimone, or Nev only if supported by bounded source review.
3. Consider a future Azorius/WU boundary only if audit evidence shows real ambiguity.

### Out of scope for CRIT-001

1. Hall scheduling or Crucible reachability.
2. Scoring, confidence, tie ordering, and lateral-inhibition calibration.
3. Live recruiter outcome testing.
4. Exhaustive Strixhaven lore enrichment.
5. Commander legality, popularity, metagame, or deck-quality claims.

## Gate 2 Recommendation

Gate 2 is required.

Recommended Gate 2 scope:

- Bounded evidence confirmation for the exact blockers above.
- Prefer existing canonical sources first:
  - `src_wotc_planeswalkers_guide_strixhaven_2021`
  - `src_wotc_strixhaven_product_page_2021`
  - `src_wotc_planeswalkers_guide_secrets_strixhaven_2026`
- Use story-corpus discovery sources only where a specific missing Contract dimension or required-neighbor boundary requires story/character evidence.
- Do not perform broad external source discovery unless existing sources cannot support a blocker.

## Gate 2 Evidence Confirmation

Gate 2 remained evidence-confirmation only. No Quandrix canonical raw data, generated artifacts, semantic fixtures, Hall/Crucible content, scoring, inhibition, confidence, scheduling, tie ordering, global recruiter behavior, recovery candidate, certification commit, or other identity was modified.

### Gate 2 conclusion

Gate 2 confirms the Gate 1 disposition: **claim-extraction pass required**.

Targeted source discovery is **not required right now**. The next remediation can be bounded to already-listed official sources:

- `src_wotc_planeswalkers_guide_strixhaven_2021`
- `src_wotc_strixhaven_product_page_2021`
- `src_wotc_planeswalkers_guide_secrets_strixhaven_2026`

The ten story-corpus records should remain discovery-only unless Gate 3 intentionally extracts a specific story/character fact needed for certification. Current certification blockers can be resolved by classifying existing records, extracting new bounded substantive claims from already-listed official sources, removing discovery/support records from authoritative chains, and narrowing unsupported generated/profile/placement prose.

### Claim-role mapping summary

| Claim ID | Current type | Proposed semantic role | Reason | Needs bounded evidence localization? | May support profile / placement / guidance / provenance? |
|---|---|---|---|---|---|
| `quandrix_claim_001` | `identity` | `substantive_claim` | Official sources identify Quandrix as Strixhaven's green-blue College of Numeromancy. | Yes. Use 2021 guide Quandrix section and/or product page college summary. | Yes: core identity, site label, placement identity seed. |
| `quandrix_claim_002` | `magic` | `substantive_claim` | Official guide supports mathematician-mages, patterns, fractals, symmetries, and fundamental forces. | Yes. Use 2021 guide Quandrix college section. | Yes: philosophy, methods, placement positives, neighbor boundaries, provenance. |
| `quandrix_claim_003` | `philosophy` | `substantive_claim` | Official guide directly frames found-versus-made mathematics through Imbraham's quote. | Yes. Use 2021 guide Quandrix quote and dichotomy section. | Yes: internal tension, raw questions, uncertainty, neighbor boundaries. |
| `quandrix_claim_004` | `mascot` | `substantive_claim` | Official guide identifies Fractals as Quandrix mascots and explains formulaic artificial life. | Yes. Use 2021 guide College Mascot: Fractals section. | Yes, but narrowly: fractal mascot / artificial-life texture, not broad personality. |
| `quandrix_claim_005` | `academics` | `substantive_claim` | 2026 guide supports study areas and curriculum domains. | Yes. Use 2026 guide Quandrix study-area section. | Yes: institutional/academic role, methods, neighbor boundaries. |
| `quandrix_claim_006` | `placement` | `substantive_claim` | Vox Mana placement interpretation derived from official Quandrix evidence; can support placement if clearly labeled as project synthesis. | Yes. Evidence locations must cite underlying official sources and mark interpretation level. | Yes: placement summary, positive/negative guidance, fixtures, provenance. |
| `quandrix_claim_0007` | `story_corpus_evidence` | `discovery_record` | Records that “Blue-Green Ribbons” matched search terms; does not extract source facts. | No unless converted into a new separate substantive story claim. | No semantic support. May remain discovery metadata only. |
| `quandrix_claim_0008` | `story_corpus_evidence` | `discovery_record` | Records that “Episode 4: Put to the Test” matched search terms only. | No unless converted into a new separate substantive story claim. | No semantic support. May remain discovery metadata only. |
| `quandrix_claim_0009` | `story_corpus_evidence` | `discovery_record` | Records that “The Math of More” matched search terms only. | No unless converted into a new separate substantive story claim. | No semantic support. May remain discovery metadata only. |
| `quandrix_claim_0010` | `story_corpus_evidence` | `discovery_record` | Records that “Episode 1: Penmanship Practice” matched search terms only. | No unless converted into a new separate substantive story claim. | No semantic support. May remain discovery metadata only. |
| `quandrix_claim_0011` | `story_corpus_evidence` | `discovery_record` | Records that “Episode 4: Something to Offer” matched search terms only. | No unless converted into a new separate substantive story claim. | No semantic support. May remain discovery metadata only. |
| `quandrix_claim_0012` | `story_corpus_evidence` | `discovery_record` | Records that “Off the Record” matched search terms only. | No unless converted into a new separate substantive story claim. | No semantic support. May remain discovery metadata only. |
| `quandrix_claim_0013` | `story_corpus_evidence` | `discovery_record` | Records that “The Chains That Bind” matched search terms only. | No unless converted into a new separate substantive story claim. | No semantic support. May remain discovery metadata only. |
| `quandrix_claim_0014` | `story_corpus_evidence` | `discovery_record` | Records that “Don't Go Past the Old Dark House” matched search terms only. | No unless converted into a new separate substantive story claim. | No semantic support. May remain discovery metadata only. |
| `quandrix_claim_0015` | `story_corpus_evidence` | `discovery_record` | Records that “Field Studies in a Future Tense” matched search terms only. | No unless converted into a new separate substantive story claim. | No semantic support. May remain discovery metadata only. |
| `quandrix_claim_0016` | `story_corpus_evidence` | `discovery_record` | Records that “Episode 4: Don't Give Up” matched search terms only. | No unless converted into a new separate substantive story claim. | No semantic support. May remain discovery metadata only. |
| `quandrix_claim_0017` | `commander_product_support` | `support_record` | Official decklist verifies Quandrix Unlimited product facts only. It does not prove lore, placement meaning, popularity, legality, or metagame quality. | No for support-only use; yes only if a separate substantive claim is extracted from another source. | Auxiliary product/navigation support only. |
| `quandrix_claim_0018` | `card_flavor_anchor_support` | `support_record` | Local Scryfall card data verifies selected card anchors by card metadata. | No for support-only card metadata; yes only if a separate substantive card-flavor claim is created with bounded source text. | Auxiliary card/flavor-anchor support only. |

### Proposed claim-extraction plan

Gate 3 should add new substantive claims only where they are required to support canonical statements. Proposed IDs below are placeholders for planning only; do not treat them as canonical IDs until remediation.

| Proposed claim purpose | Existing source to read first | Bounded locator | Required dimension / consumer | Scope | Required? |
|---|---|---|---|---|---|
| Quandrix mages are nature mathematicians who study patterns, fractals, symmetries, and fundamental mathematics; they can summon fractal creatures or turn theories into spiraling structures. | `src_wotc_planeswalkers_guide_strixhaven_2021` | Quandrix College section, “The College of Numeromancy”; current web lines 302-308. | Core identity, method, site surface, placement summary, positive guidance. | Identity-wide direct source fact. | Required. |
| Quandrix visibly lives in the overlap between theoretical and natural through repeated elements, symmetries, and surprising geometry. | `src_wotc_planeswalkers_guide_strixhaven_2021` | Quandrix College section; current web line 308. | Internal tension, profile philosophy, Prismari/Lorehold/Simic boundaries. | Identity-wide direct source fact. | Required. |
| Green-aligned Quandrix brings numerical possibilities to life, creates physical reality from mathematical possibilities, and includes mana scholars studying leylines, snarls, spellcasting, and mana phenomena. | `src_wotc_planeswalkers_guide_strixhaven_2021` | The Dichotomy of Quandrix, Green subsection; current web lines 313-314. | Internal tension, method, Simic/Witherbloom boundary, mechanics if retained. | Subgroup/side-specific direct source fact. | Required if profile keeps green-side/natural-world claims. |
| Blue-aligned Quandrix pursues abstraction, theory, conjecture, possibility, patterns, optical illusions, infinite repeating patterns, and fundamental reality work. | `src_wotc_planeswalkers_guide_strixhaven_2021` | The Dichotomy of Quandrix, Blue subsection; current web lines 316-318. | Internal tension, preferred method, raw questions, Izzet/Prismari/Lorehold boundaries. | Subgroup/side-specific direct source fact. | Required. |
| Quandrix locations materially express theory, suspended rules, fractal growth, and mathematical space through Torus Hall, the Arithmodrome, and the Cultivarium. | `src_wotc_planeswalkers_guide_strixhaven_2021` | Locations and College Mascot: Fractals; current web lines 321-335. | Locations, mechanics/flavor anchors, profile structure, generated public prose if retained. | Location/mechanics-specific direct source fact. | Required only if generated/profile location or campus-material prose is retained. |
| Quandrix mages render theory into physical form, bend numbers to reshape nature, and often work at the intersection of practical and theoretical roles such as architecture and engineering. | `src_wotc_planeswalkers_guide_secrets_strixhaven_2026` | Quandrix section; current web lines 266-269. | Motivation, mature expression, theory/practice integration, recruiter match guidance. | Identity-wide direct source fact. | Required. |
| Quandrix field studies ground theory in reality through observation, practical experimentation, research sites, city planning, natural restoration, quiet nature experiments, and real-world application. | `src_wotc_planeswalkers_guide_secrets_strixhaven_2026` | Field Studies subsection; current web lines 278-281. | Mature expression, pressure behavior, positive guidance, Lorehold/Witherbloom/Simic boundaries. | Identity-wide direct source fact with possible subgroup nuance. | Required. |
| The Paradox Gardens are a Quandrix research site for strange natural phenomena, optimized/perfected natural environments, living experiments, rule-bound hazards, and testing cause/effect of the natural order. | `src_wotc_planeswalkers_guide_secrets_strixhaven_2026` | Paradox Gardens section; current web lines 427-445. | Failure/pressure behavior, unhealthy expression, risk boundary, location if retained. | Location-specific direct source fact; project synthesis required for unhealthy/pressure use. | Required if Gate 3 wants grounded pressure/unhealthy evidence without story-corpus extraction. |
| Product overview corroborates Quandrix as College of Numeromancy whose mages study patterns, fractals, symmetries, and fundamental forces of nature. | `src_wotc_strixhaven_product_page_2021` | Colleges of Strixhaven / Quandrix; current web lines 124-128. | Core identity corroboration, public summary. | Official product summary. | Optional corroboration. |
| Quandrix mechanics/play texture should be framed as numeromancy, fractals, scaling/growth, and theory-made-physical only where directly supported by official guide/product/card support. | 2021 guide first, then support records `0017`/`0018` only as auxiliary | 2021 guide lines 307, 313-335; support records for card/product identifiers only. | Mechanics, Commander Compass, generated public faction content. | Project synthesis over direct and support evidence. | Required if mechanics summary remains. |

No proposed claim should convert search terms alone into meaning. Story-corpus claims should be used only as leads unless Gate 3 performs bounded source reading and creates separate substantive claims with localized evidence.

### Discovery-record replacement plan

| Current statement or chain | Invalid discovery records | Existing claim support? | Replacement / extraction plan | Source discovery needed? |
|---|---|---|---|---|
| `profile.core_identity.summary` | `0007`-`0014` | `001` supports identity; `002`/`003` support philosophy/tension; `006` supports placement interpretation. | Preserve summary but replace chain with `001`-`003` plus proposed nature-mathematician and theory/nature claims if wording stays broad. | No. |
| `profile.core_identity.philosophy` | `0007`-`0014` | `002`, `003`, `006` partially support. | Preserve/narrow to mathematical structure, pattern, fundamental forces, model/reveal/reshape only after adding 2021/2026 extracted claims. | No. |
| `profile.site_surface.tagline` | `0007`-`0010` | `002`, `003`, `006` partially support. | Preserve if tied to new nature-mathematician / theory-practice claims; otherwise narrow to “patterns, models, and fundamental forces.” | No. |
| `profile.structure.summary` | `0007`-`0010` | `001`, `002`, `005` support much of it. | Replace discovery chain with `001`, `002`, `005`, plus proposed 2021/2026 academic/method claims. | No. |
| `profile.great_tension.summary` | `0007`-`0011` | `003` directly supports found-versus-made math; proposed green/blue-side claims strengthen it. | Preserve, cite `003` plus new green/blue-side claims. | No. |
| `profile.mechanics.summary` | `0007`-`0010` | `004` supports fractals; `002` supports patterns/fractals/symmetries; `0017`/`0018` auxiliary only. | Preserve only after adding a mechanics/play-texture substantive synthesis claim; otherwise narrow to fractals/scaling/theory-made-physical. | No. |
| `placement.placement_summary.claim_ids` | `0007`-`0014` | `001`-`006` already listed in `evidence_claim_ids`. | Remove discovery `claim_ids`; preserve/narrow summary with `001`-`006` and new extracted claims. | No. |
| `placement.placement_axes/0` | `0007`-`0014` | `002`, `003`, `006` support pattern/proof axis. | Replace corpus-search rationale with source-backed proof/model/theory-practice rationale; cite existing and new claims. | No. |
| `placement.moral_and_psychological_profile` | `0007`-`0011` | `006` supports faction-specific scoring; needs project synthesis. | Preserve as placement interpretation; cite `006` plus new method/mature expression claims. | No. |
| `placement.core_values/0`-`/9` | `0007`-`0009` | Existing claims support concepts, not search terms. | Remove literal search-term values or replace with source-backed values: numeromancy, patterns/fractals, proof/model, theory-practice integration, fundamental forces, mathematical nature. | No. |
| `placement.behavioral_signals/0` | `0007`-`0012` | `002`, `003`, `006` support real behavioral signals only if rewritten. | Replace story-file signal with source-backed behaviors: asks for model, grounds theory, follows pattern/proof, applies theory to reality. | No. |
| `placement.inhibitor_traits/0` | `0007`-`0010` | `006` plus current collision guidance partially support. | Preserve as project guardrail but cite substantive claims and neighbor-specific claims; no runtime inhibition change. | No. |
| Generated provenance chains for discovery-backed fields | Same as above | Same as above after Gate 3. | Gate 4 rebuild should regenerate provenance after canonical chains are repaired. | No. |

### Support-record isolation plan

| Support record | Current use | Gate 3 disposition |
|---|---|---|
| `quandrix_claim_0017` | `profile.key_figures/1` and `/2`; `commander_compass.identity_basis.supporting_claim_ids`; native commander `source_basis` chains. | Keep as `support_record`. It may support exact deck/product facts for Zimone, Infinite Analyst; Primo, the Unbounded; and Quandrix Unlimited. Remove from authoritative identity-basis support chains or move into explicit auxiliary/support-only fields. Do not use it as lore, placement, legality, power, popularity, or identity proof. |
| `quandrix_claim_0018` | `profile.canonical_flavor_text/*`; `commander_compass.identity_basis.supporting_claim_ids`. | Keep as `support_record`. It may support exact card metadata and short flavor-anchor summaries only. Remove from identity-basis support chains or isolate as auxiliary card support. Do not use it to prove faction philosophy or placement behavior unless Gate 3 creates a separate bounded substantive card-flavor claim. |

The current native commander source-basis fields already contain support-only warnings; they can likely remain if Gate 3 makes the auxiliary boundary explicit and prevents support records from satisfying semantic readiness.

### Profile support plan

| Profile section | Existing claim support | Missing support | Gate 3 support plan | Preserve / narrow / remove |
|---|---|---|---|---|
| Core identity | `001`, `002`, `003`, `006` | Current canonical chain points to discovery records. | Replace discovery IDs with `001`-`003` and new official-source claims for nature mathematicians/theory-made-physical. | Preserve. |
| Philosophy | `002`, `003`, `006` | Needs bounded evidence for “reveal, model, and reshape.” | Add 2021/2026 extracted claims for patterns, fundamental forces, theory into physical form, and theory grounded in reality. | Preserve but keep interpretation labeled. |
| Internal tension | `003` | Current field cites discovery records; green/blue side evidence not extracted. | Cite `003`; add green-side and blue-side claims from the 2021 dichotomy section. | Preserve. |
| Institutional/academic role | `001`, `005` | Needs 2026 support for applied mathematics, engineering, matter sciences, environmental design and practical/theoretical roles. | Cite `005`; add 2026 academic/field-study claims. | Preserve. |
| Key figures | Imbraham uses `001`-`004`; Zimone/Primo use `0017`. | Imbraham has speaker/Dean-of-Theory support but no deeper biography; Zimone/Primo are product anchors only. | Keep Imbraham as official guide speaker; keep Zimone/Primo only as auxiliary product/navigation anchors unless new source evidence is extracted. | Preserve with narrower boundaries. |
| Locations | No robust existing section beyond generated/card/location prose. | Torus Hall, Arithmodrome, Cultivarium, Paradox Gardens are not claim-modeled. | Add location-specific claims only if location/generated prose is retained. | Conditional; remove unsupported generated prose or support it. |
| Mechanics | `002`, `004` partly; `0017`/`0018` auxiliary. | Mana/counters/doubling/scaling/play-pattern summary is under-supported as written. | Add mechanics/play-texture synthesis from 2021 guide fractals/increase/multiply and support-only product/card data; narrow unsupported game terms if needed. | Preserve only if narrowed/supported. |
| Mature expression | `006` partly. | Need evidence for theory grounded in reality, practical application, observation/experimentation, city planning/restoration, architecture/engineering. | Add 2026 field-study and theory-practice claims. | Add/preserve as grounded placement interpretation. |
| Unhealthy expression | None direct. | Need bounded risk/failure evidence. | Use 2026 Paradox Gardens and “heads-down/preoccupied” evidence only as bounded project synthesis; avoid unsupported pathology. | Add cautiously or keep minimal. |
| Placement-facing summary | `001`-`006` partially. | Discovery chains and generated overreach. | Replace discovery chains; cite substantive claims and proposed extracted claims. | Preserve/narrow. |

### Placement support plan

| Placement section | Existing claim support | Missing support | Gate 3 support plan | Preserve / narrow / remove |
|---|---|---|---|---|
| Placement summary | `001`-`006` in `evidence_claim_ids`; discovery IDs in `claim_ids`. | Discovery records in proof chain. | Remove discovery chain; cite `001`-`006` plus new extracted method/mature claims. | Preserve/narrow. |
| Core values | Discovery IDs only. | Current values are search terms, not values. | Replace with source-backed values such as numeromancy, mathematical patterns, theory/practice integration, proof/model, fractal growth, fundamental forces. | Replace. |
| Behavioral signals | First item discovery-backed; later string items have no claim IDs. | Needs claim-backed behavior. | Replace with claim-backed signals: asks for underlying model, values precision/proof, grounds theory in reality, sees natural systems mathematically. | Replace/expand. |
| Positive guidance | Implicit in chatbot strings; no evidence IDs. | Explicit mappings missing. | Add `evidence_claim_ids` to each match item; use existing and proposed claims. | Preserve with mappings. |
| Negative guidance | Implicit in chatbot strings; no evidence IDs. | Some anti-fit phrasing needs project-synthesis support. | Add evidence mappings and narrow: rejects abstraction/proof/modeling, treats evidence as irrelevant, or demands only immediate practical payoff. | Preserve/narrow. |
| Uncertainty guidance | Two uncertainty questions; no evidence IDs. | Mapping missing and nearest-collision ambiguity not fully represented. | Map `quandrix_q1` to pattern/proof claims; map `quandrix_q2` to found-versus-made tension; add neighbor-oriented uncertainty only if required. | Preserve, possibly add mappings only in Gate 3. |
| Raw discriminator questions | Claims `001`-`003`; collision questions mapped. | Generic support/weakening patterns; Prismari wording risk. | Keep q1/q2 if claims localized; tighten answer patterns in Gate 3 only if needed. Review Prismari collision wording. | Preserve/narrow. |
| Neighbor guidance | Existing for Simic, Izzet, Prismari, Lorehold, Witherbloom. | Needs bounded evidence and neutral wording. | Cite existing/proposed Quandrix claims plus already certified neighbor evidence where available. | Preserve/narrow. |
| Recruiter-facing guidance | No evidence mappings. | Evidence IDs missing. | Add `evidence_claim_ids` to match/mismatch/uncertainty guidance after claims exist. | Preserve/narrow. |

### Recruiter guidance evidence mapping plan

| Guidance item | Existing/proposed support | Missing evidence gap | Gate 3 action |
|---|---|---|---|
| Match: “notices hidden structures and repeatable patterns” | Existing `002`, `003`, `006`; proposed nature-mathematician and theory-practice claims. | Needs localized official evidence. | Add mappings directly after claims are localized. |
| Match: “likes proof, abstraction, and technical precision” | Existing `002`, `003`, `006`; proposed blue-side abstraction/proof claim. | “Technical precision” should be tied to proof/model/theory, not generic intelligence. | Add mappings; narrow if needed. |
| Match: “finds beauty in systems that explain the world” | Existing `003` partly; proposed blue-side “beautiful patterns / optical illusions” and theory/nature overlap claims. | “Beauty” needs explicit support or must be narrowed to “finds meaning/elegance in explanatory systems.” | Add mapping only if supported by new claim; otherwise narrow. |
| Mismatch: “rejects abstraction as useless by default” | Existing `003`, `006`; proposed theory/practice integration claim. | Negative is an inverse placement inference. | Add evidence mapping with interpretation-level/project-synthesis labeling. |
| Mismatch: “chooses intuition while dismissing evidence” | Existing `006`; proposed observation/practical experimentation claim. | Needs careful wording: official evidence supports observation/experimentation, not a general anti-intuition doctrine. | Narrow and map to project-synthesis claim. |
| Mismatch: “needs immediate practical payoff before a question feels worthwhile” | Existing `003`, `006`; proposed field-study theory-grounding claim. | Quandrix includes practical application, so this must mean rejecting theoretical inquiry unless payoff is immediate. | Narrow before mapping. |
| Uncertainty: “What pattern have you noticed that other people tend to miss?” | Existing `002`, `003`, `006`; proposed pattern/nature claim. | None after localization. | Add evidence IDs. |
| Uncertainty: “Do you trust a model because it predicts the world, or because it reveals what the world really is?” | Existing `003`; proposed green/blue-side claims. | None after localization. | Add evidence IDs. |

### Provenance repair plan

| Affected chain/category | Invalid evidence | Replacement plan | Can repair without new source discovery? |
|---|---|---|---|
| Profile `core_identity`, `site_surface`, `structure`, `great_tension` | Discovery claims `0007`-`0014`. | Replace with existing `001`-`006` plus new official-source claims from 2021/2026 guides. | Yes. |
| Profile `mechanics` | Discovery claims `0007`-`0010`. | Add mechanics/play-texture claim or narrow to `002`/`004` plus auxiliary support. | Yes. |
| Placement `placement_summary`, `placement_axes`, `moral_and_psychological_profile` | Discovery claims `0007`-`0014`. | Replace with substantive claims and project-synthesis placement claims. | Yes. |
| Placement `core_values` | Discovery claims and search-term values. | Replace values and citations with source-backed conceptual values. | Yes. |
| Placement `behavioral_signals` | Discovery claims and story-file references. | Replace with source-backed behavioral signals. | Yes. |
| Placement `inhibitor_traits` | Discovery claims. | Cite substantive claims and keep as project guardrail; do not change runtime inhibition. | Yes. |
| Commander Compass identity basis | Support claims `0017`, `0018` mixed into semantic chain. | Remove from authoritative identity basis or move to auxiliary support fields; preserve product/card support separately. | Yes. |
| Generated public/recruiter content with Esix/archetype/decree language | No current substantive Quandrix claim names or supports Esix. | Either add bounded substantive support from existing source if found, or remove/narrow generated source text during Gate 3/4. | Likely yes if removed/narrowed; source discovery only if owner wants to retain Esix-specific public language. |

### Required-neighbor evidence plan

| Neighbor | Why required | Positive Quandrix evidence | Negative/exclusion evidence | Ambiguous/uncertainty evidence | Existing/proposed support | Evidence gap |
|---|---|---|---|---|---|---|
| `UG` / Simic Combine | Same green-blue color identity and living-systems overlap. | Quandrix uses abstract mathematical models, fractals, symmetries, theory, and fundamental forces. | Suppress when answer centers biological improvement, organism adaptation, mutation, or specimen change. | Current collision asks proof/model versus organism adaptation. | Existing `001`-`003`; proposed green-side/nature-math and theory-made-physical claims. | Simic side awaits its own certification; Quandrix side can be repaired now. |
| `UR` / Izzet League | Intellectual experimentation and model/prototype collision. | Quandrix proves/models patterns and theory; 2026 source supports grounding theory in reality. | Suppress when answer centers volatile prototype, invention, explosion, or chaotic iteration. | Current collision asks elegant model versus loud prototype. | Existing `002`, `003`, `006`; proposed theory/practice claims. | Izzet side awaits certification; Quandrix wording can be neutralized now. |
| `PRISMARI` | Same Strixhaven cohort; pattern/beauty/expression/proof collision. | Quandrix centers proof/model/theory and mathematical structure. | Prismari centers artistic/elemental expression; do not say Quandrix patterns are “lifeless.” | Current collision exists but “correct but lifeless” must be removed or neutralized. | Existing `002`, `003`, `005`, `006`; proposed blue-side/pattern claims; certified Prismari evidence available. | Wording gap, not source discovery gap. |
| `LOREHOLD` | Same Strixhaven cohort; theory/proof versus material history/evidence. | Quandrix trusts abstract model, proof, theory, mathematical nature. | Lorehold centers material history, artifacts, records, relics, and field evidence. | Current collision question is likely usable after mapping. | Existing `002`, `003`, `005`, `006`; Lorehold is certified. | No new source discovery required. |
| `WITHERBLOOM` | Same Strixhaven cohort and living-system/nature overlap. | Quandrix abstracts living systems into patterns, proof, mathematical nature, and environmental design. | Witherbloom centers embodied life/death exchange, remedies, poisons, pests, fieldwork, essence. | Current collision question is usable after mapping/narrowing. | Existing `002`, `003`, `005`, `006`; proposed 2026 field-study/environmental design claims. | Witherbloom side awaits certification; Quandrix side can be repaired now. |

Conditional neighbor:

- `WU` / Azorius remains non-blocking. Proof/order/procedure overlap is plausible, but current canonical Quandrix guidance and Gate 1 evidence do not justify adding it to `required_neighbors` during VM-503.

### Exact Gate 3 remediation checklist

#### Required for certification

1. Add explicit `semantic_role` to all 18 existing Quandrix claims.
2. Mark `quandrix_claim_001` through `quandrix_claim_006` as `substantive_claim`.
3. Mark `quandrix_claim_0007` through `quandrix_claim_0016` as `discovery_record`.
4. Mark `quandrix_claim_0017` and `quandrix_claim_0018` as `support_record`.
5. Add bounded `evidence_locations` to `001`-`006`.
6. Add the minimal new substantive claims listed above from already-listed official sources.
7. Remove discovery records from authoritative profile chains: `/core_identity`, `/site_surface`, `/structure`, `/great_tension`, `/mechanics`.
8. Remove discovery records from authoritative placement chains: `/placement_summary`, `/placement_axes/0`, `/moral_and_psychological_profile`, `/core_values/*`, `/behavioral_signals/0`, `/inhibitor_traits/0`.
9. Replace literal search-term core values with source-backed conceptual values, or remove values that cannot be supported.
10. Replace story-file behavioral signal prose with source-backed behavior.
11. Isolate `0017` and `0018` as auxiliary support only; remove them from authoritative identity-basis proof chains.
12. Preserve Zimone/Primo only as support-only product/navigation anchors unless new bounded lore evidence is extracted.
13. Add evidence mappings to recruiter match, mismatch, and uncertainty guidance.
14. Record required-neighbor mappings for `UG`, `UR`, `PRISMARI`, `LOREHOLD`, and `WITHERBLOOM`.
15. Remove or neutralize unsupported `correct but lifeless` wording in the Prismari collision.
16. Remove or support generated/public Esix and untraced archetype/decree language at the canonical source; do not hand-edit generated files.
17. Add or prepare semantic fixtures after canonical remediation so Gate 4 can validate them.
18. Update Quandrix changelog/readiness evidence to describe the bounded Contract v1.1 remediation.

#### Optional / non-blocking

1. Extract story/character claims from `0007`-`0016` only if needed after the official-source repair.
2. Add Imbraham, Kianne, Zimone, Nev, Tanazir, Adrix, or Esix detail only if bounded source evidence is reviewed and the generated surface truly needs it.
3. Add a future Azorius/WU boundary only if later evidence shows active ambiguity.

#### Out of scope for CRIT-001 / VM-503 Gate 3

1. Runtime Hall/Crucible scheduling, reachability, scoring, confidence, tie ordering, or lateral-inhibition calibration.
2. Live recruiter behavior or global recruiter prompt tuning.
3. Broad Strixhaven lore enrichment.
4. Commander legality, popularity, deck power, metagame claims, or recommendation ranking.
5. Any remediation for Prismari, Lorehold, Silverquill, Witherbloom, Simic, Izzet, or other identities.

## Validation Commands Run

```powershell
git status --short --branch
git rev-parse --abbrev-ref HEAD
git rev-parse HEAD
git merge-base --is-ancestor 41e27da9b9fe324eec5f63f26e9dd8d08a06edf9 HEAD
git -C C:\dev\mtgSiteWIP -c safe.directory=C:/dev/mtgSiteWIP status --short --branch
npm.cmd run audit:semantic-readiness -- --targets=QUANDRIX
node research/validate-semantic-readiness.mjs --targets=QUANDRIX
git log --date=short --pretty=format:"%h %ad %s" -- data/raw-factions/quandrix/quandrix.claims.json data/raw-factions/quandrix/quandrix.sources.json data/raw-factions/quandrix/quandrix.profile.json data/raw-factions/quandrix/quandrix.placement.json docs/reference/strixhaven-college-source-readiness-matrix.md
rg -n "Esix|Tanazir|Adrix|Doubling Season|Zimone Quandrix Prodigy|Kianne|Imbraham|correct but lifeless|proof|model|supporting_claim_ids|evidence_use|auxiliary_support" data/raw-factions/quandrix data/factions.json data/placement-model.json supabase/functions/guild-recruiter/faction-context.ts docs/reference/strixhaven-college-source-readiness-matrix.md
node -e "JSON.parse(require('fs').readFileSync('docs/incidents/CRIT-001-identity-recovery-ledger.json','utf8')); console.log('ledger ok')"
git diff --name-only -- data/raw-factions/quandrix data/factions.json data/placement-model.json supabase/functions/guild-recruiter/faction-context.ts data/semantic-readiness-provenance.json
git diff --check
```

Results:

- Branch confirmed: `codex/vm-503-quandrix-semantic-recovery`.
- Starting SHA confirmed: `41e27da9b9fe324eec5f63f26e9dd8d08a06edf9`.
- Base ancestry confirmed.
- Original dirty main worktree remains unchanged.
- Structural audit completed read-only and reported 18 claims, 15 sources, 3 claim-bearing sources, 10 discovery records, 2 support records, 6 unclassified records, no missing references, and 28 potential role-invalid support links.
- Semantic-readiness validation failed as expected for Gate 1 because Quandrix lacks semantic roles, recruiter guidance evidence mappings, substantive authoritative references, and semantic fixtures.
- Git history inspection completed.
- Gate 2 evidence confirmation completed without editing canonical or generated Quandrix files.
- Ledger JSON parses successfully after workflow updates.
- Diff check passed with only Git LF/CRLF working-copy warnings.
- No diffs exist under `data/raw-factions/quandrix/`, `data/factions.json`, `data/placement-model.json`, `supabase/functions/guild-recruiter/faction-context.ts`, or `data/semantic-readiness-provenance.json`.
- Existing official source pages were consulted only to identify bounded locator candidates for already-listed source IDs:
  - `src_wotc_planeswalkers_guide_strixhaven_2021`: Quandrix section, dichotomy, locations, and fractals mascot.
  - `src_wotc_strixhaven_product_page_2021`: Colleges of Strixhaven / Quandrix summary.
  - `src_wotc_planeswalkers_guide_secrets_strixhaven_2026`: Quandrix section, field studies, and Paradox Gardens.

Commands intentionally deferred:

- `npm.cmd run build:factions`
- `npm.cmd run validate:source-generated -- --targets=QUANDRIX`
- full `npm.cmd test`
- parser tests
- generated rebuild/provenance regeneration

These are Gate 4/Gate 5 activities and would be premature during a read-only Gate 1 audit.

## Final Status

Quandrix is active under VM-503 and remains uncertified. Gate 1 audit and Gate 2 bounded evidence confirmation are complete. Gate 3 canonical remediation has not started. No canonical Quandrix files or generated artifacts were changed. Prismari and Lorehold remain certified `semantically_ready` under CRIT-001 Contract v1.1. No other identity was started.

## Gate 3 Canonical Remediation

Gate 3 canonical remediation is complete as of 2026-07-12. This was a canonical-only remediation pass; generated artifacts were not rebuilt and remain deferred to Gate 4.

### Canonical files changed

- `data/raw-factions/quandrix/quandrix.claims.json`
- `data/raw-factions/quandrix/quandrix.profile.json`
- `data/raw-factions/quandrix/quandrix.placement.json`
- `data/raw-factions/quandrix/quandrix.changelog.json`

No Quandrix generated files were changed in Gate 3.

### Blocker-by-blocker remediation

| Gate 1 / Gate 2 blocker | Gate 3 remediation |
|---|---|
| All 18 existing claims lacked certifying `semantic_role`. | Added `semantic_role` to all 18 existing claims. Existing `001`-`006` are `substantive_claim`; `0007`-`0016` remain `discovery_record`; `0017`-`0018` remain `support_record`. |
| Existing substantive claims lacked bounded evidence localization. | Added bounded `evidence_locations` to existing substantive claims `001`-`006`. |
| Existing sources/claims were too thin for Contract v1.1 dimensions. | Added 10 minimal substantive claims (`0019`-`0028`) from already-listed official source IDs only; no new source discovery was performed. |
| Discovery records supported authoritative profile chains. | Replaced discovery-backed `core_identity`, `site_surface`, `structure`, `great_tension`, and `mechanics` claim chains with substantive claims. |
| Discovery records supported authoritative placement chains. | Replaced discovery-backed `placement_summary`, `placement_axes`, `moral_and_psychological_profile`, `core_values`, `behavioral_signals`, and `inhibitor_traits` chains with substantive claims. |
| Search-term-backed core values were not semantic values. | Replaced literal search terms with source-backed conceptual values: numeromancy, patterns/fractals, proof/models, theory made physical, scale/multiplication, grounded inquiry, and responsible uncertainty. |
| Recruiter match/mismatch/uncertainty guidance lacked evidence mappings. | Added `semantic_guidance_evidence` mappings for current match, mismatch, and uncertainty guidance. |
| Product/card support records were mixed into identity-basis proof. | Removed `0017` and `0018` from authoritative commander-compass identity support and isolated them in auxiliary support fields. Native product commander source-basis records are explicitly `auxiliary_support`. |
| Prismari boundary contained unsupported `correct but lifeless` wording. | Replaced with neutral proof/model versus medium/elemental-expression wording; retained `lateral_inhibition: false`. |
| Required-neighbor coverage needed bounded selection and traceable mapping. | Recorded required-neighbor evidence for `UG`, `UR`, `PRISMARI`, `LOREHOLD`, and `WITHERBLOOM`. |
| Generated/public Esix or archetype language lacked canonical support. | Did not add unsupported Esix claims. Recorded as a Gate 4 generated-diff verification item: rebuild must remove, narrow, or prove any generated Esix/archetype wording from canonical data. |

### Claims by semantic role after remediation

| Role | Count | IDs |
|---|---:|---|
| `substantive_claim` | 16 | `quandrix_claim_001`-`006`, `quandrix_claim_0019`-`0028` |
| `discovery_record` | 10 | `quandrix_claim_0007`-`0016` |
| `support_record` | 2 | `quandrix_claim_0017`, `quandrix_claim_0018` |
| `unclassified` | 0 | none |

### Discovery records retained

`quandrix_claim_0007` through `quandrix_claim_0016` remain in the packet as discovery-only story-corpus leads. They are no longer used as authoritative semantic proof in the remediated Quandrix profile or placement files.

### Support records retained

`quandrix_claim_0017` and `quandrix_claim_0018` remain support-only records for official product/navigation and local card-data anchors. They are isolated as auxiliary support and do not support identity, philosophy, placement, or recruiter guidance semantics.

### New substantive claims added

- `quandrix_claim_0019` - mathematical structure made magical/actionable.
- `quandrix_claim_0020` - theoretical mathematics joined to natural form.
- `quandrix_claim_0021` - green-side subgroup evidence for natural mathematical possibility.
- `quandrix_claim_0022` - blue-side subgroup evidence for abstract theory and underlying structure.
- `quandrix_claim_0023` - locations/mascot evidence for mathematical space and fractal growth.
- `quandrix_claim_0024` - 2026 guide evidence for nature mathematicians, theory made physical, and practical/theoretical work.
- `quandrix_claim_0025` - field-study evidence for grounded mature expression.
- `quandrix_claim_0026` - bounded risk/pressure evidence from Paradox Gardens.
- `quandrix_claim_0027` - official product-page identity corroboration.
- `quandrix_claim_0028` - placement synthesis distinguishing math-structured scaling/proof from generic UG growth, invention, or aesthetics.

### Required-neighbor mappings recorded

Required neighbors selected: `UG`, `UR`, `PRISMARI`, `LOREHOLD`, `WITHERBLOOM`.

- `UG` / Simic: same-color living-systems overlap; Quandrix requires model/proof/math evidence.
- `UR` / Izzet: experiment/prototype overlap; Quandrix requires proof/model before invention-first framing.
- `PRISMARI`: beauty/form overlap; Quandrix uses form as proof/model while Prismari centers medium and expression.
- `LOREHOLD`: mystery/investigation overlap; Quandrix leads with mathematical model while Lorehold leads with material record/history.
- `WITHERBLOOM`: natural-system overlap; Quandrix abstracts/model-proves while Witherbloom centers embodied life/death exchange.

### Items deferred to Gate 4

- Rebuild generated faction artifacts from the remediated canonical packet.
- Regenerate semantic-readiness provenance.
- Add or validate Quandrix semantic fixtures.
- Verify generated public content, including any Esix/archetype language, is removed, narrowed, or supported by canonical evidence.
- Verify source/generated parity for `QUANDRIX`.
- Verify generated consumers contain no discovery/support proof chains or internal ID leakage.
- Run Gate 4 regression and generated-diff isolation checks.

### Remaining known limitations

- Story-corpus records remain discovery leads until directly extracted in a future bounded pass.
- Simic, Izzet, Witherbloom, and other non-certified neighboring identities still await their own CRIT-001 recovery; Quandrix-side neighbor evidence was repaired only from the Quandrix packet.
- Runtime Hall/Crucible/scoring/scheduling/inhibition behavior remains out of scope.

### Gate 3 final state

Gate 3 is complete. Quandrix remains uncertified and is not ready for Gate 5. Gate 4 generation, provenance, fixture, and regression validation is required next.

### Gate 3 validation results update

Commands run after canonical remediation:

```powershell
git status --short --branch
node -e "JSON.parse(...)"  # JSON parse checks for changed Quandrix canonical files and ledger
npm.cmd run audit:semantic-readiness -- --targets=QUANDRIX
node research/validate-semantic-readiness.mjs --targets=QUANDRIX
git diff --name-only -- data/factions.json data/placement-model.json supabase/functions/guild-recruiter/faction-context.ts data/semantic-readiness-provenance.json
rg -n "correct but lifeless|quandrix_claim_0007|..." data/raw-factions/quandrix/quandrix.profile.json data/raw-factions/quandrix/quandrix.placement.json
git diff --check
```

Results:

- JSON parse checks passed for changed Quandrix canonical files and the CRIT-001 JSON ledger.
- Structural audit passed for Gate 3 shape: 28 claims, 16 `substantive_claim`, 10 `discovery_record`, 2 `support_record`, 0 `unclassified`, no missing references, no potential role-invalid support links.
- Semantic-readiness validation failed only on expected Gate 4 items: stale/missing generated provenance and missing Quandrix semantic fixtures. This is expected because Gate 3 did not rebuild generated artifacts or provenance.
- Generated-file isolation check showed no diffs in `data/factions.json`, `data/placement-model.json`, `supabase/functions/guild-recruiter/faction-context.ts`, or `data/semantic-readiness-provenance.json`.
- Discovery records appear only in the profile `data_quality.corpus_upgrade` discovery-metadata chain after Gate 3.
- Unsupported `correct but lifeless` wording is absent from remediated Quandrix profile/placement canonical files.
- `git diff --check` passed; Git reported only LF/CRLF working-copy warnings.

## Gate 4 Generation and Validation

Gate 4 was started on 2026-07-12. It initially blocked on unsupported generated Esix/public display copy, then completed after a bounded Quandrix-scoped display-source repair.

### Gate 4 work completed before blocker

- Added Quandrix semantic fixtures at `research/fixtures/semantic-readiness/quandrix.semantic-fixtures.json`.
- Ran `npm.cmd run build:factions`, which rebuilt generated faction artifacts from the current canonical data and wrote:
  - `data/placement-model.json`
  - `supabase/functions/guild-recruiter/faction-context.ts`
  - `data/semantic-readiness-provenance.json`
- Ran `npm.cmd run build:semantic-provenance`, which wrote `data/semantic-readiness-provenance.json` with 1386 entries.

### Validation completed before blocker

| Command | Result |
|---|---|
| `node research/validate-semantic-readiness.mjs --targets=QUANDRIX` | PASS |
| `npm.cmd run validate:source-generated -- --targets=QUANDRIX` | PASS with one known builder-owned inhibitor warning |
| `npm.cmd run test:semantic-readiness` | PASS |
| `npm.cmd run test:placement` | PASS: 37 factions, 37 golden paths |
| `npm.cmd run test:faction-context-isolation` | PASS |
| `node research/archscry-dossier-followup-tests.js` | PASS |
| `npm.cmd run dossier:audit` | PASS: 113 warnings, 0 failures |
| `npm.cmd run validate:semantic-candidate-scope` | Not runnable pre-candidate; script requires `--base`, `--target`, and `--identity` SHAs and is deferred to Gate 5. |

### Gate 4 blocker

Generated public and recruiter-facing Quandrix content still contains unsupported Esix language after rebuild:

- `data/factions.json` contains Esix-based philosophy/lore/core-tension/decree/archetype copy.
- `supabase/functions/guild-recruiter/faction-context.ts` contains the same unsupported Esix recruiter context.
- `data/identity-layers.json` contains at least one source line for generated Quandrix core-tension Esix wording, but that file is outside the allowed VM-503 Gate 4 change set.
- `research/build-faction-artifacts.mjs` preserves existing generated display content through `existingDisplay`, which appears to keep unsupported public richness alive even when the raw Quandrix packet does not support it. Builder changes are explicitly out of scope for Gate 4.

This prevents closing Gate 4 because the instruction required generated public Quandrix content, including Esix/archetype language, to be supported, narrowed, or safely isolated. The current generated output is not sufficiently supported by the remediated canonical Quandrix raw packet, and fixing the source would require owner authorization for files outside the Gate 4 allowed set.

### Initial Gate 4 blocked state (resolved later)

Gate 4 was blocked pending owner direction on whether VM-503 may modify the canonical/generated-display source for Quandrix Esix copy, such as `data/identity-layers.json`, and/or whether a separate VM-501/shared-builder correction is required for `existingDisplay` preservation behavior. No Gate 5 candidate should be created while this blocker remains. This historical blocker was resolved in the bounded Gate 4 blocker-resolution section below; Quandrix still requires explicit Gate 5 candidate-creation authorization.


## Gate 4 Blocker Resolution ? Unsupported Esix Generated Display Copy

Gate 4 blocker resolution was completed on 2026-07-12. Quandrix remains uncertified; no Gate 5 candidate commit was created.

### Exact blocker source

The unsupported Esix copy was not coming from the recovered Quandrix raw semantic packet as authoritative claim evidence. It came from two display-generation inputs:

- `data/identity-layers.json`: Quandrix `core_tension` contained the public line that the college's most honest answer is that Esix exists and they are not entirely sure why.
- `data/factions.json`: existing Quandrix display fields were preserved by `research/build-faction-artifacts.mjs` through the existing display-preservation path. The stale fields included Quandrix `philosophy`, `lore_summary`, `core_tension`, `decree_voice.example_decree`, and `staples.permanents`.

Generated copies then appeared in:

- `data/factions.json`
- `data/placement-model.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `data/semantic-readiness-provenance.json`

No builder behavior change was required. `research/build-faction-artifacts.mjs` was inspected only to confirm the display-preservation source path.

### Bounded correction applied

- Replaced only the Quandrix `core_tension` entry in `data/identity-layers.json` with source-backed mathematics/nature/model-building tension language.
- Repaired only Quandrix-scoped display-source fields in `data/factions.json` that were preserved by the existing builder convention.
- Removed `Esix Fractal Bloom` from the Quandrix public display permanent staples list.
- Rebuilt generated faction artifacts and semantic provenance from the corrected inputs.
- Did not change Contract v1.1, shared schemas, validators, builder scripts, Hall/Crucible content, scoring, inhibition, confidence, scheduling, tie ordering, or global recruiter behavior.

### Verification

The generated/public consumer scan after rebuild found no remaining unsupported Esix/archetype wording in:

- `data/factions.json`
- `data/placement-model.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `data/semantic-readiness-provenance.json`
- `data/identity-layers.json`

The only remaining Esix mentions are workflow notes in the Quandrix raw profile/changelog describing the historical Gate 4 verification requirement; they are not public semantic consumers or evidence chains.

Generated-diff isolation showed changed generated/display identity keys were Quandrix-only for `data/factions.json`, `data/placement-model.json`, and `data/identity-layers.json`. No non-Quandrix raw packet changed. No builder, contract, schema, validator, or VM-501 infrastructure file changed.

### Gate 4 validation after blocker resolution

| Command | Result |
|---|---|
| `npm.cmd run build:factions` | PASS |
| `npm.cmd run build:semantic-provenance` | PASS; wrote 1386 provenance entries |
| `node research/validate-semantic-readiness.mjs --targets=QUANDRIX` | PASS |
| `npm.cmd run validate:source-generated -- --targets=QUANDRIX` | PASS with one known builder-owned inhibitor warning |
| `npm.cmd run test:semantic-readiness` | PASS |
| `npm.cmd run test:placement` | PASS: 37 factions, 37 golden paths |
| `npm.cmd run test:faction-context-isolation` | PASS |
| `node research/archscry-dossier-followup-tests.js` | PASS |
| `npm.cmd run dossier:audit` | PASS: 113 warnings, 0 failures |
| Generated/display Esix scan | PASS for generated/public consumers |
| Generated-diff isolation check | PASS: changed generated/display keys are Quandrix-only |
| Non-Quandrix raw packet check | PASS: no non-Quandrix raw packet changed |
| Builder/contract/schema/validator diff check | PASS: no prohibited shared-infrastructure files changed |
| `git diff --check` | PASS with Git LF/CRLF working-copy warnings only |

### Known unchanged warnings

- The known builder-owned Quandrix inhibitor warning remains unchanged: one inhibitor trap is backed by the builder's model-owned biological prior rather than raw placement text.
- The dossier audit remains at 113 warnings and 0 failures.

### Gate 4 final state

Gate 4 is complete. The Esix/generated-display blocker is resolved. Quandrix remains uncertified and is ready for Gate 5 candidate creation when explicitly authorized.
