/**
 * Application constants for Here With You
 * Based on Product Requirements Document specifications
 */

/**
 * Breathing animation timing (in milliseconds)
 */
export const BREATH_TIMING = {
  INHALE_DURATION: 4000, // 4 seconds
  EXHALE_DURATION: 6000, // 6 seconds
  TOTAL_CYCLES: 3, // Number of complete breath cycles
} as const;

/**
 * Animation and transition durations
 */
export const ANIMATION = {
  FADE_DURATION: 300, // milliseconds
  EXPAND_DURATION: BREATH_TIMING.INHALE_DURATION,
  CONTRACT_DURATION: BREATH_TIMING.EXHALE_DURATION,
} as const;

/**
 * Route paths for the application
 */
export const ROUTES = {
  HOME: '/',
  GROUNDING: '/grounding',
  CHOOSE_SUPPORT: '/choose-support',
  PLAYBACK: '/playback',
  SOFT_LANDING: '/soft-landing',
} as const;

/**
 * UI text content
 */
export const CONTENT = {
  GROUNDING: {
    TITLE: "Let's slow things down together",
    SUBTITLE: "Start when you're ready",
  },
  CHOOSE_SUPPORT: {
    TITLE: 'Who would you like support from right now?',
    SUBTITLE: 'Everyone here wanted you to hear this',
    RANDOM_BUTTON: 'Play one for me',
  },
  PLAYBACK: {
    TITLE: 'Someone who loves you wanted you to hear this',
  },
  SOFT_LANDING: {
    TITLE: 'Take one more breath',
    SUBTITLE: "You're not alone",
    LISTEN_AGAIN: 'Listen to another message',
    DONE: "I'm done for now",
  },
} as const;
