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

const LoginPage = () => {
  const fetchUserDetails=useAuthStore((s)=>s.fetchUserDetails)
  const navigate=useNavigate()
  const [hidePassword,setHidePassword]=useState(true)

  // ZOD SCHEMA
const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Enter valid email"),
  password: z.string().trim().min(1, "Password is required").min(6, "Minimum 6 characters"),
})

const {
  register,
  handleSubmit,
  reset,
  formState: { errors, isSubmitting }
} = useForm(
  {
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data) => {
    try {
      const response =await axiosClient.post("/auth/login",data)
      toast.success(response.data.msg)
      await fetchUserDetails()
      reset()
      navigate("/", { replace: true })
    } catch (err) {
      toast.error(err?.response?.data?.detail || err.message) 
    }
  };
  
  return (
    <>
      <div className='min-h-[85vh] flex items-center justify-center'>
         <div className='w-[96%] lg:w-1/2 xl:w-1/3 mx-auto p-4 lg:px-10 rounded border border-gray-100 shadow'>
          <div className='mb-3 w-full flex justify-center '>
              <Logo/>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
          
          {/* EMAIL */}
          <div className='mb-3'>
              <label htmlFor="email">Email <span className="text-red-500">*</span></label>
              <input disabled={isSubmitting} {...register("email")} id='email'  type="email" className="w-full py-2 px-2 rounded outline-none bg-gray-50 border border-gray-200" placeholder='Enter your email' />
              {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
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
          
          <div className="mb-3">
             <SubmitButton  text={'Login'} isLoading={isSubmitting} />
          </div>
          </form>

          <div className="mb-3 flex justify-center items-center gap-x-6">
            <div className='w-full h-[0.1px] bg-gray-400'></div>
            <div>Or</div>
            <div className='w-full h-[0.1px] bg-gray-400'></div>
          </div>
          <div className='mb-3 text-center'>
            <p>
              Don't have an account ? <Link to={'/register'} className='text-blue-500'>Register</Link>
            </p>
          </div>
         </div>
      </div>
    </>
  )
}

export default LoginPage