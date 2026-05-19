import React, { useState } from 'react'
import Logo from '../../components/Logo'
import SubmitButton from '../../components/SubmitButton'
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5"
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from "zod"
import { axiosClient } from '../../utils/axiosClient';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../zustand/authStore';

const RegisterPage = () => {
  const fetchUserDetails=useAuthStore((s)=>s.fetchUserDetails)
  const navigate=useNavigate()
  const [hidePassword,setHidePassword]=useState(true)

  const ROLE_TYPE = Object.freeze({
  CUSTOMER: "customer",
  MERCHANT: "merchant",
});


  // ZOD SCHEMA
const registerSchema = z.object({
  name: z.string().trim().min(1, "Name is required").min(3, "Name must be at least 3 characters"),
  email: z.string().trim().min(1, "Email is required").email("Enter valid email"),
  phone_no: z.string().trim().length(10, "Phone number must be exactly 10 digits").regex(/^[0-9]+$/, "Phone number must contain digits only"),
  password: z.string().trim().min(1, "Password is required").min(6, "Minimum 6 characters"),
  role: z.enum(Object.values(ROLE_TYPE),{message: "Select a valid type",})
})

const {
  register,
  handleSubmit,
  reset,
  formState: { errors, isSubmitting }
} = useForm(
  {
    resolver: zodResolver(registerSchema),
     defaultValues:{
      role:'customer'
    }
  })

  const onSubmit = async (data) => {
    try {
      const response = await axiosClient.post("/auth/register",data)
      toast.success(response.data.msg)
      await fetchUserDetails()
      reset()
      navigate("/", { replace: true })
    } catch (err) {
       toast.error(err?.response?.data?.detail || err.message)
    }
  }
  
  return (
    <>
      <div className='min-h-[85vh] flex items-center justify-center'>
         <div className='w-[96%] lg:w-1/2 xl:w-1/3 mx-auto p-4 lg:px-10 rounded border border-gray-100 shadow'>
          <div className='mb-3 w-full flex justify-center '>
              <Logo/>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
          {/* NAME */}
          <div className='mb-3'>
              <label htmlFor="name">Name <span className="text-red-500">*</span></label>
              <input disabled={isSubmitting} {...register("name")} id='name' type="text" className="w-full py-2 px-2 rounded outline-none bg-gray-50 border border-gray-200" placeholder='Enter your name' />
              {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          {/* EMAIL */}
          <div className='mb-3'>
              <label htmlFor="email">Email <span className="text-red-500">*</span></label>
              <input disabled={isSubmitting} {...register("email")} id='email'  type="email" className="w-full py-2 px-2 rounded outline-none bg-gray-50 border border-gray-200" placeholder='Enter your email' />
              {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* PHONE */}
            <div className='mb-3'>
                <label htmlFor="phone_no">Phone Number <span className="text-red-500">*</span></label>
                <div className='w-full flex items-center bg-gray-50 border border-gray-200 rounded overflow-hidden'>
                <span className='px-3 text-gray-500 border-r border-gray-300'>+91</span>
                <input disabled={isSubmitting}{...register("phone_no")} id='phone_no' type="text" maxLength={10} onInput={(e)=>{e.target.value = e.target.value.replace(/[^0-9]/g,"")}} className="w-full py-2 px-2 outline-none bg-transparent" placeholder='xxxxxxxxxx'/>
                </div>
                {errors.phone_no && (
                  <p className="text-red-500 text-sm">{errors.phone_no.message}</p>
                )}
            </div>
          
          {/* PASSWORD */}
          <div className='mb-3'>
              <label htmlFor="password">Password <span className="text-red-500">*</span></label>
              <div className='w-full px-2 rounded  bg-gray-50 border border-gray-200 flex justify-between items-center'>
                <input disabled={isSubmitting} {...register("password")} id='password' type={hidePassword?"password":"text"} className="w-full py-2 outline-none" placeholder='Enter your password' />
                <button type='button' disabled={isSubmitting} className='text-xl cursor-pointer' onClick={()=>setHidePassword(!hidePassword)}>
                 {hidePassword?<IoEye/>:<IoEyeOff/>}
                </button>
              </div>
              {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* ROLE */}
          <div className='mb-3'>
              <label htmlFor="role">Account type <span className="text-red-500">*</span></label>
                  <div id="role" className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="customer"
                        disabled={isSubmitting}
                        {...register("role")}
                      />
                      Customer
                    </label>
                    
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="merchant"
                        disabled={isSubmitting}
                        {...register("role")}
                      />
                      Merchant
                    </label>
                </div>
          </div>
          
          <div className="mb-3">
             <SubmitButton  text={'Register'} isLoading={isSubmitting} />
          </div>
          </form>

          <div className="mb-3 flex justify-center items-center gap-x-6">
            <div className='w-full h-[0.1px] bg-gray-400'></div>
            <div>Or</div>
            <div className='w-full h-[0.1px] bg-gray-400'></div>
          </div>
          <div className='mb-3 text-center'>
            <p>
              Already have an account ? <Link to={'/login'} className='text-blue-500'>Login</Link>
            </p>
          </div>
         </div>
      </div>
    </>
  )
}

export default RegisterPage