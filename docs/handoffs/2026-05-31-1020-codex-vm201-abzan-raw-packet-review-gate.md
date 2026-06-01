# VM-201 Abzan Raw Packet Review Gate Handoff

## Agent Name

Codex

## Task Requested

Implement the user-declared duplicate Abzan VM-201 raw packet review gate. Validate the duplicate Abzan VM-200 authored-but-not-live raw-faction packet without editing, repairing, formatting, generating, building, or promoting it. If the packet passes, record `review-approved-for-future-promotion-planning` while preserving the existing unrelated `VM-201 - Tarkir Clan Source Folder Restore`.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-0953-codex-vm200-abzan-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-31-0919-codex-vm199-abzan-docs-parity-fill.md`
- `docs/handoffs/2026-05-31-0859-codex-vm198-abzan-identity-metaphysics.md`
- `docs/handoffs/2026-05-31-0805-codex-vm201-tarkir-clan-source-restore.md`
- `docs/handoffs/2026-05-30-2042-codex-vm185-naya-raw-packet-review-gate.md`
- `docs/handoffs/2026-05-30-1922-codex-vm180-jund-raw-packet-review-gate.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-200-abzan-raw-faction-source-packet.md`
- `docs/kanban/done/VM-201-tarkir-clan-source-folder-restore.md`
- `docs/kanban/done/VM-185-naya-raw-packet-review-gate.md`
- `docs/kanban/done/VM-180-jund-raw-packet-review-gate.md`
- `docs/research/abzan/abzan-evidence-ledger.md`
- `data/raw-factions/abzan/abzan.sources.json`
- `data/raw-factions/abzan/abzan.claims.json`
- `data/raw-factions/abzan/abzan.profile.json`
- `data/raw-factions/abzan/abzan.placement.json`
- `data/raw-factions/abzan/abzan.changelog.json`
- `data/raw-factions/jund/*.json` for top-level key parity
- `data/raw-factions/naya/*.json` for top-level key parity
- `research/build-faction-artifacts.mjs`

## Files Changed

- `docs/kanban/board.md`
- `docs/kanban/done/VM-201-abzan-raw-packet-review-gate.md`
- `docs/handoffs/2026-05-31-1020-codex-vm201-abzan-raw-packet-review-gate.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Created and completed the duplicate Abzan VM-201 Kanban review card.
- Reviewed the five duplicate Abzan VM-200 raw JSON files without editing them.
- Marked the packet as `review-approved-for-future-promotion-planning`.
- Recorded that the result is a review-only approval for future planning, not authorization to change runtime, placement, generated data, routes, fixtures, Home preview, Maze, schema, Supabase, builder maps, aliases, or live-entry lists.
- Added explicit duplicate-ID notes to the card, board row, and this handoff.
- Updated the handoff index.

## Why It Changed

VM-201 is the review airlock between the authored-but-not-live duplicate Abzan VM-200 source packet and any future Abzan promotion planning. It confirms that the packet is structurally clean enough to plan from later while preserving the non-live boundary.

## Decisions Made

- Treat the duplicate Abzan VM-200 packet as approved for future promotion planning.
- Do not treat VM-201 approval as permission to promote `ABZAN`.
- Keep `WBG` and all W/B/G color-order permutations as metadata/query-only language.
- Keep duplicate Abzan VM-198 and VM-199 architecture docs as shaping-only inputs, not raw-claim evidence.
- Keep `ABZAN-EVID-027`, `ABZAN-EVID-028`, `ABZAN-EVID-030`, `ABZAN-CMD-###`, `ABZAN-MF-###`, seed files, source-material paths, and architecture docs out of raw claims.
- Preserve the unrelated completed `VM-201 - Tarkir Clan Source Folder Restore` card and handoff unchanged.
- Require any future repair or runtime work to use a separate explicit card.

## Duplicate-ID Handling

This handoff uses VM-201 because the user-declared Abzan VM-197 through VM-202 stack assigns VM-201 to the Abzan raw packet review gate. The repository already has an unrelated completed `VM-201 - Tarkir Clan Source Folder Restore`; that card and handoff were reviewed as context and left untouched.

## Evidence Boundaries

- Raw claim evidence is limited to normalized `ABZAN-EVID-###` rows from `docs/research/abzan/abzan-evidence-ledger.md`.
- VM-198/VM-199 architecture docs are shaping-only and were not accepted as raw-claim evidence.
- Commander/operator rows remain support-only.
- Manual-fill rows remain excluded from raw claims.
- Seed and `source-material` paths remain excluded from raw claims.
- Dromoka-era material remains transition/contrast context only and does not become Dromoka-as-Abzan continuity.

## Dirty Baseline

Initial `git status --short` for this VM-201 review showed a dirty baseline with pre-existing modified `docs/handoffs/HANDOFF_INDEX.md` and `docs/kanban/board.md`, untracked duplicate Abzan/Temur docs and data, and unrelated restored clan seed folders. VM-201 compared final status against that baseline and treated only the new Abzan VM-201 card/handoff plus board/index edits as in-scope.

During final status comparison, unrelated Temur lane drift appeared outside VM-201 scope. The Temur VM-206 card was no longer reported at the baseline path `docs/kanban/backlog/VM-206-temur-frontier-raw-faction-source-packet.md`; it appeared under `docs/kanban/in-progress/VM-206-temur-frontier-raw-faction-source-packet.md` instead. A new untracked `data/raw-factions/temur/` directory also appeared with the five Temur raw packet JSON files. VM-201 did not edit, move, stage, format, normalize, or delete those paths and left them untouched.

## Tests Run

- AGENTS pre-flight review of the handoff index, current board, duplicate Abzan VM-200 handoff/card, Abzan VM-198/VM-199 handoffs, existing unrelated VM-201 restore handoff/card, and Jund/Naya review-gate precedents.
- `git -c safe.directory=C:/dev/mtgSiteWIP status --short` captured the dirty baseline before review.
- `Get-FileHash -Algorithm SHA256 data/raw-factions/abzan/*.json` before review:
  - `abzan.sources.json` - `E883D6FD8860FC104DDA8DCDEE7CD0469C7D804F92B5D4D79FEC5B00034F624A`
  - `abzan.claims.json` - `B4CBD6FC910BF1F0D9BD4CA8AD0776B30F5C4FDC21B858252DD4F07A11E325B5`
  - `abzan.profile.json` - `1F6A841C0C1A68A77EB6CB99CC1BD1F101216AF319C768380FE4648A80025BB0`
  - `abzan.placement.json` - `D458A06D08CAB070D662C7CC13E3DCC29375095CAFC2E92656B00CC5465EA28A`
  - `abzan.changelog.json` - `5C3869546E88680F55042BF649EE15F36461C5077B6AB861C4F1EE0512012333`
- Scoped PowerShell VM-201 raw packet validation:
  - exactly five expected JSON files exist;
  - all five parse;
  - top-level keys match Jund and Naya packet shapes for sources, claims, profile, placement, and changelog files;
  - every source role is `claim-bearing`, `shaping-only`, or `support-only`;
  - exactly 10 raw claims exist and `claim_count` is 10;
  - raw claim IDs are `abzan_claim_0001` through `abzan_claim_0010`;
  - exact claim-to-evidence mapping matches duplicate Abzan VM-200;
  - all raw claim evidence rows resolve in `docs/research/abzan/abzan-evidence-ledger.md`;
  - all raw claim source IDs resolve in `abzan.sources.json`;
  - raw claims reference only `claim-bearing` sources;
  - raw claim source references cover every claim evidence row;
  - `ABZAN-EVID-027`, `ABZAN-EVID-028`, `ABZAN-EVID-030`, `ABZAN-CMD-###`, and `ABZAN-MF-###` are absent from raw claim evidence rows;
  - raw claims do not cite seed/source-material paths or architecture docs;
  - profile claim references are a subset of the 10 raw claim IDs;
  - placement claim references are a subset of the 10 raw claim IDs;
  - non-live status fields are preserved.
- Scoped guard check confirmed no tracked diff in `research/build-faction-artifacts.mjs`, `data/factions.json`, `data/identity-layers.json`, `data/placement-model.json`, `data/placement-model.schema.json`, `assets/js`, `archscry`, `maze`, `index.html`, `supabase`, `tests`, or `fixtures`.
- Scoped search found existing Abzan wording in Naya false-positive generated text and Strategium texture, but no VM-201 diff in those paths.
- After bookkeeping edits, `Get-FileHash -Algorithm SHA256 data/raw-factions/abzan/*.json` matched the before-review hashes, confirming no raw packet edits.
- `git diff --check -- docs/kanban/board.md docs/kanban/done/VM-201-abzan-raw-packet-review-gate.md docs/handoffs/2026-05-31-1020-codex-vm201-abzan-raw-packet-review-gate.md docs/handoffs/HANDOFF_INDEX.md` passed with existing CRLF warnings on tracked docs.
- Scoped trailing-whitespace scan passed on the VM-201 card, board, handoff, and handoff index.
- Final `git status --short` was compared against the baseline. The only VM-201 additions were the allowed duplicate Abzan VM-201 card and handoff plus allowed board/index edits; unrelated Temur lane drift also appeared during the session (`docs/kanban/in-progress/VM-206-temur-frontier-raw-faction-source-packet.md` and `data/raw-factions/temur/`) and was left untouched.

Skipped:

- `npm test`, because VM-201 is review-only and did not touch runtime contracts.
- `npm run test:parser`, because VM-201 is review-only and did not touch parser behavior.
- `npm run build:factions` and any builders/generators, because Abzan remains authored-but-not-live and VM-201 must not generate or promote.
- Formatters and fixers, because VM-201 is review-only.

## Not Touched

- `data/raw-factions/abzan/`
- `docs/research/abzan/`
- `docs/architecture/colors/abzan/`
- existing unrelated `docs/kanban/done/VM-201-tarkir-clan-source-folder-restore.md`
- existing unrelated `docs/handoffs/2026-05-31-0805-codex-vm201-tarkir-clan-source-restore.md`
- `research/build-faction-artifacts.mjs`
- `data/factions.json`
- `data/identity-layers.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- generated artifacts
- placement fixtures
- route maps
- browser bundles
- Home files
- Maze files
- schema files
- Supabase files
- runtime code
- tests

## Risks / Uncertainties

- The worktree remains intentionally dirty from concurrent Abzan and Temur lanes. VM-201 scoped its validation to avoid normalizing or staging unrelated files.
- `data/raw-factions/abzan/` is still untracked in the working tree; hash comparison is the proof that VM-201 did not mutate it.
- Unrelated Temur lane paths changed during the session outside VM-201 scope, including the VM-206 card path and new `data/raw-factions/temur/` packet files. They should be handled by the active Temur lane owner, not by this review gate.
- VM-201 approval is planning-only. A future VM-202 must still define and pass a controlled runtime promotion gate before any live Abzan integration.

## Follow-Up Recommendations

- Plan Abzan VM-202 as a controlled runtime promotion only if the user explicitly approves promotion after this review.
- VM-202 should start from a fresh dirty-baseline capture, assert exactly the intended live-expression delta, and verify no WBG/permutation alias leakage.
- If any packet correction is desired before VM-202, create a separate repair card instead of folding repairs into promotion.

## Next Suggested Agent

Planning Architect for Abzan VM-202 controlled runtime promotion planning, if human review approves moving past this gate.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-201-abzan-raw-packet-review-gate.md`
- `docs/kanban/done/VM-200-abzan-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-31-0953-codex-vm200-abzan-raw-faction-source-packet.md`
- `docs/kanban/done/VM-199-abzan-docs-parity-fill.md`
- `docs/handoffs/2026-05-31-0919-codex-vm199-abzan-docs-parity-fill.md`
- `docs/kanban/done/VM-198-abzan-identity-and-metaphysics.md`
- `docs/handoffs/2026-05-31-0859-codex-vm198-abzan-identity-metaphysics.md`
- `docs/research/abzan/abzan-evidence-ledger.md`
- `data/raw-factions/abzan/abzan.sources.json`
- `data/raw-factions/abzan/abzan.claims.json`
- `data/raw-factions/abzan/abzan.profile.json`
- `data/raw-factions/abzan/abzan.placement.json`
- `data/raw-factions/abzan/abzan.changelog.json`
