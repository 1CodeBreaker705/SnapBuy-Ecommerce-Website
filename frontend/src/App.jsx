import React, { useEffect } from 'react'
import { Route,Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import LayoutWithHeaderFooter from './layout/LayoutWithHeaderFooter'
import RegisterPage from './pages/RegisterPage'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './zustand/authStore'
import Dashboard from './pages/Dashboard'
import CartPage from './pages/CartPage'
import LoaderComponent from './components/LoaderComponent'
import ProtectedLayout from './layout/ProtectedLayout'
import SidebarLayout from './layout/SideBarLayout'
import ProfilePage from './pages/ProfilePage'
import AddProductPage from './pages/MerchantProducts/AddProductPage'
import AllProductsPage from './pages/MerchantProducts/AllProductsPage'
import PublicProductPage from './pages/PublicProductPage'
import WishListPage from './pages/WishlistPage'
import RoleProtectedLayout from './layout/RoleProtectedLayout'
import CheckoutPage from './pages/CheckoutPage'
import CheckoutSuccessPage from './pages/CheckoutPage/SuccessPage'
import CheckoutFailedPage from './pages/CheckoutPage/FailedPage'
import AboutPage from './pages/AboutPage'
import CustomerOrdersPage from './pages/CustomerOrdersPage'
import MerchantOrdersPage from './pages/MerchantOrdersPage'
import ScrollToTopButton from './components/ScrollToTopButton'
import UpdateProductPage from './pages/MerchantProducts/UpdateProductPage'

const App = () => {
  const loading=useAuthStore((s)=>s.loading)
  const fetchUserDetails = useAuthStore((s) => s.fetchUserDetails)
  useEffect(() => {
    fetchUserDetails()
  }, [])
  
  if(loading){
    return(
    <>
     <div className='min-h-screen flex items-center justify-center'>
      <LoaderComponent/>
     </div>
    </>
    ) 
  }

  return (
    <>
      <Toaster position="bottom-right"/>
      <ScrollToTopButton/>
      <Routes>
        <Route element={<LayoutWithHeaderFooter/>}>
          <Route path='/' Component={HomePage} />
          <Route path='/product/:slug' Component={PublicProductPage} />
          <Route path='/about' Component={AboutPage} />
        </Route>
        <Route path='/login' Component={LoginPage} />
        <Route path='/register' Component={RegisterPage} />
        <Route element={<ProtectedLayout/>}>
          <Route element={<SidebarLayout/>}>
            <Route path='/dashboard' Component={Dashboard}/>
            <Route path='/profile' Component={ProfilePage}/>
            <Route element={<RoleProtectedLayout role="customer" />}>
               <Route path='/cart' Component={CartPage}/>
               <Route path='/orders' Component={CustomerOrdersPage}/>
               <Route path='/wishlist' Component={WishListPage}/>
               <Route path='/checkout' Component={CheckoutPage}/>
               <Route path='/checkout/success' Component={CheckoutSuccessPage}/>
               <Route path='/checkout/failed' Component={CheckoutFailedPage}/>
            </Route>
            <Route element={<RoleProtectedLayout role="merchant" />}>
               <Route path='/add-product' Component={AddProductPage}/>
               <Route path='/all-products' Component={AllProductsPage}/>
               <Route path='/update-product/:id' Component={UpdateProductPage}/>
               <Route path='/merchant-orders' Component={MerchantOrdersPage}/> 
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
