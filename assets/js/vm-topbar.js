/* ---------------------------------------------------------------
   Vox Mana Topbar — Batch 3
   - Sets aria-current on the active nav link based on body's
     data-vm-current attribute.
   - Dropdown menu open/close with focus management and Esc/outside
     click dismissal.
   - The reduce-motion toggle inside the menu syncs with the
     existing reduce-motion.js localStorage state.
   - Keep this script idempotent: safe to load on every page.
   --------------------------------------------------------------- */

(function () {
  "use strict";

  // ---- 1. mark the active nav link --------------------------------
  function highlightCurrentPage() {
    var current = document.body.dataset.vmCurrent;
    if (!current) return;
    var link = document.querySelector(
      '.vm-nav-link[data-vm-nav="' + current + '"]'
    );
    if (link) link.setAttribute("aria-current", "page");
  }

  // ---- 2. dropdown menu -------------------------------------------
  function setupMenu() {
    var trigger = document.querySelector("[data-vm-menu-trigger]");
    var panel = document.querySelector("[data-vm-menu-panel]");
    if (!trigger || !panel) return;

    function open() {
      trigger.setAttribute("aria-expanded", "true");
      panel.dataset.open = "true";
      // Move focus to the first interactive item in the panel.
      var firstItem = panel.querySelector(
        'button, [href], [tabindex]:not([tabindex="-1"])'
      );
      if (firstItem) firstItem.focus();
    }

    function close(returnFocus) {
      trigger.setAttribute("aria-expanded", "false");
      panel.dataset.open = "false";
      if (returnFocus) trigger.focus();
    }

    trigger.addEventListener("click", function (e) {
      e.stopPropagation();
      var isOpen = trigger.getAttribute("aria-expanded") === "true";
      if (isOpen) close(false);
      else open();
    });

    // Close on outside click
    document.addEventListener("click", function (e) {
      if (panel.dataset.open !== "true") return;
      if (panel.contains(e.target) || trigger.contains(e.target)) return;
      close(false);
    });

    // Close on Esc
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.dataset.open === "true") {
        close(true);
      }
    });
  }

  // ---- 3. reduce-motion toggle inside the menu --------------------
  // Mirrors the behavior of reduce-motion.js so the menu item stays
  // in sync with the rest of the site. The localStorage key is
  // vm_reduce_motion per the master reference (Batch 1).
  function setupReduceMotionToggle() {
    var STORAGE_KEY = "vm_reduce_motion";
    var btn = document.querySelector('[data-vm-toggle="reduce-motion"]');
    if (!btn) return;

    var statusEl = btn.querySelector("[data-vm-status]");

    function readState() {
      try {
        return localStorage.getItem(STORAGE_KEY) === "true";
      } catch (_) {
        return false;
      }
    }

    function writeState(on) {
      try {
        localStorage.setItem(STORAGE_KEY, on ? "true" : "false");
      } catch (_) {}
    }

    function applyState(on) {
      // Match the existing pattern: data attribute on <html> and <body>
      document.documentElement.dataset.vmReduceMotion = on ? "true" : "false";
      document.body.dataset.vmReduceMotion = on ? "true" : "false";

      btn.dataset.active = on ? "true" : "false";
      btn.setAttribute("aria-pressed", on ? "true" : "false");

      if (statusEl) {
        statusEl.textContent = on ? "On" : "Off";
      }

      var tooltip = on
        ? btn.dataset.vmTooltipOn
        : btn.dataset.vmTooltipOff;
      if (tooltip) btn.setAttribute("data-vm-tooltip", tooltip);
    }

    // Initialise from localStorage. If reduce-motion.js already ran,
    // it will have written the same value — this is just a safety net.
    var current = readState();
    applyState(current);

    btn.addEventListener("click", function () {
      var next = !(btn.dataset.active === "true");
      writeState(next);
      applyState(next);
    });

    // Listen for cross-tab changes
    window.addEventListener("storage", function (e) {
      if (e.key === STORAGE_KEY) applyState(e.newValue === "true");
    });
  }

  // ---- boot --------------------------------------------------------
  function init() {
    highlightCurrentPage();
    setupMenu();
    setupReduceMotionToggle();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
