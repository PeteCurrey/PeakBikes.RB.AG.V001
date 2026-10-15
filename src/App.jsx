import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/nav/Header.jsx'
import Footer from './components/footer/Footer.jsx'
import CartDrawer from './components/cart/CartDrawer.jsx'
import SearchModal from './components/search/SearchModal.jsx'
import QuickViewModal from './components/ui/QuickViewModal.jsx'
import { CartProvider } from './context/CartContext.jsx'
import HomePage from './pages/HomePage.jsx'
import PlpPage from './pages/PlpPage.jsx'
import PdpPage from './pages/PdpPage.jsx'

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
        <Routes>
          <Route path="/" element={
            <Layout>
              <HomePage />
            </Layout>
          } />
          <Route path="/bikes" element={
            <Layout>
              <PlpPage title="All Mountain Bikes" />
            </Layout>
          } />
          <Route path="/bikes/mountain" element={
            <Layout>
              <PlpPage title="Mountain Bikes" />
            </Layout>
          } />
          <Route path="/bikes/full-suspension" element={
            <Layout>
              <PlpPage title="Full Suspension Mountain Bikes" />
            </Layout>
          } />
          <Route path="/bikes/hardtail" element={
            <Layout>
              <PlpPage title="Hardtail Mountain Bikes" />
            </Layout>
          } />
          <Route path="/bikes/downhill" element={
            <Layout>
              <PlpPage title="Downhill & Gravity Mountain Bikes" />
            </Layout>
          } />
          <Route path="/bikes/electric" element={
            <Layout>
              <PlpPage title="Electric Mountain Bikes (e-MTB)" />
            </Layout>
          } />
          <Route path="/bikes/kids" element={
            <Layout>
              <PlpPage title="Youth & Junior Mountain Bikes" />
            </Layout>
          } />
          <Route path="/products/:slug" element={
            <Layout>
              <PdpPage />
            </Layout>
          } />
          <Route path="/clothing" element={
            <Layout>
              <PlpPage title="Clothing" />
            </Layout>
          } />
          <Route path="/helmets" element={
            <Layout>
              <PlpPage title="Helmets" />
            </Layout>
          } />
          <Route path="/accessories" element={
            <Layout>
              <PlpPage title="Accessories" />
            </Layout>
          } />
          <Route path="/components" element={
            <Layout>
              <PlpPage title="Components" />
            </Layout>
          } />
          <Route path="/sale" element={
            <Layout>
              <PlpPage title="Sale" />
            </Layout>
          } />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}
