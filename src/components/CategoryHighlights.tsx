import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CategoryCard {
  title: string;
  subtitle: string;
  linkText: string;
  linkHref: string;
  image: string;
}

const CATEGORIES: CategoryCard[] = [
  {
    title: 'MEN',
    subtitle: 'Modern essentials for every day.',
    linkText: 'SHOP MEN',
    linkHref: '#men',
    image: '/assets/cat-men.png',
  },
  {
    title: 'NEW ARRIVALS',
    subtitle: 'Fresh styles. New mindset.',
    linkText: 'SHOP NEW IN',
    linkHref: '#new-arrivals',
    image: '/assets/cat-new-arrivals.png',
  },
  {
    title: 'BEST SELLERS',
    subtitle: 'Timeless pieces that define you.',
    linkText: 'SHOP BEST SELLERS',
    linkHref: '#bestsellers',
    image: '/assets/cat-bestsellers.png',
  },
];

export const CategoryHighlights: React.FC = () => {
  return (
    <section className="bg-[#0e0e10] text-white py-12 sm:py-16 px-4 sm:px-6 md:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {CATEGORIES.map((cat, idx) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: idx * 0.15 }}
            className="group flex flex-row items-center gap-4 sm:gap-6 bg-[#161619] p-4 sm:p-5 rounded-sm border border-white/5 hover:border-white/20 transition-all duration-300 hover:bg-[#1c1c20]"
          >
            {/* Model Image Thumbnail */}
            <div className="relative w-20 sm:w-28 h-28 sm:h-36 shrink-0 overflow-hidden bg-neutral-900 rounded-sm">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
              />
            </div>

            {/* Text Content */}
            <div className="flex flex-col justify-between h-full py-1 text-center sm:text-left">
              <div>
                <h3 className="text-base font-bold tracking-[0.2em] uppercase text-white font-sans">
                  {cat.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-2 font-normal leading-relaxed">
                  {cat.subtitle}
                </p>
              </div>

              <a
                href={cat.linkHref}
                className="mt-4 inline-flex items-center justify-center sm:justify-start gap-2 text-xs font-bold tracking-[0.2em] uppercase text-white group-hover:text-neutral-300 transition-colors"
              >
                <span>{cat.linkText}</span>
                <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
