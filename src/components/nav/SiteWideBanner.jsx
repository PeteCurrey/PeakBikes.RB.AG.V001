import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function SiteWideBanner() {
  const [visible, setVisible] = useState(true)

  // Remember dismiss in session
  useEffect(() => {
    if (sessionStorage.getItem('pb-banner-dismissed')) {
      setVisible(false)
    }
  }, [])

  const dismiss = () => {
    setVisible(false)
    sessionStorage.setItem('pb-banner-dismissed', '1')
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ background: '#ff5c00' }}
          className="relative z-50 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-4 text-center">
            <p className="text-white text-sm font-display font-700 uppercase tracking-widest">
              <span className="font-900 mr-2">NEW SEASON 2027 BIKES</span>
              <span className="opacity-90 mr-3 font-500 normal-case tracking-normal font-body">
                Free UK delivery on orders over £50 · 0% Finance available
              </span>
              <a
                href="/bikes"
                className="inline-block text-white underline underline-offset-2 font-display font-700 text-xs tracking-widest uppercase hover:opacity-80 transition-opacity"
              >
                Shop Now →
              </a>
            </p>
            <button
              onClick={dismiss}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors"
              aria-label="Dismiss banner"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
