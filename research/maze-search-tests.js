import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { stripApiMetadataFromQuery } from "./scryfall-parser.js";
import { buildScryfallApiSearchUrl } from "./research-search.js";
import { buildScryfallWebSearchUrl, parseAlternativeApi, renderQueryInspector, serializeAlternativeApi } from "./research-ui.js";
import {
  mazeSearchLink,
  resolveMazeLaunchState,
  resolveMazeOperatorQuery,
  resolveMazePathType,
  resolveMazePlainReadingQuery,
} from "../assets/js/maze-handoff.js";

const mazeHtml = readFileSync(new URL("../maze/index.html", import.meta.url), "utf8");
assert.doesNotMatch(mazeHtml, /id="mode-help-btn"/);
assert.doesNotMatch(mazeHtml, /id="mode-help-popover"/);
assert.match(mazeHtml, /<textarea\b[^>]*id="search-input"[^>]*rows="2"[\s\S]*?<\/textarea>/);
assert.doesNotMatch(mazeHtml, /<input\b[^>]*id="search-input"/);
assert.match(mazeHtml, /id="search-copy-btn"[^>]*data-action="copy-query"/);
assert.match(mazeHtml, /id="search-scryfall-link"[^>]*aria-disabled="true"/);
assert.match(mazeHtml, /<details class="sb-section sb-section-recent" id="recent-section"/);
assert.match(mazeHtml, /<details class="sb-section sb-section-color">[\s\S]*id="color-grid"/);

const apiUrl = new URL(buildScryfallApiSearchUrl("otag:mana-rock", {
  unique: "art",
  order: "released",
  dir: "desc"
}));
assert.equal(apiUrl.origin + apiUrl.pathname, "https://api.scryfall.com/cards/search");
assert.equal(apiUrl.searchParams.get("q"), "otag:mana-rock");
assert.equal(apiUrl.searchParams.get("unique"), "art");
assert.equal(apiUrl.searchParams.get("order"), "released");
assert.equal(apiUrl.searchParams.get("dir"), "desc");

const pageUrl = "https://api.scryfall.com/cards/search?q=otag%3Amana-rock&unique=art&order=released&dir=desc&page=2";
assert.equal(buildScryfallApiSearchUrl("ignored", { page: pageUrl, order: "name", dir: "asc" }), pageUrl);

assert.equal(resolveMazeOperatorQuery({ url: "/maze/?q=otag%3Aboard-wipe" }, "https://example.com"), "otag:board-wipe");
assert.equal(resolveMazePathType({ label: "Weird Stretch Commanders" }), "weird-stretch-commanders");
assert.equal(resolveMazePlainReadingQuery({}, { label: "Maze path", factionName: "Azorius" }), "Maze path from Azorius");
assert.deepEqual(
  resolveMazeLaunchState(new URLSearchParams("from=archscry&operatorQuery=c%3Au&q=ignored&plainReadingQuery=Blue+cards&pathType=support-cards"), { returnUrl: "/archscry/" }),
  {
    from: "archscry",
    urlQ: "ignored",
    operatorQuery: "c:u",
    plainReadingQuery: "Blue cards",
    pathType: "support-cards",
    returnUrl: "/archscry/"
  }
);

const mazeLink = mazeSearchLink({ label: "Board Wipes", query: "otag:board-wipe" });
assert.equal(mazeLink.pathType, "board-wipes");
assert.equal(mazeLink.plainReadingQuery, "Board Wipes");
assert.equal(mazeLink.operatorQuery, "otag:board-wipe");
assert.equal(mazeLink.url, "/maze/?q=otag%3Aboard-wipe");

const inspectorUrl = new URL(buildScryfallWebSearchUrl("banned:modern", {
  unique: "cards",
  order: "released",
  dir: "desc"
}));
assert.equal(inspectorUrl.origin + inspectorUrl.pathname, "https://scryfall.com/search");
assert.equal(inspectorUrl.searchParams.get("q"), "banned:modern");
assert.equal(inspectorUrl.searchParams.get("unique"), "cards");
assert.equal(inspectorUrl.searchParams.get("order"), "released");
assert.equal(inspectorUrl.searchParams.get("dir"), "desc");

const serializedApi = serializeAlternativeApi({ unique: "prints", order: "usd", dir: "desc", endpoint: "/cards/search" });
assert.deepEqual(parseAlternativeApi(serializedApi), { unique: "prints", order: "usd", dir: "desc" });
assert.deepEqual(parseAlternativeApi("{bad json"), {});

assert.equal(stripApiMetadataFromQuery("otag:board-wipe order:released direction:desc unique:prints"), "otag:board-wipe");

await runMazeDomMetadataCases();
await runMazeUrlBootCase();

console.log("Maze search metadata helper cases passed.");

async function runMazeDomMetadataCases() {
  const dom = installMazeDomHarness();

  await import("./research-init.js");
  window.location.search = "?from=archscry&fit=WITHERBLOOM&factionName=Witherbloom%20College&readingId=red-reading&pathType=commanders-that-fit&plainReadingQuery=Witherbloom%20commander%20candidates%20in%20black-green%20Commander%20identity&operatorQuery=id%3C%3Dbg%20is%3Acommander%20f%3Acommander%20%28o%3Agraveyard%20OR%20o%3Asacrifice%29&returnUrl=..%2Farchscry%2Findex.html%3Ffrom%3Dmaze%26view%3DWITHERBLOOM%23maze-discovery-paths";
  window.location.href = `http://localhost/maze/index.html${window.location.search}`;
  dom.setLocalStorageItem("vm_archscry_maze_handoff_v1", JSON.stringify({
    returnUrl: "../archscry/index.html",
    placementResult: {
      faction: "R",
      faction_name: "Red",
      evidence_trail: [{
        signal: "graveyard sacrifice tokens",
        answer_title: "Turn loss into pressure",
        prompt: "How should the table remember a spent resource?"
      }]
    }
  }));
  await dom.dispatchWindowEvent("load");

  await new Promise((resolve) => setTimeout(resolve, 0));
  const launchUrl = dom.fetchUrls
    .map((url) => new URL(url, "http://localhost"))
    .find((url) => url.origin + url.pathname === "https://api.scryfall.com/cards/search" &&
      /^id<=bg is:commander f:commander /.test(url.searchParams.get("q") || ""));
  assert.ok(launchUrl, "expected Archscry launch to execute the operator query through Maze search");
  assert.equal(document.body.dataset.mazeMode, "ai");
  assert.match(launchUrl.searchParams.get("q"), /^id<=bg is:commander f:commander /);
  assert.notEqual(launchUrl.searchParams.get("q"), "ignored");

  assert.equal(document.getElementById("discovery-path-list").children.length, 5);
  assert.equal(document.getElementById("quick-search-list").children.length, 12);
  assert.equal(document.getElementById("color-grid").children.length, 15);
  assert.equal(document.getElementById("type-checks").children.length, 8);
  assert.equal(document.getElementById("rarity-checks").children.length, 4);
  assert.equal(document.getElementById("reading-path-list").children.length, 4);
  assert.equal(document.body.dataset.mazeMode, "ai");
  const storedActiveHandoff = JSON.parse(dom.getLocalStorageItem("vm_archscry_maze_handoff_v1"));
  assert.equal(storedActiveHandoff.fit, "WITHERBLOOM");
  assert.equal(storedActiveHandoff.factionName, "Witherbloom College");
  assert.equal(
    storedActiveHandoff.placementResult.faction,
    "R",
    "active Maze sidebar should not mutate the stored primary placement result"
  );
  document.getElementById("kw-input").oninput?.({ target: { value: "tox" } });
  assert.ok(
    document.getElementById("kw-suggestions").children.some((node) => node.dataset.keyword === "toxic"),
    "expected Loom autocomplete to include dictionary-derived keyword suggestions"
  );
  const commanderPath = document.getElementById("reading-path-list").children[0];
  assert.match(commanderPath.dataset.query, /^id<=bg is:commander f:commander /);
  assert.match(commanderPath.dataset.plainReadingQuery, /Witherbloom College commander candidates/i);
  assert.doesNotMatch(commanderPath.dataset.plainReadingQuery, /\bRed\b/);
  assert.equal(commanderPath.dataset.origin, "path");
  const supportPath = document.getElementById("reading-path-list").children[1];
  assert.match(supportPath.dataset.query, /^id<=bg f:commander -is:commander -t:land /);
  assert.match(supportPath.dataset.plainReadingQuery, /noncommander support cards/i);
  assert.match(supportPath.dataset.plainReadingQuery, /Witherbloom College/i);
  assert.equal(document.getElementById("quick-search-list").children[0].dataset.origin, "maze");
  assert.equal(document.getElementById("discovery-path-list").children[0].dataset.origin, "maze");
  assert.equal(document.getElementById("color-grid").children[0].dataset.origin, "maze");

  const bootFetchCount = dom.fetchUrls.length;
  const boardWipeQuery = "otag:board-wipe f:commander";
  const manaRockQuery = "otag:mana-rock f:commander";
  window.runQuickSearch("otag:board-wipe", { unique: "cards", order: "name" });
  await waitForFetchCount(dom.fetchUrls, bootFetchCount + 1);
  let lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), boardWipeQuery);
  assert.equal(lastUrl.searchParams.get("order"), "name");
  assert.equal(lastUrl.searchParams.get("unique"), "cards");
  assert.equal(lastUrl.searchParams.get("dir"), null);
  assert.equal(document.getElementById("recent-section").open, true);
  assert.equal(document.getElementById("search-copy-btn").disabled, false);
  assert.equal(document.getElementById("search-scryfall-link").getAttribute("aria-disabled"), "false");
  assert.equal(new URL(document.getElementById("search-scryfall-link").href).searchParams.get("q"), boardWipeQuery);

  window.changeOrder("usd", "desc");
  await waitForFetchCount(dom.fetchUrls, bootFetchCount + 2);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), boardWipeQuery);
  assert.equal(lastUrl.searchParams.get("order"), "usd");
  assert.equal(lastUrl.searchParams.get("dir"), "desc");
  assert.equal(lastUrl.searchParams.get("unique"), "cards");

  window.changeOrder("name");
  await waitForFetchCount(dom.fetchUrls, bootFetchCount + 3);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), boardWipeQuery);
  assert.equal(lastUrl.searchParams.get("order"), "name");
  assert.equal(lastUrl.searchParams.get("dir"), null);
  assert.equal(lastUrl.searchParams.get("unique"), "cards");

  window.copyQuery();
  assert.equal(dom.getCopiedText(), boardWipeQuery);
  assert.doesNotMatch(dom.getCopiedText(), /\b(?:order|direction|dir|unique):/);

  renderQueryInspector({
    query: "otag:board-wipe",
    reason: "DOM alternative metadata fixture.",
    parserResult: {
      confidence: 0.88,
      reason: "DOM alternative metadata fixture.",
      recognized: [],
      assumptions: [],
      unresolved: [],
      warnings: ["Ambiguous parse: review the alternate query interpretations below."],
      alternatives: [{
        label: "Newest mana rock prints",
        query: "otag:mana-rock",
        api: { unique: "prints", order: "released", dir: "desc" }
      }],
      api: { endpoint: "/cards/search", unique: "cards", order: "name" }
    }
  });
  assert.match(document.getElementById("qi-diagnostics").innerHTML, /Warnings/);
  assert.match(document.getElementById("qi-diagnostics").innerHTML, /Ambiguous parse/);

  const alternative = document.querySelectorAll(".qi-alt")[0];
  assert.ok(alternative, "expected Query Inspector to render an alternative button");
  alternative.onclick?.();
  await waitForFetchCount(dom.fetchUrls, bootFetchCount + 4);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), manaRockQuery);
  assert.equal(lastUrl.searchParams.get("order"), "released");
  assert.equal(lastUrl.searchParams.get("dir"), "desc");
  assert.equal(lastUrl.searchParams.get("unique"), "prints");

  const inspectorUrl = new URL(document.getElementById("qi-scryfall").href);
  assert.equal(inspectorUrl.searchParams.get("q"), manaRockQuery);
  assert.equal(inspectorUrl.searchParams.get("order"), "released");
  assert.equal(inspectorUrl.searchParams.get("dir"), "desc");
  assert.equal(inspectorUrl.searchParams.get("unique"), "prints");

  window.copyQuery();
  assert.equal(dom.getCopiedText(), manaRockQuery);
  assert.doesNotMatch(dom.getCopiedText(), /\b(?:order|direction|dir|unique):/);

  const input = document.getElementById("search-input");
  window.setMode("ai");
  input.value = "red instants in commander";
  await window.doSearch();
  await waitForFetchCount(dom.fetchUrls, bootFetchCount + 5);
  const smartUrl = latestFetchUrl(dom.fetchUrls);
  assert.ok(smartUrl.searchParams.get("q"), "expected Plain Reading to execute a compiled query");
  window.copyQuery();
  assert.equal(dom.getCopiedText(), smartUrl.searchParams.get("q"));

  window.setMode("raw");
  assert.equal(input.value, smartUrl.searchParams.get("q"));
  window.copyQuery();
  assert.equal(dom.getCopiedText(), smartUrl.searchParams.get("q"));

  document.getElementById("sb-format").value = "commander";
  document.getElementById("bld-format").value = "commander";
  input.value = "c:r";
  await window.doSearch();
  await waitForFetchCount(dom.fetchUrls, bootFetchCount + 6);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), "c:r f:commander");

  input.value = "c:u f:modern";
  await window.doSearch();
  await waitForFetchCount(dom.fetchUrls, bootFetchCount + 7);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), "c:u f:modern");

  const explicitQuickFormatStart = dom.fetchUrls.length;
  window.runQuickSearch("c:u f:modern");
  await waitForFetchCount(dom.fetchUrls, explicitQuickFormatStart + 1);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), "c:u f:modern");

  const noStaleFormatStart = dom.fetchUrls.length;
  document.getElementById("sb-format").value = "";
  window.runQuickSearch("t:artifact");
  await waitForFetchCount(dom.fetchUrls, noStaleFormatStart + 1);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), "t:artifact");

  window.clearSearchInput();
  assert.equal(document.body.dataset.mazeMode, "raw");
  assert.equal(input.value, "");
  assert.equal(document.getElementById("search-copy-btn").disabled, true);
  assert.equal(document.getElementById("search-scryfall-link").getAttribute("aria-disabled"), "true");

  window.setMode("builder");
  document.getElementById("bld-format").value = "modern";
  input.value = "f:modern";
  window.clearSearchInput();
  assert.equal(document.body.dataset.mazeMode, "builder");
  assert.equal(document.getElementById("bld-format").value, "commander");
  assert.equal(input.value, "f:commander");

  document.getElementById("bld-format").value = "modern";
  window.resetBuilderFilters();
  assert.equal(document.body.dataset.mazeMode, "builder");
  assert.equal(document.getElementById("bld-format").value, "commander");
  assert.equal(input.value, "f:commander");
  assert.equal(document.getElementById("builder-generated-query").textContent, "f:commander");

  window.setMode("raw");
  renderQueryInspector({
    query: "c:r f:commander",
    inputValue: "c:r f:commander",
    api: { unique: "cards", order: "name" }
  });
  assert.ok(document.getElementById("query-inspector").classList.contains("hidden"));

  renderQueryInspector({
    query: "c:r f:commander",
    inputValue: "c:r",
    normalized: true,
    reason: "Applied Commander format.",
    api: { unique: "cards", order: "name" }
  });
  assert.equal(document.getElementById("qi-label").textContent, "Normalized syntax");
  assert.equal(document.getElementById("qi-query").textContent, "c:r f:commander");
  assert.equal(document.getElementById("query-inspector").classList.contains("hidden"), false);

  window.setMode("ai");
  renderQueryInspector({
    query: "c:r t:vampire f:commander",
    inputValue: "red vampires",
    reason: "Translated a plain-language phrase.",
    api: { unique: "cards", order: "name" }
  });
  assert.equal(document.getElementById("qi-input").textContent, "red vampires");
  assert.equal(document.getElementById("qi-query").textContent, "c:r t:vampire f:commander");

  window.setMode("builder");
  renderQueryInspector({
    query: "c:ur t:creature f:commander",
    api: { unique: "cards", order: "name" }
  });
  assert.ok(document.getElementById("query-inspector").classList.contains("hidden"));

  document.getElementById("sb-format").value = "";
  window.setMode("raw");
  input.value = "c:r\nkw:haste";
  const rawMultilineStart = dom.fetchUrls.length;
  await window.doSearch();
  await waitForFetchCount(dom.fetchUrls, rawMultilineStart + 1);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), "c:r kw:haste");

  const rawAndStart = dom.fetchUrls.length;
  document.getElementById("sb-format").value = "commander";
  input.value = "c:r AND t:creature";
  await window.doSearch();
  await waitForFetchCount(dom.fetchUrls, rawAndStart + 1);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), "c:r t:creature f:commander");
  assert.equal(input.value, "c:r t:creature f:commander");
  assert.match(document.getElementById("qi-diagnostics").innerHTML, /Alternatives/);

  const exactStart = dom.fetchUrls.length;
  dom.setFetchResponses([{
    object: "card",
    name: "Lightning Bolt",
    type_line: "Instant",
    oracle_text: "Lightning Bolt deals 3 damage to any target.",
    scryfall_uri: "https://scryfall.com/card/test/lightning-bolt",
    set: "lea",
    collector_number: "161"
  }]);
  window.setMode("ai");
  input.value = "! Lightning Bolt";
  await window.doSearch();
  await waitForFetchCount(dom.fetchUrls, exactStart + 1);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.origin + lastUrl.pathname, "https://api.scryfall.com/cards/named");
  assert.equal(lastUrl.searchParams.get("fuzzy"), "Lightning Bolt");
  assert.notEqual(lastUrl.origin + lastUrl.pathname, "https://api.scryfall.com/cards/search");
  assert.equal(document.body.style.overflow, "hidden", "expected exact-name search to open the card modal");
  window.copyQuery();
  assert.equal(dom.getCopiedText(), "Lightning Bolt");
  window.closeModal();

  const builderStart = dom.fetchUrls.length;
  window.setMode("builder");
  window.resetBuilderFilters();
  document.getElementById("bld-format").value = "modern";
  document.getElementById("bld-format").onchange?.({ target: document.getElementById("bld-format") });
  await window.doSearch();
  await waitForFetchCount(dom.fetchUrls, builderStart + 1);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), "f:modern");
  assert.ok(document.getElementById("query-inspector").classList.contains("hidden"));

  const quickAfterBuilderStart = dom.fetchUrls.length;
  document.getElementById("sb-format").value = "";
  window.runQuickSearch("t:artifact", { useFormatDefault: false });
  await waitForFetchCount(dom.fetchUrls, quickAfterBuilderStart + 1);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), "t:artifact");

  let prevented = false;
  window.handleSearchInputKeydown({
    key: "Enter",
    shiftKey: true,
    preventDefault() {
      prevented = true;
    }
  });
  assert.equal(prevented, false);

  const dossierPathFetchStart = dom.fetchUrls.length;
  window.runQuickSearch(commanderPath.dataset.query, {
    plainReadingQuery: commanderPath.dataset.plainReadingQuery,
    origin: commanderPath.dataset.origin,
    useFormatDefault: false
  });
  await waitForFetchCount(dom.fetchUrls, dossierPathFetchStart + 1);
  window.setMode("ai");
  assert.equal(document.getElementById("search-input").value, commanderPath.dataset.plainReadingQuery);
  window.setMode("raw");
  assert.equal(document.getElementById("search-input").value, commanderPath.dataset.query);

  const localPageStart = dom.fetchUrls.length;
  dom.setFetchResponses([{
    object: "list",
    total_cards: 30,
    data: makeTestCards(30, "Local"),
    has_more: false
  }]);
  window.runQuickSearch("t:creature", { useFormatDefault: false });
  await waitForFetchCount(dom.fetchUrls, localPageStart + 1);
  assert.equal(document.getElementById("card-grid").children.length, 24);
  await window.loadMore();
  assert.equal(dom.fetchUrls.length, localPageStart + 1);
  assert.equal(document.getElementById("card-grid").children.length, 30);

  const nextPageUrl = "https://api.scryfall.com/cards/search?page=2&q=t%3Ainstant";
  const remotePageStart = dom.fetchUrls.length;
  dom.setFetchResponses([
    {
      object: "list",
      total_cards: 34,
      data: makeTestCards(24, "Remote"),
      has_more: true,
      next_page: nextPageUrl
    },
    {
      object: "list",
      total_cards: 34,
      data: makeTestCards(10, "Remote More"),
      has_more: false
    }
  ]);
  window.runQuickSearch("t:instant", { useFormatDefault: false });
  await waitForFetchCount(dom.fetchUrls, remotePageStart + 1);
  await window.loadMore();
  await waitForFetchCount(dom.fetchUrls, remotePageStart + 2);
  assert.equal(dom.fetchUrls.at(-1), nextPageUrl);
  assert.equal(document.getElementById("card-grid").children.length, 34);
}

async function runMazeUrlBootCase() {
  const dom = installMazeDomHarness();
  await import("./research-init.js?url-boot");
  window.location.search = "?q=c%3Ar%20AND%20t%3Acreature";
  window.location.href = `http://localhost/maze/index.html${window.location.search}`;
  await dom.dispatchWindowEvent("load");
  await new Promise((resolve) => setTimeout(resolve, 0));

  const searchUrl = dom.fetchUrls
    .map((url) => new URL(url, "http://localhost"))
    .find((url) => url.origin + url.pathname === "https://api.scryfall.com/cards/search");
  assert.ok(searchUrl, "expected URL-seeded raw launch to execute a Scryfall search");
  assert.equal(document.body.dataset.mazeMode, "raw");
  assert.equal(document.getElementById("search-input").value, "c:r AND t:creature");
  assert.equal(searchUrl.searchParams.get("q"), "c:r t:creature");
}

function makeTestCards(count, prefix) {
  return Array.from({ length: count }, (_, index) => ({
    id: `${prefix}-${index}`,
    name: `${prefix} Card ${index + 1}`,
    type_line: "Creature",
    color_identity: [],
    scryfall_uri: "https://scryfall.com/card/test",
    set: "tst",
    collector_number: String(index + 1)
  }));
}

function latestFetchUrl(fetchUrls) {
  return new URL(fetchUrls.at(-1));
}

async function waitForFetchCount(fetchUrls, count) {
  for (let i = 0; i < 25 && fetchUrls.length < count; i++) {
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.equal(fetchUrls.length, count);
}

function installMazeDomHarness() {
  const elements = new Map();
  const allElements = [];
  const fetchUrls = [];
  let fetchResponses = [];
  let copiedText = "";
  let altButtons = [];
  const windowEvents = new Map();
  const localStorageValues = new Map();

  class FakeClassList {
    constructor() {
      this.values = new Set();
    }

    add(...names) {
      names.forEach((name) => this.values.add(name));
    }

    remove(...names) {
      names.forEach((name) => this.values.delete(name));
    }

    toggle(name, force) {
      const shouldAdd = force ?? !this.values.has(name);
      if (shouldAdd) {
        this.values.add(name);
      } else {
        this.values.delete(name);
      }
      return shouldAdd;
    }

    contains(name) {
      return this.values.has(name);
    }
  }

  class FakeElement {
    constructor(tagName = "div", id = "") {
      this.tagName = tagName.toUpperCase();
      this.id = id;
      this.children = [];
      this.parentNode = null;
      this.classList = new FakeClassList();
      this.dataset = {};
      this.style = {};
      this.textContent = "";
      this.value = "";
      this.href = "";
      this.disabled = false;
      this.open = false;
      this.onclick = null;
      this._innerHTML = "";
      this._className = "";
      this.attributes = new Map();
      this.nodeType = 1;
    }

    set className(value) {
      this._className = String(value || "");
      this.classList.values = new Set(this._className.split(/\s+/).filter(Boolean));
    }

    get className() {
      return this._className;
    }

    get firstChild() {
      return this.children[0] || null;
    }

    get selectedOptions() {
      return [{ textContent: this.value || "" }];
    }

    set innerHTML(value) {
      this._innerHTML = String(value ?? "");
      this.children = [];
      if (this.id === "qi-diagnostics") {
        altButtons = parseAlternativeButtons(this._innerHTML);
      }
    }

    get innerHTML() {
      return this._innerHTML;
    }

    appendChild(child) {
      this.children.push(child);
      child.parentNode = this;
      if (child.id) elements.set(child.id, child);
      return child;
    }

    replaceChildren(...children) {
      this.children = [];
      this.textContent = "";
      children.forEach((child) => this.appendChild(child));
      this._innerHTML = "";
    }

    removeChild(child) {
      this.children = this.children.filter((item) => item !== child);
      child.parentNode = null;
      return child;
    }

    remove() {
      this.parentNode?.removeChild(this);
    }

    addEventListener(event, handler) {
      this[`on${event}`] = handler;
    }

    setAttribute(name, value) {
      this.attributes.set(name, String(value));
      if (name === "id") {
        this.id = String(value);
        elements.set(this.id, this);
      }
      if (name === "class") this.className = value;
      if (name === "href") this.href = String(value);
      if (name.startsWith("data-")) {
        const key = name.slice(5).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        this.dataset[key] = String(value);
      }
    }

    getAttribute(name) {
      return this.attributes.get(name) || null;
    }

    removeAttribute(name) {
      this.attributes.delete(name);
    }

    toggleAttribute(name, force) {
      const shouldSet = force ?? !this.attributes.has(name);
      if (shouldSet) this.setAttribute(name, "");
      else this.removeAttribute(name);
      return shouldSet;
    }

    querySelector(selector) {
      return queryAllFrom(this.children, selector)[0] || null;
    }

    querySelectorAll(selector) {
      return queryAllFrom(this.children, selector);
    }

    contains(target) {
      return target === this || this.children.some((child) => child.contains?.(target));
    }

    focus() {}

    select() {}
  }

  function createElement(tagName, id = "") {
    const element = new FakeElement(tagName, id);
    if (id) elements.set(id, element);
    allElements.push(element);
    return element;
  }

  function queryAllFrom(nodes, selector) {
    const results = [];
    nodes.forEach((node) => {
      if (matchesSelector(node, selector)) results.push(node);
      results.push(...queryAllFrom(node.children || [], selector));
    });
    return results;
  }

  function matchesSelector(node, selector) {
    if (!node) return false;
    if (selector.startsWith("#")) return node.id === selector.slice(1);
    if (selector.startsWith(".")) return node.classList.contains(selector.slice(1));
    if (selector === "[data-stash-toggle-count]") return Object.hasOwn(node.dataset, "stashToggleCount");
    if (selector === "[data-action]") return Boolean(node.dataset.action);
    return false;
  }

  function parseAlternativeButtons(html) {
    const buttons = [];
    const buttonPattern = /<button\b[^>]*class="[^"]*\bqi-alt\b[^"]*"[^>]*>/gi;
    for (const [buttonTag] of html.matchAll(buttonPattern)) {
      const query = getAttributeValue(buttonTag, "data-query");
      const api = getAttributeValue(buttonTag, "data-api");
      const button = createElement("button");
      button.classList.add("qi-alt");
      button.dataset.query = decodeHtmlAttribute(query);
      button.dataset.api = decodeHtmlAttribute(api);
      buttons.push(button);
    }
    return buttons;
  }

  function getAttributeValue(tag, name) {
    const pattern = new RegExp(`${name}="([^"]*)"`, "i");
    return tag.match(pattern)?.[1] || "";
  }

  function decodeHtmlAttribute(value) {
    return String(value ?? "")
      .replace(/&quot;/g, "\"")
      .replace(/&#039;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&");
  }

  const body = createElement("body", "body");
  const page = createElement("main");
  page.className = "page";
  body.appendChild(page);
  const documentStub = {
    body,
    createElement,
    createTextNode(text) {
      const node = createElement("#text");
      node.nodeType = 3;
      node.textContent = String(text ?? "");
      return node;
    },
    getElementById(id) {
      return elements.get(id) || null;
    },
    querySelector(selector) {
      return selector === "body" ? body : allElements.find((node) => matchesSelector(node, selector)) || null;
    },
    querySelectorAll(selector) {
      if (selector === ".qi-alt") return altButtons;
      return allElements.filter((node) => matchesSelector(node, selector));
    },
    addEventListener() {}
  };

  [
    "search-input", "search-btn", "state-panel", "card-grid", "results-header",
    "results-footer", "err-msg", "recent-list", "recent-section", "query-inspector",
    "qi-input-wrap", "qi-input-label", "qi-input", "qi-label", "qi-query", "qi-reason",
    "qi-scryfall", "res-count", "btn-more", "more-count", "stash-count", "stash-body",
    "mode-ai", "mode-raw", "mode-builder", "search-icon", "builder-panel", "kw-wrap",
    "kw-input", "kw-suggestions", "kw-chips", "builder-generated-query", "builder-summary",
    "color-op", "bld-format", "cmc-min", "cmc-max", "sb-format", "modal-inner", "modal-bg",
    "maze-mode-context-label", "maze-mode-context-copy", "discovery-path-list",
    "quick-search-list", "color-grid", "type-checks", "rarity-checks", "reading-path-section",
    "reading-path-list", "r-user-badge", "maze-return-banner", "maze-return-copy",
    "maze-return-link", "maze-return-dismiss",
    "stash-drawer-toggle", "search-copy-btn", "search-scryfall-link"
  ].forEach((id) => {
    const tagName = ["qi-scryfall", "search-scryfall-link"].includes(id)
      ? "a"
      : id === "search-input"
        ? "textarea"
        : "div";
    body.appendChild(createElement(tagName, id));
  });

  documentStub.getElementById("stash-drawer-toggle").dataset.stashToggleCount = "true";

  const windowStub = {
    document: documentStub,
    location: {
      href: "http://localhost/maze/index.html",
      origin: "http://localhost",
      pathname: "/maze/index.html",
      search: ""
    },
    addEventListener(event, handler) {
      windowEvents.set(event, handler);
    }
  };

  Object.defineProperty(globalThis, "document", { value: documentStub, configurable: true });
  Object.defineProperty(globalThis, "window", { value: windowStub, configurable: true });
  Object.defineProperty(globalThis, "location", { value: windowStub.location, configurable: true });
  Object.defineProperty(globalThis, "HTMLElement", { value: FakeElement, configurable: true });
  Object.defineProperty(globalThis, "navigator", {
    value: {
      clipboard: {
        writeText(value) {
          copiedText = value;
          return Promise.resolve();
        }
      }
    },
    configurable: true
  });
  Object.defineProperty(globalThis, "localStorage", {
    value: {
      getItem(key) {
        if (String(key).startsWith("vm_scryfall_api_v1:")) return null;
        return localStorageValues.has(key) ? localStorageValues.get(key) : null;
      },
      setItem(key, value) {
        if (String(key).startsWith("vm_scryfall_api_v1:")) return;
        localStorageValues.set(key, String(value));
      },
      removeItem(key) {
        localStorageValues.delete(key);
      },
      clear() {
        localStorageValues.clear();
      }
    },
    configurable: true
  });
  Object.defineProperty(globalThis, "fetch", {
    value: async (url) => {
      fetchUrls.push(String(url));
      const data = fetchResponses.length
        ? fetchResponses.shift()
        : { object: "list", total_cards: 0, data: [], has_more: false };
      return {
        ok: data?.object === "list",
        async json() {
          return data;
        }
      };
    },
    configurable: true
  });
  Object.defineProperty(globalThis, "requestAnimationFrame", {
    value: (handler) => {
      handler();
      return 1;
    },
    configurable: true
  });

  return {
    fetchUrls,
    setFetchResponses(responses) {
      fetchResponses = [...responses];
    },
    setLocalStorageItem(key, value) {
      localStorageValues.set(key, String(value));
    },
    getLocalStorageItem(key) {
      return localStorageValues.has(key) ? localStorageValues.get(key) : null;
    },
    async dispatchWindowEvent(event) {
      await windowEvents.get(event)?.({ type: event });
    },
    getCopiedText: () => copiedText
  };
}
