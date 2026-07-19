# CRIT-001 Certified Preview Consumer Audit

Date: 2026-07-19
Agent: Codex
Mission: Certified DRIFT-017 consumer recovery audit only
Worktree: `C:\dev\mtgSiteWIP-crit001-drift017-certified-audit`
Branch: `codex/crit001-drift017-certified-consumer-audit`
Starting program base: `9f0a076a369cba23dc9bc19231b0efcddd21afe5`

## Scope Lock

This was an audit-only, governance-only pass. It did not edit runtime consumers, identity packets, source JSON, generated JSON, workbook binaries, workbook inspect NDJSON, validator prototype files, fixtures, provenance, Green, VM-522, original main, external Excel, or any semantic candidate.

Protected worktrees verified before audit:

- `C:\dev\mtgSiteWIP-crit001` on `codex/vm-521-green-semantic-recovery` at `542015ab4dee8158002eb96dca65ef03fa81904d`, with only the expected Table Talk handoff dirt.
- `C:\dev\mtgSiteWIP-crit001-drift017` on `codex/crit001-drift017-consumed-preview-scope` at `4044d7e31a15acc630678967b6b6b2a5f8a29695`, with only the expected uncommitted validator prototype files.
- `C:\dev\mtgSiteWIP` was not modified.

## Pre-Flight Summary

Recent related work: Black and Red were certified after DRIFT-015/DRIFT-017 preview-source exceptions repaired `data/identity-layers.json` and embedded `data/factions.json`. A later validator prototype demonstrated that active preview consumers outside those two files could remain stale even after source/embedded preview repair. Green work is protected in a separate worktree and remains outside this audit.

Known risks: stale preview strings may exist outside the validator prototype's initial B/R discovery; tracked governance contains some `PENDING_*` placeholders although actual certification commits exist in git history; workbook inspect NDJSON files are generated inspection artifacts and must not be hand-edited; active JS preview islands are runtime consumers, not governance files.

Relevant decisions already made: CRIT-001 drift controls are mandatory; any `FAIL` or `UNKNOWN` blocks progression; exact candidate scope must include consumed preview surfaces; certification may approve only exact reviewed candidate SHAs; no next identity may receive semantic work before current governance clears.

Files recently changed elsewhere: the validator prototype stop-line commit is `4044d7e31a15acc630678967b6b6b2a5f8a29695`; the Green worktree has expected handoff-only dirt. This audit tree began clean at `9f0a076a369cba23dc9bc19231b0efcddd21afe5`.

Not touched: active preview JS, workbook binaries, inspect NDJSON, source data, generated data, identity recoveries, validator prototype, Green, VM-522, original main, and external Excel.

## Drift Checkpoint

Result: STOP.

Reason: certified active preview consumers contain stale preview text for six certified identities. Under the CRIT-001 drift-control template, a stale consumed preview cell is a candidate-scope/certification reconciliation blocker until recovered and independently reviewed.

## Certified Set Audited

| Identity | Key | Candidate SHA | Actual certification SHA |
| --- | --- | --- | --- |
| Prismari | PRISMARI | `19800da6322100b28fa6325fef91321e147b6f69` | `492598f13df24d0f74f5869e249d860ff661a3aa` |
| Quandrix | QUANDRIX | `af3c2439f9c96fb4b199b4c47eea1f7c735dfebe` | `cb495e11ba875f1801cbd8f8cb8e7204c27f5840` |
| Silverquill | SILVERQUILL | `b9cd9e914c280e9c40c7a977b8f7c07204614d3e` | `41d291072340f7ddfe4ffe90f2e57e4f4793142d` |
| Witherbloom | WITHERBLOOM | `48d240db3c7001a498a6e5a4602cc8cd54349776` | `5bc25af194d2c7e14c4350d58c9b791775253734` |
| Lorehold | LOREHOLD | `6d8d46d8df0429a105c08e656a8303474c435abd` | `fa435b17ab36633b200a8405065732568f0ef78c` |
| Izzet | UR | `d5bca29f3c55d0d69fe8567a69c8326dcc83d770` | `ad6322d4cb2120e83788a4af0dca7ef21cad4cc2` |
| Azorius | WU | `221a19b690cad02fb9aba2c91ae506b6d4fcc205` | `9243c5a32fbb222dac4c4fd7999126aa60e52619` |
| Boros | WR | `da2e9ef4036c427c17dca66c5a1a9d9a8fe03436` | `6627f8313a580815fc019fc46bfdc394e6c8836d` |
| Rakdos | BR | `c929a12a4f7be15cb563b2a6b050b33c32b39b7a` | `5c221f342ae4f95920ece35261dd7f34afeaa667` |
| Golgari | BG | `bb0105f3f2d91a7696aefc004254fc52dc37cd85` | `a7aabe30cb4e9fe65ab01d15fdd41ac4445b86f8` |
| Gruul | RG | `16b58c3f32d92e6406d368169d91b0b6a86f948d` | `31f46b8c429ee403797dda1d75db70e4b471b97b` |
| Dimir | UB | `6e6c079d19ee152016212f01f8c2ffd81f0ca0ee` | `0a7f52d2469ad4c050570f3b2bbe32dc0d4fea14` |
| Orzhov | WB | `8aea3e359c16687948178ad55a927cf758fd9206` | `556affb937be0f459de8919061a069cc2f901693` |
| Selesnya | WG | `02252cbb24ec4ce615c85e8ad07d62d3be7db7e5` | `fbb81530b5932fd7913ba5f9e9d35d4f8e9ad6e3` |
| Simic | UG | `bcc12c170e3d09fecd5b15c6ade07cef94ce7e1e` | `272337004aa63cfd33da5f1a859c33d211c8ca74` |
| White | W | `89535e5f73598a5b518e31e11598b05087274a95` | `9d250a7a76d219fdb961915cbf989a10a575c757` |
| Blue | U | `ac774e2eac207cc7fe2d744beac1f11788908159` | `04547ecfc52d1c96537b6375e9d5c4b8f3690a32` |
| Black | B | `0bfe8b3d46d163de6e20064f5de9717075ca02c8` | `1116786785dc4c5c8c1447dcad79c89e527657eb` |
| Red | R | `6aefb2090ff20a361f7f3cd80515445036323158` | `9f0a076a369cba23dc9bc19231b0efcddd21afe5` |

## Active Consumers Audited

| Consumer | Role | Ownership / generation path |
| --- | --- | --- |
| `data/identity-layers.json` | Canonical source preview registry | Curated source; workbook builder consumes it; no audit defect found. |
| `data/factions.json` | Embedded generated identity-layer consumer | Generated/embedded identity layer; no audit defect found. |
| `assets/js/newindex-color-matrix.js` | Active JS preview island | Preview-only adapter from VM-064/VM-065 lineage; keeps local `colorProfiles` and `identities` text. |
| `assets/js/color-matrix-radar.js` | Active JS radar preview island | Shared/page-agnostic radar helper from VM-063 lineage; keeps local `colorProfiles` and `identities` text. |
| `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced_identity_fix.xlsx.inspect.ndjson` | Text inspection export for corrected workbook | Inspect artifact for `MTGDataV3_Enhanced_identity_fix.xlsx`; do not hand-edit; rebuild workbook then regenerate inspect output. |
| `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced.xlsx.inspect.ndjson` | Text inspection export for preserved workbook | Inspect artifact for `MTGDataV3_Enhanced.xlsx`; do not hand-edit; rebuild workbook then regenerate inspect output if the preserved workbook remains active. |

Additional active same-path surfaces: the binary workbook files `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced_identity_fix.xlsx` and `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced.xlsx` are upstream of the inspected NDJSON rows and must be included in recovery validation. The builder `outputs/mtgdata-v3-enhanced/.work/build-v3-enhanced.mjs` reads `data/identity-layers.json` and writes `Identity_Layers_37` rows including `Preview Text`.

## Exact Defects

Every audited consumer had exactly one record for each certified identity. There were no missing, duplicate, or malformed preview-text cells. The only failures were stale exact values in the four active downstream consumers below.

| Identity | Consumers | Observed stale value | Certified source value |
| --- | --- | --- | --- |
| Silverquill | both JS files, both NDJSON inspect files | `Silverquill overlays White structure and Black ambition through rhetoric, charisma, status, moral pressure, sharp critique, and words as weapons.` | `Silverquill overlays White leadership and Black pressure through eloquence, rhetoric, word magic, and visible social influence.` |
| Azorius | both JS files, both NDJSON inspect files | `Azorius blends White order with Blue planning. It seeks peace through systems, procedure, control, and carefully managed improvement.` | `Azorius blends White order with Blue planning. It seeks peace through systems, procedure, documentation, and accountable civic structure.` |
| Gruul | both JS files, both NDJSON inspect files | `Gruul blends Red freedom with Green instinct. It values impulse, survival, body-truth, terrain, revolt, and the wild beyond civilization.` | `Gruul blends Red directness with Green memory of place. It belongs where anger is tied to lost wilds, clan territory, Rubblebelt life, and resistance to imposed civilization.` |
| Simic | both JS files, both NDJSON inspect files | `Simic blends Green growth with Blue knowledge. It values mutation, research, guided evolution, optimization, and becoming.` | `Simic studies life as living systems to heal, adapt, and improve through biology, clades, and public health.` |
| Black | both JS files, both NDJSON inspect files | `Black values ambition, self-definition, pragmatism, and survival. It asks what you are willing to do to claim agency.` | `Black claims agency by turning costs, risks, and resources into leverage. Its power is deliberate, consequential, and not cruelty for its own sake.` |
| Red | both JS files, both NDJSON inspect files | `Red values emotion, impulse, authenticity, passion, and expression. It asks what is true when you stop pretending.` | `Red turns feeling into action before life hardens into regret. Its freedom stays vivid, loyal, and answerable for the sparks it throws.` |

All pass cells use the exact certified source value in `data/identity-layers.json` and had a single matching consumer record. Passing identities across all audited downstream consumers: Prismari, Quandrix, Witherbloom, Lorehold, Izzet, Boros, Rakdos, Golgari, Dimir, Orzhov, Selesnya, White, and Blue. Source JSON and embedded generated JSON passed for all 19 certified identities.

## Interpretation

The issue is not limited to Black and Red. Black and Red defects are confirmed exactly, but the certified active-consumer stale set is six identities: Silverquill, Azorius, Gruul, Simic, Black, and Red.

The failure pattern is consistent with preview propagation drift: source and embedded JSON were repaired during identity certification, but active JS preview islands and workbook exports retained older local copies. Because four affected identities predate Black/Red, separate Black-only and Red-only fixes would leave known certified consumer drift behind.

## Recovery Plan

Recommended decision: atomic certified-consumer recovery across all six affected certified identities.

1. Create a new, separate recovery worktree from the exact certified audit base or a later approved program base chosen by the owner.
2. Open a single governance card for certified preview consumer propagation, not identity semantic remediation.
3. Before edits, rerun the drift-control checkpoint and record a committed preflight.
4. Update active JS preview consumers only for the six affected preview-text cells:
   - `assets/js/newindex-color-matrix.js`
   - `assets/js/color-matrix-radar.js`
5. Rebuild workbook outputs from canonical source using the existing V3 enhanced workbook generation path; do not hand-edit binary workbook files or `.inspect.ndjson`.
6. Regenerate inspect NDJSON for both active workbook outputs if both remain active; otherwise explicitly retire one in governance before excluding it.
7. Run an exact consumer-scope validator over the 19 certified identities and the active consumer inventory.
8. Candidate creation must record exact old value, exact new value, locator, owner/generator, and candidate SHA for every changed cell.
9. Independent review must re-run the exact matrix, not trust the candidate summary.
10. Certification/governance may proceed only if every certified identity has a single matching preview value in source JSON, embedded JSON, both JS consumers, and active workbook inspect exports.

Black and Red should not be recovered as separate isolated candidates while Silverquill, Azorius, Gruul, and Simic remain known-stale in the same active consumers.

## Stop Line

STOP: certified consumer drift is confirmed outside Black and Red. No certification, candidate approval, Green advancement, VM-522 work, or tracker update should proceed until the active certified preview consumer propagation recovery is completed and independently reviewed.

CERTIFIED DRIFT-017 RECOVERY DECISION: STOP - six certified identities have stale active preview consumers; recover atomically before certification-style clearance.
