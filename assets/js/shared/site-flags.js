/*
 * Shared site feature flags.
 *
 * This file stays intentionally tiny so one checked-in switch can hide or
 * reveal the Scrying Terminal without introducing a runtime config service.
 */
(function () {
  "use strict";

  window.VM_SITE_FLAGS = Object.freeze({
    SCRYING_TERMINAL_ENABLED: false,
  });
})();
