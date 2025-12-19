'use client';

import { Button } from '@/components/ui/button';
import { CONTENT } from '@/lib/constants';

interface SoftLandingScreenProps {
  onListenAgain?: () => void;
  onDone?: () => void;
}

export default function SoftLandingScreen({
  onListenAgain,
  onDone,
}: SoftLandingScreenProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-light text-gray-700 mb-4">
          {CONTENT.SOFT_LANDING.TITLE}
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          {CONTENT.SOFT_LANDING.SUBTITLE}
        </p>

        <div className="flex flex-col gap-4 w-full max-w-sm">
          <Button
            onClick={onListenAgain}
            size="lg"
            className="w-full"
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
