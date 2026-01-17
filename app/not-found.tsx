"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Glitch Text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
        <h1 className="text-[40vw] font-black italic">404</h1>
      </div>

      <div className="relative z-10 text-center">
        {/* Animated Icon */}
        <motion.div 
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-9xl mb-8"
        >
          😵‍💫
        </motion.div>

        <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-6">
          PAGE <br /> <span className="text-[#9381ff]">REDACTED</span>
        </h2>
        
        <p className="text-xl md:text-2xl font-bold italic text-gray-500 mb-12 max-w-md mx-auto">
          Bhai, galat raste aa gaya. Ye link exist nahi karta ya phir victim ne darr ke delete kar diya.
        </p>

        {/* Hover Effect Button similar to team section style */}
        <Link href="/" className="group relative inline-block">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative bg-[#BAFF29] text-black px-12 py-6 rounded-[30px] font-black text-2xl uppercase italic border-4 border-black shadow-[10px_10px_0px_0px_#9381ff] group-hover:shadow-none group-hover:translate-x-2 group-hover:translate-y-2 transition-all"
          >
            Go Back Home
          </motion.div>
        </Link>
      </div>

      {/* Side Stickers like in your footer image */}
      <div className="absolute bottom-10 left-10 rotate-[-15deg] bg-white text-black p-4 border-2 border-black font-black uppercase text-xs">
        System Error 404
      </div>
      <div className="absolute top-20 right-10 rotate-[15deg] bg-[#EF3312] text-white p-4 border-2 border-black font-black uppercase text-xs">
        Critical Damage
      </div>
    </main>
  );
}