'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

export default function Navbar() {
  const { user, authenticated, login, logout } = usePrivy();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(navRef.current, 
      { y: -120, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.2, ease: "bounce.out" }
    );
  }, []);

  const displayName = user?.twitter?.username || user?.email?.address?.split('@')[0] || 'Degen';

  // --- BURNING PAPER ANIMATION VARIANTS ---
  const burnVariants = {
    closed: {
      clipPath: "circle(0% at 90% 10%)", // Top right se start hoga
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    },
    open: {
      clipPath: "circle(150% at 90% 10%)", // Poora spread ho jayega
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
    }
  };

  return (
    <>
      {/* SVG FILTER FOR BURNING EDGES (Don't remove this) */}
      <svg className="absolute h-0 w-0">
        <defs>
          <filter id="burn-edge">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="5" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
          </filter>
        </defs>
      </svg>

      <nav ref={navRef} className="fixed top-0 w-full z-[100] bg-white border-b-4 border-black font-sans shadow-xl">
        <div className="flex justify-between items-center h-24 px-6 md:px-16 relative overflow-hidden">
          
          {/* Logo Section */}
          <div className="flex items-center gap-4 z-10">
            <Link href="/" className="group flex items-center gap-3">
              <div className="bg-[#BAFF29] p-3 rounded-2xl border-4 border-black group-hover:rotate-12 transition-transform shadow-[4px_4px_0px_0px_#000]">
                <span className="font-black text-black text-2xl italic tracking-tighter">P2R</span>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lime-500 text-2xl uppercase italic leading-none tracking-tighter">Pay2Rost</span>
               
              </div>
            </Link>
          </div>

          {/* Nav & Auth */}
          <div className="flex items-center gap-8 z-[101]">
            {!authenticated ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => login()}
                className="hidden md:flex bg-[#BAFF29] text-black px-8 py-3 rounded-2xl border-4 border-black font-black uppercase italic shadow-[4px_4px_0px_0px_#000]"
              >
                Connect
              </motion.button>
            ) : (
                <div className="hidden md:flex items-center gap-3 bg-black text-white p-1 pr-4 rounded-full border-2 border-black">
                    <div className="w-8 h-8 rounded-full border-2 border-[#BAFF29] overflow-hidden">
                        <Image src={user?.twitter?.profilePictureUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'} alt="p" width={32} height={32}/>
                    </div>
                    <span className="text-xs font-black italic">@{displayName}</span>
                </div>
            )}

            {/* HAMBURGER TOGGLE */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-[#9381ff] p-3 border-4 border-black rounded-2xl shadow-[4px_4px_0px_0px_#000] relative z-[110]"
            >
              <div className={`w-6 h-1 bg-black mb-1.5 rounded-full transition-all ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
              <div className={`w-6 h-1 bg-black mb-1.5 rounded-full transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
              <div className={`w-6 h-1 bg-black rounded-full transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* BURNING PAPER FULL SCREEN MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            variants={burnVariants}
            initial="closed"
            animate="open"
            exit="closed"
            style={{ filter: "url(#burn-edge)" }} // Burning edge effect applied here
            className="fixed inset-0 z-[95] bg-[#BAFF29] flex items-center justify-center border-l-[20px] border-black"
          >
            {/* Paper Texture Overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

            <div className="flex flex-col space-y-8 text-center">
              {['ABOUT', 'WHY ROAST', 'STATS', 'lets-roast'].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <Link 
                    href={`/${item.toLowerCase().replace(' ', '-')}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter hover:text-white transition-colors stroke-black"
                    style={{ WebkitTextStroke: '3px black' }}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
              
              <button 
                onClick={() => logout()}
                className="mt-10 text-xl font-black underline decoration-4 decoration-black hover:text-[#9381ff]"
              >
                Logout Account
              </button>
            </div>

            {/* Burning Sparkle Animation */}
            <motion.div 
              animate={{ opacity: [0, 1, 0], scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute top-20 right-20 text-6xl"
            >
              🔥
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}