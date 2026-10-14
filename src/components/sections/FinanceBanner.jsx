import React from 'react'
import { motion } from 'framer-motion'
import { Bike, Wrench, Package } from 'lucide-react'

const services = [
  {
    icon: Bike,
    title: '0% Finance',
    subtitle: 'On orders over £99',
    description: 'Spread the cost of your new bike or gear with our 0% APR finance options. Available on orders over £99 through PayPal Credit, Klarna, and Novuna.',
    cta: { text: 'Learn More', url: '/finance' },
  },
  {
    icon: Wrench,
    title: 'Expert Builds',
    subtitle: 'Every bike built by hand',
    description: 'Every bike we sell is fully assembled and inspected by our expert mechanics before it reaches you. PDI checked and ready to ride.',
    cta: { text: 'Our Promise', url: '/about' },
  },
  {
    icon: Package,
    title: 'Free UK Delivery',
    subtitle: 'On orders over £50',
    description: 'Fast, free delivery on orders over £50. Bikes delivered fully built in specialist packaging. Easy returns within 30 days.',
    cta: { text: 'Delivery Info', url: '/delivery' },
  },
]

export default function FinanceBanner() {
  return (
    <section className="pb-section bg-pb-black-card border-y border-pb-border">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-display font-700 text-xs uppercase tracking-widest text-pb-orange mb-3">
            Our Services
          </p>
          <h2 className="pb-section-title text-white">Why Shop with Peak Bikes?</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, subtitle, description, cta }, i) => (
            <motion.div
              key={title}
              className="group relative flex flex-col items-start p-7 rounded-sm bg-pb-black border border-pb-border hover:border-pb-orange/30 transition-colors duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-sm bg-pb-orange/10 border border-pb-orange/20 flex items-center justify-center mb-5 group-hover:bg-pb-orange/20 transition-colors">
                <Icon size={22} className="text-pb-orange" />
              </div>

              <h3 className="font-display font-900 uppercase text-white text-2xl leading-tight mb-1">
                {title}
              </h3>
              <p className="font-display font-600 text-pb-orange text-xs uppercase tracking-widest mb-4">
                {subtitle}
              </p>
              <p className="font-body text-pb-muted text-sm leading-relaxed flex-1">
                {description}
              </p>
              {cta && (
                <a
                  href={cta.url}
                  className="mt-5 pb-btn-ghost text-sm"
                >
                  {cta.text} →
                </a>
              )}

              {/* Corner accent */}
              <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden opacity-10 group-hover:opacity-20 transition-opacity">
                <div className="absolute bottom-0 right-0 w-0 h-0"
                  style={{
                    borderLeft: '64px solid transparent',
                    borderBottom: '64px solid #ff5c00',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
