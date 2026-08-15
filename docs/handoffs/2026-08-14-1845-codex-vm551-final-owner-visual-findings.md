# VM-551 Final Owner Visual Findings Handoff

## Agent name

Codex

## Task requested

Resolve only the three final owner-observed visual findings on the canonical `codex/vm551` branch: simplify WUBRG identity presentation without changing legitimate five-color terminology, replace the Witherbloom land voice with the certified Blossoming Bogbeast printing, and make card-detail clicks reveal canonical information rather than repeat the tile rationale. Recertify three deterministic owner cases plus the existing all-37 replay and stop without placement work, push, merge, or deployment.

## Files reviewed

- Current VM-551 handoff index, active Kanban record, board, and recent targeted-remediation handoff.
- WUBRG presentation composition and deterministic replay checks.
- Packet 1 card-voice source, printing authority, runtime catalog, supersession audit, and builders.
- Shared Scryfall local-card lookup/cache, Archscry card-detail dialog, and all-37 browser replay contract.

## Files changed

- WUBRG player-presentation normalization and replay assertions.
- Witherbloom card-voice source, exact-printing authority, generated runtime/audit artifacts, and focused validators.
- Shared Scryfall card cache/local-record composition, card-detail dialog composition, CSS, and modal/cache regressions.
- All-37 replay artifact, active VM-551 Kanban record, board, and handoff index.

## What changed

- WUBRG is now the public identity label in identity labels, headings, summaries, and identity-directed prose. `Five-Color / WUBRG` is not emitted as the public identity label. Legitimate descriptive/catalog language such as `Five-color matters / Domain` remains untouched and is explicitly preserved by tests.
- Witherbloom's public voice now uses `Blossoming Bogbeast`, Oracle ID `30f3c3be-0fe9-463d-a245-e44701aec7f2`, exact `soc` collector 264 printing ID `764054f1-e848-4cee-b623-4861ce15c370`, and its exact printed flavor line. Witherbloom Campus remains superseded audit evidence; Death Begets Life remains rejected.
- The card-detail modal uses the existing canonical card record to show a full image, mana cost when present, type line, Oracle text or committed Oracle excerpt, and the existing Scryfall action. It no longer repeats the tile rationale as its primary content and introduces no new tags, detail schema, authored explanation, or enrichment project.
- The shared local card lookup now merges missing canonical detail fields so a slimmer index cannot erase an Oracle excerpt already supplied by another committed index. Committed excerpts are preferred over unnecessary remote enrichment; a network lookup is attempted only when local text detail is genuinely absent.

## Why it changed

Owner testing found repetitive WUBRG naming, a land card that weakened the intended Witherbloom voice surface, and a detail modal whose main content duplicated the rationale already visible on the tile. The remediation preserves identity/card authority and improves only the player-facing composition and canonical detail plumbing.

## Decisions made

- The WUBRG fix is contextual identity presentation, not a repository-wide ban on the words five-color.
- Oracle ID remains rules identity; exact flavor voice remains printing-specific.
- Modal value comes from already available canonical facts. `oracle_excerpt` is an acceptable offline detail fallback; the modal does not create or paraphrase rationale copy.
- The slimmer-index overwrite found during Green/Witherbloom replay was repaired within the same deterministic card-detail defect class and received a pure merge regression.

## Risks / uncertainties

- No owner-only interpretation remains.
- Some cards do not have a mana cost; the modal correctly omits that empty field while still showing canonical type and Oracle detail.
- The repository's source/generated guard emits its two existing JESKAI/MARDU model-owned warning notes; validation passes and neither warning is related to this task.

## Tests run

- Three deterministic owner cases (`wubrg`, `green-witherbloom-tied`, `witherbloom`): PASS.
- Current-engine all-37 replay at desktop, intermediate, and mobile: PASS; 37 identities, 36 named, Yore intentionally bounded, zero failures.
- Completion matrix/certification: PASS; 621 `PASS`, eight justified `NOT_APPLICABLE`, zero `FAIL` across 629 cells.
- Packet 1/2/3 authority, rationale/voice integrity, provider/Maze parity, visual manifest, model/runtime/questionnaire/result/recovery, source/generated, JS/HTML lint, and frontend smoke: PASS.
- Gate B1 exhaustive validation: PASS; 5,000 journeys, 37 identities, 123 pairs, 6,660 synthetic runs, 881 mutations, 36 responsible primaries.
- Qualified-alternatives contract: PASS across 5,000 deterministic valid journeys.
- Scryfall cache/detail, dossier content-integrity, syntax, and whitespace checks: PASS.

## Not touched

- Gate A.
- Placement constructs, questions, answers, stable IDs, mappings, scoring, ranking, qualification, routing, stopping, refinement, normal journey, or Yore behavior.
- Identity authority, Matrix calculations, persistence/schema contracts, Maze semantics, or provider destinations.
- No new card research, detail schema, rationale copy, branch/worktree, push, merge, deployment, migration, or player validation.

## Follow-up recommendations

Run only:

```powershell
npm.cmd run review:vm551 -- --case=wubrg
npm.cmd run review:vm551 -- --case=green-witherbloom-tied
npm.cmd run review:vm551 -- --case=witherbloom
```

Close VM-551 only after that short visual/product acceptance pass.

## Next suggested agent

Owner visual/product acceptance; Codex only for a narrowly reproduced defect or acceptance closeout.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/VM-551-all-37-dossier-closeout-program.md`
- `docs/audits/vm551-all-37-dossier-closeout/live-ui-witness-replay.json`
- `docs/audits/vm551-all-37-dossier-closeout/surface-completion-matrix.tsv`

## Scoped implementation commits

- `20bfd54` — WUBRG identity-presentation normalization.
- `addf710` — exact-printing Blossoming Bogbeast Witherbloom voice.
- `f592687` — additive canonical card-detail modal and browser contract.
- `8aff732` — local canonical detail-field preservation.
- `a10c933` — committed-excerpt preference and unnecessary-fetch avoidance.
