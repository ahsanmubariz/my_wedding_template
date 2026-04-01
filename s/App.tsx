import React, { useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { Hero } from './components/Hero';
import { Couple } from './components/Couple';
import { LoveStory } from './components/LoveStory';
import { Quote } from './components/Quote';
import { Countdown } from './components/Countdown';
import { Rundown } from './components/Rundown';
import { Venue } from './components/Venue';
import { Gallery } from './components/Gallery';
import { Gift } from './components/Gift';
import { Wishes } from './components/Wishes';
import { Footer } from './components/Footer';
import { PatternOverlay, FloatingGeometry } from './components/Ornaments';
import { RSVPModal } from './components/RSVPModal';
import { MusicPlayer } from './components/MusicPlayer';
import { Loader } from './components/Loader';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false);

    // Lock scroll while loader is visible
    useEffect(() => {
        if (!isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    useGSAP(() => {
        // Global animations if needed
    });

    if (!isOpen) {
        return <Loader onOpen={() => setIsOpen(true)} />;
    }

    return (
        <main className="relative w-full min-h-screen bg-cream-50 text-charcoal-800 selection:bg-gold-400/30 selection:text-charcoal-900 overflow-x-hidden cursor-default">
            <PatternOverlay />
            <FloatingGeometry />

            <Hero onRSVP={() => setIsRSVPModalOpen(true)} />
            <Couple />
            <LoveStory />
            <Quote />
            <Countdown />
            <Rundown />
            <Venue />
            <Gallery />
            <Gift />
            <Wishes />
            <Footer onRSVP={() => setIsRSVPModalOpen(true)} />

            <RSVPModal isOpen={isRSVPModalOpen} onClose={() => setIsRSVPModalOpen(false)} />
            <MusicPlayer />

            {/* Optional Custom Cursor - Hidden on mobile */}
            <div className="fixed top-0 left-0 w-6 h-6 bg-emerald-600 mix-blend-multiply rounded-full pointer-events-none z-[100] hidden md:block opacity-50"
                style={{ transform: 'translate(-50%, -50%)' }}
                ref={(el) => {
                    if (!el) return;
                    const moveCursor = (e: MouseEvent) => {
                        gsap.to(el, { x: e.clientX, y: e.clientY, duration: 0.2, ease: 'power2.out' });
                    };
                    window.addEventListener('mousemove', moveCursor);
                    return () => window.removeEventListener('mousemove', moveCursor);
                }}
            />
        </main>
    );
};

export default App;
