'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import MessageListScreen from '@/components/screens/MessageListScreen';
import { MOCK_CONTRIBUTORS, ROUTES } from '@/lib/constants';
import type { Message } from '@/lib/types';

function MessageListContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const contributorId = searchParams.get('contributor');

  const contributor = MOCK_CONTRIBUTORS.find(c => c.id === contributorId);

  // Handle missing contributor
  if (!contributor) {
    return (
      <div className="flex items-center justify-center min-h-dvh bg-blue-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Contributor not found</p>
          <button
            onClick={() => router.push(ROUTES.CHOOSE_SUPPORT)}
            className="text-purple-600 hover:text-purple-700"
          >
            Back to support
          </button>
        </div>
      </div>
    );
  }

  const handleSelectMessage = (message: Message) => {
    const url = `${ROUTES.PLAYBACK}?contributor=${contributor.id}&message=${message.id}`;
    router.push(url);
  };

  const handleBack = () => {
    router.push(ROUTES.CHOOSE_SUPPORT);
  };

  return (
    <MessageListScreen
      contributor={contributor}
      onSelectMessage={handleSelectMessage}
      onBack={handleBack}
    />
  );
}

export default function MessageListPage() {
  return (
    <Suspense fallback={null}>
      <MessageListContent />
    </Suspense>
  );
}
