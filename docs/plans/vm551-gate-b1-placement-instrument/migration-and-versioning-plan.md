# VM-551 Gate B1 Migration and Versioning Plan

Status: design only. No schema, runtime, persistence, or migration change is authorized.

## Goals

- Never reinterpret a legacy result silently.
- Preserve Gate A result shapes and existing consumers.
- Distinguish old and new instrument versions.
- Permit shadow evaluation without changing the visible result.
- Support immediate rollback.
- Keep additions additive.
- Keep identity, recommendation, Matrix, dossier, and persistence migrations separate unless explicitly reviewed.

## Version identifiers

The design candidate uses non-production identifiers:

- instrument design: archscry-placement-instrument/b1-pilot-v0;
- observation contract: archscry-observation-contract/v0;
- signal contract: archscry-signal-contract/v0;
- identity-support contract: unresolved until scoring design is separately authorized.

A later production instrument needs a new immutable version. It must not reuse vox-mana-adaptive-placement-v1 or the existing result version as though semantics were unchanged.

## Additive result envelope

Existing fields retain their names and historical meanings. A future implementation may add an optional sibling object conceptually shaped as:

    placement_result:
      ...all existing fields retained
      instrument:
        instrument_version
        observation_contract_version
        signal_contract_version
        identity_support_contract_version
        mode: live or shadow
        completed_at
      observation_summary:
        independent_evidence_units
        dependency_groups_observed
        unknown_answer_ids
        conditional_answer_ids
        contradiction_ids
        boundary_observation_ids

These field names are illustrative and require consumer review. They are not implemented.

Rules:

- Missing additive objects mean legacy/unknown, never zero confidence.
- Legacy scores, gaps, softmax shares, and ranks keep only their historical meaning.
- New observations never overwrite old stage history, answer indexes, or result fields.
- Old results display through existing legacy normalization and Gate A states.
- No background process upgrades a saved result to a new identity.

## Read paths

### Legacy result

1. Detect the existing model/result version.
2. Parse with the current read-only legacy path.
3. Preserve Gate A public containment.
4. Label instrument provenance legacy/unknown when no additive version exists.
5. Never fabricate answer IDs, independent-evidence counts, or calibrated confidence.

### New result

1. Require recognized instrument and contract versions.
2. Validate question, answer, construct, signal, and dependency references.
3. Preserve existing downstream fields where a reviewed adapter can populate them honestly.
4. Add observation/public-state fields without renaming existing fields.
5. Reject or quarantine partial state with mismatched contract hashes.

## Shadow evaluation

Shadow mode is required before visible cutover.

- The current live instrument remains public authority.
- New observation capture runs only for explicitly enrolled pilot sessions.
- Shadow output uses a separate namespace or test dataset, never the live saved result.
- Shadow evaluation may compare result states, confusion, and explanations, but it may not display a competing identity as official.
- Analytics distinguish live, shadow, abandoned, invalid, and test sessions.
- Consent and retention rules require separate approval.

Shadow records need:

- participant/session pseudonymous ID;
- instrument and contract versions;
- exact question route;
- stable answer IDs;
- independent dependency groups;
- candidate public state;
- explanation trace;
- comprehension and confidence responses;
- legacy result reference only with participant permission.

## Rollback

A future implementation must use one instrument-version switch.

Rollback must:

- stop new-version assignment without deleting shadow evidence;
- restore the current live instrument and result path;
- leave legacy and completed pilot records readable;
- avoid rewriting saved results;
- preserve Gate A and downstream fields;
- record the disabled version and reason;
- require a new version for a repaired candidate rather than mutating a rejected contract.

No destructive database rollback should be necessary because additions are additive.

## Partial-state handling

- Partial state includes instrument and contract version/hash.
- A mismatch invalidates only the partial session, not a saved completed legacy result.
- Recovery copy says to restart the reading or return to the saved result.
- An old partial route never resumes against a new bank.
- No current partial-state behavior changes in this task.

## Downstream compatibility

Before implementation, rerun the accepted VM-551 consumer map against:

- Archscry result rendering;
- dossier tabs and all-section view;
- Gate A states and close alternatives;
- Matrix authored and placement-derived paths;
- recommendations and Commander browsing support;
- Maze handoff;
- account/profile/cache/saved-return behavior;
- analytics and route metadata;
- legacy stored results.

Each existing field receives one disposition:

- preserve unchanged;
- preserve internally and hide publicly;
- additive extension;
- versioned migration later;
- unresolved blocker.

No unresolved blocker may enter implementation.

## Cutover threshold

Do not cut over because a calendar period elapsed. A future owner decision may authorize implementation only after:

- all question and answer contracts pass;
- every route uses recognized versions;
- dependency handling is enforced;
- all 37 identities have reviewed structural tests;
- player-validation thresholds pass or receive explicit documented waiver;
- weak high-risk pairs retain close/insufficient outcomes;
- one-answer perturbation and order tests do not create strong-to-strong flips;
- legacy read, saved-return, result, dossier, Matrix, recommendation, and Maze compatibility pass;
- shadow rollback is demonstrated;
- an exact implementation candidate receives separate owner approval.

## Explicit non-migration

This task does not alter data/placement-model.json, Gate compression, live result fields, database schemas, saved results, Gate A rendering, downstream consumers, shadow collection, deployment, or certification.
