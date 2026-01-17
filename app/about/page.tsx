"use client";
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutPage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. BG TEXT MOVE (Section 1 ke peeche bada text scroll pe chalega)
      gsap.to(".bg-scroll-text", {
        x: -800, // Left ki taraf bhagega
        scrollTrigger: {
          trigger: ".hero-about",
          start: "top top",
          end: "bottom top",
          scrub: 2,
        }
      });

      // 2. MARQUEE SYNC (Scroll speed se marquee sync)
      gsap.to(".marquee-text", {
        xPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: ".marquee-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });

      // 3. SIDE TEXT REVEAL (Split section mein text upar aayega)
      gsap.to(".reveal-text", {
        y: -50,
        opacity: 1,
        scrollTrigger: {
          trigger: ".culture-section",
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-black text-white overflow-hidden">
      
      {/* --- SECTION 1: HERO ABOUT --- */}
      <section className="hero-about min-h-screen flex items-center justify-center px-6 relative">
        <div className="absolute top-24 left-10 text-[#BAFF29] font-black uppercase italic text-xs tracking-[0.5em] z-20">
          manifesto v1.0
        </div>
        
        {/* YE TEXT SCROLL PE MOVE HOGA */}
        <div className="absolute inset-0 flex items-center whitespace-nowrap pointer-events-none select-none overflow-hidden">
          <h2 className="bg-scroll-text text-[30vw] font-black italic uppercase opacity-10 text-white leading-none">
            PAY2ROST PAY2ROST PAY2ROST
          </h2>
        </div>

        <div className="text-center z-10">
          <motion.h1 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-[clamp(4rem,15vw,12rem)] font-black leading-[0.8] italic uppercase tracking-tighter"
          >
            NOT YOUR <br /> 
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #9381ff' }}>AVERAGE</span> <br />
            PLAYGROUND.
          </motion.h1>
        </div>
      </section>

      {/* --- SECTION 2: HORIZONTAL SCROLL STRIP --- */}
      <section className="marquee-section py-20 bg-[#BAFF29] border-y-8 border-black -rotate-2 scale-110 relative z-20">
        <div className="marquee-text flex whitespace-nowrap text-[12vw] font-black italic uppercase text-black leading-none py-4">
          <span>REAL SOL ● NO FAKES ● REAL SOL ● NO FAKES ● REAL SOL ● NO FAKES ●&nbsp;</span>
          <span>REAL SOL ● NO FAKES ● REAL SOL ● NO FAKES ● REAL SOL ● NO FAKES ●&nbsp;</span>
        </div>
      </section>

      {/* --- SECTION 3: SPLIT CULTURE --- */}
      <section className="culture-section min-h-screen grid lg:grid-cols-2 gap-0 relative border-b-8 border-black bg-white">
        {/* Left Side: Content */}
        <div className="p-12 md:p-24 flex flex-col justify-center text-black space-y-10">
          <h2 className="reveal-text opacity-0 text-7xl font-black italic uppercase leading-none tracking-tighter translate-y-20">
            Why do we <br /> <span className="bg-[#9381ff] text-white px-4">exist?</span>
          </h2>
          <div className="space-y-6 text-xl font-bold italic leading-tight text-gray-700">
            <p>In a world of boring "anonymous feedback" apps, we chose chaos.</p>
            <p>Pay2Rost is built for the degens who know a good roast is worth its weight in crypto.</p>
          </div>
          
          {/* Custom Stats Cards */}
          <div className="pt-10 flex gap-6">
             <motion.div whileHover={{ scale: 1.1 }} className="border-4 border-black p-6 rounded-3xl rotate-3 shadow-[8px_8px_0px_0px_#000]">
                <span className="font-black text-4xl">100%</span>
                <p className="font-bold text-xs uppercase text-[#9381ff]">On-chain</p>
             </motion.div>
             <motion.div whileHover={{ scale: 1.1 }} className="border-4 border-black p-6 rounded-3xl -rotate-3 bg-[#BAFF29] shadow-[8px_8px_0px_0px_#000]">
                <span className="font-black text-4xl">SOL</span>
                <p className="font-bold text-xs uppercase">Rewards</p>
             </motion.div>
          </div>
        </div>

        {/* Right Side: Animated Image */}
        <div className="bg-[#9381ff] relative overflow-hidden flex items-center justify-center p-20">
            <div className="parallax-img relative z-10 w-full aspect-square border-8 border-black rounded-[100px] overflow-hidden shadow-[30px_30px_0px_0px_#000] bg-white">
                <img src="/main.png" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="design" />
            </div>
            {/* Horizontal Watermark behind image */}
            <div className="absolute top-1/2 left-0 text-[20rem] font-black text-black/20 italic whitespace-nowrap pointer-events-none">
                MISHAL DESIGN
            </div>
        </div>
      </section>

      {/* --- SECTION 4: CALL TO ACTION --- */}
      <section className="py-40 text-center px-6 bg-black">
        <h3 className="text-5xl md:text-8xl font-black italic uppercase mb-12 tracking-tighter">
          Ready to <br /> <span className="text-[#BAFF29]">Join the Chaos?</span>
        </h3>
        <motion.button 
          whileHover={{ scale: 1.1, rotate: -3 }}
          whileTap={{ scale: 0.9 }}
          className="bg-[#9381ff] text-white px-16 py-8 rounded-[40px] border-4 border-white text-3xl font-black uppercase italic shadow-[15px_15px_0px_0px_#BAFF29]"
        >
          Burn Someone
        </motion.button>
        <div className="mt-32 text-gray-500 font-black italic uppercase text-xs tracking-widest">
            Designed by Mishal Turkane — Powered by Solana
        </div>
      </section>
    </main>
  );
};

export default AboutPage;