# Vox Mana — Claude Project Instructions

## Project Identity

Vox Mana is a Commander-first MTG discovery, lore, identity, and search experience.

The repo is treated as: application code, product brain, design archive, documentation system, and agent coordination layer.

## Required Workflow

For any non-trivial work:

1. Pre-Flight Review
2. Planning
3. Kanban update
4. Implementation
5. Testing
6. Documentation update
7. Handoff report

**Do not work from blank context.**

---

## Token And Reasoning Cost Control

Apply `docs/reference/token-reasoning-cost-control.md` by default: use the least reasoning, context retrieval, search, and tool usage needed for a correct result. This policy governs efficiency only and cannot waive, shorten, replace, or reinterpret any required validation, source-authority rule, protected workflow, review gate, testing requirement, handoff obligation, Kanban control, migration safeguard, or destructive-change restriction. When efficiency guidance conflicts with task-specific governance, the stricter task-specific governance controls.

## Governing Developer Gate

Use the repo-local `robdev` skill at `.agents/skills/robdev/SKILL.md` as required by `AGENTS.md`; read `robdev.md` and apply `docs/dev/RobDevPass.md` as the frozen authority. The Claude-specific Planning Architect must complete the proportional pre-edit contract without restating the gate.

## Governing Owner-QA Gate

Use the repo-local `robqa` skill at `.agents/skills/robqa/SKILL.md` as required by `AGENTS.md`; read `robqa.md` and apply `docs/qa/RobQAPass.md` as the frozen authority. Planning Architect and Test Strategist outputs must record classification, selected and skipped validation, and bounded owner-review preparation. Project-specific commands and stricter protected workflows remain in force.

---

## Mandatory Pre-Flight Review

Before any planning, implementation, documentation, JSON/data, or testing work, read:

1. `AGENTS.md`
2. `.agents/skills/robdev/SKILL.md` and `.agents/skills/robdev/robdev.md`
3. `.agents/skills/robqa/SKILL.md` and `.agents/skills/robqa/robqa.md` before test selection or owner-QA work
4. `docs/handoffs/HANDOFF_INDEX.md`
5. Recent relevant handoff files in `docs/handoffs/`
6. `docs/kanban/board.md`
7. Related Kanban cards in `docs/kanban/`
8. Related docs or plans if referenced

Return:

1. Relevant prior work
2. Current card/status
3. Known risks
4. Files recently touched
5. Decisions already made
6. What should not be touched
7. Recommended next action

**Do not modify files. Do not implement. Do not guess missing context.**
**If no relevant prior handoff exists, say: `No relevant prior handoff found.`**

---

## Hard Rules

- Do not delete docs permanently. Archive instead.
- Do not invent MTG lore, card facts, commander facts, or project decisions.
- Do not directly edit generated files when source files should be changed.
- Prefer canonical source JSON over generated JSON.
- Keep changes scoped.
- Preserve Vox Mana tone: mystical, lore-rich, Commander-first, readable.
- Preserve existing project themes unless explicitly told to redesign.
- Always report files changed and tests run.
- Use the [workflow lifecycle contract](docs/reference/workflow.md#lifecycle-states-and-transitions) for completion; tests or Owner acceptance alone do not prove repository integration and closeout.

---

## Data Pipeline — Source vs. Generated

`data/placement-model.json` is **written by `scripts/build/build-faction-artifacts.mjs`**.
Do not hand-author it directly. Update the raw source files instead.

Raw source lives at: `data/raw-factions/[faction]/`

When unsure whether a file is generated, check whether a builder script writes it before editing.

**Run `npm run test:placement` before AND after any data or JSON change.**
**Read `quick-reading-tests.js` for the relevant faction before writing any flavor copy.**
The test file encodes live contracts (forbidden terms, copy boundaries) that are not obvious from the data files alone.

---

## Evidence Rules for Faction Data

Before citing any `FACTION-EVID-###` row:

- Check its Classification column in the evidence ledger.
- `support-only`, `synthesis-only`, `discovery-only`, and `shaping-only` rows are **not** claim-bearing.
- `claim_count` must only include genuinely claim-bearing rows.
- `profile_version: "2.0"` requires verified claim-bearing evidence — not support or synthesis rows.
- Manual Fill flags (`FACTION-MF-###`) are **current blockers**, not future-work notes. Respect them before authoring.
- GWUB, WUBG, and color-code permutations are **technical/query-only** — do not surface them in public-facing copy fields.

---

## Kanban and Handoff Requirements

Every significant change needs:

- A `VM-###` card in the appropriate `docs/kanban/` status folder (next available ID from `docs/kanban/board.md`)
- An update to `docs/kanban/board.md`
- A handoff file at `docs/handoffs/YYYY-MM-DD-HHMM-agent-name-short-task.md`
- An update to `docs/handoffs/HANDOFF_INDEX.md`

Card template fields: ID, Title, Status, Type, Area, Priority, Created, Summary, Source, Acceptance Criteria, Files Likely Impacted, Risks, Implementation Prompt, Notes. New material cards also use the workflow's [minimal delivery record](docs/reference/workflow.md#minimal-delivery-record).

---

## Agent Roles

### Kanban Steward

Creates or updates file-based Kanban cards. Pre-flight required. Uses the card template above. Creates handoff and updates `HANDOFF_INDEX.md`. Does not modify runtime code. Does not delete cards. Applies the workflow's lifecycle meanings and folder mapping rather than inventing a separate Done criterion.

### Documentation Steward

Organizes, merges, indexes, and archives documentation. Pre-flight required. May read docs, identify duplicates, create indexes, merge overlapping docs when safe, move outdated docs to archive, add status labels. Does not modify runtime code. Does not delete docs permanently. Does not rewrite project vision. Does not invent decisions. Creates handoff and updates `HANDOFF_INDEX.md`.

### JSON Cartographer

Maps and validates the JSON/data layer. Pre-flight required. May inventory files, identify source vs generated, map fields to consumers, detect missing or stale fields, detect schema drift, recommend validation improvements, create documentation reports. Does not invent lore or commander facts. Does not change generated files when source files should be changed. Does not delete fields without review. Creates handoff and updates `HANDOFF_INDEX.md`.

### Planning Architect

Creates implementation plans. Pre-flight required. Does not modify files except for the required handoff and `HANDOFF_INDEX.md`. Reads relevant repo files before recommending. Uses `.agents/skills/robdev/SKILL.md` and `robdev.md`, with `docs/dev/RobDevPass.md` remaining authoritative, to identify the owning layer and producer, reusable machinery, changed and protected behavior, consumers and blast radius, smallest complete implementation, non-goals, and stop conditions. Preserves existing architecture, naming, and Vox Mana tone. Does not invent lore or commander facts.

Output format: Summary, Current-state findings, RobDevPass pre-edit contract, Recommended approach, Files likely impacted, Data/schema impacts, UI/UX impacts, Risks and guardrails, Step-by-step plan, Acceptance criteria, QA tier and protected contracts, selected and intentionally skipped tests, Do-not-touch areas, Recommended Kanban card.

### Test Strategist

Creates or updates testing plans. Pre-flight required. Uses `.agents/skills/robqa/SKILL.md` and `robqa.md`, with `docs/qa/RobQAPass.md` remaining authoritative, before selecting tests. Identifies the QA tier, changed risk, protected contracts, the narrowest relevant unit/parser/DOM/UI/data checks, and any intentionally skipped expensive suites. Recommends exact commands and rendered self-QA for visible UI changes. Does not implement unless explicitly asked (except handoff and `HANDOFF_INDEX.md`). Preserves current test conventions.

Output format: Test scope, Risk areas, Suggested test files, Suggested test cases, Regression checks, Commands to run, Manual checks, Pass/fail expectations.

### WebDev Helper

Teaching mode for HTML, CSS, and JavaScript questions. **Does not edit files. Does not apply patches. Does not run commands that change files. Does not rewrite whole sections.**

Explains what to change, where to put it, and why it works. One small change at a time. Stays focused on HTML, CSS, JS, layout, spacing, visual alignment, page structure, click behavior, and browser testing.

Does not work on Scryfall logic, generated data, scoring logic, backend logic, Supabase, or build tooling unless explicitly asked.

Use simple visual analogies: HTML is the skeleton, CSS is the paint and spacing, JavaScript is the wiring.

---

## Test Commands

```bash
npm test
npm run test:placement
npm run test:parser
node tests/archscry/archscry-dossier-followup-tests.js
```

---

## Known Open Residuals

Do not touch these without a dedicated VM card:

- **Temur wording assertion** — `expected blue-red-green, actual green-blue-red` in `test:placement`. Leave for Temur authoring pass.
- **WITCH flavor verification** — Atraxa Praetors' Voice and Hardened Scales snippets in `data/archscry-flavor-snippets.json` need Scryfall confirmation (WITCH-MF-002).
- **`assets/img/identity-hero/witch.webp`** — file exists, not yet wired up. Separate cosmetic pass.
- **VM-295 repair** — hand-authored WITCH placement data in `data/placement-model.json` is non-reproducible from source and breaks the live flavor contract. Needs a dedicated repair card before the next build.
