# VM-403 GitHub Pages Domain Deploy Repair Handoff

## Agent Name

Codex

## Task Requested

Fix the GitHub Pages deployment failure by disabling Jekyll for this static site, preserving the existing `CNAME`, avoiding Markdown syntax edits, and preparing/pushing the smallest possible change to `main`.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-06-15-1334-codex-vm402-golden-branch-promotion.md`
- `docs/kanban/done/VM-402-golden-branch-promotion-to-main.md`
- `docs/handoffs/2026-06-14-1747-codex-vm393-final-release-hygiene.md`
- `CNAME`
- `.nojekyll`
- `index.html`
- `package.json`
- `.github/pull_request_template.md`
- `.github/ISSUE_TEMPLATE/task.yml`

## Files Changed

- `.nojekyll`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-403-github-pages-domain-deploy-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-15-1558-codex-vm403-pages-deploy-repair.md`

## What Changed

- Added an empty root `.nojekyll` file so GitHub Pages stops running Jekyll over internal Markdown docs.
- Preserved the existing root `CNAME` containing `voxmana.io`.
- Created and closed VM-403 as the deployment repair tracking card.
- Documented that `main` and the golden branch were aligned at `0373d9c` before repair.
- Documented the user-provided Jekyll/YAML/Liquid failure class and the no-Markdown-edit decision.

## Why It Changed

GitHub had the new `main` files, but Pages was running Jekyll over the whole repository. The build log showed Jekyll failing on internal Markdown docs (`docs/reference/commander-faction-guidance.md` YAML parsing and `docs/research/canon/misc/MTG Platform Architecture Blueprint.md` Liquid `Unknown tag 'id'`). This static HTML/CSS/JS site should bypass Jekyll with root `.nojekyll`.

## Decisions Made

- Treat the issue as a missing `.nojekyll` static-site marker, not a CNAME, DNS, source-content, or Markdown-authorship problem.
- Do not edit internal Markdown syntax merely to satisfy Jekyll.
- Do not edit runtime route code, source lore, generated data, visual baselines, or local `main`.
- Push the VM-403 closeout commit to both `origin/feature/ui-refactor-exploration` and `origin/main` so the golden branch and Pages source remain aligned.
- Report post-push deployment verification in the final Codex response without a second docs commit.

## Risks / Uncertainties

- GitHub Pages may take a short time to create and complete the new deployment after the push.
- Public Pages API endpoints returned 404 without authentication, so public deployment records, user-provided build-log details, and live-domain checks were used instead.
- A cache-bypassed `https://voxmana.io/` request returned GitHub Pages 404 during diagnosis; the domain may briefly remain stale or 404 until the new deployment completes.

## Tests Run

- `git fetch origin` - passed.
- `git rev-parse HEAD origin/feature/ui-refactor-exploration origin/main` - all matched `0373d9c3b394fbcc3c99d446061d5ae9b9299ce0`.
- `git log --oneline --decorate -5 --all` - confirmed `origin/main`, `origin/feature/ui-refactor-exploration`, and `origin/HEAD` at `0373d9c`.
- `git diff --name-status origin/main..HEAD` - no differences before VM-403 docs.
- `git show origin/main:CNAME` - `voxmana.io`.
- `Test-Path .nojekyll` before repair - `False`.
- `New-Item -ItemType File -Path .nojekyll -Force` - created an empty root marker file; length `0`.
- `Get-Item .nojekyll,CNAME` - `.nojekyll` length `0`; `CNAME` length `10`.
- `git diff --cached --name-status` - staged only `.nojekyll` and VM-403 coordination docs.
- `git diff --cached --check` - passed with the recurring inaccessible global git ignore warning only.
- `npm.cmd run lint:html` - passed.
- Public raw `main` `index.html` fetch - showed the new Home build (`Your colors have a shape`, `Vox Mana is a living index`).
- Public repository API - confirmed `has_pages: true`, default branch `main`, and current pushed timestamp.
- Public deployments API - latest `github-pages` deployment was still May 20 at old commit `efb44c4`.
- Public deployment status API for `4749682489` - latest status was `success`, environment URL `https://voxmana.io/`, old target `efb44c4`.
- DNS checks - `voxmana.io` resolved to GitHub Pages apex A records; `www.voxmana.io` CNAMEd to `rboles84.github.io`.

## Not Touched

- Local `main`, tags, runtime route code, source lore/data, Commander facts, generated faction/precon artifacts, visual baselines, internal Markdown syntax, `.github` templates, DNS provider settings, and GitHub Pages settings.

## Follow-Up Recommendations

- After push, poll public deployments until a new `github-pages` deployment appears for the VM-403 commit.
- Recheck `https://voxmana.io/` with a cache-busting query and confirm the live page contains `Your colors have a shape`.
- If Pages still attempts Jekyll after `.nojekyll`, toggle the Pages source in GitHub Settings or use an authenticated Pages build/retry path.

## Next Suggested Agent

Codex

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-403-github-pages-domain-deploy-repair.md`
- `docs/kanban/done/VM-402-golden-branch-promotion-to-main.md`
- `docs/handoffs/2026-06-15-1334-codex-vm402-golden-branch-promotion.md`
