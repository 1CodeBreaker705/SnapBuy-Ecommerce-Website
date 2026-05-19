import React from 'react'
import { Link } from 'react-router-dom'
import paymentSuccess from '../../../assets/paymentSuccess.png'

const CheckoutSuccessPage = () => {

  return (

    <div className='min-h-[70vh] flex flex-col items-center justify-center px-4'>

      <img
        src={paymentSuccess}
        className='w-72 md:w-96'
        alt="Payment Success"
      />

      <p className="text-3xl font-bold text-center mt-4">
        Payment Success
      </p>

      <p className="text-zinc-500 text-center mt-2">
        Your order has been placed successfully.
      </p>

      <Link
        to={'/orders'}
        className='mt-6 bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-black/80 transition'
      >
        View Orders
      </Link>

    </div>

  )

}

export default CheckoutSuccessPage