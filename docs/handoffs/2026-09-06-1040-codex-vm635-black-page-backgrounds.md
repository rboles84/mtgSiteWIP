# VM-635 — Black public backgrounds and authored share image

Agent: Codex
Task requested: Implement the Owner-approved designated-background replacement and stop at Owner Review.
Branch: codex/vm-635-black-page-backgrounds
Admission baseline: cc6c0de157419ff0271b94dfcf87013bfba2af8d

## Files reviewed and pre-flight

Read RobDev/RobQA skills and usage guides, their frozen gates, workflow, current board/index, VM-634's implementation/accepted closeout, relevant Guide/atmosphere and official-art decisions, route ownership, all public route heads/background shells, shared and route CSS, metadata/HTML validators, asset manifest, and existing artwork references. Main was clean at admission with one registered checkout. Existing vm-623, vm-625, and font-upgrade branches were unrelated; one VM-635 branch was created in the existing checkout.

Recent work: VM-634 is integrated and keeps the philosophy strip hidden. Existing procedural ambience and official identity art are established protected behavior. Recently changed Home markup/styles must retain that visibility guard. Known risks are residual responsive/CSS requests, nested-route metadata omissions, and a CSS cascade that leaves an opaque colored base. No identity or Scryfall audit is authorized.

## What changed and why / RobDev packet

- Authority and owner: the explicit Owner-approved scope; authored public HTML and shared/route CSS own the backdrop and social metadata.
- Changed behavior: all public background pictures are removed from active HTML; targeted CSS image values become none over a shared black base. Existing image files remain in place. Share metadata uses a new versioned 1200x630 black/gold PNG.
- Producer: the neighboring authored SVG, existing vector sigil, and committed fonts are rendered by scripts/build/build-social-preview.mjs using a local @napi-rs/canvas installation. No ImageGen, runtime dependency, remote art, package/lockfile change, or licensing substitution is involved.
- Reuse and narrow seam: existing background containers, tokens, CSS layering, and HTML/metadata validation remain authoritative. The focused source-preservation check protects the scoped removal and unchanged artwork. The offline share renderer exists because crawlers need a raster preview.
- Protected consumers: all route content/layout/navigation, procedural stars/glows, textures/overlays, reduced-motion behavior, panels, typography, entire identity-hero tree, artwork mappings/credits/fallbacks, Scryfall/card rendering, all existing JS/data, and VM-634's hidden SVG strip.
- States and risks: removal is effective in initial HTML without JavaScript and at every viewport. No user toggle or reactivation exists. Original assets remain directly addressable for rollback; this is not a hosting purge. Nested CSS paths and share references are checked across all public routes.
- Non-goals and stop conditions: no semantic, placement, storage, identity-art, Scryfall, artwork resolver, image-fallback, panel, motion, or layout changes; stop for unrelated work or protected behavior becoming necessary.
- Documentation: current asset manifest marks the old background inventory/queue historical and dormant. Other artwork guidance is unchanged.

## Decisions / restoration

Use black plus preserved procedural effects for everyone. Keep all existing art files byte-for-byte unchanged. Restore only the old background picture/source blocks, background CSS values, and social metadata from the admission baseline; advance affected cache keys. Do not restore whole files over subsequent changes. Preserve VM-634 hidden state throughout. The new share graphic can remain if only page backgrounds are restored.

## Tests selected

- npm.cmd run lint:html: existing markup/asset expectations and changed cache references.
- npm.cmd run test:route-metadata: extended the existing route list to cover all 16 public route heads and the new preview URL.
- node scripts/check-page-backgrounds.mjs --baseline=cc6c0de157419ff0271b94dfcf87013bfba2af8d: active source scan, scoped non-background HTML preservation, tracked image/JS/data preservation, hidden strip, cache keys, and PNG dimensions.
- git diff --check: patch hygiene; inspect the CSS diff for unchanged effects and layout.
- Bounded in-app browser navigation: Home, Archscry, Maze, Guide, Strategium, Apocrypha, and Privacy represent distinct backdrop rules. Inspect computed black base, remaining artwork loads and star containers; a local no-store server logs requests to prove no retired images load. Inspect one official image and the share PNG for availability.
- Share PNG artifact inspection and repeat-render digest: authored typography/sigil export correctness and reproducibility.

## Development evidence

HTML, all-route metadata, and focused source-preservation checks pass before candidate creation. Home's in-app browser reports rgb(0, 0, 0), preserved stars, a loaded vector logo, and the philosophy wrapper hidden with display:none. The rendered share image was inspected: gold sigil/title, cream subtitle, black base, 1200x630, no raster art input.

Environment limitation: local Edge headless exits before launch; one causal check confirmed the same startup issue. The final renderer uses canvas/Skia, and the working in-app browser supplies actual loading evidence. No Edge retry, screenshot matrix, or broad suite is needed. This is a tool environment limitation, not a product failure.

## RobQA readiness / exact-candidate evidence

QA tier: QA-1 presentation. Execution: SAME-AGENT DISTINCT PHASE, Codex; presentation/source-loading change with no semantic, governance, security, migration, or interaction change requiring independent review. A distinct post-commit phase must re-read the actual candidate diff and acceptance criteria and rerun the selected checks.

RobDev: READY for candidate creation. Candidate: PENDING. RobQA: PENDING. Owner: PENDING. Integration: PENDING.
CPU-heavy validation: NOT REQUIRED.
Browser justification: objective image requests and resolved CSS cascade cannot be established solely by string absence. Browser scope is loading/cascade, not subjective visual judgment or engine behavior.
Interaction checked: route loads only; no changed interactive behavior.
Manual findings converted to invariants: none; the approved background preference is not an existing defect report.
Skipped: engine, journey, synthetic/mutation/recovery suites, viewport matrices, screenshot/visual-regression and animation-fidelity suites; no changed contract justifies them. Semantic certification baseline is unaffected.

## Remaining Owner judgment and shortest review

Open the branch locally at /, /archscry/, /maze/, and /apocrypha/; judge the black background with the existing glow and content balance. Open /assets/img/social/vox-mana-share-v1.png and judge the new share composition. PASS if these presentations suit the intended site direction; report a bounded visual adjustment otherwise. No manual artwork audit or card/identity retest is needed.

## Risks / uncertainties

Subjective balance remains Owner judgment. Social platforms may retain previously cached previews until they recrawl the page; the new URL versions the image. No production deployment or platform-cache invalidation is claimed. No implementation correctness blocker is currently known.

## Not touched

All existing artwork files including identity-hero/official, other identity art, SVG logos/icons/textures/overlays, mappings, credits, fallbacks, all JS and data, Scryfall integration, dossier resolvers, semantic/placement authorities, interaction/state contracts, and the hidden philosophy implementation.

## Follow-up recommendations / next suggested agent

Owner: review presentation and ACCEPT or REJECT VM-635's exact passed candidate. Codex: integrate only after acceptance; retain one branch and candidate-review chain.

## Related Kanban card, docs, and gates

- [VM-635](../kanban/in-progress/VM-635-black-page-backgrounds.md)
- [Asset manifest](../design/asset-manifest.md)
- [RobDev skill](../../.agents/skills/robdev/SKILL.md), [frozen RobDev gate](../dev/RobDevPass.md)
- [RobQA skill](../../.agents/skills/robqa/SKILL.md), [frozen RobQA gate](../qa/RobQAPass.md)
- [Workflow](../reference/workflow.md)

## Files changed / Git accounting

Pending committed candidate; derive material, evidence-only, and final-branch scopes from Git before delivery.
