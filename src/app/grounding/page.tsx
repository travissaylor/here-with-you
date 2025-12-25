'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import GroundingScreen from '@/components/screens/GroundingScreen';
import { ROUTES } from '@/lib/constants';

function GroundingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo') || ROUTES.CHOOSE_SUPPORT;

  const handleComplete = () => {
    router.push(returnTo);
  };

  return <GroundingScreen onComplete={handleComplete} />;
}

export default function GroundingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GroundingContent />
    </Suspense>
  );
}
