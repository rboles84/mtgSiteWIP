# VM-312 - Colorless Review Gate

ID: VM-312
Title: Colorless Review Gate
Status: done
Reservation State: Complete
Type: Review / Raw Packet Gate
Area: Colorless, Raw Data, Source Control
Priority: high
Created: 2026-06-10
Completed: 2026-06-10

## Summary

Reviewed the VM-311 Colorless raw packet without editing, repairing, formatting, reordering, staging, regenerating, building, or promoting it.

Review verdict: `review-blocked-requires-repair-card`.

The five raw JSON files remained byte-stable and passed internal raw-packet checks, but the required live-surface leakage scan found existing working-tree `COLORLESS` additions in runtime/test JavaScript. VM-312 therefore cannot approve Colorless for VM-313 promotion planning until a separate repair/classification card resolves or explicitly scopes that drift.

## Pre-Flight Summary

Recent related work:
- VM-308 created the Colorless source packet and evidence ledger.
- VM-309 created the current-standard Colorless identity and metaphysics docs.
- VM-310 filled docs parity without raw, runtime, or generated work.
- VM-311 created the review-gated, non-live Colorless raw packet.

Current known risks:
- Colorless must remain non-live, review-gated, and not placement eligible.
- Support-only Commander rows cannot authorize broad Commander claims.
- Manual-fill rows remain limitations, not proof.
- Existing unmanaged `docs/research/canon/colorless/**` deletes and dirty `assets/img/identity-hero/colorless.webp` remain out of scope.
- Existing working-tree runtime/test `COLORLESS` drift must not be normalized by VM-312.

Relevant decisions already made:
- VM-311 raw claims are limited to five conservative boundary claims.
- VM-309/VM-310 architecture docs are shaping context only, not claim-bearing evidence.
- VM-312 is a review gate only; repair and promotion are out of scope.

Files recently changed by prior cards:
- `docs/research/colorless/**`
- `docs/architecture/colors/colorless/**`
- `data/raw-factions/colorless/**`
- Colorless Kanban and handoff bookkeeping

What should not be touched:
- The five Colorless raw JSON files
- `docs/research/canon/colorless/**`
- `assets/img/identity-hero/colorless.webp`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `research/build-faction-artifacts.mjs`
- `supabase/functions/guild-recruiter/faction-context.ts`
- Generated artifacts, schemas, Maze files, Home files, route CSS/JS, runtime code

## Raw Packet Hashes

Hash algorithm: SHA-256.

Before review checks:
- `colorless.changelog.json`: `94775FCD67365FD82F77FC52E8F989249B402F839399215602C07BD4F65D6580`
- `colorless.claims.json`: `492803A912347DCA78F0246AE4594B9E92DDBB14271327D42FB042C514FBA78A`
- `colorless.placement.json`: `25D373514B7A923E86F554C4E00A8F0BFD3F9B69CCFF9BCB03ADC96B6F39B611`
- `colorless.profile.json`: `402166523ADA190AF971B4BEBE319DBDABA7721BC59D1521E200E7CAC22E7872`
- `colorless.sources.json`: `7CD00948F9EA4953988D34DB13DDD2EA7D63FFD0481B72F2BC9D73AAC41BDFB6`

After review checks, before bookkeeping:
- `colorless.changelog.json`: `94775FCD67365FD82F77FC52E8F989249B402F839399215602C07BD4F65D6580`
- `colorless.claims.json`: `492803A912347DCA78F0246AE4594B9E92DDBB14271327D42FB042C514FBA78A`
- `colorless.placement.json`: `25D373514B7A923E86F554C4E00A8F0BFD3F9B69CCFF9BCB03ADC96B6F39B611`
- `colorless.profile.json`: `402166523ADA190AF971B4BEBE319DBDABA7721BC59D1521E200E7CAC22E7872`
- `colorless.sources.json`: `7CD00948F9EA4953988D34DB13DDD2EA7D63FFD0481B72F2BC9D73AAC41BDFB6`

Result: raw packet hash stability passed.

## Review Results

Passed:
- Exact five-file set exists under `data/raw-factions/colorless/`.
- All five raw JSON files parse.
- `claim_count: 5` matches the actual claim count.
- Claim IDs are contiguous from `colorless_claim_0001` through `colorless_claim_0005`.
- Every `COLORLESS-EVID-###` and `COLORLESS-MF-###` reference resolves in `docs/research/colorless/colorless-evidence-ledger.md`.
- Every raw-claim `source_id` resolves in `colorless.sources.json`.
- No support-only, comparator-only, distinction-only, shaping-only, discovery-only, excluded, quarantine, manual-fill, architecture, visual, relocation, generated, or Commander material is used as independent broad proof.
- `COLORLESS-CMD-001` and `COLORLESS-CMD-002` remain support/comparator-only.
- `COLORLESS-EVID-014`, `COLORLESS-EVID-015`, and `COLORLESS-EVID-017` remain bounded as support, boundary, or limitation rows.
- VM-309/VM-310 architecture docs appear only as shaping context.
- Non-live flags remain false/disabled in the raw packet: placement eligibility, preview eligibility, live pilot, and placement axes.
- Raw packet overclaim scans found only negated or boundary-setting language for sixth-color framing, generic/colorless conflation, artifact/Colorless collapse, Eldrazi/artifact collapse, Wastes overreach, Phyrexia collapse, broad Commander viability, and superiority/mastery over WUBRG.
- Placement `color_identity` nesting matches existing placement-file convention by using an object with an empty `colors` array and future-expression note.

Blocked:
- The required leakage scan found existing working-tree `COLORLESS` additions in runtime/test JavaScript:
  - `assets/js/commander-dossier.js` contains `COLORLESS` summary-strip fallback and WUBRG adjacent-target handling.
  - `assets/js/quick-reading-tests.js` contains mocked `COLORLESS` summary-strip coverage and `institution_type: "colorless"`.
- These files are outside VM-312 scope and were not changed or repaired.
- Because VM-312 requires no `COLORLESS` leakage into runtime/test surfaces before approval, this is a blocker rather than a warning.

## Files Changed

- `docs/kanban/board.md`
- `docs/kanban/done/VM-312-colorless-review-gate.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-10-0728-codex-vm312-colorless-review-gate.md`

## Tests Run

- AGENTS pre-flight review against `docs/handoffs/HANDOFF_INDEX.md`, recent Colorless handoffs, `docs/kanban/board.md`, VM-308 through VM-311 cards, and current `git status --short`.
- Exact five-file raw packet check.
- JSON parse for all five raw files.
- SHA-256 before/after raw hash checks.
- Claim count and contiguous claim ID check.
- Evidence/manual-fill resolver against `docs/research/colorless/colorless-evidence-ledger.md`.
- Source resolver against `data/raw-factions/colorless/colorless.sources.json`.
- Source-role review for claim-bearing proof versus support/comparator/distinction limitations.
- Non-live flag validation.
- Targeted leakage scan across live/generated/runtime surfaces.
- Overclaim and forbidden-drift scans.
- Raw convention comparison against recent raw packet placement/profile shape.

Not run:
- Formatters, fixers, generators, builders, or JSON/Markdown rewrite scripts.
- `npm.cmd test`
- `npm.cmd run test:parser`
- `npm.cmd run test:placement`

## Not Touched

- `data/raw-factions/colorless/colorless.sources.json`
- `data/raw-factions/colorless/colorless.claims.json`
- `data/raw-factions/colorless/colorless.profile.json`
- `data/raw-factions/colorless/colorless.placement.json`
- `data/raw-factions/colorless/colorless.changelog.json`
- `docs/research/colorless/**`
- `docs/architecture/colors/colorless/**`
- `docs/architecture/colorless/**`
- `docs/research/canon/colorless/**`
- `assets/img/identity-hero/colorless.webp`
- `assets/js/commander-dossier.js`
- `assets/js/quick-reading-tests.js`
- Runtime, generated, schema, builder, Maze, Home, route, Supabase, and identity-layer files

## Follow-Up Recommendations

- Create a repair/classification card before VM-313 to resolve the existing `COLORLESS` runtime/test JavaScript drift.
- The repair card should decide whether the `COLORLESS` summary-strip/test additions are approved pre-promotion scaffolding, accidental leakage, or promotion work that must wait behind VM-313+.
- Do not begin controlled promotion planning until the leakage blocker is resolved and a new review gate records approval.
- Keep the VM-311 raw packet frozen unless a separate repair card explicitly authorizes raw edits.

## Next Suggested Agent

Planning Architect / Runtime Steward for a Colorless leakage classification and repair card before VM-313 promotion planning.
