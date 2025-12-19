'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import MessagePlayback from '@/components/screens/MessagePlayback';
import { MOCK_CONTRIBUTORS, ROUTES } from '@/lib/constants';
import { findContributorAndMessage } from '@/lib/utils';

export default function PlaybackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isValidating, setIsValidating] = useState(true);

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
    } else {
      setIsValidating(false);
    }
  }, [result, router]);

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
        <p className="text-gray-600">Message not found. Redirecting...</p>
      </div>
    );
  }

  if (isValidating) {
    return null;
  }

  return (
    <MessagePlayback
      message={result.message}
      contributor={result.contributor}
      onComplete={() => router.push(ROUTES.SOFT_LANDING)}
    />
  );
}
