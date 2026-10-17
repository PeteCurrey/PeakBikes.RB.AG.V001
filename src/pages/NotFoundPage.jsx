import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Compass, Search } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'

export default function NotFoundPage() {
  const { openSearch } = useCart()

  return (
    <div className="pt-[var(--pb-nav-height,112px)] min-h-[80vh] flex items-center justify-center px-4 bg-pb-black">
      <div className="max-w-md w-full text-center py-16">
        <div className="w-16 h-16 rounded-full bg-pb-orange/15 border border-pb-orange/30 flex items-center justify-center mx-auto mb-6 text-pb-orange">
          <Compass size={32} />
        </div>
        <span className="font-mono text-pb-orange text-xs font-bold uppercase tracking-widest">
          404 Error — Off Trail
        </span>
        <h1 className="font-display font-900 text-3xl sm:text-4xl uppercase text-white mt-2 mb-3">
          Page Not Found
        </h1>
        <p className="text-pb-silver text-sm font-body mb-8 leading-relaxed">
          The trail you're looking for has either moved or doesn't exist. Check your navigation or head back to our main mountain bike catalog.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/bikes"
            className="w-full sm:w-auto pb-btn-primary justify-center text-xs py-3 px-6"
          >
            <ArrowLeft size={14} /> Back to Mountain Bikes
          </Link>
          <button
            onClick={openSearch}
            className="w-full sm:w-auto pb-btn-outline justify-center text-xs py-3 px-6"
          >
            <Search size={14} /> Search Catalog
          </button>
        </div>
      </div>
    </div>
  )
}
