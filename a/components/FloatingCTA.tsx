
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface FloatingCTAProps {
  onOpen: () => void;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({ onOpen }) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {

    // Initially hidden below screen
    gsap.set(btnRef.current, { y: 100, opacity: 0 });

    // Slide up when scrolling past 200px
    ScrollTrigger.create({
      trigger: 'body',
      start: "200px top",
      onEnter: () => gsap.to(btnRef.current, { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.5)" }),
      onLeaveBack: () => gsap.to(btnRef.current, { y: 100, opacity: 0, duration: 0.3, ease: "power2.in" })
    });

  });

  return (
    <button
      ref={btnRef}
      onClick={onOpen}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 group"
    >
      <div className="relative bg-white/90 hover:bg-white backdrop-blur-xl text-black px-8 py-4 rounded-full shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.5)] flex items-center gap-3">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-appleBlue opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-appleBlue"></span>
        </span>
        <span className="font-semibold tracking-tight text-sm uppercase">RSVP Now</span>
        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </button>
  );
};
