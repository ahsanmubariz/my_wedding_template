import React, { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, limit, startAfter, getDocs, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { Wish } from '../types';
import { GeometricDivider, CrescentMoon } from './Ornaments';

const PAGE_SIZE = 10;

export const Wishes: React.FC = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const recipientName = queryParams.get('name');
    const sectionRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const [name, setName] = useState(recipientName || '');
    const [input, setInput] = useState('');
    const [wishes, setWishes] = useState<Wish[]>([]);
    const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // Initial Load & Real-time Listener for Newest Items
    useEffect(() => {
        const q = query(collection(db, 'wishesv2'), orderBy('timestamp', 'desc'), limit(PAGE_SIZE));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedWishes = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                timestamp: doc.data().submittedAt ? new Date(doc.data().submittedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Baru saja'
            })) as Wish[];

            setWishes(prev => {
                const existingIds = new Set(fetchedWishes.map(w => w.id));
                const olderWishes = prev.filter(w => !existingIds.has(w.id));
                return [...fetchedWishes, ...olderWishes];
            });

            if (snapshot.docs.length > 0) {
                setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
            }
        });

        return () => unsubscribe();
    }, []);

    const loadMore = useCallback(async () => {
        if (loading || !hasMore || wishes.length === 0 || !lastDoc) return;
        setLoading(true);

        try {
            const q = query(
                collection(db, 'wishesv2'),
                orderBy('timestamp', 'desc'),
                startAfter(lastDoc),
                limit(PAGE_SIZE)
            );

            const snapshot = await getDocs(q);

            if (!snapshot.empty) {
                const newWishes = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    timestamp: doc.data().submittedAt ? new Date(doc.data().submittedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Baru saja'
                })) as Wish[];

                setWishes(prev => [...prev, ...newWishes]);
                setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error loading more wishes:", error);
        }

        setLoading(false);
    }, [loading, hasMore, lastDoc, wishes]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop } = e.currentTarget;
        if (scrollTop <= 50) {
            loadMore();
        }
    };

    useEffect(() => {
        if (!loading && listRef.current && !lastDoc) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [wishes, loading, lastDoc]);

    useGSAP(() => {
        const bubbles = gsap.utils.toArray('.chat-bubble');

        gsap.from(bubbles, {
            scrollTrigger: {
                trigger: listRef.current,
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "back.out(1.7)"
        });

    }, { scope: sectionRef, dependencies: [wishes] });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !name.trim()) return;

        try {
            await addDoc(collection(db, 'wishesv2'), {
                name: name.trim(),
                message: input,
                timestamp: serverTimestamp(),
                submittedAt: new Date().toISOString()
            });
            setInput('');
            setName('');
        } catch (error) {
            console.error("Error adding wish: ", error);
        }
    };

    return (
        <section ref={sectionRef} className="min-h-screen bg-cream-100 py-24 px-4 flex items-center justify-center relative" id="wishes">
            <div className="w-full max-w-2xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-script text-emerald-700 mb-4">Kirim Ucapan</h2>
                    <p className="text-charcoal-700/60 font-serif italic text-lg">Tinggalkan doa dan ucapan untuk kami.</p>
                    <GeometricDivider className="max-w-xs mx-auto mt-6" />
                </div>

                {/* Chat Interface */}
                <div className="glass-strong rounded-[2.5rem] overflow-hidden shadow-soft border border-gold-300/30">
                    {/* Header */}
                    <div className="bg-emerald-50 border-b border-gold-200/50 p-4 flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-emerald">
                            <CrescentMoon size={20} color="#ffffff" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-charcoal-800 tracking-wide">Mempelai</span>
                            <span className="text-[10px] text-charcoal-700/60 uppercase tracking-widest">Buku Tamu</span>
                        </div>
                    </div>

                    {/* Message List */}
                    <div
                        ref={listRef}
                        onScroll={handleScroll}
                        className="p-6 space-y-6 min-h-[400px] max-h-[600px] overflow-y-auto custom-scrollbar bg-cream-50/50 flex flex-col-reverse"
                    >
                        {wishes.map((wish) => (
                            <div
                                key={wish.id}
                                className="chat-bubble flex flex-col items-start group"
                            >
                                <span className="text-[10px] text-emerald-700 ml-4 mb-2 uppercase tracking-wider font-medium">{wish.name}</span>
                                <div
                                    className="max-w-[85%] px-6 py-4 rounded-3xl rounded-bl-sm text-sm leading-relaxed bg-sage-100 text-charcoal-800 border border-sage-200 shadow-sm group-hover:bg-sage-200 transition-colors"
                                >
                                    {wish.message}
                                </div>
                                <span className="text-[10px] text-charcoal-700/50 mt-2 ml-2 font-mono">
                                    {wish.timestamp}
                                </span>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex justify-center py-4">
                                <span className="w-6 h-6 border-2 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></span>
                            </div>
                        )}

                        {!hasMore && wishes.length > 10 && (
                            <div className="text-center py-4 text-xs text-charcoal-700/40 uppercase tracking-widest">
                                Semua ucapan telah dimuat
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-cream-100 border-t border-gold-200/50">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nama Anda (Wajib)"
                                className="w-full bg-cream-50 border border-gold-200/50 rounded-xl px-6 py-3 focus:outline-none focus:border-emerald-400 text-charcoal-800 placeholder-charcoal-700/40 text-sm transition-colors"
                                required
                            />
                            <div className="flex gap-2 items-center">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Tulis ucapan dan doa..."
                                        className="w-full bg-cream-50 border border-gold-200/50 rounded-full px-6 py-3 focus:outline-none focus:border-emerald-400 text-charcoal-800 placeholder-charcoal-700/40 transition-colors"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={!input.trim() || !name.trim()}
                                    className={`p-3 rounded-full transition-all shadow-md ${(input.trim() && name.trim()) ? 'bg-emerald-600 text-white scale-100 hover:bg-emerald-700' : 'bg-cream-200 text-charcoal-700/40 scale-90'
                                        }`}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="22" y1="2" x2="11" y2="13"></line>
                                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
