import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const modelWrapperRef = useRef<HTMLDivElement>(null);
  const blueModelRef = useRef<HTMLDivElement>(null);

  const targetPos = useRef({ x: -1000, y: -1000 });
  const smoothPos = useRef({ x: -1000, y: -1000 });
  const isHovered = useRef(false);

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

  const customEasing = [0.16, 1, 0.3, 1];

  return (
    <motion.section
      ref={heroRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: customEasing }}
      className="relative w-full min-h-[85vh] lg:min-h-[92vh] bg-[#ECECEC] flex flex-col justify-between px-4 sm:px-6 md:px-16 pt-24 sm:pt-32 pb-11 sm:pb-14 overflow-hidden select-none"
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
          className="absolute inset-0 flex items-center justify-center cursor-crosshair z-10 pointer-events-auto -translate-y-5 sm:-translate-y-8 md:-translate-y-10"
        >
          {/* Interactive wrapper containing both models, sized to the image */}
          <div className="relative h-full flex items-center justify-center touch-none md:touch-auto">
            {/* Base Layer: Desaturated Muted Hero Model with Subtle Grey Effect */}
            <div className="relative flex items-center justify-center h-full pointer-events-none">
              <img
                src="/assets/hero-model-desaturated.png"
                alt="LEOR Editorial Outfit"
                className="h-[48vh] sm:h-[58vh] md:h-[68vh] lg:h-[75vh] max-h-[700px] w-auto object-contain pointer-events-none drop-shadow-xl"
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
                className="h-[48vh] sm:h-[58vh] md:h-[68vh] lg:h-[75vh] max-h-[700px] w-auto object-contain pointer-events-none drop-shadow-xl"
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
              className="bg-white text-[#111111] border border-[#111111]/15 px-6 sm:px-7 py-3 sm:py-3.5 text-center text-xs font-semibold tracking-[0.2em] uppercase hover:bg-neutral-100 hover:border-[#111111] transition-all duration-200 shadow-xs hover:shadow-md"
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
    </motion.section>
  );
};


