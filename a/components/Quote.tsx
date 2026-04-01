import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { QURAN_VERSE } from '../constants';

export const Quote: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const arabicRef = useRef<HTMLParagraphElement>(null);
  const englishRef = useRef<HTMLParagraphElement>(null);
  const ornamentRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
      }
    });

    // Text Reveal
    tl.from(arabicRef.current, {
      y: 40,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out"
    })
      .from(englishRef.current, {
        y: 30,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out"
      }, "-=1");

    // Ornament Rotation
    gsap.to(ornamentRef.current, {
      rotation: 360,
      duration: 60,
      repeat: -1,
      ease: "linear"
    });

    // Ornament Parallax
    gsap.fromTo(ornamentRef.current,
      { y: -50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        y: 50,
        opacity: 0.1, // Keep it subtle
        ease: "none"
      }
    );

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="min-h-[70vh] flex items-center justify-center py-24 px-6 relative z-20 overflow-hidden">

      {/* Geometric Ornament Background */}
      <svg
        ref={ornamentRef}
        className="absolute z-0 text-white opacity-5 w-[150vw] md:w-[60vw] max-w-none pointer-events-none will-change-transform"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.2"
      >
        <circle cx="50" cy="50" r="40" />
        <path d="M50 10 L90 50 L50 90 L10 50 Z" />
        <path d="M50 10 L50 90 M10 50 L90 50" />
        <circle cx="50" cy="50" r="25" />
        <path d="M22 22 L78 78 M78 22 L22 78" />
        <rect x="35" y="35" width="30" height="30" transform="rotate(45 50 50)" />
      </svg>

      <div className="max-w-3xl text-center space-y-10 relative z-10">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-appleBlue to-transparent mx-auto mb-10 opacity-50"></div>

        <p
          ref={arabicRef}
          className="text-4xl md:text-6xl font-serif leading-relaxed text-zinc-100 drop-shadow-2xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {QURAN_VERSE.arabic}
        </p>

        <div ref={englishRef} className="space-y-6">
          <p className="text-zinc-300 text-lg md:text-2xl font-light leading-relaxed tracking-wide italic font-serif">
            "{QURAN_VERSE.english}"
          </p>
          <div className="flex items-center justify-center gap-4 mt-8 opacity-60">
            <span className="h-px w-12 bg-gold-500/50"></span>
            <p className="text-gold-400 text-xs uppercase tracking-[0.3em] font-medium">
              {QURAN_VERSE.reference}
            </p>
            <span className="h-px w-12 bg-gold-500/50"></span>
          </div>
        </div>
      </div>
    </section>
  );
};