'use client';

import { useState } from 'react';
import GroundingScreen from '@/components/screens/GroundingScreen';
import ChooseSupport from '@/components/screens/ChooseSupport';
import { MOCK_CONTRIBUTORS } from '@/lib/constants';
import type { ScreenState, Message, Contributor } from '@/lib/types';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('grounding');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [selectedContributor, setSelectedContributor] = useState<Contributor | null>(null);

  const handleGroundingComplete = () => {
    setCurrentScreen('choose-support');
  };

  const handleSelectMessage = (message: Message, contributor: Contributor) => {
    setSelectedMessage(message);
    setSelectedContributor(contributor);
    // TODO: Navigate to playback screen when implemented
    console.log('Selected message:', message, 'from contributor:', contributor);
  };

  return (
    <main>
      {currentScreen === 'grounding' && (
        <GroundingScreen onComplete={handleGroundingComplete} />
      )}

      {currentScreen === 'choose-support' && (
        <ChooseSupport
          contributors={MOCK_CONTRIBUTORS}
          onSelectMessage={handleSelectMessage}
        />
      )}

      {/* TODO: Add playback and soft-landing screens */}
    </main>
  );
}
