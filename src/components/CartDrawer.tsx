import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setCartOpen, cart, removeFromCart, updateQuantity, cartTotal } = useStore();
  const freeShippingThreshold = 1999;
  const progressPercent = Math.min(100, (cartTotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = freeShippingThreshold - cartTotal;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Slide-over Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-[#f5f5f7] shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 bg-white border-b border-black/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag size={20} />
                  <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-[#111111]">
                    YOUR BAG ({cart.reduce((sum, i) => sum + i.quantity, 0)})
                  </h2>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-black"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="bg-[#0e0e10] text-white px-6 py-3 text-xs">
                {remainingForFreeShipping > 0 ? (
                  <p className="tracking-wide">
                    Add <span className="font-bold text-amber-400">₹{remainingForFreeShipping.toLocaleString('en-IN')}</span> more to unlock <span className="font-bold">FREE SHIPPING</span>
                  </p>
                ) : (
                  <p className="font-bold text-emerald-400 tracking-wide">
                    🎉 CONGRATULATIONS! YOU HAVE UNLOCKED FREE EXPRESS SHIPPING!
                  </p>
                )}
                <div className="w-full bg-white/20 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-white h-full transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <ShoppingBag size={48} className="text-neutral-300 mb-4" strokeWidth={1} />
                    <p className="text-sm font-bold tracking-wider uppercase text-neutral-600">YOUR BAG IS EMPTY</p>
                    <p className="text-xs text-neutral-400 mt-1 max-w-xs">Explore our latest drop and elevate your style.</p>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="mt-6 bg-black text-white text-xs font-bold tracking-[0.2em] uppercase px-6 py-3 hover:bg-neutral-800 transition-colors"
                    >
                      START SHOPPING
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      className="flex gap-4 p-3 bg-white rounded-xs border border-black/5"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-24 object-cover bg-neutral-100 rounded-xs"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="text-xs font-bold tracking-wide text-[#111111]">{item.product.name}</h4>
                            <button
                              onClick={() => removeFromCart(item.product.id, item.size)}
                              className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <span className="text-[11px] font-semibold text-neutral-500 block mt-0.5">SIZE: {item.size}</span>
                          <span className="text-xs font-extrabold text-black block mt-1">₹{item.product.price.toLocaleString('en-IN')}</span>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center border border-neutral-300 rounded-xs bg-neutral-50">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, -1)}
                              className="p-1 hover:bg-neutral-200 transition-colors text-black"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="px-3 text-xs font-bold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, 1)}
                              className="p-1 hover:bg-neutral-200 transition-colors text-black"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="text-xs font-bold ml-auto">
                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Summary & Checkout */}
              {cart.length > 0 && (
                <div className="p-6 bg-white border-t border-black/10 space-y-4">
                  <div className="space-y-2 text-xs font-medium">
                    <div className="flex justify-between text-neutral-600">
                      <span>SUBTOTAL</span>
                      <span className="font-bold text-black">₹{cartTotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-neutral-600">
                      <span>ESTIMATED SHIPPING</span>
                      <span className="font-bold text-black">
                        {cartTotal >= freeShippingThreshold ? 'FREE' : '₹149'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-extrabold text-black pt-2 border-t border-neutral-200">
                      <span>TOTAL</span>
                      <span>
                        ₹{(cartTotal + (cartTotal >= freeShippingThreshold ? 0 : 149)).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => alert('Proceeding to Checkout...')}
                    className="w-full bg-[#0e0e10] text-white py-4 text-xs font-bold tracking-[0.25em] uppercase hover:bg-neutral-800 transition-all flex items-center justify-center gap-3 shadow-lg"
                  >
                    <span>CHECKOUT NOW</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
