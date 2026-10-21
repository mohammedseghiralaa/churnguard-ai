---
name: Executive Predictive Suite
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#464554'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#777586'
  outline-variant: '#c7c4d7'
  surface-tint: '#5148d7'
  primary: '#2a14b4'
  on-primary: '#ffffff'
  primary-container: '#4338ca'
  on-primary-container: '#c1beff'
  inverse-primary: '#c3c0ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#553300'
  on-tertiary: '#ffffff'
  tertiary-container: '#744800'
  on-tertiary-container: '#ffb759'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e3dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#100069'
  on-primary-fixed-variant: '#372abf'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.025em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-desktop: 2rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.375rem
  space-sm: 0.75rem
  space-md: 1.25rem
  space-lg: 2rem
  space-xl: 3rem
  space-2xl: 4.5rem
---

## Brand & Style

This design system defines an executive-ready, highly approachable predictive intelligence platform for telecom retention teams. The visual direction balances corporate authority with warm, ergonomic usability. It transforms dense predictive churn data and machine learning scores into calm, immediately decipherable decisions.

The design movement blends **Warm Modern Minimalist** structure with **Sculpted Super-Rounded Tactility**. Surfaces are clean and breathable, anchored by deliberate whitespace, expansive pill contours, and gentle, indigo-tinted atmospheric depth. The interface deliberately avoids intimidating enterprise cockpit layouts in favor of focused, card-driven, conversational flows that build confidence, reduce cognitive fatigue, and humanize algorithmic foresight.

## Colors

The palette establishes an immediate sense of intelligence and clarity through high-contrast legibility and purposeful semantic feedback:

- **Primary Canvas & Surfaces**: The application background sits on clean slate `#F8FAFC`, with core interaction containers surfaced on pristine `#FFFFFF`.
- **Primary Brand**: Centered on `#4338CA` with an energetic interaction state `#4F46E5` and soft pill tints `#EEF2FF` for active states and subtle focus highlights.
- **Typography Hierarchy**: Deep slate `#0F172A` ensures crisp text readability, supported by `#475569` for explanatory labels and `#94A3B8` for passive metadata.
- **Borders & Dividers**: Delicate borders using `#E2E8F0`, shifting to a radiant `2px` focus ring in primary indigo during active states.
- **Predictive Risk Tiers**:
  - *Low Risk*: Emerald `#10B981` (Tints: background `#ECFDF5`, text `#065F46`).
  - *Medium Risk*: Amber `#F59E0B` (Tints: background `#FFFBEB`, text `#92400E`).
  - *High Risk*: Crimson `#EF4444` (Tints: background `#FEF2F2`, text `#991B1B`).

## Typography

Typography relies entirely on **Plus Jakarta Sans**, utilizing its geometric clarity, friendly counters, and modern curves to make algorithmic metrics feel approachable. 

- Body text enforces a strict minimum base of `16px` (`body-lg`) to preserve effortless legibility across all desktop and laptop monitors.
- Titles employ tighter negative tracking (`-0.025em` to `-0.015em`) with heavier weights (`700` and `800`) to anchor views decisively.
- Analytical labels use uppercase-free, medium-to-semibold weights to prevent the clinical, aggressive demeanor typical of enterprise data tools.

## Layout & Spacing

The interface embraces a **Desktop-First Centered Architecture**. Rather than packing monitors with multi-tiered sidebars, the system organizes experiences into a clean central staging column (max width `1080px`), allowing key customer retention inputs and outcome models to sit comfortably in a unified visual field.

- **Grid Alignment**: 12-column layout on desktop with `2rem` gutters; shifts to an 8-column layout on tablet and a single-column flow on mobile viewports.
- **Canvas Composition**: Substantial top and bottom paddings (`space-2xl`) frame central card decks, ensuring retention workflows feel step-oriented, calm, and uncluttered.
- **Responsive Stacking**: Side-by-side comparative cards collapse to vertical sequences at breakpoints below `768px`, maintaining oversized touch targets throughout.

## Elevation & Depth

Depth is treated with subtle, soft-contrast luminosity rather than harsh drop shadows. The design uses ambient elevation layered against `#F8FAFC`:

- **Level 0 (Flat Surface)**: Used for resting inputs, segmented pill tracks, and secondary data wells (`border: 1px solid #E2E8F0`, `box-shadow: none`).
- **Level 1 (Card Resting / `shadow-sm`)**: Primary data cards and evaluation forms float subtly over the canvas (`box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.04)` combined with a hairline `#E2E8F0` border).
- **Level 2 (Active Focus / `shadow-md`)**: Interactive hover states, expanded prediction tiers, and modal sheets (`box-shadow: 0 10px 25px -5px rgba(67, 56, 202, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`).
- **Interactive Tonal Rings**: Active focused components replace hard black outlines with an ethereal `3px` aura using `rgba(67, 56, 202, 0.15)`.

## Shapes

The visual signature relies on a **Pill-Shaped (Level 3)** geometry. Super-rounded corners soften analytical telecom attributes (tenure, billing cycles, monthly charges) into accessible visual tokens:

- **Buttons & Toggles**: Fully pill-shaped (`9999px` border radius).
- **Interactive Form Cards**: Sculpted with `rounded-2xl` (`1.5rem` / `24px`) to `rounded-3xl` (`2rem` / `32px`), producing smooth silhouettes.
- **Status Pills & Chips**: Pure elliptical contours paired with proportional horizontal padding.

## Components

### Top Bar
A refined, slim navigation bar pinned to the top viewport (`height: 64px`). Features a subtle brand mark, model confidence indicator, and clean workspace selector. Zero nested menus or dense sidebar trees.

### Predictive Risk Badges
Pill-shaped badges (`padding: 6px 14px`) utilizing semantically paired backgrounds and dark text:
- **Low Risk**: Background `#ECFDF5`, text `#065F46`, paired with an emerald status dot.
- **Medium Risk**: Background `#FFFBEB`, text `#92400E`, paired with an amber status dot.
- **High Risk**: Background `#FEF2F2`, text `#991B1B`, paired with a crimson status dot.

### Segmented Pill Toggles
Oversized, tactile switches designed for rapid toggling (e.g., Contract Type: Monthly vs. Yearly, Fiber vs. DSL, Paperless: Yes / No). Housed inside a muted `#F1F5F9` track, the active option transitions smoothly into a crisp white elevated pill with a primary text accent.

### Value Range Sliders
Custom retention sliders for contract tenure and monthly charge inputs. Built with an `#EEF2FF` track, a solid `#4338CA` fill, and an oversized circular thumb (`24px`) that reveals numeric value badges on hover and drag.

### Action Buttons
- **Primary**: Pill-shaped button in `#4338CA` with white text, transitioning to `#4F46E5` on hover. Generous vertical breathing room (`14px 28px`).
- **Secondary / Ghost**: White surface button with `#E2E8F0` border and `#0F172A` text, accenting hover states with an `#EEF2FF` wash.

### Form Inputs
Minimalist inputs floating on pure white surfaces. Standard height of `48px`, `rounded-xl` borders (`1rem`), text set at `16px`, bordered by `#E2E8F0`, and activating with an indigo focus ring.