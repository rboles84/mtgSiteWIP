# 2026-06-25 19:34 - Codex - VM-421 Vault Refresh And Learnings

## Agent Name

Codex

## Task Requested

Refresh `C:\WIP\obsidianVault\vox-mana-vault\vox-mana-vault-fresh` as curated Vox Mana v1.0 project memory, with a robust release record, high-quality learnings section, source hierarchy, stale-term audit, status convention, and repo tracking/handoff closeout.

## Files Reviewed

- `AGENTS.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- Recent relevant handoffs for VM-418, VM-419, VM-420, VM-416, VM-415, VM-414, VM-413, VM-407, VM-390, VM-391, VM-392, WUBRG, Colorless, Strategium, Apocrypha, typography/readability, and Home readiness work
- Existing vault files under `C:\WIP\obsidianVault\vox-mana-vault\vox-mana-vault-fresh`

## Files Changed

Repo:

- `docs/kanban/board.md`
- `docs/kanban/done/VM-421-vox-mana-vault-refresh-learnings.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-25-1934-codex-vm421-vault-refresh-learnings.md`

External vault:

- `README.md`
- `00-index.md`
- Top-level `_index.md` files in `01-project-and-strategy/` through `08-technical-atlas/`
- New `09-v1-release-record/` section
- New `10-learnings/` section
- New `_meta/` section
- Old retained Markdown notes whose frontmatter was marked `status: superseded` or `status: archive`

## What Changed

- Selected VM-421 after collision scanning showed VM-417 reserved and VM-418 through VM-420 already used.
- Created and closed the VM-421 tracking card.
- Added a v1 release-record section to the vault.
- Added a case-study-style learnings section with required `Grounded In` sections.
- Added a follow-up middle-build learning layer after review so VM-100 through VM-300+ work is represented through route shell/CSS architecture, identity registry/expansion, and contract/source-guardrail repair notes.
- Added a first-hundred learning layer after review so VM-001 through VM-100 work is represented through early workflow, Scryfall/Archscry/Maze continuity, mono identity authoring, and prototype-to-product surface lessons.
- Added `_meta` notes for upgrade report, source map, stale-term audit, and note status map.
- Updated current vault indexes to reflect v1 route/product state, source-first governance, Apocrypha as primary route with `/library/` as alias, Home Identity Signal state, and post-v1 backlog boundaries.
- Preserved old unique planning material while marking stale retained notes as superseded or archive.
- Replaced old absolute Windows paths outside `_meta/upgrade-report.md` with portable repo-relative or external-workspace labels.

## Why It Changed

The vault was old and no longer reflected the project as it reached v1.0. The refresh turns it into durable personal/project memory without letting it become a competing source of truth.

## Decisions Made

- Repo authority remains above vault synthesis.
- Absolute Windows paths are allowed only in `_meta/upgrade-report.md`.
- Old retained notes are not deleted for staleness; they are status-marked.
- The lone current-facing `maze.html` stale-term hit is acceptable because it explicitly labels older references as historical.

## Risks / Uncertainties

- The vault is outside the repo, so repo diffs do not show the external vault changes.
- Old vault notes still contain historical route and identity terminology by design.
- VM-420 dirty work remains present in the repo and was intentionally left untouched.

## Tests Run

- `git status --short --branch`
- VM number collision scan across board cards, handoffs, and repo text.
- Vault file inventory with `rg --files`.
- Learnings frontmatter validation for `title`, `status`, `type`, `updated`, and `grounded_in`.
- Current-note Obsidian wikilink resolution check.
- Stale-status typo/old-status check for `tatus:` and old active status values.
- Current-facing stale-term scan for `15 factions`, `30 identities`, `30 live`, `maze.html`, `archscry-result.js`, `TBD Loom`, `current as of 2026-05`, Home preview exclusion claims, and mojibake sequences.
- Portability scan for true Windows absolute paths; only `_meta/upgrade-report.md` retains the allowed vault-root environment note.
- Re-ran scoped vault checks after adding the VM-100 through VM-300+ middle-build notes.
- Re-ran scoped vault checks after adding the VM-001 through VM-100 first-hundred notes.
- Scoped `git diff --check` for VM-421 repo tracking docs.

## Not Touched

- Runtime app code
- Generated data
- Raw source packets
- Placement model
- Lore claims
- Commander facts
- Route behavior
- Visual baselines
- VM-420 dirty-tree files and deletions

## Follow-Up Recommendations

- Maintain the vault after major release trains and source-governance decisions.
- Re-run `_meta/stale-term-audit.md` after future route, identity-surface, Home preview, Apocrypha/library, or Loom scope changes.
- If a superseded vault note becomes actionable, start with a repo Kanban card and only then update the vault status.

## Next Suggested Agent

Documentation Steward for future vault-memory refreshes; Kanban Steward if old vault material is revived into implementation work.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-421-vox-mana-vault-refresh-learnings.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- External vault `_meta/upgrade-report.md`
- External vault `10-learnings/`
