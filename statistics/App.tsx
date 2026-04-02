import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, getCountFromServer } from 'firebase/firestore';
import { db } from '../firebase';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        visitsA: 0,
        visitsS: 0,
        attendeesA: 0,
        attendeesS: 0,
    });

    const [wishesA, setWishesA] = useState<any[]>([]);
    const [wishesS, setWishesS] = useState<any[]>([]);

    const [rsvpsA, setRsvpsA] = useState<any[]>([]);
    const [rsvpsS, setRsvpsS] = useState<any[]>([]);

    useEffect(() => {
        const authStat = sessionStorage.getItem('statistics_auth');
        if (authStat === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const expectedUser = import.meta.env.VITE_STATISTICS_USERNAME;
        const expectedPass = import.meta.env.VITE_STATISTICS_PASSWORD;

        if (username === expectedUser && password === expectedPass) {
            sessionStorage.setItem('statistics_auth', 'true');
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Invalid credentials');
        }
    };

    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                // 1. Page Visits
                const visitsAQuery = await getCountFromServer(collection(db, 'visits_a'));
                const visitsSQuery = await getCountFromServer(collection(db, 'visits_s'));
                
                // 2. Attendees from RSVPs
                let attendeesACount = 0;
                let attendeesSCount = 0;

                const rsvpsASnapshot = await getDocs(query(collection(db, 'rsvps'), orderBy('timestamp', 'desc')));
                const rsA: any[] = [];
                rsvpsASnapshot.forEach(doc => {
                    const data = doc.data();
                    rsA.push({ id: doc.id, ...data });
                    const guests = Number(data.guests) || 1;
                    attendeesACount += guests;
                });
                setRsvpsA(rsA);

                const rsvpsSSnapshot = await getDocs(query(collection(db, 'rsvpv2'), orderBy('timestamp', 'desc')));
                const rsS: any[] = [];
                rsvpsSSnapshot.forEach(doc => {
                    const data = doc.data();
                    rsS.push({ id: doc.id, ...data });
                    const guests = Number(data.guests) || 1;
                    attendeesSCount += guests;
                });
                setRsvpsS(rsS);

                setStats({
                    visitsA: visitsAQuery.data().count,
                    visitsS: visitsSQuery.data().count,
                    attendeesA: attendeesACount,
                    attendeesS: attendeesSCount,
                });

                // 3. Wishes
                const wishesAQuery = query(collection(db, 'wishes'), orderBy('timestamp', 'desc'));
                const wishesASnap = await getDocs(wishesAQuery);
                const wA = wishesASnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                const wishesSQuery = query(collection(db, 'wishesv2'), orderBy('timestamp', 'desc'));
                const wishesSSnap = await getDocs(wishesSQuery);
                const wS = wishesSSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                setWishesA(wA);
                setWishesS(wS);

            } catch (err) {
                console.error('Error fetching data', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-950 font-sans">
                <div className="w-full max-w-sm glass p-8 rounded-2xl border border-white/10 text-center">
                    <h1 className="text-2xl font-bold mb-6 text-white text-left">Dashboard Login</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-400 focus:outline-none transition-colors"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-400 focus:outline-none transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <p className="text-red-400 text-sm text-left">{error}</p>}
                        <button
                            type="submit"
                            className="w-full bg-gold-500 hover:bg-gold-400 text-zinc-900 font-semibold py-3 rounded-lg transition-colors"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white font-sans">
                <div className="w-8 h-8 border-4 border-zinc-800 border-t-gold-400 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex justify-between items-center border-b border-white/10 pb-6">
                    <h1 className="text-3xl font-bold text-white">Wedding Analytics</h1>
                    <button
                        onClick={() => {
                            sessionStorage.removeItem('statistics_auth');
                            setIsAuthenticated(false);
                        }}
                        className="text-sm px-4 py-2 hover:bg-white/5 rounded-lg border border-white/10 transition-colors"
                    >
                        Sign Out
                    </button>
                </div>

                {/* Overviews */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* A Stats */}
                    <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/5">
                        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gold-400"></div>
                            Makassar Venue (/a)
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                                <p className="text-sm text-zinc-500 mb-1">Total Visits</p>
                                <p className="text-3xl font-bold text-white">{stats.visitsA}</p>
                            </div>
                            <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                                <p className="text-sm text-zinc-500 mb-1">Total Attendees</p>
                                <p className="text-3xl font-bold text-white">{stats.attendeesA}</p>
                            </div>
                        </div>
                    </div>

                    {/* S Stats */}
                    <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/5">
                        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                            Majalengka Venue (/s)
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                                <p className="text-sm text-zinc-500 mb-1">Total Visits</p>
                                <p className="text-3xl font-bold text-white">{stats.visitsS}</p>
                            </div>
                            <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                                <p className="text-sm text-zinc-500 mb-1">Total Attendees</p>
                                <p className="text-3xl font-bold text-white">{stats.attendeesS}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wishes Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* A Wishes */}
                    <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/5 flex flex-col max-h-[600px]">
                        <h3 className="text-lg font-medium text-white mb-4">Makassar Comments ({wishesA.length})</h3>
                        <div className="overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                            {wishesA.length === 0 ? <p className="text-sm text-zinc-500">No comments yet.</p> : null}
                            {wishesA.map(w => (
                                <div key={w.id} className="bg-black/30 p-4 rounded-xl border border-white/5">
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="font-medium text-white">{w.name}</p>
                                        <span className="text-xs text-zinc-500">{new Date(w.submittedAt).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-sm text-zinc-300 whitespace-pre-line">{w.message}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* S Wishes */}
                    <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/5 flex flex-col max-h-[600px]">
                        <h3 className="text-lg font-medium text-white mb-4">Majalengka Comments ({wishesS.length})</h3>
                        <div className="overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                            {wishesS.length === 0 ? <p className="text-sm text-zinc-500">No comments yet.</p> : null}
                            {wishesS.map(w => (
                                <div key={w.id} className="bg-black/30 p-4 rounded-xl border border-white/5">
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="font-medium text-white">{w.name}</p>
                                        <span className="text-xs text-zinc-500">{new Date(w.submittedAt).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-sm text-zinc-300 whitespace-pre-line">{w.message}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Attendees Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    
                    {/* A Attendees */}
                    <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/5 flex flex-col max-h-[600px]">
                        <h3 className="text-lg font-medium text-white mb-4">Makassar Attendees ({rsvpsA.length} RSVPs)</h3>
                        <div className="overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                            {rsvpsA.length === 0 ? <p className="text-sm text-zinc-500">No RSVPs yet.</p> : null}
                            {rsvpsA.map(r => (
                                <div key={r.id} className="bg-black/30 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                                    <div>
                                        <p className="font-medium text-white">{r.name}</p>
                                        <span className="text-xs text-zinc-500">{r.submittedAt ? new Date(r.submittedAt).toLocaleDateString() : ''}</span>
                                    </div>
                                    <div className="bg-gold-500/20 text-gold-400 px-3 py-1 rounded-lg font-bold text-sm">
                                        {r.guests} Tamu
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* S Attendees */}
                    <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/5 flex flex-col max-h-[600px]">
                        <h3 className="text-lg font-medium text-white mb-4">Majalengka Attendees ({rsvpsS.length} RSVPs)</h3>
                        <div className="overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                            {rsvpsS.length === 0 ? <p className="text-sm text-zinc-500">No RSVPs yet.</p> : null}
                            {rsvpsS.map(r => (
                                <div key={r.id} className="bg-black/30 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                                    <div>
                                        <p className="font-medium text-white">{r.name}</p>
                                        <span className="text-xs text-zinc-500">{r.submittedAt ? new Date(r.submittedAt).toLocaleDateString() : ''}</span>
                                    </div>
                                    <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-lg font-bold text-sm">
                                        {r.guests} Tamu
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default App;
