import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'
import { brands } from '../data/brands.js'
import { products } from '../data/products.js'

const brandDescriptions = {
  'fox': 'Industry standard suspension forks, rear shocks, full-face helmets and technical trail apparel.',
  'rockshox': 'World Cup winning ZEB forks, Super Deluxe coil shocks and wireless Reverb AXS droppers.',
  'shimano': 'Legendary Japanese precision engineering — Deore XT 12-speed and 4-piston hydraulic brakes.',
  'sram': 'Transmission wireless AXS drivetrains and Maven extreme-power downhill braking systems.',
  'maxxis': 'The undisputed tyre benchmark in World Cup downhill and enduro racing worldwide.',
  'santa-cruz': 'Iconic California mountain bike heritage featuring legendary VPP virtual pivot suspension.',
  'hope': 'Precision CNC machined brakes, floating rotors, stems, and flat pedals made in Barnoldswick, UK.',
  'renthal': 'Aerospace aluminium and unidirectional carbon handlebars and apex stems.',
  'endura': 'Engineered in Scotland — bombproof waterproof MT500 jackets, baggy shorts, and Merino layers.',
  'five-ten': 'The original Stealth S1 rubber flat pedal shoe choice for riders who demand ultimate grip.',
  'dt-swiss': 'Swiss precision engineered 350/240 Ratchet System hubs and indestructible EX 1700 wheelsets.',
  'peatys': 'Created by downhill legend Steve Peat — biofibre sealant, tubeless valves and eco bike cleaners.'
}

export default function BrandsPage() {
  return (
    <div className="pt-[var(--pb-nav-height,112px)] min-h-screen bg-pb-black">
      {/* Header Banner */}
      <div className="bg-pb-black-card border-b border-pb-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <nav className="flex items-center gap-2 text-xs font-body text-pb-muted mb-4">
            <Link to="/" className="hover:text-pb-orange transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-white">Brands</span>
          </nav>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-pb-orange/15 border border-pb-orange/30 text-xs font-display font-700 text-pb-orange uppercase tracking-wider mb-3">
            <Sparkles size={14} /> Official Authorized Dealer
          </div>
          <h1 className="pb-title text-white tracking-tight" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
            World Class MTB Brands
          </h1>
          <p className="text-pb-silver max-w-2xl text-base mt-2 font-body">
            We partner directly with the cycling industry's most progressive manufacturers. All components and bikes carry full manufacturer warranty and Cytech workshop backing.
          </p>
        </div>
      </div>

      {/* Brand Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((b) => {
            const productCount = products.filter(p => p.brand.toLowerCase() === b.name.toLowerCase() || p.brand.toLowerCase().includes(b.name.toLowerCase().split(' ')[0])).length

            return (
              <Link
                key={b.id}
                to={b.url}
                className="group p-6 bg-pb-black-card border border-pb-border rounded-sm hover:border-pb-orange/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="inline-block px-3 py-1 text-xs font-display font-900 uppercase tracking-widest rounded-sm text-white"
                      style={{ backgroundColor: b.color || '#ff5c00' }}
                    >
                      {b.initial}
                    </span>
                    <span className="text-[11px] font-display font-700 text-pb-muted uppercase tracking-wider">
                      {productCount > 0 ? `${productCount} Products` : 'Authorized Partner'}
                    </span>
                  </div>

                  <h2 className="font-display font-800 text-xl text-white uppercase group-hover:text-pb-orange transition-colors">
                    {b.name}
                  </h2>
                  <p className="text-xs text-pb-silver font-body mt-2 leading-relaxed">
                    {brandDescriptions[b.id] || 'High performance mountain bike components, bikes, and rider protection.'}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-pb-border/60 flex items-center justify-between text-xs font-display font-700 uppercase tracking-wider text-pb-orange group-hover:translate-x-1 transition-transform">
                  <span>Shop {b.name}</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
