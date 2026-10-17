import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/nav/Header.jsx'
import Footer from './components/footer/Footer.jsx'
import CartDrawer from './components/cart/CartDrawer.jsx'
import SearchModal from './components/search/SearchModal.jsx'
import QuickViewModal from './components/ui/QuickViewModal.jsx'
import ScrollToTop from './components/common/ScrollToTop.jsx'
import { CartProvider } from './context/CartContext.jsx'
import HomePage from './pages/HomePage.jsx'
import PlpPage from './pages/PlpPage.jsx'
import PdpPage from './pages/PdpPage.jsx'
import InfoPage from './pages/InfoPage.jsx'
import BrandsPage from './pages/BrandsPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-pb-black">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      {/* Global Interactive Overlays */}
      <CartDrawer />
      <SearchModal />
      <QuickViewModal />
    </div>
  )
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Home */}
          <Route path="/" element={
            <Layout>
              <HomePage />
            </Layout>
          } />

          {/* Bikes & Subcategories */}
          <Route path="/bikes" element={
            <Layout>
              <PlpPage title="All Mountain Bikes" />
            </Layout>
          } />
          <Route path="/bikes/:subcat" element={
            <Layout>
              <PlpPage />
            </Layout>
          } />

          {/* Product Detail Page */}
          <Route path="/products/:slug" element={
            <Layout>
              <PdpPage />
            </Layout>
          } />

          {/* Components & Subcategories */}
          <Route path="/components" element={
            <Layout>
              <PlpPage title="MTB Components" category="Components" />
            </Layout>
          } />
          <Route path="/components/:subcat" element={
            <Layout>
              <PlpPage />
            </Layout>
          } />

          {/* Clothing & Subcategories */}
          <Route path="/clothing" element={
            <Layout>
              <PlpPage title="MTB Trail Clothing" category="Clothing" />
            </Layout>
          } />
          <Route path="/clothing/:subcat" element={
            <Layout>
              <PlpPage />
            </Layout>
          } />

          {/* Helmets & Subcategories */}
          <Route path="/helmets" element={
            <Layout>
              <PlpPage title="MTB Helmets & Protection" category="Helmets" />
            </Layout>
          } />
          <Route path="/helmets/:subcat" element={
            <Layout>
              <PlpPage />
            </Layout>
          } />

          {/* Accessories & Subcategories */}
          <Route path="/accessories" element={
            <Layout>
              <PlpPage title="MTB Trail Accessories" category="Accessories" />
            </Layout>
          } />
          <Route path="/accessories/:subcat" element={
            <Layout>
              <PlpPage />
            </Layout>
          } />

          {/* Clearance & Sale */}
          <Route path="/sale" element={
            <Layout>
              <PlpPage title="Clearance & Deals" saleOnly={true} />
            </Layout>
          } />

          {/* Brands Directory & Brand Products */}
          <Route path="/brands" element={
            <Layout>
              <BrandsPage />
            </Layout>
          } />
          <Route path="/brands/:brandSlug" element={
            <Layout>
              <PlpPage />
            </Layout>
          } />

          {/* Utility & Informational Guides */}
          <Route path="/finance" element={
            <Layout>
              <InfoPage pageType="finance" />
            </Layout>
          } />
          <Route path="/cycle-to-work" element={
            <Layout>
              <InfoPage pageType="cycle-to-work" />
            </Layout>
          } />
          <Route path="/advice" element={
            <Layout>
              <InfoPage pageType="advice" />
            </Layout>
          } />
          <Route path="/help" element={
            <Layout>
              <InfoPage pageType="help" />
            </Layout>
          } />

          {/* 404 Fallback */}
          <Route path="*" element={
            <Layout>
              <NotFoundPage />
            </Layout>
          } />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}
