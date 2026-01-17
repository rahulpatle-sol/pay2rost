"use client";
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  { id: 1, user: "CryptoPunk_42", amt: "1.5 SOL", msg: "I paid him to roast my portfolio, now I'm depressed but richer. 10/10.", color: "#BAFF29", rotate: -2 },
  { id: 2, user: "SolanaQueen", amt: "0.8 SOL", msg: "The emotional damage was worth every penny. On-chain proof is the ultimate flex!", color: "#9381ff", rotate: 3 },
  { id: 3, user: "Degen_Dave", amt: "2.0 SOL", msg: "Sent a burn to my boss. He accepted it for the SOL. Now we both broke.", color: "#00cba9", rotate: -1 },
  { id: 4, user: "AnonWhale", amt: "5.0 SOL", msg: "Best way to spend my devnet faucet tokens. Pure chaos and I love it.", color: "#ff4d4d", rotate: 2 },
  { id: 5, user: "GhostCoder", amt: "0.3 SOL", msg: "Roast was mid, but the payment was fast. Taking the bag anyway!", color: "#BAFF29", rotate: -3 },
  { id: 6, user: "NftFlipper", amt: "1.1 SOL", msg: "Better than therapy. Paying people to roast me is my new personality trait.", color: "#9381ff", rotate: 4 },
];

const Testimonials = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect: Some cards move faster than others
      gsap.to(".test-card-even", {
        y: -100,
        scrollTrigger: {
          trigger: scrollRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      });
      gsap.to(".test-card-odd", {
        y: 100,
        scrollTrigger: {
          trigger: scrollRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      });
    }, scrollRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={scrollRef} className="py-32 bg-[#f8f8f8] px-6 relative overflow-hidden">
      
      {/* Background Text Watermark */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
        <h2 className="text-[25vw] font-black italic">FEEDBACK</h2>
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter"
          >
            Real <span className="text-[#9381ff]">Burns</span>, <br /> Real People
          </motion.h2>
          <p className="font-bold text-gray-500 uppercase mt-4 tracking-[0.2em]">Don't take our word for it, ask the victims</p>
        </div>

        {/* Masonry-style Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              whileHover={{ scale: 1.02, rotate: 0 }}
              className={`
                ${i % 2 === 0 ? 'test-card-even' : 'test-card-odd'}
                break-inside-avoid border-4 border-black p-8 rounded-[40px] shadow-[10px_10px_0px_0px_#000] transition-all relative group
              `}
              style={{ backgroundColor: t.color, rotate: `${t.rotate}deg` }}
            >
              {/* Profile/Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="font-black italic text-xl">@{t.user}</h4>
                  <p className="text-[10px] font-black uppercase opacity-60">Verified Roast</p>
                </div>
                <div className="bg-black text-white px-3 py-1 rounded-full text-xs font-black">
                  {t.amt}
                </div>
              </div>

              {/* Message */}
              <p className="text-xl font-bold italic leading-tight mb-6">
                "{t.msg}"
              </p>

              {/* Bottom Decoration */}
              <div className="flex justify-between items-center opacity-30 group-hover:opacity-100 transition-opacity">
                <span className="text-2xl">🔥</span>
                <span className="text-[10px] font-black">ON-CHAIN PROOF ✓</span>
              </div>

              {/* Hand-drawn sticker (Randomly placed) */}
              {i === 1 && (
                <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z0dzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1z/kI6370L7SlyFhLhM91/giphy.gif" className="absolute -bottom-6 -right-6 w-16 h-16 rotate-12" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-32 text-center">
          <p className="text-2xl font-black italic mb-8">Want to be featured on the wall?</p>
          <button className="bg-[#BAFF29] border-4 border-black px-10 py-5 rounded-2xl font-black uppercase italic shadow-[8px_8px_0px_0px_#000] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all">
            Get Roasted Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;