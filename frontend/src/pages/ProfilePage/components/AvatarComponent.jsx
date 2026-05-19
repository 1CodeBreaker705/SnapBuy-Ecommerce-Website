import React from 'react'

const AvatarComponent = ({ userName = "" }) => {
  
  const getInitials = (name = "") => {
    if (!name) return "?"
    return name
      .trim()
      .split(' ')
      .slice(0, 2)              // first + last name only
      .map(word => word[0])
      .join('')
      .toUpperCase()
  }
  
  return (
    <div className=' w-31.25 h-31.25 mx-auto border border-gray-400 rounded-full bg-black text-white flex items-center justify-center' >
      <span className='text-3xl font-bold ' >{getInitials(userName)}</span>
    </div>
  )
}

export default AvatarComponent