import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Instagram, Facebook, Youtube } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const { showToast } = useStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showToast('Thank you for subscribing to LEOR updates!');
    setEmail('');
  };

  return (
    <footer className="bg-[#0b0b0d] text-white pt-20 pb-12 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Upper Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Newsletter Box (Cols 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-white font-sans">
              STAY IN THE LOOP
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-normal max-w-sm">
              Sign up for early access to new arrivals, exclusive offers, and style updates.
            </p>

            <form onSubmit={handleSubscribe} className="flex max-w-sm mt-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#161619] border border-white/15 px-4 py-3 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-white transition-colors"
              />
              <button
                type="submit"
                className="bg-white text-black px-5 py-3 flex items-center justify-center hover:bg-neutral-200 transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>

          {/* Center Brand Identity (Cols 5-7) */}
          <div className="lg:col-span-3 flex flex-col items-start lg:items-center text-left lg:text-center space-y-4">
            <h2 className="text-4xl font-extrabold tracking-[0.2em] uppercase font-sans text-white">
              LEOR
            </h2>
            <p className="text-xs font-serif italic text-neutral-400">
              Own Your Edge.
            </p>
            <div className="flex items-center space-x-4 pt-2 text-neutral-400">
              <a href="#instagram" className="hover:text-white transition-colors p-1" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#facebook" className="hover:text-white transition-colors p-1" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#pinterest" className="hover:text-white transition-colors p-1" aria-label="Pinterest">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.42 7.63 11.16-.1-.95-.2-2.42.04-3.46.22-.94 1.4-5.95 1.4-5.95s-.36-.72-.36-1.78c0-1.67.97-2.92 2.17-2.92 1.02 0 1.52.77 1.52 1.69 0 1.03-.66 2.57-1 3.99-.28 1.19.6 2.16 1.77 2.16 2.13 0 3.77-2.25 3.77-5.49 0-2.87-2.06-4.88-5.01-4.88-3.41 0-5.42 2.56-5.42 5.2 0 1.03.4 2.13.9 2.73.1.12.11.23.08.35l-.34 1.39c-.06.22-.18.27-.42.16-1.57-.73-2.55-3.02-2.55-4.86 0-3.95 2.87-7.58 8.28-7.58 4.35 0 7.73 3.1 7.73 7.24 0 4.32-2.72 7.8-6.5 7.8-1.27 0-2.46-.66-2.87-1.44l-.78 2.97c-.28 1.09-1.05 2.46-1.56 3.29C9.75 23.82 10.86 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
                </svg>
              </a>
              <a href="#youtube" className="hover:text-white transition-colors p-1" aria-label="YouTube">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Links Columns (Cols 8-12) */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
            {/* SHOP */}
            <div className="space-y-3">
              <h4 className="font-bold tracking-[0.2em] uppercase text-white">SHOP</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#all" className="hover:text-white transition-colors">All Products</a></li>
                <li><a href="#denim" className="hover:text-white transition-colors">Denim</a></li>
                <li><a href="#tops" className="hover:text-white transition-colors">Tops</a></li>
                <li><a href="#bottoms" className="hover:text-white transition-colors">Bottoms</a></li>
                <li><a href="#new" className="hover:text-white transition-colors">New Arrivals</a></li>
              </ul>
            </div>

            {/* BRAND */}
            <div className="space-y-3">
              <h4 className="font-bold tracking-[0.2em] uppercase text-white">BRAND</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#story" className="hover:text-white transition-colors">Our Story</a></li>
                <li><a href="#craft" className="hover:text-white transition-colors">Craftsmanship</a></li>
                <li><a href="#sustainability" className="hover:text-white transition-colors">Sustainability</a></li>
                <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>

            {/* HELP */}
            <div className="space-y-3">
              <h4 className="font-bold tracking-[0.2em] uppercase text-white">HELP</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#size" className="hover:text-white transition-colors">Size Guide</a></li>
                <li><a href="#shipping" className="hover:text-white transition-colors">Shipping</a></li>
                <li><a href="#returns" className="hover:text-white transition-colors">Returns</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQs</a></li>
              </ul>
            </div>

            {/* SUPPORT */}
            <div className="space-y-3">
              <h4 className="font-bold tracking-[0.2em] uppercase text-white">SUPPORT</h4>
              <ul className="space-y-2 text-neutral-400">
                <li className="break-all"><a href="mailto:support.leor.co.in" className="hover:text-white transition-colors">support.leor.co.in</a></li>
                <li><a href="tel:+918388595003" className="hover:text-white transition-colors">+91 8388595003</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-[11px] text-neutral-500 gap-4 pt-4">
          <p>© 2024 LEOR. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms & Conditions</a>
            <a href="#disclaimer" className="hover:text-white transition-colors">Disclaimer</a>
            <a href="#refund" className="hover:text-white transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
