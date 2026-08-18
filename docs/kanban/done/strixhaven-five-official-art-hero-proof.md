# Lorehold + Prismari + Quandrix + Silverquill + Witherbloom Official-Art Hero Proof

## Status

Done — owner-approved for main integration.

## Scope

Add five additional official-art hero proofs for `LOREHOLD`, `PRISMARI`, `QUANDRIX`, `SILVERQUILL`, and `WITHERBLOOM` using manually approved local art crops.

## In scope

- Add new official-art asset paths for the five Strixhaven colleges.
- Point only those identities to those proof assets.
- Set initial focal/background positions for owner review.
- Reuse the minimal proof-only artwork attribution.
- Tune only the existing Golgari and Sultai hero title colors for readability after owner review.

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
- Golgari and Sultai use readable identity-flavored title colors rather than plain white.
- Owner can review all five locally via the existing Archscry placement-state route.

## Owner review remediation

- Quandrix image finding: switched only `QUANDRIX` from the initial Mathemagics proof crop to the owner-provided Tanazir Quandrix art crop using a new rollback-safe asset path. The prior `quandrix-mathemagics.jpg` proof asset remains available.
