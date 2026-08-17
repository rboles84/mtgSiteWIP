# VM-568 - VM-565 / VM-567 Owner-Candidate Integration

ID: VM-568

Status: Integration QA complete - merge commit pending

Type: Accepted-candidate integration / release preparation

Area: Archscry dossier education and Start Here presentation

Priority: High

Created: 2026-08-16

## Objective

Produce one clean, owner-reviewable build that contains owner-accepted VM-565 commit
`97989e1be35757b53593c0e3b620648c8d46b05a` and exact VM-567 candidate commit
`697e0c1ba8a655199cb29c2ae11ae0d719e3b449`, while preserving VM-565 as a durable
parent commit and reconciling their shared renderer, replay, and governance files safely.

## Pre-flight Summary

- VM-565 and VM-567 are clean sibling commits from exact base
  `c190be7c7eb49ff55313213dfc2c0b696289537b`.
- VM-565 already carries the completed VM-564 audit baseline and the owner-accepted
  vocabulary, Bant, Boros, and Ink remediation.
- VM-567 removes only the shared Commander preview insertion from Start Here and
  preserves the heading, Commander plan, recommendation authority, media machinery,
  and all other card surfaces.
- The existing `codex/vm-565-final-owner-review` branch and
  `C:\dev\voxmana-vm565-final` worktree own integration. No new branch or worktree is
  permitted or needed.

## RobDevPass Integration Packet

- Product outcome: one build contains both accepted states.
- Owning layers: VM-565 education/card-voice source and presenter changes plus the
  VM-567 shared Start Here interpolation rule.
- Changed behavior: Start Here has no Commander preview descendants; all VM-565
  educational and remediation behavior remains intact.
- Protected behavior: placement, scoring, qualification, identity meaning, Commander
  recommendation data, media projection, all other card surfaces, Sound/Play outside
  the accepted Ink correction, and the exact owner-accepted VM-565 commit.
- Consumers: all 37 dossiers, desktop/mobile Start Here, education renderer,
  card-detail interactions, and deterministic audit/replay harnesses.
- Smallest complete implementation: reconcile exact VM-567 onto VM-565, resolve only
  overlap needed to retain both accepted invariants, rerun combined QA, and document
  the resulting integration commit.
- Stop condition: any conflict requiring new placement semantics, recommendation
  meaning, identity meaning, source authority, media architecture, or unrelated
  dossier redesign.

## RobQAPass Scope

- Tier: QA-2 integration because two independently reviewed shared-presenter
  candidates now coexist.
- Required evidence: exact lineage; focused Bant/Boros/Ink/White desktop and mobile;
  all-37 vocabulary and Start Here replay; hover/focus/tap accessibility; Ink and
  Boros card-detail controls; source/generated boundaries; protected-path diff;
  lint/syntax; and `git diff --check`.
- Heavy placement, journey, mutation, or recovery certification remains unnecessary
  unless reconciliation changes a protected placement contract.

## Acceptance Criteria

- VM-565 exact SHA remains an ancestor of the integration result.
- VM-567 exact change is represented without weakening its zero-card Start Here
  invariant.
- All 37 named/bounded replay rows preserve expected result state; named dossiers keep
  `Start With This Commander Plan` with zero card-bearing Start Here descendants.
- The accepted Enchantress definition and teaching location remain exact.
- Boros three-card controls remain visible and contained on desktop/mobile.
- Ink Sound remains Crystal, Inhuman Princess plus Group Project, with no lands and
  Kynaios and Tiro unchanged as Play-only.
- Candidate is committed locally with a clean worktree; no push, merge to `main`, or
  deployment occurs without owner direction.

## Integration Result

- Continued the existing `codex/vm-565-final-owner-review` branch and worktree; no
  third branch or worktree was created.
- Preserved owner-accepted VM-565 SHA
  `97989e1be35757b53593c0e3b620648c8d46b05a` as first-parent history.
- Merged exact VM-567 candidate
  `697e0c1ba8a655199cb29c2ae11ae0d719e3b449` as the second-parent lineage.
- Product code and the combined all-37 replay merged automatically. Only
  `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md` conflicted; both were
  reconciled additively so VM-564, VM-565, VM-567, and VM-568 records remain.
- Start Here retains its heading, introduction, Commander plan, guidance, glossary
  behavior, and layout while rendering zero Commander preview descendants.

## Combined Validation Result

- Full all-37 desktop replay: PASS, 37 identities / 36 named plus bounded Yore / zero
  failures. Every named dossier retains `Start With This Commander Plan` with zero
  Start Here card tiles, images, card-detail triggers, or media slots.
- White mobile and Bant mobile: PASS, including Start Here absence and education
  hover/focus/Escape/tap-equivalent behavior.
- Boros desktop/mobile authored-card replay: PASS with the same three Play cards and
  visible, contained detail controls.
- Ink desktop/mobile authored-card replay: PASS with Crystal, Inhuman Princess plus
  Group Project as Sound and Kynaios and Tiro unchanged as Play-only.
- VM-565 candidate ledger, education audit, education packet, remediation checker,
  lint, source/generated guardrail, 37 golden paths, and all required
  `.github/workflows/validation.yml` commands: PASS.
- Protected diff from owner-accepted VM-565 over `data/`,
  `assets/js/commander-dossier.js`, and the VM-559 media producer: empty.

## Known Non-Blocking Historical Boundaries

- `research/archscry-dossier-followup-tests.js` still stops at its pre-existing
  obsolete `Why These Cards Echo This Reading` source-string assertion.
- `scripts/vm551-gate-a-owner-qa-tests.mjs` still stops at its pre-existing obsolete
  `loadCachedScryfallNamedCard(card.name)` source-string assertion. Neither suite is
  part of required `validation.yml`; VM-568 did not broaden into historical harness
  maintenance.
- `test:vm559-media-projection` remains outside required CI and reports the accepted
  VM-565 Ink source change against the older global projection: Group Project would
  replace Danitha, Command Tower's occurrence count would fall, and Crystal is absent
  from the frozen raw Oracle snapshot. Runtime Ink resolution passes from the
  dedicated exact card-voice printing source. VM-568 does not alter the media
  producer, frozen raw snapshot, or accepted card semantics.

## Stop Point

Create the exact-history local integration merge commit and a documentation closeout
commit, then stop with one clean build for owner-directed merge. Do not push, merge to
`main`, or deploy in this pass.
