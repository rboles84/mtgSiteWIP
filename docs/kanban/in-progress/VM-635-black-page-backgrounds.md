# VM-635 - Replace Designated Background Imagery with Black

ID: VM-635
Title: Replace Designated Background Imagery with Black
Status: Owner Review

## Delivery

Record version: 1
Branch: codex/vm-635-black-page-backgrounds
Admission baseline: cc6c0de157419ff0271b94dfcf87013bfba2af8d
Candidate: 246f40ca11ebecd37b102eeb38a1f181b115cca9
RobQA: PASS at 246f40ca11ebecd37b102eeb38a1f181b115cca9; QA-1, Codex same-agent distinct post-commit phase; all selected checks passed.
Owner: PENDING
Integration: PENDING; stop at Owner Review without pushing or merging.
Dependencies: VM-634 is integrated; its philosophy strip stays hidden.
Decisions: Owner approved black plus existing procedural effects for everyone, with old image files preserved; explicitly limited the asset scope to assets/img/backgrounds and existing top-level JPG/WEBP/AVIF hero images.
Evidence: [Implementation/QA handoff](../../handoffs/2026-09-06-1040-codex-vm635-black-page-backgrounds.md); indexed before candidate commit.

## Implementation contract

Retire active page and metadata references to images in assets/img/backgrounds and existing top-level assets/img/vox-mana-hero-* and blind-eternities-hero-* JPG, WEBP and AVIF files. Keep the files unchanged for rollback. Replace page imagery with a black base under existing procedural effects. Replace the social preview with a deterministic black/gold typography graphic authored as SVG and rendered to PNG. Update affected asset cache keys and current validation/documentation expectations.

The entire identity-hero folder (especially official), all other artwork, Scryfall/card media, artwork mappings, credits and fallbacks are protected. No runtime artwork resolver, card data, SVG logo, texture, overlay, icon, panel styling, typography, layout, navigation, effect intensity/visibility, reduced-motion behavior, placement or persistence changes.

## Acceptance and tests

- All public app route backgrounds and share metadata stop referencing the targeted images, including responsive/preload/CSS sources; preserved files remain directly accessible.
- Existing background containers, stars/glows, and motion behavior remain intact over a black base.
- New 1200x630 PNG share graphic uses the existing vector sigil, gold Vox Mana title and cream Commander Identity Compass subtitle, rendered from committed SVG without image generation.
- Protected art and rendering code are unchanged against admission baseline; VM-634 remains hidden.
- Focused source, HTML, route-metadata, preservation, and diff checks pass. Bounded browser checks across distinct background implementations confirm no targeted image requests and retained non-target art availability.
- QA-1 presentation, same-agent distinct phase at the committed candidate; browser use is justified by image loading/cascade acceptance, without screenshots or broad viewport/engine suites. The share-image render is artifact generation, not a page screenshot review.
- Owner judges black-background readability/balance and the new share image.

## Boundaries

This is not a general artwork audit or a hosting purge. Preserve all old assets and historical docs; update only current background guidance. Stop for unrelated dirty work, new protected behavior, or required changes to artwork/Scryfall/identity logic. Follow RobDev and RobQA frozen gates and the standard branch-to-Owner workflow.
