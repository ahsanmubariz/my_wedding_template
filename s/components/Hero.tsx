import React, { useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GOOGLE_CALENDAR_LINK, BISMILLAH } from '../constants';
import { BismillahHeader, IslamicStar8Point, ArabesqueBorder } from './Ornaments';
import { generateShareCardS } from '../../utils/shareCard';

const ASSETS_BASE_URL = import.meta.env.VITE_ASSETS_BASE_URL || 'https://assets.shintahsan.my.id/';

interface HeroProps {
    onRSVP: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRSVP }) => {
    const queryParams = new URLSearchParams(window.location.search);
    const recipientName = queryParams.get('name');

    const containerRef = useRef<HTMLDivElement>(null);
    const scrollWrapperRef = useRef<HTMLDivElement>(null);
    const introWrapperRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    const [isMobile, setIsMobile] = React.useState(false);
    const [isCapturing, setIsCapturing] = useState(false);
    const [sharePreview, setSharePreview] = useState<{ url: string; blob: Blob } | null>(null);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline();
        gsap.set(introWrapperRef.current, { opacity: 0, filter: 'blur(15px)', y: 60 });
        tl.to(introWrapperRef.current, {
            opacity: 1, filter: 'blur(0px)', y: 0,
            duration: 2, ease: 'power3.out', delay: 0.2
        });

        gsap.to(bgRef.current, {
            scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: true },
            yPercent: 30, scale: 1.1, ease: "none"
        });

        gsap.to(scrollWrapperRef.current, {
            scrollTrigger: { trigger: containerRef.current, start: "top top", end: "50% top", scrub: true },
            opacity: 0, y: -50, scale: 0.95, ease: "none"
        });
    }, { scope: containerRef });

    // Step 1: Generate the share card
    const handleCapture = useCallback(async () => {
        setIsCapturing(true);
        try {
            const blob = await generateShareCardS(recipientName);
            const url = URL.createObjectURL(blob);
            setSharePreview({ url, blob });
        } catch (error) {
            console.error('Error generating share card:', error);
        } finally {
            setIsCapturing(false);
        }
    }, [recipientName]);

    // Step 2: Share the captured image (called from a fresh user gesture on the preview overlay)
    const handleShareNow = useCallback(async () => {
        if (!sharePreview) return;

        const file = new File([sharePreview.blob], 'undangan-shinta-ahsan.png', { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
                await navigator.share({
                    files: [file],
                    title: 'Undangan Pernikahan Shinta & Ahsan',
                });
            } catch {
                // User cancelled — that's fine
            }
        } else {
            const a = document.createElement('a');
            a.href = sharePreview.url;
            a.download = 'undangan-shinta-ahsan.png';
            a.click();
        }
    }, [sharePreview]);

    const handleClosePreview = useCallback(() => {
        if (sharePreview) {
            URL.revokeObjectURL(sharePreview.url);
            setSharePreview(null);
        }
    }, [sharePreview]);

    return (
        <>
            <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center z-10 bg-cream-50">
                {/* Background Image with Soft Overlay */}
                <div ref={bgRef} className="absolute inset-0 w-full h-full z-0 will-change-transform">
                    <video
                        key={isMobile ? 'mobile' : 'desktop'}
                        autoPlay loop muted playsInline preload="auto"
                        className="w-full h-full object-cover opacity-40"
                    >
                        <source src={isMobile ? `${ASSETS_BASE_URL}bg_mobile.webm` : `${ASSETS_BASE_URL}bg.webm`} type="video/webm" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-b from-cream-50/60 via-cream-50/40 to-cream-50"></div>
                </div>

                {/* Decorative Corner Stars */}
                <div className="absolute top-8 left-8 z-20 animate-slow-spin">
                    <IslamicStar8Point size={50} color="#D4AF37" className="opacity-40" />
                </div>
                <div className="absolute top-8 right-8 z-20 animate-slow-spin" style={{ animationDirection: 'reverse' }}>
                    <IslamicStar8Point size={50} color="#059669" className="opacity-40" />
                </div>

                {/* Content Wrapper */}
                <div ref={scrollWrapperRef} className="relative z-10 w-full max-w-5xl px-6 will-change-transform">
                    <div ref={introWrapperRef} className="flex flex-col items-center text-center">
                        <BismillahHeader className="mb-10 md:mb-14" />

                        <p className="text-charcoal-700/70 font-medium tracking-[0.4em] text-xs md:text-sm mb-8 uppercase">
                            Undangan Pernikahan
                        </p>

                        <h1 className="text-6xl md:text-8xl font-script text-emerald-700 drop-shadow-sm">
                            Shinta
                            <span className="block text-3xl md:text-5xl font-display text-gold-500 font-normal my-4 md:my-6 tracking-widest">
                                &
                            </span>
                            Ahsan
                        </h1>

                        {recipientName && (
                            <div className="mt-8 mb-4 flex flex-col items-center z-20">
                                <p className="text-charcoal-700/70 text-xs tracking-[0.2em] uppercase mb-2">Kepada Yth.</p>
                                <h2 className="text-2xl md:text-3xl text-emerald-800 font-display tracking-wide">{recipientName}</h2>
                            </div>
                        )}

                        <div className="my-10 md:my-14 w-full max-w-md">
                            <ArabesqueBorder width="100%" />
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="flex items-center gap-6 text-charcoal-700 text-xs md:text-sm tracking-widest uppercase font-medium glass px-8 py-4 rounded-full">
                                <span>18 Mei 2026</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
                                <span>Majalengka</span>
                            </div>

                            <div className="flex gap-4">
                                <a
                                    href={GOOGLE_CALENDAR_LINK}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group bg-cream-100 hover:bg-cream-200 text-charcoal-800 border border-gold-400/30 px-8 py-4 rounded-full font-medium text-xs tracking-wider uppercase transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-soft"
                                >
                                    <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>Simpan Tanggal</span>
                                </a>

                                <button
                                    onClick={onRSVP}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-medium text-xs tracking-wider uppercase transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-emerald"
                                >
                                    <span>Konfirmasi</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Share Button */}
                <button
                    id="share-btn-s"
                    onClick={handleCapture}
                    disabled={isCapturing}
                    className="absolute bottom-10 right-6 z-20 bg-emerald-600/15 hover:bg-emerald-600/25 backdrop-blur-md border border-emerald-600/20 text-emerald-700 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 disabled:opacity-40"
                    title="Bagikan ke Story"
                >
                    {isCapturing ? (
                        <div className="w-4 h-4 border-2 border-emerald-600/30 border-t-emerald-600 rounded-full animate-spin" />
                    ) : (
                        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="18" cy="5" r="3" />
                            <circle cx="6" cy="12" r="3" />
                            <circle cx="18" cy="19" r="3" />
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                        </svg>
                    )}
                </button>

                {/* Scroll Indicator */}
                <div id="scroll-indicator-s" className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gold-500">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                    </svg>
                </div>
            </section>

            {/* Share Preview Overlay */}
            {sharePreview && (
                <div className="fixed inset-0 z-[300] bg-cream-50/98 backdrop-blur-lg flex flex-col items-center justify-between p-4 pt-12 pb-8 md:justify-center md:p-6">
                    {/* Close button */}
                    <button
                        onClick={handleClosePreview}
                        className="absolute top-4 right-4 text-charcoal-700/50 hover:text-charcoal-700 w-10 h-10 rounded-full bg-cream-200/60 flex items-center justify-center transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    {/* Preview Image - constrained to fit mobile screens */}
                    <div className="flex-1 flex items-center justify-center w-full max-w-sm md:max-w-md md:flex-none overflow-hidden">
                        <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-gold-400/20">
                            <img src={sharePreview.url} alt="Preview undangan" className="w-full h-auto block" />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="w-full max-w-sm flex gap-3 mt-6">
                        <button
                            onClick={handleShareNow}
                            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-full font-display font-medium text-sm tracking-widest uppercase transition-all hover:scale-105 active:scale-95 shadow-emerald flex items-center justify-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="18" cy="5" r="3" />
                                <circle cx="6" cy="12" r="3" />
                                <circle cx="18" cy="19" r="3" />
                                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                            </svg>
                            Bagikan
                        </button>
                        <button
                            onClick={handleClosePreview}
                            className="bg-cream-200 text-charcoal-700 px-6 py-4 rounded-full font-display font-medium text-sm tracking-widest uppercase transition-all hover:bg-cream-300 active:scale-95 flex items-center justify-center"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
