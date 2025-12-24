'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import SoftLandingScreen from '@/components/screens/SoftLandingScreen';
import { ROUTES, MOCK_CONTRIBUTORS } from '@/lib/constants';
import { findContributorAndMessage } from '@/lib/utils';

function SoftLandingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const contributorId = searchParams.get('contributor');
  const messageId = searchParams.get('message');

  const result = findContributorAndMessage(
    contributorId,
    messageId,
    MOCK_CONTRIBUTORS
  );

  const handleListenAgain = () => {
    router.push(ROUTES.CHOOSE_SUPPORT);
  };

  const handleDone = () => {
    router.push(ROUTES.HOME);
  };

  const handleNextMessage = () => {
    if (!result) return;

    const { contributor, message } = result;
    const currentIndex = contributor.messages.findIndex(m => m.id === message.id);
    const nextIndex = (currentIndex + 1) % contributor.messages.length;
    const nextMessage = contributor.messages[nextIndex];

    const url = `${ROUTES.PLAYBACK}?contributor=${contributor.id}&message=${nextMessage.id}`;
    router.push(url);
  };

  return (
    <SoftLandingScreen
      onListenAgain={handleListenAgain}
      onDone={handleDone}
      onNextMessage={result ? handleNextMessage : undefined}
      currentContributor={result?.contributor}
      currentMessage={result?.message}
    />
  );
}

export default function SoftLandingPage() {
  return (
    <Suspense fallback={null}>
      <SoftLandingContent />
    </Suspense>
  );
}
