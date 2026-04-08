import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LazyImage } from './LazyImage';

const ASSETS_BASE_URL = import.meta.env.VITE_ASSETS_BASE_URL || 'https://assets.shintahsan.my.id/';

export const Couple: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const brideRef = useRef<HTMLDivElement>(null);
  const groomRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(brideRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
      x: -50,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out"
    });

    gsap.from(groomRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
      x: 50,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
      delay: 0.2
    });
    // Mobile Scroll Animation
    const mm = gsap.matchMedia();
    mm.add("(max-width: 767px)", () => {
      // Find inside brideRef
      const brideImg = brideRef.current?.querySelector('img');
      const brideOverlay = brideRef.current?.querySelector('.mobile-overlay');

      if (brideImg && brideOverlay) {
        gsap.timeline({
          scrollTrigger: {
            trigger: brideRef.current,
            start: "top 60%",
            end: "center 40%",
            scrub: true
          }
        })
          .to(brideImg, { scale: 1.1, grayscale: 0, duration: 1 }, 0)
          .to(brideOverlay, { opacity: 1, duration: 1 }, 0);
      }

      // Find inside groomRef
      const groomImg = groomRef.current?.querySelector('img');
      const groomOverlay = groomRef.current?.querySelector('.mobile-overlay');

      if (groomImg && groomOverlay) {
        gsap.timeline({
          scrollTrigger: {
            trigger: groomRef.current,
            start: "top 60%",
            end: "center 40%",
            scrub: true
          }
        })
          .to(groomImg, { scale: 1.1, grayscale: 0, duration: 1 }, 0)
          .to(groomOverlay, { opacity: 1, duration: 1 }, 0);
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-zinc-950 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-6">The Couple</h2>
          <div className="w-px h-12 bg-gradient-to-b from-appleBlue to-transparent mx-auto"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-center justify-center">

          {/* Jane */}
          <div ref={brideRef} className="flex-1 max-w-md text-center md:text-right group">
            <div className="relative w-full aspect-[3/4] mb-8 overflow-hidden rounded-[2rem] border border-white/5 bg-zinc-900 shadow-2xl">
              <LazyImage
                src={`${ASSETS_BASE_URL}san.jpg`}
                alt="Ahsan Mubariz"
                className="w-full h-full object-cover transition-transform duration-1000 md:group-hover:scale-110 grayscale-[30%] md:hover:grayscale-0 will-change-transform"
              />
              <div className="mobile-overlay absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-end p-8">
              </div>
            </div>
            <h3 className="text-4xl md:text-5xl font-display font-medium text-white mb-4">Ahsan Mubariz, S.Tr.T.</h3>
            <p className="text-zinc-400 leading-relaxed font-serif text-lg italic opacity-80">
              Putra kedua dari Alm. Bapak H. Bahrum, S.E, M.Ak, Akt. & Ibu Prof. Dr. Hj. Darmawati H, M.HI.
            </p>
          </div>

          {/* Divider for desktop */}
          <div className="hidden md:block w-px h-[400px] bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

          {/* John */}
          <div ref={groomRef} className="flex-1 max-w-md text-center md:text-left group">
            <div className="relative w-full aspect-[3/4] mb-8 overflow-hidden rounded-[2rem] border border-white/5 bg-zinc-900 shadow-2xl">
              <LazyImage
                src={`${ASSETS_BASE_URL}sh.jpg`}
                alt="Shinta Oktaviani"
                className="w-full h-full object-cover transition-transform duration-1000 md:group-hover:scale-110 grayscale-[30%] md:hover:grayscale-0 will-change-transform"
              />
              <div className="mobile-overlay absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-start p-8">
              </div>
            </div>
            <h3 className="text-4xl md:text-5xl font-display font-medium text-white mb-4">Shinta Oktaviani Jaenudin, S.Farm.</h3>
            <p className="text-zinc-400 leading-relaxed font-serif text-lg italic opacity-80">
              Putri pertama dari Bapak H. Jeje Zaenudin & Ibu Hj. Idah Saidah.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};