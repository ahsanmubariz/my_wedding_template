import React, { useState, useRef, useEffect } from 'react';
import musicFile from '../33x.mp3';

export const MusicPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Since MusicPlayer only mounts after user clicks "Buka Undangan",
        // autoplay is guaranteed to work (user interaction already happened).
        const playAudio = async () => {
            try {
                await audio.play();
                setIsPlaying(true);
            } catch (err) {
                console.log("Autoplay blocked:", err);
                setIsPlaying(false);
            }
        };

        playAudio();
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <>
            <audio ref={audioRef} src={musicFile} loop />
            <button
                onClick={togglePlay}
                className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-[100] w-14 h-14 bg-cream-50 rounded-full shadow-soft flex items-center justify-center text-emerald-700 hover:text-emerald-800 transition-all hover:scale-105 active:scale-95 border border-gold-300"
                aria-label={isPlaying ? "Pause music" : "Play music"}
            >
                {/* SVG icons */}
                {isPlaying ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                        <rect x="6" y="5" width="4" height="14" rx="1" />
                        <rect x="14" y="5" width="4" height="14" rx="1" />
                    </svg>
                ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="ml-1">
                        <path d="M7 4V20L19 12L7 4Z" />
                    </svg>
                )}

                {/* Animated rings when playing */}
                {isPlaying && (
                    <>
                        <div className="absolute inset-0 border border-gold-400 rounded-full animate-[spin_4s_linear_infinite]" style={{ margin: '-6px' }}></div>
                        <div className="absolute inset-0 border border-gold-400/50 rounded-full animate-[spin_4s_linear_infinite_reverse]" style={{ margin: '-12px' }}></div>
                    </>
                )}
            </button>
        </>
    );
};
