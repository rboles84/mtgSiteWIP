# VM-483 Final Maze Retest Repair QA

## Source Baseline

Source report: `C:\Users\obake\Downloads\scryfall_checklist_report_2026-07-09_0819.md`.

The report listed 7 active retest failures for VM-483. No checked-in command was found to regenerate that downloaded report, so this artifact records equivalent deterministic coverage through parser, contract, and browser/UI-path tests for the exact seven rows.

## Format Default Code Paths

Automatic format defaults are applied through `applyMazeFormatToQuery()` in `research/maze-query-core.js`.

- Raw Operator's Hand search path: `resolveMazeQueryRequest()` prepares raw syntax and calls `applyMazeFormatToQuery()`.
- Plain Reading compile/search path: `resolvePlainReadingContractResult()` calls `applyMazeFormatToQuery()` with compiled token-object intent.
- Sidebar format selector path: `applyFormatFilter()` in `research/research-init.js` strips existing format syntax and calls `applyMazeFormatToQuery()`.
- Plain Reading to Operator's Hand tab switch path: uses the compiled `lastSmartQuery`; VM-483 UI tests prove it shows executable syntax, not original prose.

## Row Results

| Row | Old failure query/status | VM-483 query/status | Parser/contract | Browser/UI | Result |
|---|---|---|---|---|---|
| `black heroes from the marvel set legal in commander` | Blocked as ambiguous; executable query stopped at `type:hero c=b legal:commander` with no Marvel set constraint. | `type:hero c=b legal:commander (game:paper) (set:msh OR set:amsh OR set:msc OR set:tmsh OR set:spm OR set:spe OR set:aspm OR set:pspm OR set:tspm OR set:fmsc OR set:tmsc OR set:mar OR set:lmar OR set:omb) prefer:best`; no block. | Pass | Contract-covered | Pass |
| `red dragons from the tarkir set legal in commander` | Blocked as ambiguous; `type:dragon c=r legal:commander`; tab switch could keep prose. | `type:dragon c=r legal:commander (game:paper) (set:dtk OR set:pdtk OR set:ptkdf OR set:tdtk OR set:ttdc OR set:tdm OR set:atdm OR set:ptdm OR set:tdc OR set:ttdm OR set:ytdm) prefer:best`; no block. | Pass | Pass: tab switch shows compiled syntax. | Pass |
| `Rakdos villains from the spiderman set legal in commander` | `type:villain c<=br ...` or `c:br` allowed off-color transform leakage. | `type:villain c=br legal:commander (game:paper) (set:spm OR set:spe OR set:aspm OR set:pspm OR set:tspm) prefer:best`; no `c<=br`, `c:br`, or `id<=br`. | Pass | Contract-covered | Pass |
| `Silverquill inkling tokens from the strixhaven set legal in commander` | `type:inkling id<=wb o:token legal:commander s:stx`; Operator's Hand/sidebar could append `f:commander`. | `type:inkling type:token c<=wb s:stx`; warning preserved: token objects are not Commander deck-legal cards, so Commander legality was not applied. | Pass | Pass: Plain Reading compile, tab switch, Operator search, and sidebar Commander selection all keep the exact token-object query. | Pass |
| `Mardu commanders in all sets that attack with tokens and sacrifice creatures` | `type:creature id=wbr o:token o:attack o:sacrifice is:commander legal:commander`; loose independent token/attack fragments. | `type:creature id=wbr o:/attack(s\|ing)?[^.\n]*token\|token[^.\n]*attack(s\|ing)?/ o:sacrifice is:commander legal:commander`; no loose `o:token o:attack`. | Pass | Contract-covered | Pass |
| `Mardu warriors from the tarkir set legal in commander` | Blocked as ambiguous; `type:warrior c<=wbr legal:commander`. | `type:warrior c<=wbr legal:commander (game:paper) (set:dtk OR set:pdtk OR set:ptkdf OR set:tdtk OR set:ttdc OR set:tdm OR set:atdm OR set:ptdm OR set:tdc OR set:ttdm OR set:ytdm) prefer:best`; no block and still `c<=wbr`. | Pass | Contract-covered | Pass |
| `Glint chaos blue black red green commanders in all sets that make treasure and draw cards` | `id=ub id=ubrg o:treasure otag:draw is:commander legal:commander`; unresolved `glint` / `chaos`. | `id=ubrg o:treasure otag:draw is:commander legal:commander`; no `id=ub`, no `id=4`, no unresolved Glint/Chaos diagnostics. | Pass | Pass: visible search output has `id=ubrg` and excludes the leaked clauses/diagnostics. | Pass |

## Tests Run

- `node research\scryfall-parser-tests.js` -> 207 parser cases passed.
- `node research\maze-query-contract-tests.js` -> passed.
- `node research\maze-search-tests.js` -> passed.
- `node research\research-mode-tests.js` -> passed.
- `npm.cmd test` -> passed.
- `git diff --check` -> passed with existing line-ending warnings only.

## Remaining Manual Work

The downloaded 111-row manual browser checklist was not fully rerun in-session because no checked-in report-generation command exists. Product QA should rerun `C:\Users\obake\Downloads\scryfall_manual_checklist2.html` when a fresh interactive pass/fail/untested count is needed.
