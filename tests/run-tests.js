/**
 * Runs the lightweight Research Archives unit suites in one Node process.
 */
await import("./placement/quick-reading-tests.js");
await import("./telemetry/vox-telemetry-tests.js");
await import("./placement/gate-compression-live-bias-tests.js");
await import("./maze/scryfall-parser-tests.js");
await import("./maze/research-builder-tests.js");
await import("./semantic/semantic-readiness-tests.js");
await import("./maze/maze-query-contract-tests.js");
await import("./maze/maze-scratchpad-store-tests.js");
await import("./maze/research-syntax-language-tests.js");
await import("./maze/research-mode-tests.js");
await import("./maze/maze-search-tests.js");
await import("./maze/scryfall-request-dedupe-tests.js");
await import("./archscry/archscry-adjacent-navigation-tests.js");
await import("./precons/precon-artifact-tests.js");
await import("./archscry/archscry-dossier-followup-tests.js");
await import("./snapshots/presentation-snapshot-tests.js");
