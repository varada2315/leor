import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

export const BestSellers: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, setQuickViewProduct } = useStore();
  const [activeTab, setActiveTab] = useState<'ALL' | 'DENIM' | 'TOPS' | 'BOTTOMS'>('ALL');

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'DENIM') return p.category.toUpperCase() === 'DENIM';
    if (activeTab === 'TOPS') return p.category.toUpperCase() === 'TOPS';
    if (activeTab === 'BOTTOMS') return p.category.toUpperCase() === 'BOTTOMS';
    return true;
  });

  return (
    <section id="bestsellers" className="bg-[#f5f5f7] py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 pb-4 border-b border-black/10">
          <div>
            <span className="text-xs font-bold tracking-[0.25em] text-neutral-500 uppercase">
              CURATED SELECTION
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-[0.15em] uppercase text-[#111111] font-sans mt-1">
              BEST SELLERS
            </h2>
          </div>

          <div className="flex items-center gap-6 mt-4 sm:mt-0">
            {/* Filter Tabs */}
            <div className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase">
              {(['ALL', 'DENIM', 'TOPS', 'BOTTOMS'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 transition-all rounded-sm ${
                    activeTab === tab
                      ? 'bg-black text-white'
                      : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <a
              href="#all-products"
              className="text-xs font-bold tracking-[0.2em] uppercase text-[#111111] hover:text-neutral-500 transition-colors underline underline-offset-4"
            >
              VIEW ALL
            </a>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product: Product, idx: number) => {
            const isLiked = wishlist.includes(product.id);

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group flex flex-col"
              >
                {/* Product Image Container */}
                <div className="relative w-full aspect-[3/4] bg-neutral-200 overflow-hidden rounded-xs">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 cursor-pointer"
                    onClick={() => setQuickViewProduct(product)}
                  />

                  {/* Wishlist Heart Button Top Right */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-black hover:bg-black hover:text-white transition-all shadow-sm z-10"
                    aria-label="Wishlist"
                  >
                    <Heart
                      size={18}
                      className={isLiked ? 'fill-black text-black group-hover:fill-white group-hover:text-white' : ''}
                    />
                  </button>

                  {/* Tag Badge Top Left */}
                  {product.tag && (
                    <span className="absolute top-3 left-3 bg-black/90 text-white text-[10px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 z-10">
                      {product.tag}
                    </span>
                  )}

                  {/* Slide-Up Action Buttons */}
                  <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
                    <button
                      onClick={() => addToCart(product, 'M')}
                      className="flex-1 bg-black text-white text-[11px] font-bold tracking-widest uppercase py-3 flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors shadow-lg"
                    >
                      <ShoppingBag size={14} />
                      <span>ADD TO BAG</span>
                    </button>
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="w-10 bg-white text-black text-[11px] font-bold flex items-center justify-center hover:bg-neutral-100 transition-colors shadow-lg"
                      title="Quick View"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </div>

                {/* Product Meta Info */}
                <div className="mt-4 flex flex-col justify-between flex-1">
                  <div>
                    <h3
                      onClick={() => setQuickViewProduct(product)}
                      className="text-sm font-bold tracking-wide text-[#111111] hover:text-neutral-600 transition-colors cursor-pointer"
                    >
                      {product.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-extrabold text-[#111111]">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-neutral-400 line-through font-medium">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
