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
          className="relative w-full max-w-4xl bg-white shadow-2xl rounded-sm overflow-hidden z-10 grid grid-cols-1 md:grid-cols-2"
        >
          {/* Close Button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur-md rounded-full text-black hover:bg-black hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          {/* Product Image Column */}
          <div className="relative bg-neutral-100 aspect-[3/4] md:aspect-auto">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover grayscale contrast-110"
            />
            {quickViewProduct.tag && (
              <span className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1">
                {quickViewProduct.tag}
              </span>
            )}
          </div>

          {/* Product Details Column */}
          <div className="p-8 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-bold tracking-[0.25em] text-neutral-400 uppercase">
                {quickViewProduct.category}
              </span>
              <h2 className="text-2xl font-extrabold tracking-wide uppercase text-black font-sans mt-1">
                {quickViewProduct.name}
              </h2>

              <div className="flex items-center gap-3 mt-3">
                <span className="text-xl font-black text-black">
                  ₹{quickViewProduct.price.toLocaleString('en-IN')}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-sm text-neutral-400 line-through">
                    ₹{quickViewProduct.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed mt-4">
                {quickViewProduct.description}
              </p>

              {/* Size Selector */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold tracking-widest uppercase text-black">SELECT SIZE</span>
                  <a href="#sizeguide" className="text-[11px] text-neutral-500 underline font-medium">Size Guide</a>
                </div>
                <div className="flex gap-2">
                  {quickViewProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-11 h-11 border text-xs font-bold transition-all ${
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
            <div className="space-y-3 pt-4 border-t border-neutral-200">
              <button
                onClick={() => {
                  addToCart(quickViewProduct, selectedSize);
                  setQuickViewProduct(null);
                }}
                className="w-full bg-black text-white py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <ShoppingBag size={16} />
                <span>ADD TO BAG ({selectedSize})</span>
              </button>

              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`w-full py-3.5 text-xs font-bold tracking-[0.2em] uppercase border transition-all flex items-center justify-center gap-2 ${
                  isLiked
                    ? 'border-black bg-black text-white'
                    : 'border-neutral-300 text-black hover:border-black'
                }`}
              >
                <Heart size={16} className={isLiked ? 'fill-white text-white' : ''} />
                <span>{isLiked ? 'IN WISHLIST' : 'SAVE TO WISHLIST'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
