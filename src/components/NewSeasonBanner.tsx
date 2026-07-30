import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../context/StoreContext';

/* ── Shared ease curve ── */
const easeOut = [0.16, 1, 0.3, 1];

/* ── Staggered fade-up variants ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: easeOut },
  },
};

/* ── Image scroll fade-in & subtle scale ── */
const imageVariant = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: easeOut, delay: 0.15 },
  },
};

export const NewSeasonBanner: React.FC = () => {
  const { setActiveView } = useStore();

  return (
    <section className="bg-[#e4e4e6] relative overflow-hidden py-10 sm:py-16 md:py-24 px-4 sm:px-6 md:px-16 border-t border-b border-black/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">

        {/* ── Left: staggered text block ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="space-y-4 sm:space-y-6 max-w-xl"
        >
          {/* NEW SEASON label */}
          <motion.div variants={fadeUpItem} className="space-y-1.5 sm:space-y-2">
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-neutral-600 block">
              NEW SEASON
            </span>

            {/* NEW VIBES heading */}
            <motion.h2
              variants={fadeUpItem}
              className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-[0.08em] uppercase text-[#111111] leading-none font-sans"
            >
              NEW VIBES
            </motion.h2>
          </motion.div>

          {/* Body copy */}
          <motion.p
            variants={fadeUpItem}
            className="text-sm md:text-base text-neutral-700 tracking-wide font-normal max-w-md"
          >
            Elevate your everyday with timeless style. Designed for those who define their own rhythm.
          </motion.p>

          {/* CTA button */}
          <motion.div variants={fadeUpItem}>
            <button
              onClick={() => setActiveView('collections')}
              className="inline-block bg-[#0e0e10] text-white px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-neutral-800 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md active:translate-y-0 cursor-pointer"
            >
              EXPLORE COLLECTION
            </button>
          </motion.div>
        </motion.div>

        {/* ── Right: model image with scroll fade-in animation ── */}
        <motion.div
          variants={imageVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="relative flex justify-center md:justify-end"
        >
          <div className="relative max-w-md w-full overflow-hidden shadow-2xl rounded-xs group">
            <img
              src="/assets/new-season.png"
              alt="LEOR New Season Model"
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Subtle Overlay Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};
