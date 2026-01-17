"use client";
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Context setup for scoping
    const ctx = gsap.context(() => {
      
      // Animation 1: Character Parallax (Ref based)
      if (characterRef.current) {
        gsap.to(characterRef.current, {
          y: -100, // Thoda jyada movement for impact
          rotate: 5,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5, // Thoda smooth scrub
          }
        });
      }

      // Animation 2: Title Letters Pop-up (Class based inside context)
      gsap.from(".char-animate", {
        y: 100,
        opacity: 0,
        stagger: 0.08, // Time gap between letters
        duration: 1.2,
        ease: "back.out(2)", // Thoda bouncy feel
        delay: 0.5,
      });

      // Animation 3: Floating Doodles (Infinite)
      gsap.to(".doodle-float", {
        y: 30,
        rotation: 10,
        repeat: -1,
        yoyo: true,
        duration: 2.5,
        ease: "sine.inOut"
      });

      // Animation 4: Background Blur Move (Dynamic feel)
      gsap.to(".bg-blur-move", {
        scale: 1.2,
        x: 50,
        repeat: -1,
        yoyo: true,
        duration: 5,
        ease: "power1.inOut"
      });

    }, heroRef); // Scope to heroRef

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen bg-[#fcfcfc] flex items-center justify-center overflow-hidden pt-24 pb-12">
      
      {/* --- BACKGROUND DECORATION --- */}
      <div className="absolute top-0 right-0 w-[40%] h-full bg-[#9381ff] rounded-bl-[150px] -z-0 opacity-10 pointer-events-none" />
      <div className="bg-blur-move absolute -left-10 top-1/4 w-72 h-72 bg-[#BAFF29] rounded-full blur-[120px] opacity-15 -z-10" />

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center z-10">
        
        {/* --- LEFT: MANGA CHARACTER --- */}
        <div className="relative order-2 md:order-1">
          <div 
            ref={characterRef}
            className="relative z-10 bg-white border-[6px] border-black rounded-[50px] overflow-hidden shadow-[25px_25px_0px_0px_#000] hover:shadow-none transition-all duration-500"
          >
            <Image 
              src="/main.png" 
              alt="Pay2Roast Hero" 
              width={550} 
              height={700} 
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              priority
            />
            
            <div className="absolute inset-0 flex items-end justify-center pb-10 bg-gradient-to-t from-black/50 to-transparent">
              <motion.button 
                whileHover={{ scale: 1.1, rotate: -2 }}
                whileTap={{ scale: 0.9 }}
                animate={{ boxShadow: ["0 0 10px #ff00ff", "0 0 30px #ff00ff", "0 0 10px #ff00ff"] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="bg-black text-white px-10 py-4 rounded-2xl border-4 border-[#ff00ff] font-black text-2xl italic uppercase tracking-tighter"
              >
                Roast me
              </motion.button>
            </div>
          </div>

          {/* Sticker Doodle */}
          <div className="doodle-float absolute -top-12 -right-8 w-32 h-32 z-20 pointer-events-none">
             <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHY4ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1z/kI6370L7SlyFhLhM91/giphy.gif" alt="doodle" />
          </div>
        </div>

        {/* --- RIGHT: CONTENT --- */}
        <div className="space-y-8 order-1 md:order-2">
          <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-1.5 rounded-full">
            <span className="w-2 h-2 bg-[#BAFF29] rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest">Currently on Devnet</span>
          </div>

          <div className="overflow-hidden py-2">
            <h1 className="text-7xl md:text-[8.5rem] font-black  text-pink-400 italic uppercase leading-[0.8] tracking-tighter">
              {"PAY2ROST".split("").map((char, i) => (
                <span key={i} className="char-animate inline-block min-w-[0.2em]">{char}</span>
              ))}
            </h1>
          </div>

          <p className="text-xl font-bold text-gray-500 max-w-lg leading-snug italic">
            A Web3 playground where insults cost <span className="text-black underline decoration-[#9381ff] decoration-4">Real SOL</span>. 
            Deploy the burn. Take the bag. Flex the proof.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <motion.div 
              whileHover={{ y: -5, rotate: -2 }}
              className="bg-[#9381ff] p-8 rounded-[40px] border-4 border-black shadow-[8px_8px_0px_0px_#000] w-full sm:w-56"
            >
              <h4 className="text-white font-black text-2xl leading-none italic uppercase">Get Paid to be Roasted</h4>
            </motion.div>

            <motion.div 
              initial={{ rotate: 2 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              className="bg-[#00cba9] p-8 rounded-tr-[80px] rounded-bl-[80px] border-4 border-black shadow-[8px_8px_0px_0px_#000] flex-1"
            >
              <p className="text-white font-bold leading-tight italic">
                Send a roast message with a crypto reward. If they accept, they get paid. You get on-chain proof.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;