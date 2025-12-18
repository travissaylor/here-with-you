'use client';

import { useState } from 'react';
import BreathingCircle from '@/components/ui/BreathingCircle';

interface GroundingScreenProps {
  onComplete?: () => void;
}

export default function GroundingScreen({ onComplete }: GroundingScreenProps) {
  const [showSkip, setShowSkip] = useState(true);

  const handleSkip = () => {
    if (onComplete) {
      onComplete();
    }
  };

  const handleBreathingComplete = () => {
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
      <div className="pt-16 pb-8 text-center px-6">
        <h1 className="text-2xl font-light text-gray-700">
          Let&apos;s slow things down together
        </h1>
      </div>

      <div className="flex-1 flex items-center justify-center px-6">
        <BreathingCircle onComplete={handleBreathingComplete} cycles={3} />
      </div>

      {showSkip && (
        <div className="pb-12 text-center">
          <button
            onClick={handleSkip}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors text-base font-light"
          >
            Skip
          </button>
        </div>
      )}
    </div>
  );
}
