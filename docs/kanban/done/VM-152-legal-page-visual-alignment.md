# VM-152 - Legal Page Visual Alignment

ID: VM-152
Title: Legal Page Visual Alignment
Status: done
Type: Frontend / Route Polish
Area: Privacy, Terms, Public Route Shell
Priority: low
Created: 2026-05-27
Completed: 2026-05-27

## Summary

Align the Privacy and Terms pages with the current public route look and feel after VM-145 extracted their CSS but preserved the older archive-document visual treatment.

## Source

- User QA feedback after VM-145
- `privacy/index.html`
- `terms/index.html`
- `assets/css/legal.css`
- `docs/architecture/route-ownership-matrix.md`

## Acceptance Criteria

- Privacy and Terms use the same current gateway background family as Home, Archscry, Apocrypha, and Strategium.
- Legal-page panels feel like the newer public-route glass/card language rather than a separate heavy archive document style.
- Legal copy, glossary text, route links, topbar behavior, background shell semantics, and script order remain unchanged.
- `../assets/css/legal.css` remains the legal route stylesheet loaded last.
- `npm.cmd run lint:html`, `npm.cmd run test:frontend-smoke`, and `git diff --check` pass.
- Desktop and mobile visual QA confirm the hero, summary, section cards, and footer match the current public-route family.

## Completion Notes

- Switched both legal pages from the older Apocrypha library background to the current gateway background asset used by the public-route family.
- Lowered the legal pages from the heavy background density to the medium shared atmosphere treatment.
- Reworked `assets/css/legal.css` into the same blue-black/gold glass surface language used by the active route family, while keeping it scoped to Privacy and Terms.
- Updated legal-page eyebrow labels from archive-record language to Vox Mana route labels.
- Preserved legal copy, glossary spans, relative footer links, topbar wiring, script tags, and the `../assets/css/legal.css` last-load contract.

## Tests Run

- `npm.cmd run lint:html`
- `npm.cmd run test:frontend-smoke`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- Headless browser responsive QA for Privacy and Terms at desktop `1365x1000` and mobile `390x900`

## Non-Goals Preserved

- Legal copy was not changed.
- Navigation, scripts, storage behavior, placement behavior, Maze behavior, Apocrypha behavior, and Strategium behavior were not changed.
- Legal CSS was not migrated into shared CSS.

## Human Review

Yes - this card was created from human visual QA feedback after VM-145.
