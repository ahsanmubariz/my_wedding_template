import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const RUNDOWN_ITEMS = [
    {
        time: '08:00',
        date: '18 Mei 2026',
        title: 'Akad Nikah',
        location: 'Desa Cipinang, Rajagaluh, Majalengka',
        description: 'Prosesi sakral pengucapan janji suci pernikahan.'
    },
    {
        time: '11:00',
        date: '2 Juni 2026',
        title: 'Resepsi Makan Siang',
        location: 'Balai Sidang Bosowa 45, Makassar',
        description: 'Ramah tamah dan perayaan bersama keluarga dan kerabat terdekat.'
    }
];

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
        <section ref={sectionRef} className="py-24 bg-zinc-950 relative">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-4">Susunan Acara</h2>
                    <p className="text-zinc-500 font-serif italic text-lg">Rangkaian momen bahagia kami.</p>
                </div>

                <div className="space-y-6">
                    {RUNDOWN_ITEMS.map((item, index) => (
                        <div key={index} className="rundown-card group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-r from-zinc-900/80 to-zinc-900/40 p-1">
                            <div className="relative flex flex-col md:flex-row gap-6 p-6 items-center bg-zinc-950/50 backdrop-blur-sm rounded-xl h-full">

                                {/* Date & Time Badge */}
                                <div className="flex-shrink-0 w-32 h-24 rounded-2xl border border-gold-400/20 flex flex-col items-center justify-center bg-zinc-900/50 group-hover:bg-gold-900/10 transition-all duration-500 relative">
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-gold-500/60 font-bold mb-1">{item.date}</span>
                                    <div className="w-12 h-px bg-gold-400/20 mb-1"></div>
                                    <span className="text-2xl font-display font-bold text-white tracking-widest">{item.time}</span>
                                </div>

                                {/* Dash */}
                                <div className="hidden md:block w-px h-12 bg-white/10"></div>

                                {/* Content */}
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-2xl font-display text-white mb-2">{item.title}</h3>
                                    <div className="flex items-center justify-center md:justify-start gap-2 text-zinc-400 text-sm mb-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        <span className="uppercase tracking-wider text-xs">{item.location}</span>
                                    </div>
                                    <p className="text-zinc-500 font-serif italic text-sm">{item.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
