import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import {
  createScryfallResultFaceState,
  createScryfallTransformMediaBehavior,
  createScryfallTransformFaceState,
  flipScryfallResultFaceState,
  flipScryfallTransformFaceState,
  isScryfallResultFlippableCard,
  isScryfallTransformCard,
} from "../../assets/js/shared/scryfall-transform-faces.js";

function face(name, overrides = {}) {
  return {
    name,
    image_uris: { normal: `https://cards.scryfall.io/normal/${encodeURIComponent(name)}.jpg` },
    mana_cost: "{1}{U}",
    type_line: "Creature - Human",
    oracle_text: `${name} rules`,
    oracle_excerpt: `${name} excerpt`,
    power: "2",
    toughness: "2",
    flavor_text: `${name} flavor`,
    artist: `${name} artist`,
    ...overrides,
  };
}

const nicolBolas = {
  name: "Nicol Bolas, the Ravager // Nicol Bolas, the Arisen",
  layout: "transform",
  card_faces: [
    face("Nicol Bolas, the Ravager", { mana_cost: "{1}{U}{B}{R}", type_line: "Legendary Creature - Elder Dragon", power: "4", toughness: "4" }),
    face("Nicol Bolas, the Arisen", { mana_cost: "", type_line: "Legendary Planeswalker - Bolas", power: undefined, toughness: undefined, loyalty: "7" }),
  ],
};

const bruceBanner = {
  name: "Bruce Banner // The Incredible Hulk",
  layout: "modal_dfc",
  selected_face_name: "The Incredible Hulk",
  card_faces: [
    face("Bruce Banner", { type_line: "Legendary Creature - Human Scientist Hero", power: "1", toughness: "3" }),
    face("The Incredible Hulk", { type_line: "Legendary Creature - Gamma Berserker Hero", power: "7", toughness: "7" }),
  ],
};

const ordinaryTransform = {
  name: "Delver of Secrets // Insectile Aberration",
  layout: "transform",
  card_faces: [face("Delver of Secrets"), face("Insectile Aberration")],
};

const modalDfc = {
  name: "Valakut Awakening // Valakut Stoneforge",
  layout: "modal_dfc",
  card_faces: [face("Valakut Awakening"), face("Valakut Stoneforge")],
};

const splitCard = {
  name: "Fire // Ice",
  layout: "split",
  card_faces: [face("Fire"), face("Ice")],
};

const ordinaryCard = {
  name: "Wastes",
  layout: "normal",
  image_uris: { normal: "https://cards.scryfall.io/normal/wastes.jpg" },
};

assert.equal(isScryfallTransformCard(nicolBolas), true);
assert.equal(isScryfallTransformCard(bruceBanner), false);
assert.equal(isScryfallTransformCard(ordinaryTransform), true);
assert.equal(isScryfallTransformCard(modalDfc), false);
assert.equal(isScryfallTransformCard(splitCard), false);
assert.equal(isScryfallTransformCard(ordinaryCard), false);
assert.equal(isScryfallTransformCard({ layout: "transform", card_faces: [face("Only Face")] }), false);
assert.equal(isScryfallTransformCard({ layout: "transform", card_faces: [face("Front"), { name: "Back" }] }), false);
assert.equal(isScryfallResultFlippableCard(nicolBolas), true);
assert.equal(isScryfallResultFlippableCard(bruceBanner), true);
assert.equal(isScryfallResultFlippableCard(modalDfc), true);
assert.equal(isScryfallResultFlippableCard(splitCard), false);
assert.equal(isScryfallResultFlippableCard(ordinaryCard), false);

const bolasFront = createScryfallTransformFaceState(nicolBolas);
assert.equal(bolasFront.activeFace.name, "Nicol Bolas, the Ravager");
assert.equal(bolasFront.activeFace.faceIndex, 0);
assert.equal(bolasFront.activeFace.faceCount, 2);
assert.equal(bolasFront.nextFace.name, "Nicol Bolas, the Arisen");
assert.equal(bolasFront.activeFace.manaCost, "{1}{U}{B}{R}");
assert.equal(bolasFront.activeFace.power, "4");
assert.equal(bolasFront.activeFace.oracleExcerpt, "Nicol Bolas, the Ravager excerpt");

const bolasBack = flipScryfallTransformFaceState(nicolBolas, bolasFront);
assert.equal(bolasBack.activeFace.name, "Nicol Bolas, the Arisen");
assert.equal(bolasBack.activeFace.typeLine, "Legendary Planeswalker - Bolas");
assert.equal(bolasBack.activeFace.loyalty, "7");
assert.equal(flipScryfallTransformFaceState(nicolBolas, bolasBack).activeFace.name, "Nicol Bolas, the Ravager");

const bolasMedia = createScryfallTransformMediaBehavior(nicolBolas);
assert.equal(bolasMedia.selectedFaceName, "Nicol Bolas, the Ravager");
assert.equal(bolasMedia.currentFace.image, nicolBolas.card_faces[0].image_uris.normal);
assert.equal(bolasMedia.currentFace.typeLine, "Legendary Creature - Elder Dragon");
assert.equal(bolasMedia.currentFace.oracleText, "Nicol Bolas, the Ravager rules");
assert.equal(bolasMedia.nextFace.name, "Nicol Bolas, the Arisen");
for (const expectedName of [
  "Nicol Bolas, the Arisen",
  "Nicol Bolas, the Ravager",
  "Nicol Bolas, the Arisen",
  "Nicol Bolas, the Ravager",
  "Nicol Bolas, the Arisen",
  "Nicol Bolas, the Ravager",
]) {
  const flippedState = bolasMedia.flip();
  assert.equal(flippedState.activeFace.name, expectedName);
  assert.equal(bolasMedia.selectedFaceName, expectedName);
  assert.equal(bolasMedia.currentFace.name, expectedName);
}
assert.equal(Object.hasOwn(nicolBolas, "selected_face_name"), false, "shared media behavior must keep repeated face selection ephemeral");
assert.equal(createScryfallTransformMediaBehavior(ordinaryCard), null, "ordinary cards must not receive transform media behavior");
const delverMedia = createScryfallTransformMediaBehavior(ordinaryTransform);
assert.equal(delverMedia.currentFace.name, "Delver of Secrets");
assert.equal(delverMedia.flip().activeFace.name, "Insectile Aberration", "another supported transform record must use the same media behavior");
assert.equal(delverMedia.flip().activeFace.name, "Delver of Secrets");


assert.equal(createScryfallTransformFaceState(bruceBanner), null);
assert.equal(createScryfallResultFaceState(bruceBanner).activeFace.name, "The Incredible Hulk");
assert.equal(createScryfallResultFaceState(bruceBanner, "Bruce Banner").activeFace.name, "Bruce Banner");
assert.equal(createScryfallResultFaceState(bruceBanner, "Not a face").activeFace.name, "Bruce Banner");
assert.equal(flipScryfallResultFaceState(bruceBanner, createScryfallResultFaceState(bruceBanner)).activeFace.name, "Bruce Banner");
assert.equal(createScryfallTransformFaceState(modalDfc), null);
assert.equal(createScryfallTransformFaceState(ordinaryCard), null);

assert.equal(Object.hasOwn(bruceBanner, "selected_face_name"), true);
assert.equal(bruceBanner.selected_face_name, "The Incredible Hulk", "face selection must not mutate supplied records");

const mediaIndex = JSON.parse(await readFile(new URL("../../data/scryfall/indexes/archscry-media-index.json", import.meta.url), "utf8"));
const governedBolas = mediaIndex.records.find((record) => record.canonical_name === nicolBolas.name);
const governedBolasState = createScryfallTransformFaceState(governedBolas);
assert.equal(governedBolas?.layout, "transform", "governed Nicol Bolas projection must retain the Scryfall layout");
assert.equal(governedBolasState?.activeFace.name, "Nicol Bolas, the Ravager");
assert.match(governedBolasState?.activeFace.oracleExcerpt || "", /Flying/);
assert.equal(governedBolasState?.nextFace.name, "Nicol Bolas, the Arisen");

console.log("Scryfall transform face utility tests passed.");
