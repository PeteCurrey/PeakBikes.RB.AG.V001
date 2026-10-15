import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingCart, Star, Heart, ArrowRight, ShieldCheck, Zap } from 'lucide-react'
import { useCart } from '../../context/CartContext.jsx'

const sizes = ['S', 'M', 'L', 'XL']

export default function QuickViewModal() {
  const { quickViewProduct, closeQuickView, addToCart, isWishlisted, toggleWishlist } = useCart()
  const [selectedSize, setSelectedSize] = useState('M')
  const [qty, setQty] = useState(1)

  if (!quickViewProduct) return null

  const p = quickViewProduct
  const hasSale = p.rrp && p.rrp > p.price
  const saveAmount = hasSale ? p.rrp - p.price : null
  const wish = isWishlisted(p.id)

  const handleAdd = () => {
    addToCart(p, qty, selectedSize)
    closeQuickView()
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-pb-black/80 backdrop-blur-md"
          onClick={closeQuickView}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
          className="relative w-full max-w-3xl bg-pb-black-card border border-pb-border rounded-sm overflow-hidden z-10 shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded bg-pb-black-mid/80 backdrop-blur-sm border border-pb-border flex items-center justify-center text-pb-silver hover:text-white hover:border-pb-orange/40 transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Image */}
            <div className="relative aspect-[4/3] md:aspect-auto bg-pb-black-mid overflow-hidden">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover"
              />
              {p.badge && (
                <div className="absolute top-4 left-4">
                  <span className="pb-tag">{p.badge}</span>
                </div>
              )}
            </div>

            {/* Right Details */}
            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div>
                <p className="text-xs font-display font-700 uppercase tracking-widest text-pb-orange mb-1">
                  {p.brand} • {p.category}
                </p>
                <h3 className="font-display font-900 text-2xl uppercase text-white leading-tight mb-2">
                  {p.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-pb-muted text-xs font-mono">(4.9/5)</span>
                </div>

                {/* Pricing */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-display font-900 text-3xl text-white">
                    £{p.price.toLocaleString()}
                  </span>
                  {hasSale && (
                    <>
                      <span className="text-pb-muted text-sm line-through">
                        £{p.rrp.toLocaleString()}
                      </span>
                      <span className="text-pb-sale text-xs font-display font-700 uppercase">
                        Save £{saveAmount}
                      </span>
                    </>
                  )}
                </div>

                <p className="text-pb-silver text-xs leading-relaxed line-clamp-3 mb-6">
                  {p.description}
                </p>

                {/* Size Selector */}
                <div className="mb-6">
                  <label className="block text-xs font-display font-700 uppercase tracking-wider text-pb-muted mb-2">
                    Select Frame Size: <span className="text-white">{selectedSize}</span>
                  </label>
                  <div className="flex gap-2">
                    {sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`w-10 h-10 rounded-sm font-display font-700 text-xs uppercase border transition-all ${
                          selectedSize === s
                            ? 'bg-pb-orange border-pb-orange text-white'
                            : 'bg-pb-black border-pb-border text-pb-silver hover:border-pb-orange/40 hover:text-white'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div>
                <div className="flex gap-3 mb-3">
                  <button
                    onClick={handleAdd}
                    className="flex-1 pb-btn-primary justify-center text-sm py-3"
                  >
                    <ShoppingCart size={16} />
                    Add to Basket
                  </button>
                  <button
                    onClick={() => toggleWishlist(p.id)}
                    className="w-12 h-12 rounded-sm border border-pb-border flex items-center justify-center text-pb-silver hover:border-pb-orange/40 hover:text-pb-orange transition-colors"
                    aria-label="Wishlist"
                  >
                    <Heart size={18} className={wish ? 'fill-pb-orange text-pb-orange' : ''} />
                  </button>
                </div>

                <a
                  href={`/products/${p.slug}`}
                  onClick={closeQuickView}
                  className="flex items-center justify-center gap-1.5 text-xs font-display font-700 uppercase text-pb-muted hover:text-pb-orange transition-colors pt-2"
                >
                  View Full Product Specifications <ArrowRight size={12} />
                </a>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
