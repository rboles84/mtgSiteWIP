# Naya + Esper Official-Art Hero Proof

## Status

Done — owner-approved for main integration.

## Scope

Add two additional official-art hero proofs for Naya and Esper using the manually approved local art crops.

## In scope

- Add new Naya and Esper official-art asset paths.
- Point only `NAYA` and `ESPER` to those assets.
- Set initial focal/background positions for owner review.
- Reuse the minimal proof-only artwork attribution.

## Out of scope

- Do not change other non-proof identity hero mappings.
- Do not replace or delete existing rollback assets.
- Do not change placement, scoring, routing, questionnaire logic, generated data, dossier copy, shared layout, typography, or deployment.
- Do not continue to the remaining identities without owner approval.

## Acceptance

- `NAYA` and `ESPER` use their new official proof assets in the existing Archscry hero background stack.
- `assets/img/identity-hero/naya.webp` and `assets/img/identity-hero/esper.webp` remain present for rollback.
- Existing Abzan, Bant, and Grixis proofs remain intact.
- Non-proof identities continue to use their existing `/assets/img/identity-hero/{slug}.webp` assets.
- Owner can review both locally via the existing Archscry placement-state route.
