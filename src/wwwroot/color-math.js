/**
 * Pure functions for color space conversion and coordinate mapping.
 */

/**
 * Converts HSL values to RGB.
 * @param {number} h Hue in [0, 360]
 * @param {number} s Saturation in [0, 100]
 * @param {number} l Lightness in [0, 100]
 * @returns {number[]} [r, g, b] in [0, 255]
 */
export function hslToRgb(h, s, l) {
  const S = s / 100;
  const L = l / 100;

  const C = (1 - Math.abs(2 * L - 1)) * S;
  const X = C * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = L - C / 2;

  let rPrime = 0;
  let gPrime = 0;
  let bPrime = 0;

  if (h >= 0 && h < 60) {
    rPrime = C; gPrime = X; bPrime = 0;
  } else if (h >= 60 && h < 120) {
    rPrime = X; gPrime = C; bPrime = 0;
  } else if (h >= 120 && h < 180) {
    rPrime = 0; gPrime = C; bPrime = X;
  } else if (h >= 180 && h < 240) {
    rPrime = 0; gPrime = X; bPrime = C;
  } else if (h >= 240 && h < 300) {
    rPrime = X; gPrime = 0; bPrime = C;
  } else if (h >= 300 && h <= 360) {
    rPrime = C; gPrime = 0; bPrime = X;
  }

  const r = Math.min(255, Math.max(0, Math.round((rPrime + m) * 255)));
  const g = Math.min(255, Math.max(0, Math.round((gPrime + m) * 255)));
  const b = Math.min(255, Math.max(0, Math.round((bPrime + m) * 255)));

  return [r, g, b];
}

/**
 * Converts RGB values to HSL.
 * @param {number} r Red in [0, 255]
 * @param {number} g Green in [0, 255]
 * @param {number} b Blue in [0, 255]
 * @returns {number[]} [h, s, l] with h in [0, 360], s, l in [0, 100]
 */
export function rgbToHsl(r, g, b) {
  const R = r / 255;
  const G = g / 255;
  const B = b / 255;

  const max = Math.max(R, G, B);
  const min = Math.min(R, G, B);
  const d = max - min;

  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case R:
        h = ((G - B) / d) % 6;
        break;
      case G:
        h = (B - R) / d + 2;
        break;
      case B:
        h = (R - G) / d + 4;
        break;
    }

    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  return [
    h,
    Math.min(100, Math.max(0, Math.round(s * 100))),
    Math.min(100, Math.max(0, Math.round(l * 100)))
  ];
}

/**
 * Converts RGB values to a HEX string.
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @returns {string} e.g. "#FF5733"
 */
export function rgbToHex(r, g, b) {
  const clamp = (x) => Math.min(255, Math.max(0, Math.round(x)));
  const hex = (x) => clamp(x).toString(16).padStart(2, '0');
  return `#${hex(r)}${hex(g)}${hex(b)}`.toUpperCase();
}

/**
 * Calculates the color at viewport coordinates (x, y), simulating
 * CSS blending of a horizontal rainbow background and a vertical
 * white-to-transparent-to-black overlay.
 * @param {number} x
 * @param {number} y
 * @param {number} width Viewport width
 * @param {number} height Viewport height
 * @returns {{r: number, g: number, b: number, h: number, s: number, l: number, hex: string}}
 */
export function coordsToColor(x, y, width, height) {
  const clampX = Math.min(width, Math.max(0, x));
  const clampY = Math.min(height, Math.max(0, y));

  // 1. Map Horizontal X to Hue [0, 360]
  const h = width > 0 ? (clampX / width) * 360 : 0;

  // 2. Find pure RGB base color at this Hue (with 100% Saturation, 50% Lightness)
  const [rPure, gPure, bPure] = hslToRgb(h, 100, 50);

  // 3. Simulate CSS vertical gradient overlay
  // Top half: white overlay fading to transparent
  // Bottom half: black overlay fading in from transparent
  const ratio = height > 0 ? clampY / height : 0;
  let r = 0;
  let g = 0;
  let b = 0;

  if (ratio < 0.5) {
    // White overlay with opacity alpha
    const alpha = 1 - 2 * ratio;
    r = alpha * 255 + (1 - alpha) * rPure;
    g = alpha * 255 + (1 - alpha) * gPure;
    b = alpha * 255 + (1 - alpha) * bPure;
  } else {
    // Black overlay with opacity alpha
    const alpha = 2 * ratio - 1;
    r = (1 - alpha) * rPure;
    g = (1 - alpha) * gPure;
    b = (1 - alpha) * bPure;
  }

  r = Math.min(255, Math.max(0, Math.round(r)));
  g = Math.min(255, Math.max(0, Math.round(g)));
  b = Math.min(255, Math.max(0, Math.round(b)));

  const hex = rgbToHex(r, g, b);
  const [finalH, finalS, finalL] = rgbToHsl(r, g, b);

  return { r, g, b, h: finalH, s: finalS, l: finalL, hex };
}

/**
 * Calculates WCAG relative luminance.
 * @param {number} r Red in [0, 255]
 * @param {number} g Green in [0, 255]
 * @param {number} b Blue in [0, 255]
 * @returns {number} Relative luminance in [0, 1]
 */
export function getRelativeLuminance(r, g, b) {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/**
 * Determines whether dark text (or light text) should be used for contrast.
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @returns {boolean} true for dark text, false for light text
 */
export function shouldUseDarkText(r, g, b) {
  return getRelativeLuminance(r, g, b) > 0.179;
}
