# Archscry Sound/Play Research Index

Status: Current catalog for the owner-accepted VM-559 / VM-563 release

Accepted product candidate: `52fdd86155c8a47f5ac8650fe9d92a8f5010ca07`

This directory preserves the research, evidence, decisions, and QA behind Archscry's **Cards That Sound Like This** and **Cards That Play Like This** surfaces. It is a navigation layer, not a new semantic authority.

The machine-readable entry points are:

- [`artifact-registry.json`](artifact-registry.json) — artifact roles, provenance, lifecycle, inputs, consumers, and regeneration rules.
- [`current-release.json`](current-release.json) — the small pointer to the currently accepted Sound/Play state.

## Authority order

1. `data/dossier/card-voice-relationships.source.json` and `data/dossier/card-rationale-relationships.source.json` own current player-facing Sound/Play relationships and copy.
2. Committed Scryfall grounding and media records own exact card, Oracle, printing, face, and image-candidate facts.
3. The source router and VM-561 evidence materials help locate and evaluate identity/card evidence. They do not replace the underlying sources they cite.
4. VM-562 calibration and VM-563 remediation artifacts record how and why accepted decisions were made. They are decision history, not editable production inputs.
5. QA JSON, spreadsheets, summaries, and handoffs are derived verification or owner-review artifacts. They are never semantic authority.

## Common future tasks

### Add or audit a Sound card

1. Start with [`source-router.md`](source-router.md) and locate the identity's current governed route.
2. Open the underlying Vox Mana and official sources. Do not cite the router as proof when the underlying source is available.
3. Use [`card-evidence-ledger.json`](card-evidence-ledger.json) as the three-level evidence model: routing authority, underlying evidence, then the bounded audit inference.
4. Verify the exact printing and flavor text in committed Scryfall records.
5. Apply the writing and bridge tests in [`prose-calibration.md`](prose-calibration.md).
6. Compare the proposed relationship against the accepted corpus in [`vm563-final-remediation-manifest.json`](vm563-final-remediation-manifest.json).
7. Never infer a relationship merely because a card shares colors with an identity.

### Add or audit a Play card

Follow the same route, but verify actual Oracle behavior and the player's concrete decision or sequence. The Play tile must explain what the card does here; the modal must add card-specific identity understanding rather than repeat Oracle text or a shared composer.

### Explain why an existing card is present

Start with the final VM-563 manifest, follow its relationship ID and evidence status into the VM-561 ledger/identity packet, then inspect the cited underlying source and committed Scryfall record. Derived copies of one source lineage are not independent corroboration.

### Replace a card

Preserve the old decision as historical evidence, create a truthful new relationship/provenance record, regenerate through the owning producer, and update the current accepted pointer only after review. Do not overwrite rejection history. The Dune / Scour from Existence rejection and Dune-Brood Nephilim replacement are the controlling example.

## Important boundaries

- Do not move these materials into `docs/research/canon/`.
- Do not edit a workbook, manifest, generated catalog, audit, or handoff as though it were production authority.
- Do not use VM-561's original disposition as current production truth after VM-563 superseded that decision.
- Do not collapse four-color, WUBRG, or Colorless evidence boundaries into a universal official philosophy.
- Do not regenerate the frozen VM-551 owner-review packet to match later production. It remains a historical snapshot; the active VM-563 sources and manifest supersede its Dune / Scour row.

## Preserved layers

| Layer | Primary artifacts | Correct use |
| --- | --- | --- |
| Production authority | Sound/Play relationship sources; committed Scryfall records | What the site currently says and renders; exact card facts |
| Reusable evidence | Source router; 37 identity packets; evidence ledger; source inspection/reconciliation | Future card audits, additions, evidence checks, and drift prevention |
| Decision history | VM-562 calibration; VM-563 manifest/summary/source intake; handoffs; rejection history | Why copy/cards were accepted, narrowed, replaced, or rejected |
| QA and owner review | Corpus-QA JSON; suppression appendix; evidence/final workbooks | Regression verification and owner review only |
