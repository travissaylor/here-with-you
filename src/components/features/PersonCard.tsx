'use client';

import Image from 'next/image';
import { Contributor } from '@/lib/types';
import { cn, hasMultipleMessages } from '@/lib/utils';

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

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'group relative flex flex-col items-center',
        'w-full p-6 rounded-lg',
        'bg-white/50 backdrop-blur-sm',
        'shadow-sm hover:shadow-md',
        'transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        isSelected && 'ring-2 ring-purple-500 shadow-lg'
      )}
      aria-label={`Select ${contributor.name}`}
    >
      <div className={cn(
        'relative w-24 h-24 rounded-full overflow-hidden mb-3',
        'transition-transform duration-300',
        'group-hover:scale-105',
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
