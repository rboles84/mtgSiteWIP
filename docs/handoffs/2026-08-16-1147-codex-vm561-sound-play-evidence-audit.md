# VM-561 Sound/Play Evidence Audit Handoff

- Agent name: Codex
- Task requested: From the clean VM-560 checkpoint, build 37 source-grounded Identity Evidence Packets and an exact 119-row rendered Sound/Play Card Evidence Ledger; reconcile four suppressed Play relationships separately; enforce routing/evidence/inference separation, tile-versus-modal value, repetition classes, and authority-laundering controls; stop before all prose proposals.
- Related card: VM-561
- Base checkpoint: VM-560 commit `b7c808029421668f4b947759c467a250230b5592`
- Status: Evidence pass complete. Stopped before calibration or rewrite proposals.

## Files reviewed

- `docs/research/archscry-sound-play-audit/source-router.md`
- All 37 router-selected raw claim/source registries and the relevant underlying local evidence files.
- Thirteen official mono PDF captures, read through PDF text extraction.
- Twenty-eight distinct official Wizards URLs named by row evidence; 26 opened/read successfully, two were unavailable or inadequate.
- `data/dossier/card-voice-catalog.json`
- `data/dossier/card-rationale-catalog.json`
- `data/dossier/card-voice-relationships.source.json`
- `data/dossier/card-rationale-relationships.source.json`
- `data/dossier/card-voice-printings.source.json`
- `data/scryfall/raw/oracle-cards.json`
- VM-559/VM-560 cards, handoffs, board records, `docs/dev/RobDevPass.md`, and `docs/qa/RobQAPass.md`.

## Files changed

- `docs/research/archscry-sound-play-audit/identity-evidence/` — 37 identity packet Markdown files.
- `docs/research/archscry-sound-play-audit/card-evidence-ledger.json`
- `docs/research/archscry-sound-play-audit/card-evidence-ledger.csv`
- `docs/research/archscry-sound-play-audit/evidence-summary.json`
- `docs/research/archscry-sound-play-audit/evidence-summary.md`
- `docs/research/archscry-sound-play-audit/source-inspection-manifest.json`
- `docs/research/archscry-sound-play-audit/official-source-inspection.json`
- `docs/research/archscry-sound-play-audit/official-route-reconciliation.md`
- `docs/research/archscry-sound-play-audit/suppressed-play-coverage-appendix.md`
- `research/build-vm561-sound-play-evidence-audit.mjs`
- `research/build-vm561-sound-play-evidence-workbook.mjs`
- `scripts/vm561-sound-play-evidence-audit-tests.mjs`
- `outputs/01a007e0-b631-7ca1-a18c-9f6e6ff6ff29/VM-561-Sound-Play-Card-Evidence-Ledger.xlsx`
- VM-561 Kanban, board, handoff, and handoff-index documentation.

## What changed

- Generated exactly 37 uneven identity packets from the VM-560 authority routes after opening the underlying sources.
- Generated exactly 119 rendered-row audit records: 73 Sound and 46 Play.
- Preserved the four approved precon-overlap Play relationships in a separate 4/4 appendix; they do not enlarge the rendered ledger.
- Every row separately records `ROUTING_AUTHORITY`, `UNDERLYING_EVIDENCE`, and `AUDIT_INFERENCE`, including the explicit card evidence → identity facet → particular-card bridge.
- Added tile/modal additive-value findings, `MODAL_REDUNDANT`, and cross-card repetition classification without inventing replacement copy.
- Counted a derived claim/taxonomy/dossier/workbook chain once. Independent corroboration counts only opened local/PDF evidence or successfully inspected official web evidence.
- Created an evidence-only workbook with five sheets: Rendered Rows, Summary, Identity Facets, Suppressed Play Appendix, and Definitions.

## Why it changed

The current 119 rendered relationships needed an evidence record that could distinguish accurate/supported content from weak bridges, generic modal composition, source gaps, and synthesis boundaries before any owner-authorized prose calibration. The router alone could not serve as claim proof.

## Decisions made

- Final dispositions: 65 `NO_CHANGE_INDICATED`, 49 `REMEDIATION_LIKELY`, 3 `SOURCE_INTAKE_REQUIRED`, 2 `INSUFFICIENT_VOX_MANA_AUTHORITY`, 0 `INSUFFICIENT_EVIDENCE`, 0 `CONFLICT_REQUIRES_OWNER`.
- Claim classifications: 67 `DIRECT_FACT_PLUS_SUPPORTED_INTERPRETATION`, 37 `SUPPORTED_INTERPRETATION`, 15 `VOX_MANA_INTERPRETATION`.
- `Boros Legion` is a 404. It affects three WR packet facets and five rendered rows. Four rows retain their prior disposition because their actual bridges have independent inspected support; `Feather, the Redeemed` becomes `SOURCE_INTAKE_REQUIRED` because the only routed facet requires the unverified Feather leadership-lineage fact.
- `Planeswalker's Guide to Gatecrash: Part 2` exposes only an unusable shell. It affects eight RG packet facets and five rendered rows. Four rows retain their prior disposition; `Ruric Thar, the Unbowed` becomes `SOURCE_INTAKE_REQUIRED` because both routed Ruric/Ghor facets require that unavailable article.
- The pre-existing Glint/Atarka limitation remains the third `SOURCE_INTAKE_REQUIRED` row.
- Broken URL count and source-intake row count are deliberately not equated.
- No rewrite is proposed. A `REMEDIATION_LIKELY` result is a later calibration candidate, not authorization to change copy.

## Risks / uncertainties

- Thirteen identities retain router-level source limitations: WG, Bant, Esper, Grixis, Jund, Naya, Yore, Glint, Dune, Ink, Witch, WUBRG, and Colorless.
- Two official routes need source maintenance/intake; the existing canon corpus was not edited.
- The Boros novel source remains an uninspected source record. Aurelia has independent inspected support; Feather does not.
- Forty-nine remediation-likely rows include several classes of finding, especially generic/repeated Play modal composition. The evidence pass does not decide final replacement language or whether every candidate should ultimately change.

## Tests run

- `node research/build-vm561-sound-play-evidence-audit.mjs` — PASS: 37 packets, 119 rows, 73 Sound, 46 Play, 4 suppressed, 76 local sources/ledgers, 28 Wizards URLs, 26 inspected, 2 unavailable.
- `node scripts/vm561-sound-play-evidence-audit-tests.mjs` — PASS QA-0: exact catalog text/printing/Oracle parity; row contracts; all references; checksum validation; exact broken-route consequences; aggregate count parity; two byte-stable regeneration passes; protected-surface diff check.
- Evidence generator byte-stability digest: `1d426f7ff53c22392ecce27431e878ca72c1cccb9cf4f5f2ca43b4946ad9fcef`.
- Workbook inspection — PASS: 119/73/46/37/4 formulas, final 65/49/3/2/0/0 disposition counts, 67/37/15 classification counts, zero formula-error matches.
- Workbook render review — PASS: all five sheets rendered; Summary and sampled evidence tables are readable, wrapped, frozen, and color-coded.
- Protected-surface audit — PASS: zero runtime, catalog, relationship, generated product data, existing review workbook, placement, or `docs/research/canon/` changes.

## Not touched

- Sound or Play tile/modal prose.
- Approved Sound/Play relationships, card selections, or exact printings.
- Runtime code, runtime catalogs, generated product data, placement/scoring/qualification, or VM-559 deployment state.
- The existing 37-sheet VM-559 review workbook.
- Any file under `docs/research/canon/`.
- Git push, merge, deployment, or VM-559 closeout.

## RobDevPass compact implementation packet

### Changed behavior

- Repository research visibility only: new packets, ledger, source inspection/reconciliation, summary, QA script, and evidence workbook.
- Authority owner: raw certified identity claims plus opened underlying sources for meaning; committed Scryfall bulk for exact card facts; current production catalogs only for rendered row identity/text.
- Producer: `research/build-vm561-sound-play-evidence-audit.mjs`, with a separate testing-workbook exporter.
- Existing machinery reused: VM-560 router, current catalogs/composition, raw claim/source registries, committed Scryfall bulk, and the established four-row suppression rule.

### Protected behavior

- All current player-facing prose and relationships, runtime/catalog/generated product data, exact printings, placement and identity semantics, canon research files, and VM-559 release state remained unchanged.
- Non-goals maintained: no source intake, canon reorganization, rewrite, swap, deletion, runtime work, or deployment.

### Realistic risks and implemented states

- Risks: authority laundering, broken official sources, broad claims automatically entailing narrow card bridges, generic modal duplication, suppression-count drift, exact-printing drift, and evidence-generator nondeterminism.
- Implemented audit states: independent inspected corroboration, unavailable route, uninspected source record, source-intake disposition, Vox-authority insufficiency, modal redundancy, and four repetition classes.
- Environment limitation: official web inspection records page-body metadata/checksums and claim-bounded notes; it does not create new local canon captures.

### Evidence and remaining judgment

- Deterministic evidence is in the QA output, workbook, summary, 37 packets, 119-row ledger, and route reconciliation.
- Owner judgment remains only for authorizing the later calibration phase and deciding which evidence findings warrant player-facing change. No White/Azorius/Lorehold proposals were begun.

## RobQAPass readiness

### Change classification

- QA tier: QA-0 documentation/research artifact validation.
- Changed behavior: evidence visibility and testing artifacts only.
- Protected behavior intentionally untouched: runtime, current prose/relationships, source authority, generated product data, placement, existing workbook, and canon corpus.

### Tests selected

- Test: exact 37/119/4 structural coverage. Reason: prevents packet, rendered-row, or suppression loss. Result: PASS.
- Test: catalog/Scryfall/source/checksum parity. Reason: prevents the audit from drifting from current product inputs or inventing card facts. Result: PASS.
- Test: official-route reconciliation. Reason: converts the two real source failures into exact claim/row consequences. Result: PASS.
- Test: two-pass byte stability. Reason: prevents nondeterministic research churn. Result: PASS.
- Test: workbook formula scan and rendered sheet review. Reason: the evidence workbook is a visible testing deliverable. Result: PASS.
- Test: protected-path diff audit. Reason: evidence scope explicitly freezes runtime, semantics, and canon. Result: PASS.

### Tests intentionally skipped

- Suite: runtime browser journeys, placement certification, all-37 dossier replay, network failure, responsive UI, and deployment suites.
- Why not required: no runtime, placement, product data, interaction, styling, route, or deployment behavior changed.
- Last relevant baseline: VM-559 implementation handoff `docs/handoffs/2026-08-16-0014-codex-vm559-authored-card-media-resolution.md`; VM-559 remains open and is not recertified here.

### CPU-heavy validation

- `NOT REQUIRED`

### Self-QA rendered evidence

- Deterministic case: evidence workbook Summary plus sampled Rendered Rows, Identity Facets, suppression appendix, and definitions sheets.
- Viewport: generated spreadsheet PNG previews at 0.8 scale.
- Actual rendered result: counts reconciled, long evidence cells wrapped, headers/frozen panes legible, status coloring visible, no formula errors.
- Interaction checked: workbook formula evaluation and static sheet rendering; no live product interaction was in scope.
- Visual/copy verdict: PASS for testing-artifact usability; current product copy remains merely quoted for audit.

### Manual findings converted to invariants

- Finding: raw IDs/derived copies were at risk of being treated as evidence. Defect class: authority laundering. Regression invariant: independent corroboration counts only opened underlying source lineages.
- Finding: tile and modal could repeat without additional player value. Defect class: modal redundancy. Regression invariant: every row records separate tile/modal roles and the full three-arrow bridge.
- Finding: two official source routes are unusable. Defect class: source maintenance. Regression invariant: exact affected facets/rows and necessity-based dispositions are fixed in QA.
- Finding: four approved Play records do not render as review rows. Defect class: cross-surface suppression ambiguity. Regression invariant: primary ledger remains 119 and appendix remains exactly 4.

### Remaining owner judgment

- Whether to authorize the calibration/proposal phase.
- Priority and intake path for Feather, Ruric Thar, and the existing Glint/Atarka source gap.
- Which of the 49 remediation-likely findings should become player-facing changes after calibration.

### Owner review commands / routes

- Open the VM-561 evidence workbook and review its Summary sheet plus any row of interest.
- Read `docs/research/archscry-sound-play-audit/evidence-summary.md`.
- Read `docs/research/archscry-sound-play-audit/official-route-reconciliation.md` for the two broken official routes.

## Follow-up recommendations

1. Stop here until the owner explicitly authorizes calibration.
2. If authorized, begin with the agreed White/Azorius/Lorehold calibration set using this ledger as evidence, not as replacement-copy authority.
3. Treat source intake as a separate operation; do not smooth over Feather, Ruric Thar, or Glint/Atarka gaps with generic prose.

## Next suggested agent

Planning/content calibration agent only after explicit owner authorization. No runtime or placement agent is indicated by this evidence pass.
