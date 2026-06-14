# VM-377 - Mono Gold Source Intake Planning

ID: VM-377
Title: Mono Gold Source Intake Planning
Status: done
Type: Planning / Source Intake
Area: mono colors, source authority, Layer 1, Layer 2, claim-ledger readiness
Priority: high
Created: 2026-06-13

## Summary

Plan and execute the mono-color gold upgrade step for W/U/B/R/G using `docs/research/mono_upgrade` as the primary source-intake bundle.

The objective is to move mono colors from the VM-335 transitional Layer 1 exception toward gold-standard Layer 1 and Layer 2 readiness.

Execution note, 2026-06-13: the user explicitly authorized the downstream mono-gold work stack after this planning card was created. This card became the active execution card for source-intake promotion, mono claim-ledger/raw-packet authoring, builder/validator mapping, generated rebuild, and Layer 1 / Layer 2 QA. It did not authorize unrelated runtime copy, downstream card creation, PDF edits, Home, Maze, Supabase hand edits, Colorless, WUBRG, or unrelated work.

Closeout note, 2026-06-13: W/U/B/R/G now have raw source, claim, profile, placement, and changelog packets under `data/raw-factions/{white,blue,black,red,green}/`. The builder and source/generated validator now map those raw packets to W/U/B/R/G. Generated artifacts were rebuilt from source. Mono status is no longer VM-335 transitional-only after this QA pass.

## Pre-Flight Findings

Recent related work:
- VM-335 records W/U/B/R/G as active registry/runtime identities under a transitional Layer 1 exception, not claim evidence under VM-325.
- VM-361 inventoried mono official-source gaps and recommended clean local source capture before mono claim ledgers or raw packets.
- `docs/research/mono_upgrade` now contains paraphrased digest markdown plus local PDF captures for the 2015 Revisited articles, 2025 My Words articles, Mechanical Color Pie 2021, Mechanical Color Pie 2021 Changes, and The Council of Colors Revisited.
- Recent WUBRG, Colorless, UI, data, and generated work is active in the worktree and is out of scope.

Current known risks:
- The worktree was already broadly dirty before this planning card.
- `docs/research/mono_upgrade/00_SOURCES_MANIFEST.md` has stable source IDs and canonical URLs, but it does not yet record the later PDF capture filenames, hashes, per-file capture dates, source roles, source tiers, digest paths, or future anchor-ID expectations in a manifest-cleanup-ready shape.
- `Mechanical Color Pie 20211.pdf` appears to be a filename typo for Mechanical Color Pie 2021. Preserve the current path unless a future repo convention explicitly allows renaming; otherwise annotate the typo in the manifest.
- `README.txt` is process chatter from source creation, not source evidence.
- `30_commander_and_rules.md` is useful as a boundary digest, but exact commander eligibility and color-identity boundary claims should prefer Comprehensive Rules 903.3 and 903.4 over the public Commander format overview.

Relevant decisions already made:
- Generated/runtime/registry surfaces are comparison, routing, or build surfaces only unless promoted through approved source work.
- Digest markdown can be source-intake / claim-digest material, but exact quotes must come from canonical URLs or local PDF captures under fair use.
- Local PDFs are official capture evidence, not raw packets or ledgers by themselves.
- Drive to Work remains deferred unless clean episode metadata and transcript provenance are found.
- Official color philosophy and mechanical sources can support philosophy/mechanical claims, but they do not directly define Vox Mana profile-axis scores. Axis values remain Vox Mana interpretation until claim-backed raw packets are reviewed.

What should not be touched by this card:
- Runtime JavaScript, CSS, HTML, routes, Home, Maze, Supabase, generated JSON, raw faction packets, Colorless, WUBRG, or unrelated files.
- `docs/research/mono_upgrade` manifest, digest markdown, PDFs, or README during this planning-card task.
- Generated files by hand.
- Staging, commits, or downstream card creation.

## Source Bundle Classification

Status: promoted source-intake bundle.

Observed present in `docs/research/mono_upgrade`:
- Ten digest/source-intake markdown files: manifest, five mono color digests, two mechanical color-pie digests, Council of Colors digest, and Commander/rules boundary digest.
- Thirteen local PDF captures for the five 2015 Revisited articles, five 2025 My Words articles, Mechanical Color Pie 2021, Mechanical Color Pie 2021 Changes, and The Council of Colors Revisited.
- Canonical URLs and source IDs in the current manifest.

Promotion results:
- Manifest cleanup records PDF capture filenames, local paths, SHA-256 hashes from actual local files, capture dates, canonical URLs, source tiers, source roles, digest paths, and future anchor-ID expectations.
- Digest markdown is classified as claim-digest/source-intake material; PDFs are local official capture evidence.
- `Mechanical Color Pie 20211.pdf` is annotated as a filename typo and the path is preserved.
- `README.txt` is classified as process chatter, not evidence.
- Rules cleanup prefers CR 903.3 and CR 903.4 for exact commander eligibility and color-identity claims; the public Commander page remains overview-only.
- Three native Commander Compass rows per mono color were verified through current Scryfall exact-name API checks on 2026-06-13 for name, mono color identity, legendary creature type line, and Commander legality. Those rows remain support/navigation only, not philosophy, profile-axis, popularity, price, metagame, or deck-quality evidence.
- Missing local Commander format / Comprehensive Rules PDF captures are recorded as future exact-quote/high-stakes rules follow-up rather than silently filled.

## Recommended Downstream Stack

Executed after user authorization; no downstream cards were created.

1. Source-intake promotion for `docs/research/mono_upgrade`.
2. Claim-ledger construction for white, blue, black, red, and green.
3. Mono raw packet authoring.
4. Raw packet review gate.
5. Builder/validator mapping.
6. Generated rebuild and Layer 1 / Layer 2 QA.

## Guardrails For Future Execution

- Do not hand-edit generated files.
- Do not use generated/runtime copy as canonical evidence.
- Do not promote additional Commander examples as evidence-backed Layer 2 support without Scryfall/Gatherer/current legality verification.
- Do not change PDF contents.
- Keep Drive to Work deferred unless clean provenance is found.
- Current mono status is source-backed through VM-377 raw packets and generated QA; future changes must keep that traceability.

## Acceptance Criteria

- [x] `docs/research/mono_upgrade` is promoted through source-intake cleanup without editing PDF contents.
- [x] Manifest entries distinguish canonical URL, local PDF capture path, digest markdown path, source role, source tier, capture date, hash, and available/future anchor IDs.
- [x] `Mechanical Color Pie 20211.pdf` is annotated as a filename typo and not renamed.
- [x] `README.txt` is classified as process chatter, not source evidence.
- [x] Hashes are recorded from actual local files, not copied notes or assumptions.
- [x] Digest markdown is classified as claim-digest/source-intake material; PDFs are classified as local official capture evidence.
- [x] Exact quotes, if any, must be pulled directly from canonical URLs or PDF captures under fair use; no new long exact quotes were introduced.
- [x] Drive to Work remains deferred unless clean provenance is found.
- [x] Commander/rules entries prefer Comprehensive Rules 903.3/903.4 for exact commander eligibility and color-identity boundaries.
- [x] Three native Commander support rows per mono color were current-verified through Scryfall before promotion; all other candidate examples remain candidates until separately verified.
- [x] Current mono status is no longer transitional-only after raw packets, claim ledgers, generated rebuild, and QA.
- [x] No downstream Kanban cards were created.

## Suggested Validation For Future Execution

- `Get-FileHash -Algorithm SHA256 docs\research\mono_upgrade\*`
- `rg -n "MONO-|MECH-CP|GOV-COC|RULES-CR|FMT-CMDR" docs\research\mono_upgrade`
- `rg -n "903\.3|903\.4|Commander|CANDIDATE|Drive to Work" docs\research\mono_upgrade`
- `git diff --check -- docs/research/mono_upgrade/00_SOURCES_MANIFEST.md`
- `npm.cmd run build:factions`
- `npm.cmd run validate:source-generated -- --targets=W,U,B,R,G`
- `npm.cmd test`
- `npm.cmd run test:parser`

## Related Docs

- `docs/kanban/done/VM-335-mono-source-authority-decision.md`
- `docs/kanban/done/VM-361-mono-color-official-source-inventory.md`
- `docs/research/canon/mono-color-official-source-gap-audit.md`
- `docs/research/mono_upgrade/`
- `docs/reference/source-generated-guardrails.md`
- `docs/reference/data-contracts.md`
- `docs/reference/identity-metaphysics-markdown-schema.md`
- `data/raw-factions/white/`
- `data/raw-factions/blue/`
- `data/raw-factions/black/`
- `data/raw-factions/red/`
- `data/raw-factions/green/`
