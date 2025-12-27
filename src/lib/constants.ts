/**
 * Application constants for Here With You
 * Based on Product Requirements Document specifications
 */

import type { Contributor } from './types';

/**
 * Breathing animation timing (in milliseconds)
 */
export const BREATH_TIMING = {
  INHALE_DURATION: 3000, // 3 seconds
  EXHALE_DURATION: 4000, // 4 seconds
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
  CHOOSE_SUPPORT: '/choose-support',
  MESSAGE_LIST: '/message-list',
  PLAYBACK: '/playback',
} as const;

/**
 * UI text content
 */
export const CONTENT = {
  GROUNDING: {
    TITLE: "Let's slow things down together",
    START_BUTTON: 'Breathe',
  },
  CHOOSE_SUPPORT: {
    TITLE: 'Who would you like support from right now?',
    SUBTITLE: 'Everyone here wanted you to hear this',
    RANDOM_BUTTON: 'Play one for me',
  },
  PLAYBACK: {
    TITLE: 'Someone who loves you wanted you to hear this',
    GROUNDING_TITLE: 'Take this moment for yourself',
    GROUNDING_SUBTITLE: "You're not alone",
  },
  MESSAGE_LIST: {
    RANDOM_BUTTON: 'Play one for me',
    CHOOSE_LABEL: 'Or choose one:',
    MULTIPLE_MESSAGES: (count: number) => `has ${count} messages for you`,
    SINGLE_MESSAGE: 'has 1 message for you',
  },
  COMING_SOON: {
    BADGE_TEXT: 'Coming Soon',
  },
} as const;

/**
 * Mock contributor data for development and testing
 * In production, this would be replaced with real contributor information
 */
export const MOCK_CONTRIBUTORS: Contributor[] = [
  {
    id: 'travis',
    name: 'Travis',
    photoPath: '/images/contributors/travis.svg',
    messages: [
      {
        id: 'travis1',
        contributorId: 'travis',
        audioPath: '/audio/messages/travis1.m4a',
        duration: 5,
        title: 'You are not alone',
      },
    ],
  },
  {
    id: 'mom',
    name: 'Mom',
    photoPath: '/images/contributors/mom.svg',
    messages: [
      {
        id: 'mom1',
        contributorId: 'mom',
        audioPath: '/audio/messages/mom1.m4a',
        duration: 32,
        title: "You've got this ",
      },
      {
        id: 'mom2',
        contributorId: 'mom',
        audioPath: '/audio/messages/mom2.m4a',
        duration: 30,
        title: 'We are so proud of you',
      },
    ],
  },
  {
    id: 'dad',
    name: 'Dad',
    photoPath: '/images/contributors/dad.svg',
    messages: [],
  },
  {
    id: 'elizabeth',
    name: 'Elizabeth',
    photoPath: '/images/contributors/elizabeth.svg',
    messages: [
      {
        id: 'elizabeth1',
        contributorId: 'elizabeth',
        audioPath: '/audio/messages/elizabeth.m4a',
        duration: 31,
        title: 'I love you girl',
      },
    ],
  },
  {
    id: 'caroline',
    name: 'Caroline',
    photoPath: '/images/contributors/caroline.svg',
    messages: [
      {
        id: 'caroline1',
        contributorId: 'caroline',
        audioPath: '/audio/messages/caroline.m4a',
        duration: 23,
        title: 'A setback is a setup for a comeback',
      },
    ],
  },
  {
    id: 'cheyenne',
    name: 'Cheyenne',
    photoPath: '/images/contributors/cheyenne.svg',
    messages: [],
  },
] as const;
