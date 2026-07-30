import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Trash2, Search, SlidersHorizontal, Eye, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, clearWishlist, moveAllWishlistToCart, setActiveView, setQuickViewProduct } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high'>('default');
  const [selectedSizes, setSelectedSizes] = useState<{ [productId: string]: string }>({});

  const savedProducts = PRODUCTS.filter((product) => wishlist.includes(product.id));

  // Extract available categories from saved items or all items
  const categories = ['ALL', ...Array.from(new Set(savedProducts.map((p) => p.category.toUpperCase())))];

  // Filter & Sort
  let filteredProducts = savedProducts.filter((product) => {
    const matchesCategory = selectedCategory === 'ALL' || product.category.toUpperCase() === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  // Recommendations (items not in wishlist)
  const recommendedProducts = PRODUCTS.filter((p) => !wishlist.includes(p.id)).slice(0, 4);

  const handleSizeChange = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (product: Product) => {
    const size = selectedSizes[product.id] || product.sizes?.[0] || 'M';
    addToCart(product, size);
  };

  return (
    <div className="pt-28 pb-24 bg-[#F8F8F6] min-h-screen font-sans text-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Header Section - Modern High-Fashion Minimalist Style */}
        <div className="pt-4 pb-8 border-b border-black/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="text-[10px] font-bold tracking-[0.25em] text-neutral-400 uppercase mb-2">
                SAVED ITEMS &bull; {savedProducts.length} {savedProducts.length === 1 ? 'ITEM' : 'ITEMS'}
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-[0.18em] uppercase text-[#111111]">
                WISHLIST
              </h1>
            </div>

            {/* Quick Bulk Action Buttons */}
            {savedProducts.length > 0 && (
              <div className="flex items-center gap-3">
                <button
                  onClick={moveAllWishlistToCart}
                  className="bg-black text-white px-5 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-neutral-800 transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <ShoppingBag size={13} />
                  <span>MOVE ALL TO BAG</span>
                </button>
                <button
                  onClick={clearWishlist}
                  className="bg-transparent border border-black/20 text-neutral-600 px-4 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase hover:border-black hover:text-black transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 size={13} />
                  <span>CLEAR ALL</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Wishlist Items Present */}
        {savedProducts.length > 0 ? (
          <div className="mt-8 space-y-10">
            {/* Filter & Search Toolbar */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-3 border-b border-black/10">
              {/* Category Filter Tabs */}
              <div className="flex items-center gap-6 overflow-x-auto no-scrollbar text-[11px] font-bold tracking-[0.2em] uppercase">
                {categories.map((cat) => {
                  const count = cat === 'ALL'
                    ? savedProducts.length
                    : savedProducts.filter((p) => p.category.toUpperCase() === cat).length;
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`py-2 transition-all cursor-pointer whitespace-nowrap relative ${
                        isActive ? 'text-black font-extrabold' : 'text-neutral-400 hover:text-black'
                      }`}
                    >
                      <span>{cat} ({count})</span>
                      {isActive && (
                        <motion.div
                          layoutId="categoryIndicator"
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Search & Sort Controls */}
              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                {/* Search Bar */}
                <div className="relative flex-1 md:w-56">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="SEARCH SAVED..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-transparent border-b border-black/20 text-[11px] font-semibold tracking-wider placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors uppercase"
                  />
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={13} className="text-neutral-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent text-[10px] font-bold tracking-[0.15em] uppercase border-none focus:outline-none cursor-pointer py-1.5 pr-2"
                  >
                    <option value="default">SORT: DEFAULT</option>
                    <option value="price-low">PRICE: LOW TO HIGH</option>
                    <option value="price-high">PRICE: HIGH TO LOW</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Product Cards Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-16 text-center text-neutral-400 border border-dashed border-black/10 rounded-xs">
                <p className="text-xs font-bold tracking-widest uppercase text-neutral-600">NO SAVED ITEMS MATCH YOUR FILTER</p>
                <button
                  onClick={() => { setSelectedCategory('ALL'); setSearchQuery(''); }}
                  className="mt-3 text-[10px] font-extrabold tracking-[0.2em] uppercase text-black hover:opacity-60 underline underline-offset-4 cursor-pointer"
                >
                  RESET FILTERS
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                <AnimatePresence>
                  {filteredProducts.map((product) => {
                    const currentSize = selectedSizes[product.id] || product.sizes?.[0] || 'M';
                    return (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="group flex flex-col"
                      >
                        {/* Product Image Container */}
                        <div className="relative w-full aspect-[3/4] bg-neutral-200 overflow-hidden rounded-xs">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover grayscale contrast-105 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 cursor-pointer"
                            onClick={() => setQuickViewProduct(product)}
                          />

                          {/* Minimalist Heart Remove Button Top-Right */}
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-black hover:bg-black hover:text-white transition-all shadow-sm z-10 cursor-pointer"
                            title="Remove from Wishlist"
                          >
                            <Heart size={15} className="fill-black text-black group-hover:fill-white group-hover:text-white transition-colors" />
                          </button>

                          {/* Tag Badge Top-Left */}
                          {product.tag && (
                            <span className="absolute top-3 left-3 bg-black/90 text-white text-[9px] font-extrabold tracking-[0.2em] uppercase px-2 py-0.5 z-10">
                              {product.tag}
                            </span>
                          )}

                          {/* Quick View Floating Button Bottom Right */}
                          <button
                            onClick={() => setQuickViewProduct(product)}
                            className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm hover:bg-black hover:text-white cursor-pointer z-10"
                            title="Quick View"
                          >
                            <Eye size={15} />
                          </button>
                        </div>

                        {/* Meta & Size Picker */}
                        <div className="mt-4 flex-1 flex flex-col justify-between space-y-3">
                          <div>
                            <span className="text-[9px] font-bold tracking-[0.2em] text-neutral-400 uppercase block mb-1">
                              {product.category}
                            </span>
                            <h3
                              onClick={() => setQuickViewProduct(product)}
                              className="text-xs font-extrabold tracking-wide text-[#111111] hover:text-neutral-500 transition-colors cursor-pointer uppercase line-clamp-1"
                            >
                              {product.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs font-black text-black">
                                ₹{product.price.toLocaleString('en-IN')}
                              </span>
                              {product.originalPrice && (
                                <span className="text-[11px] text-neutral-400 line-through font-medium">
                                  ₹{product.originalPrice.toLocaleString('en-IN')}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Size Selection & Move to Bag Button */}
                          <div className="pt-2 border-t border-black/5 space-y-2">
                            <div className="flex items-center justify-between text-[9px] font-bold tracking-widest text-neutral-400 uppercase">
                              <span>SIZE</span>
                              <div className="flex gap-1">
                                {(product.sizes || ['S', 'M', 'L', 'XL']).map((sz) => (
                                  <button
                                    key={sz}
                                    onClick={() => handleSizeChange(product.id, sz)}
                                    className={`w-5 h-5 text-[9px] font-bold flex items-center justify-center transition-colors cursor-pointer ${
                                      currentSize === sz
                                        ? 'bg-black text-white'
                                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                                    }`}
                                  >
                                    {sz}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <button
                              onClick={() => handleAddToCart(product)}
                              className="w-full bg-black text-white text-[10px] font-extrabold tracking-[0.2em] uppercase py-2.5 flex items-center justify-center gap-1.5 hover:bg-neutral-800 transition-colors shadow-xs cursor-pointer"
                            >
                              <ShoppingBag size={13} />
                              <span>ADD TO BAG ({currentSize})</span>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>
        ) : (
          /* Empty Wishlist State - Sleek Luxury Fashion Minimalism */
          <div className="py-24 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center mb-6">
              <Heart size={28} className="text-neutral-300 stroke-[1.25]" />
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold tracking-[0.2em] uppercase text-black">
              YOUR WISHLIST IS EMPTY
            </h2>
            <p className="text-xs text-neutral-500 mt-2 max-w-sm font-medium leading-relaxed">
              Explore our latest arrivals and save your favorite garments for later consideration.
            </p>
            <button
              onClick={() => setActiveView('home')}
              className="mt-8 bg-black text-white px-8 py-3 text-[10px] font-extrabold tracking-[0.25em] uppercase hover:bg-neutral-800 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>EXPLORE COLLECTIONS</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* Curated Recommendations Section */}
        {recommendedProducts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-black/10">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-[9px] font-extrabold tracking-[0.25em] text-neutral-400 uppercase block mb-1">
                  RECOMMENDED FOR YOU
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-[0.18em] uppercase text-black">
                  YOU MIGHT ALSO LIKE
                </h2>
              </div>
              <button
                onClick={() => setActiveView('home')}
                className="text-[10px] font-bold tracking-[0.2em] uppercase text-black hover:opacity-60 transition-opacity underline underline-offset-4 cursor-pointer"
              >
                VIEW ALL PRODUCTS
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {recommendedProducts.map((product) => (
                <div key={product.id} className="group flex flex-col">
                  <div className="relative w-full aspect-[3/4] bg-neutral-200 overflow-hidden rounded-xs">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover grayscale contrast-105 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 cursor-pointer"
                      onClick={() => setQuickViewProduct(product)}
                    />
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-black hover:bg-black hover:text-white transition-all shadow-sm cursor-pointer z-10"
                      title="Save to Wishlist"
                    >
                      <Heart size={15} />
                    </button>
                  </div>
                  <div className="mt-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h4
                        onClick={() => setQuickViewProduct(product)}
                        className="text-xs font-extrabold tracking-wide text-black hover:text-neutral-500 transition-colors uppercase cursor-pointer line-clamp-1"
                      >
                        {product.name}
                      </h4>
                      <span className="text-xs font-black text-black block mt-1">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="mt-3 w-full border border-black/20 text-black py-2 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-black hover:text-white hover:border-black transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Heart size={12} />
                      <span>ADD TO WISHLIST</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
