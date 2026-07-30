import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Heart, Menu, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Navbar: React.FC = () => {
  const { cartCount, wishlist, activeView, setActiveView, setCartOpen, setSearchOpen } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (hash?: string) => {
    setMobileMenuOpen(false);
    if (activeView !== 'home') {
      setActiveView('home');
    }
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  };

  return (
    <nav className="w-full bg-[#F8F8F6]/90 backdrop-blur-md py-3.5 sm:py-4 px-4 sm:px-6 md:px-12 border-b border-black/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center shrink-0">
          <button
            onClick={() => handleNavClick('#')}
            className="inline-block group text-left cursor-pointer focus:outline-none"
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-[0.2em] sm:tracking-[0.25em] text-[#111111] uppercase font-sans leading-none group-hover:opacity-80 transition-opacity">
              LEOR
            </h1>
            <p className="text-[9px] sm:text-[10px] font-medium text-neutral-500 tracking-[0.15em] mt-0.5">
              Own Your Edge.
            </p>
          </button>
        </div>

        {/* Right: Nav Links & Actions */}
        <div className="flex items-center space-x-3 sm:space-x-6 md:space-x-8">
          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-7 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#111111]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveView('about');
              }}
              className={`hover:opacity-60 transition-opacity cursor-pointer ${
                activeView === 'about' ? 'font-extrabold text-black' : ''
              }`}
            >
              ABOUT
            </button>
            <button
              onClick={() => handleNavClick('#bestsellers')}
              className={`hover:opacity-60 transition-opacity cursor-pointer ${
                activeView === 'home' ? '' : 'text-neutral-500'
              }`}
            >
              BEST SELLERS
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveView('collections');
              }}
              className={`hover:opacity-60 transition-opacity cursor-pointer ${
                activeView === 'collections' ? 'font-extrabold text-black' : ''
              }`}
            >
              COLLECTIONS
            </button>
          </div>

          {/* Utility Icons & Labels */}
          <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-5 text-black">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-1.5 hover:opacity-60 transition-opacity p-1.5 text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase cursor-pointer"
              title="Search"
            >
              <Search size={16} strokeWidth={1.75} />
              <span className="hidden sm:inline">SEARCH</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setActiveView('wishlist')}
              className={`flex items-center gap-1.5 hover:opacity-60 transition-opacity p-1.5 text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase cursor-pointer ${
                activeView === 'wishlist' ? 'text-black font-extrabold' : 'text-black'
              }`}
              title="Wishlist"
            >
              <Heart
                size={16}
                strokeWidth={1.75}
                className={wishlist.length > 0 ? 'fill-black text-black' : ''}
              />
              <span>WISHLIST ({wishlist.length})</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="flex items-center gap-1.5 hover:opacity-60 transition-opacity relative p-1.5 text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase cursor-pointer"
              title="Bag"
            >
              <ShoppingBag size={16} strokeWidth={1.75} />
              <span>CART ({cartCount})</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-black hover:opacity-70 transition-opacity focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#F8F8F6]/95 backdrop-blur-md border-b border-black/10 mt-3 overflow-hidden rounded-xs"
          >
            <div className="px-5 py-5 flex flex-col space-y-3 text-xs font-semibold tracking-[0.2em] uppercase text-black">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveView('about');
                }}
                className={`py-2.5 border-b border-black/5 hover:opacity-60 flex items-center justify-between text-left cursor-pointer ${
                  activeView === 'about' ? 'font-extrabold text-black' : ''
                }`}
              >
                <span>ABOUT</span>
              </button>
              <button
                onClick={() => handleNavClick('#bestsellers')}
                className="py-2.5 border-b border-black/5 hover:opacity-60 flex items-center justify-between text-left cursor-pointer"
              >
                <span>BEST SELLERS</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveView('collections');
                }}
                className={`py-2.5 border-b border-black/5 hover:opacity-60 flex items-center justify-between text-left cursor-pointer ${
                  activeView === 'collections' ? 'font-extrabold text-black' : ''
                }`}
              >
                <span>COLLECTIONS</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveView('wishlist');
                }}
                className="py-2.5 border-b border-black/5 hover:opacity-60 flex items-center justify-between text-left cursor-pointer font-bold text-black"
              >
                <span className="flex items-center gap-2">
                  <Heart size={14} className={wishlist.length > 0 ? 'fill-black' : ''} />
                  WISHLIST ({wishlist.length})
                </span>
                {wishlist.length > 0 && (
                  <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full font-bold">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Quick Search & Wishlist Shortcuts in Mobile Drawer */}
              <div className="pt-3 border-t border-black/10 flex gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setSearchOpen(true);
                  }}
                  className="flex-1 bg-black text-white py-3 px-4 text-center font-bold tracking-widest text-[11px] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search size={14} />
                  <span>SEARCH STORE</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
