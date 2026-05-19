import React from 'react'
import { MdDelete } from "react-icons/md";
import AddAddressModal from './AddAddressModal';
import { useAuthStore } from '../../../zustand/authStore';
import { Country, State } from "country-state-city"
import toast from 'react-hot-toast';
import { axiosClient } from '../../../utils/axiosClient';

const AddressCard = () => {

  const user=useAuthStore((s)=>s.user)
  const fetchUserDetails=useAuthStore((s)=>s.fetchUserDetails)

  
 const getCountryName = (countryCode) =>
  Country.getCountryByCode(countryCode)?.name ?? countryCode

 const getStateName = (stateCode, countryCode) =>
  State.getStateByCodeAndCountry(stateCode, countryCode)?.name
    ?? stateCode

  const deleteAddressHandler = async(id)=>{
     try {
      const response = await axiosClient.delete('/auth/delete-address/' + id) 
      toast.success(response.data.msg)
      await fetchUserDetails()
     } catch (error) {
       toast.error(error.response.data.detail) || error.message
     }
  }  

  return (
    <>
    <div className='py-10' >
      <div className='flex items-center justify-between mb-4'>
       <h4 className='text-2xl font-bold '>Address</h4>
       <AddAddressModal/>
      </div>
      <div className='flex flex-col gap-y-3'>
       {
         user.address.length>0 ? user.address.map((curr,i)=>{
           return <div key={i}
                      className="
                      w-full
                      p-5
                      border
                      border-gray-200
                      bg-white
                      rounded-2xl
                      flex
                      items-start
                      justify-between
                      gap-4
                      hover:shadow-md
                      transition-all
                      duration-300
                      "
                    >

                      <div className='flex flex-col'>

                        <h3 className='text-lg font-semibold text-black mb-2'>
                          Address {i + 1}
                        </h3>

                        <p className='text-zinc-600 leading-7 max-w-3xl'>

                          {
                            `${curr.house_no}, ${curr.landmark}, ${curr.district}, ${getStateName(curr.state,curr.country)}, ${getCountryName(curr.country)} - ${curr.pin_code}`
                          }

                        </p>

                      </div>

                      <button
                        onClick={() => {
                          deleteAddressHandler(curr.address_id)
                        }}
                        className="
                        min-w-11
                        h-11
                        rounded-xl
                        bg-gray-200
                        text-gray-800
                        flex
                        items-center
                        justify-center
                        hover:text-white
                        hover:bg-black
                        transition-all
                        duration-300
                        cursor-pointer
                        "
                      >

                        <MdDelete className='text-2xl' />

                      </button>

                    </div>
         })
         :
         <><h3 className='text-center py-8 border border-dashed border-gray-300 rounded-2xl text-zinc-500 bg-gray-50'>No Addresses</h3></>
       }
      </div>
    </div> 
    </>
  )
}

export default AddressCard