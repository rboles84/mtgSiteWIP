# VM-381 Publish And Clean Dirty Tree Handoff

## Agent Name

Codex

## Task Requested

Push everything, clean up the dirty tree, and make the repo clean.

## Files Reviewed

- `AGENTS.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-12-2316-codex-vm363-repo-cleanup-publish.md`
- `docs/handoffs/2026-06-12-2347-codex-vm365-full-test-html-report.md`
- `docs/handoffs/2026-06-13-0750-codex-vm367-wubrg-gold-layer1-layer2.md`
- `docs/handoffs/2026-06-13-0912-codex-wubrg-source-bound-deepening.md`
- `docs/handoffs/2026-06-13-1149-codex-vm372-colorless-support-richness.md`
- `docs/handoffs/2026-06-13-1234-codex-wubrg-dossier-copy-governance-polish.md`
- `docs/handoffs/2026-06-13-1653-codex-vm377-mono-gold-execution.md`
- `docs/handoffs/2026-06-13-1826-codex-vm378-379-380-source-bound-repair.md`

## Files Changed

Initial coordination:

- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-381-publish-and-clean-dirty-tree.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-13-1843-codex-vm381-publish-clean-dirty-tree.md`

Publish bundle changes pending classification.

Publish bundle staged summary before commit:

- 188 staged name-status entries.
- 101 additions.
- 86 modifications.
- 1 rename/card move: `docs/kanban/in-progress/VM-364-archscry-identity-matrix-data-map.md` to `docs/kanban/done/VM-364-archscry-identity-matrix-data-map.md`.
- No `_relic` scratch files staged.
- No visible untracked files remained after staging.

## What Changed

- Created VM-381 as an in-progress release-hygiene card.
- Began this handoff before staging.
- Started a classification-first cleanup/publish pass on `feature/ui-refactor-exploration`.
- Removed excluded scratch relic files from the working tree.
- Rebuilt generated faction outputs with `npm.cmd run build:factions`.
- Rebuilt Archscry flavor snippets with `node research/build-archscry-flavor-snippets.mjs`.
- Trimmed trailing whitespace mechanically from generated/report/research artifacts so `git diff --check` and `git diff --cached --check` pass.
- Staged only the classified publish bundle.

## Why It Changed

The user requested that the full dirty tree be pushed and the repo made clean. The repo requires preflight, Kanban tracking, testing, documentation, and handoff for non-trivial publish work.

## Preflight Summary

Recent related work:

- VM-363 previously established the verified cleanup/publish pattern for this branch.
- VM-365 produced a full-test HTML report; the only failing command was `npm.cmd run test:lighthouse:home` because Performance scored 86 against a required 90 threshold.
- VM-367 through VM-380 document WUBRG, Colorless, mono, Strixhaven, Grixis, and Tarkir source-bound data/runtime/docs work now present in the dirty tree.

Current known risks:

- The tree is a large mixed bundle spanning runtime JS, raw faction JSON, generated JSON, documentation, Kanban, handoffs, research, and Supabase generated context.
- Scratch files named `._relic_*` and `._relic_check.mjs` are present and should not be staged.
- Generated faction outputs must be rebuilt through the approved script before staging.
- Lighthouse report output is dirty and the current Lighthouse gate is known to fail the 90 performance threshold.
- Git reports CRLF conversion warnings on many touched files and cannot access `C:\Users\obake/.config/git/ignore`.

Relevant decisions already made:

- Do not hand-edit generated outputs.
- Do not invent MTG lore, card facts, commander facts, or project decisions.
- Preserve documented work from the relevant handoffs.
- Do not force-push.
- Do not stage unclassified scratch or unresolved files.

Files recently changed:

- WUBRG identity, support, copy, link, and hero-hookup files from VM-367 through VM-376.
- Mono raw/source/generated files from VM-377.
- Strixhaven, Grixis, and Tarkir raw/source/generated files from VM-378 through VM-380.
- VM-365 report artifacts and Lighthouse audit output.

What should not be touched:

- No feature redesign or broad product-surface expansion.
- No public API, route, schema, Home preview, alias, or hero expansion beyond the already documented VM work.
- No permanent doc deletion; documented card moves are allowed when source and destination are present.
- No scratch relic files in the publish bundle.

## Classification Inventory

Current dirty tree before build/test/stage:

- Tracked modifications: 86.
- Tracked deletions: 1.
- Untracked visible files: 106.
- New ignored canon docs under `docs/research/canon/**`: none found.

Allowed tracked groups:

- Runtime/test/generator changes documented by VM-367 through VM-380: `assets/js/**`, `research/**`, and `supabase/functions/guild-recruiter/faction-context.ts`.
- Source/raw/governance data documented by VM-367 through VM-380: target `data/raw-factions/**`, `data/identity-layers.json`, source/readiness matrices, research ledgers, and product-decision docs.
- Generated outputs to accept only after rebuild: `data/factions.json`, `data/placement-model.json`, `data/archscry-flavor-snippets.json`, and `supabase/functions/guild-recruiter/faction-context.ts`.
- VM-365 report outputs: `docs/audits/2026-06-12-vm365-full-test-sweep.html` and `docs/audits/lighthouse-home.html`.
- Kanban and handoff updates for VM-364 through VM-381.

Allowed untracked groups:

- Raw mono and WUBRG packets under `data/raw-factions/{white,blue,black,red,green,wubrg}/`.
- Completed Kanban cards for VM-364 through VM-380 and in-progress VM-381 card.
- Handoffs for VM-364 through VM-381.
- WUBRG hero asset `assets/img/identity-hero/wubrg.webp`.
- VM-365 HTML report under `docs/audits/`.
- Archscry data-map reference, WUBRG research packet, mono source-intake bundle and PDFs, Colorless support context file, and VM-378/379/380 source-intake note.

Excluded scratch:

- `._relic_GLINT.png`
- `._relic_R.png`
- `._relic_abzan.png`
- `._relic_check.mjs`

Tracked deletion disposition:

| Deleted path | Disposition |
|---|---|
| `docs/kanban/in-progress/VM-364-archscry-identity-matrix-data-map.md` | Superseded by `docs/kanban/done/VM-364-archscry-identity-matrix-data-map.md`; board and handoff index mark VM-364 complete. |

## Tests Run

- `npm.cmd run build:factions` - passed; built 37 faction placement records and wrote `data/placement-model.json`, `data/placement-model.schema.json`, and `supabase/functions/guild-recruiter/faction-context.ts`.
- `node research/build-archscry-flavor-snippets.mjs` - passed; wrote snippets for 37 factions.
- `npm.cmd test` - passed.
- `npm.cmd run test:placement` - passed; 37 factions and 37 golden paths.
- `npm.cmd run test:parser` - passed; 115 parser cases.
- `npm.cmd run validate:source-generated` - passed with the known two model-owned `inhibitor_traps` warnings for JESKAI and MARDU.
- `npm.cmd run dossier:audit` - passed with 0 failures and 113 warnings; wrote `artifacts/dossier-snapshots/dossier-audit-report.md`.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run lint:html` - passed.
- `npm.cmd run test:frontend-smoke` - passed.
- `npm.cmd run test:builder` - passed; 6 builder cases.
- `npm.cmd run test:source-generated` - passed with the same known two JESKAI/MARDU model-owned warnings.
- `git diff --check` - initially failed on trailing whitespace in `docs/audits/lighthouse-home.html`, then passed after mechanical trimming.
- `git diff --cached --check` - initially failed on trailing whitespace in newly added report/research artifacts, then passed after mechanical trimming and restaging.
- `git fetch origin` - passed after unsandboxed Git access; `git rev-list --left-right --count HEAD...origin/feature/ui-refactor-exploration` returned `0 0`.

## Results

- Branch is confirmed current with `origin/feature/ui-refactor-exploration` before commit.
- Staged bundle matches the documented VM-364 through VM-381 work and contains no scratch relic files.
- `npm.cmd run test:lighthouse:home` was not rerun during VM-381 because VM-365 already captured the full finite sweep and documented the current Lighthouse failure: Performance 86 below the required 90 threshold, Accessibility 96.
- Commit and push pending.

## Risks / Uncertainties

- Lighthouse remains a known non-green gate from VM-365 until the home performance score is repaired or the threshold/policy changes.
- Git continues to warn that it cannot access `C:\Users\obake/.config/git/ignore`; repo-local staging still succeeded.
- Git continues to warn that many touched files will be converted from LF to CRLF when Git touches them; `git diff --check` and `git diff --cached --check` pass.
- `dossier:audit` has 113 warnings and 0 failures, matching the current post-VM-378/379/380 baseline.

## Not Touched

- No force-push.
- No hand edits to generated outputs.
- No public API, route, schema, Home preview, alias, or unrelated hero expansion beyond already documented VM work.
- No ignored canon docs were force-added; no new ignored canon docs were present.
- No `_relic` scratch files were staged.

## Follow-Up Recommendations

- Repair or intentionally rebaseline the home Lighthouse performance gate in a future task.
- Consider addressing the user/global Git ignore permission warning outside the repo; it does not block this publish bundle.

## Next Suggested Agent

Codex

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/in-progress/VM-381-publish-and-clean-dirty-tree.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-12-2316-codex-vm363-repo-cleanup-publish.md`
