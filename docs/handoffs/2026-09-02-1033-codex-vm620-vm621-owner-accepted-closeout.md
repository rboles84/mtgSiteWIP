# VM-620 + VM-621 Owner-Accepted Lifecycle Closeout

## Agent name

Codex

## Task requested

Record the Owner's direct chat acceptance of VM-620 and VM-621 at exact combined candidate
`99ad6895400c858a6bfdd9cc99438b577950e4df`; complete lifecycle-only closeout and push the existing branch.
No PR or merge is authorized.

## Files reviewed

- Repo-local RobDev and RobQA skills/usage guides; frozen `docs/dev/RobDevPass.md` and `docs/qa/RobQAPass.md`.
- Workflow and token/reasoning-cost authorities; board, both cards, their plans/inventory/preflight and QA records.
- Handoff index and relevant VM-619, VM-620 and VM-621 implementation, remediation and final-review handoffs.
- Paired-card precedent: `docs/handoffs/2026-08-22-2150-codex-vm580-vm585-integration-closeout.md`.
- Lifecycle-only precedent: `docs/handoffs/2026-09-01-1916-codex-vm619-owner-accepted-closeout.md`.
- Exact candidate inventories, raw/Git hashes, Driver provenance, worktree/branch state and prior rendered evidence.

## Files changed

Lifecycle documentation only after candidate binding:

- `docs/kanban/done/VM-620-shared-field-guide-beacon-visual-language.md` (moved from `in-progress/`).
- `docs/kanban/done/VM-621-contextual-field-guide-guided-reading-expansion.md` (moved from `in-progress/`).
- `docs/kanban/board.md`.
- `docs/qa/2026-09-01-vm620-guide-beacon-owner-review.md`.
- `docs/qa/2026-09-01-vm621-guided-reading-owner-review.md`.
- `docs/qa/2026-09-02-vm620-vm621-combined-owner-review.md`.
- `docs/handoffs/HANDOFF_INDEX.md`.
- This handoff.

## What changed and why

Both cards move to **Done — Owner Accepted / RobQA PASS** under explicit Owner acceptance of the same
combined product state. QA records bind that acceptance, preserve honest accessibility coverage, and
supersede earlier review-pending language without rewriting the historical review or VM-619 evidence.
A single paired lifecycle-only commit follows the existing combined-card precedent; cards remain separate.

## Exact candidate and ownership

- Branch: `codex/vm-620-shared-guide-beacon`.
- VM-620 scope A: `db2c6ee3a77368ce25ec8994c66d791f83f8b1f9`.
- VM-621 scope B: `99ad6895400c858a6bfdd9cc99438b577950e4df`.
- Combined Owner-Accepted deployable tip: `99ad6895400c858a6bfdd9cc99438b577950e4df`.
- Unchanged local `main` and `origin/main`: `9c572edb0232161c860ea199a508a73f99a5d6fd`.

VM-620 alone is **not authorized for integration**. Only the combined accepted VM-620 + VM-621 state is
eligible for a separately authorized future integration. No PR/merge is authorized now.

Scope A production/validation files:

- `archscry/index.html`.
- `assets/css/archscry.css`.
- `assets/css/home.css`.
- `assets/css/maze.css`.
- `assets/css/guide-beacon.css`.
- `assets/js/shared/guide-beacon.js`.
- `assets/js/archscry/index.js`.
- `assets/js/archscry/runtime/actions.js`.
- `assets/js/archscry/runtime/boot.js`.
- `assets/js/archscry/runtime/dev-review.js`.
- `assets/js/archscry/runtime/interview.js`.
- `assets/js/archscry/runtime/questionnaire.js`.
- `assets/js/maze/research-init.js`.
- `assets/js/maze/research-ui.js`.
- `maze/index.html`.
- `scripts/topbar-browser-smoke.mjs`.
- `scripts/vm616-maze-context-recovery-browser.mjs`.
- `scripts/vm616-maze-context-recovery-tests.mjs`.
- `scripts/vm619-guide-walkthrough-browser.mjs`.

Scope B production/validation files:

- `assets/css/guide-walkthrough.css`.
- `assets/js/archscry/runtime/dossier-view.js`.
- `guide/index.html`.
- `guide/reading/index.html`.
- `index.html`.
- `assets/js/guide/intro-walkthrough.js`.
- `assets/js/guide/reading-walkthrough.js`.
- `package.json`.
- `scripts/frontend-smoke.mjs`.
- `scripts/lint-frontend-js.mjs`.
- `scripts/validate-frontend-html.mjs`.
- `scripts/vm615-reading-dossier-onboarding-tests.mjs`.
- `scripts/vm615-reading-guide-browser.mjs`.
- `scripts/vm620-guide-beacon-browser.mjs`.
- `scripts/vm620-guide-beacon-tests.mjs`.
- `scripts/vm621-guide-walkthrough-browser.mjs`.
- `scripts/vm621-guide-walkthrough-tests.mjs`.

Mixed Home/dossier markup, explicit destination changes, registration wiring and VM-620 destination
assertions remain intact in scope B after automatic approval rejected index-only intermediate
reconstruction. No such patch was applied and no working product/test file was rewritten. This is a
file-level overlap, not a claim that the hunks were technically inseparable. VM-620 retains visual and
Beacon-test ownership; VM-621 owns Home/dossier configurations and guided launch intent.

## RobDev compact packet

- **Outcome/current behavior:** accepted combined product already implemented/tested; this change binds lifecycle records and publishes its existing branch.
- **Locked decisions:** exact candidate frozen; both cards Done/Owner Accepted; combined-only integration eligibility; no PR/merge.
- **Owning authority/producer:** direct Owner acceptance; Git immutable candidates; authored Kanban/QA/handoff records own lifecycle state.
- **Existing machinery:** same branch/worktree, existing cards, review records and paired lifecycle-closeout precedent; no new mechanism.
- **Changed behavior:** lifecycle metadata and branch publication only.
- **Protected behavior:** all product/test bytes, Driver vendor/hashes, shared lifecycle, three explicit guided URLs, static direct Guides, four-step configurations, motion/focus/history/cleanup, no persistence/completion/telemetry.
- **Consumers/blast radius:** board readers, future reviewers and integration agents; no runtime consumer changes.
- **Relevant states:** accepted combined versus non-integrable VM-620 component; branch/remote alignment; local evidence remains untracked.
- **Smallest complete implementation:** Done moves, exact-SHA acceptance/QA records, handoff/index, narrow integrity checks, lifecycle-only commit and branch push.
- **Non-goals/stop:** no product repair, history rewrite, extra guided route, VM-617, main update, PR or merge. Stop after push verification.

## RobQA closeout packet and tests run

**QA tier:** QA-0 lifecycle documentation with QA-5 exact-candidate/publication integrity; prior accepted
product evidence covers QA-2/QA-3. Changed behavior and protected contracts are listed above.

| Selected check | Reason | Result |
| --- | --- | --- |
| `npm.cmd run test:vm619-guided-reading` | Preserve accepted Maze/shared lifecycle/vendor/static-route contract | PASS |
| `npm.cmd run test:vm620-guide-beacon` | Preserve exactly eligible Beacon owners, finite motion and statelessness | PASS |
| `npm.cmd run test:vm621-guided-reading` | Preserve explicit Home/dossier launch, four steps and final approved copy | PASS |
| Candidate comparison excluding `docs/` | Prove all tracked product/test files unchanged after binding | PASS |
| Raw SHA-256 and Git blob snapshot comparison | Preserve 36 product/test files and 43 captured untracked evidence files | PASS; all 79 match |
| Driver.js 1.8.0 SHA-256 comparison | Preserve exact local vendor and recorded provenance | PASS |
| `git diff --check` | Lifecycle whitespace/patch integrity | PASS |
| Worktree and main-ref checks | Preserve single active worktree and untouched main | PASS before publication |
| Staged path isolation, post-commit equality, remote alignment and final status | Prevent output/product staging and verify authorized branch-only publication | Required immediately before/after commit; final SHA/results reported in terminal handoff |

Driver SHA-256, unchanged:

- JavaScript: `c6ade0b831c6c043daf480861208cd2fa45ea4aac581cc8bb8e234281c011ddf`.
- CSS: `d095d440021fcf133ad46d37f18a2745fb76440f14f5208d17e203c039f765c9`.

**Tests intentionally skipped:** no fresh browser/render pass for documentation-only changes. Existing
final combined static/browser and rendered evidence remains valid because all accepted product/test bytes
match. See `docs/qa/2026-09-02-vm620-vm621-combined-owner-review.md` for exact commands and prior results.
Placement, parser/calibration, engine/journey, mutation, synthetic, live-service and certification suites
are out of scope; no protected semantic behavior changed. **CPU-heavy validation: NOT REQUIRED.**

**Self-QA rendered evidence:** reused unchanged final-review evidence: real Home Step 1/4 desktop/mobile
render sanity and six VM-620 witnesses; mobile 390x844 and reflow 720x500 browser containment.
Home, dossier and Maze explicit Beacons reach their four-step orientations, then normal static Guides.
Keyboard, focus, Close/Escape/Previous/Next/Done, history/replay/failure and motion evidence is recorded in
the combined QA report. No new UI was introduced by closeout.

**Manual findings converted to invariants:** Beacon/interaction mismatch is covered by destination and
guided-launch contracts; both exact Home copy corrections and four-step count are pinned by VM-621.
Existing VM-619 primary-action focus and completion-focus regressions remain unchanged.

**Accessibility:** automated/browser accessibility contracts PASS; Owner keyboard/visual/mechanical
review PASS. Real screen-reader validation **NOT PERFORMED**, optional future audit/nonblocking by
Owner decision. No NVDA/browser versions, screen-reader PASS or VoiceOver coverage are inferred.
Historical VM-619 accessibility evidence is untouched.

**Remaining owner judgment / review routes:** none for this accepted candidate. Optional screen-reader
audit is not a closeout gate. No new review round requested; PR/merge needs separate authorization.

## Decisions made

- Preserve two immutable product scope commits and add one docs-only closeout commit.
- Keep VM-620 visual ownership separate from VM-621 guided configuration ownership despite mixed files.
- Keep exactly three guided owners: Home `/guide/?guided=vox-mana-intro`, dossier
  `/guide/reading/?guided=dossier-reading`, Maze `/guide/maze/?guided=maze-search`.
- Direct `/guide/`, `/guide/reading/` and `/guide/maze/` stay static.
- Do not stage, remove or regenerate local Owner Review outputs.

## Risks / uncertainties

- Real screen-reader coverage remains unperformed; accepted nonblocking limitation, not a PASS claim.
- Scope A is not independently deployable/authorized for integration.
- Branch publication does not authorize PR/merge; no main mutation is part of this task.

## Not touched

Accepted production/test files, shared walkthrough helper, Driver vendor and recorded hashes, VM-619
evidence, focus/history/reduced-motion behavior, storage/account/progress/completion/telemetry,
query/Placement/Reading Finds semantics, VM-617, `/guide/reference/` (still absent), local main/origin/main,
PR/merge, and all five untracked review directories:

- `outputs/owner-review/`.
- `outputs/vm616-owner-review/`.
- `outputs/vm619-owner-review/`.
- `outputs/vm620-owner-review/`.
- `outputs/vm620-vm621-final-review-20260902/`.

## Follow-up recommendations / next suggested agent

Stop after lifecycle branch publication and final integrity verification. A future integration agent may
act only on separate explicit Owner PR/merge authorization for the combined state. Do not start VM-617.

## Related Kanban card, docs, or plans

The two Done cards and three QA records listed above; the VM-620 Beacon inventory, VM-621 expansion
preflight, final combined Owner Review handoff and frozen RobDev/RobQA gates.

## Commit and publication state at authoring

- Sole registered worktree: `C:/dev/voxmana.io`.
- Lifecycle closeout commit: this documentation-only commit; SHA available after creation.
- Push and remote alignment: pending at authoring, mandatory final verification before completion report.
- Final response reports lifecycle SHA, unchanged main refs, remote alignment and clean tracked state.
- PR/merge: not authorized and not performed.

## Subsequent Owner-authorized integration — 2026-09-02

Agent: Codex. The Owner now explicitly authorizes a PR from
`codex/vm-620-shared-guide-beacon` to `main` and a **merge commit**, with no squash or rebase.
This supersedes the earlier PR/merge stop only; both cards remain Done — Owner Accepted.

Preserve all three exact commits:

- VM-620 scope: `db2c6ee3a77368ce25ec8994c66d791f83f8b1f9`.
- Combined accepted candidate: `99ad6895400c858a6bfdd9cc99438b577950e4df`.
- Lifecycle closeout: `63cc57590ec5ddfba2c0c665049ddd2e7c58c71b`.

VM-620 alone must never be integrated. The complete combined state through the lifecycle closeout is
the minimum PR content. This additive integration record changes only this handoff, its index and the
board's authorization note; all product/test files remain identical to the accepted candidate.

RobDev compact packet: GitHub PR/merge and local main synchronization are the changed repository
behavior; explicit Owner authorization and Git refs are authoritative. Reuse the same branch, sole
worktree and existing GitHub merge mechanism. Consumers are main and its downstream deployment workflow;
no production implementation, generated data or vendor edit is permitted. Risks are partial integration,
history rewriting, accidental evidence staging and merge drift. Check exact ancestry, expected PR head,
merge parents, candidate-tree equality and final clean status; stop if any cannot be proved.

Preflight reviewed: current skill guides/frozen gates, workflow/cost policy, handoff/index, board, both
Done cards, VM-621 preflight and final combined QA. The local and remote branch were aligned at
`63cc57590ec5ddfba2c0c665049ddd2e7c58c71b`; main/origin/main were
`9c572edb0232161c860ea199a508a73f99a5d6fd`. Local branch review confirmed only the three accepted commits
ahead, no tracked dirt, unchanged product/test bytes and no output paths in the PR diff. The Owner's
exact-candidate review/acceptance and direct merge instruction supply the review disposition; no new
product judgment is requested.

RobQA: QA-5 exact-history integration of the already Owner-Accepted QA-2/QA-3 state; documentation QA-0.
Fresh pre-PR PASS: `test:vm619-guided-reading`, `test:vm620-guide-beacon`,
`test:vm621-guided-reading`. These protect vendor hashes, static direct routes, three eligible Beacons,
four-step configurations, final copy and shared lifecycle. Accepted browser/rendered evidence above
remains valid at identical bytes. No new UI change or manual finding. CPU-heavy validation NOT REQUIRED;
unrelated engine/Placement/parser/semantic suites remain skipped. Real screen-reader testing remains
NOT PERFORMED, optional/nonblocking; no new accessibility certification is claimed.

Post-merge gate: rerun the three narrow contracts; verify all three SHAs are ancestors, merge has two
parents, integrated non-documentation tree matches the accepted candidate, local main/origin/main and
remote main agree, both cards remain Done — Owner Accepted, direct Guide routes stay static, Driver
hashes remain unchanged, `/guide/reference/` is absent and VM-617 remains unstarted. Verify all five
Owner Review directories remain untracked and their captured evidence bytes unchanged. No branch or
worktree deletion is requested. These checks and the resulting PR/merge/main SHAs are reported in the
final integration response; they are pending at the time this pre-merge record is committed.

Not touched: all protected behavior listed above, accepted product/test files, all review outputs,
VM-617 and additional guided routes. Follow-up/next agent: none for this request; stop after successful
merge/synchronization verification. Deployment success is not implied merely by merge completion.
