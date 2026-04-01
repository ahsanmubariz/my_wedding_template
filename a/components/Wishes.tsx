import React, { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, limit, startAfter, getDocs, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { Wish } from '../types';

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
        // We only listen to the most recent items initially to establish the "head" of the list
        // and separate pagination logic for older items.
        // However, for simplicity in this hybrid approach:
        // 1. We'll listen to the first PAGE_SIZE items in real-time.
        // 2. Pagination (older items) will be fetched one-time via getDocs avoiding duplicate listeners.

        const q = query(collection(db, 'wishes'), orderBy('timestamp', 'desc'), limit(PAGE_SIZE));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedWishes = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                timestamp: doc.data().submittedAt ? new Date(doc.data().submittedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Just now'
            })) as Wish[];

            // This replaces the "head" of our list. 
            // If we have loaded more pages, we need to merge carefully or just reset.
            // For true infinite scroll with real-time, it's complex. 
            // Simple approach: When a new item comes (real-time), it just updates the top.
            // Pagination appends to the bottom.

            setWishes(prev => {
                // Creating a map of existing wishes to preserve "older" ones we might have fetched
                const existingIds = new Set(fetchedWishes.map(w => w.id));
                const olderWishes = prev.filter(w => !existingIds.has(w.id));
                return [...fetchedWishes, ...olderWishes];
            });

            if (snapshot.docs.length > 0) {
                // If it's the initial load (prev wishes empty) or we just want to ensure we have a cursor
                setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
            }
        });

        // We also need to get the last visible document for the initial batch to set up pagination
        // But onSnapshot fires asynchronously.
        // Let's effectively handle `lastDoc` in the scroll handler or state updater.

        return () => unsubscribe();
    }, []);

    // Update lastDoc whenever wishes change to point to the very last item
    // This assumes the list is always sorted NEWEST -> OLDEST
    useEffect(() => {
        if (wishes.length > 0) {
            // We need the actual DocumentSnapshot, not just the data, for startAfter.
            // Since we can't easily validly serialize/store the snapshot in the Wish type,
            // we have to re-fetch or store it separately.
            // Hack/Optimization: We'll fetch the snapshot corresponding to the last ID if needed, 
            // OR we maintain a parallel array of snapshots? 
            // Simpler: Just store the 'timestamp' or 'submittedAt' of the last item for cursors 
            // if we weren't using DocumentSnapshot objects.
            // But Firestore SDK favors DocumentSnapshots.
            // Let's implement `loadMore` to just query based on the last item in the current `wishes` list.
        }
    }, [wishes]);

    const loadMore = useCallback(async () => {
        if (loading || !hasMore || wishes.length === 0) return;
        setLoading(true);

        try {
            // Find the last actual document snapshot if available
            // Since we can't strongly rely on `lastDoc` state being perfectly in sync with `wishes` array last item for hybrid real-time+pagination
            // it's safer to rely on the `lastDoc` state if we are chaining pagination, OR 
            // if this is the first "load more", we need to derive it from the current list.

            // However, we are storing `lastVisible` state.
            if (!lastDoc) return;

            const q = query(
                collection(db, 'wishes'),
                orderBy('timestamp', 'desc'),
                startAfter(lastDoc),
                limit(PAGE_SIZE)
            );

            const snapshot = await getDocs(q);

            if (!snapshot.empty) {
                const newWishes = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    timestamp: doc.data().submittedAt ? new Date(doc.data().submittedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Just now'
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

    // 3. Scroll Handler
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop } = e.currentTarget;
        // In flex-col-reverse, content grows upwards.
        // If content overflows, scrollTop 0 is the TOP (Oldest history).
        // So we want to load more when user reaches the TOP.
        if (scrollTop <= 50) {
            loadMore();
        }
    };

    // Auto-scroll to bottom on initial load and when new messages arrive (if strictly new)
    // For pagination (prepending history), we want to maintain relative position.
    // But since 'loadMore' appends to the end of the array (Top of view), 
    // HTML standard behavior usually keeps visual position stable if content is added to top?
    // No, if content is added to top, scroll position stays same (0), so we see new content immediately.
    // That causes a jump. A "Chat Scroll" implementation usually manages this manually.
    // optimizing "Jump" later. For now, basic logic.

    // We scroll to bottom only on *initial* load or *sending* a message.
    useEffect(() => {
        if (!loading && listRef.current && !lastDoc) {
            // Basic heuristic: If we don't have a cursor yet (first load) or...
            // user just sent a message.
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
            await addDoc(collection(db, 'wishes'), {
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
        <section ref={sectionRef} id="wishes" className="min-h-screen bg-zinc-950 py-24 px-4 flex items-center justify-center relative">
            <div className="w-full max-w-2xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight mb-4 text-white">Kirim Ucapan</h2>
                    <p className="text-zinc-500 font-serif italic text-lg">Tinggalkan pesan dan doa untuk kami.</p>
                </div>

                {/* Chat Interface */}
                <div className="glass-strong rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10">
                    {/* Header */}
                    <div className="bg-white/5 border-b border-white/5 p-4 flex items-center gap-4 backdrop-blur-md sticky top-0 z-10">
                        <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-xs font-bold text-black shadow-lg shadow-gold-500/20">
                            J&J
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-white tracking-wide">Mempelai</span>
                            <span className="text-[10px] text-zinc-400 uppercase tracking-widest">Buku Tamu</span>
                        </div>
                    </div>

                    {/* Message List */}
                    <div
                        ref={listRef}
                        onScroll={handleScroll}
                        className="p-6 space-y-6 min-h-[400px] max-h-[600px] overflow-y-auto custom-scrollbar bg-black/20 flex flex-col-reverse"
                    >
                        {wishes.map((wish) => (
                            <div
                                key={wish.id}
                                className="chat-bubble flex flex-col items-start group"
                            >
                                <span className="text-[10px] text-zinc-500 ml-4 mb-2 uppercase tracking-wider">{wish.name}</span>
                                <div
                                    className="max-w-[85%] px-6 py-4 rounded-3xl rounded-bl-sm text-sm leading-relaxed bg-white/5 backdrop-blur-sm text-zinc-200 border border-white/5 shadow-sm group-hover:bg-white/10 transition-colors"
                                >
                                    {wish.message}
                                </div>
                                <span className="text-[10px] text-zinc-600 mt-2 ml-2 font-mono">
                                    {wish.timestamp}
                                </span>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex justify-center py-4">
                                <span className="w-6 h-6 border-2 border-white/10 border-t-gold-400 rounded-full animate-spin"></span>
                            </div>
                        )}

                        {!hasMore && wishes.length > 10 && (
                            <div className="text-center py-4 text-xs text-zinc-600 uppercase tracking-widest">
                                Semua ucapan telah dimuat
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white/5 border-t border-white/5">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nama Anda (Wajib)"
                                className="w-full bg-black/20 border border-white/5 rounded-xl px-6 py-3 focus:outline-none focus:border-gold-400/50 text-white placeholder-zinc-600 text-sm transition-colors"
                                required
                            />
                            <div className="flex gap-2 items-center">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Tulis ucapan..."
                                        className="w-full bg-black/20 border border-white/5 rounded-full px-6 py-3 focus:outline-none focus:border-gold-400/50 text-white placeholder-zinc-600 transition-colors"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={!input.trim() || !name.trim()}
                                    className={`p-3 rounded-full transition-all shadow-lg ${(input.trim() && name.trim()) ? 'bg-gold-500 text-black scale-100 hover:bg-gold-400' : 'bg-zinc-800 text-zinc-600 scale-90'
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