# CRIT-001 Contract v0 Pilot

Date: 2026-07-11
Pilot packets: Prismari, Lorehold, Izzet
Fixtures: invalid discovery chain, valid substantive chain

## Purpose

The pilot tested Contract v0 against three different packet shapes without certifying or repairing those identities. It was bounded to defects in the shared contract and automation.

## Verified Results

### Prismari

- 18 claim records split structurally into six unclassified foundation candidates, ten exact `story_corpus_evidence` discovery records, and two exact auxiliary support records.
- The source ledger contains three claim-bearing, ten discovery-only, and two support-only sources.
- Twenty-seven authoritative reference sites use only discovery/support roles or a mixture with unclassified records and therefore require human review.
- The invalid synthetic fixture reproduces this class of failure: valid IDs and source links pass referential integrity while semantic readiness fails because no substantive claim supports the authoritative statement.

### Lorehold

- 97 claim records include core identity, philosophy, structure, timeline, figure, mechanic, location, flavor, placement-support, and discovery topics.
- High volume does not prove maturity, but the packet demonstrates that college modeling can contain substantially more source-extracted material than the thin four-college template.
- Contract v0 could not safely infer substantive meaning merely from these topic names; human review remains mandatory.

### Izzet

- 104 claim records and 22 claim-bearing sources show deep extraction, but volume includes timeline, figures, structure, locations, mechanics, and placement material.
- `placement_support` records often assert meaningful placement evidence. Contract v0's initial broad `type contains support` inference would have wrongly demoted them.
- The automation was corrected to recognize only exact known auxiliary types (`commander_product_support`, `card_flavor_anchor_support`) and exact known discovery types. Other legacy records remain unclassified.

### Fixtures

- Invalid fixture: passed structural references and failed semantic readiness as required.
- Valid fixture: bounded substantive evidence, authoritative reference, and generated provenance passed.

## Contract Corrections Adopted for v1

- Structural inventory labels remain non-semantic.
- Provisional role inference is restricted to exact known discovery and auxiliary-support types.
- `unclassified` never counts as substantive evidence.
- Placement-support, character, timeline, mechanic, and location claims require human role review rather than name-based demotion.
- Bounded evidence localization and character/generalization scope are mandatory for new or remediated substantive claims.
- Recruiter guidance uses parallel canonical-pointer/content-hash evidence mappings instead of changing public prose.
- Stable provenance uses native IDs or JSON Pointer plus content hash.
- Both invalid and valid contract paths are regression fixtures.

## Decision

Contract v1 is frozen for identity recovery. Later changes require a demonstrated contract defect and versioned impact review.
