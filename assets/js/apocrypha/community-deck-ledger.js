import {
  listOwnCommunityDeckVotes,
  listPublicCommunityDeckLinks,
  toggleCommunityDeckVote,
} from "../archscry/deck-link-service.js";
import {
  DECK_LINK_PROVIDERS,
  normalizeDeckLinkUrl,
} from "../archscry/deck-links.js";

const providerLabels = new Map(DECK_LINK_PROVIDERS.map((provider) => [provider.key, provider.label]));

const ledgerState = {
  rows: [],
  votes: new Map(),
};

function clearNode(node) {
  if (!node) return;
  if (typeof node.replaceChildren === "function") {
    node.replaceChildren();
    return;
  }
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

function setLedgerStatus(message, tone = "neutral") {
  const status = document.getElementById("community-deck-ledger-status");
  if (!status) return;
  status.textContent = message || "";
  status.dataset.tone = tone;
}

function providerLabel(provider) {
  return providerLabels.get(String(provider || "").trim()) || "External Deck";
}

function safeDeckHref(deckUrl) {
  const normalized = normalizeDeckLinkUrl(deckUrl);
  return normalized.ok ? normalized.deck_url : "";
}

function appendMeta(parent, value) {
  const text = String(value || "").trim();
  if (!text) return;
  const item = document.createElement("span");
  item.textContent = text;
  parent.append(item);
}

function deckLinkTitle(row) {
  return row.deck_title || row.commander_name || "External deck link";
}

function renderVoteButton(row) {
  const vote = ledgerState.votes.get(row.deck_link_id);
  const button = document.createElement("button");
  button.className = "community-deck-vote";
  button.type = "button";
  button.dataset.communityDeckVote = "true";
  button.dataset.deckLinkId = row.deck_link_id;
  button.setAttribute("aria-pressed", vote ? "true" : "false");
  button.textContent = vote
    ? `Boosted (${Number(row.upvote_count || 0)})`
    : `Boost (${Number(row.upvote_count || 0)})`;
  return button;
}

function renderLedgerRows() {
  const list = document.getElementById("community-deck-ledger-list");
  if (!list) return;

  clearNode(list);

  if (!ledgerState.rows.length) {
    const empty = document.createElement("article");
    empty.className = "vm-panel community-deck-card community-deck-card-empty";
    const copy = document.createElement("p");
    copy.textContent = "No public deck links have been approved yet.";
    empty.append(copy);
    list.append(empty);
    return;
  }

  for (const row of ledgerState.rows) {
    const card = document.createElement("article");
    card.className = "vm-panel community-deck-card";

    const head = document.createElement("div");
    head.className = "community-deck-card-head";

    const provider = document.createElement("span");
    provider.className = "community-deck-provider";
    provider.textContent = providerLabel(row.provider);
    head.append(provider);

    const publicAt = document.createElement("span");
    publicAt.className = "community-deck-public-at";
    publicAt.textContent = row.public_at ? new Date(row.public_at).toLocaleDateString() : "Public";
    head.append(publicAt);
    card.append(head);

    const title = document.createElement("h3");
    title.textContent = deckLinkTitle(row);
    card.append(title);

    const meta = document.createElement("div");
    meta.className = "community-deck-meta";
    appendMeta(meta, row.commander_name);
    appendMeta(meta, row.placement_name || row.placement_key);
    appendMeta(meta, row.color_identity_key);
    appendMeta(meta, row.user_display_name);
    if (meta.childElementCount) {
      card.append(meta);
    }

    if (row.user_note) {
      const note = document.createElement("p");
      note.className = "community-deck-note";
      note.textContent = row.user_note;
      card.append(note);
    }

    const actions = document.createElement("div");
    actions.className = "community-deck-actions";

    const href = safeDeckHref(row.deck_url);
    if (href) {
      const link = document.createElement("a");
      link.className = "community-deck-link";
      link.href = href;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = "Open deck";
      actions.append(link);
    }

    actions.append(renderVoteButton(row));
    card.append(actions);
    list.append(card);
  }
}

async function resumeSessionIfAvailable() {
  if (typeof globalThis.vm_resumeSession !== "function") {
    return;
  }

  try {
    await globalThis.vm_resumeSession();
  } catch (_) {}
}

async function refreshOwnVotes() {
  const deckLinkIds = ledgerState.rows.map((row) => row.deck_link_id).filter(Boolean);
  if (!deckLinkIds.length) {
    ledgerState.votes = new Map();
    return;
  }

  try {
    const votes = await listOwnCommunityDeckVotes({ deckLinkIds });
    ledgerState.votes = new Map(votes.map((vote) => [vote.deck_link_id, vote]));
  } catch (_) {
    ledgerState.votes = new Map();
  }
}

async function loadCommunityDeckLedger() {
  setLedgerStatus("Loading Community Deck Ledger...", "muted");

  try {
    await resumeSessionIfAvailable();
    ledgerState.rows = await listPublicCommunityDeckLinks();
    await refreshOwnVotes();
    renderLedgerRows();
    setLedgerStatus(
      ledgerState.rows.length
        ? `${ledgerState.rows.length} approved deck link${ledgerState.rows.length === 1 ? "" : "s"} loaded.`
        : "No approved deck links yet.",
      "ok"
    );
  } catch (error) {
    console.warn("Community Deck Ledger load failed:", error.message || error);
    ledgerState.rows = [];
    ledgerState.votes = new Map();
    renderLedgerRows();
    setLedgerStatus("Community Deck Ledger is not available yet.", "error");
  }
}

function adjustVoteCount(row, action) {
  const count = Number(row.upvote_count || 0);
  row.upvote_count = action === "add" ? count + 1 : Math.max(0, count - 1);
}

async function handleVoteClick(button) {
  const deckLinkId = button.dataset.deckLinkId || "";
  const row = ledgerState.rows.find((candidate) => candidate.deck_link_id === deckLinkId);
  if (!row) return;

  const existingVote = ledgerState.votes.get(deckLinkId) || null;
  button.disabled = true;
  setLedgerStatus("Updating vote...", "muted");

  try {
    const result = await toggleCommunityDeckVote({
      deckLink: { id: deckLinkId, visibility: "public" },
      existingVote,
    });

    if (result.action === "add") {
      ledgerState.votes.set(deckLinkId, { vote_type: "upvote" });
    } else {
      ledgerState.votes.delete(deckLinkId);
    }
    adjustVoteCount(row, result.action);
    renderLedgerRows();
    setLedgerStatus(result.action === "add" ? "Deck link boosted." : "Deck link boost removed.", "ok");
  } catch (error) {
    const message = error.message || "";
    if (/authentication required|authentication_required/i.test(message)) {
      setLedgerStatus("Sign in through Archscry to vote.", "error");
    } else if (/duplicate|unique/i.test(message)) {
      ledgerState.votes.set(deckLinkId, { vote_type: "upvote" });
      renderLedgerRows();
      setLedgerStatus("Deck link already boosted.", "ok");
    } else {
      console.warn("Community Deck Ledger vote failed:", message || error);
      setLedgerStatus("Could not update vote.", "error");
    }
  } finally {
    button.disabled = false;
  }
}

function bindCommunityDeckLedger() {
  const root = document.querySelector("[data-community-deck-ledger]");
  if (!root) return;

  root.addEventListener("click", (event) => {
    const button = event.target.closest("[data-community-deck-vote]");
    if (!(button instanceof HTMLButtonElement)) return;
    void handleVoteClick(button);
  });

  void loadCommunityDeckLedger();
}

document.addEventListener("DOMContentLoaded", bindCommunityDeckLedger);
