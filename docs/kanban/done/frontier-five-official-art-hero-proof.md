# Yore + Glint + Dune + Ink + Witch + Colorless + WUBRG Official-Art Hero Proof

## Status

Done — owner-approved for main integration.

## Scope

Add official-art hero proofs for `YORE`, `GLINT`, `DUNE`, `INK`, `WITCH`, `COLORLESS`, and `WUBRG` using manually approved local art crops from `C:\WIP\VoxManaHeroArt\approved`.

## In scope

- Add new official-art asset paths for Yore, Glint, Dune, Ink, Witch, Colorless, and WUBRG.
- Point only those supported identities to those proof assets.
- Set initial focal/background positions for owner review.
- Reuse the minimal proof-only artwork attribution.

## Out of scope

- Do not change other non-proof identity hero mappings.
- Do not replace or delete existing rollback assets.
- Do not change placement, scoring, routing, questionnaire logic, generated data, dossier copy, shared layout, typography, gradients, or deployment.
- Do not continue to remaining identities without owner approval.

## Acceptance

- The five selected identities use their new official proof assets in the existing Archscry hero background stack.
- Existing rollback `.webp` assets remain present.
- Existing prior proofs remain intact.
- Non-proof identities continue to use their existing `/assets/img/identity-hero/{slug}.webp` assets.
- `INK` uses only the proof override asset and does not require or invent a rollback `ink.webp` slug.
- Owner can review all five locally via the existing Archscry placement-state route.

## Owner review remediation

- Ink finding: added `INK` with `ink_gpt-117-ink-treader-nephilim.jpg` via a new proof asset path.
- WUBRG finding: added `WUBRG` with `wubrg_con-102-conflux.jpg` via a new proof asset path.
- WUBRG crop finding: kept `cover` to avoid side borders and re-centered focal from `50% 45%` to `50% 50%`.
- WUBRG replacement finding: switched `WUBRG` from Conflux to owner-provided `wubrg_5dn-84-channel-the-suns.jpg` via a new proof asset path. The prior `wubrg-conflux.jpg` proof asset remains available.
- Yore fixture finding: the saved `YORE` witness row is currently an insufficient `UB` result, so owner review needs a visual-only result override snippet rather than the plain witness snippet.
