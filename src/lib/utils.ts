/**
 * Utility functions for Here With You
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
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
 * Find a contributor and message by their IDs
 * Used for validating URL parameters in playback page
 */
export function findContributorAndMessage(
  contributorId: string | null,
  messageId: string | null,
  contributors: Contributor[]
): { contributor: Contributor; message: Message } | null {
  if (!contributorId || !messageId) return null;

  const contributor = contributors.find(c => c.id === contributorId);
  if (!contributor) return null;

  const message = contributor.messages.find(m => m.id === messageId);
  if (!message) return null;

  return { contributor, message };
}

/**
 * Classname utility for conditional classes with Tailwind merge
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
