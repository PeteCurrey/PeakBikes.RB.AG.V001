import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { SlidersHorizontal, ChevronDown, Grid2X2, List, ArrowRight } from 'lucide-react'
import { products } from '../data/products.js'
import ProductCard from '../components/ui/ProductCard.jsx'

const categories = ['All', 'Mountain Bikes', 'Road Bikes', 'Gravel Bikes', 'Electric Bikes', 'Kids Bikes']
const sortOptions = ['Recommended', 'Price: Low to High', 'Price: High to Low', 'Newest First', 'Best Selling']

export default function PlpPage({ title = 'All Bikes' }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortBy, setSortBy] = useState('Recommended')
  const [gridView, setGridView] = useState('grid')

  const filtered = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory)

  return (
    <div className="pt-[var(--pb-nav-height,112px)] min-h-screen">
      {/* Page header */}
      <div className="bg-pb-black-card border-b border-pb-border">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-body text-pb-muted mb-4">
            <a href="/" className="hover:text-pb-orange transition-colors">Home</a>
            <span>/</span>
            <span className="text-white">{title}</span>
          </nav>
          <h1 className="pb-title text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            {title}
          </h1>
          <p className="text-pb-muted font-body text-sm mt-2">{filtered.length} products</p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-pb-black-card border-b border-pb-border sticky top-[var(--pb-nav-height,112px)] z-20">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-4 overflow-x-auto hide-scrollbar">
          {/* Category pills */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-sm font-display font-700 text-xs uppercase tracking-wide transition-all ${
                  activeCategory === cat
                    ? 'bg-pb-orange text-white'
                    : 'bg-pb-black border border-pb-border text-pb-silver hover:border-pb-orange/40 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-3 flex-shrink-0">
            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-pb-black border border-pb-border text-pb-silver font-body text-sm px-3 py-1.5 pr-8 rounded-sm cursor-pointer hover:border-pb-orange/40 focus:outline-none focus:border-pb-orange/60"
              >
                {sortOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-pb-muted pointer-events-none" />
            </div>

            {/* Grid/List toggle */}
            <div className="flex items-center border border-pb-border rounded-sm overflow-hidden">
              <button
                onClick={() => setGridView('grid')}
                className={`w-8 h-8 flex items-center justify-center transition-colors ${gridView === 'grid' ? 'bg-pb-orange text-white' : 'text-pb-muted hover:text-white'}`}
              >
                <Grid2X2 size={14} />
              </button>
              <button
                onClick={() => setGridView('list')}
                className={`w-8 h-8 flex items-center justify-center transition-colors ${gridView === 'list' ? 'bg-pb-orange text-white' : 'text-pb-muted hover:text-white'}`}
              >
                <List size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className={`grid gap-4 ${gridView === 'grid' ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2'}`}>
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-display font-900 text-4xl text-pb-muted uppercase mb-4">No results</p>
            <button onClick={() => setActiveCategory('All')} className="pb-btn-primary">
              View All Products <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
