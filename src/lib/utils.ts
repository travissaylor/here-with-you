/**
 * Utility functions for Here With You
 */

import type { Message, Contributor } from './types';

/**
 * Get a random message from all available contributors
 */
export function getRandomMessage(contributors: Contributor[]): Message | null {
  const allMessages = contributors.flatMap((contributor) => contributor.messages);

  if (allMessages.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * allMessages.length);
  return allMessages[randomIndex];
}

/**
 * Get a random message from a specific contributor
 */
export function getRandomMessageFromContributor(contributor: Contributor): Message | null {
  if (contributor.messages.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * contributor.messages.length);
  return contributor.messages[randomIndex];
}

/**
 * Format duration from seconds to mm:ss
 */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Classname utility for conditional classes
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
