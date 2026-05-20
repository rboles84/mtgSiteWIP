# Vox Mana Semiotics — 300 Character Copy Blocks

Source length: 20,651 characters
Chunk size: 300 characters max
Total blocks: 69

> Copy each fenced block in order and paste them back-to-back.

## Block 001

```html
<!-- VOX MANA — SEMIOTICS OF THE COLOR PIE -->
<style>
  .vm-semiotics {
    --vm-bg: #070812;
    --vm-panel: rgba(13, 16, 31, 0.82);
    --vm-panel-strong: rgba(18, 22, 43, 0.92);
    --vm-line: rgba(255, 255, 255, 0.12);
    --vm-text: #f6efe1;
    --vm-muted: rgba(246, 239, 225, 0.72);
    --vm-
```

## Block 002

```html
faint: rgba(246, 239, 225, 0.48);

    --vm-white: #f7e7a5;
    --vm-blue: #7fc7ff;
    --vm-black: #a89ab8;
    --vm-red: #ff766a;
    --vm-green: #7ee0a1;

    position: relative;
    overflow: hidden;
    padding: clamp(2rem, 5vw, 5rem);
    border: 1px solid var(--vm-line);
    border-radius: 34
```

## Block 003

```html
px;
    color: var(--vm-text);
    background:
      radial-gradient(circle at 18% 20%, rgba(247, 231, 165, 0.14), transparent 26%),
      radial-gradient(circle at 82% 18%, rgba(127, 199, 255, 0.13), transparent 28%),
      radial-gradient(circle at 78% 78%, rgba(255, 118, 106, 0.13), transparent 3
```

## Block 004

```html
0%),
      radial-gradient(circle at 22% 80%, rgba(126, 224, 161, 0.12), transparent 30%),
      linear-gradient(135deg, #060713 0%, #111225 48%, #05050b 100%);
    box-shadow:
      0 30px 90px rgba(0, 0, 0, 0.55),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
    isolation: isolate;
  }

  .vm-se
```

## Block 005

```html
miotics::before {
    content: "";
    position: absolute;
    inset: -2px;
    z-index: -2;
    background:
      conic-gradient(
        from 210deg,
        rgba(247, 231, 165, 0.36),
        rgba(127, 199, 255, 0.34),
        rgba(168, 154, 184, 0.34),
        rgba(255, 118, 106, 0.35),
        
```

## Block 006

```html
rgba(126, 224, 161, 0.35),
        rgba(247, 231, 165, 0.36)
      );
    filter: blur(34px);
    opacity: 0.55;
  }

  .vm-semiotics::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background-image:
      linear-gradient(rgba(255,255,255,0.035) 1px, transparent 
```

## Block 007

```html
1px),
      linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
    background-size: 42px 42px;
    mask-image: radial-gradient(circle at center, black, transparent 78%);
    opacity: 0.35;
  }

  .vm-semiotics-shell {
    display: grid;
    grid-template-columns: minmax(0, 1.08fr)
```

## Block 008

```html
 minmax(280px, 0.92fr);
    gap: clamp(2rem, 5vw, 4rem);
    align-items: center;
  }

  .vm-semiotics-kicker {
    display: inline-flex;
    gap: 0.55rem;
    align-items: center;
    width: fit-content;
    margin-bottom: 1rem;
    padding: 0.45rem 0.75rem;
    border: 1px solid rgba(255,255,255,0
```

## Block 009

```html
.13);
    border-radius: 999px;
    color: var(--vm-muted);
    background: rgba(255,255,255,0.045);
    backdrop-filter: blur(14px);
    font-size: 0.72rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .vm-semiotics-kicker::before {
    content: "";
    width: 0.55rem;
    heig
```

## Block 010

```html
ht: 0.55rem;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--vm-white), var(--vm-blue), var(--vm-red), var(--vm-green));
    box-shadow: 0 0 18px rgba(247, 231, 165, 0.55);
  }

  .vm-semiotics h3 {
    margin: 0 0 1rem;
    max-width: 820px;
    font-size: clamp(2rem, 5vw, 4.6
```

## Block 011

```html
rem);
    line-height: 0.95;
    letter-spacing: -0.065em;
    text-wrap: balance;
  }

  .vm-semiotics h3 span {
    display: block;
    background: linear-gradient(90deg, var(--vm-white), var(--vm-blue), var(--vm-black), var(--vm-red), var(--vm-green));
    -webkit-background-clip: text;
    backg
```

## Block 012

```html
round-clip: text;
    color: transparent;
    filter: drop-shadow(0 0 18px rgba(127, 199, 255, 0.16));
  }

  .vm-semiotics p {
    max-width: 780px;
    color: var(--vm-muted);
    font-size: clamp(1rem, 1.4vw, 1.12rem);
    line-height: 1.78;
  }

  .vm-semiotics-lede {
    margin-top: 0;
  }

  .
```

## Block 013

```html
vm-semiotics-text {
    position: relative;
  }

  .vm-color-list {
    display: grid;
    gap: 0.78rem;
    margin: 1.8rem 0;
  }

  .vm-color-item {
    --accent: var(--vm-white);

    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 0.85rem;
    align-items: center;
    position:
```

## Block 014

```html
 relative;
    padding: 1rem 1rem 1rem 0.9rem;
    border: 1px solid rgba(255,255,255,0.105);
    border-radius: 22px;
    cursor: pointer;
    background:
      linear-gradient(90deg, color-mix(in srgb, var(--accent) 16%, transparent), transparent 45%),
      rgba(255,255,255,0.045);
    box-shadow
```

## Block 015

```html
: inset 0 1px 0 rgba(255,255,255,0.06);
    transition:
      transform 180ms ease,
      border-color 180ms ease,
      background 180ms ease,
      box-shadow 180ms ease;
  }

  .vm-color-item::after {
    content: "select";
    color: var(--vm-faint);
    font-size: 0.66rem;
    letter-spacing: 0
```

## Block 016

```html
.16em;
    text-transform: uppercase;
    opacity: 0;
    transform: translateX(-4px);
    transition: opacity 180ms ease, transform 180ms ease;
  }

  .vm-color-item:hover,
  .vm-color-item.is-active {
    transform: translateY(-2px);
    border-color: color-mix(in srgb, var(--accent) 42%, rgba(255
```

## Block 017

```html
,255,255,0.18));
    box-shadow:
      0 18px 42px rgba(0,0,0,0.28),
      0 0 32px color-mix(in srgb, var(--accent) 20%, transparent),
      inset 0 1px 0 rgba(255,255,255,0.12);
  }

  .vm-color-item:hover::after,
  .vm-color-item.is-active::after {
    opacity: 1;
    transform: translateX(0);
  
```

## Block 018

```html
}

  .vm-color-item.is-active {
    background:
      linear-gradient(90deg, color-mix(in srgb, var(--accent) 24%, transparent), transparent 56%),
      rgba(255,255,255,0.065);
  }

  .vm-color-item[data-color="W"] { --accent: var(--vm-white); }
  .vm-color-item[data-color="U"] { --accent: var(--vm
```

## Block 019

```html
-blue); }
  .vm-color-item[data-color="B"] { --accent: var(--vm-black); }
  .vm-color-item[data-color="R"] { --accent: var(--vm-red); }
  .vm-color-item[data-color="G"] { --accent: var(--vm-green); }

  .vm-color-glyph {
    display: grid;
    place-items: center;
    width: 2.7rem;
    height: 2.7r
```

## Block 020

```html
em;
    border-radius: 18px;
    background:
      radial-gradient(circle at 35% 30%, rgba(255,255,255,0.38), transparent 30%),
      color-mix(in srgb, var(--accent) 22%, rgba(0,0,0,0.62));
    box-shadow:
      0 0 22px color-mix(in srgb, var(--accent) 26%, transparent),
      inset 0 1px 0 rgba(2
```

## Block 021

```html
55,255,255,0.18);
    font-size: 1.24rem;
  }

  .vm-color-label strong {
    display: block;
    margin-bottom: 0.22rem;
    color: color-mix(in srgb, var(--accent) 72%, var(--vm-text));
    font-size: 0.98rem;
    letter-spacing: 0.02em;
  }

  .vm-color-label span {
    display: block;
    color:
```

## Block 022

```html
 var(--vm-muted);
    font-size: 0.92rem;
    line-height: 1.45;
  }

  .vm-ideology-block {
    position: relative;
    overflow: hidden;
    margin-top: 1.5rem;
    padding: 1.4rem;
    border: 1px solid color-mix(in srgb, var(--active-color, var(--vm-white)) 38%, rgba(255,255,255,0.12));
    bord
```

## Block 023

```html
er-radius: 26px;
    background:
      radial-gradient(circle at top left, color-mix(in srgb, var(--active-color, var(--vm-white)) 18%, transparent), transparent 44%),
      rgba(0,0,0,0.25);
    box-shadow:
      0 18px 56px rgba(0,0,0,0.28),
      inset 0 1px 0 rgba(255,255,255,0.08);
  }

  .vm-i
```

## Block 024

```html
deology-block::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--active-color, var(--vm-white)) 16%, transparent), transparent);
    transform: translateX(-100%);
    animation: vm-scan 5.5s ease-in-out infini
```

## Block 025

```html
te;
    opacity: 0.8;
  }

  .vm-ideology-block h4,
  .vm-ideology-block p {
    position: relative;
    z-index: 1;
  }

  .vm-ideology-block h4 {
    margin: 0 0 0.55rem;
    color: color-mix(in srgb, var(--active-color, var(--vm-white)) 74%, var(--vm-text));
    font-size: 1.05rem;
    letter-spa
```

## Block 026

```html
cing: 0.07em;
    text-transform: uppercase;
  }

  .vm-ideology-block p {
    margin: 0;
  }

  .vm-what {
    margin-top: 1rem;
    padding: 1.2rem;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 26px;
    background: rgba(255,255,255,0.045);
  }

  .vm-what h4 {
    margin: 0 0 0
```

## Block 027

```html
.9rem;
    font-size: 0.9rem;
    color: var(--vm-text);
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .vm-what ol {
    display: grid;
    gap: 0.72rem;
    margin: 0;
    padding: 0;
    counter-reset: vm-step;
    list-style: none;
  }

  .vm-what li {
    counter-increment: v
```

## Block 028

```html
m-step;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.75rem;
    align-items: start;
    color: var(--vm-muted);
    line-height: 1.45;
  }

  .vm-what li::before {
    content: counter(vm-step);
    display: grid;
    place-items: center;
    width: 1.65rem;
    height: 1.65rem
```

## Block 029

```html
;
    border-radius: 999px;
    color: #070812;
    background: linear-gradient(135deg, var(--vm-white), var(--vm-blue), var(--vm-red), var(--vm-green));
    font-size: 0.78rem;
    font-weight: 800;
  }

  .vm-semiotics-oracle {
    position: relative;
    min-height: 520px;
    display: grid;
    
```

## Block 030

```html
place-items: center;
  }

  .vm-sigil {
    position: relative;
    width: min(100%, 470px);
    aspect-ratio: 1;
    border-radius: 50%;
    background:
      radial-gradient(circle, rgba(255,255,255,0.08) 0 2px, transparent 3px),
      radial-gradient(circle at center, rgba(255,255,255,0.08), tran
```

## Block 031

```html
sparent 36%),
      conic-gradient(
        from -18deg,
        rgba(247,231,165,0.28),
        rgba(127,199,255,0.24),
        rgba(168,154,184,0.22),
        rgba(255,118,106,0.26),
        rgba(126,224,161,0.24),
        rgba(247,231,165,0.28)
      );
    box-shadow:
      0 0 80px rgba(127, 19
```

## Block 032

```html
9, 255, 0.12),
      inset 0 0 70px rgba(0,0,0,0.6);
  }

  .vm-sigil::before,
  .vm-sigil::after {
    content: "";
    position: absolute;
    inset: 9%;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.13);
  }

  .vm-sigil::after {
    inset: 21%;
    border-style: dashed;
    op
```

## Block 033

```html
acity: 0.72;
    animation: vm-rotate 28s linear infinite;
  }

  .vm-sigil-core {
    position: absolute;
    inset: 30%;
    display: grid;
    place-items: center;
    border: 1px solid rgba(255,255,255,0.16);
    border-radius: 50%;
    background:
      radial-gradient(circle at 40% 28%, rgba(2
```

## Block 034

```html
55,255,255,0.18), transparent 26%),
      rgba(5, 6, 14, 0.72);
    box-shadow:
      0 0 46px rgba(255,255,255,0.08),
      inset 0 0 40px rgba(0,0,0,0.66);
    backdrop-filter: blur(16px);
  }

  .vm-sigil-core strong {
    display: block;
    font-size: clamp(1.8rem, 5vw, 3.2rem);
    letter-spac
```

## Block 035

```html
ing: -0.08em;
    background: linear-gradient(90deg, var(--vm-white), var(--vm-blue), var(--vm-black), var(--vm-red), var(--vm-green));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .vm-sigil-core span {
    display: block;
    margin-top: 0.15rem;
    
```

## Block 036

```html
color: var(--vm-faint);
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    text-align: center;
    text-transform: uppercase;
  }

  .vm-orb {
    --orb: var(--vm-white);

    position: absolute;
    display: grid;
    place-items: center;
    width: 4.35rem;
    height: 4.35rem;
    border: 1px
```

## Block 037

```html
 solid color-mix(in srgb, var(--orb) 48%, rgba(255,255,255,0.14));
    border-radius: 50%;
    color: var(--vm-text);
    background:
      radial-gradient(circle at 35% 25%, rgba(255,255,255,0.42), transparent 24%),
      radial-gradient(circle, color-mix(in srgb, var(--orb) 34%, #080914), #080914 
```

## Block 038

```html
68%);
    box-shadow:
      0 0 36px color-mix(in srgb, var(--orb) 32%, transparent),
      inset 0 1px 0 rgba(255,255,255,0.18);
    font-size: 1.35rem;
    font-weight: 900;
    cursor: pointer;
    transition: transform 180ms ease, box-shadow 180ms ease;
  }

  .vm-orb:hover,
  .vm-orb.is-active 
```

## Block 039

```html
{
    transform: scale(1.08);
    box-shadow:
      0 0 54px color-mix(in srgb, var(--orb) 54%, transparent),
      inset 0 1px 0 rgba(255,255,255,0.28);
  }

  .vm-orb[data-color="W"] {
    --orb: var(--vm-white);
    top: 3%;
    left: 50%;
    translate: -50% 0;
  }

  .vm-orb[data-color="U"] {
 
```

## Block 040

```html
   --orb: var(--vm-blue);
    top: 33%;
    right: 2%;
  }

  .vm-orb[data-color="B"] {
    --orb: var(--vm-black);
    right: 15%;
    bottom: 5%;
  }

  .vm-orb[data-color="R"] {
    --orb: var(--vm-red);
    left: 15%;
    bottom: 5%;
  }

  .vm-orb[data-color="G"] {
    --orb: var(--vm-green);
 
```

## Block 041

```html
   top: 33%;
    left: 2%;
  }

  .vm-signal-card {
    position: absolute;
    right: 0;
    bottom: 0;
    max-width: 260px;
    padding: 1rem;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 22px;
    background: rgba(5, 6, 14, 0.64);
    backdrop-filter: blur(18px);
    box-shad
```

## Block 042

```html
ow: 0 22px 54px rgba(0,0,0,0.34);
  }

  .vm-signal-card strong {
    display: block;
    margin-bottom: 0.35rem;
    color: var(--vm-text);
    font-size: 0.78rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .vm-signal-card span {
    display: block;
    color: var(--vm-muted)
```

## Block 043

```html
;
    font-size: 0.88rem;
    line-height: 1.45;
  }

  @keyframes vm-rotate {
    to { transform: rotate(360deg); }
  }

  @keyframes vm-scan {
    0%, 42% { transform: translateX(-120%); }
    58%, 100% { transform: translateX(120%); }
  }

  @media (max-width: 920px) {
    .vm-semiotics-shell {
 
```

## Block 044

```html
     grid-template-columns: 1fr;
    }

    .vm-semiotics-oracle {
      min-height: 430px;
      order: -1;
    }

    .vm-sigil {
      width: min(88vw, 420px);
    }
  }

  @media (max-width: 560px) {
    .vm-semiotics {
      padding: 1.4rem;
      border-radius: 26px;
    }

    .vm-color-item 
```

## Block 045

```html
{
      grid-template-columns: auto 1fr;
    }

    .vm-color-item::after {
      display: none;
    }

    .vm-orb {
      width: 3.45rem;
      height: 3.45rem;
      font-size: 1rem;
    }

    .vm-signal-card {
      position: relative;
      margin-top: 1rem;
      max-width: none;
    }
  }

 
```

## Block 046

```html
 @media (prefers-reduced-motion: reduce) {
    .vm-sigil::after,
    .vm-ideology-block::before {
      animation: none;
    }

    .vm-color-item,
    .vm-orb {
      transition: none;
    }
  }
</style>

<section class="vm-semiotics" aria-labelledby="vm-semiotics-title">
  <div class="vm-semiotics
```

## Block 047

```html
-shell">
    <div class="vm-semiotics-text">
      <div class="vm-semiotics-kicker">Signal Engine / Color Philosophy</div>

      <h3 id="vm-semiotics-title">
        The Semiotics of
        <span>the Color Pie</span>
      </h3>

      <p class="vm-semiotics-lede">
        The five colors of the W
```

## Block 048

```html
UBRG wheel represent incompatible belief systems held in constant tension.
        They are not cosmetic themes, but an ideological closed-loop: each color enforces its philosophy
        through distinct mechanics, constraints, and freedoms.
      </p>

      <p>
        When these forces are conde
```

## Block 049

```html
nsed face-down, they represent raw potential — a blank slate — before
        resolving into defined, colored identity.
      </p>

      <div class="vm-color-list" aria-label="WUBRG color ideologies">
        <button class="vm-color-item is-active" type="button" data-color="W">
          <div class
```

## Block 050

```html
="vm-color-glyph vm-color-glyph--white">☀️</div>
          <div class="vm-color-label">
            <strong>White (W)</strong>
            <span>Peace through order. Sacrifices individual agency to eradicate collective suffering.</span>
          </div>
        </button>

        <button class="vm-c
```

## Block 051

```html
olor-item" type="button" data-color="U">
          <div class="vm-color-glyph vm-color-glyph--blue">💧</div>
          <div class="vm-color-label">
            <strong>Blue (U)</strong>
            <span>Perfection through knowledge. Life as an optimization process.</span>
          </div>
        </
```

## Block 052

```html
button>

        <button class="vm-color-item" type="button" data-color="B">
          <div class="vm-color-glyph vm-color-glyph--black">💀</div>
          <div class="vm-color-label">
            <strong>Black (B)</strong>
            <span>Power through opportunity. Prioritizes individual free will
```

## Block 053

```html
 and pragmatism.</span>
          </div>
        </button>

        <button class="vm-color-item" type="button" data-color="R">
          <div class="vm-color-glyph vm-color-glyph--red">🔥</div>
          <div class="vm-color-label">
            <strong>Red (R)</strong>
            <span>Freedom thro
```

## Block 054

```html
ugh action. Values emotional authenticity and spontaneity.</span>
          </div>
        </button>

        <button class="vm-color-item" type="button" data-color="G">
          <div class="vm-color-glyph vm-color-glyph--green">🌳</div>
          <div class="vm-color-label">
            <strong>Gre
```

## Block 055

```html
en (G)</strong>
            <span>Growth through acceptance. Identity emerges from nature, inheritance, and place.</span>
          </div>
        </button>
      </div>

      <div class="vm-ideology-block" id="vm-ideology-block">
        <h4 id="vm-ideology-title">Selected Ideology: White (W)</h4>
```

## Block 056

```html

        <p id="vm-ideology-body">
          White values organization, community, and structure, believing that individual desires must be
          sacrificed to eradicate suffering. It seeks peace through order, codifying behavior and building
          systems that minimize harm — even at the co
```

## Block 057

```html
st of personal freedom.
        </p>
      </div>

      <div class="vm-what">
        <h4>What Vox Mana does</h4>
        <ol>
          <li>Reads your answers as color-weighted signals across the WUBRG spectrum.</li>
          <li>Translates those signals into mono, guild, shard, wedge, school, fa
```

## Block 058

```html
mily, or colorless identity.</li>
          <li>Connects the result to lore, mechanics, deckbuilding, and symbolic search pathways.</li>
        </ol>
      </div>
    </div>

    <div class="vm-semiotics-oracle" aria-hidden="true">
      <div class="vm-sigil">
        <button class="vm-orb is-activ
```

## Block 059

```html
e" type="button" data-color="W">W</button>
        <button class="vm-orb" type="button" data-color="U">U</button>
        <button class="vm-orb" type="button" data-color="B">B</button>
        <button class="vm-orb" type="button" data-color="R">R</button>
        <button class="vm-orb" type="button"
```

## Block 060

```html
 data-color="G">G</button>

        <div class="vm-sigil-core">
          <div>
            <strong>WUBRG</strong>
            <span>Identity before form</span>
          </div>
        </div>
      </div>

      <div class="vm-signal-card">
        <strong>Face-down potential</strong>
        <span
```

## Block 061

```html
>Raw answers enter as signal. Vox Mana resolves them into philosophy, mechanics, lore, and deckbuilding direction.</span>
      </div>
    </div>
  </div>
</section>

<script>
  (() => {
    const root = document.querySelector(".vm-semiotics");
    if (!root) return;

    const ideology = {
      W:
```

## Block 062

```html
 {
        color: "#f7e7a5",
        title: "Selected Ideology: White (W)",
        body: "White values organization, community, and structure, believing that individual desires must be sacrificed to eradicate suffering. It seeks peace through order, codifying behavior and building systems that mini
```

## Block 063

```html
mize harm — even at the cost of personal freedom."
      },
      U: {
        color: "#7fc7ff",
        title: "Selected Ideology: Blue (U)",
        body: "Blue values knowledge, precision, and improvement. It treats life as an unfinished system: something to study, refine, optimize, and perfect t
```

## Block 064

```html
hrough discipline, memory, technology, and careful control."
      },
      B: {
        color: "#a89ab8",
        title: "Selected Ideology: Black (B)",
        body: "Black values agency, ambition, and self-determination. It refuses comforting illusions, accepts cost as part of power, and believes
```

## Block 065

```html
 survival belongs to those willing to act without apology."
      },
      R: {
        color: "#ff766a",
        title: "Selected Ideology: Red (R)",
        body: "Red values freedom, emotion, impulse, and authentic action. It rejects systems that cage the self, choosing passion, instinct, art, ri
```

## Block 066

```html
sk, love, rage, and movement over sterile control."
      },
      G: {
        color: "#7ee0a1",
        title: "Selected Ideology: Green (G)",
        body: "Green values nature, continuity, and belonging. It believes identity is discovered through inheritance, instinct, ecology, ancestry, and pla
```

## Block 067

```html
ce — not invented in isolation."
      }
    };

    const title = root.querySelector("#vm-ideology-title");
    const body = root.querySelector("#vm-ideology-body");
    const block = root.querySelector("#vm-ideology-block");
    const triggers = root.querySelectorAll("[data-color]");

    function
```

## Block 068

```html
 selectColor(colorKey) {
      const selected = ideology[colorKey];
      if (!selected) return;

      title.textContent = selected.title;
      body.textContent = selected.body;
      block.style.setProperty("--active-color", selected.color);

      triggers.forEach((trigger) => {
        trigger.
```

## Block 069

```html
classList.toggle("is-active", trigger.dataset.color === colorKey);
      });
    }

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => selectColor(trigger.dataset.color));
    });

    selectColor("W");
  })();
</script>
```
