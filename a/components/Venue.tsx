import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { GridPattern } from './Ornaments';

const ASSETS_BASE_URL = import.meta.env.VITE_ASSETS_BASE_URL || 'https://assets.shintahsan.my.id/';

export const Venue: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {

    // 3D Tilt Effect on Scroll
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.fromTo(cardRef.current,
        { rotateX: 0, scale: 0.95 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom bottom",
            scrub: true,
          },
          rotateX: 15,
          scale: 1,
          ease: "none"
        }
      );
    });

    mm.add("(max-width: 767px)", () => {
      const venueImg = cardRef.current?.querySelector('img');

      gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 70%",
          end: "center center",
          scrub: true,
        }
      })
        .fromTo(cardRef.current, { scale: 0.95, opacity: 0.8 }, { scale: 1, opacity: 1, duration: 1 })
        .to(venueImg, { scale: 1.05, grayscale: 0, duration: 1 }, 0);
    });

    gsap.from(contentRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center py-12 md:py-24 relative z-10" style={{ perspective: '1200px' }}>

      <GridPattern />

      <div className="mb-12 md:mb-16 text-center px-4 relative z-10">
        <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight text-white mb-3">Lokasi Acara</h2>
        <p className="text-zinc-500 text-sm md:text-lg tracking-[0.2em] uppercase font-serif italic text-gold-300">Makassar</p>
      </div>

      {/* 
         Card Container
      */}
      <div
        ref={cardRef}
        className="group relative w-[90%] max-w-5xl aspect-[4/5] md:aspect-[16/9] rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-white/10 bg-zinc-900 overflow-hidden
                   transform-gpu transition-all duration-700 ease-out will-change-transform
                   md:hover:!rotate-0 md:hover:!scale-[1.01] md:hover:shadow-3xl md:hover:border-gold-500/30"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Map Image */}
        <div className="absolute inset-0 bg-zinc-800 pointer-events-none">
          <img
            src={`${ASSETS_BASE_URL}bsw.png`}
            alt="Balai Sidang Bosowa 45"
            className="w-full h-full object-cover opacity-50 grayscale-[20%] md:group-hover:grayscale-0 md:group-hover:scale-105 transition-all duration-1000 will-change-transform"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
        </div>

        {/* Content UI */}
        <div ref={contentRef} className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end md:flex-row md:justify-between md:items-end gap-6 translate-z-10">

          {/* Address Card */}
          <div className="glass-strong p-6 rounded-2xl border border-white/10 w-full md:w-auto md:max-w-md shadow-xl backdrop-blur-xl">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-gold-400 to-gold-600 p-3 rounded-xl shadow-lg shadow-gold-500/20 text-black shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-display font-medium text-white leading-tight">Balai Sidang Bosowa 45</h3>
                <p className="text-zinc-300 text-xs md:text-sm mt-2 leading-relaxed font-serif">Jl. Urip Sumoharjo Km.4, Makassar</p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full md:w-auto bg-white text-black hover:bg-gold-50 px-8 py-4 rounded-full font-bold transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2 group/btn" onClick={() => window.open('https://maps.app.goo.gl/B7sTjcAzxrPrCsWv7', '_blank')}>
            <span className="font-display tracking-widest text-sm uppercase">Petunjuk Arah</span>
            <svg className="group-hover/btn:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};