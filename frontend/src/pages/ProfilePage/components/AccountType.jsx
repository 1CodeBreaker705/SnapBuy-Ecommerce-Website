import clsx from 'clsx'
import React from 'react'
import { useAuthStore } from '../../../zustand/authStore';
import { MdDone } from "react-icons/md";

const AccountType = () => {

  const user=useAuthStore((s)=>s.user)
  
  const ROLE_TYPE = Object.freeze({
  CUSTOMER: "customer",
  MERCHANT: "merchant",
});
  
  const acc_type=[
     {
      "id":1,
      "image":"https://cdn-icons-png.flaticon.com/512/4990/4990476.png",
      "type": ROLE_TYPE.CUSTOMER
     },
     {
      "id":2,
      "image":"https://cdn-icons-png.flaticon.com/512/4515/4515443.png",
      "type": ROLE_TYPE.MERCHANT
     }
  ]

  return (
    <>
     <h4 className='text-2xl py-3 font-bold'>Account Type</h4>
     <div className='grid grid-cols-2 gap-x-2'>
       {acc_type.map((curr,i)=>{
         return <div key={i} className={clsx('w-full relative p-2 rounded-xl bg-gray-100',curr.type==user.role ?" border-2 border-blue-400":"border border-gray-200")} title={curr.type} >
          {curr.type==user.role && <MdDone className='absolute text-2xl right-4 text-white bg-blue-500 rounded-full' />}
           <img src={curr.image} alt={curr.type} />
         </div>
       })}
     </div>
    </>
  )
}

export default AccountType