import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useStore();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 bg-[#0e0e10] text-white px-5 py-3.5 rounded-sm shadow-2xl flex items-center gap-3 border border-white/20"
        >
          <CheckCircle2 size={18} className="text-white shrink-0" />
          <span className="text-xs font-semibold tracking-wide">{toastMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
