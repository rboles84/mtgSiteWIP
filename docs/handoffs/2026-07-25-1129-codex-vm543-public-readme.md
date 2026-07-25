# Agent Handoff: Codex - VM-543 Public README

Date: 2026-07-25 11:29
Related Card: VM-543 - Public README Gateway Repair
Related Plan: User-approved VM-543 implementation brief
Status: Complete

## Task Requested

Replace the obsolete root README with a professional, accurate public-facing README for Vox Mana, while adding only the required Kanban and handoff traceability.

## Files Reviewed

- `AGENTS.md`
- `README.md`
- `CNAME`
- `package.json`
- `.github/workflows/validation.yml`
- `.github/workflows/browser-smoke.yml`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-10-0042-codex-vm496-vox-mana-self-snapshot.md`
- `docs/handoffs/2026-07-25-1020-codex-token-reasoning-governance.md`
- `docs/handoffs/templates/agent-handoff-template.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-496-vox-mana-self-snapshot-2026-07-10.md`
- `docs/kanban/backlog/VM-541-token-reasoning-cost-control-governance.md`
- `docs/reference/workflow.md`
- `docs/architecture/project-atlas.md`
- `docs/strategy/2026-06-30-vox-mana-public-demo-case-study.md`
- `privacy/index.html`
- `terms/index.html`

## Files Changed

- `README.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-543-public-readme-gateway-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-25-1129-codex-vm543-public-readme.md`

## What Changed

- Replaced the 94-byte `mtgSiteWIP` README stub with a public Vox Mana project gateway.
- Added live-site access, confirmed core experience descriptions, high-level architecture, active-development status, local checks, verified repository map, protected workflow boundaries, privacy/data attribution language, non-affiliation notice, and honest license status.
- Added VM-543 Kanban traceability and this handoff record.
- Updated the handoff index.

## Why

The root GitHub README misrepresented Vox Mana as `mtgSiteWIP` and linked a nonexistent workflow path. A first-time visitor needed a concise, accurate explanation of what Vox Mana is, who it is for, where to try it, how the repo is organized, and what contribution boundaries apply.

## Decisions Made

- Used `VM-543`; no existing VM-543 card or handoff was found.
- Used `https://voxmana.io/` from `CNAME` as the live link.
- Linked workflow guidance to `docs/reference/workflow.md`.
- Omitted Commander Experience Passport because it is not confirmed as a current public feature.
- Used active-development language only; did not call the project a public beta or portfolio-ready.
- Stated that no root license file exists instead of creating or linking one.
- Mentioned Scryfall only as search/data integration context, without endorsement, affiliation, or data ownership implications.

## Risks / Uncertainties

- External URLs can change after this verification pass.
- The README accurately states active-development status, but future product changes may require wording updates.
- No root license or contributor policy files exist; the README now surfaces that limitation rather than resolving it.

## Efficiency / Escalation Notes

Work stayed narrow by design: README replacement plus required Kanban and handoff traceability only. No runtime, source, generated, semantic, visual, package, deployment, branch, remote, or policy-file work was performed.

## Tests / Checks Run

- External URL check for `https://voxmana.io/` - passed.
- README internal-link check - 11 Markdown links resolved.
- README structural/GFM smoke - passed.
- README stale-phrase scan - no banned or unsupported phrases found.
- Command authority check against `package.json` and workflow files - passed.
- `npm.cmd run test:copy-boundaries` - passed across 14 live-copy files.
- `npm.cmd run test:route-metadata` - passed for eight public route heads.
- `npm.cmd run test:frontend-smoke` - passed.
- `git diff --check` - passed with LF-to-CRLF working-copy warnings for edited Markdown files only.
- `git status --short` - reviewed; modified files are expected for VM-543.

## Not Touched

- Runtime HTML, CSS, or JavaScript behavior
- Semantic placement, identity, source-governed data, or generated artifacts
- CRIT-001 certification records or placement model internals
- Privacy or terms page copy
- Root license, contribution, security, or code-of-conduct files
- Screenshots, badges, visual assets, deployment, commit, push, or branch changes

## Follow-Up Recommendations

- Consider a separate owner decision on adding a root license and contributor policy if public contribution becomes a priority.
- Revisit README status wording after external reviewer testing or a formal release label is chosen.
- Keep README scope aligned with the recommendation-boundary cleanup recommended by VM-496.

## Next Suggested Agent

- Documentation Steward if a future license/contribution-policy decision is requested.
