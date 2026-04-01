
import React from 'react';

interface FooterProps {
  onRSVP: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onRSVP }) => {
  return (
    <footer className="relative z-20 bg-zinc-950 border-t border-white/10 py-24">
      <div className="container mx-auto px-6 text-center flex flex-col items-center">
        <h2 className="text-5xl md:text-7xl font-display font-medium tracking-tight text-white mb-12 opacity-80">
          Sampai Jumpa.
        </h2>

        <button
          onClick={onRSVP}
          className="group relative px-10 py-5 bg-white text-black rounded-full font-bold text-lg tracking-wide overflow-hidden transition-transform active:scale-95 hover:scale-105 shadow-[0_0_50px_-10px_rgba(255,255,255,0.3)] mb-16"
        >
          <span className="relative z-10 flex items-center gap-3 font-display uppercase tracking-widest text-sm">
            KONFIRMASI KEHADIRAN
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-gold-100 to-gold-300 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        <div className="flex justify-center gap-8 text-sm font-medium text-zinc-500 uppercase tracking-[0.2em]">
          <a href="#gift" className="hover:text-gold-300 transition-colors">Tanda Kasih</a>
          <a href="#wishes" className="hover:text-gold-300 transition-colors">Ucapan</a>
        </div>

        <div className="mt-24 text-xs text-zinc-800 font-serif italic">
          <p>Didesain dengan ♥ untuk Ahsan & Shinta</p>
          <p className="mt-2 no-italic font-sans text-zinc-900">© 2026 - Ahsan Jipiti</p>
        </div>
      </div>
    </footer>
  );
};
