
import React, { useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GOOGLE_CALENDAR_LINK } from '../constants';
import { generateShareCardA } from '../../utils/shareCard';

const ASSETS_BASE_URL = import.meta.env.VITE_ASSETS_BASE_URL || "";

interface HeroProps {
  onRSVP: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRSVP }) => {
  const queryParams = new URLSearchParams(window.location.search);
  const recipientName = queryParams.get('name');

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const introWrapperRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = React.useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [sharePreview, setSharePreview] = useState<{ url: string; blob: Blob } | null>(null);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();
    gsap.set(introWrapperRef.current, { opacity: 0, filter: 'blur(15px)', y: 60 });
    tl.to(introWrapperRef.current, {
      opacity: 1, filter: 'blur(0px)', y: 0,
      duration: 2, ease: 'power3.out', delay: 0.2
    });

    gsap.to(bgRef.current, {
      scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: true },
      yPercent: 30, scale: 1.1, ease: "none"
    });

    gsap.to(scrollWrapperRef.current, {
      scrollTrigger: { trigger: containerRef.current, start: "top top", end: "50% top", scrub: true },
      opacity: 0, y: -50, scale: 0.95, ease: "none"
    });
  }, { scope: containerRef });

  // Step 1: Generate the share card
  const handleCapture = useCallback(async () => {
    setIsCapturing(true);
    try {
      const blob = await generateShareCardA(recipientName);
      const url = URL.createObjectURL(blob);
      setSharePreview({ url, blob });
    } catch (error) {
      console.error('Error generating share card:', error);
    } finally {
      setIsCapturing(false);
    }
  }, [recipientName]);

  // Step 2: Share the captured image (called from a fresh user gesture on the preview overlay)
  const handleShareNow = useCallback(async () => {
    if (!sharePreview) return;

    const file = new File([sharePreview.blob], 'undangan-john-sarah.png', { type: 'image/png' });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: 'Undangan Pernikahan Ahsan & Shinta',
        });
      } catch {
        // User cancelled — that's fine
      }
    } else {
      const a = document.createElement('a');
      a.href = sharePreview.url;
      a.download = 'undangan-ahsan-shinta.png';
      a.click();
    }
  }, [sharePreview]);

  const handleClosePreview = useCallback(() => {
    if (sharePreview) {
      URL.revokeObjectURL(sharePreview.url);
      setSharePreview(null);
    }
  }, [sharePreview]);

  return (
    <>
      <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center z-10 bg-zinc-950">
        {/* Background Image */}
        <div ref={bgRef} className="absolute inset-0 w-full h-full z-0 will-change-transform">
          <video
            key={isMobile ? 'mobile' : 'desktop'}
            autoPlay loop muted playsInline preload="auto"
            className="w-full h-full object-cover opacity-60"
          >
            <source src={isMobile ? `${ASSETS_BASE_URL}bg_mobile.webm` : `${ASSETS_BASE_URL}bg.webm`} type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/30 via-zinc-950/20 to-zinc-950"></div>
        </div>

        {/* Content Wrapper */}
        <div ref={scrollWrapperRef} className="relative z-10 w-full max-w-5xl px-6 will-change-transform">
          <div ref={introWrapperRef} className="flex flex-col items-center text-center">
            <p className="text-xl md:text-2xl text-gold-400 mb-6 font-serif opacity-90">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
            </p>
            <p className="text-zinc-400 font-medium tracking-[0.5em] text-xs md:text-sm mb-10 uppercase drop-shadow-lg glass px-6 py-2 rounded-full text-gold-200">
              Perayaan Pernikahan
            </p>
            <h1 className="text-7xl md:text-9xl font-display font-medium tracking-tight text-white drop-shadow-2xl mix-blend-overlay opacity-90">
              John
              <span className="block text-4xl md:text-6xl font-serif italic text-gold-400 font-normal my-6 opacity-80">
                &
              </span>
              Sarah
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
                <span>12 Desember 2026</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
                <span>Jakarta</span>
              </div>

              <div className="flex gap-4">
                <a
                  href={GOOGLE_CALENDAR_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-zinc-900/40 hover:bg-zinc-900/60 text-white border border-white/10 px-8 py-4 rounded-full font-medium text-xs tracking-wider uppercase transition-all hover:scale-105 active:scale-95 flex items-center gap-2 backdrop-blur-md"
                >
                  <span>Kalender</span>
                </a>
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

        {/* Floating Share Button */}
        <button
          id="share-btn-a"
          onClick={handleCapture}
          disabled={isCapturing}
          className="absolute bottom-10 right-6 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-white w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 disabled:opacity-40"
          title="Bagikan ke Story"
        >
          {isCapturing ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          )}
        </button>

        <div id="scroll-indicator-a" className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-zinc-500">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </div>
      </section>

      {/* Share Preview Overlay */}
      {sharePreview && (
        <div className="fixed inset-0 z-[300] bg-zinc-950/95 backdrop-blur-lg flex flex-col items-center justify-between p-4 pt-12 pb-8 md:justify-center md:p-6">
          {/* Close button */}
          <button
            onClick={handleClosePreview}
            className="absolute top-4 right-4 text-zinc-400 hover:text-white w-10 h-10 rounded-full bg-zinc-800/60 flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Preview Image - constrained to fit mobile screens */}
          <div className="flex-1 flex items-center justify-center w-full max-w-sm md:max-w-md md:flex-none overflow-hidden">
            <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img src={sharePreview.url} alt="Preview undangan" className="w-full h-auto block" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full max-w-sm flex gap-3 mt-6">
            <button
              onClick={handleShareNow}
              className="flex-1 bg-white text-zinc-950 py-4 rounded-full font-display font-medium text-sm tracking-widest uppercase transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/10 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              Bagikan
            </button>
            <button
              onClick={handleClosePreview}
              className="bg-zinc-800 text-zinc-300 px-6 py-4 rounded-full font-display font-medium text-sm tracking-widest uppercase transition-all hover:bg-zinc-700 active:scale-95 flex items-center justify-center"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
};
