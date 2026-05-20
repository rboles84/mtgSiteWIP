# VM-032 - White Mono Adjacent Family Assertion Triage

ID: VM-032
Title: White Mono Adjacent Family Assertion Triage
Status: done
Type: Triage / regression / adjacent-fit
Area: Archscry, placement, mono White
Priority: high
Created: 2026-05-17

## Summary

Review the failed White mono adjacent assertion discovered during `VM-031` and determine whether it is:

- a test normalization fix
- a presenter/pair-family policy fix
- or a real White adjacency bug

Lorehold is a valid `WR`-family adjacent, so this card must not assume that `LOREHOLD` in White-adjacent output is automatically a mono-boundary escape.

## Source

- `docs/kanban/done/VM-031-mono-rollout-acceptance-sweep.md`
- `docs/handoffs/2026-05-17-1554-codex-vm031-mono-rollout-acceptance-sweep.md`
- `docs/handoffs/2026-05-17-1558-codex-vm032-white-mono-boundary-follow-up-card.md`
- `docs/handoffs/2026-05-17-1201-codex-vm026-white-mono-stabilization-pass.md`
- `docs/handoffs/2026-05-17-0229-codex-vm023-mono-identity-layer-refactor-white-pilot.md`

## Problem

The `VM-031` sweep confirmed that the mono White golden result still resolves to `W`, and its adjacent matches are currently `LOREHOLD` and `WU`.

The failed assertion treated White adjacents as if they had to match only the narrow label set:

- `WU`
- `WB`
- `WG`
- `WR`

But `LOREHOLD` is a valid `WR`-family adjacent. That means the failure may be caused by the assertion expecting pair keys only, rather than allowing guild/college analogs within the same pair family.

So the open question is not "did White escape mono-adjacent boundaries?" It is "should the sweep normalize adjacent results by pair family, or should the product explicitly prefer `WR` over `LOREHOLD` in this context?"

## Acceptance Criteria

- The triage explicitly classifies the failure as one of:
  - test normalization fix
  - presenter/pair-family policy fix
  - real White adjacency bug
- The work documents that `LOREHOLD` is a valid `WR`-family adjacent and should not be treated as an automatic mono-boundary escape.
- If the issue is test normalization, the follow-up implementation should normalize adjacent validation by pair family before failing.
- If the issue is presenter policy, the follow-up implementation should define whether White-adjacent `WR` should prefer `WR` or allow `LOREHOLD`.
- If the issue is a real adjacency bug, the follow-up implementation should describe the exact behavioral defect beyond the current label mismatch.
- `VM-031` remains a failed sweep with triage history preserved until the correct follow-up action is implemented and re-run.

## Decision

Recommendation: `test normalization fix`.

Why:

- Raw placement results intentionally preserve the actual adjacent faction key and name, not just a pair-family label.
- Adjacent dossier rendering also uses the actual faction record and actual faction name.
- External Commander routing already normalizes guild/college analogs by family for links, and explicitly maps `LOREHOLD` to the `WR` / `Boros` family.
- No inspected runtime path currently suggests that the product requires collapsing adjacent display labels from `Lorehold College` to `WR` or `Boros` before considering them valid.

This means the current failure is best explained by the acceptance assertion comparing against too narrow a label set, not by a proven White scoring or adjacent-selection defect.

## Evidence

- Raw White result currently returns adjacent matches `LOREHOLD` and `WU`.
- `LOREHOLD` and `WR` share the same routing family:
  - EDHREC slug `boros`
  - MTGDecks slug `boros`
  - routing label `Boros`
- The placement contract stores actual adjacent expression identity, including `faction`, `faction_name`, `expression_key`, and `expression_name`, so the presenter can distinguish guilds, colleges, and mono colors without inferring them from pair labels alone.

## Next Implementation Path

If the repo follows this recommendation, the next implementation should stay minimal:

- update the mono adjacent sweep assertion to validate pair-family membership, not only raw faction keys
- preserve current runtime adjacent output and scoring behavior
- optionally tighten QA wording so acceptance language says `WR-family` instead of only `WR`

Files likely to change for that path:

- `assets/js/quick-reading-tests.js`
- `docs/reference/manual-test-cases.md`

Files that should not change for this path:

- runtime placement/scoring files
- adjacent presenter files
- commander guidance content files

## Outcome

Complete.

The chosen path was a test normalization fix. The mono adjacent assertions now validate allowed pair-family membership instead of requiring exact raw faction keys, which allows a valid `WR`-family adjacent like `LOREHOLD` to pass for mono White without changing displayed identity labels or runtime behavior.

## Guardrails

- Do not assume the current failure is a scoring bug without first resolving the family-alias question.
- Do not widen into adjacent-fit presentation redesign unless the triage concludes this is a presenter-policy issue.
- Do not rewrite dossier prose or commander guidance copy unless a separate card is created.
- Do not mix this with unrelated dossier warning cleanup.
- Keep any eventual follow-up surgical and source-first.

## Testing Notes

- Inspect White adjacent output with family normalization in mind.
- Re-run `npm run test:placement`
- Re-run `npm test`
- Confirm whether the failure disappears once `LOREHOLD` is treated as `WR` family, or whether an additional presenter/policy mismatch remains.

Results:

- `npm.cmd run test:placement` passed with `20 factions, 20 golden paths`
- `npm.cmd test` passed
- White still accepts `LOREHOLD` as adjacent output without collapsing the displayed adjacent identity to `WR` or `Boros`

## Human Review

Yes - this is now a boundary-interpretation and product-policy question, not a confirmed mono-placement defect.

## Notes

This card was created because `VM-031` resolved as `FAIL with follow-up cards`, not because White lost its primary placement.

Path note: the filename is preserved for continuity with the original follow-up handoff, but the triage framing above supersedes the initial "boundary leak" assumption.
