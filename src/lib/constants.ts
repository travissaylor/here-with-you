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
    START_BUTTON: "Breathe",
  },
  CHOOSE_SUPPORT: {
    TITLE: 'Who would you like support from right now?',
    SUBTITLE: 'Everyone here wanted you to hear this',
    RANDOM_BUTTON: 'Play one for me',
  },
  PLAYBACK: {
    TITLE: 'Someone who loves you wanted you to hear this',
    GROUNDING_TITLE: "Take this moment for yourself",
    GROUNDING_SUBTITLE: "You're not alone",
  },
  MESSAGE_LIST: {
    RANDOM_BUTTON: 'Play one for me',
    CHOOSE_LABEL: 'Or choose one:',
    MULTIPLE_MESSAGES: (count: number) => `has ${count} messages for you`,
    SINGLE_MESSAGE: 'has 1 message for you',
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
        id: 'travis-test',
        contributorId: 'travis',
        audioPath: '/audio/messages/travis_test.m4a',
        duration: 5,
        title: 'You are not alone',
      },
      {
        id: 'travis-test2',
        contributorId: 'travis',
        audioPath: '/audio/messages/travis_test.m4a',
        duration: 5,
        title: 'When things feel heavy',
      },
    ],
  },
  {
    id: 'mom',
    name: 'Mom',
    photoPath: '/images/contributors/mom.svg',
    messages: [
      {
        id: 'mom-test',
        contributorId: 'mom',
        audioPath: '/audio/messages/travis_test.m4a',
        duration: 5,
        title: 'A gentle reminder',
      },
    ],
  },
  {
    id: 'dad',
    name: 'Dad',
    photoPath: '/images/contributors/dad.svg',
    messages: [
      {
        id: 'dad-test',
        contributorId: 'dad',
        audioPath: '/audio/messages/travis_test.m4a',
        duration: 5,
        title: "You're stronger than you know",
      },
    ],
  },
  {
    id: 'elizabeth',
    name: 'Elizabeth',
    photoPath: '/images/contributors/elizabeth.svg',
    messages: [
      {
        id: 'elizabeth-test',
        contributorId: 'elizabeth',
        audioPath: '/audio/messages/travis_test.m4a',
        duration: 5,
        title: 'For difficult moments',
      },
    ],
  },
  {
    id: 'caroline',
    name: 'Caroline',
    photoPath: '/images/contributors/caroline.svg',
    messages: [
      {
        id: 'caroline-test',
        contributorId: 'caroline',
        audioPath: '/audio/messages/travis_test.m4a',
        duration: 5,
        title: 'Breathing through it together',
      },
    ],
  },
  {
    id: "cheyenne",
    name: "Cheyenne",
    photoPath: "/images/contributors/cheyenne.svg",
    messages: [
      {
        id: "cheyenne-test",
        contributorId: "cheyenne",
        audioPath: "/audio/messages/travis_test.m4a",
        duration: 5,
        title: 'A reminder you are loved',
      },
    ],
  }
] as const;
