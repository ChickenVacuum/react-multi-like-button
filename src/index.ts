// Main entry point (Tailwind CSS version)
//
// ⚠️  IMPORTANT: When adding or removing exports, update BOTH index.ts and vanilla.ts
//     to keep the API surface consistent across entry points.

// ============================================================================
// CORE COMPONENTS
// ============================================================================

// Default icon (can be used as reference for custom icons)
export { DefaultHeartIcon } from "./LikeButton/DefaultHeartIcon.js"
// Tailwind version (default)
export { LikeButton, LikeButton as default } from "./LikeButton/LikeButton.js"
// Vanilla CSS version (also available from ./vanilla entry)
export { LikeButtonVanilla } from "./LikeButton/LikeButton.vanilla.js"

// ============================================================================
// HEADLESS HOOK
// ============================================================================

export { LIKE_BUTTON_DEFAULTS, useLikeButton } from "./LikeButton/useLikeButton.js"

// ============================================================================
// PARTICLE PRESETS
// ============================================================================

export { PARTICLE_PRESETS } from "./Particle/presets.js"

// ============================================================================
// TYPES
// ============================================================================

// LikeButton component types
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
} from "./LikeButton/types.js"

// Headless hook types
export type {
  AriaLabelProp,
  AriaLabelState,
  ParticleData,
  UseLikeButtonOptions,
  UseLikeButtonReturn,
} from "./LikeButton/useLikeButton.js"

// Particle configuration types
export type {
  CustomParticleShape,
  ParticleConfig,
  ParticlePreset,
  ParticleShape,
  ParticleShapePreset,
  ParticleShapeProps,
  Range,
} from "./Particle/types.js"
