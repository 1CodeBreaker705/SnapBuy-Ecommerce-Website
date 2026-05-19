import React, { useEffect, useState } from 'react'
import CartItemCard from './components/CartItemCard'
import CartEmpty from '../../assets/emptyCart.png'
import { Link} from 'react-router-dom'
import { axiosClient } from '../../utils/axiosClient'
import LoaderComponent from '../../components/LoaderComponent'
import toast from 'react-hot-toast'

const CartPage = () => {

  const [loading,setLoading] = useState(true)
  const [cartData,setCartData] = useState(null)

  const fetchAllProducts = async()=>{
    try {
        const response =await axiosClient.get("/cart/get")
        const data = response.data 
        setCartData(data)
      } catch (error) {
        toast.error(error?.response?.data?.detail || error.message)
      }finally{
        setLoading(false)
      }
  }

  useEffect(()=>{
      fetchAllProducts()
  },[])


  if(loading){
    return <div className='flex items-center justify-center min-h-56 '>
      <LoaderComponent/>
    </div>
  }

  if(cartData?.products?.length===0){
    return <div className='flex flex-col items-center justify-center min-h-[70vh]'>
      <img src={CartEmpty} alt="Empty Cart" className='w-80 mx-auto' />
      <h4 className="text-center font-semibold text-4xl">No Item In Cart</h4>
      <div className="flex items-center justify-center pt-6">
        <Link to={'/'} className='px-3 mx-auto bg-black text-white rounded  py-1 inline-block text-lg'>Explore</Link>
      </div>
    </div>
  }

  return (
    <>
   <section className=" relative z-10">
  <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto relative z-10">
    <div className="grid grid-cols-12 py-10">
      <div className="col-span-12 xl:col-span-8 lg:pr-8  pb-8  w-full max-xl:max-w-3xl max-xl:mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-8 border-b border-gray-300">
          <h2 className=" font-bold text-2xl sm:text-3xl leading-10 text-black">Shopping Cart</h2>
          <h2 className=" font-bold text-xl leading-8 text-gray-600">{cartData?.products?.length} Items</h2>
        </div>
        <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
          <div className="col-span-12 md:col-span-7">
            <p className="font-normal text-lg leading-8 text-gray-400">Product Details</p>
          </div>
          <div className="col-span-12 md:col-span-5">
            <div className="grid grid-cols-5">
              <div className="col-span-3">
                <p className="font-normal text-lg leading-8 text-gray-400 text-center">Quantity</p>
              </div>
              <div className="col-span-2">
                <p className="font-normal text-lg leading-8 text-gray-400 text-center">Total</p>
              </div>
            </div>
          </div>
        </div>
      
          {
            cartData?.products?.length>0 && cartData.products.map((cur,i)=>{
                 return <CartItemCard key={i}  fetchAllProducts={fetchAllProducts} data={cur} />
            })
          }
      </div>
      <div className="col-span-12 xl:col-span-4 xl:pl-8">
        
        <div className="bg-gray-50 rounded-2xl p-6 sticky top-24 shadow-sm border border-gray-100">

          <h2 className="font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
            Order Summary
          </h2>

          <div className="mt-8">

            <div className="flex items-center justify-between pb-6">

              <p className="font-normal text-lg leading-8 text-black">
                {cartData?.products?.length} Items
              </p>

              <p className="font-medium text-lg leading-8 text-black">
                &#8377; {cartData?.total}
              </p>

            </div>

            <Link
              to={'/checkout'}
              className="
              rounded-xl hover:scale-[1.01]
              block bg-black py-3 px-4
              text-white text-sm font-semibold
              text-center transition-all duration-300
              hover:bg-black/80 w-full
              "
            >
              Checkout
            </Link>
          </div>
        </div>
   </div>          
 </div> 
</div>      
</section>

    
    </>
  )
}

export default CartPage