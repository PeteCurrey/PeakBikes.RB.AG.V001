import React, { createContext, useContext, useState, useEffect } from 'react'
import { products } from '../data/products.js'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  // Initialize cart from localStorage if available
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('pb_cart')
      if (saved) return JSON.parse(saved)
    } catch (e) {
      // ignore
    }
    // Default starter item for demonstration
    return [
      { product: products[0], quantity: 1, size: 'M' }
    ]
  })

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('pb_wishlist')
      if (saved) return JSON.parse(saved)
    } catch (e) {
      // ignore
    }
    return [products[0].id]
  })

  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState(null)

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pb_cart', JSON.stringify(cartItems))
    } catch (e) {}
  }, [cartItems])

  // Persist wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pb_wishlist', JSON.stringify(wishlist))
    } catch (e) {}
  }, [wishlist])

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  const openSearch = () => setIsSearchOpen(true)
  const closeSearch = () => setIsSearchOpen(false)

  const openQuickView = (product) => setQuickViewProduct(product)
  const closeQuickView = () => setQuickViewProduct(null)

  const addToCart = (product, quantity = 1, size = 'M') => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id && item.size === size)
      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex].quantity += quantity
        return updated
      } else {
        return [...prev, { product, quantity, size }]
      }
    })
    setIsCartOpen(true)
  }

  const removeFromCart = (productId, size) => {
    setCartItems(prev => prev.filter(item => !(item.product.id === productId && item.size === size)))
  }

  const updateQuantity = (productId, size, delta) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.product.id === productId && item.size === size) {
          const newQty = item.quantity + delta
          return newQty > 0 ? { ...item, quantity: newQty } : null
        }
        return item
      }).filter(Boolean)
    })
  }

  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId)
      } else {
        return [...prev, productId]
      }
    })
  }

  const isWishlisted = (productId) => wishlist.includes(productId)

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  const freeShippingThreshold = 50
  const freeShippingUnlocked = cartSubtotal >= freeShippingThreshold
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartSubtotal,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        isSearchOpen,
        openSearch,
        closeSearch,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        wishlist,
        toggleWishlist,
        isWishlisted,
        freeShippingUnlocked,
        amountToFreeShipping,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
