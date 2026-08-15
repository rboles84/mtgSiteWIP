# VM-551 Identity-Card Modal Value Repair Handoff

- Agent name: Codex
- Task requested: Remove redundant Oracle detail from identity-linked voice/play modals and provide deterministic, card-specific explanatory value from the existing approved corpus.
- Related Kanban card: `docs/kanban/in-progress/VM-551-all-37-dossier-closeout-program.md`

## Files reviewed

- `assets/js/index.js`
- `research/apply-vm551-card-content-automatic-approval.mjs`
- `research/build-card-rationale-artifacts.mjs`
- `data/dossier/card-rationale-relationships.source.json`
- `data/dossier/card-rationale-catalog.json`
- `data/dossier/card-voice-relationships.source.json`
- `data/dossier/card-voice-catalog.json`
- `data/dossier/identity-dossier-content.catalog.json`
- Focused VM-551 authority, dossier-integrity, and live UI replay tests.

## Files changed

- `assets/js/index.js`
- `research/apply-vm551-card-content-automatic-approval.mjs`
- `research/build-card-rationale-artifacts.mjs`
- `data/dossier/card-rationale-catalog.json`
- `data/dossier/card-voice-catalog.json`
- `scripts/vm551-card-rationale-authority-tests.mjs`
- `scripts/vm551-card-content-authority-tests.mjs`
- `scripts/vm551-dossier-content-integrity-tests.mjs`
- `scripts/vm551-all-37-live-ui-replay.mjs`
- This handoff, its index, the VM-551 Kanban record, and board summary.

## What changed

- Identity-linked voice/play dialogs no longer render a separate Oracle text or excerpt block. Ordinary, non-identity card-detail callers retain the existing rules-detail path.
- The runtime now uses committed `modal_explanation` content only. Voice and play headings are role-specific, and missing identity context fails closed rather than falling back to a generic identity profile.
- The existing builders materialize modal context deterministically for 37 voice records and 50 displayed play relationships. Existing claim/source/printing/validator provenance remains authoritative; no parallel provenance system was added.
- Blossoming Bogbeast uses the owner-supplied proverb/cultural explanation while preserving its exact `soc` collector 264 printing authority and `witherbloom_claim_0019` chain.
- Existing Dina and Grand Arbiter source explanations survive canonical rebuilds and receive an approved table-level takeaway.

## Rendered evidence

- Blossoming Bogbeast: `This earthy proverb turns a bog creature into everyday Witherbloom shorthand for clumsiness. It reflects a culture whose language is rooted in bodies, living essence, and natural components.`
- Dina, Essence Brewer: `Dina turns a sacrificed creature into a card, life, and growth through +1/+1 counters. That concrete exchange shows Witherbloom treating life and death as usable forces in play. At the table, this can mean metabolic pressure where every gain, loss, and small body feeds the engine.`
- Call the Spirit Dragons: `The line imagines Tarkir's re-formed clans as distinct draconic embodiments. It gives this reading a voice of distinct traditions present together without becoming interchangeable.`
- Grand Arbiter Augustin IV: `Grand Arbiter makes Azorius rule-setting concrete by reducing the cost of your white and blue spells while increasing the cost of opponents' spells. At the table, this can mean restricted action, procedural pressure, and clean enforcement.`

## Decisions made

- Reused current source locators, relationship IDs, certified claim IDs, exact-printing fields, approval status, and validator-version conventions.
- Treated 37 + 50 as machine validation over the approved corpus, not as 87 new writing or research tasks.
- Kept canonical card facts supplementary and omitted the redundant Oracle block only for identity-linked callers.
- Preserved the last successful placement-engine certification rather than recomputing it for presentation-only changes.

## Risks / uncertainties

- No evidence gap was found among the 37 voice or 50 displayed play relationships.
- The owner still needs to perform the final two-case presentation check. VM-551 is not closed by this handoff.

## Tests run

- Node syntax checks for changed runtime, builders, and tests: PASS.
- `npm.cmd run test:card-rationales`: PASS; 37 identities, 50 runtime records.
- `npm.cmd run test:vm551-card-content-authority`: PASS; 37 voice records, zero unresolved.
- `npm.cmd run test:vm551-dossier-integrity`: PASS.
- `npm.cmd run test:vm551-visual-review`: PASS; 37 identity cases and 11 featured cases.
- `npm.cmd run validate:source-generated`: PASS with the two pre-existing JESKAI/MARDU model-owned warnings.
- `npm.cmd run lint:js`: PASS.
- `npm.cmd run test:frontend-smoke`: PASS.
- Focused live replay: Witherbloom desktop/mobile PASS; WUBRG desktop/mobile PASS; Azorius desktop PASS.
- `git diff --check`: PASS.

## Not touched

- Gate A, placement model, scoring, mappings, routing, qualification, stopping, refinement, Matrix calculations, persistence, schemas, identity semantics, WUBRG presentation, or Bogbeast selection.
- No exhaustive placement, 5,000-journey, synthetic, mutation, or recovery suite.
- No push, merge, deployment, migration, empirical validation, or new research.

## Follow-up recommendation

Run only:

```powershell
npm.cmd run review:vm551 -- --case=witherbloom
npm.cmd run review:vm551 -- --case=wubrg
```

## Next suggested agent

Owner presentation review, followed by acceptance/integration closeout if both cases pass.
