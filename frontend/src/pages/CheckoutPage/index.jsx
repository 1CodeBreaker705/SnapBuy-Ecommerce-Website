import React, { useEffect, useState } from 'react'
import AddAdressModel from '../ProfilePage/components/AddAddressModal'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { ENVConstants } from '../../constant/Env.Constants'
import { useAuthStore } from '../../zustand/authStore'
import { axiosClient } from '../../utils/axiosClient'
import toast from 'react-hot-toast'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import LoaderComponent from '../../components/LoaderComponent'
import { Country, State } from "country-state-city"


const CheckoutPage = () => {
    const [loading,setLoading] = useState(true)
    const user = useAuthStore((s)=>s.user)
    const [cartData,setCartData] = useState(null)

    const checkoutSchema = z.object({
      phone_no: z.string().trim().length(10, "Phone number must be exactly 10 digits").regex(/^[0-9]+$/, "Only digits allowed"),
      address_id: z.string().trim().min(1, "Address is required")
    })
  
    const {
      register,
      handleSubmit,
      setValue,
      watch,
      reset,
      formState:{ errors, isSubmitting }
    } = useForm({
      resolver: zodResolver(checkoutSchema),
      defaultValues:{
        name:user?.name || "",
        email:user?.email || "",
        address_id:"",
        phone_no:user?.phone_no || ""
      }
    })

    const selectedAddress = watch("address_id")

    const fetchAllProducts = async()=>{
        try {
          const response =await axiosClient.get("/cart/get")
          const data =response.data 
          setCartData(data)
        
        }catch (error) {
          toast.error(error?.response?.data?.detail || error.message)
        }finally{
        setLoading(false)
       }
     }
    
      const onSubmitHandler= async(values)=>{
        try {
            const response = await axiosClient.post("/checkout",{"phone_no":values.phone_no,"address_id":values.address_id})
            const data = response.data 
            //razarpay checkout
            const options = {
            key: ENVConstants.VITE_APP_RAZORPAY_KEY_ID,
            amount: data.amount,
            currency: "INR",
            name: 'Dev With Ranjan',
            description: 'SnapBuy Payments',
            order_id: data.id,
            callback_url: `${ENVConstants.VITE_APP_BACKEND_URI}/api/v1/checkout/callback`,
            prefill: {
                name: user.name,
                email: user.email,
                contact: values.phone_no
            },
            theme: {
                color: '#000000',
            },
            modal: {
                  ondismiss: function () {}
              }
          
        }; 

        const rzp = new window.Razorpay(options); 
        rzp.on('payment.failed', async function () {

              try {

                  await axiosClient.patch(
                      '/checkout/payment-failed',
                      {
                          razorpay_order_id: data.id
                      }
                  )

              } catch (error) {
                  console.log(error)
              }

              window.location.href = "/checkout/failed"
          })
        rzp.open();
        reset()
            
        } catch (error) {
                toast.error(error?.response?.data?.detail || error.message)
        }
      } 
    
      useEffect(()=>{
        fetchAllProducts()
      },[])

      if(loading){
        return <div className='min-h-44 flex items-center justify-center'>
            <LoaderComponent/>
             </div>
      }



  return (
    <>
<section className="bg-white py-8 antialiased container  md:py-16">
 
            {cartData?.total ==0?<>
            
                <h4 className='text-3xl font-bold text-center'>No Item In Cart</h4>
            </>
            :  
            <>
   <form onSubmit={handleSubmit(onSubmitHandler)} className="mx-auto px-4 2xl:px-0">
    <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
      <div className="sm:p-6 lg:p-10 flex-1 space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 ">Delivery Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* NAME */}
            <div className='col-span-1 md:col-span-2'>
            <div>
              <label htmlFor="your_name" className="mb-2 block text-sm font-medium text-gray-900 "> Your name </label>
              <input disabled {...register("name")} type="text" id="your_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder="Bonnie Green" required  />
            </div>
            </div>
            {/* EMAIL */}
            <div className='col-span-1 md:col-span-2'>
            <div>
              <label htmlFor="your_email" className="mb-2 block text-sm font-medium text-gray-900 "> Your email* </label>
              <input disabled {...register("email")} type="email" id="your_email" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 " placeholder="name@flowbite.com" required />
            </div>
            </div>
            {/* NUMBER */}
            <div className='col-span-1 md:col-span-2'>
             <div>
              <label htmlFor="your_phone" className="mb-2 block text-sm font-medium text-gray-900 "> Your Phone* </label>
               <div className='w-full flex items-center rounded-lg border border-gray-300 bg-gray-50 overflow-hidden focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500'>
                <span className='px-3 text-sm text-gray-500 border-r border-gray-300'>
                  +91
                </span>
                <input
                  disabled={isSubmitting}
                  {...register("phone_no")}
                  id="your_phone"
                  type="text"
                  maxLength={10}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "")
                  }}
                  className="w-full bg-transparent p-2.5 text-sm text-gray-900 outline-none"
                  placeholder="xxxxxxxxxx"
                />
              </div>
              {errors.phone_no && (
                <p className='text-red-500 text-sm'>
                  {errors.phone_no.message}
                </p>
              )}
            </div>
      
                
            </div> 
                  {/* ADDRESS */}
                   <div className="col-span-1 md:col-span-2  w-full">
                     {
                        user?.address && user.address.map((cur,i)=>{
                            return <div
                            onClick={()=>{
                                setValue('address_id',cur.address_id)
                            }}
                            className='w-full border border-gray-300 bg-gray-50 py-4 mb-3 px-4 rounded-xl flex items-center justify-between' key={i} >
                                <div className="flex flex-col">
                                     <h5 className='text-base sm:text-lg font-semibold'>Address {i+1}</h5>
                                   <p className="text-sm sm:text-base text-zinc-600 break-words leading-6">
                                    { (()=>{
                                        const countryName = Country.getCountryByCode(cur.country)?.name
                                        const stateName =State.getStateByCodeAndCountry(cur.state,cur.country)?.name
                                        return  [
                                              cur.landmark,
                                              cur.district,
                                              stateName,
                                              `${countryName}-${cur.pin_code}`
                                            ]
                                            .filter(Boolean)
                                            .join(", ")
                                      })()
                                    } 
                              </p>
                                </div>
                                    <span
                                      className={clsx(
                                        "w-4 h-4 md:h-6 md:w-6 rounded-full flex-shrink-0",
                                        cur.address_id === selectedAddress
                                          ? "bg-blue-500 p-1 outline-1 outline-blue-500 border-2 border-white"
                                          : "bg-transparent border-2 border-black"
                                      )}
                                    ></span>
                            </div>
                        })
                    }
                   </div>

            <div className="col-span-1 md:col-span-2">
                <AddAdressModel  className={'flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 cursor-pointer bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 hover:cursor-pointer'} text='Add New Address' />
                {errors.address_id && (
                      <p className='text-red-500 text-sm'>
                      {errors.address_id.message}
                      </p>
                )}
            </div>
          </div>
        </div>
    </div>

      <div className="mt-6 p-4 sm:p-6 lg:p-10 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
        <div className="flow-root">
          <div className="-my-3 divide-y divide-gray-200 ">
            <dl  className="flex items-center justify-between gap-4 py-3">
                 <dt className="text-base font-normal text-gray-500 ">View Cart</dt>
                 <dd className="text-base font-medium text-gray-900 ">
                    <Link to={'/cart'}>Cart</Link>
                 </dd>
            </dl>
            <dl className="flex items-center justify-between gap-4 py-3">
              <dt className="text-base font-normal text-gray-500 ">Subtotal</dt>
              <dd className="text-base font-medium text-gray-900 ">&#8377;{cartData.total}</dd>
            </dl>
            <dl className="flex items-center justify-between gap-4 py-3">
              <dt className="text-base font-normal text-gray-500 ">Discounts</dt>
              <dd className="text-base font-medium text-green-500">0</dd>
            </dl>
            <dl className="flex items-center justify-between gap-4 py-3">
              <dt className="text-base font-normal text-gray-500 ">Delivery Fee</dt>
              <dd className="text-base font-medium text-gray-900 ">0</dd>
            </dl>
            <dl className="flex items-center justify-between gap-4 py-3">
              <dt className="text-base font-normal text-gray-500 ">Tax</dt>
              <dd className="text-base font-medium text-gray-900 ">0</dd>
            </dl>
            <dl className="flex items-center justify-between gap-4 py-3">
              <dt className="text-base font-bold text-gray-900 ">Total</dt>
              <dd className="text-base font-bold text-gray-900 ">&#8377;{cartData.total}</dd>
            </dl>
            <dl className='w-full'>
                <button disabled={isSubmitting} type='submit' className="py-2 text-white rounded-md text-center w-full bg-blue-500 hover:bg-blue-600 transition-all cursor-pointer">
                    Pay
                </button>
            </dl>
          </div>
        </div>
      
      </div>
    </div>
  </form>
  </>              
}

</section>

    </>
  )
}

export default CheckoutPage
