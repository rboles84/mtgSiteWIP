import assert from "node:assert/strict";
import { stripApiMetadataFromQuery } from "./scryfall-parser.js";
import { buildScryfallApiSearchUrl } from "./research-search.js";
import { buildScryfallWebSearchUrl, parseAlternativeApi, renderQueryInspector, serializeAlternativeApi } from "./research-ui.js";

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
  alternative.onclick();
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
  const fetchUrls = [];
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
      this.onclick = null;
      this._innerHTML = "";
      this.className = "";
    }

    set innerHTML(value) {
      this._innerHTML = String(value ?? "");
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

    addEventListener(event, handler) {
      this[`on${event}`] = handler;
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
    return element;
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
    querySelectorAll(selector) {
      return selector === ".qi-alt" ? altButtons : [];
    },
    addEventListener() {}
  };

  [
    "search-input", "search-btn", "state-panel", "card-grid", "results-header",
    "results-footer", "err-msg", "recent-list", "recent-section", "query-inspector",
    "qi-query", "qi-reason", "qi-scryfall", "res-count", "btn-more", "more-count",
    "mode-ai", "mode-raw", "mode-builder", "search-icon", "builder-panel", "kw-wrap",
    "kw-suggestions", "modal-inner", "modal-bg"
  ].forEach((id) => body.appendChild(createElement(id === "qi-scryfall" ? "a" : "div", id)));

  const windowStub = {
    document: documentStub,
    location: { search: "" },
    addEventListener() {}
  };

  Object.defineProperty(globalThis, "document", { value: documentStub, configurable: true });
  Object.defineProperty(globalThis, "window", { value: windowStub, configurable: true });
  Object.defineProperty(globalThis, "location", { value: windowStub.location, configurable: true });
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
      return {
        async json() {
          return { object: "list", total_cards: 0, data: [], has_more: false };
        }
      };
    },
    configurable: true
  });

  return {
    fetchUrls,
    getCopiedText: () => copiedText
  };
}
