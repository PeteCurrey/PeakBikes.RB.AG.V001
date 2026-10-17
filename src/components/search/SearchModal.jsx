import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Search, ArrowRight, Tag, Sparkles } from 'lucide-react'
import { useCart } from '../../context/CartContext.jsx'
import { products } from '../../data/products.js'

const popularSearches = [
  'Enduro Carbon', 'Fox 38 Factory', 'Full Suspension', 'Electric MTB',
  'Shimano XT 4-Piston', 'SRAM Transmission', 'Full Face Helmet', 'Five Ten Freerider'
]

const categoryShortcuts = [
  { label: 'Full Suspension', url: '/bikes/full-suspension' },
  { label: 'Hardtail MTBs', url: '/bikes/hardtail' },
  { label: 'Electric MTBs (e-MTB)', url: '/bikes/electric' },
  { label: 'Downhill & Gravity', url: '/bikes/downhill' },
  { label: 'Suspension Forks & Shocks', url: '/components/forks' },
  { label: 'Helmets & Body Armour', url: '/helmets' },
]

export default function SearchModal() {
  const { isSearchOpen, closeSearch } = useCart()
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 80)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setQuery('')
    }
    return () => { document.body.style.overflow = '' }
  }, [isSearchOpen])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeSearch() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeSearch])

  // Filter products matching query
  const filteredProducts = query.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : []

  if (!isSearchOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] flex flex-col bg-pb-black-deep/95 backdrop-blur-xl"
      >
        {/* Top Search Input Bar */}
        <div className="flex items-center gap-4 px-6 lg:px-16 py-6 border-b border-pb-border/80 bg-pb-black">
          <Search size={24} className="text-pb-orange flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search bikes, apparel, components, brands..."
            className="flex-1 bg-transparent text-white text-xl lg:text-2xl font-body font-medium placeholder:text-pb-muted/50 outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1.5 text-pb-muted hover:text-white transition-colors text-xs font-mono"
            >
              CLEAR
            </button>
          )}
          <button
            onClick={closeSearch}
            className="w-10 h-10 rounded-sm bg-pb-black-mid border border-pb-border flex items-center justify-center text-pb-silver hover:text-white hover:border-pb-orange/40 transition-colors"
            aria-label="Close search"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Results / Suggestions Area */}
        <div className="flex-1 overflow-y-auto px-6 lg:px-16 py-8">
          <div className="max-w-4xl mx-auto space-y-10">

            {/* Live Filter Results */}
            {query.trim() && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white/60 text-xs font-display font-700 uppercase tracking-widest flex items-center gap-2">
                    <Sparkles size={14} className="text-pb-orange" />
                    Products matching "{query}" ({filteredProducts.length})
                  </h3>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="p-8 text-center bg-pb-black-card border border-pb-border rounded-sm">
                    <p className="font-display font-700 text-lg uppercase text-white mb-1">No products found</p>
                    <p className="text-pb-muted text-sm font-body">Try checking for spelling or searching a broader category.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProducts.map((p) => (
                      <Link
                        key={p.id}
                        to={`/products/${p.slug}`}
                        onClick={closeSearch}
                        className="group flex gap-4 p-3 bg-pb-black-card border border-pb-border rounded-sm hover:border-pb-orange/50 transition-all"
                      >
                        <div className="w-16 h-16 bg-pb-black rounded overflow-hidden flex-shrink-0">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <span className="text-[10px] font-display font-700 uppercase text-pb-orange tracking-widest">{p.brand}</span>
                          <h4 className="font-body text-sm font-semibold text-white group-hover:text-pb-orange transition-colors truncate">{p.name}</h4>
                          <span className="font-display font-800 text-sm text-white mt-1">£{p.price.toLocaleString()}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Popular Searches */}
            <div>
              <h3 className="text-pb-muted text-xs font-display font-700 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Tag size={13} className="text-pb-orange" />
                Trending Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-4 py-2 border border-pb-border text-pb-silver hover:text-white hover:border-pb-orange/50 text-xs font-display font-700 uppercase tracking-wide rounded-sm transition-all bg-pb-black-card hover:bg-pb-orange/10"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Categories */}
            <div>
              <h3 className="text-pb-muted text-xs font-display font-700 uppercase tracking-widest mb-4">
                Explore Categories
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {categoryShortcuts.map((cat) => (
                  <Link
                    key={cat.label}
                    to={cat.url}
                    onClick={closeSearch}
                    className="flex items-center justify-between p-3.5 bg-pb-black-card border border-pb-border rounded-sm hover:border-pb-orange/40 group transition-all"
                  >
                    <span className="font-display font-700 text-sm uppercase text-white group-hover:text-pb-orange transition-colors">
                      {cat.label}
                    </span>
                    <ArrowRight size={14} className="text-pb-muted group-hover:text-pb-orange group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
