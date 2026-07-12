# VM-502 - Prismari Semantic Recovery

Identity: `PRISMARI`
Contract: v1.1
Status: Replacement remediation active after rejected candidate
Required neighbors: `UR`, `BR`, `QUANDRIX`, `SILVERQUILL`

## Stage A - Rejected candidate record

Candidate `85d3c79daa5081b6af4376506f51d33fe51e1225` received independent review result `changes_requested`.

No certification exists. Candidate `85d3c79daa5081b6af4376506f51d33fe51e1225` remains immutable rejected audit history and must not be modified, certified, pushed, or merged. Candidate-record commit `725bf44` remains historical workflow evidence. Prismari remains the active identity; Lorehold has not started.

## Gate 1 - Packet Audit

### Structural facts

- VERIFIED - The packet contains 18 claim records: six legacy foundation candidates, ten exact `story_corpus_evidence` discovery records, and two exact auxiliary support records.
- VERIFIED - The source ledger contains three claim-bearing, ten discovery-only, and two support-only sources.
- VERIFIED - Four raw discriminator questions exist. Quandrix and Silverquill receive explicit questions; Izzet and Rakdos do not.
- VERIFIED - Recruiter guidance uses semantic strings without complete canonical evidence mappings.
- VERIFIED - Generated placement and recruiter context preserve the current packet but cannot repair its semantic support chain.

### Human semantic findings

- VERIFIED - Claims 001-006 contain source-backed identity, magic/art, elemental medium, blue/red tension, curriculum, and placement-synthesis material. They require explicit semantic roles and bounded locators.
- VERIFIED - Claims 0007-0016 record only search relevance. Their own notes explicitly state that search results are not substitutes for full source reading.
- VERIFIED - Claims 0017-0018 are legitimate product/card support but cannot prove identity meaning.
- VERIFIED - `core_identity`, `site_surface`, `structure`, `great_tension`, multiple placement axes/values/signals, and placement-summary fields cite discovery records as semantic support.
- STRONG INFERENCE - Existing official Strixhaven guide sources are sufficient to repair most Prismari conceptual dimensions without an exhaustive story sweep.

### Primary disposition

`claim_extraction_and_traceability_repair`

Prismari is under-extracted and under-modeled rather than source-empty. The smallest defensible repair is to extract the unused official-guide material, classify every record, localize evidence, replace discovery-only semantic references, add bounded neighbor evidence, and preserve valid support/discovery records under explicit non-semantic evidence uses.

### Exact readiness blockers

1. All 18 claim records lack explicit Contract v1.1 semantic roles.
2. Six substantive candidates lack bounded evidence locations.
3. Discovery records are used to support authoritative semantic statements.
4. Required mature, unhealthy, failure/pressure, collaboration, mentorship, criticism/revision, and uncertainty dimensions are not represented as atomic claims.
5. No direct canonical Prismari/Izzet discriminator exists.
6. Rakdos purpose-of-performance distinction lacks claim-backed collision guidance.
7. Recruiter match, mismatch, and uncertainty guidance lacks stable claim provenance.
8. The current provenance manifest is structural only and cannot certify the unrepaired packet.

## Independent review findings for rejected candidate

1. Shared Contract v1/schema/tooling changes were mixed into an identity candidate and required extraction into a separately reviewed VM-501 prerequisite.
2. The candidate enabled new Prismari-Izzet `lateral_inhibition`, violating the runtime-calibration freeze.
3. Generated public Prismari content still contained stale or contradictory statements including "bigger, louder," "Functional over beautiful," and "Prismari does not want craftspeople."
4. Claims 0023 and 0024 generalized red-aligned spectacle, Ruleburners, and Furygale subgroup/location evidence too broadly.
5. Claims 0026 and 0027 asserted unsupported attention-as-success, criticism-driven escalation, and abandonment after failure or criticism.
6. "Technique becomes sterile" was not established by bounded authoritative evidence; technique and expression must be modeled as a tension that can also be integrated.
7. The Izzet boundary reduced Izzet to functional mechanism and Prismari to inner truth/emotional impact; it lacked neutral mixed-purpose ambiguity.
8. The Quandrix boundary used "correct but lifeless" despite official beauty, pattern, and optical-effect evidence.
9. The Silverquill boundary added unsupported status, reputation, leverage, and choice-control claims.
10. Quiet/private Prismari language was supported with mismatched collaboration/audience evidence rather than direct evidence.
11. Brodd Scaldbreath lacked a Brodd-specific substantive claim, retained unrelated product evidence, and lost native provenance ID `char_brodd_scaldbreath`.
12. Semantic fixtures exceeded their complete cited evidence chains, including unsupported feedback-versus-taste, protection, reusable-infrastructure, status/reputation, and control details.
13. Shared guards were insufficient for frozen-file identity scope, forbidden fields, complete generated-consumer provenance, native-ID retention, complete fixture evidence chains, and stable ledger regeneration.

## Required replacement sequence

The shared VM-501 prerequisite has been accepted into the CRIT-001 program base. Fresh VM-502 replacement work starts from that accepted base. Rejected candidate `85d3c79daa5081b6af4376506f51d33fe51e1225` may be used only as a reference; it must not be cherry-picked intact.

## Gate 2 - Evidence Completion

Selected evidence remained bounded to existing official Prismari sources plus official Izzet/Rakdos comparison sources needed for required-neighbor boundaries:

- `src_wotc_planeswalkers_guide_strixhaven_2021`
- `src_wotc_planeswalkers_guide_secrets_strixhaven_2026`
- `src_izzet_league_0002`
- `src_wotc_flavorful_guide_ravnica_allegiance_2019`

Evidence gathering stopped after the readiness blockers had sufficient support. No broad story sweep, Hall/Crucible work, scoring work, or live recruiter testing was added.

## Gate 3 - Canonical Remediation

- Classified 21 records as `substantive_claim`, 10 as `discovery_record`, and 2 as `support_record`.
- Preserved the original six valid core claims while adding semantic roles and bounded evidence locations.
- Preserved the ten discovery records and two support records in their correct non-semantic roles.
- Added bounded claims for practice, collaboration, revision, expression modes, subgroup/location risk, mature expression, unhealthy expression, failure/pressure behavior, Brodd-specific character evidence, uncertainty, and required-neighbor boundaries.
- Repaired stale public display-source language that produced "bigger, louder," "Functional over beautiful," and "Prismari does not want craftspeople."
- Added one direct Prismari/Izzet discriminator without enabling lateral inhibition.
- Rewrote Izzet, Quandrix, and Silverquill boundaries with neutral, source-backed purpose distinctions and mixed-purpose ambiguity.
- Removed unsupported attention, criticism-escalation, abandonment, sterile-technique, status, reputation, leverage, choice-control, reusable-infrastructure, bystander-protection, and feedback-versus-taste details from the replacement candidate.

## Gate 4 - Generation and Validation

Generated artifacts were rebuilt from canonical data with `npm.cmd run build:factions`. The generated semantic changes are Prismari-scoped across `data/factions.json`, `data/placement-model.json`, Supabase faction context, and semantic provenance. `data/factions.json` is also the builder-declared display-surface source for the repaired public recruiter/display phrasing.

Prismari collision entries all keep `lateral_inhibition: false`. No scoring, confidence, tie-ordering, scheduling, Hall, Crucible, or global recruiter behavior was changed.

Known scope note: the old "correct but lifeless" wording still exists only in the pre-existing Quandrix-origin collision/shared Crucible path and was not edited because Hall/Crucible and non-Prismari semantics are outside VM-502.

Validation results:

- PASS - `node research/validate-semantic-readiness.mjs --targets=PRISMARI`
- PASS - `npm.cmd run build:factions`
- PASS with known model-owned inhibitor warnings - `npm.cmd run validate:source-generated -- --targets=UR,PRISMARI`
- PASS - `npm.cmd run test:semantic-readiness`
- PASS - `npm.cmd run test:placement`
- PASS - `npm.cmd run test:faction-context-isolation`
- PASS - `node research/archscry-dossier-followup-tests.js`
- PASS with known warnings - `npm.cmd run dossier:audit` (0 failures; 113 warnings)
- PASS - `npm.cmd test`
- PASS - `npm.cmd run test:parser`
- PASS - `git diff --check`

## Gate 5 - Candidate Status

Replacement candidate commit is pending. No certification exists.
