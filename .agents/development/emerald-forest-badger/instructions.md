# Instructions: Frontend Interface & Interaction

- **Status**: Completed
- **Assigned Role**: Developer (Frontend Interface & Interaction)
- **Codename**: emerald-forest-badger
- **Dependencies**: amber-canyon-wolf (Status: Completed)

## Definition of Ready

- `amber-canyon-wolf` has initialized the `.NET` web application and configured static file hosting.
- The web server builds and runs successfully, serving files from `src/wwwroot/`.

## Task Description

Create the frontend interface of the Gaspra Colour Picker using vanilla HTML5, CSS3, and JavaScript (ES6+). Implement the full-viewport color gradient, the absolute center glassmorphic Heads-Up Display (HUD), adaptive text color based on background brightness, keyboard shortcuts for freezing selections, and click-to-copy functionality. Ensure a Test-Driven Development (TDD) approach is followed by implementing automated tests to verify the color coordinate formulas and luminance logic.

All code and assets must reside inside `src/wwwroot/` (`index.html`, `style.css`, `app.js`).

## Task Checklist

- [x] Create `index.html` with clean semantic markup (including `<main>`, `<section>`, and `<header>` tags), unique IDs for all interactive elements, and a viewport meta tag.
- [x] Set up Google Font imports in `style.css` (e.g., **Outfit** or **Plus Jakarta Sans** for headers/labels, and **JetBrains Mono** or **Fira Code** for monospaced values).
- [x] Implement the core HSL/HSV color mapping in `app.js` (delegated to `color-math.js` for modularity):
  - Horizontal axis ($X$) maps to **Hue** ($0^\circ$ to $360^\circ$).
  - Vertical axis ($Y$) maps to **Lightness** or **Value** (top to bottom) and/or **Saturation** to cover the full spectrum including pure primary/secondary colors, blacks, whites, and grays.
  - Dynamically update the background color of the viewport as the mouse moves.
- [x] Design and style the premium center HUD card in `style.css` using glassmorphism:
  - Transparent background (`background: rgba(255,255,255,0.08)` or dark equivalent).
  - Glass backdrop blur (`backdrop-filter: blur(16px) saturate(180%)`).
  - Sleek border (`border: 1px solid rgba(255,255,255,0.2)`).
  - Subtle drop shadow (`box-shadow: 0 8px 32px 0 rgba(0,0,0,0.3)`).
- [x] Update the HUD dynamically with HEX, RGB, and HSL text readouts and a color preview indicator at 60fps.
- [x] Implement adaptive HUD text/border color: calculate the relative luminance of the current background color (using the standard WCAG relative luminance formula) and dynamically toggle the HUD's text/border class between light and dark modes to maintain high contrast.
- [x] Implement the `Spacebar` keyboard event listener to freeze and unfreeze the color selection, allowing the user to hover elsewhere without losing the locked color.
- [x] Implement the click-to-copy functionality to write the current HEX color code to the clipboard, and display a temporary "Copied!" notification on the HUD.
- [x] Set up a lightweight test suite (e.g. using a simple JS test runner or configuring Vitest/Jest if appropriate) to verify the core mathematical formulas:
  - Coordinate to Hue/Saturation/Lightness conversions.
  - HSL to RGB / HSL to HEX conversions.
  - Contrast/luminance calculation logic.

## Handoff Note

As you work, please:
1. Mark checklist items in this file as completed `[x]`.
2. When all tasks are finished, change the header metadata in this file to `Status: Completed`.
3. Append a chronological entry summarizing your work in [journal.md](journal.md). If it does not exist, create it.
4. Notify the Project Manager (`golden-canyon-eagle`) and the USER that the task is complete.
