import React, { useState } from 'react';
import { ArrowRight, Instagram, Facebook, Youtube, Star } from 'lucide-react';
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

  const socialLinkClass =
    'text-neutral-400 hover:text-white transition-all duration-200 p-1 hover:scale-110 inline-flex items-center justify-center';

  return (
    <footer className="bg-[#0b0b0d] text-white pt-14 pb-8 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* ── Upper Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-10 border-b border-white/10">

          {/* Newsletter (Cols 1-4) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-white">
              STAY IN THE LOOP
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Sign up for early access to new arrivals, exclusive offers, and style updates.
            </p>

            <form onSubmit={handleSubscribe} className="flex max-w-sm mt-3 h-10">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-10 bg-[#161619] border border-white/15 px-4 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-white transition-colors"
              />
              <button
                type="submit"
                className="h-10 w-10 shrink-0 bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight size={15} />
              </button>
            </form>
          </div>

          {/* Brand Identity (Cols 5-7) */}
          <div className="lg:col-span-3 flex flex-col items-start lg:items-center text-left lg:text-center space-y-3">
            <h2 className="text-4xl font-extrabold tracking-[0.2em] uppercase text-white inline-flex items-start">
              LEOR<span className="text-[0.45em] align-top relative -top-[0.1em] ml-0.5 font-bold">™</span>
            </h2>
            <p className="text-xs font-serif italic text-neutral-400">Own Your Edge.</p>

            {/* Social icons — larger + hover scale */}
            <div className="flex items-center space-x-3 pt-1 text-neutral-400">
              <a href="#instagram" className={socialLinkClass} aria-label="Instagram">
                <Instagram size={21} />
              </a>
              <a href="#facebook" className={socialLinkClass} aria-label="Facebook">
                <Facebook size={21} />
              </a>
              <a href="#pinterest" className={socialLinkClass} aria-label="Pinterest">
                <svg className="w-[19px] h-[19px] fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.42 7.63 11.16-.1-.95-.2-2.42.04-3.46.22-.94 1.4-5.95 1.4-5.95s-.36-.72-.36-1.78c0-1.67.97-2.92 2.17-2.92 1.02 0 1.52.77 1.52 1.69 0 1.03-.66 2.57-1 3.99-.28 1.19.6 2.16 1.77 2.16 2.13 0 3.77-2.25 3.77-5.49 0-2.87-2.06-4.88-5.01-4.88-3.41 0-5.42 2.56-5.42 5.2 0 1.03.4 2.13.9 2.73.1.12.11.23.08.35l-.34 1.39c-.06.22-.18.27-.42.16-1.57-.73-2.55-3.02-2.55-4.86 0-3.95 2.87-7.58 8.28-7.58 4.35 0 7.73 3.1 7.73 7.24 0 4.32-2.72 7.8-6.5 7.8-1.27 0-2.46-.66-2.87-1.44l-.78 2.97c-.28 1.09-1.05 2.46-1.56 3.29C9.75 23.82 10.86 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z" />
                </svg>
              </a>
              <a href="#youtube" className={socialLinkClass} aria-label="YouTube">
                <Youtube size={21} />
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
                <li className="break-all"><a href="mailto:support@leor.co.in" className="hover:text-white transition-colors">support@leor.co.in</a></li>
                <li><a href="tel:+918388595003" className="hover:text-white transition-colors">+91 8388595003</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── Trust Row: Reviews + Payment Methods ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pb-8 border-b border-white/10">

          {/* Trustpilot-style badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} className="fill-[#00B67A] text-[#00B67A]" />
              ))}
            </div>
            <div className="text-[11px] text-neutral-400 leading-tight">
              <span className="font-semibold text-neutral-300">4.8/5</span>
              {' '}· Rated on Google Reviews
            </div>
            <div className="h-4 w-px bg-white/10 mx-1 hidden sm:block" />
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-[#00B67A]/20 flex items-center justify-center">
                <span className="text-[8px] font-black text-[#00B67A]">★</span>
              </div>
              <span className="text-[10px] font-bold tracking-wide text-neutral-400 uppercase">Trustpilot</span>
            </div>
          </div>

          {/* Payment icons — brand colors */}
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-end">
            <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-neutral-600">We Accept</span>

            {/* Visa */}
            <div className="bg-white rounded px-2 py-1 flex items-center" title="Visa">
              <svg viewBox="0 0 50 16" className="h-3.5 w-auto" aria-label="Visa">
                <text x="0" y="13" fontFamily="Arial" fontWeight="900" fontSize="15" fill="#1A1F71">VISA</text>
              </svg>
            </div>

            {/* Mastercard */}
            <div className="flex items-center bg-white rounded px-2 py-1" title="Mastercard" aria-label="Mastercard">
              <div className="relative flex items-center">
                <div className="w-5 h-5 rounded-full bg-[#EB001B]" />
                <div className="w-5 h-5 rounded-full bg-[#F79E1B] -ml-2.5 mix-blend-multiply" />
              </div>
            </div>

            {/* UPI */}
            <div className="bg-white rounded px-2 py-1" title="UPI">
              <span
                className="text-[11px] font-black tracking-wider"
                style={{ background: 'linear-gradient(90deg,#6C3AD5,#097939,#E6792B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                UPI
              </span>
            </div>

            {/* Razorpay */}
            <div className="bg-white rounded px-2 py-1 flex items-center" title="Razorpay">
              <svg viewBox="0 0 80 20" className="h-3.5 w-auto" aria-label="Razorpay">
                <text x="0" y="15" fontFamily="Arial" fontWeight="700" fontSize="13" fill="#072654">Razor</text>
                <text x="37" y="15" fontFamily="Arial" fontWeight="700" fontSize="13" fill="#3395FF">pay</text>
              </svg>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-[11px] text-neutral-500 gap-4">
          <p>© 2026 LEOR™. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms &amp; Conditions</a>
            <a href="#disclaimer" className="hover:text-white transition-colors">Disclaimer</a>
            <a href="#refund" className="hover:text-white transition-colors">Refund Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
