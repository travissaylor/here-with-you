'use client';

import { useState } from 'react';
import type { Contributor, Message } from '@/lib/types';
import { CONTENT } from '@/lib/constants';
import { getRandomMessage } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import PersonCard from '@/components/features/PersonCard';

interface ChooseSupportProps {
  contributors: Contributor[];
  onSelectMessage?: (message: Message, contributor: Contributor) => void;
  onSelectContributor?: (contributor: Contributor) => void;
  onComplete?: () => void;
}

export default function ChooseSupport({
  contributors,
  onSelectMessage,
  onSelectContributor,
  onComplete
}: ChooseSupportProps) {
  const [selectedContributorId, setSelectedContributorId] = useState<string | null>(null);

  const handleRandomMessage = () => {
    const message = getRandomMessage(contributors);
    if (message && onSelectMessage) {
      // Find the contributor for this message
      const contributor = contributors.find(c => c.id === message.contributorId);
      if (contributor) {
        setSelectedContributorId(contributor.id);
        onSelectMessage(message, contributor);
      }
    }
  };

  const handlePersonSelect = (contributor: Contributor) => {
    // If contributor has only one message, go directly to playback
    if (contributor.messages.length === 1) {
      const message = contributor.messages[0];
      if (onSelectMessage) {
        setSelectedContributorId(contributor.id);
        onSelectMessage(message, contributor);
      }
    } else {
      // If contributor has multiple messages, go to message list
      if (onSelectContributor) {
        setSelectedContributorId(contributor.id);
        onSelectContributor(contributor);
      }
    }
  };

  // Handle edge case: no contributors
  if (contributors.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-dvh bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 px-6">
        <div className="text-center">
          <p className="text-xl text-gray-600">No messages available right now.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col min-h-dvh bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
      {/* Header Section */}
      <div className="pt-16 pb-8 text-center px-6">
        <h1 className="text-2xl font-light text-gray-700 mb-2">
          {CONTENT.CHOOSE_SUPPORT.TITLE}
        </h1>
        <p className="text-sm text-gray-600">
          {CONTENT.CHOOSE_SUPPORT.SUBTITLE}
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-6 pb-12">
        {/* Primary Action Button - Above Grid */}
        <div className="w-full max-w-sm mb-8">
          <Button
            onClick={handleRandomMessage}
            className="w-full h-14 text-base"
            size="lg"
          >
            {CONTENT.CHOOSE_SUPPORT.RANDOM_BUTTON}
          </Button>
        </div>

        {/* Person Cards Grid */}
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contributors.map((contributor) => (
              <PersonCard
                key={contributor.id}
                contributor={contributor}
                onClick={() => handlePersonSelect(contributor)}
                isSelected={selectedContributorId === contributor.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
