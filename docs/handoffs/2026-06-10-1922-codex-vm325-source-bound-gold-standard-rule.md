# 2026-06-10 19:22 - Codex - VM-325 Source-Bound Gold Standard Rule

## Agent Name

Codex

## Task Requested

Implement the user-approved Source-Bound Gold Standard Rule so future faction parity, placement, dossier, source-intake, review, and implementation work cannot use generated/runtime surfaces, model memory, general MTG knowledge, or unsourced inference as canonical backing.

## Pre-Flight Summary

Recent related work:
- VM-297 found source-of-truth contamination in earlier placement-quality work.
- VM-300 added source/generated guardrails and the target-scoped validator.
- VM-301 through VM-304 repaired four-color source durability.
- VM-308 through VM-313 kept Colorless source-first, review-gated, and non-live pending separate readiness/promotion work.

Current known risks:
- The worktree remains broadly dirty with unrelated runtime, generated, raw, docs, assets, and kanban changes.
- VM-324 is reserved by VM-313 as the likely future Colorless implementation card, so this governance card uses VM-325.
- Existing display affinity, hardcoded dossier copy, generated snippets, and public UI output can look polished while lacking source traceability.

Relevant decisions already made:
- Durable placement/profile backing belongs in raw faction packets, source/evidence ledgers, approved research, approved canon captures, and approved Commander recommendation files.
- Architecture identity/metaphysics docs become official source material only when a card promotes relevant sections into raw packets, claim ledgers, or cited source ledgers.
- Generated/runtime surfaces are comparison targets only and must not be used as canonical source.
- Colorless remains non-live unless a separate readiness/promotion plan passes.

Files recently changed by related work:
- `docs/reference/source-generated-guardrails.md`
- `docs/reference/data-contracts.md`
- `research/validate-source-generated-guardrails.mjs`
- four-color raw faction packets and generated rebuild outputs
- Colorless research/raw/docs/planning files

What should not be touched:
- Runtime JS
- Generated faction/placement/identity/snippet JSON
- Raw faction data
- Builders/schemas
- Supabase context
- Home, Maze, route, and Colorless promotion surfaces

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/reference/source-generated-guardrails.md`
- `docs/reference/data-contracts.md`
- `docs/reference/workflow.md`
- `docs/kanban/done/VM-300-source-generated-guardrails.md`
- `docs/handoffs/2026-06-05-1126-codex-vm300-source-generated-guardrails.md`
- `docs/kanban/done/VM-313-colorless-controlled-promotion-planning.md`

## Files Changed

- `docs/reference/source-generated-guardrails.md`
- `docs/reference/data-contracts.md`
- `docs/reference/workflow.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-325-source-bound-gold-standard-rule.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-10-1922-codex-vm325-source-bound-gold-standard-rule.md`

## What Changed

- Added the Source-Bound Gold Standard Rule to the VM-300 guardrail doc.
- Defined official researched data and non-canonical generated/runtime comparison targets.
- Added work mode rules for recon, review, repair, source-intake, and implementation cards.
- Required implementation cards to classify changed or preserved fields as `backed-repair`, `source-normalization`, `source-intake-needed`, or `blocked-noncanonical`.
- Added cohort defaults, including mono source-packet decision, four-color per-identity/per-field readiness matrix, and Colorless non-live gate.
- Updated data contracts and workflow docs to point future agents at the stricter rule.
- Created and closed VM-325, then updated board and handoff index bookkeeping.

## Why It Changed

The recon found that several identities have polished generated/display/runtime surfaces without equally strong source traceability for every dossier, placement, Commander, figure, flavor, or affinity field. VM-325 makes the source boundary explicit before future gold-standard repair work can backfill from non-canonical output.

## Decisions Made

- Use VM-325 instead of VM-324 to preserve VM-313's recommended Colorless implementation slot.
- Implement the rule as governance/documentation only; do not run generators or edit data/runtime files.
- Treat `data/factions.json`, `data/placement-model.json`, `data/identity-layers.json`, Supabase context, hardcoded dossier copy, generated snippets, existing Archscry UI output, and existing display affinity copy as comparison targets only.
- Require source-intake cards for new web/general-knowledge source acquisition before any generated/display parity work consumes that source.

## Risks / Uncertainties

- Existing historical cards may use looser wording; future work should follow VM-325 when conflicts appear.
- VM-325 does not prove any existing generated/runtime value is source-backed; it creates the governing rule for future audits and repairs.
- The broad dirty worktree may include unrelated changes in files also touched by VM-325, especially `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md`.

## Tests Run

- Pass with LF-to-CRLF warnings only: `git -c safe.directory=C:/dev/mtgSiteWIP diff --check -- docs/reference/source-generated-guardrails.md docs/reference/data-contracts.md docs/reference/workflow.md docs/kanban/board.md docs/kanban/done/VM-325-source-bound-gold-standard-rule.md docs/handoffs/HANDOFF_INDEX.md docs/handoffs/2026-06-10-1922-codex-vm325-source-bound-gold-standard-rule.md`
- Pass: content scan for `Source-Bound Gold Standard Rule`, `official researched data`, generated/runtime comparison targets, no-web rule, work mode rules, `blocked-noncanonical`, and `per-identity, per-field`.
- Pass: scoped ASCII check on edited/new docs.
- Reviewed scoped git diff for the VM-325 files; note that `docs/kanban/board.md`, `docs/handoffs/HANDOFF_INDEX.md`, and `docs/reference/data-contracts.md` had pre-existing dirty drift visible in the diff.

## Not Touched

- `assets/js/**`
- `data/factions.json`
- `data/placement-model.json`
- `data/identity-layers.json`
- `data/archscry-flavor-snippets.json`
- `data/raw-factions/**`
- `research/build-faction-artifacts.mjs`
- `research/validate-source-generated-guardrails.mjs`
- `supabase/functions/guild-recruiter/faction-context.ts`
- Home, Maze, route, schema, image, Colorless promotion, and generated artifact files

## Follow-Up Recommendations

- Apply VM-325 as the governing rule for all future gold-standard parity, placement, dossier, and source-quality cards.
- Before four-color parity implementation, create a per-identity, per-field source-readiness matrix.
- Before mono parity repair, create or explicitly approve source packets and claim ledgers.
- Keep Colorless non-live until a separate readiness/promotion implementation passes.

## Next Suggested Agent

Planning Architect / JSON Cartographer for the next source-readiness matrix or source-intake card.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-325-source-bound-gold-standard-rule.md`
- `docs/reference/source-generated-guardrails.md`
- `docs/reference/workflow.md`
- `docs/reference/data-contracts.md`
- VM-297
- VM-300
- VM-313
