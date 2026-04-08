import React, { useLayoutEffect, useRef, useState } from 'react';

const LandingPage: React.FC = () => {
    const [guestName, setGuestName] = useState('');
    const [copied, setCopied] = useState<'a' | 's' | null>(null);

    const handleCopy = (path: 'a' | 's') => {
        const url = `${window.location.origin}/${path}?name=${encodeURIComponent(guestName)}`;
        navigator.clipboard.writeText(url);
        setCopied(path);
        setTimeout(() => setCopied(null), 2000);
    };

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
                        Shinta & Ahsan Wedding Invitation
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
                                Makassar Venue
                            </h2>
                            <p className="text-zinc-400 font-sans mb-8">
                                A dark, modern, and deeply elegant single-page experience with smooth GSAP scrolling.
                            </p>
                            <span className="inline-flex items-center justify-center px-6 py-3 border border-zinc-700 rounded-full text-zinc-300 group-hover:border-gold-400 group-hover:text-gold-400 transition-colors duration-300">
                                View Invitation
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
                                Majalengka Venue
                            </h2>
                            <p className="text-zinc-400 font-sans mb-8">
                                A vibrant, light, Islamic-themed design featuring elegant geometry, gold inserts, and nature tones.
                            </p>
                            <span className="inline-flex items-center justify-center px-6 py-3 border border-zinc-700 rounded-full text-zinc-300 group-hover:border-emerald-400 group-hover:text-emerald-400 transition-colors duration-300">
                                View Invitation
                                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </span>
                        </div>
                    </a>

                </div>

                {/* URL Generator Tool */}
                <div className="w-full max-w-4xl mt-16 glass rounded-3xl p-8 border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <svg className="w-24 h-24 text-gold-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13.89 15.55l-1.42 1.41a5 5 0 11-7.07-7.07l1.41-1.42a1 1 0 011.42 1.42l-1.41 1.41a3 3 0 004.24 4.24l1.42-1.41a1 1 0 011.41 1.42zm4.24-10.6l-1.41 1.41a1 1 0 01-1.42-1.42l1.42-1.41a3 3 0 00-4.24-4.24l-1.42 1.41a1 1 0 01-1.41-1.42l1.42-1.41a5 5 0 117.07 7.07z" />
                        </svg>
                    </div>
                    
                    <div className="relative z-10">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-display text-white mb-2 tracking-widest">Invitation URL Tool</h3>
                            <p className="text-zinc-500 text-sm">Construct personalized links for your guests instantly.</p>
                        </div>

                        <div className="max-w-xl mx-auto">
                            <div className="relative group/input">
                                <label className="absolute -top-2.5 left-4 px-2 bg-zinc-950 text-gold-400 text-[10px] uppercase tracking-[0.2em] font-bold z-20">Guest Name</label>
                                <input 
                                    type="text" 
                                    value={guestName}
                                    onChange={(e) => setGuestName(e.target.value)}
                                    placeholder="e.g. John Doe & Partner"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 transition-all font-serif italic text-lg"
                                />
                            </div>
                        </div>

                        {guestName && (
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                {/* Option A */}
                                <div className="glass-strong p-6 rounded-2xl border border-white/5 space-y-4 hover:border-gold-400/30 transition-colors group/card">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] text-gold-400 uppercase tracking-[0.2em] font-bold">Makassar Venue</span>
                                        <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                                    </div>
                                    <div className="bg-black/40 p-4 rounded-xl border border-white/5 font-mono text-[11px] text-zinc-400 break-all leading-relaxed relative">
                                        {`${window.location.origin}/a?name=${encodeURIComponent(guestName)}`}
                                    </div>
                                    <button 
                                        onClick={() => handleCopy('a')}
                                        className={`w-full py-3 rounded-xl font-medium text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${
                                            copied === 'a' 
                                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                                            : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                                        }`}
                                    >
                                        {copied === 'a' ? (
                                            <>
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                                                Copy Makassar Link
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Option S */}
                                <div className="glass-strong p-6 rounded-2xl border border-white/5 space-y-4 hover:border-emerald-400/30 transition-colors group/card">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] text-emerald-400 uppercase tracking-[0.2em] font-bold">Majalengka Venue</span>
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                    </div>
                                    <div className="bg-black/40 p-4 rounded-xl border border-white/5 font-mono text-[11px] text-zinc-400 break-all leading-relaxed">
                                        {`${window.location.origin}/s?name=${encodeURIComponent(guestName)}`}
                                    </div>
                                    <button 
                                        onClick={() => handleCopy('s')}
                                        className={`w-full py-3 rounded-xl font-medium text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${
                                            copied === 's' 
                                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                                            : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                                        }`}
                                    >
                                        {copied === 's' ? (
                                            <>
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                                                Copy Majalengka Link
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            <footer className="absolute bottom-8 text-center w-full text-zinc-600 font-sans text-sm z-10">
                &copy; {new Date().getFullYear()} Ahsan Jipiti. All rights reserved.
            </footer>
        </main>
    );
};

export default LandingPage;
