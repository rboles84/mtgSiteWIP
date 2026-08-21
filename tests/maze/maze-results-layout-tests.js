import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../../maze/index.html", import.meta.url), "utf8");
const css = await readFile(new URL("../../assets/css/maze.css", import.meta.url), "utf8");
const source = await readFile(new URL("../../assets/js/maze/research-init.js", import.meta.url), "utf8");

assert.match(html, /data-stash-open="false"/, "Reading Finds must begin closed");
assert.match(html, /search-input-row[\s\S]*?id="stash-drawer-toggle"[\s\S]*?<\/div>/, "Reading Finds toggle must live with search actions");
assert.doesNotMatch(html, /id="maze-card-preview"/, "Maze must not render a detached hover preview");

assert.match(css, /\.r-body \{[\s\S]*?grid-template-columns: minmax\(220px, 280px\) minmax\(0, 1fr\);/, "desktop layout must reserve only sidebar and results columns");
assert.match(css, /\.card-grid \{[\s\S]*?grid-template-columns: repeat\(5, minmax\(0, 1fr\)\);/, "desktop results must remain capped at five wider columns");
assert.match(css, /@media \(max-width: 1180px\)[\s\S]*?\.card-grid \{\s*grid-template-columns: repeat\(4, minmax\(0, 1fr\)\);/, "intermediate results must use four columns");
assert.match(css, /@media \(max-width: 820px\)[\s\S]*?\.card-grid \{\s*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);/, "mobile results must use two columns");
assert.match(css, /\.stash-rail \{[\s\S]*?position: fixed;/, "Reading Finds must be an overlay drawer");
assert.match(css, /\.stash-panel \{[\s\S]*?rgba\(7, 9, 14, 0\.97\)/, "Reading Finds must use an opaque modal-like surface");
assert.match(css, /@media \(hover: hover\) and \(pointer: fine\)[\s\S]*?\.card-item:hover \.transform-card-media \{[\s\S]*?transform: scale\(2\);/, "desktop hover must magnify artwork in place at 2x");
assert.match(css, /nth-child\(5n \+ 1\)[\s\S]*?transform-origin: left center;[\s\S]*?nth-child\(5n\)[\s\S]*?transform-origin: right center;/, "desktop edge cards must magnify inward");
assert.match(css, /@media \(max-width: 820px\)[\s\S]*?\.card-item:hover \.transform-card-media \{ transform: none; \}/, "touch-sized layouts must not magnify result artwork");

assert.doesNotMatch(source, /showResultCardPreview|hideResultCardPreview|bindResultCardPreview/, "detached preview state must be removed");
assert.match(source, /function beginStashDrag\(event\)[\s\S]*?event\.target\.closest\("button, input, a, textarea, select"\)/, "Reading Finds dragging must ignore interactive header controls");
assert.match(source, /function moveStashDrag\(event\)[\s\S]*?document\.documentElement\.clientWidth[\s\S]*?document\.documentElement\.clientHeight/, "Reading Finds dragging must clamp to the viewport");
assert.match(source, /function resetStashDragForMobile\(\)[\s\S]*?window\.innerWidth > 820[\s\S]*?removeProperty\("left"\)/, "mobile must reset transient drag positioning");
assert.match(source, /window\.addEventListener\("pointermove", moveStashDrag\)[\s\S]*?window\.addEventListener\("pointercancel", endStashDrag\)/, "Reading Finds drag lifecycle must be bound");

console.log("Focused Maze result layout and hover tests passed.");
