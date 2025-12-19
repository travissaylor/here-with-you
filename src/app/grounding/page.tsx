'use client';

import { useRouter } from 'next/navigation';
import GroundingScreen from '@/components/screens/GroundingScreen';
import { ROUTES } from '@/lib/constants';

export default function GroundingPage() {
  const router = useRouter();

  const handleComplete = () => {
    router.push(ROUTES.CHOOSE_SUPPORT);
  };

  return <GroundingScreen onComplete={handleComplete} />;
}
