'use client';

import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Ui/Hero';
import WhyPayToRoast from './components/Ui/WhyUs';
import Process from './components/Ui/Process';
import Stats from './components/Ui/Stats';
import Rosted from './components/Ui/Rosted';
import Testimonials from './components/Ui/Testimonials';
import Footer from './components/Footer';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis'   

export default function Home() {
  useEffect(() => {
    // 1. Lenis Smooth Scroll Initialization (Amiro wala smooth scroll)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. GSAP Global Scroll Animations
    gsap.registerPlugin(ScrollTrigger);
    
    const sections = document.querySelectorAll('.scroll-section');
    sections.forEach((section) => {
      gsap.fromTo(section, 
        { opacity: 0, y: 100 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative bg-white selection:bg-[#BAFF29] selection:text-black min-h-screen">
      {/* Fixed Navbar - Sabse upar */}
      <Navbar />

      {/* Sections - Har section ek clean block mein */}
      <Hero />

      <section className="scroll-section">
        <WhyPayToRoast />
      </section>

      <section className="scroll-section">
        <Process />
      </section>

      <section className="scroll-section">
        <Stats />
      </section>

      <section className="scroll-section">
        <Rosted />
      </section>

      <section className="scroll-section">
        <Testimonials />
      </section>

      {/* Footer - No scroll-section class needed for reveal effect */}
     
      
      {/* Global Background Noise (Optional but Premium) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-[999]" />
    </main>
  );
}