'use client';

import { Suspense } from 'react';
import PlaybackContent from './PlaybackContent';

export default function PlaybackPage() {
  return (
    <Suspense fallback={null}>
      <PlaybackContent />
    </Suspense>
  );
}
