import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, CreditCard } from 'lucide-react'
import { useCart } from '../../context/CartContext.jsx'

export default function CartDrawer() {
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    freeShippingUnlocked,
    amountToFreeShipping,
  } = useCart()

  const freeShippingThreshold = 50
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100))

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-pb-black/80 backdrop-blur-md z-[100]"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            key="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-pb-black-card border-l border-pb-border z-[101] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-pb-border">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-pb-orange" />
                <h2 className="font-display font-900 text-lg uppercase tracking-tight text-white">
                  Your Basket ({cartCount})
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="w-8 h-8 rounded bg-pb-black-mid border border-pb-border flex items-center justify-center text-pb-silver hover:text-white hover:border-pb-orange/40 transition-colors"
                aria-label="Close basket"
              >
                <X size={18} />
              </button>
            </div>

            {/* Free Shipping Meter */}
            <div className="px-6 py-3.5 bg-pb-black border-b border-pb-border">
              <div className="flex items-center justify-between text-xs font-display font-700 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5 text-white">
                  <Truck size={14} className="text-pb-orange" />
                  {freeShippingUnlocked ? (
                    <span className="text-pb-success">Free UK Delivery Unlocked!</span>
                  ) : (
                    <span>Add £{amountToFreeShipping} more for Free Delivery</span>
                  )}
                </span>
                <span className="text-pb-muted">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-pb-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-pb-orange to-pb-orange-bright"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Item list */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-pb-black-mid border border-pb-border flex items-center justify-center mb-4 text-pb-muted">
                    <ShoppingBag size={28} />
                  </div>
                  <h3 className="font-display font-800 text-xl uppercase text-white mb-2">
                    Your Basket is Empty
                  </h3>
                  <p className="text-pb-muted text-sm font-body max-w-xs mb-6">
                    Explore our range of performance bikes, apparel, and components.
                  </p>
                  <button
                    onClick={closeCart}
                    className="pb-btn-primary text-sm px-6 py-2.5"
                  >
                    Browse Bikes <ArrowRight size={14} />
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    className="flex gap-4 p-3 bg-pb-black/50 border border-pb-border/60 rounded-sm hover:border-pb-border transition-colors"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 bg-pb-black-mid rounded overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-[10px] font-display font-700 uppercase tracking-widest text-pb-muted">
                            {item.product.brand}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.size)}
                            className="text-pb-muted hover:text-pb-sale transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <h4 className="font-body font-semibold text-sm text-white truncate">
                          {item.product.name}
                        </h4>
                        <span className="inline-block px-1.5 py-0.5 rounded bg-pb-black-mid text-[10px] font-mono text-pb-silver mt-1">
                          Size: {item.size}
                        </span>
                      </div>

                      {/* Controls and Price */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-pb-border/40">
                        {/* Quantity */}
                        <div className="flex items-center border border-pb-border rounded overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, -1)}
                            className="w-6 h-6 flex items-center justify-center text-pb-silver hover:text-white hover:bg-pb-black-mid transition-colors text-xs"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="w-7 h-6 flex items-center justify-center text-xs font-mono font-bold text-white bg-pb-black">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, 1)}
                            className="w-6 h-6 flex items-center justify-center text-pb-silver hover:text-white hover:bg-pb-black-mid transition-colors text-xs"
                            aria-label="Increase quantity"
                          >
                            <Plus size={11} />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-display font-800 text-sm text-white">
                          £{(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-pb-black border-t border-pb-border space-y-4">
                {/* 0% APR finance banner */}
                <div className="p-2.5 rounded bg-pb-orange/10 border border-pb-orange/20 flex items-center gap-2 text-xs">
                  <CreditCard size={15} className="text-pb-orange flex-shrink-0" />
                  <span className="text-pb-silver">
                    Or split from <strong className="text-white">£{Math.ceil(cartSubtotal / 12)}/mo</strong> at 0% APR
                  </span>
                </div>

                {/* Subtotal & Delivery */}
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-pb-silver">
                    <span>Subtotal</span>
                    <span className="font-mono text-white">£{cartSubtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-pb-silver">
                    <span>UK Delivery</span>
                    <span className="font-mono text-white">
                      {freeShippingUnlocked ? (
                        <span className="text-pb-success">FREE</span>
                      ) : (
                        '£4.99'
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-white font-display font-800 text-lg pt-2 border-t border-pb-border">
                    <span>Total</span>
                    <span className="text-pb-orange font-mono">
                      £{(cartSubtotal + (freeShippingUnlocked ? 0 : 4.99)).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={() => alert('Proceeding to checkout with secure 256-bit encryption!')}
                  className="w-full pb-btn-primary justify-center text-sm py-3.5 shadow-lg shadow-pb-orange/20"
                >
                  <ShieldCheck size={16} />
                  Checkout Securely
                </button>

                <div className="text-center">
                  <button
                    onClick={closeCart}
                    className="text-xs text-pb-muted hover:text-white transition-colors uppercase font-display font-700 tracking-wider"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
