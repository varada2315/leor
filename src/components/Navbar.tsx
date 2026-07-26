import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Navbar: React.FC = () => {
  const { cartCount, setCartOpen, setSearchOpen } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-[#F8F8F6]/90 backdrop-blur-md py-4 px-6 md:px-12 border-b border-black/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-black hover:opacity-70 transition-opacity"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Desktop Left Navigation Links */}
        <div className="hidden lg:flex items-center space-x-7 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#111111]">
          <a href="#men" className="hover:opacity-60 transition-opacity">
            MEN
          </a>
          <a href="#new-arrivals" className="hover:opacity-60 transition-opacity">
            NEW ARRIVALS
          </a>
          <a href="#collections" className="hover:opacity-60 transition-opacity">
            COLLECTIONS
          </a>
          <a href="#about" className="hover:opacity-60 transition-opacity">
            ABOUT
          </a>
        </div>

        {/* Center Logo */}
        <div className="text-center flex flex-col items-center">
          <a href="#" className="inline-block group">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-[0.25em] text-[#111111] uppercase font-sans leading-none">
              LEOR
            </h1>
            <p className="text-[10px] font-medium text-neutral-500 tracking-[0.15em] mt-0.5">
              Own Your Edge.
            </p>
          </a>
        </div>

        {/* Right Utility Icons & Labels */}
        <div className="flex items-center space-x-4 md:space-x-5 text-black">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-1.5 hover:opacity-60 transition-opacity p-1 text-[11px] font-semibold tracking-[0.18em] uppercase"
            title="Search"
          >
            <Search size={16} strokeWidth={1.75} />
            <span className="hidden sm:inline">SEARCH</span>
          </button>

          <button
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-1.5 hover:opacity-60 transition-opacity relative p-1 text-[11px] font-semibold tracking-[0.18em] uppercase"
            title="Bag"
          >
            <ShoppingBag size={16} strokeWidth={1.75} />
            <span>CART ({cartCount})</span>
          </button>
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
            className="lg:hidden bg-[#F8F8F6]/95 backdrop-blur-md border-b border-black/10 mt-4 overflow-hidden rounded-xs"
          >
            <div className="px-6 py-6 flex flex-col space-y-4 text-xs font-semibold tracking-[0.2em] uppercase text-black">
              <a
                href="#new-arrivals"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-black/5 hover:opacity-60"
              >
                NEW ARRIVALS
              </a>
              <a
                href="#denim"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-black/5 hover:opacity-60"
              >
                DENIM
              </a>
              <a
                href="#essentials"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-black/5 hover:opacity-60"
              >
                ESSENTIALS
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:opacity-60"
              >
                ABOUT
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
