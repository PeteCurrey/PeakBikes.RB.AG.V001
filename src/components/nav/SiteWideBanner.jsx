import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight } from 'lucide-react'

export default function SiteWideBanner() {
  const [visible, setVisible] = useState(() => {
    try {
      return !sessionStorage.getItem('pb-banner-dismissed')
    } catch (e) {
      return true
    }
  })

  // Sync CSS custom property for dynamic header height offsets
  useEffect(() => {
    if (visible) {
      document.documentElement.style.setProperty('--pb-nav-height', '112px')
    } else {
      document.documentElement.style.setProperty('--pb-nav-height', '72px')
    }
  }, [visible])

  const dismiss = () => {
    setVisible(false)
    try {
      sessionStorage.setItem('pb-banner-dismissed', '1')
    } catch (e) {}
    document.documentElement.style.setProperty('--pb-nav-height', '72px')
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
          className="relative z-50 overflow-hidden bg-pb-orange border-b border-pb-orange-dark/30"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-center text-center relative pr-10 sm:pr-6">
            <p className="text-white text-xs sm:text-sm font-display font-700 uppercase tracking-wider flex items-center flex-wrap justify-center gap-1.5 sm:gap-2">
              <span className="font-900 tracking-widest bg-black/15 px-2 py-0.5 rounded text-[11px] sm:text-xs">
                NEW SEASON 2027
              </span>
              <span className="hidden md:inline font-body normal-case font-500 opacity-95">
                Free UK delivery on orders over £50 · 0% APR Finance available
              </span>
              <span className="inline md:hidden font-body normal-case font-500 opacity-95 text-xs">
                Free UK Delivery over £50 · 0% Finance
              </span>
              <a
                href="/bikes"
                className="inline-flex items-center gap-1 text-white underline underline-offset-2 font-display font-800 text-[11px] sm:text-xs tracking-widest uppercase hover:opacity-85 transition-opacity ml-1"
              >
                Shop Now <ArrowRight size={12} />
              </a>
            </p>

            <button
              onClick={dismiss}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-1 text-white/80 hover:text-white hover:bg-black/10 rounded transition-colors"
              aria-label="Dismiss banner"
            >
              <X size={15} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
