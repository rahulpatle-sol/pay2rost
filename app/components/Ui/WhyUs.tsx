"use client";
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const WhyPayToRoast = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading parallax
      gsap.to(".why-title", {
        y: -50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          scrub: true
        }
      });

      // Cards slam effect
      gsap.from(".problem-card", {
        x: -200,
        rotate: -10,
        opacity: 0,
        scrollTrigger: {
          trigger: ".problem-card",
          start: "top 80%",
          end: "top 20%",
          scrub: 1
        }
      });

      gsap.from(".solution-card", {
        x: 200,
        rotate: 10,
        opacity: 0,
        scrollTrigger: {
          trigger: ".solution-card",
          start: "top 80%",
          end: "top 20%",
          scrub: 1
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="why" className="min-h-screen bg-[#FEF4F0] py-32 px-6 relative overflow-hidden">
      
      {/* Decorative Floating Assets */}
      <motion.img 
        src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z0dzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1z/kI6370L7SlyFhLhM91/giphy.gif" 
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute top-20 right-[10%] w-32 h-32 opacity-40 grayscale pointer-events-none"
      />
      
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading with GSAP Parallax */}
        <div className="why-title text-center mb-24">
          <h2 className="text-[clamp(3rem,10vw,7rem)] font-black text-black leading-none tracking-tighter italic uppercase">
            The <span className="text-[#9381ff]">Motivation</span> <br />
            Behind Chaos
          </h2>
          <div className="h-2 w-40 bg-black mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center relative">
          
          {/* PROBLEM CARD - Neobrutalist Black */}
          <div className="problem-card flex flex-col gap-6">
            <div className="bg-black text-white p-12 rounded-[50px] border-4 border-black shadow-[20px_20px_0px_0px_#9381ff] relative overflow-hidden group">
              {/* Background Text Overlay */}
              <span className="absolute -right-4 -top-4 text-9xl font-black text-white/5 pointer-events-none">NOOB</span>
              
              <div className="relative z-10">
                <div className="bg-[#ff4d4d] text-white text-xs font-black px-4 py-1 rounded-full w-fit mb-6 uppercase italic">The Problem</div>
                <h3 className="text-4xl font-black mb-6 italic tracking-tight leading-none">
                  Anonymous messaging is <span className="text-[#ff4d4d]">Weak.</span>
                </h3>
                <p className="text-xl leading-relaxed font-bold text-gray-300">
                  Existing platforms let you send roasts, but they are hollow. You can't <span className="text-white underline decoration-[#ff4d4d]">FLEX</span> the damage. No stakes, no proof, just pixels.
                </p>
              </div>
            </div>
            
            {/* Thinking Badge */}
            <div className="flex items-center gap-4 ml-8">
               <div className="w-12 h-12 bg-white border-4 border-black rounded-full flex items-center justify-center font-black">?</div>
               <p className="text-sm font-black italic uppercase tracking-widest text-gray-500">Why do it for free?</p>
            </div>
          </div>

          {/* SOLUTION CARD - Neon Teal */}
          <div className="solution-card mt-12 lg:mt-32">
            <div className="bg-[#00cba9] text-white p-12 rounded-[50px] border-4 border-black shadow-[20px_20px_0px_0px_#000] relative">
              <div className="bg-black text-[#BAFF29] text-xs font-black px-4 py-1 rounded-full w-fit mb-6 uppercase italic tracking-tighter">The Solution</div>
              <h3 className="text-4xl font-black mb-6 italic tracking-tight leading-none text-black">
                Roast with <span className="underline">Liquid Gold.</span>
              </h3>
              <p className="text-xl leading-relaxed font-black text-black/80 italic">
                Pay2Rost turns insults into <span className="bg-black text-[#BAFF29] px-2">On-Chain Assets</span>. Send SOL with your burn. If they accept the emotional damage, they get the bag. You get the ultimate flex—Proof of Burn.
              </p>

              {/* Solana Mini Badge */}
              <div className="mt-8 flex items-center gap-2 bg-black/10 w-fit px-4 py-2 rounded-2xl border-2 border-black/20">
                <span className="font-black text-xs text-black">POWERED BY SOLANA</span>
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic Footer Link */}
        <div className="mt-32 flex justify-center">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 2 }}
            className="group cursor-pointer relative"
          >
            <div className="absolute inset-0 bg-black rounded-2xl translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
            <div className="bg-[#BAFF29] border-4 border-black px-12 py-6 rounded-2xl relative z-10 font-black italic uppercase text-2xl tracking-tighter">
              Ready to deploy a burn?
            </div>
          </motion.div>
        </div>

      </div>

      {/* Background Text Watermark */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[15vw] font-black text-black/5 select-none pointer-events-none italic tracking-tighter uppercase leading-none -z-10">
        Ecosystem
      </div>
    </section>
  );
};

export default WhyPayToRoast;