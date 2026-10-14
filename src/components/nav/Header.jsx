import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Search, Heart, ShoppingCart, Menu, User, MapPin } from 'lucide-react'
import { navigation } from '../../data/navigation.js'
import MegaMenu from './MegaMenu.jsx'
import MobileDrawer from './MobileDrawer.jsx'

// Peak Bikes Logo SVG
function PeakLogo() {
  return (
    <a href="/" className="flex items-center gap-2 group flex-shrink-0">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="36" height="36" rx="3" fill="#050d0a"/>
        <path d="M18 5 L31 30 H5 Z" fill="#ff5c00" opacity="0.95"/>
        <path d="M18 13 L27 28 H9 Z" fill="#050d0a"/>
        <path d="M18 13 L22 20 L14 20 Z" fill="#ff5c00" opacity="0.5"/>
      </svg>
      <div className="leading-none">
        <span className="block font-display font-900 text-xl text-white uppercase tracking-tight group-hover:text-pb-orange transition-colors">
          Peak
        </span>
        <span className="block font-display font-500 text-[9px] text-pb-muted uppercase tracking-[0.18em]">
          Bikes
        </span>
      </div>
    </a>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const menuTimeout = useRef(null)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (val) => {
    setScrolled(val > 60)
  })

  // Close mega menu on escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setActiveMenu(null) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const handleMouseEnter = (id) => {
    clearTimeout(menuTimeout.current)
    setActiveMenu(id)
  }

  const handleMouseLeave = () => {
    menuTimeout.current = setTimeout(() => setActiveMenu(null), 120)
  }

  const activeItem = navigation.main.find(n => n.id === activeMenu)

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || activeMenu ? 'glass-nav-solid shadow-2xl' : 'glass-nav'
        }`}
        style={{ height: 'var(--pb-header-height)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center gap-6">

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex-shrink-0 w-10 h-10 flex items-center justify-center text-white hover:text-pb-orange transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <PeakLogo />

          {/* Main nav — desktop */}
          <nav className="hidden lg:flex items-center gap-0 flex-1 ml-4">
            {navigation.main.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
                className="relative"
              >
                <a
                  href={item.url}
                  className={`relative flex items-center h-[var(--pb-header-height)] px-4 font-display font-700 text-[0.88rem] uppercase tracking-wide transition-colors duration-150 ${
                    item.highlight
                      ? 'text-pb-orange hover:text-pb-orange-bright'
                      : activeMenu === item.id
                        ? 'text-white'
                        : 'text-pb-silver hover:text-white'
                  }`}
                >
                  {item.label}
                  {/* Active underline */}
                  <span
                    className={`absolute bottom-0 left-4 right-4 h-0.5 bg-pb-orange transition-transform duration-200 origin-left ${
                      activeMenu === item.id ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              </div>
            ))}
          </nav>

          {/* Utility nav — right */}
          <div className="hidden lg:flex items-center gap-1 ml-auto flex-shrink-0">
            {navigation.utility.slice(0, 2).map((item) => (
              <a
                key={item.label}
                href={item.url}
                className="px-3 py-2 text-pb-muted hover:text-white font-body text-xs font-500 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Icon actions */}
          <div className="flex items-center gap-1 ml-auto lg:ml-0 flex-shrink-0">
            <button className="w-10 h-10 flex items-center justify-center text-pb-silver hover:text-white transition-colors group" aria-label="Search">
              <Search size={19} className="group-hover:scale-105 transition-transform" />
            </button>
            <button className="w-10 h-10 hidden sm:flex items-center justify-center text-pb-silver hover:text-white transition-colors" aria-label="Account">
              <User size={19} />
            </button>
            <button className="w-10 h-10 hidden sm:flex items-center justify-center text-pb-silver hover:text-white transition-colors" aria-label="Wishlist">
              <Heart size={19} />
            </button>
            <button
              className="relative w-10 h-10 flex items-center justify-center text-pb-silver hover:text-white transition-colors"
              aria-label="Basket (0 items)"
            >
              <ShoppingCart size={19} />
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-pb-orange rounded-full flex items-center justify-center text-white text-[9px] font-display font-900">
                0
              </span>
            </button>
          </div>
        </div>

        {/* Mega menu — positioned relative to header */}
        <div
          onMouseEnter={() => { clearTimeout(menuTimeout.current) }}
          onMouseLeave={handleMouseLeave}
          className="relative"
        >
          <MegaMenu
            item={activeItem}
            isOpen={!!activeMenu}
            onClose={() => setActiveMenu(null)}
          />
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <MobileDrawer isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
