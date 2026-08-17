# VM-568 - VM-565 / VM-567 Owner-Candidate Integration

ID: VM-568

Status: In progress - exact-candidate reconciliation and combined QA

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

