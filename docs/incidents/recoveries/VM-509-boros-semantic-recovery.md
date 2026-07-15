# VM-509 Boros Semantic Recovery — Gate 1 Audit

Date: 2026-07-14
Agent: Codex
Identity: Boros Legion
Target: WR
Contract: CRIT-001 Contract v1.1
Branch: codex/vm-509-boros-semantic-recovery
Starting SHA: cfc9e022cc23d00ab06f5c5b9d3bfc7db8129ad5
Raw packet: data/raw-factions/boros_legion/

## Executive summary

Gate 1 is complete. Boros is not a thin Strixhaven-clone packet and is not a complete reconstruction case. It has 24 claims, 17 sources, five claim-bearing sources, useful official/novel/mechanics material, and a richer profile/placement shape than the earliest thin packets.

Boros is not semantically ready under Contract v1.1. The current packet has no explicit claim semantic roles, no claim evidence locations, no semantic fixtures, discovery-only story-corpus rows used in authoritative key-figure and Commander-support chains, incomplete required-neighbor boundaries, and generated/public copy that can overstate fury, zeal, righteousness, and law-breaking. The current model is structurally useful but not certifiable.

Primary disposition: Claim-extraction pass required.

Gate 2 evidence confirmation is required. The bounded Gate 2 task should confirm source-backed claim roles and evidence locations for the existing official/novel/mechanics sources, decide which interpretive claims must be narrowed or split, and determine whether any unavailable evidence blocks remediation. No online lookup was performed during Gate 1.

## Worktree preservation statement

- Active worktree path used for all writes: C:\dev\mtgSiteWIP-crit001
- Active branch after safety correction: codex/vm-509-boros-semantic-recovery
- Starting SHA: cfc9e022cc23d00ab06f5c5b9d3bfc7db8129ad5
- Original dirty main worktree C:\dev\mtgSiteWIP was checked read-only and not edited.
- No Boros canonical raw data changed.
- No generated artifacts changed.
- No runtime, validator, builder, contract, schema, Hall, Crucible, scoring, inhibition, confidence, scheduling, tie-ordering, or global recruiter behavior changed.
- Prismari, Lorehold, Quandrix, Silverquill, Witherbloom, Izzet / UR, and Azorius / WU remain certified.

## Scope and non-goals

This audit is Gate 1 only. It does not remediate Boros, classify roles in canonical data, add evidence locations, rebuild generated artifacts, create fixtures, create a candidate, certify Boros, or start another identity.

Local canon/research under docs/research/canon was used only as discovery and audit guidance. It was not treated as automatic final proof unless already represented by source-authority records in the raw packet.

## Files inspected

- AGENTS.md
- docs/handoffs/HANDOFF_INDEX.md
- docs/handoffs/2026-07-14-1859-codex-vm508-azorius-certification.md
- docs/handoffs/2026-07-14-0705-codex-vm508-azorius-gate1-audit.md
- docs/kanban/board.md
- docs/kanban/backlog/VM-509-boros-semantic-recovery.md
- docs/incidents/CRIT-001-faction-semantic-readiness-integrity.md
- docs/reference/semantic-readiness-contract.md
- docs/incidents/CRIT-001-identity-recovery-ledger.json
- docs/incidents/CRIT-001-identity-recovery-ledger.md
- docs/reference/ravnica-guild-source-readiness-matrix.md
- docs/research/canon/ten-guild-reference-audit.md
- docs/research/canon/guilds/boros/boros_README.md
- docs/research/canon/guilds/boros/boros_research.md
- docs/research/canon/guilds/boros/boros_spec.md
- data/raw-factions/boros_legion/boros_legion.claims.json
- data/raw-factions/boros_legion/boros_legion.sources.json
- data/raw-factions/boros_legion/boros_legion.profile.json
- data/raw-factions/boros_legion/boros_legion.placement.json
- data/raw-factions/boros_legion/boros_legion.changelog.json
- data/factions.json
- data/placement-model.json
- supabase/functions/guild-recruiter/faction-context.ts
- data/semantic-readiness-provenance.json

## Local canon research notes

The ten-guild audit explicitly says Boros is rich but schema-inconsistent: Boros uses boros_research.md plus boros_spec.md rather than the narrative-taxonomy shape. That research frames Boros through protection, momentum, collective agency, resilience, tactical justice, fast coordinated combat, Battalion, Mentor, Radiance, and the shadow of zealotry or force mistaken for righteousness.

Gate 1 treats this as a useful audit guide only. The current raw packet does not yet bind those local research concepts to Contract v1.1 claim roles, evidence locations, canonical pointers, and generated provenance.

## Claim-role audit

Boros has 24 claim records.

| Role | Count | Audit confidence | Notes |
|---|---:|---|---|
| substantive_claim | 9 likely candidates | Medium | Claims 001-006 and 008-010 are likely source-backed factual/identity/mechanics/history/location claims if Gate 2 confirms bounded locators. |
| discovery_record | 12 | High | Claims 013-024 are story-corpus archive match records. They identify relevant stories and terms but do not extract the actual semantic facts needed by authoritative fields. |
| support_record | 0 | Medium | No current claim is purely product/card support by type, though Commander Compass sections contain auxiliary support material that must remain non-authoritative. |
| unclassified | 3 likely candidates | Medium | Claims 007, 011, and 012 are interpretive or compressed. They may become substantive after narrowing/splitting, but Gate 1 cannot treat them as proof as written. |

Likely substantive candidates:

- boros_legion_claim_001 — Boros as WR Ravnica guild around martial justice, honor, peacekeeping.
- boros_legion_claim_002 — military and peacekeeping arm of Ravnican society.
- boros_legion_claim_003 — military-style hierarchy, keeping peace and enforcing law.
- boros_legion_claim_004 — Aurelia as guildmaster who fights with troops.
- boros_legion_claim_005 — Razia as parun/founder/first leader.
- boros_legion_claim_006 — Mentor as Guilds of Ravnica Boros mechanic.
- boros_legion_claim_008 — League of Wojek and Boros Army arms.
- boros_legion_claim_009 — leadership transition Razia -> Feather -> Aurelia.
- boros_legion_claim_010 — Sunhome and Parhelion II locations/assets.

Likely unclassified / needs rewrite:

- boros_legion_claim_007 — placement signal claim mixes protection, moral urgency, teamwork, and willingness to act. This is useful synthesis but needs explicit evidence locations and may need to be split into source-backed smaller claims.
- boros_legion_claim_011 — Agrus Kos and Tajic roles are likely supportable, but "two ideological halves" is interpretive and not currently localized.
- boros_legion_claim_012 — Battalion and Radiance as belief in group synergy/widespread moral influence is mechanics interpretation and needs source confirmation or narrower wording.

Discovery records:

- boros_legion_claim_013 through boros_legion_claim_024 are discovery/search records. They should remain discovery metadata unless Gate 2 or later source-reads them and extracts specific substantive claims.

Boros is therefore structurally rich but not semantically mature under Contract v1.1. Claim volume is not the issue; claim role, localization, entailment, and downstream use are.

## Discovery-record audit

Discovery records are currently used as semantic proof in authoritative locations.

| File | JSON pointer or line | Statement | Cited claim/source | Problem | Severity |
|---|---|---|---|---|---|
| data/raw-factions/boros_legion/boros_legion.profile.json | /key_figures/0 | Aurelia key-figure entry | Claims 013, 015-024 plus discovery-only story sources | Discovery rows are mixed into an authoritative key-figure proof chain. | BLOCKER |
| same | /key_figures/1 | Razia key-figure entry | Claims 013-014 plus discovery-only story sources | Discovery rows are used alongside likely substantive history claims. | HIGH |
| same | /key_figures/2 | Tajic key-figure entry | Claims 013 and 017 | Discovery rows support a key-figure reference; claim 011 also needs narrowing. | BLOCKER |
| same | /key_figures/3 | Feather key-figure entry | Claims 013, 015, 018, 021-023 | Discovery rows dominate this proof chain. | BLOCKER |
| same | /key_figures/4 | Agrus Kos key-figure entry | Claims 014, 020, 021, 024 | Discovery rows are used as semantic proof. | BLOCKER |
| same | /commander_compass/native_fit_commanders/0 | Commander support for Aurelia | Includes claims 013 and 015-018 | Auxiliary Commander support can keep discovery metadata only if explicitly non-authoritative; currently it blends existing raw claims. | MEDIUM |
| same | /commander_compass/budget_friendly_commanders/0 | Commander support for Tajic | Includes claims 013 and 017 | Same auxiliary/support concern. | MEDIUM |
| same | /commander_compass/advanced_complexity_commanders/0 | Commander support for Feather | Includes discovery claims | Same auxiliary/support concern. | MEDIUM |
| data/semantic-readiness-provenance.json | /entries for key_figures/0-4 | Generated provenance chains | Discovery-only claim/source IDs | Generated provenance propagates discovery rows as if they supported authoritative key figures. | BLOCKER |

Discovery records are useful bibliography leads, not certification proof.

## Support-record audit

No canonical Boros claim is currently typed as a support_record. However, several profile areas are support-like and must be bounded during remediation.

| File | JSON pointer or line | Statement | Cited claim/source | Problem | Severity |
|---|---|---|---|---|---|
| data/raw-factions/boros_legion/boros_legion.profile.json | /commander_compass | Commander recommendations and deck support | Existing raw claims and deck/product links | This is auxiliary support, not identity proof. It is acceptable only if it does not feed authoritative identity, placement, or generated semantic proof. | MEDIUM |
| data/factions.json | /factions/WR/archetypes, staples, deck_links | Public deck/archetype material | Generated from raw support/profile material | Not a blocker by itself, but must not substitute for source-backed identity evidence. | LOW |

## Profile entailment audit

| Section | Status | Notes |
|---|---|---|
| Core identity | FAIL | Plausible Boros concept, but cites unrole-classified claims and interpretive claim 007. Needs substantive role assignment and evidence locations. |
| Philosophy | FAIL | "Immediate action over procedural delay" is the right neighborhood but needs source-backed boundaries against Azorius and overbroad anti-procedure wording. |
| Internal tension | FAIL | Wojek vs Army and zeal vs investigation are useful, but current proof chain leans on broad claims and unlocalized history/character claims. |
| Guild/institutional role | PASS WITH NON-BLOCKING LIMITATION | Military/peacekeeping arm and hierarchy are likely supportable from claims 002, 003, 008, but not certifiable until roles/locators exist. |
| Key figures | FAIL | All five key-figure entries mix unclassified and discovery records. |
| Locations | PASS WITH NON-BLOCKING LIMITATION | Sunhome and Parhelion II likely supportable through claim 010, but no evidence location or role exists. |
| Mechanics/play-pattern evidence | UNRESOLVED | Mentor is likely source-backed; Battalion/Radiance interpretation needs confirmation. Mechanics must not overprove psychology. |
| Mature expression | UNRESOLVED | Present-tense protection, accountability, teamwork, and duty are implied but not cleanly canonicalized as source-backed mature expression. |
| Unhealthy expression | FAIL | Zealotry/fury/righteous force appears in profile/generated copy, but the current packet risks overstatement without bounded source proof. |
| Failure or pressure behavior | UNRESOLVED | Avoiding passivity and acting under pressure are present in placement, but pressure/failure states need source-backed formulation. |
| Placement-facing summary | FAIL | Useful but built from unrole-classified and interpretive claims; must be narrowed and rebound. |

## Placement entailment audit

| Section | Status | Notes |
|---|---|---|
| Positive guidance | FAIL | "Protects others under pressure" is likely recoverable; "Grizzled Veteran" and "Heroic Solidarity" rely on claims 011/012 that need confirmation or rewrite. |
| Negative guidance | FAIL | "Avoids conflict at any cost" is plausible, but "rules more important than people" is an Azorius boundary claim that needs a stronger source-backed comparison. |
| Uncertainty guidance | FAIL | q9001 is useful but only covers Azorius, Lorehold, and Selesnya. Missing Rakdos/Izzet/Orzhov/generic WR and possible Mardu ambiguity. |
| Raw discriminator questions | FAIL | q0001 and q9001 are salvageable; q0002's "shady ally" framing risks encoding unsupported investigator/crime-noir stereotype from claim 011. |
| Neighbor guidance | FAIL | Required-neighbor set is incomplete. Existing canonical guidance names Azorius/Lorehold/Selesnya only. Generated context adds WU, LOREHOLD, WG, MARDU as inhibition targets. |
| Collision guidance | FAIL | collision_guidance is empty. |
| Recruiter-facing guidance | FAIL | Generated context preserves useful guardrails, but stale phrasing around righteous fury/burning/light and incomplete evidence support must be cleaned during later gates. |

Unsupported or risky placement terms to inspect during Gate 2/Gate 3:

- aggression / generic aggression
- zeal / zealotry / righteous zeal
- righteous / righteousness / higher law
- militarism / martial / military-style hierarchy
- violence / force / fury / burn / fire
- justice / punishment / honor / courage / protection / duty
- "law as shield" and "rules stood between you and doing what was right"
- generic white-red heroism or aggro

## Required Contract v1.1 dimensions

| Dimension | Status | Notes |
|---|---|---|
| Core identity | FAIL | Useful source floor exists but no semantic roles/evidence locations. |
| Internal tension | FAIL | Immediate protection vs procedure and zealotry risk need source-backed wording. |
| Motivation | FAIL | Protection/justice/duty are present but not role-bound. |
| Preferred method | FAIL | Action/intervention/team duty need bounded proof. |
| Mature expression | UNRESOLVED | Needs explicit source-backed statement. |
| Unhealthy expression | FAIL | Current generated copy may overheat fury/zeal; needs bounded shadow language. |
| Failure or pressure behavior | UNRESOLVED | Present-tense harm/delay scenario exists but needs stronger proof. |
| Positive inclusion evidence | FAIL | Positive signals exist but are not backed by substantive classified claims. |
| Negative exclusion evidence | FAIL | Exclusions are incomplete and not fully source-bound. |
| Ambiguous or uncertainty evidence | FAIL | q9001 is promising but neighbor set is incomplete. |
| Required-neighbor boundaries | FAIL | Missing or underdeveloped boundaries listed below. |
| Source-to-runtime traceability | FAIL | Generated consumers are listed, but content hashes are null, many canonical IDs are null, and discovery/unclassified chains flow into generated provenance. |

## Required-neighbor audit

Final bounded Gate 1 required-neighbor set:

1. GENERIC_WR_OVERFIT
2. AZORIUS_SENATE / WU
3. LOREHOLD
4. SELESNYA_CONCLAVE / WG
5. RAKDOS_CULT / BR
6. IZZET_LEAGUE / UR
7. ORZHOV_SYNDICATE / WB
8. MARDU

Justification:

- GENERIC_WR_OVERFIT is required because Boros must not become generic white-red aggro, heroism, courage, violence, or color identity.
- AZORIUS is already canonical q9001 comparison and shares law, order, enforcement, protection, and civic justice.
- LOREHOLD is a same-color Strixhaven twin and already appears in canonical/generator uncertainty guidance.
- SELESNYA is already q9001 comparison and shares protection/community/collective good.
- RAKDOS is necessary because Boros red intensity, fury, spectacle risk, violence, and zeal must be separated from performance/transgression.
- IZZET is necessary because red urgency/action and acting before process can blur with experimentation/impulse rather than protection/duty.
- ORZHOV is necessary because law, punishment, obligation, public order, authority, and moral accounting can blur with contractual/debt/leverage framing.
- MARDU is generated as a lateral inhibition target and shares martial duty, discipline, honor, aggression, and protection themes; Gate 2 should decide whether to retain it as required or demote it after inspection.

| Required neighbor | Positive inclusion evidence | Negative/exclusion evidence | Ambiguity handling | Claim/source support | Question/guidance traceability | Generated preservation |
|---|---|---|---|---|---|---|
| GENERIC_WR_OVERFIT | Partial | Partial | Missing | Weak; no dedicated claims | Guardrail says no generic heroism/aggression/WR | Partial |
| AZORIUS / WU | Partial | Partial | q0001/q9001 | Claims 001/008 likely but no roles/locators | Present | Present |
| LOREHOLD | Partial | Partial | q9001 | Weak; history/precedent boundary underdeveloped | Present | Present |
| SELESNYA / WG | Partial | Partial | q9001 | Weak; harmony/community contrast not source-bound | Present | Present |
| RAKDOS / BR | Missing | Missing | Missing | Missing | Missing | Not Boros-side present |
| IZZET / UR | Missing | Missing | Missing | Missing | Missing | Not Boros-side present |
| ORZHOV / WB | Missing | Missing | Missing | Missing | Missing | Not Boros-side present |
| MARDU | Partial generated-only | Missing | Missing | Generated inhibition target only | Missing canonical guidance | Present as generated lateral target |

## Generated propagation audit

Generated consumers inspected:

- data/factions.json#/factions/WR
- data/placement-model.json#/factions/WR
- supabase/functions/guild-recruiter/faction-context.ts#FACTION_CONTEXT/WR
- data/semantic-readiness-provenance.json entries for WR

Findings:

- Generated consumers are present for Boros.
- Provenance has 23 WR entries and includes all three expected generated consumers for inspected entries.
- All 23 WR provenance entries have null content_hash.
- 10 WR provenance entries lack canonical_id.
- Provenance propagates discovery-only key-figure claims into generated consumer chains.
- data/factions.json and recruiter context contain stale/high-heat public wording: "Righteous fury is still fury. It still wins," "righteousness is fire," "justice is the light," "burn bright," and "when the rules stood between you and doing what was right." These may be fixable display-source/generated cleanup later, but they are not certifiable as-is.
- Placement model preserves useful guardrails against generic aggression/heroism, but the underlying evidence chain is still unrole-classified.
- No claim IDs were observed leaking as public prose; claim IDs remain in structured evidence/provenance fields.

## Maturity / packet test

Disposition choice: Structurally valid but needs targeted semantic remediation.

Primary disposition choice from CRIT list: Claim-extraction pass required.

Evidence:

- The packet is richer than thin packets: 24 claims, 17 sources, 5 claim-bearing sources, 3 discriminator questions, calibrated placement metadata, and generated consumers.
- The direct source floor is useful, especially official guide, mechanics article, Boros lore article, Ravnica novel, and Karlov Manor legends article.
- The packet is not certifiable because Contract v1.1 requires more than structural richness: semantic roles, evidence locations, authoritative entailment, clean discovery/support isolation, fixtures, and source-to-runtime provenance must exist.
- Some claims are interpretive and likely need splitting/narrowing rather than simple role labels.
- Required-neighbor coverage is incomplete.

## Findings by severity

### BLOCKER

1. All 24 claims lack semantic_role, so the validator reports no substantive claims.
2. All 24 claims lack evidence_locations, so even likely source-backed claims are not localized under Contract v1.1.
3. Authoritative profile and placement references currently have no substantive claims under the validator.
4. Key figures use discovery-only story-corpus records as semantic proof.
5. Semantic fixtures are missing.
6. Required-neighbor boundaries are incomplete; canonical Boros coverage only handles Azorius, Lorehold, and Selesnya partially.
7. Collision guidance is empty.

### HIGH

1. Claims 007, 011, and 012 are over-compressed or interpretive and may need narrowing/splitting before they can become substantive.
2. Generated public/recruiter copy overstates righteous fury, burning, and rule-breaking in ways that may amplify zeal/aggression stereotypes.
3. Provenance has null content hashes for WR entries and null canonical IDs for 10 entries.
4. q0002's "shady ally" question relies on a weak/interpretive Agrus Kos claim and may encode an unsupported binary.
5. Mardu appears as a generated lateral target but lacks canonical Boros-side explanation.

### MEDIUM

1. Commander Compass support blends raw claims and discovery leads; it must stay auxiliary and not prove identity or placement meaning.
2. Local Boros research is rich but non-authoritative unless rebound to source-backed raw claims.
3. The readiness matrix says Boros is ready for the existing placement model, but that predates Contract v1.1 role/provenance/fixture enforcement.
4. Existing public copy treats Boros as acting when institutions fail; this may be supportable, but needs careful boundary against Azorius, Orzhov, and vigilantism.

### LOW

1. Future public official-page capture could reduce dependency on novel/story archive source IDs where exact public proof is preferable.
2. Boros local canon files use a schema unlike other guild taxonomies; useful for later normalization, not a Gate 1 blocker.

### NON-BLOCKING OBSERVATION

Boros has unusually good local research texture compared with some earlier guilds. That should help Gate 2/Gate 3, but it should not bypass Contract v1.1 source-authority rules.

## Minimal bounded repair list

### Required for certification

1. Confirm claim roles for all 24 claims.
2. Add or confirm bounded evidence locations for all claims retained as substantive.
3. Keep claims 013-024 as discovery metadata unless a later source-read extracts specific substantive claims.
4. Narrow or split claims 007, 011, and 012 if Gate 2 cannot substantiate their full interpretive wording.
5. Rebind profile sections to substantive claims only.
6. Clean key-figure evidence chains so discovery records are removed from authoritative proof or moved to explicit discovery metadata.
7. Define source-backed mature expression, unhealthy expression, and failure/pressure behavior.
8. Build required-neighbor boundaries for generic WR, Azorius, Lorehold, Selesnya, Rakdos, Izzet, Orzhov, and possibly Mardu.
9. Add or repair discriminator/collision guidance for those required neighbors.
10. Rebuild generated artifacts and provenance only in later authorized gates.
11. Add Contract v1.1 semantic fixtures.
12. Ensure generated provenance has stable canonical IDs and content hashes where the current validator/provenance builder expects them.

### Optional / non-blocking

1. Replace or supplement novel/story archive dependencies with official page captures if Gate 2 finds accessible local/official copies.
2. Normalize Boros local research into the same narrative-taxonomy shape used by other guilds after CRIT-001 if useful.
3. Consider adding richer Commander-support containment so deck/archetype material is clearly auxiliary.

### Out of scope for CRIT-001

1. Runtime scoring tuning.
2. Hall/Crucible behavior.
3. Lateral inhibition value changes.
4. Confidence calibration changes.
5. UI/runtime copy redesign outside generated semantic consumers.
6. Lore enrichment beyond bounded evidence needed for certification.

## Gate 2 recommendation

Gate 2 evidence confirmation is required.

Recommended Gate 2 scope:

- Use existing local/official/recorded sources first.
- Confirm whether claims 001-006 and 008-010 can be promoted as substantive with bounded locators.
- Decide whether claims 007, 011, and 012 are source-backed as written or require narrower replacement claims.
- Confirm whether all five key figures can remain authoritative, or whether some should be narrowed/removed/moved to discovery metadata.
- Confirm the final required-neighbor set, especially Mardu retention/demotion.
- Stop and request approval before any online lookup if local sources are insufficient.

## Validation commands run or intentionally deferred

Run:

- git status --short --branch
- Read-only branch/base verification: rev-parse, merge-base --is-ancestor
- Read-only original main worktree status/hash check
- JSON structural inspection of Boros claims, sources, profile, placement, generated consumers, provenance, and changelog
- Local canon search/inspection under docs/research/canon
- Git history inspection for Boros raw packet creation/enrichment
- node research/audit-semantic-readiness.mjs --targets=WR
- node research/validate-semantic-readiness.mjs --targets=WR

Expected validation outcome:

- audit-semantic-readiness reports WR as 24 claims, 12 discovery records, 12 unclassified records, 5 claim-bearing sources, 12 discovery-only sources, and discovery-record-majority/no-explicit-substantive-role risk indicators.
- validate-semantic-readiness fails for expected Gate 1 blockers: missing semantic_role on every claim, no substantive authoritative references, key-figure proof issues, and missing fixtures.

Deferred:

- Generated artifact rebuilds.
- Candidate-scope guard.
- Semantic fixture validation after fixture creation.
- Online source lookup.
- Dossier audit, unless later gates require it.

## Final Gate 1 status

Gate 1 audit is complete.

Boros remains uncertified.

No Gate 2 remediation has started.

## Gate 2 Evidence Confirmation

Gate 2 evidence confirmation is complete as an audit-only planning pass. No Boros canonical raw packet, generated artifact, fixture, runtime, contract, validator, scoring, inhibition, confidence, scheduling, tie-ordering, Hall, Crucible, or global recruiter behavior was changed.

Current branch: `codex/vm-509-boros-semantic-recovery`

Current HEAD at Gate 2: `cfc9e022cc23d00ab06f5c5b9d3bfc7db8129ad5`

Gate 2 conclusion: Boros still requires a Gate 3 claim-extraction and canonical remediation pass. The packet is not thin, but it is not certifiable as-is because the current authoritative chains have no Contract v1.1 substantive claims, bounded evidence locations, fixtures, or complete neighbor/collision guidance.

Targeted source discovery: no broad online lore discovery is required before Gate 3. Gate 3 should first localize evidence against the existing listed sources. Targeted source discovery or online lookup should be requested only if the existing local/source records cannot provide bounded locators for the official guide, Gatecrash lore, Guilds of Ravnica mechanics, Karlov Manor legends, or novel/key-figure evidence, or if Gate 3 tries to retain Radiance or the current high-heat fury/burning/zeal wording.

### Claim-role mapping summary

This is an audit-only proposed mapping. It does not assign semantic roles in canonical data.

| Claim ID | Current type | Proposed role | Evidence localization needed | May support | Gate 3 action |
|---|---|---|---|---|---|
| `boros_legion_claim_001` | identity | substantive_claim | Yes | core identity, profile, placement, generic WR boundary, fixtures, provenance | Preserve with bounded locator; narrow any honor/justice language to source wording. |
| `boros_legion_claim_002` | role | substantive_claim | Yes | guild role, institution profile, placement summary, Azorius boundary | Preserve with bounded locator. |
| `boros_legion_claim_003` | organization | substantive_claim | Yes | preferred method, discipline, law/enforcement boundary, profile | Preserve with bounded locator; avoid overreading into generic proceduralism. |
| `boros_legion_claim_004` | leadership | substantive_claim | Yes | Aurelia key figure, team-duty examples, mature expression if localized | Preserve as character/institution-specific evidence. |
| `boros_legion_claim_005` | history | substantive_claim | Yes | Razia history/key figure, timeline | Preserve as history/key-figure evidence; do not overuse for present-day placement behavior. |
| `boros_legion_claim_006` | mechanics | substantive_claim | Yes | mechanic-specific identity support, team duty, fixtures if source ties Mentor to Boros | Preserve only for Mentor/mechanics claims. |
| `boros_legion_claim_007` | placement | unclassified | Yes, but current wording is compressed | placement, mature/pressure behavior, recruiter guidance if split | Split or narrow; do not promote as written until protection, urgency, teamwork, and action are separately source-bounded. |
| `boros_legion_claim_008` | organization | substantive_claim | Yes | Wojek/Army institutional role, Agrus Kos support, Azorius boundary | Preserve with bounded locator; keep institution-specific. |
| `boros_legion_claim_009` | history | substantive_claim | Yes | Razia, Feather, Aurelia transition, timeline | Preserve with bounded locator; split if multiple leadership transitions require separate proof. |
| `boros_legion_claim_010` | location | substantive_claim | Yes | locations, setting, profile location section | Preserve as location evidence only. |
| `boros_legion_claim_011` | character | unclassified | Yes, but current wording is interpretive | Agrus Kos, Tajic, key figures, possible internal tension | Split into bounded character claims; remove or prove "two ideological halves" before reuse. |
| `boros_legion_claim_012` | mechanics | unclassified | Yes, partial | Battalion, Radiance, mechanics/play-pattern evidence | Split; retain Battalion only if Gatecrash source supports it, retain Radiance only with targeted source support, narrow "moral influence" unless proved. |
| `boros_legion_claim_013` | story_corpus_evidence | discovery_record | No, unless later extracted | discovery metadata only | Keep discovery-only; remove from authoritative proof chains. |
| `boros_legion_claim_014` | story_corpus_evidence | discovery_record | No, unless later extracted | discovery metadata only | Keep discovery-only; remove from key-figure/provenance chains. |
| `boros_legion_claim_015` | story_corpus_evidence | discovery_record | No, unless later extracted | discovery metadata only | Keep discovery-only; remove from key-figure/provenance chains. |
| `boros_legion_claim_016` | story_corpus_evidence | discovery_record | No, unless later extracted | discovery metadata only | Keep discovery-only; remove from key-figure/provenance chains. |
| `boros_legion_claim_017` | story_corpus_evidence | discovery_record | No, unless later extracted | discovery metadata only | Keep discovery-only; remove from key-figure/provenance chains. |
| `boros_legion_claim_018` | story_corpus_evidence | discovery_record | No, unless later extracted | discovery metadata only | Keep discovery-only; remove from key-figure/provenance chains. |
| `boros_legion_claim_019` | story_corpus_evidence | discovery_record | No, unless later extracted | discovery metadata only | Keep discovery-only; remove from key-figure/provenance chains. |
| `boros_legion_claim_020` | story_corpus_evidence | discovery_record | No, unless later extracted | discovery metadata only | Keep discovery-only; remove from key-figure/provenance chains. |
| `boros_legion_claim_021` | story_corpus_evidence | discovery_record | No, unless later extracted | discovery metadata only | Keep discovery-only; remove from key-figure/provenance chains. |
| `boros_legion_claim_022` | story_corpus_evidence | discovery_record | No, unless later extracted | discovery metadata only | Keep discovery-only; remove from key-figure/provenance chains. |
| `boros_legion_claim_023` | story_corpus_evidence | discovery_record | No, unless later extracted | discovery metadata only | Keep discovery-only; remove from key-figure/provenance chains. |
| `boros_legion_claim_024` | story_corpus_evidence | discovery_record | No, unless later extracted | discovery metadata only | Keep discovery-only; remove from key-figure/provenance chains. |

Summary counts proposed for Gate 3 planning:

| Role | Count | Audit confidence | Notes |
|---|---:|---|---|
| substantive_claim | 9 | High | Claims 001-006 and 008-010 appear promotable after bounded locators. |
| discovery_record | 12 | High | Claims 013-024 are story-corpus/discovery records and should not remain authoritative proof. |
| support_record | 0 | High | Commander/product/card support exists in profile structures, but no raw claim should become support-only based on current claim records. |
| unclassified | 3 | High | Claims 007, 011, and 012 need narrowing, splitting, or demotion. |

### Claim-extraction and splitting plan

Gate 3 should extract only the minimum substantive claims needed for Contract v1.1 certification:

| Proposed claim purpose | Existing source to read first | Bounded locator status | Required dimension | Supported consumers | Scope | Required? |
|---|---|---|---|---|---|---|
| Boros is the WR Ravnica guild/institution framed around martial justice, peacekeeping, and protection. | `src_wotc_flavorful_guide_guilds_ravnica_2018` | Missing | core identity, motivation | profile, placement, recruiter, fixtures, provenance | identity-wide/institution-specific | Yes |
| Boros functions as a military and peacekeeping arm with hierarchy and law-enforcement duties. | `src_wotc_flavorful_guide_guilds_ravnica_2018`; `src_ravnica_novel_2005` | Missing | guild role, preferred method | profile, placement, Azorius boundary | institution-specific | Yes |
| Boros action is protective and duty-bound rather than merely impulsive or aggressive. | `src_wotc_flavorful_guide_guilds_ravnica_2018` first; local canon research only as guide | Missing | mature expression, positive inclusion | placement, recruiter guidance, fixtures | project synthesis from source-backed claims | Yes |
| Boros pressure behavior risks overreach, zeal, or force framed as righteousness only if source-backed. | Existing listed official sources first | Missing and not yet confirmed | unhealthy expression, failure/pressure behavior | profile, placement, generated copy cleanup | project synthesis | Yes, but wording may need narrowing if evidence is weak. |
| Claim 007 split: protection, moral urgency, teamwork, and willingness to act. | `src_wotc_flavorful_guide_guilds_ravnica_2018`; mechanics source for teamwork only if applicable | Missing | motivation, preferred method, mature expression | placement/recruiter/questions | project synthesis | Yes |
| Claim 011 split: Agrus Kos as Wojek/investigator evidence. | `src_ravnica_novel_2005`; `src_wotc_legends_karlov_manor_2024` | Missing | key figures, institutional role | profile key figures, provenance | character-specific | Yes if Agrus remains a key figure. |
| Claim 011 split: Tajic as Boros commander/champion only if the listed source directly supports it. | `src_wotc_legends_karlov_manor_2024` and current claim source records | Missing | key figures | profile key figures, recruiter examples | character-specific | Required only if Tajic remains authoritative. |
| Claim 012 split: Battalion as Boros mechanic expressing group attack/team pressure. | `src_wotc_gatecrash_boros_lore_2013` | Missing | mechanics/play-pattern, mature expression if bounded | profile mechanics, placement, fixtures | mechanic-specific | Yes if mechanics section remains. |
| Claim 012 split: Radiance as older Boros mechanic. | Existing sources may be insufficient | Missing | mechanics/play-pattern | profile mechanics only | mechanic-specific | Optional unless a valid source is located. |
| Required-neighbor boundary claims against generic WR, Azorius, Lorehold, Selesnya, Rakdos, Izzet, Orzhov, and Mardu. | Boros substantive claims plus certified/current neighbor packets where allowed | Missing | negative exclusion, ambiguous evidence, required-neighbor boundaries | placement, collision guidance, fixtures | project synthesis/comparison | Yes |

### Bounded evidence localization plan

The five claim-bearing source records are sufficient starting points, but every substantive use needs bounded evidence locations:

| Claim/group | Existing source ID | Source type | Existing locator | Missing locator | Source sufficient? | Gate 3 decision |
|---|---|---|---|---|---|---|
| 001-003 | `src_wotc_flavorful_guide_guilds_ravnica_2018` | Official WotC article | URL only | Section/paragraph or quote locator | Likely yes | Localize and promote with narrowed wording. |
| 004 | `src_wotc_flavorful_guide_guilds_ravnica_2018`; possibly `src_wotc_legends_karlov_manor_2024` | Official WotC article(s) | URL only | Section/paragraph locator | Likely yes | Localize Aurelia as key figure. |
| 005 | `src_wotc_flavorful_guide_guilds_ravnica_2018`; `src_ravnica_novel_2005` | Official article/novel | URL or N/A | Article section or novel chapter/page locator if available | Likely yes for Razia/history | Localize; keep historical. |
| 006 | `src_wotc_guilds_ravnica_mechanics_2018` | Official mechanics article | URL only | Mentor section locator | Yes | Localize; keep mechanic-specific. |
| 007 | Existing guide-derived claim | Official article/synthesis | URL only | Separate locators for each concept | Not sufficient as written | Split/narrow. |
| 008-009 | `src_ravnica_novel_2005`; `src_wotc_gatecrash_boros_lore_2013` | Official novel/article | URL/N/A | Chapter/article section locators | Likely yes after narrowing | Localize; split multi-part history if needed. |
| 010 | `src_wotc_gatecrash_boros_lore_2013` | Official lore article | URL only | Location section locator | Likely yes | Localize; keep location-only. |
| 011 | `src_ravnica_novel_2005`; `src_wotc_legends_karlov_manor_2024` | Official novel/article | URL/N/A | Character-specific locators | Partial | Split; demote unsupported interpretive wording. |
| 012 | `src_wotc_gatecrash_boros_lore_2013` | Official lore article | URL only | Battalion locator; Radiance locator if retained | Partial | Split; retain only source-backed mechanics. |
| 013-024 | MTG-Stories archive sources | Discovery-only archive copies | Story archive URLs | Not applicable unless later source-read extracts evidence | No for certification proof | Keep discovery-only. |

### Discovery-record replacement plan

Discovery/search/story-corpus records are currently contaminating authoritative chains, especially key figures and generated provenance.

| Statement/site | Discovery claims currently used | Replacement plan | Preserve, narrow, or remove |
|---|---|---|---|
| Aurelia key figure | 013, 015-024 plus substantive candidates | Use 004 and, if localized, 009/Karlov source support. | Preserve but narrow to source-backed leadership role. |
| Razia key figure | 013, 014 plus 005/009 | Use 005 and/or localized 009. | Preserve as founder/early leader if source-backed. |
| Tajic key figure | 013, 017 plus 011 | Preserve only after claim 011 is split and localized to Tajic; otherwise remove from authoritative key figures or move to discovery metadata. | Conditional. |
| Feather key figure | 013, 015, 018, 021-023 plus 009 | Use localized 009 only if the leadership-transition evidence is sufficient. | Conditional/narrow. |
| Agrus Kos key figure | 014, 020, 021, 024 plus 005/008/009/011 | Use split claim 011 and/or 008 from novel/Karlov evidence. | Preserve if character-specific source support is localized. |
| Commander Compass identity basis | Product/card/Commander support mixed with claims | Keep as auxiliary Commander support; semantic identity proof must use substantive claims only. | Preserve as auxiliary, not proof. |
| Generated/provenance key-figure chains | Discovery claims flow into WR provenance entries | Replace with localized substantive claims or remove unsupported figures from authoritative chains. | Repair in Gate 3/Gate 4. |

### Support-record isolation plan

- Commander support remains auxiliary. The profile already flags Commander Compass as `reviewed_not_canonical_lore` and `do_not_use_as_claim_source`; Gate 3 should preserve that containment and keep card/product/deck material out of identity proof chains.
- Local Boros research under `docs/research/canon` is useful as a discovery and audit guide only. It can guide what to check in official/local source records, but it should not become automatic proof.
- Mechanics can support identity only where the source explicitly ties the mechanic to Boros identity or gameplay expression. Mentor and Battalion are likely usable after localization; Radiance requires targeted evidence if retained.
- Story-corpus records 013-024 should remain discovery/search records unless a later approved source-read extracts bounded, source-backed claims.

### Profile support plan

| Profile section | Existing support | Missing support | Gate 3 plan |
|---|---|---|---|
| Core identity | 001-003 | Bounded locators and substantive roles | Preserve and rebind to localized claims. |
| Philosophy | 001-003, 007 | Source-backed wording for urgency/action/protection | Preserve but narrow away from unsupported higher-law/fire/fury framing. |
| Internal tension | 007, 011, 012 | Source-backed unhealthy expression/failure behavior | Rewrite around documented discipline/action/force tension or narrow if evidence is insufficient. |
| Guild/institutional role | 002, 003, 008 | Locators | Preserve and rebind. |
| Key figures | 004, 005, 008, 009, 011 plus discovery contamination | Character-specific locators; remove discovery proof | Preserve only figures with substantive support; narrow or remove Tajic/Feather/Agrus if split evidence is insufficient. |
| Locations | 010 | Locator | Preserve as location-only evidence. |
| Mechanics/play pattern | 006, 012 | Mentor/Battalion locators; Radiance support if retained | Preserve Mentor/Battalion if localized; remove or defer Radiance if unsupported. |
| Mature expression | 001-004, 006-008 | Separate source-backed mature-action claim | Add/narrow claim; avoid generic aggression. |
| Unhealthy expression | 007, generated copy | Source-backed overreach/zeal/force-risk claim | Add if supported; otherwise narrow/remove high-heat language. |
| Failure/pressure behavior | 007, placement synthesis | Source-backed pressure behavior | Add bounded synthesis or narrow to supported uncertainty guidance. |
| Placement-facing summary | 001-010 | Locators and split claims | Preserve core, narrow generated/public phrasing. |

### Placement support plan

| Placement section | Current support | Missing support | Gate 3 plan |
|---|---|---|---|
| Placement summary | 001-010 | Substantive roles and locators | Preserve core meaning; narrow unsupported "moral courage/action under pressure" to localized claims. |
| Core values | 001-004, 006-008 | Locators and split action/protection claim | Preserve after rebinding. |
| Behavioral signals | 004-007, 011, 012 | Split claims and source support | Keep protection/team-duty signals; narrow zeal/aggression/righteousness language. |
| Positive guidance | 001, 004, 006-008 | Bounded locators | Preserve if phrased as disciplined protection and civic duty. |
| Negative guidance | 001, 008, 011 | Neighbor evidence | Narrow "rules more important than people" and unsupported shady-ally binaries. |
| Uncertainty guidance | Existing Azorius/Lorehold/Selesnya comparisons | Required-neighbor completion | Expand only through canonical collision guidance; do not tune runtime. |
| Raw discriminator questions | q0001/q0002/q9001 | q0002 especially lacks support | Preserve q0001/q9001 with narrower support; remove or rewrite q0002 unless a split claim supports it. |
| Question purposes | 001-005, 008, 011 | Claim localization | Rebind to substantive claims. |
| Neighbor guidance | Azorius/Lorehold/Selesnya only | Rakdos, Izzet, Orzhov, Mardu, generic WR | Add bounded guidance in Gate 3. |
| Collision guidance | Empty | Entire section | Create canonical collision guidance in Gate 3. |
| Recruiter-facing guidance | Generated from current placement/profile | Substantive evidence chain | Re-source/narrow in Gate 3, rebuild only in Gate 4. |

### Recruiter guidance evidence mapping plan

| Guidance class | Existing/proposed support | Evidence gap | Gate 3 action |
|---|---|---|---|
| Match: disciplined protection, public duty, immediate action to prevent harm | 001-004, 006, 008, split 007 | Bounded locators and split action/protection claim | Add evidence claim IDs after claims are localized. |
| Match: teamwork/formation/collective action | 004, 006, split 012 | Mentor/Battalion locators | Preserve with mechanic-specific limits. |
| Mismatch: generic WR aggression, anger, heroic violence, spectacle | New generic WR boundary claim plus 001-003 | Negative exclusion claim needed | Add canonical guidance; avoid runtime tuning. |
| Mismatch: process-first or precedent-first decision making | 002-003 plus Azorius/Lorehold certified/current neighbor evidence | Neighbor-side evidence and Boros-side boundary | Preserve q9001-style ambiguity; add collision guidance. |
| Uncertainty: community harmony, debt/leverage, experimentation, transgression, martial conquest | Required-neighbor claims and current/certified neighbor packets where allowed | Boundary claims missing | Add after neighbor set confirmation. |

### Collision guidance and required-neighbor evidence plan

Gate 2 confirms this bounded required-neighbor set for Gate 3 planning:

`GENERIC_WR_OVERFIT`, `AZORIUS_SENATE`/`WU`, `LOREHOLD`, `SELESNYA_CONCLAVE`/`WG`, `RAKDOS_CULT`/`BR`, `IZZET_LEAGUE`/`UR`, `ORZHOV_SYNDICATE`/`WB`, `MARDU`.

No new lateral-inhibition behavior or value change is required for Gate 3. Existing generated/configured inhibition targets must remain unchanged unless a later authorized gate specifically validates a builder-owned issue. Gate 3 should add semantic collision guidance only.

| Neighbor | Why required | Boros positive evidence | Exclusion/ambiguity need | Existing support | Proposed collision purpose |
|---|---|---|---|---|---|
| GENERIC_WR_OVERFIT | Same-color overfit risk; Boros can collapse into generic aggro/heroism. | 001-003, 006, split 007/012 | Exclude anger, violence, speed, or spectacle without civic protection/duty. | Boros claims after localization | Distinguish Boros institution/duty from generic WR playstyle. |
| WU / Azorius | Highest law/order/procedure overlap. | 001-003, 008 | Boros acts through immediate protective enforcement; Azorius prioritizes procedure/system/process. | Boros + certified WU packet | Separate action-under-harm from procedural governance. |
| LOREHOLD | History/justice/tradition/martial memory overlap. | 005, 008-011 | Boros is present-tense civic enforcement, not historical inquiry/precedent. | Boros + certified Lorehold packet | Distinguish action/duty from historical interpretation. |
| WG / Selesnya | Community/protection/collective duty overlap. | 001, 004, 006, 012 | Boros uses enforcement and disciplined force; Selesnya emphasizes communal harmony/consensus. | Boros claims; current WG packet only as non-certified comparator | Separate protective force from harmony/collective belonging. |
| BR / Rakdos | Red intensity, spectacle, transgression, violence risk. | 001-003, split 007 | Boros violence/action must be civic/protective, not performance or indulgence. | Boros claims; current BR packet only as non-certified comparator | Separate righteous enforcement from transgressive spectacle. |
| UR / Izzet | Red action/impulse and problem-solving overlap. | 001-003, 006 | Boros values duty/protection over experimentation/prototype curiosity. | Boros + certified UR packet | Separate decisive enforcement from inventive experimentation. |
| WB / Orzhov | Law, hierarchy, obligation, authority overlap. | 002-003, 008 | Boros public duty/protection differs from debt, leverage, extraction, or transactional order. | Boros claims; current WB packet only as non-certified comparator | Separate public enforcement from obligation/leverage. |
| MARDU | Martial honor/force/action overlap and existing generated lateral-inhibition target. | 001-004, 006, split 007 | Need evidence for Boros civic protection versus conquest/clan/survival/martial ambition. | Boros claims; Mardu not certified | Retain as required planning neighbor; complete with cautious comparator evidence later. |

### Generated/public copy risk plan

Generated/public files are stale consumers and must not be edited in Gate 2. Gate 3 should repair canonical source fields; Gate 4 should rebuild generated consumers.

| Current risk phrase/theme | Source canonical field/consumer | Status | Gate 3 action |
|---|---|---|---|
| "Righteous fury is still fury. It still wins." | WR faction tagline / recruiter context | Overbroad and unsupported as certification proof | Re-source or narrow/remove. |
| "righteousness is fire", "justice is the light", "burn bright" | WR philosophy/decree public copy | High-heat metaphor not currently source-bounded | Narrow/remove unless source-backed. |
| "rules stood between you and doing what was right" | core question / affinity copy | Potential unsupported rule-breaking framing | Narrow toward protective urgency with accountability. |
| Zeal/zealotry line | lore summary/core tension | Possibly useful only if source-backed | Preserve only with bounded unhealthy-expression evidence. |
| Generic aggression/militarism/violence/anger/punishment | Placement/recruiter implications | Overfit risk | Replace with civic protection, discipline, and accountable force. |
| Generic WR identity | Public/recruiter summary | Overfit risk | Add explicit Boros institution/duty boundary. |

### Provenance repair plan

WR provenance currently has 23 entries with null content hashes and 10 null canonical IDs. Several key-figure chains include discovery-only claims.

Gate 3 should stabilize canonical statements and evidence claim IDs; Gate 4 should regenerate provenance. The hash/null-ID repair itself should not require new source discovery, but invalid discovery/support evidence must be replaced by localized substantive claims before generation.

Affected categories:

- `/core_identity`
- `/profile`
- `/placement_summary`
- `/placement_axes/*`
- `/discriminator_questions/*`
- `/ideal_fit_indicators/*`
- `/poor_fit_indicators/*`
- `/canonical_flavor_text/*`
- `/historical_timeline/*`
- `/key_figures/*`

### Semantic fixture plan

Do not create fixture files in Gate 2. Gate 3/Gate 4 should prepare at least:

| Fixture | Intent | Expected interpretation | Required claims/sources | Required for certification |
|---|---|---|---|---|
| Core inclusion | User values disciplined public protection and immediate duty under harm. | Boros/WR positive inclusion. | 001-003 plus split 007. | Yes |
| Mature or pressure behavior | User acts visibly and accountably to protect others under pressure. | Boros mature expression, not generic aggression. | 001-004, 006, 008, split 007. | Yes |
| Generic WR exclusion | User wants fast red-white combat/hero fantasy without civic duty. | Exclude or lower Boros. | Generic WR boundary claim. | Yes |
| Azorius exclusion | User favors process, procedure, and institutional deliberation over immediate intervention. | Prefer/consider WU over Boros. | Boros boundary plus WU certified evidence. | Yes |
| Lorehold exclusion | User frames decisions through history, precedent, and interpretation. | Prefer/consider Lorehold over Boros. | Boros boundary plus Lorehold certified evidence. | Yes |
| Selesnya exclusion | User centers harmony, consensus, and belonging over enforcement. | Prefer/consider WG over Boros. | Boros boundary plus WG comparator evidence. | Yes |
| Rakdos exclusion | User seeks spectacle, transgression, and intensity for its own sake. | Exclude Rakdos-like red/black overfit. | Boros boundary plus BR comparator evidence. | Yes |
| Izzet exclusion | User seeks experimentation/prototyping more than duty/enforcement. | Prefer/consider UR over Boros. | Boros boundary plus certified UR evidence. | Yes |
| Orzhov exclusion | User centers debt, leverage, obligation, or transactional authority. | Prefer/consider WB over Boros. | Boros boundary plus WB comparator evidence. | Yes |
| Mardu exclusion | User centers conquest, clan/martial ambition, or survival honor rather than civic protection. | Ambiguous or non-Boros; comparator evidence required. | Boros boundary plus cautious Mardu comparator evidence. | Yes if Mardu remains required. |
| Nearest-collision ambiguous | User wants urgent harm prevention but also process/community/precedent. | Exercise uncertainty guidance, not forced Boros. | q9001-style claims plus neighbor evidence. | Yes |
| Provenance fixture | Assert WR generated/provenance chain points to localized substantive claims. | Provenance traceability preserved. | Stable canonical IDs/content hashes after Gate 4. | Yes |

### Exact Gate 3 remediation checklist

Required for certification:

1. Assign Contract v1.1 `semantic_role` values to all 24 Boros claims.
2. Add bounded `evidence_locations` for every claim retained as `substantive_claim`.
3. Keep claims 013-024 as `discovery_record` unless a later approved source-read extracts bounded substantive claims.
4. Split or narrow claim 007 into source-backed protection, moral urgency, teamwork, and action-under-pressure claims; demote unsupported parts.
5. Split or narrow claim 011 into character-specific Agrus Kos/Tajic evidence; remove or prove "ideological halves."
6. Split or narrow claim 012 into supported mechanics claims; keep Battalion if localized, keep Radiance only with targeted evidence.
7. Rebind profile core identity, philosophy, guild role, key figures, locations, mechanics, mature expression, unhealthy expression, failure/pressure behavior, and placement-facing summary to substantive claims only.
8. Remove discovery-only claims from authoritative key-figure, placement, generated-source, and provenance chains or move them to explicit discovery metadata.
9. Preserve Commander Compass only as auxiliary support; do not use product/card/deck material as semantic proof.
10. Create source-backed required-neighbor guidance for generic WR, WU/Azorius, Lorehold, WG/Selesnya, BR/Rakdos, UR/Izzet, WB/Orzhov, and Mardu.
11. Populate canonical collision guidance without changing scoring, inhibition values, confidence, scheduling, tie ordering, Hall, Crucible, or runtime behavior.
12. Narrow or remove canonical source wording that would regenerate unsupported "righteous fury," "burning," "rule-breaking," zeal, aggression, militarism, violence, anger, punishment, or simplistic justice framing.
13. Prepare canonical source support for Contract v1.1 semantic fixtures; create fixtures only in the authorized later gate if that is the repository pattern.
14. Leave generated artifacts and provenance rebuilds for Gate 4 after canonical remediation is complete.

Optional / non-blocking:

1. Normalize Boros local research into the same shape as other guild research after CRIT-001.
2. Add richer Commander-support containment notes if useful.
3. Retain additional key figures only where evidence is clean and bounded.

Out of scope for CRIT-001:

1. Runtime scoring, confidence calibration, scheduling, or tie-ordering changes.
2. Lateral-inhibition value changes.
3. Hall/Crucible changes.
4. Broad lore enrichment beyond the minimum evidence needed for certification.
5. UI or live recruiter tuning outside canonical/generated semantic consumers.

### Gate 2 validation

Run:

- git status --short --branch
- Read-only inspection of Boros claims, sources, profile, placement, generated WR consumers, provenance, local canon research, and Gate 1 report.
- git diff --check after documentation updates.

Intentionally deferred:

- Online lookup.
- Build/generation.
- Canonical Boros remediation.
- Generated artifact rebuild.
- Fixture creation.
- Candidate/certification commits.

### Final Gate 2 status

Gate 2 bounded evidence confirmation is complete.

Boros remains uncertified.

No Boros canonical or generated files were changed.

No other identity was started.

## Gate 3 Canonical Remediation

Gate 3 canonical remediation is complete. This gate changed Boros canonical raw data and VM-509 workflow/report records only. Generated artifacts, provenance manifests, fixtures, builders, validators, runtime behavior, scoring, inhibition, confidence calibration, scheduling, tie ordering, Hall, Crucible, and other identity packets were not changed.

Current branch: `codex/vm-509-boros-semantic-recovery`

Current HEAD at Gate 3: `cfc9e022cc23d00ab06f5c5b9d3bfc7db8129ad5`

### Canonical files changed

- `data/raw-factions/boros_legion/boros_legion.claims.json`
- `data/raw-factions/boros_legion/boros_legion.profile.json`
- `data/raw-factions/boros_legion/boros_legion.placement.json`
- `data/raw-factions/boros_legion/boros_legion.changelog.json`

`data/raw-factions/boros_legion/boros_legion.sources.json` was inspected but not changed.

### Blocker-by-blocker remediation

| Gate 1 / Gate 2 blocker | Gate 3 remediation |
|---|---|
| All 24 claims lacked `semantic_role`. | Classified all original 24 claims: claims 001-012 are now substantive after narrowing/localization; claims 013-024 are discovery-only. |
| Retained substantive claims lacked bounded evidence locations. | Added bounded reviewed-source-record evidence locations to every substantive claim. |
| Claims 007, 011, and 012 were compressed/interpretive. | Narrowed 007 to protection/public duty/teamwork/accountable action; narrowed 011 to Agrus Kos / Wojek investigator evidence only; narrowed 012 to Battalion-only mechanics evidence and removed authoritative Radiance use. |
| Authoritative profile references had no substantive claims. | Rebound core identity, great tension, profile summary, canonical flavor summary, timeline, and key figures to substantive claims only. |
| Key figures used discovery-only story-corpus records. | Removed discovery-only claims from key-figure proof chains; retained Aurelia, Razia, Feather, and Agrus Kos with narrowed support; Tajic was not retained as an authoritative key figure. |
| Boros semantic fixtures were missing. | Deferred to Gate 4, per Gate 3 scope. Canonical support for fixture creation is now present. |
| Required-neighbor boundaries were incomplete. | Added Boros-side required-neighbor claims and placement evidence for generic WR, Azorius/WU, Lorehold, Selesnya/WG, Rakdos/BR, Izzet/UR, Orzhov/WB, and Mardu. |
| `collision_guidance` was empty. | Added eight canonical collision-guidance entries with `lateral_inhibition: false`. No inhibition behavior/value changes were made. |
| Generated/public copy over-heated fury, burning, rule-breaking, and zeal. | Narrowed canonical profile/placement source wording to public protection, civic peacekeeping, disciplined teamwork, accountable action, and force bounded by protection. Generated consumers remain stale until Gate 4. |
| WR provenance had null/stale hashes and IDs. | Canonical sourceability was repaired by stabilizing evidence claim IDs and required-neighbor mappings. Generated provenance regeneration is deferred to Gate 4. |

### Claims classified by semantic role

| Role | Count | Claims |
|---|---:|---|
| `substantive_claim` | 24 | 001-012, 025-036 |
| `discovery_record` | 12 | 013-024 |
| `support_record` | 0 | none |
| unclassified | 0 | none |

### Claims retained as discovery-only

Claims 013 through 024 remain in the packet as discovery/search records only. They are marked `discovery_use_only: true` and `authoritative_semantic_use: false`. They must not be used as profile, placement, key-figure, generated, fixture, or provenance proof unless a later approved source-read extracts bounded substantive evidence.

### Claims split or narrowed

- `boros_legion_claim_007`: narrowed from broad placement wording into source-bounded protection, public duty, teamwork, and accountable action; generic white-red aggression is excluded.
- `boros_legion_claim_011`: narrowed from Agrus/Tajic "two ideological halves" into Agrus Kos / League of Wojek investigator evidence only.
- `boros_legion_claim_012`: narrowed from Battalion/Radiance and "widespread moral influence" into Battalion-only group-coordination mechanics evidence. Radiance is not retained as authoritative certification proof.
- `boros_legion_claim_025` through `boros_legion_claim_036`: added as minimal substantive claims for motivation/method, mature expression, unhealthy expression, failure/pressure behavior, and required-neighbor boundaries.

### Bounded evidence localization summary

Gate 3 used the same reviewed-source-record / bounded-paraphrase pattern already present in certified packets. No online lookup was performed.

Primary reviewed source records used:

- `src_wotc_flavorful_guide_guilds_ravnica_2018`
- `src_ravnica_novel_2005`
- `src_wotc_gatecrash_boros_lore_2013`
- `src_wotc_legends_karlov_manor_2024`
- `src_wotc_guilds_ravnica_mechanics_2018`

Unsupported high-heat wording was not retained, so no bounded source-localization approval was required.

### Support/product/card/mechanics isolation

Commander Compass remains auxiliary support only. Gate 3 removed discovery-only story-corpus claim IDs from Commander support chains and preserved the `do_not_use_as_claim_source` containment.

Mechanics are retained only where source-backed:

- Mentor remains supported by `src_wotc_guilds_ravnica_mechanics_2018`.
- Battalion remains supported by `src_wotc_gatecrash_boros_lore_2013`.
- Radiance is not retained as authoritative proof.

Local Boros research remains a discovery/planning guide, not direct certification proof.

### Profile evidence-chain repairs

- Core identity now uses claims 001, 002, 003, 025, 026, and 029.
- Great tension now uses substantive claims 002, 003, 007, 025-036.
- Key figures now use only substantive claims:
  - Aurelia: 004, 009
  - Razia: 005, 009
  - Feather: 009, narrowed to leadership-transition support
  - Agrus Kos: 008, 011
- Tajic was removed from authoritative key figures because Gate 3 did not establish clean non-discovery proof.
- Canonical flavor text was narrowed to public protection, civic peacekeeping, disciplined teamwork, and accountable action.

### Placement evidence-chain repairs

- Ideal fit indicators were rebound to claims 001, 002, 003, 004, 006, 008, 011, 012, 025, and 026.
- Poor fit indicators now distinguish conflict avoidance and generic force/spectacle without civic protection.
- Discriminator question 0002 was rewritten away from the unsupported "shady ally" framing.
- q9001 now carries the full required-neighbor set.
- Placement axes were narrowed away from "righteous zeal" into accountable force under constraint.
- Calibrated placement-summary fields were preserved.
- `calibration_tuning` values were not changed.

### Recruiter guidance evidence mappings

Added `semantic_guidance_evidence` entries for:

- match guidance,
- mismatch guidance,
- uncertainty questions.

Mappings point only to substantive Boros claims and are ready for Gate 4 generated propagation.

### Required-neighbor mappings

Selected required neighbors:

- `GENERIC_WR_OVERFIT`
- `AZORIUS_SENATE`
- `LOREHOLD`
- `SELESNYA_CONCLAVE`
- `RAKDOS_CULT`
- `IZZET_LEAGUE`
- `ORZHOV_SYNDICATE`
- `MARDU`

Each required neighbor now has Boros-side `required_neighbor_evidence` with positive/negative/ambiguity framing and claim support.

### Collision guidance added

Eight collision entries were added:

- `collision_boros_vs_generic_wr_overfit_gate3`
- `collision_boros_vs_azorius_senate_gate3`
- `collision_boros_vs_lorehold_gate3`
- `collision_boros_vs_selesnya_conclave_gate3`
- `collision_boros_vs_rakdos_cult_gate3`
- `collision_boros_vs_izzet_league_gate3`
- `collision_boros_vs_orzhov_syndicate_gate3`
- `collision_boros_vs_mardu_gate3`

All set `lateral_inhibition: false`; no lateral-inhibition behavior was changed.

### Public-copy narrowing

Canonical profile/placement copy was narrowed away from:

- righteous fury,
- burning/fire/light metaphors,
- rule-breaking as a positive trait,
- unsupported zeal/zealotry framing,
- generic aggression,
- violence/anger/punishment as identity proof,
- simplistic lawful-good framing,
- generic WR identity.

The retained Boros identity is: public protection, civic peacekeeping, disciplined teamwork, accountable action, and force bounded by protective duty.

### Items deferred to Gate 4

- Generated artifact rebuilds.
- Generated public/recruiter copy propagation.
- Generated provenance regeneration and content-hash repair.
- Semantic fixture creation.
- Source/generated validation.
- Generated-diff isolation and regression checks.
- Candidate creation.

### Remaining known limitations

- Generated WR artifacts are intentionally stale until Gate 4.
- `node research/validate-semantic-readiness.mjs --targets=WR` fails only for stale/missing generated provenance and missing semantic fixtures, expected after Gate 3.
- Discovery-only story-corpus rows remain in the canonical claims file as discovery metadata only.
- Boros remains uncertified.

### Gate 3 validation

Run:

- JSON parse checks for all Boros canonical raw files.
- `node research/audit-semantic-readiness.mjs --targets=WR`
- `node research/validate-semantic-readiness.mjs --targets=WR`
- generated/provenance diff isolation checks.
- `git diff --check`

Expected current validation state:

- Audit passes structurally with 36 claims: 24 substantive, 12 discovery, 0 support, 0 unclassified.
- Validator still fails on Gate 4-only stale/missing generated provenance and missing fixtures.

### Final Gate 3 status

Gate 3 canonical remediation is complete.

Boros remains uncertified.

Generated artifacts were not changed.

No other identity was started.


## Gate 4 Generation and Validation

Gate 4 completed: 2026-07-14.

### Gate 4 scope

Gate 4 rebuilt generated artifacts from the remediated Boros canonical packet, regenerated semantic-readiness provenance, added Boros Contract v1.1 fixtures, cleaned stale WR/Boros display-source public copy, and validated generated propagation. No recovery candidate or certification commit was created.

### Files changed during Gate 4

Generated/provenance outputs:

- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

Fixture output:

- `research/fixtures/semantic-readiness/boros_legion.semantic-fixtures.json`

Canonical blocker-resolution change:

- `data/raw-factions/boros_legion/boros_legion.placement.json` target identifiers only.

Workflow records were updated to document Gate 4 completion.

### Display-source cleanup

The preserved WR/Boros display surface in `data/factions.json` was narrowed to match Gate 3 canonical meaning and remove stale public/recruiter copy around righteous fury, righteousness-as-fire, burn-bright metaphors, zealotry, and unsupported rule-breaking framing.

Post-rebuild scans confirmed the stale Boros phrases are absent from `data/factions.json`, `data/placement-model.json`, and `supabase/functions/guild-recruiter/faction-context.ts`.

### Collision target preservation fix

Gate 4 initially exposed a generated-preservation blocker: canonical Boros had 8 collision entries, but generated WR preserved only 6 because two `against` targets were not generator-recognized.

Minimal target-normalization fix applied in `data/raw-factions/boros_legion/boros_legion.placement.json`:

- `collision_boros_vs_generic_wr_overfit_gate3`: `against` normalized from `generic_wr_overfit` to `WR`; the collision ID, separator text, evidence, and required-neighbor record continue to preserve the `GENERIC_WR_OVERFIT` guardrail without adding lateral-inhibition behavior.
- `collision_boros_vs_rakdos_cult_gate3`: `against` normalized from `rakdos_cult` to `cult_of_rakdos`, which generates as `BR` under existing repo conventions.

Generated WR collision guidance now preserves all 8 Gate 3 collision entries:

| Collision ID | Generated against | Required-neighbor meaning | lateral_inhibition |
|---|---:|---|---:|
| `collision_boros_vs_generic_wr_overfit_gate3` | `WR` | `GENERIC_WR_OVERFIT` guardrail | false |
| `collision_boros_vs_azorius_senate_gate3` | `WU` | `AZORIUS_SENATE` | false |
| `collision_boros_vs_lorehold_gate3` | `LOREHOLD` | `LOREHOLD` | false |
| `collision_boros_vs_selesnya_conclave_gate3` | `WG` | `SELESNYA_CONCLAVE` | false |
| `collision_boros_vs_rakdos_cult_gate3` | `BR` | `RAKDOS_CULT` | false |
| `collision_boros_vs_izzet_league_gate3` | `UR` | `IZZET_LEAGUE` | false |
| `collision_boros_vs_orzhov_syndicate_gate3` | `WB` | `ORZHOV_SYNDICATE` | false |
| `collision_boros_vs_mardu_gate3` | `MARDU` | `MARDU` | false |

No lateral-inhibition behavior/value changes were introduced.

### Semantic fixtures

Added Boros fixture coverage for:

- one core-inclusion fixture,
- one mature/pressure-behavior fixture,
- one exclusion fixture per required neighbor,
- one nearest-collision ambiguous fixture,
- one provenance fixture.

`node research/validate-semantic-readiness.mjs --fixtures` passed.

### Provenance and generated propagation

Post-rebuild checks confirmed:

- WR provenance entries have canonical content hashes.
- No discovery-only Boros claim `013`-`024` is used as WR semantic proof.
- No Commander/card/product source is used as WR semantic proof.
- No missing key-figure native canonical IDs were found in WR generated provenance.
- Changed WR generated consumers are covered by provenance:
  - `data/factions.json#/factions/WR`
  - `data/placement-model.json#/factions/WR`
  - `supabase/functions/guild-recruiter/faction-context.ts#FACTION_CONTEXT/WR`

### Gate 4 validation

Run and passed:

- `npm.cmd run build:factions`
- `node research/validate-semantic-readiness.mjs --targets=WR`
- `npm.cmd run validate:source-generated -- --targets=WR`
- `node research/validate-semantic-readiness.mjs --fixtures`
- `node research/audit-semantic-readiness.mjs --targets=WR`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- `node research/archscry-dossier-followup-tests.js`
- `npm.cmd run dossier:audit`
- generated-diff isolation dry-run against `HEAD`
- candidate-scope generated-consumer coverage dry-run against `HEAD`
- `git diff --check`

Validation results:

- Semantic readiness validation passed for WR.
- Source/generated guardrails passed for WR with one known builder-owned inhibitor warning.
- Contract fixtures passed.
- Audit reports 36 claims: 24 substantive, 12 discovery, 0 support, 0 unclassified.
- Semantic-readiness regression verified 1540 semantic provenance entries.
- Placement tests passed: 37 factions, 37 golden paths.
- Faction context isolation passed.
- Archscry dossier follow-up tests passed.
- Dossier audit remains 37 primary dossiers, 76 adjacent dossiers, 113 warnings, 0 failures.
- `git diff --check` passed; LF-to-CRLF notices were warnings only.

### Candidate-scope dry-run

Pre-candidate worktree scope dry-run passed:

- changed generated consumers are WR-only,
- unrelated generated/provenance content is unchanged,
- generated-consumer provenance coverage is complete,
- no non-Boros raw packet changed.

### Known warnings

- Known builder-owned Boros inhibitor warning remains unchanged: `inhibitor_traps[model_owned]`.
- Dossier audit remains at the known baseline: 113 warnings / 0 failures.
- Git reports the pre-existing user git-ignore permission warning for `C:\Users\obake/.config/git/ignore`.
- Git reports LF-to-CRLF working-copy warnings; `git diff --check` passes.

### Final Gate 4 status

Gate 4 generation and validation are complete.

Boros remains uncertified.

No recovery candidate has been created.

Boros is ready for Gate 5 candidate creation when explicitly authorized.


## Gate 5 Candidate Readiness

Gate 5 candidate creation authorized after Gate 4 completion.

Candidate parent SHA: `cfc9e022cc23d00ab06f5c5b9d3bfc7db8129ad5`.

Pre-candidate state:

- Gate 3 canonical remediation complete.
- Gate 4 generation and validation complete.
- Collision target preservation cleanup complete.
- Generated WR collision guidance preserves all 8 required-neighbor entries with `lateral_inhibition: false`.
- Stale Boros high-heat public copy remains absent.
- Candidate-scope dry-run is clean for generated isolation and generated-consumer coverage.
- Known builder-owned Boros inhibitor warning remains unchanged.
- Dossier audit remains 37 primary dossiers, 76 adjacent dossiers, 113 warnings, 0 failures.
- Boros remains uncertified.
- Recovery candidate SHA recorded by workflow-record commit: `abff94b91e94b99a6b2a77b71806a9d005ecec76`.


## Recovery Candidate Record

Candidate parent SHA: `cfc9e022cc23d00ab06f5c5b9d3bfc7db8129ad5`.

Candidate recovery SHA: `abff94b91e94b99a6b2a77b71806a9d005ecec76`.

Candidate commit message: `VM-509 create Boros semantic recovery candidate`.

Candidate contains Gate 3 canonical remediation, Gate 4 generated artifacts and provenance, Boros semantic fixtures, collision target preservation cleanup, Boros display-source/public-copy cleanup, and VM-509 workflow/report/handoff/board/index/ledger records through Gate 4 and candidate readiness.

Independent Gate 5 review is pending. Boros remains uncertified.
