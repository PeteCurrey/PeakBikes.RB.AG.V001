import React from 'react'
import { motion } from 'framer-motion'
import { Truck, CreditCard, PhoneCall, RotateCcw, Shield } from 'lucide-react'

const usps = [
  { icon: Truck,      text: 'Free UK Delivery over £50' },
  { icon: CreditCard, text: '0% Finance Available' },
  { icon: PhoneCall,  text: 'Expert Advice' },
  { icon: RotateCcw,  text: 'Free Returns' },
  { icon: Shield,     text: 'Price Match Guarantee' },
  { icon: Truck,      text: 'Free UK Delivery over £50' },
  { icon: CreditCard, text: '0% Finance Available' },
  { icon: PhoneCall,  text: 'Expert Advice' },
  { icon: RotateCcw,  text: 'Free Returns' },
  { icon: Shield,     text: 'Price Match Guarantee' },
]

export default function UspRibbon() {
  return (
    <section className="bg-pb-black-card border-y border-pb-border overflow-hidden py-4">
      <motion.div
        className="flex items-center gap-0 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 22,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        }}
      >
        {usps.map(({ icon: Icon, text }, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-8 border-r border-pb-border/50 flex-shrink-0"
          >
            <Icon size={14} className="text-pb-orange flex-shrink-0" />
            <span className="font-display font-700 text-xs uppercase tracking-widest text-pb-silver">
              {text}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
