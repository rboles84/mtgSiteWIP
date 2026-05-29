# VM-017 - Main Index Gateway Mockup Set

ID: VM-017
Title: Main Index Gateway Mockup Set
Status: superseded
Type: Design / UX
Area: Home, Visual Direction
Priority: medium
Created: 2026-05-15

## Summary

Re-triage the former Three Doors home-gateway mockup set before any implementation. VM-148 promotes the Identity Signal homepage to canonical `/`, so this card is now an archived design prompt unless a human explicitly re-scopes it around the current root home.

## Source Evidence

- Historical pre-VM-148 `index.html`, `assets/css/home.css`, and `assets/js/home.js` - former Three Doors gateway references available through git history only.
- Current `index.html` - canonical Identity Signal homepage after VM-148.
- `docs/design/asset-manifest.md` - lists the seeded gateway and page-specific background candidates and the mockup-quality gate.
- `docs/design/visual-style-guide.md` - defines the dark arcane archive language, black stone, bronze trim, teal/gold light, and architectural UI treatment.
- `C:\\dev\\projectFiles\\mtgSite\\UI Files\\redesign Images\\background samples` - current gateway background and home reference material.
- `C:\\dev\\projectFiles\\mtgSite\\UI Files\\redesign Images\\site pages` - current mockup inspiration set, including the home, Archscry, Maze, and Apocrypha references.

## Problem

The original Three Doors gateway direction has been superseded by the canonical Identity Signal homepage. Do not implement this card without a fresh product decision that clarifies whether the old gateway concept still matters.

## Proposed Outcome

A small, high-fidelity homepage mockup set that shows:

- first-visit desktop gateway at 1440px
- returning-user desktop gateway at 1440px
- mobile gateway at 390px

The mockups should preserve the three-door structure, keep Apocrypha visibly published, and show the home as a polished Vox Mana threshold rather than a generic product landing page.

## Acceptance Criteria

- The mockup set includes the three homepage states listed above and nothing broader.
- The first-visit frame feels like a ceremonial gateway into Archscry, Maze, and Apocrypha.
- The returning-user frame shows a compact resume path without inflating the homepage into a dashboard.
- The mobile frame preserves hierarchy, destination clarity, and the resume affordance without collapsing into a flat vertical stack.
- Apocrypha remains visible and active in every applicable frame.
- The visual language stays aligned with the current Vox Mana gateway references: teal/gold light, black stone, bronze trim, wet reflections, and architectural framing.
- The chosen direction is clear enough to translate into the current canonical home route after mockup approval.

## Non-Goals

- This is not a redesign of Archscry internals.
- This is not a redesign of Maze internals.
- This is not a hidden or disabled Apocrypha treatment.
- This is not a generic SaaS landing page treatment.
- This does not change runtime behavior yet.

## Dependencies / Related Work

- `VM-005` Archscry / Maze UX continuity and link reliability.
- `VM-006` Archscry / Maze verification and repeat-visit polish.
- `VM-016` Archscry profile return QR.
- Current home gateway assets and background references.

## Testing Notes

- Review the approved mockups against the inspiration folder before any implementation begins.
- Confirm the home still reads as a threshold, not a dashboard, and that Apocrypha remains published rather than hidden.
- Confirm the mobile state preserves the gateway hierarchy and does not degrade into a bland stacked card list.

## Delivery / Removal Criteria

This card can be marked delivered or removed from the active backlog when:

- the homepage mockup set is approved
- the chosen direction is ready for translation into the live home shell
- the implementation story is either started or split into a more concrete follow-up

## Human Review

Yes - this is a product-shaping homepage visual direction decision.

## Notes

Keep this scoped to the home gateway. The result should be a premium front door for Vox Mana, not a full page system rewrite.

2026-05-15 update: `VM-019` added a disposable root-level first-visit sandbox for local review. The full VM-017 mockup-set scope remains open because returning-user and dedicated mobile frames were intentionally excluded from that lightweight pass.

2026-05-26 update: `VM-148` promotes the Identity Signal homepage to canonical `/` and removes the old Three Doors shell plus `assets/css/home.css` and `assets/js/home.js`. Re-triage this card before implementation; do not target deleted Three Doors assets without explicit new scope.

2026-05-28 supersession note: The original Three Doors direction was superseded by `VM-148`; future homepage concept work should use a fresh current-home card rather than reopening this removed route direction. Historical references: `docs/handoffs/2026-05-15-2016-codex-vm017-main-index-gateway-mockup-set.md` and the `VM-148` history cited above.

