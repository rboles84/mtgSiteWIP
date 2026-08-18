# Orzhov + Golgari + Simic + Izzet + Boros Official-Art Hero Proof

## Status

Done — owner-approved for main integration.

## Scope

Add five additional official-art hero proofs for `WB`, `BG`, `UG`, `UR`, and `WR` using manually approved local art crops.

## In scope

- Add new official-art asset paths for Orzhov, Golgari, Simic, Izzet, and Boros.
- Point only those identities to those proof assets.
- Set initial focal/background positions for owner review.
- Reuse the minimal proof-only artwork attribution.

## Out of scope

- Do not change other non-proof identity hero mappings.
- Do not replace or delete existing rollback assets.
- Do not change placement, scoring, routing, questionnaire logic, generated data, dossier copy, shared layout, typography, or deployment.
- Do not continue to the remaining identities without owner approval.

## Acceptance

- The five selected identities use their new official proof assets in the existing Archscry hero background stack.
- Existing rollback `.webp` assets remain present.
- Existing prior proofs remain intact.
- Non-proof identities continue to use their existing `/assets/img/identity-hero/{slug}.webp` assets.
- Owner can review all five locally via the existing Archscry placement-state route.

## Owner review remediation

- Batch zoom finding: added a proof-only `background-size` override of `80% auto` for `WB`, `BG`, `UG`, `UR`, and `WR` while preserving `cover` for other proof and non-proof identities.
- Boros/Izzet fill finding: tuned only `WR` and `UR` back in to `90% auto` to reduce side borders while keeping `WB`, `BG`, and `UG` at `80% auto`.
- Boros second fill finding: removed the `WR` custom size so Boros returns to full-fill `cover`; `UR` remains at `90% auto`.
- Batch fill finding: removed the remaining custom sizes for `WB`, `BG`, `UG`, and `UR`; all five identities are restored to full-fill `cover`.
- Golgari text finding: added BG-only title/text outline and stronger shadow treatment.
