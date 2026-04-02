
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RSVPModal: React.FC<RSVPModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0);
  const queryParams = new URLSearchParams(window.location.search);
  const recipientName = queryParams.get('name');
  const [formData, setFormData] = useState({
    name: recipientName || '',
    guests: 1
  });

  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Reset step when opening
  useEffect(() => {
    if (isOpen) {
      setStep(0);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // Animation for Opening/Closing
  useGSAP(() => {
    if (isOpen) {
      // Entry animation
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
      // Exit animation
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

  // Animation for Step Changes
  useGSAP(() => {
    if (!formRef.current) return;

    gsap.fromTo(formRef.current,
      { x: 20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
    );
  }, { dependencies: [step] });

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, 'rsvps'), {
        ...formData,
        timestamp: serverTimestamp(),
        submittedAt: new Date().toISOString()
      });
      setStep(1); // Success state
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
        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-xl transition-colors"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        ref={contentRef}
        className="relative w-full max-w-lg glass-strong rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
          <h3 className="text-lg font-display tracking-widest text-gold-200 uppercase">RSVP</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-zinc-400 hover:text-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-8 overflow-y-auto custom-scrollbar min-h-[300px]">
          <div ref={formRef}>

            {/* STEP 0: FORM */}
            {step === 0 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-display text-white mb-2">Konfirmasi Kehadiran</h2>
                  <p className="text-zinc-400 text-sm font-light">Mohon masukkan nama dan jumlah tamu.</p>
                </div>
                <div className="space-y-6">
                  <div className="group">
                    <label className="block text-xs uppercase tracking-[0.1em] text-zinc-500 mb-2 ml-2">Nama Lengkap</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/50 transition-all text-lg font-serif"
                      autoFocus
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-2 ml-2">Jumlah Tamu (Termasuk Anda)</label>
                    <div className="flex items-center gap-4 bg-zinc-950 rounded-2xl p-2 border border-zinc-800">
                      <button
                        onClick={() => setFormData(prev => ({ ...prev, guests: Math.max(1, prev.guests - 1) }))}
                        className="w-12 h-12 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 transition-colors flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-mono text-xl">{Math.max(1, formData.guests)}</span>
                      <button
                        onClick={() => setFormData(prev => ({ ...prev, guests: Math.min(5, prev.guests + 1) }))}
                        className="w-12 h-12 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 transition-colors flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 1: SUCCESS */}
            {step === 1 && (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Terima Kasih!</h2>
                <p className="text-zinc-400">Konfirmasi Anda telah kami terima.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Controls */}
        {step === 0 && (
          <div className="p-6 border-t border-white/5 bg-zinc-900/50 flex justify-end items-center">
            <button
              onClick={handleSubmit}
              disabled={!formData.name}
              className={`px-8 py-3 rounded-full font-medium text-sm transition-all ${!formData.name
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                : 'bg-white text-black hover:scale-105 active:scale-95 shadow-lg shadow-white/10'
                }`}
            >
              Kirim Konfirmasi
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
