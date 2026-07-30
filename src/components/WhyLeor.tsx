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
    <section className="relative bg-[#0b0b0d] text-white py-24 px-6 md:px-12 overflow-hidden border-t border-b border-white/10">
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
      <div className="absolute right-4 bottom-0 text-[18rem] md:text-[24rem] font-black text-white/[0.02] select-none pointer-events-none leading-none tracking-tighter">
        LEOR
      </div>

      <div className="relative max-w-7xl mx-auto space-y-16">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 text-[10px] font-extrabold tracking-[0.4em] uppercase text-neutral-400">
              <span className="w-6 h-px bg-neutral-400" />
              The LEOR Standard
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase font-sans text-white leading-none">
              Why LEOR<span className="text-neutral-500">.</span>
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {WHY_LEOR_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={cardVariants}
                className="group relative bg-[#131316]/90 border border-white/10 p-8 rounded-xs hover:border-white/40 hover:bg-[#18181c] transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Subtle Number & Tag */}
                <div className="flex items-center justify-between pb-6 border-b border-white/5">
                  <span className="text-xs font-mono font-bold tracking-widest text-neutral-500 group-hover:text-white transition-colors">
                    {item.num}
                  </span>
                  <span className="text-[9px] font-semibold tracking-[0.2em] uppercase text-neutral-400 bg-white/5 px-2.5 py-1 rounded-xs group-hover:bg-white group-hover:text-black transition-all">
                    {item.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="py-6 space-y-4">
                  <div className="w-12 h-12 rounded-xs bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-300">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold tracking-tight text-white flex items-center justify-between group-hover:translate-x-0.5 transition-transform">
                      {item.title}
                      <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400" />
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">
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
