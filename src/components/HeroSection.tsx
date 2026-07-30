import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const modelWrapperRef = useRef<HTMLDivElement>(null);
  const blueModelRef = useRef<HTMLDivElement>(null);

  const targetPos = useRef({ x: -1000, y: -1000 });
  const smoothPos = useRef({ x: -1000, y: -1000 });
  const isHovered = useRef(false);

  // Drag-to-scroll refs and motion values for mobile scroll toggle
  const y = useMotionValue(0);
  const isDragging = useRef(false);

  useEffect(() => {
    let animId: number;

    const updateSpotlight = () => {
      if (isHovered.current) {
        smoothPos.current.x += (targetPos.current.x - smoothPos.current.x) * 0.15;
        smoothPos.current.y += (targetPos.current.y - smoothPos.current.y) * 0.15;
      }

      if (blueModelRef.current) {
        if (isHovered.current) {
          const radius = window.innerWidth < 768 ? 70 : 100;
          const { x, y } = smoothPos.current;

          const mask = `radial-gradient(circle ${radius}px at ${x}px ${y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0) 100%)`;

          blueModelRef.current.style.maskImage = mask;
          blueModelRef.current.style.webkitMaskImage = mask;
          blueModelRef.current.style.opacity = '1';
        } else {
          blueModelRef.current.style.opacity = '0';
        }
      }

      animId = requestAnimationFrame(updateSpotlight);
    };

    animId = requestAnimationFrame(updateSpotlight);

    return () => cancelAnimationFrame(animId);
  }, []);

  const updateCursorPosition = (clientX: number, clientY: number) => {
    if (!blueModelRef.current) return;
    const rect = blueModelRef.current.getBoundingClientRect();

    targetPos.current = {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };

    if (!isHovered.current) {
      smoothPos.current = { ...targetPos.current };
      isHovered.current = true;
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    updateCursorPosition(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    updateCursorPosition(e.clientX, e.clientY);
  };

  const handlePointerLeave = () => {
    isHovered.current = false;
  };

  // Synchronize natural scroll with the slider thumb
  useEffect(() => {
    const handleScroll = () => {
      if (isDragging.current) return;
      const scrollTop = window.scrollY;
      const maxScroll = window.innerHeight;
      const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
      y.set(progress * 136);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [y]);

  const handleDrag = () => {
    const currentY = y.get();
    const progress = currentY / 136;
    const maxScroll = window.innerHeight;
    window.scrollTo(0, progress * maxScroll);
  };

  const customEasing = [0.16, 1, 0.3, 1];

  return (
    <motion.section
      ref={heroRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: customEasing }}
      className="relative w-full min-h-[85vh] lg:min-h-[92vh] bg-[#ECECEC] flex flex-col justify-between px-4 sm:px-6 md:px-16 pt-24 sm:pt-32 pb-8 sm:pb-10 overflow-hidden select-none"
    >
      {/* Background Oversized LEOR Brand Name in Light Grey */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <h1 className="text-[25vw] font-[900] tracking-tighter text-[#111111] opacity-[0.05] leading-none select-none font-sans uppercase transform scale-105">
          LEOR
        </h1>
      </div>

      {/* Hero Content Container */}
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between z-10 relative">
        {/* Top Section: Left Header Eyebrow */}
        <div className="flex justify-between items-start pt-2">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: customEasing }}
            className="text-[10px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#111111] space-y-1"
          >
            <div>MODERN FASHION.</div>
            <div>TIMELESS STYLE.</div>
            <div className="w-20 sm:w-28 h-[1.5px] bg-[#111111] mt-1"></div>
          </motion.div>
        </div>

        {/* Center: Model Image overlapping giant light grey LEOR */}
        <motion.div
          ref={modelWrapperRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onPointerUp={handlePointerLeave}
          onPointerCancel={handlePointerLeave}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: customEasing }}
          className="absolute inset-0 flex items-center justify-center cursor-crosshair z-10 pointer-events-auto"
        >
          {/* Interactive wrapper containing both models, sized to the image */}
          <div className="relative h-full flex items-center justify-center touch-none md:touch-auto">
            {/* Base Layer: Desaturated Muted Hero Model with Subtle Grey Effect */}
            <div className="relative flex items-center justify-center h-full pointer-events-none">
              <img
                src="/assets/hero-model-desaturated.png"
                alt="LEOR Editorial Outfit"
                className="h-[52vh] sm:h-[65vh] md:h-[75vh] lg:h-[82vh] max-h-[780px] w-auto object-contain pointer-events-none drop-shadow-xl"
              />
            </div>

            {/* Interactive Spotlight Reveal Layer: Denim Blue Shade */}
            <div
              ref={blueModelRef}
              className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 transition-opacity duration-200"
              style={{
                willChange: 'mask-image, -webkit-mask-image',
              }}
            >
              <img
                src="/assets/hero-model-denim-blue.png"
                alt="LEOR Blue Denim Outfit Detail"
                className="h-[52vh] sm:h-[65vh] md:h-[75vh] lg:h-[82vh] max-h-[780px] w-auto object-contain pointer-events-none drop-shadow-xl"
              />
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar: Left CTAs & Right Collection Badge */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-0 pt-8 sm:pt-12 z-20">
          {/* Bottom Left CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: customEasing }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6"
          >
            <a
              href="#collections"
              className="bg-[#111111] text-white px-6 sm:px-7 py-3 sm:py-3.5 text-center text-xs font-semibold tracking-[0.2em] uppercase hover:bg-neutral-800 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              EXPLORE COLLECTION
            </a>

            <a
              href="#new-arrivals"
              className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-[#111111] hover:text-neutral-600 transition-colors underline underline-offset-6 sm:underline-offset-8 decoration-1 py-1"
            >
              SHOP NEW IN
            </a>
          </motion.div>

          {/* Bottom Right Stacked Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: customEasing }}
            className="hidden sm:flex flex-col text-right text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#111111] leading-snug"
          >
            <span>NEW</span>
            <span>COLLECTION</span>
            <span>2024</span>
          </motion.div>
        </div>
      </div>

      {/* Vertical Scroll Drag Toggle (Mobile Only) */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30 md:hidden flex flex-col items-center gap-2">
        <span className="text-[8px] font-extrabold tracking-[0.2em] text-neutral-500 uppercase rotate-90 origin-center my-4">
          SCROLL
        </span>
        {/* Track */}
        <div className="w-[3px] h-40 bg-black/10 rounded-full relative">
          {/* Thumb */}
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 136 }}
            dragElastic={0}
            dragMomentum={false}
            style={{ y }}
            onDragStart={() => { isDragging.current = true; }}
            onDrag={handleDrag}
            onDragEnd={() => { isDragging.current = false; }}
            className="w-6 h-6 bg-black rounded-full border-2 border-white shadow-lg absolute left-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing touch-none flex items-center justify-center"
          >
            {/* Minimalist grab indicator lines */}
            <div className="flex gap-[2px]">
              <div className="w-[1.5px] h-2 bg-white rounded-full"></div>
              <div className="w-[1.5px] h-2 bg-white rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};


