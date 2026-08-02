/**
 * LikeButton Module
 *
 * This module contains the LikeButton component and related utilities.
 * All exports here are part of the public API.
 */

// ============================================================================
// CORE COMPONENTS
// ============================================================================

// Default icon (can be used as reference for custom icons)
export { DefaultHeartIcon } from "./DefaultHeartIcon.js"
// Tailwind version (default)
export { LikeButton, LikeButton as default } from "./LikeButton.js"
// Vanilla CSS version
export { LikeButtonVanilla } from "./LikeButton.vanilla.js"

// ============================================================================
// HEADLESS HOOK
// ============================================================================

export { LIKE_BUTTON_DEFAULTS, useLikeButton } from "./useLikeButton.js"

// ============================================================================
// TYPES
// ============================================================================

// Component prop types
export type {
  BaseLikeButtonProps,
  Cursor,
  CursorPreset,
  CustomCursor,
  CustomShape,
  IconRenderProps,
  LikeButtonProps,
  LikeButtonVanillaProps,
  Shape,
  ShapePreset,
  StyleOverrides,
} from "./types.js"

// Headless hook types
export type {
  ParticleData,
  UseLikeButtonOptions,
  UseLikeButtonReturn,
} from "./useLikeButton.js"
