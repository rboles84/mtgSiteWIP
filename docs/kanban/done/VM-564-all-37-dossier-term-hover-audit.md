# VM-564 - All-37 Dossier Term And Hover Audit

ID: VM-564

Status: Done

Type: Documentation / product-language audit

Area: Archscry / all-37 dossier / Commander vocabulary / glossary

Priority: High

Created: 2026-08-16

## Summary

Audit every current Archscry placement dossier for Commander and Magic terms rendered across the complete player-facing dossier, not only Start Here. Report each identity's distinct-term count, exact matched terms and aliases, occurrence surfaces, hover meanings where available, and longer strategy/archetype labels that do not have their own canonical hover definition.

## Source

Owner request, 2026-08-16: scan all 37 placements for terms such as Midrange, Tokens, Control, Protective Tokens, taxes, and related vocabulary; provide per-identity counts, lists, and hover meanings.

## Intake Triage

- Verdict: proceed.
- Smallest safe version: documentation-only reproducible inventory of the current 37-identity dossier and glossary contracts.
- Review level: RobQAPass QA-0.
- Stop condition: any need to change glossary meaning, identity semantics, Commander recommendations, runtime presentation, generated product data, or placement behavior.

## Product Outcome

Give the owner one complete report that answers, for every placement identity: how many distinct glossary-backed terms are present, which exact text and dossier surfaces expose them, what definition a user receives on hover/focus/tap, and which longer strategy labels remain undefined as whole phrases.

## RobDevPass Contract

- Current behavior: all 37 dossiers render current faction/dossier content through `assets/js/index.js`; a 42-record approved glossary is matched alias-aware and allocated at most once per canonical term per page, with Start Here preferred over later education surfaces.
- Locked decisions: the 37 certified identities, current Commander guidance, approved glossary definitions, placement behavior, and first-use decoration contract remain unchanged.
- Owning layer: `data/dossier/discovery-education-catalog.json` owns runtime hover definitions; the current dossier/faction catalogs own rendered player copy; `assets/js/index.js` owns matching, allocation, and tooltip interaction.
- Authoritative producer: this audit has no product producer. It reads the current runtime catalogs and mirrors the existing matcher into a reproducible documentation artifact; generated/runtime display data is an audit subject, not semantic authority.
- Existing machinery: reuse the current glossary catalog, alias ordering/boundary rules, all-37 identity registry, dossier source fields, and section-priority contract.
- Changed behavior: documentation visibility only—new audit ledger/report, card/board status, and handoff records.
- Protected behavior: runtime code and UI, source identity truth, generated faction/dossier data, glossary definitions, placement/scoring/qualification, routes, persistence, Sound/Play, card relationships, and production state.
- Consumers and blast radius: owner review and any separately authorized later vocabulary/education work; no runtime consumer.
- Relevant states: exact 37-identity coverage, missing or malformed fields, alias collisions, duplicate occurrences, first-use allocation, unmatched longer labels, and deterministic regeneration.
- Smallest complete implementation: one deterministic audit builder/checker, one machine-readable ledger, and one readable per-identity/aggregate report.
- Non-goals: no glossary additions or rewrites, no Commander strategy adjudication, no identity/content repair, no UI change, no source intake, and no placement work.
- Stop conditions: any contradiction requiring new product meaning or any proposed correction outside a separately approved follow-up.

## Acceptance Criteria

- Exactly 37 current identity keys are audited once each.
- Every audited player-facing dossier text surface used by the current renderer is named and covered.
- Matching reproduces the runtime glossary's case-insensitive boundary and alias behavior.
- Each identity records a distinct canonical-term count, exact matched aliases/text, occurrence count, surfaces, and the exact approved hover meaning.
- Longer strategy/archetype labels are listed separately and indicate whether the whole phrase has a definition, contains a defined subterm, or has no current hover meaning.
- Aggregate term frequency and zero-use glossary terms are reported.
- Machine-readable and Markdown artifacts regenerate deterministically and pass freshness/coverage checks.
- No runtime, source semantic, generated product data, placement, or Sound/Play file changes.

## Files Likely Impacted

- `scripts/build-vm564-dossier-term-audit.mjs`
- `docs/audits/vm564-dossier-term-hover-audit/term-audit-ledger.json`
- `docs/audits/vm564-dossier-term-hover-audit/all-37-term-hover-report.md`
- `docs/kanban/board.md`
- this card
- `docs/handoffs/HANDOFF_INDEX.md`
- dated VM-564 handoff

## Risks

- Counting raw string matches would overcount repeated terms that runtime decorates only once.
- Counting only Start Here would miss later surfaces such as How This Plays, What To Look For, mana guidance, and colorless teaching.
- A longer label can contain a hoverable canonical term without having a whole-phrase definition; the report must not invent one.
- `data/factions.json` is generated display output and cannot establish semantic authority beyond the current rendered-copy audit.

## RobQAPass Classification

QA-0. Run deterministic build/check validation, exact 37-key and report/ledger parity checks, JSON parsing, Markdown/content spot checks, `git diff --check`, and protected-path review. Browser, journey, synthetic, mutation, recovery, placement, and deployment suites are intentionally skipped because no runtime behavior changes.

## Implementation Prompt

Build a deterministic documentation-only audit of every current glossary-backed Commander/Magic term across all 37 Archscry dossier text surfaces. Reproduce the runtime term matcher and allocation contract, report per-identity distinct counts and exact hover meanings, distinguish exact aliases from canonical names, separately inventory longer strategy/archetype labels and their whole-phrase definition status, validate exact coverage/freshness, and do not modify runtime, semantic source, generated product data, placement, Sound/Play, or glossary copy.

## Notes

- Continue the single clean `main` worktree; no branch or worktree creation is required for this documentation-only audit.
- Any content correction or new hover definition discovered by the audit requires a separate owner-authorized follow-up.

## Completion Evidence

- Audited exactly 37 active identities and all 42 current approved glossary records.
- Found 38 glossary terms in use and four unused in the scoped dossier vocabulary surfaces.
- Reconciled 179 distinct identity/term assignments, 161 current hover allocations, 259 strategy-label occurrences, and 90 strategy-label occurrences that themselves carry the hover target.
- Delivered the readable all-37 report and machine-readable occurrence ledger under `docs/audits/vm564-dossier-term-hover-audit/`.
- `node scripts/build-vm564-dossier-term-audit.mjs --check` - PASS.
- `node --check scripts/build-vm564-dossier-term-audit.mjs` - PASS.
- `git diff --check` - PASS with the existing Windows line-ending notice for `docs/kanban/board.md`.
- Protected runtime/data scan - PASS; no `assets/`, `data/`, `research/`, or `supabase/` file changed.
- CPU-heavy validation: NOT REQUIRED. Placement, browser, journey, synthetic, mutation, recovery, and deployment suites were intentionally skipped because this is QA-0 documentation-only work.
