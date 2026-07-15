# VM-508 Azorius Semantic Recovery

## Executive summary

Gate 1 audit only is complete for Azorius / WU under CRIT-001 Contract v1.1.

Primary disposition: **Claim-extraction pass required**.

Azorius is not a mature high-volume packet like Izzet. It is closer to the low-volume discovery-heavy pattern seen in the Strixhaven packets, but with a stronger official-guild core: 17 claim records, 13 source records, 7 likely substantive claim candidates, 10 discovery/search records, 2 claim-bearing sources, 1 support-only source, and 10 discovery-only sources.

Azorius cannot be certified with light role/provenance cleanup alone. The packet has useful official anchors for guild identity, lawmaking/enforcement/interpreting role, three-column institution structure, Azor, Dovin, and Addendum. However, many profile, placement, generated, and provenance chains currently cite MTG-Stories corpus/search records as if they were semantic proof. Placement core values are mostly search terms rather than source-backed values. Recruiter guidance lacks evidence mappings. Required-neighbor coverage is partial. Semantic fixtures are missing.

Gate 2 bounded evidence confirmation is required. No online source discovery is recommended from Gate 1; Gate 2 should first confirm which existing official/local sources can support extracted claims for mature expression, unhealthy expression, pressure behavior, public-good/process boundaries, and required-neighbor distinctions.

## Exact branch and SHA

- Branch: `codex/vm-508-azorius-semantic-recovery`
- Starting/current HEAD during Gate 1: `ad6322d4cb2120e83788a4af0dca7ef21cad4cc2`
- Accepted program base: `ad6322d4cb2120e83788a4af0dca7ef21cad4cc2`
- Base ancestry: current HEAD descends from `ad6322d4cb2120e83788a4af0dca7ef21cad4cc2`
- Canonical packet path used for audit: `data/raw-factions/azorius_senate/`
- Validator target used for audit: `WU`

## Worktree preservation statement

Preflight confirmed the active CRIT worktree path as `C:\dev\mtgSiteWIP-crit001` and branch as `codex/vm-508-azorius-semantic-recovery`.

The original main worktree at `C:\dev\mtgSiteWIP` was inspected only with read-only status checks. Its pre-existing dirty state was not modified.

No canonical Azorius raw files, generated artifacts, Hall/Crucible content, scoring, inhibition, confidence, scheduling, tie ordering, or global recruiter behavior were modified during Gate 1.

## Scope and non-goals

Gate 1 scope:

- inspect Azorius's existing canonical packet, generated consumers, provenance, local canon guides, validator expectations, readiness matrix entries, and recent CRIT workflow records;
- classify blockers and risks under Contract v1.1;
- produce a bounded Gate 2 recommendation.

Not in scope:

- canonical remediation;
- source discovery;
- generated rebuilds;
- semantic fixture creation;
- candidate or certification commits;
- changing certified identities;
- runtime tuning or public behavior changes.

## Pre-flight review summary

Recent related work:

- VM-502 Prismari, VM-506 Lorehold, VM-503 Quandrix, VM-504 Silverquill, VM-505 Witherbloom, and VM-507 Izzet / UR are certified `semantically_ready` under CRIT-001 Contract v1.1.
- VM-507 certification prepared Azorius as the next active identity only; no Azorius remediation had started.
- The CRIT ledger marks active identity `AZORIUS`, with raw packet `data/raw-factions/azorius_senate/`.

Current known risks:

- Azorius has low claim volume and a discovery-heavy source shape.
- Public/profile/placement copy may overstate law, order, control, bureaucracy, stasis, authoritarianism, or moral certainty if not traced to bounded official evidence.
- MTG-Stories corpus rows are discovery/search aids and cannot serve as authoritative proof chains unless later replaced by accepted source-backed claims.

Relevant decisions already made:

- Contract v1.1 requires semantic roles, bounded evidence, full source-to-runtime traceability, required-neighbor boundaries, and semantic fixtures.
- Discovery/search records and support/product records cannot prove identity semantics.
- Frozen confidence, inhibition, scheduling, scoring, Hall, Crucible, and global recruiter behavior must not change in identity recovery.

Files recently changed by prior CRIT stages:

- Certified identity packets and generated artifacts for Prismari, Lorehold, Quandrix, Silverquill, Witherbloom, and Izzet.
- CRIT ledger, board, readiness matrix, and handoff records for those certifications.

What should not be touched:

- Any non-Azorius identity packet.
- Generated artifacts during Gate 1.
- Contract v1.1, schema, validators, builder scripts, Hall, Crucible, scoring, inhibition, confidence, scheduling, tie ordering, or global recruiter behavior.

## Local research boundary

Inspected local canon/research guides only:

- `docs/research/canon/ten-guild-reference-audit.md`
- `docs/reference/ravnica-guild-source-readiness-matrix.md`

Relevant local guide findings:

- The ten-guild audit frames Azorius as WU, "order as a civic machine," with a "Slow and Steady" official two-color hook and internal Vox Mana axes around legislation, enforcement, adjudication, bureaucracy, surveillance, precedent, sky authority, and civic protection.
- The Ravnica guild source-readiness matrix records Azorius as `data/raw-factions/azorius_senate/`, with 13 source rows: 2 claim-bearing, 1 support-only, and 10 discovery-only.

These local research docs were used as audit guides only, not as final proof.

## Claim-role audit

Structural counts from `data/raw-factions/azorius_senate/azorius_senate.claims.json`:

| Measure | Count |
|---|---:|
| Total claims | 17 |
| `identity` | 1 |
| `role` | 1 |
| `organization` | 1 |
| `history` | 1 |
| `leadership` | 1 |
| `mechanics` | 1 |
| `placement` | 1 |
| `story_corpus_evidence` | 10 |

Source-role structure from `data/raw-factions/azorius_senate/azorius_senate.sources.json`:

| Source role | Count |
|---|---:|
| claim-bearing | 2 |
| support-only | 1 |
| discovery-only | 10 |

Audit-only role summary:

| Role | Count | Audit confidence | Notes |
|---|---:|---|---|
| `substantive_claim` | 7 likely candidates | High | `azorius_senate_claim_001` through `azorius_senate_claim_007` are claim-like records grounded in official guide/mechanics sources. They still need certifying `semantic_role` and bounded evidence locations. |
| `discovery_record` | 10 likely candidates | High | `azorius_senate_claim_0008` through `azorius_senate_claim_0017` are MTG-Stories corpus/search-hit records. They are useful leads, not semantic proof. |
| `support_record` | 0 current claim records | Medium | There is a support-only source record for Dragon's Maze mechanics, but no current claim is clearly a support-only claim. Commander/card/product surfaces still need auxiliary isolation. |
| `unclassified` | 17 current validator state | High | Every claim lacks `semantic_role`; this blocks certification. |

Assessment:

- Claims 001-007 are likely substantive candidates but need bounded evidence localization and may require narrowing.
- Claims 0008-0017 are discovery/search records only.
- Azorius is low-volume and discovery-heavy. It is not ready with simple role labels because several Contract dimensions are currently unsourced or discovery-backed.

## Discovery-record audit

Discovery/search records are currently used as semantic proof. This is a certification blocker.

Examples:

- `profile.core_identity`, `site_surface`, `structure`, and `great_tension` cite discovery claims `azorius_senate_claim_0008` through `azorius_senate_claim_0012`.
- `profile.key_figures` uses discovery claims for Azor, Isperia, Dovin Baan, and Lavinia. Lavinia currently depends only on discovery/search records.
- `profile.mechanics` cites discovery claims for Addendum instead of the official mechanics claim.
- `placement_summary`, `placement_axes[0]`, `moral_and_psychological_profile`, `core_values[0..9]`, `behavioral_signals[0]`, and `inhibitor_traits[0]` cite discovery/search records.
- Generated provenance has 40 WU rows, and the first discovery-backed rows propagate to `data/factions.json`, `data/placement-model.json`, and `supabase/functions/guild-recruiter/faction-context.ts`.

Discovery records are not harmless bibliography leads in the current packet. They are blockers until isolated from authoritative profile, placement, generated, and provenance chains.

## Support-record audit

Support-only source:

- `src_wotc_dragons_maze_mechanics_2013`

Findings:

- The top-level profile source summary includes this support-only source beside claim-bearing official sources.
- Commander Compass and product/card/play-pattern surfaces contain terms such as Stax, Control, Blink, Rules Enforcement, Detain, "The law is absolute," and "Legislative control." These may be useful Commander texture but should remain auxiliary and not prove Azorius identity.
- The support-only source is not itself the central blocker; the main blocker is discovery-record proof contamination. Gate 3 should still isolate support/card/product material from identity-basis chains.

Potential support/discovery issue table:

| File | JSON pointer or line | Statement | Cited claim/source | Problem | Severity |
|---|---|---|---|---|---|
| `azorius_senate.profile.json` | `/core_identity` | Summary/philosophy/central tension | `azorius_senate_claim_0008`-`0015` | Discovery/search records support authoritative identity text. | BLOCKER |
| same | `/site_surface` | Public display summary/tagline chain | `azorius_senate_claim_0008`-`0011` | Discovery-backed public proof chain. | BLOCKER |
| same | `/structure` | Institutional structure summary | `azorius_senate_claim_0008`-`0011` | Should be supported by claim 003/official guide, not corpus hits. | BLOCKER |
| same | `/great_tension` | Law hardens into paralysis | `azorius_senate_claim_0008`-`0012` | Interpretive tension is discovery-backed and may overstate source. | BLOCKER |
| same | `/key_figures/0` | Azor key-figure chain | `001`-`007` plus `0008`-`0017` | Mixed substantive and discovery proof; needs isolation. | HIGH |
| same | `/key_figures/1` | Isperia key-figure chain | `005`, `0008`, `0009`, `0010`, `0013`, `0016` | Discovery records support key figure. | HIGH |
| same | `/key_figures/2` | Dovin Baan key-figure chain | `005`, `0008`, `0009`, `0010`, `0011`, `0013`, `0014` | Discovery records support key figure; claim 005 may support only bounded leadership. | HIGH |
| same | `/key_figures/3` | Lavinia key-figure chain | `0008`, `0009`, `0010`, `0014`, `0015` | Lavinia has no substantive support in current claims. | BLOCKER if retained |
| same | `/canonical_flavor_text/0` | Dossier-anchor flavor summary | `0008`-`0012` | Discovery-backed flavor proof; should be auxiliary or replaced. | MEDIUM |
| same | `/mechanics` | Addendum as order/timing/procedural discipline | `0008`-`0011` | Should use mechanics claim/source; current chain is discovery-backed. | BLOCKER |
| same | `/data_quality/corpus_upgrade` | Corpus evidence added | `0008`-`0017` | Probably data-quality metadata, but must not enter semantic proof chains. | MEDIUM |
| `azorius_senate.placement.json` | `/placement_summary` | Existing placement summary | `0008`-`0015` plus `001`-`006` evidence | Mixed discovery and official support; public summary mentions corpus evidence. | BLOCKER |
| same | `/placement_axes/0` | Corpus evidence adds story-context support | `0008`-`0015` | Search-hit axis is not semantic evidence. | BLOCKER |
| same | `/moral_and_psychological_profile` | Moral/psychological placement profile | `0008`-`0012` | Discovery-backed interpretation. | BLOCKER |
| same | `/core_values/0..9` | Terms such as Azorius Senate, Azor, Isperia, Dovin, Lavinia, Prahv, New Prahv, detain | `0008`-`0010` | These are search terms/inventory, not source-backed values. | BLOCKER |
| same | `/behavioral_signals/0` | Corpus-backed specificity behavioral signal | `0008`-`0013` | Discovery-backed behavioral proof. | BLOCKER |
| same | `/inhibitor_traits/0` | Generic color-pair overfit with corpus-upgrade rationale | `0008`-`0011` | Concept may be valid, but current support is discovery-backed. | HIGH |

## Profile entailment audit

| Section | Result | Notes |
|---|---|---|
| Core identity | FAIL | Basic source exists, but current roles are missing and nested proof chain is discovery-backed. |
| Philosophy | FAIL | Law, precedent, procedure, and enforcement framing is plausible from official guide, but current support is not clean and bounded. |
| Internal tension | FAIL | "Law hardens into paralysis" may be useful, but current evidence is discovery/search and may overstate source. |
| Guild/institutional role | PASS WITH NON-BLOCKING LIMITATION | Claim 002/003 likely support lawmaking/enforcement/interpreting and three-column structure; current nested chains still cite discovery records. |
| Key figures | FAIL | Azor is supported by claim 004; Dovin is partly supported by claim 005; Isperia and Lavinia are discovery-contaminated or unsupported in current proof chains. |
| Locations | UNRESOLVED | Prahv/New Prahv appear as search terms, not bounded location evidence. |
| Mechanics or play-pattern evidence | FAIL | Addendum has a substantive official mechanics source, but the profile mechanics section cites discovery records and overinterprets discipline without clean evidence mapping. |
| Mature expression | FAIL | Needs extracted source-backed claims for process as public protection/fairness/restraint. |
| Unhealthy expression | FAIL | Needs extracted source-backed claims or narrowed wording for delay, over-control, bureaucracy, paralysis, or authoritarian drift. |
| Failure or pressure behavior | FAIL | Not sufficiently source-backed; current pressure behavior is inferred from discovery/corpus chains. |
| Placement-facing summary | FAIL | Mixed official and discovery support; corpus language must be removed or isolated. |

## Placement entailment audit

| Section | Result | Notes |
|---|---|---|
| Placement summary | FAIL | Discovery/corpus-backed summary; needs source-backed claims and evidence-only mapping. |
| Core values | FAIL | Current values are mostly search terms, not values. Replace or support with law/procedure/precedent/restraint/public-process concepts during remediation. |
| Behavioral signals | FAIL | First signal is corpus-backed; string-list signals lack evidence mapping. |
| Positive guidance | PASS WITH NON-BLOCKING LIMITATION | Ideal/good-fit guidance mostly aligns with official role claims, but claims lack roles and some wording needs bounded support. |
| Negative guidance | PASS WITH NON-BLOCKING LIMITATION | Poor-fit guidance is plausible but needs evidence mappings and overbreadth review. |
| Uncertainty guidance | FAIL | Recruiter uncertainty questions lack evidence mappings. |
| Raw discriminator questions | PASS WITH NON-BLOCKING LIMITATION | Three questions exist and cite official claims, but `q_azorius_senate_9001` has empty purpose/supports/weakens fields and limited neighbor coverage. |
| Neighbor guidance | FAIL | Existing collision rows cover Selesnya, Boros, and Orzhov only; expected Azorius-side boundaries are broader. |
| Collision guidance | FAIL | Three rows are useful starts, but required-neighbor coverage and claim/source mappings are incomplete. |
| Recruiter-facing guidance | FAIL | Match, mismatch, and uncertainty guidance lacks `semantic_guidance_evidence` / evidence mapping. |

## Required dimensions matrix

| Contract v1.1 dimension | Result | Gate 1 evidence |
|---|---|---|
| Core identity | FAIL | Basic source exists, but current roles are missing and nested proof chain is discovery-backed. |
| Internal tension | FAIL | Tension copy is discovery-backed and possibly overbroad. |
| Motivation | FAIL | Public-good/process motivation is plausible but needs extracted, bounded claims. |
| Preferred method | FAIL | Law/procedure/enforcement method exists in official guide but needs clean proof chains. |
| Mature expression | FAIL | Not yet explicitly claim-supported. |
| Unhealthy expression | FAIL | Delay/paralysis/control drift needs support or narrowing. |
| Failure or pressure behavior | FAIL | Not yet source-backed. |
| Positive inclusion evidence | FAIL | Guidance lacks evidence mappings and claims lack roles. |
| Negative exclusion evidence | FAIL | Negative guidance lacks evidence mappings and full neighbor support. |
| Ambiguous or uncertainty evidence | FAIL | Recruiter uncertainty guidance lacks mappings. |
| Required-neighbor boundaries | FAIL | Only partial collision rows exist; no full required-neighbor set. |
| Source-to-runtime traceability | FAIL | Generated provenance includes discovery-backed chains; fixtures missing. |

## Required-neighbor audit

Bounded required-neighbor set recommended for Gate 2 confirmation:

| Neighbor | Why required | Current Azorius-side status |
|---|---|---|
| `GENERIC_WU_OVERFIT` | Same-color generic WU/order/control/caution can overfit Azorius. | Guardrail exists conceptually but is discovery-backed. |
| `ORZHOV_SYNDICATE` / WB | Law/contract/institution overlap; existing collision row. | Useful row exists, but needs claim/source support and evidence mapping. |
| `BOROS_LEGION` / WR | Justice/order/protection overlap; existing collision row. | Useful row exists, but needs claim/source support and evidence mapping. |
| `SELESNYA_CONCLAVE` / WG | Civic harmony/community vs enforceable procedure; existing collision row. | Useful row exists, but needs claim/source support and evidence mapping. |
| `IZZET_LEAGUE` / UR | Certified Izzet now has Azorius boundary pressure around experiment vs procedure; Azorius should reciprocate. | Missing from current collision guidance. |
| `HOUSE_DIMIR` / UB | Blue institutional/information/control overlap, especially secrecy vs public law. | Missing from current collision guidance. |
| `SIMIC_COMBINE` / UG | Blue system-design overlap; procedure/civic order vs adaptive biological optimization. | Missing; Gate 2 should confirm whether evidence justifies required status or non-blocking guardrail. |

Gate 1 does not perform a 37-by-37 comparison. For all listed neighbors, current packet lacks complete Azorius-side positive inclusion, negative/exclusion, ambiguous/uncertainty, claim/source support, and generated-context preservation.

## Generated propagation audit

Generated consumers inspected:

- `data/factions.json`
- `data/placement-model.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `data/semantic-readiness-provenance.json`

Findings:

- Generated WU faction copy includes strong public language such as "Order is not a constraint. It is civilization itself," "only thing standing between civilization and collapse," and "inventing more laws." These may be acceptable if later supported or narrowed, but they currently inherit from a packet with missing semantic roles and discovery contamination.
- Generated placement/recruiter content preserves three discriminator questions and three collision rows, but recruiter guidance has no evidence mappings.
- Generated provenance has 40 WU entries. Multiple entries propagate discovery-backed claim IDs `azorius_senate_claim_0008` through `azorius_senate_claim_0013` to faction, placement, and recruiter context consumers.
- No internal claim IDs were observed leaking into public recruiter prose, but provenance itself records internal IDs as expected.
- Missing fixtures block Contract v1.1 validation.

Generated propagation status: FAIL.

## Maturity / packet test

Chosen result: **Thin-packet pattern confirmed; claim extraction and conceptual expansion required.**

Evidence:

- Only 17 claim records exist.
- 10 of 17 claim records are discovery/search records.
- Only 2 of 13 source records are claim-bearing.
- All 17 claims lack certifying `semantic_role`.
- Validation reports 26 potential role-invalid support links and broad authoritative dependence on discovery/search rows.
- Placement core values are search terms rather than source-backed Azorius values.
- Required-neighbor boundaries and semantic fixtures are incomplete.

Nuance: Azorius is not empty. Claims 001-007 provide a useful official foundation and may avoid complete packet reconstruction.

## Findings by severity

### BLOCKER

- All 17 Azorius claims lack certifying `semantic_role`.
- Discovery/search claims `azorius_senate_claim_0008` through `azorius_senate_claim_0017` support authoritative profile, placement, generated, and provenance chains.
- Placement core values and behavioral signals are discovery/search backed rather than source-backed conceptual values.
- Recruiter match, mismatch, and uncertainty guidance lacks evidence mappings.
- Required-neighbor boundaries are incomplete and not mapped to claim/source support.
- Generated provenance carries discovery-backed semantic chains into public/generated consumers.
- Semantic fixtures are missing.

### HIGH

- Key-figure chains mix official and discovery evidence; Lavinia is currently discovery-only if retained.
- Addendum/mechanics identity text has an official mechanics source but current profile mechanics chain cites discovery records.
- Public/generated copy risks overstatement around law, order, civilization/collapse, bureaucracy, delay, stasis, and control.
- Commander/card/product support needs auxiliary isolation from identity-basis and key-figure proof.

### MEDIUM

- Existing Selesnya/Boros/Orzhov collision rows are useful but incomplete and unmapped.
- `q_azorius_senate_9001` has useful collision targets but empty purpose/supports/weakens fields.
- Support-only Dragon's Maze mechanics source appears in strongest-source surfaces and should be isolated.

### LOW / NON-BLOCKING OBSERVATION

- Product-facing phrasing and local synthesis guides should be used carefully, not as proof unless source-authority rules allow it.

## Primary disposition

**Claim-extraction pass required.** Gate 2 evidence confirmation is required.

## Minimal bounded repair list

### Required for certification

1. Assign certifying semantic roles to all 17 claims.
2. Classify claims 001-007 as likely substantive and claims 0008-0017 as discovery records, unless Gate 3 bounded localization proves a narrower role is needed.
3. Add bounded evidence locations to all substantive claims.
4. Extract minimal new substantive claims for public-good/process motivation, internal tension, mature expression, unhealthy expression, pressure behavior, mechanics interpretation, retained key figures, and required-neighbor boundaries.
5. Remove discovery records from profile, placement, generated, and provenance proof chains.
6. Replace search-term core values and discovery-backed behavioral signals with source-backed conceptual values.
7. Add recruiter evidence mappings and complete required-neighbor collision guidance.
8. Isolate Commander/card/product, Dragon's Maze, and corpus material as auxiliary/discovery only.

### Optional / non-blocking

- Use local Azorius synthesis as wording guidance only unless source-authority rules allow it as proof.
- Defer broad lore enrichment or Commander copy polish until after semantic recovery.

### Out of scope for CRIT-001

- Runtime scoring, Hall/Crucible tuning, inhibition behavior, confidence calibration, scheduling, tie ordering, global recruiter behavior, and broad lore enrichment.

## Gate 2 Evidence Confirmation

Gate 2 is complete as an audit-only evidence plan. No canonical Azorius files, generated artifacts, fixtures, or runtime files were modified.

Gate 2 conclusion: existing listed official sources, current Azorius claims, local canon guides, and current neighbor/comparison records are sufficient to plan bounded Gate 3 remediation. No broad or targeted online source discovery is required right now. Gate 3 may need bounded source-localization approval if exact passage locators for already-listed official URLs cannot be established from local caches or source records.

### Claim-role mapping summary

| Claim ID | Current type | Proposed role | Reason | Needs locator? | May support |
|---|---|---|---|---|---|
| `azorius_senate_claim_001` | `identity` | `substantive_claim` | Official guide-backed WU/Ravnica/law-order identity floor. | Yes: Azorius section of official guide. | Core identity, public copy, generic WU guardrail, fixtures. |
| `azorius_senate_claim_002` | `role` | `substantive_claim` | Official guide-backed lawmaking/enforcing/interpreting role. | Yes. | Institution, method, guidance, collision rows. |
| `azorius_senate_claim_003` | `organization` | `substantive_claim` | Official guide-backed Sova/Jelenn/Lyev structure. | Yes. | Structure, procedure, documented systems. |
| `azorius_senate_claim_004` | `history` | `substantive_claim` | Official guide-backed Azor founder/Guildpact history. | Yes. | Historical timeline, Azor key figure. |
| `azorius_senate_claim_005` | `leadership` | `substantive_claim` | Official guide-backed Dovin/Isperia-era leadership. | Yes. | Dovin key figure, Isperia context if narrowed. |
| `azorius_senate_claim_006` | `mechanics` | `substantive_claim` | Official mechanics article ties Addendum to Azorius. | Yes: Addendum section. | Mechanics, question purposes, fixture. |
| `azorius_senate_claim_007` | `placement` | `substantive_claim`, narrowed if needed | Supported interpretation from official guide + mechanics. | Yes. | Placement, recruiter guidance, generic WU guardrail. |
| `azorius_senate_claim_0008`-`azorius_senate_claim_0017` | `story_corpus_evidence` | `discovery_record` | Search-hit/corpus leads only. | No certification locator unless promoted by later source-read pass. | Discovery metadata only. |

Summary: 7 likely substantive claims, 10 discovery records, 0 support records, 0 unclassified after proposed remediation. Canonical data was not modified.
### Claim-extraction plan

| Proposed new claim purpose | Existing source to read first | Bounded locator if known | Supports | Scope | Required? |
|---|---|---|---|---|---|
| Civic/legal institution identity: Azorius as WU Ravnica guild of law, order, legislation, enforcement, and procedure. | `src_wotc_flavorful_guide_ravnica_allegiance_2019` | Missing exact locator; use Azorius Senate section. | Core identity, source-to-runtime traceability. | Identity-wide. | Required. |
| Public-good/process motivation: rules and enforceable structure as protective/fairness tools, not generic control. | Official guide; local ten-guild audit only as guide. | Missing exact official locator. | Philosophy, match guidance, core-inclusion fixture. | Project synthesis. | Required. |
| Internal tension: procedure/restraint can become delay, rigidity, or process-over-people. | Official guide first; `ten-guild-reference-audit.md` lines 82-86 as guide. | Local guide locator known; official locator missing. | Great tension, unhealthy expression. | Project synthesis. | Required; narrow if evidence is thin. |
| Preferred method: legislation, interpretation, enforcement, columns, documentation, precedent, proper channels. | Official guide. | Missing exact locator. | Structure, core values, collision guidance. | Institution-specific. | Required. |
| Addendum as bounded timing/procedure evidence. | `src_wotc_ravnica_allegiance_mechanics_2018` | Missing exact locator; Addendum section. | Mechanics, mechanics fixture. | Mechanic-specific. | Required. |
| Mature expression: impartial process/documentation/enforceable rules used to protect fairness and auditability. | Claims 001-003/007 plus official guide. | Missing exact locator. | Mature expression, positive inclusion. | Project synthesis. | Required. |
| Unhealthy expression: legalism, bureaucratic delay, or procedural rigidity when rules become self-justifying. | Official guide first; local shadow line as guide. | Missing exact official locator. | Negative exclusion, mismatch guidance. | Project synthesis. | Required; conservative wording. |
| Failure/pressure behavior: under pressure, Azorius prefers adjudication/proper channels; if unsupported, narrow from "paralysis" to "procedure first." | Official guide + current placement synthesis. | Missing exact locator. | Pressure behavior, q9001, ambiguous fixture. | Project synthesis. | Required. |
| Key-figure cleanup for Azor and Dovin; optional Isperia; Lavinia only if source-supported. | Official guide for Azor/Dovin/Isperia; discovery story rows only as leads. | Azor/Dovin official locators missing; Lavinia unavailable locally. | Key figures/provenance. | Character-specific. | Required for retained figures only. |
| Required-neighbor boundaries for generic WU, Orzhov, Boros, Selesnya, Izzet, Dimir, Simic. | Existing claims, collision rows, ten-guild guide, certified Izzet boundary records. | Local guide neighbor summaries known; exact proof locators missing. | Collision guidance, fixtures, recruiter guidance. | Cross-identity synthesis. | Required for selected set. |

### Bounded evidence localization plan

| Claim/group | Source ID | Existing locator | Missing locator | Source sufficient? | Gate 3 disposition | Dimensions |
|---|---|---|---|---|---|---|
| Claims 001-005 | `src_wotc_flavorful_guide_ravnica_allegiance_2019` | URL only. | Exact Azorius passages for identity, role, columns, Azor, Dovin/Isperia. | Likely. | Add locators; narrow claim 001/005 if needed. | Core, institution, key figures. |
| Claim 006 | `src_wotc_ravnica_allegiance_mechanics_2018` | URL only. | Exact Addendum passage. | Yes for mechanic association/timing. | Add locator; do not overuse for broad psychology. | Mechanics. |
| Claim 007 | Official guide + mechanics | URL only. | Passages supporting process/fairness/restraint/timing. | Partial. | Split or narrow if needed. | Placement, motivation, mature expression. |
| Claims 0008-0017 | MTG-Stories archive rows | Repository URLs. | None needed for proof. | No. | Keep as discovery-only. | None as proof. |
| Dragon's Maze source | `src_wotc_dragons_maze_mechanics_2013` | URL only. | None needed. | No for identity proof. | Auxiliary/support-only; remove from strongest semantic sources. | Auxiliary only. |

### Discovery-record replacement plan

| Current chain | Discovery evidence now used | Replacement | Gap/action | Disposition |
|---|---|---|---|---|
| `/core_identity` | Claims 0008-0015 | Claims 001-003/007 + new motivation/tension claims. | Add locators; remove discovery IDs. | Preserve/narrow. |
| `/site_surface` | Claims 0008-0011 | Claims 001-002/007 + public-good claim. | Support or narrow tagline. | Likely narrow. |
| `/structure` | Claims 0008-0011 | Claims 002-003. | Official guide locator. | Preserve. |
| `/great_tension` | Claims 0008-0012 | New internal-tension/unhealthy claim. | Avoid unsupported "paralysis." | Preserve narrowed. |
| `/key_figures/0` Azor | Mixed all claims. | Claim 004 + institution context. | Remove discovery. | Preserve narrowed. |
| `/key_figures/1` Isperia | Claim 005 + discovery. | Claim 005 only if it supports context. | Add source-backed Isperia claim or narrow/remove. | Narrow/remove if unsupported. |
| `/key_figures/2` Dovin | Claim 005 + discovery. | Claim 005. | Locator. | Preserve narrowed. |
| `/key_figures/3` Lavinia | Discovery only. | None current. | Needs official/local support or removal. | Remove/narrow unless supported. |
| `/mechanics` | Claims 0008-0011. | Claim 006 + bounded mechanic claim. | Add Addendum locator; narrow discipline language. | Preserve narrowed. |
| Placement summary/axis/moral profile | Claims 0008-0015. | Claims 001-003/006/007 + new mature/pressure claims. | Remove corpus language. | Preserve narrowed. |
| `/core_values/0..9` | Claims 0008-0010. | New conceptual claims. | Replace search terms. | Replace. |
| `/behavioral_signals/0` | Claims 0008-0013. | Claims 001-003/007 + new behavior claims. | Replace corpus-story language. | Replace. |
| `/inhibitor_traits/0` | Claims 0008-0011. | Generic WU guardrail claim. | Re-source. | Preserve concept, replace support. |
| Generated provenance discovery rows | Claims 0008-0017 / mixed chains. | Repaired canonical proof chains. | Rebuild only in Gate 4. | Repair later. |

### Support-record isolation plan

| Support/product record | Current use | Gate 3 disposition |
|---|---|---|
| `src_wotc_dragons_maze_mechanics_2013` | Profile `strongest_source_ids`; support-only Dragon's Maze/Implicit Maze context. | Remove from strongest semantic proof surfaces or label auxiliary only. |
| Commander Compass identity basis | Stax, Control, Rules Enforcement, Detain, "The law is absolute," "Legislative control." | Keep `reviewed_not_canonical_lore`; ensure no authoritative proof/provenance dependency. |
| Commander recommendations | Product/card source_basis uses discovery claims for Isperia/Lavinia/Grand Arbiter. | Keep auxiliary only; replace with substantive claims only where supported. |
| Addendum mechanics chain | Profile mechanics uses discovery claims despite claim 006. | Replace with claim 006/new mechanic claim; no support-only source as proof. |
### Profile support plan

| Section | Existing support | Missing support | Gate 3 plan |
|---|---|---|---|
| Core identity | Claims 001-003 can support. | Roles, locators, discovery removal. | Preserve and re-source. |
| Philosophy | Claims 002/007 partially support. | Public-good/process motivation claim. | Preserve narrowed. |
| Internal tension | Discovery-backed only. | Internal tension/unhealthy claim. | Preserve only if narrowed and supported. |
| Guild/institutional role | Claims 002-003. | Bounded locator. | Preserve. |
| Key figures | Claim 004 for Azor; claim 005 for Dovin/Isperia context. | Isperia/Lavinia support if retained. | Preserve Azor/Dovin; narrow/remove unsupported figures. |
| Locations | Prahv/New Prahv are discovery terms. | Location source support. | Remove from proof unless supported. |
| Mechanics/play-pattern | Claim 006. | Addendum locator; avoid overbroad discipline. | Preserve narrowed. |
| Mature expression | None explicit. | New mature claim. | Add and map. |
| Unhealthy expression | Discovery/local-synthesis only. | New conservative unhealthy claim. | Add or narrow. |
| Failure/pressure behavior | None explicit. | New pressure behavior claim. | Add or narrow. |
| Placement-facing summary | Claims 001-003/007 partially. | Remove corpus language and add mappings. | Preserve narrowed. |

### Placement support plan

| Section | Existing support | Missing support | Gate 3 plan |
|---|---|---|---|
| Placement summary | Claims 001-006 as `evidence_claim_ids`; invalid discovery `claim_ids`. | Motivation/tension/pressure claims. | Remove discovery IDs; preserve narrowed. |
| Core values | Search terms only. | Conceptual source-backed values. | Replace with procedure, precedent, enforceable process, civic restraint, documented fairness only if supported. |
| Behavioral signals | One discovery-backed object plus unmapped strings. | Evidence mappings. | Replace first signal; map strings. |
| Positive guidance | Claims 001-003. | Roles/locators and mature-expression claim. | Preserve with mappings. |
| Negative guidance | Claims 001-003. | Anti-fit/pressure evidence. | Preserve narrowed and mapped. |
| Uncertainty guidance | No mapping. | q1/q2 claim mappings. | Add mappings. |
| Raw discriminator questions | q1/q2/q9001 cite claims 001-003. | q9001 empty support fields; more neighbor coverage. | Preserve q1/q2, complete q9001. |
| Question purposes | Mostly useful; q9001 incomplete. | Evidence-backed purpose/support/weakens. | Fill in Gate 3. |
| Neighbor guidance | Rows for Selesnya/Boros/Orzhov. | Dimir/Simic/Izzet/generic WU and mappings. | Add bounded rows. |
| Collision guidance | Three rows, no lateral behavior needed. | Required-neighbor support. | Expand without lateral-inhibition changes. |
| Recruiter-facing guidance | Strings only. | Evidence claim mappings. | Add mappings. |

### Recruiter guidance evidence mapping plan

| Guidance item | Proposed support | Gap / Gate 3 action |
|---|---|---|
| Match: asks what rule applies before acting | Claims 001, 002, new preferred-method claim. | Add evidence mapping after roles/locators. |
| Match: values fairness through process | Claim 002, claim 007 narrowed, new mature-expression claim. | Support public-good/fairness wording. |
| Match: likes airtight systems and documented precedent | Claim 003 plus new method/documentation claim. | Narrow if "airtight" overstates source. |
| Mismatch: prefers impulse over process | Claim 007, new pressure/unhealthy claim, Boros boundary claim. | Avoid anti-impulse stereotype. |
| Mismatch: treats exceptions as automatically noble | Claim 007 + new internal-tension/pressure claim. | Narrow to process-vs-exception evidence. |
| Mismatch: rejects institutions even when they protect people | Claims 001-003 + new public-good claim. | Support "protect" or narrow. |
| Uncertain q1 | Claims 001-003, 007, new motivation claim. | Add mapping. |
| Uncertain q2 | Claims 001-003, new mature/pressure claim. | Add mapping. |

### Collision guidance and required-neighbor evidence plan

Required-neighbor set for Gate 3: `GENERIC_WU_OVERFIT`, `ORZHOV_SYNDICATE`, `BOROS_LEGION`, `SELESNYA_CONCLAVE`, `IZZET_LEAGUE` / `UR`, `HOUSE_DIMIR`, `SIMIC_COMBINE`.

| Neighbor | Why required | Positive Azorius evidence | Negative/exclusion evidence | Ambiguous handling | Existing claims | Proposed new claims | Evidence gap | Collision purpose | Lateral inhibition? |
|---|---|---|---|---|---|---|---|---|---|
| `GENERIC_WU_OVERFIT` | Same-color order/control/fairness overfit. | 001-003/007. | No generic order/caution/control without process/law/procedure. | Ask for procedure, precedent, enforceability. | 001-003, 007. | Generic WU guardrail. | Source-backed guardrail. | Separate Azorius from plain WU control. | No. |
| `ORZHOV_SYNDICATE` | Existing collision; law/contract/institution overlap. | 001-003 public law/institution. | Obligation/leverage/debt. | Fair public structure vs power to collect. | 001-003. | Orzhov boundary. | Azorius-side comparison support. | Keep/map row. | No. |
| `BOROS_LEGION` | Existing collision; justice/protection overlap. | 001-003/007 process before action. | Immediate intervention/protective urgency. | Process vs immediate rescue. | 001-003, 007. | Boros boundary. | Support "legitimate process" without over-delay. | Keep/map row. | No. |
| `SELESNYA_CONCLAVE` | Existing collision; civic/community order overlap. | 001-003 enforceable systems. | Belonging/consensus/harmony. | Written procedure vs group repair. | 001-003. | Selesnya boundary. | Selesnya local gap; keep Azorius-side bounded. | Keep/map row. | No. |
| `IZZET_LEAGUE` / `UR` | Certified Izzet boundary; procedure vs experiment ambiguity. | 001-003/006/007. | Experiment/iteration over permission. | Permission/procedure or experiment/learning. | 001-003, 006, 007. | Izzet boundary. | Use certified Izzet comparison; support Azorius side. | Add row. | No. |
| `HOUSE_DIMIR` | Blue institution/information/control overlap. | 001-003 public law/institution. | Secrecy/hidden leverage. | Public adjudication vs hidden control. | 001-003. | Dimir boundary. | Dimir not certified; keep Azorius-side. | Add row. | No. |
| `SIMIC_COMBINE` | Blue system-design overlap; prompt risk. | 001-003/006 civic procedure/timing. | Adaptive biology/optimization. | Legal process vs adaptive improvement. | 001-003, 006. | Simic boundary if retained. | Gate 3 may retain or document downgrade. | Add or downgrade. | No. |
### Generated/public copy risk plan

| Current statement or phrase | Source canonical/display field | Support status | Gate 3 action |
|---|---|---|---|
| "Order is not a constraint. It is civilization itself." | Generated WU tagline, likely display-preserved public copy. | Overbroad unless supported by new public-good/process claim. | Narrow or re-source. |
| "only thing standing between civilization and collapse" | Generated philosophy/public copy. | Overbroad public-good/collapse claim. | Narrow unless official support is found. |
| "inventing more laws" / legislative output gap | Generated lore_summary/core_tension. | Unsupported/stale if not in official/local sources. | Narrow/remove/re-source. |
| "law hardens into paralysis" | Raw profile `core_identity`/`great_tension`. | Useful tension but discovery-backed. | Support with new claim or narrow to rigidity/delay. |
| "The law is absolute" | Commander Compass allowed phrase. | Product-facing; too absolute for semantic proof. | Keep auxiliary only or narrow if public. |
| "Legislative control" | Commander Compass allowed phrase. | Product-facing control overstatement risk. | Auxiliary only; prefer "enforceable procedure" in proof chains. |
| Search-term core values | Raw placement `core_values`. | Unsupported as values. | Replace with conceptual values; retain names as metadata only if needed. |
| "bureaucracy where everyone gets a turn, but the House always wins" | Commander Compass weird-stretch copy. | Product/thematic and non-canon; can overstate. | Auxiliary/non-blocking, not certification proof. |

### Provenance repair plan

- Current WU provenance has 40 entries: 22 discovery-only chains, 4 mixed discovery/substantive-candidate chains, and 14 chains using claims 001-007 only.
- Affected generated consumers: `data/factions.json#/factions/WU`, `data/placement-model.json#/factions/WU`, and `supabase/functions/guild-recruiter/faction-context.ts#FACTION_CONTEXT/WU`.
- Invalid evidence categories: discovery claims 0008-0017; mixed key-figure/public-summary chains; profile/placement discovery-backed sections.
- Replacement categories: claims 001-007 once role/locator repaired, plus new extracted claims for motivation, internal tension, mature/unhealthy/pressure behavior, mechanics, and neighbors.
- Repair can be planned without new source discovery. Generated provenance should be regenerated only in Gate 4 after canonical remediation.

### Semantic fixture plan

| Fixture | Intent | Expected interpretation | Required claims/sources | Required? |
|---|---|---|---|---|
| Core inclusion | User centers enforceable public procedure, precedent, and documented fairness. | Supports Azorius over generic WU. | Claims 001-003/007 + public-good/method claim; official guide. | Yes. |
| Mature/pressure behavior | User chooses process as protection but acknowledges delay risk. | Supports mature Azorius if process protects people; flags unhealthy if procedure becomes self-justifying. | Mature/pressure claim. | Yes. |
| Exclusion: generic WU | User likes clean control/order but lacks law/procedure/institution signal. | Do not place Azorius strongly. | Generic WU guardrail claim. | Yes. |
| Exclusion: Orzhov | User treats contracts/rules as leverage/debt/status. | Weakens Azorius. | Orzhov boundary claim. | Yes. |
| Exclusion: Boros | User prioritizes immediate protective intervention over channels. | Weakens Azorius. | Boros boundary claim. | Yes. |
| Exclusion: Selesnya | User prioritizes belonging/consensus/group harmony over enforceable procedure. | Weakens Azorius. | Selesnya boundary claim. | Yes. |
| Exclusion: Izzet | User wants experiment/iteration over permission and procedure. | Weakens Azorius. | Izzet boundary claim. | Yes. |
| Exclusion: Dimir | User prefers hidden information/control over public adjudication. | Weakens Azorius. | Dimir boundary claim. | Yes. |
| Exclusion: Simic | User centers adaptive biological optimization rather than civic/legal procedure. | Weakens Azorius if retained. | Simic boundary claim. | Yes if retained. |
| Nearest-collision ambiguous | User wants rules to protect people but is tempted by immediate rescue or community repair. | Ask Azorius/Boros/Selesnya follow-up rather than force placement. | q9001 + neighbor claims. | Yes. |
| Provenance fixture | Verify public/recruiter Azorius copy uses only substantive claims and no discovery/support proof. | Provenance excludes claims 0008-0017 from semantic proof. | Role/locator repaired claims. | Yes. |

### Exact Gate 3 remediation checklist

#### Required for certification

1. Add `semantic_role` to all 17 claims: 001-007 as `substantive_claim` unless bounded evidence proves narrowing/demotion is needed; 0008-0017 as `discovery_record`.
2. Add bounded evidence locations to all substantive claims using already-listed official/local sources.
3. Narrow claim 001 or claim 007 if any current wording exceeds source support.
4. Add minimal new substantive claims for public-good/process motivation, internal tension, mature expression, unhealthy expression, failure/pressure behavior, Addendum/timing interpretation, retained key figures, and required-neighbor boundaries.
5. Remove discovery claims from authoritative profile sections, placement sections, generated-facing source fields, and provenance proof chains.
6. Replace search-term `core_values` and discovery-backed `behavioral_signals` with source-backed conceptual values/signals.
7. Replace or narrow overbroad public copy around civilization/collapse, law/order/control, bureaucracy, delay, stasis, authoritarianism, and moral certainty.
8. Add evidence mappings to recruiter match, mismatch, and uncertainty guidance.
9. Complete `q_azorius_senate_9001` purpose/supports/weakens fields and ensure question evidence maps to substantive claims.
10. Define required neighbors as generic WU overfit, Orzhov, Boros, Selesnya, Izzet/UR, Dimir, and Simic unless Gate 3 documents a supported downgrade for Simic.
11. Add bounded collision guidance and evidence support for each retained required neighbor without changing lateral-inhibition behavior.
12. Isolate Dragon's Maze, Commander, card, product, and corpus material as auxiliary/discovery only.
13. Update Azorius changelog/readiness evidence and VM-508 workflow/report records for Gate 3.

#### Optional / non-blocking

- Keep local Azorius architecture/taxonomy prose as wording guidance only if source-authority rules do not allow it as proof.
- Defer Lavinia/location enrichment unless already-listed official/local evidence can support it without source discovery.
- Improve Commander Compass wording after certification only if it remains auxiliary and non-blocking.

#### Out of scope for CRIT-001

- Runtime tuning, scoring, confidence, inhibition calibration, Hall/Crucible authoring, global recruiter behavior, broad lore enrichment, and live recruiter outcome work.

### Targeted source discovery decision

No broad or targeted online source discovery is required right now.

Gate 3 should proceed from existing claims, current local canon guides, and already-listed official source entries. If exact bounded locators for already-listed official URLs cannot be established locally, Gate 3 should stop and request bounded source-localization approval for the specific official URL and unsupported statement.

## Gate 2 validation commands run or intentionally deferred

Run:

- `git status --short --branch`
- Read-only structural inspection commands for Azorius claims, sources, profile, placement, generated consumers, and provenance.
- `git diff --check` after documentation updates.

Intentionally deferred:

- `build:factions`
- provenance regeneration
- source/generated parity validation
- semantic fixture tests
- candidate-scope guard

These belong to later gates after canonical remediation.

## Final status

Gate 2 bounded evidence confirmation complete.

Azorius remains uncertified.

No canonical or generated Azorius files were changed.

No other identity was started.
## Gate 3 Canonical Remediation

Gate 3 canonical remediation is complete for Azorius / WU. The work stayed inside Azorius canonical raw data plus VM-508 workflow records. Generated artifacts were not rebuilt and remain stale until Gate 4.

### Canonical files changed

- `data/raw-factions/azorius_senate/azorius_senate.claims.json`
- `data/raw-factions/azorius_senate/azorius_senate.sources.json`
- `data/raw-factions/azorius_senate/azorius_senate.profile.json`
- `data/raw-factions/azorius_senate/azorius_senate.placement.json`
- `data/raw-factions/azorius_senate/azorius_senate.changelog.json`

### Blocker-by-blocker remediation

- Added Contract v1.1 `semantic_role` values to all 26 Azorius claims now present after remediation.
- Classified claims `azorius_senate_claim_001` through `azorius_senate_claim_007` as `substantive_claim`.
- Retained claims `azorius_senate_claim_0008` through `azorius_senate_claim_0017` as `discovery_record` only.
- Added nine minimal source-backed substantive claims, `azorius_senate_claim_0018` through `azorius_senate_claim_0026`, covering motivation, internal tension, method, mature expression, unhealthy expression, failure/pressure behavior, mechanics interpretation, generic WU overfit, and required-neighbor boundaries.
- Added bounded evidence locations to all substantive claims.
- Added a claim-bearing local official source record for Mark Rosewater's `Slow and Steady` capture under `docs/research/canon/mark_rosewater_official_two_color/` to support WU/Azorius motivation, tension, method, mature/unhealthy expression, pressure behavior, and generic-WU guardrails. This source is not used as Ravnica-guild institution proof.
- Removed discovery records from profile and placement semantic proof chains; remaining profile discovery claim references are isolated to `data_quality.corpus_upgrade` with `evidence_use: discovery_metadata`.
- Replaced discovery-backed core values, behavioral signal, placement axis, placement summary, and inhibitor trait with source-backed substantive claims.
- Isolated Commander/card/product and Dragon's Maze support material as auxiliary only.
- Repaired the Addendum mechanics chain so mechanics identity proof uses official Addendum evidence plus Azorius identity support, not discovery records.
- Added recruiter-facing `semantic_guidance_evidence` mappings for match, mismatch, and uncertainty guidance.
- Completed bounded required-neighbor evidence and collision guidance for `GENERIC_WU_OVERFIT`, `ORZHOV_SYNDICATE`, `BOROS_LEGION`, `SELESNYA_CONCLAVE`, `IZZET_LEAGUE`, `HOUSE_DIMIR`, and `SIMIC_COMBINE`.
- Repaired `q_azorius_senate_9001` with purpose, support/weakening patterns, related-faction comparison fields, and source-backed evidence claims.
- Narrowed public-facing canonical source wording around law/order/control/bureaucracy/delay so Azorius is framed as civic/legal procedure and accountable structure, not generic authoritarianism or stasis.
- Preserved calibrated placement-summary fields and confidence values; no lateral-inhibition behavior was added.

### Claims by semantic role after Gate 3

| Role | Count | Claims |
| --- | ---: | --- |
| `substantive_claim` | 16 | `azorius_senate_claim_001`-`007`, `azorius_senate_claim_0018`-`0026` |
| `discovery_record` | 10 | `azorius_senate_claim_0008`-`0017` |
| `support_record` | 0 | None |
| `unclassified` | 0 | None |

### Required neighbors selected

- `GENERIC_WU_OVERFIT`
- `ORZHOV_SYNDICATE`
- `BOROS_LEGION`
- `SELESNYA_CONCLAVE`
- `IZZET_LEAGUE` / UR
- `HOUSE_DIMIR`
- `SIMIC_COMBINE`

### Items deferred to Gate 4

- Rebuild generated artifacts from the remediated canonical packet.
- Regenerate semantic-readiness provenance and content hashes.
- Add/validate Azorius semantic fixtures.
- Run source/generated parity, generated/public copy inspection, generated-diff isolation, and regression checks.
- Confirm generated consumers no longer carry discovery-backed Azorius proof chains.

### Remaining known limitations

- Deep story-episode character/location coverage remains discovery-only until direct official story localization is performed in a separately authorized pass.
- Commander/card/product material remains auxiliary navigation and not semantic proof.
- Generated provenance is expected to be stale until Gate 4.

### Gate 3 validation commands run

- `git status --short --branch` — ran before and during work.
- JSON parse checks for changed Azorius canonical files — passed.
- `node research/audit-semantic-readiness.mjs --targets=WU` — passed; reported 26 claims, 16 substantive, 10 discovery, 0 support, 0 unclassified, and no potential role-invalid support links.
- `node research/validate-semantic-readiness.mjs --targets=WU` — failed only on expected stale provenance/content hashes, missing generated provenance for new canonical chains, and missing identity semantic fixtures. This is expected in Gate 3 because generated artifacts/provenance/fixtures are deferred to Gate 4.
- `git diff --check` — run after documentation update in final Gate 3 validation.

### Gate 3 final status

Gate 3 canonical remediation complete. Azorius remains uncertified. Generated artifacts remain stale until Gate 4. No candidate or certification commit was created.

## Gate 4 Generation and Validation

Gate 4 generation and validation is complete for Azorius / WU. The work rebuilt generated artifacts from the remediated canonical packet, regenerated semantic-readiness provenance and content hashes, added Azorius semantic fixtures, inspected generated/public copy, and ran the requested Gate 4 validation suite. No candidate or certification commit was created.

### Confirmed worktree and branch

- Worktree path: `C:\dev\mtgSiteWIP-crit001`
- Branch: `codex/vm-508-azorius-semantic-recovery`
- HEAD during Gate 4: `ad6322d4cb2120e83788a4af0dca7ef21cad4cc2`

### Files changed during Gate 4

Generated/provenance outputs rebuilt:

- `data/factions.json`
- `data/placement-model.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `data/semantic-readiness-provenance.json`

Display-source cleanup:

- `data/identity-layers.json` was changed only for the Azorius / WU preview text. The stale generated phrase `procedure, control, and carefully managed improvement` was replaced with `procedure, documentation, and accountable civic structure` so the builder no longer restores overbroad control language.
- `data/factions.json` includes WU/Azorius-scoped display-source cleanup for stale preserved public copy. Non-WU generated JSON/provenance remained unchanged in the custom isolation check.

Fixture added:

- `research/fixtures/semantic-readiness/azorius_senate.semantic-fixtures.json`

Workflow/report records updated:

- `docs/incidents/recoveries/VM-508-azorius-semantic-recovery.md`
- `docs/kanban/backlog/VM-508-azorius-semantic-recovery.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-14-1616-codex-vm508-azorius-gate4-validation.md`

Canonical Azorius raw data was not modified during Gate 4 beyond the Gate 3 changes already present at Gate 4 start.

### Fixture coverage

Added/validated Azorius Contract v1.1 fixtures:

- Core inclusion fixture for civic/legal procedure and accountable structure.
- Mature/pressure behavior fixture for procedure under pressure.
- Required-neighbor exclusion fixtures for `GENERIC_WU_OVERFIT`, `ORZHOV_SYNDICATE`, `BOROS_LEGION`, `SELESNYA_CONCLAVE`, `IZZET_LEAGUE`, `HOUSE_DIMIR`, and `SIMIC_COMBINE`.
- Nearest-collision ambiguity fixture for Boros-adjacent urgent protection versus Azorius process.
- Provenance fixture for recruiter match guidance.

### Generated/public copy inspection

- Removed stale preserved public copy from generated Azorius surfaces:
  - `Order is not a constraint. It is civilization itself.`
  - `civilization and collapse`
  - `inventing more laws`
  - `improvised justice is no justice at all`
  - `senior lawmage issuing a ruling - not unkind, but not warm`
- Narrowed Azorius preview copy so it no longer presents unsupported control/stasis/authoritarian framing.
- Verified generated public/recruiter consumers do not contain discovery claims `azorius_senate_claim_0008` through `azorius_senate_claim_0017`.
- Verified `src_wotc_dragons_maze_mechanics_2013` appears only as `auxiliary_support_source_ids` with an auxiliary boundary, not as semantic proof.
- Verified generated recruiter context does not leak Azorius claim/source IDs into prose.
- Semantic provenance has one retained discovery metadata entry at `/data_quality/corpus_upgrade`; this is isolated corpus/discovery metadata, not an authoritative semantic proof chain.

### Generated-diff and frozen-field checks

Custom pre-candidate isolation checks passed:

- No non-Azorius raw packet changed.
- `data/identity-layers.json` changed only at `expressions.WU.preview_text`.
- `data/factions.json` non-WU content is unchanged after ignoring `factions.WU` and `identity_layers.expressions.WU`.
- `data/placement-model.json` non-WU content is unchanged after ignoring `factions.WU`.
- `data/semantic-readiness-provenance.json` non-WU entries are unchanged.
- Azorius confidence fields have no deltas from the accepted base.
- Azorius calibrated placement-summary fields have no deltas from the accepted base.
- Existing lateral-inhibition values have no deltas; Gate 3 expanded collision guidance from 3 to 7 rows without adding/changing lateral-inhibition behavior.

Formal candidate-scope guard over a candidate SHA is deferred to Gate 5 because no candidate commit exists in Gate 4.

### Validation commands run

- `npm.cmd run build:factions` - passed; rebuilt placement model, recruiter context, and semantic provenance.
- `node research/validate-semantic-readiness.mjs --targets=WU` - passed.
- `npm.cmd run validate:source-generated -- --targets=WU` - passed with the known builder-owned inhibitor warning.
- `node research/validate-semantic-readiness.mjs --fixtures` - passed.
- `node research/audit-semantic-readiness.mjs --targets=WU` - passed; reported 26 claims, 16 substantive, 10 discovery, 0 support, 0 unclassified, and no potential role-invalid support links.
- `npm.cmd run test:semantic-readiness` - passed.
- `npm.cmd run test:placement` - passed; 37 factions, 37 golden paths.
- `npm.cmd run test:faction-context-isolation` - passed.
- `node research/archscry-dossier-followup-tests.js` - passed.
- `npm.cmd run dossier:audit` - passed; 37 primary dossiers, 76 adjacent dossiers, 113 warnings, 0 failures.
- Custom generated-diff isolation check - passed with only WU/Azorius-scoped generated and display-source changes.
- Frozen-field check - passed; no confidence, calibrated placement-summary, or lateral-inhibition value deltas.
- `git diff --check` - passed; emitted line-ending normalization warnings only.

### Known warnings

- Known builder-owned Azorius inhibitor warning remains unchanged: one model-owned inhibitor trap is backed by the builder's model-owned prior rather than raw placement text.
- Dossier audit warning count remains the known 113 warnings / 0 failures.
- Git reports line-ending normalization warnings for several files; these are warnings only if `git diff --check` passes.

### Gate 4 final status

Gate 4 generation and validation is complete. Azorius remains uncertified. Azorius is ready for Gate 5 candidate creation when explicitly authorized, subject to clean scope verification at candidate time.

## Pre-Candidate Scope Cleanup

Pre-candidate verification for Gate 5 initially stopped on two scope blockers: an added confidence field at `data/raw-factions/azorius_senate/azorius_senate.placement.json#/discriminator_questions/2/confidence` and missing native ID `character_id:char_lavinia`.

Cleanup completed on 2026-07-14:

- Removed the added `confidence: Medium` field from `q_azorius_senate_9001`, preserving the question content, evidence mappings, and parent shape for the forbidden confidence surface.
- Restored `character_id:char_lavinia` under `data_quality.corpus_upgrade.retained_native_ids` as discovery metadata. The exact parent `key_figures/3` location was intentionally not restored because `key_figures` is an authoritative semantic reference site and Lavinia currently has discovery-only evidence in this packet.
- Rebuilt generated artifacts and semantic-readiness provenance after the canonical cleanup.
- Reran the Gate 4 validation suite and the candidate-scope dry-run.

Validation passed:

- `npm.cmd run build:factions`
- `node research/validate-semantic-readiness.mjs --targets=WU`
- `npm.cmd run validate:source-generated -- --targets=WU`
- `node research/validate-semantic-readiness.mjs --fixtures`
- `node research/audit-semantic-readiness.mjs --targets=WU`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- `node research/archscry-dossier-followup-tests.js`
- `npm.cmd run dossier:audit`
- Candidate-scope dry-run
- `git diff --check`

Candidate-scope dry-run result:

- No confidence, calibration, or lateral-inhibition findings.
- No missing native IDs.
- No missing provenance native IDs.
- No generated-consumer coverage findings.
- No non-Azorius raw packet changes.
- Remaining generated-scope findings are limited to the documented WU/Azorius display-source exception in `data/factions.json` and `data/identity-layers.json#/expressions/WU/preview_text`.

Known warnings remain unchanged:

- Source/generated guardrail reports the known builder-owned Azorius inhibitor warning.
- Dossier audit remains 113 warnings / 0 failures.
- `git diff --check` passes with line-ending normalization warnings only.

Pre-candidate cleanup is complete. Azorius remains uncertified and is ready for Gate 5 candidate creation when explicitly authorized.

## Gate 5 Candidate Creation

Gate 5 candidate creation completed on 2026-07-14. Azorius remains uncertified and is pending independent review of the exact candidate SHA.

- Candidate parent SHA: `ad6322d4cb2120e83788a4af0dca7ef21cad4cc2`
- Candidate recovery SHA: `221a19b690cad02fb9aba2c91ae506b6d4fcc205`
- Workflow-record commit: pending until the SHA-record commit is finalized.
- Candidate commit message: `VM-508 create Azorius semantic recovery candidate`
- Workflow-record commit message: `VM-508 record Azorius recovery candidate`

Candidate commit contents:

- Gate 3 canonical remediation.
- Gate 4 generated artifacts and semantic-readiness provenance.
- Gate 4 Azorius semantic fixtures.
- Pre-candidate scope cleanup.
- WU/Azorius display-source cleanup.
- VM-508 report/card/handoff/index records documenting Gate 1 through Gate 4, cleanup, and candidate readiness.

Candidate-scope result at creation:

- No confidence, calibration, or lateral-inhibition findings.
- No missing native ID findings.
- No missing provenance native ID findings.
- No generated-consumer coverage findings.
- No non-Azorius raw packet changes.
- Documented display-source exception only: `data/factions.json` WU/Azorius display cleanup and `data/identity-layers.json#/expressions/WU/preview_text`.

Known warnings remain unchanged:

- Known builder-owned Azorius inhibitor warning remains unchanged.
- Dossier audit remains 113 warnings / 0 failures.
- `git diff --check` passes with line-ending normalization warnings only.

Azorius remains uncertified. Independent review has not been started by this task.

## Certification and Program Acceptance

Azorius / WU is certified semantically_ready under CRIT-001 Contract v1.1 after independent Gate 5 review returned APPROVE EXACT SHA.

- Identity: Azorius
- Target: WU
- VM: VM-508
- Contract version: v1.1
- Approved recovery SHA: `221a19b690cad02fb9aba2c91ae506b6d4fcc205`
- Workflow-record SHA: `8ff965e52603625e1cc63cce51fc042c4c30603c`
- Independent review result: APPROVE EXACT SHA
- Approval date: 2026-07-14
- Final certification state: `semantically_ready`
- Certification commit: `PENDING_VM508_CERTIFICATION_COMMIT_SHA`

Residual non-blocking observations:

- `data/raw-factions/azorius_senate/azorius_senate.profile.json` includes `confidence: Medium` for Isperia profile metadata. Independent review verified this is profile metadata confidence narrowed from the parent's broader value after discovery-backed proof was removed. It is not placement confidence, generated confidence, runtime calibration, scoring, or lateral-inhibition behavior. No correction required.
- Direct `npm.cmd run dossier:audit` was blocked in the independent review sandbox by EPERM when writing `artifacts/dossier-snapshots/dossier-audit-report.md`. Reviewer independently reran the same audit logic in memory and verified 37 primary dossiers, 76 adjacent dossiers, 113 warnings, 0 failures.

Known scope findings:

- Candidate-scope guard reports only documented WU/Azorius display-source exceptions: `data/identity-layers.json` and `data/factions.json`.
- Parsed diffs confirm `data/identity-layers.json` changed only `expressions.WU.preview_text`.
- Parsed diffs confirm `data/factions.json` changed only WU/Azorius fields.
- Parsed diffs confirm `data/placement-model.json` changed only WU/Azorius fields.
- Known builder-owned Azorius inhibitor warning remains unchanged.

Program acceptance:

- Recovery commit `221a19b690cad02fb9aba2c91ae506b6d4fcc205` is accepted into the CRIT-001 program base.
- Workflow-record commit `8ff965e52603625e1cc63cce51fc042c4c30603c` is accepted into the CRIT-001 program base.
- Certification commit is recorded as `PENDING_VM508_CERTIFICATION_COMMIT_SHA` in self-referential records and will be reported with its exact SHA after commit creation.
- Boros / WR is the next identity for branch setup only. No Boros remediation has started.
