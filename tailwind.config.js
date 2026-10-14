/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Peak Bikes Brand Palette
        'pb-black':       '#050d0a',
        'pb-black-deep':  '#020804',
        'pb-black-card':  '#0a1612',
        'pb-black-mid':   '#0f2018',
        'pb-black-light': '#1a3525',
        'pb-orange':      '#ff5c00',
        'pb-orange-bright':'#ff7a2e',
        'pb-orange-dark': '#cc4900',
        'pb-orange-glow': 'rgba(255, 92, 0, 0.25)',
        'pb-white':       '#ffffff',
        'pb-silver':      '#c8d4cc',
        'pb-light-bg':    '#f5f6f5',
        'pb-border':      '#1a3020',
        'pb-muted':       '#7a9088',
        'pb-success':     '#22c55e',
        'pb-sale':        '#ef4444',
      },
      fontFamily: {
        'display': ['"Barlow Condensed"', 'Futura', '"Arial Narrow"', 'Arial', 'sans-serif'],
        'body':    ['"Barlow"', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'pb-gradient':      'linear-gradient(to bottom, rgba(5,13,10,0) 0%, rgba(5,13,10,0.6) 60%, rgba(5,13,10,1) 100%)',
        'pb-gradient-left': 'linear-gradient(to right, rgba(5,13,10,1) 0%, rgba(5,13,10,0) 100%)',
        'pb-gradient-top':  'linear-gradient(to bottom, rgba(5,13,10,1) 0%, rgba(5,13,10,0) 100%)',
        'pb-gradient-card': 'linear-gradient(135deg, rgba(255,92,0,0.08) 0%, rgba(5,13,10,0) 100%)',
        'pb-orange-gradient':'linear-gradient(135deg, #ff5c00, #ff7a2e)',
      },
      animation: {
        'progress-bar':    'progress-bar 5s linear forwards',
        'fade-in':         'fade-in 0.6s ease-out forwards',
        'slide-up':        'slide-up 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'slide-in-right':  'slide-in-right 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'slide-in-left':   'slide-in-left 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'pulse-live':      'pulse-live 2s ease-in-out infinite',
        'ticker':          'ticker 30s linear infinite',
        'float':           'float 4s ease-in-out infinite',
        'glow-pulse':      'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        'progress-bar': {
          '0%':   { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%':   { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-in-left': {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'pulse-live': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.5' },
        },
        'ticker': {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,92,0,0.3)' },
          '50%':      { boxShadow: '0 0 40px rgba(255,92,0,0.6)' },
        },
      },
      transitionTimingFunction: {
        'pb': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      spacing: {
        '18':  '4.5rem',
        '88':  '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      aspectRatio: {
        '5/2': '5 / 2',
        '3/2': '3 / 2',
        '4/3': '4 / 3',
        '3/4': '3 / 4',
      },
      backdropBlur: {
        'pb': '20px',
      },
    },
  },
  plugins: [],
}
