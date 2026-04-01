import React, { useState, useEffect, useRef } from 'react';
import { WEDDING_DATE } from '../constants';
import { TimeLeft } from '../types';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const staticRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);

  // Timer Logic
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(WEDDING_DATE) - +new Date();
      let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return timeLeft;
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Animation Logic: Cross-fade between Static and Floating
  useGSAP(() => {

    // 1. Static Content Animation (Enter)
    gsap.fromTo(staticRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "center center",
          scrub: true
        }
      }
    );

    // 2. Floating Widget Control
    // Initially hidden, positioned off-screen
    gsap.set(floatingRef.current, {
      yPercent: 120, // Push completely off screen
      opacity: 0,
      autoAlpha: 0
    });

    // Show floating widget when static section leaves viewport
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "bottom bottom", // When bottom of section hits bottom of viewport
      onEnter: () => gsap.to(floatingRef.current, {
        yPercent: 0,
        opacity: 1,
        autoAlpha: 1,
        duration: 0.6,
        ease: "back.out(1.2)"
      }),
      onLeaveBack: () => gsap.to(floatingRef.current, {
        yPercent: 120,
        opacity: 0,
        autoAlpha: 0,
        duration: 0.4,
        ease: "power3.in"
      })
    });

  }, { scope: sectionRef });

  const formatNum = (num: number) => num.toString().padStart(2, '0');

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-[60vh] md:h-[80vh] w-full flex items-center justify-center py-20 overflow-visible z-40"
      >
        {/* 1. STATIC HERO COUNTDOWN (Large) */}
        <div
          ref={staticRef}
          className="relative z-10 w-full max-w-4xl px-4 md:px-6 will-change-transform"
        >
          <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden p-6 md:p-12">
            {/* Decorative Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-gold-400/20 blur-[100px] -z-10"></div>

            {/* Gradient Overlay for texture */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

            <div className="text-center mb-10 md:mb-12 relative z-10">
              <h3 className="text-gold-200 font-display text-sm md:text-xl tracking-[0.3em] uppercase">Menuju Hari Bahagia</h3>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent mx-auto mt-4"></div>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-12 relative z-10">
              {/* Days */}
              <div className="flex flex-col items-center">
                <span className="text-4xl md:text-7xl font-display text-white tabular-nums tracking-tight">
                  {formatNum(timeLeft.days)}
                </span>
                <span className="text-[10px] md:text-sm text-zinc-400 uppercase tracking-widest mt-2">Hari</span>
              </div>

              <div className="hidden md:block w-px h-16 bg-white/10"></div>

              {/* Hours */}
              <div className="flex flex-col items-center">
                <span className="text-4xl md:text-7xl font-display text-white tabular-nums tracking-tight">
                  {formatNum(timeLeft.hours)}
                </span>
                <span className="text-[10px] md:text-sm text-zinc-400 uppercase tracking-widest mt-2">Jam</span>
              </div>

              <div className="hidden md:block w-px h-16 bg-white/10"></div>

              {/* Minutes */}
              <div className="flex flex-col items-center">
                <span className="text-4xl md:text-7xl font-display text-white tabular-nums tracking-tight">
                  {formatNum(timeLeft.minutes)}
                </span>
                <span className="text-[10px] md:text-sm text-zinc-400 uppercase tracking-widest mt-2">Menit</span>
              </div>

              <div className="hidden md:block w-px h-16 bg-white/10"></div>

              {/* Seconds (Visible on large screens) */}
              <div className="hidden md:flex flex-col items-center">
                <span className="text-4xl md:text-7xl font-display text-gold-400 tabular-nums tracking-tight">
                  {formatNum(timeLeft.seconds)}
                </span>
                <span className="text-[10px] md:text-sm text-zinc-400 uppercase tracking-widest mt-2">Detik</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FLOATING MINIMAL WIDGET (Fixed) */}
      <div
        ref={floatingRef}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-8 md:translate-x-0 z-[100] pointer-events-none invisible w-max max-w-[90vw]"
      >
        <div className="glass-strong border border-white/10 rounded-full py-3 px-5 md:px-6 shadow-2xl flex items-center gap-4 pointer-events-auto backdrop-blur-xl bg-black/90">
          <div className="flex items-center gap-2 text-white font-mono text-xs md:text-sm">
            <div className="flex items-baseline gap-1">
              <span className="text-gold-400 font-bold text-base md:text-lg">{formatNum(timeLeft.days)}</span>
              <span className="text-[10px] text-zinc-500 uppercase">d</span>
            </div>
            <span className="text-zinc-700">:</span>
            <div className="flex items-baseline gap-1">
              <span className="text-white font-bold text-base md:text-lg">{formatNum(timeLeft.hours)}</span>
              <span className="text-[10px] text-zinc-500 uppercase">h</span>
            </div>
            <span className="text-zinc-700">:</span>
            <div className="flex items-baseline gap-1">
              <span className="text-white font-bold text-base md:text-lg">{formatNum(timeLeft.minutes)}</span>
              <span className="text-[10px] text-zinc-500 uppercase">m</span>
            </div>
          </div>

          <div className="hidden md:block w-px h-4 bg-white/10"></div>
          <span className="hidden md:block text-[10px] uppercase tracking-wider text-zinc-400">Menuju Acara</span>
        </div>
      </div>
    </>
  );
};