export const CARD_VOICE_SECTION_INTRO = "Lines of Magic flavor that sound like this reading.";
export const CARD_VOICE_TILE_LABEL = "Exact card voice";
export const CARD_PLAY_SECTION_INTRO = "Cards whose verified play patterns give you a concrete way to explore this reading.";
export const CARD_PLAY_TILE_LABEL = "Why it fits in play";

export function buildIdentityCardModalHeading({ kind, cardName, identityName } = {}) {
  return kind === "voice"
    ? `What this card's voice reveals about ${identityName}`
    : `Why ${cardName} helps explain ${identityName} in play`;
}
