import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Star, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

/* ── Star Rating display ── */
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={11}
          className={
            i <= fullStars
              ? 'fill-amber-400 text-amber-400'
              : hasHalf && i === fullStars + 1
                ? 'fill-amber-200 text-amber-400'
                : 'fill-neutral-200 text-neutral-300'
          }
        />
      ))}
      <span className="text-[10px] font-bold text-neutral-500 ml-0.5">{rating.toFixed(1)}</span>
    </div>
  );
};

export const BestSellers: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, setQuickViewProduct, setActiveView } = useStore();
  const [activeTab, setActiveTab] = useState<'ALL' | 'DENIM' | 'TOPS' | 'BOTTOMS'>('ALL');
  const [hoveredColors, setHoveredColors] = useState<Record<string, string>>({});

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'DENIM') return p.category.toUpperCase() === 'DENIM';
    if (activeTab === 'TOPS') return p.category.toUpperCase() === 'TOPS';
    if (activeTab === 'BOTTOMS') return p.category.toUpperCase() === 'BOTTOMS';
    return true;
  });

  return (
    <section id="bestsellers" className="bg-[#f5f5f7] pt-12 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* ── Section Header ── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 pb-4 border-b border-black/10 gap-4">
          <div>
            <span className="text-[10px] font-bold tracking-[0.25em] text-neutral-400 uppercase">
              CURATED SELECTION
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-[0.15em] uppercase text-[#111111] font-sans mt-1">
              BEST SELLERS
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold tracking-widest uppercase overflow-x-auto no-scrollbar max-w-full pb-1 flex-nowrap sm:flex-wrap">
              {(['ALL', 'DENIM', 'TOPS', 'BOTTOMS'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 transition-all rounded-xs whitespace-nowrap cursor-pointer ${activeTab === tab
                      ? 'bg-black text-white'
                      : 'text-neutral-500 hover:text-black hover:bg-black/5'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* View All — proper button */}
            <button
              onClick={() => setActiveView('collections')}
              className="inline-flex items-center gap-2 bg-black text-white px-5 py-2 text-[11px] font-black tracking-[0.2em] uppercase hover:bg-neutral-800 transition-colors group shrink-0 cursor-pointer"
            >
              VIEW ALL
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* ── Product Cards Grid (Sleek 4-col layout) ── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {filteredProducts.map((product: Product, idx: number) => {
            const isLiked = wishlist.includes(product.id);
            const activeColor = hoveredColors[product.id];
            const hasColors = product.colors && product.colors.length > 0;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="group flex flex-col"
              >
                {/* ── Product Image ── */}
                <div className="relative w-full aspect-[3/4] bg-neutral-200 overflow-hidden rounded-xs">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 cursor-pointer"
                    onClick={() => setQuickViewProduct(product)}
                  />

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center text-black hover:bg-black hover:text-white transition-all shadow-md z-10 cursor-pointer"
                    aria-label="Wishlist"
                  >
                    <Heart
                      size={16}
                      className={isLiked ? 'fill-black text-black' : ''}
                    />
                  </button>

                  {/* Tag Badge */}
                  {product.tag && (
                    <span className="absolute top-3 left-3 bg-black/90 text-white text-[9px] font-black tracking-[0.2em] uppercase px-2.5 py-1 z-10">
                      {product.tag}
                    </span>
                  )}

                  {/* Color swatch overlay indicator */}
                  {activeColor && (
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-20"
                      style={{ backgroundColor: activeColor }}
                    />
                  )}

                  {/* Quick View Eye Button in Photo Corner */}
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm text-black flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-md z-10 cursor-pointer"
                    title="Quick View"
                  >
                    <Eye size={15} />
                  </button>
                </div>

                {/* ── Product Meta & Outer Card Action ── */}
                <div className="mt-3.5 flex flex-col justify-between flex-1 gap-2">
                  <div className="space-y-2">
                    {/* Name */}
                    <h3
                      onClick={() => setQuickViewProduct(product)}
                      className="text-sm font-bold tracking-wide text-[#111111] hover:text-neutral-600 transition-colors cursor-pointer leading-tight"
                    >
                      {product.name}
                    </h3>

                    {/* Star Rating */}
                    {product.rating && <StarRating rating={product.rating} />}

                    {/* Price Row */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold text-[#111111]">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-neutral-400 line-through font-medium">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                      {product.originalPrice && (
                        <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-2xs">
                          {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                        </span>
                      )}
                    </div>

                    {/* Color Swatches */}
                    {hasColors && (
                      <div className="flex items-center gap-1.5 pt-0.5">
                        {product.colors!.map((color) => (
                          <button
                            key={color}
                            title={color}
                            onMouseEnter={() => setHoveredColors((prev) => ({ ...prev, [product.id]: color }))}
                            onMouseLeave={() => setHoveredColors((prev) => { const n = { ...prev }; delete n[product.id]; return n; })}
                            className={`w-4 h-4 rounded-full border-2 transition-all duration-150 cursor-pointer hover:scale-125 ${activeColor === color ? 'border-black scale-125' : 'border-transparent hover:border-black/30'
                              }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                        <span className="text-[9px] text-neutral-400 font-bold ml-0.5">
                          {product.colors!.length} colours
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Outer ADD TO BAG Button */}
                  <button
                    onClick={() => addToCart(product, 'M')}
                    className="w-full bg-[#111111] text-white text-[10px] sm:text-xs font-extrabold tracking-[0.18em] uppercase py-2.5 sm:py-3 px-4 rounded-xs hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 mt-2 shadow-xs cursor-pointer active:scale-[0.98]"
                  >
                    <ShoppingBag size={14} />
                    <span>ADD TO BAG</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
