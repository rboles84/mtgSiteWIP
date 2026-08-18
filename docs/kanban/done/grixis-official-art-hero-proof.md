# Grixis Official-Art Hero Proof

## Status

Done — owner-approved for main integration.

## Scope

Add one additional official-art hero proof for Grixis using the manually approved local art crop.

## In scope

- Add a new Grixis official-art asset path.
- Point only Grixis's Archscry hero to that asset.
- Set an initial Grixis focal/background position for owner review.
- Reuse the minimal proof-only artwork attribution.

## Out of scope

- Do not change other non-proof identity hero mappings.
- Do not replace or delete the existing Grixis rollback asset.
- Do not change placement, scoring, routing, questionnaire logic, generated data, dossier copy, shared layout, typography, or deployment.
- Do not continue to the remaining identities without owner approval.

## Acceptance

- `GRIXIS` uses the new official proof asset in the existing Archscry hero background stack.
- `assets/img/identity-hero/grixis.webp` remains present for rollback.
- Existing Abzan and Bant proofs remain intact.
- Non-proof identities continue to use their existing `/assets/img/identity-hero/{slug}.webp` assets.
- Owner can review Grixis locally via the existing Archscry placement-state route.
