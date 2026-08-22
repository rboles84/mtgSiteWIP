# VM-580 - Transform Hover Preview Interaction Contract

ID: VM-580
Title: Transform Hover Preview Interaction Contract
Status: Backlog
Type: Product interaction repair
Area: Archscry card media
Priority: High
Created: 2026-08-22

## Source

Owner observation during VM-579 acceptance, routed as a follow-up to completed VM-576 transform work.

## Finding

- A transform/flip affordance appears on hover-preview surfaces for non-transform cards.
- For a true transform card such as Nicol Bolas, the Ravager // Nicol Bolas, the Arisen, moving from the source card into the preview does not yet provide the complete pointer-interactive transform contract.
- The existing card-details modal transform behavior works and must remain protected.

## Required outcome

- Only true transform cards expose the hover-preview flip affordance.
- Card hover opens the preview; moving into the preview keeps it open; its flip control is clickable; front/back media and content update in place; leaving both the source card and preview boundary dismisses it.
- Keyboard/focus behavior and non-transform preview dismissal remain coherent.

## Causality and ownership

The responsible implementation is `assets/js/archscry/runtime/card-media.js` with existing transform/preview CSS and tests. VM-579 did not change `card-media.js`, and its CSS diff added only development-panel/direct-review styles. Treat this as a VM-576 follow-up, not VM-579 remediation.

## Not authorized by this intake

No implementation, transform-model change, card resolver rewrite, modal redesign, or VM-579 scope expansion. Reproduce under normal governance before editing.
