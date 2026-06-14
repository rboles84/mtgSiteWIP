# 2026-06-13 13:35 - Codex - WUBRG EDHREC Precon Link Repair

## Agent Name

Codex

## Task Requested

Execute VM-375 to repair the WUBRG `Commander Deck Starts` EDHREC starting-point URLs for `Eldrazi Incursion (Precon)` and `Draconic Domination (Precon)`, preserving support-navigation governance and avoiding Home, Maze, route, schema/API, Colorless, Commander fact, precon ordering, UI label, and hero asset changes.

## Files Reviewed

- `AGENTS.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-13-1234-codex-wubrg-dossier-copy-governance-polish.md`
- `docs/handoffs/2026-06-13-0912-codex-wubrg-source-bound-deepening.md`
- `docs/handoffs/2026-06-13-0750-codex-vm367-wubrg-gold-layer1-layer2.md`
- `docs/kanban/done/VM-374-wubrg-dossier-copy-governance-polish.md`
- `docs/kanban/done/VM-368-wubrg-commander-support-verification.md`
- WUBRG raw profile, generated faction data, Commander dossier helpers, and Archscry dossier follow-up tests.

## Files Changed

- `data/raw-factions/wubrg/wubrg.profile.json`
- `data/factions.json`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-375-wubrg-edhrec-precon-link-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-13-1335-codex-wubrg-edhrec-precon-link-repair.md`

## What Changed

- Set `Eldrazi Incursion (Precon)` `deck_links[].edhrec` to `https://edhrec.com/precon/eldrazi-incursion`.
- Set `Draconic Domination (Precon)` `deck_links[].edhrec` to `https://edhrec.com/precon/draconic-domination`.
- Rebuilt generated faction output through `npm.cmd run build:factions`.
- Added regression assertions that generated WUBRG deck-link rows carry the supplied URLs, remain support-only, and no longer rely on broken precon-as-commander EDHREC fallback URLs.
- Created and closed VM-375 in Kanban.

## Why It Changed

The WUBRG Commander Deck Starts EDHREC links for those precon rows were falling back to generated `/commanders/*-precon` URLs. The authored source rows now carry the correct EDHREC precon URLs so the existing renderer can use them without changing routing or UI copy.

## Decisions Made

- The repair stays in `data/raw-factions/wubrg/wubrg.profile.json` because the renderer already honors authored `deck_links[].edhrec` values.
- No precon catalog schema or runtime routing change was needed.
- The supplied EDHREC URLs are treated as support-navigation targets only.

## Risks / Uncertainties

- The worktree was broadly dirty before VM-375, including generated WUBRG/Colorless/runtime/docs work from prior cards. VM-375 preserved unrelated dirty work.
- Broad generated diffs against `HEAD` still include prior uncommitted WUBRG/Colorless changes, so VM-375 validation used exact row checks and targeted URL/fallback assertions.
- Git reported existing CRLF normalization warnings when inspecting generated diffs.

## Tests Run

- `npm.cmd run build:factions` - passed; built 37 faction placement records.
- `node --check research/archscry-dossier-followup-tests.js` - passed.
- JSON parse guard for `data/raw-factions/wubrg/wubrg.profile.json` and `data/factions.json` - passed.
- Direct WUBRG Commander Deck Starts EDHREC URL guard - passed.
- `node research/archscry-dossier-followup-tests.js` - passed.
- `node research/validate-source-generated-guardrails.mjs WUBRG` - passed with 0 warnings.
- `npm.cmd test` - passed.

## Not Touched

- No Home preview changes.
- No Maze behavior changes.
- No public route changes.
- No schema/API changes.
- No Colorless boundary changes.
- No Commander fact, legality, popularity, ranking, metagame, price, or recommendation-quality claims.
- No precon ordering, support-pool, or UI label changes.
- No `assets/img/identity-hero/wubrg.webp` changes.
- No staging or commits.

## Follow-Up Recommendations

- If more EDHREC precon URLs are desired, handle them in a separate support-navigation card with the same exact-label and generated-diff guards.

## Next Suggested Agent

Frontend QA agent only if a browser check of the WUBRG rendered dossier is desired before publish.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-375-wubrg-edhrec-precon-link-repair.md`
- `docs/kanban/done/VM-374-wubrg-dossier-copy-governance-polish.md`
- `docs/kanban/done/VM-368-wubrg-commander-support-verification.md`
