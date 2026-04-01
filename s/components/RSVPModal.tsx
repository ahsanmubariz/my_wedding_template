import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { IslamicCorner, CrescentMoon } from './Ornaments';

interface RSVPModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const RSVPModal: React.FC<RSVPModalProps> = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        attending: 'yes',
        guests: 1,
        dietary: ''
    });

    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setStep(0);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isOpen]);

    useGSAP(() => {
        if (isOpen) {
            gsap.to(modalRef.current, {
                opacity: 1,
                duration: 0.4,
                pointerEvents: 'auto',
                ease: 'power2.out'
            });
            gsap.fromTo(contentRef.current,
                { y: 50, scale: 0.95, opacity: 0 },
                { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.2)', delay: 0.1 }
            );
        } else {
            gsap.to(contentRef.current, {
                y: 50,
                scale: 0.95,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in'
            });
            gsap.to(modalRef.current, {
                opacity: 0,
                duration: 0.3,
                pointerEvents: 'none',
                delay: 0.1,
                ease: 'power2.in'
            });
        }
    }, { scope: modalRef, dependencies: [isOpen] });

    useGSAP(() => {
        if (!formRef.current) return;
        gsap.fromTo(formRef.current,
            { x: 20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
        );
    }, { dependencies: [step] });

    const handleNext = () => {
        if (step === 0 && !formData.name) return;
        setStep(prev => prev + 1);
    };

    const handleSubmit = async () => {
        try {
            await addDoc(collection(db, 'rsvpv2'), {
                ...formData,
                timestamp: serverTimestamp(),
                submittedAt: new Date().toISOString()
            });
            setStep(4);
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Terjadi kesalahan saat menyimpan data. Silakan coba lagi.");
        }
    };

    if (!isOpen && step === 0) return null;

    return (
        <div
            ref={modalRef}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 opacity-0 pointer-events-none"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-cream-50/90 backdrop-blur-xl transition-colors"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                ref={contentRef}
                className="relative w-full max-w-lg glass-strong rounded-[2rem] shadow-soft border border-gold-300/30 overflow-hidden flex flex-col max-h-[90vh]"
            >
                {/* Islamic Corner Decorations */}
                <div className="absolute top-0 left-0 z-30">
                    <IslamicCorner position="top-left" size={40} />
                </div>
                <div className="absolute top-0 right-0 z-30">
                    <IslamicCorner position="top-right" size={40} />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gold-200/50 bg-emerald-50">
                    <div className="flex items-center gap-3">
                        <CrescentMoon size={24} color="#059669" />
                        <h3 className="text-lg font-display tracking-widest text-emerald-700 uppercase">Konfirmasi</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-emerald-100 transition-colors text-charcoal-700/60 hover:text-charcoal-800"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="p-8 overflow-y-auto custom-scrollbar min-h-[300px] bg-cream-50">
                    <div ref={formRef}>

                        {/* STEP 0: NAME */}
                        {step === 0 && (
                            <div className="space-y-6">
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-script text-emerald-700 mb-2">Siapakah Anda?</h2>
                                    <p className="text-charcoal-700/60 text-sm font-light">Mohon masukkan nama lengkap sesuai undangan.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="group">
                                        <label className="block text-xs uppercase tracking-[0.1em] text-charcoal-700/60 mb-2 ml-2">Nama Lengkap</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Jane Doe"
                                            className="w-full bg-cream-100 border border-gold-200/50 rounded-xl px-6 py-4 text-charcoal-800 placeholder-charcoal-700/40 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/50 transition-all text-lg font-serif"
                                            autoFocus
                                        />
                                    </div>
                                    <div className="group">
                                        <label className="block text-xs uppercase tracking-[0.1em] text-charcoal-700/60 mb-2 ml-2">Alamat Email</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="jane@example.com"
                                            className="w-full bg-cream-100 border border-gold-200/50 rounded-xl px-6 py-4 text-charcoal-800 placeholder-charcoal-700/40 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/50 transition-all font-serif"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 1: ATTENDANCE */}
                        {step === 1 && (
                            <div className="space-y-6">
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-script text-emerald-700 mb-2">Apakah Anda akan hadir?</h2>
                                    <p className="text-charcoal-700/60 text-sm font-light">Kami sangat berharap dapat merayakan bersama Anda.</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setFormData({ ...formData, attending: 'yes' })}
                                        className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-3 ${formData.attending === 'yes'
                                            ? 'bg-emerald-100 text-emerald-700 border-emerald-400 shadow-emerald scale-[1.02]'
                                            : 'bg-cream-100 text-charcoal-700/60 border-gold-200/50 hover:border-gold-300'
                                            }`}
                                    >
                                        <span className="text-3xl">✨</span>
                                        <span className="font-medium">Hadir</span>
                                    </button>
                                    <button
                                        onClick={() => setFormData({ ...formData, attending: 'no' })}
                                        className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-3 ${formData.attending === 'no'
                                            ? 'bg-rose-100 text-rose-700 border-rose-300'
                                            : 'bg-cream-100 text-charcoal-700/60 border-gold-200/50 hover:border-gold-300'
                                            }`}
                                    >
                                        <span className="text-3xl">😔</span>
                                        <span className="font-medium">Maaf, Tidak Bisa</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: DETAILS */}
                        {step === 2 && (
                            <div className="space-y-6">
                                {formData.attending === 'yes' ? (
                                    <>
                                        <div className="text-center mb-8">
                                            <h2 className="text-2xl font-script text-emerald-700 mb-2">Detail Tambahan</h2>
                                            <p className="text-charcoal-700/60 text-sm">Bantu kami mempersiapkan yang terbaik untuk Anda.</p>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs uppercase tracking-wider text-charcoal-700/60 mb-2 ml-2">Jumlah Tamu (Termasuk Anda)</label>
                                                <div className="flex items-center gap-4 bg-cream-100 rounded-2xl p-2 border border-gold-200/50">
                                                    <button
                                                        onClick={() => setFormData(prev => ({ ...prev, guests: Math.max(1, prev.guests - 1) }))}
                                                        className="w-12 h-12 rounded-xl bg-cream-200 text-charcoal-800 hover:bg-cream-300 transition-colors flex items-center justify-center"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="flex-1 text-center font-mono text-xl text-charcoal-800">{Math.max(1, formData.guests)}</span>
                                                    <button
                                                        onClick={() => setFormData(prev => ({ ...prev, guests: Math.min(5, prev.guests + 1) }))}
                                                        className="w-12 h-12 rounded-xl bg-cream-200 text-charcoal-800 hover:bg-cream-300 transition-colors flex items-center justify-center"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-10">
                                        <p className="text-charcoal-700 mb-4">Kami akan merindukan kehadiran Anda!</p>
                                        <p className="text-charcoal-700/60 text-sm">Silakan tinggalkan pesan di bagian ucapan.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* STEP 4: SUCCESS */}
                        {step === 4 && (
                            <div className="text-center py-10">
                                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-script text-emerald-700 mb-2">Jazakumullah Khairan!</h2>
                                <p className="text-charcoal-700/60">Konfirmasi Anda telah kami terima.</p>
                                <p className="text-charcoal-700/50 text-sm mt-2 font-arabic">جَزَاكُمُ اللَّهُ خَيْرًا</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Controls */}
                {step < 4 && (
                    <div className="p-6 border-t border-gold-200/50 bg-cream-100 flex justify-between items-center">
                        {step > 0 ? (
                            <button
                                onClick={() => setStep(prev => prev - 1)}
                                className="text-sm text-charcoal-700/60 hover:text-charcoal-800 transition-colors px-4 py-2"
                            >
                                Kembali
                            </button>
                        ) : (
                            <div></div>
                        )}

                        <button
                            onClick={step === 2 ? handleSubmit : handleNext}
                            disabled={step === 0 && !formData.name}
                            className={`px-8 py-3 rounded-full font-medium text-sm transition-all ${(step === 0 && !formData.name)
                                ? 'bg-cream-200 text-charcoal-700/40 cursor-not-allowed'
                                : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:scale-105 active:scale-95 shadow-emerald'
                                }`}
                        >
                            {step === 2 ? 'Kirim Konfirmasi' : 'Lanjut'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
