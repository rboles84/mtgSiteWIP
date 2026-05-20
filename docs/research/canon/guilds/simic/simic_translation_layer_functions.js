/**
 * Simic Vox Mana Translation Layer
 *
 * Shared function names are preserved for cross-faction compatibility.
 * Their Simic implementation translates control/constraint language into
 * biomancy, adaptation, counters, and ecosystem pressure.
 */

export function Detain(target, reason = 'unstable variable requires observation') {
  return {
    functionName: 'Detain',
    faction: 'Simic Combine',
    mode: 'stabilized-specimen',
    target,
    reason,
    status: 'observed',
    simicRead:
      'The signal is held as a specimen long enough for the ecosystem to observe, stabilize, and redirect it.',
    releaseCondition:
      'Release when a growth path, counter host, or adaptive answer is available.',
  };
}

export function Override(signal, desiredTrait = 'adaptive growth') {
  return {
    functionName: 'Override',
    faction: 'Simic Combine',
    mode: 'biomantic-rewrite',
    originalSignal: signal,
    desiredTrait,
    rewrittenSignal: {
      framing: 'The original behavior is not rejected; it is mutated into a more adaptive organism-pattern.',
      mutationCost: inferMutationCost(desiredTrait),
      likelySideEffect: inferSideEffect(desiredTrait),
    },
  };
}

export function ConstraintField(environment, constraints = []) {
  const normalized = Array.isArray(constraints) ? constraints : [constraints];
  return {
    functionName: 'ConstraintField',
    faction: 'Simic Combine',
    mode: 'evolutionary-pressure-map',
    environment,
    constraints: normalized,
    rewardedTraits: inferRewardedTraits(normalized),
    blockedPaths: inferBlockedPaths(normalized),
    simicRead:
      'The field defines what the ecosystem rewards: growth, evasion, protection, mana, cards, or control.',
  };
}

export function AccretionEngine(seed, growthVectors = ['+1/+1 counters']) {
  const vectors = Array.isArray(growthVectors) ? growthVectors : [growthVectors];
  return {
    functionName: 'AccretionEngine',
    faction: 'Simic Combine',
    mode: 'compounding-growth-loop',
    seed,
    growthVectors: vectors,
    engineLoop: vectors.map((vector, index) => ({
      step: index + 1,
      vector,
      simicAction: translateVector(vector),
    })),
    thresholdPayoff:
      'When enough growth accumulates, convert it into evasion, card draw, mana, board dominance, or an alternate-win threshold.',
  };
}

function inferMutationCost(trait) {
  const text = String(trait).toLowerCase();
  if (text.includes('draw') || text.includes('knowledge')) return 'tempo or mana spent observing the specimen';
  if (text.includes('ramp') || text.includes('mana')) return 'early setup before payoff';
  if (text.includes('evasion')) return 'requires a suitable host body';
  if (text.includes('control') || text.includes('theft')) return 'high mana and board-state commitment';
  return 'counter density, mana, or a stable host organism';
}

function inferSideEffect(trait) {
  const text = String(trait).toLowerCase();
  if (text.includes('growth')) return 'the board becomes more counter-dependent';
  if (text.includes('copy') || text.includes('clone')) return 'the strongest existing pattern becomes more important';
  if (text.includes('protection')) return 'the system may become slower but more resilient';
  return 'the ecosystem becomes more specialized around the chosen trait';
}

function inferRewardedTraits(constraints) {
  const joined = constraints.join(' ').toLowerCase();
  const traits = [];
  if (joined.includes('fly') || joined.includes('air')) traits.push('reach', 'flying', 'tapdown');
  if (joined.includes('few counter')) traits.push('counter seeding', 'adapt activation', 'graft support');
  if (joined.includes('mana')) traits.push('ramp', 'X-scaling', 'activated ability discounts');
  if (joined.includes('removal') || joined.includes('target')) traits.push('protection', 'hexproof-like shielding');
  if (joined.includes('cards') || joined.includes('hand')) traits.push('draw engines', 'selection');
  return traits.length ? traits : ['flexible adaptation', 'counter growth', 'creature-based value'];
}

function inferBlockedPaths(constraints) {
  const joined = constraints.join(' ').toLowerCase();
  const blocks = [];
  if (joined.includes('graveyard hate')) blocks.push('recursion-dependent growth lines');
  if (joined.includes('board wipe')) blocks.push('wide biomass without protection');
  if (joined.includes('low mana')) blocks.push('expensive adapt activations and X-spells');
  return blocks.length ? blocks : ['unfocused growth without a payoff host'];
}

function translateVector(vector) {
  const text = String(vector).toLowerCase();
  if (text.includes('counter')) return 'place, move, or multiply cytoplast growth markers';
  if (text.includes('draw')) return 'convert adaptation into observed knowledge';
  if (text.includes('ramp') || text.includes('mana')) return 'increase available ecological energy';
  if (text.includes('token')) return 'produce additional biomass hosts';
  if (text.includes('copy')) return 'replicate the strongest observed morphology';
  return 'fold the vector into the evolving organism network';
}
