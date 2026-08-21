import {
  classifyResultArtRecord,
} from "../archscry-presentation.js";

import {
  buildIdentityCardModalHeading,
} from "../dossier-card-review-text.js";

import {
  createScryfallNamedCardLookup,
} from "../scryfall-card-cache.js";

import {
  approvedCardRationaleForFaction,
} from "./content.js";

import {
  buildActionAttrs,
  canonicalFlavorLookupName,
  cardImageUrl,
  escapeAttributeValue,
  escapeHtml,
  normalizeCardName,
  renderManaCost,
} from "./render-utils.js";

import {
  APP_STATE,
} from "./state.js";

export function shouldDisableResultCardArt() {
  return globalThis.__vmVisualRegressionDisableCardArt === true;
}

export function resultArtCandidate(name, id, imageClass) {
  const classified = classifyResultArtRecord(name, APP_STATE.preconCatalog);
  return {
    id,
    imageClass,
    displayName: classified.displayName,
    name: classified.lookupName,
    recordType: classified.lookupRecordType,
    sourceRecordType: classified.recordType,
  };
}

export function renderUnavailableCardArt(slot) {
  if (!slot) return;
  slot.classList.add("is-unavailable");
  slot.dataset.cardArtStatus = "not_found";
  slot.setAttribute("aria-label", "Card image unavailable");
  slot.innerHTML = '<span aria-hidden="true">Image unavailable</span>';
}

export function renderRetryableCardArt(slot) {
  if (!slot) return;
  slot.classList.remove("is-unavailable");
  slot.classList.add("is-retryable");
  slot.dataset.cardArtStatus = "transient_error";
  slot.setAttribute("aria-label", "Card image temporarily unavailable");
  slot.innerHTML = '<span aria-hidden="true">Image temporarily unavailable</span>';
}

export function isResultArtSlotVisible(slot) {
  if (!slot?.isConnected) return false;
  for (let node = slot; node instanceof HTMLElement; node = node.parentElement) {
    if (node.hidden && !node.matches("[data-commander-preview-block]")) return false;
  }
  return true;
}

export function orderedImageCandidates(card = {}) {
  const candidates = Array.isArray(card.image_candidates)
    ? card.image_candidates.map((candidate) => candidate?.url).filter(Boolean)
    : [];
  const fallback = [
    card.image_uris?.normal,
    card.card_faces?.[0]?.image_uris?.normal,
    card.image_uris?.art_crop,
    card.card_faces?.[0]?.image_uris?.art_crop,
    card.image_uris?.small,
    card.card_faces?.[0]?.image_uris?.small,
  ].filter(Boolean);
  return [...new Set([...candidates, ...fallback])].filter((url) => /^https:\/\/cards\.scryfall\.io\//i.test(url));
}

export function installSlotLocalImageDelivery(slot, image, candidates) {
  let candidateIndex = 0;
  slot.dataset.cardArtStatus = "delivery_pending";
  const loadCandidate = () => {
    image.src = candidates[candidateIndex];
  };
  image.addEventListener("load", () => {
    slot.classList.remove("is-retryable", "is-unavailable");
    slot.dataset.cardArtStatus = "resolved";
  });
  image.addEventListener("error", () => {
    candidateIndex += 1;
    if (candidateIndex < candidates.length) {
      loadCandidate();
      return;
    }
    renderRetryableCardArt(slot);
  });
  loadCandidate();
}

export async function loadResultCardArt(faction, commanderCandidates = [], starterCards = {}, landRecommendations = {}, matrixFlavorSnippets = [], { generation = APP_STATE.resultCardArtGeneration } = {}) {
  const factionIdentity = new Set(faction?.colors || []);
  let verifiedCommanders = 0;
  let visibleCommanderSlots = 0;
  const commanderCards = (commanderCandidates || []).map((candidate, index) => ({
    ...candidate,
    ...resultArtCandidate(candidate.name, `cmd_${index}`, "commander-img"),
    displayName: candidate.name,
    commanderPreview: true,
  }));
  const matrixVoiceCards = (matrixFlavorSnippets || []).map((snippet, index) => {
    const record = snippet.card_record || { name: snippet.card_name, scryfall_uri: snippet.scryfall_uri };
    return {
      name: canonicalFlavorLookupName(record),
      displayName: snippet.card_name || record.name,
      recordType: "CARD",
      id: `mcv_${index}`,
      nameLinkId: `mcv_name_${index}`,
      imageClass: "vm-card-voice-image",
      matrixCardVoice: true,
      resolvedLocally: Boolean(snippet.image_uri || cardImageUrl(record)),
    };
  });
  const allCards = [
    ...commanderCards,
    ...matrixVoiceCards,
    ...(starterCards.creatures || []).map((name, index) => resultArtCandidate(name, `sc_${index}`, "staple-img")),
    ...(starterCards.spells || []).map((name, index) => resultArtCandidate(name, `ss_${index}`, "staple-img")),
    ...(starterCards.permanents || []).map((name, index) => resultArtCandidate(name, `sp_${index}`, "staple-img")),
    ...(landRecommendations.basics || []).map((name, index) => ({ ...resultArtCandidate(name, `lbas_${index}`, "land-img"), recordType: "CARD", name })),
    ...(landRecommendations.premium || []).map((name, index) => ({ ...resultArtCandidate(name, `lp_${index}`, "land-img"), recordType: "CARD", name })),
    ...(landRecommendations.midrange || []).map((name, index) => ({ ...resultArtCandidate(name, `lm_${index}`, "land-img"), recordType: "CARD", name })),
    ...(landRecommendations.budget || []).map((name, index) => ({ ...resultArtCandidate(name, `lb_${index}`, "land-img"), recordType: "CARD", name })),
    ...(landRecommendations.utility || []).map((name, index) => ({ ...resultArtCandidate(name, `lu_${index}`, "land-img"), recordType: "CARD", name })),
  ];

  for (const card of allCards) {
    if (generation !== APP_STATE.resultCardArtGeneration) return;
    const slot = document.getElementById(card.id);
    if (!slot || !isResultArtSlotVisible(slot)) {
      continue;
    }
    slot.dataset.cardArtName = card.displayName || card.name || "";

    if (["loading", "delivery_pending", "resolved", "not_found", "projection_missing"].includes(slot.dataset.cardArtStatus || "")) {
      if (card.commanderPreview) {
        visibleCommanderSlots += 1;
        if (slot.dataset.cardArtStatus === "resolved") verifiedCommanders += 1;
      }
      continue;
    }
    if (slot.dataset.cardArtStatus === "transient_error" && Number(slot.dataset.cardArtDeliveryAttempts || 0) >= 2) {
      continue;
    }

    if (card.matrixCardVoice && card.resolvedLocally) {
      continue;
    }

    if (card.recordType !== "CARD" || !card.name) {
      if (card.commanderPreview) slot.closest("[data-commander-card]")?.remove();
      else renderUnavailableCardArt(slot);
      continue;
    }

    try {
      slot.dataset.cardArtStatus = "loading";
      if (card.commanderPreview) visibleCommanderSlots += 1;
      const resolution = await resolveScryfallNamedCard(card.name, {
        policy: "authored_projection",
        shouldDispatch: () => generation === APP_STATE.resultCardArtGeneration,
      });
      if (generation !== APP_STATE.resultCardArtGeneration || !slot.isConnected) return;
      if (resolution.status !== "resolved" || !resolution.card) {
        if (resolution.status === "projection_missing") {
          slot.dataset.cardArtStatus = "projection_missing";
          console.error(`Governed Archscry media projection is missing ${card.name}.`);
          renderUnavailableCardArt(slot);
          slot.dataset.cardArtStatus = "projection_missing";
        } else {
          renderRetryableCardArt(slot);
        }
        continue;
      }
      const data = resolution.card;
      const imageCandidates = orderedImageCandidates(data);
      const linkUrl = data.scryfall_uri || "#";
      const typeLine = [
        data.type_line || "",
        ...(data.card_faces || []).map((face) => face.type_line || ""),
      ].join(" ");
      const cardIdentity = data.color_identity || [];
      const identityFits = cardIdentity.every((color) => factionIdentity.has(color));
      const isCommanderCreature =
        /legendary/i.test(typeLine) &&
        /creature/i.test(typeLine) &&
        data.legalities?.commander === "legal" &&
        identityFits;

      if (card.commanderPreview && !isCommanderCreature) {
        slot.closest("[data-commander-card]")?.remove();
        continue;
      }

      if (imageCandidates.length) {
        const commanderCard = slot.closest("[data-commander-card]");
        commanderCard?.classList.add("is-verified");
        commanderCard?.closest("[data-commander-preview-block]")?.removeAttribute("hidden");
        const groundedRationale = approvedCardRationaleForFaction(data, faction);
        const rationale = groundedRationale?.rationale || "";
        const provenance = groundedRationale ? JSON.stringify(groundedRationale.provenance) : "";
        const tags = groundedRationale?.tags?.join("|") || "";
        const deliveryAttempts = Number(slot.dataset.cardArtDeliveryAttempts || 0) + 1;
        slot.outerHTML = `<button id="${escapeAttributeValue(card.id)}" class="card-detail-image-trigger" type="button" aria-label="View ${escapeAttributeValue(card.displayName || data.name)} card details" data-card-preview-name="${escapeAttributeValue(card.displayName || data.name)}" data-card-art-name="${escapeAttributeValue(card.displayName || data.name)}" data-card-art-delivery-attempts="${deliveryAttempts}" data-action="open-card-detail" data-card-name="${escapeAttributeValue(data.name)}" data-card-rationale="${escapeAttributeValue(rationale)}" data-card-provenance="${escapeAttributeValue(provenance)}" data-card-tags="${escapeAttributeValue(tags)}"><img class="${card.imageClass}" alt="${escapeAttributeValue(`${data.name} card image`)}" loading="lazy"></button>`;
        const resolvedSlot = document.getElementById(card.id);
        const resolvedImage = resolvedSlot?.querySelector("img");
        if (resolvedSlot && resolvedImage) installSlotLocalImageDelivery(resolvedSlot, resolvedImage, imageCandidates);
        const nameLink = card.nameLinkId ? document.getElementById(card.nameLinkId) : null;
        if (nameLink instanceof HTMLAnchorElement) nameLink.href = linkUrl;
        if (card.commanderPreview) {
          verifiedCommanders += 1;
        }
      } else {
        slot.dataset.cardArtStatus = "projection_missing";
        console.error(`Governed Archscry media projection has no usable image candidates for ${card.name}.`);
        renderUnavailableCardArt(slot);
        slot.dataset.cardArtStatus = "projection_missing";
      }
    } catch (_) {
      const fallback = document.getElementById(card.id);
      if (fallback) renderRetryableCardArt(fallback);
    }

  }

  const previewGrid = document.getElementById("commander-preview-grid");
  const fallback = document.getElementById("commander-preview-fallback");
  if (visibleCommanderSlots && verifiedCommanders < 1) {
    previewGrid?.closest("[data-commander-preview-block]")?.remove();
    fallback?.classList.add("is-visible");
  }
}

export let resultCardArtHydrationQueue = Promise.resolve();

export function hydrateVisibleResultCardArt() {
  const context = APP_STATE.resultCardArtContext;
  if (!context || shouldDisableResultCardArt()) return Promise.resolve();
  const resultInner = document.getElementById("result-inner");
  if (resultInner) resultInner.dataset.cardArtState = "loading";
  resultCardArtHydrationQueue = resultCardArtHydrationQueue
    .catch(() => {})
    .then(async () => {
      if (context.generation !== APP_STATE.resultCardArtGeneration) return;
      await loadResultCardArt(
        context.faction,
        context.commanderCandidates,
        context.starterCards,
        context.landRecommendations,
        context.matrixFlavorSnippets,
        { generation: context.generation },
      );
      if (context.generation === APP_STATE.resultCardArtGeneration && resultInner?.isConnected) {
        resultInner.dataset.cardArtState = "ready";
      }
    })
    .catch(() => {
      if (context.generation === APP_STATE.resultCardArtGeneration && resultInner?.isConnected) {
        resultInner.dataset.cardArtState = "failed";
      }
    });
  return resultCardArtHydrationQueue;
}

export function resolveScryfallNamedCard(name, options = {}) {
  return ScryfallNamedCardLookup.lookupResult(name, { recordType: "CARD", ...options });
}

export async function loadCachedScryfallNamedCard(name, options = {}) {
  const result = await resolveScryfallNamedCard(name, options);
  if (!result.card) throw new Error("Scryfall card art is unavailable for this record.");
  return result.card;
}

export function getScryfallNamedCardStorage() {
  try {
    return typeof localStorage === "undefined" ? null : localStorage;
  } catch (_) {
    return null;
  }
}

export const ScryfallNamedCardLookup = createScryfallNamedCardLookup({
  storage: getScryfallNamedCardStorage(),
  fetchImpl: (...args) => fetch(...args),
  localResolver: (name) => APP_STATE.scryfallLocalCardByName.get(normalizeCardName(name)) || null,
  authoredResolver: (name) => APP_STATE.archscryAuthoredCardByName.get(normalizeCardName(name)) || null,
});

/**
 * Saves the current active result through Google OAuth or a live signed-in session.
 *
 * @returns {Promise<void>} Resolves after the save flow has started or completed.
 */

export let cardPreviewOverlay = null;

export let cardPreviewRequestId = 0;

export let cardDetailDialog = null;

export let cardDetailInvoker = null;

export let glossaryTooltip = null;

export let glossaryTooltipTarget = null;

export function canShowCardPreviewOverlay() {
  return typeof window.matchMedia !== "function" ||
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function ensureCardPreviewOverlay() {
  if (cardPreviewOverlay) {
    return cardPreviewOverlay;
  }
  const overlay = document.createElement("div");
  overlay.className = "card-preview-overlay";
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML = `<img alt="">`;
  document.body.appendChild(overlay);
  cardPreviewOverlay = overlay;
  return overlay;
}

export function positionCardPreviewOverlay(overlay, source, event = null) {
  const rect = source.getBoundingClientRect();
  const preferredWidth = source.classList.contains("land-img") ? 285 : 315;
  const width = Math.min(preferredWidth, Math.max(180, window.innerWidth - 24));
  const height = Math.round(width * 88 / 63);
  const anchorX = event?.clientX || rect.right;
  const anchorY = event?.clientY || rect.top + rect.height / 2;
  const gap = 18;
  const spaceRight = window.innerWidth - anchorX;
  const left = spaceRight > width + gap
    ? anchorX + gap
    : Math.max(12, anchorX - width - gap);
  const top = Math.max(12, Math.min(window.innerHeight - height - 12, anchorY - height / 2));
  overlay.style.width = `${width}px`;
  overlay.style.left = `${left}px`;
  overlay.style.top = `${top}px`;
}

export async function showCardPreviewOverlay(trigger, event = null) {
  if (!canShowCardPreviewOverlay() || !trigger?.boundary) {
    return;
  }
  const requestId = ++cardPreviewRequestId;
  const overlay = ensureCardPreviewOverlay();
  const overlayImage = overlay.querySelector("img");
  const previewTarget = trigger.cardName || trigger.image?.currentSrc || trigger.image?.src || "";
  overlay.dataset.previewTarget = previewTarget;
  delete overlay.dataset.previewResolvedTarget;
  overlay.classList.remove("is-visible");
  overlay.classList.add("is-loading");
  overlay.setAttribute("aria-busy", "true");
  if (overlayImage) {
    overlayImage.removeAttribute("src");
    overlayImage.alt = "";
  }
  let imageUrl = "";
  if (trigger.cardName) {
    try {
      const card = await loadCachedScryfallNamedCard(trigger.cardName);
      imageUrl = cardImageUrl(card);
    } catch (_) {
      return;
    }
  }
  if (!imageUrl && trigger.image instanceof HTMLImageElement) {
    imageUrl = trigger.image.currentSrc || trigger.image.src;
  }
  if (!imageUrl || requestId !== cardPreviewRequestId) return;
  if (typeof Image === "function") {
    const pendingImage = new Image();
    const loaded = new Promise((resolve, reject) => {
      pendingImage.onload = resolve;
      pendingImage.onerror = reject;
    });
    pendingImage.src = imageUrl;
    try {
      await loaded;
    } catch (_) {
      if (requestId === cardPreviewRequestId) {
        overlay.classList.remove("is-loading");
        overlay.removeAttribute("aria-busy");
      }
      return;
    }
  }
  if (requestId !== cardPreviewRequestId) return;
  if (overlayImage) overlayImage.src = imageUrl;
  overlay.dataset.previewResolvedTarget = previewTarget;
  positionCardPreviewOverlay(overlay, trigger.boundary, event);
  overlay.classList.remove("is-loading");
  overlay.removeAttribute("aria-busy");
  overlay.classList.add("is-visible");
}

export function hideCardPreviewOverlay() {
  cardPreviewRequestId += 1;
  cardPreviewOverlay?.classList.remove("is-visible", "is-loading");
  cardPreviewOverlay?.removeAttribute("aria-busy");
  if (cardPreviewOverlay) {
    delete cardPreviewOverlay.dataset.previewTarget;
    delete cardPreviewOverlay.dataset.previewResolvedTarget;
  }
  const image = cardPreviewOverlay?.querySelector("img");
  image?.removeAttribute("src");
}

export const CARD_PREVIEW_IMAGE_SELECTOR = "img.staple-img, img.land-img, img.vm-card-voice-image, img.vm-card-rationale-image";

export function cardPreviewTriggerFromEvent(event) {
  const target = event.target instanceof Element ? event.target : event.target?.parentElement;
  if (!(target instanceof Element)) return null;

  if (target.matches(CARD_PREVIEW_IMAGE_SELECTOR)) {
    const imageLink = target.parentElement?.matches("a[href]") ? target.parentElement : null;
    const namedBoundary = target.closest("[data-card-preview-name]");
    return {
      image: target,
      boundary: namedBoundary || imageLink || target,
      cardName: namedBoundary?.dataset.cardPreviewName || "",
    };
  }

  const imageOnlyCard = target.closest("[data-card-preview-image-only]");
  if (imageOnlyCard instanceof HTMLElement) {
    const imageTrigger = target.closest(".flavor-echo-image-trigger[data-card-preview-name]");
    if (!(imageTrigger instanceof HTMLElement)) return null;
    const image = imageTrigger.querySelector(CARD_PREVIEW_IMAGE_SELECTOR);
    return {
      image: image instanceof HTMLImageElement ? image : null,
      boundary: imageTrigger,
      cardName: imageTrigger.dataset.cardPreviewName || "",
    };
  }

  const namedBoundary = target.closest("[data-card-preview-name]");
  if (namedBoundary instanceof HTMLElement) {
    const image = namedBoundary.querySelector(CARD_PREVIEW_IMAGE_SELECTOR);
    return {
      image: image instanceof HTMLImageElement ? image : null,
      boundary: namedBoundary,
      cardName: namedBoundary.dataset.cardPreviewName || "",
    };
  }

  const imageLink = target.closest("a[href]");
  if (!(imageLink instanceof HTMLAnchorElement)) return null;
  const image = imageLink.querySelector(`:scope > ${CARD_PREVIEW_IMAGE_SELECTOR}`);
  return image instanceof HTMLImageElement ? { image, boundary: imageLink } : null;
}

export function handleCardPreviewPointerOver(event) {
  const trigger = cardPreviewTriggerFromEvent(event);
  if (trigger) {
    void showCardPreviewOverlay(trigger, event);
  }
}

export function handleCardPreviewPointerMove(event) {
  const trigger = cardPreviewTriggerFromEvent(event);
  const requestedTarget = trigger?.cardName || trigger?.image?.currentSrc || trigger?.image?.src || "";
  if (!cardPreviewOverlay?.classList.contains("is-visible")) {
    const sameTargetIsLoading = cardPreviewOverlay?.classList.contains("is-loading") &&
      cardPreviewOverlay.dataset.previewTarget === requestedTarget;
    if (trigger && !sameTargetIsLoading) void showCardPreviewOverlay(trigger, event);
    return;
  }
  if (trigger && cardPreviewOverlay.dataset.previewResolvedTarget !== requestedTarget) void showCardPreviewOverlay(trigger, event);
  else if (trigger) positionCardPreviewOverlay(cardPreviewOverlay, trigger.boundary, event);
  else hideCardPreviewOverlay();
}

export function handleCardPreviewPointerOut(event) {
  const trigger = cardPreviewTriggerFromEvent(event);
  const relatedInside = event.relatedTarget instanceof Node && trigger?.boundary.contains(event.relatedTarget);
  if (trigger && !relatedInside) {
    window.requestAnimationFrame(() => {
      const stillHovered = trigger.boundary.matches?.(":hover");
      const stillFocused = trigger.boundary === document.activeElement || trigger.boundary.contains(document.activeElement);
      if (!stillHovered && !stillFocused) hideCardPreviewOverlay();
    });
  }
}

export function handleCardPreviewFocusIn(event) {
  const trigger = cardPreviewTriggerFromEvent(event);
  if (trigger) {
    void showCardPreviewOverlay(trigger);
  }
}

export function cardRulesDetail(card = {}) {
  if (card.oracle_text) return { label: "Oracle text", text: card.oracle_text };
  const faceOracleText = (card.card_faces || [])
    .map((face) => [face.name, face.oracle_text].filter(Boolean).join(" — "))
    .filter(Boolean)
    .join("\n\n");
  if (faceOracleText) return { label: "Oracle text", text: faceOracleText };
  if (card.oracle_excerpt) return { label: "Oracle excerpt", text: card.oracle_excerpt };
  const faceOracleExcerpt = (card.card_faces || [])
    .map((face) => [face.name, face.oracle_excerpt].filter(Boolean).join(" — "))
    .filter(Boolean)
    .join("\n\n");
  return { label: faceOracleExcerpt ? "Oracle excerpt" : "", text: faceOracleExcerpt };
}

export function ensureCardDetailDialog() {
  if (cardDetailDialog) return cardDetailDialog;
  const dialog = document.createElement("dialog");
  dialog.className = "archscry-card-dialog";
  dialog.setAttribute("aria-labelledby", "archscryCardDialogTitle");
  dialog.innerHTML = `
    <div class="archscry-card-dialog-shell">
      <button class="archscry-card-dialog-close" type="button" aria-label="Close card details" ${buildActionAttrs("close-card-detail")}>×</button>
      <div class="archscry-card-dialog-content" data-card-dialog-content></div>
    </div>`;
  dialog.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest('[data-action="close-card-detail"]')) {
      dialog.close();
      return;
    }
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dialog.open) {
      event.preventDefault();
      dialog.close();
    }
  });
  dialog.addEventListener("close", () => {
    const invoker = cardDetailInvoker;
    cardDetailInvoker = null;
    if (invoker?.isConnected) invoker.focus();
  });
  document.body.appendChild(dialog);
  cardDetailDialog = dialog;
  return dialog;
}

export async function openCardDetail(actionNode) {
  const cardName = String(actionNode?.dataset.cardName || "").trim();
  const identityName = String(actionNode?.dataset.cardIdentityName || "").trim();
  const identityContext = String(actionNode?.dataset.cardIdentityContext || "").trim();
  const identityContextKind = String(actionNode?.dataset.cardIdentityContextKind || "").trim();
  if (!cardName) return;
  hideCardPreviewOverlay();
  const dialog = ensureCardDetailDialog();
  const content = dialog.querySelector("[data-card-dialog-content]");
  if (!content) return;
  cardDetailInvoker = actionNode;
  content.innerHTML = `<p class="archscry-card-dialog-status">Loading verified card data…</p>`;
  if (!dialog.open) dialog.showModal();

  try {
    const card = await loadCachedScryfallNamedCard(cardName, { requireDetails: true });
    const image = cardImageUrl(card);
    const manaCost = card.mana_cost || card.card_faces?.map((face) => face.mana_cost).filter(Boolean).join(" // ") || "";
    const typeLine = card.type_line || card.card_faces?.map((face) => face.type_line).filter(Boolean).join(" // ") || "";
    const rulesDetail = cardRulesDetail(card);
    const isIdentityLinkedCard = ["voice", "play"].includes(identityContextKind);
    const scryfallUrl = /^https:\/\/scryfall\.com\//.test(card.scryfall_uri || "") ? card.scryfall_uri : "";
    const identityContextHeading = buildIdentityCardModalHeading({
      kind: identityContextKind,
      cardName: card.name || cardName,
      identityName,
    });
    const identityContextHtml = identityName && identityContext
      ? `<section class="archscry-card-dialog-identity-context" data-card-identity-context="${escapeAttributeValue(identityContextKind || "identity")}">
          <strong>${escapeHtml(identityContextHeading)}</strong>
          <span>${escapeHtml(identityContext)}</span>
        </section>`
      : "";
    content.innerHTML = `
      <div class="archscry-card-dialog-grid" data-card-dialog-ready>
        ${image ? `<img class="archscry-card-dialog-image" src="${escapeAttributeValue(image)}" alt="${escapeAttributeValue(`${card.name || cardName} card image`)}">` : ""}
        <div class="archscry-card-dialog-copy">
          <div class="section-label">Card Details</div>
          <h2 id="archscryCardDialogTitle">${escapeHtml(card.name || cardName)}</h2>
          ${identityContextHtml}
          ${manaCost ? `<div class="archscry-card-dialog-mana" aria-label="Mana cost">${renderManaCost(manaCost)}</div>` : ""}
          ${typeLine ? `<div class="archscry-card-dialog-type">${escapeHtml(typeLine)}</div>` : ""}
          ${!isIdentityLinkedCard && rulesDetail.text ? `<div class="archscry-card-dialog-rules"><strong>${rulesDetail.label}</strong><span>${escapeHtml(rulesDetail.text).replace(/\n/g, "<br>")}</span></div>` : ""}
          ${scryfallUrl ? `<a class="btn-secondary archscry-card-dialog-external" href="${escapeAttributeValue(scryfallUrl)}" target="_blank" rel="noopener">Open on Scryfall</a>` : ""}
        </div>
      </div>`;
  } catch (_) {
    content.innerHTML = `<p class="archscry-card-dialog-status">Verified card details are unavailable. No fallback description was generated.</p>`;
  }
}

export function handleCardPreviewFocusOut(event) {
  const trigger = cardPreviewTriggerFromEvent(event);
  const relatedInside = event.relatedTarget instanceof Node && trigger?.boundary.contains(event.relatedTarget);
  if (trigger && !relatedInside) {
    hideCardPreviewOverlay();
  }
}

export function ensureGlossaryTooltip() {
  if (glossaryTooltip) return glossaryTooltip;
  const tooltip = document.createElement("div");
  tooltip.id = "archscryGlossaryTooltip";
  tooltip.className = "archscry-glossary-tooltip";
  tooltip.setAttribute("role", "tooltip");
  tooltip.hidden = true;
  document.body.appendChild(tooltip);
  glossaryTooltip = tooltip;
  return tooltip;
}

export function positionGlossaryTooltip(target, tooltip) {
  const rect = target.getBoundingClientRect();
  const gap = 10;
  const margin = 12;
  const maxWidth = Math.min(360, window.innerWidth - margin * 2);
  tooltip.style.maxWidth = `${maxWidth}px`;
  tooltip.style.left = `${margin}px`;
  tooltip.style.top = `${margin}px`;
  const tooltipRect = tooltip.getBoundingClientRect();
  let left = rect.left + rect.width / 2 - tooltipRect.width / 2;
  left = Math.max(margin, Math.min(window.innerWidth - tooltipRect.width - margin, left));
  let top = rect.bottom + gap;
  if (top + tooltipRect.height > window.innerHeight - margin) {
    top = rect.top - tooltipRect.height - gap;
  }
  top = Math.max(margin, Math.min(window.innerHeight - tooltipRect.height - margin, top));
  tooltip.style.left = `${Math.round(left)}px`;
  tooltip.style.top = `${Math.round(top)}px`;
}

export function showGlossaryTooltip(target) {
  const copy = String(target?.dataset.gloss || "").trim();
  if (!copy) return;
  const tooltip = ensureGlossaryTooltip();
  glossaryTooltipTarget?.removeAttribute("aria-describedby");
  glossaryTooltipTarget = target;
  tooltip.textContent = copy;
  tooltip.hidden = false;
  target.setAttribute("aria-describedby", tooltip.id);
  positionGlossaryTooltip(target, tooltip);
}

export function hideGlossaryTooltip(target = null) {
  if (target && target !== glossaryTooltipTarget) return;
  glossaryTooltipTarget?.removeAttribute("aria-describedby");
  glossaryTooltipTarget = null;
  if (glossaryTooltip) glossaryTooltip.hidden = true;
}

export function glossaryTargetFromEvent(event) {
  const target = event.target instanceof Element ? event.target : event.target?.parentElement;
  return target?.closest?.(".archscry-term-help[data-gloss]") || null;
}

export function handleGlossaryPointerOver(event) {
  const target = glossaryTargetFromEvent(event);
  if (target) showGlossaryTooltip(target);
}

export function handleGlossaryPointerOut(event) {
  const target = glossaryTargetFromEvent(event);
  if (!target) return;
  if (event.relatedTarget instanceof Node && target.contains(event.relatedTarget)) return;
  hideGlossaryTooltip(target);
}

export function handleGlossaryFocusIn(event) {
  const target = glossaryTargetFromEvent(event);
  if (target) showGlossaryTooltip(target);
}

export function handleGlossaryFocusOut(event) {
  const target = glossaryTargetFromEvent(event);
  if (target) hideGlossaryTooltip(target);
}

export function handleGlossaryClick(event) {
  const target = glossaryTargetFromEvent(event);
  if (target) {
    event.preventDefault();
    if (target === glossaryTooltipTarget && glossaryTooltip && !glossaryTooltip.hidden) {
      hideGlossaryTooltip(target);
    } else {
      showGlossaryTooltip(target);
    }
    return;
  }
  hideGlossaryTooltip();
}

// Delegated route controls. Keep data-action behavior centralized here.
