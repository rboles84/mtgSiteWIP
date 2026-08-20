(() => {
  const consoleHashes = new Set([
    "#strategium",
    "#readiness-checklist",
    "#strategium-console-title",
    "#strategium-pod-title"
  ]);

  if (consoleHashes.has(window.location.hash)) {
    window.location.replace(`./console/${window.location.hash}`);
  }
})();
