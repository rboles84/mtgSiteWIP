import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const cardMedia = await readFile(new URL("../../assets/js/archscry/runtime/card-media.js", import.meta.url), "utf8");
const sharedFaces = await readFile(new URL("../../assets/js/shared/scryfall-transform-faces.js", import.meta.url), "utf8");
const dossierView = await readFile(new URL("../../assets/js/archscry/runtime/dossier-view.js", import.meta.url), "utf8");
const css = await readFile(new URL("../../assets/css/archscry.css", import.meta.url), "utf8");

assert.match(cardMedia, /createScryfallTransformMediaBehavior\(resolvedCard\)/, "every common Archscry hover preview must use the shared true-transform media behavior");
assert.match(cardMedia, /flipCardPreviewFace/, "hover preview must expose a flip interaction");
assert.match(cardMedia, /renderCardPreviewTransformMedia\(cardPreviewTransformMedia\)/, "hover preview must render the shared closure-owned face interaction");
assert.match(cardMedia, /cardPreviewTransformMedia\.flip\(\)/, "repeated hover flips must advance through the shared media behavior");
assert.match(cardMedia, /face\.oracleText \|\| wordBoundaryExcerpt\(face\.oracleExcerpt\)/, "hover preview must update face-specific Oracle content");
assert.match(cardMedia, /card-preview-media transform-card-media[\s\S]*?card-preview-flip transform-card-button[\s\S]*?transform-card-glyph[\s\S]*?&#8635;/, "hover preview must reuse the proven stable transform-media structure and control contract");
assert.match(sharedFaces, /function createScryfallTransformMediaBehavior[\s\S]*?let faceState = createScryfallTransformFaceState[\s\S]*?flip\(\)[\s\S]*?faceState = nextState/, "shared transform media behavior must own selected-face progression like the proven Maze result pattern");
assert.doesNotMatch(cardMedia, /cardPreviewCard|cardPreviewTransformState|deferCardPreviewBoundaryDismissal/, "failed module-global preview state and lifecycle compensation must be retired");
assert.match(cardMedia, /export const CARD_PREVIEW_IMAGE_SELECTOR = "img\.staple-img, img\.land-img, img\.vm-card-voice-image, img\.vm-card-rationale-image"/, "the common behavior must continue to cover every Archscry preview-bearing surface");
assert.doesNotMatch(cardMedia, /Nicol Bolas|GRIXIS|Card Signals/, "production transform behavior must not branch on fixture card, identity, or section");
assert.match(cardMedia, /export const CARD_PREVIEW_DISMISS_DELAY_MS = 200/, "source and preview must share one bounded transition grace");
assert.match(cardMedia, /export function positionCardPreviewOverlay\(overlay, source\)[\s\S]*?rect\.right \+ gap/, "preview positioning must stay anchored to the source instead of chasing pointer coordinates");
assert.doesNotMatch(cardMedia, /positionCardPreviewOverlay\(cardPreviewOverlay, trigger\.boundary, event\)/, "active source pointer movement must not move the preview away from the pointer");
assert.match(cardMedia, /overlay\.addEventListener\("pointerenter", cancelCardPreviewDismissal\)/, "preview entry must cancel pending source-exit dismissal");
assert.match(cardMedia, /overlay\.addEventListener\("pointerleave"[\s\S]*?scheduleCardPreviewDismissal\(\)/, "preview exit must use the same bounded combined-boundary dismissal");
assert.match(cardMedia, /handleCardPreviewPointerMove[\s\S]*?else if \(!trigger\) scheduleCardPreviewDismissal\(\)/, "delegated pointer movement through the gap must schedule rather than synchronously destroy the preview");
assert.match(cardMedia, /isCardPreviewInteractionActive[\s\S]*?matches\?\.\(":hover"\)[\s\S]*?hasVisibleFocus/, "dismissal must recognize source or preview hover and genuine keyboard-visible focus");
assert.match(cardMedia, /overlay\.addEventListener\("pointerdown"[\s\S]*?cardPreviewPointerOwnsFocus = true/, "pointer activation must be distinguished from genuine keyboard focus");
assert.match(cardMedia, /overlay\.addEventListener\("keydown"[\s\S]*?cardPreviewPointerOwnsFocus = false/, "keyboard interaction must retain focus ownership");
assert.match(cardMedia, /cardPreviewPointerOwnsFocus && overlay\.contains\(document\.activeElement\)[\s\S]*?document\.activeElement\.blur\(\)/, "leaving after a pointer Flip must release pointer-derived focus before dismissal");
assert.match(cardMedia, /cardPreviewOverlay\?\.contains\(event\.relatedTarget\)/, "direct source-to-preview pointer movement must retain the common boundary");
assert.match(cardMedia, /renderCardDetailContent\(content, card, transformState, context\)/, "card details must have one atomic face renderer");
assert.match(cardMedia, /cardDetailTransformState = createScryfallTransformFaceState\(card\)/, "card details must keep independent ephemeral face state");
assert.match(cardMedia, /face\.oracleText \|\| wordBoundaryExcerpt\(face\.oracleExcerpt\)/, "local governed face excerpts must remain visible without concatenating faces");
assert.match(cardMedia, /const imageAlt = face \? `\$\{displayName\} card face` : `\$\{displayName\} card image`/, "dialog image alt text must use the active face name without changing ordinary-card semantics");
assert.match(cardMedia, /data-action=\"flip-card-detail\"/, "transform details must include a visible flip control");
assert.match(cardMedia, /archscry-card-dialog-media[\s\S]*?archscry-transform-button/, "detail transform control must overlay the card media");
assert.doesNotMatch(cardMedia, />Flip to \$\{escapeHtml\(transformState\.nextFace\.name\)\}<\/button>/, "detail transform control must not return to the detached text-button treatment");
assert.doesNotMatch(cardMedia, /vox-telemetry/, "card flipping must remain outside telemetry");

const dimirBlock = dossierView.match(/UB: Object\.freeze\(\{[\s\S]*?\n  \}\),/)?.[0] || "";
assert.match(dimirBlock, /dimir-mortus-strider\.jpg/);
assert.match(dimirBlock, /position: "54% 45%"/);
assert.match(dimirBlock, /Tomasz Jedruszek - Mortus Strider/);
assert.doesNotMatch(dimirBlock, /size:/, "Dimir must use shared cover sizing");
assert.match(css, /\.guild-banner\[data-faction-key="UB"\] \.guild-name \{[\s\S]*?color: #a58ab7 !important;/, "Dimir title color must be muted without changing faction data");

assert.match(css, /\.card-preview-overlay\.is-transform\{[\s\S]*?pointer-events:auto/, "only transform previews should accept pointer interaction");
assert.match(css, /\.card-preview-overlay\{[\s\S]*?aspect-ratio:63 \/ 88;/, "the persistent preview owner must retain stable card-media geometry while images load");
assert.match(css, /\.card-preview-media\{[\s\S]*?position:relative;[\s\S]*?height:100%;/, "shared transform media must fill the persistent Archscry preview boundary");
assert.match(css, /\.card-preview-overlay img\{[\s\S]*?height:100%;[\s\S]*?object-fit:cover;/, "transform face media must preserve the preview interaction box while loading");
assert.match(css, /\.card-preview-flip\[hidden\],[\s\S]*?\.card-preview-face\[hidden\][\s\S]*?display:none;/, "ordinary preview hidden state must override the Flip control's display rule");
assert.match(css, /\.card-preview-flip\{[\s\S]*?position:absolute;[\s\S]*?border-radius:50%/, "preview transform control must be a circular artwork overlay");
assert.match(css, /\.archscry-transform-button\{[\s\S]*?position:absolute;[\s\S]*?width:44px;[\s\S]*?height:44px;/, "detail transform control must keep a stable accessible target");

const primerBlock = dossierView.match(/const colorlessManaPrimerHtml[\s\S]*?: "";/)?.[0] || "";
assert.equal((primerBlock.match(/class="starter-card"/g) || []).length, 2, "Colorless primer must render exactly two cards");
assert.match(primerBlock, /Rocks and Colorless Sources/);
assert.match(primerBlock, /generic costs are not colorless mana\. Command Tower cannot choose colorless/);
assert.doesNotMatch(primerBlock, /color-choice-caution/);
assert.match(css, /\.mana-primer-grid\{[\s\S]*?grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
assert.match(css, /body\.vm-archscry-route \.mana-primer-grid\{grid-template-columns:1fr\}/);
assert.match(css, /\.mana-primer-grid > \*\{[\s\S]*?min-width:0;[\s\S]*?overflow-wrap:anywhere;/);

console.log("Focused Archscry transform, Dimir, and Colorless contract tests passed.");
