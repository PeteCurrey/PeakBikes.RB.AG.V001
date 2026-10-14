import React from 'react'
import { motion } from 'framer-motion'
import CinematicHero from '../components/hero/CinematicHero.jsx'
import BrandBar from '../components/sections/BrandBar.jsx'
import PromoLockup from '../components/sections/PromoLockup.jsx'
import ProductSlider from '../components/sections/ProductSlider.jsx'
import LifestyleCardLockup from '../components/sections/LifestyleCardLockup.jsx'
import UspRibbon from '../components/sections/UspRibbon.jsx'
import FinanceBanner from '../components/sections/FinanceBanner.jsx'
import NewsletterBanner from '../components/sections/NewsletterBanner.jsx'
import { promoRows, lifestyleRows } from '../data/promos.js'
import { products, newProducts, saleProducts } from '../data/products.js'

export default function HomePage() {
  return (
    <>
      {/* 1. Cinematic hero with 3D scroll parallax */}
      <CinematicHero />

      {/* 2. Brand bar ticker */}
      <BrandBar />

      {/* 3. Promo lockup row 1 — OneTwo */}
      <section className="pb-section">
        <div className="max-w-7xl mx-auto px-6">
          <PromoLockup row={promoRows[0]} />
        </div>
      </section>

      {/* 4. Best Sellers product slider */}
      <ProductSlider
        title="Best Sellers"
        products={products}
        viewAllUrl="/bikes"
      />

      {/* 5. Lifestyle card pair 1 */}
      <section className="pb-section pt-0">
        <div className="max-w-7xl mx-auto px-6">
          <LifestyleCardLockup row={lifestyleRows[0]} />
        </div>
      </section>

      {/* 6. Promo lockup row 2 — TwoOne */}
      <section className="pb-section">
        <div className="max-w-7xl mx-auto px-6">
          <PromoLockup row={promoRows[1]} />
        </div>
      </section>

      {/* 7. New Arrivals slider */}
      <ProductSlider
        title="New Arrivals"
        products={[...newProducts, ...products.slice(0, 4)]}
        viewAllUrl="/bikes?sort=new"
      />

      {/* 8. Lifestyle card pair 2 */}
      <section className="pb-section pt-0">
        <div className="max-w-7xl mx-auto px-6">
          <LifestyleCardLockup row={lifestyleRows[1]} />
        </div>
      </section>

      {/* 9. Promo lockup row 3 — OneTwo */}
      <section className="pb-section">
        <div className="max-w-7xl mx-auto px-6">
          <PromoLockup row={promoRows[2]} />
        </div>
      </section>

      {/* 10. Sale slider */}
      <ProductSlider
        title="Current Deals"
        products={[...saleProducts, ...products]}
        viewAllUrl="/sale"
      />

      {/* 11. USP ribbon */}
      <UspRibbon />

      {/* 12. Finance / Why Peak Bikes */}
      <FinanceBanner />

      {/* 13. Newsletter */}
      <NewsletterBanner />
    </>
  )
}
