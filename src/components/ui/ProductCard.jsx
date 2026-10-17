import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Eye } from 'lucide-react'
import Badge from './Badge.jsx'
import { useCart } from '../../context/CartContext.jsx'

export default function ProductCard({ product, className = '' }) {
  const { addToCart, openQuickView, toggleWishlist, isWishlisted } = useCart()
  const [addedAnim, setAddedAnim] = useState(false)

  const hasSale = product.rrp && product.rrp > product.price
  const saveAmount = hasSale ? product.rrp - product.price : null
  const wish = isWishlisted(product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product, 1)
    setAddedAnim(true)
    setTimeout(() => setAddedAnim(false), 1200)
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    toggleWishlist(product.id)
  }

  const handleQuickView = (e) => {
    e.preventDefault()
    openQuickView(product)
  }

  const badgeVariant =
    product.badge === 'Sale' ? 'sale' :
    product.badge === 'New' ? 'new' :
    product.badge === 'Limited' ? 'limited' :
    product.badge === 'Hot' ? 'hot' : null

  return (
    <motion.div
      className={`group relative flex flex-col bg-pb-black-card border border-pb-border rounded-sm overflow-hidden pb-card-hover scroll-snap-item ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
    >
      {/* Image */}
      <Link to={`/products/${product.slug}`} className="relative block overflow-hidden aspect-[4/3] pb-img-zoom bg-pb-black-mid">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-pb-black/40 to-transparent pointer-events-none" />

        {/* Badge */}
        {badgeVariant && (
          <div className="absolute top-3 left-3">
            <Badge variant={badgeVariant}>{product.badge}</Badge>
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-pb-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-pb-orange/20 hover:border-pb-orange/40"
          aria-label={wish ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={14}
            className={wish ? 'fill-pb-orange text-pb-orange' : 'text-white'}
          />
        </button>

        {/* Quick view on hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] px-3 pb-3">
          <button
            onClick={handleQuickView}
            className="flex items-center justify-center gap-2 w-full py-2 bg-pb-black/80 backdrop-blur-sm border border-white/10 text-white text-xs font-display font-700 tracking-widest uppercase rounded-sm hover:bg-pb-orange/20 hover:border-pb-orange/30 transition-colors duration-150"
          >
            <Eye size={13} />
            Quick View
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4">
        <p className="text-pb-muted text-xs font-display font-semibold tracking-widest uppercase mb-1">
          {product.brand}
        </p>
        <Link
          to={`/products/${product.slug}`}
          className="font-body font-semibold text-white text-[0.9rem] leading-snug mb-3 hover:text-pb-orange transition-colors line-clamp-2"
        >
          {product.name}
        </Link>

        <div className="mt-auto flex items-center justify-between gap-2">
          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="font-display font-800 text-lg text-white">
              £{product.price.toLocaleString()}
            </span>
            {hasSale && (
              <span className="price-was text-sm">
                £{product.rrp.toLocaleString()}
              </span>
            )}
          </div>

          {/* Add to cart */}
          <motion.button
            onClick={handleAddToCart}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-sm text-xs font-display font-700 uppercase tracking-wide transition-all duration-200 ${
              addedAnim
                ? 'bg-pb-success text-white'
                : 'bg-pb-orange text-white hover:bg-pb-orange-dark'
            }`}
            whileTap={{ scale: 0.95 }}
            aria-label="Add to basket"
          >
            <ShoppingCart size={13} />
            {addedAnim ? 'Added!' : 'Add'}
          </motion.button>
        </div>

        {/* Save indicator */}
        {hasSale && (
          <p className="text-pb-sale text-xs font-display font-700 uppercase tracking-wide mt-2">
            Save £{saveAmount}
          </p>
        )}
      </div>
    </motion.div>
  )
}
