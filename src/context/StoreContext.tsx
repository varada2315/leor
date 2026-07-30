import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { PRODUCTS } from '../data/products';

export type ActiveView = 'home' | 'wishlist' | 'about' | 'collections';

interface StoreContextType {
  cart: CartItem[];
  wishlist: string[];
  activeView: ActiveView;
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isSearchOpen: boolean;
  quickViewProduct: Product | null;
  toastMessage: string | null;
  setActiveView: (view: ActiveView) => void;
  setCartOpen: (open: boolean) => void;
  setWishlistOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setQuickViewProduct: (product: Product | null) => void;
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, delta: number) => void;
  toggleWishlist: (productId: string) => void;
  clearWishlist: () => void;
  moveAllWishlistToCart: () => void;
  showToast: (msg: string) => void;
  cartTotal: number;
  cartCount: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('leor_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('leor_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeView, setActiveViewInternal] = useState<ActiveView>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#wishlist') return 'wishlist';
      if (window.location.hash === '#about') return 'about';
      if (window.location.hash === '#collections') return 'collections';
    }
    return 'home';
  });

  const [isCartOpen, setCartOpen] = useState(false);
  const [isWishlistOpen, setWishlistOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#wishlist') {
        setActiveViewInternal('wishlist');
      } else if (window.location.hash === '#about') {
        setActiveViewInternal('about');
      } else if (window.location.hash === '#collections') {
        setActiveViewInternal('collections');
      } else if (window.location.hash === '' || window.location.hash === '#home' || window.location.hash === '#') {
        setActiveViewInternal('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const setActiveView = (view: ActiveView) => {
    setActiveViewInternal(view);
    if (view === 'wishlist') {
      window.location.hash = 'wishlist';
    } else if (view === 'about') {
      window.location.hash = 'about';
    } else if (view === 'collections') {
      window.location.hash = 'collections';
    } else {
      if (window.location.hash === '#wishlist' || window.location.hash === '#about' || window.location.hash === '#collections') {
        window.history.pushState('', document.title, window.location.pathname + window.location.search);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    localStorage.setItem('leor_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('leor_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToCart = (product: Product, size: string = 'M') => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, size, quantity: 1 }];
    });
    showToast(`Added ${product.name} (${size}) to your bag`);
    setCartOpen(true);
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.size === size)));
    showToast(`Item removed from bag`);
  };

  const updateQuantity = (productId: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast(`Removed from wishlist`);
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Saved to wishlist`);
        return [...prev, productId];
      }
    });
  };

  const clearWishlist = () => {
    setWishlist([]);
    showToast(`Cleared all items from wishlist`);
  };

  const moveAllWishlistToCart = () => {
    if (wishlist.length === 0) return;
    const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));
    wishlistProducts.forEach((p) => {
      addToCart(p, p.sizes?.[0] || 'M');
    });
    showToast(`Moved ${wishlistProducts.length} items to your bag`);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        activeView,
        isCartOpen,
        isWishlistOpen,
        isSearchOpen,
        quickViewProduct,
        toastMessage,
        setActiveView,
        setCartOpen,
        setWishlistOpen,
        setSearchOpen,
        setQuickViewProduct,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        clearWishlist,
        moveAllWishlistToCart,
        showToast,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
