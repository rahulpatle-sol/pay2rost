'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';

type Roast = {
  id: string; content: string; roaster: string; roastee: string;
  created_at: string; status: string; amount: string;
};

export default function WhoGotRoastedPage() {
  const [roasts, setRoasts] = useState<Roast[]>([]);

  useEffect(() => {
    const fetchRoasts = async () => {
      const { data, error } = await supabase
        .from('roasts').select('*')
        .eq('status', 'accepted')
        .order('created_at', { ascending: false });
      if (!error) setRoasts(data || []);
    };
    fetchRoasts();
  }, []);

  return (
    <main className="min-h-screen bg-[#FEF4F0] px-6 py-20 relative overflow-hidden">
      {/* Background Doodles (Decorative) */}
      <img src="/doodle-bg.png" className="absolute top-10 left-10 w-32 opacity-20 animate-pulse" alt="" />
      <img src="/fire-gif.gif" className="absolute bottom-20 right-10 w-24 opacity-30" alt="" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="text-center mb-16">
          <motion.h1 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl md:text-8xl font-black text-black uppercase tracking-tighter italic"
          >
            Wall of <span className="text-[#66209F] underline decoration-[#BAFF29]">Shame</span>
          </motion.h1>
          <p className="text-xl font-bold text-gray-600 mt-4 underline">On-chain burns that actually paid out.</p>
        </header>

        {roasts.length === 0 ? (
          <div className="flex flex-col items-center">
             <img src="/empty-doodle.gif" className="w-64 h-64 mb-4" />
             <p className="text-2xl font-black text-gray-400 uppercase">Silence... No one's burning yet.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {roasts.map((roast, index) => (
              <motion.div
                key={roast.id}
                initial={{ y: 50, opacity: 0, rotate: index % 2 === 0 ? -2 : 2 }}
                whileInView={{ y: 0, opacity: 1 }}
                whileHover={{ rotate: 0, scale: 1.02, zIndex: 50 }}
                viewport={{ once: true }}
                className="break-inside-avoid bg-white border-[4px] border-black p-6 rounded-none shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] flex flex-col relative group transition-all"
              >
                {/* SOL Badge Badge */}
                <div className="absolute -top-4 -right-4 bg-[#BAFF29] border-2 border-black px-3 py-1 font-black text-sm rotate-12 shadow-md">
                   {roast.amount} SOL
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-red-500 border border-black" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black" />
                    <div className="w-3 h-3 rounded-full bg-green-500 border border-black" />
                  </div>
                  
                  <p className="text-2xl font-black leading-tight italic mb-4">
                    "{roast.content}"
                  </p>
                </div>

                <div className="space-y-1 border-t-2 border-dashed border-black pt-4">
                  <p className="text-xs uppercase font-bold text-gray-500">Evidence Trail:</p>
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-[#66209F]">Roaster:</span>
                    <span className="font-mono">{roast.roaster.slice(0,4)}...{roast.roaster.slice(-4)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-[#00cba9]">Victim:</span>
                    <span className="font-mono">{roast.roastee.slice(0,4)}...{roast.roastee.slice(-4)}</span>
                  </div>
                </div>

                <p className="text-[10px] text-gray-400 mt-6 font-bold uppercase tracking-widest">
                  Stamp: {new Date(roast.created_at).toLocaleDateString()}
                </p>

                {/* Share Button with Doodle Style */}
                <button className="mt-4 w-full bg-black text-white py-3 font-black uppercase text-sm group-hover:bg-[#1DA1F2] transition-colors flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  Flex on X
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}