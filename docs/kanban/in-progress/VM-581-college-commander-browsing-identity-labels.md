# VM-581 - College Commander Browsing Identity Labels

ID: VM-581
Title: College Commander Browsing Identity Labels
Status: In Progress
Type: Presentation/routing separation
Area: Archscry Commander Browsing Starts
Priority: High
Created: 2026-08-22

## Source

Owner observation during VM-579 acceptance.

## Finding

All five Strixhaven college dossiers display the equivalent guild/color-pair name in Commander Browsing Starts: Quandrix/Simic, Lorehold/Boros, Prismari/Izzet, Silverquill/Orzhov, and Witherbloom/Golgari.

## Required outcome

- Player-facing dossier labels remain college-specific for all five colleges.
- External EDHREC, Archidekt, and MTGDecks routing may retain the valid two-color slug/target where required by the provider.
- Ordinary guild dossiers retain their own guild labels and valid routes.
- Explicitly separate external routing identity from player-facing dossier identity; do not blindly change provider slugs.

## Causality and ownership

The current presenter consumes `getExternalDeckRoutingAlias(faction)` for both routing and visible labels. Those routing/presenter lines were not changed by VM-579. This is a separate presentation-contract defect.

## Not authorized by this intake

No implementation, provider routing rewrite, identity-data edit, generated-data edit, or VM-579 scope expansion. Reproduce all five colleges and ordinary guild controls before editing.

## Gate A Preflight — 2026-08-22

- Composition owner: `assets/js/archscry/runtime/dossier-view.js::buildDeckDiscoveryGroups` composes Commander Browsing Starts from the dossier's directory links and current faction.
- Current visible-label field: `getExternalDeckRoutingAlias(faction).label` supplies strings such as `Orzhov commanders` and `Orzhov Commander decks`.
- Provider-route fields: `edhrecUrl`, `mtgDecksUrl`, Archidekt color identity, and the routing slug remain owned by `getExternalDeckRoutingAlias` and existing provider URL builders.
- Existing display authority: `playerFacingIdentityDisplayLabel(faction)` already derives college names from current expression/faction metadata and strips the institutional `College` suffix while preserving ordinary guild labels.
- Shared consumers: guilds, colleges, and all other identity families use the same discovery-group presenter; the correction must be generic display/routing separation, not five literal replacements.
- Smallest complete change: use `playerFacingIdentityDisplayLabel(faction)` only for player-facing directory labels while retaining every existing provider URL and routing identity byte-for-byte.
- QA tier: QA-2 presentation/routing contract.
- Stop condition: stop if valid provider destinations would need to change. Preflight proves only presentation labels need change.

## RobDev implementation and QA — 2026-08-22

- Reused `playerFacingIdentityDisplayLabel(faction)` for visible directory labels inside the existing `buildDeckDiscoveryGroups` presenter while retaining `getExternalDeckRoutingAlias` and the existing provider URL builders for routing.
- The generic presenter correction covers all five Colleges without literal College replacements; Archidekt archetype/tag lane labels remain untouched.
- Fresh-origin rendered QA and focused browser automation confirmed Quandrix/Simic, Lorehold/Boros, Prismari/Izzet, Silverquill/Orzhov, and Witherbloom/Golgari display-route separation across EDHREC, Archidekt, and MTGDecks.
- The ordinary WB dossier still displays `Orzhov` for all three directory providers and retains its Orzhov/WB destinations.
- `npm run test:post-vm579-owner-qa`, `npm run test:dev-review`, JS lint, HTML validation, and frontend smoke pass. Independent exact-SHA RobQA remains required before owner review.

## Acceptance Criteria

- [x] Quandrix, Lorehold, Prismari, Silverquill, and Witherbloom visible Commander Browsing labels use the college identity.
- [x] Their EDHREC, Archidekt, and MTGDecks destinations retain the valid corresponding two-color route.
- [x] Representative ordinary guild visible labels and destinations remain correct.
- [ ] Focused automation, rendered RobDev QA, and independent exact-SHA RobQA pass.
