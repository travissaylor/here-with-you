'use client';

import { useEffect, useState } from 'react';

interface BreathingCircleProps {
  onComplete?: () => void;
  cycles?: number;
}

export default function BreathingCircle({ onComplete, cycles = 3 }: BreathingCircleProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentCycle, setCurrentCycle] = useState(0);

  const INHALE_DURATION = 4000;
  const EXHALE_DURATION = 6000;
  const CYCLE_DURATION = INHALE_DURATION + EXHALE_DURATION;

  useEffect(() => {
    if (!isAnimating) return;

    const cycleInterval = setInterval(() => {
      setCurrentCycle((prev) => {
        const next = prev + 1;
        if (next >= cycles) {
          setIsAnimating(false);
          if (onComplete) {
            setTimeout(onComplete, 500);
          }
          return prev;
        }
        return next;
      });
    }, CYCLE_DURATION);

    return () => clearInterval(cycleInterval);
  }, [isAnimating, cycles, onComplete]);

  const handleStart = () => {
    setIsAnimating(true);
    setCurrentCycle(0);
  };

  const handleStop = () => {
    setIsAnimating(false);
  };

  return (
    <div className="relative flex items-center justify-center w-full min-h-[400px]">
      {!isAnimating ? (
        // <button
        //   onClick={handleStart}
        //   className="px-12 py-5 text-xl font-light text-gray-700 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-md hover:shadow-lg active:scale-95"
        // >
        //   Start when you&apos;re ready
        // </button>
        <button
          className="flex justify-center items-center"
          onClick={handleStart}
          style={{
            color: 'white',
            border: 0,
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'linear-gradient(to bottom right, #60a5fa, #a78bfa)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          }}
        >
          Start When You&apos;re Ready
        </button>
      ) : (
        <div
          onClick={handleStop}
          className="breathing-circle"
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'linear-gradient(to bottom right, #60a5fa, #a78bfa)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          }}
        />
      )}
    </div>
  );
}
