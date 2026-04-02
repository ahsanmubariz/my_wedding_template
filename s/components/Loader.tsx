import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { GeometricDivider } from './Ornaments';

interface LoaderProps {
    onOpen: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onOpen }) => {
    const [isVideoReady, setIsVideoReady] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const queryParams = new URLSearchParams(window.location.search);
    const recipientName = queryParams.get('name');

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        const ASSETS_BASE_URL = import.meta.env.VITE_ASSETS_BASE_URL || 'https://assets.shintahsan.my.id/';
        const videoUrl = isMobile
            ? `${ASSETS_BASE_URL}bg_mobile.webm`
            : `${ASSETS_BASE_URL}bg.webm`;

        const video = document.createElement('video');
        video.src = videoUrl;
        video.preload = 'auto';
        video.muted = true;
        video.playsInline = true;

        const onReady = () => {
            setIsVideoReady(true);
            video.removeEventListener('canplaythrough', onReady);
        };

        video.addEventListener('canplaythrough', onReady);
        video.load();

        // Fallback: show button anyway after 6s
        const timeout = setTimeout(() => setIsVideoReady(true), 6000);

        return () => {
            clearTimeout(timeout);
            video.removeEventListener('canplaythrough', onReady);
        };
    }, []);

    // Animate button in when video is ready
    useEffect(() => {
        if (isVideoReady && buttonRef.current) {
            gsap.fromTo(buttonRef.current,
                { opacity: 0, y: 20, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
            );
        }
    }, [isVideoReady]);

    const handleOpen = () => {
        // Track visit
        addDoc(collection(db, 'visits_s'), {
            timestamp: serverTimestamp(),
            userAgent: navigator.userAgent,
        }).catch(console.error);

        // Lock scroll during animation
        document.body.style.overflow = 'hidden';

        const tl = gsap.timeline({
            onComplete: () => {
                document.body.style.overflow = '';
                onOpen();
            }
        });

        tl.to(contentRef.current, {
            opacity: 0,
            y: -30,
            scale: 0.95,
            duration: 0.5,
            ease: 'power2.in'
        })
        .to(overlayRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut'
        }, '-=0.2');
    };

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[200] bg-cream-50 flex items-center justify-center"
        >
            {/* Subtle background pattern */}
            <div className="absolute inset-0 star-pattern opacity-20" />

            <div ref={contentRef} className="relative z-10 flex flex-col items-center text-center px-8">
                {/* Bismillah */}
                <p className="text-emerald-700/60 font-arabic text-xl md:text-2xl mb-8">
                    بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                </p>

                {/* Wedding label */}
                <p className="text-charcoal-700/50 font-medium tracking-[0.4em] text-[10px] md:text-xs uppercase mb-8">
                    Undangan Pernikahan
                </p>

                {/* Couple names */}
                <h1 className="text-5xl md:text-7xl font-script text-emerald-700 mb-2">
                    Shinta
                </h1>
                <span className="text-2xl md:text-3xl font-display text-gold-500 my-3 tracking-widest">&</span>
                <h1 className="text-5xl md:text-7xl font-script text-emerald-700 mb-8">
                    Ahsan
                </h1>

                {/* Recipient name */}
                {recipientName && (
                    <div className="mb-8 flex flex-col items-center">
                        <p className="text-charcoal-700/50 text-[10px] tracking-[0.2em] uppercase mb-2">Kepada Yth.</p>
                        <p className="text-xl md:text-2xl text-emerald-800 font-display tracking-wide">{recipientName}</p>
                    </div>
                )}

                {/* Decorative divider */}
                <div className="mb-10 w-48">
                    <GeometricDivider />
                </div>

                {/* Loading / Button */}
                {!isVideoReady ? (
                    <div className="flex flex-col items-center gap-4">
                        {/* Spinner */}
                        <div className="w-8 h-8 border-2 border-gold-200 border-t-emerald-600 rounded-full animate-spin" />
                        <p className="text-charcoal-700/40 text-xs tracking-widest uppercase">Memuat...</p>
                    </div>
                ) : (
                    <button
                        ref={buttonRef}
                        onClick={handleOpen}
                        className="opacity-0 bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-full font-display font-medium text-sm tracking-widest uppercase transition-all hover:scale-105 active:scale-95 shadow-emerald flex items-center gap-3"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Buka Undangan
                    </button>
                )}
            </div>
        </div>
    );
};
