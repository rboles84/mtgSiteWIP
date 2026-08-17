# VM-564 All-37 Dossier Term And Hover Audit Handoff

## Agent name

Codex

## Task requested

Audit all 37 placement dossiers for Commander/Magic terms such as Midrange, Tokens, Control, Protective Tokens, and taxes across all relevant sections, then report per-identity counts, exact terms, and current hover meanings.

## Files reviewed

- `AGENTS.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
- `docs/reference/token-reasoning-cost-control.md`
- `docs/reference/data-contracts.md`
- `docs/reference/source-generated-guardrails.md`
- `docs/architecture/data-flow-map.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/architecture/project-atlas.md`
- relevant VM-551 handoffs and Kanban cards
- `assets/js/index.js`
- `assets/js/commander-dossier.js`
- `data/factions.json`
- `data/gate-b1-placement-model.json`
- `data/deck-tags_expanded.json`
- `data/identity-layers.json`
- `data/dossier/identity-dossier-content.catalog.json`
- `data/dossier/discovery-education-catalog.json`
- `docs/audits/vm551-all-37-dossier-closeout/live-placement-witnesses.json`

## Files changed

- `scripts/build-vm564-dossier-term-audit.mjs`
- `docs/audits/vm564-dossier-term-hover-audit/term-audit-ledger.json`
- `docs/audits/vm564-dossier-term-hover-audit/all-37-term-hover-report.md`
- `docs/kanban/done/VM-564-all-37-dossier-term-hover-audit.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- this handoff

## What changed

- Added a deterministic audit builder that uses the current 37-identity registry, current dossier builder, current evidence witnesses, current 42-term glossary, runtime alias/boundary behavior, and the exact four-surface allocation priority.
- Produced a machine-readable occurrence ledger covering canonical terms, exact matched text, fields, surfaces, hover allocation, strategy labels, whole-phrase definition status, contained defined terms, and current hover status on each label occurrence.
- Produced a readable all-37 report with per-identity counts, complete term/meaning tables, strategy-label lists, aggregate glossary coverage, and findings.
- Explicitly separated actual hover-enabled terms from terms visible only in How This Plays, What to Look For titles, or the Colorless mana primer.
- Recorded Yore as a static-content audit because the current engine intentionally retains a bounded unnamed Yore witness.

## Why it changed

The existing glossary and dossier certification proved structural coverage but did not give the owner a single per-identity inventory of every term, exact alias, hover meaning, longer strategy label, and non-hover occurrence across the current 37-placement corpus.

## Decisions made

- The primary per-identity count is distinct canonical glossary terms across the scoped dossier vocabulary surfaces; a separate count reports the subset that actually receives a current hover/focus/tap decoration.
- `taxes` is recorded as an alias of canonical `Taxation`.
- Longer labels such as `Protective Tokens` and `Taxes and Rules` receive no invented whole-phrase meaning; the report names contained glossary terms and whether the exact label occurrence currently carries a tooltip.
- Current one-decoration-per-term behavior is audited as-is. Start Here retains allocation priority over Why This Fit, Test the Fit, and What to Look For.
- The generic Mana Notes `Midrange` land-upgrade tier is called out as a separate budget meaning and excluded from the identity term count to avoid conflating it with the glossary's strategy definition.

## Risks / uncertainties

- This is a current-state audit, not a content judgment. Whether longer strategy labels should receive their own definitions, whether titles should be hover-enabled, and whether How This Plays should become an education surface remain owner/product decisions.
- Yore does not currently render a named dossier from its certified witness; its term inventory is static content rather than a live named-result witness.
- Generated/runtime display data was inspected as the audit subject and not promoted into semantic authority.

## Tests run

- `node scripts/build-vm564-dossier-term-audit.mjs --check` - PASS: 37 identities, 42 glossary records, 38 used terms, four unused terms, 179 identity/term assignments, 161 hover assignments, 259 strategy-label occurrences, 90 label occurrences carrying hover.
- `node --check scripts/build-vm564-dossier-term-audit.mjs` - PASS.
- `git diff --check` - PASS with an existing Windows LF/CRLF notice on the board.
- Protected-path diff scan - PASS; no runtime/data/source files changed.

## Not touched

Runtime JavaScript, current glossary definitions, identity semantics, raw or generated product data, placement questions/mappings/scoring/ranking/qualification, routes, persistence, Sound/Play, card relationships, production, deployment, and CRIT-001 certification.

## RobDevPass implementation packet

- Changed behavior: documentation visibility only through a reproducible audit builder, ledger, report, Kanban closeout, and handoff.
- Owning layer/producer: runtime definitions remain owned by `data/dossier/discovery-education-catalog.json`; display text remains owned by current dossier/faction catalogs and producers; the new builder owns only the documentation artifacts.
- Existing machinery reused: current `buildCommanderDossier`, current all-37 registry and witnesses, current glossary aliases/definitions, and current education surface allocation contract.
- Protected behavior: all runtime, semantic, generated, placement, route, state, and card-content contracts remain unchanged.
- Consumers/blast radius: owner review and any separately authorized vocabulary follow-up only; no runtime consumer.
- Relevant states: exact identity coverage, bounded Yore, aliases, duplicate occurrences, first-use allocation, text-only surfaces, unmatched longer labels, and deterministic freshness.
- Smallest complete implementation: one builder/checker, one JSON ledger, and one Markdown report.
- Non-goals/stop conditions: no content repair, new meaning, glossary change, UI change, or placement work; any such need stops for separate authorization.

## RobQAPass readiness

- QA tier: QA-0.
- Changed behavior: documentation and audit reproducibility only.
- Protected behavior intentionally untouched: runtime, UI, placement, identity, glossary content, source/generated product data, and deployment.
- CPU-heavy validation: NOT REQUIRED.
- Tests intentionally skipped: browser, placement, journey, synthetic, mutation, recovery, and deployment suites because no protected runtime behavior changed; the accepted VM-551 all-37 certification remains the unchanged baseline.
- Remaining owner judgment: whether any undefined whole phrase should gain a definition, whether title-only terms should become hoverable, and whether any text-only section should join the education-surface contract.
- Owner review route: read the report; no manual all-37 product replay is required for this documentation-only audit.

## Follow-up recommendations

1. Use the report to choose whether the desired product unit is the canonical subterm (`Tokens`) or the full identity-specific label (`Protective Tokens`).
2. If changes are wanted, create a separate scoped content/presentation card that names exact labels and surfaces; do not reopen placement or certified identity meaning.
3. Keep the current four unused glossary terms visible in the audit rather than deleting them; zero use is evidence for later product judgment, not authorization for removal.

## Next suggested agent

Owner/product review; then Codex for a separately authorized glossary or presentation follow-up if desired.

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-564-all-37-dossier-term-hover-audit.md`
- `docs/audits/vm564-dossier-term-hover-audit/all-37-term-hover-report.md`
- `docs/audits/vm564-dossier-term-hover-audit/term-audit-ledger.json`
- `docs/qa/RobQAPass.md`
- `docs/dev/RobDevPass.md`
