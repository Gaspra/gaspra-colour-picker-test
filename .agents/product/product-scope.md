# Product Scope: Gaspra Colour Picker

- **Version**: 1.0.0
- **Author**: ivory-glacier-falcon (Product Owner)
- **Status**: Scoped & Ready

## 1. Product Goal & Context

The Gaspra Colour Picker is a simple, highly interactive, and visually stunning web application that allows developers and designers to pick and copy colors instantly. 

Rather than rendering standard color picker inputs or small panels, the **entire browser viewport** behaves as an interactive, multi-dimensional color palette of all possible color combinations. As the user hovers their mouse across the viewport, the center of the screen displays real-time RGB and HEX codes, ready to copy with a click.

## 2. Core User Experience & Interface

### A. Full-Viewport Color Palette
- The background of the entire web application is a continuous color gradient.
- The gradient spans the entire width and height of the browser viewport.
- **Color Space Mapping**:
  - **Horizontal axis (X)** maps to **Hue** (from $0^\circ$ to $360^\circ$).
  - **Vertical axis (Y)** maps to **Saturation** (left-to-right or top-to-bottom) and **Lightness/Value** (top-to-bottom) to ensure a complete spectrum (red, yellow, green, cyan, blue, magenta, black, white, and all gradients in between).
  - *Recommendation*: Use coordinate-based mathematical calculation (HSL/HSV to RGB/HEX) to derive the color dynamically from the cursor's $(X, Y)$ position, ensuring instant, lag-free rendering.

### B. Dynamic HUD (Heads-Up Display)
- Placed at the **absolute center** of the viewport.
- Styled as a premium, floating **glassmorphic card** (`backdrop-filter: blur()`, thin semi-transparent border, subtle drop shadow).
- Contains:
  - **HEX Readout**: Large, prominent monospaced font (e.g., `#FF5733`).
  - **RGB Readout**: Secondary text (e.g., `rgb(255, 87, 51)`).
  - **HSL Readout**: Complementary text (e.g., `hsl(11, 100%, 60%)`).
  - **Interactive Preview**: A small, clean circle or border indicator displaying the hovered color.
  - **State Prompt**: A micro-copy instruction (e.g., "Click to copy HEX").

### C. Interactions & Micro-Animations
- **Hover/Move**: Viewport color matches the coordinates. The HUD values and preview update dynamically at 60fps.
- **Click**:
  - Copies the current HEX color code to the user's clipboard.
  - Shows a temporary "Copied!" notification on the HUD (with a scale/fade micro-animation).
  - Triggers a beautiful, expanding ripple effect at the click coordinate.
- **Keyboard Shortcuts (Premium Touch)**:
  - Pressing `Spacebar` freezes/locks the current color selection, allowing the user to move their mouse to copy specific values from the HUD or adjust parameters without losing their place. Pressing `Spacebar` again unlocks it.

## 3. Visual Design System

The application must feel state-of-the-art and premium.

- **Typography**: Import and use Google Fonts like **Outfit** or **Plus Jakarta Sans** for body and headers, and **JetBrains Mono** or **Fira Code** for color values.
- **Glassmorphism HUD**:
  - `background: rgba(255, 255, 255, 0.08)` (or dark equivalent based on hovered color brightness).
  - `backdrop-filter: blur(16px) saturate(180%)`.
  - `border: 1px solid rgba(255, 255, 255, 0.2)`.
  - `box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3)`.
- **Adaptive HUD Text Color**:
  - Automatically switch the HUD text/border color between light and dark modes depending on the brightness of the hovered/selected color, ensuring the HUD remains highly legible at all times.

## 4. Technical Constraints

- **Backend**: A lightweight **.NET 8.0/9.0 Web Application** (using ASP.NET Core Minimal APIs or Razor Pages). The backend serves as the host for the static assets.
- **Frontend**: Vanilla HTML5, CSS3, and JavaScript (ES6+).
- **Workspace Isolation**: All application files, including backend C# code and frontend assets, must be contained within the `src/` directory. No project-specific files should be placed outside `src/`.
- **Build & Run**: Must support launching via `dotnet run` inside the `src/` directory.

## 5. Acceptance Criteria

1. **Full-Screen Coverage**: The color gradient occupies 100% of the width and height of the window with no scrollbars.
2. **Interactive Gradient**: Hovering over different coordinates changes the background/gradient values, encompassing all primary and secondary hues plus grayscale gradients (black, white).
3. **Live Center HUD**: Displays accurate HEX and RGB values corresponding exactly to the cursor's location. The HUD is centered horizontally and vertically.
4. **Copy-on-Click**: Clicking copies the color to the clipboard, validated by checking clipboard contents, and displays an animated "Copied!" transition.
5. **No Placeholders**: Contains production-ready code with no mock values or unfinished elements.
6. **Legible UI**: Text on the center HUD remains readable over white, black, or neon hover colors.
7. **Responsive Design**: Works perfectly on varying monitor sizes and adapts its math to changing viewport widths/heights.
