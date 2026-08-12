# VM-551 All-37 Card-Rationale Source Hardening Handoff

- **Agent:** Codex
- **Task requested:** Inventory all 37 identities, re-adjudicate every existing card-rationale candidate, establish canonical provenance authority, source-harden defensible gaps without unsupported prose, and make Archscry consume only owner-approved relationships.
- **Starting authority:** branch `codex/vm551`, worktree `C:\dev\voxmana.io-vm551`, clean HEAD `253965d77339e9a34640fdd261259b45038ac4c6`.
- **Related card:** `docs/kanban/done/VM-551-all-37-card-rationale-source-hardening.md`

## Files Reviewed

- Mandatory VM-551 handoff/Kanban context, source/generated and data contracts, all 37 raw profile/claim/source packets, generated faction and flavor comparison surfaces, committed Scryfall Commander index, dossier runtime/card modal code, and relevant VM-551 tests.

## Files Changed

- `data/dossier/card-rationale-relationships.source.json`
- `data/dossier/card-rationale-relationships.source.schema.json`
- `data/dossier/card-rationale-catalog.json`
- `data/dossier/card-rationale-catalog.schema.json`
- `research/build-card-rationale-artifacts.mjs`
- `scripts/vm551-card-rationale-authority-tests.mjs`
- `scripts/vm551-dossier-content-integrity-tests.mjs`
- `assets/js/index.js`
- `package.json`
- `docs/audits/vm551-all-37-card-rationale-source-hardening/README.md`
- `docs/audits/vm551-all-37-card-rationale-source-hardening/baseline-inventory.tsv`
- `docs/audits/vm551-all-37-card-rationale-source-hardening/post-hardening-inventory.tsv`
- `docs/audits/vm551-all-37-card-rationale-source-hardening/per-card-adjudication.tsv`
- `docs/audits/vm551-all-37-card-rationale-source-hardening/owner-review-packet.tsv`
- `docs/audits/vm551-all-37-card-rationale-source-hardening/gap-report.md`
- `docs/reference/data-contracts.md`
- `docs/reference/source-generated-guardrails.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-551-all-37-card-rationale-source-hardening.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- this handoff

## Verified Baseline And Adjudication

- Exactly 37 identities inventoried.
- 125 distinct current candidates reviewed: 122 canonical raw candidates plus three generated-only Naya candidates.
- The old filter mechanically admitted 52 rows across 12 identities; the flavor-selector intersection rendered only Nekusar for Grixis.
- Of those original 52 rows, 22 now remain `REVIEW_REQUIRED` and 30 are `EVIDENCE_NEEDED`.
- Across the complete 125-row union: 26 `REVIEW_REQUIRED`, 96 `EVIDENCE_NEEDED`, and three `REJECTED`.
- Review-ready identities: WU, UB, BR, RG, WG, WB, UR, BG, UG, WR, LOREHOLD, and BANT.
- No review-ready example: W, U, B, R, G, PRISMARI, QUANDRIX, SILVERQUILL, WITHERBLOOM, ESPER, GRIXIS, JUND, NAYA, ABZAN, TEMUR, SULTAI, MARDU, JESKAI, YORE, GLINT, DUNE, INK, WITCH, COLORLESS, and WUBRG.

## Authority And Runtime Result

- Candidate authority now requires a resolved substantive certified identity claim, resolved source IDs and locators, an exact committed Commander card record, direct native relationship evidence, limitation, deterministic priority, and explicit review state.
- Generic color, product, mechanic, tag, and generated-only bridges do not qualify.
- Twenty-two preserved repository drafts and four new tightly source-bounded drafts (Lazav, Borborygmos, Trostani, and Prime Speaker Zegana) are queued for owner review. The four new drafts state only the direct certified native-figure relationship and make no gameplay, player-motivation, or personality inference.
- No rationale was self-promoted. The generated runtime catalog contains zero `APPROVED_PUBLIC` records, yielding Full 0 / Partial 0 / Gap 37 until owner decisions exist.
- `Why These Cards Echo This Reading` now reads the generated approved catalog directly in deterministic priority order. It no longer depends on the flavor selector, tag overlap, color matching, or nearest-match fallback.
- Missing/invalid catalogs and zero-card identities fail closed without crashing. The shared modal receives the exact same approved rationale/provenance as the section; unrelated card callers receive no fabricated `Why it appears` content.

## Source Additions

- No external evidence source was added. Existing certified raw claim/source packets and the committed Scryfall Commander index were sufficient to prepare the 26 review records.
- No search-result snippet, AI summary, community statement, generated faction row, or flavor snippet was promoted as evidence.
- Remaining evidence gaps identify the exact source or adjudicated bridge needed; they were not filled by inference.

## Evidence-Led Propagation Outside The Target Section

- No unrelated public VM-551 surface required correction. The only shared propagation was the existing card-detail modal contract: approved section records carry the identical rationale into the modal. No card, precon, Matrix, Maze, or placement semantics changed.

## Tests Run

- Card-rationale artifact freshness and all-37 inventory: PASS.
- Authority negative fixtures: PASS for color-only, tag-only, generic-mechanic-only, product-only, missing claim, missing source, missing card, missing locator, duplicate relationship, generated fallback, missing owner approval, and unsupported stronger wording.
- Dossier content integrity: PASS; runtime public rationales `0`, no review-state leakage, modal and layout contracts intact.
- Frontend JS syntax and lint: PASS.
- Source/generated guard: PASS with the two pre-existing JESKAI/MARDU model-owned warnings.
- Legacy placement: PASS, 37/37 golden paths.
- Gate B1 model: PASS, 16 constructs / 36 questions / 124 answers / 37 identities / 123 pairs.
- Gate B1 runtime, questionnaire presentation, and qualified-alternatives result contract: PASS; result contract covered 5,000 deterministic journeys.
- Full Gate B1 engine: PASS; 5,000 journeys, 37 identities, 123 pairs, 6,660 synthetic runs, 921 mutations, 36/37 responsible primaries.
- Focused browser QA: PASS on existing Esper named dossier at desktop, 900px intermediate, and 390px mobile; zero-card section omitted, no overflow, no internal review tokens, clean console.
- Three-card and Partial browser cases: not applicable until owner approval creates at least one legitimate runtime record; no fixture content was injected into hands-on QA. Tied/co-leader placement behavior remains covered by the unchanged qualified-alternatives suite.
- `git diff --check`: PASS.

## Decisions Made

- Mechanical filter success is renamed and treated as pre-semantic only.
- Direct native anchors may enter owner rationale review when every source/card/claim locator resolves; generic mechanical or exact-color analogy may not.
- Newly drafted rationale never receives public status from Codex. Explicit owner approval metadata is required before the builder will emit it.
- Zero public card examples is the only responsible runtime result at this stop gate.

## Risks / Uncertainties

- The card-rationale section is intentionally absent for all identities until owner decisions promote specific records.
- Twenty-five identities have no review-ready relationship; closing those gaps requires direct source intake or a separately adjudicated bounded mechanical-example bridge.
- Grixis candidate rows reference unresolved source IDs; Jund's Hearthhull row does not resolve in the committed card index; Naya's three generated candidates have no raw authority.
- Owner review may reject or narrow any of the 26 drafts. Rejection should reduce coverage, not trigger fallback prose.

## Not Touched

- Constructs, questions, answers, stable IDs, mappings, scoring, ranking, routing, stopping, refinement, naming qualification, Yore observability, identity definitions, Gate A result states, Matrix calculations, persistence, storage/schema, precon facts, provider routes, or Maze behavior.
- No push, merge, deployment, migration, recruitment, shadow test, player validation, or production certification.

## Follow-Up Recommendations

1. Owner approves, revises, or rejects the 26 rows in `owner-review-packet.tsv`.
2. Owner reviews the explicit 25-identity gap list and decides which identities justify a separate source-intake pass.
3. After approvals are recorded, run `npm run build:card-rationales` and repeat the highest legitimate cardinality, Partial, Gap, and tied-view browser checks.

## Next Suggested Agent

- Owner review only. Do not begin another VM-551 implementation automatically.
