'use client';

import { motion } from 'framer-motion';

export default function Background() {
  return (
    <>
      {/* Animated gradient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 30, 0, -20, 0],
            y: [0, -30, 0, 20, 0],
            scale: [1, 1.1, 0.9, 1.05, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#691F1F]/20 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -20, 0, 30, 0],
            y: [0, 20, 0, -30, 0],
            scale: [1, 0.9, 1.05, 1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-[30%] right-[-15%] w-[50%] h-[50%] rounded-full bg-[#2E2E46]/30 blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -20, 0, 30, 0],
            y: [0, 20, 0, -30, 0],
            scale: [1, 1.05, 0.9, 1, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute bottom-[-20%] left-[20%] w-[55%] h-[55%] rounded-full bg-[#691F1F]/15 blur-[140px]"
        />
      </div>

      {/* Grain texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </>
  );
}
