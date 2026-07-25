# Apocrypha Gate 2 Source Registry Report

Date: 2026-07-25

Branch: `codex/apocrypha-gate01-source-inventory`

Worktree: `C:\dev\voxmana.io-apocrypha-gate01`

Gate 0/1 baseline commit: `4ef43d17f817a1a633d897f06dfa603256c8e2c4`

Gate 0/1 parent / original main at branch creation: `606ef686e2d18dd98c60407e15ba91ef3639e1a6`

## Scope

Gate 2 creates a data registry and validation foundation only. It does not wire the registry into Apocrypha rendering, rewrite visible copy, remove rendered links, change UI behavior, or change source cards in `apocrypha/index.html`.

The registry intentionally preserves every source currently rendered in the Gate 1 inventory. Supplemental and non-official records remain present but are marked as non-official supplemental move candidates and explicitly barred from carrying official claims.

## Exact Input Sources Used

- `AGENTS.md`
- `CLAUDE.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-25-1320-codex-apocrypha-gate01-source-inventory.md`
- `docs/kanban/board.md`
- `docs/research/apocrypha-gate01-baseline-inventory.md`
- `docs/research/canon/misc/color_pie_articles_for_apocrypha.md`
- `apocrypha/index.html`
- `assets/css/apocrypha.css`
- `assets/js/apocrypha.js`
- `package.json`

Related workflow note: `CLAUDE.md` and `AGENTS.md` require Kanban maintenance for significant changes, but the Gate 2 prompt allowed only registry/report/validator/handoff/index/package files. No Kanban files were edited in this pass.

## Registry

Registry path:

`data/apocrypha-source-registry.json`

Validation script path:

`scripts/validate-apocrypha-sources.mjs`

Package script:

None added. The direct validation command is documented and keeps `package.json` untouched.

Run:

```bash
node scripts/validate-apocrypha-sources.mjs
```

## Registry Counts

| Measure | Count |
|---|---:|
| Registry records | 49 |
| Official records | 40 |
| Supplemental records | 9 |
| Not-checked links | 49 |
| Move/remove candidates | 9 |
| Duplicate canonical URLs | 0 |

All 49 records are current rendered Gate 1 sources. The 40 official records are `magic.wizards.com` records. The 9 supplemental records are GitHub, Reddit, MTGLore, Fandom, Draftsim, and YouTube records from the rendered page.

## Verification Limitations

No online GET verification was performed in Gate 2 because this environment has restricted network access and the Gate 2 prompt permitted recording network-unavailable status rather than guessing. No source is marked verified.

Every record has:

- `linkStatus: "not-checked"`
- `lastVerified: null`
- A note containing: `Network unavailable during Gate 2; link requires later verification.`

No HEAD-only link check was used. No tracking parameters were added. Canonical URLs strip trailing-only navigation noise where applicable and do not include tracking parameters.

## Validation Rules Implemented

The validator fails on:

- Missing or duplicate `id`.
- Missing `title`, `url`, `canonicalUrl`, `sourceType`, `group`, `status`, or `usedFor`.
- Unknown `sourceType`, `group`, or `status`.
- Tracking parameters in `url` or `canonicalUrl`.
- Duplicate `canonicalUrl`.
- `official: true` on non-approved official domains.
- `official: false` inside official groups.
- Supplemental records inside official groups.
- Social URLs for Twitter/X, Facebook, Tumblr, Discord, Instagram, and TikTok.
- Reddit URLs outside supplemental records.
- YouTube URLs outside supplemental records.
- Vague `usedFor` phrases listed in the Gate 2 prompt.
- Missing `lastVerified` unless `linkStatus` is `not-checked`.
- Invalid `publishedDate` or `lastVerified` format when present.
- `current-official` records that are not verified.
- Manual count fields stored in the registry.

## Minimum Official Set Gaps

The Gate 2 registry preserves the currently rendered source set only. Non-rendered minimum official candidates were not added without online verification or a dedicated source-reconciliation decision. The retained preimplementation audit is useful for Gate 3 reconciliation but was not treated as a live rendering source.

| Minimum official category | Gate 2 status | Gap / reason |
|---|---|---|
| Official color-pie index | Gap | Not currently rendered. The retained audit includes `The Color Pie Philosophy`, but it was not link-verified in Gate 2. |
| Original and revisited color essays | Partial | Current rendered records are preserved. Gate 1 found URL/title disagreement with the retained audit for several original/revisited rows; exact canonical set still needs reconciliation. |
| My Words series | Accounted | Five current rendered `My Words` records are in the registry. |
| Mechanical Color Pie 2021 | Accounted | Current rendered record is in the registry. |
| Mechanical Color Pie 2021 Changes | Accounted | Current rendered record is in the registry. |
| Council of Colors, Revisited | Accounted | Current rendered record is in the registry. |
| Ten two-color essays | Partial | Ten current rendered Ravnica guild design records are in the registry. The retained audit lists a different ten-essay set that needs canonical reconciliation. |
| Five shard essays | Partial | Five current rendered shard records are in the registry. The retained audit lists a different five-essay set that needs canonical reconciliation. |
| Five wedge essays | Gap | Current rendered set has two Tarkir/Khan records, not five wedge records. No complete five-source wedge set was confirmed in Gate 2. |
| Ravnica Design Handoff Document | Gap | Not currently rendered and no confirmed URL was verified in Gate 2. |
| Ravnica plane page | Gap | Not currently rendered and no confirmed URL was verified in Gate 2. |
| Alara plane page | Gap | Not currently rendered and no confirmed URL was verified in Gate 2. |
| Two Ravnica flavor guides | Partial | One current rendered Ravnica flavor guide is in the registry; the second guide remains unidentified/unverified. |
| Magic Story archive | Gap | Current rendered story/archive support is supplemental only; no official Magic Story archive URL was verified in Gate 2. |
| Rules page | Gap | Not currently rendered and no confirmed URL was verified in Gate 2. |
| Gatherer | Gap | Not currently rendered and no confirmed URL was verified in Gate 2. |

## Supplemental Boundary

The 9 non-official records are retained and marked:

- `official: false`
- `sourceType: "supplemental-reference"`
- `group: "supplemental"`
- `status: "supplemental"`
- `auditDisposition: "move"`

Their `usedFor` values describe navigation, comparison, or gap-finding only. Their `notFor` values explicitly bar official claims, canon proof, rules authority, card-record truth, and standalone source support.

Supplemental records:

- `apoc-supplemental-polarkac-mtg-stories-github`
- `apoc-supplemental-mtgvorthos-pdf-archive`
- `apoc-supplemental-mtglore-chronological-story-index`
- `apoc-supplemental-fandom-ravnican-guilds`
- `apoc-supplemental-reddit-guild-identities-lore-wise`
- `apoc-supplemental-draftsim-mtg-guilds`
- `apoc-supplemental-youtube-guilds-ravnica-lore-overview`
- `apoc-supplemental-youtube-ravnica-guild-deep-dive-1`
- `apoc-supplemental-youtube-ravnica-guild-deep-dive-2`

## Known Risks

- All links remain not checked online; no source should be treated as verified yet.
- Current rendered Wizards URLs disagree with the retained source audit in multiple places, so Gate 3 must reconcile canonical official URLs before UI migration.
- Required official categories are still incomplete, especially rules/card-record sources, official archives, plane pages, Magic Story archive, full wedge coverage, and the second Ravnica flavor guide.
- Current Apocrypha visible counts remain hardcoded in HTML and are not registry-driven.
- The validator is focused on source-authority integrity, not schema exhaustiveness or live UI behavior.

## Confirmations

- No Apocrypha HTML, CSS, or JavaScript files were edited.
- No rendered source links were removed, rewritten, or replaced.
- No Apocrypha UI rendering was changed.
- No visible copy was changed.
- No source registry was wired into the page.
- No Strategium files were touched.
- No Archscry placement logic was touched.
- No CRIT-001 or CRIT semantic data files were touched.
- No generated files were touched.
- No package files were touched.
- The original main worktree at `C:\dev\voxmana.io` was not edited.

## Validation Result

Command:

```bash
node scripts/validate-apocrypha-sources.mjs
```

Result:

```text
Apocrypha source registry validation PASS: 49 records, 40 official, 9 supplemental, 49 not checked, 9 move/remove candidates.
```

## Next Recommended Gate 3 Task

Gate 3 should design the Apocrypha information architecture around the new registry without rewriting visible voice yet: reconcile canonical official minimum-source gaps, define registry-driven groups/counts, map current hardcoded shelves to the plan groups, decide how supplemental/move candidates are displayed or de-emphasized, and specify the no-JavaScript fallback before any UI rendering changes are implemented.
