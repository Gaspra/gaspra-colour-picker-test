import { coordsToColor, shouldUseDarkText } from './color-math.js';

// Application State
const state = {
  x: 0,
  y: 0,
  isLocked: false,
  color: null
};

// DOM Elements
const viewport = document.getElementById('viewport');
const hud = document.getElementById('hud');
const colorPreview = document.getElementById('color-preview');
const hexValue = document.getElementById('hex-value');
const rgbValue = document.getElementById('rgb-value');
const hslValue = document.getElementById('hsl-value');
const lockBadge = document.getElementById('lock-badge');
const copiedBadge = document.getElementById('copied-badge');
const copyBtn = document.getElementById('copy-btn');
const pointerTracker = document.getElementById('pointer-tracker');
const instructionText = document.getElementById('instruction-text');

// Initialize instruction text based on device width
function updateInstructionText() {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (state.isLocked) {
    instructionText.textContent = isMobile 
      ? 'Selection Frozen • Tap HUD to copy' 
      : 'Locked • Move mouse to inspect HUD • Space to resume';
  } else {
    instructionText.textContent = isMobile 
      ? 'Drag finger to pick • Release to freeze' 
      : 'Move mouse to pick • Click to copy • Space to lock';
  }
}

// Update the HUD Card & Tracker Styles
function updateUI(color) {
  if (!color) return;

  hexValue.textContent = color.hex;
  rgbValue.textContent = `rgb(${color.r}, ${color.g}, ${color.b})`;
  hslValue.textContent = `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
  colorPreview.style.backgroundColor = color.hex;

  // Calculate contrast theme
  const darkText = shouldUseDarkText(color.r, color.g, color.b);

  if (darkText) {
    hud.classList.remove('theme-dark');
    hud.classList.add('theme-light');
    pointerTracker.classList.remove('theme-dark');
    pointerTracker.classList.add('theme-light');
  } else {
    hud.classList.remove('theme-light');
    hud.classList.add('theme-dark');
    pointerTracker.classList.remove('theme-light');
    pointerTracker.classList.add('theme-dark');
  }
}

// Copy color values to user clipboard
function copyColorToClipboard() {
  if (!state.color) return;

  navigator.clipboard.writeText(state.color.hex).then(() => {
    // Show temporary badge notification
    copiedBadge.classList.remove('hidden');
    
    if (window.copiedTimeout) {
      clearTimeout(window.copiedTimeout);
    }
    
    window.copiedTimeout = setTimeout(() => {
      copiedBadge.classList.add('hidden');
    }, 1500);
  }).catch(err => {
    console.error('Failed to copy color to clipboard:', err);
  });
}

// Create a visual click ripple expanding outwards
function createRipple(clientX, clientY) {
  const ripple = document.createElement('span');
  ripple.className = 'click-ripple';
  ripple.style.left = `${clientX}px`;
  ripple.style.top = `${clientY}px`;

  if (state.color) {
    // Set ripple color to the selected color
    ripple.style.color = state.color.hex;
  }

  viewport.appendChild(ripple);

  // Remove element after animation completes
  ripple.addEventListener('animationend', () => {
    ripple.remove();
  });
}

// Toggle Lock Selection
function toggleLock(forceState) {
  state.isLocked = forceState !== undefined ? forceState : !state.isLocked;

  if (state.isLocked) {
    lockBadge.classList.remove('hidden');
    pointerTracker.classList.add('locked');
    viewport.style.cursor = 'default'; // Let user click elements on the HUD normally
  } else {
    lockBadge.classList.add('hidden');
    pointerTracker.classList.remove('locked');
    viewport.style.cursor = 'none'; // Hide default cursor to show custom tracker
  }

  updateInstructionText();
}

// Handle coordinates updating
function updateCoords(clientX, clientY) {
  const rect = viewport.getBoundingClientRect();
  state.x = clientX - rect.left;
  state.y = clientY - rect.top;

  // Move custom tracker
  pointerTracker.style.left = `${state.x}px`;
  pointerTracker.style.top = `${state.y}px`;

  // Compute color
  state.color = coordsToColor(state.x, state.y, rect.width, rect.height);
  updateUI(state.color);
}

// Pointer Event Handlers
viewport.addEventListener('pointerdown', (e) => {
  // Touch dragging behavior starts on pointer down
  if (e.pointerType === 'touch') {
    if (state.isLocked) {
      toggleLock(false);
    }
    updateCoords(e.clientX, e.clientY);
  }
});

viewport.addEventListener('pointermove', (e) => {
  if (!state.isLocked) {
    updateCoords(e.clientX, e.clientY);
  }
});

viewport.addEventListener('pointerup', (e) => {
  // Touch releases automatically freeze the selection on mobile
  if (e.pointerType === 'touch') {
    if (!state.isLocked) {
      toggleLock(true);
    }
  }
});

// Click viewport to copy
viewport.addEventListener('click', (e) => {
  // If clicked inside HUD card, let HUD handles actions
  if (e.target.closest('#hud')) {
    return;
  }

  // Only trigger click-to-copy via mouse click on desktop
  if (e.pointerType === 'mouse' || e.pointerType === '') {
    createRipple(e.clientX, e.clientY);
    copyColorToClipboard();
  }
});

// HUD click behaviors
hud.addEventListener('click', (e) => {
  // Copy button explicitly copies
  if (e.target.closest('#copy-btn')) {
    e.stopPropagation();
    copyColorToClipboard();
    return;
  }

  // On mobile (docked HUD), tap anywhere on the HUD to copy the frozen selection
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile && state.isLocked) {
    copyColorToClipboard();
  }
});

// Keyboard event listener for Spacebar lock
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault(); // Prevent standard page scroll behavior
    toggleLock();
  }
});

// Initialize instructions and first layout pass
updateInstructionText();
window.addEventListener('resize', () => {
  updateInstructionText();
});

// Set starting color at center of screen
window.addEventListener('DOMContentLoaded', () => {
  const rect = viewport.getBoundingClientRect();
  updateCoords(rect.width / 2, rect.height / 2);
});
