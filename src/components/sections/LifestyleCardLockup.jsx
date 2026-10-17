import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

function LifestyleCard({ card, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      className="relative"
    >
      <Link
        to={card.cta?.url || '#'}
        className="group relative block overflow-hidden rounded-sm pb-img-zoom"
        style={{ aspectRatio: '2/1' }}
      >
        {/* Image */}
        <img
          src={card.image}
          alt={card.imageAlt}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-pb-black/85 via-pb-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-pb-black/40 to-transparent pointer-events-none" />

        {/* Orange edge glow on hover */}
        <div className="absolute inset-0 border border-transparent group-hover:border-pb-orange/30 transition-colors duration-300 rounded-sm pointer-events-none" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {card.label && (
            <p className="font-display font-700 text-xs uppercase tracking-widest text-pb-orange mb-2">
              {card.label}
            </p>
          )}
          <h3 className="font-display font-900 uppercase text-white text-3xl leading-tight mb-3 group-hover:pb-glow-text transition-all duration-300">
            {card.title}
          </h3>
          {card.cta && (
            <span className="flex items-center gap-2 text-pb-orange font-display font-700 text-sm uppercase tracking-wide translate-y-2 group-hover:translate-y-0 opacity-70 group-hover:opacity-100 transition-all duration-300">
              {card.cta.text} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

export default function LifestyleCardLockup({ row }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {row.cards.map((card, i) => (
        <LifestyleCard key={i} card={card} index={i} />
      ))}
    </div>
  )
}
