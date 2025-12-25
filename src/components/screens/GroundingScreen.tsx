'use client';

import { useState } from 'react';
import BreathingCircle from '@/components/features/BreathingCircle';
import { Button } from '../ui/button';
import { CONTENT } from '@/lib/constants';

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
    <div className="relative flex flex-col min-h-dvh bg-blue-50">
      <div className="pt-16 pb-8 text-center px-6">
        <h1 className="text-2xl font-light text-gray-700">
          {CONTENT.GROUNDING.TITLE}
        </h1>
      </div>

      <div className="flex-1 flex items-center justify-center px-6">
        <BreathingCircle onComplete={handleBreathingComplete} cycles={3} />
      </div>

      {showSkip && (
        <div className="pb-12 text-center">
          <Button
            onClick={handleSkip}
            variant="outline"
          >
            Skip
          </Button>
        </div>
      )}
    </div>
  );
}
