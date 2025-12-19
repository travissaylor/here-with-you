'use client';

import { useState } from 'react';
import GroundingScreen from '@/components/screens/GroundingScreen';
import ChooseSupport from '@/components/screens/ChooseSupport';
import MessagePlayback from '@/components/screens/MessagePlayback';
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
    setCurrentScreen('playback');
  };

  const handlePlaybackComplete = () => {
    // TODO: Navigate to soft-landing screen when implemented
    setCurrentScreen('soft-landing');
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

      {currentScreen === 'playback' && selectedMessage && selectedContributor && (
        <MessagePlayback
          message={selectedMessage}
          contributor={selectedContributor}
          onComplete={handlePlaybackComplete}
        />
      )}

      {/* TODO: Add soft-landing screen */}
    </main>
  );
}
