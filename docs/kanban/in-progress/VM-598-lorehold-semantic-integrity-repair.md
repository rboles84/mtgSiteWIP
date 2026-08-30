# VM-598 — Lorehold Semantic Integrity Repair

ID: VM-598  
Status: Closed — Owner accepted for local SIRF baseline reconciliation; no CRIT-001 recertification or push  
Type: Source-owned semantic and Commander-presentation repair  
Area: Lorehold dossier / precon source / generated catalogs  
Priority: Launch-critical correctness

## Summary

Apply the owner-approved Lorehold Semantic Audit: retain Archaeomancy and the Red/White preservation-versus-discovery tension, bound Commander lanes to their actual sources, preserve `history fighting back` as Vox Mana table language, and repair the two Native precon records to official Wizards evidence.

## Locked Decisions

- The canonical center is historical investigation through records, artifacts, fieldwork, ancient magic, and spirits.
- Spirit Witnesses / Graveyard-Leaves, Relic Reconstruction, and History & Spells are the three primary exploration directions; Combat History remains a commander-supported expression, not a fourth primary lane.
- `historic` retains its Magic rules meaning; it is not a synonym for historical.
- Native Lorehold relationship ranks before exact Red/White, then Stretch.
- Lorehold Legacies / Osgir and Lorehold Spirit / Quintorius are the Native products.
- Preserve the certified claim floor, placement/scoring, routing, aliases, and every non-Lorehold identity.

## Acceptance Criteria

- [x] Approved dossier source and generated catalog separate canonical center, Commander lanes, and Vox Mana translation.
- [x] Public composition removes `historic payoffs` and generic artifact/Spirit/graveyard universalization while retaining `history fighting back`.
- [x] Native precon source records use official Wizards decklists and retain the correct face commanders.
- [x] Owner-review repair removes unsupported Osgir evaluation language, moves the opening identity thesis to a raw-profile-owned override, and makes the Exact-color rationale use `red-white` rather than `Boros` in rendered copy.
- [x] Test the Fit and How This Plays distinguish philosophical tension, broad role, emotional pressure, and table experience while retaining `History fights back`.
- [x] Focused deterministic test proves source altitude, terminology, Native ordering, and generated catalog integrity.
- [x] Actual Start Here `Possible directions` composition and What to Look For expose the same three accepted primary lanes; rejected generic lanes do not render.
- [ ] Owner reviews the real Lorehold dossier; no commit or push is authorized.

## Files Likely Impacted

- `data/dossier/identity-dossier-content.source.json` and generated catalog
- `data/precons/vox-mana-precons.source.json` and generated catalog
- Lorehold presentation/foundation composition
- dossier catalog builder and focused Lorehold regression test
- required Kanban and handoff records

## Risks

- The shared all-37 browser replay currently has concurrent-worktree failures outside Lorehold’s source repair: desktop rationale-hover cleanup and the existing VM-565 `glossary_artifacts` expectation. Do not change unrelated runtime or glossary authority to make this card pass.
- The frozen VM-595 rescan refuses a dirty dossier-owner population; it must be rerun from a reconciled owner-path baseline.
- Shared precon fallback process language remains deferred to its shared owner (`assets/js/archscry/dossier/precons.js`), already under concurrent VM-595/SIRF work; VM-598 did not add a Lorehold-only exception.

## Owner-Review Delta Register (pending SIRF; no framework edits)

- A. `historic` versus `historical` terminology collision.
- B. Provenance rebinding requires more than an official URL; it does not validate pre-existing prose.
- C. Card affiliation and precon inclusion are separate relationships.
- D. A raw-profile-owned displayed identity field was needed even though broad architecture is frozen.
- E. Concurrent baseline drift can block global validation and leave only focused controls available.
- F. Accepted-decision-to-render contract drift: source/catalog assertions can pass while a downstream composer renders an unapproved lane. Future RobQA should compare accepted taxonomy and recommendation contracts directly with rendered sets.

## Stop Condition

Stop at Owner Review. Do not commit, push, recertify CRIT-001, or reopen the accepted Lorehold semantic model without contradictory official evidence.
