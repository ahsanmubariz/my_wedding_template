import React, { useState, useEffect, useRef } from 'react';
import { WEDDING_DATE } from '../constants';
import { TimeLeft } from '../types';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IslamicStar8Point, GeometricDivider } from './Ornaments';

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

    // Animation Logic
    useGSAP(() => {
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

        gsap.set(floatingRef.current, {
            yPercent: 120,
            opacity: 0,
            autoAlpha: 0
        });

        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "bottom bottom",
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

    const TimeUnit: React.FC<{ value: number; label: string; isAccent?: boolean }> = ({ value, label, isAccent }) => (
        <div className="flex flex-col items-center">
            <div className="relative">
                {/* Star Background */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <IslamicStar8Point size={80} color={isAccent ? "#059669" : "#D4AF37"} />
                </div>
                <span className={`text-4xl md:text-7xl font-display tabular-nums tracking-tight relative z-10 ${isAccent ? 'text-emerald-600' : 'text-charcoal-800'}`}>
                    {formatNum(value)}
                </span>
            </div>
            <span className="text-[10px] md:text-sm text-charcoal-700/60 uppercase tracking-widest mt-2">{label}</span>
        </div>
    );

    return (
        <>
            <section
                ref={sectionRef}
                className="relative min-h-[60vh] md:h-[80vh] w-full flex items-center justify-center py-20 overflow-visible z-40 bg-cream-50"
            >
                {/* Static Hero Countdown */}
                <div
                    ref={staticRef}
                    className="relative z-10 w-full max-w-4xl px-4 md:px-6 will-change-transform"
                >
                    <div className="relative glass border border-gold-300/30 rounded-[2rem] shadow-soft overflow-hidden p-6 md:p-12">
                        {/* Decorative Glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-gold-200/50 blur-[100px] -z-10"></div>

                        <div className="text-center mb-10 md:mb-12 relative z-10">
                            <h3 className="text-emerald-700 font-display text-sm md:text-xl tracking-[0.3em] uppercase">Menuju Hari Bahagia</h3>
                            <GeometricDivider className="max-w-xs mx-auto mt-4" />
                        </div>

                        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 relative z-10">
                            <TimeUnit value={timeLeft.days} label="Hari" />
                            <div className="hidden md:block w-px h-16 bg-gold-300/50"></div>
                            <TimeUnit value={timeLeft.hours} label="Jam" />
                            <div className="hidden md:block w-px h-16 bg-gold-300/50"></div>
                            <TimeUnit value={timeLeft.minutes} label="Menit" />
                            <div className="hidden md:block w-px h-16 bg-gold-300/50"></div>
                            <TimeUnit value={timeLeft.seconds} label="Detik" isAccent />
                        </div>
                    </div>
                </div>
            </section>

            {/* Floating Minimal Widget */}
            <div
                ref={floatingRef}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-8 md:translate-x-0 z-[100] pointer-events-none invisible w-max max-w-[90vw]"
            >
                <div className="glass-strong border border-gold-300/40 rounded-full py-3 px-5 md:px-6 shadow-soft flex items-center gap-4 pointer-events-auto">
                    <div className="flex items-center gap-2 text-charcoal-800 font-mono text-xs md:text-sm">
                        <div className="flex items-baseline gap-1">
                            <span className="text-emerald-600 font-bold text-base md:text-lg">{formatNum(timeLeft.days)}</span>
                            <span className="text-[10px] text-charcoal-700/50 uppercase">h</span>
                        </div>
                        <span className="text-gold-400">:</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-charcoal-800 font-bold text-base md:text-lg">{formatNum(timeLeft.hours)}</span>
                            <span className="text-[10px] text-charcoal-700/50 uppercase">j</span>
                        </div>
                        <span className="text-gold-400">:</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-charcoal-800 font-bold text-base md:text-lg">{formatNum(timeLeft.minutes)}</span>
                            <span className="text-[10px] text-charcoal-700/50 uppercase">m</span>
                        </div>
                    </div>

                    <div className="hidden md:block w-px h-4 bg-gold-300/50"></div>
                    <span className="hidden md:block text-[10px] uppercase tracking-wider text-charcoal-700/60">Menuju Akad</span>
                </div>
            </div>
        </>
    );
};
