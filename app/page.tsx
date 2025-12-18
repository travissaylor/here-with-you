'use client';

import GroundingScreen from '@/components/screens/GroundingScreen';

export default function Home() {
  const handleGroundingComplete = () => {
    console.log('Grounding complete - will navigate to next screen');
  };

  return (
    <main>
      <GroundingScreen onComplete={handleGroundingComplete} />
    </main>
  );
}
