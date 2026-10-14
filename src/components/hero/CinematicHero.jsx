import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ChevronDown, ArrowRight, Zap, Mountain } from 'lucide-react'

// Staggered word reveal animation
const wordVariants = {
  hidden: { opacity: 0, y: 40, skewY: 3 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.25, 1, 0.5, 1],
    },
  }),
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

export default function CinematicHero() {
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 })

  // Parallax layers at different depths (Red Bull 3D scroll pattern)
  const bgY           = useTransform(smoothProgress, [0, 1], ['0%', '25%'])     // slowest — deep bg
  const midY          = useTransform(smoothProgress, [0, 1], ['0%', '15%'])     // mid layer
  const bikeScale     = useTransform(smoothProgress, [0, 0.5], [1, 1.08])       // subtle zoom-in
  const bikeY         = useTransform(smoothProgress, [0, 1], ['0%', '-10%'])    // floats slightly
  const textY         = useTransform(smoothProgress, [0, 0.6], ['0%', '-25%'])  // fastest — text scrolls away
  const textOpacity   = useTransform(smoothProgress, [0, 0.45], [1, 0])
  const overlayOpacity= useTransform(smoothProgress, [0, 0.5], [0.55, 0.85])   // darkens on scroll
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen min-h-[600px] max-h-[1000px] overflow-hidden"
      aria-label="Hero section"
    >
      {/* ── LAYER 1: Deep background (slowest parallax) ── */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: bgY, scale: 1.15 }}
      >
        <img
          src="https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1800&q=85"
          alt=""
          role="presentation"
          className="w-full h-full object-cover"
          fetchpriority="high"
        />
      </motion.div>

      {/* ── LAYER 2: Dark overlay (gets darker on scroll) ── */}
      <motion.div
        className="absolute inset-0 bg-pb-black will-change-opacity"
        style={{ opacity: overlayOpacity }}
      />

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-pb-black via-pb-black/10 to-pb-black/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-pb-black/60 via-transparent to-transparent pointer-events-none" />

      {/* ── LAYER 3: Mid - floating particle accents ── */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: midY }}>
        {/* Orange glow orb behind where bike would be */}
        <div
          className="absolute right-[15%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(255,92,0,0.6), transparent 70%)' }}
        />
      </motion.div>

      {/* ── LAYER 4: Feature bike (mid parallax + scale) ── */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-1/2 will-change-transform"
        style={{ y: bikeY, scale: bikeScale }}
      >
        <img
          src="https://images.unsplash.com/photo-1558981852-426c349336fa?w=1000&q=85"
          alt="Peak Bikes Enduro Carbon Pro"
          className="w-full h-full object-cover object-left opacity-30"
        />
        {/* Right-side fade */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-pb-black/90 pointer-events-none" />
      </motion.div>

      {/* ── LAYER 5: Hero text (fastest — scrolls away first) ── */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-center will-change-transform"
        style={{ y: textY, opacity: textOpacity }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="flex items-center gap-1.5 bg-pb-orange/20 border border-pb-orange/30 rounded-sm px-3 py-1.5 text-pb-orange font-display font-700 text-xs uppercase tracking-widest">
              <Zap size={11} className="fill-pb-orange" />
              New Season 2027
            </span>
          </motion.div>

          {/* Main headline — staggered word reveal */}
          <motion.div
            className="overflow-hidden mb-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-wrap gap-x-4 gap-y-0">
              {['Ride', 'Further.'].map((word, i) => (
                <motion.span
                  key={word}
                  custom={i}
                  variants={wordVariants}
                  className="pb-title hero-text-shadow text-white"
                  style={{ fontSize: 'clamp(4rem, 11vw, 9rem)', display: 'block' }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-0 mt-1">
              {['Go', 'Harder.'].map((word, i) => (
                <motion.span
                  key={word}
                  custom={i + 2}
                  variants={wordVariants}
                  className="pb-title hero-text-shadow"
                  style={{
                    fontSize: 'clamp(4rem, 11vw, 9rem)',
                    display: 'block',
                    color: i === 1 ? '#ff5c00' : 'white',
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="text-pb-silver font-body text-lg max-w-md mb-8 leading-relaxed"
          >
            Premium mountain bikes, road bikes & gear.
            <br />
            Built for riders who demand more.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <a href="/bikes" className="pb-btn-primary text-base px-7 py-3.5">
              Shop Bikes
              <ArrowRight size={16} />
            </a>
            <a href="/bikes/electric" className="pb-btn-outline text-base px-7 py-3.5">
              <Zap size={15} />
              E-Bikes
            </a>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex items-center gap-8 mt-12"
          >
            {[
              { value: '500+', label: 'Bikes in stock' },
              { value: '50+', label: 'Top brands' },
              { value: '0%', label: 'Finance available' },
            ].map(({ value, label }) => (
              <div key={label} className="border-l-2 border-pb-orange pl-4 first:border-0 first:pl-0">
                <span className="block font-display font-900 text-2xl text-white leading-none">{value}</span>
                <span className="block text-pb-muted text-xs font-body mt-0.5">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        style={{ opacity: scrollIndicatorOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-pb-muted text-[10px] font-display font-700 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} className="text-pb-orange" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient bleed into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-pb-black to-transparent pointer-events-none" />
    </section>
  )
}
