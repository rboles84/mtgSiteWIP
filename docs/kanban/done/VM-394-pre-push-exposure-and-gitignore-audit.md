# VM-394 - Pre-Push Exposure And Gitignore Audit

ID: VM-394
Title: Pre-Push Exposure And Gitignore Audit
Status: done
Type: Release Security / Repository Hygiene
Area: Git, Ignore Rules, Repo Exposure
Priority: high
Created: 2026-06-14

## Summary

Audit `.gitignore`, tracked files, untracked files, and ignored files before v1.0 publish so the release bundle does not expose local secrets, credentials, large generated artifacts, private machine state, or accidental runtime/prototype surfaces.

## Pre-Flight Notes

- Recent related work: VM-393 classified the v1 dirty tree and confirmed no stage/commit/push/tag/main promotion has happened.
- Known risks: dirty tree contains VM-387 through VM-393 release-train work plus two untracked `docs/research/vox-mana-decomposition-*.html` prototypes; ignored local/generated directories include `.claude/`, `artifacts/`, `node_modules/`, `test-results/`, Scryfall raw bulk data, and archived UI research.
- Relevant decisions: current branch remains intended release source; preserve unrelated work; do not stage, commit, push, tag, merge, refresh baselines, or promote main without explicit instruction.
- Do not touch: placement, Maze, generated data, source lore, Commander facts, visual baselines, or runtime behavior unless the exposure audit finds a direct leak requiring a narrow hygiene fix.

## Scope

- Review `.gitignore` against current repo state.
- Scan tracked and untracked files for likely secrets, local machine paths, accidental environment files, credentials, private tokens, and large/generated artifacts.
- Confirm ignored local/generated directories are not slated for release.
- Apply narrow `.gitignore` or documentation-only fixes if needed.
- Do not stage, commit, push, tag, merge, or promote main.

## Evidence Log

- `.gitignore` was hardened for local Claude state, local Codex runtime state, environment files, private key material, platform clutter, and Supabase CLI/runtime state.
- Ignore probes confirmed coverage for `.claude/settings.local.json`, `.env`, `.env.local`, `test.pem`, `id_rsa`, `.codex/sessions/x`, `supabase/.temp/x`, `data/scryfall/raw/oracle-cards.json`, and `docs/research/ui_research/prototype.html`.
- No tracked files matched private-key/environment filename patterns for `.env`, `*.pem`, `*.key`, `*.p12`, `*.pfx`, `*.ppk`, `id_rsa*`, `id_ed25519*`, `.claude/*`, or `supabase/.env*`.
- Credential-shaped scan found one real public client config: `assets/js/shared.js` contains the existing Supabase project URL and JWT-shaped `anon` browser key. This matches the prior VM-155 security review classification as expected public browser config, not a checked-in service-role secret, but live RLS and Edge Function policy remain external deployment requirements.
- `supabase/functions/guild-recruiter/index.ts` reads `ANTHROPIC_API_KEY` from server-side environment only; no Anthropic key value was found in repo files.
- Additional high-risk token regex matches were false positives from Scryfall URLs and historical research/doc paths.
- Untracked nonignored files at audit time were VM-387 through VM-393 handoffs/cards, the active VM-394 card, and the two `docs/research/vox-mana-decomposition-*.html` prototypes. Prototype scan found no local paths, localhost/file URLs, Supabase/Anthropic references, or obvious secret keywords.
- Ignored untracked files are dominated by local/generated dependencies and outputs: `node_modules` (15159 files), `artifacts` (4138 files), ignored `docs` research files (9 files), `test-results` (3 files), Scryfall raw data (2 files), and `.claude` (1 file).
- Tracked privacy exposure remains: local path scan found 593 tracked matches for `C:/Users`, `C:\Users`, `C:/dev`, `C:\dev`, or `file:///C:`. These are mostly historical docs/audit reports and external-tool references, not credentials.
- Tracked localhost/local URL references remain: 104 tracked matches for `localhost`, `127.0.0.1`, or `0.0.0.0`, mostly tests, docs, and Lighthouse reports.
- Tracked audit HTML local-path exposure: `docs/audits/2026-06-12-vm365-full-test-sweep.html` has 41 local path matches; `docs/audits/lighthouse-newindex2.html` has 1; current `docs/audits/lighthouse-home.html` has 0.
- `.gitignore` excludes new `docs/research/canon/` and `docs/research/ui_research/` files, but existing tracked archive files will still push. Current tracked archive footprint includes `docs/research/canon` (245 files, 59,332,201 bytes), `docs/research/mono_upgrade` (24 files, 52,554,441 bytes), and `docs/research/ui_research` (40 files, 5,813,378 bytes).
- Largest tracked archive files include `docs/research/mono_upgrade/My Words_ Green.pdf` (18,843,561 bytes), multiple `docs/research/canon/*.rtf` files over 5 MB, and large tracked identity hero images. This is an archive/IP/repo-size exposure decision, not a credential leak.

## Test / Check Log

- `git status --short --ignored` - reviewed dirty, untracked, and ignored release state.
- `git ls-files -o --exclude-standard` - reviewed untracked nonignored files.
- `git ls-files -i -o --exclude-standard` - reviewed ignored untracked files; output included the expected local/generated directories.
- `git grep` keyword and high-risk token scans - found only the expected Supabase anon browser config plus false positives.
- `git ls-files` filename scan for private key/env patterns - no tracked matches.
- `git check-ignore -v` probes - confirmed new ignore coverage; command also reports the existing local warning about inaccessible `C:\Users\obake/.config/git/ignore`.
- `Select-String` prototype scan - no local path, localhost/file URL, or obvious secret keyword matches in the two decomposition prototypes.

## Acceptance Criteria

- [x] `.gitignore` coverage is reviewed and updated if needed.
- [x] Tracked files are scanned for likely secrets/exposure risks.
- [x] Untracked files are classified before release staging.
- [x] Ignored files/directories are classified as intentionally excluded.
- [x] Any remaining exposure risk is documented with exact file paths and next action.
- [x] Required handoff is created and `docs/handoffs/HANDOFF_INDEX.md` is updated.

## Push Gate Verdict

No checked-in private API key, `.env`, private key file, service-role key, or local agent state file was found in the current release bundle.

Do not treat this as a zero-exposure public push until the remaining non-secret exposure classes are explicitly accepted or scrubbed:

- `assets/js/shared.js` exposes the intended Supabase browser URL/anon key; acceptable only if live RLS and Edge Function policy are verified/accepted.
- Historical docs and audit reports expose local machine paths and localhost URLs.
- Tracked `docs/research/` archives may expose internal research, copied source material, large files, and design prototypes by publishing them as part of the repo.

No stage, commit, push, tag, merge, baseline refresh, runtime change, generated-data edit, or main promotion was performed in VM-394.
