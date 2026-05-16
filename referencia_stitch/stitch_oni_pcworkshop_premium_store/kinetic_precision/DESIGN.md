---
name: Kinetic Precision
colors:
  surface: '#131314'
  surface-dim: '#131314'
  surface-bright: '#3a393a'
  surface-container-lowest: '#0e0e0f'
  surface-container-low: '#1c1b1c'
  surface-container: '#201f20'
  surface-container-high: '#2a2a2b'
  surface-container-highest: '#353436'
  on-surface: '#e5e2e3'
  on-surface-variant: '#e4beba'
  inverse-surface: '#e5e2e3'
  inverse-on-surface: '#313031'
  outline: '#ab8985'
  outline-variant: '#5b403d'
  surface-tint: '#ffb3ac'
  primary: '#ffb3ac'
  on-primary: '#680008'
  primary-container: '#d32f2f'
  on-primary-container: '#fff2f0'
  inverse-primary: '#ba1a20'
  secondary: '#c6c6c7'
  on-secondary: '#2f3131'
  secondary-container: '#454747'
  on-secondary-container: '#b4b5b5'
  tertiary: '#c8c6c8'
  on-tertiary: '#303032'
  tertiary-container: '#706f71'
  on-tertiary-container: '#f6f3f6'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb3ac'
  on-primary-fixed: '#410003'
  on-primary-fixed-variant: '#930010'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#e4e2e4'
  tertiary-fixed-dim: '#c8c6c8'
  on-tertiary-fixed: '#1b1b1d'
  on-tertiary-fixed-variant: '#474648'
  background: '#131314'
  on-background: '#e5e2e3'
  surface-variant: '#353436'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 80px
    fontWeight: '700'
    lineHeight: 80px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  label-technical:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
  code-data:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: -0.01em
spacing:
  unit: 4px
  gutter: 32px
  margin-desktop: 64px
  margin-mobile: 20px
  container-max: 1440px
---

## Brand & Style

The design system is built on a foundation of **Aggressive Minimalism** and high-performance engineering. It targets an elite tier of enthusiasts who view hardware not just as a tool, but as a lethal instrument of precision. The aesthetic is cold, industrial, and strictly functional, stripping away all decorative "gamer" tropes like neon gradients or organic curves in favor of raw power and editorial sophistication.

The emotional response should be one of "Uncompromising Performance." The UI does not seek to be friendly; it seeks to be efficient, authoritative, and premium. Visual interest is generated through stark contrast, extreme typographic scale, and technical detailing inspired by industrial schematics and abstract Oni-mask geometry.

## Colors

The palette is dominated by **Deep Black (#0A0A0B)** to provide a void-like backdrop that emphasizes the physical hardware. **Off-White (#F2F2F2)** is used exclusively for primary typography and high-signal data to ensure maximum legibility against the dark surfaces. 

**Technical Burnt Red (#D32F2F)** serves as the high-alert accent color. It is used sparingly for critical calls to action, active states, and performance indicators—mimicking the "warning" or "overclock" lights of high-end machinery. **Graphite and Steel Grays** are utilized for structural elements, borders, and secondary metadata to create depth without relying on shadows.

## Typography

Typography follows an editorial hierarchy. **Space Grotesk** provides the "aggressive" edge for headlines, with its angular terminals and geometric construction feeling inherently mechanical. Large-scale headlines should use tight letter spacing to appear dense and impactful.

**Inter** is used for all functional body copy and data. It provides a clean, neutral balance to the expressive headlines. For technical specifications and hardware data, use the `label-technical` style to evoke a sense of professional instrumentation. All labels should be uppercase with increased tracking to enhance the "schematic" feel of the interface.

## Layout & Spacing

This design system utilizes a **Fixed 12-column Grid** for desktop and a **4-column Grid** for mobile. The layout philosophy centers on **Controlled Asymmetry**—elements should often be offset by one or two columns to create a dynamic, editorial flow that guides the eye through technical specifications.

Spacing is strictly based on a 4px baseline grid. Gutters are intentionally wide (32px) to allow the "Deep Black" background to breathe, creating a sense of luxury through negative space. Technical data modules should be grouped tightly, while product imagery is given expansive margins to emphasize its premium nature.

## Elevation & Depth

In keeping with the minimalist-aggressive style, there are **no ambient shadows**. Depth is communicated through **Tonal Layering** and **High-Contrast Outlines**.

1.  **Base Layer:** Deep Black (#0A0A0B).
2.  **Surface Layer:** Graphite Gray (#1C1C1E) used for cards and modular containers.
3.  **Dividers:** Ultra-thin (1px) Steel Gray (#3A3A3C) borders define the structure.
4.  **Interactive Layer:** Technical Burnt Red overlays or Off-White ghost borders.

Elements do not "float" over the UI; they are "machined" into it. Overlapping planes should be hard-edged, creating a stacked, physical feel without the use of blur or translucency.

## Shapes

The shape language is strictly **Sharp (0px radius)**. Every element—from buttons and input fields to product cards and selection indicators—must have 90-degree corners. This reinforces the "unrefined" yet precise industrial aesthetic. 

Abstract Oni-inspired motifs should be generated using strictly geometric, straight-line polygons. These "sigils" should appear as faint, Steel Gray watermarks or micro-ornaments in corner sections of modules, acting as a signature of quality.

## Components

### Buttons
Primary CTAs are solid Technical Burnt Red with Off-White text, strictly rectangular. Secondary buttons use a 1px Off-White ghost border. Hover states should involve a binary "invert" effect (e.g., Red background becomes Off-White) with zero transition time to simulate mechanical clicking.

### Input Fields
Inputs consist of a bottom-border only or a thin Steel Gray outline. Labels sit above the field in the `label-technical` style. The focus state shifts the border to Off-White with a small red "status" square in the top right corner of the field.

### Cards
Hardware cards use the Graphite Gray background. Images should be high-contrast "low-key" photography (dark products on dark backgrounds). Data points (CPU, GPU, RAM) should be displayed in a vertical list using the `code-data` style.

### Chips / Tags
Used for stock status or component categories. These are small, rectangular blocks with Off-White text on a Steel Gray background. "In Stock" uses a 4px Red square prefix.

### Lists
Technical specifications should be presented in "Stripe" lists with 1px horizontal dividers. Labels on the left, values on the right, aligned to the 12-column grid.