import React from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Sparkles,
  Scissors,
  Feather,
  ShieldCheck,
  Truck,
  ArrowUpRight
} from 'lucide-react';

const WHY_LEOR_ITEMS = [
  {
    num: '01',
    icon: Award,
    title: 'Premium Quality',
    description: 'Sourced from world-class textile mills, ensuring superior texture, weight, and unmatched feel in every thread.',
    tag: 'Crafted Excellence'
  },
  {
    num: '02',
    icon: Sparkles,
    title: 'Modern & Timeless Design',
    description: 'Architectural silhouettes engineered to transcend fast-fashion trends and remain iconic season after season.',
    tag: 'Signature Aesthetics'
  },
  {
    num: '03',
    icon: Scissors,
    title: 'Crafted with Precision',
    description: 'Double-stitched seams, custom hardware, and meticulous tailoring for a flawless, tailored drape.',
    tag: 'Master Tailoring'
  },
  {
    num: '04',
    icon: Feather,
    title: 'Everyday Comfort',
    description: 'Ultra-soft, breathable natural fibers tailored for effortless movement and all-day luxury comfort.',
    tag: 'Uncompromised Feel'
  },
  {
    num: '05',
    icon: ShieldCheck,
    title: 'Made to Last',
    description: 'Preshrunk, heavy-gsm textiles built to retain color, structure, and softness through years of wear.',
    tag: 'Durable Integrity'
  },
  {
    num: '06',
    icon: Truck,
    title: 'Fast Shipping & Easy Returns',
    description: 'Express door-to-door fulfillment worldwide with our simple, transparent 15-day return policy.',
    tag: 'Seamless Service'
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const WhyLeor: React.FC = () => {
  return (
    <section className="relative bg-[#0b0b0d] text-white py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 overflow-hidden border-t border-b border-white/10">
      {/* Background Ambient Glow & Grain */}
      <div className="absolute inset-0 bg-radial from-white/[0.04] via-transparent to-transparent pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Decorative Large Watermark Background */}
      <div className="absolute right-4 bottom-0 text-[12rem] sm:text-[18rem] md:text-[24rem] font-black text-white/[0.02] select-none pointer-events-none leading-none tracking-tighter">
        LEOR™
      </div>

      <div className="relative max-w-7xl mx-auto space-y-8 sm:space-y-12 md:space-y-16">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 border-b border-white/10 pb-6 sm:pb-8">
          <div className="space-y-2 sm:space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 text-[9px] sm:text-[10px] font-extrabold tracking-[0.35em] sm:tracking-[0.4em] uppercase text-neutral-400">
              <span className="w-5 sm:w-6 h-px bg-neutral-400" />
              The LEOR<span className="text-[0.45em] font-normal align-top relative -top-[0.2em] ml-0.5 tracking-normal opacity-75">TM</span> Standard
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase font-sans text-white leading-none">
              Why LEOR<span className="text-[0.38em] font-normal align-top relative -top-[0.3em] ml-0.5 tracking-normal opacity-80">TM</span><span className="text-neutral-500">.</span>
            </h2>
          </div>
          <p className="text-xs md:text-sm text-neutral-400 max-w-md font-normal leading-relaxed">
            We reject fashion shortcuts. Every piece is constructed with uncompromising precision, premium raw materials, and fair pricing.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-6"
        >
          {WHY_LEOR_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={cardVariants}
                className="group relative bg-[#131316]/90 border border-white/10 p-4 sm:p-6 md:p-8 rounded-xs hover:border-white/40 hover:bg-[#18181c] transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Subtle Number & Tag */}
                <div className="flex items-center justify-between pb-3 sm:pb-5 border-b border-white/5">
                  <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-neutral-500 group-hover:text-white transition-colors">
                    {item.num}
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-neutral-400 bg-white/5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xs group-hover:bg-white group-hover:text-black transition-all truncate max-w-[90px] sm:max-w-none">
                    {item.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="py-4 sm:py-6 space-y-3 sm:space-y-4">
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xs bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-300">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <h3 className="text-xs sm:text-base md:text-lg font-bold tracking-tight text-white flex items-center justify-between group-hover:translate-x-0.5 transition-transform leading-tight">
                      <span>{item.title}</span>
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400 hidden sm:block shrink-0" />
                    </h3>
                    <p className="text-[10px] sm:text-xs text-neutral-400 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Border Highlight on Hover */}
                <div className="h-0.5 w-0 group-hover:w-full bg-white transition-all duration-500" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
