'use client'; // Client-side state handling ke liye zaroori hai

import { useState, useEffect } from "react";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./providers/PriviyProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Ui/Loader"; // Humara naya Loader
import { AnimatePresence } from "framer-motion";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '900'], // 900 for extra bold GenZ feel
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Note: Metadata ko client component mein directly nahi rakh sakte, 
// isliye isse alag layout file ya metadata wrapper mein rakha jata hai.
// Agar error aaye toh metadata ko separate server layout mein move kar dena.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fake loading time for the vibe
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 seconds loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${poppins.className} ${geistMono.variable} antialiased bg-black`}
      >
        <Providers>
          {/* AnimatePresence handle karta hai Exit animations ko */}
          <AnimatePresence mode="wait">
            {isLoading && <Loader key="loader" />}
          </AnimatePresence>

          {!isLoading && (
            <div className="relative flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          )}
        </Providers>
      </body>
    </html>
  );
}