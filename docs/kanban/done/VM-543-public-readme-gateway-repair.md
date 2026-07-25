# VM-543 - Public README Gateway Repair

Status: Done
Type: Documentation / Public Repository
Area: README / Project Orientation
Priority: P1
Created: 2026-07-25
Completed: 2026-07-25

## Summary

Replace the obsolete root `README.md` with an accurate public-facing introduction to Vox Mana. The README explains the product, live site, repository structure, safe contribution boundaries, privacy/data boundaries, MTG non-affiliation, and current license status without changing runtime behavior, protected source data, generated artifacts, or semantic placement content.

## Source

User-approved VM-543 implementation brief on 2026-07-25.

## Acceptance Criteria

- [x] Root `README.md` no longer uses the `mtgSiteWIP` title or obsolete `docs/workflow.md` link.
- [x] Opening README section explains what Vox Mana is and links to the live site before readers need to scroll.
- [x] README describes confirmed public experiences: Archscry, The Implicit Maze, Strategium, and Apocrypha.
- [x] README states active-development status without using unsupported beta or portfolio-ready claims.
- [x] README clearly says Vox Mana is not a deckbuilder, card database, rules engine, generic wiki, or purchasing/recommendation authority.
- [x] README links only to verified local paths and verified external URLs.
- [x] README documents only contributor-invokable local commands from current repository authority.
- [x] README warns that semantic placement, generated artifacts, research canon, and source-governed data follow protected workflows.
- [x] README states honestly that no root license file currently exists.
- [x] Required Kanban and handoff traceability are complete.

## Validation

- README internal-link check passed for 11 Markdown links.
- README structural/GFM smoke passed.
- Final README stale-phrase scan found no `mtgSiteWIP`, obsolete `docs/workflow.md`, unsupported beta/portfolio claims, unsupported policy-file links, `Commander Experience Passport`, or unsupported recommendation-engine phrasing.
- External live-site URL check passed for `https://voxmana.io/`.
- `npm.cmd run test:copy-boundaries` - passed across 14 live-copy files.
- `npm.cmd run test:route-metadata` - passed for eight public route heads.
- `npm.cmd run test:frontend-smoke` - passed.
- `git diff --check` - passed with LF-to-CRLF working-copy warnings for edited Markdown files only.

## Not In Scope

- Runtime HTML/CSS/JS behavior changes.
- Semantic placement, identity, source-governed data, or generated artifact edits.
- Privacy-page, terms-page, root license, contribution-policy, security-policy, or code-of-conduct creation.
- Screenshots, badges, visual assets, marketing redesign, deployment, commit, or push.

## Completion Notes

- Replaced the root README with a public gateway organized around live site access, core experiences, high-level architecture, active-development status, local checks, repository map, safe contribution boundaries, privacy/data boundaries, attribution, non-affiliation, and license status.
- Kept Scryfall wording limited to search/data integration and avoided endorsement, affiliation, or data-ownership implications.
- Omitted Commander Experience Passport because it is not confirmed as a current public feature.
- Preserved CRIT-001 and source-governed workflow boundaries without reopening semantic or placement work.

## Related Work

- VM-496 - Vox Mana Self-Snapshot 2026-07-10.
- VM-541 - Token And Reasoning Cost Control Governance.
- `docs/reference/workflow.md`.
- `privacy/index.html`.
- `terms/index.html`.
