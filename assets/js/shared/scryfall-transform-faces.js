const FACE_IMAGE_KEYS = ["normal", "large", "png", "small", "art_crop"];
const RESULT_FLIPPABLE_LAYOUTS = new Set(["transform", "modal_dfc"]);

function cleanString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function faceImage(face = {}) {
  for (const key of FACE_IMAGE_KEYS) {
    const candidate = cleanString(face.image_uris?.[key]);
    if (candidate) return candidate;
  }
  return "";
}

function normalizeFace(face, index, count) {
  const name = cleanString(face?.name);
  const image = faceImage(face);
  if (!name || !image) return null;
  return Object.freeze({
    name,
    image,
    manaCost: cleanString(face.mana_cost),
    typeLine: cleanString(face.type_line),
    oracleText: cleanString(face.oracle_text),
    oracleExcerpt: cleanString(face.oracle_excerpt),
    power: cleanString(face.power),
    toughness: cleanString(face.toughness),
    loyalty: cleanString(face.loyalty),
    defense: cleanString(face.defense),
    flavorText: cleanString(face.flavor_text),
    artist: cleanString(face.artist),
    faceIndex: index,
    faceCount: count,
  });
}

export function isScryfallTransformCard(card) {
  if (card?.layout !== "transform" || !Array.isArray(card.card_faces) || card.card_faces.length < 2) {
    return false;
  }
  return card.card_faces.every((face, index, faces) => Boolean(normalizeFace(face, index, faces.length)));
}

function createFaceState(card, selectedFaceName, isEligible) {
  if (!isEligible(card)) return null;
  const faces = card.card_faces.map((face, index) => normalizeFace(face, index, card.card_faces.length));
  const requestedName = cleanString(selectedFaceName);
  const requestedIndex = requestedName ? faces.findIndex((face) => face.name === requestedName) : -1;
  const activeIndex = requestedIndex >= 0 ? requestedIndex : 0;
  const nextIndex = (activeIndex + 1) % faces.length;
  return Object.freeze({
    faces: Object.freeze(faces),
    activeIndex,
    activeFace: faces[activeIndex],
    nextIndex,
    nextFace: faces[nextIndex],
    selectedFaceName: faces[activeIndex].name,
  });
}

export function createScryfallTransformFaceState(card, selectedFaceName = card?.selected_face_name) {
  return createFaceState(card, selectedFaceName, isScryfallTransformCard);
}

export function flipScryfallTransformFaceState(card, state) {
  return createScryfallTransformFaceState(card, state?.nextFace?.name);
}

export function createScryfallTransformMediaBehavior(card, selectedFaceName = card?.selected_face_name) {
  let faceState = createScryfallTransformFaceState(card, selectedFaceName);
  if (!faceState) return null;

  return Object.freeze({
    get selectedFaceName() {
      return faceState.selectedFaceName;
    },
    get currentFace() {
      return faceState.activeFace;
    },
    get nextFace() {
      return faceState.nextFace;
    },
    flip() {
      const nextState = flipScryfallTransformFaceState(card, faceState);
      if (!nextState) return null;
      faceState = nextState;
      return faceState;
    },
  });
}

export function isScryfallResultFlippableCard(card) {
  if (!RESULT_FLIPPABLE_LAYOUTS.has(card?.layout) || !Array.isArray(card.card_faces) || card.card_faces.length < 2) {
    return false;
  }
  return card.card_faces.every((face, index, faces) => Boolean(normalizeFace(face, index, faces.length)));
}

export function createScryfallResultFaceState(card, selectedFaceName = card?.selected_face_name) {
  return createFaceState(card, selectedFaceName, isScryfallResultFlippableCard);
}

export function flipScryfallResultFaceState(card, state) {
  return createScryfallResultFaceState(card, state?.nextFace?.name);
}
