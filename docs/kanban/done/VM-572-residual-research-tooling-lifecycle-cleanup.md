# VM-572 - Residual Research / Historical Tooling Lifecycle Cleanup

ID: VM-572
Title: Residual Research / Historical Tooling Lifecycle Cleanup
Status: Done
Type: Repository tooling lifecycle
Area: Research, durable scripts, authority tooling
Priority: Medium
Created: 2026-08-20

## Summary

Complete the bounded lifecycle review deferred by VM-570: move genuinely durable operational tooling out of `research/`, delete certified completed one-offs, reconcile stale operational references, and preserve genuine semantic-readiness evidence.

## Source

- Owner-approved VM-572 lifecycle plan.
- VM-570 JavaScript architecture cleanup and inventory.
- Current package commands, tests, authority contracts, artifact registry, and closed VM-551/558/561/563/565 evidence.

## Acceptance Criteria

- Four surviving tools move to `scripts/build/` or `scripts/lib/` with executable references corrected.
- Eleven completed or stale-reference-only VM-era tools are deleted after their current operational references are reconciled.
- VM-563 registry entries distinguish curated authority from frozen evidence without invented regeneration commands or provenance churn.
- Governed producer and evidence outputs remain byte-stable.
- `research/` contains zero executables and exactly 39 semantic-readiness evidence fixtures.
- No runtime, product, dependency, broad QA, or Pass 2 work occurs.

## Verification

- Static import, package-target, deleted-path, and research-inventory integrity.
- Syntax checks for moved and directly affected executable files.
- Focused VM-551, VM-558, and VM-561 producer/audit checks.
- No generated, evidence, product, or runtime drift.
- `git diff --check` and clean synchronized closeout.

## Non-Goals

No runtime decomposition, product changes, generated-data meaning changes, dependency work, Node/toolchain governance, broad QA modernization, browser QA, or Pass 2.

## Closeout

- Moved the VM-551 discovery-education packet builder and automatic adjudication producer to `scripts/build/`; moved their shared evidence helper and VM-565 vocabulary authority to `scripts/lib/`.
- Classified the two Packet 3 tools and `vm551-evidence-approval.mjs` as `LEAVE_FOR_LATER`. Their EOL/locator ambiguity remains intentionally unresolved and they are not certified as durable authority by VM-572.
- Deleted six originally certified historical scripts plus five additional stale tools identified by focused lifecycle checks: the VM-551 card-content producer, VM-558 owner-review builder, both VM-551 identity-dossier producers, and the VM-561 evidence builder.
- Removed only stale live package, test, registry, and authority references. Historical cards, handoffs, frozen evidence, provenance, and accepted artifacts remain unchanged.
- The superseded checks failed on accepted Ink, Dimir, Packet 2, locator, and post-VM-563 Sound state; those failures drove deletion rather than product-data or validator rewrites.
- PASS: syntax for nine surviving/direct-consumer files; all 87 package targets; all registry Node targets; deleted-tool reference scan; 69-record discovery catalog integrity; JSON parsing; `git diff --check`; 39 research fixtures and zero research executables.
- Zero product, canonical data, generated artifact, audit, report, or frozen evidence drift.
