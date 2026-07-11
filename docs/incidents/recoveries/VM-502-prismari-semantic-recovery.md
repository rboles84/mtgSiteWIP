# VM-502 — Prismari Semantic Recovery

Identity: `PRISMARI`
Contract: v1
Status: Gate 5 — independent certification pending
Required neighbors: `UR`, `BR`, `QUANDRIX`, `SILVERQUILL`

## Gate 1 — Packet Audit

### Structural facts

- VERIFIED — The packet contains 18 claim records: six legacy foundation candidates, ten exact `story_corpus_evidence` discovery records, and two exact auxiliary support records.
- VERIFIED — The source ledger contains three claim-bearing, ten discovery-only, and two support-only sources.
- VERIFIED — The structural inventory reports 27 semantic reference sites that currently use discovery/support-only evidence or mixtures with unclassified records.
- VERIFIED — Four raw discriminator questions exist. Quandrix and Silverquill receive explicit questions; Izzet and Rakdos do not.
- VERIFIED — Recruiter guidance consists of string arrays without canonical evidence mappings.
- VERIFIED — Generated placement and recruiter context preserve the current packet but cannot repair its semantic support chain.

### Human semantic findings

- VERIFIED — Claims 001–006 contain source-backed identity, magic/art, elemental medium, blue/red tension, curriculum, and placement-synthesis material. They require explicit semantic roles and bounded locators.
- VERIFIED — Claims 0007–0016 record only search relevance. Their own notes explicitly state that search results are not substitutes for full source reading.
- VERIFIED — Claims 0017–0018 are legitimate product/card support but cannot prove identity meaning.
- VERIFIED — `core_identity`, `site_surface`, `structure`, `great_tension`, multiple placement axes/values/signals, and placement-summary fields cite discovery records as semantic support.
- VERIFIED — The official 2021 guide's Prismari sections support magic/art unity, technique versus expression, elemental media, audience-facing spectacle, institutional locations, creative risk, and destructive failure modes.
- VERIFIED — The official 2026 guide's Prismari and Field Studies sections support disciplined refinement, residencies, apprenticeship, collaboration, gallery submission, audience feedback, revision, and art as non-isolated practice.
- STRONG INFERENCE — Those two existing official guides are sufficient to repair the required Prismari conceptual dimensions without an exhaustive story sweep.
- VERIFIED — Existing Izzet and Rakdos canonical claim packets provide bounded, source-backed comparison material for mechanism/innovation and transgression/provocation respectively.
- VERIFIED — The existing Prismari architecture document contains useful synthesis, but portions cite the raw profile now under review; it is design guidance, not independent proof.

### Primary disposition

`claim_extraction_and_traceability_repair`

Prismari is under-extracted and under-modeled rather than source-empty. The smallest defensible repair is to extract the unused official-guide material, classify every record, localize evidence, replace discovery-only semantic references, add bounded neighbor evidence, and preserve valid support/discovery records under explicit non-semantic evidence uses.

### Exact readiness blockers

1. All 18 claim records lack explicit Contract v1 semantic roles.
2. Six substantive candidates lack bounded evidence locations.
3. Discovery records are used to support authoritative semantic statements.
4. Required mature, unhealthy, failure/pressure, collaboration, mentorship, criticism/revision, and uncertainty dimensions are not represented as atomic claims.
5. No direct canonical Prismari/Izzet discriminator exists.
6. Rakdos purpose-of-performance distinction lacks claim-backed collision guidance.
7. Recruiter match, mismatch, and uncertainty guidance lacks stable claim provenance.
8. The current provenance manifest is structural only and cannot certify the unrepaired packet.

### Bounded repair list

- Classify existing claims 001–006 as substantive, 0007–0016 as discovery, and 0017–0018 as support.
- Add bounded locators to all new/remediated substantive claims.
- Extract only the official-guide claims needed for practice, refinement, collaboration, audience criticism, responsibility, and unhealthy risk.
- Add source-backed project-synthesis claims for Izzet, Rakdos, Quandrix, and Silverquill boundaries.
- Replace discovery-only refs on semantic profile/placement fields.
- Mark genuine discovery and auxiliary product/card fields with explicit `evidence_use`.
- Add one direct Prismari/Izzet discriminator; do not normalize question counts.
- Add stable evidence mappings for canonical recruiter guidance.
- Add bounded semantic fixtures without asserting runtime outcomes.

## Gate 2 — Evidence Completion

### Existing authoritative sources selected

- `src_wotc_planeswalkers_guide_strixhaven_2021`
  - `Prismari College / The College of Elemental Arts`
  - `The Dichotomy of Prismari — Blue`
  - `The Dichotomy of Prismari — Red`
  - `Locations — Furygale`
  - `College Mascot: Elementals`
- `src_wotc_planeswalkers_guide_secrets_strixhaven_2026`
  - `Prismari / The College of Elemental Arts`
  - `Field Studies`
- Approved canonical comparison packets:
  - `data/raw-factions/izzet_league/izzet_league.claims.json`
  - `data/raw-factions/cult_of_rakdos/cult_of_rakdos.claims.json`
  - `data/raw-factions/quandrix/quandrix.claims.json`
  - `data/raw-factions/silverquill/silverquill.claims.json`

### Evidence sufficiency stop decision

Targeted external access confirmed the two already-listed official guides and their bounded Prismari sections. No broad story search is authorized or presently required. Evidence gathering stops once the listed readiness blockers are supported; additional stories, figures, mechanics, and timelines remain non-blocking enrichment.

### Gate result

COMPLETE — The selected official guides and bounded canonical comparison packets support every identified readiness blocker. No credentialed or unavailable evidence is required for the candidate recovery.

## Gate 3 — Canonical Remediation

- Classified 20 records as `substantive_claim`, 10 as `discovery_record`, and two as `support_record`; no Prismari record remains unclassified.
- Added bounded evidence locations to every new or remediated substantive claim.
- Added 14 atomic substantive claims covering practice/refinement, collaboration, criticism/revision, responsibility, mature and unhealthy expression, failure behavior, uncertainty, and four required-neighbor boundaries.
- Preserved the ten discovery records and two support records under explicit non-semantic evidence uses instead of deleting them or treating them as identity proof.
- Repaired profile and placement statements so authoritative semantic references resolve to substantive evidence.
- Added one direct Prismari/Izzet discriminator because the audit established a specific traceability gap; the question bank was not normalized to Izzet's count.
- Added stable evidence mappings for positive, negative, and uncertainty recruiter guidance.
- Added five claim-bearing sources in total by retaining the three existing sources and registering the already-canonical official Izzet and Rakdos comparison sources.
- Did not change Hall, Crucible, scoring, inhibition, confidence, tie ordering, scheduling, or the global recruiter prompt.

## Gate 4 — Generation and Validation

### Generated isolation

- VERIFIED — `data/factions.json` changed only at `PRISMARI`.
- VERIFIED — `data/placement-model.json` changed only at `PRISMARI`.
- VERIFIED — Supabase `FACTION_CONTEXT` isolation passed with only `PRISMARI` changed.
- VERIFIED — Provenance changed only for `PRISMARI`, increasing the manifest from 1,297 to 1,339 entries.
- VERIFIED — The generated placement schema remained content-identical.
- VERIFIED — A source/generated guardrail warning remains for one builder-owned inhibitor prior; it is model-owned, not a raw-packet mismatch, and is outside semantic remediation.

### Semantic fixtures

Eight non-runtime fixtures cover core inclusion, mature pressure behavior, exclusions for `UR`, `BR`, `QUANDRIX`, and `SILVERQUILL`, nearest-collision ambiguity with Izzet, and a generated provenance chain. The validator confirms fixture claim roles and the provenance link; it does not assert a browser rank, score, Hall/Crucible path, recruiter response, or confidence value.

### Validation results

- PASS — `npm.cmd run build:factions`
- PASS — `npm.cmd run audit:semantic-readiness -- --update-ledger`
- PASS — `npm.cmd run validate:source-generated -- --targets=PRISMARI` (one documented model-owned warning)
- PASS — `node research/validate-semantic-readiness.mjs --targets=PRISMARI`
- PASS — `npm.cmd run test:semantic-readiness`
- PASS — `npm.cmd run test:placement` (37/37 golden paths)
- PASS — `npm.cmd run test:faction-context-isolation`
- PASS — `node research/archscry-dossier-followup-tests.js`
- PASS with existing warnings — `npm.cmd run dossier:audit` (0 failures; 113 warnings across 37 primary and 76 adjacent dossiers)
- PASS — `npm.cmd test`
- PASS — `npm.cmd run test:parser` (226 cases)
- PASS — `git diff --check`

## Gate 5 — Independent Certification

Candidate recovery SHA: `85d3c79daa5081b6af4376506f51d33fe51e1225`

Certification remains pending review by Robert or a separate session/agent that did not author this remediation. The reviewer must inspect that exact parent-to-candidate canonical diff, generated diff, evidence, provenance, semantic fixtures, and validation record. The author will not self-certify. Any requested correction must produce a new candidate SHA and invalidate this pending candidate.
