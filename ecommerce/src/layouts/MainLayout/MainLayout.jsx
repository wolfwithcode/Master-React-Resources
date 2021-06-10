import React from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'

export default function MainLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
