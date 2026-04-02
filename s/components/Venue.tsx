import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArabesqueBorder, GridPattern } from './Ornaments';
import { LazyImage } from './LazyImage';

const ASSETS_BASE_URL = import.meta.env.VITE_ASSETS_BASE_URL || 'https://assets.shintahsan.my.id/';

export const Venue: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
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
                .to(venueImg, { scale: 1.05, duration: 1 }, 0);
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
        <section ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center py-12 md:py-24 relative z-10 bg-cream-50" style={{ perspective: '1200px' }}>

            <GridPattern />

            <div className="mb-12 md:mb-16 text-center px-4 relative z-10">
                <h2 className="text-4xl md:text-6xl font-script text-emerald-700 mb-3">Lokasi Acara</h2>
                <p className="text-gold-600 text-sm md:text-lg tracking-[0.2em] uppercase font-display">Majalengka</p>
                <div className="mt-6 max-w-sm mx-auto">
                    <ArabesqueBorder width="100%" />
                </div>
            </div>

            {/* Card Container */}
            <div
                ref={cardRef}
                className="group relative w-[90%] max-w-5xl aspect-[4/5] md:aspect-[16/9] rounded-[2rem] md:rounded-[2.5rem] shadow-soft border border-gold-300/30 bg-cream-100 overflow-hidden
                   transform-gpu transition-all duration-700 ease-out will-change-transform
                   md:hover:!rotate-0 md:hover:!scale-[1.01] md:hover:shadow-gold md:hover:border-emerald-400/30"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Map Image */}
                <div className="absolute inset-0 bg-cream-200 pointer-events-none">
                    <LazyImage
                        src={`${ASSETS_BASE_URL}552018_110749222410387_144635804_n.jpg`}
                        alt="Majalengka"
                        className="w-full h-full object-cover opacity-60 md:group-hover:opacity-80 md:group-hover:scale-105 transition-all duration-1000 will-change-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cream-50 via-cream-50/30 to-transparent"></div>
                </div>

                {/* Content UI */}
                <div ref={contentRef} className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end md:flex-row md:justify-between md:items-end gap-6 translate-z-10">

                    {/* Address Card */}
                    <div className="glass p-6 rounded-2xl border border-gold-300/30 w-full md:w-auto md:max-w-md shadow-soft">
                        <div className="flex items-start gap-4">
                            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 rounded-xl shadow-emerald text-white shrink-0">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg md:text-xl font-display font-medium text-charcoal-800 leading-tight">Kediaman Mempelai Wanita</h3>
                                <p className="text-charcoal-700/70 text-xs md:text-sm mt-2 leading-relaxed font-serif">Jl. K. Saleh I<br />Desa Cipinang, Rajagaluh, Majalengka</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <a
                        href="https://maps.app.goo.gl/TWkhRjKQ6eUyKu3V7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-bold transition-all active:scale-95 shadow-emerald flex items-center justify-center gap-2 group/btn"
                    >
                        <span className="font-display tracking-widest text-sm uppercase">Petunjuk Arah</span>
                        <svg className="group-hover/btn:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};
