# VM-581 - College Commander Browsing Identity Labels

ID: VM-581
Title: College Commander Browsing Identity Labels
Status: Backlog
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
