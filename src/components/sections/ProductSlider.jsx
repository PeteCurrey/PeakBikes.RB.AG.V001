import React, { useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from '../ui/ProductCard.jsx'

export default function ProductSlider({ title, products, viewAllUrl = '/bikes' }) {
  const railRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, scrollLeft: 0 })

  // Mouse drag scroll (Red Bull draggable rail pattern)
  const onMouseDown = useCallback((e) => {
    setIsDragging(true)
    dragStart.current = { x: e.clientX, scrollLeft: railRef.current.scrollLeft }
    railRef.current.style.cursor = 'grabbing'
  }, [])

  const onMouseMove = useCallback((e) => {
    if (!isDragging) return
    const dx = e.clientX - dragStart.current.x
    railRef.current.scrollLeft = dragStart.current.scrollLeft - dx
  }, [isDragging])

  const stopDrag = useCallback(() => {
    setIsDragging(false)
    if (railRef.current) railRef.current.style.cursor = 'grab'
  }, [])

  const scrollBy = (dir) => {
    const w = railRef.current?.offsetWidth || 300
    railRef.current?.scrollBy({ left: dir * (w * 0.75), behavior: 'smooth' })
  }

  return (
    <section className="pb-section">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="flex items-end justify-between mb-7"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="pb-accent-line">
            <h2 className="pb-section-title text-white">{title}</h2>
          </div>
          <div className="flex items-center gap-2">
            {/* Scroll arrows */}
            <button
              onClick={() => scrollBy(-1)}
              className="w-9 h-9 rounded-sm bg-pb-black-card border border-pb-border flex items-center justify-center text-pb-silver hover:text-white hover:border-pb-orange/40 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scrollBy(1)}
              className="w-9 h-9 rounded-sm bg-pb-black-card border border-pb-border flex items-center justify-center text-pb-silver hover:text-white hover:border-pb-orange/40 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={16} />
            </button>
            <Link
              to={viewAllUrl}
              className="hidden sm:flex items-center gap-1.5 ml-2 text-pb-orange font-display font-700 text-sm uppercase tracking-wide hover:gap-2.5 transition-all"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>

        {/* Draggable rail */}
        <div
          ref={railRef}
          className="flex gap-4 overflow-x-auto hide-scrollbar draggable-rail pb-2"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          style={{ cursor: 'grab' }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[260px] sm:w-[280px]"
              style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Mobile "View All" */}
        <div className="mt-5 sm:hidden text-center">
          <Link to={viewAllUrl} className="pb-btn-outline text-sm">
            View All {title} <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
