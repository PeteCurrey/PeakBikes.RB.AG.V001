import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

// Individual card types
function BikeOnColourCard({ card, size = 'large' }) {
  const isLarge = size === 'large'
  return (
    <a
      href={card.cta?.url || '#'}
      className={`group relative flex flex-col justify-end overflow-hidden rounded-sm pb-card-hover ${isLarge ? 'h-full min-h-[380px]' : 'h-full min-h-[180px]'}`}
      style={{ backgroundColor: card.bgColor || '#0a1612' }}
    >
      {/* Background image */}
      <div className="absolute inset-0 pb-img-zoom">
        <img
          src={card.image}
          alt={card.imageAlt}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-500"
          loading="lazy"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-pb-black/90 via-pb-black/30 to-transparent" />

      {/* Accent glow */}
      {card.accentColor && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{ background: `radial-gradient(ellipse at bottom left, ${card.accentColor}, transparent 60%)` }}
        />
      )}

      {/* Ribbon */}
      {card.ribbon && (
        <div className="absolute top-4 left-4">
          <span className="pb-tag">{card.ribbon}</span>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 p-5">
        {card.logo && (
          <p className="font-display font-700 text-xs uppercase tracking-widest text-pb-muted mb-2">
            {card.logo}
          </p>
        )}
        <h3 className={`font-display font-900 uppercase text-white leading-none mb-1 ${isLarge ? 'text-4xl' : 'text-2xl'}`}>
          {card.heading}
        </h3>
        {card.subheading && (
          <p className={`font-body text-pb-silver mb-4 ${isLarge ? 'text-base' : 'text-sm'}`}>
            {card.subheading}
          </p>
        )}
        {card.cta && (
          <span className="pb-btn-primary inline-flex text-sm px-5 py-2.5">
            {card.cta.text}
            <ArrowRight size={13} />
          </span>
        )}
      </div>
    </a>
  )
}

function SmallCard({ card }) {
  return (
    <a
      href={card.url || '#'}
      className="group relative flex flex-col justify-end overflow-hidden rounded-sm pb-card-hover min-h-[180px]"
    >
      {/* Image */}
      <div className="absolute inset-0 pb-img-zoom bg-pb-black-mid">
        <img
          src={card.image}
          alt={card.imageAlt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-pb-black/90 via-pb-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 p-4">
        {card.label && (
          <p className="font-display font-700 text-xs uppercase tracking-widest text-pb-orange mb-1">
            {card.label}
          </p>
        )}
        {card.logo && (
          <p className="font-display font-700 text-xs uppercase tracking-widest text-pb-muted mb-1">
            {card.logo}
          </p>
        )}
        <h4 className="font-display font-900 uppercase text-white text-xl leading-tight group-hover:text-pb-orange transition-colors">
          {card.heading}
        </h4>
        {card.subheading && (
          <p className="text-pb-silver text-xs font-body mt-1">{card.subheading}</p>
        )}
        <div className="mt-3 flex items-center gap-1 text-pb-orange text-xs font-display font-700 uppercase tracking-wide opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-200">
          Shop Now <ArrowRight size={12} />
        </div>
      </div>
    </a>
  )
}

export default function PromoLockup({ row }) {
  const isOneTwo = row.layout === 'OneTwo'

  return (
    <motion.div
      className="grid gap-3"
      style={{ gridTemplateColumns: isOneTwo ? '2fr 1fr' : '1fr 2fr' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
    >
      {isOneTwo ? (
        <>
          {/* Hero card left */}
          <BikeOnColourCard card={row.heroCard} size="large" />
          {/* Two small cards right */}
          <div className="grid grid-rows-2 gap-3">
            {row.smallCards.map((card, i) => (
              <SmallCard key={i} card={card} />
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Two small cards left */}
          <div className="grid grid-rows-2 gap-3">
            {row.smallCards.map((card, i) => (
              <SmallCard key={i} card={card} />
            ))}
          </div>
          {/* Hero card right */}
          <BikeOnColourCard card={row.heroCard} size="large" />
        </>
      )}
    </motion.div>
  )
}
