# Jund + Sultai + Temur + Mardu + Jeskai Official-Art Hero Proof

## Status

Done — owner-approved for main integration.

## Scope

Add five additional official-art hero proofs for Jund, Sultai, Temur, Mardu, and Jeskai using manually approved local art crops.

## In scope

- Add new official-art asset paths for `JUND`, `SULTAI`, `TEMUR`, `MARDU`, and `JESKAI`.
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
- Existing Abzan, Bant, Grixis, Naya, and Esper proofs remain intact.
- Non-proof identities continue to use their existing `/assets/img/identity-hero/{slug}.webp` assets.
- Owner can review all five locally via the existing Archscry placement-state route.

## Owner review remediation

- Sultai text readability finding: added Sultai-only title/text outline and stronger shadow treatment without changing the shared overlay or other identities.
- Temur art finding: replaced the active Temur proof mapping with the owner-supplied `Ureni, the Song Unending` art crop at `assets/img/identity-hero/official/temur-ureni-song-unending.jpg`.
- Preserved the prior Temur proof asset `assets/img/identity-hero/official/temur-ureni-unwritten.jpg` and original rollback asset `assets/img/identity-hero/temur.webp`.
- Temur second art finding: replaced the active Temur proof mapping with the owner-supplied higher-resolution `Dragonback Assault` PNG at `assets/img/identity-hero/official/temur-dragonback-assault.png`.
- Preserved both prior Temur proof assets plus the original Temur rollback asset.
