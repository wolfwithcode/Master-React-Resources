import React from 'react'
import Footer from '../../components/Footer/Footer'
import HeaderCart from '../../components/HeaderCart/HeaderCart'

export default function CartLayout({ children }) {
  return (
    <div>
      <HeaderCart />
      {children}
      <Footer />
    </div>
  )
}
