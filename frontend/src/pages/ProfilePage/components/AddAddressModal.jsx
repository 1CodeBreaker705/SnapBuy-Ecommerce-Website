import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useMemo, useState } from 'react'
import { IoIosClose } from "react-icons/io";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from "zod"
import toast from 'react-hot-toast';
import { axiosClient } from '../../../utils/axiosClient';
import SubmitButton from '../../../components/SubmitButton';
import { City, Country, State } from 'country-state-city';
import { useAuthStore } from '../../../zustand/authStore';

const AddAddressModal=({className,text='Add'})=> {

  const fetchUserDetails=useAuthStore((s)=>s.fetchUserDetails)

  let [isOpen, setIsOpen] = useState(false)

  // ZOD SCHEMA
const registerSchema = z.object({
  country: z.string().min(1, "Country is required"),
  state: z.string().optional(),
  district: z.string().optional(),
  landmark: z.string().optional(),
  house_no: z.string().optional(),
  pin_code: z.string().regex(/^[0-9]{6}$/, "Enter valid pincode: 6 digits"),
})

const {
  register,
  handleSubmit,
  reset,
  watch,
  formState: { errors, isSubmitting }
} = useForm(
  {
    resolver: zodResolver(registerSchema),
    defaultValues:{
      district:"",
      country:"",
      state:"",
      pin_code:"",
      landmark:"",
      house_no:""
    }
  })

    // watched values
  const countryCode = watch("country") // e.g. "IN"
  const stateCode = watch("state")    // e.g. "KA"

  const countries = useMemo(
  () => Country.getAllCountries(),
  []
)

const states = useMemo(() => {
  if (!countryCode) return [];
  return State.getStatesOfCountry(countryCode);
}, [countryCode])

const districts = useMemo(() => {
  if (!countryCode || !stateCode) return [];
  return City.getCitiesOfState(countryCode, stateCode);
}, [countryCode, stateCode])



  const onSubmit = async (data) => {
    try {
      const response = await axiosClient.post("/auth/add-new-address",data)
      toast.success(response.data.msg)
      reset()
      await fetchUserDetails()
      close()
    } catch (err) {
       toast.error(err?.response?.data?.detail || err.message)
    }
  } 

   function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
    reset()
  }

  return (
    <>
      <button onClick={open} className={className?className:"px-3 py-2 bg-blue-500 text-white rounded hover:cursor-pointer"}>{text}</button>

      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-xl rounded-xl bg-white text-black p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="div" className="text-base/7 font-medium flex items-center justify-between">
                <h3 className="font-bold">Add address</h3>
                <button onClick={close} className="text-2xl rounded-full p-1 bg-blue-500 text-white cursor-pointer">
                  <IoIosClose/>
                </button>
              </DialogTitle>
               <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Country */}
                   <div className='mb-3 flex flex-col gap-y-1'>
                     <label htmlFor="country">Country</label>
                     <select disabled={isSubmitting} {...register("country")} id='country'  className="w-full py-2 px-2 rounded outline-none bg-gray-50 border border-gray-200">
                      <option value="">Select</option>
                      {
                        countries?.map((curr)=>{return <option key={curr.isoCode} value={curr.isoCode} >{curr.name}</option>})
                      }
                    </select>  
                    {errors.country && (
                    <p className="text-red-500 text-sm">{errors.country.message}</p>
                  )}
                  {/* State */}
                   </div>
                   <div className='mb-3 flex flex-col gap-y-1'>
                     <label htmlFor="state">State</label>
                     <select disabled={isSubmitting || !countryCode} {...register("state")} id='state'  className="w-full py-2 px-2 rounded outline-none bg-gray-50 border border-gray-200 disabled:bg-gray-300">
                      <option value="">Select</option>
                      {
                        states.map((curr)=>{return <option key={curr.isoCode} value={curr.isoCode} >{curr.name}</option>})
                      }
                    </select>  
                    {errors.state && (
                    <p className="text-red-500 text-sm">{errors.state.message}</p>
                  )}
                  {/* District */}
                  </div>
                  <div className='mb-3 flex flex-col gap-y-1'>
                     <label htmlFor="district">District</label>
                     <select disabled={isSubmitting || !stateCode || !countryCode} {...register("district")} id='district'  className="w-full py-2 px-2 rounded outline-none bg-gray-50 border border-gray-200 disabled:bg-gray-300">
                      <option value="">Select</option>
                      {
                        districts.map((curr)=>{return <option key={curr.name} value={curr.name} >{curr.name}</option>})
                      }
                    </select>  
                    {errors.district && (
                    <p className="text-red-500 text-sm">{errors.district.message}</p>
                  )}
                  {/* Landmark */}
                   </div>
                   <div className='mb-3 flex flex-col gap-y-1'>
                    <label htmlFor="landmark">Landmark</label>
                    <input disabled={isSubmitting} {...register("landmark")} id='landmark' type="text" className="w-full py-2 px-2 rounded outline-none bg-gray-50 border border-gray-200" placeholder='Enter your landmark' />
                    {errors.landmark && (
                    <p className="text-red-500 text-sm">{errors.landmark.message}</p>
                  )}
                  </div>
                  {/* House No. */}
                  <div className='mb-3 flex flex-col gap-y-1'>
                    <label htmlFor="house_no">House No.</label>
                    <input disabled={isSubmitting} {...register("house_no")} id='house_no' type="text" className="w-full py-2 px-2 rounded outline-none bg-gray-50 border border-gray-200" placeholder='Enter your house no.' />
                    {errors.house_no && (
                    <p className="text-red-500 text-sm">{errors.house_no.message}</p>
                    )}
                </div>
                 {/* Pincode */}
                <div className='mb-3 flex flex-col gap-y-1'>
                  <label htmlFor="pin_code">Pincode</label>
                  <input disabled={isSubmitting} {...register("pin_code")} id='pin_code' type="text" onInput={(e)=>{e.target.value = e.target.value.replace(/[^0-9]/g, '')}} className="w-full py-2 px-2 rounded outline-none bg-gray-50 border border-gray-200" placeholder='Enter your pincode' />
                  {errors.pin_code && (
                  <p className="text-red-500 text-sm">{errors.pin_code.message}</p>
                  )}
                </div>

                 <div className="mb-3">
                    <SubmitButton  text={'Add'} isLoading={isSubmitting} />
                </div>

               </form>
              
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default AddAddressModal
