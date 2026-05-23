(function () {
  "use strict";

  if (!document.body?.classList.contains("vm-archscry-atlas-preview")) {
    return;
  }

  const vmAtlasResultInner = document.getElementById("result-inner");
  if (!vmAtlasResultInner) {
    return;
  }

  function normalizeVmAtlasLabel(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");
  }

  function getVmAtlasSectionLabel(node) {
    return normalizeVmAtlasLabel(node.querySelector(".section-label")?.textContent || "");
  }

  function createVmAtlasCluster(className) {
    const node = document.createElement("div");
    node.className = className;
    return node;
  }

  function markVmAtlasItem(node, extraClasses = []) {
    if (!node) {
      return null;
    }
    node.classList.add("vm-atlas-item");
    extraClasses.forEach((className) => {
      if (className) {
        node.classList.add(className);
      }
    });
    return node;
  }

  function collectVmAtlasSections() {
    const sections = { misc: [] };
    const nodes = Array.from(vmAtlasResultInner.children).filter((node) => node.nodeType === 1);

    nodes.forEach((node) => {
      const label = getVmAtlasSectionLabel(node);

      if (node.classList.contains("result-context-bar")) {
        sections.context = node;
        return;
      }
      if (node.classList.contains("guild-banner")) {
        sections.banner = node;
        return;
      }
      if (node.id === "adjacent-fits") {
        sections.adjacent = node;
        return;
      }
      if (node.classList.contains("vm-dossier-matrix-section")) {
        sections.matrix = node;
        return;
      }
      if (node.classList.contains("result-status")) {
        sections.status = node;
        return;
      }
      if (node.classList.contains("footer-button-row") && node.querySelector('[data-action="return-primary-reading"]')) {
        sections.returnButton = node;
        return;
      }
      if (node.classList.contains("decks-section")) {
        sections.decks = node;
        return;
      }
      if (node.classList.contains("archetypes-section")) {
        sections.archetypes = node;
        return;
      }
      if (node.classList.contains("staples-section")) {
        sections.staples = node;
        return;
      }
      if (node.classList.contains("lands-section")) {
        sections.lands = node;
        return;
      }
      if (node.classList.contains("footer-actions")) {
        sections.footer = node;
        return;
      }
      if (node.classList.contains("decree-footer")) {
        sections.decree = node;
        return;
      }

      switch (label) {
        case "the shape of the reading":
          sections.shape = node;
          break;
        case "faction fork":
          sections.fork = node;
          break;
        case "table identity":
          sections.table = node;
          break;
        case "lore to mechanic":
          sections.lore = node;
          break;
        case "why this fits you":
          sections.why = node;
          break;
        case "reading omens":
          sections.omens = node;
          break;
        case "start here":
          sections.start = node;
          break;
        case "flavor echoes":
          sections.flavor = node;
          break;
        case "maze discovery paths":
          sections.maze = node;
          break;
        default:
          sections.misc.push(node);
      }
    });

    return sections;
  }

  function appendVmAtlasNode(parent, node, panelClasses = []) {
    if (!parent || !node) {
      return;
    }
    const classNames = panelClasses.slice();
    if (node.classList.contains("starter-section") || node.classList.contains("adjacent-section") || node.classList.contains("decks-section") || node.classList.contains("archetypes-section") || node.classList.contains("staples-section") || node.classList.contains("lands-section")) {
      classNames.unshift("vm-atlas-panel");
    }
    parent.appendChild(markVmAtlasItem(node, classNames));
  }

  function appendVmAtlasSectionIfAny(root, className, nodes) {
    const filtered = nodes.filter(Boolean);
    if (!filtered.length) {
      return;
    }
    const cluster = createVmAtlasCluster(className);
    filtered.forEach((node) => cluster.appendChild(node));
    root.appendChild(cluster);
  }

  function applyVmAtlasComposition() {
    if (!vmAtlasResultInner.querySelector(".guild-banner")) {
      return;
    }
    if (vmAtlasResultInner.querySelector(".vm-atlas-layout")) {
      return;
    }

    const sections = collectVmAtlasSections();
    const layout = createVmAtlasCluster("vm-atlas-layout");

    if (sections.context) {
      layout.appendChild(markVmAtlasItem(sections.context));
    }

    if (sections.banner) {
      layout.appendChild(markVmAtlasItem(sections.banner));
    }

    const signalGrid = createVmAtlasCluster("vm-atlas-signal-grid");
    const signalStack = createVmAtlasCluster("vm-atlas-signal-stack");
    appendVmAtlasNode(signalStack, sections.status, ["vm-atlas-panel"]);
    appendVmAtlasNode(signalStack, sections.returnButton);
    appendVmAtlasNode(signalStack, sections.adjacent, ["vm-atlas-section-adjacent"]);
    appendVmAtlasNode(signalStack, sections.shape, ["vm-atlas-section-shape"]);
    appendVmAtlasNode(signalStack, sections.fork, ["vm-atlas-section-fork"]);
    signalGrid.appendChild(signalStack);
    appendVmAtlasNode(signalGrid, sections.matrix, ["vm-atlas-section-matrix"]);
    layout.appendChild(signalGrid);

    const interpretGrid = createVmAtlasCluster("vm-atlas-interpret-grid");
    appendVmAtlasNode(interpretGrid, sections.table, ["vm-atlas-section-table"]);
    appendVmAtlasNode(interpretGrid, sections.lore, ["vm-atlas-section-lore"]);
    appendVmAtlasNode(interpretGrid, sections.why, ["vm-atlas-section-why"]);
    appendVmAtlasNode(interpretGrid, sections.omens, ["vm-atlas-section-omens"]);
    if (interpretGrid.children.length) {
      layout.appendChild(interpretGrid);
    }

    const launchGrid = createVmAtlasCluster("vm-atlas-launch-grid");
    appendVmAtlasNode(launchGrid, sections.start, ["vm-atlas-section-start"]);
    appendVmAtlasNode(launchGrid, sections.flavor, ["vm-atlas-section-flavor"]);
    appendVmAtlasNode(launchGrid, sections.archetypes, ["vm-atlas-section-archetypes"]);
    if (launchGrid.children.length) {
      layout.appendChild(launchGrid);
    }

    const resourceGrid = createVmAtlasCluster("vm-atlas-resource-grid");
    appendVmAtlasNode(resourceGrid, sections.staples, ["vm-atlas-section-staples"]);
    appendVmAtlasNode(resourceGrid, sections.lands, ["vm-atlas-section-lands"]);
    appendVmAtlasNode(resourceGrid, sections.decks, ["vm-atlas-section-decks"]);
    if (resourceGrid.children.length) {
      layout.appendChild(resourceGrid);
    }

    const trailsGrid = createVmAtlasCluster("vm-atlas-trails-grid");
    appendVmAtlasNode(trailsGrid, sections.maze, ["vm-atlas-section-maze"]);
    sections.misc.forEach((node) => {
      appendVmAtlasNode(trailsGrid, node, ["vm-atlas-section-misc", "vm-atlas-panel"]);
    });
    appendVmAtlasNode(trailsGrid, sections.decree, ["vm-atlas-section-footer"]);
    appendVmAtlasNode(trailsGrid, sections.footer, ["vm-atlas-section-footer"]);
    if (trailsGrid.children.length) {
      layout.appendChild(trailsGrid);
    }

    vmAtlasResultInner.appendChild(layout);
  }

  let vmAtlasApplyScheduled = false;
  let vmAtlasApplying = false;
  let vmAtlasObserver = null;

  function runVmAtlasComposition() {
    vmAtlasApplyScheduled = false;
    if (vmAtlasApplying) {
      return;
    }
    vmAtlasApplying = true;
    vmAtlasObserver?.disconnect();
    try {
      applyVmAtlasComposition();
    } finally {
      vmAtlasObserver?.observe(vmAtlasResultInner, { childList: true });
      vmAtlasApplying = false;
    }
  }

  function scheduleVmAtlasComposition() {
    if (vmAtlasApplyScheduled) {
      return;
    }
    vmAtlasApplyScheduled = true;
    window.requestAnimationFrame(runVmAtlasComposition);
  }

  vmAtlasObserver = new MutationObserver(() => {
    scheduleVmAtlasComposition();
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleVmAtlasComposition, { once: true });
  } else {
    scheduleVmAtlasComposition();
  }

  vmAtlasObserver.observe(vmAtlasResultInner, { childList: true });
})();
