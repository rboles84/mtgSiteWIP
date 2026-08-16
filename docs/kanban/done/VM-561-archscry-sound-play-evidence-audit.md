# VM-561 - Archscry Sound/Play Evidence Audit

ID: VM-561

Status: Done

Current gate: Evidence pass complete. Stopped before calibration or rewrite proposals; no Sound/Play rewrite is authorized.

Type: Documentation / source-grounded content audit

Area: Archscry Cards That Sound Like This / Cards That Play Like This

Priority: High

Created: 2026-08-16

## Product Outcome

Create a complete, source-grounded review record for the 119 currently rendered Sound/Play rows so later owner calibration can distinguish sound copy, unsupported claims, weak bridges, repetitive composition, and genuine source-intake needs without changing current product content.

## RobDevPass Contract

- Current behavior: VM-560 routes all 37 identities to their controlling evidence chains, and VM-559 exposes 73 rendered Sound rows plus 46 rendered Play rows, but no current artifact audits every tile/modal statement against the underlying identity and card evidence.
- Locked decisions: the router and audits are navigation, not claim proof; every substantive finding must follow them to the underlying source; official MTG facts, Vox Mana authority, supported interpretation, card facts, and gameplay evidence remain distinct.
- Owning authority: certified raw identity claims and their underlying source records own current Vox Mana meaning; committed canonical Scryfall records own exact card, printing, flavor, Oracle, and type facts; existing Sound/Play text is the audited subject, not evidence for itself.
- Authoritative producer: none. The packets and ledger are testing/research artifacts and never become semantic or runtime authority.
- Existing machinery: reuse the VM-560 router, current production catalog/composition rules for row identity, certified source ledgers, committed Scryfall indexes, and the existing review-workbook row contract without editing that workbook.
- Changed behavior: research visibility only—new evidence packets, ledger, findings summary, Kanban, and handoff records.
- Protected behavior: all Sound/Play prose, relationships, exact-printing selections, runtime/catalog/generated data, workbook contents, placement, scoring, qualification, identity semantics, and files under `docs/research/canon/`.
- Consumers: the later owner-authorized calibration/rewrite phase and source-intake planning.
- Smallest complete implementation: 37 uneven evidence packets plus one exact 119-row ledger with source paths, bridges, classifications, findings, and allowed dispositions; deterministic coverage/source validation and a concise aggregate summary.
- Non-goals: no prose rewrite, replacement sentence, relationship swap, card deletion, runtime change, source intake, canon reorganization, placement work, or VM-559 release action.
- Stop conditions: missing underlying authority, contradiction requiring owner judgment, inability to reproduce 119 rendered rows, or any need to infer around a source gap. Record the applicable insufficiency/conflict disposition instead of improvising.

## Acceptance Criteria

- Exactly 37 identity packets exist and cover the expected identity keys once each.
- Each packet records only source-supported core facets, tensions/contrasts, anti-drift boundaries, limitations, official corroboration, and Vox Mana synthesis boundaries; facet counts may differ.
- Exactly 119 rendered rows are present: 73 Sound and 46 Play, with the four known non-rendered Play relationships remaining outside the rendered-row ledger.
- Every row preserves three distinct levels: `ROUTING_AUTHORITY` (claim, relationship, and source/evidence-ledger IDs), `UNDERLYING_EVIDENCE` (exact source path or official source, anchor, and concise established fact), and `AUDIT_INFERENCE` (the card-to-facet bridge, classification, and limitation).
- Every row records current tile/modal text, exact card/printing, relevant facet IDs, card and identity evidence, gameplay evidence where applicable, an explicit evidence bridge, claim classification, all requested finding dimensions, and one allowed disposition.
- A broad certified identity claim never entails a narrower card interpretation automatically; every card-to-facet bridge must independently survive the accuracy, authority, bridge, echo, deletion, swap, modal-value, facet-collapse, overclaim, and human-language tests.
- Tile and modal may share evidence but must serve different player functions. Mark `MODAL_REDUNDANT` when the modal merely paraphrases the tile/flavor/Oracle text, adds only generic identity language, or supplies no new card-specific or facet-specific understanding; record an honest content-design limit rather than inventing novelty.
- Cross-card repetition is classified as `LEGITIMATE_SHARED_CONCEPT`, `GENERIC_TEMPLATE_REUSE`, `FACET_COLLAPSE`, or `EVIDENCE_LIMITATION`; lexical similarity alone never requires a rewrite.
- Derived repetition never launders authority. Common provenance is counted as one lineage, and independent corroboration requires a genuinely separate underlying source.
- Every modal bridge records the explicit chain `verified card fact or exact flavor -> supported identity facet -> why this particular card helps explain that facet`; any unsupported arrow is a finding.
- The four precon-suppressed approved Play relationships appear in a separate reconciliation/coverage appendix and never expand the primary rendered-row ledger beyond 119.
- Every substantive claim cites an opened underlying file/evidence ID or primary official source. Router, audit, workbook, rendered dossier, generated output, handoff, and existing prose are never used as proof.
- No weak row receives invented replacement copy.
- Aggregate counts reconcile exactly to the ledger, and the summary names source-limited identities, unsupported/overclaimed text, repetition/templates, source-intake needs, owner conflicts, and rows sound as written.
- Runtime, workbook, current catalogs/prose/relationships, generated data, placement, certified identity data, and `docs/research/canon/` remain unchanged.

## Branch / Worktree

Continue the existing single worktree on `codex/vm559-archscry-media-reliability` from VM-560 checkpoint `b7c808029421668f4b947759c467a250230b5592`. No additional branch or worktree is authorized or required.

## RobQAPass Classification

QA-0. Validate exact identity/row coverage, row-type reconciliation, required-field completeness, allowed classifications/dispositions, referenced local source existence, aggregate-summary parity, workbook legibility, and protected-path immutability. No runtime, placement, journey, browser, or deployment suite is justified.

## Completion Evidence

- VM-560 checkpoint: `b7c808029421668f4b947759c467a250230b5592`.
- Identity packets: 37/37.
- Rendered ledger: 119/119 = 73 Sound + 46 Play.
- Suppression appendix: 4/4.
- Underlying evidence: 76 readable local sources/ledgers; 28 distinct Wizards URLs evaluated, 26 inspected, 2 unavailable/inadequate.
- Broken-route consequence: `Feather, the Redeemed` and `Ruric Thar, the Unbowed` newly require source intake; eight other affected rows retain their dispositions on independent inspected evidence.
- Final dispositions: 65 no-change, 49 remediation-likely, 3 source-intake, 2 insufficient Vox Mana authority, 0 insufficient evidence, 0 owner conflict.
- Claim classifications: 67 direct fact plus supported interpretation, 37 supported interpretation, 15 Vox Mana interpretation.
- QA-0: `node scripts/vm561-sound-play-evidence-audit-tests.mjs` PASS, including two byte-stable regeneration passes and zero protected-surface changes.
- Handoff: `docs/handoffs/2026-08-16-1147-codex-vm561-sound-play-evidence-audit.md`.
