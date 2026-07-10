# Vox Mana Deep Audit Report

Date saved: 2026-06-29
Agent: Codex
Related card: VM-428

## Executive Verdict

Vox Mana reads more like a coherent, heavily governed product beta than a vibe-coded demo. The strongest evidence is the source/generated data discipline, route ownership docs, meaningful tests, and specific product language around Commander identity, Maze search, source provenance, and "not a deckbuilder" scope.

Overall confidence: medium-high for static/code evidence, lower for live production behavior because browser visual inspection could not be completed in this environment and live Supabase RLS remains unproven.

Biggest strength: unusually strong source-of-truth and validation culture for a static fan app.

Biggest risk: production trust depends on backend policy proof that is not fully verifiable from the repo, especially `profiles` RLS and VM-422 deck-link live RLS.

Most urgent fix: restore/export canonical Supabase profile schema/RLS docs and run the VM-422 live RLS harness with real test users.

Production-ready today: not for a broad trust-sensitive launch. It is credible as a public beta/static fan tool with clear waivers.

## Scorecard

| Area | Score | Justification |
|---|---:|---|
| Product Coherence | 83/100 | Clear Commander identity/search/source product, with some dense terminology and unverified visual/mobile behavior. |
| AI-Sounding Content Risk | 29/100 | Mostly specific and authored; some poetic abstraction, but little generic filler in active routes. Lower is better. |
| Technical Coherence | 73/100 | Strong docs/data contracts/tests, but large files, global/static architecture, and template-heavy rendering add maintenance debt. |
| Security Readiness | 72/100 | No service-role secret found and many guards exist; live RLS, edge throttling, CDN integrity, and dev dependency issues need attention. |
| QA/Test Maturity | 76/100 | Better than typical prototype coverage; visual baselines, browser E2E, CI, and live Supabase proof are the gaps. |
| Production Readiness | 68/100 | Good static deploy basis, but no tracked CI workflow, stale visual waivers, perf waiver, limited SEO/monitoring. |
| Buyer/Client Confidence | 74/100 | The process impresses; the live-backend proof and file-size/complexity story would be the buyer's hard questions. |

## What Holds Up Well

- Vox Mana is clearly framed on Home as "a Commander identity and taste compass" and explicitly "Not a deckbuilder" in `index.html:115` and `index.html:116`.
- The route map is coherent: Home, Archscry, Maze, Strategium, Apocrypha, Privacy, Terms, and Library alias are documented in `docs/architecture/project-atlas.md` and `docs/architecture/route-ownership-matrix.md`.
- The source/generated split is real, not decorative. `data/identity-layers.json` is canonical, while `data/factions.json` and `data/placement-model.json` are generated outputs.
- The test surface is meaningful. The audit pass ran and passed JS lint, HTML validation, source/generated guardrails, frontend smoke, parser, deck-link, Maze Finds, placement, builder, mode, Maze contract/search tests, request dedupe, and presentation snapshots.
- Security-aware work is visible: deck links validate allowed providers, browser writes are private-only, and SQL RLS policy artifacts exist for VM-422.

## What Feels AI-Generated Or Vibe-Coded

| File/path | Example | Assessment | Why | Severity | Action |
|---|---|---|---|---|---|
| `index.html:115` | Commander identity/taste compass | Human-authored feel | Specific, bounded, immediately useful. | Positive | Keep. |
| `maze/index.html:91` | Search by instinct, syntax, or shape | Human-authored feel | Branded but grounded by exact modes and examples. | Positive | Keep. |
| `apocrypha/index.html:99` | "Where Vox Mana shows its work." | Human-authored feel | Short, trust-building, product-specific. | Positive | Keep. |
| `archscry/index.html:132` | "listens for color, tempo, appetite for risk..." | Mixed | Useful framing, but abstract/poetic density may slow new users. | Low | Add plain-language helper text near first run. |
| `terms/index.html:123` | "AI is used to evaluate responses..." | Mixed/stale risk | Current quick path is deterministic; terminal is hidden. Legal copy may overstate active AI use. | Medium | Align terms with current feature flags. |
| `assets/img/logo.html:1205` | Placeholder Placement | AI-ish/prototype artifact | Tracked placeholder/demo HTML, not referenced by active routes. | Low | Archive or clearly label as non-runtime design artifact. |

## Security Findings

### Medium - Supabase profile RLS/schema traceability is incomplete

Evidence: the frontend upserts/selects `profiles` in `assets/js/shared.js:522`, and runtime errors reference missing `docs/supabase-profile-update.sql` in `assets/js/shared.js:530`. The prior security review says repo-only review cannot prove live RLS because that SQL is absent in `docs/architecture/supabase-frontend-security-review.md:17`.

Scenario: a bad live policy could expose or mutate saved profile rows.

Production impact: blocks production confidence for account save.

Suggested fix: restore/export the canonical `profiles` schema and RLS source; verify `auth.uid() = id` for select, insert/upsert, update, and clear flows.

### Medium - VM-422 deck-link live RLS is not yet proved

Evidence: local SQL is strong, but the recent handoff says live RLS/account verification remains pending credentials in `docs/handoffs/2026-06-29-0143-codex-vm427-main-promotion-sweep.md:57`, and `test:deck-links:live` was not run in `docs/handoffs/2026-06-29-0143-codex-vm427-main-promotion-sweep.md:93`.

Scenario: private deck links may rely on policies that are correct in repo but not applied or not equivalent in production.

Production impact: blocks production confidence for account deck-link features.

Suggested fix: run `scripts/vm422-live-rls-check.mjs` with service-role and two test-user credentials, then record the evidence.

### Medium - Archived `guild-recruiter` edge function has weak throttle identity if re-enabled

Evidence: the function allows `Access-Control-Allow-Origin: *` in `supabase/functions/guild-recruiter/index.ts:70`, prioritizes caller-supplied `session_id` in `supabase/functions/guild-recruiter/index.ts:89`, and uses that body field at `supabase/functions/guild-recruiter/index.ts:430`.

Scenario: a direct caller can rotate `session_id` values and bypass the intended per-minute bucket.

Production impact: does not block current hidden-terminal production; blocks safely reopening the terminal.

Suggested fix: derive the primary throttle key from server-side identity or IP; treat client session ids as secondary metadata.

### Medium - Dependency audit found dev-tool vulnerabilities

Evidence: `npm audit --audit-level=moderate` reported 18 vulnerabilities: 17 moderate OpenTelemetry-related vulnerabilities through Lighthouse/Sentry dependencies, and one high `xlsx@0.18.5` advisory with no fix. These packages are dev dependencies in `package.json:48-54`.

Scenario: build/test tooling can be exposed to malicious local files or compromised dependency behavior.

Production impact: tooling risk, not direct browser runtime risk.

Suggested fix: replace or isolate `xlsx`, evaluate Lighthouse downgrade/upgrade options, and document accepted dev-only residual risk.

### Low - Supabase UMD CDN is loaded without SRI

Evidence: Supabase UMD loads from jsDelivr in `archscry/index.html:8` and `maze/index.html:8`; no `integrity` attribute was found.

Scenario: CDN compromise or unexpected upstream change can affect client behavior.

Production impact: low-to-medium supply-chain risk for public routes.

Suggested fix: self-host or pin with SRI.

### Low - Web3Forms feedback key is public and hCaptcha is disabled

Evidence: `assets/js/vm-feedback.js:12-16` includes the Web3Forms endpoint/key and `hcaptchaEnabled: false`.

Scenario: spam or automated abuse of the feedback form.

Production impact: does not expose privileged backend data, but can create operational noise.

Suggested fix: enable hCaptcha provider-side and client-side when abuse appears or before higher-traffic launch.

### Informational - Supabase anon key is expected browser surface

Evidence: `assets/js/shared.js:6-34` exposes Supabase URL and anon key to browser code.

Assessment: not automatically a secret leak. Safety depends on RLS and edge function policies.

## Testing And QA Findings

Current coverage is better than most prototype or AI-built app examples: parser cases, placement golden paths, generated/source guardrails, deck-link contracts, Maze storage, frontend route smoke, and manual QA docs are real.

Missing or weak:

- Live Supabase RLS proof.
- Browser E2E for complete Archscry and Maze flows.
- Keyboard-only verification.
- Mobile visual proof.
- Bad-network/data-file behavior.
- CI automation.
- Accepted visual baselines.

`npm test` was not run during the audit because `research/run-tests.js` imports the live-bias suite, which writes reports under ignored outputs. That would have conflicted with the original read-only instruction.

Browser inspection was attempted via a local static server, but `chrome-launcher` reported no Chrome installations. The local server was stopped, and browser/mobile/visual findings were marked unverified.

## Architecture And Maintainability Findings

The architecture is understandable but heavy:

- `assets/js/index.js`: 3,907 lines.
- `research/research-init.js`: 3,294 lines.
- `assets/css/archscry.css`: 3,167 lines.
- `assets/css/maze.css`: 2,330 lines.

The static/no-bundler approach is deliberate and documented, not accidental. It reduces deployment complexity but increases global coupling and makes route-local discipline important.

There is extensive `innerHTML`, but many dynamic paths use escaping, including `assets/js/index.js:1753`, `research/research-ui.js:191`, and `assets/js/strategium.js:1027`. No `eval`, `new Function`, or `insertAdjacentHTML` was found in active searches.

Process debt:

- `README.md:3` points to `docs/workflow.md`, but that file is absent.
- Generic `npm run lint`, `npm run build`, and `npm run validate` are missing, though narrower scripts exist.

## Production Readiness Gaps

- Deployment: `.nojekyll` and `CNAME` exist, and `CNAME` contains `voxmana.io`; good for GitHub Pages.
- CI: `.github/workflows` has zero tracked workflow files, so CI is absent.
- Monitoring/error reporting: no Sentry/Rollbar/analytics-style runtime monitoring found.
- Feedback: good feedback route exists, but it is not monitoring.
- SEO/social: most route heads have title/favicon/viewport; only Apocrypha has a meta description. No Open Graph/Twitter/canonical metadata found across major routes.
- Performance: prior handoff records Home Lighthouse Performance 87 and Accessibility 96 in `docs/handoffs/2026-06-29-0143-codex-vm427-main-promotion-sweep.md:88`.
- Backup/export: local Reading Finds has copy/export fallback in `maze/index.html:313`, but Supabase account data backup/export is not documented.
- Rollback: Git history and handoffs are good, but there is no concise production rollback checklist.

## Top 10 Fixes, Ranked

| Rank | Fix | Why | Evidence | Effort | Risk reduction | Suggested VM ticket |
|---:|---|---|---|---|---|---|
| 1 | Prove Supabase RLS end to end | Account trust depends on backend policy | `supabase-frontend-security-review.md:37` | Medium | High | `VM-429-live-supabase-rls-proof` |
| 2 | Restore/export profile SQL | Repo cannot prove `profiles` safety | `shared.js:530` | Small | High | `VM-430-profile-policy-source` |
| 3 | Add CI workflow | Prevents regression between local sweeps | no tracked workflow files | Medium | High | `VM-431-ci-validation-gate` |
| 4 | Reconcile visual baselines | Current visual checks fail as stale | VM-427 handoff | Medium | Medium | `VM-432-visual-baseline-acceptance` |
| 5 | Add browser E2E smoke | Covers real happy/unhappy paths | browser QA pending in handoffs | Medium | High | `VM-433-browser-critical-flow-smoke` |
| 6 | Harden archived terminal before re-enable | Prevent abuse/cost leakage | `guild-recruiter/index.ts:89` | Medium | Medium | `VM-434-terminal-edge-hardening` |
| 7 | Address dev dependency audit | Build tooling has known advisories | `package.json:54` | Medium | Medium | `VM-435-dependency-audit-cleanup` |
| 8 | Reduce Archscry/Maze file size | Easier maintenance/review | file-size evidence | Large | Medium | `VM-436-route-module-slimdown` |
| 9 | Add route SEO/social metadata | Improves public launch polish | route heads | Small | Low | `VM-437-route-metadata-pass` |
| 10 | Add production runbook | Monitoring, backup, rollback clarity | docs gap | Small | Medium | `VM-438-production-runbook` |

## Things Not To Overreact To

- The Supabase anon key is not automatically a secret leak. It is browser config; the real question is RLS.
- The huge local Scryfall raw file is ignored by `.gitignore` and documented as local-only.
- Placeholder strings in active inputs are normal. The serious placeholder cluster is in `assets/img/logo.html`, which appears unreferenced by live routes.
- Missing generic `npm run build` is not inherently a defect for a static no-bundler site. The repo has targeted build scripts.
- Use of `innerHTML` is not automatically XSS here; many paths escape content. It remains a review surface, not a proven exploit.

## Where This Audit Might Be Wrong

- Browser visual/mobile inspection could not be completed because no Chrome install was available to the local browser tooling.
- The deployed `voxmana.io` site, DNS, GitHub Pages settings, Supabase project settings, Web3Forms dashboard, and live database policies were not verified.
- The original audit was read-only, so no handoff/kanban artifacts were created until this save pass.
- Some content judgments are subjective; concrete security/test/build findings are separated from those judgments.

## Recommended Next Codex Prompt

```text
Read AGENTS.md and perform the required pre-flight. Do not redesign Vox Mana. Create a safe implementation plan for the top audit findings: live Supabase RLS proof, restoring/exporting profiles schema/RLS, adding a minimal GitHub Actions validation workflow, and reconciling visual baseline status. Do not modify runtime product behavior until the plan identifies exact files, commands, risks, and acceptance checks. Preserve generated-data boundaries and do not edit lore/card facts.
```

## Commands Run During The Audit

- `git -c core.excludesfile= status --short --branch`
- `npm.cmd run lint:js`
- `npm.cmd run lint:html`
- `npm.cmd run validate:source-generated`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd run test:parser`
- `npm.cmd run test:deck-links`
- `npm.cmd run test:maze-finds`
- `npm.cmd run test:placement`
- `npm.cmd run test:builder`
- `npm.cmd run test:mode`
- `node research/maze-query-contract-tests.js`
- `node research/maze-search-tests.js`
- `node research/scryfall-request-dedupe-tests.js`
- `npm.cmd run test:presentation-snapshots`
- `npm.cmd audit --audit-level=moderate`

## Files Changed By Save Pass

- `docs/audits/2026-06-29-vox-mana-deep-audit.md`
- `docs/kanban/done/VM-428-vox-mana-deep-audit-report.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-06-29-1856-codex-vm428-deep-audit-report.md`
- `docs/handoffs/HANDOFF_INDEX.md`
