import React, { useState } from 'react';
import { BANK_DETAILS } from '../constants';

export const Gift: React.FC = () => {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleCopy = (accountNumber: string, index: number) => {
        navigator.clipboard.writeText(accountNumber);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <section className="py-24 bg-zinc-950 flex flex-col items-center justify-center px-6 relative z-10" id="gift">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Tanda Kasih</h2>
                <p className="text-zinc-500 mt-2 text-sm uppercase tracking-widest">Bagi yang ingin berkontribusi</p>
            </div>

            <div className="w-full max-w-md space-y-8 relative perspective-1000">
                {BANK_DETAILS.map((bank, index) => (
                    <div key={index} className="relative group">
                        <div className="relative h-64 w-full rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-950 border border-white/10 shadow-2xl p-8 flex flex-col justify-between transition-transform duration-500 group-hover:scale-[1.02]">

                            {/* Chip & Contactless */}
                            <div className="flex justify-between items-start opacity-100">
                                <div className="w-12 h-9 rounded-md bg-gradient-to-tr from-yellow-600 via-yellow-300 to-yellow-500 shadow-md border border-yellow-400/30"></div>
                                <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>

                            {/* Number */}
                            <div className="space-y-3">
                                <p className="text-[10px] text-zinc-400 uppercase tracking-[0.2em] font-medium">Nomor Rekening</p>
                                <div className="flex items-center justify-between">
                                    <p className="text-2xl md:text-3xl font-display text-white tracking-widest drop-shadow-md">
                                        {bank.accountNumber}
                                    </p>
                                    <button
                                        onClick={() => handleCopy(bank.accountNumber, index)}
                                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
                                        title="Salin Nomor"
                                    >
                                        {copiedIndex === index ? (
                                            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Bottom Info */}
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest">Pemilik Rekening</p>
                                    <p className="text-sm font-medium text-zinc-200 tracking-wide mt-1 font-serif">{bank.accountName}</p>
                                </div>
                                <p className="font-bold text-white/50 italic tracking-wider text-xl font-display">{bank.bankName}</p>
                            </div>

                            {/* Gloss effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none mix-blend-overlay"></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};