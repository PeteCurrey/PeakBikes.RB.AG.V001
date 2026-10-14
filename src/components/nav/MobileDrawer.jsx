import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown, ChevronRight, Truck, CreditCard, PhoneCall, RotateCcw } from 'lucide-react'
import { navigation } from '../../data/navigation.js'

export default function MobileDrawer({ isOpen, onClose }) {
  const [expandedId, setExpandedId] = useState(null)

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-pb-black/70 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 w-[85vw] max-w-sm bg-pb-black-card border-r border-pb-border z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-pb-border flex-shrink-0">
              <span className="font-display font-900 text-xl text-white uppercase tracking-tight">
                Peak <span className="text-pb-orange">Bikes</span>
              </span>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-sm bg-pb-black-mid border border-pb-border flex items-center justify-center text-pb-silver hover:text-white hover:border-pb-orange/40 transition-colors"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Nav items */}
            <div className="flex-1 overflow-y-auto">
              <nav className="py-3">
                {navigation.main.map((item) => (
                  <div key={item.id} className="border-b border-pb-border/50">
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className={`w-full flex items-center justify-between px-5 py-4 font-display font-700 text-base uppercase tracking-wide transition-colors ${
                        item.highlight ? 'text-pb-orange' : 'text-white hover:text-pb-orange'
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${expandedId === item.id ? 'rotate-180' : ''} ${item.highlight ? 'text-pb-orange' : 'text-pb-muted'}`}
                      />
                    </button>

                    <AnimatePresence>
                      {expandedId === item.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
                          className="overflow-hidden bg-pb-black/40"
                        >
                          <div className="py-2 px-4">
                            {item.children?.map((child) => (
                              <a
                                key={child.label}
                                href={child.url}
                                onClick={onClose}
                                className={`flex items-center gap-3 px-3 py-3 rounded-sm text-sm font-body font-500 transition-colors ${
                                  child.highlight
                                    ? 'text-pb-orange hover:bg-pb-orange/10'
                                    : 'text-pb-silver hover:text-white hover:bg-pb-black-mid'
                                }`}
                              >
                                {child.icon && (
                                  <span className="text-base w-5 flex-shrink-0 text-center">{child.icon}</span>
                                )}
                                {child.label}
                                {child.highlight && <ChevronRight size={12} className="ml-auto" />}
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Utility links */}
                <div className="px-5 py-3 mt-2">
                  <p className="text-pb-muted text-xs font-display font-700 uppercase tracking-widest mb-3">Help & Services</p>
                  {navigation.utility.map((item) => (
                    <a
                      key={item.label}
                      href={item.url}
                      onClick={onClose}
                      className="block py-2.5 text-pb-silver font-body text-sm hover:text-pb-orange transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </nav>
            </div>

            {/* USP strip at bottom */}
            <div className="flex-shrink-0 border-t border-pb-border bg-pb-black px-5 py-4 grid grid-cols-2 gap-3">
              {[
                { icon: Truck, text: 'Free UK Delivery' },
                { icon: CreditCard, text: '0% Finance' },
                { icon: RotateCcw, text: 'Free Returns' },
                { icon: PhoneCall, text: 'Expert Advice' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-pb-muted text-xs font-body">
                  <Icon size={13} className="text-pb-orange flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
