# 2026-06-14 22:13 - Codex - VM-395 Apocrypha MaRo Source Links

## Agent Name

Codex

## Task Requested

Finish VM-395 as an audit/closeout pass: treat the current dirty Apocrypha MaRo group as the partial implementation, verify the 39 official Wizards / Mark Rosewater links, preserve existing public links, document the candidate-inventory discrepancy, run required checks, and close the card without widening scope.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-395-apocrypha-official-maro-source-links.md`
- `docs/kanban/ready/VM-396-apocrypha-reference-shelf-progressive-disclosure.md`
- `docs/handoffs/2026-06-14-1026-codex-vm387-apocrypha-visual-repair.md`
- `docs/handoffs/2026-06-14-1216-codex-vm388-apocrypha-card-spacing.md`
- `apocrypha/index.html`
- `assets/css/apocrypha.css`
- `docs/reference/manual-test-cases.md`
- `docs/research/canon/misc/color_pie_articles_for_apocrypha.md`
- `package.json`

## Files Changed

- `docs/kanban/board.md`
- `docs/kanban/done/VM-395-apocrypha-official-maro-source-links.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-14-2213-codex-vm395-apocrypha-maro-source-links.md`

## What Changed

- Moved VM-395 from `in-progress/` to `done/`.
- Added VM-395 closeout evidence, acceptance status, and verification results to the done card.
- Added this handoff and updated the handoff index.

## Why It Changed

VM-395 already had a dirty partial implementation in `apocrypha/index.html`. The remaining work was to audit that implementation against the release-safe boundaries, document the exact source count and candidate discrepancy, run checks, and close the Kanban/handoff workflow without duplicating the MaRo group or starting VM-396.

## Decisions Made

- Treated the existing dirty MaRo group as intended VM-395 content because VM-396 already references and depends on this roughly 39-link markup.
- Kept verification local/static. `package.json` has no existing link-check script, and VM-395 did not introduce a crawler, dependency, source-ledger workflow, or live-link audit.
- Preserved query strings for existing YouTube video links during canonical duplicate checks because they encode video identity; Magic/Wizards links were normalized by lowercased host and trailing-slash-free path with no query/fragment.
- Documented the `docs/research/canon/misc/color_pie_articles_for_apocrypha.md` candidate count as 40 rows, not 42, but did not edit that file, pad the public shelf, or invent missing sources.
- Left VM-396 in `ready/`; it is now unblocked to implement progressive disclosure over the closed VM-395 markup.

## Risks / Uncertainties

- The MaRo group is intentionally long and visually dense until VM-396 adds progressive disclosure.
- Manual-style desktop probe observed one local static-server 404 for `/favicon.ico`; this did not affect the route, visual test, link counts, or overflow checks.
- The broader repo remains dirty from VM-387 through VM-394 and other untracked files; VM-395 did not stage or clean unrelated work.

## Tests Run

- `git status --short --branch`
- Static MaRo link count/attribute audit - passed: 39 links grouped `10 / 10 / 12 / 7`, 0 attribute problems.
- Static existing-link preservation audit - passed: existing public groups remain `1 / 3 / 3 / 3` and unchanged from `HEAD`.
- Static duplicate audit - passed: 0 canonical duplicates in Apocrypha `#ledger`, 0 MaRo/existing overlaps.
- Candidate inventory count - confirmed 40 rows in `docs/research/canon/misc/color_pie_articles_for_apocrypha.md`.
- `git diff --check` - passed with LF/CRLF warnings only.
- `npm.cmd run lint:html` - passed.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run test:frontend-smoke` - passed.
- `npm.cmd test` - passed.
- `npm.cmd run test:visual:apocrypha` - passed with 0 mismatched pixels for hero desktop, hero mobile, and references desktop.
- Manual-style local browser probe - passed at 1366x900 and 390x844 for first-group placement, counts, raw URL visibility, link attributes, horizontal overflow, and `/library/` forwarding.

## Not Touched

- `docs/research/canon/misc/color_pie_articles_for_apocrypha.md`
- Placement logic
- Generated data
- Raw faction packets
- Commander facts
- Source claim ledgers
- Route aliases
- Non-Apocrypha pages
- Disclosure UI / VM-396 implementation
- JavaScript
- Visual baselines
- Git staging, commits, pushes, tags, merges, or main promotion

## Follow-Up Recommendations

- Proceed to VM-396 for the collapsible `<details>` shelf redesign now that VM-395 is closed.
- Keep any future source additions under a separate source verification card rather than padding the VM-395 public shelf.

## Next Suggested Agent

Frontend/UI agent for VM-396.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-395-apocrypha-official-maro-source-links.md`
- `docs/kanban/ready/VM-396-apocrypha-reference-shelf-progressive-disclosure.md`
- `docs/handoffs/2026-06-14-1026-codex-vm387-apocrypha-visual-repair.md`
- `docs/handoffs/2026-06-14-1216-codex-vm388-apocrypha-card-spacing.md`
