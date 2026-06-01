# VM-215 - Abzan Dossier Manual QA Repair

ID: VM-215
Title: Abzan Dossier Manual QA Repair
Status: done
Type: Frontend Repair / QA Regression
Area: Archscry dossier, Maze handoff, Abzan live-pilot presentation
Priority: high
Created: 2026-05-31
Updated: 2026-05-31

## Summary

Fix Abzan manual QA issues after live promotion:

- Abzan dossier card examples should prefer curated Abzan-native snippets when present.
- Abzan answer signals should use house, family, ancestor, stewardship, and endurance language rather than generic fallback pressure copy.
- Maze "From Your Dossier" should resolve active Abzan handoffs to `ABZAN`/`wbg`, not stale stored `UR`, adjacent pair labels, or outside-color stretch paths.

## Scope

- Repair frontend/runtime presentation code only.
- Add focused regression coverage for Abzan dossier examples, Abzan signal copy, and Naya/Abzan/Temur Maze sidebar handoff identity.
- Preserve raw-faction data, research packets, architecture docs, generated data, routes, Home preview membership, schemas, Supabase config, fixtures, and builders.

## Acceptance Criteria

- [x] Abzan "What This Looks Like In Cards" prefers curated snippets such as Abzan Banner, Abzan Devotee, and Abzan Guide when those snippets exist in `data/archscry-flavor-snippets.json`.
- [x] Curated snippet titles/excerpts remain authoritative display copy; flavor-index data is used only for metadata enrichment.
- [x] Abzan answer signals mention family/house/ancestor/stewardship language and avoid generic "table reveal itself" / "making the table answer you" copy.
- [x] Abzan omens do not relabel the result as Orzhov, Golgari, Selesnya, generic WBG, or Dromoka.
- [x] Maze sidebar handoff resolves URL `fit` / resolved active key as source of truth over stale stored placement mana scores.
- [x] Naya, Abzan, and Temur Maze sidebar entries use query-only `rgw`, `wbg`, and `gur` identities and suppress outside-color stretch.
- [x] No generated data, raw packet, route, Home preview, schema, Supabase, fixture, builder, or unrelated baseline files were intentionally changed.

## Tests

- `node --check assets/js/index.js`
- `node --check assets/js/commander-dossier.js`
- `node --check research/research-init.js`
- `node --check research/archscry-dossier-followup-tests.js`
- `node --check research/maze-search-tests.js`
- `node --check assets/js/quick-reading-tests.js`
- `node research/maze-search-tests.js`
- `node research/archscry-dossier-followup-tests.js`
- `node assets/js/quick-reading-tests.js`
- Scoped `git diff --check`

## Notes

- The worktree was already broadly dirty before VM-215, including Abzan/Temur promotion files and modified board/handoff index files.
- A Jeskai Way VM-215 backlog reservation appeared during closeout; this Abzan repair is a duplicate VM-215, and the active Jeskai lane was later repaired to VM-229 through VM-234.
- VM-215 did not stage or commit files.
