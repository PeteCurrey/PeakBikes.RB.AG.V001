import React from 'react'
import { Link } from 'react-router-dom'
import { Mountain, Instagram, Facebook, Youtube, Twitter, ArrowRight } from 'lucide-react'

const footerLinks = {
  shop: {
    title: 'Shop MTB',
    links: [
      { label: 'Full Suspension MTBs', url: '/bikes/full-suspension' },
      { label: 'Hardtail Trail MTBs', url: '/bikes/hardtail' },
      { label: 'Electric MTBs (e-MTB)', url: '/bikes/electric' },
      { label: 'Downhill & Gravity', url: '/bikes/downhill' },
      { label: 'Youth & Junior MTBs', url: '/bikes/kids' },
      { label: 'Forks & Rear Shocks', url: '/components/forks' },
      { label: 'Hydraulic Disc Brakes', url: '/components/brakes' },
      { label: 'Full Face & Trail Helmets', url: '/helmets' },
      { label: 'Knee & Body Armour', url: '/clothing/pads' },
    ],
  },
  help: {
    title: 'Help & Services',
    links: [
      { label: 'Expert Advice', url: '/advice' },
      { label: '0% Finance', url: '/finance' },
      { label: 'Cycle to Work', url: '/cycle-to-work' },
      { label: 'Delivery Information', url: '/delivery' },
      { label: 'Returns & Exchanges', url: '/returns' },
      { label: 'Price Match', url: '/price-match' },
      { label: 'Contact Us', url: '/contact' },
      { label: 'FAQs', url: '/faq' },
    ],
  },
  about: {
    title: 'About Peak Bikes',
    links: [
      { label: 'Our Story', url: '/about' },
      { label: 'Top Brands', url: '/brands' },
      { label: 'Gift Cards', url: '/gift-cards' },
      { label: 'Careers', url: '/careers' },
      { label: 'Press', url: '/press' },
    ],
  },
}

const socials = [
  { icon: Instagram, label: 'Instagram', url: '#' },
  { icon: Facebook,  label: 'Facebook',  url: '#' },
  { icon: Youtube,   label: 'YouTube',   url: '#' },
  { icon: Twitter,   label: 'X / Twitter', url: '#' },
]

const trustBadges = ['PayPal', 'Klarna', 'Visa', 'Mastercard', 'Amex']

export default function Footer() {
  return (
    <footer className="bg-pb-black border-t border-pb-border">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 mb-5 group">
              <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
                <rect width="36" height="36" rx="3" fill="#0a1612"/>
                <path d="M18 5 L31 30 H5 Z" fill="#ff5c00" opacity="0.95"/>
                <path d="M18 13 L27 28 H9 Z" fill="#050d0a"/>
                <path d="M18 13 L22 20 L14 20 Z" fill="#ff5c00" opacity="0.5"/>
              </svg>
              <div>
                <span className="block font-display font-900 text-lg text-white uppercase tracking-tight group-hover:text-pb-orange transition-colors">Peak Bikes</span>
                <span className="block font-display font-400 text-[8px] text-pb-muted uppercase tracking-[0.2em]">Ride Further. Go Harder.</span>
              </div>
            </Link>
            <p className="font-body text-pb-muted text-sm leading-relaxed mb-5">
              Premium bikes and cycling gear for every rider. Expert advice, fast UK delivery, 0% finance available.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, label, url }) => (
                <a
                  key={label}
                  href={url}
                  aria-label={label}
                  className="w-8 h-8 rounded-sm bg-pb-black-card border border-pb-border flex items-center justify-center text-pb-muted hover:text-white hover:border-pb-orange/40 hover:bg-pb-orange/10 transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="font-display font-700 text-xs uppercase tracking-widest text-white mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.url}
                      className="font-body text-pb-muted text-sm hover:text-pb-orange transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-pb-border">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-pb-muted text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Peak Bikes Ltd. All Rights Reserved. Company No. 12345678 | VAT No. 123 4567 89
          </p>
          <div className="flex items-center gap-4">
            {/* Payment icons as text badges (replace with SVG icons) */}
            {trustBadges.map((badge) => (
              <span
                key={badge}
                className="font-display font-700 text-[9px] uppercase tracking-wider text-pb-muted/50 border border-pb-border/50 rounded px-2 py-0.5"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pb-4">
          <p className="font-body text-pb-muted/50 text-[10px] leading-relaxed">
            Peak Bikes Ltd is authorised and regulated by the Financial Conduct Authority. Finance provided by Novuna Personal Finance and PayPal. Registered office: 1 Peak Street, Sheffield, S1 1AA.
          </p>
        </div>
      </div>
    </footer>
  )
}
