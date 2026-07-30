import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';

export const WishlistDrawer: React.FC = () => {
  const { isWishlistOpen, setWishlistOpen, wishlist, toggleWishlist, addToCart } = useStore();

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setWishlistOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-[#f5f5f7] shadow-2xl flex flex-col"
            >
              <div className="p-6 bg-white border-b border-black/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Heart size={20} className="fill-black text-black" />
                  <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-[#111111]">
                    SAVED WISHLIST ({wishlist.length})
                  </h2>
                </div>
                <button
                  onClick={() => setWishlistOpen(false)}
                  className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-black"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {wishlistProducts.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <Heart size={48} className="text-neutral-300 mb-4" strokeWidth={1} />
                    <p className="text-sm font-bold tracking-wider uppercase text-neutral-600">NO WISHLIST ITEMS YET</p>
                    <p className="text-xs text-neutral-400 mt-1">Tap the heart icon on any product to save items for later.</p>
                  </div>
                ) : (
                  wishlistProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex gap-4 p-3 bg-white rounded-xs border border-black/5 items-center justify-between"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-20 object-cover bg-neutral-100 rounded-xs"
                      />
                      <div className="flex-1 px-2">
                        <h4 className="text-xs font-bold tracking-wide text-[#111111]">{product.name}</h4>
                        <span className="text-xs font-extrabold text-black block mt-1">₹{product.price.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => addToCart(product, 'M')}
                          className="bg-black text-white p-2 rounded-xs hover:bg-neutral-800 transition-colors"
                          title="Add to Bag"
                        >
                          <ShoppingBag size={14} />
                        </button>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-neutral-400 hover:text-red-600 transition-colors p-2"
                          title="Remove"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
