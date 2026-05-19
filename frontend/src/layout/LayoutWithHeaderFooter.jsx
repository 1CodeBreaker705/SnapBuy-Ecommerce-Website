import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const LayoutWithHeaderFooter = () => {
  return (
     <div className='min-h-screen flex flex-col bg-white'>

      <Header />

      <main className='flex-1 w-full'>
        <Outlet />
      </main>

      <Footer />

    </div>
  )
}

export default LayoutWithHeaderFooter