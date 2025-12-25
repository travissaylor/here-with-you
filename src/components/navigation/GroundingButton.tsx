'use client'

import { motion } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'
import { ROUTES } from '@/lib/constants'

export function GroundingButton() {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = () => {
    router.push(`${ROUTES.HOME}?returnTo=${pathname}`)
  }

  return (
    <motion.button
      onClick={handleClick}
      className="absolute top-6 right-6 z-10 w-7 h-7 rounded-full bg-purple-400/60 cursor-pointer transition-opacity hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 0.9, 0.5],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileTap={{ scale: 0.95 }}
      aria-label="Return to Grounding"
      title="Return to Grounding"
    />
  )
}
