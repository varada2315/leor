import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, wishlist, toggleWishlist } = useStore();
  const [selectedSize, setSelectedSize] = useState('M');

  if (!quickViewProduct) return null;

  const isLiked = wishlist.includes(quickViewProduct.id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-black/75 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl max-h-[88vh] md:max-h-[90vh] bg-white shadow-2xl rounded-md overflow-hidden z-10 flex flex-col md:grid md:grid-cols-2 overflow-y-auto my-auto"
        >
          {/* Close Button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-3 right-3 z-30 p-2 bg-white/90 backdrop-blur-md rounded-full text-black hover:bg-black hover:text-white transition-colors shadow-md cursor-pointer"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {/* Product Image Column */}
          <div className="relative bg-neutral-100 h-52 sm:h-72 md:h-full min-h-[200px] shrink-0">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover object-top grayscale contrast-110"
            />
            {quickViewProduct.tag && (
              <span className="absolute top-3 left-3 bg-black text-white text-[9px] font-extrabold tracking-[0.2em] uppercase px-2.5 py-1 z-10 shadow-sm">
                {quickViewProduct.tag}
              </span>
            )}
          </div>

          {/* Product Details Column */}
          <div className="p-5 sm:p-6 md:p-8 flex flex-col justify-between space-y-4 md:space-y-6 overflow-y-auto">
            <div>
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-neutral-400 uppercase">
                {quickViewProduct.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-wide uppercase text-black font-sans mt-1">
                {quickViewProduct.name}
              </h2>

              <div className="flex items-center gap-3 mt-2 sm:mt-3">
                <span className="text-lg sm:text-xl font-black text-black">
                  ₹{quickViewProduct.price.toLocaleString('en-IN')}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-xs sm:text-sm text-neutral-400 line-through font-medium">
                    ₹{quickViewProduct.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed mt-3 sm:mt-4 line-clamp-3 sm:line-clamp-none">
                {quickViewProduct.description}
              </p>

              {/* Size Selector */}
              <div className="mt-4 sm:mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-black">SELECT SIZE</span>
                  <a href="#sizeguide" className="text-[10px] sm:text-[11px] text-neutral-500 underline font-medium">Size Guide</a>
                </div>
                <div className="flex gap-2">
                  {quickViewProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 sm:w-11 sm:h-11 border text-xs font-bold transition-all rounded-xs cursor-pointer ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-neutral-300 text-black hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-3 sm:pt-4 border-t border-neutral-200 mt-auto">
              <button
                onClick={() => {
                  addToCart(quickViewProduct, selectedSize);
                  setQuickViewProduct(null);
                }}
                className="w-full bg-black text-white py-3.5 text-xs font-bold tracking-[0.2em] uppercase hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer rounded-xs active:scale-[0.98]"
              >
                <ShoppingBag size={15} />
                <span>ADD TO BAG ({selectedSize})</span>
              </button>

              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`w-full py-3 text-xs font-bold tracking-[0.2em] uppercase border transition-all flex items-center justify-center gap-2 cursor-pointer rounded-xs active:scale-[0.98] ${
                  isLiked
                    ? 'border-black bg-black text-white'
                    : 'border-neutral-300 text-black hover:border-black'
                }`}
              >
                <Heart size={15} className={isLiked ? 'fill-white text-white' : ''} />
                <span>{isLiked ? 'IN WISHLIST' : 'SAVE TO WISHLIST'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
