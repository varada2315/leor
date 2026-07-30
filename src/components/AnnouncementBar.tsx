import React from 'react';
import { useStore } from '../context/StoreContext';

export const AnnouncementBar: React.FC = () => {
  const { cartTotal, setCartOpen } = useStore();
  const freeShippingThreshold = 1999;
  const progressPercent = Math.min(100, (cartTotal / freeShippingThreshold) * 100);
  const remaining = freeShippingThreshold - cartTotal;
  const isUnlocked = remaining <= 0;

  return (
    <div
      onClick={() => setCartOpen(true)}
      className="bg-[#0e0e10] text-white py-2.5 px-4 cursor-pointer hover:bg-black transition-colors select-none relative overflow-hidden border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        {isUnlocked ? (
          <div className="flex items-center justify-center gap-2 font-black text-[11px] sm:text-xs tracking-[0.18em] uppercase text-[#00E676]">
            <span className="text-sm">🎉</span>
            <span>YOU HAVE UNLOCKED FREE EXPRESS SHIPPING!</span>
          </div>
        ) : cartTotal > 0 ? (
          <div className="text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase text-neutral-200">
            ADD <span className="font-extrabold text-amber-400">₹{remaining.toLocaleString('en-IN')}</span> MORE TO UNLOCK <span className="font-extrabold text-white underline underline-offset-2">FREE EXPRESS SHIPPING</span>
          </div>
        ) : (
          <div className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-neutral-300 flex items-center justify-center gap-2">
            <span>⚡</span>
            <span>COMPLIMENTARY EXPRESS SHIPPING ON ALL ORDERS OVER ₹1,999</span>
          </div>
        )}

        {/* Progress Bar under text */}
        <div className="w-full max-w-xl bg-white/20 h-1.5 rounded-full mt-1.5 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              isUnlocked ? 'bg-[#00E676] shadow-[0_0_8px_#00E676]' : 'bg-white'
            }`}
            style={{ width: `${cartTotal > 0 ? progressPercent : 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
