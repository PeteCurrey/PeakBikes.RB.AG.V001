import React from 'react'

export default function Badge({ children, variant = 'new', className = '' }) {
  const variants = {
    new:     'bg-pb-orange text-white',
    sale:    'bg-pb-sale text-white',
    limited: 'bg-purple-600 text-white',
    hot:     'bg-amber-500 text-white',
    default: 'bg-pb-black-mid text-pb-silver border border-pb-border',
  }

  return (
    <span className={`pb-tag ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  )
}
