'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Contributor, Message } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { cn, formatMessageDuration, getRandomMessageFromContributor } from '@/lib/utils';
import { CONTENT } from '@/lib/constants';

interface MessageListScreenProps {
  contributor: Contributor;
  onSelectMessage: (message: Message) => void;
  onBack: () => void;
}

export default function MessageListScreen({
  contributor,
  onSelectMessage,
  onBack
}: MessageListScreenProps) {
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);

  const handleRandomMessage = () => {
    const message = getRandomMessageFromContributor(contributor);
    if (message) {
      setSelectedMessageId(message.id);
      onSelectMessage(message);
    }
  };

  const handleMessageSelect = (message: Message) => {
    setSelectedMessageId(message.id);
    onSelectMessage(message);
  };

  const messageCount = contributor.messages.length;
  const messageText = messageCount === 1
    ? CONTENT.MESSAGE_LIST.SINGLE_MESSAGE
    : CONTENT.MESSAGE_LIST.MULTIPLE_MESSAGES(messageCount);

  return (
    <div className="relative flex flex-col min-h-dvh bg-blue-50">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 text-gray-600 hover:text-gray-800 transition-colors z-10"
        aria-label="Go back to choose support"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* Header Section */}
      <div className="pt-16 pb-8 text-center px-6">
        {/* Contributor Photo */}
        <div className="flex justify-center mb-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-md">
            <Image
              src={contributor.photoPath}
              alt={contributor.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-light text-gray-700 mb-1">
          {contributor.name}
        </h1>
        <p className="text-sm text-gray-600">
          {messageText}
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-6 pb-12">
        {/* Random Button */}
        <div className="w-full max-w-sm mb-6">
          <Button
            onClick={handleRandomMessage}
            className="w-full h-12"
            size="lg"
          >
            {CONTENT.MESSAGE_LIST.RANDOM_BUTTON}
          </Button>
        </div>

        {/* Divider */}
        <p className="text-sm text-gray-500 mb-4">{CONTENT.MESSAGE_LIST.CHOOSE_LABEL}</p>

        {/* Message List */}
        <div className="w-full max-w-sm space-y-3">
          {contributor.messages.map((message) => (
            <button
              key={message.id}
              onClick={() => handleMessageSelect(message)}
              className={cn(
                'w-full p-4 rounded-lg',
                'bg-white/60 backdrop-blur-sm',
                'shadow-sm hover:shadow-md',
                'transition-all duration-300',
                'hover:-translate-y-0.5',
                'focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2',
                'flex items-center justify-between',
                'text-left',
                selectedMessageId === message.id && 'ring-2 ring-purple-500 shadow-lg'
              )}
              aria-label={`Play message: ${message.title}`}
            >
              <div className="flex-1">
                <p className="text-base font-medium text-gray-700 mb-1">
                  {message.title}
                </p>
                <p className="text-sm text-gray-500">
                  {formatMessageDuration(message.duration)}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-3" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
