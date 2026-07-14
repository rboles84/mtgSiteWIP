# VM-507 Izzet Semantic Recovery

## Executive summary

Gate 1 audit only is complete for Izzet / UR under CRIT-001 Contract v1.1.

Primary disposition: **Source-linkage cleanup required**.

Izzet is not the same thin Strixhaven packet pattern seen in Prismari, Quandrix, Silverquill, and Witherbloom. It is a deeper, high-volume guild packet with 104 claim records, 26 source records, and 132 generated provenance entries for UR. Every current claim cites claim-bearing source records, and current generated provenance does not point to discovery-only or support-only source records.

However, Izzet is not semantically ready under Contract v1.1. The packet still has certification blockers:

- all 104 claims lack certifying `semantic_role`;
- substantive claims need bounded evidence localization before they can anchor proof chains;
- recruiter match, mismatch, and uncertainty guidance lacks evidence mappings;
- semantic fixtures are missing;
- `collision_guidance` is empty even though the packet already asks direct neighbor-boundary questions;
- generated/public Izzet display copy contains overbroad or edgy language that must be either traced to recovered canonical evidence or narrowed during remediation;
- support/product/rules material must remain auxiliary and not become authoritative identity proof.

Gate 2 bounded evidence confirmation is required. No broad online source discovery is recommended from Gate 1; the next pass should confirm roles, bounded locators, display-source wording, required-neighbor mappings, and fixture coverage from the existing Izzet packet and already-listed sources.

## Exact branch and SHA

- Branch: `codex/vm-507-izzet-semantic-recovery`
- Starting/current HEAD during Gate 1: `5bc25af194d2c7e14c4350d58c9b791775253734`
- Accepted program base: `5bc25af194d2c7e14c4350d58c9b791775253734`
- Canonical packet path used for audit: `data/raw-factions/izzet_league/`
- Prompt-listed `data/raw-factions/izzet/` path was not present; the ledger and card identify `UR` as `data/raw-factions/izzet_league/`.

## Worktree preservation statement

Preflight confirmed the active CRIT worktree path as `C:\dev\mtgSiteWIP-crit001` and branch as `codex/vm-507-izzet-semantic-recovery`.

The original main worktree at `C:\dev\mtgSiteWIP` was inspected only with read-only status checks. Its pre-existing dirty state was not modified.

No canonical Izzet raw files, generated artifacts, Hall/Crucible content, scoring, inhibition, confidence, scheduling, tie ordering, or global recruiter behavior were modified during Gate 1.

## Scope and non-goals

Gate 1 scope:

- inspect Izzet's existing canonical packet, generated consumers, provenance, local canon guides, validator expectations, and recent CRIT workflow records;
- classify blockers and risks under Contract v1.1;
- produce a bounded Gate 2 recommendation.

Not in scope:

- remediation;
- source discovery;
- generated rebuilds;
- semantic fixtures;
- candidate or certification commits;
- changing certified identities;
- runtime tuning or public behavior changes.

## Pre-flight review summary

Recent related work:

- VM-502 Prismari, VM-506 Lorehold, VM-503 Quandrix, VM-504 Silverquill, and VM-505 Witherbloom are certified `semantically_ready` under CRIT-001 Contract v1.1.
- VM-505 certification prepared Izzet as the next active identity only; no Izzet remediation had started.
- The CRIT ledger marks VM-507 / UR as active, with raw packet `data/raw-factions/izzet_league/`.

Current known risks:

- Izzet is high-volume, not thin, but all 104 claims remain unclassified for Contract v1.1.
- Existing public generated copy uses strong "mad science," ego, explosion, and volatility language that may be stale display copy or insufficiently bounded.
- Local ten-guild research flags Izzet's old `docs/research/canon/guilds/izzet/izzit_*` taxonomy files as off-template and not reliable as direct Izzet identity proof.
- The current packet leans on official sources plus repository archive captures; Gate 2 should confirm bounded locators and source-authority treatment before remediation.

Relevant decisions already made:

- Contract v1.1 requires semantic roles, bounded evidence, full source-to-runtime traceability, required-neighbor boundaries, and semantic fixtures.
- Frozen confidence, inhibition, scheduling, scoring, Hall, Crucible, and global recruiter behavior must not change in identity recovery.
- Display-source exceptions require explicit documentation when generated public copy must be corrected at an identity-scoped display source.

Files recently changed by prior CRIT stages:

- Certified identity packets and generated artifacts for Prismari, Lorehold, Quandrix, Silverquill, and Witherbloom.
- CRIT ledger, board, readiness matrix, and handoff records for those certifications.

What should not be touched:

- Any non-Izzet identity packet.
- Generated artifacts during Gate 1.
- Contract v1.1, schema, validators, builder scripts, Hall, Crucible, scoring, inhibition, confidence, scheduling, tie ordering, or global recruiter behavior.

## Claim-role audit

Structural counts from `data/raw-factions/izzet_league/izzet_league.claims.json`:

| Measure | Count |
|---|---:|
| Total claims | 104 |
| `core_identity` | 3 |
| `philosophy` | 4 |
| `structure` | 18 |
| `timeline` | 20 |
| `key_figure` | 22 |
| `location` | 9 |
| `relationship` | 4 |
| `mechanic` | 13 |
| `placement_support` | 11 |

Evidence/canon labels:

| Label | Count |
|---|---:|
| Direct canon | 49 |
| Rules-mechanics | 5 |
| Design commentary | 2 |
| Interpretation | 11 |
| Repository archive | 37 |
| Confirmed Canon | 50 |
| Rules-Supported | 5 |
| Card-Supported | 1 |
| Supported Interpretation | 11 |
| Repository Archive Supported | 37 |

Source-role structure:

| Source role | Count |
|---|---:|
| claim-bearing | 22 |
| discovery-only | 3 |
| support-only | 1 |

All 104 current claims cite only claim-bearing source records. No current claim directly cites the discovery-only or support-only source records.

Audit-only role summary:

| Role | Count | Audit confidence | Notes |
|---|---:|---|---|
| `substantive_claim` | 104 likely candidates | Medium-high | Current records are claim-like and source-backed, not search-corpus stubs. Some timeline, character, location, and role records should be scoped carefully so they support history/profile texture rather than overbroad placement proof. |
| `discovery_record` | 0 likely current claims | Medium | The packet has three discovery-only source records, but no claim records currently cite them. |
| `support_record` | 0 likely current claims | Medium | The packet has one support-only source record, but no claim records currently cite it. Product/rules support still needs auxiliary isolation where it touches mechanics or Commander Compass. |
| `unclassified` | 104 current validator state | High | Every claim lacks `semantic_role`; this blocks certification. |

Assessment:

- Izzet is genuinely deeper than the Strixhaven thin packets: 104 claims, 22 claim-bearing sources, detailed institutional/history/character/mechanics coverage, and no first-order discovery-source contamination in claims.
- The volume is not by itself readiness. Contract v1.1 still requires explicit claim roles, bounded evidence localization, and statement-to-runtime traceability.
- Some character, timeline, location, and mechanics records are meaningful identity evidence when tied to Izzet institution, method, pressure behavior, or story examples. They should not be used as generic proof of every placement claim.
- The 37 repository-archive-supported claims need Gate 2 source-authority review and bounded locators, especially where they support public guidance or pressure behavior.

## Discovery-record audit

Discovery-only source records:

- `src_izzet_league_0016` â€” `polarkac/MTG-Stories`
- `src_izzet_league_0020` â€” `Last Day`
- `src_izzet_league_0026` â€” `War of the Spark: Ravnica-Ashes`

Findings:

- No current claim directly cites a discovery-only source record.
- Current UR generated provenance has 132 rows and zero rows using non-claim-bearing source records.
- Discovery-only source records are harmless as bibliography/source-finding leads so long as they remain excluded from authoritative proof chains.
- Gate 2 should confirm that repository archive captures labeled claim-bearing are acceptable under the source-authority rules and have bounded locators.

Disposition: no direct discovery-record semantic proof blocker found, but source-linkage cleanup remains required.

## Support-record audit

Support-only source record:

- `src_izzet_league_0008` â€” `Rules`

Findings:

- No current claim directly cites the support-only source.
- Generated provenance rows for UR do not use the support-only source.
- Mechanics profile text is mostly claim-backed through official mechanic and card/source claims, but rules/product support must remain auxiliary and should not itself prove Izzet identity.
- Commander Compass deck/preference language is product-adjacent by design. It should remain auxiliary and must not be treated as canon proof of identity.

Potential support issue table:

| File | JSON pointer or line | Statement | Cited claim/source | Problem | Severity |
|---|---|---|---|---|---|
| `data/raw-factions/izzet_league/izzet_league.profile.json` | `/mechanics` and mechanics supporting metadata | Replicate, overload, jump-start, mizzium devices, and resonator network as Izzet mechanics/story-technology expression | Mechanics claims plus rules/product support context | Current claims appear substantive, but Gate 2 should ensure support-only rules/product material is auxiliary and not authoritative identity proof. | MEDIUM |
| `data/raw-factions/izzet_league/izzet_league.profile.json` | `/commander_compass/identity_basis` | Deck-facing phrases such as "reckless invention," "big explosive turns," and spell-copying preferences | Niv-Mizzet and product-adjacent support claims/sources | Useful Commander-facing guidance, but must remain auxiliary unless supported by substantive identity claims. | MEDIUM |

No actual support-record blocker was found in current provenance, but support isolation should be included in Gate 2 and Gate 3 planning.

## Profile entailment audit

| Section | Result | Notes |
|---|---|---|
| Core identity | PASS WITH NON-BLOCKING LIMITATION | Blue-red Ravnican guild, elemental magic, mizzium technology, civic engineering, volatile discovery, Niv-Mizzet, and Ral Zarek are well represented by claim-bearing sources. Needs semantic roles and bounded evidence localization. |
| Philosophy | PASS WITH NON-BLOCKING LIMITATION | "Invention as public benefit versus invention as obsession" is plausible as a supported interpretation. Gate 2 should confirm every phrase is bounded and does not overstate "obsession" or "spectacle." |
| Internal tension | PASS WITH NON-BLOCKING LIMITATION | Good conceptual axis: public benefit / infrastructure versus risky speed, spectacle, and ethically compromised experiments. Needs role-backed proof chain. |
| Guild/institutional role | PASS | Strong institutional coverage: dragon-led guild, public works, laboratories, guildmage/chemister roles, Nivix and infrastructure. |
| Key figures | PASS WITH NON-BLOCKING LIMITATION | Niv-Mizzet and Ral Zarek are strong. Several story-local figures are meaningful examples but should not be overused as global placement proof. |
| Locations | PASS WITH NON-BLOCKING LIMITATION | Nivix, Blistercoils, Boilerpits, and story locations are supportable profile texture. Some should remain location/profile evidence rather than placement discriminators. |
| Mechanics/play-pattern evidence | PASS WITH NON-BLOCKING LIMITATION | Replicate, overload, and jump-start are source-backed. Mizzium augmentation and resonator network are story technology, not standalone rules mechanics, and should be scoped accordingly. |
| Mature expression | UNRESOLVED | The packet implies useful innovation, crisis engineering, and infrastructure repair, but Gate 2 should confirm exact claims for mature expression. |
| Unhealthy expression | PASS WITH NON-BLOCKING LIMITATION | Risky/ethically compromised experiment examples exist, but should stay bounded to evidence and not become a caricature of "madness." |
| Failure or pressure behavior | PASS WITH NON-BLOCKING LIMITATION | Prototype failure, crisis engineering, and response under pressure are present; some use repository archive story examples requiring bounded locators. |
| Placement-facing summary | PASS WITH NON-BLOCKING LIMITATION | Canonical placement summary is mostly bounded. Generated public summary is stronger and needs display-source review. |

## Placement entailment audit

| Area | Result | Notes |
|---|---|---|
| Positive guidance | FAIL | Match guidance is useful but lacks `evidence_claim_ids` mappings. |
| Negative guidance | FAIL | Mismatch guidance lacks evidence mappings and includes broad contrasts with law, secrecy, biological evolution, martial protection, Rakdos, and Prismari. These need explicit claim support or narrowing. |
| Uncertainty guidance | FAIL | Uncertainty prompts lack evidence mappings and compare Izzet to proof, beauty, adaptation, law, protection, disruption, and hiding. Needs traceable support. |
| Raw discriminator questions | PASS WITH NON-BLOCKING LIMITATION | 13 questions exist and many are traceable in provenance, but wording should be checked for unsupported binaries around "explosive," "elegant," "beautiful," "disruptive," "safe," and neighbor stereotypes. |
| Neighbor guidance | FAIL | `collision_guidance` is empty. Required-neighbor boundaries are not explicitly mapped. |
| Collision guidance | FAIL | No collision rows exist despite current questions comparing Azorius, Boros, Quandrix, Dimir, Simic, Prismari, and Rakdos. |
| Recruiter-facing guidance | FAIL | Generated and raw guidance lack evidence mappings. Public copy also contains strong "mad science"/explosion/ego language that must be supported or narrowed. |

Specific overbreadth risks to confirm in Gate 2:

- "chaos," "mad science," "genius," "reckless," "explosive," "constitutionally incapable of finishing things," and "the explosion is interesting";
- "science" or "innovation" as generic blue-red shorthand rather than Izzet guild-specific method;
- "novelty without usefulness" as Rakdos/Prismari boundary;
- "knowledge because it gives leverage" as Dimir boundary;
- "safe system that never fails" as Azorius/procedure boundary;
- "beautiful expression" as Prismari boundary.

## Required Contract v1.1 dimensions

| Dimension | Result | Notes |
|---|---|---|
| Core identity | PASS WITH NON-BLOCKING LIMITATION | Strong packet coverage, but missing semantic roles/evidence locations. |
| Internal tension | PASS WITH NON-BLOCKING LIMITATION | Plausible and useful, but interpretive phrases need bounded support. |
| Motivation | PASS WITH NON-BLOCKING LIMITATION | Discovery, invention, public works, prototypes, and crisis solutions are present. |
| Preferred method | PASS WITH NON-BLOCKING LIMITATION | Building/testing/iteration/spellcraft are present; "chaos" and "recklessness" must be bounded. |
| Mature expression | UNRESOLVED | Likely useful invention/crisis engineering; needs explicit mapped support. |
| Unhealthy expression | PASS WITH NON-BLOCKING LIMITATION | Risk/ethical compromise examples exist but need careful non-caricature wording. |
| Failure or pressure behavior | PASS WITH NON-BLOCKING LIMITATION | Evidence exists, but several story examples need bounded source locators. |
| Positive inclusion evidence | FAIL | Recruiter guidance lacks evidence mappings. |
| Negative exclusion evidence | FAIL | Mismatch guidance and neighbor comparisons lack mappings. |
| Ambiguous or uncertainty evidence | FAIL | Uncertainty guidance lacks mappings and collision handling. |
| Required-neighbor boundaries | FAIL | `collision_guidance` is empty. |
| Source-to-runtime traceability | FAIL | Provenance exists for 132 UR rows and consumers are present, but Contract v1.1 fails because claims have no semantic roles and fixtures are missing. |

## Required-neighbor audit

Bounded required-neighbor set recommended for Gate 2 confirmation:

| Neighbor | Why required | Positive Izzet evidence | Negative/exclusion evidence | Ambiguity/uncertainty evidence | Current support state |
|---|---|---|---|---|---|
| `PRISMARI` | Same color pair / Strixhaven twin; current questions distinguish prototype from visible performance/beautiful expression. | Izzet: practical prototype, machinery, spellcraft, public works. | Prismari: artistic or elemental form as expression/experience, already certified. | Several questions ask creativity/theory/performance/prototype and useful/beautiful distinctions. | Needs explicit collision row and evidence mapping. |
| `QUANDRIX` | High conceptual overlap around theory, proof, patterns, and intellectual discovery. | Izzet: applied invention, prototype, spellcraft, machine. | Quandrix: math, patterns, proof/modeling, already certified. | Existing questions compare proof, theory, and practical prototype. | Needs explicit collision row and evidence mapping. |
| `SIMIC_COMBINE` | Nearby Ravnica science/engineering identity; current questions contrast living adaptation and bio-design. | Izzet: mizzium, civic engineering, spells, devices. | Simic: biological adaptation/living systems. | Existing questions ask machine/public systems versus living adaptation. | Needs explicit collision row and evidence mapping. |
| `AZORIUS` | Same-blue Ravnica institution; current questions contrast procedure, approval, law, and safe systems. | Izzet: fast prototype, experiment, iteration under uncertainty. | Azorius: law/procedure/stabilization. | Multiple questions ask rules, permission, and safe process. | Needs explicit collision row and evidence mapping. |
| `CULT_OF_RAKDOS` | Overlap risk around explosion, disruption, spectacle, and chaos. | Izzet: useful experiment and technical breakthrough. | Rakdos: performance/disruption/appetite/spectacle. | Mismatch guidance says novelty without usefulness may be Rakdos/Prismari depending on tone. | Needs explicit collision row or bounded non-faction guardrail. |
| `HOUSE_DIMIR` | Current questions compare knowledge as building/proof/leverage. | Izzet: knowledge builds tools/devices. | Dimir: hidden leverage/information control. | Existing Q3 and Q12 include leverage/secrecy/side-lab ambiguity. | Needs explicit collision row or documented lower-priority boundary. |
| Generic `UR` color-pair overfit | Same-color genericity risk. | Izzet is a Ravnican guild with civic/institutional/mizzium/spellcraft specificity. | Generic blue-red "chaos/science/goodstuff" is insufficient. | Placement guardrails already warn against generic blue-red. | Should be a guardrail, not necessarily a faction row. |

Do not expand this into a 37-by-37 comparison. Boros, Selesnya, Lorehold, and others appear in prompts or contrasts but do not appear required for certification unless Gate 2 finds direct generated/public ambiguity that must be preserved.

## Generated propagation audit

Generated consumers inspected:

- `data/factions.json#/factions/UR`
- `data/placement-model.json#/factions/UR`
- `supabase/functions/guild-recruiter/faction-context.ts#FACTION_CONTEXT/UR`
- `data/semantic-readiness-provenance.json` entries for `identity_key: "UR"`

Findings:

- UR provenance contains 132 rows:
  - 64 from `izzet_league.placement.json`;
  - 68 from `izzet_league.profile.json`.
- All UR provenance rows list generated consumers.
- No UR provenance row uses a non-claim-bearing source record.
- Source/generated guardrail validation passes for UR with one existing builder-owned inhibitor warning.
- Generated/public copy contains stronger display language than the canonical placement summary, including:
  - "mad science collective";
  - "a 16,000-year-old dragon whose ego is so complete he named the guild after himself";
  - "constitutionally incapable of finishing things";
  - "The question isn't whether it will explode. It's whether the explosion is interesting."
- Those strings may be intentionally flavorful, but under Contract v1.1 they must be either source-backed through recovered canonical evidence or narrowed/isolated during remediation.
- No internal claim-ID leakage was observed in the visible recruiter prose snippets inspected; claim IDs appear in provenance by design.
- Semantic fixtures for UR are missing.

## Maturity / packet test

Disposition choice: **Structurally valid but needs targeted semantic remediation.**

Izzet appears semantically deeper than the Strixhaven thin-packet pattern. It has a large canonical packet, all current claims cite claim-bearing sources, and it covers core identity, institution, timeline, leaders, mechanics, locations, story pressure behavior, and placement support.

The packet is not semantically ready because Contract v1.1 readiness is about traceable meaning, not volume. Izzet must still receive explicit claim roles, bounded evidence locators, recruiter evidence mappings, required-neighbor boundaries, semantic fixtures, and a review of generated/display copy for overbroad chaos/innovation/explosion language.

No broad source gap was proven at Gate 1. Gate 2 should be bounded evidence confirmation, not broad lore enrichment.

## Findings by severity

### BLOCKER

1. All 104 Izzet claims lack `semantic_role`.
2. Substantive claims lack Contract v1.1 bounded evidence localization.
3. Recruiter match, mismatch, and uncertainty guidance lacks evidence mappings.
4. `collision_guidance` is empty; required-neighbor boundaries are not explicitly mapped.
5. Semantic fixtures for Izzet are missing.
6. Contract v1.1 validation fails for UR because current proof chains cannot be certified while all claims are unclassified.

### HIGH

1. Generated/public Izzet copy contains strong and potentially overbroad wording around explosions, ego, mad science, and inability to finish things; Gate 2/Gate 3 must either support, narrow, or isolate it.
2. Neighbor-boundary language risks unsupported stereotypes around Prismari, Quandrix, Simic, Azorius, Rakdos, Dimir, and generic blue-red identity.
3. Repository-archive-supported story claims may be valid, but Gate 2 must confirm source authority and exact bounded locators before they support pressure behavior or public guidance.

### MEDIUM

1. Product/rules/Commander Compass material is useful but must remain auxiliary and not prove Izzet identity.
2. Story-local characters, locations, and timeline claims are meaningful profile evidence but should not be overextended as placement-wide proof.
3. Mechanics entries mix formal rules mechanics and story technology; the distinction is currently stated, but evidence chains must preserve it.

### LOW

1. Local canon audit flags legacy `izzit_*` research files as off-template/misspelled and not reliable direct proof. This is a source-guide risk, not a canonical packet defect by itself.
2. Source/generated validation currently reports one existing builder-owned inhibitor warning.

### NON-BLOCKING OBSERVATION

Izzet's current canonical placement summary is more bounded than its generated public display copy. The likely remediation path may involve display-source review if those strings are preserved from identity-layer/public fields, but Gate 1 did not edit or trace those display sources.

## Primary disposition

**Source-linkage cleanup required.**

This is not a complete reconstruction and not a broad evidence-discovery problem from Gate 1. The packet has sufficient depth to support a bounded remediation pass, but it lacks Contract v1.1 proof mechanics and required-neighbor traceability.

## Minimal bounded repair list

### Required for certification

1. Add `semantic_role` to all 104 Izzet claims.
2. Add bounded evidence localization to substantive claims.
3. Confirm whether any current claims should be narrowed, split, or demoted during role assignment.
4. Keep discovery-only source records out of authoritative proof chains.
5. Keep support-only/product/rules material auxiliary unless a separately supported substantive claim carries the identity meaning.
6. Add evidence mappings for recruiter match, mismatch, and uncertainty guidance.
7. Define and map required neighbors, at minimum Prismari, Quandrix, Simic, Azorius, Rakdos, Dimir if retained, plus generic UR overfit as a guardrail.
8. Add or validate Contract v1.1 Izzet semantic fixtures:
   - one core-inclusion fixture;
   - one mature or pressure-behavior fixture;
   - one exclusion fixture per required neighbor;
   - one nearest-collision ambiguous fixture;
   - one provenance fixture.
9. Review and support/narrow generated/public display copy around chaos, explosion, ego, mad science, recklessness, invention, science, and blue-red genericity.
10. Regenerate provenance and generated artifacts in a later Gate 4 only after canonical remediation.

### Optional / non-blocking

1. Document legacy `izzit_*` research files as non-authoritative guide material or defer their cleanup to a separate post-CRIT task.
2. Improve readability of flavor/display copy after certification if evidence-backed, without changing runtime behavior.
3. Normalize off-template local research assets outside the identity recovery path.

### Out of scope for CRIT-001

1. Runtime scoring or threshold tuning.
2. Hall or Crucible copy changes.
3. Global recruiter behavior changes.
4. Broad lore enrichment beyond the minimum evidence needed for Contract v1.1.
5. Renaming or restructuring legacy research directories.

## Gate 2 recommendation

Gate 2 bounded evidence confirmation is required.

Recommended Gate 2 tasks:

1. Produce an audit-only role mapping for all 104 claims.
2. Identify which claims need bounded evidence locators and where those locators exist.
3. Confirm all repository-archive-supported claims are acceptable under source-authority rules or identify exact official/local source replacements.
4. Map profile and placement statements to substantive claims.
5. Map recruiter guidance items to substantive claims.
6. Define required-neighbor evidence plans for Prismari, Quandrix, Simic, Azorius, Rakdos, Dimir if retained, and generic UR overfit.
7. Identify generated/public display strings that need support, narrowing, or display-source isolation.
8. Confirm no broad online discovery is required before Gate 3; request bounded source-localization approval only if an already-listed source lacks local locators.

## Gate 2 Evidence Confirmation

Gate 2 conclusion: existing Izzet claims and already-listed sources are sufficient to plan remediation. No broad or targeted online source discovery is required right now.

Gate 3 should not add lore for completeness. It should classify the existing 104 claims, add bounded locators, add missing evidence mappings, add required-neighbor collision guidance, and narrow or isolate public copy that cannot be supported by the recovered Izzet evidence chain.

### Claim-role mapping summary

All 104 current Izzet claim records should be proposed as `substantive_claim` during Gate 3, with one important constraint: story-local timeline, character, location, and mechanics claims should support the specific profile, pressure-behavior, mechanics, or example statements they actually prove. They should not be promoted into generic Izzet personality proof.

No current claim record needs to become `discovery_record` or `support_record`. Discovery/support isolation applies to source records and auxiliary product/rules metadata, not to the 104 current claim records.

| Current claim type | Exact claim IDs | Proposed role | Short reason | Needs bounded evidence localization | May support |
|---|---|---|---|---|---|
| `core_identity` | `claim_izzet_league_0001`, `claim_izzet_league_0002`, `claim_izzet_league_0003` | `substantive_claim` | Source-backed identity, color, guild, and elemental technology claims. | Yes | profile, placement summary, generic UR guardrail, core fixture, provenance |
| `philosophy` | `claim_izzet_league_0004`, `claim_izzet_league_0006`, `claim_izzet_league_0030`, `claim_izzet_league_0031` | `substantive_claim` | Source-backed invention, discovery, volatility, and impatience/tempo claims. | Yes | core values, behavioral signals, mature/unhealthy tension, recruiter guidance, fixtures |
| `structure` | `claim_izzet_league_0005`, `claim_izzet_league_0009`, `claim_izzet_league_0010`, `claim_izzet_league_0011`, `claim_izzet_league_0019`, `claim_izzet_league_0020`, `claim_izzet_league_0021`, `claim_izzet_league_0022`, `claim_izzet_league_0023`, `claim_izzet_league_0024`, `claim_izzet_league_0025`, `claim_izzet_league_0032`, `claim_izzet_league_0064`, `claim_izzet_league_0082`, `claim_izzet_league_0084`, `claim_izzet_league_0085`, `claim_izzet_league_0086`, `claim_izzet_league_0088` | `substantive_claim` | Institutional roles, public works, chemisters, weirds, hierarchy, and story-local structure are identity-relevant when bounded. | Yes | profile, institutional role, placement summary, pressure behavior, provenance |
| `timeline` | `claim_izzet_league_0007`, `claim_izzet_league_0026`, `claim_izzet_league_0036`, `claim_izzet_league_0037`, `claim_izzet_league_0040`, `claim_izzet_league_0041`, `claim_izzet_league_0042`, `claim_izzet_league_0043`, `claim_izzet_league_0066`, `claim_izzet_league_0074`, `claim_izzet_league_0075`, `claim_izzet_league_0077`, `claim_izzet_league_0079`, `claim_izzet_league_0090`, `claim_izzet_league_0093`, `claim_izzet_league_0094`, `claim_izzet_league_0095`, `claim_izzet_league_0096`, `claim_izzet_league_0098`, `claim_izzet_league_0103` | `substantive_claim` | Historical/current-status and pressure-behavior claims are meaningful when used as bounded examples. | Yes | profile chronology, failure/pressure behavior, mature/unhealthy expression, provenance |
| `key_figure` | `claim_izzet_league_0008`, `claim_izzet_league_0033`, `claim_izzet_league_0034`, `claim_izzet_league_0035`, `claim_izzet_league_0038`, `claim_izzet_league_0039`, `claim_izzet_league_0045`, `claim_izzet_league_0061`, `claim_izzet_league_0062`, `claim_izzet_league_0063`, `claim_izzet_league_0068`, `claim_izzet_league_0069`, `claim_izzet_league_0070`, `claim_izzet_league_0071`, `claim_izzet_league_0072`, `claim_izzet_league_0073`, `claim_izzet_league_0081`, `claim_izzet_league_0091`, `claim_izzet_league_0099`, `claim_izzet_league_0101`, `claim_izzet_league_0102`, `claim_izzet_league_0104` | `substantive_claim` | Leaders and story figures support institutional profile and pressure examples. Some are not identity-wide proof. | Yes | profile key figures, pressure behavior, Commander Compass support, provenance |
| `location` | `claim_izzet_league_0012`, `claim_izzet_league_0013`, `claim_izzet_league_0014`, `claim_izzet_league_0015`, `claim_izzet_league_0016`, `claim_izzet_league_0017`, `claim_izzet_league_0018`, `claim_izzet_league_0044`, `claim_izzet_league_0089` | `substantive_claim` | Locations ground Izzet infrastructure, laboratories, guildhall, mizzium, risky experiments, and profile texture. | Yes | profile, visual/source texture, institutional grounding, provenance |
| `relationship` | `claim_izzet_league_0027`, `claim_izzet_league_0028`, `claim_izzet_league_0029`, `claim_izzet_league_0080` | `substantive_claim` | Existing relation claims can support bounded Azorius/Boros/Simic contrast and Simic overlap risk. | Yes | collision guidance, negative exclusion, ambiguity fixtures |
| `mechanic` | `claim_izzet_league_0046`, `claim_izzet_league_0047`, `claim_izzet_league_0048`, `claim_izzet_league_0049`, `claim_izzet_league_0050`, `claim_izzet_league_0051`, `claim_izzet_league_0052`, `claim_izzet_league_0065`, `claim_izzet_league_0076`, `claim_izzet_league_0078`, `claim_izzet_league_0083`, `claim_izzet_league_0092`, `claim_izzet_league_0097` | `substantive_claim` | Mechanics and story technology can support Izzet when tied to official Izzet mechanics, spells, mizzium, and experimentation. | Yes | mechanics profile, placement method, fixtures, provenance |
| `placement_support` | `claim_izzet_league_0053`, `claim_izzet_league_0054`, `claim_izzet_league_0055`, `claim_izzet_league_0056`, `claim_izzet_league_0057`, `claim_izzet_league_0058`, `claim_izzet_league_0059`, `claim_izzet_league_0060`, `claim_izzet_league_0067`, `claim_izzet_league_0087`, `claim_izzet_league_0100` | `substantive_claim` | These are already interpretive placement claims; they can support guidance only when labeled as interpretation and bounded to source evidence. | Yes | placement summary, recruiter guidance, collision guidance, semantic fixtures |

### Bounded evidence localization plan

Every proposed `substantive_claim` needs `evidence_locations` in Gate 3. Current source IDs are useful but not bounded enough for Contract v1.1.

| Source ID | Source role | Source type | Claim IDs using source | Gate 3 locator action | Sufficiency / narrowing decision |
|---|---|---|---|---|---|
| `src_izzet_league_0001` | claim-bearing | Official Story | `0001`, `0002`, `0003`, `0004`, `0053` | Add page/section URL locator and bounded paraphrase for Ravnica guild/blue-red/elemental technology/innovation claims. | Sufficient; do not use alone to prove every "science" or "mad science" phrase. |
| `src_izzet_league_0002` | claim-bearing | Official Story | `0005`-`0029`, `0053`-`0060`, `0067` | Add section locators for public works, roles, locations, dangerous experiments, Azorius/Boros/Simic relationships, and placement-support inferences. | Sufficient for core guild and many boundaries; use explicit inference labels for placement psychology. |
| `src_izzet_league_0003` | claim-bearing | Official Story | `0008`, `0009`, `0030`-`0033`, `0053`-`0060` | Add article-section locators for invention/discovery, Niv-Mizzet/Ral status, civic engineering, and placement-support inferences. | Sufficient; "little patience for prolonged experimentation" should support tempo/impatience, not caricatured recklessness. |
| `src_izzet_league_0004` | claim-bearing | Official Mechanics | `0050` | Add mechanics-article locator for jump-start. | Sufficient only for mechanic identity, not broad psychology. |
| `src_izzet_league_0005` | claim-bearing | Official Mechanics | `0001`, `0046`, `0057` | Add mechanics-article locator for Izzet blue-red and overload. | Sufficient for overload/blue-red; poor-fit interpretation remains project synthesis. |
| `src_izzet_league_0006` | claim-bearing | Official Card Data | `0048`, `0050`, `0052`, `0056`, `0058` | Add guild-kit locator for replicate/overload/jump-start/spells. | Sufficient for spellslinger/mechanics; do not overstate all Izzet as deck behavior. |
| `src_izzet_league_0007` | claim-bearing | Official Card Data | `0001`, `0052`, `0053`, `0056`, `0058` | Add Commander article locator for public works, experimentation, instants/sorceries, combinations, mana mastery. | Sufficient for Commander-facing auxiliary and placement signals with non-canon caveat. |
| `src_izzet_league_0009` | claim-bearing | Official Rules | `0047`, `0049`, `0051` | Add rules-number locators for overload, replicate, jump-start. | Sufficient for rules meaning only; pair with Izzet mechanic-identification claims for identity use. |
| `src_izzet_league_0010` | claim-bearing | Official Story | `0002`, `0039`-`0044`, `0055`, `0059`, `0060` | Add section locators for current Ravnica state, Niv-Mizzet, rebuilding, and Phyrexian aftermath. | Sufficient for current-status/reconstruction; do not overgeneralize Phyrexian opportunity claims. |
| `src_izzet_league_0011` | claim-bearing | Official Story / Character Feature | `0039`, `0045` | Add character-feature locator for Niv-Mizzet. | Sufficient for key-figure/current status; not user-placement proof by itself. |
| `src_izzet_league_0012` | claim-bearing | Official Story | `0036`, `0037` | Add story-scene locator for Operation Desperation. | Sufficient for timeline/leadership transition. |
| `src_izzet_league_0013` | claim-bearing | Official Story | `0035` | Add story-scene locator for War of the Spark crisis leadership. | Sufficient for leadership scene only. |
| `src_izzet_league_0014` | claim-bearing | Official Story | `0034`, `0101`-`0104` | Add story-scene locator for Project Lightning Bug, Ral, Maree, Mizzix, detector spell. | Sufficient for key-figure/project claims; use as story-local example. |
| `src_izzet_league_0015` | claim-bearing | Official Story | `0038` | Add story locator for Ral as guildmaster. | Sufficient for current/later leadership. |
| `src_izzet_league_0017` | claim-bearing | Repository Archive | `0061`-`0067` | Add archived-story locator for `Epic Experiment` passages; note repository archive authority/limitation. | Sufficient for story-local Trenz/Experiment Day risk examples if official live source not locally available. |
| `src_izzet_league_0018` | claim-bearing | Repository Archive | `0068`-`0074` | Add archived-story locator for `The Pursuit, Part 1`. | Sufficient for story-local figures and recovery mission; not identity-wide proof alone. |
| `src_izzet_league_0019` | claim-bearing | Repository Archive | `0072`, `0075`-`0077` | Add archived-story locator for `The Pursuit, Part 2`. | Sufficient for Erno/device/mizzium example; keep story-local. |
| `src_izzet_league_0021` | claim-bearing | Repository Archive | `0078`-`0080` | Add archived-story locator for `Paper Trail`. | Sufficient for mizzium augmentation and Simic-removal overlap; story-local boundary evidence. |
| `src_izzet_league_0022` | claim-bearing | Repository Archive | `0081`-`0087` | Add archived-story locator for `Testing the Dark Waters`. | Sufficient for ambition, lower-rank pressure, unsanctioned lab, ethical shadow; narrow "harming/deceiving" language. |
| `src_izzet_league_0023` | claim-bearing | Repository Archive | `0088`-`0094` | Add archived-story locator for `The Gathering Storm: Chapter 17`. | Sufficient for crisis engineering/resonator failure; keep as pressure example. |
| `src_izzet_league_0024` | claim-bearing | Repository Archive | `0095`-`0097` | Add archived-story locator for `The Gathering Storm: Chapter 18`. | Sufficient for Niv/Ral/beacon and mizzium batteries story evidence. |
| `src_izzet_league_0025` | claim-bearing | Repository Archive | `0098`-`0100` | Add archived-story locator for `The Gathering Storm: Chapter 20`. | Sufficient for beacon activation and Ral restraint; good mature-expression evidence. |

Missing bounded locators: all 104 substantive claims. Existing URL/repository paths are source pointers, not full Contract v1.1 locators.

No claim should be demoted solely because it uses repository archive copies; instead, Gate 3 should add explicit `interpretation_level`, `evidence_scope`, and repository-archive limitation text. If a live official copy is required for a specific high-risk claim and cannot be found locally, stop then and request bounded source-localization approval.

### Discovery-record isolation plan

Discovery-only source records:

| Record | Why discovery-only | Current authoritative reliance | Replacement plan |
|---|---|---|---|
| `src_izzet_league_0016` â€” `polarkac/MTG-Stories` repository root | Corpus/search index, not a bounded extracted claim. | No current claim or UR provenance row relies on it. | Keep as discovery metadata only. |
| `src_izzet_league_0020` â€” `Last Day` archive copy | Surfaced by Izzet terms but low direct Izzet value. | No current claim or UR provenance row relies on it. | Keep as discovery metadata only. |
| `src_izzet_league_0026` â€” `War of the Spark: Ravnica-Ashes` archive copy | Reviewed search result retained for future cross-checking, not used for atomic claims. | No current claim or UR provenance row relies on it. | Keep as discovery metadata only. |

No profile, placement, generated, or provenance statement currently requires replacement because of discovery-only source reliance. The Gate 3 guard is simply: do not add these sources to authoritative `evidence_claim_ids` / `evidence_locations` chains.

### Support-record isolation plan

Support-only source record:

| Record | Current use | Harmless auxiliary? | Gate 3 action |
|---|---|---|---|
| `src_izzet_league_0008` â€” official Rules landing page | Listed in mechanics supporting sources, but no current claim or UR provenance row cites it. | Yes, if kept as navigation/rules-reference metadata only. | Do not use as authoritative identity proof. If retained, move/label as auxiliary support; mechanics identity should be carried by `0046`-`0052` and rules text from claim-bearing `src_izzet_league_0009`. |
| Commander Compass card/product links in `profile.commander_compass` | Product-facing deck recommendations and card links. | Yes, if explicitly non-canon / auxiliary. | Keep product/card support auxiliary. Identity-basis prose should cite substantive Izzet claims such as `0008`, `0030`, `0046`-`0052`, `0058`, and not EDHREC/card popularity as proof. |
| Mechanics/play-pattern records | Formal mechanics and story technology are mixed. | Partly. Formal mechanics are substantive only when paired with official Izzet mechanic identification. Story technology is substantive only as source-bounded Izzet texture. | Use `0046`, `0048`, `0050`, `0052` for Izzet mechanic identity; `0047`, `0049`, `0051` for rules meaning; `0065`, `0076`, `0078`, `0083`, `0092`, `0097` for story technology texture. |

No new extracted support claim is needed.

### Profile support plan

| Profile section | Existing support | Missing support | Gate 3 disposition |
|---|---|---|---|
| Core identity | `0001`-`0006`, `0030`-`0032`, `0042`, `0043`, `0052`, selected story examples | Semantic roles and locators | Preserve. Use story examples as examples, not as the core definition. |
| Philosophy | `0004`, `0006`, `0030`, `0031`, `0059`, `0060` | Bounded interpretation label | Preserve with bounded phrasing: invention/discovery/public works versus volatility/impatience/risk. |
| Internal tension | `0005`, `0006`, `0017`, `0030`-`0032`, `0042`, `0043`, `0059`, `0060`, `0067`, `0087`, `0094`, `0100` | Bounded locators and careful wording around "obsession" / "spectacle" | Preserve but narrow any global claim that all Izzet are reckless or unethical. |
| Guild/institutional role | `0005`, `0008`-`0026`, `0032`, `0033`, `0042`, `0043` | Locators | Preserve. Strong Izzet-specific grounding. |
| Key figures | `0008`, `0033`-`0039`, `0045`, `0061`-`0077`, `0081`, `0091`, `0099`, `0101`-`0104` | Locators and story-local scoping | Preserve. Niv/Ral are core; other figures are profile/story examples. |
| Locations | `0012`-`0018`, `0044`, `0089` | Locators | Preserve as profile/visual/institutional evidence; avoid making location inventory into placement proof. |
| Mechanics/play pattern | `0046`-`0052`, `0065`, `0076`, `0078`, `0083`, `0092`, `0097` | Locators and auxiliary support isolation | Preserve with split between formal mechanics and story technology. |
| Mature expression | `0005`, `0032`, `0042`, `0043`, `0055`, `0059`, `0091`, `0095`, `0098`, `0100` | Explicit mature-expression mapping | Preserve/narrow as useful invention, rebuilding, crisis engineering, and restraint under pressure. |
| Unhealthy expression | `0006`, `0017`, `0031`, `0067`, `0085`, `0087`, `0094` | Exact wording support | Preserve as risk/ethical shadow; avoid "madness" or blanket recklessness. |
| Failure or pressure behavior | `0067`, `0084`, `0085`, `0091`-`0095`, `0098`, `0100` | Locators and story-local scope | Preserve. Good evidence for pressure behavior and mature restraint. |
| Placement-facing summary | `0001`, `0003`-`0006`, `0030`-`0032`, `0052`-`0060`, `0067`, `0087`, `0091`, `0098`, `0100` | Roles, locators, and public-copy narrowing | Preserve core summary; review "chaotic iteration" and explosion language. |

### Placement support plan

| Placement section | Existing support | Missing support | Gate 3 disposition |
|---|---|---|---|
| Placement summary | `0001`-`0006`, `0030`-`0032`, `0052`-`0060`, `0067`, `0087`, `0091`, `0098`, `0100` | Roles and locators | Preserve. Consider narrowing "chaotic iteration" to "volatile experimental iteration" if evidence does not support chaos as method. |
| Core values | Values already cite claim sets. | Roles, locators, and careful support for "volatile brilliance," "recognition," and "ethical restraint." | Preserve with bounded locators. |
| Behavioral signals | Signals 0-8 cite claims; generated output should ignore empty/placeholder rows if present. | Evidence mappings for empty rows if retained; locators. | Preserve supported rows; remove or ignore empty placeholder rows during Gate 3 if canonical schema permits. |
| Positive guidance | Match strings have no `evidence_claim_ids`. | Evidence mappings. | Preserve with mappings; narrow "breaking" if it implies destruction rather than testing/failure. |
| Negative guidance | Mismatch strings have no mappings. | Evidence mappings and neighbor support. | Preserve/narrow. Avoid proving other identities from Izzet-only claims. |
| Uncertainty guidance | Uncertainty strings have no mappings. | Evidence mappings and neighbor support. | Preserve/narrow to required-neighbor set. |
| Raw discriminator questions | Current questions have provenance-derived claim support but no explicit raw `evidence_claim_ids`. | Direct mappings and wording review. | Preserve most; narrow `q_izzet_league_0002`, `0011`, and broad neighbor-option wording if needed. |
| Question purposes | Purposes include Azorius/Boros/Quandrix/Dimir/Simic/Prismari. | Explicit neighbor evidence. | Preserve only if mapped; Boros can remain optional unless required by generated/public copy. |
| Neighbor guidance | None. | Required-neighbor rows. | Add collision guidance in Gate 3. |
| Collision guidance | Empty. | Full required-neighbor map. | Add bounded rows with `lateral_inhibition: false` unless a future authorized blocker proves otherwise. |
| Recruiter-facing guidance | No mappings. | Add evidence mappings. | Preserve/narrow as below. |

### Recruiter guidance evidence mapping plan

| Guidance path | Current item | Proposed evidence claims | Gate 3 action |
|---|---|---|---|
| `/chatbot_guidance/how_to_recognize_match/0` | learning by building, testing, breaking, rebuilding | `0030`, `0031`, `0056`, `0058`, `0067` | Add mappings; consider "breaking" -> "failed tests" if too destructive. |
| `/chatbot_guidance/how_to_recognize_match/1` | technical creativity, prototypes, magic-tech, spell chains, experimental systems | `0003`, `0019`, `0020`, `0046`-`0052`, `0058` | Add mappings. |
| `/chatbot_guidance/how_to_recognize_match/2` | failure as data, ideas scale/useful tools | `0006`, `0022`, `0031`, `0058`, `0067`, `0100` | Add mappings; keep safety caveat. |
| `/chatbot_guidance/how_to_recognize_match/3` | creativity with infrastructure/systems improvement | `0005`, `0032`, `0042`, `0043`, `0055`, `0059` | Add mappings. |
| `/chatbot_guidance/how_to_recognize_match/4` | prototypes, experiments, technical systems, fast iteration under uncertainty | `0030`, `0031`, `0056`, `0058`, `0085`, `0086` | Add mappings; use `0085`/`0086` only as story-local pressure evidence. |
| `/chatbot_guidance/how_to_recognize_match/5` | mistakes as information, instrument next attempt | `0067`, `0094`, `0100` | Add mappings; narrow "instrument" if no direct support. |
| `/chatbot_guidance/how_to_recognize_match/6` | crisis engineering under pressure | `0091`, `0092`, `0093`, `0095`, `0098` | Add mappings. |
| `/chatbot_guidance/how_to_recognize_mismatch/0` | fixed procedure, permission, risk elimination | `0027`, `0030`, `0031`, `0056`, `0057` | Add mappings; Azorius row should carry procedure boundary. |
| `/chatbot_guidance/how_to_recognize_mismatch/1` | dislikes technical systems/tool-building/spellcraft/iteration | `0003`, `0019`, `0020`, `0021`, `0046`-`0052` | Add mappings. |
| `/chatbot_guidance/how_to_recognize_mismatch/2` | prefers secrecy, law, harmony, biological evolution, martial protection | `0027`, `0029`, `0057`; plus neighbor evidence for WU/UB/UG and optional Boros/Selesnya | Narrow to required neighbors or add explicit optional-boundary support. |
| `/chatbot_guidance/how_to_recognize_mismatch/3` | novelty without usefulness may be Rakdos/Prismari | `0005`, `0032`, `0042`, `0043`, `0059`, `0060`; Prismari certified claims by boundary; Rakdos local boundary evidence | Add mappings and narrow; do not overclaim Rakdos until supported. |
| `/chatbot_guidance/how_to_recognize_mismatch/4` | demands complete predictability before trying | `0031`, `0056`, `0057` | Add mappings. |
| `/chatbot_guidance/how_to_recognize_mismatch/5` | harming or deceiving people because discovery is interesting | `0087`, `0100` | Narrow. Current evidence supports ethical shadow and mature restraint, not a universal "harm/deceive" category. |
| `/chatbot_guidance/how_to_recognize_mismatch/6` | status without curiosity/experiment/problem-solving | `0063`, `0077`, `0084` | Narrow to recognition-through-breakthrough versus rank/status alone. |
| `/chatbot_guidance/questions_to_ask_when_uncertain/0` | useful, beautiful, mathematical, or disruptive prototypes | Izzet `0005`, `0032`, `0042`, `0058`; Prismari/Quandrix/Rakdos boundary evidence | Add mappings; narrow "disruptive" if Rakdos boundary lacks support. |
| `/chatbot_guidance/questions_to_ask_when_uncertain/1` | theory, device, protecting people, enforcing rules | Izzet `0005`, `0020`, `0058`; WU/Quandrix and optional Boros support | Add mappings; if Boros is not retained, reword "protecting people" to an optional guardrail. |
| `/chatbot_guidance/questions_to_ask_when_uncertain/2` | document/hide/mourn/rebuild/weaponize failure | Izzet `0067`, `0094`, `0100`; UB/BR boundary evidence | Add mappings; narrow "weaponize" if unsupported. |
| `/chatbot_guidance/questions_to_ask_when_uncertain/3` | breakthrough, beauty, biological adaptation, law, protection | Izzet `0030`, `0058`; Prismari/UG/WU evidence; optional Boros | Add mappings; remove protection if not retained. |
| `/chatbot_guidance/questions_to_ask_when_uncertain/4` | dangerous prototype failure: abandon, stabilize, iterate, hide | `0067`, `0094`, `0100`; WU/UB boundary evidence | Add mappings. |
| `/chatbot_guidance/questions_to_ask_when_uncertain/5` | planned systems engineering vs improvised crisis engineering | `0091`, `0092`, `0093`, `0098` | Add mappings. |

### Collision guidance and required-neighbor evidence plan

Proposed bounded required-neighbor set:

- `PRISMARI`
- `QUANDRIX`
- `UG` / Simic Combine
- `WU` / Azorius Senate
- `BR` / Cult of Rakdos
- `UB` / House Dimir
- generic `UR` overfit guardrail

| Neighbor | Why required | Positive Izzet evidence | Negative / exclusion evidence | Ambiguous evidence | Proposed collision purpose | Lateral inhibition |
|---|---|---|---|---|---|---|
| `PRISMARI` | Same UR color pair and certified guild/college twin; existing guidance compares performance/beauty/prototype. | `0003`, `0046`-`0052`, `0058`, `0059`, `0060` | Prismari certified evidence should carry artistic/elemental expression distinction. | Questions 5, 9, uncertainty 0/3. | Separate applied prototype/spellcraft experimentation from artistic elemental expression. | No. Boundary guidance only; do not alter scoring/inhibition. |
| `QUANDRIX` | Theory/proof/pattern overlap with Izzet invention. | `0020`, `0030`, `0058`, `0059`, `0060` | Quandrix certified evidence carries math/proof/Fractal/scale distinction. | Questions 2, 5. | Separate building/testing devices from proving/growing mathematical structures. | No. |
| `UG` / Simic Combine | Ravnica science/engineering overlap; current guidance contrasts living adaptation and bio-design. | `0003`, `0019`, `0020`, `0023`, `0029`, `0046`-`0052`, `0078`-`0080` | Existing Izzet claim `0029` says Izzet sees Simic creation as lacking soul/fire; Simic evidence should carry living adaptation. | Questions 5, 9; mismatch 2. | Separate mizzium/spellcraft/civic engineering from biological adaptation. | No. |
| `WU` / Azorius Senate | Shared blue civic/institutional axis; current guidance contrasts rules/procedure/approval. | `0027`, `0030`, `0031`, `0056`, `0057` | Existing claim `0027` supports Izzet view of Azorius rulemaking; Azorius evidence should carry law/procedure. | Questions 1, 5, 7, 11, 12, 13. | Separate experimental iteration from formal procedure and risk-elimination. | No. |
| `BR` / Cult of Rakdos | Overlap risk around explosion, chaos, spectacle, disruption, and novelty. | `0005`, `0032`, `0042`, `0043`, `0059`, `0060`, `0067`, `0100` | Rakdos evidence should carry performance/appetite/release; Izzet evidence must emphasize utility, experiment, and systems. | Mismatch 3, uncertainty 0/2. | Separate useful experiment and technical breakthrough from disruptive spectacle or novelty-for-its-own-sake. | No. |
| `UB` / House Dimir | Knowledge/information overlap; current guidance mentions leverage, secrecy, and hiding. | `0020`, `0022`, `0025`, `0030`, `0058` | Dimir evidence should carry hidden leverage/information control. | Question 3, question 12, uncertainty 2/4. | Separate knowledge as building/prototype from information as hidden leverage. | No. |
| generic `UR` overfit | Same color-code genericity risk. | `0001`, `0003`, `0005`, `0019`, `0020`, `0032`, `0046`-`0052`, `0059` | Generic blue-red curiosity/chaos/spells without Izzet institution or experiment/build signal is insufficient. | Placement guardrails already warn against generic color identity. | Guard against generic "blue-red goodstuff" and unsupported chaos/science shorthand. | No. This is a guardrail, not a faction inhibitor. |

No new claims are required for these boundaries at Gate 2. Some non-Izzet neighbor evidence will come from certified Prismari/Quandrix packets or later guild packets; for Gate 3, Izzet-side boundaries can be authored from the Izzet claims above plus already-existing local canon guides. If a boundary relies on uncertified neighbor canon, label it as Izzet-side contrast and avoid certifying the neighbor.

### Generated/public copy risk plan

| Phrase / statement | Current source surface | Support status | Proposed Gate 3 / Gate 4 action |
|---|---|---|---|
| "The question isn't whether it will explode. It's whether the explosion is interesting." | `data/factions.json#/factions/UR/tagline`, preserved into recruiter context | Overbroad. Izzet has volatile/dangerous experiment evidence, but "interesting explosion" risks glorifying harm and is not the canonical raw tagline. | Narrow/remove in display source during authorized display-source cleanup. Prefer raw bounded idea like "Invent first. Stabilize later." only if supported. |
| "mad science collective" | `data/factions.json#/factions/UR/philosophy` | Partly flavorful but unsupported as formal identity; risks caricature. | Narrow to "civic infrastructure, laboratories, elemental magic, and mizzium technology" or similar supported wording. |
| "16,000-year-old dragon whose ego is so complete he named the guild after himself" | `data/factions.json#/factions/UR/philosophy` | Niv-Mizzet centrality is supported; exact ego flourish needs bounded proof or removal. | Re-source only if exact evidence exists; otherwise narrow to dragon-led/Niv-Mizzet-centered. |
| "constitutionally incapable of finishing things" | `data/factions.json#/factions/UR/philosophy` | Unsupported/overbroad. Current evidence supports impatience, risk, and volatile experiments, not universal inability to finish. | Remove or narrow to fast iteration/impatience with prolonged experimentation. |
| "useful rather than merely brilliant" / "intolerable constraint" | `data/factions.json#/factions/UR/lore_summary` and `core_tension` | Partly supported by reconstruction/public works tension, but "many find this intolerable" needs exact support. | Narrow to public works/reconstruction versus volatile discovery unless exact source support exists. |
| "chaotic iteration" | raw `placement_summary/calibrated_primary_read` and generated placement | Risky frozen/calibration phrase. Evidence supports volatile/risky experimentation; "chaotic" should not become random chaos. | If frozen fields prohibit edit, leave and support with `0059`/`0060` guardrails; otherwise narrow only if future scope allows. |
| Generic "science"/"innovation" without Izzet grounding | identity-layer preview and public display | Supported only when tied to guild, mizzium, spellcraft, public works, or experimentation. | Keep when grounded; add generic UR guardrail. |
| Commander Compass "reckless invention", "big explosive turns", "explosive spell sequence" | `profile.commander_compass` and generated display | Product-adjacent and partly supported by mechanics, but not canon identity proof. | Keep auxiliary/non-canon. Avoid using as authoritative profile/placement proof. |

Likely source of the strongest public copy is preserved display fields in `data/factions.json`, not the canonical raw profile/placement and not `data/identity-layers.json` alone. Builder code was inspected read-only; no builder change is recommended.

### Provenance repair plan

Current UR provenance is structurally present:

- 132 UR rows.
- 64 rows from `data/raw-factions/izzet_league/izzet_league.placement.json`.
- 68 rows from `data/raw-factions/izzet_league/izzet_league.profile.json`.
- Every UR provenance row lists generated consumers.
- No UR provenance row currently uses discovery-only or support-only source records.

Repair categories:

| Category | Affected chains | Current problem | Repair without source discovery? |
|---|---|---|---|
| Claim role chains | All UR profile/placement provenance rows | Evidence claim IDs resolve to unclassified claims. | Yes. Add `semantic_role` and locators to all 104 claim records. |
| Recruiter guidance chains | Match/mismatch/uncertainty guidance | Raw guidance lacks evidence mappings, so provenance cannot prove guidance. | Yes. Add `evidence_claim_ids` using the mapping above. |
| Collision guidance chains | Required neighbors | `collision_guidance` empty, so no generated collision provenance can exist. | Yes. Add Izzet-side collision rows. |
| Public display copy | `data/factions.json` and recruiter context display fields | Some display copy may be preserved stale public copy rather than raw canonical meaning. | Yes if narrowed via authorized display-source cleanup; no source discovery needed unless exact ego/explosion phrasing is intentionally retained. |
| Fixture provenance | Missing fixture file | No fixture can validate complete evidence chain. | Yes. Add fixtures after Gate 3 remediation and Gate 4 generation. |

### Semantic fixture plan

| Fixture | Intent | Expected interpretation | Required claims | Required sources | Required for certification |
|---|---|---|---|---|---|
| Core inclusion | User likes building/testing prototypes, spell/tech systems, and learning from volatile experiments. | Izzet positive inclusion. | `0003`, `0004`, `0030`, `0052`, `0058`, `0059`, `0060` | `0001`, `0003`, `0006`, `0007` | Yes |
| Mature / pressure behavior | User wants crisis engineering that repairs or rewires systems under pressure while preserving restraint. | Mature Izzet, not reckless harm. | `0042`, `0043`, `0091`, `0092`, `0093`, `0098`, `0100` | `0010`, `0023`, `0025` | Yes |
| Exclusion â€” Prismari | User centers artistic/elemental performance or medium as expression over prototype/useful experiment. | Exclude/ambiguous toward Prismari. | Izzet `0058`, `0059`, `0060`; Prismari certified q/evidence claims | Izzet `0002`, `0003`; Prismari certified sources | Yes |
| Exclusion â€” Quandrix | User centers proof, math, models, and scale instead of building/testing devices. | Exclude/ambiguous toward Quandrix. | Izzet `0020`, `0030`, `0058`; Quandrix certified evidence | Izzet `0002`, `0003`; Quandrix certified sources | Yes |
| Exclusion â€” Simic | User centers living adaptation/biological optimization over mizzium/spellcraft systems. | Exclude/ambiguous toward Simic. | `0003`, `0029`, `0078`-`0080`; Simic local evidence | `0001`, `0002`, `0021` | Yes |
| Exclusion â€” Azorius | User requires approval/procedure/predictability before experiment. | Exclude toward WU/Azorius. | `0027`, `0031`, `0056`, `0057` | `0002`, `0003`, `0005` | Yes |
| Exclusion â€” Rakdos | User wants spectacle/disruption/novelty without useful experiment. | Exclude toward BR/Rakdos if boundary retained. | `0005`, `0032`, `0042`, `0059`, `0060`, `0067`, `0100`; Rakdos local evidence | `0002`, `0003`, `0010`, `0017`, `0025` | Yes if BR retained. |
| Exclusion â€” Dimir | User wants knowledge for hidden leverage rather than building/prototyping. | Exclude toward UB/Dimir if retained. | `0020`, `0022`, `0025`, `0030`, `0058`; Dimir local evidence | `0002`, `0003` | Yes if UB retained. |
| Nearest-collision ambiguous | User likes volatile spell creativity but cannot decide between artistic expression, proof, or prototype. | Ambiguous among Izzet/Prismari/Quandrix. | `0046`-`0052`, `0058`, `0059`, `0060`; Prismari/Quandrix certified evidence | Izzet `0004`-`0007`; certified sources | Yes |
| Provenance fixture | Exact generated chain for a canonical Izzet placement or question row. | Generated provenance matches canonical pointer, hash, evidence claims, and sources. | Choose a stable row after Gate 3, likely placement summary or `q_izzet_league_0001`. | Complete union of selected claim sources | Yes |

### Exact Gate 3 remediation checklist

Required for certification:

1. Add `semantic_role: "substantive_claim"` to all 104 Izzet claims.
2. Add Contract v1.1 `evidence_locations` to every substantive claim, with complete source ID parity.
3. Keep `src_izzet_league_0016`, `src_izzet_league_0020`, and `src_izzet_league_0026` discovery-only and out of proof chains.
4. Keep `src_izzet_league_0008` and Commander/card/product support auxiliary only.
5. Add evidence mappings for every recruiter match, mismatch, and uncertainty guidance item.
6. Add bounded required-neighbor collision guidance for `PRISMARI`, `QUANDRIX`, `UG` / Simic Combine, `WU` / Azorius Senate, `BR` / Cult of Rakdos, `UB` / House Dimir if retained, and generic `UR` overfit guardrail.
7. Set collision rows to avoid lateral-inhibition behavior changes; use `lateral_inhibition: false` or omit according to existing schema convention unless separately authorized.
8. Review raw discriminator questions and purposes; preserve supported questions, narrow unsupported binaries around beauty, proof, chaos, explosion, law, protection, disruption, secrecy, and generic blue-red.
9. Preserve frozen confidence/calibration fields unless a future prompt explicitly authorizes otherwise.
10. Review generated/public display copy source surfaces; narrow or mark for authorized display-source cleanup where exact explosion/ego/mad-science language cannot be supported.
11. Update Izzet changelog/readiness evidence to describe Gate 3 canonical remediation only.
12. Update this report and VM-507 card with Gate 3 status when authorized.

Optional / non-blocking:

1. Later normalize legacy `izzit_*` local research files or document them as non-authoritative guide material.
2. Improve display-copy elegance after certification if separately authorized.
3. Add richer Izzet/Rakdos/Dimir comparative prose after those guilds are recovered, if needed.

Out of scope for CRIT-001:

1. Runtime scoring or threshold tuning.
2. Hall or Crucible copy.
3. Global recruiter behavior or live LLM outcomes.
4. Lateral inhibition calibration.
5. Broad lore enrichment or online research beyond bounded source-localization approval.

### Targeted source discovery decision

Targeted source discovery is **not required** from Gate 2.

Gate 3 can proceed from existing claims, listed source records, local canon guides, and certified neighbor packets. If exact bounded localization for an already-listed official or archived source cannot be established locally during Gate 3, stop then and request bounded source-localization approval for that exact source and statement.

## Gate 3 Canonical Remediation

Gate 3 completed on branch `codex/vm-507-izzet-semantic-recovery` at starting HEAD `5bc25af194d2c7e14c4350d58c9b791775253734`.

Izzet remains uncertified. Gate 4 is required for generated artifact rebuild, semantic-readiness provenance regeneration, fixture authoring, source/generated validation, generated-diff isolation, and regression tests.

### Canonical files changed

- `data/raw-factions/izzet_league/izzet_league.claims.json`
- `data/raw-factions/izzet_league/izzet_league.profile.json`
- `data/raw-factions/izzet_league/izzet_league.placement.json`
- `data/raw-factions/izzet_league/izzet_league.changelog.json`

No generated artifacts were modified in Gate 3.

### Blocker-by-blocker remediation

| Gate 1 / Gate 2 blocker | Gate 3 action | Gate 4 state |
|---|---|---|
| All 104 Izzet claims lacked certifying semantic roles. | Added `semantic_role: "substantive_claim"` to all 104 current Izzet claims. | Ready for generated/provenance rebuild. |
| Substantive claims needed bounded evidence localization. | Added `evidence_locations` to every substantive claim, with source IDs matching each claim's `source_ids`. | Gate 4 should verify generated provenance source chains. |
| Discovery/search/corpus material must not support semantic proof chains. | Kept discovery-only source records as source metadata only; no current Izzet claim uses discovery-only sources as evidence. | Gate 4 provenance should confirm no discovery-only source appears in semantic proof chains. |
| Support/card/rules/product material must remain auxiliary. | Removed `src_izzet_league_0008` from authoritative mechanics `supporting_sources` and recorded it under auxiliary support boundary metadata. Commander/card/product surfaces remain auxiliary. | Gate 4 should verify generated provenance does not treat support-only material as semantic proof. |
| Recruiter match/mismatch/uncertainty guidance lacked evidence mappings. | Added `semantic_guidance_evidence` mappings for all 20 match, mismatch, and uncertainty guidance strings. | Gate 4 must regenerate provenance and verify guidance hashes. |
| `collision_guidance` was empty. | Added bounded collision guidance for Prismari, Quandrix, Simic, Azorius, Rakdos, Dimir, and generic UR overfit. | Gate 4 must verify generated propagation. |
| Required-neighbor boundaries were not mapped. | Added `required_neighbor_evidence` mapping to the new collision guidance rows. | Gate 4 should align fixtures and ledger-generated provenance. |
| Public/generated copy risk around explosions, ego, mad science, volatility, and generic UR. | Narrowed raw canonical/question/Commander-support wording where canonical source fields contained overbroad explosion, reckless, or chaos language. Display-preserved generated copy remains deferred because generated files were not rebuilt in Gate 3. | Gate 4 must inspect generated/public copy and perform any authorized display-source cleanup if stale generated display text persists. |

### Claims classified by semantic role

| Role | Count |
|---|---:|
| `substantive_claim` | 104 |
| `discovery_record` | 0 |
| `support_record` | 0 |
| `unclassified` | 0 |

### Bounded evidence localization summary

All 104 substantive claims now include `evidence_locations`. Each evidence-location source set matches the claim's declared `source_ids`. Locator entries use the already-listed source records and local reviewed source summaries; no online lookup or new source discovery was performed.

### Support/card/rules/product isolation

- `src_izzet_league_0008` remains `support-only` in `izzet_league.sources.json`.
- The authoritative mechanics source chain now excludes `src_izzet_league_0008`.
- `profile.mechanics.auxiliary_support_source_ids` records `src_izzet_league_0008` as auxiliary support only.
- Commander/card/product surfaces remain explicitly auxiliary and must not prove Izzet lore identity without substantive raw Izzet claims.

### Profile evidence-chain repairs

Profile claim chains continue to cite substantive Izzet claim records for core identity, philosophy, internal tension, guild/institutional role, key figures, locations, mechanics, mature expression, unhealthy expression, failure/pressure behavior, and placement-facing summary. Mechanics support was corrected so support-only rules material does not appear in the authoritative support source chain.

### Placement evidence-chain repairs

Placement claim chains now resolve to substantive Izzet claims. Discriminator questions retain their existing claim support and now also carry `evidence_claim_ids` for explicit generated/provenance traceability. Wording was narrowed in three question strings to avoid unsupported explosion/recklessness framing while preserving the intended Izzet discriminator.

### Recruiter guidance evidence mappings

Added evidence mappings for:

- 7 `how_to_recognize_match` items;
- 7 `how_to_recognize_mismatch` items;
- 6 `questions_to_ask_when_uncertain` items.

Two recruiter guidance items were narrowed: "breaking" became failing/rebuilding, and harm/deception framing became a bounded test-subject/collaborator/bystander shadow warning.

### Required-neighbor mappings and collision guidance

Selected required neighbors / guardrails:

- `PRISMARI`
- `QUANDRIX`
- `UG` / Simic Combine
- `WU` / Azorius Senate
- `BR` / Cult of Rakdos
- `UB` / House Dimir, retained because existing Izzet questions and guidance use secrecy/leverage/information-control contrasts
- `GENERIC_UR_OVERFIT` guardrail

Collision rows were added without adding lateral-inhibition behavior. No scoring, inhibition, confidence, scheduling, tie ordering, Hall, Crucible, or global recruiter behavior was changed.

### Public-copy narrowing

Gate 3 narrowed raw canonical wording where it was in an allowed Izzet raw source file:

- site-surface identity wording now emphasizes elemental magic, mizzium technology, civic engineering, volatile invention, and dangerous failed tests rather than caricatured disaster copy;
- Commander-support language now uses risky/experimental/scalable/failed-test phrasing instead of reckless/big explosive/lab-chaos phrasing;
- discriminator questions avoid unsupported explosion/reckless language where bounded alternatives preserve the intended contrast.

Generated display fields were not edited or rebuilt. If stale public display copy remains after Gate 4 rebuild, Gate 4 should stop for bounded display-source cleanup authorization or apply only explicitly authorized identity-scoped display-source repair.

### Items deferred to Gate 4

- Rebuild generated artifacts.
- Regenerate `data/semantic-readiness-provenance.json`.
- Add Izzet semantic fixtures.
- Run source/generated parity validation.
- Inspect generated public/recruiter copy for stale explosion, ego, mad-science, chaos, volatility, generic UR, and science/spellcraft overreach.
- Run generated-diff isolation and regression tests.

### Remaining known limitations

- `node research/validate-semantic-readiness.mjs --targets=UR` still fails until Gate 4 because generated provenance is stale/missing for changed/new canonical pointers and Izzet semantic fixtures do not exist yet.
- Display-preserved generated copy may still contain older public wording until Gate 4 rebuild and inspection.
- Rakdos and Dimir are not yet certified; Izzet-side boundaries are bounded guidance only and should not be treated as full reciprocal recovery for those identities.

## Gate 4 Generation, Blocker Resolution, and Validation

Gate 4 completed on 2026-07-13 on branch `codex/vm-507-izzet-semantic-recovery` at `5bc25af194d2c7e14c4350d58c9b791775253734`.

### Files changed for Gate 4

- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `research/fixtures/semantic-readiness/izzet_league.semantic-fixtures.json`
- `data/raw-factions/izzet_league/izzet_league.placement.json` for the explicitly authorized bounded wording blocker only
- VM-507 workflow/report/handoff records

### Bounded wording blocker resolution

Gate 4 initially found one stale raw-sourced generated string:

- canonical path: `data/raw-factions/izzet_league/izzet_league.placement.json`
- location: raw discriminator question `q_izzet_league_0008`
- field: `answer_pattern_that_supports_this_faction`
- stale value: "Reckless inventor who still wants the machine to work."

After explicit bounded authorization, the field was replaced with:

- "Risk-aware inventor who wants the experiment to keep working, scale, or teach something useful."

The question's discriminator role, evidence mappings, confidence value, calibrated placement-summary fields, and lateral-inhibition behavior were preserved. The stale string is absent from canonical and generated Izzet consumers, and the replacement string is present in canonical placement and generated placement output.

### Generated/provenance rebuild and fixture status

- `npm.cmd run build:factions` rebuilt generated artifacts and semantic-readiness provenance.
- `research/fixtures/semantic-readiness/izzet_league.semantic-fixtures.json` was added for Contract v1.1 semantic readiness coverage.
- Generated public Izzet display copy was narrowed at the Izzet-scoped `data/factions.json` display-source surface to remove stale explosion, dragon-ego, and mad-science copy preserved by the existing display behavior.
- `data/identity-layers.json` was not changed.

### Generated-diff and scope findings

- Generated object-level isolation showed only `UR` changed in:
  - `data/factions.json`;
  - `data/placement-model.json`;
  - `data/semantic-readiness-provenance.json`;
  - `supabase/functions/guild-recruiter/faction-context.ts`.
- No non-Izzet raw packet changed.
- No frozen confidence, calibration, scoring, inhibition, scheduling, tie-ordering, Hall, or Crucible fields changed.
- No explicit `lateral_inhibition` rows were added to Izzet collision guidance.
- UR semantic provenance has no entries using retained discovery-only or support-only source IDs:
  - `src_izzet_league_0016`;
  - `src_izzet_league_0020`;
  - `src_izzet_league_0026`;
  - `src_izzet_league_0008`.

### Gate 4 validation results

Passed:

- `npm.cmd run build:factions`
- `node research/validate-semantic-readiness.mjs --targets=UR`
- `npm.cmd run validate:source-generated -- --targets=UR`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- `node research/archscry-dossier-followup-tests.js`
- `npm.cmd run dossier:audit`
- `node research/audit-semantic-readiness.mjs --targets=UR`
- generated-diff isolation check
- worktree candidate-scope dry-run
- `git diff --check`

Known warnings are unchanged:

- Source/generated validation still reports the builder-owned Izzet inhibitor warning for the model-owned entry: "Risk-averse proceduralism; refuses experiments unless outcomes are already predictable and approved."
- Dossier audit remains 37 primary dossiers, 76 adjacent dossiers, 113 warnings, 0 failures.
- Git reports LF-to-CRLF working-copy warnings during status/diff checks; `git diff --check` exits successfully.

### Gate 4 final state

Izzet remains uncertified. No recovery candidate commit or certification commit has been created. Gate 5 candidate creation is ready when explicitly authorized.
## Validation commands run or intentionally deferred

Run:

- `git status --short --branch`
- structural JSON inspection of Izzet claims, sources, profile, placement, generated consumers, and provenance
- `node research/audit-semantic-readiness.mjs --targets=UR`
- `node research/validate-semantic-readiness.mjs --targets=UR`
- `npm.cmd run validate:source-generated -- --targets=UR`

Results:

- `git status --short --branch` was clean before documentation edits.
- `node research/audit-semantic-readiness.mjs --targets=UR` passed structurally and reported:
  - 104 claims;
  - 104 unclassified semantic-role records;
  - 26 sources;
  - 22 claim-bearing, 3 discovery-only, 1 support-only sources;
  - structural fingerprint `high-volume-pattern`, `support-heavy-pattern`;
  - coverage risk `no-explicit-substantive-role`.
- `node research/validate-semantic-readiness.mjs --targets=UR` failed as expected for Gate 1 blockers:
  - all 104 claims missing `semantic_role`;
  - recruiter guidance arrays missing evidence mappings;
  - authoritative chains lack certified substantive claims because all claims are unclassified;
  - Izzet semantic fixtures are missing.
- UR provenance contains 132 rows, all with generated consumers and no non-claim-bearing source records.
- `npm.cmd run validate:source-generated -- --targets=UR` passed with one known builder-owned inhibitor warning:
  - model-owned biological prior warning for one inhibitor trap.

Gate 3 additional validation results:

- JSON parse checks passed for changed canonical Izzet files:
  - `data/raw-factions/izzet_league/izzet_league.claims.json`
  - `data/raw-factions/izzet_league/izzet_league.profile.json`
  - `data/raw-factions/izzet_league/izzet_league.placement.json`
  - `data/raw-factions/izzet_league/izzet_league.changelog.json`
- `node research/audit-semantic-readiness.mjs --targets=UR` passed structurally after Gate 3 and reported:
  - 104 claims;
  - 104 `substantive_claim` records;
  - 0 discovery, support, or unclassified claim records;
  - no missing references;
  - no potential role-invalid support links;
  - no coverage or neighbor risk indicators.
- `node research/validate-semantic-readiness.mjs --targets=UR` failed only for expected Gate 4 issues:
  - stale provenance content hashes for changed canonical pointers;
  - missing generated provenance for new collision, guidance, and required-neighbor evidence pointers;
  - missing Izzet semantic fixtures.
- No generated artifacts were rebuilt or modified during Gate 3.
Intentionally deferred:

- `npm.cmd run build:factions`;
- generated artifact rebuild;
- fixture authoring;
- full regression suite;
- candidate-scope guard;
- candidate or certification commits.

## Final status

Gate 4 generation, bounded wording-blocker resolution, fixture addition, provenance rebuild, and validation are complete.

Izzet remains uncertified. No candidate or certification commit has been created. Gate 5 candidate creation is ready when explicitly authorized.
