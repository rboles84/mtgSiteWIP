# Phase 1 — Recurring Idea Candidates (from Vox Mana vault)

## 1. Proof Before Polish

**The claim** - A system is not ready because it looks coherent; it is ready when the important risks have named evidence, named gaps, or named waivers.

**Definition** - Polish is treated as presentation, not proof. Release confidence comes from validation notes, visible caveats, and a record of what is still unproven.

**Where it recurs** - Very high recurrence across the vault: `docs/qa/vox-mana-test-plan.md`, `docs/audits/2026-06-29-vox-mana-deep-audit.md`, `docs/audits/2026-06-29-vox-mana-self-snapshot.md`, `docs/strategy/2026-06-30-vox-mana-public-demo-case-study.md`, `docs/qa/visual-baseline-waivers.md`, VM-427 through VM-468 readiness handoffs, and the board/index trail. Broad search found 700+ docs hits around risk, readiness, proof, confidence, waivers, or unproven behavior.

**Why it's ownable** - The vault does not use QA as ceremonial sign-off. It repeatedly treats confidence as an evidence product: what passed, what failed, what was waived, and what still cannot be claimed.

**Blog fit** - QA Field Guide, Learning Lab, Table Talk. Connects directly to "Better tests. Better releases. Less theater." and the idea that QA reduces uncertainty.

**Strength** - High, because it recurs across audits, QA plans, release notes, and strategy docs rather than one isolated post-shaped note.

## 2. Source Beats Surface

**The claim** - If the source of truth cannot support the claim, the product should show less confidence, not generate more copy.

**Definition** - Runtime output, UI copy, and generated artifacts are treated as symptoms or display surfaces, not as authority. Missing evidence becomes a source-intake or follow-up task, not filler.

**Where it recurs** - Very high recurrence in `docs/reference/source-generated-guardrails.md`, `docs/reference/data-contracts.md`, `docs/audits/2026-06-05-vm297-placement-source-of-truth-contamination-audit.md`, `docs/audits/2026-06-29-vox-mana-self-snapshot.md`, `docs/audits/2026-06-30-vox-mana-self-snapshot.md`, `docs/strategy/2026-06-30-loom-foundation-deep-dive.md`, and many source-readiness matrices. Broad search found 600+ docs hits around source-first, canonical, generated/noncanonical, and source-backed framing.

**Why it's ownable** - The distinctive move is not just "cite sources." It is the hard boundary that generated output can be inspected for drift but cannot become evidence for itself.

**Blog fit** - QA Field Guide, Automation Cookbook, Learning Lab. Strong bridge to "Coverage is not confidence" and to posts about test data, AI-generated artifacts, and source-of-truth design.

**Strength** - High, because this is one of the vault's most repeated operating laws and appears in both strategy docs and implementation guardrails.

## 3. Scope Is A Quality Tool

**The claim** - Good scope is not smaller ambition; it is the line that keeps a system honest enough to ship.

**Definition** - The vault repeatedly protects the project by saying what it is not: not a deckbuilder, not a legality checker, not a public community system, not production-proven account storage. Those refusals are quality controls, not hedging.

**Where it recurs** - Very high recurrence in `docs/audits/2026-06-29-vox-mana-self-snapshot.md`, `docs/audits/2026-06-30-vox-mana-voice-audit.md`, `docs/strategy/2026-06-30-vox-mana-public-demo-case-study.md`, `docs/strategy/2026-07-03-account-scope-freeze-reactivation-checklist.md`, `docs/strategy/2026-07-03-loom-v0-v1-naming-concept-seed-decision.md`, VM-422/446/458/461/470 handoffs, and repeated copy-boundary cards. Broad search found 800+ docs hits around scope, boundary, defer, non-goal, and anti-fit language.

**Why it's ownable** - The phrasing and behavior are unusually practical: scope is used to prevent false claims, privacy risk, moderation burden, and product identity drift.

**Blog fit** - QA Field Guide, Table Talk, Learning Lab. Connects to "scope beats scale" and "Use AI like MacGyver, not like an oracle."

**Strength** - High, because it appears as product positioning, release governance, security posture, and copy QA.

## 4. Make Risk Visible

**The claim** - QA does not own the decision; QA owns making the decision impossible to misunderstand.

**Definition** - The vault consistently translates risk into scorecards, waivers, blocked cards, caveats, kill conditions, and proof requirements. The point is to make tradeoffs legible to whoever decides.

**Where it recurs** - High recurrence in `docs/qa/vox-mana-test-plan.md`, `docs/audits/2026-06-29-vox-mana-deep-audit.md`, `docs/strategy/2026-07-03-external-reviewer-two-week-test.md`, `docs/strategy/2026-06-30-vox-mana-public-demo-case-study.md`, `docs/qa/visual-baseline-waivers.md`, VM-446 blocked/live-proof notes, VM-450 visual waivers, and VM-469 reviewer protocol.

**Why it's ownable** - This is not generic "risk management." The vault keeps converting ambiguity into decision artifacts: yellow/red release states, blocker language, reviewer tables, and "do not claim X until Y passes" rules.

**Blog fit** - QA Field Guide, Table Talk. Direct fit for "QA owns quality by making risk visible to the people who decide."

**Strength** - High, because it is both named in the user's known blog-side themes and strongly demonstrated by the vault.

## 5. Small Systems Need Governance

**The claim** - Hobby-scale projects still deserve enterprise-grade habits when the claims, data, or users can be harmed by sloppy assumptions.

**Definition** - The vault applies handoffs, Kanban cards, data contracts, validation gates, RLS proof requirements, and release scorecards to a personal static site. The habit is scaled down, not abandoned.

**Where it recurs** - High recurrence in `docs/handoffs/HANDOFF_INDEX.md`, `docs/kanban/board.md`, `docs/reference/data-contracts.md`, `docs/qa/vox-mana-test-plan.md`, `docs/audits/2026-06-29-vox-mana-deep-audit.md`, `docs/strategy/2026-06-30-vox-mana-public-demo-case-study.md`, and nearly every VM handoff since May 2026.

**Why it's ownable** - The distinctive angle is "enterprise habits at hobby scale" without enterprise theater: file-based process, explicit handoff, deterministic checks, and tiny release gates that fit the project.

**Blog fit** - QA Field Guide, Automation Cookbook, Learning Lab. Direct fit for "Enterprise QA habits at hobby scale."

**Strength** - High, because the repo itself is the evidence: the operating system around the project is as visible as the product.

## 6. Confidence Is Not Coverage

**The claim** - A passing test suite only answers the questions it was designed to ask.

**Definition** - The vault repeatedly distinguishes deterministic checks from browser evidence, live backend proof, mobile/cross-browser validation, visual acceptance, and source freshness. More tests are useful only when they reduce the right uncertainty.

**Where it recurs** - High recurrence in `docs/qa/vox-mana-test-plan.md`, `docs/audits/2026-06-29-vox-mana-deep-audit.md`, `docs/audits/2026-07-04-vox-mana-delta-reevaluation.md`, VM-427 main-promotion sweep, VM-467 browser-smoke pilot, VM-468 deployed smoke/social preview, VM-450 visual waiver work, and VM-446 live RLS blocker notes.

**Why it's ownable** - The vault is careful about test epistemology: local SQL is not live RLS proof; visual diffs are not accepted baselines; browser smoke is not full cross-browser confidence; coverage does not erase unknowns.

**Blog fit** - QA Field Guide, Automation Cookbook. Direct fit for "Coverage is not confidence."

**Strength** - High, because the idea is repeatedly acted out through explicit caveats after otherwise successful validations.

## 7. AI Needs An Audit Trail

**The claim** - AI is useful when it is boxed into inspectable, reversible, source-aware work; it becomes risky when treated as authority.

**Definition** - The vault uses AI-assisted building, but surrounds it with cards, handoffs, source/generated boundaries, validators, copy gates, and "do not invent" rules. AI output is material to review, not truth to accept.

**Where it recurs** - Medium-high recurrence in `AGENTS.md`, `docs/reference/source-generated-guardrails.md`, `docs/audits/2026-06-29-vox-mana-deep-audit.md`, `docs/audits/2026-06-30-vox-mana-voice-audit.md`, `docs/strategy/2026-06-30-vox-mana-public-demo-case-study.md`, `docs/qa/vox-mana-test-plan.md`, and the handoff discipline across agent-produced VM work.

**Why it's ownable** - This is close to the user's "MacGyver, not oracle" phrasing, but the vault adds a concrete operating model: constrain the tool, keep provenance, test outputs, and refuse unsupported confidence.

**Blog fit** - Learning Lab, Automation Cookbook, Table Talk. Strong bridge to posts about AI-assisted building, prompt discipline, review loops, and practical automation.

**Strength** - Medium-high, because it is strongly demonstrated but often implied through process rather than named as a standalone maxim.

## 8. Boundaries Build Trust

**The claim** - Trust grows when a product says what it cannot do as clearly as what it can.

**Definition** - The vault treats disclaimers, product boundaries, privacy caveats, source labels, and anti-overclaiming copy as part of the user experience. Limitation language is not fine print; it is a design material.

**Where it recurs** - Medium-high recurrence in `docs/audits/2026-06-30-vox-mana-voice-audit.md`, `docs/audits/2026-06-29-vox-mana-self-snapshot.md`, `docs/reference/data-contracts.md`, `docs/strategy/2026-06-30-vox-mana-public-demo-case-study.md`, VM-439 through VM-456 copy-boundary work, VM-461/470 account-scope freezes, and Privacy/Terms repair notes.

**Why it's ownable** - The vault's boundary language is not legalistic filler. It is used to keep the product from pretending to be a deckbuilder, rules authority, official canon source, live privacy proof, or recommendation engine.

**Blog fit** - QA Field Guide, Table Talk. Connects to trust, governance, release readiness, and the habit of making uncertainty visible.

**Strength** - Medium-high, because it overlaps with "Scope Is A Quality Tool" but is more user-facing and publishable as a separate trust principle.

## Better as post seeds than recurring ideas

- **Visual waivers are not visual quality** - Strong single-post seed from VM-450 and visual-baseline notes, but narrower than the broader proof/readiness idea.
- **Live proof is different from repo proof** - Excellent post seed from VM-422/VM-446/RLS work; it is a concrete example under "Confidence Is Not Coverage."
- **Copy can create false product promises** - Strong seed from VM-439 through VM-456; probably a post under "Boundaries Build Trust."
- **A static site can still have release risk** - Useful post seed from QA plan/deep audit; less durable as a named through-line.
- **Generated files are comparison targets** - Great technical post under "Source Beats Surface," too implementation-specific as a top-level recurring idea.
- **The handoff is part of the product** - Distinctive post seed about AI-agent collaboration, but currently better as a proof example under governance and AI audit trails.

## Considered and cut

- **Quality is everyone's job** - Cut as generic; the vault's sharper version is making risk visible to decision-makers.
- **Test early** - Cut as generic and not the recurring pattern; the vault cares more about the right evidence at the right confidence boundary.
- **Documentation matters** - Cut as too broad; the stronger idea is that documentation is governance when it records authority, risk, and decisions.
- **Good UX is clear** - Cut as generic; the vault's ownable variant is that boundaries and limitations are part of trust-building UX.
- **Metaphor after meaning** - Cut from recurring-idea list because the user tracks metaphors separately, though it appears in the voice audit.
- **Release readiness is a checklist** - Cut because the vault argues the opposite: readiness is an evidence-backed decision, not checklist theater.
- **AI can write code faster** - Cut as generic and not field-safe enough; the recurring conviction is AI needs an audit trail.
- **Commander identity compass** - Cut because it is product-specific Vox Mana vocabulary, not a transferable QA/systems conviction.
