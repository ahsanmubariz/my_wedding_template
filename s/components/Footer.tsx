import React from 'react';
import { ArabesqueBorder, IslamicStar8Point } from './Ornaments';

interface FooterProps {
    onRSVP: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onRSVP }) => {
    return (
        <footer className="relative z-20 bg-cream-50 border-t border-gold-200/50 py-24">
            {/* Top Arabesque Border */}
            <div className="absolute top-0 left-0 w-full">
                <ArabesqueBorder width="100%" />
            </div>

            <div className="container mx-auto px-6 text-center flex flex-col items-center pt-8">

                {/* Closing Message */}
                <div className="mb-12">
                    <IslamicStar8Point size={40} color="#D4AF37" className="mx-auto mb-6 opacity-50" />
                    <h2 className="text-4xl md:text-6xl font-script text-emerald-700 mb-4">
                        Wassalamu'alaikum
                    </h2>
                    <p className="text-charcoal-700/60 font-arabic text-lg md:text-xl">
                        وَالسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ
                    </p>
                    <p className="text-charcoal-700/50 text-sm mt-2 font-serif italic">
                        Semoga Allah SWT memberkahi pertemuan kita
                    </p>
                </div>

                {/* CTA Button */}
                <button
                    onClick={onRSVP}
                    className="group relative px-10 py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold text-lg tracking-wide overflow-hidden transition-all active:scale-95 hover:scale-105 shadow-emerald mb-16"
                >
                    <span className="relative z-10 flex items-center gap-3 font-display uppercase tracking-widest text-sm">
                        KONFIRMASI KEHADIRAN
                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </span>
                </button>

                {/* Quick Links */}
                <div className="flex justify-center gap-8 text-sm font-medium text-charcoal-700/60 uppercase tracking-[0.2em]">
                    <a href="#gift" className="hover:text-emerald-600 transition-colors">Tanda Kasih</a>
                    <a href="#wishes" className="hover:text-emerald-600 transition-colors">Ucapan</a>
                </div>

                {/* Footer Credits */}
                <div className="mt-24 text-xs text-charcoal-700/40 font-serif">
                    <p className="italic">Didesain dengan ♥ untuk Shinta & Ahsan</p>
                    <p className="mt-2 font-sans text-charcoal-700/30">© 2026 - Ahsan Jipiti</p>
                </div>
            </div>
        </footer>
    );
};
