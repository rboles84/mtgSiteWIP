# Kanban and PR Review Workflow

## Kanban

Use GitHub Projects as the visual board and GitHub Issues as the source of truth for tasks.

Recommended board statuses:

- Backlog
- Ready
- In Progress
- Review
- Done

Recommended issue labels:

- bug
- feature
- content
- design
- cleanup
- priority: high
- priority: normal
- priority: low

Each task should start as a GitHub Issue with a clear summary, acceptance criteria, type, and priority. Add the issue to the GitHub Project board and move it through the board as work progresses.

## Branches

Use one branch per task when practical.

```bash
git checkout main
git pull
git checkout -b feature/short-task-name
```

Avoid direct commits to `main` except for tiny administrative changes.

## PR Review

Use two review checkpoints.

Before opening a PR, ask Codex:

```text
Review my current branch before I open a PR.
```

Codex should inspect:

- `git status`
- `git diff main...HEAD`
- changed files
- browser or manual behavior when relevant

After opening a PR, ask Codex:

```text
Review PR #123 in rboles84/mtgSiteWIP.
```

Codex should review bugs and regressions first, call out file and line-specific findings, note missing verification, and only approve when no blocking issues remain.

## Static Site Checks

For the current static site, each PR should verify:

- Pages still open locally.
- Shared JavaScript has no obvious console/runtime errors.
- Navigation and visible content still work.
- Git working tree is clean before final review.

If project tooling is added later, run the available checks before review, such as:

```bash
npm test
npm run lint
npm run build
```
