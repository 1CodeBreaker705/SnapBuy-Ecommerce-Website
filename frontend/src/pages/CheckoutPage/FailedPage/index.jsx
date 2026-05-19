import React from 'react'
import { Link } from 'react-router-dom'
import paymentFail from '../../../assets/payment_fail_icon.png'

const CheckoutFailedPage = () => {

  return (

    <div className='min-h-[70vh] flex flex-col items-center justify-center px-4'>

      <img
        src={paymentFail}
        className='w-72 md:w-96'
        alt="Payment Failed"
      />

      <p className="text-3xl font-bold text-center mt-4">
        Payment Failed
      </p>

      <p className="text-zinc-500 text-center mt-2">
        Something went wrong while processing your payment.
      </p>

      <Link
        to={'/cart'}
        className='mt-6 bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-black/80 transition'
      >
        Back To Cart
      </Link>

    </div>

  )

}

export default CheckoutFailedPage