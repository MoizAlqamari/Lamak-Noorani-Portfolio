'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [isComplete, setIsComplete] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const angleRef = useRef(0);
  const progressRafRef = useRef<number>(0);
  const canvasRafRef = useRef<number>(0);
  const progressRef = useRef(0);
  const startTimeRef = useRef(0);

  // Smooth loading progress using requestAnimationFrame
  useEffect(() => {
    const duration = 2500;
    startTimeRef.current = performance.now();
    let running = true;

    const tick = (now: number) => {
      if (!running) return;
      const elapsed = now - startTimeRef.current;
      const raw = Math.min((elapsed / duration) * 100, 100);
      progressRef.current = raw;
      setProgress(raw);

      if (raw >= 100) {
        setIsComplete(true);
        // Wait 200ms for the 100% visual to settle, then trigger exit animation
        setTimeout(() => setShowContent(false), 200);
        return;
      }

      progressRafRef.current = requestAnimationFrame(tick);
    };

    progressRafRef.current = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(progressRafRef.current);
    };
  }, []);

  // Canvas animation loop — runs independently via requestAnimationFrame,
  // reads progressRef.current instead of depending on progress state
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 120;
    canvas.height = 120;

    let running = true;

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, 120, 120);

      angleRef.current += 0.025;
      const angle = angleRef.current;
      const pct = progressRef.current / 100;

      // Outer rotating ring — full circle sweep as progress grows
      ctx.beginPath();
      ctx.arc(60, 60, 50, angle, angle + pct * Math.PI * 2);
      ctx.strokeStyle = '#EF7373';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Inner ring — counter-rotating, partial sweep
      ctx.beginPath();
      ctx.arc(60, 60, 38, -angle * 0.7, -angle * 0.7 + pct * Math.PI * 1.5);
      ctx.strokeStyle = '#BECAF1';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Pulsing center dot
      const pulseRadius = 2 + Math.sin(angle * 3) * 1.2;
      ctx.beginPath();
      ctx.arc(60, 60, pulseRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#E4DBC2';
      ctx.fill();

      canvasRafRef.current = requestAnimationFrame(draw);
    };

    canvasRafRef.current = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(canvasRafRef.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {showContent && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            clipPath: 'circle(0% at 50% 50%)',
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-[#2A281B] flex flex-col items-center justify-center"
        >
          {/* Background blur effects */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#691F1F]/20 blur-[120px]"
            />
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-1/3 right-1/4 w-[250px] h-[250px] rounded-full bg-[#2E2E46]/30 blur-[100px]"
            />
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-1/3 left-1/4 w-[200px] h-[200px] rounded-full bg-[#BECAF1]/10 blur-[90px]"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center gap-8"
          >
            {/* Canvas animation */}
            <div className="relative">
              <canvas
                ref={canvasRef}
                className="w-[120px] h-[120px]"
              />
              {/* Spinning ring overlay for extra depth */}
              <motion.div
                className="absolute inset-0 rounded-full border border-[#E4DBC2]/5"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* Logo text */}
            <motion.div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-2xl md:text-3xl font-bold tracking-[0.3em] uppercase text-[#E4DBC2]"
                style={{ fontFamily: 'Barlow, sans-serif' }}
              >
                Lamak Noorani
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-[10px] tracking-[0.5em] text-[#EF7373]/70 mt-2 uppercase"
              >
                Films & Studios
              </motion.p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="w-48"
            >
              <div className="h-[1px] w-full bg-[#E4DBC2]/10 relative overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#EF7373] via-[#BECAF1] to-[#E4DBC2]"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                />
              </div>
              <motion.p
                className="text-xs text-[#E4DBC2]/50 text-center mt-3 tracking-widest font-mono"
                animate={{
                  opacity: isComplete ? 0 : 0.5,
                  y: isComplete ? -5 : 0,
                }}
                transition={{ duration: 0.4 }}
              >
                {Math.round(progress)}%
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
