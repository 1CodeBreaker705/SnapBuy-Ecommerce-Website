import clsx from 'clsx'
import React from 'react'
import { AiOutlineLoading } from "react-icons/ai";

const SubmitButton = ({isLoading,text,className}) => {
  return (
    <>
     <button disabled={isLoading} type='submit' className={clsx('w-full py-2 bg-black rounded text-white outline-none flex items-center justify-center cursor-pointer disabled:bg-gray-800 disabled:cursor-no-drop',className)}>
     {isLoading?<AiOutlineLoading className='animate-spin text-xl'/>:<span>{text}</span>}
     </button>
    </>
  )
}

export default SubmitButton