# 2026-06-05 09:29 - Codex - VM-298 Witch Public-Copy And Source-Durability Repair

## Agent name

Codex

## Task requested

Implement VM-298 only: repair Witch public-copy and source-durability contamination found by VM-297, preserve live `WITCH`, restore the five-claim VM-264 through VM-268 evidence boundary, and avoid Jeskai/Mardu/VM-300 scope.

## Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/audits/2026-06-05-vm297-placement-source-of-truth-contamination-audit.md`
- `docs/handoffs/2026-06-05-0843-codex-vm297-placement-source-of-truth-audit.md`
- `docs/handoffs/2026-06-05-1130-codex-vm295-witch-placement-data-quality-authoring-pass.md`
- `docs/handoffs/2026-06-04-2354-codex-vm269-witch-controlled-runtime-promotion.md`
- `docs/handoffs/2026-06-05-0736-codex-vm293-witch-identity-hero-background.md`
- `docs/kanban/done/VM-295-witch-placement-data-quality-authoring-pass.md`
- `data/raw-factions/witch/witch.profile.json`
- `data/raw-factions/witch/witch.placement.json`
- `data/raw-factions/witch/witch.claims.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/archscry-flavor-snippets.json`
- `research/build-faction-artifacts.mjs`
- `research/build-archscry-flavor-snippets.mjs`
- `assets/js/quick-reading-tests.js`

## Files changed

- `data/raw-factions/witch/witch.profile.json`
- `data/raw-factions/witch/witch.placement.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/archscry-flavor-snippets.json`
- `research/build-faction-artifacts.mjs`
- `research/build-archscry-flavor-snippets.mjs`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-298-witch-public-copy-source-durability-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-05-0929-codex-vm298-witch-source-durability-repair.md`

## What changed

- Added builder-readable Witch `profile.claim_ids` with exactly `witch_claim_0001` through `witch_claim_0005`.
- Updated Witch raw profile/placement metadata to `0.1.1` live-after-VM-269 repair state without adding claims or evidence.
- Added conservative Witch placement calibration, mechanics summary, and discriminator question detail using raw claim IDs only.
- Cleaned WITCH public display data: removed Atraxa Grand Unifier, public `GWUB` overreach, definitive-anchor wording, and naming-authority phrasing.
- Tightened WITCH placement builder override copy so it avoids public `GWUB` / generic-Atraxa overreach.
- Added WITCH flavor-snippet preferences and exclusions so public snippets avoid Witch-Maw, Atraxa, `Breed Lethality`, `GWUB`, and `WUBG`.
- Rebuilt generated placement and flavor outputs through approved scripts, but accepted only the WITCH generated objects after restoring non-Witch fallout.

## Why it changed

VM-297 found that VM-295 edited generated artifacts directly and violated Witch's evidence/public-copy boundaries. VM-298 repairs Witch first because WITCH had a confirmed public flavor contract failure and strict VM-264 through VM-268 guardrails.

## Decisions made

- Kept `WITCH` live from VM-269.
- Kept `Growth` as support/display framing only.
- Kept `GWUB` and `WUBG` out of public copy except technical routing/query contexts.
- Removed Atraxa Grand Unifier until `WITCH-MF-005` is resolved.
- Kept Atraxa, Praetors' Voice and `Breed Lethality` only as cautious Commander support texture.
- Excluded Witch-Maw from public snippets even though it remains valid internal/source evidence.
- Did not accept global builder fallout for Jeskai or Mardu into VM-298.

## Risks / uncertainties

- The worktree remains broadly dirty with many unrelated modified and untracked files.
- `npm.cmd run build:factions` still rewrites Jeskai and Mardu generated objects because VM-299 has not repaired their source durability.
- VM-298 accepted WITCH-only generated object replacement after using the approved builders and restoring non-Witch generated fallout.
- Jeskai snippet provenance and Temur wording failures remain unrelated.

## Tests run

- Pass: `node -e "require('./data/raw-factions/witch/witch.profile.json'); require('./data/raw-factions/witch/witch.placement.json'); require('./data/factions.json'); require('./data/placement-model.json'); require('./data/archscry-flavor-snippets.json'); console.log('json parse OK')"`
- Pass: `node --check research\build-faction-artifacts.mjs`
- Pass: `node --check research\build-archscry-flavor-snippets.mjs`
- Pass: focused VM-298 Witch source/generated validator
- Pass: object-hash validator confirming final generated changes were WITCH-only in faction display, placement, and snippets relative to the VM-298 snapshot
- Pass: `node research\maze-search-tests.js`
- Fail, unrelated residual: `npm.cmd run test:placement` still fails Temur wording, expected `blue-red-green`, actual `green-blue-red`
- Fail, unrelated residual: `node research\archscry-dossier-followup-tests.js` still fails the Jeskai snippet provenance assertion
- Pass: scoped trailing-whitespace check
- Pass with line-ending warnings only: scoped `git diff --check`

## Not touched

- No Jeskai or Mardu repair.
- No Yore, Dune, Glint, Ink, five-color, colorless, or additional faction placement pass.
- No new Witch raw claim.
- No Home preview membership.
- No routes, aliases, Maze redesign, hero asset work, schema design, Supabase logic, or VM-300 guardrails.

## Follow-up recommendations

- VM-299: repair Jeskai and Mardu source durability, including generated placement and flavor provenance.
- VM-300: add generated-file authoring warnings, raw/generated drift checks, evidence-role validation, public leakage tests, and builder reproducibility checks.
- Keep the current stop rule in force until VM-299 and VM-300 are created or explicitly scoped.

## Next suggested agent

JSON Cartographer for VM-299 Jeskai/Mardu source-durability repair, then Test Strategist for VM-300 guardrails.

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-298-witch-public-copy-source-durability-repair.md`
- `docs/audits/2026-06-05-vm297-placement-source-of-truth-contamination-audit.md`
- `docs/kanban/done/VM-297-placement-data-source-of-truth-contamination-audit.md`
- `docs/kanban/done/VM-295-witch-placement-data-quality-authoring-pass.md`
- `docs/kanban/done/VM-269-witch-controlled-runtime-promotion.md`
