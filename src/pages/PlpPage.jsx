import React, { useState, useMemo, useEffect } from 'react'
import { useParams, useLocation, useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, ChevronDown, Grid2X2, List, X, Check, ArrowRight, RotateCcw, ChevronRight } from 'lucide-react'
import { products } from '../data/products.js'
import ProductCard from '../components/ui/ProductCard.jsx'

const categoryOptions = ['All', 'Full Suspension', 'Hardtail', 'Electric MTB', 'Components', 'Clothing', 'Helmets', 'Accessories']
const wheelSizeOptions = ['29"', '27.5"', 'Mullet (29/27.5")', '26"', '24"']
const travelOptions = ['100mm', '140mm', '160mm', '170mm', '200mm']
const materialOptions = ['Carbon', 'Alloy']
const brandOptions = ['Peak Bikes', 'Fox Racing', 'RockShox', 'Shimano', 'SRAM', 'Endura', 'Five Ten', "Peaty's", 'Hope Tech', 'Renthal', 'DT Swiss', 'Maxxis']
const sortOptions = ['Recommended', 'Price: Low to High', 'Price: High to Low', 'Top Customer Rated', 'Newest First']

// Mapping from route slug to display title & category config
const subcategoryMap = {
  // Bikes
  'full-suspension': { title: 'Full Suspension Mountain Bikes', category: 'Full Suspension' },
  'hardtail': { title: 'Hardtail Mountain Bikes', category: 'Hardtail' },
  'downhill': { title: 'Downhill & Gravity Mountain Bikes', category: 'Full Suspension', subcat: 'downhill' },
  'electric': { title: 'Electric Mountain Bikes (e-MTB)', category: 'Electric MTB' },
  'dirt-jump': { title: 'Dirt Jump & Pumptrack Bikes', category: 'Hardtail', subcat: 'dirt-jump' },
  'kids': { title: 'Youth & Junior Mountain Bikes', category: 'Hardtail', subcat: 'kids' },
  'mountain': { title: 'Mountain Bikes', category: 'All' },

  // Components
  'forks': { title: 'MTB Suspension Forks', category: 'Components', subcat: 'forks' },
  'shocks': { title: 'MTB Rear Shocks', category: 'Components', subcat: 'shocks' },
  'groupsets': { title: 'MTB Drivetrains & Groupsets', category: 'Components', subcat: 'groupsets' },
  'brakes': { title: 'Hydraulic MTB Disc Brakes', category: 'Components', subcat: 'brakes' },
  'wheels': { title: 'MTB Wheels & Wheelsets', category: 'Components', subcat: 'wheels' },
  'tyres': { title: 'MTB Tyres & Tubeless', category: 'Components', subcat: 'tyres' },
  'cockpit': { title: 'Handlebars, Stems & Cockpit', category: 'Components', subcat: 'cockpit' },
  'pedals': { title: 'Flat & Clip-In MTB Pedals', category: 'Components', subcat: 'pedals' },

  // Helmets & Protection
  'full-face': { title: 'Full Face MTB Helmets', category: 'Helmets', subcat: 'full-face' },
  'trail': { title: 'Trail & Enduro MTB Helmets', category: 'Helmets', subcat: 'trail' },
  'pads': { title: 'Knee & Elbow Armor Pads', category: 'Clothing', subcat: 'pads' },
  'body-armour': { title: 'Body Armour & Torso Protection', category: 'Clothing', subcat: 'body-armour' },
  'goggles': { title: 'MTB Goggles & Eyewear', category: 'Accessories', subcat: 'goggles' },

  // Clothing
  'jackets': { title: 'Waterproof MTB Jackets', category: 'Clothing', subcat: 'jackets' },
  'shorts': { title: 'MTB Trail Shorts & Pants', category: 'Clothing', subcat: 'shorts' },
  'jerseys': { title: 'Technical MTB Jerseys', category: 'Clothing', subcat: 'jerseys' },
  'shoes': { title: 'Flat Pedal & Clipless MTB Shoes', category: 'Clothing', subcat: 'shoes' },
  'gloves': { title: 'MTB Gloves', category: 'Clothing', subcat: 'gloves' },
  'base-layers': { title: 'Merino & Thermal Trail Base Layers', category: 'Clothing', subcat: 'base-layers' },

  // Accessories
  'mudguards': { title: 'MTB Mudguards & Fenders', category: 'Accessories', subcat: 'mudguards' },
  'tubeless': { title: 'Tubeless Sealant & Repair Kits', category: 'Accessories', subcat: 'tubeless' },
  'hydration': { title: 'MTB Hydration & Hip Packs', category: 'Accessories', subcat: 'hydration' },
  'tools': { title: 'Trail Multi-Tools & Pumps', category: 'Accessories', subcat: 'tools' },
  'lights': { title: 'High-Power MTB Night Lights', category: 'Accessories', subcat: 'lights' },
  'cleaning': { title: 'Bike Cleaner & Workshop Lubes', category: 'Accessories', subcat: 'cleaning' },
}

const brandSlugMap = {
  'fox': 'Fox Racing',
  'rockshox': 'RockShox',
  'shimano': 'Shimano',
  'sram': 'SRAM',
  'maxxis': 'Maxxis',
  'santa-cruz': 'Santa Cruz',
  'hope': 'Hope Tech',
  'renthal': 'Renthal',
  'five-ten': 'Five Ten',
  'endura': 'Endura',
  'peatys': "Peaty's",
  'dt-swiss': 'DT Swiss',
}

export default function PlpPage({ title: defaultTitle, category: initialCategory, saleOnly = false }) {
  const { subcat, brandSlug } = useParams()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  // Inferred states from URL and params
  const isSalePath = saleOnly || location.pathname.startsWith('/sale')
  const catParam = searchParams.get('cat') || searchParams.get('category')
  const sortParam = searchParams.get('sort')
  const brandParam = searchParams.get('brand')

  // Derive subcategory info if route matches
  const subcatInfo = subcat ? subcategoryMap[subcat] : null
  const matchedBrand = brandSlug ? brandSlugMap[brandSlug] : (brandParam ? (brandSlugMap[brandParam] || brandParam) : null)

  // Compute Page Title
  const pageTitle = useMemo(() => {
    if (matchedBrand) return `${matchedBrand} Mountain Bikes & Parts`
    if (subcatInfo) return subcatInfo.title
    if (isSalePath) return 'Mountain Bike Clearance & Deals'
    if (defaultTitle) return defaultTitle
    if (location.pathname.startsWith('/clothing')) return 'MTB Trail Apparel & Protection'
    if (location.pathname.startsWith('/helmets')) return 'MTB Helmets & Head Protection'
    if (location.pathname.startsWith('/components')) return 'Mountain Bike Components'
    if (location.pathname.startsWith('/accessories')) return 'MTB Trail Accessories'
    if (location.pathname.startsWith('/bikes')) return 'Mountain Bikes'
    return 'Mountain Bikes & Gear'
  }, [subcatInfo, matchedBrand, isSalePath, defaultTitle, location.pathname])

  // Initial category calculation
  const defaultCategory = useMemo(() => {
    if (subcatInfo?.category) return subcatInfo.category
    if (initialCategory) return initialCategory
    if (catParam) {
      if (catParam === 'bikes') return 'All'
      if (catParam === 'components') return 'Components'
      if (catParam === 'clothing') return 'Clothing'
      if (catParam === 'helmets') return 'Helmets'
      if (catParam === 'accessories') return 'Accessories'
    }
    if (location.pathname === '/clothing') return 'Clothing'
    if (location.pathname === '/helmets') return 'Helmets'
    if (location.pathname === '/components') return 'Components'
    if (location.pathname === '/accessories') return 'Accessories'
    if (location.pathname === '/bikes/full-suspension') return 'Full Suspension'
    if (location.pathname === '/bikes/hardtail') return 'Hardtail'
    if (location.pathname === '/bikes/electric') return 'Electric MTB'
    return 'All'
  }, [subcatInfo, initialCategory, catParam, location.pathname])

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory)
  const [selectedSubcat, setSelectedSubcat] = useState(subcatInfo?.subcat || null)
  const [selectedWheelSize, setSelectedWheelSize] = useState([])
  const [selectedTravel, setSelectedTravel] = useState([])
  const [selectedMaterial, setSelectedMaterial] = useState([])
  const [selectedBrands, setSelectedBrands] = useState(matchedBrand ? [matchedBrand] : [])
  const [inStockOnly, setInStockOnly] = useState(false)
  const [maxPrice, setMaxPrice] = useState(7000)

  // View & sort
  const initialSort = sortParam === 'new' ? 'Newest First' : 'Recommended'
  const [sortBy, setSortBy] = useState(initialSort)
  const [gridView, setGridView] = useState('grid')
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  // Synchronize when route changes
  useEffect(() => {
    setSelectedCategory(defaultCategory)
    setSelectedSubcat(subcatInfo?.subcat || null)
    setSelectedBrands(matchedBrand ? [matchedBrand] : [])
  }, [defaultCategory, subcatInfo, matchedBrand])

  // Toggle helper
  const toggleItem = (list, setList, item) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item))
    } else {
      setList([...list, item])
    }
  }

  const clearAllFilters = () => {
    setSelectedCategory('All')
    setSelectedSubcat(null)
    setSelectedWheelSize([])
    setSelectedTravel([])
    setSelectedMaterial([])
    setSelectedBrands([])
    setInStockOnly(false)
    setMaxPrice(7000)
  }

  const hasActiveFilters =
    (selectedCategory !== 'All' && selectedCategory !== defaultCategory) ||
    selectedSubcat !== null ||
    selectedWheelSize.length > 0 ||
    selectedTravel.length > 0 ||
    selectedMaterial.length > 0 ||
    (selectedBrands.length > 0 && !matchedBrand) ||
    inStockOnly ||
    maxPrice < 7000

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Sale filter
      if (isSalePath) {
        const isSale = p.rrp && p.rrp > p.price
        if (!isSale) return false
      }

      // Department / Category filter
      if (selectedCategory !== 'All') {
        if (p.category !== selectedCategory) return false
      }

      // Subcategory filter (e.g. forks, brakes, jackets, pads, downhill)
      if (selectedSubcat) {
        if (p.subcategory !== selectedSubcat) return false
      }

      // Wheel size filter
      if (selectedWheelSize.length > 0) {
        if (!p.wheelSize || !selectedWheelSize.includes(p.wheelSize)) return false
      }

      // Travel filter
      if (selectedTravel.length > 0) {
        if (!p.travel || !selectedTravel.includes(p.travel)) return false
      }

      // Material filter
      if (selectedMaterial.length > 0) {
        if (!p.frameMaterial || !selectedMaterial.includes(p.frameMaterial)) return false
      }

      // Brand filter
      if (selectedBrands.length > 0) {
        if (!selectedBrands.includes(p.brand)) return false
      }

      // In stock
      if (inStockOnly && !p.inStock) return false

      // Max price
      if (p.price > maxPrice) return false

      return true
    }).sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.price - b.price
      if (sortBy === 'Price: High to Low') return b.price - a.price
      if (sortBy === 'Top Customer Rated') return (b.rating || 0) - (a.rating || 0)
      if (sortBy === 'Newest First') return b.id - a.id
      return 0 // Recommended default
    })
  }, [isSalePath, selectedCategory, selectedSubcat, selectedWheelSize, selectedTravel, selectedMaterial, selectedBrands, inStockOnly, maxPrice, sortBy])

  return (
    <div className="pt-[var(--pb-nav-height,112px)] min-h-screen bg-pb-black">
      {/* Page Header Banner */}
      <div className="bg-pb-black-card border-b border-pb-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <nav className="flex items-center gap-2 text-xs font-body text-pb-muted mb-3">
            <Link to="/" className="hover:text-pb-orange transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/bikes" className="hover:text-pb-orange transition-colors">Mountain Bikes</Link>
            {selectedCategory !== 'All' && (
              <>
                <ChevronRight size={12} />
                <span className="text-pb-silver">{selectedCategory}</span>
              </>
            )}
            {subcatInfo && (
              <>
                <ChevronRight size={12} />
                <span className="text-white">{subcatInfo.title}</span>
              </>
            )}
            {matchedBrand && (
              <>
                <ChevronRight size={12} />
                <span className="text-white">{matchedBrand}</span>
              </>
            )}
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h1 className="pb-title text-white tracking-tight" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)' }}>
              {pageTitle}
            </h1>
            <span className="text-pb-muted font-display font-700 text-xs uppercase tracking-widest">
              Showing {filteredProducts.length} of {products.length} Products
            </span>
          </div>
        </div>
      </div>

      {/* Top Filter Bar (Sticky) */}
      <div className="bg-pb-black-card/95 backdrop-blur-md border-b border-pb-border sticky top-[var(--pb-nav-height,112px)] z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">

          {/* Category Chips Scroller */}
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar flex-1 mr-2">
            {categoryOptions.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat)
                  setSelectedSubcat(null)
                }}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-sm font-display font-700 text-xs uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-pb-orange text-white shadow-sm'
                    : 'bg-pb-black border border-pb-border text-pb-silver hover:border-pb-orange/40 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Controls: Filter Button & Sort */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            {/* Filter Toggle Button (Desktop & Mobile) */}
            <button
              onClick={() => setMobileFilterOpen(prev => !prev)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-display font-700 text-xs uppercase tracking-wider border transition-colors ${
                hasActiveFilters
                  ? 'bg-pb-orange/15 border-pb-orange text-pb-orange'
                  : 'bg-pb-black border-pb-border text-pb-silver hover:border-pb-orange/40'
              }`}
            >
              <SlidersHorizontal size={14} />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-4 h-4 rounded-full bg-pb-orange text-white text-[9px] flex items-center justify-center font-mono">
                  {(selectedCategory !== 'All' ? 1 : 0) + selectedWheelSize.length + selectedTravel.length + selectedMaterial.length + selectedBrands.length + (inStockOnly ? 1 : 0)}
                </span>
              )}
            </button>

            {/* Sort Select */}
            <div className="relative hidden sm:block">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-pb-black border border-pb-border text-pb-silver font-display font-700 text-xs uppercase tracking-wide px-3 py-1.5 pr-8 rounded-sm cursor-pointer hover:border-pb-orange/40 focus:outline-none focus:border-pb-orange"
              >
                {sortOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-pb-muted pointer-events-none" />
            </div>

            {/* View Mode Toggle */}
            <div className="hidden lg:flex items-center border border-pb-border rounded-sm overflow-hidden">
              <button
                onClick={() => setGridView('grid')}
                className={`p-1.5 transition-colors ${gridView === 'grid' ? 'bg-pb-orange text-white' : 'bg-pb-black text-pb-muted hover:text-white'}`}
                aria-label="Grid view"
              >
                <Grid2X2 size={16} />
              </button>
              <button
                onClick={() => setGridView('list')}
                className={`p-1.5 transition-colors ${gridView === 'list' ? 'bg-pb-orange text-white' : 'bg-pb-black text-pb-muted hover:text-white'}`}
                aria-label="List view"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Badges Bar */}
        {hasActiveFilters && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 border-t border-pb-border/50 flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-display font-700 uppercase tracking-widest text-pb-muted mr-1">Active:</span>

            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-pb-black border border-pb-border text-xs text-white">
                {selectedCategory}
                <button onClick={() => setSelectedCategory('All')} className="text-pb-muted hover:text-white"><X size={12} /></button>
              </span>
            )}
            {selectedSubcat && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-pb-black border border-pb-border text-xs text-white">
                Subcategory: {selectedSubcat}
                <button onClick={() => setSelectedSubcat(null)} className="text-pb-muted hover:text-white"><X size={12} /></button>
              </span>
            )}
            {selectedWheelSize.map(w => (
              <span key={w} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-pb-black border border-pb-border text-xs text-white">
                Wheel: {w}
                <button onClick={() => toggleItem(selectedWheelSize, setSelectedWheelSize, w)} className="text-pb-muted hover:text-white"><X size={12} /></button>
              </span>
            ))}
            {selectedTravel.map(t => (
              <span key={t} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-pb-black border border-pb-border text-xs text-white">
                Travel: {t}
                <button onClick={() => toggleItem(selectedTravel, setSelectedTravel, t)} className="text-pb-muted hover:text-white"><X size={12} /></button>
              </span>
            ))}
            {selectedMaterial.map(m => (
              <span key={m} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-pb-black border border-pb-border text-xs text-white">
                Frame: {m}
                <button onClick={() => toggleItem(selectedMaterial, setSelectedMaterial, m)} className="text-pb-muted hover:text-white"><X size={12} /></button>
              </span>
            ))}
            {selectedBrands.map(b => (
              <span key={b} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-pb-black border border-pb-border text-xs text-white">
                Brand: {b}
                <button onClick={() => toggleItem(selectedBrands, setSelectedBrands, b)} className="text-pb-muted hover:text-white"><X size={12} /></button>
              </span>
            ))}
            {inStockOnly && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-pb-black border border-pb-border text-xs text-pb-success">
                In Stock Only
                <button onClick={() => setInStockOnly(false)} className="text-pb-muted hover:text-white"><X size={12} /></button>
              </span>
            )}

            <button
              onClick={clearAllFilters}
              className="text-xs font-display font-700 uppercase tracking-wider text-pb-orange hover:underline ml-2"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-8 items-start">

          {/* Faceted Filter Sidebar (Desktop or Opened) */}
          <div className={`${mobileFilterOpen ? 'block' : 'hidden lg:block'} w-full lg:w-64 flex-shrink-0 bg-pb-black-card border border-pb-border p-5 rounded-sm space-y-6`}>
            <div className="flex items-center justify-between pb-3 border-b border-pb-border">
              <h3 className="font-display font-800 text-sm uppercase tracking-wider text-white">
                Filter Mountain Bikes
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-pb-orange hover:underline font-body"
                >
                  Reset
                </button>
              )}
            </div>

            {/* In Stock Toggle */}
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setInStockOnly(!inStockOnly)}>
              <span className="font-body text-xs text-pb-silver font-semibold">In Stock Only</span>
              <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${inStockOnly ? 'bg-pb-orange border-pb-orange text-white' : 'bg-pb-black border-pb-border'}`}>
                {inStockOnly && <Check size={13} />}
              </div>
            </div>

            {/* Wheel Size */}
            <div>
              <h4 className="font-display font-700 text-xs uppercase tracking-wider text-pb-muted mb-3">
                Wheel Size
              </h4>
              <div className="space-y-2">
                {wheelSizeOptions.map((size) => {
                  const active = selectedWheelSize.includes(size)
                  return (
                    <label
                      key={size}
                      className="flex items-center gap-2.5 text-xs text-pb-silver hover:text-white cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={active}
                        onChange={() => toggleItem(selectedWheelSize, setSelectedWheelSize, size)}
                        className="rounded border-pb-border text-pb-orange bg-pb-black focus:ring-0 focus:ring-offset-0"
                      />
                      <span>{size}</span>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Suspension Travel */}
            <div>
              <h4 className="font-display font-700 text-xs uppercase tracking-wider text-pb-muted mb-3">
                Suspension Travel
              </h4>
              <div className="space-y-2">
                {travelOptions.map((tr) => {
                  const active = selectedTravel.includes(tr)
                  return (
                    <label
                      key={tr}
                      className="flex items-center gap-2.5 text-xs text-pb-silver hover:text-white cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={active}
                        onChange={() => toggleItem(selectedTravel, setSelectedTravel, tr)}
                        className="rounded border-pb-border text-pb-orange bg-pb-black focus:ring-0 focus:ring-offset-0"
                      />
                      <span>{tr}</span>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Frame Material */}
            <div>
              <h4 className="font-display font-700 text-xs uppercase tracking-wider text-pb-muted mb-3">
                Frame Material
              </h4>
              <div className="space-y-2">
                {materialOptions.map((mat) => {
                  const active = selectedMaterial.includes(mat)
                  return (
                    <label
                      key={mat}
                      className="flex items-center gap-2.5 text-xs text-pb-silver hover:text-white cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={active}
                        onChange={() => toggleItem(selectedMaterial, setSelectedMaterial, mat)}
                        className="rounded border-pb-border text-pb-orange bg-pb-black focus:ring-0 focus:ring-offset-0"
                      />
                      <span>{mat}</span>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <h4 className="font-display font-700 text-xs uppercase tracking-wider text-pb-muted mb-3">
                Brand
              </h4>
              <div className="space-y-2">
                {brandOptions.map((brand) => {
                  const active = selectedBrands.includes(brand)
                  return (
                    <label
                      key={brand}
                      className="flex items-center gap-2.5 text-xs text-pb-silver hover:text-white cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={active}
                        onChange={() => toggleItem(selectedBrands, setSelectedBrands, brand)}
                        className="rounded border-pb-border text-pb-orange bg-pb-black focus:ring-0 focus:ring-offset-0"
                      />
                      <span>{brand}</span>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Price Slider */}
            <div>
              <div className="flex items-center justify-between text-xs text-pb-muted mb-2">
                <span className="font-display font-700 uppercase tracking-wider">Max Price</span>
                <span className="font-mono text-white font-bold">£{maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="20"
                max="7000"
                step="20"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-pb-orange cursor-pointer"
              />
            </div>
          </div>

          {/* Product Grid / List Results */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="p-12 text-center bg-pb-black-card border border-pb-border rounded-sm">
                <h3 className="font-display font-800 text-xl uppercase text-white mb-2">
                  No mountain bike products match your selected filters
                </h3>
                <p className="text-pb-muted text-sm font-body max-w-md mx-auto mb-6">
                  Try clearing some filter options or reset all filters to view our full mountain bike lineup.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="pb-btn-primary text-xs px-5 py-2.5 inline-flex items-center gap-2"
                >
                  <RotateCcw size={14} />
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className={
                gridView === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    className={gridView === 'list' ? 'flex-row' : ''}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
