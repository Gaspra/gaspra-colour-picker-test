# Instructions: Mobile Optimization & UX Polish

- **Status**: Completed
- **Assigned Role**: Developer (Mobile & UX Polish)
- **Codename**: sapphire-ocean-dolphin
- **Dependencies**: emerald-forest-badger (Status: Completed)

## Definition of Ready

- `emerald-forest-badger` has completed the core desktop frontend implementation and frontend tests.
- The desktop interface is fully functional, supporting coordinates-to-color mapping, glassmorphism HUD, adaptive contrast, keyboard lock, and click-to-copy.

## Task Description

Refine and optimize the Gaspra Colour Picker to deliver a premium, responsive experience on mobile and tablet devices, alongside polished interactive animations. Implement unified Pointer Events to handle mouse and touch inputs uniformly. Prevent default scrolling and gesture behaviors during touch drags. Build a responsive docked HUD layout for smaller screens to prevent the user's hand from obstructing the readouts. Add high-quality micro-animations including pointer-coordinate ripples and fluid notification transitions. Extend automated tests to cover layout states and interaction handlers.

All modifications must be integrated into the existing assets inside `src/wwwroot/` and tested accordingly.

## Task Checklist

- [x] Refactor `app.js` to replace mouse events with unified Pointer Events (`pointerdown`, `pointermove`, `pointerup`).
- [x] Add CSS `touch-action: none` to the main viewport container and prevent default touch gestures to block page scrolling or pull-to-refresh during color exploration.
- [x] Implement responsive media queries in `style.css` to dock the HUD at the top or bottom of the screen when the viewport width is `768px` or smaller.
- [x] Adjust the interaction model for mobile/tablet screens:
  - Dragging a finger across the viewport updates the color palette dynamically.
  - Releasing the touch (`pointerup`) freezes the color selection.
  - Tapping the docked HUD copies the current HEX color code, preventing accidental copying during exploratory drags.
- [x] Implement a custom ripple effect:
  - Dynamically generate an absolute-positioned ripple element at the exact $(X, Y)$ coordinate of any click/tap.
  - Animate the ripple scaling outward and fading away using CSS `@keyframes`.
- [x] Enhance the HUD "Copied!" notification with a premium micro-animation (e.g. scale-up and fade-in/out).
- [x] Update frontend test scripts to simulate pointer events and verify that the layout and interaction states toggle correctly at mobile breakpoints.
- [x] Manually test responsiveness on multiple simulated devices (mobile, tablet, desktop) to ensure the user's hand does not cover the HUD and that no scrolling or rendering lag occurs.

## Handoff Note

As you work, please:
1. Mark checklist items in this file as completed `[x]`.
2. When all tasks are finished, change the header metadata in this file to `Status: Completed`.
3. Append a chronological entry summarizing your work in [journal.md](journal.md). If it does not exist, create it.
4. Notify the Project Manager (`golden-canyon-eagle`) and the USER that the task is complete.
