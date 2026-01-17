"use client";
import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Custom Counter for that "Amiro wala" number jump
const Counter = ({ value }: { value: number }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 50, damping: 30 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString();
      }
    });
  }, [springValue]);

  return <span ref={ref} />;
};

const StatsPage = () => {
  const mainRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Text Scrolling (Horizontal)
      gsap.to(".scroll-bg", {
        xPercent: -30,
        scrollTrigger: {
          trigger: mainRef.current,
          scrub: 1,
        }
      });

      // Stats Box Entrance
      gsap.from(".stat-box", {
        scale: 0.5,
        opacity: 0,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".stats-grid",
          start: "top 80%",
        }
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="bg-black min-h-screen text-white overflow-hidden py-24 relative">
      
      {/* 1. HUGE BACKGROUND TEXT (Scroll Sync) */}
      <div className="absolute top-0 left-0 whitespace-nowrap opacity-5 select-none pointer-events-none z-0">
        <h2 className="scroll-bg text-[40vw] font-black italic uppercase leading-none">
          NUMBERS DONT LIE NUMBERS DONT LIE
        </h2>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="mb-20">
          <h1 className="text-6xl md:text-[10rem] font-black italic uppercase leading-none tracking-tighter">
            THE <br /> <span className="text-[#BAFF29]">DAMAGE</span> <br /> IN DATA
          </h1>
          <p className="mt-6 text-gray-500 font-bold uppercase tracking-[0.3em] text-sm md:text-base">
            Live from Solana Mainnet Beta (Not really, we're on Devnet lol)
          </p>
        </div>

        {/* 2. MAIN STATS GRID */}
        <div className="stats-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Total SOL Box */}
          <div className="stat-box group bg-[#111] border-4 border-white p-10 rounded-[50px] shadow-[10px_10px_0px_0px_#9381ff] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all">
            <h4 className="text-[#9381ff] font-black uppercase italic tracking-widest text-xs mb-4">Solana Burned</h4>
            <div className="text-7xl font-black italic flex items-baseline gap-2">
              <Counter value={4206} />
              <span className="text-2xl text-white/50">SOL</span>
            </div>
            <p className="mt-4 text-gray-400 font-bold italic">Total bounty locked and claimed by roast victims.</p>
          </div>

          {/* Roasts Deployed Box */}
          <div className="stat-box group bg-[#BAFF29] border-4 border-black p-10 rounded-[50px] shadow-[10px_10px_0px_0px_#000] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all text-black">
            <h4 className="font-black uppercase italic tracking-widest text-xs mb-4">Roasts Deployed</h4>
            <div className="text-7xl font-black italic">
              <Counter value={12500} />
              <span className="text-2xl ml-2 text-black/40">+</span>
            </div>
            <p className="mt-4 font-bold italic">Successful emotional damage attacks recorded on-chain.</p>
          </div>

          {/* Success Rate Box */}
          <div className="stat-box group bg-white border-4 border-black p-10 rounded-[50px] shadow-[10px_10px_0px_0px_#14F195] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all text-black">
            <h4 className="text-[#14F195] font-black uppercase italic tracking-widest text-xs mb-4">Acceptance Rate</h4>
            <div className="text-7xl font-black italic">
              <Counter value={94} />
              <span className="text-3xl ml-1">%</span>
            </div>
            <p className="mt-4 font-bold italic text-gray-600">Most degens take the money and the insult. Zero pride.</p>
          </div>

        </div>

        {/* 3. LIVE TICKER STRIP (Middle of page) */}
        <div className="mt-32 -mx-10 bg-[#9381ff] py-6 -rotate-2 border-y-4 border-black shadow-[0_0_50px_rgba(147,129,255,0.4)] overflow-hidden">
            <div className="flex whitespace-nowrap animate-marquee">
                {[1,2,3,4].map(i => (
                    <span key={i} className="text-3xl font-black italic uppercase text-black mx-10">
                        NEW ROAST DETECTED ● 0.5 SOL CLAIMED ● DEGEN #420 ROASTED ● 1.2 SOL STAKED ●
                    </span>
                ))}
            </div>
        </div>

        {/* 4. MISHAL DESIGN SIGNATURE */}
        <div className="mt-32 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-white rounded-2xl border-4 border-[#BAFF29] rotate-12 flex items-center justify-center text-4xl shadow-[8px_8px_0px_0px_#000]">
                    📊
                </div>
                <div>
                    <h3 className="text-2xl font-black italic uppercase">The Degen Index</h3>
                    <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Designed by Mishal Turkane</p>
                </div>
            </div>
            <button className="bg-[#BAFF29] text-black px-12 py-5 rounded-full font-black italic text-xl uppercase border-4 border-black shadow-[6px_6px_0px_0px_#fff]">
                View Leaderboard
            </button>
        </div>

      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </main>
  );
};

export default StatsPage;