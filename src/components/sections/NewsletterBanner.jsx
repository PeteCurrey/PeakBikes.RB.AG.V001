import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, CheckCircle } from 'lucide-react'

export default function NewsletterBanner() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  return (
    <section className="relative pb-section overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1600&q=80"
          alt=""
          role="presentation"
          className="w-full h-full object-cover opacity-20"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pb-black via-pb-black/95 to-pb-black/80" />
      </div>

      {/* Orange accent glow */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ff5c00, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-display font-700 text-xs uppercase tracking-widest text-pb-orange mb-4 flex items-center gap-2">
              <Mail size={12} />
              Newsletter
            </p>
            <h2 className="pb-title text-white mb-2" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
              Get £5 Off
            </h2>
            <p className="font-body text-pb-silver text-lg mb-2 leading-relaxed">
              Your first order when you spend £50 or more.
            </p>
            <p className="font-body text-pb-muted text-sm mb-8">
              Plus be first to hear about new arrivals, exclusive deals, and expert riding advice.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex gap-0 max-w-md">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="Your email address"
                    required
                    className="w-full h-12 px-4 bg-pb-black-card font-body text-white text-sm placeholder:text-pb-muted outline-none rounded-l-sm"
                    style={{
                      border: `1.5px solid ${focused ? '#ff5c00' : '#1a3020'}`,
                      borderRight: 'none',
                      transition: 'border-color 0.2s ease',
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="pb-btn-primary rounded-l-none h-12 px-5 text-sm flex-shrink-0"
                >
                  Sign Up
                  <ArrowRight size={14} />
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 text-pb-success font-display font-700 uppercase tracking-wide"
              >
                <CheckCircle size={20} className="flex-shrink-0" />
                Check your email for your £5 voucher code!
              </motion.div>
            )}

            <p className="mt-3 text-pb-muted text-xs font-body">
              By signing up you agree to our Privacy Policy. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
