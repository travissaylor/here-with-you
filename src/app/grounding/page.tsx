'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import GroundingScreen from '@/components/screens/GroundingScreen';
import { ROUTES } from '@/lib/constants';

export default function GroundingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo') || ROUTES.CHOOSE_SUPPORT;

  const handleComplete = () => {
    router.push(returnTo);
  };

  return <GroundingScreen onComplete={handleComplete} />;
}
