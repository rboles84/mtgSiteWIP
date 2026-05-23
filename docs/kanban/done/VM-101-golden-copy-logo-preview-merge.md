# VM-101 - Golden-Copy Logo Preview Merge

ID: VM-101
Title: Golden-Copy Logo Preview Merge
Status: done
Type: Design / Frontend Preview
Area: Logo, Local Preview Files
Priority: medium
Created: 2026-05-22
Completed: 2026-05-22

## Summary

Create a safe third local preview file that combines the spiral glyph subsystem from `good_V_withSprals.html` with the V mark, layout, editor, and motion system from `final_live-mana-glyph-editor.html`.

## Source Evidence

- `docs/design/visual-style-guide.md`
- `docs/handoffs/2026-05-19-1848-codex-vm063-homepage-preview-portable-radar.md`
- `docs/handoffs/2026-05-20-2354-codex-vm096-black-component-glow-repair.md`
- `C:/Users/obake/Downloads/HTML Work/good/good_V_withSprals.html`
- `C:/Users/obake/Downloads/HTML Work/Friday_5_16/final_live-mana-glyph-editor.html`

## Problem

The local logo preview work has two separate golden-copy candidates: one file has the desired spiral glyph shape and glow treatment, while the other has the desired V mark, geometry, live editor shell, and motion layout. The user wants one merged self-contained artifact without overwriting either source file.

## Proposed Outcome

- Add one new self-contained HTML preview file in `C:/Users/obake/Downloads/HTML Work/Friday_5_16/`.
- Preserve the target file's page shell, V art, geometry, motion choreography, and editor behavior.
- Replace only the target file's spiral subsystem with the source file's exact spiral glyph structure and glow treatment.

## Acceptance Criteria

- The new file opens locally with no external dependencies.
- The V mark and surrounding layout match `final_live-mana-glyph-editor.html`.
- The visible spiral glyphs match `good_V_withSprals.html` in shape and glow treatment.
- Default load and `Original Base Spiral` both use the exact golden-copy spiral path.
- Orbit, Radial Pulse, Drift, and Weave continue to work.

## Completion Notes

- Created `C:/Users/obake/Downloads/HTML Work/Friday_5_16/final_live-mana-glyph-editor_golden-spirals.html` as the safe third merged preview.
- Preserved the target file's V mark, sacred geometry, layout, live editor shell, and motion containers.
- Replaced the target file's spiral subsystem with the source file's golden-copy spiral shape, filters, class styling, color gradients, and visible group structure.
- Updated the target file's startup order so the page now initializes with the golden-copy spiral path and the reset behavior restores that same path instead of blank or alternate startup glyphs.

## Tests Run

- Static merge assertions in PowerShell confirming the output file exists, includes `elementalFireFilter`, includes `plasmaCoreGlow`, removes `blackManaGlow`, initializes with `glyphShapes.originalBase`, and contains the golden-copy spiral path.
- Static scan of the merged output confirming no external asset links or imports were introduced beyond inline SVG namespaces and local inline scripts.
- Headless Edge render of `file:///C:/Users/obake/Downloads/HTML%20Work/Friday_5_16/final_live-mana-glyph-editor_golden-spirals.html` confirming the target V remains intact and the visible spirals render with the source glow treatment.

## Notes

This task targets local preview files outside the repo runtime. The repo documentation records the merge, but no live Vox Mana page was modified.
