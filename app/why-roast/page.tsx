"use client";
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const WhyRoastPage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Horizontal Scroll Text (Background layer)
      gsap.to(".big-bg-text", {
        x: -1000,
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 2,
        }
      });

      // 2. Card Entrance Animation
      gsap.from(".reason-card", {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".reasons-grid",
          start: "top 80%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-[#0A0A0A] text-white overflow-hidden min-h-screen">
      
      {/* --- SECTION 1: HERO MANIFESTO --- */}
      <section className="hero-section min-h-screen flex items-center justify-center relative px-6">
        {/* Animated Background Typography */}
        <div className="absolute inset-0 flex items-center whitespace-nowrap opacity-5 pointer-events-none select-none">
          <h2 className="big-bg-text text-[40vw] font-black italic uppercase leading-none">
            EMOTIONAL DAMAGE EMOTIONAL DAMAGE
          </h2>
        </div>

        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block bg-[#9381ff] text-black px-4 py-1 rounded-full text-xs font-black uppercase italic mb-6 shadow-[4px_4px_0px_0px_#BAFF29]"
          >
            The Philosophy
          </motion.div>
          <h1 className="text-[clamp(3.5rem,12vw,10rem)] font-black italic uppercase leading-[0.85] tracking-tighter">
            WHY <br /> <span className="text-[#BAFF29]">PAY2ROST?</span>
          </h1>
          <p className="mt-8 text-xl md:text-2xl font-bold italic text-gray-400 max-w-2xl mx-auto leading-tight">
            Because free roasts are cheap, but <span className="text-white">On-Chain Burns</span> are legendary. We’re putting a price on the heat.
          </p>
        </div>
      </section>

      {/* --- SECTION 2: THE "THREE TRUTHS" GRID --- */}
      <section className="reasons-grid py-32 px-6 bg-white text-black rounded-t-[60px] md:rounded-t-[120px] relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Reason 1 */}
            <div className="reason-card border-4 border-black p-10 rounded-[40px] bg-[#BAFF29] shadow-[12px_12px_0px_0px_#000] hover:rotate-2 transition-transform">
              <span className="text-6xl mb-6 block">💸</span>
              <h3 className="text-3xl font-black italic uppercase mb-4">Incentivized Chaos</h3>
              <p className="font-bold leading-tight italic">
                People love to talk. We make sure they pay for it. Whether you're roasting a dev or your ex, do it with SOL.
              </p>
            </div>

            {/* Reason 2 */}
            <div className="reason-card border-4 border-black p-10 rounded-[40px] bg-[#9381ff] text-white shadow-[12px_12px_0px_0px_#000] -rotate-2 hover:rotate-0 transition-transform">
              <span className="text-6xl mb-6 block">🔗</span>
              <h3 className="text-3xl font-black italic uppercase mb-4">On-Chain Flex</h3>
              <p className="font-bold leading-tight italic">
                Once a roast is accepted, it's permanent. It's a badge of honor (or shame) that lives on Solana forever.
              </p>
            </div>

            {/* Reason 3 */}
            <div className="reason-card border-4 border-black p-10 rounded-[40px] bg-white shadow-[12px_12px_0px_0px_#000] rotate-2 hover:rotate-0 transition-transform">
              <span className="text-6xl mb-6 block">🛡️</span>
              <h3 className="text-3xl font-black italic uppercase mb-4">Verified Burns</h3>
              <p className="font-bold leading-tight italic text-gray-600">
                No fake news. No alt accounts. Just real wallets, real stakes, and real emotional damage.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION 3: MISHAL DESIGN SIGNATURE --- */}
      <section className="py-24 text-center px-6">
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-12">
                MADE FOR <br /> <span className="text-transparent" style={{ WebkitTextStroke: '2px #BAFF29' }}>DEGENS</span>
            </h2>
            <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="w-40 h-40 border-8 border-[#9381ff] rounded-[40px] overflow-hidden rotate-12 shadow-[20px_20px_0px_0px_#000]"
            >
                <img src="/main.png" className="w-full h-full object-cover grayscale" />
            </motion.div>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
     

    </main>
  );
};

export default WhyRoastPage;