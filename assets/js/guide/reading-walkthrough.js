const assetUrl = path => new URL(path, import.meta.url).href;

export const READING_WALKTHROUGH = Object.freeze({
  id: "dossier-reading",
  mainTarget: "#reading-guide-main",
  doneFocusTarget: "#reading-guide-title",
  assets: Object.freeze({
    driverJs: assetUrl("../../vendor/driverjs/1.8.0/driver.js.iife.js"),
    driverCss: assetUrl("../../vendor/driverjs/1.8.0/driver.css"),
    themeCss: assetUrl("../../css/guide-walkthrough.css")
  }),
  steps: Object.freeze([
    Object.freeze({
      target: "#reading-placement-meaning",
      focusTarget: "#placement-meaning-title",
      title: "Understand what the result means",
      description: "Your answers support a Commander direction, not a personality label or power ranking. A second direction is a comparison, not a contradiction."
    }),
    Object.freeze({
      target: "#reading-where-to-start",
      focusTarget: "#where-to-start-title",
      title: "Choose where to start",
      description: "Begin with the question you have now: understand the result, build from it, or keep exploring. The other sections can wait."
    }),
    Object.freeze({
      target: "#dossier-map",
      focusTarget: "#dossier-map-title",
      title: "Read the dossier by question",
      description: "Each dossier section answers a different question. Use the directory as a set of doors, not a checklist."
    }),
    Object.freeze({
      target: "#reading-next",
      focusTarget: "#reading-next-title",
      title: "Choose one next step",
      description: "Return to Archscry with one useful question, begin a reading if needed, or enter the Maze with an idea of your own."
    })
  ])
});

export async function bootReadingWalkthrough() {
  if (new URL(window.location.href).searchParams.getAll("guided").length === 0) {
    return { state: "static" };
  }
  const { startGuideWalkthrough } = await import("../shared/guide-walkthrough.js");
  return startGuideWalkthrough(READING_WALKTHROUGH);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootReadingWalkthrough, { once: true });
} else {
  bootReadingWalkthrough();
}
