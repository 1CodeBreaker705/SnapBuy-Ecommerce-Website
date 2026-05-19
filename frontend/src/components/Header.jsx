import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../zustand/authStore'
import { FiLogOut } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import Logo from './Logo';

const Header = () => {

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const logoutHandler = useAuthStore((s) => s.logout)

  return (

    <header className="w-full sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-200">
      {/* Mobile Navigation */}

        <div className='md:hidden border-t border-zinc-200 bg-white'>

          <div className='flex items-center justify-center gap-8 py-3 text-sm font-medium text-zinc-600'>

            <Link
              to="/"
              className='hover:text-black transition'
            >
              Home
            </Link>

            <Link
              to="/about"
              className='hover:text-black transition'
            >
              About
            </Link>

            {
              isAuthenticated && (
                <Link
                  to="/dashboard"
                  className='hover:text-black transition'
                >
                  Dashboard
                </Link>
              )
            }

          </div>

        </div>

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}

        <Logo/>

        {/* Nav */}

        <nav className="hidden md:flex items-center gap-10 text-base font-medium text-zinc-600">

          <Link
            to="/"
            className="hover:text-black transition"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="hover:text-black transition"
          >
            About
          </Link>

          {
            isAuthenticated && (
              <Link
                to="/dashboard"
                className="hover:text-black transition"
              >
                Dashboard
              </Link>
            )
          }

        </nav>

        {/* Auth */}

        <div>

          {
            isAuthenticated ? (

                  <button
                    onClick={logoutHandler}
                    className='flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl border border-zinc-300 hover:bg-zinc-100 transition cursor-pointer text-sm font-medium'
                  >
                    <FiLogOut className='text-lg' />

                    <span className='hidden sm:block'>
                      Logout
                    </span>

                  </button>

            ) : (

              <Link
                to="/login"
                className="px-5 py-2 rounded-xl bg-black text-white text-sm font-medium hover:opacity-90 transition"
              >
                Login
              </Link>

            )
          }

        </div>

      </div>

    </header>

  )
}

export default Header