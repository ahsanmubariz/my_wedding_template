import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RUNDOWN_ITEMS } from '../constants';
import { CrescentMoon, GeometricDivider } from './Ornaments';

export const Rundown: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from('.rundown-card', {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
            },
            y: 30,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: "power3.out"
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="py-24 bg-cream-100 relative">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-script text-emerald-700 mb-4">Susunan Acara</h2>
                    <p className="text-charcoal-700/60 font-serif italic text-lg">Rangkaian momen yang diberkahi.</p>
                    <GeometricDivider className="max-w-xs mx-auto mt-6" />
                </div>

                <div className="space-y-6">
                    {RUNDOWN_ITEMS.map((item, index) => (
                        <div key={index} className="rundown-card group relative overflow-hidden rounded-2xl border border-gold-300/30 bg-cream-50 shadow-soft">
                            <div className="relative flex flex-col md:flex-row gap-6 p-6 items-center">

                                {/* Time with Crescent */}
                                <div className="flex-shrink-0 w-24 h-24 rounded-full border-2 border-emerald-500/30 flex flex-col items-center justify-center bg-emerald-50 group-hover:bg-emerald-100 transition-colors">
                                    <CrescentMoon size={20} color="#059669" className="mb-1" />
                                    <span className="text-xl font-display font-bold text-emerald-700">{item.time}</span>
                                </div>

                                {/* Divider */}
                                <div className="hidden md:block w-px h-16 bg-gold-300/40"></div>

                                {/* Content */}
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-2xl font-script text-emerald-700 mb-2">{item.title}</h3>
                                    <div className="flex items-center justify-center md:justify-start gap-2 text-gold-600 text-sm mb-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span className="uppercase tracking-wider text-xs font-medium">{item.location}</span>
                                    </div>
                                    <p className="text-charcoal-700/60 font-serif italic text-sm">{item.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
