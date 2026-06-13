# VM-335 - Mono Source-Authority Decision

ID: VM-335
Title: Mono Source-Authority Decision
Status: done
Type: Governance / Documentation
Area: mono colors, Layer 1, source authority, VM-325 guardrails
Priority: high
Created: 2026-06-11
Completed: 2026-06-11

## Summary

Document the source-authority decision for W/U/B/R/G mono colors after VM-325.

Decision: mono colors keep a transitional Layer 1 exception. They remain active registry/runtime identities through `data/identity-layers.json`, but they are not VM-325 claim-evidence-backed until future approved source work creates raw packets, claim ledgers, or source-intake promotion records.

This is governance/documentation only.

## Pre-Flight Findings

Recent related work:
- VM-023 through VM-034 created, activated, accepted, and normalized the mono identity layer and mono identity/metaphysics markdown source sets.
- VM-325 established that generated/runtime surfaces, including `data/identity-layers.json`, are not claim evidence for source-bound parity work.
- VM-330 through VM-332 hardened four-color Layer 1 authority and runtime handoff behavior.
- VM-333 is blocked with a handoff after a scoped Sultai copy hotfix exposed out-of-scope source-aware archetype copy work.
- VM-334 ratified `COLORLESS` as a controlled placeable Layer 1 identity and is not part of this mono decision.

Current known risks:
- The worktree is broadly dirty across runtime, generated data, raw packets, docs, assets, Kanban, and handoffs.
- VM-333 remains blocked.
- `data/identity-layers.json` may still contain stale metadata text about earlier live-expression counts.
- The previously discussed VM-334 handoff-index gap was treated as pre-existing/out-of-scope context only; current pre-flight found VM-334 indexed, and VM-335 made no VM-334 bookkeeping edits.

Relevant decisions already made:
- Raw packets and approved ledgers are claim evidence.
- Generated files, runtime copy, and registry/runtime surfaces are comparison and routing surfaces unless explicitly promoted through a card.
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

## Source

User-approved VM-335 plan and VM-325 source-bound governance.

## Acceptance Criteria

- [x] Mono colors are documented as a transitional Layer 1 exception.
- [x] `data/identity-layers.json` is documented as authoritative for active mono registry, routing, and display generation, not claim evidence.
- [x] Future mono parity repair is documented as requiring separately approved raw packets, claim ledgers, or source-intake promotion first.
- [x] The decision explicitly does not authorize mono runtime copy, generated parity repairs, raw packets, claim ledgers, validator mappings, builder migrations, or placement discriminator repairs.
- [x] `data/identity-layers.json` is not edited.
- [x] Colorless, WUBRG, Sultai, and VM-334 bookkeeping remain out of scope.
- [x] No files are staged.

## Files Likely Impacted

- `docs/reference/source-generated-guardrails.md`
- `docs/reference/data-contracts.md`
- `docs/reference/identity-metaphysics-markdown-schema.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-335-mono-source-authority-decision.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/YYYY-MM-DD-HHMM-planning-architect-vm335-mono-source-authority-decision.md`

## Risks

- Older mono handoffs used `source-first` wording before VM-325 narrowed claim-evidence rules.
- Future agents could treat the registry as claim evidence unless the transitional exception is explicit.
- Broad dirty worktree drift may appear in status or diffs but should not be normalized here.

## Implementation Prompt

Update the scoped governance docs to state that W/U/B/R/G mono colors are active Layer 1 registry/runtime identities with a transitional source-authority exception. Do not authorize or perform runtime, generated, raw-packet, claim-ledger, validator, builder, placement, Colorless, WUBRG, Sultai, or VM-334 bookkeeping work.

## Test Plan

- `node research\validate-mono-color-markdown.mjs`
- `npm.cmd run test:source-generated`
- Probe only: `node research\validate-source-generated-guardrails.mjs --targets=W` should reject the mono target until mono raw mappings exist.
- Scoped `git diff --check --` for VM-335 docs, board, and handoff files.

## Validation Results

- Pass: `node research\validate-mono-color-markdown.mjs`
- Pass with 2 existing model-owned inhibitor warnings for JESKAI/MARDU: `npm.cmd run test:source-generated`
- Expected boundary rejection: `node research\validate-source-generated-guardrails.mjs --targets=W` returned `Unknown target faction(s): W`.
- Pass with LF-to-CRLF warnings only: scoped `git diff --check --` for VM-335 docs, board, and handoff files.
- Pass: `git diff --cached --name-only` returned no staged files.

## Notes

VM-335 did not edit `data/identity-layers.json`, generated artifacts, runtime files, raw packets, Supabase context, Maze/Home surfaces, Colorless product-gate files, Sultai VM-333 files, validator mappings, builders, or placement discriminators.
