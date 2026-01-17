"use client";
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const roastedPeople = [
  { id: 1, name: "Degen #01", roast: "Bro thinks he's the next Vitalik but can't center a div.", sol: "0.5 SOL", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix", color: "#BAFF29" },
  { id: 2, name: "Sol Whale", roast: "Paid this guy to quit crypto. Best investment ever.", sol: "2.1 SOL", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka", color: "#9381ff" },
  { id: 3, name: "Panic Seller", roast: "Sold the bottom, bought the top. A true legend of the game.", sol: "0.8 SOL", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bo", color: "#00cba9" },
  { id: 4, name: "Gas Fee King", roast: "Spends more on gas than his actual portfolio worth.", sol: "1.2 SOL", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Caleb", color: "#ff4d4d" },
];

const Rosted = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".roast-title", {
        y: 50,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-white px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Title Section */}
        <div className="roast-title mb-20 text-center md:text-left">
          <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
            Wall of <br /> <span className="text-[#9381ff]">Shame</span>
          </h2>
          <p className="mt-4 font-bold text-gray-500 uppercase tracking-widest text-sm">Most Expensive Emotional Damage</p>
        </div>

        {/* Dynamic Hover Cards Container */}
        <div className="flex flex-col md:flex-row gap-4 h-[600px] w-full items-stretch">
          {roastedPeople.map((person) => (
            <motion.div
              key={person.id}
              whileHover={{ flex: 3.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative flex-1 group overflow-hidden rounded-[50px] border-4 border-black cursor-pointer bg-white transition-all duration-500 shadow-[10px_10px_0px_0px_#000]"
            >
              {/* Image Container */}
              <div className="absolute inset-0 w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700">
                <img 
                  src={person.img} 
                  alt={person.name} 
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" 
                />
              </div>

              {/* Overlay Color (Your Figma Vibe) */}
              <div 
                className="absolute inset-0 opacity-40 group-hover:opacity-10 transition-opacity" 
                style={{ backgroundColor: person.color }}
              />

              {/* Content Box */}
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-20 group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black to-transparent">
                <div className="flex justify-between items-end">
                  <div className="max-w-[80%]">
                    <span className="bg-[#BAFF29] text-black text-[10px] font-black px-3 py-1 rounded-full uppercase italic mb-2 inline-block">
                      Victim Verified
                    </span>
                    <h3 className="text-3xl font-black text-white italic uppercase mb-2">{person.name}</h3>
                    <p className="text-white font-bold italic text-sm leading-tight line-clamp-2">
                      "{person. roast}"
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#BAFF29] font-black text-xl italic leading-none">{person.sol}</p>
                    <p className="text-white text-[8px] font-bold uppercase opacity-60">Reward Paid</p>
                  </div>
                </div>
              </div>

              {/* Default View (When not hovered) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:opacity-0 transition-opacity whitespace-nowrap -rotate-90">
                 <span className="text-2xl font-black italic uppercase tracking-tighter opacity-20">
                    {person.name}
                 </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Doodle */}
        <div className="mt-20 flex justify-center opacity-20">
           <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z0dzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1z/kI6370L7SlyFhLhM91/giphy.gif" className="w-20" />
        </div>
      </div>
    </section>
  );
};

export default Rosted;