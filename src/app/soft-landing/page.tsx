'use client';

import { useRouter } from 'next/navigation';
import SoftLandingScreen from '@/components/screens/SoftLandingScreen';
import { ROUTES } from '@/lib/constants';

export default function SoftLandingPage() {
  const router = useRouter();

  const handleListenAgain = () => {
    router.push(ROUTES.CHOOSE_SUPPORT);
  };

  const handleDone = () => {
    router.push(ROUTES.HOME);
  };

  return (
    <SoftLandingScreen
      onListenAgain={handleListenAgain}
      onDone={handleDone}
    />
  );
}
