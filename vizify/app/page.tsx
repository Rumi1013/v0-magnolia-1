"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-magnolia-white">
      <motion.h1 
        className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-midnight-blue leading-tight mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Midnight Magnolia
        <span className="text-rich-gold block">A Southern Digital Sanctuary</span>
      </motion.h1>

      <motion.p
        className="mt-6 text-xl text-midnight-teal max-w-2xl text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        A digital-first brand weaving together creativity, self-healing, automation,
        and storytelling for women of resilience. Anchored in Southern Gothic elegance,
        it's a sanctuary for transformation through art, tech, and income stability.
      </motion.p>

      <motion.div
        className="mt-8 flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Link href="/pages" className="bg-rich-gold text-midnight-blue hover:bg-rich-gold/90 px-8 py-3 rounded-md font-medium">
          Visit Pages Site
        </Link>
      </motion.div>
    </main>
  );
}