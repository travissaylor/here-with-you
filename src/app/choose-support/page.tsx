'use client';

import { useRouter } from 'next/navigation';
import ChooseSupport from '@/components/screens/ChooseSupport';
import { MOCK_CONTRIBUTORS, ROUTES } from '@/lib/constants';
import type { Message, Contributor } from '@/lib/types';

export default function ChooseSupportPage() {
  const router = useRouter();

  const handleSelectMessage = (message: Message, contributor: Contributor) => {
    const url = `${ROUTES.PLAYBACK}?contributor=${contributor.id}&message=${message.id}`;
    router.push(url);
  };

  return (
    <ChooseSupport
      contributors={MOCK_CONTRIBUTORS}
      onSelectMessage={handleSelectMessage}
    />
  );
}
