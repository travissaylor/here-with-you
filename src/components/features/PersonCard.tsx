'use client';

import Image from 'next/image';
import { Contributor } from '@/lib/types';
import { cn, hasMultipleMessages } from '@/lib/utils';
import { CONTENT } from '@/lib/constants';

interface PersonCardProps {
  contributor: Contributor;
  onClick: () => void;
  isSelected?: boolean;
  disabled?: boolean;
  showMessageCount?: boolean;
}

export default function PersonCard({
  contributor,
  onClick,
  isSelected = false,
  disabled = false,
  showMessageCount = true
}: PersonCardProps) {
  const hasMultiple = hasMultipleMessages(contributor);
  const messageCount = contributor.messages.length;
  const hasNoMessages = messageCount === 0;

  return (
    <button
      onClick={onClick}
      disabled={disabled || hasNoMessages}
      className={cn(
        'group relative flex flex-col items-center',
        'w-full p-6 rounded-lg',
        'bg-white/50 backdrop-blur-sm',
        'shadow-sm hover:shadow-md',
        'transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-sm',
        isSelected && 'ring-2 ring-purple-500 shadow-lg'
      )}
      aria-label={hasNoMessages ? `${contributor.name} - Coming soon` : `Select ${contributor.name}`}
    >
      <div className="relative mb-3">
        <div className={cn(
          'w-24 h-24 rounded-full overflow-hidden',
          'transition-transform duration-300',
          !hasNoMessages && 'group-hover:scale-105',
          'shadow-md'
        )}>
          <Image
            src={contributor.photoPath}
            alt={contributor.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 96px, 96px"
          />
        </div>
        {hasNoMessages && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
            <div
              className="px-2.5 py-1 rounded-full bg-purple-400/90 backdrop-blur-sm shadow-md"
              aria-hidden="true"
            >
              <span className="text-xs font-medium text-white whitespace-nowrap">
                {CONTENT.COMING_SOON.BADGE_TEXT}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="relative">
        <span className="text-base font-medium text-gray-700">
          {contributor.name}
        </span>
        {hasMultiple && showMessageCount && (
          <div
            className="absolute -right-6 top-1/2 -translate-y-1/2 flex gap-0.5 opacity-0 group-hover:opacity-70 group-focus:opacity-70 transition-opacity duration-300"
            aria-label={`${messageCount} messages`}
            title={`${messageCount} messages`}
          >
            {Array.from({ length: Math.min(messageCount, 3) }).map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-purple-400" />
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
