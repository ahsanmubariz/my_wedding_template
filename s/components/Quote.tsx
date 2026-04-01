import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { QURAN_VERSE } from '../constants';
import { IslamicStar8Point, ArabesqueBorder } from './Ornaments';

export const Quote: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const arabicRef = useRef<HTMLParagraphElement>(null);
    const translationRef = useRef<HTMLDivElement>(null);
    const ornamentRef = useRef<SVGSVGElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 60%",
            }
        });

        tl.from(arabicRef.current, {
            y: 40,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out"
        })
            .from(translationRef.current, {
                y: 30,
                opacity: 0,
                duration: 1.5,
                ease: "power3.out"
            }, "-=1");

        // Star Rotation
        gsap.to('.rotating-star', {
            rotation: 360,
            duration: 60,
            repeat: -1,
            ease: "linear"
        });

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="min-h-[70vh] flex items-center justify-center py-24 px-6 relative z-20 overflow-hidden bg-cream-100">

            {/* Background Stars */}
            <div className="absolute top-10 left-10 rotating-star opacity-20">
                <IslamicStar8Point size={120} color="#D4AF37" />
            </div>
            <div className="absolute bottom-10 right-10 rotating-star opacity-20" style={{ animationDirection: 'reverse' }}>
                <IslamicStar8Point size={100} color="#059669" />
            </div>

            <div className="max-w-4xl text-center space-y-10 relative z-10">

                {/* Top Arabesque */}
                <ArabesqueBorder width="100%" className="opacity-60" />

                {/* Arabic Verse */}
                <p
                    ref={arabicRef}
                    className="text-3xl md:text-5xl font-arabic leading-loose text-emerald-800 drop-shadow-sm px-4"
                >
                    {QURAN_VERSE.arabic}
                </p>

                {/* Translations */}
                <div ref={translationRef} className="space-y-6">
                    {/* English */}
                    <p className="text-charcoal-700 text-lg md:text-xl font-light leading-relaxed tracking-wide italic font-serif px-4">
                        "{QURAN_VERSE.english}"
                    </p>

                    {/* Indonesian */}
                    <p className="text-charcoal-700/70 text-base md:text-lg leading-relaxed font-serif px-4">
                        "{QURAN_VERSE.indonesian}"
                    </p>

                    {/* Reference */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <span className="h-px w-12 bg-gold-400/60"></span>
                        <p className="text-gold-600 text-sm uppercase tracking-[0.3em] font-medium font-display">
                            {QURAN_VERSE.reference}
                        </p>
                        <span className="h-px w-12 bg-gold-400/60"></span>
                    </div>
                </div>

                {/* Bottom Arabesque */}
                <ArabesqueBorder width="100%" className="opacity-60" />
            </div>
        </section>
    );
};
