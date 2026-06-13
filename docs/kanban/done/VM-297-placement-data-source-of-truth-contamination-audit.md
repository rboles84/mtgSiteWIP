# VM-297 - Placement Data Source-Of-Truth Contamination Audit

**Status:** Done
**Type:** Audit / Data Governance
**Priority:** Critical
**Area:** placement / raw-factions / generated data
**Created:** 2026-06-05
**Completed:** 2026-06-05

---

## Summary

Audit-only source-of-truth gate for VM-294 Jeskai, VM-295 Witch, and VM-296 Mardu. The card pauses further faction placement-quality authoring and verifies whether recent direct generated/display edits are durable, source-backed, and evidence-role safe.

The audit found that the VM-294, VM-295, and VM-296 `data/placement-model.json` edits are not source-durable. `data/factions.json` display copy may survive builds but remains display copy, not placement proof. Witch has confirmed public-copy/flavor contract failures.

---

## Acceptance Criteria

- [x] AGENTS.md pre-flight completed.
- [x] VM-294, VM-295, and VM-296 handoffs/cards inspected before assuming touched files.
- [x] Raw/source packets compared against generated/live entries.
- [x] Source-of-truth contract checked against data contracts and builder behavior.
- [x] Triage report created.
- [x] Claude briefing supersession note created.
- [x] JSON parse check run.
- [x] Focused placement/dossier tests run as audit evidence.
- [x] No data repair, raw porting, builder redesign, runtime work, or new faction pass performed.
- [x] Handoff and index updated.

---

## Key Findings

- Jeskai: placement authoring is mostly plausible but lives in the wrong layer; source metadata is generated-only; the added Narset snippet fails committed-index validation.
- Witch: placement authoring violates the five-claim conservative packet boundary, uses synthesis evidence as proof, and fails the public flavor contract.
- Mardu: placement authoring appears more source-aligned than Witch, but VM-296 refinements still live in generated output while raw placement/profile sources retain older or incomplete state.
- Running `npm.cmd run build:factions` in this dirty worktree was unsafe for VM-297 because it would mutate generated files. Static builder inspection was sufficient to classify preservation risk.

---

## Files Changed

- `docs/audits/2026-06-05-vm297-placement-source-of-truth-contamination-audit.md`
- `docs/context/2026-06-05-faction-quality-audit-session-briefing-codex-supersession.md`
- `docs/kanban/done/VM-297-placement-data-source-of-truth-contamination-audit.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-06-05-0843-codex-vm297-placement-source-of-truth-audit.md`
- `docs/handoffs/HANDOFF_INDEX.md`

---

## Not Touched

- No raw faction packet edits.
- No generated JSON repair.
- No builder, schema, runtime, Maze, Home, route, alias, Supabase, or placement-engine changes.
- No Yore, Dune, Glint, Ink, five-color, colorless, or additional faction-quality placement work.

---

## Tests Run

- `node -e "require('./data/factions.json'); require('./data/placement-model.json'); require('./data/archscry-flavor-snippets.json'); console.log('json parse OK')"` - pass.
- `npm.cmd run test:placement` - fail; Witch flavor contract failure plus known unrelated Temur wording residual.
- `node research\archscry-dossier-followup-tests.js` - fail; Jeskai snippet not found in committed Scryfall indexes.
- `node research\maze-search-tests.js` - pass.

---

## Follow-Up

- VM-298: Witch repair.
- VM-299: Jeskai and Mardu source-durability repair.
- VM-300: Source/generated guardrails.

No further faction placement-quality pass should proceed until those repair/guardrail cards are created or explicitly scoped.
