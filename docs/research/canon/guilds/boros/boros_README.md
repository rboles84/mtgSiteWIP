# Boros Package — Architecture of Mana assets

**Contents**
- `boros_structural_matrix/`
  - `boros_matrix.csv` — canonical matrix (30 entries)
  - `boros_matrix.json` — JSON array matching CSV
  - `sample_cards.md` — implementation notes for 5 canonical cards
- `boros_sigil_assets/`
  - `boros_sigil.svg` — inline SVG asset (IDs for animation)
  - `animation.css` — CSS variables and classes
  - `animation.js` — JS API: `pulseSpoke`, `triggerBattalion`, `setHardiness`, `extraCombatPulse`
  - `spec.md` — animation timing and integration notes
- `boros_flavor_generator/`
  - `templates.json` — 10 archetype templates × 5 intensity levels
  - `generator.py` — Python 3.10+ CLI generator
  - `microcopy.txt` — 30 short UI microcopy lines

**License**
MIT — you may use, modify, and redistribute these assets. Attribution appreciated but not required.

**Integration steps**
1. Copy folders into your project root.
2. For web UI:
   - Embed `boros_sigil.svg` inline in your HTML.
   - Include `<link rel="stylesheet" href="boros_sigil_assets/animation.css">`.
   - Include `<script src="boros_sigil_assets/animation.js"></script>` after the SVG.
   - Call `Sigil.triggerBattalion()` or `Sigil.setHardiness(800)` from your game logic.
3. For data:
   - Import `boros_structural_matrix/boros_matrix.csv` into your matrix loader.
   - Use `boros_structural_matrix/boros_matrix.json` for programmatic access.
4. For flavor:
   - Use `boros_flavor_generator/generator.py` to produce flavor lines for UI or procedural text.
   - Use `microcopy.txt` for buttons, tooltips, and badges.

**How to create the ZIP locally**
From the directory containing the folders, run:
```bash
zip -r boros_package.zip boros_structural_matrix boros_sigil_assets boros_flavor_generator README.md

Usage examples
# generate a Paladin line at intensity 4
python3 generator.py Paladin 4
# prints: "Your blade is their refuge; your will their wall."


---

## Sources I checked and used to ground design signals

Below are the **most relevant** resources I consulted to ensure the mappings, mechanical framing, and color‑pie semantics align with canonical design thinking and community practice:

1. **Mechanical Color Pie 2017 — Mark Rosewater (Wizards of the Coast Making Magic)** — used to ground how mechanics map to color identity and to justify the placement of mechanics like Battalion, Mentor, and Radiance in Boros’s design space.  
2. **Draftsim — Colorless Mana in MTG** — used for clarifying mana‑type semantics and historical notes that informed propagation vs. color identity distinctions.  
3. **Ravnica block card lists and set references (community compendia)** — used as a cross‑check for canonical Boros card names and archetypal roles.  
4. **Your local project pages (Architecture of Mana, Vox Mana previews)** — used as contextual reference for naming conventions, sigil style, and integration patterns (from your open tabs metadata).

> If you want, I can now:
> - Produce the **exact CSV/JSON files** as downloadable artifacts (I can provide a downloadable ZIP if you run the `zip` command locally or I can walk you through creating it in your environment).  
> - Or I can **generate the SVG/CSS/JS files as a single HTML preview** you can open locally to see the sigil animation in action.  
> - Or I can **export the CSV/JSON and Python script as a GitHub Gist** (if you want a hosted copy).

Tell me which of those you want next and I’ll produce the exact command or the hosted preview.