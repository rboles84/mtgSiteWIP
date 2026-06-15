# VM-395 - Apocrypha Official MaRo Source Links

Status: Done
Owner: Codex
Created: 2026-06-14
Closed: 2026-06-14

## Summary

Add a verified official Wizards / Mark Rosewater source shelf to Apocrypha's public reference library, using compact grouped cards rather than one visual card per article.

## Scope

- Add one new first library group in `apocrypha/index.html`.
- Include only verified official `magic.wizards.com` Wizards / Mark Rosewater URLs.
- Keep the existing 10 Apocrypha public links intact.
- Avoid duplicate canonical URLs, normalizing host casing, path trailing slashes, and preserving query strings only where the existing URL convention requires them, such as YouTube video IDs.
- Add minimal Apocrypha-local CSS only if grouped article lists need readable spacing.
- Update manual QA documentation and handoff records.

## Evidence

- The current dirty `apocrypha/index.html` MaRo group was treated as the partial VM-395 implementation and audited rather than duplicated.
- The `Official Wizards / Mark Rosewater` group appears first in the Apocrypha `#ledger` public reference library.
- The MaRo group contains 39 links across four grouped cards:
  - `Foundational color philosophy` - 10 links.
  - `Current color voice and governance` - 10 links.
  - `Ravnica guild design` - 12 links.
  - `Alara shard and three-color design` - 7 links.
- Static audit confirmed every MaRo link has a canonical `https://magic.wizards.com/en/news/...` href, readable article-title text, `target="_blank"`, `rel="noopener"`, no query/fragment, and no raw URL text.
- The existing non-MaRo Apocrypha groups remain unchanged from `HEAD` by link text and href:
  - `Official Lore And Story` - 1 link.
  - `Story Archives And Indexes` - 3 links.
  - `Wiki And Community References` - 3 links.
  - `Video Lore And Deep Dives` - 3 links.
- Refined canonical duplicate scan found 0 duplicate canonical URLs in the Apocrypha `#ledger` section and 0 overlaps between the 39 MaRo links and the existing 10 public links.
- `docs/research/canon/misc/color_pie_articles_for_apocrypha.md` has 40 local candidate rows, not 42. VM-395 did not edit that candidate file, pad the public shelf, invent sources, or add Drive to Work transcripts, unverified wedge articles, non-Wizards sources, Scryfall search patterns, mirrors, reposts, archive-only pages, or fan/wiki summaries.
- No existing project link-check command was found, so verification stayed local/static.
- VM-396 remains in `ready/` and is now unblocked to implement progressive disclosure over this MaRo markup.

## Acceptance

- [x] New `Official Wizards / Mark Rosewater` group appears first in the Apocrypha public reference library.
- [x] Grouped reference cards use readable article-title links and do not expose raw URLs.
- [x] Every new outbound link has `target="_blank"` and `rel="noopener"`.
- [x] Existing 10 public links remain visible and unchanged.
- [x] No canonical URL is duplicated against existing Apocrypha public links.
- [x] Candidate sources without verified canonical official URLs are excluded and documented.
- [x] Local inventory count discrepancy is documented: candidate file has 40 links, not 42, and is not padded.

## Verification

- `git status --short --branch` - reviewed dirty tree before closeout.
- Static count/attribute audit - passed: MaRo group has 39 links grouped `10 / 10 / 12 / 7`, 0 link attribute problems.
- Static existing-link preservation audit - passed: existing non-MaRo public groups remain `1 / 3 / 3 / 3` and unchanged from `HEAD`.
- Static duplicate audit - passed: 0 canonical duplicates in Apocrypha `#ledger`, 0 MaRo/existing overlaps.
- Candidate inventory count - confirmed 40 rows in `docs/research/canon/misc/color_pie_articles_for_apocrypha.md`.
- `git diff --check` - passed with LF/CRLF warnings only.
- `npm.cmd run lint:html` - passed.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run test:frontend-smoke` - passed.
- `npm.cmd test` - passed.
- `npm.cmd run test:visual:apocrypha` - passed; all captures reported 0 mismatched pixels.
- Manual-style local browser probe - passed at 1366x900 and 390x844: MaRo group appears first, link counts are `39 / 1 / 3 / 3 / 3`, no raw URL text, 0 bad MaRo link attributes, no horizontal document/body overflow, and `/library/` forwards to `/apocrypha/`. One local desktop 404 was `/favicon.ico`, consistent with incidental environment noise.

## Boundaries

- Did not touch placement logic, generated data, raw faction packets, commander facts, source claim ledgers, route aliases, non-Apocrypha pages, disclosure UI, JS, or visual baselines.
- Did not stage, commit, push, tag, merge, promote main, add dependencies, introduce a crawler, or run a live-link auditing workflow.
