import assert from 'assert';
import {
  hslToRgb,
  rgbToHsl,
  rgbToHex,
  coordsToColor,
  getRelativeLuminance,
  shouldUseDarkText
} from './color-math.js';

console.log('--- STARTING COLOR MATH TESTS ---');

// Test 1: HSL to RGB conversion
console.log('Running Test 1: hslToRgb...');
assert.deepStrictEqual(hslToRgb(0, 100, 50), [255, 0, 0], 'HSL(0, 100%, 50%) should be pure Red');
assert.deepStrictEqual(hslToRgb(120, 100, 50), [0, 255, 0], 'HSL(120, 100%, 50%) should be pure Green');
assert.deepStrictEqual(hslToRgb(240, 100, 50), [0, 0, 255], 'HSL(240, 100%, 50%) should be pure Blue');
assert.deepStrictEqual(hslToRgb(0, 0, 100), [255, 255, 255], 'HSL(0, 0%, 100%) should be White');
assert.deepStrictEqual(hslToRgb(0, 0, 0), [0, 0, 0], 'HSL(0, 0%, 0%) should be Black');
console.log('✓ Test 1 Passed.');

// Test 2: RGB to HSL conversion
console.log('Running Test 2: rgbToHsl...');
assert.deepStrictEqual(rgbToHsl(255, 0, 0), [0, 100, 50], 'Red should convert back to HSL(0, 100%, 50%)');
assert.deepStrictEqual(rgbToHsl(0, 255, 0), [120, 100, 50], 'Green should convert back to HSL(120, 100%, 50%)');
assert.deepStrictEqual(rgbToHsl(0, 0, 255), [240, 100, 50], 'Blue should convert back to HSL(240, 100%, 50%)');
assert.deepStrictEqual(rgbToHsl(255, 255, 255)[2], 100, 'White lightness should be 100%');
assert.deepStrictEqual(rgbToHsl(0, 0, 0)[2], 0, 'Black lightness should be 0%');
console.log('✓ Test 2 Passed.');

// Test 3: RGB to Hex conversion
console.log('Running Test 3: rgbToHex...');
assert.strictEqual(rgbToHex(255, 0, 0), '#FF0000');
assert.strictEqual(rgbToHex(0, 255, 0), '#00FF00');
assert.strictEqual(rgbToHex(0, 0, 255), '#0000FF');
assert.strictEqual(rgbToHex(255, 255, 255), '#FFFFFF');
assert.strictEqual(rgbToHex(0, 0, 0), '#000000');
console.log('✓ Test 3 Passed.');

// Test 4: Coordinate mapping edge cases
console.log('Running Test 4: coordsToColor...');
const width = 1200;
const height = 800;

// Top edge (should be white)
const topLeft = coordsToColor(0, 0, width, height);
assert.strictEqual(topLeft.hex, '#FFFFFF', 'Top-left corner should be White');
assert.strictEqual(topLeft.l, 100, 'Top-left Lightness should be 100%');

const topRight = coordsToColor(width, 0, width, height);
assert.strictEqual(topRight.hex, '#FFFFFF', 'Top-right corner should be White');

// Bottom edge (should be black)
const bottomLeft = coordsToColor(0, height, width, height);
assert.strictEqual(bottomLeft.hex, '#000000', 'Bottom-left corner should be Black');
assert.strictEqual(bottomLeft.l, 0, 'Bottom-left Lightness should be 0%');

const bottomRight = coordsToColor(width, height, width, height);
assert.strictEqual(bottomRight.hex, '#000000', 'Bottom-right corner should be Black');

// Center line (should be pure hues)
const redCenter = coordsToColor(0, height / 2, width, height);
assert.strictEqual(redCenter.hex, '#FF0000', 'x=0, y=mid should be pure Red');
assert.strictEqual(redCenter.h, 0, 'Red Hue should be 0');
assert.strictEqual(redCenter.s, 100, 'Red Saturation should be 100%');
assert.strictEqual(redCenter.l, 50, 'Red Lightness should be 50%');

const greenCenter = coordsToColor(width / 3, height / 2, width, height);
assert.strictEqual(greenCenter.hex, '#00FF00', 'x=w/3, y=mid should be pure Green');

const blueCenter = coordsToColor(2 * width / 3, height / 2, width, height);
assert.strictEqual(blueCenter.hex, '#0000FF', 'x=2w/3, y=mid should be pure Blue');

const cyanCenter = coordsToColor(width / 2, height / 2, width, height);
assert.strictEqual(cyanCenter.hex, '#00FFFF', 'x=w/2, y=mid should be pure Cyan');
console.log('✓ Test 4 Passed.');

// Test 5: Relative Luminance and adaptive contrast
console.log('Running Test 5: getRelativeLuminance & contrast thresholds...');
assert.strictEqual(getRelativeLuminance(0, 0, 0), 0.0, 'Luminance of black is 0');
assert.strictEqual(getRelativeLuminance(255, 255, 255), 1.0, 'Luminance of white is 1');

// White should use dark text
assert.strictEqual(shouldUseDarkText(255, 255, 255), true, 'White background should use dark text');
// Black should use light text
assert.strictEqual(shouldUseDarkText(0, 0, 0), false, 'Black background should use light text');

// Middle gray (128, 128, 128) - let's check its luminance
const grayLuminance = getRelativeLuminance(128, 128, 128);
console.log(`Luminance of (128, 128, 128): ${grayLuminance.toFixed(4)}`);
// threshold is 0.179. Gray luminance is ~0.216, so it should use dark text
assert.strictEqual(shouldUseDarkText(128, 128, 128), true, 'Gray (128, 128, 128) should use dark text');
console.log('✓ Test 5 Passed.');

console.log('--- ALL COLOR MATH TESTS PASSED SUCCESSFULY ---');
