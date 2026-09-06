// Render the authored SVG with committed fonts and sigil; no image-generation model.
// Requires @napi-rs/canvas (optionally resolved via VM_CANVAS_MODULE).
import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { createCanvas, loadImage, GlobalFonts } = require(process.env.VM_CANVAS_MODULE || "@napi-rs/canvas");
const root = fileURLToPath(new URL("../../", import.meta.url));
const sourcePath = path.join(root, "assets/img/social/vox-mana-share-v1.svg");
const outputPath = sourcePath.replace(/\.svg$/, ".png");
let svg = await readFile(sourcePath, "utf8");
for (const [font, family] of [["cormorant-sc-700-latin", "VM Share Title"], ["outfit-variable-latin", "VM Share Text"]]) {
  assert.ok(GlobalFonts.registerFromPath(path.join(root, `assets/fonts/${font}.woff2`), family), `Load ${font}`);
}
const sigil = await readFile(path.join(root, "assets/img/vox-mana-header-logo.svg"), "utf8");
svg = svg.replace(
  '<image href="../vox-mana-header-logo.svg" x="544" y="112" width="112" height="112"/>',
  sigil.replace("<svg ", '<svg x="544" y="112" width="112" height="112" '),
);
const canvas = createCanvas(1200, 630);
canvas.getContext("2d").drawImage(await loadImage(Buffer.from(svg)), 0, 0);
await writeFile(outputPath, canvas.toBuffer("image/png"));
console.log(`Rendered 1200x630 SVG share graphic: ${outputPath}`);
