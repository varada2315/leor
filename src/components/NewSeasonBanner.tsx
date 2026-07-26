import React from 'react';
import { motion } from 'framer-motion';

export const NewSeasonBanner: React.FC = () => {
  return (
    <section className="bg-[#e4e4e6] relative overflow-hidden py-12 md:py-20 px-6 md:px-16 border-t border-b border-black/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Text Block */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 max-w-xl"
        >
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-neutral-600 block">
              NEW SEASON
            </span>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-[0.08em] uppercase text-[#111111] leading-none font-sans">
              NEW VIBES
            </h2>
          </div>

          <p className="text-sm md:text-base text-neutral-700 tracking-wide font-normal max-w-md">
            Elevate your everyday with timeless style. Designed for those who define their own rhythm.
          </p>

          <div>
            <a
              href="#collections"
              className="inline-block bg-[#0e0e10] text-white px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-neutral-800 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md active:translate-y-0"
            >
              EXPLORE COLLECTION
            </a>
          </div>
        </motion.div>

        {/* Right Model Portrait Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative flex justify-center md:justify-end"
        >
          <div className="relative max-w-md w-full overflow-hidden shadow-2xl rounded-xs group">
            <img
              src="/assets/new-season.png"
              alt="LEOR New Season Model"
              className="w-full h-auto object-cover grayscale contrast-110 group-hover:scale-105 transition-transform duration-700"
            />
            {/* Subtle Overlay Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
