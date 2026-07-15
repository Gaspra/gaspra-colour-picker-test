import assert from 'assert';

console.log('--- STARTING FRONTEND INTERACTION TESTS (app.test.mjs) ---');

// Keep track of registered event listeners
const windowListeners = {};

let isMobileBreakpoint = false;
let clipboardText = '';

// Create mock elements
class MockElement {
  constructor(id) {
    this.id = id;
    this.classList = {
      classes: new Set(),
      add: (c) => this.classList.classes.add(c),
      remove: (c) => this.classList.classes.delete(c),
      contains: (c) => this.classList.classes.has(c),
    };
    this.style = {};
    this.textContent = '';
    this.listeners = {};
  }

  addEventListener(event, cb) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(cb);
  }

  removeEventListener(event, cb) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(x => x !== cb);
    }
  }

  getBoundingClientRect() {
    return { left: 0, top: 0, width: 1200, height: 800 };
  }

  appendChild(child) {
    // No-op
  }

  closest(selector) {
    // Simple selector mock
    if (selector === '#hud' && this.id === 'hud') return this;
    if (selector === '#copy-btn' && this.id === 'copy-btn') return this;
    if (selector === '#viewport' && this.id === 'viewport') return this;
    return null;
  }
}

const mockViewport = new MockElement('viewport');
const mockHud = new MockElement('hud');
const mockColorPreview = new MockElement('color-preview');
const mockHexValue = new MockElement('hex-value');
const mockRgbValue = new MockElement('rgb-value');
const mockHslValue = new MockElement('hsl-value');
const mockLockBadge = new MockElement('lock-badge');
const mockCopiedBadge = new MockElement('copied-badge');
const mockCopyBtn = new MockElement('copy-btn');
const mockPointerTracker = new MockElement('pointer-tracker');
const mockInstructionText = new MockElement('instruction-text');

// Initially hide badges
mockLockBadge.classList.add('hidden');
mockCopiedBadge.classList.add('hidden');

// Mock DOM
global.document = {
  getElementById: (id) => {
    switch (id) {
      case 'viewport': return mockViewport;
      case 'hud': return mockHud;
      case 'color-preview': return mockColorPreview;
      case 'hex-value': return mockHexValue;
      case 'rgb-value': return mockRgbValue;
      case 'hsl-value': return mockHslValue;
      case 'lock-badge': return mockLockBadge;
      case 'copied-badge': return mockCopiedBadge;
      case 'copy-btn': return mockCopyBtn;
      case 'pointer-tracker': return mockPointerTracker;
      case 'instruction-text': return mockInstructionText;
      default: return null;
    }
  },
  createElement: (tag) => {
    return new MockElement(tag);
  }
};

global.window = {
  addEventListener: (event, cb) => {
    windowListeners[event] = windowListeners[event] || [];
    windowListeners[event].push(cb);
  },
  matchMedia: (query) => {
    return {
      matches: isMobileBreakpoint
    };
  }
};

global.navigator = {
  clipboard: {
    writeText: async (text) => {
      clipboardText = text;
      return Promise.resolve();
    }
  }
};

// Now import the app module dynamically so it initializes with our mocked DOM
await import('./app.js');

// Verify event listeners are attached
assert.ok(mockViewport.listeners['pointerdown'], 'Viewport pointerdown listener should be attached');
assert.ok(mockViewport.listeners['pointermove'], 'Viewport pointermove listener should be attached');
assert.ok(mockViewport.listeners['pointerup'], 'Viewport pointerup listener should be attached');
assert.ok(mockHud.listeners['click'], 'HUD click listener should be attached');
assert.ok(windowListeners['keydown'], 'Window keydown listener should be attached');

console.log('✓ Initialization & Event registration verified.');

// Test 1: Desktop mode interaction (mouse pointer)
console.log('Running Test 1: Desktop Mouse Exploration...');
isMobileBreakpoint = false;

// Trigger DOMContentLoaded
const domContentLoadedCallbacks = windowListeners['DOMContentLoaded'] || [];
for (const cb of domContentLoadedCallbacks) {
  cb();
}

// Check initial position (center of 1200x800 is 600, 400)
// HSL at 600,400 should be hue: 180 (center), sat: 100, light: 50
assert.strictEqual(mockHexValue.textContent, '#00FFFF', 'Initial color at center of viewport should be Cyan (#00FFFF)');

// Simulate mouse move
const pointermoveCallback = mockViewport.listeners['pointermove'][0];
pointermoveCallback({
  clientX: 0,
  clientY: 400,
  pointerType: 'mouse',
  target: mockViewport
});

// x = 0, y = 400 should be Red (#FF0000)
assert.strictEqual(mockHexValue.textContent, '#FF0000', 'Mouse move to left center should update color to Red (#FF0000)');

console.log('✓ Test 1 Passed.');

// Test 2: Click to copy on Desktop (mouse pointer)
console.log('Running Test 2: Desktop Click to Copy...');
const pointerdownCallback = mockViewport.listeners['pointerdown'][0];
const pointerupCallback = mockViewport.listeners['pointerup'][0];

// Trigger down and up
pointerdownCallback({
  clientX: 0,
  clientY: 400,
  pointerType: 'mouse',
  target: mockViewport
});

pointerupCallback({
  clientX: 0,
  clientY: 400,
  pointerType: 'mouse',
  target: mockViewport
});

// Since copy is async, wait a moment for the promise
await new Promise(resolve => setTimeout(resolve, 50));

assert.strictEqual(clipboardText, '#FF0000', 'Clipboard should contain HEX of clicked color');
assert.ok(mockCopiedBadge.classList.contains('show'), 'Copied badge should be visible (have class show)');

console.log('✓ Test 2 Passed.');

// Test 3: Lock/Unlock toggle via Space key
console.log('Running Test 3: Keyboard Spacebar Lock/Unlock...');
const keydownCallback = windowListeners['keydown'][0];

// Lock it
keydownCallback({
  code: 'Space',
  preventDefault: () => {}
});

assert.ok(mockLockBadge.classList.contains('hidden') === false, 'Lock badge should be visible after spacebar');
assert.ok(mockPointerTracker.classList.contains('locked'), 'Pointer tracker should have locked class');

// Move mouse while locked
pointermoveCallback({
  clientX: 600, // Cyan
  clientY: 400,
  pointerType: 'mouse',
  target: mockViewport
});

// Color should still be Red because selection is locked
assert.strictEqual(mockHexValue.textContent, '#FF0000', 'Color should remain locked on mouse move');

// Unlock it
keydownCallback({
  code: 'Space',
  preventDefault: () => {}
});

assert.ok(mockLockBadge.classList.contains('hidden'), 'Lock badge should be hidden after spacebar again');

// Move mouse while unlocked
pointermoveCallback({
  clientX: 600, // Cyan
  clientY: 400,
  pointerType: 'mouse',
  target: mockViewport
});

assert.strictEqual(mockHexValue.textContent, '#00FFFF', 'Color should update on mouse move when unlocked');

console.log('✓ Test 3 Passed.');

// Test 4: Mobile interaction (touch pointer)
console.log('Running Test 4: Mobile Touch Interaction...');
isMobileBreakpoint = true;

// Trigger resize/breakpoint update logic by resizing window
const resizeCallbacks = windowListeners['resize'] || [];
for (const cb of resizeCallbacks) {
  cb();
}

// 1. Touch down starts dragging
pointerdownCallback({
  clientX: 0,
  clientY: 400,
  pointerType: 'touch',
  target: mockViewport
});

// Color should update
assert.strictEqual(mockHexValue.textContent, '#FF0000', 'Touch down should update color to Red');

// 2. Touch move updates coords
pointermoveCallback({
  clientX: 600,
  clientY: 400,
  pointerType: 'touch',
  target: mockViewport
});
assert.strictEqual(mockHexValue.textContent, '#00FFFF', 'Touch drag should update color to Cyan');

// 3. Touch release locks selection
pointerupCallback({
  clientX: 600,
  clientY: 400,
  pointerType: 'touch',
  target: mockViewport
});

// Verify color selection is locked/frozen
assert.ok(mockInstructionText.textContent.includes('Selection Frozen'), 'Instruction text should show Selection Frozen');

// Dragging finger again (touch down) unlocks selection
pointerdownCallback({
  clientX: 0,
  clientY: 400,
  pointerType: 'touch',
  target: mockViewport
});

assert.strictEqual(mockHexValue.textContent, '#FF0000', 'New touch down should unlock and sample new color');

console.log('✓ Test 4 Passed.');

// Test 5: Mobile HUD click copies color
console.log('Running Test 5: Mobile Docked HUD Copying...');
isMobileBreakpoint = true;

// Freeze the color first by releasing touch
pointerupCallback({
  clientX: 0,
  clientY: 400,
  pointerType: 'touch',
  target: mockViewport
});

clipboardText = '';
const hudClickCallback = mockHud.listeners['click'][0];

// Trigger click on HUD
hudClickCallback({
  target: mockHud,
  stopPropagation: () => {}
});

await new Promise(resolve => setTimeout(resolve, 50));
assert.strictEqual(clipboardText, '#FF0000', 'Tapping the docked HUD on mobile should copy color value');

console.log('✓ Test 5 Passed.');

console.log('--- ALL FRONTEND INTERACTION TESTS PASSED SUCCESSFULY ---');
