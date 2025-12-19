'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Play, Pause, ArrowLeft } from 'lucide-react';
import type { Message, Contributor } from '@/lib/types';
import { CONTENT } from '@/lib/constants';
import { formatDuration } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface MessagePlaybackProps {
  message: Message;
  contributor: Contributor;
  onComplete?: () => void;
  onBack?: () => void;
}

export default function MessagePlayback({
  message,
  contributor,
  onComplete,
  onBack,
}: MessagePlaybackProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(message.duration || 0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

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
      // Auto-advance to soft landing after a brief moment
      if (onComplete) {
        setTimeout(() => {
          onComplete();
        }, 1000);
      }
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
    <div className="relative flex flex-col min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
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

        {/* Audio Controls */}
        {!isLoading && !hasError && (
          <div className="w-full max-w-sm">
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
          </div>
        )}
      </div>

      {/* Bottom spacer */}
      <div className="pb-12" />
    </div>
  );
}
