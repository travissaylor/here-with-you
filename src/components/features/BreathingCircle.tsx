'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BREATH_TIMING, CONTENT } from '@/lib/constants';

interface BreathingCircleProps {
  onComplete?: () => void;
  cycles?: number;
}

export default function BreathingCircle({ onComplete, cycles = 3 }: BreathingCircleProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentCycle, setCurrentCycle] = useState(0);

  const CYCLE_DURATION = BREATH_TIMING.INHALE_DURATION + BREATH_TIMING.EXHALE_DURATION;

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
  }, [isAnimating, cycles, onComplete, CYCLE_DURATION]);

  const handleStart = () => {
    setIsAnimating(true);
    setCurrentCycle(0);
  };

  const handleStop = () => {
    setIsAnimating(false);
  };

  return (
    <div className="relative flex items-center justify-center w-full min-h-100">
      {!isAnimating ? (
        <div className="relative">
          {/* Glow ring */}
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 0,
                pointerEvents: 'none',
              }}
              aria-hidden="true"
            >
              <div
                className="breathing-glow"
                style={{
                  width: '170px',
                  height: '170px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(96, 165, 250, 0.6) 0%, rgba(167, 139, 250, 0.4) 60%, transparent 100%)',
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Existing button */}
          <button
            className="flex justify-center items-center relative cursor-pointer"
            style={{
              padding: '20px',
              color: 'white',
              border: 0,
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: 'linear-gradient(to bottom right, #60a5fa, #a78bfa)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              zIndex: 10,
            }}
            onClick={handleStart}
          >
            {CONTENT.GROUNDING.START_BUTTON}
          </button>
        </div>
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
