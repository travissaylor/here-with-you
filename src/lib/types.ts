/**
 * Type definitions for Here With You application
 * Based on Product Requirements Document
 */

/**
 * Represents a person who has contributed a support message
 */
export interface Contributor {
  id: string;
  name: string;
  photoPath: string; // Path to image in /public/images/contributors/
  messages: Message[];
}

/**
 * Represents an audio message from a contributor
 */
export interface Message {
  id: string;
  contributorId: string;
  audioPath: string; // Path to audio file in /public/audio/messages/
  duration?: number; // Duration in seconds (optional)
  title: string; // Short message title/theme (2-5 words, calming/supportive tone)
}

/**
 * Screen flow states for the application
 */
export type ScreenState = 'grounding' | 'choose-support' | 'playback' | 'soft-landing';
