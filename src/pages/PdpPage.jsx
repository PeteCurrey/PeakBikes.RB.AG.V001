import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShoppingCart, Heart, Star, ShieldCheck, Truck, RotateCcw,
  Zap, Wrench, CheckCircle2, ChevronRight, Info, Clock, Ruler, ArrowRight
} from 'lucide-react'
import { products } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'
import ProductCard from '../components/ui/ProductCard.jsx'

const sizeGuideData = [
  { size: 'S', heightImperial: "5'2\" - 5'6\"", heightMetric: '157 - 168 cm', insideLeg: '27" - 30"' },
  { size: 'M', heightImperial: "5'6\" - 5'10\"", heightMetric: '168 - 178 cm', insideLeg: '30" - 32"' },
  { size: 'L', heightImperial: "5'10\" - 6'2\"", heightMetric: '178 - 188 cm', insideLeg: '32" - 34"' },
  { size: 'XL', heightImperial: "6'2\" - 6'6\"", heightMetric: '188 - 198 cm', insideLeg: '34" - 36"' },
]

export default function PdpPage() {
  const { slug } = useParams()
  const { addToCart, toggleWishlist, isWishlisted } = useCart()

  // Match product by slug or default to first product
  const product = products.find(p => p.slug === slug) || products[0]
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('M')
  const [activeTab, setActiveTab] = useState('specs')
  const [showSizeModal, setShowSizeModal] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const wish = isWishlisted(product.id)
  const hasSale = product.rrp && product.rrp > product.price
  const saveAmount = hasSale ? product.rrp - product.price : null

  // Multi-angle photo gallery
  const images = [
    product.image,
    'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1000&q=85',
    'https://images.unsplash.com/photo-1558981852-426c349336fa?w=1000&q=85',
    'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=1000&q=85'
  ]

  // Related products for "Frequently Bought Together"
  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  // Monthly 0% finance calculation
  const monthlyFinance12 = Math.ceil(product.price / 12)
  const monthlyFinance24 = Math.ceil(product.price / 24)

  return (
    <div className="pt-[var(--pb-nav-height,112px)] min-h-screen bg-pb-black">
      {/* Breadcrumb Bar */}
      <div className="bg-pb-black-card border-b border-pb-border/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center gap-2 text-xs font-body text-pb-muted overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-pb-orange transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/bikes" className="hover:text-pb-orange transition-colors">Mountain Bikes</Link>
            <ChevronRight size={12} />
            <span className="text-pb-silver">{product.category}</span>
            <ChevronRight size={12} />
            <span className="text-white font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left Column: Visual Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Main Image Frame */}
            <div className="relative aspect-[4/3] rounded-sm bg-pb-black-card border border-pb-border overflow-hidden pb-img-zoom group">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badge && (
                  <span className="pb-tag pb-tag-sale text-xs tracking-wider">
                    {product.badge}
                  </span>
                )}
                {product.inStock && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-pb-black/80 backdrop-blur-md border border-pb-success/40 text-[11px] font-display font-700 text-pb-success uppercase tracking-widest">
                    <CheckCircle2 size={12} /> In Stock
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-pb-black/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:text-pb-orange transition-colors"
                aria-label="Save to Wishlist"
              >
                <Heart size={18} className={wish ? 'fill-pb-orange text-pb-orange' : ''} />
              </button>
            </div>

            {/* Thumbnail Navigation Strip */}
            <div className="grid grid-cols-4 gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-[4/3] rounded-sm border overflow-hidden bg-pb-black-mid transition-all ${
                    selectedImage === idx
                      ? 'border-pb-orange ring-1 ring-pb-orange'
                      : 'border-pb-border hover:border-pb-orange/50 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Cytech Workshop Guarantee Box */}
            <div className="p-4 rounded-sm bg-pb-black-card border border-pb-border flex items-start gap-3.5">
              <Wrench size={22} className="text-pb-orange flex-shrink-0 mt-0.5" />
              <div className="text-xs">
                <h4 className="font-display font-800 text-sm uppercase text-white tracking-wide">
                  Free Professional Build & Multi-Point Safety Check
                </h4>
                <p className="text-pb-muted font-body mt-0.5 leading-relaxed">
                  Every complete mountain bike is unboxed, built, indexed, and test-checked by our Cytech-certified master technicians before being safely packed in our custom heavy-duty bike box.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Commercial Buying Box (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-display font-700 text-xs uppercase tracking-widest text-pb-orange">
                  {product.brand} · {product.category}
                </span>
                <span className="text-xs font-mono text-pb-muted">SKU: PK-{product.id}9027</span>
              </div>

              <h1 className="pb-title text-white tracking-tight leading-tight" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>
                {product.name}
              </h1>

              {/* Reviews & Social Proof */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="fill-amber-400" />
                  ))}
                </div>
                <span className="font-display font-700 text-xs text-white">
                  {product.rating} / 5.0
                </span>
                <span className="text-pb-muted text-xs font-body">
                  ({product.reviewsCount || 24} Verified Rider Reviews)
                </span>
              </div>
            </div>

            {/* Price & Savings */}
            <div className="p-4 rounded-sm bg-pb-black-card border border-pb-border/90 space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="font-display font-900 text-4xl text-white">
                  £{product.price.toLocaleString()}
                </span>
                {hasSale && (
                  <>
                    <span className="text-pb-muted text-lg line-through font-body">
                      £{product.rrp.toLocaleString()}
                    </span>
                    <span className="text-pb-sale text-xs font-display font-800 uppercase tracking-wider">
                      Save £{saveAmount}
                    </span>
                  </>
                )}
              </div>

              {/* 0% APR Finance Teaser */}
              <div className="pt-2 border-t border-pb-border/60 flex items-center justify-between text-xs">
                <span className="text-pb-silver font-body flex items-center gap-1.5">
                  <Zap size={14} className="text-pb-orange" />
                  Spread the cost from <strong className="text-white font-mono">£{monthlyFinance12}/mo</strong> at 0% APR
                </span>
                <Link to="/finance" className="text-pb-orange font-display font-700 uppercase tracking-wider hover:underline">
                  Options →
                </Link>
              </div>
            </div>

            {/* Stock & Delivery Countdown */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-pb-success font-display font-700 uppercase tracking-wider">
                <Clock size={15} />
                <span>{product.leadTime || 'In Stock — Order within 2h 45m for Next Day Delivery'}</span>
              </div>
              <p className="text-pb-muted font-body text-xs">
                Free UK delivery on orders over £50. Free returns within 30 days.
              </p>
            </div>

            {/* Frame Size Selector with Size Guide */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-display font-700 text-xs uppercase tracking-wider text-white">
                  Select Frame Size: <span className="text-pb-orange font-bold">{selectedSize}</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowSizeModal(true)}
                  className="inline-flex items-center gap-1 text-xs font-display font-700 uppercase text-pb-orange hover:underline"
                >
                  <Ruler size={13} />
                  Size & Rider Height Guide
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2.5">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-sm border font-display font-800 text-sm uppercase transition-all flex flex-col items-center justify-center ${
                      selectedSize === size
                        ? 'bg-pb-orange border-pb-orange text-white shadow-md'
                        : 'bg-pb-black border-pb-border text-pb-silver hover:border-pb-orange/50 hover:text-white'
                    }`}
                  >
                    <span>{size}</span>
                    <span className="text-[9px] opacity-75 font-body font-normal normal-case">
                      {size === 'S' && "5'2\"-5'6\""}
                      {size === 'M' && "5'6\"-5'10\""}
                      {size === 'L' && "5'10\"-6'2\""}
                      {size === 'XL' && "6'2\"-6'6\""}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Primary Add to Basket Button */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                {/* Quantity Spinner */}
                <div className="flex items-center border border-pb-border rounded-sm overflow-hidden bg-pb-black-card flex-shrink-0">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-11 h-12 flex items-center justify-center text-pb-silver hover:text-white hover:bg-pb-black-mid text-sm font-bold"
                  >
                    −
                  </button>
                  <span className="w-10 h-12 flex items-center justify-center font-mono font-bold text-white text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-11 h-12 flex items-center justify-center text-pb-silver hover:text-white hover:bg-pb-black-mid text-sm font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Basket */}
                <motion.button
                  onClick={handleAddToCart}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 flex items-center justify-center gap-2 h-12 rounded-sm font-display font-800 text-sm uppercase tracking-wider transition-all shadow-lg ${
                    addedToCart
                      ? 'bg-pb-success text-white'
                      : 'bg-pb-orange hover:bg-pb-orange-dark text-white shadow-pb-orange/20'
                  }`}
                >
                  <ShoppingCart size={17} />
                  {addedToCart ? 'Added to Basket!' : 'Add to Basket'}
                </motion.button>
              </div>

              {/* 3 Core Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-pb-border/70 text-center text-xs">
                <div className="p-2 rounded bg-pb-black-card border border-pb-border/60">
                  <Truck size={16} className="mx-auto text-pb-orange mb-1" />
                  <span className="block font-display font-700 uppercase text-[10px] text-white">Free UK Delivery</span>
                  <span className="text-[9px] text-pb-muted">Over £50</span>
                </div>
                <div className="p-2 rounded bg-pb-black-card border border-pb-border/60">
                  <ShieldCheck size={16} className="mx-auto text-pb-orange mb-1" />
                  <span className="block font-display font-700 uppercase text-[10px] text-white">Warranty Included</span>
                  <span className="text-[9px] text-pb-muted">Lifetime Frame</span>
                </div>
                <div className="p-2 rounded bg-pb-black-card border border-pb-border/60">
                  <RotateCcw size={16} className="mx-auto text-pb-orange mb-1" />
                  <span className="block font-display font-700 uppercase text-[10px] text-white">Free Returns</span>
                  <span className="text-[9px] text-pb-muted">30-Day Window</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Deep-Dive Technical Tabs (Overview, Full Specs, Geometry, Reviews) */}
      <div className="border-t border-pb-border bg-pb-black-card/40 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          {/* Tab Navigation */}
          <div className="flex border-b border-pb-border gap-6 overflow-x-auto hide-scrollbar mb-8">
            {[
              { id: 'specs', label: 'Technical Specifications' },
              { id: 'overview', label: 'Overview & Highlights' },
              { id: 'geometry', label: 'Geometry Chart' },
              { id: 'reviews', label: `Customer Reviews (${product.reviewsCount || 24})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3.5 font-display font-800 text-sm uppercase tracking-wider relative transition-colors whitespace-nowrap ${
                  activeTab === tab.id ? 'text-white' : 'text-pb-muted hover:text-pb-silver'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-pb-orange"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab 1: Technical Specifications Table */}
          {activeTab === 'specs' && (
            <div className="space-y-4">
              <h3 className="font-display font-800 text-lg uppercase text-white mb-4">
                Full Component Specification
              </h3>
              <div className="border border-pb-border rounded-sm overflow-hidden divide-y divide-pb-border/70">
                {product.specs ? (
                  Object.entries(product.specs).map(([key, val], i) => (
                    <div key={key} className={`grid grid-cols-1 md:grid-cols-3 p-3.5 text-xs ${i % 2 === 0 ? 'bg-pb-black/50' : 'bg-pb-black-card/50'}`}>
                      <span className="font-display font-700 uppercase text-pb-muted">{key}</span>
                      <span className="md:col-span-2 text-white font-body font-medium">{val}</span>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-pb-muted text-sm">
                    Detailed component specifications are available for complete builds.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 2: Overview & Technology */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <h3 className="font-display font-800 text-lg uppercase text-white">
                  Engineered for the Mountains
                </h3>
                <p className="text-pb-silver font-body text-sm leading-relaxed">
                  {product.description}
                </p>
                <div className="p-4 bg-pb-black border border-pb-border rounded-sm space-y-2 mt-4">
                  <h4 className="font-display font-700 text-xs uppercase tracking-wider text-pb-orange">
                    Performance Highlights
                  </h4>
                  <ul className="space-y-2">
                    {(product.highlights || [
                      'High-modulus carbon frame engineering',
                      'Progressive enduro kinematics',
                      'Boost 148 hub spacing with maximum tyre clearance'
                    ]).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-pb-silver font-body">
                        <CheckCircle2 size={14} className="text-pb-orange flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-sm overflow-hidden border border-pb-border aspect-video bg-pb-black-mid">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Tab 3: Geometry Chart */}
          {activeTab === 'geometry' && (
            <div className="space-y-4">
              <h3 className="font-display font-800 text-lg uppercase text-white mb-4">
                Frame Geometry & Dimensions (Size M)
              </h3>
              <div className="border border-pb-border rounded-sm overflow-hidden divide-y divide-pb-border/70">
                {product.geometry ? (
                  Object.entries(product.geometry).map(([key, val], i) => (
                    <div key={key} className={`grid grid-cols-2 p-3.5 text-xs ${i % 2 === 0 ? 'bg-pb-black/50' : 'bg-pb-black-card/50'}`}>
                      <span className="font-display font-700 uppercase text-pb-muted">{key}</span>
                      <span className="text-white font-mono font-bold">{val}</span>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-pb-muted text-sm">
                    Geometry charts available on complete frame models.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 4: Customer Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-pb-black border border-pb-border rounded-sm gap-6">
                <div>
                  <h3 className="font-display font-800 text-3xl text-white">
                    {product.rating} <span className="text-base text-pb-muted font-normal">/ 5.0</span>
                  </h3>
                  <div className="flex items-center text-amber-400 gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-pb-muted font-body mt-1">
                    Based on {product.reviewsCount || 24} verified rider reviews
                  </p>
                </div>
                <button className="pb-btn-primary text-xs px-5 py-2.5">
                  Write a Review
                </button>
              </div>

              {/* Verified Review Cards */}
              <div className="space-y-4">
                {[
                  {
                    author: 'Callum R. — Verified Buyer',
                    rating: 5,
                    title: 'Phenomenal bike on steep technical tracks',
                    comment: 'Took this straight to the Tweed Valley and Glentress. The Fox 38 tracks like a dream through rock gardens and the geometry inspires massive confidence.',
                    date: '3 days ago'
                  },
                  {
                    author: 'Mark W. — Verified Buyer',
                    rating: 5,
                    title: 'Tredz-level customer service and fast delivery',
                    comment: 'Arrived fully boxed with gears indexed and brakes dialed in. Literally took 10 minutes to bolt on bars and front wheel. Highly recommended.',
                    date: '1 week ago'
                  }
                ].map((rev, i) => (
                  <div key={i} className="p-4 bg-pb-black border border-pb-border rounded-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex text-amber-400">
                        {[...Array(rev.rating)].map((_, s) => (
                          <Star key={s} size={13} className="fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10px] text-pb-muted font-mono">{rev.date}</span>
                    </div>
                    <h5 className="font-display font-700 text-sm text-white uppercase">{rev.title}</h5>
                    <p className="text-pb-silver font-body text-xs leading-relaxed">{rev.comment}</p>
                    <span className="block text-[11px] text-pb-muted font-body">{rev.author}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Frequently Bought Together / Related MTB Gear Rail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-t border-pb-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display font-900 text-2xl uppercase tracking-tight text-white">
              Recommended MTB Gear & Upgrades
            </h3>
            <p className="text-pb-muted font-body text-xs mt-0.5">
              Essential protection, tyres, and trail spares matched for this build
            </p>
          </div>
          <Link to="/bikes" className="hidden sm:inline-flex items-center gap-1 text-xs font-display font-700 uppercase text-pb-orange hover:underline">
            View All Gear <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((rel) => (
            <ProductCard key={rel.id} product={rel} />
          ))}
        </div>
      </div>

      {/* Frame Size Guide Modal */}
      <AnimatePresence>
        {showSizeModal && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-pb-black/80 backdrop-blur-md"
              onClick={() => setShowSizeModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-pb-black-card border border-pb-border p-6 rounded-sm shadow-2xl z-10 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-pb-border">
                <h3 className="font-display font-800 text-lg uppercase text-white">
                  Mountain Bike Frame Size & Rider Height Guide
                </h3>
                <button
                  onClick={() => setShowSizeModal(false)}
                  className="text-pb-muted hover:text-white"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-pb-silver font-body leading-relaxed">
                If you are between sizes: choose the smaller frame for a more agile, flickable trail ride, or choose the larger size for enhanced high-speed stability and reach.
              </p>

              <div className="border border-pb-border rounded overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-pb-black border-b border-pb-border font-display font-700 uppercase text-pb-muted">
                    <tr>
                      <th className="p-2.5">Frame Size</th>
                      <th className="p-2.5">Rider Height (Imperial)</th>
                      <th className="p-2.5">Rider Height (Metric)</th>
                      <th className="p-2.5">Inside Leg</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-pb-border/60">
                    {sizeGuideData.map(row => (
                      <tr key={row.size} className={selectedSize === row.size ? 'bg-pb-orange/10 font-bold' : ''}>
                        <td className="p-2.5 text-pb-orange font-mono font-bold">{row.size}</td>
                        <td className="p-2.5 text-white">{row.heightImperial}</td>
                        <td className="p-2.5 text-pb-silver">{row.heightMetric}</td>
                        <td className="p-2.5 text-pb-silver">{row.insideLeg}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setShowSizeModal(false)}
                  className="pb-btn-primary text-xs px-4 py-2"
                >
                  Confirm Size Selection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
