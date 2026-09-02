const assetUrl = path => new URL(path, import.meta.url).href;

export const INTRO_WALKTHROUGH = Object.freeze({
  id: "vox-mana-intro",
  mainTarget: "#guide-main",
  doneFocusTarget: "#guide-title",
  assets: Object.freeze({
    driverJs: assetUrl("../../vendor/driverjs/1.8.0/driver.js.iife.js"),
    driverCss: assetUrl("../../vendor/driverjs/1.8.0/driver.css"),
    themeCss: assetUrl("../../css/guide-walkthrough.css")
  }),
  steps: Object.freeze([
    Object.freeze({
      target: "#guide-archscry",
      focusTarget: "#guide-archscry-title",
      title: "Find your Commander direction",
      description: "Archscry uses your answers about Commander table moments to surface a supported direction you can inspect in a dossier."
    }),
    Object.freeze({
      target: "#guide-maze",
      focusTarget: "#guide-maze-title",
      title: "Find cards",
      description: "The Implicit Maze turns plain language, Scryfall syntax, or visual choices into a searchable path."
    }),
    Object.freeze({
      target: "#guide-strategium",
      focusTarget: "#guide-strategium-title",
      title: "Learn the table",
      description: "Strategium helps you read Commander moments, set expectations, and choose a clearer next step."
    }),
    Object.freeze({
      target: "#how-vox-connects",
      focusTarget: "#guide-relationship-title",
      title: "See how Vox Mana fits together",
      description: "See how readings, dossiers, and card discovery connect, with Strategium and Apocrypha supporting table learning and source checking."
    })
  ])
});

export async function bootIntroWalkthrough() {
  if (new URL(window.location.href).searchParams.getAll("guided").length === 0) {
    return { state: "static" };
  }
  const { startGuideWalkthrough } = await import("../shared/guide-walkthrough.js");
  return startGuideWalkthrough(INTRO_WALKTHROUGH);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootIntroWalkthrough, { once: true });
} else {
  bootIntroWalkthrough();
}
