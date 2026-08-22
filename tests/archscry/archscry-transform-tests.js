import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const cardMedia = await readFile(new URL("../../assets/js/archscry/runtime/card-media.js", import.meta.url), "utf8");
const dossierView = await readFile(new URL("../../assets/js/archscry/runtime/dossier-view.js", import.meta.url), "utf8");
const css = await readFile(new URL("../../assets/css/archscry.css", import.meta.url), "utf8");

assert.match(cardMedia, /createScryfallTransformFaceState\(resolvedCard\)/, "hover preview must use the shared true-transform model");
assert.match(cardMedia, /flipCardPreviewFace/, "hover preview must expose a flip interaction");
assert.match(cardMedia, /renderCardPreviewFace\(transformState\)/, "hover preview must render the existing normalized face state");
assert.match(cardMedia, /face\.oracleText \|\| wordBoundaryExcerpt\(face\.oracleExcerpt\)/, "hover preview must update face-specific Oracle content");
assert.match(cardMedia, /card-preview-flip[\s\S]*?transform-card-glyph[\s\S]*?&#8635;/, "hover transform control must use a familiar circular transform icon on the artwork");
assert.match(cardMedia, /cardPreviewOverlay\?\.contains\(event\.relatedTarget\)/, "source-to-preview pointer movement must preserve the preview");
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
