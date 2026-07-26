import React from 'react';
import { StoreProvider } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryHighlights } from './components/CategoryHighlights';
import { NewSeasonBanner } from './components/NewSeasonBanner';
import { ValueProps } from './components/ValueProps';
import { BestSellers } from './components/BestSellers';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';
import { Toast } from './components/Toast';

export const App: React.FC = () => {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-[#F8F8F6] flex flex-col font-sans selection:bg-black selection:text-white">
        {/* Fixed Header Wrapper */}
        <header className="fixed top-0 left-0 right-0 z-50 flex flex-col">
          <Navbar />
        </header>

        <main className="flex-1">
          <HeroSection />
          <CategoryHighlights />
          <NewSeasonBanner />
          <ValueProps />
          <BestSellers />
        </main>
        <Footer />

        {/* Global Overlays & Modals */}
        <CartDrawer />
        <WishlistDrawer />
        <SearchModal />
        <QuickViewModal />
        <Toast />
      </div>
    </StoreProvider>
  );
};

export default App;
