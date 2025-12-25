'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Play, Pause, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Message, Contributor } from '@/lib/types';
import { CONTENT, ANIMATION } from '@/lib/constants';
import { formatDuration } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const groundingContentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 }
  }
} as const;

interface MessagePlaybackProps {
  message: Message;
  contributor: Contributor;
  onComplete?: () => void; // Keep for backwards compatibility but won't use
  onBack?: () => void;
  onNextMessage?: () => void;
  hasMultipleMessages?: boolean;
}

export default function MessagePlayback({
  message,
  contributor,
  onComplete,
  onBack,
  onNextMessage,
  hasMultipleMessages,
}: MessagePlaybackProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(message.duration || 0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showGroundingContent, setShowGroundingContent] = useState(false);

  // Reset state when message changes (for "Next message" navigation)
  useEffect(() => {
    setShowGroundingContent(false);
    setIsLoading(true);
    setHasError(false);
    setCurrentTime(0);
    setIsPlaying(false);

    // Reload the audio element to trigger loadedmetadata event
    const audio = audioRef.current;
    if (audio) {
      audio.load();
    }
  }, [message.id]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);

      // Attempt autoplay if allowed by browser
      audio.play().catch(() => {
        // Autoplay was blocked, user will need to click play
        setIsPlaying(false);
      });
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setTimeout(() => {
        setShowGroundingContent(true);
      }, 500);
    };

    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [onComplete]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.error('Error playing audio:', error);
        setHasError(true);
      });
    }
  };

  const handleReplay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setShowGroundingContent(false);
    setTimeout(() => {
      audio.currentTime = 0;
      audio.play().catch((error) => {
        console.error('Error replaying audio:', error);
        setHasError(true);
      });
    }, ANIMATION.FADE_DURATION);
  };

  const handleNextMessage = () => {
    if (!onNextMessage) return;
    setShowGroundingContent(false);
    setTimeout(() => {
      onNextMessage();
    }, ANIMATION.FADE_DURATION);
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const progressBar = progressBarRef.current;
    if (!audio || !progressBar || duration === 0) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;

    audio.currentTime = newTime;
  };

  const handleProgressBarTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const progressBar = progressBarRef.current;
    if (!audio || !progressBar || duration === 0) return;

    const touch = e.touches[0];
    const rect = progressBar.getBoundingClientRect();
    const touchX = touch.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, touchX / rect.width));
    const newTime = percentage * duration;

    audio.currentTime = newTime;
  };

  // Calculate progress percentage
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative flex flex-col min-h-dvh bg-blue-50">
      {/* Audio element */}
      <audio
        ref={audioRef}
        src={message.audioPath}
        preload="auto"
      />

      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-6 left-6 text-gray-600 hover:text-gray-800 transition-colors z-10"
          aria-label="Go back to choose support"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      )}

      {/* Header Section */}
      <div className="pt-16 pb-8 text-center px-6">
        <p className="text-base text-gray-600">
          {CONTENT.PLAYBACK.TITLE}
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Contributor Photo */}
        <div className="mb-8">
          <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-lg">
            <Image
              src={contributor.photoPath}
              alt={contributor.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Contributor Name */}
        <h2 className="text-3xl font-light text-gray-700 mb-8">
          {contributor.name}
        </h2>

        {/* Error State */}
        {hasError && (
          <div className="mb-8 text-center">
            <p className="text-red-600 mb-4">Unable to load audio</p>
            <Button
              onClick={() => {
                setHasError(false);
                setIsLoading(true);
                audioRef.current?.load();
              }}
              variant="outline"
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && !hasError && (
          <div className="mb-8">
            <p className="text-gray-600">Loading message...</p>
          </div>
        )}

        {/* Audio Controls or Grounding Content */}
        {!isLoading && !hasError && (
          <div className="w-full max-w-sm">
            <AnimatePresence mode="wait">
              {!showGroundingContent ? (
                <motion.div
                  key="audio-controls"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Play/Pause Button */}
                  <div className="flex justify-center mb-6">
                    <button
                      onClick={togglePlayPause}
                      className="w-20 h-20 rounded-full bg-gray-700 hover:bg-gray-800 transition-colors flex items-center justify-center shadow-lg"
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <Pause className="w-8 h-8 text-white" fill="white" />
                      ) : (
                        <Play className="w-8 h-8 text-white ml-1" fill="white" />
                      )}
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div
                      ref={progressBarRef}
                      className="w-full h-3 bg-gray-300 rounded-full overflow-hidden cursor-pointer hover:bg-gray-400 transition-colors"
                      onClick={handleProgressBarClick}
                      onTouchStart={handleProgressBarTouch}
                      onTouchMove={handleProgressBarTouch}
                      role="slider"
                      aria-label="Audio progress"
                      aria-valuemin={0}
                      aria-valuemax={duration}
                      aria-valuenow={currentTime}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        const audio = audioRef.current;
                        if (!audio) return;

                        if (e.key === 'ArrowLeft') {
                          audio.currentTime = Math.max(0, currentTime - 5);
                        } else if (e.key === 'ArrowRight') {
                          audio.currentTime = Math.min(duration, currentTime + 5);
                        }
                      }}
                    >
                      <div
                        className="h-full bg-gray-700 transition-all duration-100"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Time Display */}
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{formatDuration(currentTime)}</span>
                    <span>{formatDuration(duration)}</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="grounding-content"
                  variants={groundingContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-center"
                >
                  {/* Grounding Words */}
                  <div className="mb-8">
                    <h2 className="text-3xl font-light text-gray-700 mb-3">
                      {CONTENT.PLAYBACK.GROUNDING_TITLE}
                    </h2>
                    <p className="text-xl text-gray-600">
                      {CONTENT.PLAYBACK.GROUNDING_SUBTITLE}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 w-full">
                    {/* Next Message Button - Only show if contributor has multiple messages */}
                    {hasMultipleMessages && (
                      <Button
                        onClick={handleNextMessage}
                        size="lg"
                        className="w-full"
                      >
                        Next message from {contributor.name}
                      </Button>
                    )}

                    {/* Replay Button */}
                    <Button
                      onClick={handleReplay}
                      size="lg"
                      className="w-full"
                      variant={hasMultipleMessages ? "outline" : "default"}
                    >
                      Replay this message
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Bottom spacer */}
      <div className="pb-16" />
    </div>
  );
}
