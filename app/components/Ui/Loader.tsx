"use client";
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <motion.div 
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 2 }}
      className="fixed inset-0 z-[9999] bg-[#BAFF29] flex flex-col items-center justify-center text-black"
    >
      <div className="overflow-hidden">
        <motion.h2 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: "backOut" }}
          className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter"
        >
          CALCULATING <br /> DAMAGE...
        </motion.h2>
      </div>
      
      {/* Progress Bar */}
      <div className="w-64 h-2 bg-black/10 mt-8 rounded-full overflow-hidden relative">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 bg-black"
        />
      </div>

      <p className="mt-4 font-black uppercase text-xs tracking-[0.5em] animate-pulse">
        Deploying on Solana
      </p>
    </motion.div>
  );
};

export default Loader;