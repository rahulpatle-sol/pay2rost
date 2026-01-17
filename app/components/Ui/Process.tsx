"use client";
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    id: "01",
    title: "Connect & Load",
    desc: "Connect your Phantom wallet and load some SOL. We're currently live on Devnet so it's all play money!",
    color: "#9381ff",
    icon: "🔌"
  },
  {
    id: "02",
    title: "Deploy the Burn",
    desc: "Write your lethal roast and lock a bounty. If they accept the insult, they take the bag.",
    color: "#BAFF29",
    icon: "🔥"
  },
  {
    id: "03",
    title: "Flex the Proof",
    desc: "Once accepted, the roast is recorded on-chain forever. Share your link and dominate the feed.",
    color: "#00cba9",
    icon: "💎"
  }
];

const Process = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".process-card", {
        y: 100,
        opacity: 0,
        stagger: 0.3,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="how" className="py-32 bg-white px-6 relative overflow-hidden">
      
      {/* Background Text Marquee (Amiro wala touch) */}
      <div className="absolute top-10 whitespace-nowrap opacity-[0.03] select-none pointer-events-none">
        <h2 className="text-[15rem] font-black italic uppercase">Step by Step Burn Step by Step Burn</h2>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div className="max-w-xl">
            <h2 className="text-6xl md:text-8xl font-black italic leading-none uppercase tracking-tighter">
              How it <br /> <span className="text-[#9381ff]">Works?</span>
            </h2>
          </div>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-2">
            Three steps to emotional damage →
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div 
              key={i} 
              className="process-card group relative"
            >
              {/* Card Container */}
              <div className="h-full bg-white border-4 border-black p-10 rounded-[40px] shadow-[12px_12px_0px_0px_#000] group-hover:shadow-none group-hover:translate-x-2 group-hover:translate-y-2 transition-all duration-300 relative z-10">
                
                {/* Step Number Badge */}
                <div 
                  className="w-16 h-16 rounded-2xl border-4 border-black flex items-center justify-center text-2xl font-black mb-8 shadow-[4px_4px_0px_0px_#000]"
                  style={{ backgroundColor: step.color }}
                >
                  {step.id}
                </div>

                <h3 className="text-3xl font-black italic uppercase mb-4 leading-none">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 font-bold leading-relaxed italic">
                  {step.desc}
                </p>

                {/* Big Icon Shadow */}
                <div className="absolute -bottom-4 -right-2 text-7xl opacity-10 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0">
                  {step.icon}
                </div>
              </div>

              {/* Decorative Line (Hidden on Mobile) */}
              {i < 2 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-1 bg-black z-0" />
              )}
            </div>
          ))}
        </div>

        {/* Action Button at bottom */}
        <div className="mt-24 text-center">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white px-12 py-6 rounded-3xl font-black text-2xl uppercase italic tracking-tighter shadow-[10px_10px_0px_0px_#BAFF29] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all"
            >
                Start Burning Now 🔥
            </motion.button>
        </div>
      </div>
      
      {/* Floating Doodle GIF Placeholder */}
      <div className="absolute -bottom-10 -left-10 w-48 h-48 opacity-20 rotate-12 -z-10">
         <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z0dzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1z/kI6370L7SlyFhLhM91/giphy.gif" alt="doodle" />
      </div>
    </section>
  );
};

export default Process;