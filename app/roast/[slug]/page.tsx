'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '../../lib/SupabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

type Roast = {
    id: string; slug: string; roaster: string; roastee: string;
    content: string; status: 'pending' | 'accepted' | 'rejected';
    created_at: string; amount?: string; tiplink?: string;
};

export default function RoastSlugPage() {
    const params = useParams();
    const router = useRouter();
    const [roast, setRoast] = useState<Roast | null>(null);
    const [accepted, setAccepted] = useState(false);
    const [loading, setLoading] = useState(true);

    const slug = typeof params.slug === 'string' ? params.slug : '';

    useEffect(() => {
        const fetchRoast = async () => {
            const { data } = await supabase.from('roasts').select('*').eq('slug', slug).single();
            if (data) {
                setRoast(data);
                setAccepted(data.status === 'accepted');
            }
            setLoading(false);
        };
        fetchRoast();
    }, [slug]);

    if (loading) return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center">
            <img src="/loading-doodle.gif" className="w-40 h-40" alt="loading" />
            <p className="text-[#BAFF29] font-black animate-pulse uppercase tracking-widest mt-4">Scanning On-Chain Burn...</p>
        </div>
    );

    if (!roast) return null;

    return (
        <div className="min-h-screen bg-[#000] flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                className="max-w-xl w-full bg-[#111] border-[6px] border-black rounded-[40px] shadow-[20px_20px_0px_0px_#9381ff] overflow-hidden relative"
            >
                {/* Top Banner */}
                <div className="bg-[#9381ff] p-4 text-center border-b-[6px] border-black">
                    <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                        Incoming Burn Challenge 🧨
                    </h1>
                </div>

                <div className="p-8 space-y-8">
                    {/* The Roast Box */}
                    <div className="bg-white border-4 border-black p-6 rounded-2xl relative shadow-[inset_0_4px_10px_rgba(0,0,0,0.1)]">
                        <img src="/quote-icon.gif" className="absolute -top-6 -left-4 w-12 h-12" alt="quote" />
                        
                        <div className="space-y-4">
                            <p className="text-3xl font-black text-black leading-tight">
                                "{roast.content}"
                            </p>
                            
                            <div className="flex flex-wrap gap-3 pt-4 border-t-2 border-dashed border-gray-200">
                                <span className="bg-black text-[#00cba9] px-3 py-1 rounded-full text-xs font-bold uppercase">
                                    From: {roast.roaster || 'Anon'}
                                </span>
                                <span className="bg-black text-[#ff00ff] px-3 py-1 rounded-full text-xs font-bold uppercase">
                                    Target: {roast.roastee || 'You'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* The Money Bag Section */}
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="bg-[#BAFF29] border-4 border-black p-6 rounded-3xl flex items-center justify-between shadow-[6px_6px_0px_0px_#000]"
                    >
                        <div>
                            <p className="text-black font-black uppercase text-sm opacity-70 tracking-widest">Bounty Prize</p>
                            <h2 className="text-5xl font-black text-black">{roast.amount} <span className="text-2xl">SOL</span></h2>
                        </div>
                        <img src="/money-gif.gif" className="w-20 h-20" alt="solana" />
                    </motion.div>

                    {/* Actions */}
                    <AnimatePresence mode='wait'>
                        {!accepted ? (
                            <motion.div 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                className="grid grid-cols-2 gap-4"
                            >
                                <button 
                                    onClick={() => {/* handleAccept logic */}}
                                    className="bg-black text-[#BAFF29] border-4 border-[#BAFF29] py-5 rounded-2xl font-black text-xl uppercase hover:bg-[#BAFF29] hover:text-black transition-all shadow-[0_6px_0_0_#BAFF29] active:translate-y-1"
                                >
                                    Accept Burn
                                </button>
                                <button 
                                    onClick={() => {/* handleReject logic */}}
                                    className="bg-transparent text-white border-4 border-white/20 py-5 rounded-2xl font-black text-xl uppercase hover:bg-red-500 hover:border-red-500 transition-all"
                                >
                                    Dismiss
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div 
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="bg-[#00cba9] border-4 border-black p-6 rounded-2xl text-center"
                            >
                                <h3 className="text-2xl font-black text-white uppercase mb-4">SUCCESS! BAG SECURED 💰</h3>
                                <a 
                                    href={roast.tiplink} 
                                    className="block bg-black text-white p-4 rounded-xl font-mono text-sm break-all border-2 border-white/20 hover:scale-95 transition"
                                >
                                    {roast.tiplink}
                                </a>
                                <p className="text-black/60 text-[10px] mt-4 font-bold uppercase">Mainnet Launching Soon • Devnet Claim Locked</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Background Aesthetic */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-[#9381ff] rounded-full blur-[120px] opacity-20" />
                <div className="absolute bottom-[10%] right-[5%] w-64 h-64 bg-[#BAFF29] rounded-full blur-[120px] opacity-20" />
            </div>
        </div>
    );
}