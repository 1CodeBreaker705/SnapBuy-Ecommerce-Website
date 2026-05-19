import clsx from 'clsx'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { axiosClient } from '../../utils/axiosClient'
import LoaderComponent from '../../components/LoaderComponent'
import { Link } from 'react-router-dom'
import noOrders from '../../assets/noOrders.png'

const MerchantOrdersPage = () => {


  const [loading,setLoading] = useState(true)
  const[ orders,setOrders ] = useState([])
  const [updating,setUpdating] = useState(false)
  
  const updateStatus = async (
   order_id,
   product_id,
   fulfillment_status
  ) => {

   try {
      setUpdating(true)
      await axiosClient.patch("/merchant-orders/fulfilment_status",
         {
            order_id,
            product_id,
            fulfillment_status
         }
      )

      toast.success("Status Updated")

      fetchAllOrders()

   } catch (error) {

      toast.error(
         error?.response?.data?.detail ||
         error.message
      )
   }finally{
    setUpdating(false)
   }
}

  const fetchAllOrders=async()=>{
    try {
      const response = await axiosClient.get("/merchant-orders")
      const res = response.data 
      setOrders(res)

    } catch (error) {
      toast.error(error?.response?.data?.detail || error.message)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchAllOrders()
  },[])


  if(loading){
    return <div className="w-full flex items-center justify-center min-h-54">
      <LoaderComponent/>
    </div>
  }

  if (orders?.length === 0) {
    return (
      <div className='w-full min-h-[70vh] flex flex-col items-center justify-center px-4'>
  
        <img
          src={noOrders}
          alt='empty'
          className='w-52 md:w-60 object-contain'
        />
  
        <h1 className='text-3xl md:text-4xl text-center font-bold text-gray-700 -mt-1'>
          No Orders Yet
        </h1>
  
      </div>
    )
  }

  return (
    <>

          <div className="w-full max-w-6xl mx-auto py-10 flex flex-col gap-y-6">
                  
                          <div className="mb-2">

                            <h1 className="text-3xl md:text-4xl font-bold text-black">
                              My Orders
                            </h1>

                            <p className="text-zinc-500 mt-2">
                              Track and manage all your purchases.
                            </p>

                          </div>

                  {
                    orders?.length>0 && orders.map((cur,i)=>{
                      return     <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300">

                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                            <p>
                              <span className="px-3 rounded py-1 uppercase border text-green-700 bg-green-100 border-green-200">
                                {cur.order_receipt}
                              </span>
                            </p>

                            <p className='flex items-center justify-start gap-x-1'>

                              <span
                                className={clsx(
                                  "w-3 h-3 block rounded-full",
                                  cur.order_status === "completed"
                                    ? "bg-green-700 animate-pulse"
                                    : "bg-yellow-500"
                                )}
                              ></span>

                              <span className='uppercase font-medium'>
                                {cur.order_status}
                              </span>
                            </p>
                          </div>
                              
          

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-2 xl:grid-cols-4 py-10">


            {
             
                        cur.products.map((product,i)=>{
                    return (

                              <div
                                key={i}
                                className='p-3 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-2 hover:border-black hover:bg-white hover:-translate-y-1 transition-all duration-300'
                              >

                                <Link to={`/product/${product.slug}`}>

                                  <img
                                    src={product.image}
                                    alt={`image${i}`}
                                    className='w-full h-28 object-contain bg-white rounded-lg p-2'
                                  />

                                  <h4 className="font-semibold text-sm mt-3 leading-5">

                                    {
                                      product.title.length > 40
                                      ? product.title.substring(0,40) + "..."
                                      : product.title
                                    }

                                  </h4>
                                      <div className="mt-3">

                                        <div className="flex items-center justify-between">

                                          <p className="text-sm font-semibold">
                                            ₹ {product.price}
                                          </p>

                                          <p className="text-xs text-zinc-500">
                                            Qty: {product.qty}
                                          </p>

                                        </div>

                                        <p className="text-sm font-bold mt-1">
                                          ₹ {product.price * product.qty}
                                        </p>

                                      </div>

                                </Link>

                                <select
                                  disabled={updating}
                                  value={product.fulfillment_status}
                                  onChange={(e)=>
                                    updateStatus(
                                      cur.order_id,
                                      product._id,
                                      e.target.value
                                    )
                                  }
                                  className="mt-3 w-full border rounded-lg p-2 text-sm"
                                >

                                  <option value="pending">
                                    Pending
                                  </option>

                                  <option value="shipped">
                                    Shipped
                                  </option>

                                  <option value="out_for_delivery">
                                    OutForDelivery
                                  </option>

                                  <option value="delivered">
                                    Delivered
                                  </option>

                                  <option value="cancelled">
                                    Cancelled
                                  </option>

                                </select>

                              </div>

                            )
                          })
            }

              </div>




  <p className='text-end'><span className="text-zinc-900 text-sm ">
                {moment(cur.created_at).format("LLL")}</span></p>
                    

              </div>
                    })
                  }


          </div>

    </>
  )
}

export default MerchantOrdersPage



