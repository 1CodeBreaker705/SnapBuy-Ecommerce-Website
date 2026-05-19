import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { NavLink } from 'react-router-dom';

import Logo from './Logo';

import { FiShoppingCart } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { GrLogout } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { FaBoxes } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";

import { useAuthStore } from '../zustand/authStore';
import { useSidebarStore } from '../zustand/sidebarStore';

const ReactProSidebar = () => {

  const logoutHandler = useAuthStore((s) => s.logout)

  const isToggled = useSidebarStore((s) => s.isToggled)
  const isCollapsed = useSidebarStore((s) => s.isCollapsed)

  const toggleMobile = useSidebarStore((s) => s.toggleMobile)
  const toggleCollapse = useSidebarStore((s) => s.toggleCollapse)

  const closeMobile = useSidebarStore((s) => s.closeMobile)

  const user = useAuthStore((s) => s.user)

  return (
   <div className="md:sticky md:top-0 md:h-screen">
    <div className="flex flex-col h-full min-h-screen">

      {/* Desktop collapse button */}

      <button
        onClick={toggleCollapse}
        className="
        hidden md:flex
        items-center justify-center
        h-16
        text-2xl
        text-gray-600
        bg-white
        cursor-pointer
        border-r
        border-b
        border-[#EFEFEF]
        hover:bg-gray-50
        transition
        "
      >
        <IoMenu />
      </button>

      {/* Mobile toggle button */}

      <button
        onClick={toggleMobile}
        className="
        md:hidden
        flex items-center justify-center
        h-16
        text-3xl
        text-gray-600
        bg-[#FBFBFB]
        cursor-pointer
        border-r
        border-b
        border-[#EFEFEF]
        "
      >
        <IoMenu />
      </button>

        <Sidebar
          toggled={isToggled}
          collapsed={isCollapsed}
          breakPoint="md"
          onBackdropClick={closeMobile}
          collapsedWidth='95px'
          backgroundColor='white'
          rootStyles={{
            borderRight: '1px solid #EFEFEF',
            height: '100%'
          }}
        >

        <Menu

        menuItemStyles={{

          button: {

            borderRadius: '10px',

            margin: '4px 10px',

            height: '48px',

            color: '#4B5563',

            transition: 'all 0.2s ease',

            '&:hover': {

              backgroundColor: '#F3F4F6',

            },

            '&.active': {

              backgroundColor: '#13395e',

              color: '#b6c8d9',

            },

          },

          label: {

            fontSize: '15px',

            fontWeight: 500,

          },

        }}
        >

          {/* Logo */}
          {
            !isCollapsed && (
              <div className='md:hidden flex justify-end px-4 pt-4'>

                <button
                  onClick={closeMobile}
                  className='text-3xl text-gray-500 hover:text-black transition cursor-pointer'
                >
                  ×
                </button>

              </div>
            )
          }

          <div className='mt-4 mb-6 px-9'>
            {
              isCollapsed
                ? null
                : <Logo />
            }
          </div>

          {/* Home */}

          <MenuItem
            icon={<IoHomeOutline className='text-xl' />}
            component={<NavLink to={'/'} end />}
            onClick={closeMobile}
          >
            Home
          </MenuItem>

          {/* Dashboard */}

          <MenuItem
            icon={<RxDashboard className='text-xl' />}
            component={<NavLink to={'/dashboard'} />}
            onClick={closeMobile}
          >
            Dashboard
          </MenuItem>

          {/* Profile */}

          <MenuItem
            icon={<FaRegUser className='text-xl' />}
            component={<NavLink to={'/profile'} />}
            onClick={closeMobile}
          >
            Profile
          </MenuItem>

          {/* Merchant */}

          {
            user?.role === "merchant" && (
             <>
              <SubMenu
                label='Products'
                icon={<FaBoxes className='text-xl' />}
              >

                <MenuItem
                  component={<NavLink to={'/add-product'} />}
                  onClick={closeMobile}
                >
                  Add Product
                </MenuItem>

                <MenuItem
                  component={<NavLink to={'/all-products'} />}
                  onClick={closeMobile}
                >
                  All Products
                </MenuItem>

              </SubMenu>
              
              <MenuItem
                  icon={<FiShoppingBag className='text-xl' />}
                  component={<NavLink to={'/merchant-orders'} />}
                  onClick={closeMobile}
                >
                  Orders
                </MenuItem>
            </>

            )
          }

          {/* Customer */}

          {
            user?.role === "customer" && (

              <>

                <MenuItem
                  icon={<FiShoppingCart className='text-xl' />}
                  component={<NavLink to={'/cart'} />}
                  onClick={closeMobile}
                >
                  Cart
                </MenuItem>

                <MenuItem
                  icon={<FiShoppingBag className='text-xl' />}
                  component={<NavLink to={'/orders'} />}
                  onClick={closeMobile}
                >
                  Orders
                </MenuItem>

                <MenuItem
                  icon={<FaRegHeart className='text-xl' />}
                  component={<NavLink to={'/wishlist'} />}
                  onClick={closeMobile}
                >
                  Wishlist
                </MenuItem>

              </>

            )
          }

          {/* Logout */}

          <MenuItem
            icon={<GrLogout className='text-xl' />}
            onClick={async () => {

              await logoutHandler()

              closeMobile()

            }}
          >
            Logout
          </MenuItem>

        </Menu>

      </Sidebar>

    </div>
</div>
  )
}

export default ReactProSidebar