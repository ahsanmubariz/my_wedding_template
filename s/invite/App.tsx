import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const DEFAULT_TEMPLATE = `Assalamu’alaikum Warahmatullahi Wabarakatuh, Selamat Pagi/Siang/Sore,

Yth. Bapak/Ibu/Saudara/i *[Nama Penerima]*,

Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyampaikan kabar bahagia sekaligus mengundang Bapak/Ibu/Saudara/i untuk hadir pada acara pernikahan kami:

*_Ahsan Mubariz & Shinta Oktaviani J._*

Yang InsyaAllah akan diselenggarakan pada:

Hari/Tanggal: Senin, 18 Mei 2026

Waktu: 11:00 - Selesai

Tempat: Desa Cipinang, Kec. Rajagaluh, Kab. Majalengka

Tanpa mengurangi rasa hormat, detail rangkaian acara dan petunjuk lokasi dapat diakses melalui tautan undangan digital berikut:

🔗 *[invitation link]*

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan meluangkan waktu untuk hadir. Namun jika berhalangan, doa restu dari Bapak/Ibu/Saudara/i sudah sangat berarti bagi kami.

Atas perhatian dan doa restunya, kami ucapkan terima kasih.

Wassalamu’alaikum Warahmatullahi Wabarakatuh.

Hormat kami,
*_Ahsan & Shinta_*`;

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'generate' | 'settings'>('generate');
    const [recipientName, setRecipientName] = useState('');
    const [template, setTemplate] = useState(DEFAULT_TEMPLATE);
    const [isSaving, setIsSaving] = useState(false);
    const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

    // Fetch template from Firebase
    useEffect(() => {
        const fetchTemplate = async () => {
            try {
                const docRef = doc(db, 'config_s', 'template');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setTemplate(docSnap.data().content);
                }
            } catch (error) {
                console.error("Error fetching template:", error);
            }
        };
        fetchTemplate();
    }, []);

    const invitationLink = `${window.location.origin}/s/?name=${encodeURIComponent(recipientName)}`;
    
    const formattedMessage = template
        .replace('[Nama Penerima]', recipientName || 'Nama Tamu')
        .replace('[invitation link]', invitationLink);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(formattedMessage);
            setCopyStatus('copied');
            setTimeout(() => setCopyStatus('idle'), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const handleSaveTemplate = async () => {
        setIsSaving(true);
        try {
            await setDoc(doc(db, 'config_s', 'template'), {
                content: template,
                updatedAt: new Date().toISOString()
            });
            alert('Template saved successfully!');
        } catch (error) {
            console.error("Error saving template:", error);
            alert('Failed to save template.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8 flex flex-col items-center max-w-2xl mx-auto islamic-pattern">
            <header className="w-full mb-8 text-center">
                <h1 className="text-3xl font-display text-emerald-700 mb-2">Invitation Generator (S)</h1>
                <p className="text-zinc-500 text-sm tracking-widest uppercase">For Ahsan & Shinta (Majalengka)</p>
            </header>

            <div className="w-full glass rounded-3xl overflow-hidden shadow-soft">
                {/* Tabs */}
                <div className="flex border-b border-zinc-100 bg-white/50">
                    <button 
                        onClick={() => setActiveTab('generate')}
                        className={`flex-1 py-4 text-sm font-medium transition-all relative ${activeTab === 'generate' ? 'active-tab text-emerald-700' : 'text-zinc-400 hover:text-zinc-600'}`}
                    >
                        Generate Message
                    </button>
                    <button 
                        onClick={() => setActiveTab('settings')}
                        className={`flex-1 py-4 text-sm font-medium transition-all relative ${activeTab === 'settings' ? 'active-tab text-emerald-700' : 'text-zinc-400 hover:text-zinc-600'}`}
                    >
                        Adjust Template
                    </button>
                </div>

                <div className="p-6">
                    {activeTab === 'generate' ? (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-2">Recipient Name</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Bpk. John Doe"
                                    value={recipientName}
                                    onChange={(e) => setRecipientName(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl text-lg bg-white border-gold-400/20"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-2">Preview Message</label>
                                <div className="w-full p-4 rounded-xl bg-cream-50/50 border border-gold-400/20 text-zinc-700 text-sm whitespace-pre-wrap font-sans leading-relaxed min-h-[300px] max-h-[400px] overflow-y-auto custom-scrollbar">
                                    {formattedMessage}
                                </div>
                            </div>

                            <button 
                                onClick={handleCopy}
                                className={`w-full py-4 rounded-xl font-display font-medium text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-emerald ${copyStatus === 'copied' ? 'bg-emerald-800 text-white' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}
                            >
                                {copyStatus === 'copied' ? (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                                        Copied to Clipboard!
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
                                        Copy Message
                                    </>
                                )}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-2">Edit Template</label>
                                <p className="text-[10px] text-zinc-400 mb-2 italic">Use [Nama Penerima] and [invitation link] as placeholders.</p>
                                <textarea 
                                    rows={15}
                                    value={template}
                                    onChange={(e) => setTemplate(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl font-mono text-sm leading-relaxed bg-white border-gold-400/20"
                                />
                            </div>

                            <button 
                                onClick={handleSaveTemplate}
                                disabled={isSaving}
                                className="w-full py-4 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 font-display font-medium text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-emerald"
                            >
                                {isSaving ? 'Saving...' : 'Save Template'}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <footer className="mt-8 text-zinc-400 text-[10px] uppercase tracking-[0.2em]">
                &copy; 2026 Ahsan & Shinta Wedding
            </footer>
        </div>
    );
};

export default App;
