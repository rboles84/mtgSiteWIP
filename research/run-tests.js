/**
 * Runs the lightweight Research Archives unit suites in one Node process.
 */
await import("./scryfall-parser-tests.js");
await import("./research-builder-tests.js");
await import("./research-syntax-language-tests.js");
await import("./research-mode-tests.js");
