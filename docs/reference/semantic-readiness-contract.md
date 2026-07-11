# Semantic Readiness Contract

Contract version: `v1`
Status: Frozen after Prismari/Lorehold/Izzet pilot
Incident: CRIT-001

## Purpose

This contract separates structural traceability from semantic readiness. Identifiers, counts, and generated parity are necessary but do not prove that evidence supports the meaning attributed to it.

## Semantic Claim Roles

### `substantive_claim`

A source-supported factual or interpretive claim capable of supporting identity, philosophy, behavior, history, structure, placement, uncertainty, or neighbor distinctions. Character, timeline, location, institutional, and mechanic claims may be substantive when they contribute meaningful identity evidence.

### `discovery_record`

A record that identifies potentially relevant material without extracting the fact or meaning needed by an authoritative statement.

### `support_record`

Auxiliary product, card, bibliography, presentation, navigation, or technical metadata that cannot independently prove faction identity or placement meaning.

### `unclassified`

An unreviewed or ambiguous legacy record. It cannot satisfy readiness until reviewed.

A record's topic does not determine its role. Its assertion, evidence, and legitimate downstream use do.

## Evidence Localization

Every new or remediated substantive claim must provide bounded evidence through existing equivalent fields or `evidence_locations` entries containing:

- `source_id`
- `locator_type`
- `locator`
- `bounded_paraphrase`
- `evidence_scope`
- `interpretation_level`

Suitable locators include section, chapter, episode, page/paragraph range, local line range, card/rules identifier, URL fragment, or archived location. Long or multi-topic sources require more than a source ID. Character-specific evidence must be labeled; identity-wide generalization requires corroboration or an explicit inference label. Excessive copyrighted quotation is prohibited.

## Required Dimensions

Every identity must sufficiently cover core identity, internal tension, motivation, preferred method, mature expression, unhealthy expression, failure/pressure behavior, positive inclusion, negative exclusion, ambiguity/uncertainty, bounded required-neighbor distinctions, and source-to-runtime traceability.

Institutional hierarchy, timeline, named figures, mechanics, civic role, collaboration, rules, mentorship, locations, and formal ethics are conditional on relevance and evidence.

## Required Neighbors

Select a small bounded set from same-color alternatives, highest conceptual overlap, existing collision relationships, current comparison guidance, and verified ambiguity. Do not compare every identity with all 36 others.

## Provenance

Certified canonical statements and guidance must resolve through identity key, canonical file, stable native ID where available, JSON Pointer, content hash, evidence claim IDs, evidence source IDs, generated consumers, and contract version. Array position alone is not a durable locator.

## Automation Boundary

Automation may validate roles, fields, references, orphans, source linkage, role-invalid support, content hashes, generated provenance, and parity. Automation may not declare genuine entailment, maturity, stereotype risk, conceptual sufficiency, overbuilding, or semantic readiness.

## Semantic Fixtures

Each identity requires one core-inclusion fixture, one mature/pressure fixture, one exclusion fixture per required neighbor, one nearest-collision ambiguous fixture, and one provenance fixture. These validate defensible canonical meaning, not rankings, score gaps, Hall/Crucible reachability, confidence, recruiter outputs, or live LLM behavior.

## Certification

Only `semantically_ready` and `evidence_limited_blocked` are valid final states. Certification records the exact contract version, immutable candidate recovery SHA, independent reviewer, approval date, and separate certification commit. Authors cannot self-certify.

## Amendments

A demonstrated defect creates a versioned amendment. The amendment identifies its rule change, affected certifications, and whether each needs full review, targeted revalidation, or no action. Prior certifications do not silently inherit a newer contract.

## v0 Pilot Corrections

- Provisional automation recognizes only exact known discovery and auxiliary-support types; ambiguous legacy types remain unclassified.
- Claim topic names do not establish semantic roles.
- Canonical recruiter guidance may retain string prose while parallel evidence records bind JSON Pointer and content hash to substantive claims.
- The positive and negative fixtures prove both acceptance and rejection paths.

See [CRIT-001 Contract v0 Pilot](../incidents/CRIT-001-contract-pilot.md).
