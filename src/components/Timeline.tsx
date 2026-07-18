'use client';

import { useEffect, useRef, useState } from 'react';

export default function Timeline() {
  const pathRef = useRef<SVGPathElement>(null);
  const outerDotRef = useRef<SVGCircleElement>(null);
  const innerDotRef = useRef<SVGCircleElement>(null);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (!pathRef.current) return;
    const length = pathRef.current.getTotalLength();
    setPathLength(length);
    pathRef.current.style.strokeDashoffset = String(length);

    const handleScroll = () => {
      if (!pathRef.current || !outerDotRef.current || !innerDotRef.current) return;
      const scrollProgress = Math.min(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight), 1);
      const drawLength = length * scrollProgress;
      pathRef.current.style.strokeDasharray = `${drawLength} ${length}`;
      
      // Update dot position
      try {
        const point = pathRef.current.getPointAtLength(drawLength);
        outerDotRef.current.setAttribute('cy', String(point.y));
        innerDotRef.current.setAttribute('cy', String(point.y));
      } catch {}
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed left-8 top-0 h-full z-10 pointer-events-none hidden lg:block">
      <svg
        className="h-full"
        width="4"
        viewBox="0 0 4 5000"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EF7373" stopOpacity="0.6" />
            <stop offset="25%" stopColor="#BECAF1" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#E4DBC2" stopOpacity="0.6" />
            <stop offset="75%" stopColor="#EF7373" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#BECAF1" stopOpacity="0.7" />
          </linearGradient>
          <filter id="timelineGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Background line (faded) */}
        <path
          d="M2 0 C2 200, 3 400, 2 700 C1 1000, 3 1300, 2 1600 C1 1900, 3 2200, 2 2500 C1 2800, 3 3100, 2 3400 C1 3700, 3 4000, 2 4300 C1 4600, 3 4800, 2 5000"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.2"
        />
        {/* Main animated path */}
        <path
          ref={pathRef}
          d="M2 0 C2 200, 3 400, 2 700 C1 1000, 3 1300, 2 1600 C1 1900, 3 2200, 2 2500 C1 2800, 3 3100, 2 3400 C1 3700, 3 4000, 2 4300 C1 4600, 3 4800, 2 5000"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#timelineGlow)"
          fill="none"
          style={{
            strokeDasharray: `0 ${pathLength}`,
            transition: 'stroke-dasharray 0.15s ease-out',
          }}
        />
        {/* Glow dot */}
        <circle
          ref={outerDotRef}
          cx="2"
          cy="0"
          r="4"
          fill="#EF7373"
          opacity="0.9"
          filter="url(#timelineGlow)"
        />
        {/* Inner dot */}
        <circle
          ref={innerDotRef}
          cx="2"
          cy="0"
          r="2"
          fill="#E4DBC2"
        />
      </svg>
    </div>
  );
}