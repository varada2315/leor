import React from 'react';
import { motion } from 'framer-motion';

export const TopBanner: React.FC = () => {
  return (
    <div className="bg-[#0b0b0d] text-white text-[11px] font-medium tracking-[0.18em] uppercase py-2 px-4 md:px-12 flex justify-between items-center border-b border-white/10 w-full z-50 relative">
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2"
      >
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
        <span>FREE SHIPPING ON ORDERS ABOVE ₹1999</span>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden md:flex items-center gap-4 text-white/70"
      >
        <a href="#download" className="hover:text-white transition-colors duration-200">DOWNLOAD APP</a>
        <span className="text-white/30">|</span>
        <a href="#track" className="hover:text-white transition-colors duration-200">TRACK ORDER</a>
        <span className="text-white/30">|</span>
        <a href="#help" className="hover:text-white transition-colors duration-200">HELP</a>
      </motion.div>
    </div>
  );
};
