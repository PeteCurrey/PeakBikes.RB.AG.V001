# Peak Bikes 🚴‍♂️⚡

A high-performance, award-winning cycling ecommerce platform built with **React**, **Three.js**, **Tailwind CSS**, and **Framer Motion**.

Peak Bikes fuses the **cinematic 3D scroll experience and bold aesthetic of Red Bull** with the **commercial depth, mega-navigation, and product merchandising architecture of Tredz.co.uk**.

---

## 🌟 Key Features

### 🎬 1. Cinematic 3D Parallax & Interactive WebGL Experience
- **Cinematic Parallax Hero**: Multi-layer scroll parallax with depth scaling, staggered word reveal, and dynamic lighting.
- **Interactive 3D Can Scroll Feature**: Verbatim 3D interactive WebGL experience built with Three.js featuring 360° mouse drag rotation, realistic metallic materials, procedural texture generation, and multi-stage scroll animations.

### 🧭 2. Tredz-Inspired Commercial Navigation
- **Fixed Glassmorphism Header**: Adapts seamlessly from transparent over hero to solid blurred backdrop on scroll.
- **Multi-Column Mega Menu**: 3-column subcategory layout with icons, descriptions, and featured editorial imagery.
- **Mobile Drawer**: Responsive sliding navigation drawer with smooth accordion expansions and quick-access USP ribbon.
- **Sitewide Announcement Banner**: Dismissible promo banner with session storage persistence.

### 🛒 3. Commercial Merchandising Grid & Components
- **Rich Promo Lockups**: Alternating `OneTwo` and `TwoOne` editorial grid systems featuring high-impact card treatments and responsive hover zoom.
- **Draggable Product Rails**: Horizontal scroll-snap product sliders with grab-and-drag interaction and arrow controls.
- **Lifestyle Lockups**: Editorial double-card lockups with gradient overlays and hover CTA reveals.
- **Brand Ticker**: Seamless infinite-scrolling marquee featuring top cycling brands.
- **Comprehensive Trust & Finance Sections**: 0% finance details, workshop build assurances, and newsletter discount capture.
- **Dedicated PLP & PDP Pages**: Full product listing with category filtering and interactive product detail pages with gallery and finance calculation.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite 5](https://vitejs.dev/)
- **3D & Graphics**: [Three.js](https://threejs.org/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/PeteCurrey/PeakBikes.RB.AG.V001.git
   cd PeakBikes.RB.AG.V001
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

---

## 📂 Project Structure

```
PeakBikes.AG.V001/
├── index.html                          # Entry HTML with typography preloads
├── package.json                        # Dependencies and scripts
├── tailwind.config.js                  # Peak Bikes + Red Bull design tokens
├── vite.config.js                      # Vite configuration
├── src/
│   ├── index.css                       # Global design system & animations
│   ├── main.jsx                        # React root entrypoint
│   ├── App.jsx                         # Main router & layout shell
│   ├── components/
│   │   ├── ThreeDCanScroll.jsx         # Interactive 3D WebGL scroll experience
│   │   ├── hero/
│   │   │   └── CinematicHero.jsx       # Multi-layer parallax scroll hero
│   │   ├── nav/
│   │   │   ├── Header.jsx              # Glassmorphism header
│   │   │   ├── MegaMenu.jsx            # Category mega menu
│   │   │   ├── MobileDrawer.jsx        # Slide-in mobile menu
│   │   │   └── SiteWideBanner.jsx      # Top promotional banner
│   │   ├── sections/
│   │   │   ├── BrandBar.jsx            # Auto-scrolling brand ticker
│   │   │   ├── PromoLockup.jsx         # 1+2 and 2+1 merchandising grids
│   │   │   ├── ProductSlider.jsx       # Draggable product rails
│   │   │   ├── LifestyleCardLockup.jsx # Editorial image pairs
│   │   │   ├── UspRibbon.jsx           # Infinite USP scroll strip
│   │   │   ├── FinanceBanner.jsx       # Service & finance trust blocks
│   │   │   └── NewsletterBanner.jsx    # Email incentive capture
│   │   ├── ui/
│   │   │   ├── Badge.jsx               # Product status badges
│   │   │   ├── Button.jsx              # Button variants
│   │   │   └── ProductCard.jsx         # E-commerce product card
│   │   └── footer/
│   │       └── Footer.jsx              # Complete e-commerce footer
│   ├── data/
│   │   ├── brands.js                   # Brand roster
│   │   ├── navigation.js               # Category & menu taxonomy
│   │   ├── products.js                 # Catalog & mock products
│   │   └── promos.js                   # Promo and lifestyle content
│   ├── pages/
│   │   ├── HomePage.jsx                # Full homepage assembly
│   │   ├── PlpPage.jsx                 # Product listing page
│   │   └── PdpPage.jsx                 # Product detail page
│   └── utils/
│       └── canTextureGenerator.js      # Procedural texture generator for Three.js
└── public/
    └── pb-favicon.svg                  # Brand favicon mark
```

---

## 📜 License

Private project. All rights reserved.
