import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

export default function MegaMenu({ item, isOpen, onClose }) {
  if (!item) return null

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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[var(--pb-header-height)] bg-pb-black/60 backdrop-blur-sm z-30"
            onClick={onClose}
          />

          {/* Menu panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="mega-menu absolute left-0 right-0 top-full z-40 border-t border-pb-border"
          >
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="grid grid-cols-4 gap-8">
                {/* Category links — left 3 cols */}
                <div className="col-span-3">
                  <p className="text-pb-muted text-xs font-display font-700 uppercase tracking-widest mb-5">
                    {item.label}
                  </p>
                  <div className="grid grid-cols-3 gap-x-8 gap-y-1">
                    {item.children?.map((child) => (
                      <a
                        key={child.label}
                        href={child.url}
                        onClick={onClose}
                        className={`group flex items-center gap-3 px-3 py-2.5 rounded-sm transition-colors duration-150 ${
                          child.highlight
                            ? 'text-pb-orange hover:bg-pb-orange/10'
                            : 'text-pb-silver hover:bg-pb-black-mid hover:text-white'
                        }`}
                      >
                        {child.icon && (
                          <span className="text-base leading-none flex-shrink-0 w-5 text-center">
                            {child.icon}
                          </span>
                        )}
                        <div className="min-w-0">
                          <span className="block font-body font-600 text-sm">{child.label}</span>
                          {child.description && (
                            <span className="block text-pb-muted text-xs mt-0.5 group-hover:text-pb-muted/80">
                              {child.description}
                            </span>
                          )}
                        </div>
                        {child.highlight && (
                          <ChevronRight size={13} className="ml-auto flex-shrink-0 opacity-60" />
                        )}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Editorial image — right col */}
                <div className="col-span-1">
                  {item.image && (
                    <a href={item.url} onClick={onClose} className="group relative block overflow-hidden rounded-sm aspect-[4/3] pb-img-zoom">
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-pb-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <span className="block text-white font-display font-800 text-lg uppercase leading-tight group-hover:text-pb-orange transition-colors">
                          {item.label}
                        </span>
                        <span className="text-pb-muted text-xs font-body mt-0.5 block">
                          Shop All →
                        </span>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
