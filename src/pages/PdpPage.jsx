import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, ChevronLeft, Star, Shield, Truck, RotateCcw, ArrowRight, Zap } from 'lucide-react'
import { products } from '../data/products.js'

export default function PdpPage() {
  const product = products[0] // Example — in production, resolve from route param
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)

  const images = [product.image, product.image, product.image] // Placeholder — replace with real gallery

  const handleAddToCart = () => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const hasSale = product.rrp && product.rrp > product.price
  const saveAmount = hasSale ? product.rrp - product.price : null

  return (
    <div className="pt-[var(--pb-header-height)] min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center gap-2 text-xs font-body text-pb-muted">
          <a href="/" className="hover:text-pb-orange transition-colors">Home</a>
          <span>/</span>
          <a href="/bikes" className="hover:text-pb-orange transition-colors">Bikes</a>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image gallery */}
          <div>
            {/* Main image */}
            <motion.div
              className="relative overflow-hidden rounded-sm bg-pb-black-card border border-pb-border aspect-[4/3] mb-3 pb-img-zoom"
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {hasSale && (
                <div className="absolute top-4 left-4">
                  <span className="pb-tag pb-tag-sale">Save £{saveAmount}</span>
                </div>
              )}
            </motion.div>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`overflow-hidden rounded-sm border-2 aspect-[4/3] transition-all ${
                    selectedImage === i ? 'border-pb-orange' : 'border-pb-border hover:border-pb-orange/40'
                  }`}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Brand */}
              <p className="font-display font-700 text-xs uppercase tracking-widest text-pb-orange mb-3">
                {product.brand}
              </p>

              {/* Name */}
              <h1 className="font-display font-900 uppercase text-white leading-tight mb-4"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>
                {product.name}
              </h1>

              {/* Stars placeholder */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-pb-muted font-body text-xs">(24 reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-display font-900 text-4xl text-white">
                  £{product.price.toLocaleString()}
                </span>
                {hasSale && (
                  <>
                    <span className="font-body text-xl text-pb-muted line-through">
                      £{product.rrp.toLocaleString()}
                    </span>
                    <span className="pb-tag pb-tag-sale">Save £{saveAmount}</span>
                  </>
                )}
              </div>

              {/* Finance teaser */}
              <div className="bg-pb-black-card border border-pb-border rounded-sm px-4 py-3 mb-6 flex items-center gap-3">
                <Zap size={16} className="text-pb-orange flex-shrink-0" />
                <p className="font-body text-pb-silver text-sm">
                  From <strong className="text-white">£{Math.ceil(product.price / 12)}/month</strong> with 0% APR finance.{' '}
                  <a href="/finance" className="text-pb-orange hover:underline">Learn more</a>
                </p>
              </div>

              {/* Description */}
              <p className="font-body text-pb-silver text-sm leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Quantity */}
              <div className="flex items-center gap-3 mb-4">
                <label className="font-display font-700 text-xs uppercase tracking-widest text-pb-muted">Qty</label>
                <div className="flex items-center border border-pb-border rounded-sm overflow-hidden">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-pb-silver hover:text-white hover:bg-pb-black-mid transition-colors font-bold"
                  >
                    −
                  </button>
                  <span className="w-10 h-10 flex items-center justify-center font-body font-600 text-white bg-pb-black-card">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-pb-silver hover:text-white hover:bg-pb-black-mid transition-colors font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex gap-3 mb-8">
                <motion.button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 h-13 font-display font-700 text-sm uppercase tracking-wider rounded-sm transition-all ${
                    addedToCart
                      ? 'bg-pb-success text-white'
                      : 'bg-pb-orange text-white hover:bg-pb-orange-dark'
                  }`}
                  style={{ height: '52px' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingCart size={16} />
                  {addedToCart ? 'Added to Basket!' : 'Add to Basket'}
                </motion.button>
                <button
                  onClick={() => setWishlisted(w => !w)}
                  className="w-13 h-13 flex-shrink-0 border border-pb-border rounded-sm flex items-center justify-center text-pb-silver hover:border-pb-orange/40 hover:text-pb-orange transition-colors"
                  style={{ width: '52px', height: '52px' }}
                  aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart size={18} className={wishlisted ? 'fill-pb-orange text-pb-orange' : ''} />
                </button>
              </div>

              {/* Trust icons */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-pb-border">
                {[
                  { icon: Truck,     label: 'Free UK Delivery', sub: 'On orders over £50' },
                  { icon: Shield,    label: 'Secure Checkout',  sub: '256-bit encryption' },
                  { icon: RotateCcw, label: 'Free Returns',     sub: 'Within 30 days' },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex flex-col items-center text-center gap-1.5">
                    <Icon size={18} className="text-pb-orange" />
                    <span className="font-display font-700 text-xs uppercase tracking-wide text-white">{label}</span>
                    <span className="font-body text-pb-muted text-[10px]">{sub}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
