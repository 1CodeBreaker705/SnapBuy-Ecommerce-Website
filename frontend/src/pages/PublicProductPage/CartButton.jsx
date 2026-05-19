
import React, { useEffect, useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { CART_OPERATIONS } from '../../constant/CartOperations'
import { useAuthStore } from '../../zustand/authStore'
import toast from 'react-hot-toast'
import { axiosClient } from '../../utils/axiosClient'
import { RiCloseLargeFill } from "react-icons/ri";


const CartButton = ({product_id}) => {

    const isAuthenticated=useAuthStore((s)=>s.isAuthenticated)
    const user=useAuthStore((s)=>s.user)
    const [qty,setQty] = useState(0)
    const navigate = useNavigate()
    const [loading,setLoading] = useState(true)

    const fetchCartStatus=async()=>{
        try {
            const response = await axiosClient.get("/cart/get/"+product_id)
            const data = response.data 
            setQty(data.qty)
        } catch (error) {
            toast.error(error?.response?.data?.detail || error.message)
        }finally{
            setLoading(false)
        }
    }
    
    const addCart=async()=>{
            if(!isAuthenticated){
                  navigate("/login")
                  toast("Login Required",{icon:'ℹ️'})
                  return
            }

            if(user?.role !== 'customer'){
                  toast("Login With Buyer Account",{icon:'ℹ️'})
                  return
            }

            try{
                const response =await axiosClient.post("/cart/add",{product_id:product_id})
                const data = response.data 
                toast.success(data.msg)
                await fetchCartStatus()
            
            }catch(e){
                toast.error(e?.response?.data?.detail || e.message)
            }
    }
   
    const cartOperation=async(operation='')=>{
        try {
            
            const response = await axiosClient.put(`/cart/product/${product_id}/${operation}`,{})
            const data = response.data 
            toast.success(data.msg)
            await fetchCartStatus()

        } catch (e) {
                toast.error(e?.response?.data?.detail || e.message)
            
        }
    }
 

    useEffect(()=>{
        if(isAuthenticated && user?.role === 'customer'){
            fetchCartStatus()
        }
        else {
           setQty(0)
           setLoading(false)
        }
    },[isAuthenticated])


  return (
    <>
          {qty>0 ? 
                                      <div className="flex flex-wrap items-center gap-3 lg:ml-auto">

                                              <div className="text-white bg-white border-0 rounded flex flex-wrap items-center gap-2">

                                                <button
                                                  onClick={()=>cartOperation(CART_OPERATIONS.decrement)}
                                                  className='px-3 py-2 bg-blue-500 hover:cursor-pointer rounded hover:bg-blue-400 transition-all'
                                                >
                                                  <FaMinus/>
                                                </button>

                                                <span className='block py-2 px-5 text-black font-medium bg-gray-200 rounded'>
                                                  {qty}
                                                </span>

                                                <button
                                                  onClick={()=>cartOperation(CART_OPERATIONS.increment)}
                                                  className='px-3 py-2 bg-blue-500 hover:cursor-pointer rounded hover:bg-blue-400 transition-all'
                                                >
                                                  <FaPlus/>
                                                </button>

                                                <button
                                                  onClick={()=>cartOperation(CART_OPERATIONS.delete)}
                                                  className='px-3 py-2 bg-red-500 hover:cursor-pointer rounded hover:bg-red-400 transition-all'
                                                >
                                                  <RiCloseLargeFill/>
                                                </button>

                                              </div>

                                              <Link
                                                to='/cart'
                                                className="text-white bg-black py-2 px-6 rounded hover:bg-gray-800 transition-all"
                                              >
                                                Checkout
                                              </Link>

                                        </div>
          : <button disabled={loading} onClick={addCart} className="lg:ml-auto flex text-white bg-black hover:bg-gray-800 cursor-pointer border-0 py-2 px-6 focus:outline-none transition-all rounded">Cart</button>}
    </>
  )
}

export default CartButton