import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Leaf, Zap, Shield, ArrowRight, Users, Globe, Package, Award } from 'lucide-react';
import { useStore } from '../context/StoreContext';

/* ── animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

/* ── animated counter hook ── */
function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { count, ref };
}

/* ── stat item ── */
interface StatProps { icon: React.ElementType; value: number; suffix: string; label: string; }
const StatItem: React.FC<StatProps> = ({ icon: Icon, value, suffix, label }) => {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="flex flex-col items-center text-center gap-2">
      <div className="w-10 h-10 rounded-full bg-black/6 flex items-center justify-center mb-1">
        <Icon size={17} strokeWidth={1.5} />
      </div>
      <p className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#111]">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-neutral-500">{label}</p>
    </div>
  );
};

/* ── values data ── */
const values = [
  { icon: Zap,    title: 'Bold by Design',  desc: 'Every stitch is intentional — clothes that lead, not follow.' },
  { icon: Leaf,   title: 'Conscious Craft', desc: 'High-quality fabrics sourced responsibly, built to last.' },
  { icon: Shield, title: 'Fair Pricing',    desc: 'Premium fashion shouldn\'t be a privilege. We keep it accessible.' },
];

/* ══════════════════════════════════════════════════ */
export const AboutPage: React.FC = () => {
  const { setActiveView } = useStore();

  /* parallax on story image */
  const storyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: storyRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <div className="bg-[#F8F8F6] overflow-x-hidden">

      {/* ══ 1. HERO — split layout ══ */}
      <section className="min-h-screen flex flex-col lg:flex-row pt-[72px]">

        {/* Left: text */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-12 lg:px-16 py-16 lg:py-0 bg-[#F8F8F6] order-2 lg:order-1">
          <div className="max-w-lg">
            <motion.p
              variants={fadeUp} initial="hidden" animate="visible" custom={0}
              className="text-[10px] font-black tracking-[0.45em] uppercase text-neutral-400 mb-5"
            >
              About LEOR
            </motion.p>

            <motion.h1
              variants={fadeUp} initial="hidden" animate="visible" custom={1}
              className="text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[0.95] text-[#111] mb-6"
            >
              Premium
              <br />
              <span className="text-neutral-400">Fashion.</span>
              <br />
              Fair Price.
            </motion.h1>

            <motion.p
              variants={fadeUp} initial="hidden" animate="visible" custom={2}
              className="text-sm text-neutral-500 leading-[1.75] mb-8"
            >
              LEOR™ is a premium fashion and lifestyle brand committed to delivering
              superior quality at prices that are fair and accessible. Every piece is
              thoughtfully designed using high-quality materials, modern fits, and attention
              to detail — ensuring comfort, durability, and timeless style.
            </motion.p>

            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={3}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => setActiveView('home')}
                className="inline-flex items-center gap-3 bg-black text-white px-7 py-3 text-[11px] font-black tracking-[0.2em] uppercase hover:bg-neutral-800 transition-colors group cursor-pointer"
              >
                Shop Collection
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase text-neutral-400">
                <span className="w-6 h-px bg-neutral-300" />
                Our Goal Is Simple
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right: hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:w-[50%] xl:w-[45%] relative overflow-hidden order-1 lg:order-2"
          style={{ minHeight: '420px' }}
        >
          <img
            src="/about_hero.png"
            alt="LEOR fashion model"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          {/* subtle gradient overlay on left edge */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F8F8F6] to-transparent lg:block hidden" />
        </motion.div>
      </section>

      {/* ══ 2. STATS STRIP ══ */}
      <section className="bg-white border-y border-black/6 py-12">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            <StatItem icon={Users}   value={120} suffix="K+" label="Community Members" />
            <StatItem icon={Package} value={2800} suffix="+"  label="Pieces Crafted" />
            <StatItem icon={Globe}   value={38}   suffix=""   label="Countries Reached" />
            <StatItem icon={Award}   value={100}  suffix="%"  label="Quality Guaranteed" />
          </div>
        </div>
      </section>

      {/* ══ 3. OUR STORY — text + parallax image ══ */}
      <section ref={storyRef} className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* Parallax image */}
          <div className="relative overflow-hidden rounded-sm order-1" style={{ height: '420px' }}>
            <motion.img
              src="/about_fabric.png"
              alt="LEOR craftsmanship detail"
              style={{ y: imgY }}
              className="absolute inset-0 w-full h-[115%] object-cover"
            />
            {/* floating badge */}
            <div className="absolute bottom-5 left-5 bg-black/90 backdrop-blur-sm text-white px-4 py-2.5 space-y-0.5">
              <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-neutral-400">LEOR Promise</p>
              <p className="text-sm font-bold">Every stitch. Every time.</p>
            </div>
          </div>

          {/* Text */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="space-y-5 order-2"
          >
            <div className="text-7xl font-black text-black/5 leading-none select-none -mb-3">&ldquo;</div>

            <p className="text-[10px] font-black tracking-[0.4em] uppercase text-neutral-400">Our Story</p>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#111] leading-snug">
              Our Story
            </h2>
            <p className="text-sm text-neutral-600 leading-[1.8]">
              LEOR was created with a simple mission — to make premium fashion accessible to
              everyone. We believe great style shouldn't come with an expensive price tag. By
              combining high-quality fabrics, modern craftsmanship, and honest pricing, we
              create timeless essentials that deliver exceptional value without compromising
              on quality. At LEOR™, we're here to help everyone own their edge with confidence.
            </p>

            {/* inline tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {['Premium Quality', 'Fair Pricing', 'Modern Fits', 'Built to Last'].map(tag => (
                <span key={tag} className="text-[10px] font-semibold tracking-[0.12em] uppercase border border-black/12 px-3 py-1.5 text-neutral-500">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ 4. VALUES — hover cards ══ */}
      <section className="bg-white border-t border-black/6 py-14 md:py-18 px-6 md:px-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2"
          >
            <div>
              <p className="text-[10px] font-black tracking-[0.4em] uppercase text-neutral-400 mb-1.5">What We Stand For</p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#111]">Our Values</h2>
            </div>
            <p className="text-xs text-neutral-400 max-w-[220px]">The principles that guide every decision we make at LEOR.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={{ once: true }} custom={i * 0.6}
                className="group relative border border-black/8 p-6 cursor-default hover:border-black hover:-translate-y-1 hover:shadow-xl transition-all duration-300 bg-[#F8F8F6]"
              >
                {/* hover fill bg */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 space-y-3">
                  <div className="w-10 h-10 rounded-full border border-black/10 group-hover:border-white/20 flex items-center justify-center transition-colors">
                    <v.icon size={17} strokeWidth={1.5} className="text-[#111] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-sm font-bold tracking-tight text-[#111] group-hover:text-white transition-colors">{v.title}</h3>
                  <p className="text-xs text-neutral-500 group-hover:text-neutral-300 leading-relaxed transition-colors">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. FULL-BLEED BANNER with dark image ══ */}
      <section className="relative min-h-[480px] flex items-center overflow-hidden">
        {/* background image */}
        <img
          src="/about_banner.png"
          alt="LEOR brand"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/72" />

        {/* content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-20 w-full">
          <div className="max-w-xl space-y-6">
            <motion.p
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-[10px] font-black tracking-[0.45em] uppercase text-neutral-400"
            >
              Our Promise
            </motion.p>
            <motion.h2
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
              className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white"
            >
              Premium fashion.
              <br />
              Fair price.
              <br />
              <span className="text-neutral-400">No compromise.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
              className="text-sm text-neutral-400 leading-relaxed"
            >
              New drops every season. Never the same look twice.
              Style that speaks before you do.
            </motion.p>
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3}
            >
              <button
                onClick={() => setActiveView('home')}
                className="inline-flex items-center gap-3 bg-white text-black px-9 py-4 text-[11px] font-black tracking-[0.22em] uppercase hover:bg-neutral-200 transition-colors group cursor-pointer"
              >
                Shop the Collection
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};
