import React from 'react';
import { motion } from 'framer-motion';
import { Truck, RotateCcw, ShieldCheck, Lock } from 'lucide-react';

const FEATURES = [
  {
    icon: Truck,
    title: 'FAST DELIVERY',
    description: 'Quick & safe delivery',
  },
  {
    icon: RotateCcw,
    title: 'EASY RETURNS',
    description: 'Within 15 days',
  },
  {
    icon: ShieldCheck,
    title: 'QUALITY ASSURED',
    description: 'Best fashion, best quality',
  },
  {
    icon: Lock,
    title: 'SECURE PAYMENT',
    description: '100% secure checkout',
  },
];

export const ValueProps: React.FC = () => {
  return (
    <section className="bg-[#f0f0f2] py-10 sm:py-12 px-4 sm:px-6 md:px-12 border-b border-black/5">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {FEATURES.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex items-center gap-4 group p-3 hover:bg-white/60 transition-colors rounded-sm"
            >
              <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center text-[#111111] group-hover:bg-black group-hover:text-white transition-all duration-300 shrink-0">
                <IconComponent size={22} strokeWidth={1.5} />
              </div>

              <div>
                <h4 className="text-xs font-bold tracking-[0.18em] uppercase text-[#111111] font-sans">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-500 mt-0.5 font-medium">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
