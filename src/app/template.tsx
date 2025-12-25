'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { GroundingButton } from '@/components/navigation/GroundingButton';
import { ROUTES } from '@/lib/constants';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Show GroundingButton on all pages except home and grounding
  const showGroundingButton = pathname !== ROUTES.HOME && pathname !== ROUTES.GROUNDING;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.4
      }}
    >
      {showGroundingButton && <GroundingButton />}
      {children}
    </motion.div>
  );
}
