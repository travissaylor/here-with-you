/**
 * Application constants for Here With You
 * Based on Product Requirements Document specifications
 */

import type { Contributor } from './types';

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

/**
 * Mock contributor data for development and testing
 * In production, this would be replaced with real contributor information
 */
export const MOCK_CONTRIBUTORS: Contributor[] = [
  {
    id: 'contributor-test',
    name: 'Travis',
    photoPath: '/images/contributors/travis.svg',
    messages: [
      {
        id: 'msg-test-1',
        contributorId: 'contributor-test',
        audioPath: '/audio/messages/travis_test.m4a',
      },
    ],
  },
  {
    id: 'contributor-1',
    name: 'Sarah',
    photoPath: '/images/contributors/sarah.svg',
    messages: [
      {
        id: 'msg-1-1',
        contributorId: 'contributor-1',
        audioPath: '/audio/messages/sarah-1.mp3',
        duration: 25,
      },
    ],
  },
  {
    id: 'contributor-2',
    name: 'Alex',
    photoPath: '/images/contributors/alex.svg',
    messages: [
      {
        id: 'msg-2-1',
        contributorId: 'contributor-2',
        audioPath: '/audio/messages/alex-1.mp3',
        duration: 30,
      },
    ],
  },
  {
    id: 'contributor-3',
    name: 'Mom',
    photoPath: '/images/contributors/mom.svg',
    messages: [
      {
        id: 'msg-3-1',
        contributorId: 'contributor-3',
        audioPath: '/audio/messages/mom-1.mp3',
        duration: 35,
      },
    ],
  },
  {
    id: 'contributor-4',
    name: 'Jamie',
    photoPath: '/images/contributors/jamie.svg',
    messages: [
      {
        id: 'msg-4-1',
        contributorId: 'contributor-4',
        audioPath: '/audio/messages/jamie-1.mp3',
        duration: 28,
      },
    ],
  },
] as const;
