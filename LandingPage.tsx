import React, { useLayoutEffect, useRef } from 'react';

const LandingPage: React.FC = () => {
    return (
        <main className="relative min-h-screen bg-zinc-950 flex flex-col items-center justify-center overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid z-0 opacity-30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

            <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center">

                {/* Header */}
                <div className="text-center mb-16 animate-float">
                    <span className="text-gold-400 font-medium tracking-[0.2em] text-sm uppercase mb-4 block">
                        Welcome to
                    </span>
                    <h1 className="text-5xl md:text-7xl font-display text-gradient-gold mb-6">
                        I-Wed Experience
                    </h1>
                    <p className="text-zinc-400 font-serif italic text-xl md:text-2xl max-w-2xl mx-auto">
                        Choose your preferred luxury digital invitation experience.
                    </p>
                </div>

                {/* Cards Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">

                    {/* Design A Card */}
                    <a href="/a" className="group glass rounded-2xl p-8 flex flex-col items-center text-center cursor-pointer relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <h2 className="text-3xl font-display text-zinc-100 mb-4 group-hover:text-gold-400 transition-colors">
                                Design A
                            </h2>
                            <p className="text-zinc-400 font-sans mb-8">
                                A dark, modern, and deeply elegant single-page experience with smooth GSAP scrolling.
                            </p>
                            <span className="inline-flex items-center justify-center px-6 py-3 border border-zinc-700 rounded-full text-zinc-300 group-hover:border-gold-400 group-hover:text-gold-400 transition-colors duration-300">
                                View Invitation A
                                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </span>
                        </div>
                    </a>

                    {/* Design S Card (V2 Theme) */}
                    <a href="/s" className="group glass rounded-2xl p-8 flex flex-col items-center text-center cursor-pointer relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <h2 className="text-3xl font-display text-zinc-100 mb-4 group-hover:text-emerald-400 transition-colors">
                                Design S
                            </h2>
                            <p className="text-zinc-400 font-sans mb-8">
                                A vibrant, light, Islamic-themed design featuring elegant geometry, gold inserts, and nature tones.
                            </p>
                            <span className="inline-flex items-center justify-center px-6 py-3 border border-zinc-700 rounded-full text-zinc-300 group-hover:border-emerald-400 group-hover:text-emerald-400 transition-colors duration-300">
                                View Invitation S
                                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </span>
                        </div>
                    </a>

                </div>
            </div>

            <footer className="absolute bottom-8 text-center w-full text-zinc-600 font-sans text-sm z-10">
                &copy; {new Date().getFullYear()} The I-Wed Experience. All rights reserved.
            </footer>
        </main>
    );
};

export default LandingPage;
