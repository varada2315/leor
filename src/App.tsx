import React, { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryHighlights } from './components/CategoryHighlights';
import { NewSeasonBanner } from './components/NewSeasonBanner';
import { ValueProps } from './components/ValueProps';
import { BestSellers } from './components/BestSellers';
import { WhyLeor } from './components/WhyLeor';
import { WishlistPage } from './components/WishlistPage';
import { AboutPage } from './components/AboutPage';
import { CollectionsPage } from './components/CollectionsPage';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';
import { HelpModal } from './components/HelpModal';
import { Toast } from './components/Toast';

const AppContent: React.FC = () => {
  const { activeView } = useStore();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [activeView]);

  return (
    <div className="min-h-screen bg-[#F8F8F6] flex flex-col font-sans selection:bg-black selection:text-white">
      {/* Fixed Header Wrapper */}
      <header className="fixed top-0 left-0 right-0 z-50 flex flex-col">
        <Navbar />
      </header>

      <main className="flex-1">
        {activeView === 'wishlist' ? (
          <WishlistPage />
        ) : activeView === 'about' ? (
          <AboutPage />
        ) : activeView === 'collections' ? (
          <CollectionsPage />
        ) : (
          <>
            <HeroSection />
            <CategoryHighlights />
            <NewSeasonBanner />
            <BestSellers />
            <WhyLeor />
            <ValueProps />
          </>
        )}
      </main>
      <Footer />

      {/* Global Overlays & Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <QuickViewModal />
      <HelpModal />
      <Toast />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
};

export default App;
