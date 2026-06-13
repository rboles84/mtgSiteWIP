# Identity Layer-1 Coverage & WUBRG Plan

Status: Report-only summary (no data changed). Date: 2026-06-10.
Purpose: a standing, codex-ready snapshot of what the live identity data ("Layer 1") actually contains, what's missing or broken, and exactly what it takes to add WUBRG. Build an implementation plan from this; do not treat it as a plan itself.

VM-334 supersession note, 2026-06-11: this report is preserved as a pre-VM-327 snapshot. Current product authority ratifies `COLORLESS` as a controlled placeable Layer 1 identity with `colors: []`, `core_color: "C"`, `placement_eligible: true`, and `preview_eligible: false`; use `docs/architecture/colors/colorless/product-decision-gate.md` for the current Colorless decision.

---

## The framing that matters

There are two layers, and only one of them is the product:

- **Layer 1 — live data (the product).** `data/factions.json`, `data/identity-layers.json`, `data/placement-model.json`, and the canonical source under `data/raw-factions/<faction>/`. This is what the site reads. It is **uniform and consistent.**
- **Layer 2 — research/authoring (`docs/research/`).** This was *scaffolding* whose only job was to generate Layer 1. It is inconsistent across factions, but that inconsistency is **out of scope** — once Layer 1 exists, Layer 2 is archival reference, not a thing to normalize.

**Decision:** stop tidying Layer 2. Audit and complete Layer 1. This document is the Layer 1 audit.

---

## Layer 1 coverage matrix

| Tier | Count | Expression keys | Status |
|---|---|---|---|
| Mono | 5 | W, U, B, R, G | ✅ Complete |
| Guilds (allied) | 5 | WU, UB, BR, RG, WG | ✅ Complete |
| Guilds (enemy) | 5 | WB, UR, BG, WR, UG | ✅ Complete |
| Strixhaven colleges | 5 | LOREHOLD, PRISMARI, QUANDRIX, SILVERQUILL, WITHERBLOOM | ✅ Complete |
| Alara shards | 5 | BANT, ESPER, GRIXIS, JUND, NAYA | ✅ Live (preview_eligible: false) |
| Tarkir wedges | 5 | ABZAN, TEMUR, SULTAI, MARDU, JESKAI | ✅ Live (preview_eligible: false) |
| Nephilim 4-color | 5 | YORE, GLINT, DUNE, INK, **WITCH** | ⚠️ 4 live + WITCH broken |
| Colorless | 1 | (`raw-factions/colorless/` exists) | ❌ Sourced but NOT wired as an expression |
| Five-color WUBRG | 1 | — | ❌ Absent from Layer 1 entirely |

**Live total today: 35 expression keys** in `placement-model.json` (`active_expression_keys`); `identity-layers.json` describes a "clean live set" of **34**, the difference being WITCH.

Keying note: keys use **W>U>B>R>G priority order** (so `WR` = Boros, `WG` = Selesnya, `UG` = Simic are *correct*, not ordering bugs). Enemy guild + college share a color pair but are keyed distinctly (e.g. `WB` Orzhov vs `SILVERQUILL`). This is consistent — no action needed.

---

## The real gaps (ranked)

### 1. WUBRG (five-color) — completely absent. *This is the headline add.*
- No `data/raw-factions/wubrg/` source folder.
- No entry in `factions.json`, `identity-layers.json`, or `placement-model.json`.
- Only appears as *exclusion reasons* inside other factions ("off-color for strict UR Izzet").
- **Good news:** the research to source it already exists — `docs/research/wubrg/WUBRG-five-color-deep-research-report.md`, the consolidated metaphysics doc, and `docs/research/canon/five-color-reference-audit.md`. No new research required; this is a data-authoring task.

### 2. WITCH (4-color, red-excluded) — present but broken.
- In `placement-model.json` active keys, but excluded from the clean live-34.
- Flagged by **VM-295** (CLAUDE.md): hand-authored WITCH placement data in `placement-model.json` is non-reproducible from source and breaks the live flavor contract. Also: `WITCH-MF-002` flavor verification pending, and `assets/img/identity-hero/witch.webp` exists but is not wired.
- **This is a repair, not an add** — and it's the closest existing parallel to what WUBRG will need, so fixing it first de-risks WUBRG.

### 3. Colorless — sourced but not wired.

VM-334 supersession note: this section is historical. `COLORLESS` is now wired as a controlled placeable identity, and future Colorless expansion remains blocked behind separate source-intake, QA, route, Home preview, alias, hero, or product-copy approval.

- `data/raw-factions/colorless/` exists with research, but colorless is **not** an expression key in `identity-layers.json` or `placement-model.json`.
- **Decision point for you:** is colorless meant to be a placeable identity, or reference-only? If placeable, it needs the same wiring as WUBRG below. If not, it should be explicitly marked reference-only so it stops looking like a gap.

### Non-issues (so codex doesn't chase them)
- Key ordering (`WR`/`WG`/`UG`) — correct, leave alone.
- Layer 2 (`docs/research/`) inconsistency — out of scope by the framing above.
- The 31 raw-factions folders use long names (`azorius_senate`) while expressions use codes (`WU`) — this is an intentional source→key mapping, not drift.

---

## What "complete in Layer 1" requires (the per-expression contract)

To consider any expression fully live, it needs all of:

1. **Source** — `data/raw-factions/<key>/`: profile, claims, placement, sources, changelog. *(This feeds `placement-model.json`, which is **generated** by `research/build-faction-artifacts.mjs` — never hand-edit the model; that's what broke WITCH.)*
2. **Display** — `factions.json` entry: key, name, institution_type, world, colors, accent, banner, tagline, philosophy, lore_summary, core_tension, exclusions.
3. **Routing/identity** — `identity-layers.json` expression entry: routing, blend metadata, placement_eligibility, preview metadata (+ `preview_eligible` flag).
4. **Scoring** — present in `placement-model.json` `active_expression_keys` with generated scoring signals.
5. **Copy contract** — `quick-reading-tests.js` entries (forbidden terms / copy boundaries). Per CLAUDE.md, read this before authoring any flavor copy.
6. **Hero asset** — `assets/img/identity-hero/<key>.webp` (parallels witch.webp).
7. **Gate** — `npm run test:placement` passes before *and* after.

This 7-point list is the checklist codex should validate every expression against — and the exact build order for WUBRG.

---

## WUBRG addition — concrete surface (for codex to plan against)

Author, in this order, treating WITCH's repair as the reference implementation:

1. `data/raw-factions/wubrg/` — author profile/claims/placement/sources/changelog from the existing five-color research (cite the dossier; keep claim-bearing facts in the evidence ledger, not hand-typed into the model).
2. Run `research/build-faction-artifacts.mjs` to regenerate `placement-model.json` (adds WUBRG to active keys + scoring). Do **not** hand-edit the model.
3. `factions.json` — add the WUBRG display entry (institution_type likely `pentad`/`five_color`; world = multiversal/Alara-adjacent; tagline + philosophy from the dossier's "Totality vs. Overload" framing).
4. `identity-layers.json` — add WUBRG expression entry; decide `preview_eligible` (recommend false initially, like shards/wedges).
5. `quick-reading-tests.js` — add WUBRG copy contract. Note the dossier's guardrails: WUBRG is "all five," not "no position"; keep color-permutation codes (GWUB, UBRG…) out of public copy (CLAUDE.md / identity-layers metadata both state this).
6. `assets/img/identity-hero/wubrg.webp` — add hero asset.
7. `npm run test:placement` green before and after; new VM card + handoff per workflow.

Research source already on hand: `docs/research/canon/five-color-reference-audit.md`, `docs/research/wubrg/WUBRG-five-color-deep-research-report.md`, `docs/research/canon/misc/mtg_five_color_and_colorless_dossier.md`.

---

## Suggested sequencing

1. **Repair WITCH (VM-295)** first — proves the source→build→test loop on a 4-color and clears a known breakage.
2. **Add WUBRG** using WITCH as the template (research already exists).
3. **Colorless decision is ratified by VM-334** - `COLORLESS` is controlled placeable; future expansion still requires separate approval.

Each step is independent, reversible, and gated by `npm run test:placement`. None of it requires touching Layer 2.
