# 2026-06-11 07:18 - Planning Architect - VM-335 Mono Source-Authority Decision

## Agent Name

Planning Architect

## Task Requested

Execute VM-335 as governance/documentation only: record W/U/B/R/G mono colors as a transitional Layer 1 exception, clarify that `data/identity-layers.json` is registry/routing/display-generation authority but not VM-325 claim evidence, avoid runtime/generated/raw/validator/builder/placement work, preserve Colorless/WUBRG/Sultai/VM-334 boundaries, run scoped validation, and do not stage files.

## Pre-Flight Summary

Recent related work:
- VM-023 through VM-034 created, activated, accepted, and normalized mono identity layers plus mono identity/metaphysics docs.
- VM-325 established source-bound gold-standard governance and classified generated/runtime/registry surfaces as non-evidence unless promoted by a card.
- VM-330 through VM-332 hardened four-color Layer 1 authority and runtime handoff behavior.
- VM-333 is blocked with a Sultai handoff after a scoped runtime copy fix exposed out-of-scope source-aware archetype copy work.
- VM-334 ratified `COLORLESS` as a controlled placeable Layer 1 identity and is out of VM-335 scope.

Current known risks:
- The worktree was broadly dirty before VM-335 and remains broadly dirty across runtime, generated data, raw packets, docs, assets, Kanban, and handoffs.
- VM-333 remains blocked.
- `data/identity-layers.json` may still include stale metadata about earlier live-expression counts.
- The previously discussed VM-334 handoff-index gap was treated as pre-existing/out-of-scope context only; current pre-flight found VM-334 indexed, and VM-335 made no VM-334 bookkeeping edits.

Relevant decisions already made:
- Raw packets and approved ledgers are claim evidence.
- Generated files, runtime copy, and registry/runtime surfaces are comparison, routing, or build surfaces unless explicitly promoted through a card.
- `COLORLESS` is current workspace truth but out of mono scope.
- WUBRG remains out of scope.

Files recently changed by related work:
- Mono rollout files from VM-023 through VM-034.
- Source guardrail docs from VM-325.
- Colorless governance/docs from VM-334.
- Sultai runtime/Kanban/handoff files from VM-333.

What should not be touched:
- Runtime copy.
- Generated artifacts.
- Raw faction packets.
- Supabase context.
- Maze behavior.
- Home preview.
- Hero assets.
- Colorless product-gate files.
- Sultai VM-333 files.
- VM-334 bookkeeping.
- Staging or commits.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/blocked/VM-333-sultai-dossier-copy-contract-repair.md`
- `docs/kanban/done/VM-334-colorless-product-decision-gate.md`
- `docs/handoffs/2026-06-11-0658-codex-vm333-sultai-dossier-copy-blocked.md`
- `docs/handoffs/2026-06-11-0708-codex-vm334-colorless-product-decision-gate.md`
- `docs/handoffs/2026-05-17-0229-codex-vm023-mono-identity-layer-refactor-white-pilot.md`
- `docs/handoffs/2026-05-17-1952-codex-vm034-mono-markdown-schema-normalization.md`
- `docs/handoffs/2026-06-10-1922-codex-vm325-source-bound-gold-standard-rule.md`
- `docs/reference/source-generated-guardrails.md`
- `docs/reference/data-contracts.md`
- `docs/reference/identity-metaphysics-markdown-schema.md`
- `data/identity-layers.json` by search/pre-flight only; not edited.

## Files Changed

- `docs/reference/source-generated-guardrails.md`
- `docs/reference/data-contracts.md`
- `docs/reference/identity-metaphysics-markdown-schema.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-335-mono-source-authority-decision.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-11-0718-planning-architect-vm335-mono-source-authority-decision.md`

## What Changed

- Created VM-335 as an in-progress card before documentation edits.
- Documented W/U/B/R/G as a transitional Layer 1 registry/runtime exception.
- Clarified that `data/identity-layers.json` is authoritative for active mono registry membership, routing metadata, shared color language, Home preview metadata, and builder-fed display generation, but is not claim evidence.
- Clarified that future mono parity repair requires separately approved raw packets, claim ledgers, or source-intake promotion first.
- Explicitly stated VM-335 does not authorize mono runtime copy, generated parity repairs, raw packets, claim ledgers, validator mappings, builder migrations, or placement discriminator repairs.
- Closed VM-335 after validation and added this handoff plus index entry.

## Why It Changed

VM-325 made source authority stricter than the early mono rollout language. VM-335 resolves that mismatch without changing mono runtime behavior: mono identities stay active, but their registry-backed active status is not treated as claim-evidence backing for future parity work.

## Decisions Made

- Use VM-335 because VM-334 is occupied by the Colorless Product Decision Gate.
- Treat VM-335 as governance/documentation only.
- Do not edit `data/identity-layers.json`.
- Do not add mono raw packets, claim ledgers, validator mappings, builder changes, placement repairs, or generated output.
- Treat Colorless, WUBRG, Sultai, and VM-334 bookkeeping as out of scope.
- Preserve the expected `--targets=W` source-generated validator rejection as a boundary, not a defect to repair.

## Risks / Uncertainties

- Older mono handoffs still use pre-VM-325 `source-first` phrasing; future agents should apply VM-335/VM-325 when conflicts appear.
- `data/identity-layers.json` may still include stale metadata text about earlier live-expression counts; VM-335 did not edit it.
- The broad dirty worktree may make status noisy; VM-335 changes were kept scoped.

## Tests Run

- Pass: `node research\validate-mono-color-markdown.mjs`
- Pass with 2 existing model-owned inhibitor warnings for JESKAI/MARDU: `npm.cmd run test:source-generated`
- Expected boundary rejection: `node research\validate-source-generated-guardrails.mjs --targets=W` returned `Unknown target faction(s): W`.
- Pass with LF-to-CRLF warnings only: scoped `git diff --check -- docs/reference/source-generated-guardrails.md docs/reference/data-contracts.md docs/reference/identity-metaphysics-markdown-schema.md docs/kanban/board.md docs/kanban/done/VM-335-mono-source-authority-decision.md docs/handoffs/HANDOFF_INDEX.md docs/handoffs/2026-06-11-0718-planning-architect-vm335-mono-source-authority-decision.md`
- Pass: `git diff --cached --name-only` returned no staged files.

## Not Touched

- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/archscry-flavor-snippets.json`
- `data/raw-factions/**`
- `supabase/functions/guild-recruiter/faction-context.ts`
- Runtime JavaScript or CSS
- Maze behavior
- Home preview
- Hero assets
- Colorless product-gate files
- Sultai VM-333 files
- VM-334 bookkeeping
- Validator mappings
- Builder migrations
- Placement discriminator repairs
- Staging or commits

## Follow-Up Recommendations

- Future mono parity repair should start with an explicit source-intake/raw-packet/claim-ledger card before touching generated or runtime parity fields.
- If stale `data/identity-layers.json` metadata becomes a problem, handle it in a narrow metadata-only card or as an explicitly scoped part of a future registry maintenance pass.

## Next Suggested Agent

Planning Architect / JSON Cartographer for any future mono source-intake or raw-packet decision.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-335-mono-source-authority-decision.md`
- `docs/reference/source-generated-guardrails.md`
- `docs/reference/data-contracts.md`
- `docs/reference/identity-metaphysics-markdown-schema.md`
- VM-023 through VM-034
- VM-325
- VM-333
- VM-334
