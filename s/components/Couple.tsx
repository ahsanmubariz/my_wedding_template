import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IslamicCorner, GeometricDivider } from './Ornaments';

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
                    .to(brideImg, { scale: 1.1, duration: 1 }, 0)
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
                    .to(groomImg, { scale: 1.1, duration: 1 }, 0)
                    .to(groomOverlay, { opacity: 1, duration: 1 }, 0);
            }
        });

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="py-24 md:py-32 bg-cream-50 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 star-pattern opacity-30"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-script text-emerald-700 mb-6">Mempelai</h2>
                    <GeometricDivider className="max-w-xs mx-auto" />
                </div>

                <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-center justify-center">

                    {/* Bride - Jane */}
                    <div ref={brideRef} className="flex-1 max-w-md text-center group">
                        <div className="relative w-full aspect-[3/4] mb-8 overflow-hidden rounded-[2rem] bg-cream-100 shadow-soft">
                            {/* Islamic Corner Ornaments */}
                            <div className="absolute top-0 left-0 z-20">
                                <IslamicCorner position="top-left" size={50} />
                            </div>
                            <div className="absolute top-0 right-0 z-20">
                                <IslamicCorner position="top-right" size={50} />
                            </div>
                            <div className="absolute bottom-0 left-0 z-20">
                                <IslamicCorner position="bottom-left" size={50} />
                            </div>
                            <div className="absolute bottom-0 right-0 z-20">
                                <IslamicCorner position="bottom-right" size={50} />
                            </div>

                            <img
                                src={`${ASSETS_BASE_URL}sh.jpg`}
                                alt="Shinta"
                                className="w-full h-full object-cover transition-transform duration-1000 md:group-hover:scale-110 will-change-transform"
                                loading="lazy"
                            />
                            <div className="mobile-overlay absolute inset-0 bg-gradient-to-t from-cream-50/90 via-transparent to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-8">
                            </div>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-script text-emerald-700 mb-4">Shinta Oktaviani Jaenudin</h3>
                        <p className="text-charcoal-700/70 leading-relaxed font-serif text-lg italic">
                            Putri pertama dari Bapak H. Jeje Zaenuddin & Ibu Hj. Ida Saidah
                        </p>
                    </div>

                    {/* Divider for desktop */}
                    <div className="hidden md:flex flex-col items-center gap-4">
                        <div className="w-px h-40 bg-gradient-to-b from-transparent via-gold-400/50 to-transparent"></div>
                        <span className="text-4xl font-script text-gold-500">&</span>
                        <div className="w-px h-40 bg-gradient-to-b from-transparent via-gold-400/50 to-transparent"></div>
                    </div>

                    {/* Groom - John */}
                    <div ref={groomRef} className="flex-1 max-w-md text-center group">
                        <div className="relative w-full aspect-[3/4] mb-8 overflow-hidden rounded-[2rem] bg-cream-100 shadow-soft">
                            {/* Islamic Corner Ornaments */}
                            <div className="absolute top-0 left-0 z-20">
                                <IslamicCorner position="top-left" size={50} />
                            </div>
                            <div className="absolute top-0 right-0 z-20">
                                <IslamicCorner position="top-right" size={50} />
                            </div>
                            <div className="absolute bottom-0 left-0 z-20">
                                <IslamicCorner position="bottom-left" size={50} />
                            </div>
                            <div className="absolute bottom-0 right-0 z-20">
                                <IslamicCorner position="bottom-right" size={50} />
                            </div>

                            <img
                                src={`${ASSETS_BASE_URL}san.jpg`}
                                alt="Ahsan"
                                className="w-full h-full object-cover transition-transform duration-1000 md:group-hover:scale-110 will-change-transform"
                                loading="lazy"
                            />
                            <div className="mobile-overlay absolute inset-0 bg-gradient-to-t from-cream-50/90 via-transparent to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-8">
                            </div>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-script text-emerald-700 mb-4">Ahsan Mubariz</h3>
                        <p className="text-charcoal-700/70 leading-relaxed font-serif text-lg italic">
                            Putra kedua dari Alm. Bapak H. Bahrum & Ibu Hj. Darmawati H.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};
