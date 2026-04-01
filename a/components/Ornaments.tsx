import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const NoiseOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
};

export const AmbientOrbs: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animate orbs floating
    gsap.to('.orb-float', {
      y: -50,
      x: 30,
      rotation: 360,
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        amount: 5,
        from: "random"
      }
    });

    // Pulse opacity
    gsap.to('.orb-float', {
      opacity: 0.4,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        amount: 4,
        from: "random"
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Top Left - Blue */}
      <div className="orb-float absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-blue-900/20 blur-[100px] mix-blend-screen" />

      {/* Bottom Right - Purple */}
      <div className="orb-float absolute -bottom-[10%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-purple-900/10 blur-[120px] mix-blend-screen" />

      {/* Center - Subtle White/Zinc */}
      <div className="orb-float absolute top-[40%] left-[30%] w-[30vw] h-[30vw] rounded-full bg-zinc-800/20 blur-[80px] mix-blend-screen" />
    </div>
  );
};

export const GridPattern: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
    style={{
      backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
      backgroundSize: '4rem 4rem'
    }}
  />
);