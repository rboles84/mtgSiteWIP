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

console.log("Maze search metadata helper cases passed.");

async function runMazeDomMetadataCases() {
  const dom = installMazeDomHarness();

  await import("./research-init.js");

  window.runQuickSearch("otag:board-wipe", { unique: "cards", order: "name" });
  await waitForFetchCount(dom.fetchUrls, 1);
  let lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), "otag:board-wipe");
  assert.equal(lastUrl.searchParams.get("order"), "name");
  assert.equal(lastUrl.searchParams.get("unique"), "cards");
  assert.equal(lastUrl.searchParams.get("dir"), null);
  assert.equal(document.getElementById("recent-section").open, true);
  assert.equal(document.getElementById("search-copy-btn").disabled, false);
  assert.equal(document.getElementById("search-scryfall-link").getAttribute("aria-disabled"), "false");
  assert.equal(new URL(document.getElementById("search-scryfall-link").href).searchParams.get("q"), "otag:board-wipe");

  window.changeOrder("usd", "desc");
  await waitForFetchCount(dom.fetchUrls, 2);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), "otag:board-wipe");
  assert.equal(lastUrl.searchParams.get("order"), "usd");
  assert.equal(lastUrl.searchParams.get("dir"), "desc");
  assert.equal(lastUrl.searchParams.get("unique"), "cards");

  window.changeOrder("name");
  await waitForFetchCount(dom.fetchUrls, 3);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), "otag:board-wipe");
  assert.equal(lastUrl.searchParams.get("order"), "name");
  assert.equal(lastUrl.searchParams.get("dir"), null);
  assert.equal(lastUrl.searchParams.get("unique"), "cards");

  window.copyQuery();
  assert.equal(dom.getCopiedText(), "otag:board-wipe");
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
      alternatives: [{
        label: "Newest mana rock prints",
        query: "otag:mana-rock",
        api: { unique: "prints", order: "released", dir: "desc" }
      }],
      api: { endpoint: "/cards/search", unique: "cards", order: "name" }
    }
  });

  const alternative = document.querySelectorAll(".qi-alt")[0];
  assert.ok(alternative, "expected Query Inspector to render an alternative button");
  alternative.onclick?.();
  await waitForFetchCount(dom.fetchUrls, 4);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), "otag:mana-rock");
  assert.equal(lastUrl.searchParams.get("order"), "released");
  assert.equal(lastUrl.searchParams.get("dir"), "desc");
  assert.equal(lastUrl.searchParams.get("unique"), "prints");

  const inspectorUrl = new URL(document.getElementById("qi-scryfall").href);
  assert.equal(inspectorUrl.searchParams.get("q"), "otag:mana-rock");
  assert.equal(inspectorUrl.searchParams.get("order"), "released");
  assert.equal(inspectorUrl.searchParams.get("dir"), "desc");
  assert.equal(inspectorUrl.searchParams.get("unique"), "prints");

  window.copyQuery();
  assert.equal(dom.getCopiedText(), "otag:mana-rock");
  assert.doesNotMatch(dom.getCopiedText(), /\b(?:order|direction|dir|unique):/);

  const input = document.getElementById("search-input");
  window.setMode("ai");
  input.value = "red instants in commander";
  await window.doSearch();
  await waitForFetchCount(dom.fetchUrls, 5);
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
  await waitForFetchCount(dom.fetchUrls, 6);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), "c:r f:commander");

  input.value = "c:u f:modern";
  await window.doSearch();
  await waitForFetchCount(dom.fetchUrls, 7);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), "c:u f:modern");

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
  await window.doSearch();
  await waitForFetchCount(dom.fetchUrls, 8);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), "c:r kw:haste");

  let prevented = false;
  window.handleSearchInputKeydown({
    key: "Enter",
    shiftKey: true,
    preventDefault() {
      prevented = true;
    }
  });
  assert.equal(prevented, false);

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
  assert.equal(fetchUrls.length, count);
}

function installMazeDomHarness() {
  const elements = new Map();
  const allElements = [];
  const fetchUrls = [];
  let fetchResponses = [];
  let copiedText = "";
  let altButtons = [];

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
  const documentStub = {
    body,
    createElement,
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
    "maze-mode-context-label", "maze-mode-context-copy",
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
    location: { search: "" },
    addEventListener() {}
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

  return {
    fetchUrls,
    setFetchResponses(responses) {
      fetchResponses = [...responses];
    },
    getCopiedText: () => copiedText
  };
}
