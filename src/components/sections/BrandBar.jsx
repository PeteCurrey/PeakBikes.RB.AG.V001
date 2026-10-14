import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { brands } from '../../data/brands.js'

// Double the brands for seamless infinite loop
const allBrands = [...brands, ...brands]

export default function BrandBar() {
  const [isPaused, setIsPaused] = useState(false)

  return (
    <section className="relative bg-pb-black-card border-y border-pb-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center gap-6">
        {/* Label */}
        <div className="flex-shrink-0 hidden md:block">
          <p className="font-display font-700 text-xs uppercase tracking-[0.15em] text-pb-muted whitespace-nowrap">
            Top Brands
          </p>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-6 bg-pb-border flex-shrink-0" />

        {/* Scrolling brand strip */}
        <div
          className="flex-1 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex items-center gap-10"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 28,
              ease: 'linear',
              repeat: Infinity,
              repeatType: 'loop',
            }}
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            {allBrands.map((brand, idx) => (
              <a
                key={`${brand.id}-${idx}`}
                href={brand.url}
                className="flex-shrink-0 group flex items-center justify-center"
                aria-label={brand.name}
                tabIndex={idx >= brands.length ? -1 : 0}
                aria-hidden={idx >= brands.length}
              >
                {/* Brand name as styled text (replace with actual SVG logos when available) */}
                <span
                  className="font-display font-900 text-xl uppercase tracking-tight text-pb-muted/50 group-hover:text-pb-orange transition-all duration-300 group-hover:scale-110 whitespace-nowrap"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {brand.name}
                </span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
