import React from 'react'
import { Link } from 'react-router-dom'
import { FiLogOut } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const Logo = () => {
  return (
    <>
          <Link to="/" className='flex items-center gap-2'>
              <div className='p-2 rounded-xl bg-black text-white'>
                  <HiOutlineShoppingBag className='text-2xl' />
              </div>
              <h1 className='text-2xl font-bold text-zinc-800'>
                  SnapBuy
              </h1>
          </Link>
    </>
  )
}

export default Logo