# **Architectural Specification and Engineering Blueprint for a Premium Web Experience**

## **Executive Summary**

The modern web landscape demands a shift in front-end development, moving away from heavy JavaScript rendering frameworks and returning to highly optimized, native web platform capabilities.1 This document provides a comprehensive technical specification and design blueprint for a premium, public-facing website. It is engineered to meet the highest standards of accessibility, performance, and visual polish.  
Amateur web builds often rely on heavy JavaScript bundles, inconsistent design systems, decorative animation loops, and neglected accessibility layers.1 In contrast, this blueprint establishes an engineering approach where every layout grid, visual transition, color value, and line of code is mathematically consistent, performant, and semantically sound.2  
The core engineering and design principles of this technical brief are defined as follows:

| Design & Engineering Principle | Target Benchmark | Native Browser Mechanism |
| :---- | :---- | :---- |
| **Semantic Structural Integrity** | 100/100 Lighthouse SEO / Accessibility 7 | HTML5 elements, ARIA landmarks, and layout containment.2 |
| **Predictable Visual Contrast** | WCAG 2.2 Level AA / AAA Compliant 8 | OKLCH color spaces and lightness-locked text scaling.6 |
| **Mathematical Layout Rhythm** | Linear, non-shifting structural scale 2 | Fluid typography equations and spacing tokens using clamp().9 |
| **Hardware-Accelerated Interaction** | 60 FPS under CPU-throttled states 8 | Compositor-only transitions and CSS scroll-driven animations.8 |
| **Progressive Enhancement Architecture** | Full content readability on legacy platforms 2 | CSS cascade layers, feature queries, and zero-JS core components.2 |

## **Site Experience Strategy**

The site experience strategy focuses on managing the user's cognitive load. It guides their attention through a clear layout, using structured information disclosure to make details easy to scan and explore.15

### **First Impression and Hero Strategy**

The first paint must be visually clean and load instantly. To prevent layout shifts (CLS), the hero section uses explicit containment and avoids heavy client-side scripts.2 The value proposition is presented in high-contrast text, using typography that is easy to read.  
To ensure the initial frame renders reliably across different devices, the layout uses the \<link rel="expect"\> tag. This blocks rendering until critical header and hero elements are fully parsed.18 Additionally, static media containers use explicit placeholder dimensions to prevent visual jumps as assets load.

### **Navigation Architecture**

The navigation acts as a permanent, reliable anchor. The global header remains in position, transitioning to a sticky, space-saving layout as the user scrolls.12  
This transition uses hardware-accelerated filters and background opacity shifts through color-mix() to maintain high readability without causing layout redraws.8 Roving tab indexes and custom keyboard focus traps ensure the navigation is fully accessible to keyboard and screen-reader users.20

### **Content Hierarchy and Focused Scannability**

The content is structured to present core messages upfront, followed by supporting details that are easy to discover.15 Rather than presenting a wall of text, information is structured into semantic sections.  
Interactive elements (like tabbed panels or progressive disclosures) are used to keep the interface clean while keeping full details accessible on demand.15 This progressive disclosure model helps prevent cognitive overload and naturally guides the user toward call-to-action triggers.

## **Visual Design System**

A premium design system relies on consistent mathematical ratios to govern color, typography, spacing, and structural depth.5

### **Color Strategy**

The color system is defined in the perceptually uniform OKLCH color space.6 Unlike legacy sRGB and HSL color spaces, OKLCH scales lightness linearly across all hues.6 This allows developers to adjust saturation and hue while keeping contrast levels safe and predictable.6  
Colors are declared using the wide-gamut Display P3 color space to render rich, vibrant tones on modern displays, falling back to standard sRGB on older screens.6  
To ensure text remains readable and meets contrast standards, light backgrounds (![][image1]) are paired with low-chroma, high-contrast body text (![][image2], ![][image3]).8 On dark backgrounds (![][image4]), text uses high-contrast, low-chroma values (![][image5]) to prevent visual blooming on high-density displays.8  
The global color system for both light and dark modes is defined in the following table:

| Token Name | OKLCH Value (Light Mode) | OKLCH Value (Dark Mode) | Intended Design Use | Contrast Ratio |
| :---- | :---- | :---- | :---- | :---- |
| \--color-bg-base | oklch(98% 0.002 240\) | oklch(12% 0.008 240\) | Primary page background | Baseline 6 |
| \--color-bg-surface | oklch(100% 0 0\) | oklch(16% 0.01 240\) | Cards, panels, elevated elements | Baseline 6 |
| \--color-text-primary | oklch(22% 0.005 240\) | oklch(95% 0.003 240\) | Primary headings and body copy | ![][image6] (WCAG AAA) 6 |
| \--color-text-muted | oklch(45% 0.01 240\) | oklch(76% 0.008 240\) | Caption, metadata, and placeholder text | ![][image7] (WCAG AA) 8 |
| \--color-brand-accent | oklch(58% 0.18 250\) | oklch(68% 0.15 250\) | Primary CTAs, highlights, focus states | ![][image8] vs base background 6 |

CSS  
/\* Color-mix fallback and layer overrides \*/  
@layer tokens {  
 .accent-tinted-surface {  
    background-color: color-mix(in oklch, var(--color-brand-accent) 8%, var(--color-bg-surface));  
  }  
}

### **Typography Strategy**

Typography scales dynamically relative to the viewport size.9 This approach ensures a consistent layout scale across different screen sizes without requiring multiple breakpoint-specific overrides.9  
To maintain readability and meet accessibility requirements when users zoom in on text, the fluid typography formula combines relative length units (![][image9]) with viewport-relative units (![][image10]).5  
The mathematical linear interpolation formula is defined as:  
![][image11]  
For a header scaling from a minimum size of ![][image12] (![][image13]) at a ![][image14] viewport width up to a maximum size of ![][image15] (![][image16]) at a ![][image17] viewport width 5:  
![][image18]  
![][image19]  
![][image20]  
![][image21]  
![][image22]  
This setup allows the font size to adapt dynamically to the viewport while respecting the browser's default zoom settings, satisfying WCAG 2.2 Success Criterion 1.4.4.5  
The typographic scale is governed by a consistent mathematical ratio (such as a Major Third) to maintain a balanced layout hierarchy 5:

| Level | Scale Step Ratio | Fluid Sizing Equation | Functional Design Role |
| :---- | :---- | :---- | :---- |
| h1 | ![][image23] | clamp(2.00rem, 3.00vw \+ 1.30rem, 4.00rem) | Hero/Main Heading |
| h2 | ![][image24] | clamp(1.60rem, 2.00vw \+ 1.10rem, 2.50rem) | Primary Section Title |
| h3 | ![][image25] | clamp(1.30rem, 1.20vw \+ 0.95rem, 1.80rem) | Card and Panel Headings |
| p | ![][image26] | clamp(1.00rem, 0.40vw \+ 0.90rem, 1.25rem) | Primary Body Text |
| small | ![][image27] | clamp(0.80rem, 0.20vw \+ 0.75rem, 0.95rem) | Captions, Metadata, Disclaimers |

To ensure comfortable readability, long-form paragraph elements are restricted to a maximum width of ![][image28], with the line-height set between ![][image29] and ![][image30].5

CSS  
/\* Typography Scale Base Implementation \*/  
h1 { font-size: clamp(2rem, 3.0047vw \+ 1.2957rem, 4rem); line-height: 1.15; font-weight: 700; letter-spacing: \-0.02em; }  
h2 { font-size: clamp(1.6rem, 2vw \+ 1.1rem, 2.5rem); line-height: 1.25; font-weight: 600; letter-spacing: \-0.01em; }  
h3 { font-size: clamp(1.3rem, 1.2vw \+ 0.95rem, 1.8rem); line-height: 1.35; font-weight: 600; }  
p { font-family: var(--font-sans); font-size: clamp(1rem, 0.4vw \+ 0.9rem, 1.25rem); line-height: 1.625; max-width: 65ch; text-wrap: pretty; }

### **Spacing System and Layout Rhythm**

The spacing system uses the same dynamic progression formula to keep margins and padding mathematically consistent across all viewport sizes.9

CSS  
:root {  
  \--spacing-fluid-xs: clamp(0.5rem, 0.5vw \+ 0.35rem, 1rem);  
  \--spacing-fluid-sm: clamp(1rem, 1vw \+ 0.75rem, 2rem);  
  \--spacing-fluid-md: clamp(2rem, 2vw \+ 1.5rem, 4rem);  
  \--spacing-fluid-lg: clamp(4rem, 4vw \+ 3rem, 8rem);  
  \--spacing-fluid-xl: clamp(8rem, 8vw \+ 6rem, 16rem);  
}

### **Card Design**

Cards are styled as structural containers, relying on CSS Grid, container queries, and subgrid to align content cleanly.2 Depth is created using clean border colors and soft, layered shadows instead of heavy gradients or distracting visual patterns 8:

CSS  
.card-premium {  
  container-type: inline-size;  
  background-color: var(--color-bg-surface);  
  border: 1px solid color-mix(in oklch, var(--color-text-primary) 8%, transparent);  
  border-radius: 12px;  
  box-shadow: 0 4px 24px \-4px oklch(0% 0 0 / 0.03), 0 2px 8px \-2px oklch(0% 0 0 / 0.02);  
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1),  
              box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1),  
              border-color 150ms cubic-bezier(0.4, 0, 0.2, 1);  
  will-change: transform, box-shadow;  
}

### **Button and Link States**

Buttons and links must provide immediate visual feedback on focus or hover, completing their transitions within a ![][image31] window.11  
To meet WCAG 2.2 accessibility standards, focus states must remain highly visible.4 These are styled using high-contrast outlines with a clean offset to ensure they stand out 4:

CSS  
.interactive-trigger:focus\-visible {  
  outline: 3px solid var(--color-brand-accent);  
  outline-offset: 4px;  
  border-radius: 4px;  
}

### **Surface Layers and Background Treatments**

Depth is managed using a strict, semantic layer order.8 Elevated elements use soft, modern CSS shadows and are promoted to separate hardware-accelerated layers to ensure smooth rendering:

CSS  
.layer-elevated-z1 { z-index: 10; transform: translate3d(0, 0, 0); }  
.layer-overlay-z2 { z-index: 100; transform: translate3d(0, 0, 0); }

Backgrounds use clean, inline SVG grid patterns rather than heavy, distracting visual elements 3:

CSS  
.bg-grid-texture {  
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M40 0H0v40h1V1h39V0z' fill='%23e2e8f0' fill-opacity='0.15'/%3E%3C/svg%3E");  
}

### **Iconography and SVG Usage**

Icons and vector elements are built as scalable, inline SVGs. When used as decorative accents, they are marked with aria-hidden="true" to keep screen-reader layouts clean.7 When SVGs act as functional buttons or links, they include high-contrast \<title\> and \<desc\> elements to provide screen readers with context 7:

HTML  
\<button class\="interactive-trigger" aria-label\="Toggle Preferences System"\>  
  \<svg class\="ui-icon" fill\="none" viewBox\="0 0 24 24" stroke\="currentColor" aria-hidden\="true"\>  
    \<path stroke-linecap\="round" stroke-linejoin\="round" stroke-width\="2" d\="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /\>  
  \</svg\>  
\</button\>

### **Motion Language**

Motion is used selectively to communicate state changes or direct the user's attention, avoiding unnecessary, distracting decorative loops 15:

CSS  
:root {  
  \--transition\-timing-standard: cubic-bezier(0.4, 0, 0.2, 1); /\* Natural movement \*/  
  \--transition\-timing-reveal: cubic-bezier(0.16, 1, 0.3, 1);   /\* Smooth, decay-weighted easing \*/  
  \--transition-duration\-fast: 150ms;                            /\* Snap transitions \*/  
  \--transition-duration\-normal: 250ms;                          /\* Modal / Page transitions \*/  
}

## **Layout Architecture**

The overall layout is managed through a hybrid CSS Grid and Flexbox system, keeping layout rules simple while maximizing viewport responsiveness.

\+---------------------------------------------------------------------------------------------------------+  
|                                              Global Header                                              |  
|                                                                                                         |  
|   \[ Logo Landmark \]                                      \[ Navigation Landmark \]         |  
\+---------------------------------------------------------------------------------------------------------+  
|                                                                                                         |  
|                                               Hero Section                                              |  
|                                                                                                         |  
|   \+-------------------------------------------------------------+  \+--------------------------------+   |  
|   |                      Typographic Title                      |  |     Interactive SVG / Media    |   |  
|   |                                                             |  |            Viewport            |   |  
|   |   Supporting Content Paragraph                              |  |                                |   |  
|   |                                |  |                                |   |  
|   \+-------------------------------------------------------------+  \+--------------------------------+   |  
\+---------------------------------------------------------------------------------------------------------+  
|                                                                                                         |  
|                                          Feature Subgrid Grid                                           |  
|                                                                                                         |  
|   \+-------------------------------------------------------------------------------------------------+   |  
|   |                                12-Column Layout Frame (Subgrid Active)                          |   |  
|   |                                                                                                 |   |  
|   |   \+-------------------------+     \+-------------------------+     \+-------------------------+   |   |  
|   |   |    Feature Card A       |     |    Feature Card B       |     |    Feature Card C       |   |   |  
|   |   |                         |     |                         |     |                         |   |   |  
|   |   |  \- Header               |     |  \- Header               |     |  \- Header               |   |   |  
|   |   |  \- Description          |     |  \- Description          |     |  \- Description          |   |   |  
|   |   |  \- Link Footer          |     |  \- Link Footer          |     |  \- Link Footer          |   |   |  
|   |   \+-------------------------+     \+-------------------------+     \+-------------------------+   |   |  
|   \+-------------------------------------------------------------------------------------------------+   |  
\+---------------------------------------------------------------------------------------------------------+  
|                                                                                                         |  
|                                         Footer Landmark Section                                         |  
|                                                                                                         |  
|   \+-------------------+  \+-------------------+  \+-------------------+  \+----------------------------+   |  
|   | Product Directory |  | Resources Linkset |  | Legal Information |  | Dynamic Email Subscription |   |  
|   \+-------------------+  \+-------------------+  \+-------------------+  \+----------------------------+   |  
\+---------------------------------------------------------------------------------------------------------+

### **Homepage Structure**

The page is organized into separate sections using semantic HTML5 tags:

1. **Global Header (\<header\>):** Houses the primary brand logo and site navigation.4  
2. **Hero Section (\<section aria-labelledby="hero-title"\>):** Displays the primary title and call to action.  
3. **Features Area (\<section aria-labelledby="features-title"\>):** Showcases product benefits inside a responsive layout grid.26  
4. **Interactive Showcase (\<section aria-labelledby="showcase-title"\>):** Houses interactive components like the comparison panel and tabs.  
5. **Call-To-Action Element (\<section aria-labelledby="cta-title"\>):** Encourages users to take the next key step.  
6. **Global Footer (\<footer\>):** Groups directory links and compliance details.

### **Grid Systems and Subgrid Alignment**

The grid uses a robust 12-column layout to align components across different viewport widths.26 We use CSS Subgrid to align nested card components across rows without requiring hardcoded, fixed-height containers 2:

CSS  
.parent-grid-container {  
  display: grid;  
  grid-template-columns: repeat(12, minmax(0, 1fr));  
  gap: var(--spacing-fluid-md);  
  align-items: start;  
}

.subgrid-card-wrapper {  
  grid-column: span 4;  
  display: grid;  
  grid-template-rows: subgrid;  
  grid-row: span 3; /\* Matches Header, Description, and Footer across row tracks  \*/  
}

### **Desktop, Tablet, and Mobile Adaptive Layouts**

To keep layouts clean and readable across all devices, columns wrap naturally as screen sizes change:

* **Mobile Viewports (![][image32]):** Grids collapse to a single column, with padding adjusting to \--spacing-fluid-sm.9  
* **Tablet Viewports (![][image33]):** Content spans two columns, using a ![][image34] gutter.  
* **Desktop Viewports (![][image35]):** Displays the full 12-column grid, aligning columns to the global margins.

### **Avoiding Clutter and Visual Separation**

Sections are separated using generous, responsive padding (--spacing-fluid-lg) to give components breathing room.3  
To keep page load speeds high on dense pages, the layout applies content-visibility: auto to offscreen sections. This tells the browser to skip rendering these components until they approach the viewport, reducing initial load times 2:

CSS  
.section-lazy-render {  
  content\-visibility: auto;  
  contain-intrinsic-size: 1px 600px; /\* Reserves layout space to prevent jump shift  \*/  
}

## **Component Inventory**

Every element is designed as a modular component, combining semantic HTML with robust accessibility attributes and responsive layouts.

### **Top Navigation Component**

* **Purpose:** Provides quick access to site sections and acts as the primary layout anchor.  
* **UX Role:** Promotes effortless navigation while keeping logo and call-to-action details visible.  
* **Visual Treatment:** A sticky header that changes transparency on scroll using color-mix().12  
* **HTML Structure:**

HTML  
\<header class\="sticky top-0 z-50 bg-linear-to-b from-base to-transparent backdrop-blur-md"\>  
  \<nav class\="mx-auto flex max-w-7xl items-center justify-between p-fluid-sm" aria-label\="Main Navigation"\>  
    \<a href\="/" class\="interactive-trigger" aria-label\="Brand Homepage"\>Logo\</a\>  
    \<ul class\="hidden md:flex gap-fluid-sm"\>  
      \<li\>\<a href\="/features" class\="interactive-trigger text-primary font-medium"\>Features\</a\>\</li\>  
      \<li\>\<a href\="/resources" class\="interactive-trigger text-primary font-medium"\>Resources\</a\>\</li\>  
    \</ul\>  
    \<button class\="bg-brand-accent text-white px-4 py-2 rounded-lg font-medium interactive-trigger"\>Get Started\</button\>  
  \</nav\>  
\</header\>

* **Accessibility Notes:** Interactive elements use high-contrast outlines on focus.4 Mobile menu transitions use the aria-expanded state to announce menu visibility changes to screen readers.7

### **Hero Section Component**

* **Purpose:** Delivers the primary value proposition as soon as the page loads.  
* **UX Role:** Grabs user attention and guides them toward the primary action button.  
* **Visual Treatment:** Clean, asymmetric typography layout balanced by a subtle vector graphic.  
* **HTML Structure:**

HTML  
\<section class\="grid-layout-parent min-h-\[80vh\] items-center" aria-labelledby\="hero-heading"\>  
  \<div class\="col-span-12 md:col-span-7 flex flex-col justify-center"\>  
    \<h1 id\="hero-heading" class\="text-primary tracking-tight"\>The Modern Web Blueprint\</h1\>  
    \<p class\="mt-fluid-sm text-muted text-pretty"\>Build incredibly fast, highly accessible web experiences using clean, modular code architectures.\</p\>  
    \<div class\="mt-fluid-md flex gap-4"\>  
      \<a href\="/get-started" class\="bg-brand-accent text-white px-6 py-3 rounded-lg font-medium interactive-trigger"\>Start Building\</a\>  
      \<a href\="/documentation" class\="border border-solid px-6 py-3 rounded-lg font-medium interactive-trigger"\>Read Docs\</a\>  
    \</div\>  
  \</div\>  
  \<div class\="col-span-12 md:col-span-5 flex justify-center"\>  
    \</div\>  
\</section\>

* **Accessibility Notes:** Visual hierarchy is clear and uses native HTML heading levels in order.4

### **Feature Cards Component**

* **Purpose:** Introduces product benefits inside a clean, scannable list.  
* **UX Role:** Helps users explore benefits easily by breaking down technical information.  
* **Visual Treatment:** A clean, multi-column grid using CSS Subgrid to align card headers across rows.2  
* **HTML Structure:**

HTML  
\<section class\="py-fluid-lg" aria-labelledby\="features-heading"\>  
  \<h2 id\="features-heading" class\="text-center text-primary"\>Core Benefits\</h2\>  
  \<div class\="parent-grid-container mt-fluid-md"\>  
    \<article class\="subgrid-card-wrapper card-premium p-fluid-sm"\>  
      \<h3 class\="text-primary"\>Performance First\</h3\>  
      \<p class\="text-muted"\>Achieve 60 FPS animations using modern compositor-friendly styling rules.\</p\>  
      \<a href\="/performance" class\="interactive-trigger text-brand-accent font-semibold self-end mt-4"\>Learn More →\</a\>  
    \</article\>  
  \</div\>  
\</section\>

* **Accessibility Notes:** Content is wrapped in a semantic \<article\> tag, and focus targets are easy to activate.

### **Interactive Tabs Component**

* **Purpose:** Groups related content into a single, compact view to save screen space.  
* **UX Role:** Reduces visual clutter, letting users toggle between details at their own pace.  
* **Visual Treatment:** Tabs display with a high-contrast line indicator that shifts smoothly between active views.  
* **HTML Structure:**

HTML  
\<div class\="tabs-wrapper card-premium p-fluid-sm" role\="region" aria-label\="Code Examples"\>  
  \<div role\="tablist" class\="flex border-b border-solid" aria-label\="Select Code Platform"\>  
    \<button id\="tab-html" role\="tab" aria-selected\="true" aria-controls\="panel-html" tabindex\="0" class\="px-4 py-2 interactive-trigger"\>HTML5\</button\>  
    \<button id\="tab-css" role\="tab" aria-selected\="false" aria-controls\="panel-css" tabindex\="-1" class\="px-4 py-2 interactive-trigger"\>CSS3\</button\>  
  \</div\>  
  \<div id\="panel-html" role\="tabpanel" aria-labelledby\="tab-html" class\="p-4" tabindex\="0"\>  
    \<pre\>\<code\>\<section\>\</section\>\</code\>\</pre\>  
  \</div\>  
  \<div id\="panel-css" role\="tabpanel" aria-labelledby\="tab-css" class\="p-4 hidden" tabindex\="0" inert\>  
    \<pre\>\<code\>.class { display: grid; }\</code\>\</pre\>  
  \</div\>  
\</div\>

* **Accessibility Notes:** Uses correct ARIA roles (tablist, tab, tabpanel). Tab keys toggle focus between buttons, and Arrow keys switch views.21

### **Comparison Panel Component**

* **Purpose:** Highlights product advantages by comparing plans or features side-by-side.  
* **UX Role:** Helps users compare options easily to make informed purchasing decisions.  
* **Visual Treatment:** A clean, responsive table with highlighted rows that change opacity on hover.3  
* **HTML Structure:**

HTML  
\<div class\="overflow-x-auto card-premium"\>  
  \<table class\="w-full text-left border-collapse"\>  
    \<thead\>  
      \<tr class\="border-b border-solid"\>  
        \<th scope\="col" class\="p-4 text-primary font-semibold"\>Features\</th\>  
        \<th scope\="col" class\="p-4 text-primary font-semibold"\>Standard\</th\>  
        \<th scope\="col" class\="p-4 text-brand-accent font-semibold"\>Premium\</th\>  
      \</tr\>  
    \</thead\>  
    \<tbody\>  
      \<tr class\="border-b border-solid hover:bg-neutral-50/50"\>  
        \<th scope\="row" class\="p-4 text-primary font-normal"\>Grid Layouts\</th\>  
        \<td class\="p-4 text-muted"\>Basic\</td\>  
        \<td class\="p-4 text-primary font-semibold"\>Subgrid Active\</td\>  
      \</tr\>  
    \</tbody\>  
  \</table\>  
\</div\>

* **Accessibility Notes:** Table headers use explicit scope="col" and scope="row" attributes to help screen readers announce rows clearly.

### **Modal Dialog Component (Advanced)**

* **Purpose:** Displays critical details or secondary forms without taking the user to a new page.  
* **UX Role:** Captures user attention for important tasks without breaking their browsing context.  
* **Visual Treatment:** A clean overlay card that opens with a soft fade, blurring the background.4  
* **HTML Structure:**

HTML  
\<dialog id\="modal-settings" class\="card-premium backdrop:backdrop-blur-md open:animate-fade-in" aria-labelledby\="modal-title"\>  
  \<form method\="dialog" class\="p-fluid-sm flex flex-col"\>  
    \<h2 id\="modal-title" class\="text-primary"\>System Preferences\</h2\>  
    \<label for\="theme-select" class\="mt-4 text-primary text-sm font-medium"\>Select Theme\</label\>  
    \<select id\="theme-select" class\="mt-2 p-2 border rounded-lg"\>  
      \<option value\="system"\>System Default\</option\>  
      \<option value\="dark"\>Dark Theme\</option\>  
    \</select\>  
    \<div class\="mt-6 flex justify-end gap-2"\>  
      \<button value\="cancel" class\="px-4 py-2 border rounded-lg interactive-trigger" data-close-dialog\>Cancel\</button\>  
      \<button value\="confirm" class\="px-4 py-2 bg-brand-accent text-white rounded-lg interactive-trigger"\>Save Settings\</button\>  
    \</div\>  
  \</form\>  
\</dialog\>

* **Accessibility Notes:** Native \<dialog\> elements automatically manage focus trapping, keyboard closing with Escape, and restore focus to the trigger button when dismissed.4

## **Interaction and Motion Plan**

Interaction designs prioritize performance, keeping animations smooth on all devices by using CSS for transitions.11

### **Focus and Hover Transitions**

* **Hover States:** Buttons and cards scale subtly (up to ![][image36]) using CSS transitions, keeping scale changes below ![][image37] to avoid distorting text.11  
* **Focus Indicators:** Interactive elements use high-contrast focus rings with explicit offsets, keeping focus visible without cluttering the layout.4  
* **Timing:** Transitions use standard cubic-bezier curves and complete within ![][image31].11

### **Scroll Reveals with CSS Scroll-Driven Animations**

Instead of loading heavy, third-party libraries, entrance animations are handled natively by the browser using the CSS Scroll-Driven Animations API.12 This runs transitions directly on the GPU, avoiding main-thread bottlenecks 12:

CSS  
/\* Native Scroll Reveal Animation Block  \*/  
@supports (animation-timeline: view()) {  
 .reveal-view-target {  
    view-timeline-name: \--item-reveal;  
    view-timeline-axis: block;  
    animation-name: slide-fade-in;  
    animation-duration: 1ms; /\* Required fallback placeholder \[17\] \*/  
    animation\-timeline: \--item-reveal;  
    animation\-range: entry 10% entry 90%;  
    animation-fill-mode: both;  
  }  
}

@keyframes slide-fade-in {  
  from {  
    opacity: 0;  
    transform: translateY(24px) scale(0.97);  
  }  
  to {  
    opacity: 1;  
    transform: translateY(0) scale(1);  
  }  
}

### **Sticky Navigation Behavior**

The global header is sticky, changing its background opacity smoothly as the user scrolls. This scroll-tied transition is handled directly in CSS using named timelines.12

### **Performance-Safe Parallax Effects**

Parallax layers shift at different speeds on scroll. Rather than using slow JavaScript event listeners, each background element is bound to a native CSS timeline 13:

CSS  
@supports (animation-timeline: scroll()) {  
 .parallax-layer-slow {  
    animation: drift-up linear both;  
    animation\-timeline: scroll(root);  
    animation\-range: 0% 100%;  
  }  
}

@keyframes drift-up {  
  to { transform: translateY(-80px); }  
}

### **Motion Reduction Support**

To support users with motion sensitivities, transitions are simplified or disabled globally if their system settings indicate a preference for reduced motion 8:

CSS  
@media (prefers-reduced-motion: reduce) {  
  \*, ::before, ::after {  
    animation-duration: 0.01ms\!important;  
    animation-iteration-count: 1\!important;  
    transition-duration: 0.01ms\!important;  
    scroll-behavior: auto\!important;  
  }  
    
 .reveal-view-target {  
    animation: simple-fade-in 150ms ease-out both\!important;  
    animation\-timeline: auto\!important;  
  }  
}

@keyframes simple-fade-in {  
  from { opacity: 0; }  
  to { opacity: 1; }  
}

### **What NOT to Animate**

To avoid layout delays and performance issues, the following properties must remain static 8:

* **Layout Properties:** width, height, padding, margin, top, left, bottom, right.8  
* **Decorative Elements:** Continuous, rapid color loops, background shifts, or floating particles.3

## **Technical Architecture**

The technical architecture is designed to organize code cleanly and keep files easy to maintain without relying on complex bundlers or frameworks.

/ (Root Directory)  
├── index.html                           \# Semantic HTML page skeleton  
└── assets/                              \# Compiled static assets directory  
    ├── css/                             \# Cascade CSS layers structure  
    │   ├── tokens.css                   \# Custom theme tokens & variables   
    │   ├── base.css                     \# Reset and typographic scale layout  
    │   ├── layout.css                   \# CSS grid, subgrid, and positioning  
    │   ├── components.css               \# Isolated component style layer  
    │   └── animations.css               \# Scroll-driven keyframes & timelines   
    ├── js/                              \# Native ES6 module scripts directory  
    │   ├── main.js                      \# Central script router  
    │   └── components/                  \# Isolated element scripts  
    │       ├── dialog.js                \# Dialog focus trap manager   
    │       ├── tabs.js                  \# Tabs keyboard navigator   
    │       └── transitions.js           \# Page transition listener \[28\]  
    ├── img/                             \# Next-gen compressed raster images  
    └── svg/                             \# Clean vector icon assets

### **Specific CSS Organization and Cascade Layers**

Styles are organized into explicit Cascade Layers (@layer) using the CSS layer directive.14 This controls the order in which styles apply, preventing specificity issues 14:

CSS  
/\* Order definition of global cascade layers  \*/  
@layer reset, tokens, base, layout, components, interactive;

@import "tokens.css" layer(tokens);  
@import "base.css" layer(base);  
@import "layout.css" layer(layout);  
@import "components.css" layer(components);  
@import "animations.css" layer(interactive);

### **Dynamic Theme Token Management**

All design tokens are registered inside the CSS @theme layer, converting theme variables automatically into standard CSS custom properties 29:

CSS  
@import "tailwindcss";

@theme {  
  \--color\-base: oklch(98% 0.002 240);  
  \--color\-surface: oklch(100% 0 0);  
  \--color\-brand-accent: oklch(58% 0.18 250);  
  \--font\-sans: "Inter", system-ui, sans-serif;  
  \--spacing-fluid-sm: clamp(1rem, 1vw \+ 0.75rem, 2rem);  
}

### **Asset Delivery Optimization**

* **Images:** Standard photos use compressed AVIF file formats and include explicit size dimensions to prevent layout shifts.  
* **Fonts:** Critical fonts use the font-display: swap property, ensuring text loads instantly using system fallbacks while custom fonts download.5

### **Progressive Enhancement Strategy**

The site is built to work reliably across different devices and browser capabilities.2 Critical content is delivered using native, semantic HTML, ensuring the page remains readable even if CSS or JavaScript fail to load.2  
Dynamic interactions like transitions and scroll-driven effects are layered on top using feature queries (@supports), keeping the core content accessible to everyone.1

## **Modern CSS and JS Feature Recommendations**

Modern browser features allow developers to build complex, accessible interactions directly in CSS and HTML, reducing the need for heavy JavaScript libraries.2

### **Modern Web Feature Matrix**

The technical value and fallback strategies for modern browser features are defined in the following table:

| Modern Browser Feature | Primary Purpose | Architectural Advantage | Progressive Fallback Strategy |
| :---- | :---- | :---- | :---- |
| **Cascade Layers (@layer)** | Group styles to manage browser specificity.14 | Prevents custom styles from clashing with utility framework defaults.14 | Supported across modern browsers; falls back to standard cascading order.14 |
| **Container Queries (@container)** | Styles components based on parent container width.14 | Simplifies responsive design by styling cards relative to parent elements.24 | Wraps grid containers in standard media queries (@media).24 |
| **OKLCH Color Function** | Defines colors in a perceptually uniform color space.6 | Simplifies dark mode design and contrast calculations.6 | Declares fallback RGB or HEX colors before OKLCH values in CSS.22 |
| **CSS Parents (:has())** | Styles parent elements based on child states.2 | Removes the need for JavaScript class toggles when children are focused.2 | Uses traditional, explicit classes on parent containers when states change. |
| **View Transitions API** | Animates page transitions smoothly.18 | Delivers hardware-accelerated transitions during DOM updates.1 | Runs updates immediately if the browser lacks support 1: if (\!document.startViewTransition) { updateDOM(); } |
| **Native \<dialog\> Element** | Renders modal overlays and handles accessibility.4 | Manages keyboard focus loops and modal closing out of the box.4 | Uses standard modal divs, implementing custom focus traps in JavaScript.4 |
| **inert Attribute** | Hides background content from assistive tech.4 | Ensures screen readers only announce content inside active modals.4 | Manages accessibility by toggling aria-hidden and tabindex on background elements.4 |

## **Tailwind Recommendation**

To keep development fast, consistent, and easy to scale, this project recommends a **hybrid integration model** using **Tailwind CSS v4** alongside **native Cascade Layers** and **CSS custom properties**.

### **Tailwind CSS v4 Rationale**

Tailwind CSS v4 introduces a fast, Rust-powered build engine (the Oxide engine) that compiles styles up to ![][image38] faster than legacy compilers.14 It replaces configuration files (tailwind.config.js) with standard CSS @theme directives, exposing theme tokens as native CSS variables that can be accessed globally.29

### **Architectural Trade-Off Analysis**

A trade-off analysis of different development approaches is outlined in the following table:

| Metric | Vanilla HTML/CSS/JS | Utility-Only Tailwind | Hybrid Integration Model (Recommended) |
| :---- | :---- | :---- | :---- |
| **Design Consistency** | Slow; requires manual variable declarations across files. | Fast; uses predefined utility scales.14 | **Excellent;** combines utility layouts with custom theme tokens.29 |
| **Maintainability** | Easy to read; keeps styles separate from HTML markup. | Hard; inline class chains can make HTML difficult to read. | **Excellent;** keeps layout styling inline while isolating component CSS.29 |
| **Build & Run Speeds** | Fast; uses native styles directly in the browser. | Fast; removes unused CSS class references. | **Very Fast;** uses a high-performance compiler to optimize bundle sizes.14 |
| **Scalability** | Hard; CSS specificity issues grow as the codebase scales. | Medium; long inline classes become difficult to manage. | **Excellent;** isolates component styles using cascade layers.14 |

### **Strategy to Avoid Tailwind Clutter**

To prevent long, unreadable class chains in HTML, styling is divided into two areas:

1. **Inline Classes for Structure:** Use utility classes directly in HTML for general layouts (grid, flex, gap-4, p-6).  
2. **Cascade Layers for Components:** Style complex, interactive components (like cards or menus) in separate CSS files using the @layer components directive, referencing the global theme variables directly 29:

CSS  
@layer components {  
  /\* Clean, semantic card styling referencing custom theme variables  \*/  
 .premium-feature-card {  
    background-color: var(--color-surface);  
    border: 1px solid color-mix(in oklch, var(--color-text-primary) 10%, transparent);  
    padding: var(--spacing-fluid-sm);  
    border-radius: 12px;  
  }  
}

## **Quality Bar Checklist**

The front-end build must pass the following technical quality checks before being merged into production:

### **Visual Polish and Alignment**

* \[ \] **Layout Shifts:** The page loads without visual jumps, achieving a Cumulative Layout Shift (CLS) score of 0\.  
* \[ \] **Consistent Spacing:** Component positions align perfectly with the responsive grid columns.2  
* \[ \] **Fluid Typography:** Typography scales smoothly between viewports, with heading ratios matching the Major Third scale.5

### **User Experience Clarity**

* \[ \] **Scannability:** Headers and layout sections establish a clear hierarchy, helping users scan content easily.  
* \[ \] **Input Validation:** Form fields provide clear, instant visual feedback before a user submits the page.15  
* \[ \] **Responsive Scaling:** Content wraps cleanly across different devices, preventing horizontal layout overflow.

### **Accessibility Standards**

* \[ \] **Color Contrast:** All text and focus elements meet WCAG 2.2 contrast standards.8  
* \[ \] **Keyboard Controls:** All interactive elements can be activated using the Tab, Space, Enter, and Arrow keys.4  
* \[ \] **Focus Management:** Focus indicators remain highly visible, and modals trap focus correctly when active.4

### **Performance Optimization**

* \[ \] **Render Performance:** Animations run at 60 FPS, relying on GPU-accelerated transition properties.8  
* \[ \] **Code Splitting:** JavaScript modules load deferred to prevent blocking the initial page render.  
* \[ \] **Assets:** Photos use compressed AVIF file formats and include explicit size dimensions.

### **Code Quality and Maintainability**

* \[ \] **Cascade Layers:** Styles are organized using @layer directives to prevent specificity issues.14  
* \[ \] **Semantic Markup:** Code uses native HTML elements like \<header\>, \<main\>, and \<section\> first.4  
* \[ \] **Modular Code:** Styles and interaction scripts are written as self-contained, modular files.29

## **Anti-Patterns to Avoid**

Avoid these common development mistakes to ensure the site remains fast, accessible, and clean.3

### **Visual Design Mistakes**

* **Saturated Gradients in sRGB:** Do not use standard sRGB color spaces to interpolate gradients. This creates grey, low-contrast midpoints, which can be avoided by declaring gradients in the OKLCH or Oklab color spaces.19  
* **Hiding Focus Outlines:** Never remove focus outlines (outline: none) without providing high-contrast alternatives.4 This completely breaks keyboard navigation and violates accessibility requirements.

### **Layout and Performance Mistakes**

* **Animating Sizing Rules:** Avoid animating layout properties like width, height, margin, or top. This forces the browser to recalculate layouts on every frame, leading to visual stutter. Instead, use GPU-accelerated transform and opacity properties.8  
* **Desktop-First Queries:** Do not write desktop-first media queries (max-width). This makes CSS files redundant and harder to override on mobile viewports. Instead, write progressive, mobile-first layouts.

### **Code and JavaScript Mistakes**

* **JavaScript for Layout Positioning:** Avoid using JavaScript to calculate positioning for sticky menus or tooltips. This triggers layout thrashing and leads to visual lag. Instead, use native CSS features like position: sticky.  
* **Over-reliance on Utility Classes:** Do not write long chains of utility classes for complex components. This makes HTML files incredibly difficult to read. Complex components should encapsulate their styles inside Cascade Layers.29

### **Accessibility and Content Mistakes**

* **Keyboard Focus Traps:** Never lock focus inside menus or panels without providing a clear escape path.4 Users must be able to dismiss any overlay using standard keys like Escape.4  
* **Layout Shifts from Lazy Loading:** Do not lazy-load images without reserving space for them first. This causes visual jumps when assets load, which can be avoided by adding explicit width and height dimensions or using CSS aspect-ratio rules.

## **Design Concepts**

These four distinct design concepts propose different visual styles and interactive models to suit various brand directions:

### **Concept A: Typographic Brutalism**

* **Visual Style:** Bold, high-contrast typography, heavy borders, and zero decorative gradients.  
* **Layout Approach:** Asymmetric grids, structural borders, and compact spacing.  
* **Interaction Style:** Sharp, snappy state changes and bold focus rings.  
* **Key Strength:** Delivers a highly memorable brand experience and keeps page size very light.  
* **Key Risk:** Bold contrast choices can feel overwhelming if white space is not balanced.  
* **Best Use Case:** Creative design studios, architectural firms, and editorial platforms.

### **Concept B: Neo-Humanist Minimalist**

* **Visual Style:** Warm, warm background tones, elegant serif typography, and soft, paper-like depth.8  
* **Layout Approach:** Balanced columns with generous margins to create breathing room.  
* **Interaction Style:** Soft fades and slow physical transformations.11  
* **Key Strength:** Creates a warm, tactile feel and supports high-contrast accessibility modes.  
* **Key Risk:** Warm, light background choices can lead to contrast compliance issues if not monitored.  
* **Best Use Case:** Premium lifestyle products, cultural institutions, and educational blogs.

### **Concept C: Interactive Spatial Storytelling**

* **Visual Style:** A deep, immersive dark theme with subtle glows, neon accents, and clean inline vector details.3  
* **Layout Approach:** Full-bleed containers utilizing layout containment.2  
* **Interaction Style:** Rich, scroll-linked parallax animations and interactive cards.13  
* **Key Strength:** High user engagement; visual layouts tell a compelling product story.3  
* **Key Risk:** Heavy animations can trigger vestibular sensitivities if not handled carefully.8  
* **Best Use Case:** Technical products, agency homepages, and premium tech portfolios.

### **Concept D: Swiss Grid Precision**

* **Visual Style:** Clean, high-contrast layouts, geometric typography, and precise structural lines.  
* **Layout Approach:** Strict 12-column layouts using CSS Subgrid to align content precisely.2  
* **Interaction Style:** Snappy transitions and clean interactive elements.  
* **Key Strength:** Highly readable, professional feel; layout systems are easy to maintain.  
* **Key Risk:** Can feel overly technical or rigid if visual hierarchy is not clear.  
* **Best Use Case:** SaaS dashboards, fintech platforms, and complex data directories.

## **Recommended Final Direction**

This project recommends **Concept D: Swiss Grid Precision** as the primary design and engineering direction. It aligns perfectly with a professional, public-facing product, prioritizing legibility, clean layout rhythm, and modular code systems.2

### **Homepage Layout and Content Flow**

* **First Fold:** A bold header with a clear title and high-contrast call to action on the left, balanced by a clean vector diagram on the right.  
* **Feature Grid:** A list of product benefits aligned to a 12-column grid, using CSS Subgrid to keep headers, copy, and link buttons perfectly aligned across columns.2  
* **Interactive Showcase:** A responsive comparison table and tabs area, letting users explore technical details at their own pace without leaving the page.15  
* **Subtle Scroll Reveals:** Page sections transition smoothly as they enter the viewport using GPU-accelerated CSS named timelines.12

### **Initial Build Priorities**

To build a stable layout, development should proceed in three key steps:

1. **Theme Tokens:** Set up the global color variables, typography scales, and spacing custom properties in /assets/css/tokens.css.27  
2. **Page Grid:** Build the responsive 12-column grid and section layout structures in /assets/css/layout.css.26  
3. **Interactive Components:** Implement the core components, starting with the navigation, features card, and modal dialog.4

## **Implementation Roadmap**

The development process is divided into eight key phases, each with specific tasks, deliverables, and quality checks.

### **Phase 1: Design Foundation**

* **Goal:** Establish a baseline design tokens system.  
* **Tasks:** Map out the typography scale, fluid spacing ratios, and OKLCH color palette.6  
* **Deliverables:** A compiled /assets/css/tokens.css file containing all design variables.27  
* **Quality Check:** Validate that all color combinations meet WCAG 2.2 AA contrast standards.8

### **Phase 2: HTML Structure**

* **Goal:** Assemble the semantic skeleton of the page.  
* **Tasks:** Write structured, semantic HTML, organizing content with landmarks like \<header\>, \<main\>, \<section\>, and \<footer\>.4  
* **Deliverables:** A complete, well-structured index.html file.  
* **Quality Check:** Verify screen-reader accessibility by running voiceover audits.7

### **Phase 3: CSS System**

* **Goal:** Structure and organize the stylesheet cascade.  
* **Tasks:** Register CSS layers (@layer), declare reset properties, and import base styling parameters.14  
* **Deliverables:** A functional /assets/css/base.css file integrated with the global cascade.14  
* **Quality Check:** Ensure there are no cross-layer specificity conflicts.

### **Phase 4: Core Layout**

* **Goal:** Assemble the primary page grid.  
* **Tasks:** Create responsive layouts using CSS Grid and Flexbox, applying subgrid for nested alignment where needed.2  
* **Deliverables:** A completed, responsive layout structure in /assets/css/layout.css.  
* **Quality Check:** Confirm there are no cumulative layout shifts (CLS) on resizing.

### **Phase 5: Interactive Components**

* **Goal:** Implement responsive, interactive web widgets.  
* **Tasks:** Build accessible tabs, comparison columns, and modal dialogues.4  
* **Deliverables:** Completed component stylesheets and interactive JavaScript modules.4  
* **Quality Check:** Confirm focus indicators are visible and keyboard navigation works as expected.4

### **Phase 6: Motion and Polish**

* **Goal:** Integrate smooth, responsive animations and micro-interactions.  
* **Tasks:** Add subtle hover effects and write scroll-driven reveal transitions using the CSS View Timeline API.12  
* **Deliverables:** An /assets/css/animations.css file containing all structural transition keyframes.  
* **Quality Check:** Verify animations compile on the compositing thread using Chrome DevTools.8

### **Phase 7: Accessibility and Performance Pass**

* **Goal:** Optimize loading performance and page accessibility.  
* **Tasks:** Set up prefers-reduced-motion media query fallbacks 8, lazy-load assets, and verify focus traps.4  
* **Deliverables:** A polished, optimized production build.  
* **Quality Check:** Achieve a ![][image39] score on Lighthouse audits for Performance, Accessibility, and SEO.7

### **Phase 8: Final QA and Refinement**

* **Goal:** Confirm cross-browser compatibility.  
* **Tasks:** Test layouts and interactive states across Safari, Firefox, and Chromium-based browsers, making adjustments for minor rendering differences.12  
* **Deliverables:** A verified, production-ready release branch.  
* **Quality Check:** Verify zero layout or functional regressions on low-power mobile devices.

## **Starter Implementation Guidance**

Use these code templates to set up the global theme variables, structure layouts, and configure keyboard-accessible navigation scripts.

### **1\. Global CSS Design Tokens (/assets/css/tokens.css)**

This file defines the OKLCH color palette, fluid typography scaling formulas, and responsive spacing tokens 6:

CSS  
@import "tailwindcss";

@theme {  
  /\* OKLCH Color Space Definition  \*/  
  \--color\-bg-base: oklch(98% 0.002 240);  
  \--color\-bg-surface: oklch(100% 0 0);  
  \--color\-text-primary: oklch(22% 0.005 240);  
  \--color\-text-muted: oklch(45% 0.01 240);  
  \--color\-brand-accent: oklch(58% 0.18 250);

  /\* Mathematical Fluid Spacing Tokens  \*/  
  \--spacing-fluid-sm: clamp(1rem, 1vw \+ 0.75rem, 2rem);  
  \--spacing-fluid-md: clamp(2rem, 2vw \+ 1.5rem, 4rem);  
  \--spacing-fluid-lg: clamp(4rem, 4vw \+ 3rem, 8rem);  
}

/\* Base specificity controls  \*/  
@layer reset, tokens, base, layout, components, interactive;

/\* Configure Dark Mode default colors  \*/  
@media (prefers-color-scheme: dark) {  
  :root {  
    \--color\-bg-base: oklch(12% 0.01 240);  
    \--color\-bg-surface: oklch(16% 0.01 240);  
    \--color\-text-primary: oklch(94% 0.005 240);  
    \--color\-text-muted: oklch(75% 0.01 240);  
  }  
}

### **2\. Base Component Implementation Stylesheet (/assets/css/components.css)**

This stylesheet defines clean, modular styles for card components and focus indicators, ensuring they remain easy to maintain 4:

CSS  
@layer components {  
  /\* Interactive Feature Card using CSS Subgrid alignment  \*/  
 .grid-feature-card {  
    background-color: var(--color-bg-surface);  
    border: 1px solid color-mix(in oklch, var(--color-text-primary) 8%, transparent);  
    border-radius: 12px;  
    padding: var(--spacing-fluid-sm);  
    transition: transform var(--transition-duration-fast) var(--transition-timing-standard),  
                box-shadow var(--transition-duration-fast) var(--transition-timing-standard);  
    will-change: transform, box-shadow;  
  }

 .grid-feature-card:hover {  
    transform: translateY(-4px);  
    box-shadow: 0 12px 30px \-10px oklch(0% 0 0 / 0.08);  
  }

  /\* Keyboard accessible focus indicators  \*/  
 .interactive-element-focus:focus\-visible {  
    outline: 3px solid var(--color-brand-accent);  
    outline-offset: 4px;  
    border-radius: 4px;  
  }  
}

### **3\. Keyboard Focus Trap Controller (/assets/js/components/dialog.js)**

This module manages keyboard focus loops for modal panels, ensuring the interface remains fully accessible to keyboard-only and screen-reader users 4:

JavaScript  
/\*\*  
 \* Keyboard Focus Trap Utility   
 \*/  
export function initializeModalController(triggerButtonId, dialogContainerId) {  
  const triggerButton \= document.getElementById(triggerButtonId);  
  const modalDialog \= document.getElementById(dialogContainerId);

  if (\!triggerButton ||\!modalDialog) return;

  let activeElementBeforeOpen \= null;

  triggerButton.addEventListener('click', () \=\> {  
    activeElementBeforeOpen \= document.activeElement;  
      
    // Open the native modal overlay   
    if (typeof modalDialog.showModal \=== 'function') {  
      modalDialog.showModal();  
    } else {  
      // Fallback fallback modal display styles  
      modalDialog.style.display \= 'block';  
      modalDialog.setAttribute('aria-hidden', 'false');  
    }  
      
    // Move focus automatically to the first interactive element inside the modal   
    const focusableSelectors \= 'button:not(\[disabled\]), \[href\], input, select, textarea, \[tabindex\]:not(\[tabindex="-1"\])';  
    const firstFocusable \= modalDialog.querySelector(focusableSelectors);  
    if (firstFocusable) firstFocusable.focus();  
  });

  // Handle Close Button Triggers  
  const dismissTriggers \= modalDialog.querySelectorAll('\[data-dismiss-modal\]');  
  dismissTriggers.forEach(trigger \=\> {  
    trigger.addEventListener('click', () \=\> {  
      if (typeof modalDialog.close \=== 'function') {  
        modalDialog.close();  
      } else {  
        modalDialog.style.display \= 'none';  
        modalDialog.setAttribute('aria-hidden', 'true');  
      }  
        
      // Restore focus to the button that triggered the modal   
      if (activeElementBeforeOpen) {  
        activeElementBeforeOpen.focus();  
      }  
    });  
  });  
}

#### **Works cited**

1. Mastering Smooth Page Transitions with the View Transitions API in ..., accessed May 22, 2026, [https://dev.to/krish\_kakadiya\_5f0eaf6342/mastering-smooth-page-transitions-with-the-view-transitions-api-in-2026-31of](https://dev.to/krish_kakadiya_5f0eaf6342/mastering-smooth-page-transitions-with-the-view-transitions-api-in-2026-31of)  
2. CSS in 2026: The Final Boss Nobody Wanted | by Pitiș Radu | Medium, accessed May 22, 2026, [https://medium.com/@pitis.radu/css-in-2026-the-final-boss-nobody-wanted-54fb1c01ca32](https://medium.com/@pitis.radu/css-in-2026-the-final-boss-nobody-wanted-54fb1c01ca32)  
3. 15 best microinteraction examples for web design inspiration \- Webflow, accessed May 22, 2026, [https://webflow.com/blog/microinteractions](https://webflow.com/blog/microinteractions)  
4. How to Build Accessible Modals with Focus Traps (2026 Guide ..., accessed May 22, 2026, [https://www.uxpin.com/studio/blog/how-to-build-accessible-modals-with-focus-traps/](https://www.uxpin.com/studio/blog/how-to-build-accessible-modals-with-focus-traps/)  
5. Responsive Typography That Actually Works: Beyond font-size: clamp() | by Roberto Moreno Celta, accessed May 22, 2026, [https://robertcelt95.medium.com/responsive-typography-that-actually-works-beyond-font-size-clamp-acf592b79774](https://robertcelt95.medium.com/responsive-typography-that-actually-works-beyond-font-size-clamp-acf592b79774)  
6. OKLCH Colors | Tailwind \- Steve Kinney, accessed May 22, 2026, [https://stevekinney.com/courses/tailwind/oklch-colors](https://stevekinney.com/courses/tailwind/oklch-colors)  
7. Keyboard Accessibility with Vanilla JS \- NamasteDev Blogs, accessed May 22, 2026, [https://namastedev.com/blog/keyboard-accessibility-with-vanilla-js/](https://namastedev.com/blog/keyboard-accessibility-with-vanilla-js/)  
8. Color contrast with OKLCH; prefers-reduced-motion and motion ..., accessed May 22, 2026, [https://medium.com/@vyakymenko/color-contrast-with-oklch-prefers-reduced-motion-and-motion-design-ethics-089c0c8897d0](https://medium.com/@vyakymenko/color-contrast-with-oklch-prefers-reduced-motion-and-motion-design-ethics-089c0c8897d0)  
9. Fluid typography with CSS clamp() \- Mamutlove, accessed May 22, 2026, [https://mamutlove.com/en/blog/fluid-typography-with-css-clamp/](https://mamutlove.com/en/blog/fluid-typography-with-css-clamp/)  
10. clamp() CSS function \- MDN Web Docs, accessed May 22, 2026, [https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp)  
11. Creating Engaging Web Experiences with Motion UI Design \- Spiral Compute, accessed May 22, 2026, [https://www.spiralcompute.co.nz/creating-engaging-web-experiences-with-motion-ui-design/](https://www.spiralcompute.co.nz/creating-engaging-web-experiences-with-motion-ui-design/)  
12. Scroll-Driven Animations in CSS: No JavaScript Required \- Rebecca M. Deprey, accessed May 22, 2026, [https://rebeccamdeprey.com/blog/scroll-driven-animations-css](https://rebeccamdeprey.com/blog/scroll-driven-animations-css)  
13. Scroll-Driven Storytelling: A Complete 2026 CSS Guide | Creative ..., accessed May 22, 2026, [https://creativealive.com/scroll-driven-storytelling-complete-2026-css-guide/](https://creativealive.com/scroll-driven-storytelling-complete-2026-css-guide/)  
14. Tailwind CSS v4.0 \- Tailwind CSS, accessed May 22, 2026, [https://tailwindcss.com/blog/tailwindcss-v4](https://tailwindcss.com/blog/tailwindcss-v4)  
15. Micro Interactions in Web Design: How Subtle Details Shape UX \- StanVision, accessed May 22, 2026, [https://www.stan.vision/journal/micro-interactions-2025-in-web-design](https://www.stan.vision/journal/micro-interactions-2025-in-web-design)  
16. 20 Motion Design Principles with Examples for UI/UX Designers \- Mockplus, accessed May 22, 2026, [https://www.mockplus.com/blog/post/20-motion-design-principles-with-examples](https://www.mockplus.com/blog/post/20-motion-design-principles-with-examples)  
17. Scroll-driven animation timelines \- CSS \- MDN Web Docs, accessed May 22, 2026, [https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven\_animations/Timelines](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/Timelines)  
18. View Transition API \- MDN Web Docs, accessed May 22, 2026, [https://developer.mozilla.org/en-US/docs/Web/API/View\_Transition\_API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)  
19. color-mix() CSS function \- MDN Web Docs \- Mozilla, accessed May 22, 2026, [https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color\_value/color-mix](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/color-mix)  
20. Making keyboard navigation more accessible with JavaScript 'focus traps' | Mugo Web, accessed May 22, 2026, [https://www.mugo.ca/Blog/Making-keyboard-navigation-more-accessible-with-JavaScript-focus-traps](https://www.mugo.ca/Blog/Making-keyboard-navigation-more-accessible-with-JavaScript-focus-traps)  
21. Keyboard-navigable JavaScript widgets \- Accessibility \- MDN Web Docs \- Mozilla, accessed May 22, 2026, [https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Keyboard-navigable\_JavaScript\_widgets](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Keyboard-navigable_JavaScript_widgets)  
22. oklch() \- CSS-Tricks, accessed May 22, 2026, [https://css-tricks.com/almanac/functions/o/oklch/](https://css-tricks.com/almanac/functions/o/oklch/)  
23. Responsive and fluid typography with Baseline CSS features | Articles | web.dev, accessed May 22, 2026, [https://web.dev/articles/baseline-in-action-fluid-type](https://web.dev/articles/baseline-in-action-fluid-type)  
24. CSS Properties Cheat Sheet 2026 \- Hoverify, accessed May 22, 2026, [https://tryhoverify.com/blog/css-properties-cheat-sheet-2026/](https://tryhoverify.com/blog/css-properties-cheat-sheet-2026/)  
25. micro interactions design that doesnt feel gimmicky : r/UI\_Design \- Reddit, accessed May 22, 2026, [https://www.reddit.com/r/UI\_Design/comments/1rpkdpd/micro\_interactions\_design\_that\_doesnt\_feel/](https://www.reddit.com/r/UI_Design/comments/1rpkdpd/micro_interactions_design_that_doesnt_feel/)  
26. CSS grid layout \- MDN Web Docs, accessed May 22, 2026, [https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid\_layout](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout)  
27. Building a Production Design System with Tailwind CSS v4 \- DEV Community, accessed May 22, 2026, [https://dev.to/themachinepulse/building-a-production-design-system-with-tailwind-css-v4-1d9e](https://dev.to/themachinepulse/building-a-production-design-system-with-tailwind-css-v4-1d9e)  
28. Cross-Document View Transitions: The Gotchas Nobody Mentions | CSS-Tricks, accessed May 22, 2026, [https://css-tricks.com/cross-document-view-transitions-part-1/](https://css-tricks.com/cross-document-view-transitions-part-1/)  
29. Tailwind CSS v4 Migration: New Features Guide 2026 \- Digital Applied, accessed May 22, 2026, [https://www.digitalapplied.com/blog/tailwind-css-v4-migration-new-features-guide](https://www.digitalapplied.com/blog/tailwind-css-v4-migration-new-features-guide)  
30. View Transitions in React, Next.js, and Multi-Page Apps \- Rebecca M. Deprey, accessed May 22, 2026, [https://rebeccamdeprey.com/blog/view-transition-api](https://rebeccamdeprey.com/blog/view-transition-api)  
31. Keyboard accessibility: Web content \- Indiana University, accessed May 22, 2026, [https://accessibility.iu.edu/creating-content/web-content/keyboard.html](https://accessibility.iu.edu/creating-content/web-content/keyboard.html)

[image1]: <data:image/png;base64,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>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAAAaCAYAAAAZtWr8AAADbElEQVR4Xu2XWahNURjHPxkyD5kypSuRkiFJCiFEMoQylvJAeVEUJepmKHlQPFAieZAHyhMePJhelCIPKEOGRAgvyJDh/7P26q69nH3O3ueidPe/ft1zv7XPPmv/1/d9a22zUqVKlWo5miZeix8BX8QF0TO47l+rg1ghDou9Ynh6uKr6ie3mvrtJDEoP/1IrMUEcEAfFXNE6dUVOHRHfxex44A+ICS0Q18TSaKySuplbuJ2isxgj7ojF4UUZmifOidGit7l7fBKLgmswbbO4LBrMJcgJc0a3Da6rqR7iungsBqSHmiUmsUzcEBtEp/RwpraYmw/z8lop7oq+QSxWe3FWvBNjk9gQ8ULcFr2S2DjxUkxK/kdc98QKJs4I8UacFm2isXqEQRhFlqwxV3Z55RfxeBQfL96L+VE8FMadEd/E1CQ2UDwTD63J9N3mTKKkvbqIq+KYuYzMJVaT3sZKN0ddxTZzJbnQCqZ9Ir+IsXFkyQdzD11NmEfp+Ycng2hBtCKSwmdlbBwt4ZL9nulVRYP8aunULSImsM/cik23OptsIm9QlnFxvJrItivmzOAz8gZlGRfHM+VLI0zlImJC98V+0TEaq0c0d7I/NqiIcX3MLSIlSn9lo/AZiCmYExtU2Lha/a2d1S65ejeBSppjzTcuFBXwUTSamyfJQZLEBhU2zve3jfGAuVXaIUbGAxkKjx30OnpeUWUZlBWvJd/02TBmWrZBWfFM0TSz+ttQcdSK7YoIA1lpJkzvyzWRRP74EBvkjdsaxUNx/ms0lwy+NBH38psfVUV1xQZ545gzZldVtfMbac2BkEnUKyY/Spw3twAN6eGK8g/AzscO6DXD3BsNf70wqr81meT7Y2iKvx/xdUkMA2lPtCkvznic9dgoa8qvYtzf+FFMe2r5HjaPeGU6JZbHAxW0ytK/jTG8AdACMAtx5LglPouJSYzneSt2WVNfpmqemzs8+52VGBsHfdlrsnhlTfeqKFaNm/l3U+qfGwGfffykVd4w/rZ46EPiornzIKaRDbx6eZFJvFrdE4OTGAavN3ctJU213BQPLP1dxCvYI7FWrDZ3WOe7YYn/l+IBhoklYorV3tlDkZWzzH2XLMw6V5K1lDfw+Z+KB+RHKe88hH2rRau72GOuJ+aB7ClVqlSpUqVKtWj9BOcVvamnugA6AAAAAElFTkSuQmCC>

[image3]: <data:image/png;base64,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>

[image4]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAAAaCAYAAAAZtWr8AAAC/UlEQVR4Xu2YWaiOQRzGH1myL50iS1kSKYmElIQQylKUNcqF3CkXtlyIFJKipESWGwkXLpAop9yQUspSpCTLhXCDQpbnMe/0zTtn5l0+53zReX/16/uamTPfvP+Z+c+8B6ioqKhoP8yk7+gvx2/0Bm1y2jWabnQVPU4P0NHp6kJMoHP9QtKVrqVjk+8d6RC6gQ6rNSvGCfqTzvMrWgENbDG9Q5d7dSH6wEzcHtqTjqeP6VK3UYQpdAu9B7MItqar/9CX3kV6sciDtLPTLpd+MD/0gg5OV/0VGsQKep9uoj3S1VH0sBqPxmVZTZ/QAU5ZCAVuIV1APyMcOE3GFfqQPqenYf6ug9OmEGPoe3qRdvLq6kEBUqC0StbDbLui2Ek845VPop/oIq88xkRkB079D/QryqLZjC3rMvSmO2G25BKUXPYJdhL9wNlA7PXKYzQkcEfodzrNryiIBnCI3qazYHJavdgHjgXOL4+RF7jzMGPWdn1NL6PkwWC3hvZ6Xv4IodPoGT1Mu3t19aD8pNXvB6i1A3cd5qBSXpM6iJ7SoU67TPLyWxfkb7l6D4EQ89H2gVOgeiWfFuXQL3SXU5aJzW+b/QqYjnfD3HeK4F47lOuU88oSC1CsPEZW4ELY9jdRcOJ1f4vlt5H0JMqdikIBVK5TzlMeKZOER9C3aBkg+2A7vPIYWYHbD/PMc5wy274ZZitnknV/0/bTrV0rsl60YsfRazATMDxdHUSDboa5Z+lWb5kN80ajT4suyoMQvn9lBU6T8gPpwNmtegrh/lLYzv38phWioL1EsYctgl6ZLtCVfkWANUj/tk3eSgEKlmiiD+hXOjUpc8laocrH21ALkD630490sm0UQrP2BrVXDUX/VaK+2/JzCB8YbY1W+zF6C+Y+qKA9gnn1smhlXkXLk3Aj0s8mP8Ckjf5JG/V/lF6i6+hZmANSB9N/j1bBKLqMTkf+yV4Wt/8ZSKeFhqABaNtoexex4QP8V9F/GvbB5MQiavVUVFRUVFRUtGt+A5Thq/XMOyz0AAAAAElFTkSuQmCC>

[image5]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAAAaCAYAAAAZtWr8AAADeUlEQVR4Xu2YaYiNURzGH1kie0S2LMmWpISUNCOKD5ZQhIYoPiolS0ikbFEiZclSkpCUJVEmPlizlKWUkiwfJF9QyPI8/e+Z99wzc9/FXBPN+9Sve+ec8573nP85/+UOkCtXrlyNR5XkPfnl8Y1cIZ28cQ2tVmQu2U+2kYHF3bFqR5bBnl1HehV3oyWpIkML35uSnmQJ6RMNS6eD5CeZFHYkqAs5T7aifIZuDzu4TaQNGU6ekpn+oBLqTS7D9tGNVJBHZIY3pgO5jeLLInaQ5t64RHUkd8lL0qO4K5WakNHkGtmD2iecVSth69G6nOaRZ6Sr1xZK69D7fSNJMuJ12IFIOowL5DF5QY7A1q/nM2kw+UBOk2ZBXxbpxcNgN/AUsrmXkzvEo0H7SPKJTA3afckg1WRhcTNGkHuIjK5xml83sl7Saeqq6qTLpb7kELkEM2ba03SHGBpOm/9MNgftvnToOnzF6BUwt9N7V5N9hX6pbIbbTb6TsWFHGaTFyX3kxmncwRmolOHC9lCjyEfYRbhDdpGziNxUkuFOkp0wd31DziFjYnCuIV+Pix/1kYxVCdvQ/KAv1BTYpkMDpTWcpHd9RRT018OytJMMpwQyG7Y2oUT0HJZcUikpvrVAxkzjSQtySeMAzH2TNBn1M5wy8H0yHeaiP2DzHUNkPK2rbeHTSTH0C9ngtcXKxbflYQds4o2weieLVBeNJzfIdmQrU0oZqFS7L5VGMpqfVYeQB0gutdz8V0nroK9OqX4rFd/6wwK8f83jJINNI7fIWlghmlX9yDvUNpDb2Jqg3Zduq2JW56BdIUiljEt+qjm154k1I6L5q2GuHKu4+k3uqcpbNzJJMuwi8pAsRsoTKyFXUqjOUlXvNAGWLfXppIDfHZHLKT6G9Z+k/uNkaeFvHYpc2Decc9XDSE5gNVYO45syoYz2CslxST9VtMk5+PNYGEoJxH+3NqLgrZvssqPcX78IlATGFNq0FrUp6PsaRG4imk9rXYXIQPpUPFTyUlYuKZ3aW0RZR9Z/XcAFU3ECdSeMvy0dgOouJRUFeRntCSzwO+lmXkTtTCgjytWVDGQguaXcVDHXSfPvJWfIAthYJUi5+n8v3YIBZBYZh2y3WWP1TNyz/vwVKA4LDSItQG4j905Dgy/wX5X+07AFFhPToBuQK1euXLly5WrU+g3XirjxEuS7VQAAAABJRU5ErkJggg==>

[image6]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAWCAYAAACPHL/WAAABkElEQVR4Xu2WzSsFURjGXyFEPiISJaVk4yMLsUIsFNkqOxaWVnbyD8hGFrKRpZK62SrKRpEosqVsbP0BeJ6O25j3zp3OmTszV5pf/TbnPd17zsx7njkiGRkZf5EGeAiXYTfsVDZ7U5NhCl7DJVitalHgol/hVxF3vanJUQdX4D1chfX+shOj8A4eKM/gE+zxpiYP3xDf1C3chI3+shULcE2N8Xf34awaT41KOA2v4DZs9ZdDGYBdaowb3IAVajwInsFaPRgXXMAYvIB7Ys6HKyPwFDbpQgD98B0+iwmUxKiBW/AN9qlaGGy1YzFtbAM3wc08wnZVi4XfYbEu7mExDl/EtKEtVT/GChfODTCtosY525VtegNbVC01mGpMN36XFsWEQ1TaxMT0pZiDnio87HyaPPwTUtpG8gzBD3gibi3UIW6pWsA8zMFBsYtVW2bgJzzShRDyKcfw6VW1sjMn5qrjsiGm3AM8F7uYTxUGyaRE+3aVBP+YfatvxUHy2xDH+UqUYSm8SBZzR8rwxDP+C9/rTz6KqFp59gAAAABJRU5ErkJggg==>

[image7]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEMAAAAWCAYAAACbiSE3AAACRklEQVR4Xu2XTUgVURiG39BSsR8jSATBu5BoERFEBq0qaCHkD2TkqqAg3AUtwiAicKOV4iIRKtAEURcuWrQQAoU2BREuXAUujHRXrYwoot6XM+PMnc69zbnO5A3ngYd775wzM+d8c75vzgUyMjIyypNOej960EI1vUyPeN8raCO9TnNBt/Q4Q1/Tbroz0pYEObpMn0WO26ijb+iviA+Rztis1NCrdJFeo7X5zSWjCTyFmVCcYOymL+gSTADH6Um6I9Tnn6HBa4W8pXfo3vxmZy7SQfoR8YOhfg3Rhq1EuXqWvqIP6IH85ljk6GN6mK4g/WBo9eyHGXsq6AZapvP0EeIPUitMea5zdY5LMGboEEyqrNLniFc8ld5Kx1FaGWlLlCp6F2a5N0fabFygN2GC6RqMOXoJ5lzZR9/TplA/G+30Jx1GSjUmXFhvIF5h1aCf0H3eb5dgaBJ7vE+fE/QrvRc6VohdSCEQmrQm/w5ur1wtz36Y9PBxCYaN43SdvkS8h5EYenvoLaJ9Rwfci9FBmKL7IeQaTC5/9373bPT+kwH6g54LHfODsQCTRqmjp6cCqUJ5Cu5BKEahlaF75GB2mj7qo7wPB8NPkzEUTwHb9Zw5D1Oxj6L4zUpF22kV3knkX9+v/lMIqr9SshdBP33epl9oi3esELbrlQ3K72mY9PC31Z8RpEkb/UZvIZi8atMInaVX6AT9RFu99mLYrvffo4kcol30NDa57F3R06iHye2/qQKZZD0pO47BbJvjqP8ZCkpGxjbhN2fna9WBDzN+AAAAAElFTkSuQmCC>

[image8]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAWCAYAAACPHL/WAAABuUlEQVR4Xu2WvysGcRzHP0KIUESKUCSLlKRspBgUKaWY+AMMBotsMmAg0SOLidUqpVgMEqXMZEFYMOL97nvfnrvLc7/vGO5Vr576fu567nPf+7zvRFJSUv4rebAHbsAtOA5LLUfESB88hxOw0FYLQgFch0uwHrbCU3gDG03HxUoJnIZXcEbC3c12+AKPYJmxNgm/Re1YonCHuFMXcAGWW8ueaIOP8BpWGWtjohra1QclTT7sh2dwRbIX5pVKye4O52kTfolqzA2eV2xfjAo93CeiLqrOWnaF5w/CV7gq7jOqd/dW1PzFRhFchA+wxVbLxQC8h08wA6ut5V9hE2yGAVJjq0WCOSxmJVhY8PFdhm+imnSDKUkjhRfOBi4lmjjvhp8S453PBVON6cb30oiou+uXDlHxzF8NZ+8OfsAu03ps8A859Bz+XgnWiGZPVETzV8Mm2AzfT3xPOVEr/lPVwjA8FHVHmUphmYfPcMi0NiWqyW1xng+dcgyfZlvtz6iA+/BY1FfHHHyHB0bNCaYcX8g81+3YROFON8FRwwZLNWaYYHxuOUduMqHCzFcidMIdj66J/6+FlBSDH23nSCDe8mfvAAAAAElFTkSuQmCC>

[image9]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAZCAYAAABU+vysAAABjklEQVR4Xu3UPyjGQRzH8a9QxECUREhisCgZbAaJQYlF2SkZ/OlhscqEyMIigyjKIGV8ZlYWi5Q/SVHCoMT76+6e536/HnrCeJ969TzP3X3vd889d49ISEhIyN9Tglr0ohqN6EKRP4g0YBqj9r2LX1+FAnTYz2V2TC5a0Yc65Nj2SCZwhw9sYw3XOEAh8jGLEzGTdeMCU2Im1PpHWz+HDQxiBQ8YwA6GkcALxuWb6AN0wL6Yb7GLBeShH09oT40WGROz+Cb7uQ2vOBKzeI3u7hVuJL2DOt8ekii2bZG4hczE2nWbD3GGcq/dPVi3X+PqR1IjRCpxiS2J/hSb8ouFuMnuxWz5ekyLHefq3cI0rlYf7CerhfgTaXQXdDf0fJTG+vxkqv/XheiWruIW9bE+vV019n2m+j8tZDLeQZrF/DTzYq6hRm/SsqQPoTszerBdflpI/Mx9ZRFvYq6f0lPeGRlhvv0xTsWcjSR6bN8S3iVdrzcugWev7RxD9tW1aX/8OVlH/7wqxOxISEhIiOYTbDZib9DqEGAAAAAASUVORK5CYII=>

[image10]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAZCAYAAAAv3j5gAAABU0lEQVR4Xu2SvytFYRjHHzFQbohILGQ0KIOU0WCSRfEXqJvFxHgXKWWRQRaTGGwo452kzLJYFCmLEgMlPt+e93RfxzmdxeZ86lP3fc7z3p4fr1lJSclf0In9ke0Zcf1O51WwLzp3Ywv2RrFWi1jCW/zCJ5wL8fUQe8U1rOJDiCl/Hk/xEz9wEwfwIuQod8JSqLIbPDSvSqjiIxxJkmAUn7EWzk14gHVrTGIQj807/IUu7OA9DoXYpHmV+pagUZzhJXZgG57jG46HnFnz7nPRH7/jcjhvhFgajVp5+qYO98ynsWpe1FaI55JUVzcf17551WmG8dF8hys4g9vmXY7hrqUeQRbqRtUqOa997VC7vMMT7MFpfDG/t9hIzUf70Z7iXWWxYP6y1JXowivzTtVxIcmjiF9fFnrG1zgVxWpWfO8Hmm/RjFWQumiOYrqTPPGSkv/EN1o6PODvHZa7AAAAAElFTkSuQmCC>

[image11]: <data:image/png;base64,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>

[image12]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAZCAYAAACo79dmAAACrElEQVR4Xu2WS6hOURTHl1DkHXmE3CIRhTxKJANvMWGgGChxDZQwUFKShCJCBlJIIpQMjEhCBhQGZhiQCCFigDz+P2uv+51z+s7n3sG9F33/+tXZ6+xzztp7PfYxq6uuf1c9xXpxVGwXI0WH3AyzjmKhOJJYKrrmZrSBxonrYqboIxrFV7HJKg53FofENjFcrBafxUMxLM1pEx0U38XiNMbhu+KtGJ1s88RVMTiN0QrxUxwTnTL2VtU+84+uSuMe4qb4aL7raHOag2OhIeK5eCIGZOytKkLczzwn0Vjx3jw1uifbJPFArEljNEg8TXDd2zwlFplHoIt5ajHu64/8Ft9jcTwD/c0jw5ysLfwpFYV2WjwT4wv3ipouvomL5o5tEK/MI3An2ZeLXeb5vc68BhrEJfEpzb1tvrjzaYz9rPniq6qb+QScJKxzrfbK2J3j5hGYkrFPNHdsr1Wex8Ed5nUxO9lQg/m36EC8b6V5mrWow4wSL8Qp80VU0xLxUswq2MNZcjyrSK0Lli9G3sP8LeKM6JW51yyxE6QCIVlbuIfYyXticvGGlTsb+U2XoduE+NYB8UMsyNiriu0n14DrUFT/yYwN4egtMSKN2SVaWOTXn5yly9BtQji71fwZWmPNnY2XA9chnMRZenCISieM2UOALkLOhQNlzk4VX8Rhy5+MpAGHzTTzNCG3iydnk4aKR+KEVVZFC6GaeXhCsg0UN8Q78yIMXotzVsnDcJbii0hFMb4RY5INhyji++b9GtEtKEIWUKr54rHYI5aJy+JDsociLaqxMzMvnL0mrpjvOkcyi+d/A80xdyqe32heyKRB2NiUYvE2KRo4PyczLJ+/LVE2DWhdNHciVRra9lRZzv51oiNwtHKq7bdmHpntJX6EyNFgt9U4Muuq63/XL04/lJ23t5x8AAAAAElFTkSuQmCC>

[image13]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAZCAYAAACl8achAAACQ0lEQVR4Xu2VT0hVQRTGv9BAMTPQCCFBIgKhaCHWJiElRRBBWgVGhC5aRrUQA8EQt0HhIsKNRCAmaISIf0DFRaKbgtooLoygVS3CWiRq3+eZ8c27XuUpLh5yP/jhnfNmvGfO+WYukCjR8VUp6SSvyTNyMf3n7NM1MkmqyVUySrbIE3IimJc1yicjpJXkuFgxWSB/SKWLZZVki1XyG1Zlr6ewaj8OYlmjk+QFGYdtwKsdlrT+as45mI1ukjOknlxCun1Ok7uws3EDqc5F12tcTpphnQw73OTm5LlYxsolQ2QD9g/KybQbfyGD5K0b122vAGrJMrlHKsh7MkaKYOtnYUWYJ69gHdTcFdJHHpJecodMkM/kPA6g6zA/6yZRVbz6yTqpIY3kE8xSZbCEu3ZmApfJT9LmxuqINrpJGvwkpGzY7eZI6pLeo6pnJFVmirwhBZHflLT8H9pIegBL5lYQKyRzsDVeev5KSoKY7PeXVAUxWUZFyyhpVVWtew67VaLaK2nFlfQwrDshvtJ+3gw5FcSUdPSWyjhpn3AHUgdD3tSB84p7qfQS1k61dT/FrT900vKSPiSP3LOX2n47GMe9VJJHVemWSFxW043hFbf+UEkryfswX30n3wJ+Ib16eqlOu66vULLSB7JIzgZxbcJvRO/RQZTP5Xev/ZJW0WLlPy46wVF+kAvkClkK4mtkAOkHVc+yiW4MbU5f2R6Y7bRemw3X6z7/GMT+wc6S0LOPv8PuC+HIpY+CChG1UKJEiRIlOrj+AwbtiLd8YK2ZAAAAAElFTkSuQmCC>

[image14]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAAZCAYAAACRiGY9AAADGUlEQVR4Xu2WS6iNURTHl1DkHZGQmzxLISFCZ0CSGEgRIymMCEmZiJlEwkAmXikiEsrA4ETJo5C88sijMJIoCnn8f629O/vuc757r4Fz3Tr/+nXO3vv71rfX3mutvc0aaqihf6XeYr04JLaL0aJTMt5THBYrxFAxOKNveK5JLA/PdBbdxASxOvyvm/hoWZREP7FGfBebrOIYE38tfhewLzw3Q3zLxr6IBWG8bmJCP8Wi0Max2+KDGBf6Jos75juZckE8FMOT5x6JJ+Ke+a6zIHXXbvMVXRXavcQ18dl8F9FC8x1M1VUcFHOTPpzan7TbTUxugHkOoPHio3lIkkuIHRsS/kfh5GZrnnutOUVesXMlMc38m9heYs3zmN/+4dkI7zKfvK9VUTBOiDdiYjaWapI4K/pk/Th1ThwTz83tbBPdk/EH5pHBWFmsMy8ktE+b22SyO8Tb8OxXMUusDG3S5b65vUL1ECfNDb8Q86yyc7nY2VNiWT5g/pGbYmRos9q3zPOP9xCrXRZ3xcDQh5g0RWavVXaMd6i6T83zdpT5u9F+mzVWvBPHzZ3NNV28skoRScUk8ne2mk+W91B0CmJ4I3bzsngvRiT9OINTR80jgLD9a7FKhCDbvLbG2AHz6kiVbIu2mNvaGNpFTiEm/kPMzPopRoQchSnN4ZpiZTcEYnigOBE+koqCQgkvW/WECDWcJWfSsIq2+EWtOUX+TMn6Cc2X5gVsajZWJXKAwxHSpMM4E4mHahQlnlJ/RnTJxuIBnTtF+GErnoNFTlEgbojHYlDST/idN//2FfMcZQELNUw8E0esUslicrMqVLlUc8Qvq95BhJOERxrz2LxqPploPzpFQWoKfWipeYilIc91i/cXh3Y8btLCU1PzzcvvTvOKdkl8Cv256KsVllGsKgf3LvPDnAp33XxyUdEpvklhwNZF8xsMjpEz7HQs/cCiUIDIy9jHVW6PtSDOhZL5ITjbileB/pK1fPXhGWxgiwqZHw15+HEZJtyKvtkhlDvV4UVEjDEPS+B/m646/7O4euU3/ZauYw011FA76w/m567S9egP9wAAAABJRU5ErkJggg==>

[image15]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAZCAYAAACo79dmAAACfElEQVR4Xu2WS6iNURTHl1CE0NWVkDMSURR1k4nyKqVEJkyUwsCEiefsJo+IwgQlA1GUjEm3lMSAARlJJCWhxAB5/H/W3p31PY7TVe69cv716/Stb+31rb322nsfs446+rc1WmwQZ8QBMa34uqI14kjZOBCaLR6KPeZJrhf3RHd0CmqIp+JCyf7XRUKPzBMdJsaIm+KTWBD8skaKc+KHDUKyu8Rb8+pmLRW7zVujLKp+TLy0AU52vLgr7ouuBJUeHp2CGuY9PUs8t2KyE8QMsVpMFaPEkvRM3CxWZrKYkuB7I5JPtFVyoJpUlYRPi33ipHgs5gc/xEeOih7zgOVkd4jX5u1Bv18TG8VB85babt5mDXFdfEy+d8wndyU9Y79sPvmC6EkCfRdrk42Ah8UTK54I68TO9L4uWZTjMalcGfx7xTexPNlQw3yTslIUYpP5XqhrvV/KwankpGBn6Zjl1vTM8p41bxvULln2QdRc8V5cNV/yLAqA/15xyZrxazVPfBB9Ymyw52RJhuCHzJc/q7/JZn/2xsRgp+onzFd2VbDXikZnKfqsdbI0+23xIvAqvf+Snrf5sLbJEmdcsJPsfvMxHJe/rSxVo/zlGZfboKz+VnaR+CxOmSeYRRuwoRebtwm9Hd9XRNO/seYFgHPdBovCzjl70YrBc7LnzTcN4pdnvjEn2RizUjyw5jc4LdiETKClCMZSPBNbzGdKIgujUxK3G8cKy0/l4Z1V2+CWuGG+07kdOcpmJp8V5knl8Zww+daMMZcl/1pNN/9zQjAG/4liG3B00e9d1mZpB0utenbIiRuHjflVHLcWV+ZQ0WbzHs1wNleuzI46+l/0E9QhlECs5aGHAAAAAElFTkSuQmCC>

[image16]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAZCAYAAACl8achAAACEElEQVR4Xu2WTUhWQRSGT0hQaD/QjwQF3yoIDJEoN0IpFUEEQQRB4qaF7kQ3kiAE0VIX0iIqEBeC1CKlRdCmIqigTUFtChe1DGqlLhR/nteZ0XGYrvhBoHRfeODOuWfuOTNzznyfWalS/4f2wQicTF9sVe2A2zADp5J3W1bN8Me2UdIqi0fw0LZJ0iqLXrgGfbY+6Z1QD2fgHOyHi3Dc3LygvdAOA9ACNd6ezte4AlfNxQh+B+CK99nlbYXSBwfNfTBNugKvYAG+wBMY8+ML3qcNvkMHnIBJeGHu9CrwBpbgAzwwt0HynYLH0A334Qa8hM9w1AqkD6skKn6cJh00CvPQCpfhEzTCMXMJ31n1NGuA33DLj3UiWugiXApOqN/cYu56H0mnpDja9azk2APXI1tR0j/gSGLvNJfM+ci2B96amxOk569wMLIp1iycjmyKq/h/TbrJ1soiaLNJy66kn5k7sZiw08HvNdRFtlysDZPugp8J0+aO7Je53TrsfXNBpWFzx6ljLVJuflVJ55T7kJQLKqlGtdM3E7t6RQ0elJufi1VV0mqOtM4kBVW36/qKtRuew0c4FNm1iLCQ0Ig6OdV7UFHS6pUNpUZSSag0hK60d3AWvkV2lc841LppK9KzykQ3hhY3AffM9Yr+w2ix8Xzd5+8j2xwMefQc7E9tfZx/Iv0oqFHTEipVqlSpUpvXMhRHhWe0rGOqAAAAAElFTkSuQmCC>

[image17]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAAZCAYAAACGqvb0AAADDElEQVR4Xu2WS+hNURTGP6EIEfIulygSkRAxk0hKpAyUgZLXhELMRWIiGXhmIJKkpJSSR6HMhIGSR1IIERJ5fJ91Vnfffc8+5/4NrrrOV7/uPeuuu8/+9mPtDVSqVOl/V42sjIMJLSV742Ck/uQEmRzFu5FZ5AA5RBaT7g0ZbdJEsoFcJT/Iycafc1Ujj1GcK4M7yGcyPYpvI9fJGDKInCKHSc8gry2Sec3iHPICxYYkdfAo+YXiXM3sOzSb1/dXZG4QG0uekYVBrK0aDutAkSFpBdmP4oHScj8Cm83Y/C7Ye/Q+Vz9yE7ZFtDLarlbM12CGJiCdq85vIcvJdjSa70Uuodl8X3KN3CUDYVthPKwW6FmDuSCjj/3lj9Se2nH0vx5kSBQrHdAy81ru+2DLuSh3JmxlKD827yZT5hWvwQrpJ/KT3IatCBXi41lcgyJNJXfIN9g2PE1GwgZRz9p2akuDVKgiQ5JmUjOqUUzlaoa0MmrZc2ze/1dk3uNLYAbWoD5zGtCz5A2ZlMUkTchHWCHVqbEbVmxbPkFShqTRsD0sc1Jerjq4GVYTXLH5obBToivm9RlKRVErQrXDpXfLuGZa7zyILp4ceYYk7aE9sNF15eVOQ325u2LzeSZT8ZR5taU2z8H65upNLpIPZEoQb0l5hiQVD1Xi5wEvYR3TXtPzuowwR2h/Ku81rI0RsE6nzCtHlV8qM6+7gWbcpUFX37/iL+4MKfN5ajU3nnmPvYXdL1yDyQPYjc+VMq/Cp/imIKZB2JqhbfedrAp+L5Ubikc0T6Ng53xZ7k7yhcwIYuNg/w2v0fNgq2N2EHPzKlz+DtWcG+Q+bEVKKmoqildgq0a52vPvYSdPoebDOqOrrV4mtFzvoflOrjP2DOpHix8nWvKh1KbMeI7avoV6h5eRJ2QtWU0ewq7Y4UC6+QvkMjlGnpLzZFiWszHLcRahXlQ99gjNPv65dPmQQaHvscJlr/0rUwMaMjpYqT3f0dLS10pYDzOvz5auqJ0gXUVVtXVcOXouvaJWqlSpUkq/AUfT0DleSCiAAAAAAElFTkSuQmCC>

[image18]: <data:image/png;base64,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>

[image19]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAAAxCAYAAABnGvUlAAAKqklEQVR4Xu3ce8hu2RzA8Z8Qcr8OIWfGdXIZ4dAUOo0Zl0RyCPHH1OSSRExDRI6YJMY9EyYTCjNuyWXc4nUootyaGeWSIZfQEA255LK+1v55fu96936O877PzDDn+6nV2c/e+9lr77XXs9Zvr7XfEyFJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ+h9y7ZZuPq7UUbvpuEKSJF29rt/SdceV/6fObunx40odtTeG5ShJugb4fEv/HFcuuO+44ip2Rks3G1dOCNY+2dKNxg0b8KmWbt3SK2PV+TNy85GW7tzS31u6aFq/Cfds6fjymbzIm/K/tKyvDkbfxvWzb44sndTSgeijdX9t6cxpPeb259/PTevZznGrfS39qHx+d/T6U9OtyvbdIv/ntPSA6Pnl+S3lR72o62rg/sjYbL24TvSA+g4tHW7p4rKNsqPMqYuU9bXKtt06saUvRK9n1WNaelNLf2zp/sO2VOvpy2N7PT2lpR+0dLuWzmrpBi29KHaW7+XT/i9t6RstndDSx6d1m/KW6Of39OjleadpPf+yjt/396d1o5/EznN+cyzXfepG5kXZZV6Je7auTCXpakEHSON0JDRyF44rr2KXRO9c5pwaOzu0TaCjyOPSQRM8HBerwAH7W/pTSzecPu9V7ZjobOgkE3k9tnxOtYOhw9mKHqScEz3QxZdb+sO0/NSY35+8uDaQ1xXTcuJ4Pyuf3xa9jPCkll5btlVzI5/ryutASx+dll/S0gumZfJLNT/Ofalu4EPjij24e0vfaemW0QP4rAfkn+UL1ud57xXHJjCZsy64qPUUWU8JOvk9Eexy/6kPrDt3WpfeGz2Qu2P0IAgEgQRvS5jOzzpRcXzSHM7xvGmZ+sXvjMDwl//Zo5f13HU+syxTz06blpfqPkFp5lV/0+mdsb5MJelqUQO227R0r+gNNA3YQ3On5nnRAxc6DvZLd2np2dO/NPx0Yo+O3tjV79Pg07BmYwq+88LpXzBKwqjB7aN32CynfS39PPpT89xoCY0wjfvDW3rwsG2vuCYwUkNDT6fzuOgdHrhWynDuvHajjmAxupIjHCAvRndGYwdDWdDh0YHRgeJ30QMz0PnO7U9eGbDldaV9Ld0jtgcO9yvL74vld8aYmqxB221jFZDNoS7R6VMXPx2rc13K70gB21Kws1t5r9/a0j+mZa7vM9MyCEKol5uw24Ct1lNkPT0+ehB7vej1m/LGg2IVVPE7z9GnJ0cP6rgn6+r5o1r6ffRrJxiqeKhaOs9vt/SMaZnrJLF/li1oDziHEe1Foo3Ja1mq+4zaZl5Zrll3+O7BWJUpx6AtPDAtU555TNorvkeiXHJ5XflI0q7VgA2MZjAVBZ5oaTQxdt7gifXkaZnvMPIAGmsCtC9NnxkJIdhBHZmo3/3VtEwer5uWaTzrqFltWEeXRZ/eBec6jkLdoqWfrkkvW+26Ax0XT/3fjPkprsOxPF2zG3U0iE6qjpBwbdyzig5i7LTr5w9Ev8ZHRO9s2H+rbEfuT155/PGeM1q0FDg8LZZHT0C5cZ/p9AjWHrh986xnRa8Xc/dmzI9rop6RD1O84zTX3DnjKbGzLtSUDxMjfhdsf3vMTwET+Lwj5kcWd2Op3DHe+yUEt1lPqVc1KCF4roHGQ6JP7ybqxFb0fe4a20e+qnoeN4k+1XlB9O9z/+d+PxXnQnBF/cjp2cQ5rwuAyYfAshrrfkVe58eqLlI+3DOMZfrr6A9P+EWspoS5Hs6XNu2z0zpJulKMARsNYjZMNJA5yjV23jxR8uSendX+WO1bG9kMDnI/Puf7ZvW7TNWAPGqjTGOYHfO6gO0vsQrSONd1DftundLSodjeCdNg/zBWZVaxXz51j6mOUo5qQMaIxZECNqa4xg5m/Aw6Gqa42J/gdm7/pYCNAIgObSlw+Nq4YgZlxbR6dnb/DUbYCGBr+XIeY34cO4MB6tOh1aZ/mzvnTXh19DpacX6U79yUbx2JGROd/lJAs1TumLvXI47LaHb9bfMbzKlLfi/5cIb3x2oKFNSJnHocf9NVDfoS36vTluscjNV58IBwNAHbZTH/O0TW/Yq8auD5/JaeOC2PZVrbHkZV/1a2ca8ZQeaBQZKuNHMBWzZMSwEbjSKNNe87zf3XE/V42dHUhpzvXhLL362NMt+9cVnmeHXaJvGOSu5HR3Ny2QY6rLGDrGnpjxnofOs0zDjNddH0bwaim5ABE06I7Z0K94FR0NHYwTAiyJQUnVAGmHXEgmnVuf3JK/PPe05wSfkyUkHHxzFYZgQs1Xu+hONz706PI488PSxWU2qcR+0wub9jfq+J1XQ7+2/F9jq3FOysC6BIc+d5nymBfTh2liX7vzj6aA6/E6boNyHzmTPe+znUU0aZs56eFNvrGXWj1mvucX0lgeApP8+N0CbyeU9Lz43+xw51WpSgjXyXMNLFiCa/bUZQebWhBkbkz8j8HNqUrdh+z5fqPjIvkBe//zqyyr6MquWDVa1/47E4zp9j5x/oSNJG8XRYGx+CgWxka8BWA4cMGH4TfYQBNIzZANbjgcaR/ejEGEWgEeQvIXMd3+Wv3UDnwzQFWE8eifw5jzfEzoCNURjWMYrwvWHbXtApvWpa5vo4NuVDZ8zIWjbwv5322QSC2YoO5fhYTffle1tMFxJo4euxGlXiPHNqiL8CzP3ZJ0eDuA+HpuW6P3lxPSCvcSSLaydPziXRWS4FE+kT0d8dSqdHny6bw308L3pQlNd8ZtlO+Yz5cf7sSyJgGqdc63uBe0WHnVP8lBf1nXMmb0aKa50g6NiEDNhquSfy3F8+nxF9hIxzWldPmR7l1YVxSpSAbgwCGenknnDMdVOi/D4rzps6x19pMkW65HD0c+McCZQYiR3rO+vyd1/rPk6NnSPPS3WfKfnMi1SPm8YypTx42MhlRtTANdEeHhe9bcj8JGljmK7h/Q46GxIjJzRqLNO4nhX9/THSBdEbTzpNAqNzorvb9B3e+9iKfkz25RgXt3TvaT/QeH4r+n+Rkfgu+21Fn/oDjSH/hQHHZBt5JD5/NXZ2xuA7nNtWS/u2bdkbrpsAgVE2zj//axM6hyy7TJtCWVV0qF+M3nnVYI73AQm4QTD045aeEH3kM0cWKFdGnwhoeBk8yxlz+/PvubF6WT2vF9xf6gbXSoeXI2x0VmMANarBGihX8l5CYPjB6EE9edaRLoKvMT+2fzj66M7lwzZsjSv2IKc8CYyuiP47AsFJrQ/5gLFXBCP8Djkm+X13Wk++3IfM7/XTeh6yeHChjNfV0/Ojv5dJcEddSnNT7Li0pXdFz586sknjOZ49raesaVOot1+Z1qHWfbB9DNiW6n6OkI15JQJG1lPmOcJGsPex6HWStpH6xmf2oz5y7PwO5ytJ13h0FHVq5ljEqA0jGtoMRhBJ0m7xgJBTopJ0zOM9Et5ZYcqTqdJjFVNTp40rtSuMMr1i+lc6Woyk8d+GMOo2N7IvSTrGnRg90NDeMN3le0WSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSjl3/Ah9fS0SadOBfAAAAAElFTkSuQmCC>

[image20]: <data:image/png;base64,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>

[image21]: <data:image/png;base64,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>

[image22]: <data:image/png;base64,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>

[image23]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAAZCAYAAAALx7GgAAAEqUlEQVR4Xu2ZaahuUxjH/zJECKl7M+UkEZlKiHBvQhSSeeoSQnww3IwlV3wxxgclPrhIIUS5hkjHkEwRKSKFDCGUUMjw//XsZa+93v2+735PnPOe2r/6d89Ze5211/M8az3rWftKPT3zzNHW2WVjz+JnxvrEurxo71nkrGtdYj2vPrj/CzPWSWXjGHa0brTuslZaWzQfa31rhbVL9fPa1tbWOYr3JY60lln3auGDiw1XK2y61tq++bgz21oPWkvKBxlrWRdZ55UPKvDXCWr6qjM7WedbL1h/KpzblWOtR63drQOsd6zfrWOyPptar1t/F7pZsVuBYF+gMHShg7u39ZzCHuxao5gvC5f5dQXb7rE+0+CCz9nH+kVNmzdQLPbbrS+r53tmzztDcCli9rO+UPfgLrVetg5WbTQr/CvrY2ubqm0jhYPeV5ynqxUGpb9ZR5GOCTAsZHBx6uPWmYodA5tbb2hyBx9v/aHRwd1EsalYPGVwD7eWW9do8ncPwASYSNfg8jJeSsAINBCwBxSTZXJAcBlzmIE7W7OVXrR+sj63rqq7jIXsgEbB3NYrGwuSD5gDuzbBXLCJRdiFGUVKf1LDg8t8GO8mDe7cHNrnPbisOlIyqYcAJvh7HEFagXHBzaHvrIYbWsJuf1V1qv/AOkjt6ZO+p5WNBaRSUuGzas6X+ZS7axiMcYsivWP3sOCSvTia9tUUBreNzaw3rW8UhRYQsIesWxWpmTPkCQ0WCOw8nPKd9ZZ1VvPxAKSu1YoMQQoloLtZr1mPqU7zwLNLrROztq5wbDyiqEeWNx+1Qh3CjuSdw4LLxmBnz6jOgFMfXJyHEy5TvXsILjuBZ7Sh66yPFNXkXNnOOr1sVAT6ZOt7RRbAiRR6DyucOinsMJzLOKkAHAb23K36PW3Bxf6LFWcyLIrgYhhpcZWaTsCYjat/E3tZvyr6zhUcuFXZmLGh4mjgvMQxqUCaBN7Bvft+xXijwGbSLIsh0RZc0jUZKvlo6oOLE9ZYF6qbE5NBOG6c00bBgjnMekYx1imKdN0GVe+ysnEEOP9OxXEybMyco1Sn40QZXLIYY86kDpry4KbAprQLB1p7VD/foLgSHFL9DsmgWTWLsUlZqfp8PtV62vpQ7UUV7xx3jidSYK9UvVi5Mh76b49BWARU+bm481OIcT3kYwa79r2iz7dVn5+r37la5sxLcAnilmo6DSfcpuZHC7hekXqB8TiH8+CmtEylXQahK0sVX8bKc5Cr1duKoo3rDHYxv1fU7UsT82HRcC7mcztXTTvb/FFS7tw25nXnck8tJ0xKe9f6TVG6A05dVbXlK5EPIZ8qCh7gc+YVqsfkX3bEj4qVPFcI3BFlYwVplE+e7OK/rJcUQR8HcztDsfCwI7frB2v/ql+bP0oYC18yTl65l6SFPuxeT3B5njbLRJAGmAC7K90XSRGkj12rPqTOp9SscNOKS3+Ti+sQ1yJgEdyhuBNT3d6nqGTTR45pIi3w0h70teoF2+aPHL4TsxjS35KeSct5fcH3Zu7oud9J0cSDfvTPx0Ckd9L/VMEq3sE6TnFX5D8Qenp6enp6enp6enp6enr+S/4Bmogg4KXQ41EAAAAASUVORK5CYII=>

[image24]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAAZCAYAAAALx7GgAAAEyklEQVR4Xu2YacimUxjHL1kieyOy5R1ZImbIFrIkQpmyZiwZpZBEkTUfppAlhDCRMpQwoebDDCbpDVkiIlskQ5YQvqCQ5f/rOqfn3Od9eu5z7tGY0fnVv/d5zn2e+z3Xcs65zjFrNFYD60onSTdJV0mbdR831mYulK6Q1pHOlV6TNk87NNZerpNeMJ+x86RvpJ07PRqrzJQ0P2/sYXfpVukB6XJp2+5j21A6R9orfGYJ3kE63/z/pTBz75EWSetlz/4LpqzeHyTopeb+uDZ8Tyn1B744SLpbuk86Tdo4eV7EHtJF5jPnT+nh7uOJnCI9Jc2VDpPeln6XTk76bCG9Lv2d6TZp/aTfoaHfMmmbpH11syr+4LcfSJeZJ/kF4ftuSZ8Sf5DYd0k3mgd+V+lF6T1pp9CnCAZ0onSI9KWVG0MAXpKONs8y2EX6WvpE2jG0bWIeMAb2qbTYPCPjb3KOswFG/IsM9Qd2TkvPShuFNoL0pPRY+Awl/mAMP0grzPvDWeZJwEyuhkz73MqN2U/6xXyAcaYxwEfNB3F8aGNwvDNfriP8hoDuH77H95L1pTAb0CT4PxvkjROo9QdJ/pfN7E/1T6AIGPT5A9jqvpXekWaFNlZD/Ppg7FRDrTFUsyzJD9kou4DfMwgKI+gzZivpfRsN+gDpJ3Nn9cGS9YqNlrYPpaNs/KpA37PzxgnU+gN7GUPen+DW+CNCska/Yg+1CMmTbnnF1Bozji2lN8yzjuwDBviEdIf5UvSVtNRGxQMDv0S6WTrYfAnL9+NxsPQtNl8hKEp4zxzzY9TT5sGM8Iyj1ulJWx+1/ugLLvsw9Pkjh7EfK/1oZX4ZS60x48B5FCFX2mj2YMxz4Rlt6HrpY+vuq/RjDH3La4Sj0oK80TzQZ5gvhdPmVSuF3hKrOzvX+mO2+R7NthRtj3suwSXIUOoPYPX6QvpOut98lRtErTE5DIxlcaF1s4vBbxr+Rlh6fzXvOxQCtX3emMCxgdnEcYR9nKDXUOsP7COpKSanQhuFEjMuDe4QfzB2bu9Kt6sZ1BqTgqOpADnflTgxFk3P24CzWwIOohijQuVdZ9qoUs2hMDkib5zAEH9g+8Xms22l+fmUWZnuueMo8UdMAJbyrbNnvQwxBmJg4zIDh0v7hM+3SH9Ix4TvEI2Ztm4xVguXJm9K55kfFZ6RPrLxRRX/k36lDPVHDkeXtFou8Qe1A7/jbySOh370r6LPGIK4nXWdxvJ7p82s4G4wzzTgfezDqTExC6m08yCUwvGLm7G8wNhTesu8SOFyBbsY38vm5/BSav3B/nq7+Qki7u0Eatq659wSf9AnL85iAqSJUkw0Ji0IIixpnLl+M69oAacuDG0sQ1EUFSttdDfM9d3VNnonf68x3z8ODG1DIHAn5I0Blmau+JjFHB+43SHoNdT6IwYS+2eHNm7wuCffN3yHEn+wP39vvuVEOMYR8EVWcTXLBs2AyCZ+jH6W3pX2Dn0Y+HLrVnQxk+JvUnEc4lgEJMG95hm9QHrEPPviJceaxlB/ANvEq+ZbBMvqZ+ZbREqJP5j5zHb2YLYS3ssYHg/P1ijITu5XT5WONL8w/z+CnVPm15fUHfmWESnxR/ouFK9zG41Go9FoNBqNRqMxnn8A+X4poVbmlHkAAAAASUVORK5CYII=>

[image25]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAAZCAYAAAALx7GgAAAFIklEQVR4Xu2YaahuUxjH/zJErll0jS8ZMitTZLoylisZMrsfhPKBImM+nEIiCRkiZShjIcmYdOImIqJbVyRDKIQSChmen2c/7bXX2ed9995H97ha//r37nettfdez7CeYUsFBSsAqxpPNN5jvMq4bnO6YGXG+cYD5Ua+2rjUuFFjRcFKiQXGaeO91f9tjV8Zj4kFBf8ORsZT88EJ2NF4ozykXmJc2JzWmsazjbtW15zOLYznyd8HdjNuXV3vJDfu4dX/+cRI/fSBHCcbNzGuInfcg4xnpIsqML+f8TbjncaDq7HZ5nnu2sl8J6DMC4yvGP8wPtCcHgvy5BPGPeRCvGv8zXhCsmZ945vGvzLeZFw9WRe43PiSXDHzgbnoA0fI5fzcuGe6SG6k+4xPyd+3i/Ft4xHV/GrGW43XyQ/C9sZXjctUH4JO4OHHGw8wfqHuwmxqfE1+wsLjtpOfuo+MW1ZjGOlZ+cY+Nt4v98jUSwP7Gh82bphPrEAM1QdYLJcRvmG8SDOLQ+S+RW6s9aqxi+WOgGMD9vCdmk7O6WcNJ7k3CKefqbswexl/lguCoQEbf0i+iciZbI5n5uE6B959vdyrMS6hrSuIDnAc2Nsa+eAY9NUHwLhhoNkQeqOIDHA6OaXUG4BU97XxPdWFJdEQvUZt0gt9hcHrCMmElzSEcj+bQFDQxbiEGvL2VvJ1Zxn3aaxoB0p5XXUIXG48TO1RgbVn5oNj0FcfoItxp4y/y7sDdMN7qEVy4KyhV+S53finmimvM4YIk2MD41tyr8P7ABt8zHizPDR/aXxadTGFYOSeNE8RDjHGOKwlD/FECIo0FLC7PBw+qeb9zF1qPCUZm4Qh+sC4rH9BHtE+MZ4r3x9AVlIUJ5codbc8JJPGyPNtTsnYUcbvNXudMhFDhMmB8ihCLlO9UYz7YjXHGLzG+KF6FgcZCGFL8kG5Ik+T56xpeRVPofe46hzXBUP0gXEpxKJmoAbBUUMf0fZFeKVwAouMPxqPq/4HqGcoyL6RO8LGzenuGCJMCgxFWJxS07sQap3qN0DI/UW+digw1Ob5YAJyN8rmixd5Lk5PVwzRByczDbHITA2CgbdRbVzCa9rqxbs41W0hmr1z0n/QwBZxiDABFM3GqA67KDGKipc1oHdLgPKOlodBnnW6PFy3gcLkkHxwDOaijxTcHwUmsrJPZEcHgXgX5LoNcSBIbX2KzX8wVJgwbIRdQEMevd0N8gIiejgQxp3W3PpZPprQH54jbxWeN36g9qKKd7KuK/rqYwd5PfGMmg4Wxo0Ck3A8ybjUDrQ8/OZr8ns7YZIwGHEzNZVG+KVnyyu4a1VXuzyPPJwaN7yQSjs3QlfQflFh5wXGzsZ35EUbH1eQi/0tlefAruirj3DY1LjMEZZTg/Ch41d5tRzIw3I4RPrueD61BH1wL8QL2EyucEIaPReb2r8aQ6lT1RhJP0h++VR1z4YwV6h+Jr9XyvMHHy2GAsMdmw9WQLl88uQUk9/4YIDR+6CvPjA2a0fVf8A1VTNFXTghIZXQmrZMi9QsqJj7Vp5yArRxGPwu1YXYRJCgMQinK1qRn4zvy7+VAkLnc2pWuOFJcU9K2iHaIoBQd8h74iXGB+XeFx85/msYqg+wtzxqUMRdKHfyRzWzSidt8A6KJNZxTYoJJ2L9I/L8TCphjj20PWvewabJSScZD1V7Rfh/AUXTkfJPmCPNPPWBdF18qk3BfSP5/GxrCgoKCgoKCgoKCgoKCmr8Dc+lKD27WJGkAAAAAElFTkSuQmCC>

[image26]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAZCAYAAAChBHccAAACV0lEQVR4Xu2WTagOURjH/0KRr0TJVz5LFkoRXbGTSCQsxMIKJaUsWN1SsmBpYSFdWUhkS4p0xUKsKBYklBJlx+J28/H/OXPunHnn472v3IWaf/165z3zzJn/nDPzPI/UqlWrxWZf52AXTTfHzSXTb+YWT//ROLPeXDAXzXYzvhARtMKcV5hrv5lcPF3WSnPUPDA/zNXi6UYtMs/NITPJbDOvzbokBuMnzUOzxMwy1xQMTkzi9phXZrWZas6Ye2ZGElMS5neZDeajRm9+grlsbmXHUWfNXeWrtsZ8NhtHIqSl5oPZmv1faN6YAyMR0kzzzBxLxmrFdjPhaM1j4JM51TG+23xXMI14GOZNX6dp5pG5orAzmE6vQYyzQ4MKO9GoXs1vNj9VNr/D/FIwxKt0W2XzmBlUWFlWmG+h0zzCCwvEQjWqV/PRZJ15xqPJOvNxnHvWma8aL6lX85jrZj7O2WR+eXZcZXLMzJ9Qd/NzzFs1m19m7qva5JiZ/69fG1LfsOrNk3VIoaTSOvNkHDIPGanKJF5I3ws6xkvqZp5iMU8hhaH55r1Cpkh1xHxVqB+Ih0v/o9nmpfJrdyoUSDJYVMxUwHGjonlyazQYRVWkkg6ZvmyMGKrgE+VVkIp501xXXrj4IFm9tO3YZL4on4v5n5rTMUDV15XE0xLEk7Pd8M28MKuyGLb5jkLppyWIwjTjNxRagwHzWOVt5hV6Zw6bgwptAC1Jukhrsxhaib0KNeCcii3EPxcNFu8qN+S3quFCrC7fA3BcpSlmi0K7QsvQqlWrVq3+Xr8BhVOYsKE0B/gAAAAASUVORK5CYII=>

[image27]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAZCAYAAAChBHccAAACz0lEQVR4Xu2WS6hOURiGP6HILR0RkVxyGym3FEISiYQiFCNKyghRpGTAREmUiSgzZXSUKAcDQqRciiRSomTCgHJ5n//b6+y117/39peh/dbT+c+311rfu27f3maNGv2/Gig2i3PihJhafFyroWKPed9DYlzxcUt9xDxxSpwRq0TfQgsXecnPWPjBV62GieviqBgsZornYn3cqELjxTWxQowWi8UTsS5qg/F94paYILrEJXOD/aN25CMv+fGBH3zhr1L7xQMxPIptES/EqCiWClOnrWgUMZHbliedJT6KBb0tzCaKt+ZtEbv1yjxvEH7wtTuKFRQaXEjic8RXsSaJx2J1esT2Yrhl9qHlEz9mbpSdCRoi7ojz5ouA6W/mfYOIs0M95rnaNF18tnbzDMJgJK5SP3FZ/BB7zY8ACQ+Is9nzAaLb2s2HiYcd5y6k5hG+PpjvVJuCySrzaTzVXPFF/Bb3xUlxxfIjE0xWmQ9x8lSZL4u3tNo8cWqyU/NoifhuPg4ctrxKYAyDdeYnZ7/LTNaaX2n/Zp7K8EisNT8uP83Hu2g+Ac79a6s3P0ncsHKTtearTFbFY400Nx5XmxnisfhlXknS4xGUxqtMVsVb4iJwIVKTwfzBJB6LXXsqRiRxVpsySwkOl7rKPBWHykNhKDOJr/dibBJvKQzSbV4ZgpaZVxH+BnEJx5hXFMR9Sd8PiOeUuJ3Z/0yCikZlC2LCz8yrDKIkc+TifKFSpd4K2iremb/9EMl5u92zvGp0mb85uZjzsxirQWxj9n/QNHHX8vG4kKzept4WZgvFJ8vHYnyq1ZHQwMr7tYn6TF2+aX7xMM6qcBmD2KGr4qX5J0EQyTl2XFCSHDc/MkujNoh78UbsENvMPwN2Wb6LaHbWhk+JDea7ynjxJ0SpGGSKeadF1kGHSLSlz9/6srocNeB3mQaJ5eaLWPaB16hRo0aNOtcfWq6mBh3z3NcAAAAASUVORK5CYII=>

[image28]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAZCAYAAACsGgdbAAACdUlEQVR4Xu2VPWgVQRSFj6iF+BNF0QixsAmkEA2KEEEQQ0QIgkSDICKIYCRlxN/YCFpYqGASEBHEQgQNhBR2gg9SJCgEC8VKxJDKoIWoBMWfc7xzX2b3ret7D1IIe+CDtzN3556duXceUKjQvGsZWU0WpCeq0RJymNwmV0hTchrdZAcsiRKsJUfIljgoR5vIe/KLlGDr1KQW8oKch5mToWcwI9Ii8hCWIOYRaQgx1WgxGUEdJmXkJcygdmgpeUK+kK1R3J0QN0WGSSdZGM1Xq3uow+RZ8gG2m652cg5WAq4BJE3Xq5pN6qgmyHNYMQvtbNYOVWtS7yruEuklm5FsEje5gjSTg7D4rJx/pN3TLsroEOmHmXmFyoYYJDfIJJkm46Q1EQE0wkrlMczcfvKdnIpiZFL5bpE+cpS8gTWsarZC+gLV3k/SFcb01VfJayQ7/C6sbv2L1dkfyfbwrASK0Xvrwtgu8oNcC8+STCrf3mjsAipLriw3qZ1bE43vg3VvTzS2HMkj0QdoRx/Aut/XuhnF6INXIfmeTKbzqS/SjVqWjuQTKgvZTWrBv2k9eQc7Ku2cv6OEecpqnFyTWlxJSsg3eQx2RCfLEXMmhX7Pm0kdk45L3a1jcaWPW4voOTbpx12CJdwYnnWHal2XalVN6GM1m5Q6yAzmArIapw3W3XH3HSKz5EB41ntnyFey24OoneRymBf3yRisxl3/NKnEF8lbcgJ2BWlHtkUxWlzXyFNyHNYc6kbdg5pzaa3TsDofhZ2Srhbdx/rvVmn5X+pn2A2hq8zHvpHryNEG2L22B/bXmKU4Ju8/W2ZV7yvTE4UKFSr0H+k3eraMUkOf58oAAAAASUVORK5CYII=>

[image29]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAZCAYAAAChBHccAAAClUlEQVR4Xu2WTYiNURzGHw0ZGRQiIqSUJCSKhYWMmjSlEBmNmKakKUUzMptZyFLysSE1UdMUMhsfJXFDsVIjs/GxIDZTYyHEwsfz9D/n3vOee9/7zitZvU/9Fufjvuc55/8//3OBQoUKLSZ74s5xaDo5Qi6RXtcONYXshY2fI1tIQ2IGsItsJE1kAplD9pHV4aRYy8lh8oD8JFeSw5naTF6TdjKPdJObMMPSDNfuJEtJH2ydu25Mmkiukd8R14M5NSXz22G7/oB85leQj2S3a88lb8k72EakLnIVlWjoVE/CzB13fdJl8pK8JzfINlRHJ1VaTIuO17xOSwuOkNmuT8bayEE3Lul7MnrUtaV15Bu5T6a6vvNkbXlGTuU1vwQWKZ3SZFiOzoJtIJSiqg02B30y+ZWUYDku/VfzunS/yC1yEXayg+QJWRDMqyVFR9E4HfRdIGfIc9ihPCVrgvG6ymu+FWZAJ+hPbBIZIvdQOdFYuoCPyCuyKOjvJydQyXNVmk9kfXlGHf2t+dukMejXJVREFJlYSqke8gZWKEJNQ/KCKnqKgKLp70+q8ppvgZmP58t8XEm8dpDHsPckS96PqpeqWF3lNb+KfEb1/DTzMq7aPtO1lVbKfUXtACxah9yY5P0IX3ZTlWVeuToflWqi9jNYtQnDWittlLcDSD44SpuzsO/5DYfmfdqUkH5/yvLmtYg36KUSOEx+kA1BvxbTxVvo2rUurEwqx0dhD5BHl/GUm6Nvqtro9156+L7DIpYqnZB2qCfbP8tfyAuy0s2RkTuorhB6YFQlVN72wy6XNhnOUST9d2OUNpIO6xh5SDpg/3/GYH9b4oP8p9LHl5GdZBOSp5dXiqAeta3I+E9TqFChQoUy9QepN5IYHOglwAAAAABJRU5ErkJggg==>

[image30]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAZCAYAAAC2JufVAAABwklEQVR4Xu2VTygFURTGj1AKESJSpCghRYgsLCh2imIhdpSyZ6dsiCwUCxt/ipIsLCglWbIkNspCkZVsUJL4vu5M7747d8Z7Tc9qvvr1Xuecd+8397w5VyRSpNSrEgybwQBNgXlQDUoNikE6yAKjoN75zlg5GBe1n1W1YBKcgW+wFZ8OFGt/fLgFRSAfXFrySyBTfERT/aADPEripnLAEdgB6xqb4BkMGHU34N7Jt4E0Jx8oHvmDJG6K9WuiWqJrCCxKbFOa4pqsT1rJmioATUasDuyCPC32r6ZMcfN9Ua0x43tgWVQLn8ChBPzJdYU1NSLqlDKMOE2diGorW0rmwB2o0OqsCmOK7boAE2ZClIlc59NVC/gAs1rMqjCmesE76DQTPmoWVX8Kso1cnMKYWhG1CTcztQC+QI8Wc02di2qvr/4yxRaViXe+8En5xJxNVUaO4nocyropt30b4l0vTq4pDkOzsBBcgU/QbuQ4tTm9+Vvba89ra1pia/JzBryCVrfIVLeoSc6nca+AN3ANGpwaHvGx2N+YElGT2s8Ur5JVcADGwDZ4AX16USpE843iPWFXjNeAQdAl3lsgUqRIkWz6BeMeXxqKJv6iAAAAAElFTkSuQmCC>

[image31]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAZCAYAAABkdu2NAAAC0ElEQVR4Xu2WT6iNQRjGn5s/UYSIFHVYkIWQKJIsJBIpboSULEhKuYsbW9lICEUiWYiwtaE4siCKyJ+VBSkrVkjkz/N453Vm5n7fOTpHh8X31K8zZ8473zfPzDvvHKBSpUr/m2pkQ94Z1EsWkhGkh4wnm8nsOIgaTjaS0+QgmZ7+3H3NIDvJTfKNnE9//qXB5DL5kXGFjIri1L5B9sMWQuafk7VRTNclg2tgu/MGxQalM+QpeU2ukpVkUBIB9JMHZEzUt4m8IBOivn+iieQVyg0eJ3PzzkgyJXP5+HnkA1md9XddnRpUJrzDwPEa85EcIENgOzmfLAnfa7AMUpxnxFiyKsQMC30ujVlM+sgKMotMTSJK1MrgCXKEPISl8l0yJ/rdjeTj4/4auQ07v/fIKbKHbCEvYcdgN+xdKnbXyWMyCSYVNtUKZYPmuxx2ZLQYLdXK4DmyF41VVgV9D9sNSS/RxPPxufEecoF8h03QtQ82XgVKMdIi8hUNA9oxLdDI8F3ajr9kUA+Ni4pWVTt5EVZl9fI/MSip/YyMi/pUoD7BzqzLx7qBpbBKr3eqPRqWwnkaF6qVwVwer9TSuSoyIhX1q12HXSUuGVRcfM5zgzp/h5BeVZeQXlWlamZwKyyldkR9Hi/U1kF/i4HjfZJKQVe7Bl1a0F7YPSyTR9FI61I1M6iX60GxQU/ROmyiQu1rSFNGqfQlfLraNahPxblkSme2jvRZhXKDKgD5aiyAVTaliGs9+Yz0X4oKj6ralPDdJ6CK6WmkPr3jDtJi0cygCokkg/dh14hrF6wA5nP+La2sdkKH1/NaF/MTMjPEaHAfuUW2kWOwO09/8eIHawFOhjjdbTKnYuL/V/U8ndn4PVoUXTnep90+HFDb+5WOSstHsKvqbOjTVeLXSMeaDJv4MpQfbBmeRtbBLuR41zvVUNjzVM11J6qKVqpUqVKlSu3oJ2SqscQtSWazAAAAAElFTkSuQmCC>

[image32]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAAAZCAYAAAB5CNMWAAADxUlEQVR4Xu2YW6iWRRSGl6RgapnHEg0LTBHPZIrSRVmGEpEEQqh3ggcUBcVD1IU3Ipl44SEiyBCp8EAGggkGbfTCMkgvCkEQd+CdqBgJUWS+j2uWe77Z+/ff2y1o+b3wsPlm5pt/Zs2ad+bbZrVq1apVq5/4XCwUI8Swgqfamt7W42KB+FRsNn8nVw8xXewQH4u3RK9Ki/+wCMhv4t8GMOnQWHFWvGcepPnitBia6gnUOrFbjEx8JI6K/qnNQ6u+1nxVXxQ/m2dKzhHxq/mEEQH5xTxQBIW+vxM3zPtA48Vh8UR6RmQiwXo3K3uoNEYcFF+KIUVdKbbJ0qKMAH8iZmdlG8QV8+wKvSY2mgcE0ReBH3SnhWuvWFOUPVCFV3wvdolnq9UNxeSHF2UEj+1En4gt9IP4yTwQQKY9lupDL4u/zbfm6FT2nPhRTDHvj3dfEG+KgeZ9v5EgW0O9reqdvNfT/Hfzshhjp8SAZ4mT5v5QrmpXxaS+tqrHEFCyioDhR++LnebbdHLWjoxkC+N1f4nt5uN6J9UTgK3iD3FTnDI/XNiie1I5QUT0y+/RD/19Zb6oLBjPV837os+mIkhvm3f4gXiyWn1PYrL7rb2/4El4ExOMibOiH4pzVj0R+5j3EQcE9ROzesR2pW6xtWUGv31AXBbjUhlit/wu1pvPeYu5b5ZZ3aHolMngDautmrrd1QzRalVfQhEsMmlwVh6TDs9jbNvEPjFTnEn1vMsWDcV7/M01x3xBuJKECCaBIpPwTSym2aF1R6+aT2iZtRnr/RCDYiCk+YCibpL56raY38tCMWkMHDEmPDPaMD4OgH/EsfSMGgUrFuWQuT+FeI/T+bq1z9KmyrOLqN+PLUjGkDktVg0IelpcsPZ1ebDiKlGerGil+V0OU0bNgvWFVY2b+fIbf5p7YqczK1f4FtnQXXOP7ClXFfGMwZZZl29Dgthi/iVQ6iVzM48t3ChYJADlBDdE0DiZYb75absoq++yymtDrGBX9Lq5X8SWKsWdC/ONC2hHBr/WPGD5SRqmvCkri2DFBRfxzgnzi298EfAuh8Bx84tuWMU1MS21uWfRGXv6W/GZeL5afVfNtar/lCL1OXUviiXmV4dLYmrWBm/hMtsqVplPlK3JtSA/iCJY35h7GWNtNb+yPJParEhtAsYXdhBl58WE1L5bIlDcQ0aVFQ1EMF6x5lnJZXeetb9E5oo20NHlON+G/C5BKD/YayU18qxambAJDqHl5sHib5c/WR4V8WnCqZb/d4PnTn2y1KpVq9b/VbcArZXG2Oz22osAAAAASUVORK5CYII=>

[image33]: <data:image/png;base64,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>

[image34]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAZCAYAAACo79dmAAACc0lEQVR4Xu2VT4iOURTGnwk1ktAUifIliSgLRWLKwp9SSjQrm4kFCxssRCxkMZoGM42FUJJEUWYWFjLZqFmwsLG1IJGmRk0zCvnzPM4985737Zt551t8M+h76tf33fOee++595x7L9BQQ/+ulpJz5Do5T1blP1fVPtJZNNZbm8hT0ko2kMfkFzlJmoJfVIW8IbcL9rpqLukjh8isZGshL8gY2ZhsUXPITdiCpjVYpf8tGYHtqusMLJgTweZqI5fIe0xzsNqlHvIEFrjrFCxY/UZVYHW9BrbIGOxCsoLsJctIM9me2sqWS3Mugc0nFpPZySfaPNOTSh0fkh+wyVyapItsRpaRGOxx8gm2SJXRI3KQdMBK6hjsDFRIPxlNvoOwxT1IbdnvwxZfKgWjwbWDCtB1AFYWmrBasJJqXH21KN8Z+V+ALX5nskkV2CH1edphZ0HnaEpaQAbIHTIv2JXeG+m7VBZssXzWk8+wjClzLm2A/HVG7iEbv1Ra3TVyGfnVafCLsB131Rqs+78ki4Jdu95NfpI9wT6pPNDTyNK3luyCFftz8i7wAVZf31L7aOpTFqzGmR/sCvYsrI8yWrqz6qAHQAdE/11HyP7Qjqp1Z7eQr+Qq8nOoDHrJVliZqLbj95z0oZ18gd2bcfeGybZxz7yWw/zvIj+4B3sL2eHUr9pDZF2yqc9u8go2lqTbQodQC6gq3yGltMhHsjJz/SMdOl0rSr/7aVHFMngGe8J10l/DrrLVyUelpaC8v24YjasyiGPuSP51UywD1b7qXZf9hKmdSU1Us3+d9OLoaf1OrqCGJ3MmdBhWo47u5ik9mQ019D/qN8wDkLgszQGHAAAAAElFTkSuQmCC>

[image35]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAAAZCAYAAABAb2JNAAADxUlEQVR4Xu2YXYhOQRjHH0mIfBYpZX2tlFBaSmiJC+Ur3+EGkQtRLiiJIje+Qoq4EKWUUoooirgRQvJRIpGPUrhBIfH/mTPeObPv2XfPu3Zbdf71a98zM2fOmf/M88ycNStUqFChQv+T2ouFoiYq9+osloijYpcYlq7+o7DNQTHVXL+NaYA4LfrEFa2lyeKmWCw6RHXVCBNmigPijfgixqRaOHUXl8UO0VWMFo/FvKjNWbFKDBbbxE9xMakrJ8ZwXLwU/aK6VhVGrBD3xUrRJV2dS/Q1XdSbMyHL1E3itugZlC0VT0Tf5HqtOCm6JdftzE3CL3P3l9MC8cPagKlezDIr9o7YYqXBVCsGXs5UjMTQE1F5nfgsZiXX1GPghr8tXJuv4oo1nPwac2nivLUhU73IWVPEDbFb9E5XN1lZpg4XH6yhqbSj/c7keo54JKb9bVFqc81c2vBiQewVY831G5raKfldL8aZGx/vMF/UmosAxF/GSlsP9/KcuKxq8RBe4qo4ZPlnPstUb0yWqXF5KFIEqxcDQ5GLWdG8c2wq/T40d98rcxOyTqxOrs+Yy9GYtd3cXkBbImKiWJ5ck88fWMPxVKWOYqt4LYZEdY0py1Q2Ml4yNq+SqQz8unhqbof34vexpB7FpiJW2zVxz9KnAkz7JvZbacX6zc4/Z6i5e/OMPVPhBrbeGuawSsoylY0sr6kMeKN4Zi50vTBgj7mI8mrMVAjTBmO8JN6JQUE5ZmIqfbFZhv1XJczDxLvWvKNWlqlZ5mWVI8KbHF8TlbOp+bD3ymMqoj0nhglRObmckD9i6f5zid2eXZ9z62yrfMiupCxTWRGsjNg8b+rmqBxDOZv2Sq4xhdxKDtxnLi+GfDcXCW/NfQSwSCqZSv6si8pJDS/EJ3MbYC4xo2xEbEjjrflmemWZ6gd4wdI7KV9LGMJfLwZzytKHfcKfj4us1ZNnpdIviyg8HyPC/5wYZe74dstynIJmmLt5pGW/ZLXC1HIrAC0zt6oGJtc8m4M9A/QGYh459L2lV+JHKx27YtEPk8Cm2j8o96Y+t3QKWWQuxNcEZdzHhjg3uR5hbrVyBq42FTZLhBohx8AJQQ+hSKh68XKHzUUH51EMfWTuc9WLFRf2EUL4x8KY8Lms+jj8mSQ2JvrmI4HzMsYyGZwK/NEL/AcGOTvsMxxHmxMDqTV3CJ9kLbsK4vDvYS7cW+SZdErn4RdDFszkv8q3ra3Y1BYV4UauaAp8xYTJ/38RmyH/VuTgD/xu1qdmofILJ8zdhQoVKlSoDeo3lh3tHYw9TFoAAAAASUVORK5CYII=>

[image36]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAAZCAYAAACRiGY9AAACVElEQVR4Xu2WMUhVURzGPzFBMQxyyTKSmhqc1MRorKFBkAqJbHhLCCEIDjqJgzQGZltEUCBiRA1JNURENjSW0BINFYEQ5GSCSOn3ec5579xz33v33Ud38n7w4737P4d7/h/3f87/ALly5cpaXeRqGExQGxkn98g06YgO76mFXIOZM0/Ok8bIjP+s0+QmeUP+kofR4ao6QT6RG6SZXCRfyBlvziHy1M45RWZg1nlpxzKRTA2Rs+Qnajd1gNwnT+x/p1vkFczXkcbII5gvKjWQWbJDpmwsM6lsvqN2UyfJGuKJXSJ/SI991vtkYKI4A+gjm+Q1afXix0mT9xxKc9vDYDWlNaV98Q9xU4MwJkbss6rgM7lQnGEMy/hbctCLXydzKG/sCHmGaGknKq0pl3wlU2Hclwxrzu0grtJUud5F1FhdhqS0ppR0ueSTTOlweAdzoOigCRUaq9uQlNaU9ki55KuZUsKT5CvMAVVJzthj8hx1GpLSmqqUfKW4dJmswPTDJOnQ+AhzcpbbYzUpralzZBvx5J0pnYK+ZEi96bB91gGhvaX+FqoTpi30kwLie6xmJZnSXjgKUxrSMfIN5obga5T8RrS8VD4LiDZbjd9B6X1OzpArOY0XUKcxZ0qLhwupN+jmsEUGbExz1EQ/oJSsFtU+WESpISt57aFf5IfHOkyj9iVDy6Q3iKc2pn6jm4SuLiobsUFWSbedo1J5gfiJJTOKL8FckR6Q9zDJOenLu/eGuF7mpLtjaMhJxq6Q4XAgC+liqmaqBfWb6UU1V65cuXLtG+0Czbl+bjw5rnwAAAAASUVORK5CYII=>

[image37]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAAZCAYAAACRiGY9AAACJklEQVR4Xu2WQUgVURiFj5iQFLoIpNRI2rlwVRZGSzcuBJGSIBduIglBayMIraJVCaIbCREMIozAhRGtXEW4NJeuNIJAcGeCiNo53Lk488+892Zevt394EPn3oH5z7v/3LlAIBCoNR30kR2sQBMdp+/oS3otOZ2ijk7QUTtxnnTSZ3SNHtOl5HRZbtCf9Am9SPvoFr0Tv8lwl/6lk3biPFGoAXqP/kb+UBfoAv0c/e95Tb/RxtiYpxnuxztFjUN51DY7yB/qJv2DdHGDcCtxy4yr7V7QNyi9Utdpgx2McYlesYPlKBqql54gXVw/3Eo8NuNqu7e0B6VDDdMZZAe7SldQvrVTFA3li7fFZY2r7bSRdMCtYKlQWs0xOodksKoCiaKhVJQtXthQKvQ5fRhdlwslbLCqA4miofR+5AmlYqZx9stXCiV8sE90FVUGEkVD2eKzxi/Tebi28+QJJbRpbND3yH7HclE01H16hHRxPpR2wS66SX/F3I3m96NrbTiWdrjPgjaXEaTfsdxUCqWXvRWuNUQb3aaz/oaIp3QP7vuXRaWV8oF8y+l5I6gymA/1AWeFe/Rt0MnhEG5LFrrnFV2HCyz0UL0HH5H8IMfppgd0yk7ABfpCb5vxwsG0/DpJ6IiktvCtobZR+wi9G1/hjkA6GnkURuPLcEekRfodrjhLC/2B5HPUivH209nRBvIo2AM6ZCdqQT1cS+mB+qvrQCAQCAT+l39KaXsi0YUZvQAAAABJRU5ErkJggg==>

[image38]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAZCAYAAAC2JufVAAABkUlEQVR4Xu2VPyhFURzHf5IiSkj+hCQlSikyvFlGKQaxmGUymEUGJmGyGSwWk1KkN7MZLAYpZbAyiu+3845+99xzbu/d7tvOpz69937n3Hu+79xzzxGJROrPMFxxi4oxeAjP4CpsSTYXxzjcgPfwB54nm/9Zgs9wCrbBPXgL23WnomCoRViC7+IPNQhf4JqqdcBHuKlqhdMH38QfimG+4bSqNcALWBYzc5ZW2KN+u/C6ftjoNvjICnUs6VCEfT/giKp1w0s4o2oWBlqHJ7Ap2eQnKxRroVC++gC8gbOqVnMgEgrFR1MW/+ChUEQHyxWIhEJxjdyJf/CsUMQGO5UcgUgoFAkNHqpbOENb8FPM210zWaH2xT84+3Ib4Yy4MBC3C87QELyS5BqriqxQC2I21jlVa4bXFfldowPZR9YrOYLZUNx7eFNNF3yAO6o2KmaW3GOJ1/KEOJL0Gqo6GP89b86Z+K34BZ/gpOrHfecVbsNlMbv5gaQHnoC7nrqlU8z5yc9C4Js4L+ZY4tETiUQi9eQPv5pUTnEINYgAAAAASUVORK5CYII=>

[image39]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAZCAYAAACSP2gVAAADiUlEQVR4Xu2XW6hOQRiGP6HIKREJsSVSFDlFuJIcIuFCKFcOSSkXlEOJJO4oFLJzIZFbUuQQF+KKQpEcElFccUMO72P+8c+af2b9W/bFbltvPe21vzXzr5l3zazvG7NKlTqTuohecbBSXePFXnNGdViNFCvjYKCx4pA4IVaJnsXbv0WMe7ShLX3aop1ifhysaZKYFwdrwtDp4og4JhaJroUWTn3FFnPj2i2GFG/nNU5sEtfFd3GmePuPlovHYqLoLfaJq6Jf0IZrYtyjDW3pQ98y0e+0GBjEmPQ2cV/8FNuDe16YQ5tbokUMEGfNmdA9aDdCPBDrRA+xQDwV04I2WWHQUjFTvLG0QcPFM7E6iPU3N/jNQYxJEOOeF32eiMFBLNZcsSeKYdBisVB8sbRBk8V7MSuIjRKvrL4au4lT4mLt2mu/uGLpXZAUS44fThnEJBkkA/Li7fG2bppbLd6wuP9U8VksieJe/A5bcUZ8oyaemTOISTLmcLv0EbdFq7nfxrB31th/mTXOqVRlBrG/Uz9GWx7OIFiJH2uxUH6CTCYlVhaTCbdqqJxBbJVL1mgQL+um1Vcyq/OHNfZndbJ1w11RqjKDiOUM8nE/kbh/Lu5FUuAbmFPOIG9EziAf90bE/XPxrHIG+Qc2M8g/MO5fZhDfhKPmUnxOOYP8eJsZRL+UEe1mEMXbNWtuEJnhbw1ia540t11yyhnE1nxuzQ3aamkj2s0gFBqRi+eMyMXRBmv+DcgZFBuRi+eMyMWzKjOID2zOIEqDYVbPFnF/P8EdUZz0SvptieKxcgaxPUndOYPIZGQ0SoBv1tjfG0Q2a5PKDCJFU0SSEbx8FgGu/cD8/170+Vr7G4qJH7bmR4ucQYgYmZMM6kWx+chc5kVDxcvgfy9Wb9y3VN4gapt40APEPSsWc6PNrZ7waLJGvLb6quB3qKrvWmMaLztahMqtQJQaw2zxwep1VWoMVNkXxDkrFo9J8WZ5CCuEJQcUdg/FhKDdFPHCXGm/wlydcdCKJT3Xx8UNc9U5A+NtcuQIxUBbrby63ijeWn1M8Mnc1hkUtGOLMK71Yq25ow1lQ/iSed5lcd5cMuFYc8fcp6FdRUbj0MjkOX6kxMDGmDNxjhUN9OK7sCsO/oNY4XxTgOuUOMCyGhkXf1MH2g6jA5Y/Wvz3YluxveJvUqWa+DCTQSplRGHY5tRaqVKlTqtf00XmAceDIakAAAAASUVORK5CYII=>