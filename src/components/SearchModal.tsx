import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setSearchOpen, addToCart, setQuickViewProduct } = useStore();
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : PRODUCTS.slice(0, 4);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Search Box Modal */}
          <div className="relative min-h-screen flex items-start justify-center p-4 pt-16">
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl bg-white shadow-2xl rounded-sm overflow-hidden z-10"
            >
              {/* Search Bar Input */}
              <div className="flex items-center px-6 py-5 border-b border-black/10">
                <Search size={22} className="text-neutral-400 mr-4" />
                <input
                  type="text"
                  placeholder="Search denim, tees, jackets..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                  className="w-full text-base font-semibold tracking-wide text-black placeholder:text-neutral-400 focus:outline-none bg-transparent"
                />
                {query && (
                  <button onClick={() => setQuery('')} className="text-neutral-400 hover:text-black mr-2">
                    <X size={18} />
                  </button>
                )}
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-black ml-2"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Search Results List */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                <p className="text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase mb-4">
                  {query ? `FOUND (${filtered.length}) RESULTS` : 'POPULAR SUGGESTIONS'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filtered.map((product) => (
                    <div
                      key={product.id}
                      className="flex gap-4 p-3 rounded-xs border border-neutral-200 hover:border-black transition-all bg-[#f9f9fb] group cursor-pointer"
                      onClick={() => {
                        setQuickViewProduct(product);
                        setSearchOpen(false);
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-20 object-cover rounded-xs bg-neutral-200"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-black group-hover:underline">{product.name}</h4>
                          <span className="text-[11px] text-neutral-500 font-medium block mt-0.5">{product.category}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs font-extrabold text-black">₹{product.price.toLocaleString('en-IN')}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product, 'M');
                              setSearchOpen(false);
                            }}
                            className="bg-black text-white p-1.5 rounded-xs hover:bg-neutral-800 transition-colors"
                          >
                            <ShoppingBag size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
