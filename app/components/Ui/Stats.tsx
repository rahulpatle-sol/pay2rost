"use client";
import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import gsap from 'gsap';

// Counter Component for "Amiro wala" counter effect
const Counter = ({ value }: { value: number }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000, bounce: 0 });
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

const Stats = () => {
  const tickerRef = useRef(null);

  useEffect(() => {
    // Infinite Marquee Animation
    gsap.to(".ticker-track", {
      xPercent: -50,
      repeat: -1,
      duration: 20,
      ease: "none",
    });
  }, []);

  return (
    <section className="py-24 bg-black overflow-hidden relative">
      
      {/* 1. TOP TICKER (Neon Green Strip) */}
      <div className="bg-[#BAFF29] py-4 border-y-4 border-black -rotate-2 w-[110%] -ml-[5%] z-20 relative shadow-[0_0_50px_rgba(186,255,41,0.3)]">
        <div className="ticker-track flex whitespace-nowrap gap-10">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center gap-10">
              <span className="text-2xl font-black italic uppercase text-black italic">Live on Devnet</span>
              <span className="text-2xl font-black italic uppercase text-black">●</span>
              <span className="text-2xl font-black italic uppercase text-black">High Emotional Damage Detected</span>
              <span className="text-2xl font-black italic uppercase text-black">●</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. MAIN STATS GRID */}
      <div className="max-w-7xl mx-auto px-6 mt-20 grid md:grid-cols-3 gap-12 relative z-10">
        
        {/* Stat 1 */}
        <div className="text-center md:text-left group">
          <h4 className="text-gray-500 font-black uppercase tracking-[0.3em] text-xs mb-2">Total SOL Burned</h4>
          <div className="text-7xl md:text-8xl font-black text-white italic tracking-tighter flex items-center justify-center md:justify-start">
            <Counter value={1240} />
            <span className="text-[#9381ff] ml-2">+</span>
          </div>
          <p className="text-[#BAFF29] font-bold italic mt-2 uppercase text-sm">Real Stakes on Chain</p>
        </div>

        {/* Stat 2 */}
        <div className="text-center md:text-left group">
          <h4 className="text-gray-500 font-black uppercase tracking-[0.3em] text-xs mb-2">Roasts Deployed</h4>
          <div className="text-7xl md:text-8xl font-black text-white italic tracking-tighter flex items-center justify-center md:justify-start">
            <Counter value={5400} />
          </div>
          <p className="text-[#00cba9] font-bold italic mt-2 uppercase text-sm">Emotional Damage Worldwide</p>
        </div>

        {/* Stat 3 */}
        <div className="text-center md:text-left group">
          <h4 className="text-gray-500 font-black uppercase tracking-[0.3em] text-xs mb-2">Success Rate</h4>
          <div className="text-7xl md:text-8xl font-black text-white italic tracking-tighter flex items-center justify-center md:justify-start">
            <Counter value={98} />
            <span className="text-white">%</span>
          </div>
          <p className="text-[#9381ff] font-bold italic mt-2 uppercase text-sm">Victims taking the bag</p>
        </div>

      </div>

      {/* 3. BOTTOM DECORATIVE ELEMENTS */}
      <div className="absolute bottom-0 right-0 p-10 opacity-10 pointer-events-none">
          <h2 className="text-[20rem] font-black italic text-white leading-none">STATS</h2>
      </div>

      {/* Floating Sparkle GIF (Doodle Touch) */}
      <img 
        src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z0dzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1z/kI6370L7SlyFhLhM91/giphy.gif" 
        className="absolute top-1/2 left-10 w-24 h-24 z-0 opacity-20 grayscale pointer-events-none" 
        alt="doodle"
      />
    </section>
  );
};

export default Stats;