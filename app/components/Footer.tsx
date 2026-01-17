'use client';

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Twitter, Instagram, Linkedin, ArrowUpRight, Globe, ArrowUp } from 'lucide-react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Footer = () => {
  const footerRef = useRef(null);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    // 1. Back to Top visibility logic
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);

    const ctx = gsap.context(() => {
      // 2. Layered Parallax
      gsap.to(".sticker-1", {
        y: -100,
        scrollTrigger: { trigger: footerRef.current, scrub: 1 }
      });
      gsap.to(".sticker-2", {
        y: -40,
        rotate: -20,
        scrollTrigger: { trigger: footerRef.current, scrub: 1.5 }
      });

      // 3. Character Float
      gsap.to(".char-float", {
        y: -30,
        x: 20,
        rotate: 10,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          scrub: 2,
        }
      });
    }, footerRef);

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="relative bg-[#F9F5E9] overflow-hidden pt-20 border-t-8 border-black">
      
      {/* --- 1. TOP DYNAMIC SECTION --- */}
      <div className="bg-[#EF3312] relative pt-24 pb-48 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'linear-gradient(#000 1.5px, transparent 1.5px), linear-gradient(90deg, #000 1.5px, transparent 1.5px)', backgroundSize: '50px 50px' }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
          <div className="sticker-1 absolute -top-10 left-[5%] rotate-[-15deg] bg-[#BAFF29] border-4 border-black px-6 py-3 rounded-2xl font-black text-black shadow-[6px_6px_0px_0px_#000] hidden md:block">
             GET ROASTED <ArrowUpRight className="inline ml-1"/>
          </div>

          <div className="sticker-2 absolute top-20 right-[8%] rotate-[15deg] bg-white border-4 border-black p-4 rounded-full shadow-[6px_6px_0px_0px_#4E31E2] hidden md:block">
             <span className="text-black font-black italic">100% BURN</span>
          </div>

          <div className="text-center space-y-8">
            <h3 className="text-white text-4xl md:text-6xl font-black italic uppercase tracking-tighter">
              Stop being boring. <br /> Start being <span className="underline decoration-8 decoration-[#FFC700]">Legendary</span>.
            </h3>
            
            <Link href="/lets-roast" className="group relative inline-block">
              <div className="absolute inset-0 bg-black rounded-full translate-y-3"></div>
              <div className="relative bg-[#FFC700] border-4 border-black px-12 py-6 rounded-full font-black italic text-2xl md:text-4xl text-black transition-transform group-hover:-translate-y-2 active:translate-y-1">
                JOIN THE CHAOS
              </div>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-[-2px] left-0 w-full h-20 bg-[#F9F5E9]" style={{ clipPath: "polygon(100% 0%, 100% 100%, 0% 100%, 0% 0%, 2% 40%, 4% 0%, 6% 40%, 8% 0%, 10% 40%, 12% 0%, 14% 40%, 16% 0%, 18% 40%, 20% 0%, 22% 40%, 24% 0%, 26% 40%, 28% 0%, 30% 40%, 32% 0%, 34% 40%, 36% 0%, 38% 40%, 40% 0%, 42% 40%, 44% 0%, 46% 40%, 48% 0%, 50% 40%, 52% 0%, 54% 40%, 56% 0%, 58% 40%, 60% 0%, 62% 40%, 64% 0%, 66% 40%, 68% 0%, 70% 40%, 72% 0%, 74% 40%, 76% 0%, 78% 40%, 80% 0%, 82% 40%, 84% 0%, 86% 40%, 88% 0%, 90% 40%, 92% 0%, 94% 40%, 96% 0%, 98% 40%, 100% 0%)" }}></div>
      </div>

      {/* --- 2. INFINITE MARQUEE STRIP --- */}
      <div className="bg-black py-4 border-y-4 border-black overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee flex gap-10">
          {[1,2,3,4].map((i) => (
            <span key={i} className="text-[#BAFF29] font-black italic uppercase text-2xl">
              DEPLOY THE BURN ● FLEX ON SOLANA ● NO FAKE ROASTS ● REAL DAMAGE ●
            </span>
          ))}
        </div>
      </div>

      {/* --- 3. LOWER CONTENT & SOCIALS --- */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16">
          
          <div className="space-y-10">
            <h1 className="text-7xl md:text-[10rem] font-black text-black leading-none tracking-tighter">
              PAY2ROAST
            </h1>
            <div className="flex flex-wrap gap-8 items-center">
              <div className="flex gap-4">
                <SocialLink href="https://twitter.com/mishaldotrwa" icon={<Twitter />} color="hover:bg-[#1DA1F2]" />
                <SocialLink href="https://github.com/mishalturkane" icon={<Github />} color="hover:bg-[#333]" />
                <SocialLink href="https://www.linkedin.com/in/mishalturkane" icon={<Linkedin />} color="hover:bg-[#0077B5]" />
                <SocialLink href="https://www.mishalturakne.xyz" icon={<Globe />} color="hover:bg-[#BAFF29] hover:text-black" />
              </div>
              <div className="char-float w-24 h-24 hidden md:block">
                 <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z0dzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1z/kI6370L7SlyFhLhM91/giphy.gif" className="w-full grayscale brightness-0" alt="character" />
              </div>
            </div>
          </div>

          <div className="text-right space-y-4 w-full lg:w-auto border-t-4 border-black pt-8 lg:border-none">
            <div className="flex items-center justify-end gap-2 mb-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                <span className="text-[10px] font-black uppercase tracking-widest text-black">System: Operational</span>
            </div>
            <p className="font-black italic uppercase text-xl">Design by Mishal Turkane</p>
            <p className="text-gray-500 font-bold max-w-sm ml-auto">
              Turning emotional damage into a tradable asset on Solana. Built for the degens.
            </p>
          </div>
        </div>

        {/* BOTTOM LINE */}
        <div className="mt-20 flex flex-col md:flex-row justify-between text-[11px] font-black uppercase tracking-[0.2em] text-black pt-8 border-t-2 border-black/5">
           <p>© 2026 PAY2ROAST / ALL RIGHTS RESERVED</p>
           <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/" className="hover:underline">Privacy</Link>
              <Link href="/" className="hover:underline">Terms of Heat</Link>
           </div>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-10 right-10 z-50 bg-black text-[#BAFF29] p-4 rounded-2xl border-2 border-[#BAFF29] shadow-[6px_6px_0px_0px_#BAFF29] transition-all duration-500 ${showTopBtn ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      >
        <ArrowUp size={24} />
      </button>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </footer>
  );
};

const SocialLink = ({ href, icon, color }: { href: string; icon: React.ReactNode; color: string }) => (
  <Link 
    href={href} 
    target="_blank"
    className={`p-4 border-4 border-black rounded-2xl bg-white text-black transition-all ${color} hover:text-white hover:-translate-y-2 shadow-[4px_4px_0px_0px_#000] hover:shadow-none`}
  >
    {icon}
  </Link>
);

export default Footer;