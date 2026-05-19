import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { CiShoppingCart ,CiHeart ,CiBoxes } from 'react-icons/ci'
import { MdOutlineShoppingBag } from "react-icons/md";
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../zustand/authStore';
import { axiosClient } from '../../utils/axiosClient';
import toast from 'react-hot-toast';
import LoaderComponent from '../../components/LoaderComponent';

const Dashboard = () => {
  
  const [loading,setLoading]=useState(true)
  const user=useAuthStore((s)=>s.user)

  const [dashboardData,setDashboardData] = useState({
    cart_length:0,
    customer_orders_length:0,
    wishlist_length:0,
    products_length:0,
    merchant_orders_length:0,
  })


  const fetchDashboardDetails=async()=>{
    try {
      const response = await axiosClient.get("/dashboard")
      const res = response.data 
      setDashboardData(res)
    } catch (error) {
      toast.error(error?.response?.data?.detail || error.message)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
     fetchDashboardDetails()
  },[])


  const data = [
    {
      title: "Cart",
      Icon: CiShoppingCart,
      value: dashboardData.cart_length,
      for: 'customer',
      classname: "bg-gradient-to-br from-purple-500 to-purple-700",
      link: "/cart"
    },
    {
      title: "Wishlist",
      Icon: CiHeart,
      value: dashboardData.wishlist_length,
      for: 'customer',
      classname: "bg-gradient-to-br from-red-500 to-pink-600",
      link: '/wishlist'

    },
    {
      title: "Orders",
      Icon: MdOutlineShoppingBag,
      value: dashboardData.customer_orders_length,
      for: 'customer',
      classname: "bg-gradient-to-br from-zinc-700 to-black",
      link: "/orders"

    },
    {
      title: "Products",
      Icon: CiBoxes,
      value: dashboardData.products_length,
      for: 'merchant',
      classname: "bg-gradient-to-br from-blue-500 to-cyan-600",
      link: "/all-products"
    },
     {
      title: "Orders",
      Icon: MdOutlineShoppingBag,
      value: dashboardData.merchant_orders_length,
      for: 'merchant',
      classname: "bg-gradient-to-br from-zinc-700 to-black",
      link: "/merchant-orders"
    },
  ]

  
  if(loading){
    return <div className="w-full flex items-center justify-center min-h-54">
      <LoaderComponent/>
    </div>
  }


  return (
              <div className='w-full py-8'>

      {/* Header */}

      <div className='mb-10'>
        <h1 className='text-4xl font-bold text-zinc-800'>
          Dashboard
        </h1>

        <p className='text-zinc-500 mt-2 text-lg'>
          Welcome back, {user?.name}
        </p>
      </div>

      {/* Stats Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {
          data
            .filter((cur) => cur.for === user?.role)
            .map((cur, i) => {

              return (

                <Link
                  to={cur.link}
                  key={i}
                  className='group relative overflow-hidden rounded-3xl bg-white border border-zinc-100 p-5 md:p-6 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300'
                >

                  {/* Background Glow */}

                  <div className='absolute top-0 right-0 w-28 h-28 bg-zinc-100 rounded-full blur-3xl opacity-40 group-hover:scale-150 transition-all duration-500'></div>

                  {/* Card Content */}

                  <div className='relative flex items-center justify-between'>

                    <div>

                      <p className='text-zinc-500 font-medium text-sm md:text-sm tracking-wide uppercase'>
                        {cur.title}
                      </p>

                      <h2 className='text-5xl font-bold text-zinc-800 mt-3'>
                        {cur.value}
                      </h2>

                    </div>

                    <div
                      className={clsx(
                        'text-white text-3xl md:text-5xl p-3 md:p-4 rounded-2xl shadow-lg',
                        cur.classname
                      )}
                    >
                      <cur.Icon />
                    </div>

                  </div>

                </Link>

              )

            })
        }

      </div>

      {/* Quick Actions */}

      <div className='mt-12'>

        <h2 className='text-2xl font-bold text-zinc-800 mb-5'>
          Quick Actions
        </h2>

        <div className='flex flex-wrap gap-4'>

          {
            user?.role === 'customer' && (
              <>
                <Link
                  to="/"
                  className='px-6 py-3 rounded-xl bg-black text-white hover:opacity-90 transition'
                >
                  Continue Shopping
                </Link>

                <Link
                  to="/cart"
                  className='px-6 py-3 rounded-xl border border-zinc-300 hover:bg-zinc-100 transition'
                >
                  View Cart
                </Link>

                <Link
                  to="/orders"
                  className='px-6 py-3 rounded-xl border border-zinc-300 hover:bg-zinc-100 transition'
                >
                  Track Orders
                </Link>
              </>
            )
          }

          {
            user?.role === 'merchant' && (
              <>
                <Link
                  to="/add-product"
                  className='px-6 py-3 rounded-xl bg-black text-white hover:opacity-90 transition'
                >
                  Add Product
                </Link>

                <Link
                  to="/all-products"
                  className='px-6 py-3 rounded-xl border border-zinc-300 hover:bg-zinc-100 transition'
                >
                  Manage Products
                </Link>

                <Link
                  to="/orders"
                  className='px-6 py-3 rounded-xl border border-zinc-300 hover:bg-zinc-100 transition'
                >
                  View Orders
                </Link>
              </>
            )
          }

        </div>

      </div>

    </div>
  )
}

export default Dashboard