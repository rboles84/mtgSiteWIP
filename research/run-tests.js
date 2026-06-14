/**
 * Runs the lightweight Research Archives unit suites in one Node process.
 */
await import("../assets/js/quick-reading-tests.js");
await import("../assets/js/gate-compression-live-bias-tests.js");
await import("./scryfall-parser-tests.js");
await import("./research-builder-tests.js");
await import("./maze-query-contract-tests.js");
await import("./research-syntax-language-tests.js");
await import("./research-mode-tests.js");
await import("./maze-search-tests.js");
await import("./scryfall-request-dedupe-tests.js");
await import("./archscry-adjacent-navigation-tests.js");
await import("./precon-artifact-tests.js");
await import("./archscry-dossier-followup-tests.js");
await import("./presentation-snapshot-tests.js");
