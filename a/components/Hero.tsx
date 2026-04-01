
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GOOGLE_CALENDAR_LINK } from '../constants';

const ASSETS_BASE_URL = import.meta.env.VITE_ASSETS_BASE_URL || 'https://assets.shintahsan.my.id/';

interface HeroProps {
  onRSVP: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRSVP }) => {
  const queryParams = new URLSearchParams(window.location.search);
  const recipientName = queryParams.get('name');

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null); // Controls Scroll Fade Out
  const introWrapperRef = useRef<HTMLDivElement>(null);  // Controls Initial Fade In
  const bgRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useGSAP(() => {

    // 1. Intro Animation (Runs once on mount)
    const tl = gsap.timeline();

    gsap.set(introWrapperRef.current, { opacity: 0, filter: 'blur(15px)', y: 60 });

    tl.to(introWrapperRef.current, {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      duration: 2,
      ease: 'power3.out',
      delay: 0.2
    });

    // 2. Scroll Parallax & Fade Out

    // Background Parallax
    gsap.to(bgRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      yPercent: 30, // Move background down slower than scroll
      scale: 1.1,
      ease: "none"
    });

    // Text Fade Out on Scroll
    gsap.to(scrollWrapperRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "50% top", // Fade out halfway through scrolling the hero
        scrub: true,
      },
      opacity: 0,
      y: -50,
      scale: 0.95,
      ease: "none"
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center z-10 bg-zinc-950">
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full z-0 will-change-transform"
      >
        <video
          key={isMobile ? 'mobile' : 'desktop'}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-60"
        >
          <source src={isMobile ? `${ASSETS_BASE_URL}bg_mobile.webm` : `${ASSETS_BASE_URL}bg.webm`} type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/30 via-zinc-950/20 to-zinc-950"></div>
      </div>

      {/* Content Wrapper */}
      <div
        ref={scrollWrapperRef}
        className="relative z-10 w-full max-w-5xl px-6 will-change-transform"
      >
        <div ref={introWrapperRef} className="flex flex-col items-center text-center">
          <p className="text-xl md:text-2xl text-gold-400 mb-6 font-serif opacity-90">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </p>
          <p className="text-zinc-400 font-medium tracking-[0.5em] text-xs md:text-sm mb-10 uppercase drop-shadow-lg glass px-6 py-2 rounded-full text-gold-200">
            Perayaan Pernikahan
          </p>
          <h1 className="text-7xl md:text-9xl font-display font-medium tracking-tight text-white drop-shadow-2xl mix-blend-overlay opacity-90">
            Ahsan
            <span className="block text-4xl md:text-6xl font-serif italic text-gold-400 font-normal my-6 opacity-80">
              &
            </span>
            Shinta
          </h1>
          {recipientName && (
            <div className="mt-12 mb-4 flex flex-col items-center z-20">
              <p className="text-zinc-300 text-xs tracking-[0.2em] uppercase mb-2">Kepada Yth.</p>
              <h2 className="text-3xl md:text-4xl text-white font-serif italic">{recipientName}</h2>
            </div>
          )}

          <div className={`${recipientName ? 'mt-8' : 'mt-16'} flex flex-col md:flex-row items-center gap-6`}>

            {/* Date Pill */}
            <div className="flex items-center gap-6 text-zinc-200 text-xs md:text-sm tracking-widest uppercase font-medium glass px-8 py-4 rounded-full">
              <span>2 Juni 2026</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
              <span>Makassar</span>
            </div>

            <div className="flex gap-4">
              {/* Calendar Button */}
              <a
                href={GOOGLE_CALENDAR_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-zinc-900/40 hover:bg-zinc-900/60 text-white border border-white/10 px-8 py-4 rounded-full font-medium text-xs tracking-wider uppercase transition-all hover:scale-105 active:scale-95 flex items-center gap-2 backdrop-blur-md"
              >
                <span>Kalender</span>
              </a>

              {/* Hero RSVP Button - Primary Access Point */}
              <button
                onClick={onRSVP}
                className="bg-zinc-50 text-zinc-950 px-8 py-4 rounded-full font-medium text-xs tracking-wider uppercase transition-all hover:bg-white hover:scale-105 active:scale-95 flex items-center gap-2 shadow-xl shadow-white/5"
              >
                <span>Konfirmasi</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-zinc-500">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </div>
    </section>
  );
};
