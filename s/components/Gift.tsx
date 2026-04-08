import React, { useState } from 'react';
import { BANK_DETAILS } from '../constants';
import { IslamicStar8Point, GeometricDivider } from './Ornaments';

export const Gift: React.FC = () => {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleCopy = (accountNumber: string, index: number) => {
        navigator.clipboard.writeText(accountNumber);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <section className="py-24 bg-cream-50 flex flex-col items-center justify-center px-6 relative z-10" id="gift">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-script text-emerald-700 mb-2">Tanda Kasih</h2>
                <p className="text-charcoal-700/60 mt-2 text-sm uppercase tracking-widest">Bagi yang ingin berkontribusi</p>
                <GeometricDivider className="max-w-xs mx-auto mt-6" />
            </div>

            <div className="w-full max-w-md space-y-8 relative">
                {BANK_DETAILS.map((bank, index) => (
                    <div key={index} className="relative group">
                        <div className="relative h-64 w-full rounded-2xl bg-gradient-to-br from-cream-100 via-cream-200 to-cream-100 border border-gold-300/40 shadow-soft p-8 flex flex-col justify-between transition-transform duration-500 group-hover:scale-[1.02]">

                            {/* Background Star Pattern */}
                            <div className="absolute top-4 right-4 opacity-10">
                                <IslamicStar8Point size={80} color="#D4AF37" />
                            </div>
                            <div className="absolute bottom-4 left-4 opacity-10">
                                <IslamicStar8Point size={60} color="#059669" />
                            </div>

                            {/* Chip & Bank Logo */}
                            <div className="flex justify-left items-start">
                                <div className="w-12 h-9 rounded-md bg-gradient-to-tr from-emerald-500 via-emerald-400 to-emerald-600 shadow-md border border-emerald-400/30"></div>
                                <span className="font-bold text-emerald-700 italic tracking-wider text-lg font-display pl-2">{bank.bankName}</span>
                            </div>

                            {/* Number */}
                            <div className="space-y-3 relative z-10">
                                <p className="text-[10px] text-charcoal-700/60 uppercase tracking-[0.2em] font-medium">Nomor Rekening</p>
                                <div className="flex items-center justify-between">
                                    <p className="text-2xl md:text-3xl font-display text-charcoal-800 tracking-widest">
                                        {bank.accountNumber}
                                    </p>
                                    <button
                                        onClick={() => handleCopy(bank.accountNumber, index)}
                                        className="p-2 rounded-full bg-emerald-50 hover:bg-emerald-100 transition-colors border border-emerald-200"
                                        title="Salin Nomor"
                                    >
                                        {copiedIndex === index ? (
                                            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5 text-charcoal-700/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Bottom Info */}
                            <div className="flex justify-between items-end relative z-10">
                                <div>
                                    <p className="text-[10px] text-charcoal-700/60 uppercase tracking-widest">Pemilik Rekening</p>
                                    <p className="text-sm font-medium text-charcoal-800 tracking-wide mt-1 font-serif">{bank.accountName}</p>
                                </div>
                            </div>

                            {/* Gloss effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent pointer-events-none"></div>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
};
