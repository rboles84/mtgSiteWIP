# Azorius + Dimir + Rakdos + Gruul + Selesnya Official-Art Hero Proof

## Status

Done — owner-approved for main integration.

## Scope

Add five additional official-art hero proofs for `WU`, `UB`, `BR`, `RG`, and `WG` using manually approved local art crops.

## In scope

- Add new official-art asset paths for Azorius, Dimir, Rakdos, Gruul, and Selesnya.
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

- Dimir zoom finding: added a Dimir-only proof `background-size` override of `80% auto` while preserving `cover` for every other proof and non-proof identity.
