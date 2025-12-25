'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import MessagePlayback from '@/components/screens/MessagePlayback';
import { MOCK_CONTRIBUTORS, ROUTES } from '@/lib/constants';
import { findContributorAndMessage } from '@/lib/utils';

export default function PlaybackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const contributorId = searchParams.get('contributor');
  const messageId = searchParams.get('message');

  const result = findContributorAndMessage(
    contributorId,
    messageId,
    MOCK_CONTRIBUTORS
  );

  useEffect(() => {
    if (!result) {
      setTimeout(() => {
        router.replace(ROUTES.CHOOSE_SUPPORT);
      }, 1500);
    }
  }, [result, router]);

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
        <p className="text-gray-600">Message not found. Redirecting...</p>
      </div>
    );
  }

  const handleNextMessage = () => {
    if (!result) return;

    const { contributor, message } = result;
    const currentIndex = contributor.messages.findIndex(m => m.id === message.id);

    if (currentIndex < contributor.messages.length - 1) {
      const nextMessage = contributor.messages[currentIndex + 1];
      const url = `${ROUTES.PLAYBACK}?contributor=${contributor.id}&message=${nextMessage.id}`;
      router.push(url);
    }
  };

  const handleBack = () => {
    if (!result) return;

    const { contributor } = result;

    // If contributor has multiple messages, go to message list
    if (contributor.messages.length > 1) {
      const url = `${ROUTES.MESSAGE_LIST}?contributor=${contributor.id}`;
      router.push(url);
    } else {
      // Otherwise go to choose support
      router.push(ROUTES.CHOOSE_SUPPORT);
    }
  };

  // Only show "Next message" button if there are more messages AND we're not on the last one
  const currentIndex = result ? result.contributor.messages.findIndex(m => m.id === result.message.id) : -1;
  const hasNextMessage = result ? currentIndex < result.contributor.messages.length - 1 : false;

  return (
    <MessagePlayback
      message={result.message}
      contributor={result.contributor}
      onBack={handleBack}
      onNextMessage={handleNextMessage}
      hasMultipleMessages={hasNextMessage}
    />
  );
}
