import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Eye, ShoppingBag, SlidersHorizontal, Grid2X2, Grid3X3, ArrowUpRight, Sparkles, ShieldCheck, Check } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';

/* Curated Lookbook Edits with verified high-res image paths */
const LOOKBOOKS = [
  {
    id: 'urban-noir',
    title: 'URBAN NOIR',
    subtitle: 'Tactical Outerwear & Heavyweight Staples',
    category: 'Outerwear',
    image: '/assets/hero-model-black.png',
    tag: 'EDIT 01',
  },
  {
    id: 'raw-denim',
    title: 'RAW & REFINED DENIM',
    subtitle: 'Selvedge Jackets & Utility Bottoms',
    category: 'Denim',
    image: '/about_fabric.png',
    tag: 'EDIT 02',
  },
  {
    id: 'monochrome-essentials',
    title: 'MONOCHROME ESSENTIALS',
    subtitle: '280 GSM Cotton Tees & Heavy Fleece Sweats',
    category: 'Tops',
    image: '/assets/product-2.png',
    tag: 'EDIT 03',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

export const CollectionsPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, setQuickViewProduct, selectedCategory, setSelectedCategory } = useStore();
  const [sortBy, setSortBy] = useState<'FEATURED' | 'LOW_HIGH' | 'HIGH_LOW' | 'NAME'>('FEATURED');
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  const categories = ['ALL', 'DENIM', 'TOPS', 'BOTTOMS', 'OUTERWEAR'];

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (selectedCategory === 'ALL') return true;
      return p.category.toUpperCase() === selectedCategory;
    });

    if (sortBy === 'LOW_HIGH') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'HIGH_LOW') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'NAME') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [selectedCategory, sortBy]);

  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  return (
    <div className="min-h-screen bg-[#F8F8F6] pt-[72px] pb-28 font-sans text-[#111111] overflow-x-hidden">
      
      {/* ══ 1. EDITORIAL HERO HEADER ══ */}
      <section className="relative bg-[#0b0b0d] text-white py-20 md:py-24 px-6 md:px-12 overflow-hidden border-b border-white/10">
        {/* Background Texture & Ambient Glow */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          }}
        />

        <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[10px] font-extrabold tracking-[0.4em] uppercase text-neutral-400">
              <Sparkles size={12} />
              Season Archive 2026
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase leading-[0.95]">
              The Collections<span className="text-neutral-500">.</span>
            </h1>
            <p className="text-sm text-neutral-400 leading-relaxed font-normal max-w-xl">
              Explore curated edits of timeless streetwear, heavy denim, and minimalist tailoring. Engineered for longevity and styled for presence.
            </p>
          </div>

          {/* Stats & Guarantee Badges */}
          <div className="flex flex-wrap items-center gap-4 text-xs shrink-0">
            <div className="bg-[#16161a] border border-white/10 px-5 py-3 rounded-xs flex items-center gap-3">
              <span className="text-lg font-extrabold text-white">{PRODUCTS.length}</span>
              <span className="text-neutral-400 uppercase tracking-widest text-[10px] font-bold">Total Edits</span>
            </div>
            <div className="bg-[#16161a] border border-white/10 px-5 py-3 rounded-xs flex items-center gap-2.5">
              <ShieldCheck size={16} className="text-emerald-400" />
              <span className="text-neutral-300 uppercase tracking-widest text-[10px] font-bold">100% Authenticity</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2. CURATED LOOKBOOK SPOTLIGHTS ══ */}
      <section className="bg-white py-16 px-6 md:px-12 border-b border-black/5">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-black tracking-[0.3em] uppercase text-neutral-400">
              Curated Edits & Lookbooks
            </h2>
            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest">
              Click to Filter
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LOOKBOOKS.map((lb, idx) => (
              <motion.div
                key={lb.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setSelectedCategory(lb.category.toUpperCase())}
                className="group relative h-60 rounded-xs overflow-hidden cursor-pointer border border-black/10 bg-[#0b0b0d] text-white shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <img
                  src={lb.image}
                  alt={lb.title}
                  className="absolute inset-0 w-full h-full object-cover object-top opacity-70 group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black tracking-[0.25em] uppercase bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-xs border border-white/20">
                      {lb.tag}
                    </span>
                    {selectedCategory === lb.category.toUpperCase() && (
                      <span className="bg-white text-black p-1 rounded-full text-xs flex items-center justify-center font-bold">
                        <Check size={12} strokeWidth={3} />
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base font-extrabold tracking-wider uppercase flex items-center justify-between">
                      {lb.title}
                      <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-white" />
                    </h3>
                    <p className="text-xs text-neutral-300 font-medium leading-normal">
                      {lb.subtitle}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. CATALOG TOOLBAR (Filter & Sorting) ══ */}
      <section className="sticky top-[68px] z-30 bg-[#F8F8F6]/95 backdrop-blur-md border-b border-black/10 py-5 px-6 md:px-12 mb-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 text-xs overflow-x-auto no-scrollbar max-w-full pb-1 flex-nowrap sm:flex-wrap">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              const count = cat === 'ALL' ? PRODUCTS.length : PRODUCTS.filter(p => p.category.toUpperCase() === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 text-[11px] font-extrabold tracking-[0.18em] uppercase transition-all duration-200 cursor-pointer rounded-xs flex items-center gap-2.5 ${
                    isActive
                      ? 'bg-black text-white shadow-md'
                      : 'bg-white border border-black/10 text-neutral-600 hover:text-black hover:border-black/30'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-black ${isActive ? 'bg-white/20 text-white' : 'bg-black/5 text-neutral-500'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Actions: Sort & Grid View Toggle */}
          <div className="flex items-center gap-4">
            {/* Sort Selector */}
            <div className="flex items-center gap-2.5 bg-white border border-black/10 px-4 py-2.5 rounded-xs shadow-2xs">
              <SlidersHorizontal size={14} className="text-neutral-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-[11px] font-extrabold tracking-wider text-[#111111] focus:outline-none cursor-pointer uppercase"
              >
                <option value="FEATURED">Sort: Featured</option>
                <option value="LOW_HIGH">Price: Low to High</option>
                <option value="HIGH_LOW">Price: High to Low</option>
                <option value="NAME">Name: A to Z</option>
              </select>
            </div>

            {/* Desktop Grid Layout Switcher */}
            <div className="hidden lg:flex items-center border border-black/10 rounded-xs bg-white p-1 gap-1 shadow-2xs">
              <button
                onClick={() => setGridCols(3)}
                className={`p-2 rounded-xs transition-colors ${gridCols === 3 ? 'bg-black text-white' : 'text-neutral-400 hover:text-black'}`}
                title="3 Columns"
              >
                <Grid2X2 size={16} />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-2 rounded-xs transition-colors ${gridCols === 4 ? 'bg-black text-white' : 'text-neutral-400 hover:text-black'}`}
                title="4 Columns"
              >
                <Grid3X3 size={16} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ══ 4. PRODUCT CATALOG GRID ══ */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-white border border-black/5 rounded-xs space-y-4">
            <p className="text-sm font-black uppercase tracking-widest text-neutral-400">No products found</p>
            <p className="text-xs text-neutral-500">Try selecting another category or clear filters.</p>
            <button
              onClick={() => setSelectedCategory('ALL')}
              className="mt-2 inline-block bg-black text-white px-6 py-2.5 text-xs font-black uppercase tracking-widest hover:bg-neutral-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            className={`grid grid-cols-2 ${
              gridCols === 4 ? 'md:grid-cols-3 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3'
            } gap-4 md:gap-6`}
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => {
                const isWishlisted = wishlist.includes(product.id);
                const selectedSize = selectedSizes[product.id] || (product.sizes?.[0] || 'M');

                return (
                  <motion.div
                    key={product.id}
                    layout
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.95 }}
                    custom={idx}
                    className="group bg-white border border-black/8 rounded-xs overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:border-black/30 transition-all duration-300"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[3/4] bg-[#f0f0f2] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />

                      {/* Tag Badge */}
                      {product.tag && (
                        <span className="absolute top-3 left-3 bg-black text-white text-[9px] font-black tracking-[0.2em] uppercase px-3 py-1 z-10 shadow-sm">
                          {product.tag}
                        </span>
                      )}

                      {/* Wishlist Button */}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-black hover:scale-110 transition-transform shadow-md z-10 cursor-pointer"
                        title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                      >
                        <Heart
                          size={13}
                          className={isWishlisted ? 'fill-black text-black' : 'text-black'}
                        />
                      </button>

                      {/* Quick View Eye Button in Photo Corner */}
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm text-black flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-md z-10 cursor-pointer"
                        title="Quick View"
                      >
                        <Eye size={13} />
                      </button>
                    </div>

                    {/* Product Details */}
                    <div className="p-4 md:p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] text-neutral-400 font-extrabold uppercase tracking-widest">
                            <span>{product.category}</span>
                            <span>{product.id}</span>
                          </div>
                          <h3 className="text-sm font-bold text-[#111111] tracking-tight group-hover:text-neutral-600 transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                        </div>

                        {/* Size Selector */}
                        {product.sizes && product.sizes.length > 0 && (
                          <div className="space-y-1.5 pt-1">
                            <span className="text-[9px] font-extrabold text-neutral-400 uppercase tracking-widest">Size</span>
                            <div className="flex flex-wrap gap-1.5">
                              {product.sizes.map((sz) => (
                                <button
                                  key={sz}
                                  onClick={() => handleSizeSelect(product.id, sz)}
                                  className={`text-[10px] font-black px-2.5 py-1 border transition-colors cursor-pointer rounded-2xs ${
                                    selectedSize === sz
                                      ? 'bg-black text-white border-black'
                                      : 'bg-white text-neutral-600 border-black/10 hover:border-black'
                                  }`}
                                >
                                  {sz}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Price */}
                        <div className="pt-2 border-t border-black/5 flex items-baseline gap-2">
                          <span className="text-lg font-extrabold text-[#111111]">
                            ₹{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-neutral-400 line-through">
                              ₹{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Outer ADD TO BAG Button */}
                      <button
                        onClick={() => addToCart(product, selectedSize)}
                        className="w-full bg-[#111111] text-white py-2.5 sm:py-3 px-4 hover:bg-neutral-800 transition-colors cursor-pointer rounded-xs flex items-center justify-center gap-2 text-[10px] sm:text-xs font-extrabold tracking-[0.18em] uppercase shadow-xs mt-2 active:scale-[0.98]"
                        title="Add to Bag"
                      >
                        <ShoppingBag size={14} />
                        <span>ADD TO BAG</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* ══ 5. EDITORIAL SPOTLIGHT CAMPAIGN BANNER ══ */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-24">
        <div className="relative bg-[#0b0b0d] text-white rounded-xs overflow-hidden py-16 px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10 shadow-2xl">
          <div className="space-y-3 max-w-lg text-center md:text-left">
            <span className="text-[9px] font-black tracking-[0.3em] uppercase text-neutral-400">
              LEOR Studio Line
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Looking for custom bespoke tailoring?
            </h2>
            <p className="text-xs md:text-sm text-neutral-400 leading-relaxed font-normal">
              Our tailoring studio accepts custom bespoke sizing for Outerwear and Raw Denim jackets upon request.
            </p>
          </div>
          <button
            onClick={() => {
              window.location.href = 'mailto:support@leor.co.in';
            }}
            className="bg-white text-black px-8 py-3.5 text-xs font-black tracking-[0.2em] uppercase hover:bg-neutral-200 transition-colors shrink-0 cursor-pointer shadow-md"
          >
            Inquire Bespoke
          </button>
        </div>
      </section>

    </div>
  );
};
