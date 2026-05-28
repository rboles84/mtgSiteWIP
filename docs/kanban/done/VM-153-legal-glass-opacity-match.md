# VM-153 - Legal Glass Opacity Match

ID: VM-153
Title: Legal Glass Opacity Match
Status: done
Type: Frontend / Visual Polish
Area: Privacy, Terms, Legal CSS
Priority: low
Created: 2026-05-27
Completed: 2026-05-27

## Summary

Match the Privacy and Terms legal-page glass opacity to the VM-142 Maze/Strategium glass decision: primary hero surfaces use the darker command-deck alpha, while secondary legal cards use the lighter sidebar/results alpha.

## Source

- User follow-up after VM-152
- `assets/css/legal.css`
- VM-142 Maze Strategium glass opacity decision

## Acceptance Criteria

- Legal hero surfaces use the VM-142 primary surface gradient: `rgba(12, 16, 25, 0.72)` to `rgba(8, 11, 18, 0.56)`.
- Legal summary and section cards use the VM-142 secondary surface gradient: `rgba(12, 16, 25, 0.62)` to `rgba(8, 11, 18, 0.44)`.
- Major legal panels keep the same no-blur sharp-glass behavior as the approved Maze/Strategium comparison.
- Legal copy, markup, route links, background asset, topbar, scripts, and validator contract remain unchanged.
- `npm.cmd run lint:html`, `npm.cmd run test:frontend-smoke`, and `git diff --check` pass.

## Completion Notes

- Updated `--legal-glass` to the VM-142 lighter panel alpha and `--legal-glass-strong` to the VM-142 primary command-deck alpha.
- Applied `--legal-glass-strong` only to `.legal-hero`.
- Kept `.summary-card` and `.legal-section` on the lighter `--legal-glass`.
- Set major legal panels to `backdrop-filter: none` to match the approved sharper glass behavior.
- Added manual QA notes for the legal opacity contract.

## Tests Run

- `npm.cmd run lint:html`
- `npm.cmd run test:frontend-smoke`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- Headless browser responsive QA for Privacy and Terms at desktop `1365x1000` and mobile `390x900`

## Non-Goals Preserved

- Legal text was not changed.
- Privacy and Terms HTML structure, route links, background asset, topbar, and script tags were not changed.
- Maze, Strategium, Archscry, Apocrypha, Home, and VM-022 work were not changed.

## Human Review

Yes - this card follows the VM-142 opacity decision the user called out.
