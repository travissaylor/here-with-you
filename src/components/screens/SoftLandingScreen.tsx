'use client';

import { Button } from '@/components/ui/button';
import { CONTENT } from '@/lib/constants';
import type { Contributor, Message } from '@/lib/types';

interface SoftLandingScreenProps {
  onListenAgain?: () => void;
  onDone?: () => void;
  onNextMessage?: () => void;
  currentContributor?: Contributor;
  currentMessage?: Message;
}

export default function SoftLandingScreen({
  onListenAgain,
  onDone,
  onNextMessage,
  currentContributor,
  currentMessage,
}: SoftLandingScreenProps) {
  // Determine if "Next message" should show
  const shouldShowNextMessage = currentContributor && currentMessage &&
    currentContributor.messages.length > 1;

  return (
    <div className="flex flex-col min-h-screen bg-linear-to-b from-blue-50 via-purple-50 to-pink-50">
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-light text-gray-700 mb-4">
          {CONTENT.SOFT_LANDING.TITLE}
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          {CONTENT.SOFT_LANDING.SUBTITLE}
        </p>

        <div className="flex flex-col gap-4 w-full max-w-sm">
          {/* Show "Next message" if available */}
          {shouldShowNextMessage && onNextMessage && (
            <Button
              onClick={onNextMessage}
              size="lg"
              className="w-full"
            >
              {CONTENT.SOFT_LANDING.NEXT_MESSAGE(currentContributor.name)}
            </Button>
          )}

          {/* Existing buttons */}
          <Button
            onClick={onListenAgain}
            size="lg"
            className="w-full"
            variant={shouldShowNextMessage ? "outline" : "default"}
          >
            {CONTENT.SOFT_LANDING.LISTEN_AGAIN}
          </Button>
          <Button
            onClick={onDone}
            variant="outline"
            size="lg"
            className="w-full"
          >
            {CONTENT.SOFT_LANDING.DONE}
          </Button>
        </div>
      </div>
    </div>
  );
}
