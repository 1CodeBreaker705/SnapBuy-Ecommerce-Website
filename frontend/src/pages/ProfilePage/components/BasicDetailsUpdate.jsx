
import z from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { axiosClient } from '../../../utils/axiosClient';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../../zustand/authStore';
import SubmitButton from '../../../components/SubmitButton';

const BasicDetailsUpdate = () => {

  const user=useAuthStore((s)=>s.user)
  const fetchUserDetails=useAuthStore((s)=>s.fetchUserDetails)

  // ZOD SCHEMA
  const registerSchema = z.object({
    name: z.string().trim().min(1, "Name is required").min(3, "Name must be at least 3 characters"),
    phone_no: z.string().trim().length(10, "Phone number must be exactly 10 digits").regex(/^[0-9]+$/, "Phone number must contain digits only"),
  })

  const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting }
} = useForm(
  {
    resolver: zodResolver(registerSchema),
     defaultValues: {
    name: user?.name || "",
    email: user?.email || "",
    phone_no: user?.phone_no || "",
    role:  user?.role.charAt(0).toUpperCase() + user.role.slice(1) || ""
  }
  })

  const onSubmit = async (data) => {
    try {
      const response = await axiosClient.patch("/auth/update-profile",data)
      toast.success(response.data.msg)
      await fetchUserDetails()
      
    } catch (err) {
       toast.error(err?.response?.data?.detail || err.message)
    }
  }

  return (
    <>
      <h2 className='text-xl font-bold'>Basic Details:</h2>
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
              <input disabled={true} {...register("email")} id='email'  type="email" className="w-full py-2 px-2 rounded outline-none bg-gray-50 border border-gray-200 hover:cursor-not-allowed"/>
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

          {/* ROLE */}
          <div className='mb-3'>
              <label htmlFor="role">Account <span className="text-red-500">*</span></label>
              <input disabled={true} {...register("role")}  id='role'  className="w-full py-2 px-2 rounded outline-none bg-gray-50 border border-gray-200 hover:cursor-not-allowed"/>
          </div>
          
          <div className="mb-3">
             <SubmitButton text={'Update'} isLoading={isSubmitting} />
          </div>
          </form>
    </>
  ) 
    
}

export default BasicDetailsUpdate