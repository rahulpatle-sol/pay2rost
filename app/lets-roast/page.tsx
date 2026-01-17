'use client';

import { useState } from 'react';
import { supabase } from '../lib/SupabaseClient';
import { generateSlug } from '../lib/generateSlug';
import { motion, AnimatePresence } from 'framer-motion';
import { TipLink } from '@tiplink/api';
import { Connection, SystemProgram, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js';
import confetti from 'canvas-confetti';

export default function RoastWithTipLinkPage() {
  const [step, setStep] = useState(1); // 3-Step State logic
  const [content, setContent] = useState('');
  const [roaster, setRoaster] = useState('');
  const [roastee, setRoastee] = useState('');
  const [slug, setSlug] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    // Final Step Logic (Solana Tx)
    setLoading(true);
    setError('');
    try {
      const amountNum = parseFloat(amount);
      const newSlug = generateSlug();
      const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
      const { keypair: tipKeypair, url } = await TipLink.create();

      const provider = window.solana;
      if (!provider?.isPhantom) throw new Error('Phantom wallet not found!');

      const { publicKey: fromPubkey } = await provider.connect();
      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey,
          toPubkey: tipKeypair.publicKey,
          lamports: Math.floor(amountNum * LAMPORTS_PER_SOL),
        })
      );

      tx.feePayer = fromPubkey;
      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;

      const signedTx = await provider.signTransaction(tx);
      const txid = await connection.sendRawTransaction(signedTx.serialize());
      await connection.confirmTransaction(txid, 'confirmed');

      const { error: sbError } = await supabase.from('roasts').insert({
        content, roaster, roastee, slug: newSlug,
        status: 'pending', amount, tiplink: url.toString(),
      });

      if (!sbError) {
        setSlug(newSlug);
        confetti({ particleCount: 200, spread: 100, colors: ['#BAFF29', '#9381ff'] });
      } else throw new Error(sbError.message);
    } catch (err: any) {
      setError(err.message);
      setStep(1); // Error aane pe reset
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* MASKING / DECORATION ELEMENTS */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#BAFF29]/10 to-transparent pointer-events-none" />
      <div className="absolute top-10 right-10 flex gap-2">
         {[1,2,3].map(i => (
           <div key={i} className={`h-2 w-8 rounded-full transition-all duration-500 ${step >= i ? 'bg-[#BAFF29] shadow-[0_0_15px_#BAFF29]' : 'bg-gray-800'}`} />
         ))}
      </div>

      <AnimatePresence mode="wait">
        {!slug ? (
          <motion.div 
            key={`step-${step}`}
            initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
            className="max-w-xl w-full"
          >
            {/* --- STEP 1: TARGETING --- */}
            {step === 1 && (
              <div className="space-y-8">
                <h2 className="text-7xl font-black italic uppercase tracking-tighter leading-none">
                  PHASE 01: <br /><span className="text-[#9381ff]">IDENTITY</span>
                </h2>
                <div className="space-y-4">
                  <div className="group">
                    <p className="text-[10px] font-black uppercase text-gray-500 mb-2 tracking-widest">Your Alias</p>
                    <input value={roaster} onChange={(e) => setRoaster(e.target.value)} placeholder="E.g. Ghost_Degen" className="w-full bg-[#111] border-2 border-gray-800 p-6 rounded-3xl text-2xl font-black focus:border-[#BAFF29] outline-none transition-all shadow-[5px_5px_0px_0px_#222]"/>
                  </div>
                  <div className="group">
                    <p className="text-[10px] font-black uppercase text-gray-500 mb-2 tracking-widest">Victim Name</p>
                    <input value={roastee} onChange={(e) => setRoastee(e.target.value)} placeholder="@target_user" className="w-full bg-[#111] border-2 border-gray-800 p-6 rounded-3xl text-2xl font-black focus:border-red-500 outline-none transition-all shadow-[5px_5px_0px_0px_#222]"/>
                  </div>
                </div>
                <button onClick={nextStep} disabled={!roaster || !roastee} className="w-full bg-white text-black py-6 rounded-3xl font-black text-xl uppercase italic shadow-[10px_10px_0px_0px_#9381ff] active:translate-y-2">LOCK TARGET →</button>
              </div>
            )}

            {/* --- STEP 2: LETHAL PAYLOAD --- */}
            {step === 2 && (
              <div className="space-y-8">
                <h2 className="text-7xl font-black italic uppercase tracking-tighter leading-none">
                  PHASE 02: <br /><span className="text-[#BAFF29]">DAMAGE</span>
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-black uppercase text-gray-500 mb-2 tracking-widest">The Roast (Be Brutal)</p>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={4} placeholder="Type the burn..." className="w-full bg-[#111] border-2 border-gray-800 p-6 rounded-3xl text-xl font-bold focus:border-[#9381ff] outline-none transition-all shadow-[5px_5px_0px_0px_#222]"/>
                  </div>
                  <div className="relative">
                    <p className="text-[10px] font-black uppercase text-gray-500 mb-2 tracking-widest">Bounty (SOL)</p>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.1" className="w-full bg-black border-4 border-[#BAFF29] p-6 rounded-3xl text-5xl font-black text-[#BAFF29] outline-none"/>
                    <span className="absolute right-6 bottom-6 text-xl font-black text-white/20">SOL</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={prevStep} className="flex-1 bg-gray-800 py-6 rounded-3xl font-black uppercase">BACK</button>
                  <button onClick={nextStep} disabled={!content || !amount} className="flex-[2] bg-[#BAFF29] text-black py-6 rounded-3xl font-black text-xl uppercase italic shadow-[10px_10px_0px_0px_#000]">REVIEW BURN →</button>
                </div>
              </div>
            )}

            {/* --- STEP 3: FINAL DEPLOYMENT --- */}
            {step === 3 && (
              <div className="space-y-8 bg-[#111] p-10 rounded-[50px] border-4 border-[#222] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 animate-pulse">🔴 LIVE FEED</div>
                <h2 className="text-4xl font-black italic uppercase tracking-tighter">CONFIRM <br />DEPLOYMENT</h2>
                <div className="space-y-2 border-l-4 border-[#9381ff] pl-6 py-2">
                   <p className="text-sm font-bold opacity-50 uppercase">Payload to: <span className="text-white">{roastee}</span></p>
                   <p className="text-sm font-bold opacity-50 uppercase">Amount: <span className="text-[#BAFF29]">{amount} SOL</span></p>
                   <p className="text-xs italic text-gray-400">"{content}"</p>
                </div>
                <button onClick={handleSubmit} disabled={loading} className={`w-full py-8 rounded-3xl font-black text-3xl uppercase italic transition-all ${loading ? 'bg-gray-700 animate-pulse cursor-wait' : 'bg-red-600 text-white shadow-[0_10px_40px_rgba(220,38,38,0.5)] hover:scale-105'}`}>
                   {loading ? 'INITIATING...' : 'FIRE MISSION 🔥'}
                </button>
                {error && <p className="text-red-500 text-center font-black text-[10px] uppercase">Launch Failed: {error}</p>}
              </div>
            )}
          </motion.div>
        ) : (
          /* SUCCESS SCREEN (The Reveal) */
          <motion.div 
            initial={{ scale: 0.5, rotate: 10, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            className="max-w-md w-full bg-[#BAFF29] p-12 rounded-[60px] text-black text-center border-[10px] border-black shadow-[40px_40px_0px_0px_#9381ff]"
          >
            <h2 className="text-6xl font-black uppercase italic leading-none mb-6">BURN <br/> SENT.</h2>
            <div className="bg-black text-[#BAFF29] p-6 rounded-3xl font-mono text-[10px] mb-8 break-all select-all">
              paytoroast.app/roast/{slug}
            </div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(`https://paytoroast.vercel.app/roast/${slug}`);
                alert('Copied! Go Damage them.');
              }}
              className="w-full bg-white border-4 border-black py-6 rounded-3xl font-black uppercase text-2xl shadow-[10px_10px_0px_0px_#000] hover:translate-y-2 hover:shadow-none transition-all"
            >
              COPY LINK
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}