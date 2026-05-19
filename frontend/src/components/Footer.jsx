import React from 'react'
import { Link } from 'react-router-dom'
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter
} from 'react-icons/fa'

import { useAuthStore } from '../zustand/authStore'

const Footer = () => {

  const user = useAuthStore((s) => s.user)

  return (

    <footer className='w-full bg-black text-white mt-20'>

      <div className='max-w-7xl mx-auto px-6 py-12'>

        {/* Top Section */}

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>

          {/* Brand */}

          <div>

            <h1 className='text-3xl font-bold'>
              SnapBuy
            </h1>

            <p className='text-zinc-400 mt-4 leading-relaxed'>
              Discover modern shopping with fast delivery,
              secure payments, and seamless user experience.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h2 className='text-lg font-semibold mb-4'>
              Quick Links
            </h2>

            <div className='flex flex-col gap-3 text-zinc-400 text-sm'>

              <Link
                to="/"
                className='hover:text-white transition'
              >
                Home
              </Link>

              <Link
                to="/about"
                className='hover:text-white transition'
              >
                About
              </Link>

              {
                user && (
                  <>
                    <Link
                      to="/dashboard"
                      className='hover:text-white transition'
                    >
                      Dashboard
                    </Link>

                    <Link
                      to="/profile"
                      className='hover:text-white transition'
                    >
                      Profile
                    </Link>
                  </>
                )
              }

            </div>

          </div>

          {/* Account */}

          <div>

            <h2 className='text-lg font-semibold mb-4'>
              Account
            </h2>

            <div className='flex flex-col gap-3 text-zinc-400 text-sm'>

              {/* Logged Out */}

              {
                !user && (
                  <>
                    <Link
                      to="/login"
                      className='hover:text-white transition'
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      className='hover:text-white transition'
                    >
                      Signup
                    </Link>
                  </>
                )
              }

              {/* Customer */}

              {
                user?.role === "customer" && (
                  <>

                    <Link
                      to="/cart"
                      className='hover:text-white transition'
                    >
                      Cart
                    </Link>

                    <Link
                      to="/orders"
                      className='hover:text-white transition'
                    >
                      Orders
                    </Link>

                    <Link
                      to="/wishlist"
                      className='hover:text-white transition'
                    >
                      Wishlist
                    </Link>

                  </>
                )
              }

              {/* Merchant */}

              {
                user?.role === "merchant" && (
                  <>

                    <Link
                      to="/add-product"
                      className='hover:text-white transition'
                    >
                      Add Product
                    </Link>

                    <Link
                      to="/all-products"
                      className='hover:text-white transition'
                    >
                      All Products
                    </Link>

                    <Link
                      to="/merchant-orders"
                      className='hover:text-white transition'
                    >
                      Merchant Orders
                    </Link>

                  </>
                )
              }

            </div>

          </div>

          {/* Social */}

          <div>

            <h2 className='text-lg font-semibold mb-4'>
              Connect
            </h2>

            <p className='text-zinc-400 text-sm mb-5'>
              Follow SnapBuy on social platforms.
            </p>

            <div className='flex items-center gap-5 text-2xl text-zinc-400'>

              <a
                href="#"
                className='hover:text-white transition'
              >
                <FaGithub />
              </a>

              <a
                href="#"
                className='hover:text-blue-400 transition'
              >
                <FaLinkedin />
              </a>

            </div>

          </div>

        </div>

        {/* Bottom Section */}

        <div className='border-t border-zinc-800 mt-10 pt-5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500'>

          <p>
            © 2026 SnapBuy. All rights reserved.
          </p>

          <p>
            Built with React, FastAPI & MongoDB
          </p>

        </div>

      </div>

    </footer>

  )
}

export default Footer